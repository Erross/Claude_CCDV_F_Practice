// Original draft pilot. No book text or official exam items are bundled.
registerCourse(Object.assign({}, CDMPConfig.pilot, { questions: [
  {
    "id": "CDMP-P-001",
    "d": "DM",
    "t": "s",
    "q": "A company plans a data platform before agreeing which business outcomes it should support. What should guide the data strategy first?",
    "o": [
      "The information needed to achieve the business strategy",
      "The largest data sets already held by the organization",
      "The capabilities included in the shortlisted platform",
      "The reporting requirements of the technology department"
    ],
    "c": [
      0
    ],
    "e": "A data strategy connects the organization's business objectives to the data and capabilities needed to achieve them.",
    "rationales": [
      "Business outcomes establish which data capabilities matter.",
      "Volume alone does not establish business value or priority.",
      "Platform selection should follow requirements.",
      "One department's requirements do not establish enterprise priorities."
    ],
    "sources": [
      {
        "title": "DAMA-DMBOK2, second edition (2017)",
        "url": "https://technicspub.com/wp-content/uploads/2023/07/DAMA-DMBOK2.pdf",
        "locator": "Chapter 1; section 2.6 Data Management Strategy"
      }
    ],
    "subtopic": "business-driven-strategy",
    "family": "business-driven-strategy",
    "difficulty": "uncalibrated",
    "reviewStatus": "draft-author-checked",
    "verificationDate": "2026-09-24",
    "editionBasis": "2017; revised-edition completeness not certified",
    "editorialReview": {
      "date": "2026-09-24",
      "method": "same-agent second pass; not independent or blind",
      "status": "retained-draft"
    }
  },
  {
    "id": "CDMP-P-002",
    "d": "BD",
    "t": "s",
    "q": "A monitoring service receives new sensor events every second and must act before they become stale. Which classic Big Data characteristic most directly describes this challenge?",
    "o": [
      "Veracity",
      "Velocity",
      "Variety",
      "Volume"
    ],
    "c": [
      1
    ],
    "e": "The decisive requirement is handling the arrival and processing rate, even if the total retained data set is small.",
    "rationales": [
      "Veracity concerns reliability and trustworthiness.",
      "Velocity concerns the rate at which data arrives or needs processing.",
      "Variety concerns different forms and types of data.",
      "Volume concerns the amount of data, not the required processing pace."
    ],
    "sources": [
      {
        "title": "DAMA-DMBOK2, second edition (2017)",
        "url": "https://technicspub.com/wp-content/uploads/2023/07/DAMA-DMBOK2.pdf",
        "locator": "Chapter 14; section 1.3.3 Big Data"
      }
    ],
    "subtopic": "big-data-velocity",
    "family": "big-data-velocity",
    "difficulty": "uncalibrated",
    "reviewStatus": "draft-author-checked",
    "verificationDate": "2026-09-24",
    "editionBasis": "2017; revised-edition completeness not certified",
    "editorialReview": {
      "date": "2026-09-24",
      "method": "same-agent second pass; not independent or blind",
      "status": "retained-draft"
    }
  },
  {
    "id": "CDMP-P-003",
    "d": "DA",
    "t": "s",
    "q": "Two acquired businesses maintain incompatible customer structures. Before sequencing architecture changes, which comparison is most useful?",
    "o": [
      "The acquired systems against the preferred platform vendor architecture",
      "The two source schemas against each other without defining a target",
      "Current data capabilities against the business-driven target state",
      "The existing interfaces against last year's incident frequency ranking"
    ],
    "c": [
      2
    ],
    "e": "An architecture roadmap should address gaps between the documented current environment and business-driven target capabilities.",
    "rationales": [
      "Vendor capabilities inform implementation choices but do not establish the required business target.",
      "A source comparison finds differences but cannot identify the gaps to an agreed future state.",
      "The current-to-target gap provides a basis for sequencing architecture changes.",
      "Incident trends inform priorities but do not establish the capabilities needed after integration."
    ],
    "sources": [
      {
        "title": "DAMA-DMBOK2, second edition (2017)",
        "url": "https://technicspub.com/wp-content/uploads/2023/07/DAMA-DMBOK2.pdf",
        "locator": "Chapter 4; sections 2.1.1 Evaluate Existing Data Architecture Specifications and 2.1.2 Develop a Roadmap"
      }
    ],
    "subtopic": "architecture-gap-analysis",
    "family": "architecture-gap-analysis",
    "difficulty": "uncalibrated",
    "reviewStatus": "draft-author-checked",
    "verificationDate": "2026-09-24",
    "editionBasis": "2017; revised-edition completeness not certified",
    "editorialReview": {
      "date": "2026-09-24",
      "method": "same-agent second pass; not independent or blind",
      "status": "revised-draft"
    }
  },
  {
    "id": "CDMP-P-004",
    "d": "DA",
    "t": "s",
    "q": "A small field controls which safety instructions accompany a shipment. Errors could have serious consequences even though the field is rarely queried. What best supports treating it as a critical data element?",
    "o": [
      "The number of characters allocated to its database column",
      "The frequency with which analysts include it in dashboards",
      "The number of systems that can generate a value for it",
      "The significance of its business use and potential impact"
    ],
    "c": [
      3
    ],
    "e": "Business impact is more informative than data size or popularity when identifying critical elements.",
    "rationales": [
      "Storage width does not determine business criticality.",
      "Rarely queried data can still be essential to an important process.",
      "Source count may affect management complexity but is not the key criterion.",
      "Criticality follows the importance and consequences of the data's use."
    ],
    "sources": [
      {
        "title": "DAMA-DMBOK2, second edition (2017)",
        "url": "https://technicspub.com/wp-content/uploads/2023/07/DAMA-DMBOK2.pdf",
        "locator": "Chapter 13; section 1.3.2 Critical Data (business-impact basis); revised Chapter 4 adds a CDE definition"
      },
      {
        "title": "DAMA official revised-edition changes",
        "url": "https://www.damadmbok.org/dmbok2-revisions",
        "locator": "2024 revision: Chapter 4"
      }
    ],
    "subtopic": "critical-data-element",
    "family": "critical-data-element",
    "difficulty": "uncalibrated",
    "reviewStatus": "draft-author-checked",
    "verificationDate": "2026-09-24",
    "editionBasis": "2017 plus official 2024 change notes",
    "editorialReview": {
      "date": "2026-09-24",
      "method": "same-agent second pass; not independent or blind",
      "status": "revised-draft"
    }
  },
  {
    "id": "CDMP-P-005",
    "d": "DA",
    "t": "s",
    "q": "An architect needs an enterprise view of major data stores, their relationships and how information moves among them. Which artifact is the best fit?",
    "o": [
      "A data landscape showing stores and information flows",
      "A physical model of one application's customer table",
      "A glossary containing agreed definitions of business terms",
      "A retention schedule listing record disposal dates"
    ],
    "c": [
      0
    ],
    "e": "The revised architecture guidance uses the data landscape concept to describe this broader view.",
    "rationales": [
      "A landscape provides the cross-system view needed here.",
      "A single physical model is too narrow for the requested enterprise view.",
      "Definitions help interpretation but do not alone show stores and flows.",
      "Retention requirements answer a different lifecycle question."
    ],
    "sources": [
      {
        "title": "DAMA official revised-edition changes",
        "url": "https://www.damadmbok.org/dmbok2-revisions",
        "locator": "2024 revision: Chapter 4"
      }
    ],
    "subtopic": "data-landscape",
    "family": "data-landscape",
    "difficulty": "uncalibrated",
    "reviewStatus": "draft-author-checked",
    "verificationDate": "2026-09-24",
    "editionBasis": "Public 2024 Chapter 4 change summary; full revised text not checked",
    "editorialReview": {
      "date": "2026-09-24",
      "method": "same-agent second pass; not independent or blind",
      "status": "revised-draft"
    }
  },
  {
    "id": "CDMP-P-006",
    "d": "DC",
    "t": "s",
    "q": "A team keeps emailing copies of a procedure and cannot tell which revision was approved. Which capability most directly addresses the problem?",
    "o": [
      "An activity log showing which users downloaded each procedure copy",
      "Version control linking each revision to its approval status",
      "A retention schedule specifying how long procedure copies are kept",
      "A nightly backup preserving the procedure files in each mailbox"
    ],
    "c": [
      1
    ],
    "e": "Controlled versions and approval metadata make the authoritative document identifiable.",
    "rationales": [
      "Download events show access, not which revision received approval.",
      "A controlled revision history connects document versions to approval decisions.",
      "Retention governs how long records are kept, not which version is authoritative.",
      "Backups support recovery but do not distinguish approved and unapproved revisions."
    ],
    "sources": [
      {
        "title": "DAMA-DMBOK2, second edition (2017)",
        "url": "https://technicspub.com/wp-content/uploads/2023/07/DAMA-DMBOK2.pdf",
        "locator": "Chapter 9; Document and Content Management"
      }
    ],
    "subtopic": "document-version-control",
    "family": "document-version-control",
    "difficulty": "uncalibrated",
    "reviewStatus": "draft-author-checked",
    "verificationDate": "2026-09-24",
    "editionBasis": "2017; revised-edition completeness not certified",
    "editorialReview": {
      "date": "2026-09-24",
      "method": "same-agent second pass; not independent or blind",
      "status": "revised-draft"
    }
  },
  {
    "id": "CDMP-P-007",
    "d": "DC",
    "t": "s",
    "q": "An organization has an approved retention schedule and a documented process for suspending disposal when required. How should disposal of managed records be controlled?",
    "o": [
      "Dispose when the retention period expires, then check for holds in the audit",
      "Suspend disposal of every record until each creator personally authorizes it",
      "Check retention eligibility and active holds before authorized disposal",
      "Replace disposal review with a backup retained on a separate storage tier"
    ],
    "c": [
      2
    ],
    "e": "Retention and disposition controls need to distinguish eligible records from records whose disposal is suspended.",
    "rationales": [
      "A hold must be checked before disposal; a later audit cannot undo destruction.",
      "Creator approval is not a substitute for the approved retention and suspension process.",
      "Eligibility and holds must both be resolved before an authorized disposition.",
      "A backup does not replace the rules governing retention and disposition."
    ],
    "sources": [
      {
        "title": "DAMA-DMBOK2, second edition (2017)",
        "url": "https://technicspub.com/wp-content/uploads/2023/07/DAMA-DMBOK2.pdf",
        "locator": "Chapter 9; Records Management"
      }
    ],
    "subtopic": "record-retention-disposition",
    "family": "record-retention-disposition",
    "difficulty": "uncalibrated",
    "reviewStatus": "draft-author-checked",
    "verificationDate": "2026-09-24",
    "editionBasis": "2017; revised-edition completeness not certified",
    "editorialReview": {
      "date": "2026-09-24",
      "method": "same-agent second pass; not independent or blind",
      "status": "revised-draft"
    }
  },
  {
    "id": "CDMP-P-008",
    "d": "DC",
    "t": "s",
    "q": "Employees file the same kind of document under Sales, Commercial and Revenue, making retrieval inconsistent. Which intervention most directly improves classification?",
    "o": [
      "A shared template for document titles and revision identifiers",
      "A role-based access scheme aligned to the three departments",
      "A full-text index that retains each department's existing labels",
      "A controlled taxonomy with agreed categories and indexing rules"
    ],
    "c": [
      3
    ],
    "e": "Taxonomies organize content using controlled categories that support consistent classification and retrieval.",
    "rationales": [
      "Consistent titles help recognition but leave the conflicting categories unresolved.",
      "Access restrictions address permissions rather than the meaning of categories.",
      "Full-text retrieval may help find files but leaves classification inconsistent.",
      "Controlled categories and indexing rules address inconsistent classification directly."
    ],
    "sources": [
      {
        "title": "DAMA-DMBOK2, second edition (2017)",
        "url": "https://technicspub.com/wp-content/uploads/2023/07/DAMA-DMBOK2.pdf",
        "locator": "Chapter 9; Essential Concepts, Taxonomies"
      }
    ],
    "subtopic": "content-taxonomy",
    "family": "content-taxonomy",
    "difficulty": "uncalibrated",
    "reviewStatus": "draft-author-checked",
    "verificationDate": "2026-09-24",
    "editionBasis": "2017; revised-edition completeness not certified",
    "editorialReview": {
      "date": "2026-09-24",
      "method": "same-agent second pass; not independent or blind",
      "status": "revised-draft"
    }
  },
  {
    "id": "CDMP-P-009",
    "d": "DE",
    "t": "s",
    "q": "An analyst discovers that combining two customer groups makes a service change appear beneficial, although outcomes worsened within each group. What is the most responsible presentation?",
    "o": [
      "Show the subgroup results and explain the effect of aggregation",
      "Publish the aggregate because every underlying observation is genuine",
      "Remove group identifiers so readers focus on the headline result",
      "Use the aggregate chart and omit the conflicting subgroup analysis"
    ],
    "c": [
      0
    ],
    "e": "Ethical data handling includes communicating limitations and avoiding misleading interpretations, not merely avoiding fabricated values.",
    "rationales": [
      "This makes the materially different interpretations visible.",
      "Accurate individual observations can still support a misleading presentation.",
      "Removing context would conceal the issue rather than resolve it.",
      "Omitting conflicting evidence can mislead decision makers."
    ],
    "sources": [
      {
        "title": "DAMA-DMBOK2, second edition (2017)",
        "url": "https://technicspub.com/wp-content/uploads/2023/07/DAMA-DMBOK2.pdf",
        "locator": "Chapter 2; Data Handling Ethics"
      }
    ],
    "subtopic": "ethical-presentation",
    "family": "ethical-presentation",
    "difficulty": "uncalibrated",
    "reviewStatus": "draft-author-checked",
    "verificationDate": "2026-09-24",
    "editionBasis": "2017; revised-edition completeness not certified",
    "editorialReview": {
      "date": "2026-09-24",
      "method": "same-agent second pass; not independent or blind",
      "status": "retained-draft"
    }
  },
  {
    "id": "CDMP-P-010",
    "d": "DG",
    "t": "s",
    "q": "A customer-data domain needs someone accountable for decisions about its permitted business uses and definitions. Which role is the best fit?",
    "o": [
      "The data custodian responsible for the domain's storage controls",
      "The business data owner accountable for the domain's decisions",
      "The technical steward maintaining the domain's system mappings",
      "The integration lead responsible for distributing domain records"
    ],
    "c": [
      1
    ],
    "e": "Assign domain decision accountability explicitly to a business data owner.",
    "rationales": [
      "Custodians implement technical controls; that duty does not itself assign business decision accountability.",
      "The owner is accountable for business decisions concerning data in the domain.",
      "Technical stewardship supports implementation and interpretation but does not by itself confer ownership.",
      "Distribution responsibility does not establish authority over permitted business uses."
    ],
    "sources": [
      {
        "title": "DAMA-DMBOK2, second edition (2017)",
        "url": "https://technicspub.com/wp-content/uploads/2023/07/DAMA-DMBOK2.pdf",
        "locator": "Chapter 3; Types of Data Stewards"
      },
      {
        "title": "DAMA official revised-edition changes",
        "url": "https://www.damadmbok.org/dmbok2-revisions",
        "locator": "2024 revision: Chapter 3"
      }
    ],
    "subtopic": "data-owner-accountability",
    "family": "data-owner-accountability",
    "difficulty": "uncalibrated",
    "reviewStatus": "draft-author-checked",
    "verificationDate": "2026-09-24",
    "editionBasis": "2017 plus official 2024 change notes",
    "editorialReview": {
      "date": "2026-09-24",
      "method": "same-agent second pass; not independent or blind",
      "status": "revised-draft"
    }
  },
  {
    "id": "CDMP-P-011",
    "d": "DG",
    "t": "s",
    "q": "Which activity most clearly belongs to data governance rather than routine technical execution?",
    "o": [
      "Rebuilding an index used to retrieve records by customer status",
      "Correcting a failed file transfer under an established support runbook",
      "Approving who may resolve competing definitions of customer status",
      "Running the scheduled job that refreshes customer status each night"
    ],
    "c": [
      2
    ],
    "e": "Governance establishes decision rights, policies and oversight; management activities implement those decisions.",
    "rationales": [
      "Index maintenance is a storage and operations activity.",
      "Following a runbook executes existing decisions.",
      "Assigning decision rights establishes authority and accountability.",
      "Running an agreed process is operational execution."
    ],
    "sources": [
      {
        "title": "DAMA-DMBOK2, second edition (2017)",
        "url": "https://technicspub.com/wp-content/uploads/2023/07/DAMA-DMBOK2.pdf",
        "locator": "Chapter 3; Introduction and Essential Concepts"
      }
    ],
    "subtopic": "governance-decision-rights",
    "family": "governance-decision-rights",
    "difficulty": "uncalibrated",
    "reviewStatus": "draft-author-checked",
    "verificationDate": "2026-09-24",
    "editionBasis": "2017; revised-edition completeness not certified",
    "editorialReview": {
      "date": "2026-09-24",
      "method": "same-agent second pass; not independent or blind",
      "status": "retained-draft"
    }
  },
  {
    "id": "CDMP-P-012",
    "d": "DG",
    "t": "s",
    "q": "Two domain teams cannot agree which definition should govern a shared enterprise measure. The established governance process assigns cross-domain disputes to a council. What should the stewards do next?",
    "o": [
      "Adopt the definition used by the team with the largest reporting workload",
      "Publish the arithmetic midpoint of the two measures as a common definition",
      "Ask the integration team to choose the definition easiest to implement",
      "Escalate the documented issue and its business impacts to the council"
    ],
    "c": [
      3
    ],
    "e": "Escalate unresolved issues through the agreed authority structure with enough context for an informed decision.",
    "rationales": [
      "Reporting volume does not supersede the assigned decision authority.",
      "Combining values does not resolve the incompatible business definitions.",
      "Implementation convenience does not assign authority to resolve the dispute.",
      "The named council is the agreed escalation authority; documented impacts support its decision."
    ],
    "sources": [
      {
        "title": "DAMA-DMBOK2, second edition (2017)",
        "url": "https://technicspub.com/wp-content/uploads/2023/07/DAMA-DMBOK2.pdf",
        "locator": "Chapter 3; section 2.10 Engage in Issue Management"
      }
    ],
    "subtopic": "issue-escalation",
    "family": "issue-escalation",
    "difficulty": "uncalibrated",
    "reviewStatus": "draft-author-checked",
    "verificationDate": "2026-09-24",
    "editionBasis": "2017; revised-edition completeness not certified",
    "editorialReview": {
      "date": "2026-09-24",
      "method": "same-agent second pass; not independent or blind",
      "status": "revised-draft"
    }
  },
  {
    "id": "CDMP-P-013",
    "d": "DG",
    "t": "s",
    "q": "Finance and Sales use different meanings of active customer. What makes a glossary entry useful for resolving the ambiguity?",
    "o": [
      "An approved definition recording its scope and accountable owner",
      "A shared term name mapped to both teams' existing definitions",
      "A lineage diagram linking each team's measure to its source tables",
      "A usage report ranking the two meanings by their query frequency"
    ],
    "c": [
      0
    ],
    "e": "A business glossary should capture governed meaning rather than simply collect labels.",
    "rationales": [
      "An approved meaning, scope and owner make the interpretation governable.",
      "Mapping competing meanings documents the conflict but does not resolve it.",
      "Lineage explains derivation but does not itself decide the agreed meaning.",
      "Popularity does not establish the appropriate business definition."
    ],
    "sources": [
      {
        "title": "DAMA-DMBOK2, second edition (2017)",
        "url": "https://technicspub.com/wp-content/uploads/2023/07/DAMA-DMBOK2.pdf",
        "locator": "Chapter 3; section 3.2 Business Glossary"
      }
    ],
    "subtopic": "business-glossary-approval",
    "family": "business-glossary-approval",
    "difficulty": "uncalibrated",
    "reviewStatus": "draft-author-checked",
    "verificationDate": "2026-09-24",
    "editionBasis": "2017; revised-edition completeness not certified",
    "editorialReview": {
      "date": "2026-09-24",
      "method": "same-agent second pass; not independent or blind",
      "status": "revised-draft"
    }
  },
  {
    "id": "CDMP-P-014",
    "d": "DI",
    "t": "s",
    "q": "A pipeline copies source records into its target platform and then uses that platform to transform them into analytical tables. Which processing order does this describe?",
    "o": [
      "Load, transform, extract",
      "Extract, load, transform",
      "Extract, transform, load",
      "Transform, extract, load"
    ],
    "c": [
      1
    ],
    "e": "ELT moves the transformation work after loading, often using the target platform's processing capabilities.",
    "rationales": [
      "The source data must be extracted before it can be loaded.",
      "The target receives extracted data before transformation.",
      "ETL transforms before loading the target.",
      "The described sequence begins with extraction, not transformation."
    ],
    "sources": [
      {
        "title": "DAMA-DMBOK2, second edition (2017)",
        "url": "https://technicspub.com/wp-content/uploads/2023/07/DAMA-DMBOK2.pdf",
        "locator": "Chapter 8; section 1.3.1.4 ELT"
      }
    ],
    "subtopic": "elt-order",
    "family": "elt-order",
    "difficulty": "uncalibrated",
    "reviewStatus": "draft-author-checked",
    "verificationDate": "2026-09-24",
    "editionBasis": "2017; revised-edition completeness not certified",
    "editorialReview": {
      "date": "2026-09-24",
      "method": "same-agent second pass; not independent or blind",
      "status": "retained-draft"
    }
  },
  {
    "id": "CDMP-P-015",
    "d": "DI",
    "t": "s",
    "q": "A large operational table changes only slightly each hour. An integration needs the changed records rather than repeated full copies. Which capability best addresses this requirement?",
    "o": [
      "Reference-data standardization",
      "Dimensional aggregation",
      "Change data capture",
      "Full snapshot replacement"
    ],
    "c": [
      2
    ],
    "e": "Change data capture supports incremental integration by detecting inserted, updated or deleted data as appropriate to the implementation.",
    "rationales": [
      "Standardization aligns values but does not identify changed records.",
      "Aggregation summarizes records and can lose the required detail.",
      "CDC identifies changes for incremental processing.",
      "Full snapshots repeatedly move unchanged rows as well."
    ],
    "sources": [
      {
        "title": "DAMA-DMBOK2, second edition (2017)",
        "url": "https://technicspub.com/wp-content/uploads/2023/07/DAMA-DMBOK2.pdf",
        "locator": "Chapter 8; section 1.3.2.2 Change Data Capture"
      }
    ],
    "subtopic": "change-data-capture",
    "family": "change-data-capture",
    "difficulty": "uncalibrated",
    "reviewStatus": "draft-author-checked",
    "verificationDate": "2026-09-24",
    "editionBasis": "2017; revised-edition completeness not certified",
    "editorialReview": {
      "date": "2026-09-24",
      "method": "same-agent second pass; not independent or blind",
      "status": "retained-draft"
    }
  },
  {
    "id": "CDMP-P-016",
    "d": "DI",
    "t": "s",
    "q": "Two systems both store status code A. In one it means active; in the other it means archived. What must the integration design establish before combining these fields?",
    "o": [
      "A rule equating source values whenever their stored codes match",
      "A shared character encoding and a common target field length",
      "A lookup that converts each source code to the same display label",
      "A mapping that preserves the business meaning of each source code"
    ],
    "c": [
      3
    ],
    "e": "Interoperability requires compatible meaning as well as technically compatible formats.",
    "rationales": [
      "Equal strings can represent different concepts, as the stem demonstrates.",
      "Compatible representations do not resolve incompatible meanings.",
      "A shared display label would conceal the active-versus-archived distinction.",
      "Semantic mapping must distinguish the two meanings even though both sources use A."
    ],
    "sources": [
      {
        "title": "DAMA-DMBOK2, second edition (2017)",
        "url": "https://technicspub.com/wp-content/uploads/2023/07/DAMA-DMBOK2.pdf",
        "locator": "Chapter 8; Plan and Analyze, Source-to-Target Mapping"
      }
    ],
    "subtopic": "semantic-code-mapping",
    "family": "semantic-code-mapping",
    "difficulty": "uncalibrated",
    "reviewStatus": "draft-author-checked",
    "verificationDate": "2026-09-24",
    "editionBasis": "2017; revised-edition completeness not certified",
    "editorialReview": {
      "date": "2026-09-24",
      "method": "same-agent second pass; not independent or blind",
      "status": "revised-draft"
    }
  },
  {
    "id": "CDMP-P-017",
    "d": "MR",
    "t": "s",
    "q": "Which pair best illustrates reference data followed by master data?",
    "o": [
      "An approved currency-code list; the organization's supplier entities",
      "The organization's supplier entities; individual invoice line items",
      "Individual invoice line items; the nightly import error log",
      "The nightly import error log; an approved currency-code list"
    ],
    "c": [
      0
    ],
    "e": "Reference data supplies controlled classifications; master data represents shared core entities.",
    "rationales": [
      "Codes classify values; supplier entities represent core business objects.",
      "Suppliers are master data and invoice lines are transactions.",
      "Transactions and execution logs are not the requested pair.",
      "An execution log is not reference data."
    ],
    "sources": [
      {
        "title": "DAMA-DMBOK2, second edition (2017)",
        "url": "https://technicspub.com/wp-content/uploads/2023/07/DAMA-DMBOK2.pdf",
        "locator": "Chapter 10; Essential Concepts"
      }
    ],
    "subtopic": "reference-versus-master",
    "family": "reference-versus-master",
    "difficulty": "uncalibrated",
    "reviewStatus": "draft-author-checked",
    "verificationDate": "2026-09-24",
    "editionBasis": "2017; revised-edition completeness not certified",
    "editorialReview": {
      "date": "2026-09-24",
      "method": "same-agent second pass; not independent or blind",
      "status": "retained-draft"
    }
  },
  {
    "id": "CDMP-P-018",
    "d": "MR",
    "t": "s",
    "q": "Two customer records share a name but have different birth dates and addresses. What is the most defensible matching approach?",
    "o": [
      "Merge on normalized name and let the latest record supply the attributes",
      "Evaluate additional identifiers and review uncertain candidate matches",
      "Reject the pair permanently because a demographic field disagrees",
      "Raise the name-match score when both sources classify the party as a customer"
    ],
    "c": [
      1
    ],
    "e": "Matching must balance false matches and missed matches using suitable identifiers and review rules.",
    "rationales": [
      "A shared name alone is insufficient evidence; survivorship cannot repair a false identity match.",
      "Additional evidence and review balance false matches against missed matches.",
      "Conflicts may reflect data errors; permanently rejecting the pair can miss a real match.",
      "A shared entity category is not enough to distinguish two people with the same name."
    ],
    "sources": [
      {
        "title": "DAMA-DMBOK2, second edition (2017)",
        "url": "https://technicspub.com/wp-content/uploads/2023/07/DAMA-DMBOK2.pdf",
        "locator": "Chapter 10; Master Data Management Processing Steps"
      }
    ],
    "subtopic": "entity-match-confidence",
    "family": "entity-match-confidence",
    "difficulty": "uncalibrated",
    "reviewStatus": "draft-author-checked",
    "verificationDate": "2026-09-24",
    "editionBasis": "2017; revised-edition completeness not certified",
    "editorialReview": {
      "date": "2026-09-24",
      "method": "same-agent second pass; not independent or blind",
      "status": "revised-draft"
    }
  },
  {
    "id": "CDMP-P-019",
    "d": "MR",
    "t": "s",
    "q": "An MDM process has matched two records for one supplier, but their addresses conflict. Which rule determines the address selected for the trusted view?",
    "o": [
      "The retention rule specifying when old source files are deleted",
      "The access rule specifying which users may view supplier records",
      "An attribute survivorship rule using agreed source-quality criteria",
      "The entity-matching rule that established the common supplier identity"
    ],
    "c": [
      2
    ],
    "e": "Entity matching and attribute survivorship answer different questions and need explicit rules.",
    "rationales": [
      "File retention does not establish the preferred current address.",
      "Access control governs visibility rather than value selection.",
      "Survivorship determines which value is retained when sources disagree.",
      "Matching establishes identity; it does not by itself select each attribute."
    ],
    "sources": [
      {
        "title": "DAMA-DMBOK2, second edition (2017)",
        "url": "https://technicspub.com/wp-content/uploads/2023/07/DAMA-DMBOK2.pdf",
        "locator": "Chapter 10; Master Data Management Processing Steps"
      }
    ],
    "subtopic": "attribute-survivorship",
    "family": "attribute-survivorship",
    "difficulty": "uncalibrated",
    "reviewStatus": "draft-author-checked",
    "verificationDate": "2026-09-24",
    "editionBasis": "2017; revised-edition completeness not certified",
    "editorialReview": {
      "date": "2026-09-24",
      "method": "same-agent second pass; not independent or blind",
      "status": "retained-draft"
    }
  },
  {
    "id": "CDMP-P-020",
    "d": "MR",
    "t": "s",
    "q": "An organization wants a master index that links customer identities across source systems. Customer attributes must remain in the sources and be retrieved from them, rather than copied into a central master repository. Which MDM architecture is the closest fit?",
    "o": [
      "Transaction hub",
      "Consolidated repository",
      "Independent reporting mart",
      "Registry"
    ],
    "c": [
      3
    ],
    "e": "A registry preserves source-system ownership while providing cross-system identity links.",
    "rationales": [
      "A transaction hub becomes the central system for managing master data.",
      "Consolidation copies master data into a shared repository rather than only indexing sources.",
      "A reporting mart does not provide the required master identity index.",
      "A registry points to records in the source systems."
    ],
    "sources": [
      {
        "title": "DAMA-DMBOK2, second edition (2017)",
        "url": "https://technicspub.com/wp-content/uploads/2023/07/DAMA-DMBOK2.pdf",
        "locator": "Chapter 10; section 1.3.4 Data Sharing Architecture"
      }
    ],
    "subtopic": "registry-mdm-architecture",
    "family": "registry-mdm-architecture",
    "difficulty": "uncalibrated",
    "reviewStatus": "draft-author-checked",
    "verificationDate": "2026-09-24",
    "editionBasis": "2017; revised-edition completeness not certified",
    "editorialReview": {
      "date": "2026-09-24",
      "method": "same-agent second pass; not independent or blind",
      "status": "revised-draft"
    }
  },
  {
    "id": "CDMP-P-021",
    "d": "MD",
    "t": "s",
    "q": "Business leaders need a high-level view of the main business entities and their relationships. Detailed attributes, keys and database choices will be addressed later. Which model best meets the present need?",
    "o": [
      "Conceptual model of the main entities and relationships",
      "Logical model with detailed attributes and candidate keys",
      "Physical model with database columns and access structures",
      "Dimensional model with analytical facts and dimensions"
    ],
    "c": [
      0
    ],
    "e": "The conceptual level supports agreement on business meaning before detailed implementation design.",
    "rationales": [
      "A conceptual model establishes the high-level business entities and relationships.",
      "Logical modeling adds detail beyond the initial high-level agreement requested.",
      "Physical modeling depends on implementation decisions that have not yet been made.",
      "Dimensional modeling organizes analytical data; the request concerns the enterprise business view."
    ],
    "sources": [
      {
        "title": "DAMA-DMBOK2, second edition (2017)",
        "url": "https://technicspub.com/wp-content/uploads/2023/07/DAMA-DMBOK2.pdf",
        "locator": "Chapter 5; section 1.3.5 Data Model Levels of Detail"
      }
    ],
    "subtopic": "conceptual-model",
    "family": "conceptual-model",
    "difficulty": "uncalibrated",
    "reviewStatus": "draft-author-checked",
    "verificationDate": "2026-09-24",
    "editionBasis": "2017; revised-edition completeness not certified",
    "editorialReview": {
      "date": "2026-09-24",
      "method": "same-agent second pass; not independent or blind",
      "status": "revised-draft"
    }
  },
  {
    "id": "CDMP-P-022",
    "d": "MD",
    "t": "s",
    "q": "Each order line belongs to exactly one order. An order must contain at least one order line and may contain several. Which pair of cardinalities expresses both rules?",
    "o": [
      "An order has zero or more lines; a line has exactly one order",
      "An order has one or more lines; a line has exactly one order",
      "An order has exactly one line; a line has one or more orders",
      "An order has one or more lines; a line has zero or one order"
    ],
    "c": [
      1
    ],
    "e": "Cardinality must express the business rule in both directions.",
    "rationales": [
      "This incorrectly permits an order with no lines.",
      "This captures mandatory participation and the one-to-many maximum cardinality.",
      "This reverses the relationship and incorrectly permits a line to belong to several orders.",
      "This incorrectly permits a line without an order."
    ],
    "sources": [
      {
        "title": "DAMA-DMBOK2, second edition (2017)",
        "url": "https://technicspub.com/wp-content/uploads/2023/07/DAMA-DMBOK2.pdf",
        "locator": "Chapter 5; Relationships and Cardinality"
      }
    ],
    "subtopic": "relationship-cardinality",
    "family": "relationship-cardinality",
    "difficulty": "uncalibrated",
    "reviewStatus": "draft-author-checked",
    "verificationDate": "2026-09-24",
    "editionBasis": "2017; revised-edition completeness not certified",
    "editorialReview": {
      "date": "2026-09-24",
      "method": "same-agent second pass; not independent or blind",
      "status": "revised-draft"
    }
  },
  {
    "id": "CDMP-P-023",
    "d": "MD",
    "t": "s",
    "q": "A purchasing table repeats a supplier's current contact address on every item row. Historical shipment addresses are stored separately. Updating some rows leaves conflicting current addresses. Which design change most directly removes the redundancy causing this anomaly?",
    "o": [
      "Add a composite key containing the item identifier and supplier address",
      "Use a trigger to copy each new supplier address to the other item rows",
      "Store current supplier attributes once and reference them from item rows",
      "Store the address as a structured object inside each purchased-item row"
    ],
    "c": [
      2
    ],
    "e": "Normalization organizes attributes around their dependencies so one fact need not be maintained in many rows.",
    "rationales": [
      "A larger key does not remove the repeated supplier fact.",
      "A trigger may synchronize the copies but preserves the redundancy the question asks to remove.",
      "Separating the supplier fact addresses the dependency and eliminates repeated maintenance.",
      "Changing the representation inside each row still repeats the address."
    ],
    "sources": [
      {
        "title": "DAMA-DMBOK2, second edition (2017)",
        "url": "https://technicspub.com/wp-content/uploads/2023/07/DAMA-DMBOK2.pdf",
        "locator": "Chapter 5; Normalization"
      }
    ],
    "subtopic": "normalization-update-anomaly",
    "family": "normalization-update-anomaly",
    "difficulty": "uncalibrated",
    "reviewStatus": "draft-author-checked",
    "verificationDate": "2026-09-24",
    "editionBasis": "2017; revised-edition completeness not certified",
    "editorialReview": {
      "date": "2026-09-24",
      "method": "same-agent second pass; not independent or blind",
      "status": "revised-draft"
    }
  },
  {
    "id": "CDMP-P-024",
    "d": "MD",
    "t": "s",
    "q": "Which decision most specifically belongs in a physical data model?",
    "o": [
      "The enterprise meaning of a customer relationship",
      "The business rule that every order has an owning customer",
      "The scope of the organization's product subject area",
      "The database-specific column types and index definitions"
    ],
    "c": [
      3
    ],
    "e": "Physical models translate business and logical designs into technology-specific structures.",
    "rationales": [
      "Business meaning is established before the physical model.",
      "The relationship rule is a logical business requirement.",
      "Subject-area scope is a higher-level conceptual concern.",
      "Physical modeling specifies implementation structures for the chosen technology."
    ],
    "sources": [
      {
        "title": "DAMA-DMBOK2, second edition (2017)",
        "url": "https://technicspub.com/wp-content/uploads/2023/07/DAMA-DMBOK2.pdf",
        "locator": "Chapter 5; Data Model Levels"
      }
    ],
    "subtopic": "physical-model-details",
    "family": "physical-model-details",
    "difficulty": "uncalibrated",
    "reviewStatus": "draft-author-checked",
    "verificationDate": "2026-09-24",
    "editionBasis": "2017; revised-edition completeness not certified",
    "editorialReview": {
      "date": "2026-09-24",
      "method": "same-agent second pass; not independent or blind",
      "status": "retained-draft"
    }
  },
  {
    "id": "CDMP-P-025",
    "d": "DQ",
    "t": "s",
    "q": "A birth-date value has the required date format and falls within the allowed range, but it is the wrong date for that person. Which distinction best describes the issue?",
    "o": [
      "It can satisfy validity rules while failing accuracy",
      "It can satisfy accuracy while failing validity rules",
      "It must fail completeness because the value is incorrect",
      "It must fail uniqueness because the value is incorrect"
    ],
    "c": [
      0
    ],
    "e": "Validity checks permitted representations or values; accuracy concerns whether a value correctly represents the fact.",
    "rationales": [
      "Conforming to allowed values does not prove correspondence to reality.",
      "The scenario explicitly states that the recorded fact is wrong.",
      "A populated field can be complete yet inaccurate.",
      "No duplicate identity or record is established by the scenario."
    ],
    "sources": [
      {
        "title": "DAMA-DMBOK2, second edition (2017)",
        "url": "https://technicspub.com/wp-content/uploads/2023/07/DAMA-DMBOK2.pdf",
        "locator": "Chapter 13; Data Quality Dimensions"
      },
      {
        "title": "DAMA official revised-edition changes",
        "url": "https://www.damadmbok.org/dmbok2-revisions",
        "locator": "2024 revision: Chapter 13"
      }
    ],
    "subtopic": "validity-versus-accuracy",
    "family": "validity-versus-accuracy",
    "difficulty": "uncalibrated",
    "reviewStatus": "draft-author-checked",
    "verificationDate": "2026-09-24",
    "editionBasis": "2017 plus official 2024 change notes",
    "editorialReview": {
      "date": "2026-09-24",
      "method": "same-agent second pass; not independent or blind",
      "status": "retained-draft"
    }
  },
  {
    "id": "CDMP-P-026",
    "d": "DQ",
    "t": "s",
    "q": "An email address is required only for the 800 customers who opted into email service. Of those, 720 have an address. Another 200 customers did not opt in. What is completeness against this stated requirement?",
    "o": [
      "100%",
      "90%",
      "72%",
      "80%"
    ],
    "c": [
      1
    ],
    "e": "A quality metric needs an explicit rule and applicable population: 720 / 800, not 720 / 1000.",
    "rationales": [
      "Eighty applicable records are missing the required value.",
      "720 divided by the 800 applicable records equals 90%.",
      "This incorrectly includes 200 records to which the requirement does not apply.",
      "This divides applicable records by all records, not populated required values."
    ],
    "sources": [
      {
        "title": "DAMA-DMBOK2, second edition (2017)",
        "url": "https://technicspub.com/wp-content/uploads/2023/07/DAMA-DMBOK2.pdf",
        "locator": "Chapter 13; Effective Data Quality Metrics"
      }
    ],
    "subtopic": "completeness-denominator",
    "family": "completeness-denominator",
    "difficulty": "uncalibrated",
    "reviewStatus": "draft-author-checked",
    "verificationDate": "2026-09-24",
    "editionBasis": "2017; revised-edition completeness not certified",
    "editorialReview": {
      "date": "2026-09-24",
      "method": "same-agent second pass; not independent or blind",
      "status": "retained-draft"
    }
  },
  {
    "id": "CDMP-P-027",
    "d": "DQ",
    "t": "s",
    "q": "A weekly cleanup corrects invalid product codes, but the same errors recur through an entry form. Which action most directly prevents recurrence at that source?",
    "o": [
      "Correct invalid codes in the warehouse after the next scheduled load",
      "Route invalid entries to a daily correction queue for the data steward",
      "Validate selections against the approved code list during data entry",
      "Increase the cleanup frequency and send defect counts to the process owner"
    ],
    "c": [
      2
    ],
    "e": "Corrective work repairs existing defects; preventive controls address their causes.",
    "rationales": [
      "Downstream correction repairs data after the entry form has admitted the defect.",
      "A correction queue handles existing defects rather than preventing entry.",
      "Validation at the originating process prevents that route of recurrence.",
      "More frequent detection and correction leave the entry control unchanged."
    ],
    "sources": [
      {
        "title": "DAMA-DMBOK2, second edition (2017)",
        "url": "https://technicspub.com/wp-content/uploads/2023/07/DAMA-DMBOK2.pdf",
        "locator": "Chapter 13; Preventive Actions and Corrective Actions"
      }
    ],
    "subtopic": "preventive-quality-control",
    "family": "preventive-quality-control",
    "difficulty": "uncalibrated",
    "reviewStatus": "draft-author-checked",
    "verificationDate": "2026-09-24",
    "editionBasis": "2017; revised-edition completeness not certified",
    "editorialReview": {
      "date": "2026-09-24",
      "method": "same-agent second pass; not independent or blind",
      "status": "revised-draft"
    }
  },
  {
    "id": "CDMP-P-028",
    "d": "DQ",
    "t": "s",
    "q": "Three systems show the same customer address, but the customer confirms that it is an old address and all systems should hold the current address. What can be concluded?",
    "o": [
      "The systems are accurate because their address values are consistent",
      "The systems are incomplete because their address values agree",
      "The systems have duplicate customers because their addresses agree",
      "The systems agree, but agreement alone does not establish accuracy"
    ],
    "c": [
      3
    ],
    "e": "Consistency across systems and accuracy against the required real-world fact are separate quality concerns.",
    "rationales": [
      "Agreement among copies is not evidence that the shared fact is correct.",
      "Completeness concerns missing required information, not agreement itself.",
      "Agreement about one customer across systems does not prove duplicate entities.",
      "The common value is still wrong for the required current-address use."
    ],
    "sources": [
      {
        "title": "DAMA-DMBOK2, second edition (2017)",
        "url": "https://technicspub.com/wp-content/uploads/2023/07/DAMA-DMBOK2.pdf",
        "locator": "Chapter 13; Data Quality Dimensions"
      },
      {
        "title": "DAMA official revised-edition changes",
        "url": "https://www.damadmbok.org/dmbok2-revisions",
        "locator": "2024 revision: Chapter 13"
      }
    ],
    "subtopic": "consistency-versus-accuracy",
    "family": "consistency-versus-accuracy",
    "difficulty": "uncalibrated",
    "reviewStatus": "draft-author-checked",
    "verificationDate": "2026-09-24",
    "editionBasis": "2017 plus official 2024 change notes",
    "editorialReview": {
      "date": "2026-09-24",
      "method": "same-agent second pass; not independent or blind",
      "status": "retained-draft"
    }
  },
  {
    "id": "CDMP-P-029",
    "d": "DS",
    "t": "s",
    "q": "A user successfully signs in but is refused access to a restricted payroll table. Which control is responsible for deciding whether that authenticated user may read the table?",
    "o": [
      "Authorization",
      "Authentication",
      "Auditing",
      "Encryption"
    ],
    "c": [
      0
    ],
    "e": "Knowing who a user is and deciding what the user may do are distinct controls.",
    "rationales": [
      "Authorization decides whether an identified user has permission for an action or resource.",
      "Authentication establishes identity; successful sign-in does not grant every permission.",
      "Auditing records or examines activity rather than deciding the access grant.",
      "Encryption protects data representation; it does not by itself assign this user a read privilege."
    ],
    "sources": [
      {
        "title": "DAMA-DMBOK2, second edition (2017)",
        "url": "https://technicspub.com/wp-content/uploads/2023/07/DAMA-DMBOK2.pdf",
        "locator": "Chapter 7; Data Security, Essential Concepts"
      }
    ],
    "subtopic": "authentication-versus-authorization",
    "family": "authentication-versus-authorization",
    "difficulty": "uncalibrated",
    "reviewStatus": "draft-author-checked",
    "verificationDate": "2026-09-24",
    "editionBasis": "2017; revised-edition completeness not certified",
    "editorialReview": {
      "date": "2026-09-24",
      "method": "same-agent second pass; not independent or blind",
      "status": "revised-draft"
    }
  },
  {
    "id": "CDMP-P-030",
    "d": "DS",
    "t": "s",
    "q": "A reporting analyst needs read access to a curated sales view but no ability to edit source transactions. Which grant best follows least privilege?",
    "o": [
      "The same permissions as the integration service that builds the view",
      "Read access to the curated view through an appropriate role",
      "Write access to the source tables in case corrections are needed",
      "Database-owner privileges for the duration of each reporting cycle"
    ],
    "c": [
      1
    ],
    "e": "Access should match the required task and be reviewed as responsibilities change.",
    "rationales": [
      "A service's technical permissions are not a suitable default for an analyst.",
      "It provides the access needed for the task without unnecessary privileges.",
      "The stated job does not require editing source transactions.",
      "Ownership grants much broader authority than reporting needs."
    ],
    "sources": [
      {
        "title": "DAMA-DMBOK2, second edition (2017)",
        "url": "https://technicspub.com/wp-content/uploads/2023/07/DAMA-DMBOK2.pdf",
        "locator": "Chapter 7; Data Security, Access Management"
      }
    ],
    "subtopic": "least-privilege",
    "family": "least-privilege",
    "difficulty": "uncalibrated",
    "reviewStatus": "draft-author-checked",
    "verificationDate": "2026-09-24",
    "editionBasis": "2017; revised-edition completeness not certified",
    "editorialReview": {
      "date": "2026-09-24",
      "method": "same-agent second pass; not independent or blind",
      "status": "retained-draft"
    }
  },
  {
    "id": "CDMP-P-031",
    "d": "SO",
    "t": "s",
    "q": "A transfer transaction must debit one account and credit another. If the credit operation fails, the debit must not remain committed. Which ACID property directly expresses this requirement?",
    "o": [
      "Durability",
      "Consistency",
      "Atomicity",
      "Isolation"
    ],
    "c": [
      2
    ],
    "e": "Atomicity prevents a transaction from leaving only a subset of its intended operations committed.",
    "rationales": [
      "Durability concerns persistence after a transaction commits.",
      "Consistency concerns preservation of defined rules; all-or-nothing completion is specifically atomicity.",
      "Atomicity makes the transaction an all-or-nothing unit.",
      "Isolation concerns interference among concurrent transactions."
    ],
    "sources": [
      {
        "title": "DAMA-DMBOK2, second edition (2017)",
        "url": "https://technicspub.com/wp-content/uploads/2023/07/DAMA-DMBOK2.pdf",
        "locator": "Chapter 6; ACID"
      }
    ],
    "subtopic": "transaction-atomicity",
    "family": "transaction-atomicity",
    "difficulty": "uncalibrated",
    "reviewStatus": "draft-author-checked",
    "verificationDate": "2026-09-24",
    "editionBasis": "2017; revised-edition completeness not certified",
    "editorialReview": {
      "date": "2026-09-24",
      "method": "same-agent second pass; not independent or blind",
      "status": "retained-draft"
    }
  },
  {
    "id": "CDMP-P-032",
    "d": "SO",
    "t": "s",
    "q": "A backup job reports success every night. What additional evidence best demonstrates that the recovery process can meet the organization's needs?",
    "o": [
      "Verification that the backup files pass checksum and readability checks",
      "Confirmation that the backup repository meets its capacity forecast",
      "Review of the documented recovery runbook with the operations team",
      "A timed restore verifying recovered data against recovery objectives"
    ],
    "c": [
      3
    ],
    "e": "Backup creation and successful recovery are different outcomes; recovery needs testing.",
    "rationales": [
      "Readable backup files are useful evidence but do not demonstrate successful end-to-end recovery.",
      "Adequate capacity supports retention but does not prove recovery capability.",
      "A runbook review can find gaps but cannot demonstrate actual restoration.",
      "A restore exercise tests the recovered data and elapsed time against the required objectives."
    ],
    "sources": [
      {
        "title": "DAMA-DMBOK2, second edition (2017)",
        "url": "https://technicspub.com/wp-content/uploads/2023/07/DAMA-DMBOK2.pdf",
        "locator": "Chapter 6; sections 2.2.2.1 Make Backups and 2.2.2.2 Recover Data"
      }
    ],
    "subtopic": "backup-restore-verification",
    "family": "backup-restore-verification",
    "difficulty": "uncalibrated",
    "reviewStatus": "draft-author-checked",
    "verificationDate": "2026-09-24",
    "editionBasis": "2017; revised-edition completeness not certified",
    "editorialReview": {
      "date": "2026-09-24",
      "method": "same-agent second pass; not independent or blind",
      "status": "revised-draft"
    }
  },
  {
    "id": "CDMP-P-033",
    "d": "BI",
    "t": "s",
    "q": "A sales fact table is intended to contain one row per order line. What does this statement define?",
    "o": [
      "The grain of the fact table",
      "The aggregation method for its measures",
      "The natural key of the customer dimension",
      "The refresh frequency of the sales partition"
    ],
    "c": [
      0
    ],
    "e": "Declaring grain prevents incompatible levels of detail from being mixed in one fact structure.",
    "rationales": [
      "Grain states what a row represents, here one order line.",
      "Aggregation specifies how measures combine across rows rather than what one row represents.",
      "Customer identification does not define the order-line level of the facts.",
      "Refresh frequency describes timing rather than row-level detail."
    ],
    "sources": [
      {
        "title": "DAMA-DMBOK2, second edition (2017)",
        "url": "https://technicspub.com/wp-content/uploads/2023/07/DAMA-DMBOK2.pdf",
        "locator": "Chapter 5; section 1.3.4.2.4 Grain; Chapter 11, DW/BI"
      }
    ],
    "subtopic": "fact-table-grain",
    "family": "fact-table-grain",
    "difficulty": "uncalibrated",
    "reviewStatus": "draft-author-checked",
    "verificationDate": "2026-09-24",
    "editionBasis": "2017; revised-edition completeness not certified",
    "editorialReview": {
      "date": "2026-09-24",
      "method": "same-agent second pass; not independent or blind",
      "status": "revised-draft"
    }
  },
  {
    "id": "CDMP-P-034",
    "d": "BI",
    "t": "s",
    "q": "Sales and Returns marts need comparable reporting by product category. Which design best supports consistent cross-mart analysis?",
    "o": [
      "Matching surrogate-key data types in independently defined product dimensions",
      "Product dimensions with conformed category definitions and values",
      "Matching refresh schedules for marts with different category hierarchies",
      "Shared display labels while each mart retains its own category boundaries"
    ],
    "c": [
      1
    ],
    "e": "Conformed dimensions support integration through consistent attributes and values.",
    "rationales": [
      "Compatible key types do not make the underlying categories equivalent.",
      "Conformed meanings and values support comparable analysis across the marts.",
      "Synchronized refreshes do not resolve incompatible category definitions.",
      "Common labels can hide differing classifications and yield misleading comparisons."
    ],
    "sources": [
      {
        "title": "DAMA-DMBOK2, second edition (2017)",
        "url": "https://technicspub.com/wp-content/uploads/2023/07/DAMA-DMBOK2.pdf",
        "locator": "Chapter 5; section 1.3.4.2.5 Conformed Dimensions; Chapter 11, DW/BI"
      }
    ],
    "subtopic": "conformed-dimensions",
    "family": "conformed-dimensions",
    "difficulty": "uncalibrated",
    "reviewStatus": "draft-author-checked",
    "verificationDate": "2026-09-24",
    "editionBasis": "2017; revised-edition completeness not certified",
    "editorialReview": {
      "date": "2026-09-24",
      "method": "same-agent second pass; not independent or blind",
      "status": "revised-draft"
    }
  },
  {
    "id": "CDMP-P-035",
    "d": "BI",
    "t": "s",
    "q": "Customer regions can change repeatedly. Analysts need every sale attributed to the region that applied when it occurred, retaining the complete succession of region versions. Which dimension design most directly supports this?",
    "o": [
      "Overwrite the dimension region after recording its change in the load log",
      "Add one previous-region column beside the current region on the same row",
      "Create a dimension row per tracked change and link each sale to its applicable version",
      "Keep one current dimension row and recalculate prior sales with its latest region"
    ],
    "c": [
      2
    ],
    "e": "A Type 2 slowly changing dimension retains a row for each tracked version. Effective periods and correct fact-to-version links preserve the region applicable to each sale.",
    "rationales": [
      "A load log is not the modeled succession of dimension versions requested.",
      "A single previous-value column preserves limited history rather than all successive versions.",
      "Type 2 keeps successive versions; facts must reference the version applicable to the sale.",
      "Applying the current region restates history instead of preserving historical attribution."
    ],
    "sources": [
      {
        "title": "DAMA-DMBOK2, second edition (2017)",
        "url": "https://technicspub.com/wp-content/uploads/2023/07/DAMA-DMBOK2.pdf",
        "locator": "Chapter 5; section 1.3.4.2.2 Dimension Tables; Chapter 11, DW/BI"
      }
    ],
    "subtopic": "slowly-changing-type-two",
    "family": "slowly-changing-type-two",
    "difficulty": "uncalibrated",
    "reviewStatus": "draft-author-checked",
    "verificationDate": "2026-09-24",
    "editionBasis": "2017; revised-edition completeness not certified",
    "editorialReview": {
      "date": "2026-09-24",
      "method": "same-agent second pass; not independent or blind",
      "status": "revised-draft"
    }
  },
  {
    "id": "CDMP-P-036",
    "d": "BI",
    "t": "s",
    "q": "Which requirement most directly motivates an integrated data warehouse?",
    "o": [
      "Low-latency updates to the current stock balance in a transaction system",
      "Message routing between applications that use different payload formats",
      "Central ownership of current customer identities across source applications",
      "Consistent historical analysis across operational business processes"
    ],
    "c": [
      3
    ],
    "e": "DW/BI turns data from operational and other sources into information suitable for analytical decisions.",
    "rationales": [
      "This primarily motivates transactional processing rather than a historical analytical store.",
      "This primarily motivates integration and interoperability capabilities.",
      "This primarily motivates master-data management and identity reconciliation.",
      "Integration and history across business processes are central warehouse capabilities."
    ],
    "sources": [
      {
        "title": "DAMA-DMBOK2, second edition (2017)",
        "url": "https://technicspub.com/wp-content/uploads/2023/07/DAMA-DMBOK2.pdf",
        "locator": "Chapter 11; Data Warehousing and Business Intelligence"
      }
    ],
    "subtopic": "warehouse-purpose",
    "family": "warehouse-purpose",
    "difficulty": "uncalibrated",
    "reviewStatus": "draft-author-checked",
    "verificationDate": "2026-09-24",
    "editionBasis": "2017; revised-edition completeness not certified",
    "editorialReview": {
      "date": "2026-09-24",
      "method": "same-agent second pass; not independent or blind",
      "status": "revised-draft"
    }
  },
  {
    "id": "CDMP-P-037",
    "d": "MM",
    "t": "s",
    "q": "A report consumer asks what net revenue means and which exclusions its calculation applies. Which metadata is most directly needed?",
    "o": [
      "The approved metric definition, including calculation and exclusions",
      "The refresh timestamps and row counts from the last successful load",
      "The physical table and column names used by the revenue report",
      "The access classification and authorized audience for the report"
    ],
    "c": [
      0
    ],
    "e": "Business metadata enables a consumer to interpret the information correctly.",
    "rationales": [
      "The metric definition provides the business meaning and calculation scope.",
      "Execution evidence describes freshness and processing, not the meaning of net revenue.",
      "Physical names may locate data but do not by themselves document the exclusions.",
      "Access metadata identifies permitted use, not the metric calculation."
    ],
    "sources": [
      {
        "title": "DAMA-DMBOK2, second edition (2017)",
        "url": "https://technicspub.com/wp-content/uploads/2023/07/DAMA-DMBOK2.pdf",
        "locator": "Chapter 12; section 1.3.2.1 Business Metadata"
      }
    ],
    "subtopic": "business-metadata",
    "family": "business-metadata",
    "difficulty": "uncalibrated",
    "reviewStatus": "draft-author-checked",
    "verificationDate": "2026-09-24",
    "editionBasis": "2017; revised-edition completeness not certified",
    "editorialReview": {
      "date": "2026-09-24",
      "method": "same-agent second pass; not independent or blind",
      "status": "revised-draft"
    }
  },
  {
    "id": "CDMP-P-038",
    "d": "MM",
    "t": "s",
    "q": "An engineer investigates whether last night's customer import ran, how many records it processed and which errors occurred. Which metadata category most directly contains this evidence?",
    "o": [
      "Reference-data code descriptions",
      "Operational metadata",
      "Business glossary definitions",
      "Conceptual entity definitions"
    ],
    "c": [
      1
    ],
    "e": "Operational metadata records what happened when data was processed or accessed.",
    "rationales": [
      "Code descriptions do not establish processing outcomes.",
      "Execution logs and processing results are operational metadata.",
      "Business definitions explain meaning rather than this execution.",
      "Entity definitions do not record a specific job run."
    ],
    "sources": [
      {
        "title": "DAMA-DMBOK2, second edition (2017)",
        "url": "https://technicspub.com/wp-content/uploads/2023/07/DAMA-DMBOK2.pdf",
        "locator": "Chapter 12; section 1.3.2.3 Operational Metadata"
      }
    ],
    "subtopic": "operational-metadata",
    "family": "operational-metadata",
    "difficulty": "uncalibrated",
    "reviewStatus": "draft-author-checked",
    "verificationDate": "2026-09-24",
    "editionBasis": "2017; revised-edition completeness not certified",
    "editorialReview": {
      "date": "2026-09-24",
      "method": "same-agent second pass; not independent or blind",
      "status": "retained-draft"
    }
  },
  {
    "id": "CDMP-P-039",
    "d": "MM",
    "t": "s",
    "q": "An auditor asks which source records and transformations produced a reported total. Which investigation is most directly required?",
    "o": [
      "Review the glossary entry defining what the reported total means",
      "Reconcile the report total to a separately produced control total",
      "Trace the report's lineage to contributing sources and transformations",
      "Inspect the successful-run record for the report-refresh process"
    ],
    "c": [
      2
    ],
    "e": "Lineage links a result to the sources and transformations contributing to it.",
    "rationales": [
      "The definition explains intended meaning but does not trace the implemented derivation.",
      "Reconciliation can detect disagreement without identifying the records and transformations involved.",
      "Backward lineage supports tracing derivation; available detail depends on lineage coverage.",
      "A successful refresh status does not document the complete derivation path."
    ],
    "sources": [
      {
        "title": "DAMA-DMBOK2, second edition (2017)",
        "url": "https://technicspub.com/wp-content/uploads/2023/07/DAMA-DMBOK2.pdf",
        "locator": "Chapter 12; section 4.1 Data Lineage and Impact Analysis"
      }
    ],
    "subtopic": "backward-lineage",
    "family": "backward-lineage",
    "difficulty": "uncalibrated",
    "reviewStatus": "draft-author-checked",
    "verificationDate": "2026-09-24",
    "editionBasis": "2017; revised-edition completeness not certified",
    "editorialReview": {
      "date": "2026-09-24",
      "method": "same-agent second pass; not independent or blind",
      "status": "revised-draft"
    }
  },
  {
    "id": "CDMP-P-040",
    "d": "MM",
    "t": "s",
    "q": "A source team plans to change the meaning of a field used by several downstream pipelines. What should be checked before implementing the change?",
    "o": [
      "Verify that the existing field passes its current type and format rules",
      "Compare the proposed definition with the source team's glossary entry",
      "Confirm that the scheduled source load still completes successfully",
      "Identify dependent transformations and consumers and assess their use"
    ],
    "c": [
      3
    ],
    "e": "Lineage supports change management by identifying where a source change can propagate.",
    "rationales": [
      "Representation checks can pass even when changed meaning breaks downstream assumptions.",
      "A definition comparison helps understand the change but does not identify affected consumers.",
      "Successful execution does not demonstrate continued semantic compatibility.",
      "Forward impact analysis identifies the dependencies requiring assessment and coordinated changes."
    ],
    "sources": [
      {
        "title": "DAMA-DMBOK2, second edition (2017)",
        "url": "https://technicspub.com/wp-content/uploads/2023/07/DAMA-DMBOK2.pdf",
        "locator": "Chapter 12; section 4.1 Data Lineage and Impact Analysis"
      }
    ],
    "subtopic": "forward-impact-analysis",
    "family": "forward-impact-analysis",
    "difficulty": "uncalibrated",
    "reviewStatus": "draft-author-checked",
    "verificationDate": "2026-09-24",
    "editionBasis": "2017; revised-edition completeness not certified",
    "editorialReview": {
      "date": "2026-09-24",
      "method": "same-agent second pass; not independent or blind",
      "status": "revised-draft"
    }
  }
] }));
