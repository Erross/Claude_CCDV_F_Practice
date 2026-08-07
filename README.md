# Claude Certification Practice Exams

Free, timed, unofficial practice exams for **all four Anthropic Claude certifications** — Associate Foundations, Developer Foundations, Architect Foundations, and Architect Professional. Pure static HTML/CSS/JS — no build step, no backend, no accounts. Deploy it to GitHub Pages and it just works.

**[Live demo →](https://erross.github.io/Claude_CCDV_F_Practice/)** *(live once you enable Pages — see below)*

## What it does

- Covers **all four Claude certifications** — pick one from the splash screen and the exam adapts its item count, time limit, pass mark, and domain blueprint:

| Exam | Code | Items | Bank | Format |
|---|---|---|---|---|
| Claude Certified Associate – Foundations | CCAO-F | 60 | 238 | weighted by domain |
| Claude Certified Developer – Foundations | CCDV-F | 53 | 208 | weighted by domain |
| Claude Certified Architect – Foundations | CCAR-F | 60 | 120 | scenario-based (4 of 6 scenarios × 15) |
| Claude Certified Architect – Professional | CCAR-P | 63 | 74 | weighted by domain |

- Draws a **fresh exam at random** every time you start, sampling each domain **proportionally to its official exam weight**
- Architect Foundations reproduces the real exam's **scenario structure**: four scenarios drawn from a pool of six, with a block of questions on each
- Renders **single-select (radio) and multi-select (checkbox)** questions correctly, matching the real exam's "select N" format
- **120-minute countdown timer** that turns amber under 10 minutes, red under 2, and auto-submits at zero
- A **question navigator grid** (like real Pearson VUE-style testing software) showing answered / unanswered / flagged / current state, with click-to-jump
- **Strikeout tool** — cross out an option you've ruled out without it counting as your answer
- **Flag for review** on any question
- A **results page** with an overall score, an approximate scaled score (100–1000, 720 to pass, clearly labeled as an approximation), and a **per-domain breakdown table** so you know exactly what to restudy
- A full **answer review** — every question, your answer vs. the correct answer, and a one-line rationale, expandable per item
- Shuffles both **question order and option order** on every attempt, so you can't just memorize position

## Why it exists

Anthropic's Claude Certification Program (CCAO-F, CCDV-F, CCA-F, CCA-P) is new as of mid-2026. Existing prep material is almost entirely paid (Udemy courses, "dumps" sites, PDF bundles). At the time this was built, there wasn't a free, open-source, GitHub-published practice-exam *application* — with realistic timing, strikeout, weighted random draw, and domain-level scoring — for any of the four Claude certifications. This covers all four.

## Running it

Nothing to install. Open `index.html` in a browser, or serve the folder with any static file server:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploying to GitHub Pages

This repo includes `.github/workflows/pages.yml`, which auto-builds and deploys on every push to `main` — no branch/folder juggling required.

1. Push this folder to the root of your repo (commands below).
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **"GitHub Actions"** (not "Deploy from a branch").
4. Push to `main` (or go to the **Actions** tab and run the "Deploy to GitHub Pages" workflow manually via **Run workflow**).
5. Your practice exam will be live at `https://erross.github.io/Claude_CCDV_F_Pracitce/` within a minute or two. Check the **Actions** tab for build status, and the green URL under **Settings → Pages** once it's live.

## File structure

```
├── index.html      # four screens: course picker, splash, exam, results
├── style.css       # all styling
├── app.js          # exam logic: weighted + scenario draw, timer, scoring, results
├── courses.js      # course registry
├── data/           # one question bank per certification
├── tools/audit.js  # quality harness (run: node tools/audit.js)
└── README.md
```

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

Each course lives in `data/<code>.js` and registers itself via `registerCourse({...})`. Update `examCount` on a course's domains to change how many questions it draws — the values are apportioned from the official blueprint weights by largest remainder and sum to that exam's item count.

After any change, run `node tools/audit.js` — it checks structural integrity, answer-length bias, duplicate and near-duplicate options, absolute-word tells, positional explanations, sequence-item permutations, blueprint coverage, and 500 simulated draws per course.

## Accuracy notes

- Question content is original, written to mirror the publicly documented exam blueprints (domains, weights, topic areas, and the kinds of tradeoffs/distractors the exam guide describes) — it is **not** sourced from Anthropic's actual exam bank and should not be treated as leaked exam content.
- The "approximate scaled score" on the results page is a simple linear mapping (percent correct → 100–1000 scale) shown for practice-motivation purposes only. Anthropic's real exam is criterion-referenced against a formal standard-setting study, so your actual scaled score will not map exactly to a percent-correct calculation.
- Domain weights, question counts, and format details reflect Exam Guide v1.0 (effective July 2026). Anthropic may update the blueprint; check the official exam guide before relying on this for final exam-day prep.

## Contributing

Pull requests adding well-written questions, fixing inaccuracies, or improving accessibility are welcome. Please keep new questions in the same object format and cite (in the PR description) what part of the public blueprint the question is testing.

## License

MIT — see `LICENSE`. Not affiliated with, endorsed by, or reviewed by Anthropic. "Claude" and "Anthropic" are trademarks of Anthropic PBC.
