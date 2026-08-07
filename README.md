# Claude Certification Practice Exams

Free, timed, unofficial practice exams for Anthropic Claude certifications. Associate Foundations, Developer Foundations, and Architect Foundations are available now; Architect Professional remains in the catalog as **coming soon** while its question bank completes audit. The deployed runtime is static HTML/CSS/JS—no backend and no accounts. A small release build copies only approved bank assets to GitHub Pages.

**[Live demo →](https://erross.github.io/Claude_CCDV_F_Practice/)**

## What it does

- Includes metadata for all four Claude certification tracks, with three currently released. Pick an available course from the splash screen and the exam adapts its item count, time limit, pass mark, and domain blueprint:

| Exam | Code | Items | Bank | Format | Status |
|---|---|---:|---:|---|---|
| Claude Certified Associate – Foundations | CCAO-F | 60 | 246 | weighted by domain | Available |
| Claude Certified Developer – Foundations | CCDV-F | 53 | 208 | weighted by domain | Available |
| Claude Certified Architect – Foundations | CCAR-F | 60 | 164 | scenario-based (4 of 6 scenarios × 15) | Available |
| Claude Certified Architect – Professional | CCAR-P | 63 | 74 | weighted by domain | Coming soon — audit pending |

- Draws a **fresh exam at random** every time you start, sampling each domain **proportionally to its official exam weight**
- Architect Foundations reproduces the real exam's **scenario structure**: four scenarios drawn from a pool of six, with a block of questions on each. The draw is **allocated by domain using max-flow**, so *every* exam hits the published domain weights exactly — not merely on average — for all 15 possible scenario combinations
- Renders **single-select (radio) and multi-select (checkbox)** questions correctly, matching the real exam's "select N" format
- **Countdown timer** matching each exam's limit, turning amber under 10 minutes, red under 2, and auto-submitting at zero
- A **question navigator grid** (like real Pearson VUE-style testing software) showing answered / unanswered / flagged / current state, with click-to-jump
- **Strikeout tool** — cross out an option you've ruled out without it counting as your answer
- **Flag for review** on any question
- A **results page** with an overall score, an approximate scaled score (100–1000, 720 to pass, clearly labeled as an approximation), and a **per-domain breakdown table** so you know exactly what to restudy
- A full **answer review** — every question, your answer vs. the correct answer, and a one-line rationale, expandable per item
- Shuffles both **question order and option order** on every attempt, so you can't just memorize position
- **Resumable** — your attempt and its deadline are saved locally, so closing the tab by accident doesn't lose your progress
- **Deadline-based timer** that stays accurate through background tabs and device sleep, rather than counting down per tick
- **Pre-submission review** listing unanswered and flagged questions before you commit
- **Keyboard and screen-reader accessible** — native radio/checkbox controls, arrow-key navigation in the question grid, focus placed deliberately on every screen change, live announcements for time warnings, and WCAG AA text contrast
- **Multi-select questions state how many answers to pick** ("Select 2 answers"), matching the real exam's wording
- **Selecting an option clears its strikeout**, and striking one clears the selection, so an answer can't be both chosen and ruled out
- **Filterable answer review** — all, incorrect, flagged or unanswered, plus a per-domain filter and expand/collapse all
- **Scenario context is repeated in the results review**, since Architect answers often can't be judged without it
- **Partial-credit note on multi-select**, showing how many you had right on an item scored all-or-nothing
- **Attempt history** per certification: past scores, time taken, pass/fail, your weakest domains across recent attempts, and a comparison of each new result against your best and average — with JSON **export/import** so it isn't trapped in one browser

## Why it exists

Anthropic's Claude Certification Program (CCAO-F, CCDV-F, CCAR-F, CCAR-P) is new as of mid-2026. Existing prep material is almost entirely paid (Udemy courses, "dumps" sites, PDF bundles). At the time this was built, there wasn't a free, open-source, GitHub-published practice-exam *application* with realistic timing, strikeout, weighted random draw, and domain-level scoring. The three audited Foundations tracks are available; Professional is represented in the catalog but deliberately not published yet.

## Running it

Nothing to install. Open `index.html` in a browser, or serve the folder with any static file server:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploying to GitHub Pages

This repo includes `.github/workflows/pages.yml`, which validates then deploys on every push. Pull requests run the same validation without deploying. `tools/build.js` constructs an explicit runtime artifact from `catalog.js`, so generator scripts, audit tooling, and every gated bank stay out of the deployed site.

1. Push this folder to the root of your repo (commands below).
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **"GitHub Actions"** (not "Deploy from a branch").
4. Push to `main` (or go to the **Actions** tab and run the "Deploy to GitHub Pages" workflow manually via **Run workflow**).
5. Your practice exam will be live at `https://erross.github.io/Claude_CCDV_F_Practice/` within a minute or two. Check the **Actions** tab for build status, and the green URL under **Settings → Pages** once it's live.

## File structure

```
├── index.html      # five screens: course picker, splash, exam, pre-submit, results
├── style.css       # all styling
├── courses.js      # course registry
├── catalog.js      # public metadata, release status, and bank-asset manifest
├── exam.js         # shared draw engine — used by both the app and the tooling
├── app.js          # UI: rendering, timer, persistence, scoring, results
├── data/           # one question bank per certification
├── PROVENANCE.md   # blueprint transcription and product-fact verification record
├── tools/
│   ├── audit.js    # question-bank quality harness
│   ├── test.js     # engine and persistence tests
│   ├── e2e.js      # headless DOM tests driving the real app
│   ├── build.js    # release-catalog-driven public artifact builder
│   └── artifact-test.js # proves gated bank bytes are not published
└── README.md
```

`exam.js` is deliberately shared: the audit measures the same draw the candidate
receives, rather than a second implementation that could drift from it.

## Adding or editing questions

Questions live in `data/<code>.js` as a flat array on the course object. Each entry looks like:

```js
{
  d: "D5",                       // domain id — must match one of the course's domains
  t: "s",                        // "s" = single-select, "m" = multi-select
  q: "Question text?",
  o: ["Option A", "Option B", "Option C", "Option D"],
  c: [1],                        // index/indices of the correct option(s)
  e: "One-line rationale shown on the results review page.",
  sc: "support"                  // scenario id — scenario-based courses only
}
```

Each bank lives in `data/<code>.js` and registers itself via `registerCourse({...})`. Public metadata and release status live in `catalog.js`; setting a catalog entry to `coming-soon` keeps the bank auditable in the repository while excluding it from the browser and deployment artifact. Update `examCount` on a course's domains to change how many questions it draws—the values are apportioned from the official blueprint weights by largest remainder and sum to that exam's item count.

After cloning, run `npm ci`, then `npm run check`—syntax, bank audit, engine tests,
application tests, and a production-artifact leakage test. CI runs the same gate and **will not deploy if any of it fails**. `npm run build` creates the exact `_site` directory used by GitHub Pages.

`node tools/audit.js` alone runs the bank checks. It checks structural integrity, answer-length bias, duplicate and near-duplicate options, conceptual duplication between questions, truncated correct answers, absolute-word tells, positional explanations, sequence-item permutations, blueprint coverage, **whether the generated exam actually reproduces the published domain weights**, and simulated draws per course.

## Local storage and limits

Two things are stored, both under a namespaced key so they can't collide with other
projects on the same `github.io` origin.

**`claude-exams:v1:history`** — completed attempt results: course, timestamp, score, scaled
score, pass/fail, time taken, and the per-domain breakdown. No question text and no answers,
so a full history stays a few kilobytes. Capped at 200 attempts, oldest evicted first. Export
writes a JSON file; import merges by course and timestamp, so re-importing your own export
never duplicates anything. Imported records must also have internally consistent totals,
scaled scores, pass status, timing, and per-domain results before they affect trends.

**`claude-exams:v1:active-attempt`** — an in-progress attempt, keyed by a fingerprint of the
question bank. It stores question **indices**, option order, your answers, flags, strikeouts
and the deadline — never duplicated question text. If the
bank changes underneath a saved attempt, it is rejected rather than silently restored. The
complete saved shape—including question indices, option permutations, answers, strikeouts,
domain allocation, and current position—is validated before Resume is offered.

Both are **per browser and per device**. They do not sync, clearing site data removes them,
and private browsing may not preserve them at all. History is for personal study tracking,
not an authoritative record — export it if you want a durable copy.

Because this is a static site, answer keys for **released** banks are delivered to the browser
and can be read by anyone who inspects the page. That is fine for a practice tool—it simply
means this cannot be used as a proctored or authoritative assessment without moving question
selection and scoring to a server. Coming-soon banks are not loaded or copied into the public
artifact.

## Accuracy notes

- Question content is original, written to mirror the publicly documented exam blueprints (domains, weights, topic areas, and the kinds of tradeoffs/distractors the exam guide describes) — it is **not** sourced from Anthropic's actual exam bank and should not be treated as leaked exam content.
- The "approximate scaled score" on the results page is a simple linear mapping (percent correct → 100–1000 scale) shown for practice-motivation purposes only. Anthropic's real exam is criterion-referenced against a formal standard-setting study, so your actual scaled score will not map exactly to a percent-correct calculation.
- Domain weights, question counts, and format details reflect Exam Guide v1.0 (effective July 2026). Anthropic may update the blueprint; check the official exam guide before relying on this for final exam-day prep. The repository's transcription, verification date, and primary product-documentation links are retained in [`PROVENANCE.md`](PROVENANCE.md).

## Contributing

Pull requests adding well-written questions, fixing inaccuracies, or improving accessibility are welcome. Please keep new questions in the same object format and cite (in the PR description) what part of the public blueprint the question is testing.

## License

MIT — see `LICENSE`. Not affiliated with, endorsed by, or reviewed by Anthropic. "Claude" and "Anthropic" are trademarks of Anthropic PBC.
