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
    "editionBasis": "2017; revised-edition completeness not certified"
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
    "editionBasis": "2017; revised-edition completeness not certified"
  },
  {
    "id": "CDMP-P-003",
    "d": "DA",
    "t": "s",
    "q": "Two acquired businesses maintain incompatible customer structures. Before sequencing architecture changes, which comparison is most useful?",
    "o": [
      "Current server utilization against vendor benchmark scores",
      "Current report counts against the number of developers",
      "Current data capabilities against the required target state",
      "Current database prices against the annual training budget"
    ],
    "c": [
      2
    ],
    "e": "An architecture roadmap should address gaps between the documented current environment and business-driven target capabilities.",
    "rationales": [
      "Infrastructure benchmarks do not reveal differences in customer structures.",
      "These counts do not establish the required future data capabilities.",
      "Comparing current and target states identifies gaps that the roadmap must close.",
      "Cost matters later but does not describe the architectural gaps."
    ],
    "sources": [
      {
        "title": "DAMA-DMBOK2, second edition (2017)",
        "url": "https://technicspub.com/wp-content/uploads/2023/07/DAMA-DMBOK2.pdf",
        "locator": "Chapter 4; section 2.1 Establish Data Architecture Practice"
      }
    ],
    "subtopic": "architecture-gap-analysis",
    "family": "architecture-gap-analysis",
    "difficulty": "uncalibrated",
    "reviewStatus": "draft-author-checked",
    "verificationDate": "2026-09-24",
    "editionBasis": "2017; revised-edition completeness not certified"
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
        "locator": "Chapter 4; Essential Concepts"
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
    "editionBasis": "2017 plus official 2024 change notes"
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
        "title": "DAMA-DMBOK2, second edition (2017)",
        "url": "https://technicspub.com/wp-content/uploads/2023/07/DAMA-DMBOK2.pdf",
        "locator": "Chapter 4; Essential Concepts"
      },
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
    "editionBasis": "2017 plus official 2024 change notes"
  },
  {
    "id": "CDMP-P-006",
    "d": "DC",
    "t": "s",
    "q": "A team keeps emailing copies of a procedure and cannot tell which revision was approved. Which capability most directly addresses the problem?",
    "o": [
      "A search engine that ranks the most frequently opened file",
      "Version control linked to approval status and revision history",
      "A larger mailbox quota for each procedure author",
      "An additional backup copy of every email attachment"
    ],
    "c": [
      1
    ],
    "e": "Controlled versions and approval metadata make the authoritative document identifiable.",
    "rationales": [
      "Popularity is not evidence that a version is approved.",
      "This distinguishes approved revisions and records controlled changes.",
      "More storage does not establish an authoritative revision.",
      "Backup preserves copies but does not determine approval status."
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
    "editionBasis": "2017; revised-edition completeness not certified"
  },
  {
    "id": "CDMP-P-007",
    "d": "DC",
    "t": "s",
    "q": "An organization has an approved retention schedule and a documented process for suspending disposal when required. How should disposal of managed records be controlled?",
    "o": [
      "Let each file creator set disposal timing without recording a reason",
      "Keep records until a newer file with a similar title is available",
      "Check retention eligibility and applicable holds before approved disposal",
      "Delete records when their storage tier reaches its capacity threshold"
    ],
    "c": [
      2
    ],
    "e": "Retention and disposition controls need to distinguish eligible records from records whose disposal is suspended.",
    "rationales": [
      "Uncontrolled personal choices undermine consistent records management.",
      "A similar title does not establish that an existing record may be disposed of.",
      "Disposition must follow the schedule and any active restrictions.",
      "Storage pressure is not a substitute for a retention decision."
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
    "editionBasis": "2017; revised-edition completeness not certified"
  },
  {
    "id": "CDMP-P-008",
    "d": "DC",
    "t": "s",
    "q": "Employees file the same kind of document under Sales, Commercial and Revenue, making retrieval inconsistent. Which intervention most directly improves classification?",
    "o": [
      "A separate storage volume for every department's preferred terms",
      "A requirement to place creation dates at the start of filenames",
      "A larger full-text index with the existing classifications unchanged",
      "A controlled taxonomy with agreed categories and indexing rules"
    ],
    "c": [
      3
    ],
    "e": "Taxonomies organize content using controlled categories that support consistent classification and retrieval.",
    "rationales": [
      "Separating storage preserves the terminology conflict.",
      "Dates support identification but do not standardize subject categories.",
      "A larger index does not resolve inconsistent classification rules.",
      "A controlled classification structure makes categorization consistent."
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
    "editionBasis": "2017; revised-edition completeness not certified"
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
    "editionBasis": "2017; revised-edition completeness not certified"
  },
  {
    "id": "CDMP-P-010",
    "d": "DG",
    "t": "s",
    "q": "A customer-data domain needs someone accountable for decisions about its permitted business uses and definitions. Which role is the best fit?",
    "o": [
      "The analyst who most recently exported the data",
      "The business data owner for that domain",
      "The administrator who installs database updates",
      "The developer who maintains the loading script"
    ],
    "c": [
      1
    ],
    "e": "Assign domain decision accountability explicitly to a business data owner.",
    "rationales": [
      "Recent access does not establish accountability.",
      "The revised definition makes the data owner accountable for domain decisions.",
      "Technical maintenance does not confer business decision authority.",
      "Implementation responsibility does not by itself confer ownership."
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
    "editionBasis": "2017 plus official 2024 change notes"
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
    "editionBasis": "2017; revised-edition completeness not certified"
  },
  {
    "id": "CDMP-P-012",
    "d": "DG",
    "t": "s",
    "q": "Two domain teams cannot agree which definition should govern a shared enterprise measure. The established governance process assigns cross-domain disputes to a council. What should the stewards do next?",
    "o": [
      "Allow whichever team publishes first to establish the enterprise definition",
      "Maintain both definitions under the same name without recording the conflict",
      "Ask the database vendor to select the preferred business interpretation",
      "Escalate the documented issue and its business impacts to the council"
    ],
    "c": [
      3
    ],
    "e": "Escalate unresolved issues through the agreed authority structure with enough context for an informed decision.",
    "rationales": [
      "Publication order does not establish governance authority.",
      "Unrecorded ambiguity prevents consistent interpretation.",
      "A technology vendor cannot determine the organization's business decision rights.",
      "The council is the defined decision authority for this unresolved dispute."
    ],
    "sources": [
      {
        "title": "DAMA-DMBOK2, second edition (2017)",
        "url": "https://technicspub.com/wp-content/uploads/2023/07/DAMA-DMBOK2.pdf",
        "locator": "Chapter 3; section 2.6 Develop Issue Management"
      }
    ],
    "subtopic": "issue-escalation",
    "family": "issue-escalation",
    "difficulty": "uncalibrated",
    "reviewStatus": "draft-author-checked",
    "verificationDate": "2026-09-24",
    "editionBasis": "2017; revised-edition completeness not certified"
  },
  {
    "id": "CDMP-P-013",
    "d": "DG",
    "t": "s",
    "q": "Finance and Sales use different meanings of active customer. What makes a glossary entry useful for resolving the ambiguity?",
    "o": [
      "An agreed definition with scope, ownership and approval recorded",
      "A list of every database column named customer across the source systems",
      "A count of how often each team has used the disputed phrase",
      "An automatically chosen definition based on the longest description"
    ],
    "c": [
      0
    ],
    "e": "A business glossary should capture governed meaning rather than simply collect labels.",
    "rationales": [
      "Meaning, scope and accountability make the definition governable.",
      "Technical names can be linked later but do not settle business meaning.",
      "Usage frequency does not establish a shared definition.",
      "Length is not a measure of correctness or organizational agreement."
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
    "editionBasis": "2017; revised-edition completeness not certified"
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
    "editionBasis": "2017; revised-edition completeness not certified"
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
    "editionBasis": "2017; revised-edition completeness not certified"
  },
  {
    "id": "CDMP-P-016",
    "d": "DI",
    "t": "s",
    "q": "Two systems both store status code A. In one it means active; in the other it means archived. What must the integration design establish before combining these fields?",
    "o": [
      "A rule treating equal source strings as equal business concepts",
      "A shared text encoding for the two source columns alone",
      "A larger character limit for the combined status column",
      "A mapping based on the business meaning of each source value"
    ],
    "c": [
      3
    ],
    "e": "Interoperability requires compatible meaning as well as technically compatible formats.",
    "rationales": [
      "String equality is not semantic equivalence.",
      "Encoding addresses representation, not the business definition.",
      "Column width does not resolve contradictory meanings.",
      "Semantic mapping distinguishes identical codes with different meanings."
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
    "editionBasis": "2017; revised-edition completeness not certified"
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
    "editionBasis": "2017; revised-edition completeness not certified"
  },
  {
    "id": "CDMP-P-018",
    "d": "MR",
    "t": "s",
    "q": "Two customer records share a name but have different birth dates and addresses. What is the most defensible matching approach?",
    "o": [
      "Select the more recently loaded record and discard the other identity",
      "Evaluate additional identifiers and route uncertain matches for review",
      "Merge the records because matching names establish identity",
      "Keep every record separate even when stronger identifiers agree"
    ],
    "c": [
      1
    ],
    "e": "Matching must balance false matches and missed matches using suitable identifiers and review rules.",
    "rationales": [
      "Load time does not establish that two identities are equivalent.",
      "Evidence-based matching manages the risk of false merges.",
      "Names alone are insufficient evidence of identity.",
      "Never linking records would also defeat justified reconciliation."
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
    "editionBasis": "2017; revised-edition completeness not certified"
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
    "editionBasis": "2017; revised-edition completeness not certified"
  },
  {
    "id": "CDMP-P-020",
    "d": "MR",
    "t": "s",
    "q": "An organization wants a master index that links customer records while source applications continue managing their own data. Which MDM architecture is the closest fit?",
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
    "editionBasis": "2017; revised-edition completeness not certified"
  },
  {
    "id": "CDMP-P-021",
    "d": "MD",
    "t": "s",
    "q": "Business leaders want to agree on the major entities and relationships before choosing database structures. Which model level is the most appropriate starting point?",
    "o": [
      "Conceptual",
      "Physical",
      "Storage allocation",
      "Execution plan"
    ],
    "c": [
      0
    ],
    "e": "The conceptual level supports agreement on business meaning before detailed implementation design.",
    "rationales": [
      "Conceptual models express the principal business concepts and relationships.",
      "Physical models include implementation details that are premature here.",
      "Storage allocation concerns implementation capacity.",
      "An execution plan describes how a query runs."
    ],
    "sources": [
      {
        "title": "DAMA-DMBOK2, second edition (2017)",
        "url": "https://technicspub.com/wp-content/uploads/2023/07/DAMA-DMBOK2.pdf",
        "locator": "Chapter 5; Data Model Levels"
      }
    ],
    "subtopic": "conceptual-model",
    "family": "conceptual-model",
    "difficulty": "uncalibrated",
    "reviewStatus": "draft-author-checked",
    "verificationDate": "2026-09-24",
    "editionBasis": "2017; revised-edition completeness not certified"
  },
  {
    "id": "CDMP-P-022",
    "d": "MD",
    "t": "s",
    "q": "Each order line belongs to exactly one order, and each order may have several order lines. How should the relationship be represented?",
    "o": [
      "Many orders to many order lines",
      "One order to many order lines",
      "Many orders to one order line",
      "One order to exactly one order line"
    ],
    "c": [
      1
    ],
    "e": "Cardinality must express the business rule in both directions.",
    "rationales": [
      "That would allow a line to belong to multiple orders.",
      "This captures multiple lines per order and a single parent order per line.",
      "That reverses the stated relationship.",
      "That would prevent an order from containing multiple lines."
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
    "editionBasis": "2017; revised-edition completeness not certified"
  },
  {
    "id": "CDMP-P-023",
    "d": "MD",
    "t": "s",
    "q": "A relational table repeats a supplier's address on every purchased item row. Updating only some rows leaves conflicting addresses. Which design change most directly addresses this anomaly?",
    "o": [
      "Sort the purchased items by supplier address before each update",
      "Increase the transaction timeout for all item updates",
      "Store supplier attributes once and reference them from item rows",
      "Add an index to every repeated supplier-address column"
    ],
    "c": [
      2
    ],
    "e": "Normalization organizes attributes around their dependencies so one fact need not be maintained in many rows.",
    "rationales": [
      "Sort order does not enforce consistent supplier data.",
      "A timeout change does not repair the model's dependency problem.",
      "Separating supplier facts reduces redundant copies and update anomalies.",
      "Indexes improve access paths but do not remove redundant facts."
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
    "editionBasis": "2017; revised-edition completeness not certified"
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
    "editionBasis": "2017; revised-edition completeness not certified"
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
    "editionBasis": "2017 plus official 2024 change notes"
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
    "editionBasis": "2017; revised-edition completeness not certified"
  },
  {
    "id": "CDMP-P-027",
    "d": "DQ",
    "t": "s",
    "q": "A weekly cleanup corrects invalid product codes, but the same errors recur through an entry form. Which action most directly prevents recurrence at that source?",
    "o": [
      "Hide invalid rows from the management dashboard",
      "Increase the retention period of the cleanup job logs",
      "Validate selections against the approved code list in the entry process",
      "Run the existing cleanup twice each week instead of once"
    ],
    "c": [
      2
    ],
    "e": "Corrective work repairs existing defects; preventive controls address their causes.",
    "rationales": [
      "Filtering hides symptoms without improving the source data.",
      "Longer logs may aid investigation but do not prevent invalid entry.",
      "A source control stops that class of invalid value from entering.",
      "More frequent correction still permits repeated introduction of the error."
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
    "editionBasis": "2017; revised-edition completeness not certified"
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
    "editionBasis": "2017 plus official 2024 change notes"
  },
  {
    "id": "CDMP-P-029",
    "d": "DS",
    "t": "s",
    "q": "A user successfully signs in but is refused access to a restricted payroll table. Which control is responsible for deciding whether that authenticated user may read the table?",
    "o": [
      "Authorization",
      "Authentication",
      "Compression",
      "Replication"
    ],
    "c": [
      0
    ],
    "e": "Knowing who a user is and deciding what the user may do are distinct controls.",
    "rationales": [
      "Authorization determines permitted actions on resources.",
      "Authentication establishes identity rather than each data permission.",
      "Compression changes representation size, not access rights.",
      "Replication copies data and is not the permission decision."
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
    "editionBasis": "2017; revised-edition completeness not certified"
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
    "editionBasis": "2017; revised-edition completeness not certified"
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
    "editionBasis": "2017; revised-edition completeness not certified"
  },
  {
    "id": "CDMP-P-032",
    "d": "SO",
    "t": "s",
    "q": "A backup job reports success every night. What additional evidence best demonstrates that the recovery process can meet the organization's needs?",
    "o": [
      "A screenshot showing that the backup scheduler is enabled",
      "A larger number of files in the backup destination directory",
      "A report showing that the database vendor supports backups",
      "A tested restore that verifies recovered data and measures recovery time"
    ],
    "c": [
      3
    ],
    "e": "Backup creation and successful recovery are different outcomes; recovery needs testing.",
    "rationales": [
      "Scheduling shows configuration, not recoverability.",
      "File counts do not establish integrity or restore performance.",
      "A supported feature does not prove that the organization's implementation works.",
      "A restore exercise tests usability and operational recovery capability."
    ],
    "sources": [
      {
        "title": "DAMA-DMBOK2, second edition (2017)",
        "url": "https://technicspub.com/wp-content/uploads/2023/07/DAMA-DMBOK2.pdf",
        "locator": "Chapter 6; Manage Databases, Backup and Recovery"
      }
    ],
    "subtopic": "backup-restore-verification",
    "family": "backup-restore-verification",
    "difficulty": "uncalibrated",
    "reviewStatus": "draft-author-checked",
    "verificationDate": "2026-09-24",
    "editionBasis": "2017; revised-edition completeness not certified"
  },
  {
    "id": "CDMP-P-033",
    "d": "BI",
    "t": "s",
    "q": "A sales fact table is intended to contain one row per order line. What does this statement define?",
    "o": [
      "The grain of the fact table",
      "The refresh interval of the warehouse",
      "The data retention period",
      "The order in which indexes are rebuilt"
    ],
    "c": [
      0
    ],
    "e": "Declaring grain prevents incompatible levels of detail from being mixed in one fact structure.",
    "rationales": [
      "Grain defines what a single fact row represents.",
      "Refresh interval determines when data is updated.",
      "Retention determines how long data is kept.",
      "Index maintenance is an implementation operation."
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
    "editionBasis": "2017; revised-edition completeness not certified"
  },
  {
    "id": "CDMP-P-034",
    "d": "BI",
    "t": "s",
    "q": "Sales and Returns marts need comparable reporting by product category. Which design best supports consistent cross-mart analysis?",
    "o": [
      "A rule requiring every fact table to have the same number of columns",
      "Shared product dimensions with consistent category definitions and values",
      "Separate product categories designed independently by each reporting team",
      "Identical dashboard colors for otherwise different product classifications"
    ],
    "c": [
      1
    ],
    "e": "Conformed dimensions support integration through consistent attributes and values.",
    "rationales": [
      "Column counts do not determine whether dimensions mean the same thing.",
      "Conformed dimensions provide common meaning across dimensional models.",
      "Independent definitions can make comparisons misleading.",
      "Visual consistency does not establish semantic consistency."
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
    "editionBasis": "2017; revised-edition completeness not certified"
  },
  {
    "id": "CDMP-P-035",
    "d": "BI",
    "t": "s",
    "q": "Analysts need sales attributed to the customer region that applied when each sale occurred. Which dimension-change approach most directly preserves successive historical versions?",
    "o": [
      "Keep the current region and remove the earlier region values",
      "Recalculate every past sale using the customer's latest region",
      "Create a new dimension row for each tracked change, with its effective period",
      "Overwrite the old region value in the existing dimension row"
    ],
    "c": [
      2
    ],
    "e": "A Type 2 slowly changing dimension preserves history through new rows rather than overwriting old values.",
    "rationales": [
      "Keeping only the latest value cannot support the requested history.",
      "Restating all sales to the latest region answers a different analytical question.",
      "Type 2 records successive versions so facts can reference the appropriate historical state.",
      "Overwriting loses the prior state unless another history mechanism exists."
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
    "editionBasis": "2017; revised-edition completeness not certified"
  },
  {
    "id": "CDMP-P-036",
    "d": "BI",
    "t": "s",
    "q": "Which requirement most directly motivates an integrated data warehouse?",
    "o": [
      "Immediate validation of every keystroke in a transaction-entry screen",
      "Exclusive management of identity credentials for all applications",
      "Replacement of every operational system with one reporting dashboard",
      "Consistent historical analysis across several operational business processes"
    ],
    "c": [
      3
    ],
    "e": "DW/BI turns data from operational and other sources into information suitable for analytical decisions.",
    "rationales": [
      "Transaction-screen validation is primarily an operational application responsibility.",
      "Identity management is a security capability.",
      "A warehouse supports analysis and does not inherently replace operational systems.",
      "An integrated warehouse supports cross-process analytical use and history."
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
    "editionBasis": "2017; revised-edition completeness not certified"
  },
  {
    "id": "CDMP-P-037",
    "d": "MM",
    "t": "s",
    "q": "A report consumer asks what net revenue means and which exclusions its calculation applies. Which metadata is most directly needed?",
    "o": [
      "The business definition and calculation rule",
      "The physical disk location of the report file",
      "The last database patch installation identifier",
      "The operating-system process number of the refresh job"
    ],
    "c": [
      0
    ],
    "e": "Business metadata enables a consumer to interpret the information correctly.",
    "rationales": [
      "Business metadata explains meaning and derivation.",
      "Disk location does not explain the metric.",
      "Patch identifiers describe technical operations.",
      "A process identifier does not define revenue exclusions."
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
    "editionBasis": "2017; revised-edition completeness not certified"
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
    "editionBasis": "2017; revised-edition completeness not certified"
  },
  {
    "id": "CDMP-P-039",
    "d": "MM",
    "t": "s",
    "q": "An auditor asks which source records and transformations produced a reported total. Which investigation is most directly required?",
    "o": [
      "List the retention policies for unrelated source systems",
      "Compare dashboard response times across departments",
      "Trace lineage backward from the report to its sources",
      "Count the users who have permission to open the report"
    ],
    "c": [
      2
    ],
    "e": "Lineage links a result to the sources and transformations contributing to it.",
    "rationales": [
      "Unrelated retention policies do not describe this data path.",
      "Response time does not establish provenance.",
      "Backward lineage explains provenance and transformation of the reported value.",
      "Access lists do not establish how a total was derived."
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
    "editionBasis": "2017; revised-edition completeness not certified"
  },
  {
    "id": "CDMP-P-040",
    "d": "MM",
    "t": "s",
    "q": "A source team plans to change the meaning of a field used by several downstream pipelines. What should be checked before implementing the change?",
    "o": [
      "Only whether the source column name will stay the same",
      "Only whether the source database has enough free storage",
      "The number of characters in the proposed business definition",
      "The downstream dependencies and consumers identified through lineage"
    ],
    "c": [
      3
    ],
    "e": "Lineage supports change management by identifying where a source change can propagate.",
    "rationales": [
      "Unchanged names can conceal changed semantics.",
      "Capacity does not reveal semantic impacts on consumers.",
      "Definition length is unrelated to the dependency impact.",
      "Forward impact analysis identifies consumers that may need coordinated changes."
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
    "editionBasis": "2017; revised-edition completeness not certified"
  }
] }));
