# CCDV-F Practice Exam

A free, timed, unofficial practice exam for the **Claude Certified Developer – Foundations (CCDV-F)** certification. Pure static HTML/CSS/JS — no build step, no backend, no accounts. Deploy it to GitHub Pages and it just works.

**[Live demo →](https://erross.github.io/Claude_CCDV_F_Pracitce/)** *(live once you enable Pages — see below)*

## What it does

- Draws a fresh **60-question exam** at random from a bank of **202 questions** every time you start
- Samples each of the 8 CCDV-F domains **proportionally to its official exam weight**, so a practice run feels like the real domain mix (Applications & Integration ~19 questions, Model Selection ~10, down to Eval/Debugging ~2)
- Renders **single-select (radio) and multi-select (checkbox)** questions correctly, matching the real exam's "select N" format
- **120-minute countdown timer** that turns amber under 10 minutes, red under 2, and auto-submits at zero
- A **question navigator grid** (like real Pearson VUE-style testing software) showing answered / unanswered / flagged / current state, with click-to-jump
- **Strikeout tool** — cross out an option you've ruled out without it counting as your answer
- **Flag for review** on any question
- A **results page** with an overall score, an approximate scaled score (100–1000, 720 to pass, clearly labeled as an approximation), and a **per-domain breakdown table** so you know exactly what to restudy
- A full **answer review** — every question, your answer vs. the correct answer, and a one-line rationale, expandable per item
- Shuffles both **question order and option order** on every attempt, so you can't just memorize position

## Why it exists

Anthropic's Claude Certification Program (CCAO-F, CCDV-F, CCA-F, CCA-P) is new as of mid-2026. Existing prep material is almost entirely paid (Udemy courses, "dumps" sites, PDF bundles). At the time this was built, there wasn't a free, open-source, GitHub-published practice-exam *application* — with realistic timing, strikeout, weighted random draw, and domain-level scoring — for any of the four Claude certifications. This fills that gap for CCDV-F.

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
├── index.html      # the three screens: splash, exam, results
├── style.css       # all styling
├── app.js          # exam logic: weighted draw, timer, scoring, results
├── questions.js    # the question bank (202 questions, 8 domains)
└── README.md
```

## Adding or editing questions

All content lives in `questions.js` as a flat array. Each entry looks like:

```js
{
  d: "D5",                       // domain id — must match a DOMAINS entry
  t: "s",                        // "s" = single-select, "m" = multi-select
  q: "Question text?",
  o: ["Option A", "Option B", "Option C", "Option D"],
  c: [1],                        // index/indices of the correct option(s)
  e: "One-line rationale shown on the results review page."
}
```

Update `examCount` in the `DOMAINS` array (also in `questions.js`) if you want to change how many questions are drawn per domain — the values there are pre-calculated from the official blueprint weights and sum to 60.

## Accuracy notes

- Question content is original, written to mirror the publicly documented CCDV-F exam blueprint (domains, weights, topic areas, and the kinds of tradeoffs/distractors the exam guide describes) — it is **not** sourced from Anthropic's actual exam bank and should not be treated as leaked exam content.
- The "approximate scaled score" on the results page is a simple linear mapping (percent correct → 100–1000 scale) shown for practice-motivation purposes only. Anthropic's real exam is criterion-referenced against a formal standard-setting study, so your actual scaled score will not map exactly to a percent-correct calculation.
- Domain weights, question counts, and format details reflect Exam Guide v1.0 (effective July 2026). Anthropic may update the blueprint; check the official exam guide before relying on this for final exam-day prep.

## Contributing

Pull requests adding well-written questions, fixing inaccuracies, or improving accessibility are welcome. Please keep new questions in the same object format and cite (in the PR description) what part of the public blueprint the question is testing.

## License

MIT — see `LICENSE`. Not affiliated with, endorsed by, or reviewed by Anthropic. "Claude" and "Anthropic" are trademarks of Anthropic PBC.
