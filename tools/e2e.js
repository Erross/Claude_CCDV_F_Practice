// End-to-end tests driving the real app.js in a headless DOM.
//   npm install && node tools/e2e.js
//
// tools/test.js covers the engine in isolation; this covers what a candidate
// actually touches: rendering, answering, persistence, resume, and submission.

const fs = require("fs"), path = require("path");
let JSDOM;
try { ({ JSDOM } = require("jsdom")); }
catch (e) {
  console.log("\nend-to-end: skipped (jsdom not installed — run `npm install`)");
  process.exit(0);
}
const ROOT = path.join(__dirname, "..");

let pass = 0, fail = 0;
const t = (n, f) => { try { f(); pass++; console.log("  pass  " + n); }
  catch (e) { fail++; console.log("  FAIL  " + n + "\n        " + e.message); } };
const assert = (c, m) => { if (!c) throw new Error(m || "assertion failed"); };
const eq = (a, b, m) => { if (a !== b) throw new Error((m || "not equal") + ": got " + a + ", expected " + b); };

function boot(opts) {
  opts = opts || {};
  const dom = new JSDOM(fs.readFileSync(path.join(ROOT, "index.html"), "utf8"), {
    runScripts: "outside-only", url: "https://example.test/"
  });
  const w = dom.window;
  if (opts.width) Object.defineProperty(w, "innerWidth", { value: opts.width, configurable: true });
  // minimal localStorage
  const store = {};
  Object.defineProperty(w, "localStorage", { value: {
    getItem: k => (k in store ? store[k] : null),
    setItem: (k, v) => { store[k] = String(v); },
    removeItem: k => { delete store[k]; }
  }, configurable: true });
  w.URL.createObjectURL = () => "blob:stub";
  w.URL.revokeObjectURL = () => {};
  // jsdom does not implement scrollTo; stubbing it keeps real errors visible in output.
  w.scrollTo = () => {};
  ["courses.js","exam.js","data/ccao-f.js","data/ccdv-f.js","data/ccar-f.js","data/ccar-p.js","app.js"]
    .forEach(f => w.eval(fs.readFileSync(path.join(ROOT, f), "utf8")));
  w.document.dispatchEvent(new w.Event("DOMContentLoaded"));
  return { w, d: w.document, store };
}

// Play a full exam through to the results screen.
function playThrough(ctx, courseIndex) {
  const { d } = ctx;
  d.querySelectorAll(".course-card")[courseIndex].click();
  d.getElementById("start-btn").click();
  const input = d.querySelector("#options input");
  input.checked = true;
  input.dispatchEvent(new (d.defaultView.Event)("change"));
  d.getElementById("submit-btn").click();
  d.getElementById("presubmit-submit").click();
}

console.log("\nend-to-end (jsdom, real app.js)");

t("course picker renders all four certifications", () => {
  const { d } = boot();
  const cards = d.querySelectorAll(".course-card");
  assert(cards.length === 4, "expected 4 course cards, got " + cards.length);
});

t("selecting a course reveals the splash with its figures", () => {
  const { d } = boot();
  d.querySelectorAll(".course-card")[1].click();
  assert(!d.getElementById("splash-screen").classList.contains("hidden"), "splash hidden");
  assert(d.getElementById("stat-items").textContent.length > 0, "item count empty");
});

t("starting an exam renders semantic inputs and a full navigator", () => {
  const { d } = boot();
  d.querySelectorAll(".course-card")[1].click();
  d.getElementById("start-btn").click();
  assert(!d.getElementById("exam-screen").classList.contains("hidden"), "exam hidden");
  const inputs = d.querySelectorAll("#options input");
  assert(inputs.length === 4, "expected 4 option inputs, got " + inputs.length);
  assert(["radio","checkbox"].includes(inputs[0].type), "options are not native inputs");
  assert(d.querySelectorAll(".nav-cell").length > 0, "navigator empty");
  assert(d.querySelector("#options label").getAttribute("for") === inputs[0].id, "label not bound to input");
});

t("answering marks the navigator and persists the attempt", () => {
  const { d, store } = boot();
  d.querySelectorAll(".course-card")[1].click();
  d.getElementById("start-btn").click();
  const input = d.querySelector("#options input");
  input.checked = true;
  input.dispatchEvent(new (d.defaultView.Event)("change"));
  assert(d.querySelector(".nav-cell").classList.contains("answered"), "navigator not updated");
  const saved = JSON.parse(store["claude-exams:v1:active-attempt"]);
  assert(saved.questions.some(q => q.a.length), "answer not persisted");
  assert(typeof saved.deadline === "number" && saved.deadline > Date.now(), "no future deadline saved");
  assert(!JSON.stringify(saved).includes("?"), "saved payload appears to contain question text");
});

t("a saved attempt stores indices, not question text", () => {
  const { d, store } = boot();
  d.querySelectorAll(".course-card")[0].click();
  d.getElementById("start-btn").click();
  const saved = JSON.parse(store["claude-exams:v1:active-attempt"]);
  saved.questions.forEach(q => {
    assert(typeof q.i === "number", "question not stored by index");
    assert(Array.isArray(q.o) && q.o.length === 4, "option order not stored");
  });
});

t("timer is derived from a deadline, not a decrementing counter", () => {
  const { d, store } = boot();
  d.querySelectorAll(".course-card")[1].click();
  d.getElementById("start-btn").click();
  const before = d.getElementById("timer").textContent;
  const saved = JSON.parse(store["claude-exams:v1:active-attempt"]);
  const expected = Math.ceil((saved.deadline - Date.now()) / 1000);
  const [m, s] = before.split(":").map(Number);
  assert(Math.abs((m * 60 + s) - expected) <= 2, "timer " + before + " does not match deadline");
});

t("flagging is reflected in the navigator and aria state", () => {
  const { d } = boot();
  d.querySelectorAll(".course-card")[1].click();
  d.getElementById("start-btn").click();
  d.getElementById("flag-btn").click();
  assert(d.getElementById("flag-btn").getAttribute("aria-pressed") === "true", "aria-pressed not set");
  assert(d.querySelector(".nav-cell").classList.contains("flagged"), "flag not shown in navigator");
});

t("review & submit opens the pre-submission screen, not a confirm dialog", () => {
  const { d, w } = boot();
  let confirmed = false;
  w.confirm = () => { confirmed = true; return true; };
  d.querySelectorAll(".course-card")[1].click();
  d.getElementById("start-btn").click();
  d.getElementById("submit-btn").click();
  assert(!d.getElementById("presubmit-screen").classList.contains("hidden"), "presubmit not shown");
  assert(confirmed === false, "fell back to a confirm() dialog");
  assert(d.getElementById("presubmit-summary").textContent.includes("unanswered"), "summary missing");
});

t("submitting scores the exam and clears the saved attempt", () => {
  const { d, store } = boot();
  d.querySelectorAll(".course-card")[1].click();
  d.getElementById("start-btn").click();
  d.getElementById("submit-btn").click();
  d.getElementById("presubmit-submit").click();
  assert(!d.getElementById("results-screen").classList.contains("hidden"), "results hidden");
  assert(d.getElementById("score-pct").textContent.includes("%"), "no score shown");
  assert(!("claude-exams:v1:active-attempt" in store), "saved attempt not cleared after submit");
  assert(d.querySelectorAll("#domain-table-body tr").length > 0, "domain table empty");
});

t("results filters narrow the review list", () => {
  const { d } = boot();
  d.querySelectorAll(".course-card")[1].click();
  d.getElementById("start-btn").click();
  d.getElementById("submit-btn").click();
  d.getElementById("presubmit-submit").click();
  const all = d.querySelectorAll("#review-list .review-item").length;
  assert(all > 0, "review list empty");
  d.querySelector('.filter-btn[data-filter="flagged"]').click();
  const flagged = d.querySelectorAll("#review-list .review-item").length;
  assert(flagged < all, "flagged filter did not narrow the list");
  d.querySelector('.filter-btn[data-filter="all"]').click();
  assert(d.querySelectorAll("#review-list .review-item").length === all, "filter did not reset");
});

t("an interrupted attempt is offered for resume on reload", () => {
  const dom1 = boot();
  dom1.d.querySelectorAll(".course-card")[1].click();
  dom1.d.getElementById("start-btn").click();
  const raw = dom1.store["claude-exams:v1:active-attempt"];
  assert(raw, "nothing saved to resume from");

  // fresh page load carrying the same storage
  const dom2 = new JSDOM(fs.readFileSync(path.join(ROOT, "index.html"), "utf8"),
    { runScripts: "outside-only", url: "https://example.test/" });
  const w2 = dom2.window, store2 = { "claude-exams:v1:active-attempt": raw };
  w2.scrollTo = () => {};
  Object.defineProperty(w2, "localStorage", { value: {
    getItem: k => (k in store2 ? store2[k] : null),
    setItem: (k, v) => { store2[k] = String(v); },
    removeItem: k => { delete store2[k]; }
  }, configurable: true });
  ["courses.js","exam.js","data/ccao-f.js","data/ccdv-f.js","data/ccar-f.js","data/ccar-p.js","app.js"]
    .forEach(f => w2.eval(fs.readFileSync(path.join(ROOT, f), "utf8")));
  w2.document.dispatchEvent(new w2.Event("DOMContentLoaded"));

  const bar = w2.document.getElementById("resume-bar");
  assert(!bar.classList.contains("hidden"), "resume bar not offered");
  w2.document.getElementById("resume-go").click();
  assert(!w2.document.getElementById("exam-screen").classList.contains("hidden"), "resume did not enter exam");
  assert(w2.document.querySelectorAll(".nav-cell").length > 0, "resumed exam has no questions");
});

t("a stale bank invalidates the saved attempt instead of restoring it", () => {
  const dom1 = boot();
  dom1.d.querySelectorAll(".course-card")[1].click();
  dom1.d.getElementById("start-btn").click();
  const saved = JSON.parse(dom1.store["claude-exams:v1:active-attempt"]);
  saved.fingerprint = "TAMPERED";

  const dom2 = new JSDOM(fs.readFileSync(path.join(ROOT, "index.html"), "utf8"),
    { runScripts: "outside-only", url: "https://example.test/" });
  const w2 = dom2.window, store2 = { "claude-exams:v1:active-attempt": JSON.stringify(saved) };
  w2.scrollTo = () => {};
  Object.defineProperty(w2, "localStorage", { value: {
    getItem: k => (k in store2 ? store2[k] : null),
    setItem: (k, v) => { store2[k] = String(v); },
    removeItem: k => { delete store2[k]; }
  }, configurable: true });
  ["courses.js","exam.js","data/ccao-f.js","data/ccdv-f.js","data/ccar-f.js","data/ccar-p.js","app.js"]
    .forEach(f => w2.eval(fs.readFileSync(path.join(ROOT, f), "utf8")));
  w2.document.dispatchEvent(new w2.Event("DOMContentLoaded"));

  const txt = w2.document.getElementById("resume-text").textContent;
  assert(txt.includes("could not be restored"), "stale attempt was not rejected: " + txt);
  assert(w2.document.getElementById("resume-go").classList.contains("hidden"), "resume button still offered");
});

t("scenario course shows its scenario panel", () => {
  const { d } = boot();
  const codes = Array.from(d.querySelectorAll(".course-card .cc-code")).map(e => e.textContent);
  const i = codes.indexOf("CCAR-F");
  assert(i >= 0, "CCAR-F card not found");
  d.querySelectorAll(".course-card")[i].click();
  d.getElementById("start-btn").click();
  assert(!d.getElementById("scenario-panel").classList.contains("hidden"), "scenario panel hidden");
  assert(d.getElementById("scenario-text").textContent.length > 50, "scenario text missing");
});

console.log("\nfocus management");

// Focus was previously left on controls that then got hidden or rebuilt, dropping
// keyboard users to <body>. Each transition must land somewhere usable.
function activeId(d){ return d.activeElement ? d.activeElement.id || d.activeElement.tagName : "(none)"; }

t("starting an exam moves focus to the question", () => {
  const { d } = boot();
  d.querySelectorAll(".course-card")[1].click();
  d.getElementById("start-btn").click();
  eq(activeId(d), "q-text", "focus after start");
});

t("selecting a course moves focus to the splash heading", () => {
  const { d } = boot();
  d.querySelectorAll(".course-card")[1].click();
  eq(activeId(d), "splash-title", "focus after course selection");
});

t("navigator activation moves focus to the question, not <body>", () => {
  const { d } = boot();
  d.querySelectorAll(".course-card")[1].click();
  d.getElementById("start-btn").click();
  d.querySelectorAll(".nav-cell")[5].click();
  eq(activeId(d), "q-text", "focus after navigator jump");
});

t("prev and next keep focus on the question", () => {
  const { d } = boot();
  d.querySelectorAll(".course-card")[1].click();
  d.getElementById("start-btn").click();
  d.getElementById("next-btn").click();
  eq(activeId(d), "q-text", "focus after next");
  d.getElementById("prev-btn").click();
  eq(activeId(d), "q-text", "focus after prev");
});

t("keep working returns focus to the question", () => {
  const { d } = boot();
  d.querySelectorAll(".course-card")[1].click();
  d.getElementById("start-btn").click();
  d.getElementById("submit-btn").click();
  eq(activeId(d), "presubmit-heading", "focus on presubmit");
  d.getElementById("presubmit-back").click();
  eq(activeId(d), "q-text", "focus after keep working");
});

t("submitting, retaking and changing course all place focus", () => {
  const { d } = boot();
  d.querySelectorAll(".course-card")[1].click();
  d.getElementById("start-btn").click();
  d.getElementById("submit-btn").click();
  d.getElementById("presubmit-submit").click();
  eq(activeId(d), "results-heading", "focus on results");
  d.getElementById("retake-btn").click();
  eq(activeId(d), "splash-title", "focus after retake");
  d.getElementById("change-course-btn").click();
  eq(activeId(d), "main-content", "focus after change certification");
});

t("abandoning an attempt places focus on the course picker", () => {
  const ctx = boot();
  ctx.w.confirm = () => true;
  ctx.d.querySelectorAll(".course-card")[1].click();
  ctx.d.getElementById("start-btn").click();
  ctx.d.getElementById("abandon-btn").click();
  eq(activeId(ctx.d), "main-content", "focus after abandon");
});

console.log("\nnavigator and option behaviour");

t("multi-select states how many answers are required", () => {
  const { d, w } = boot();
  d.querySelectorAll(".course-card")[1].click();
  d.getElementById("start-btn").click();
  const course = w.getCourse(d.getElementById("exam-code").textContent.replace("//",""));
  // step through until a multi-select appears
  let found = null;
  for (let i = 0; i < 60 && !found; i++) {
    const pill = d.getElementById("type-pill").textContent;
    if (/^Select \d answers$/.test(pill)) found = pill;
    else d.getElementById("next-btn").click();
  }
  assert(found, "no multi-select question stated a count");
  assert(/Select [23] answers/.test(found), "unexpected cardinality text: " + found);
  assert(d.getElementById("q-legend").textContent.includes(found), "legend does not match the pill");
});

t("selecting an option clears its strikeout, and striking clears the selection", () => {
  const { d } = boot();
  d.querySelectorAll(".course-card")[1].click();
  d.getElementById("start-btn").click();

  // strike first, then select: the strikeout must clear
  d.querySelectorAll(".strike-btn")[0].click();
  assert(d.querySelectorAll(".option-row")[0].classList.contains("struck"), "strikeout not applied");
  let input = d.querySelectorAll("#options input")[0];
  input.checked = true;
  input.dispatchEvent(new (d.defaultView.Event)("change"));
  assert(!d.querySelectorAll(".option-row")[0].classList.contains("struck"),
    "option is both selected and struck out");

  // now select, then strike: the selection must clear
  d.querySelectorAll(".strike-btn")[0].click();
  input = d.querySelectorAll("#options input")[0];
  assert(!input.checked, "option remained selected after being struck out");
});

t("mobile navigator closes after a jump and updates aria-expanded", () => {
  const { d } = boot({ width: 700 });
  d.querySelectorAll(".course-card")[1].click();
  d.getElementById("start-btn").click();
  const toggle = d.getElementById("nav-toggle"), panel = d.getElementById("nav-panel");
  toggle.click();
  assert(panel.classList.contains("open"), "panel did not open");
  eq(toggle.getAttribute("aria-expanded"), "true", "aria-expanded after opening");
  d.querySelectorAll(".nav-cell")[4].click();
  assert(!panel.classList.contains("open"), "panel stayed open after a jump");
  eq(toggle.getAttribute("aria-expanded"), "false", "aria-expanded after jump");
});

t("arrow-down moves by the column count the layout actually uses", () => {
  // 700px falls in the 8-column band; 500px in the 6-column band
  [[700, 8], [500, 6]].forEach(([width, cols]) => {
    const { d } = boot({ width });
    d.querySelectorAll(".course-card")[1].click();
    d.getElementById("start-btn").click();
    const cells = d.querySelectorAll(".nav-cell");
    cells[0].focus();
    const ev = new (d.defaultView.KeyboardEvent)("keydown", { key: "ArrowDown", bubbles: true });
    cells[0].dispatchEvent(ev);
    const label = d.activeElement.getAttribute("aria-label") || "";
    const landed = parseInt(label.replace(/\D+/, ""), 10);
    eq(landed, cols + 1, "at " + width + "px arrow-down should land on question " + (cols + 1));
  });
});

t("results review includes the scenario body, not just its title", () => {
  const { d } = boot();
  const codes = Array.from(d.querySelectorAll(".course-card .cc-code")).map(e => e.textContent);
  const i = codes.indexOf("CCAR-F");
  d.querySelectorAll(".course-card")[i].click();
  d.getElementById("start-btn").click();
  d.getElementById("submit-btn").click();
  d.getElementById("presubmit-submit").click();
  const body = d.querySelector("#review-list .review-body");
  const txt = body.querySelector(".review-scenario-text");
  assert(txt && txt.textContent.length > 80, "scenario body missing from the review item");
});

t("results can be filtered by domain and expanded or collapsed in bulk", () => {
  const { d } = boot();
  d.querySelectorAll(".course-card")[1].click();
  d.getElementById("start-btn").click();
  d.getElementById("submit-btn").click();
  d.getElementById("presubmit-submit").click();

  const all = d.querySelectorAll("#review-list .review-item").length;
  const sel = d.getElementById("review-domain");
  assert(sel.options.length > 1, "domain filter not populated");
  sel.value = sel.options[1].value;
  sel.dispatchEvent(new (d.defaultView.Event)("change"));
  assert(d.querySelectorAll("#review-list .review-item").length < all, "domain filter did not narrow");
  sel.value = "all";
  sel.dispatchEvent(new (d.defaultView.Event)("change"));

  d.getElementById("expand-all").click();
  assert(d.querySelectorAll("#review-list .review-body:not(.hidden)").length === all, "expand all failed");
  d.getElementById("collapse-all").click();
  assert(d.querySelectorAll("#review-list .review-body:not(.hidden)").length === 0, "collapse all failed");
});

console.log("\nattempt history");

t("a completed attempt is written to history", () => {
  const ctx = boot();
  playThrough(ctx, 1);
  const h = JSON.parse(ctx.store["claude-exams:v1:history"]);
  assert(h.attempts.length === 1, "expected 1 recorded attempt, got " + h.attempts.length);
  const a = h.attempts[0];
  ["code","at","correct","total","scaled","pass","seconds","domains"].forEach(k =>
    assert(k in a, "history record missing " + k));
  assert(typeof a.domains === "object" && Object.keys(a.domains).length > 0, "no domain breakdown");
});

t("history stores results only, never question text", () => {
  const ctx = boot();
  playThrough(ctx, 1);
  const raw = ctx.store["claude-exams:v1:history"];
  const course = ctx.w.getCourse(JSON.parse(raw).attempts[0].code);
  const stem = course.questions[0].q.slice(0, 25);
  assert(raw.indexOf(stem) === -1, "history leaked question text");
  assert(raw.length < 4000, "history record unexpectedly large: " + raw.length + " bytes");
});

t("history renders on the splash after an attempt", () => {
  const ctx = boot();
  playThrough(ctx, 1);
  ctx.d.getElementById("retake-btn").click();
  const panel = ctx.d.getElementById("history-panel");
  assert(!panel.classList.contains("hidden"), "history panel hidden");
  assert(ctx.d.querySelectorAll(".history-table tbody tr").length === 1, "history row missing");
  assert(ctx.d.getElementById("history-stats").textContent.includes("attempt"), "stats line missing");
});

t("a second attempt is compared against the first", () => {
  const ctx = boot();
  playThrough(ctx, 1);
  ctx.d.getElementById("retake-btn").click();
  ctx.d.getElementById("start-btn").click();
  ctx.d.getElementById("submit-btn").click();
  ctx.d.getElementById("presubmit-submit").click();
  const cmp = ctx.d.getElementById("score-compare").textContent;
  assert(cmp.includes("Attempt 2"), "comparison did not reference attempt number: " + cmp);
  const h = JSON.parse(ctx.store["claude-exams:v1:history"]);
  assert(h.attempts.length === 2, "second attempt not recorded");
});

t("history is kept per certification", () => {
  const ctx = boot();
  playThrough(ctx, 1);
  ctx.d.getElementById("change-course-btn-2").click();
  playThrough(ctx, 0);
  const h = JSON.parse(ctx.store["claude-exams:v1:history"]);
  const codes = new Set(h.attempts.map(a => a.code));
  assert(codes.size === 2, "expected two courses in history, got " + codes.size);
  // the splash for the current course must show only its own attempts
  ctx.d.getElementById("retake-btn").click();
  assert(ctx.d.querySelectorAll(".history-table tbody tr").length === 1,
    "history panel mixed courses together");
});

t("clearing history removes only the current certification", () => {
  const ctx = boot();
  ctx.w.confirm = () => true;
  playThrough(ctx, 1);
  ctx.d.getElementById("change-course-btn-2").click();
  playThrough(ctx, 0);
  ctx.d.getElementById("retake-btn").click();
  ctx.d.getElementById("history-clear").click();
  const h = JSON.parse(ctx.store["claude-exams:v1:history"]);
  assert(h.attempts.length === 1, "expected the other course's attempt to survive");
});

t("exported history re-imports without duplicating", () => {
  const ctx = boot();
  playThrough(ctx, 1);
  const exported = ctx.store["claude-exams:v1:history"];
  ctx.d.getElementById("retake-btn").click();
  ctx.w.alert = () => {};

  // feed the exported payload back in through the import path
  const before = JSON.parse(ctx.store["claude-exams:v1:history"]).attempts.length;
  const FR = function(){ };
  FR.prototype.readAsText = function(){ this.result = exported; this.onload(); };
  ctx.w.FileReader = FR;
  const fileInput = ctx.d.getElementById("history-file");
  Object.defineProperty(fileInput, "files", { value: [{}], configurable: true });
  fileInput.dispatchEvent(new (ctx.d.defaultView.Event)("change"));
  const after = JSON.parse(ctx.store["claude-exams:v1:history"]).attempts.length;
  assert(after === before, "re-importing the same export duplicated attempts: " + before + " -> " + after);
});

t("a malicious imported record cannot inject markup into the history table", () => {
  const ctx = boot();
  playThrough(ctx, 1);
  ctx.d.getElementById("retake-btn").click();
  ctx.w.alert = () => {};

  const code = ctx.d.getElementById("splash-code").textContent.replace("//", "");
  const payload = JSON.stringify({ schema: 1, attempts: [{
    code: code, at: Date.now(),
    correct: '<img src=x onerror="window.__pwned=1">',   // hostile field
    total: 60, scaled: 800, pass: true, seconds: 100, domains: {}
  }]});
  const FR = function(){};
  FR.prototype.readAsText = function(){ this.result = payload; this.onload(); };
  ctx.w.FileReader = FR;
  const fi = ctx.d.getElementById("history-file");
  Object.defineProperty(fi, "files", { value: [{}], configurable: true });
  fi.dispatchEvent(new (ctx.d.defaultView.Event)("change"));

  assert(!ctx.w.__pwned, "imported markup executed");
  assert(ctx.d.querySelectorAll("#history-body img").length === 0,
    "imported markup created a live element in the history table");
  // the record should have been rejected outright, not merely escaped
  const stored = JSON.parse(ctx.store["claude-exams:v1:history"]);
  assert(!stored.attempts.some(a => typeof a.correct === "string"),
    "a non-numeric score was accepted into storage");
});

t("imported records with out-of-range or unknown fields are rejected", () => {
  const ctx = boot();
  playThrough(ctx, 1);
  ctx.d.getElementById("retake-btn").click();
  ctx.w.alert = () => {};
  const before = JSON.parse(ctx.store["claude-exams:v1:history"]).attempts.length;

  const bad = JSON.stringify({ schema: 1, attempts: [
    { code: "NOT-A-COURSE", at: Date.now(), correct: 1, total: 2, scaled: 500, pass: true },
    { code: "CCDV-F", at: Date.now(), correct: 99, total: 10, scaled: 500, pass: true },  // correct > total
    { code: "CCDV-F", at: Date.now(), correct: 5, total: 10, scaled: 99999, pass: true }, // scaled out of range
    { code: "CCDV-F", at: -1, correct: 5, total: 10, scaled: 500, pass: true }            // bad timestamp
  ]});
  const FR = function(){};
  FR.prototype.readAsText = function(){ this.result = bad; this.onload(); };
  ctx.w.FileReader = FR;
  const fi = ctx.d.getElementById("history-file");
  Object.defineProperty(fi, "files", { value: [{}], configurable: true });
  fi.dispatchEvent(new (ctx.d.defaultView.Event)("change"));

  const after = JSON.parse(ctx.store["claude-exams:v1:history"]).attempts.length;
  eq(after, before, "an invalid record was accepted");
});

t("clearing history raises exactly one confirmation after using the filters", () => {
  const ctx = boot();
  ctx.w.confirm = () => { ctx.w.__confirms = (ctx.w.__confirms || 0) + 1; return true; };
  playThrough(ctx, 1);
  // exercise the results filters, which previously re-bound the history handlers
  ctx.d.querySelector('.filter-btn[data-filter="incorrect"]').click();
  ctx.d.querySelector('.filter-btn[data-filter="flagged"]').click();
  ctx.d.querySelector('.filter-btn[data-filter="all"]').click();
  ctx.d.getElementById("retake-btn").click();
  ctx.w.__confirms = 0;
  ctx.d.getElementById("history-clear").click();
  eq(ctx.w.__confirms, 1, "duplicate history listeners are stacking");
});

t("history uses the same approximate wording as the results screen", () => {
  const ctx = boot();
  playThrough(ctx, 1);
  ctx.d.getElementById("retake-btn").click();
  const badge = ctx.d.querySelector(".history-table .badge-sm").textContent;
  assert(/^Likely (pass|fail)$/.test(badge),
    "history states a definite result while the score is only approximate: " + badge);
});

t("importing a foreign file is rejected", () => {
  const ctx = boot();
  playThrough(ctx, 1);
  ctx.d.getElementById("retake-btn").click();
  let alerted = "";
  ctx.w.alert = m => { alerted = m; };
  const FR = function(){ };
  FR.prototype.readAsText = function(){ this.result = '{"nope":true}'; this.onload(); };
  ctx.w.FileReader = FR;
  const fileInput = ctx.d.getElementById("history-file");
  Object.defineProperty(fileInput, "files", { value: [{}], configurable: true });
  fileInput.dispatchEvent(new (ctx.d.defaultView.Event)("change"));
  assert(alerted.includes("not a compatible"), "bad import was not rejected: " + alerted);
});

console.log("\n" + pass + " passed, " + fail + " failed");
process.exit(fail ? 1 : 0);
