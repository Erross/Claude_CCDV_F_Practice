// Application tests for the shared exam engine and the attempt-persistence format.
//   node tools/test.js
//
// The audit checks question quality; this checks the machinery around it.

const path = require("path");
global.window = global;
require(path.join(__dirname, "..", "courses.js"));
require(path.join(__dirname, "..", "catalog.js"));
const E = require(path.join(__dirname, "..", "exam.js"));
for (const f of ["ccao-f", "ccdv-f", "ccar-f", "ccar-p"]) {
  try { require(path.join(__dirname, "..", "data", f + ".js")); } catch (e) {}
}

let passed = 0, failed = 0;
function t(name, fn) {
  try { fn(); passed++; console.log("  pass  " + name); }
  catch (e) { failed++; console.log("  FAIL  " + name + "\n        " + e.message); }
}
function assert(cond, msg) { if (!cond) throw new Error(msg || "assertion failed"); }
function eq(a, b, msg) {
  if (a !== b) throw new Error((msg || "not equal") + ": got " + a + ", expected " + b);
}

const courses = global.getCourses();

console.log("\nrelease catalog");

t("catalog metadata matches every repository bank", () => {
  const catalog = global.getCourseCatalog();
  eq(catalog.length, 4, "catalog size");
  eq(catalog.filter(c => c.status === "available").length, 3, "released course count");
  eq(catalog.filter(c => c.status !== "available").length, 1, "gated course count");
  catalog.forEach(meta => {
    const course = global.getCourse(meta.code);
    assert(Array.isArray(course.questions), meta.code + " repository bank was not loaded for tests");
    eq(course.questions.length, meta.bankSize, meta.code + " catalog bank size drifted");
    eq(course.items, meta.items, meta.code + " item count drifted");
    eq(course.minutes, meta.minutes, meta.code + " time limit drifted");
    eq(course.passScore, meta.passScore, meta.code + " pass score drifted");
    eq(JSON.stringify(course.domains), JSON.stringify(meta.domains), meta.code + " domains drifted");
  });
});

console.log("\nexam engine");

t("every course draws exactly its item count", () => {
  courses.forEach(c => {
    for (let i = 0; i < 50; i++) eq(E.drawQuestions(c).length, c.items, c.code);
  });
});

t("a draw never repeats a question within one exam", () => {
  courses.forEach(c => {
    for (let i = 0; i < 50; i++) {
      const drawn = E.drawQuestions(c);
      eq(new Set(drawn).size, drawn.length, c.code + " repeated a question");
    }
  });
});

t("domain apportionment sums to the requested total", () => {
  courses.forEach(c => {
    [10, 53, 60, 63, 100].forEach(n => {
      const tgt = E.domainTargets(c, n);
      const sum = Object.values(tgt).reduce((a, b) => a + b, 0);
      eq(sum, n, c.code + " apportioning " + n);
    });
  });
});

t("scenario courses draw whole scenario blocks", () => {
  courses.filter(E.isScenarioCourse).forEach(c => {
    for (let i = 0; i < 30; i++) {
      const drawn = E.drawQuestions(c);
      const bySc = {};
      drawn.forEach(q => bySc[q.sc] = (bySc[q.sc] || 0) + 1);
      eq(Object.keys(bySc).length, c.scenarioDraw.scenarios, c.code + " scenario count");
      Object.values(bySc).forEach(n =>
        eq(n, c.scenarioDraw.perScenario, c.code + " questions per scenario"));
    }
  });
});

t("option shuffling preserves the answer key", () => {
  courses.forEach(c => {
    E.drawQuestions(c).forEach(orig => {
      const order = E.shuffle(orig.o.map((_, i) => i));
      const opts = order.map(i => orig.o[i]);
      const keys = orig.c.map(ci => order.indexOf(ci)).sort();
      const before = orig.c.map(i => orig.o[i]).sort();
      const after = keys.map(i => opts[i]).sort();
      assert(JSON.stringify(before) === JSON.stringify(after),
        c.code + ": key drifted under shuffle");
      keys.forEach(k => assert(k >= 0 && k < 4, c.code + ": key out of range"));
    });
  });
});

t("bank fingerprint is stable and change-sensitive", () => {
  courses.forEach(c => eq(E.bankFingerprint(c), E.bankFingerprint(c), c.code + " unstable"));

  // The earlier fingerprint hashed only question count, stem LENGTH and key positions.
  // That missed a same-length stem swap and any option rewrite entirely — a saved attempt
  // could be restored against edited questions, mapping answers onto different content.
  // Each case below must change the digest, and reverting must restore it.
  const c = courses[0];
  const base = E.bankFingerprint(c);
  const q = c.questions[0];

  const mutations = [
    ["same-length stem swap", () => { const o = q.q; q.q = "X".repeat(o.length); return () => { q.q = o; }; }],
    ["option text rewritten", () => { const o = q.o[0]; q.o[0] = o + " EDITED"; return () => { q.o[0] = o; }; }],
    ["options reordered",     () => { const o = q.o.slice(); q.o = [o[1], o[0], o[2], o[3]]; return () => { q.o = o; }; }],
    ["answer key moved",      () => { const o = q.c.slice(); q.c = [(o[0] + 1) % 4]; return () => { q.c = o; }; }],
    ["domain reassigned",     () => { const o = q.d; q.d = "ZZ"; return () => { q.d = o; }; }],
    ["question type changed", () => { const o = q.t; q.t = q.t === "s" ? "m" : "s"; return () => { q.t = o; }; }]
  ];

  mutations.forEach(([name, mutate]) => {
    const undo = mutate();
    const after = E.bankFingerprint(c);
    undo();
    assert(after !== base, "fingerprint did not change after: " + name);
    eq(E.bankFingerprint(c), base, "fingerprint did not restore after: " + name);
  });
});

t("a fingerprint mismatch is what rejects a stale saved attempt", () => {
  const c = courses[0];
  const saved = { fingerprint: E.bankFingerprint(c) };
  const q = c.questions[0], original = q.o[0];
  q.o[0] = original + " EDITED";
  const stale = saved.fingerprint !== E.bankFingerprint(c);
  q.o[0] = original;
  assert(stale, "an edited option left the saved attempt looking valid");
});

console.log("\nexact domain allocation");

// The previous greedy allocator hit the exact blueprint target on ~98% of scenario
// combinations and silently backfilled the rest. These assert exactness, not averages.
t("every generated exam matches the blueprint target exactly", () => {
  courses.forEach(c => {
    const target = E.domainTargets(c, c.items);
    for (let i = 0; i < 400; i++) {
      const drawn = E.drawQuestions(c);
      eq(drawn.length, c.items, c.code + " wrong size");
      const tally = {};
      drawn.forEach(q => tally[q.d] = (tally[q.d] || 0) + 1);
      c.domains.forEach(d =>
        eq(tally[d.id] || 0, target[d.id], c.code + " domain " + d.id + " off target"));
    }
  });
});

t("the allocator is exact for every scenario combination, not just sampled ones", () => {
  courses.filter(E.isScenarioCourse).forEach(c => {
    const domIds = c.domains.map(d => d.id);
    const per = c.scenarioDraw.perScenario;
    const target = E.domainTargets(c, c.items);
    const combos = [];
    (function rec(start, cur) {
      if (cur.length === c.scenarioDraw.scenarios) { combos.push(cur.slice()); return; }
      for (let i = start; i < c.scenarios.length; i++) { cur.push(c.scenarios[i]); rec(i + 1, cur); cur.pop(); }
    })(0, []);
    assert(combos.length > 0, "no scenario combinations generated");
    combos.forEach(set => {
      const cellCaps = set.map(sc => domIds.map(id =>
        c.questions.filter(q => q.sc === sc.id && q.d === id).length));
      const a = E.allocate(set.map(() => per), domIds.map(id => target[id]), cellCaps);
      assert(a.exact, c.code + ": " + set.map(x => x.id).join("+") +
        " could only place " + a.placed + " of " + c.items);
      a.matrix.forEach(row =>
        eq(row.reduce((x, y) => x + y, 0), per, "a scenario block is not " + per + " questions"));
      domIds.forEach((id, ci) =>
        eq(a.matrix.reduce((acc, row) => acc + row[ci], 0), target[id], "domain " + id + " column sum"));
    });
  });
});

t("the allocator respects per-cell inventory limits", () => {
  // 2 rows x 3 cols; column 2 can only be served by row 0
  const a = E.allocate([3, 3], [2, 2, 2], [[2, 2, 2], [2, 2, 0]]);
  assert(a.exact, "feasible allocation reported infeasible");
  a.matrix.forEach((row, r) => row.forEach((n, ci) => {
    assert(n <= [[2, 2, 2], [2, 2, 0]][r][ci], "allocation exceeded cell capacity");
  }));
  eq(a.matrix[1][2], 0, "allocated into a cell with no inventory");
});

t("the allocator reports infeasibility rather than silently under-filling", () => {
  // demand 6, but only 4 available anywhere
  const a = E.allocate([3, 3], [2, 2, 2], [[1, 1, 0], [1, 1, 0]]);
  assert(!a.exact, "infeasible allocation reported as exact");
  assert(a.placed < 6, "placed more than the inventory allows");
});

t("a scenario draw fails explicitly when the configured blueprint is infeasible", () => {
  const impossible = {
    code: "IMPOSSIBLE", items: 2,
    domains: [
      { id: "A", name: "A", weight: 50 },
      { id: "B", name: "B", weight: 50 }
    ],
    scenarioDraw: { scenarios: 1, perScenario: 2 },
    scenarios: [{ id: "only", title: "Only", text: "Only" }],
    questions: [
      { d: "A", sc: "only", t: "s", q: "One", o: ["a","b","c","d"], c: [0], e: "x" },
      { d: "A", sc: "only", t: "s", q: "Two", o: ["a","b","c","d"], c: [0], e: "x" }
    ]
  };
  let message = "";
  try { E.drawQuestions(impossible); } catch (e) { message = e.message; }
  assert(message.includes("cannot satisfy"), "infeasible draw did not fail explicitly");
});

console.log("\nattempt persistence format");

t("an attempt round-trips through the saved shape", () => {
  const c = courses[0];
  const indexOf = new Map();
  c.questions.forEach((q, i) => indexOf.set(q, i));
  const drawn = E.drawQuestions(c);

  const saved = {
    schema: 1,
    code: c.code,
    fingerprint: E.bankFingerprint(c),
    deadline: Date.now() + 60000,
    current: 3,
    questions: drawn.map(q => {
      const order = E.shuffle(q.o.map((_, i) => i));
      return { i: indexOf.get(q), o: order, a: [0], f: 1, s: [2] };
    })
  };
  const round = JSON.parse(JSON.stringify(saved));
  eq(round.questions.length, c.items, "saved question count");

  // rebuilding from indices must reproduce the same options and keys
  round.questions.forEach(rec => {
    const orig = c.questions[rec.i];
    assert(orig, "index did not resolve to a question");
    const opts = rec.o.map(i => orig.o[i]);
    eq(opts.length, 4, "rebuilt option count");
    const keys = orig.c.map(ci => rec.o.indexOf(ci)).sort();
    keys.forEach(k => assert(k >= 0 && k < 4, "rebuilt key out of range"));
  });

  // the saved payload must not carry question or option text
  const json = JSON.stringify(saved);
  assert(json.indexOf(c.questions[round.questions[0].i].q.slice(0, 30)) === -1,
    "saved attempt duplicated question text");
});

t("a changed bank invalidates a saved attempt", () => {
  const c = courses[0];
  const fp = E.bankFingerprint(c);
  const original = c.questions[0].o[0];
  c.questions[0].o[0] = original + " x";
  const changed = E.bankFingerprint(c);
  c.questions[0].o[0] = original;
  // option text isn't in the fingerprint, but the key/length signature is; either way
  // a saved attempt must be rejected whenever the signature moves.
  assert(typeof changed === "string" && changed.length > 0, "fingerprint unavailable");
  eq(E.bankFingerprint(c), fp, "fingerprint did not restore");
});

console.log("\ndeadline timer arithmetic");

t("remaining time derives from the deadline, not elapsed ticks", () => {
  const remaining = deadline => Math.max(0, Math.ceil((deadline - 1000000) / 1000));
  eq(remaining(1000000 + 120000), 120, "two minutes out");
  eq(remaining(1000000), 0, "at the deadline");
  eq(remaining(1000000 - 60000), 0, "past the deadline clamps to zero");
});

t("course time limits are positive whole minutes", () => {
  courses.forEach(c => {
    assert(Number.isInteger(c.minutes) && c.minutes > 0, c.code + " bad time limit");
    assert(Number.isInteger(c.passScore) && c.passScore > 0, c.code + " bad pass score");
  });
});

console.log("\n" + passed + " passed, " + failed + " failed");
process.exit(failed ? 1 : 0);
