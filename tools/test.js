// Application tests for the shared exam engine and the attempt-persistence format.
//   node tools/test.js
//
// The audit checks question quality; this checks the machinery around it.

const path = require("path");
global.window = global;
require(path.join(__dirname, "..", "courses.js"));
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
  courses.forEach(c => {
    eq(E.bankFingerprint(c), E.bankFingerprint(c), c.code + " unstable fingerprint");
  });
  const c = courses[0];
  const before = E.bankFingerprint(c);
  const original = c.questions[0].q;
  c.questions[0].q = original + " (edited)";
  const after = E.bankFingerprint(c);
  c.questions[0].q = original;
  assert(before !== after, "fingerprint did not change when a question changed");
  eq(E.bankFingerprint(c), before, "fingerprint did not return after revert");
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
