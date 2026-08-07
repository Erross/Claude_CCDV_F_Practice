// Quality harness for every course bank.
//   node tools/audit.js            -> audit all registered courses
//   node tools/audit.js CCAO-F     -> audit one course
//
// Encodes every defect class found during CCDV-F review, so new banks can't
// regress on problems that were already fixed once.

const path = require("path");
global.window = global;
require(path.join(__dirname, "..", "courses.js"));
// Same engine the browser runs, so the audit measures the real draw rather than a copy.
const E = require(path.join(__dirname, "..", "exam.js"));

for (const f of ["ccao-f", "ccdv-f", "ccar-f", "ccar-p"]) {
  const p = path.join(__dirname, "..", "data", f + ".js");
  try { require(p); } catch (e) { /* stub or absent */ }
}

const ABSOLUTES = /\b(always|never|only ever|unconditionally|entirely|completely|impossible)\b/i;
const META = /\b(blueprint|this domain|this exam|the exam|exam expects|exam tests)\b/i;
const POSITIONAL = /\bonly the (first|last|second|third)\b|\boption [A-D]\b|\bthe (first|last) option\b/i;
const NUMERIC_SEQ = /^\d(, \d){4}$/;

const shuffle = E.shuffle;
const pickN = E.pickN;

function auditCourse(c){
  const Q = c.questions;
  const issues = [];
  const add = (sev, msg) => issues.push({ sev, msg });

  // ---- structural integrity ----
  Q.forEach((q, i) => {
    const n = i + 1;
    if (!q.d || !q.t || !q.q || !q.o || !q.c || !q.e) add("ERROR", `Q${n}: missing field`);
    if (!q.o || q.o.length !== 4) add("ERROR", `Q${n}: not 4 options`);
    if (q.o && new Set(q.o).size !== 4) add("ERROR", `Q${n}: duplicate options`);
    if (q.t === "s" && q.c.length !== 1) add("ERROR", `Q${n}: single-select with ${q.c.length} keys`);
    if (q.t === "m" && q.c.length < 2) add("ERROR", `Q${n}: multi-select with <2 keys`);
    if (new Set(q.c).size !== q.c.length) add("ERROR", `Q${n}: duplicate answer keys`);
    q.c.forEach(ci => { if (ci < 0 || ci > 3) add("ERROR", `Q${n}: answer index out of range`); });
    if (!c.domains.some(d => d.id === q.d)) add("ERROR", `Q${n}: unknown domain "${q.d}"`);
    if (POSITIONAL.test(q.e)) add("ERROR", `Q${n}: explanation references option position (breaks under shuffling)`);
    if (META.test([q.q, ...q.o, q.e].join(" "))) add("WARN", `Q${n}: exam-meta language leak`);
    // near-duplicate options: two options opening with the same six words
    const heads = q.o.map(o => o.toLowerCase().replace(/[^a-z0-9 ]/g, "").split(/\s+/).slice(0, 6).join(" "));
    if (new Set(heads).size !== 4) add("ERROR", `Q${n}: near-duplicate options`);
  });

  // ---- duplicate stems ----
  const seen = new Map();
  Q.forEach((q, i) => {
    if (seen.has(q.q)) add("ERROR", `Q${i+1}: duplicate stem (also Q${seen.get(q.q)+1})`);
    seen.set(q.q, i);
  });

  // ---- order-of-operations items ----
  Q.forEach((q, i) => {
    if (!NUMERIC_SEQ.test(q.o[0])) return;
    const n = i + 1;
    if (new Set(q.o.map(o => o.length)).size !== 1) add("ERROR", `Q${n}: sequence options differ in length`);
    q.o.forEach(o => {
      if (o.split(",").map(s => s.trim()).sort().join("") !== "12345")
        add("ERROR", `Q${n}: sequence option is not a permutation of 1-5`);
    });
    if (q.o[q.c[0]] === "1, 2, 3, 4, 5") add("ERROR", `Q${n}: sequence key is the identity order`);
    if ((q.q.match(/\(\d\)/g) || []).length !== 5) add("ERROR", `Q${n}: stem does not enumerate 5 steps`);
    if (/\bstay(s)? (downloadable|available)\b|\bfor \d+ days\b/.test(q.q))
      add("WARN", `Q${n}: an enumerated step looks like a standing property, not an event`);
  });

  // ---- clipped correct answers ----
  // An earlier automated trim pass cut some three-item lists down to two. A correct
  // answer far shorter than every distractor is the signature; one-word keys are fine.
  Q.forEach((q, i) => {
    if (q.t !== "s") return;
    const t = q.o[q.c[0]];
    const others = q.o.filter((_, j) => j !== q.c[0]);
    const avg = others.reduce((s, o) => s + o.length, 0) / others.length;
    if (t.length > 15 && t.length < avg * 0.62)
      add("ERROR", `Q${i+1}: correct answer looks truncated (${t.length} chars vs ${Math.round(avg)} avg): "${t}"`);
  });

  // ---- conceptual duplication ----
  // Two items testing the same lesson collapse the bank's effective size. Compare the
  // content words of stem + correct answer; heavy overlap in the same domain is a flag.
  const STOP = new Set(("a an the and or but of to in on for with is are be been was were it its this that these those " +
    "what which who whom when where why how should would could most best least more less than then " +
    "claude model output request prompt team user users task question answer response not no yes do does did " +
    "at by from as if so such into over under about their there they them he she his her you your our we").split(" "));
  const sig = q => {
    const words = (q.q + " " + q.c.map(i => q.o[i]).join(" "))
      .toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/)
      .filter(w => w.length > 3 && !STOP.has(w));
    return new Set(words);
  };
  const sigs = Q.map(sig);
  const dupPairs = [];
  for (let i = 0; i < Q.length; i++) {
    for (let j = i + 1; j < Q.length; j++) {
      if (Q[i].d !== Q[j].d) continue;              // same domain only
      if (Q[i].sc && Q[j].sc && Q[i].sc !== Q[j].sc) continue;
      const a = sigs[i], b = sigs[j];
      if (a.size < 5 || b.size < 5) continue;
      let inter = 0;
      a.forEach(w => { if (b.has(w)) inter++; });
      const jac = inter / (a.size + b.size - inter);
      if (jac >= 0.5) dupPairs.push({ i, j, jac });
    }
  }
  dupPairs.sort((x, y) => y.jac - x.jac).slice(0, 15).forEach(p => {
    add("WARN", `Q${p.i+1} and Q${p.j+1} may test the same lesson (${Math.round(p.jac*100)}% term overlap): "${Q[p.i].q.slice(0,60)}..." / "${Q[p.j].q.slice(0,60)}..."`);
  });

  // ---- answer-length bias ----
  const singles = Q.filter(q => q.t === "s");
  let longest = 0, shortest = 0, cLen = 0, dLen = 0, nc = 0, nd = 0;
  singles.forEach(q => {
    const l = q.o.map(o => o.length);
    const mx = Math.max(...l), mn = Math.min(...l);
    const li = l.map((x, i) => x === mx ? i : -1).filter(i => i >= 0);
    const si = l.map((x, i) => x === mn ? i : -1).filter(i => i >= 0);
    if (li.length === 1 && li[0] === q.c[0]) longest++;
    if (si.length === 1 && si[0] === q.c[0]) shortest++;
    q.o.forEach((o, i) => { if (q.c.includes(i)) { cLen += o.length; nc++; } else { dLen += o.length; nd++; } });
  });
  const pctLongest = singles.length ? (100 * longest / singles.length) : 0;
  const pctShortest = singles.length ? (100 * shortest / singles.length) : 0;
  if (pctLongest > 35) add("ERROR", `answer-length bias: correct is longest ${pctLongest.toFixed(1)}% (target <35%, chance 25%)`);
  if (pctShortest > 35) add("ERROR", `answer-length bias: correct is shortest ${pctShortest.toFixed(1)}%`);

  // ---- absolute-word tell ----
  let ce = 0, ct = 0, de = 0, dt = 0;
  Q.forEach(q => q.o.forEach((o, i) => {
    if (q.c.includes(i)) { ct++; if (ABSOLUTES.test(o)) ce++; }
    else { dt++; if (ABSOLUTES.test(o)) de++; }
  }));
  const gap = (100 * de / dt) - (100 * ce / ct);
  if (gap > 25) add("WARN", `absolute-word gap ${gap.toFixed(1)}pts between distractors and correct answers`);

  // ---- answer position spread ----
  const pos = { 0: 0, 1: 0, 2: 0, 3: 0 };
  singles.forEach(q => pos[q.c[0]]++);
  const expected = singles.length / 4;
  Object.keys(pos).forEach(k => {
    if (Math.abs(pos[k] - expected) > expected * 0.35)
      add("WARN", `answer position ${k} appears ${pos[k]}x vs ~${expected.toFixed(0)} expected`);
  });

  // ---- draw simulation ----
  let drawFails = 0;
  for (let k = 0; k < 500; k++) {
    const drawn = E.drawQuestions(c);
    if (drawn.length !== c.items) drawFails++;
    // answer keys must survive option shuffling
    drawn.forEach(o => {
      const ord = shuffle(o.o.map((_, i) => i));
      const no = ord.map(i => o.o[i]);
      const nc = o.c.map(ci => ord.indexOf(ci)).sort();
      const a = o.c.map(i => o.o[i]).sort();
      const b = nc.map(i => no[i]).sort();
      if (JSON.stringify(a) !== JSON.stringify(b)) drawFails++;
    });
  }
  if (drawFails) add("ERROR", `${drawFails} failures across 500 simulated draws`);

  // ---- blueprint coverage ----
  const isScenario = E.isScenarioCourse(c);
  if (!isScenario) {
    const sum = c.domains.reduce((s, d) => s + (d.examCount || 0), 0);
    if (sum !== c.items) add("ERROR", `domain examCount sums to ${sum}, expected ${c.items}`);
    c.domains.forEach(d => {
      const have = Q.filter(q => q.d === d.id).length;
      if (have < d.examCount) add("ERROR", `domain ${d.id} has ${have} questions but draws ${d.examCount}`);
    });
  } else {
    const need = c.scenarioDraw.perScenario;
    c.scenarios.forEach(sc => {
      const have = Q.filter(q => q.sc === sc.id).length;
      if (have < need) add("ERROR", `scenario ${sc.id} has ${have} questions but draws ${need}`);
    });
    const drawTotal = c.scenarioDraw.scenarios * c.scenarioDraw.perScenario;
    if (drawTotal !== c.items) add("ERROR", `scenario draw yields ${drawTotal}, expected ${c.items}`);
    Q.forEach((q, i) => {
      if (!q.sc) add("ERROR", `Q${i+1}: scenario course question has no scenario tag`);
      else if (!c.scenarios.some(s => s.id === q.sc)) add("ERROR", `Q${i+1}: unknown scenario "${q.sc}"`);
    });
  }

  // ---- blueprint fidelity of the generated exam ----
  // Structural validity isn't enough: the exam actually produced has to reproduce the
  // published domain weights. Uses the shared engine, so this measures the real draw.
  {
    const tally = {};
    let drawnTotal = 0;
    for (let k = 0; k < 3000; k++) {
      const drawn = E.drawQuestions(c);
      drawnTotal += drawn.length;
      drawn.forEach(q => tally[q.d] = (tally[q.d] || 0) + 1);
      if (drawn.length !== c.items)
        add("ERROR", `a simulated draw produced ${drawn.length} questions, expected ${c.items}`);
    }
    c.domains.forEach(d => {
      const share = 100 * (tally[d.id] || 0) / drawnTotal;
      const delta = share - d.weight;
      if (Math.abs(delta) > 2)
        add("ERROR", `domain ${d.id} draws ${share.toFixed(1)}% of the exam but its blueprint weight is ${d.weight}% (${delta > 0 ? "+" : ""}${delta.toFixed(1)}pp)`);
      else if (Math.abs(delta) > 1)
        add("WARN", `domain ${d.id} draws ${share.toFixed(1)}% vs blueprint ${d.weight}%`);
    });
  }

  const multi = Q.filter(q => q.t === "m");
  const card = {};
  multi.forEach(q => card[q.c.length] = (card[q.c.length] || 0) + 1);
  if (multi.length && Object.keys(card).length === 1)
    add("WARN", `all ${multi.length} multi-select items have the same number of correct answers`);

  return {
    issues,
    stats: {
      bank: Q.length, draw: c.items, single: singles.length, multi: multi.length,
      longest: pctLongest.toFixed(1) + "%", shortest: pctShortest.toFixed(1) + "%",
      avgCorrect: (cLen / nc).toFixed(1), avgDistractor: (dLen / nd).toFixed(1),
      multiCardinality: card, positions: pos
    }
  };
}

const only = process.argv[2];
let totalErrors = 0;
global.getCourses().forEach(c => {
  if (only && c.code !== only) return;
  const { issues, stats } = auditCourse(c);
  const errors = issues.filter(i => i.sev === "ERROR");
  const warns = issues.filter(i => i.sev === "WARN");
  totalErrors += errors.length;
  console.log(`\n=== ${c.code} — ${c.name} ${c.tier} ===`);
  console.log(`bank ${stats.bank} | draw ${stats.draw} | ${stats.single} single / ${stats.multi} multi`);
  console.log(`length: correct-longest ${stats.longest}, correct-shortest ${stats.shortest} (chance 25%)`);
  console.log(`avg option length: correct ${stats.avgCorrect} vs distractor ${stats.avgDistractor}`);
  console.log(`multi cardinality: ${JSON.stringify(stats.multiCardinality)} | positions: ${JSON.stringify(stats.positions)}`);
  console.log(`ERRORS: ${errors.length}   WARNINGS: ${warns.length}`);
  errors.slice(0, 40).forEach(e => console.log("  ERROR  " + e.msg));
  warns.slice(0, 20).forEach(e => console.log("  warn   " + e.msg));
  if (errors.length > 40) console.log(`  ...and ${errors.length - 40} more errors`);
});

console.log(totalErrors === 0 ? "\nAll audited banks pass." : `\n${totalErrors} error(s) across audited banks.`);
process.exit(totalErrors === 0 ? 0 : 1);
