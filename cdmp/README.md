# CDMP Data Management Fundamentals draft

This directory contains an unpublished calibration pilot for a future CDMP Data Management Fundamentals practice exam.

The pilot contains 40 original questions across the 14 published Fundamentals topics. It is not the full 100-question exam and is not released through the production catalog. The full simulation remains locked until the question bank and independent reviews are complete.

## Current behavior

- 40 pilot questions, one for each calibrated bank item
- 36-minute standard and 44-minute ESL pilot settings, scaled from the published 90/110-minute full-exam durations
- 60%, 70% and 80% selectable practice targets
- question and option shuffling
- percentage scoring rather than the Claude app's approximate scaled score
- per-topic results, explanations, source locators and draft-review labels
- local attempt recovery and history isolated under the `cdmp-draft:v1:` namespace

The pilot deliberately repeats its 40 questions on retakes. Full-bank retake overlap controls will apply after the bank reaches sufficient breadth.

## Preview

From the repository root:

```text
npm run preview:cdmp
python3 -m http.server 8765 --directory _cdmp-preview
```

Open `http://127.0.0.1:8765/`. The preview builder is developer-only. The production builder does not copy `cdmp/` and does not register CDMP.

## Sources and edition basis

Questions were authored from the freely accessible 2017 DMBOK2 PDF hosted by Technics Publications, plus DAMA's public 2024 Revised Edition change summaries. Items marked with revision references are still subject to independent review against the purchased Revised Edition before release.

- [DMBOK2 PDF](https://technicspub.com/wp-content/uploads/2023/07/DAMA-DMBOK2.pdf)
- [DMBOK2 Revised change summary](https://www.damadmbok.org/dmbok2-revisions)
- [DAMA revised-edition FAQ](https://dama.org/dama-dmbok2-revised-edition-faqs/)
- [CDMP exam structure and topic weights](https://cdmp.info/about/)

The PDF remains copyrighted. The repository contains original questions and source links, not copied book text or official exam items. DAMA's marks and endorsement are not claimed.

## Validation

```text
npm run test:cdmp
npm run check
```

The draft tests cover exact topic quotas, 5,000 pilot shuffles, 5,000 synthetic full forms, percentage threshold boundaries, 90/110-minute-derived settings, recovery, history, scoring, explanation/provenance fields and the production artifact exclusion gate. Independent semantic review, browser visual review and full-bank expansion remain release requirements.
