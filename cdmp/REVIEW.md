# CDMP pilot review response - 0.2.0

## Status and decision

The user supplied an independent blind-review report of the 0.1.1 pilot on 2026-09-24. The reviewer reported reading only stems and options before answering. The report praised writing and topic distribution but rejected the pilot's difficulty and exam fit. The reviewer estimated that experienced data professionals could score 85-95% without DMBOK study. This is reviewer judgment, not a measured cohort result: individual responses, an independently scored result and timing data were not supplied.

The response is a substantive rewrite, not a release approval. Version 0.2.0 changes 34 items, preserves the content of six stronger items (017, 022, 023, 025, 026, 028), and reorders every item's stored options together with its key and rationales. Item 036 keeps its warehouse-versus-MDM objective with a revised scenario and closer alternatives. The intended mix is 13 scenarios and 27 concept/framework questions.

The revised items have not received a cold independent review. No claim is made that a 50-60% score among experienced but unstudied candidates has been achieved. That range is a proposed formative calibration target, not an official standard or a prediction of certification results.

The [earlier editorial record](reviews/0.1.1-editorial.md) is historical. Its positive item decisions do not override the later independent review.

## Responses to the findings

| Finding | Change | Remaining evidence needed |
|---|---|---|
| Common-sense best-practice questions dominated | Replaced generic items with named DMBOK frameworks, role distinctions, architecture classifications and concept comparisons | Cold responses, confidence and reference-use data |
| Implausible distractors | Removed midpoint averaging, unrestricted database roles, permanent match rejection and reporting-mart-as-MDM-style choices | Reviewer identification of defensible alternatives and nonfunctioning distractors |
| Stem/key wording matches | Replaced the flagged owner, glossary, lineage and generic architecture questions; keyed terminology now requires conceptual distinctions | Human review of answer cues; lexical metrics alone cannot validate quality |
| Introductory IT trivia occupied several slots | ELT order, CDC naming, authentication naming, atomicity and fact grain were replaced | Difficulty of their replacements remains unmeasured |
| Coverage gaps | Added framework distinctions across the existing topic allocations | Full bank expansion; the pilot cannot cover every subtopic |
| Stored A-B-C-D rotation | Stored options and aligned rationales shuffled; a test rejects repeating key periods of 1-10 | Runtime shuffling remains active |
| Edition mismatch | Every book citation identifies 2017; revision-sensitive items remain flagged | Full Revised Edition text verification |
| Four versus five choices | Checked official FAQ/exam pages; they do not establish a per-question option count | Official sample or candidate guidance establishing format |

## Source nuances

- DMBOK Chapter 10, section 1.3.4 describes registry, transaction hub and consolidated approaches. It describes consolidation as a hybrid of the others. Item 020 tests a transition between named approaches; it does not invent an independent Hybrid option that could duplicate Consolidated.
- The [official revision summary](https://www.damadmbok.org/dmbok2-revisions) moves architecture frameworks and alternative quality frameworks into appendices. It changes terminology and diagrams in Chapters 1, 3, 4 and 13. Old section numbers below refer to the explicitly identified 2017 edition.
- The [official exam FAQ](https://cdmp.info/faqs/) and [exam page](https://cdmp.info/exams/) specify multiple-choice examinations and Revised Edition preparation but did not provide an option count in the material inspected. Four choices remain a provisional practice design, not a verified reproduction of the real format. The reviewer-linked third-party article is not treated as DAMA's format specification.
- The source check found [EDRM 2.0](https://edrm.net/edrm-model/current/) was released in September 2026. Item 006 is explicitly about EDRM as described in DMBOK, not the newly released version or legal advice. It distinguishes collection from production without relying on the older text's confusing processing/review ordering.
- For CAP, the 2017 book's shorthand is supplemented by [Eric Brewer's explanation](https://www.infoq.com/articles/cap-twelve-years-later-how-the-rules-have-changed/). Item 031 qualifies the tradeoff by the presence of a partition rather than teaching an unconditional pick-any-two rule.
- None of this establishes complete Revised Edition alignment. The highest-priority full-text review queue remains 001, 003-005, 010-013 and 025-028.

## Revised item map

IDs still identify draft pilot slots. `itemVersion: 2` and the changed bank fingerprint distinguish this revision from prior wording, answers and objectives. Prior review answers must not be scored against this revision.

| Item | Topic | Form | Current objective | Change |
|---|---|---|---|---|
| 001 | DM | concept | dama-framework-visuals | Revised |
| 002 | BD | concept | extended-big-data-characteristics | Revised |
| 003 | DA | concept | zachman-classification | Revised |
| 004 | DA | concept | architecture-domain-boundaries | Revised |
| 005 | DA | concept | enterprise-data-model-scope | Revised |
| 006 | DC | scenario | edrm-collection-production | Revised |
| 007 | DC | concept | garp-availability-transparency | Revised |
| 008 | DC | concept | controlled-vocabulary-structures | Revised |
| 009 | DE | concept | privacy-principle-distinction | Revised |
| 010 | DG | concept | steward-role-types | Revised |
| 011 | DG | concept | governance-body-responsibilities | Revised |
| 012 | DG | scenario | replicated-federated-governance | Revised |
| 013 | DG | concept | data-asset-valuation-bases | Revised |
| 014 | DI | concept | integration-latency-coupling | Revised |
| 015 | DI | concept | integration-interaction-models | Revised |
| 016 | DI | concept | canonical-model-transformations | Revised |
| 017 | MR | concept | reference-versus-master | Content retained; options reordered |
| 018 | MR | scenario | matching-error-tradeoff | Revised |
| 019 | MR | concept | trusted-source-golden-record | Revised |
| 020 | MR | scenario | mdm-registry-consolidation-transition | Revised |
| 021 | MD | concept | model-levels-versus-schemes | Revised |
| 022 | MD | scenario | relationship-cardinality | Content retained; options reordered |
| 023 | MD | scenario | normalization-update-anomaly | Content retained; options reordered |
| 024 | MD | concept | identifying-relationships | Revised |
| 025 | DQ | scenario | validity-versus-accuracy | Content retained; options reordered |
| 026 | DQ | scenario | completeness-denominator | Content retained; options reordered |
| 027 | DQ | concept | strong-wang-quality-categories | Revised |
| 028 | DQ | scenario | consistency-versus-accuracy | Content retained; options reordered |
| 029 | DS | concept | security-four-as | Revised |
| 030 | DS | concept | security-entitlement | Revised |
| 031 | SO | concept | cap-partition-tradeoff | Revised |
| 032 | SO | concept | base-eventual-consistency | Revised |
| 033 | BI | concept | inmon-kimball-integration | Revised |
| 034 | BI | concept | warehouse-bus-matrix | Revised |
| 035 | BI | scenario | scd-type-three | Revised |
| 036 | BI | scenario | warehouse-purpose | Revised |
| 037 | MM | concept | bidirectional-metadata | Revised |
| 038 | MM | concept | content-metadata-categories | Revised |
| 039 | MM | scenario | centralized-metadata-tradeoff | Revised |
| 040 | MM | scenario | designed-implemented-lineage | Revised |

## Coverage still needed in the expanded bank

Topic allocation is not the same as comprehensive coverage. These remain authoring targets, rather than claims of current coverage:

| Topic | Further subtopics |
|---|---|
| Data management | Context diagrams, Strategic Alignment, Amsterdam model, DIKW, Aiken, maturity assessment |
| Big data | Data lakes, data-science process, further architecture and analytics distinctions |
| Architecture | Further Zachman cells, data landscape, critical data elements and architecture governance |
| Documents/records | Taxonomy types, ontologies, Dublin Core, remaining GARP and EDRM distinctions |
| Ethics | OECD fair-information principles, misleading presentation and ethical-risk reasoning |
| Governance | Owner accountability, management oversight, additional operating structures and metrics |
| Integration | ESB/SOA, more interaction-pattern and latency comparisons, interface tradeoffs |
| Reference/master | Party master, controlled reference vocabularies, survivorship and resolution workflows |
| Modeling | Keys, dependencies, normal forms, subtypes, model governance |
| Quality | Revised nine-dimension set, PDCA, root-cause methods, quality improvement lifecycle |
| Security | Confidentiality/regulatory classification, access models, risk and control selection |
| Storage | Replication, sharding, database roles, recovery objectives and operational tradeoffs |
| Warehousing | More CIF/ODS distinctions, Type 1/2 scenarios, fact types and conformed facts |
| Metadata | Hybrid tradeoffs, metadata lifecycle, standards, catalogs and integration |

## Next cold review and calibration

Use [BLIND_PILOT.md](BLIND_PILOT.md), which contains only stems, options and response prompts. Record its version and bank fingerprint. Do not inspect this review record or the bank before submitting answers. The packet is regenerated with `npm run review:cdmp`; validation fails if the tracked packet no longer matches the current bank.

Record prior DMBOK study and exposure to the previous pilot, total time, selected answers, confidence, reference lookups, and alternatives considered defensible. Reviewers exposed to 0.1.1 are useful for checking improvements but are not an untouched cohort for difficulty measurement, especially on the six retained items.

First reconcile answer disagreements and ambiguity. Then examine item correctness rates, distractor selection and score separation between studied and unstudied participants. With a small pilot, treat discrimination and timing statistics as provisional. Do not tune questions solely to force a target score, and do not count a high score as official exam readiness.

## Validation scope

Automated checks cover the 13/27 mix, source-key rotation, packet freshness and exclusion of answer-bearing metadata, draw quotas, option shuffling, threshold scoring, persistence, history isolation and production exclusion. They do not certify question correctness or official exam difficulty. The runtime suite uses jsdom; real-browser visual and accessibility review remains open. The full 100-question exam remains disabled.
