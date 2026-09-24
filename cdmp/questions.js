// Original draft pilot. No book text or official exam items are bundled.
registerCourse(Object.assign({}, CDMPConfig.pilot, { questions: [
  {
    "id": "CDMP-P-001",
    "d": "DM",
    "t": "s",
    "q": "In the DAMA framework, what occupies the center of the Wheel and the Environmental Factors hexagon, respectively?",
    "o": [
      "Data Governance; goals and principles",
      "Data Quality; activities and deliverables",
      "Goals and principles; Data Governance",
      "Data Architecture; people and technology"
    ],
    "c": [
      0
    ],
    "e": "The visuals serve different purposes: the Wheel positions governance among knowledge areas, while the hexagon relates the environmental factors to goals and principles.",
    "rationales": [
      "The Wheel organizes knowledge areas around governance; the hexagon organizes environmental factors around goals and principles.",
      "Quality is a knowledge area; activities and deliverables are not the hexagon center.",
      "This reverses the two central concepts.",
      "Architecture is a knowledge area; people and technology are environmental factors rather than the central guidance."
    ],
    "sources": [
      {
        "title": "DAMA-DMBOK2, second edition (2017)",
        "url": "https://technicspub.com/wp-content/uploads/2023/07/DAMA-DMBOK2.pdf",
        "locator": "Chapter 1; section 3.3 The DAMA-DMBOK Framework; Figures 5 and 6"
      },
      {
        "title": "DAMA DMBOK2 Revised Edition change summary",
        "url": "https://www.damadmbok.org/dmbok2-revisions",
        "locator": "Public chapter-change summary; not a verification of the full revised text"
      }
    ],
    "subtopic": "dama-framework-visuals",
    "family": "dama-framework-visuals",
    "difficulty": "uncalibrated",
    "reviewStatus": "draft-author-checked",
    "verificationDate": "2026-09-24",
    "editionBasis": "2017 section checked; full Revised Edition verification pending",
    "editorialReview": {
      "date": "2026-09-24",
      "method": "author revision in response to user-supplied blind review of 0.1.1",
      "status": "cold review of this revision pending"
    },
    "itemVersion": 2,
    "questionStyle": "concept"
  },
  {
    "id": "CDMP-P-002",
    "d": "BD",
    "t": "s",
    "q": "Which extended Big Data characteristic describes the useful lifetime of data before it loses value?",
    "o": [
      "Variety",
      "Veracity",
      "Viscosity",
      "Volatility"
    ],
    "c": [
      3
    ],
    "e": "The extended list distinguishes integration difficulty from speed, diversity, trustworthiness and useful lifetime. These are separate characteristics.",
    "rationales": [
      "Variety concerns forms of data and velocity concerns the rate of generation or sharing.",
      "Veracity concerns trustworthiness; viscosity belongs in the first position.",
      "Viscosity concerns difficulty of use or integration; volatility concerns change and how long data remains useful.",
      "Volatility concerns useful lifetime, while veracity concerns trustworthiness."
    ],
    "sources": [
      {
        "title": "DAMA-DMBOK2, second edition (2017)",
        "url": "https://technicspub.com/wp-content/uploads/2023/07/DAMA-DMBOK2.pdf",
        "locator": "Chapter 14; section 1.3.3 Big Data"
      }
    ],
    "subtopic": "extended-big-data-characteristics",
    "family": "extended-big-data-characteristics",
    "difficulty": "uncalibrated",
    "reviewStatus": "draft-author-checked",
    "verificationDate": "2026-09-24",
    "editionBasis": "2017 section checked; full Revised Edition verification pending",
    "editorialReview": {
      "date": "2026-09-24",
      "method": "author revision in response to user-supplied blind review of 0.1.1",
      "status": "cold review of this revision pending"
    },
    "itemVersion": 2,
    "questionStyle": "concept"
  },
  {
    "id": "CDMP-P-003",
    "d": "DA",
    "t": "s",
    "q": "Which description best characterizes the Zachman Framework as presented in DMBOK?",
    "o": [
      "A capability scale assigning maturity levels to architecture organizations",
      "A notation specifying how entities and relationships must be drawn",
      "A classification of architectural artifacts by interrogative and perspective",
      "A delivery lifecycle prescribing the order in which architectural models are built"
    ],
    "c": [
      2
    ],
    "e": "Zachman is an ontology of enterprise descriptions. Its dimensions combine questions such as what and why with perspectives or levels of realization; the matrix is not a project plan.",
    "rationales": [
      "A maturity model assesses capability; the Zachman cells classify architectural descriptions.",
      "A modeling notation governs representation; Zachman organizes artifact types across the enterprise.",
      "Its matrix classifies what architectural descriptions exist at different perspectives; it does not prescribe their creation process.",
      "Zachman is not a development methodology or mandatory sequence of work."
    ],
    "sources": [
      {
        "title": "DAMA-DMBOK2, second edition (2017)",
        "url": "https://technicspub.com/wp-content/uploads/2023/07/DAMA-DMBOK2.pdf",
        "locator": "Chapter 4; section 1.3.2.1 Zachman Framework for Enterprise Architecture"
      },
      {
        "title": "DAMA DMBOK2 Revised Edition change summary",
        "url": "https://www.damadmbok.org/dmbok2-revisions",
        "locator": "Public chapter-change summary; not a verification of the full revised text"
      }
    ],
    "subtopic": "zachman-classification",
    "family": "zachman-classification",
    "difficulty": "uncalibrated",
    "reviewStatus": "draft-author-checked",
    "verificationDate": "2026-09-24",
    "editionBasis": "2017 section checked; full Revised Edition verification pending",
    "editorialReview": {
      "date": "2026-09-24",
      "method": "author revision in response to user-supplied blind review of 0.1.1",
      "status": "cold review of this revision pending"
    },
    "itemVersion": 2,
    "questionStyle": "concept"
  },
  {
    "id": "CDMP-P-004",
    "d": "DA",
    "t": "s",
    "q": "Which architecture domain describes the functionality and behavior provided by enterprise software packages?",
    "o": [
      "Data architecture",
      "Technology architecture",
      "Application architecture",
      "Business architecture"
    ],
    "c": [
      2
    ],
    "e": "The domains influence each other, but their primary artifacts differ: business capabilities, data organization, application functionality and the technology hosting it.",
    "rationales": [
      "Business architecture addresses how the enterprise creates value; software functionality is not the data-domain focus.",
      "Definitions and mappings describe data; package structure and functionality belong to application architecture.",
      "This assigns data descriptions to applications and software functionality to its hosting infrastructure.",
      "Technology architecture addresses platforms and networks, while business architecture addresses capabilities and processes."
    ],
    "sources": [
      {
        "title": "DAMA-DMBOK2, second edition (2017)",
        "url": "https://technicspub.com/wp-content/uploads/2023/07/DAMA-DMBOK2.pdf",
        "locator": "Chapter 4; section 1.3.1 Enterprise Architecture Domains; Table 6"
      },
      {
        "title": "DAMA DMBOK2 Revised Edition change summary",
        "url": "https://www.damadmbok.org/dmbok2-revisions",
        "locator": "Public chapter-change summary; not a verification of the full revised text"
      }
    ],
    "subtopic": "architecture-domain-boundaries",
    "family": "architecture-domain-boundaries",
    "difficulty": "uncalibrated",
    "reviewStatus": "draft-author-checked",
    "verificationDate": "2026-09-24",
    "editionBasis": "2017 section checked; full Revised Edition verification pending",
    "editorialReview": {
      "date": "2026-09-24",
      "method": "author revision in response to user-supplied blind review of 0.1.1",
      "status": "cold review of this revision pending"
    },
    "itemVersion": 2,
    "questionStyle": "concept"
  },
  {
    "id": "CDMP-P-005",
    "d": "DA",
    "t": "s",
    "q": "Which architecture artifact integrates the organization's principal business entities, relationships and guiding rules into a technology-independent view?",
    "o": [
      "Enterprise data model",
      "Source-to-target mapping specification",
      "Data landscape",
      "Enterprise business glossary"
    ],
    "c": [
      0
    ],
    "e": "An EDM provides a shared model across organizational boundaries. A glossary, a landscape and detailed mappings complement it without being interchangeable artifacts.",
    "rationales": [
      "The EDM provides the integrated conceptual or logical view of enterprise data structures and their business meaning.",
      "A mapping specifies correspondences for an integration rather than the enterprise-wide model.",
      "The landscape concerns the wider organization and movement of data across the environment, rather than this conceptual/logical structure.",
      "A glossary defines terms but does not by itself supply an integrated entity-relationship model."
    ],
    "sources": [
      {
        "title": "DAMA-DMBOK2, second edition (2017)",
        "url": "https://technicspub.com/wp-content/uploads/2023/07/DAMA-DMBOK2.pdf",
        "locator": "Chapter 4; sections 1.3.3 Enterprise Data Architecture and 1.3.3.1 Enterprise Data Model"
      },
      {
        "title": "DAMA DMBOK2 Revised Edition change summary",
        "url": "https://www.damadmbok.org/dmbok2-revisions",
        "locator": "Public chapter-change summary; not a verification of the full revised text"
      }
    ],
    "subtopic": "enterprise-data-model-scope",
    "family": "enterprise-data-model-scope",
    "difficulty": "uncalibrated",
    "reviewStatus": "draft-author-checked",
    "verificationDate": "2026-09-24",
    "editionBasis": "2017 section checked; full Revised Edition verification pending",
    "editorialReview": {
      "date": "2026-09-24",
      "method": "author revision in response to user-supplied blind review of 0.1.1",
      "status": "cold review of this revision pending"
    },
    "itemVersion": 2,
    "questionStyle": "concept"
  },
  {
    "id": "CDMP-P-006",
    "d": "DC",
    "t": "s",
    "q": "A discovery team acquires potentially relevant email from company systems for its legal team. Later, selected material is delivered to opposing counsel in an agreed format. In the EDRM described by DMBOK, which phases are these, in order?",
    "o": [
      "Processing; Analysis",
      "Identification; Review",
      "Collection; Production",
      "Preservation; Presentation"
    ],
    "c": [
      2
    ],
    "e": "Collection and production serve different points in discovery. The question concerns the model in DMBOK, not a prescribed legal procedure or a claim about the current EDRM version.",
    "rationales": [
      "Processing prepares material for further work; analysis examines content and its significance.",
      "Identification scopes relevant sources; review evaluates the material rather than delivering it.",
      "Acquiring the material is collection; delivering responsive material to the other party is production.",
      "Preservation protects material against alteration or destruction; presentation concerns its use in proceedings."
    ],
    "sources": [
      {
        "title": "DAMA-DMBOK2, second edition (2017)",
        "url": "https://technicspub.com/wp-content/uploads/2023/07/DAMA-DMBOK2.pdf",
        "locator": "Chapter 9; section 1.3.5 E-discovery; EDRM as described in the 2017 edition"
      }
    ],
    "subtopic": "edrm-collection-production",
    "family": "edrm-collection-production",
    "difficulty": "uncalibrated",
    "reviewStatus": "draft-author-checked",
    "verificationDate": "2026-09-24",
    "editionBasis": "2017 section checked; full Revised Edition verification pending",
    "editorialReview": {
      "date": "2026-09-24",
      "method": "author revision in response to user-supplied blind review of 0.1.1",
      "status": "cold review of this revision pending"
    },
    "itemVersion": 2,
    "questionStyle": "scenario"
  },
  {
    "id": "CDMP-P-007",
    "d": "DC",
    "t": "s",
    "q": "Which recordkeeping principle addresses efficient retrieval of records when needed?",
    "o": [
      "Integrity",
      "Availability",
      "Compliance",
      "Transparency"
    ],
    "c": [
      1
    ],
    "e": "Availability and transparency are distinct recordkeeping principles. Being able to retrieve a record is different from being able to understand the policies governing its management.",
    "rationales": [
      "Integrity concerns authenticity and reliability, not retrieval; availability does not describe policy transparency.",
      "Availability concerns retrieval; transparency concerns understandable documentation of the governance program.",
      "Compliance concerns binding obligations; protection concerns safeguarding information.",
      "Transparency concerns visibility of policies, while accountability assigns responsibility and auditability."
    ],
    "sources": [
      {
        "title": "DAMA-DMBOK2, second edition (2017)",
        "url": "https://technicspub.com/wp-content/uploads/2023/07/DAMA-DMBOK2.pdf",
        "locator": "Chapter 9; section 1.2 Goals and Principles; ARMA recordkeeping principles"
      }
    ],
    "subtopic": "garp-availability-transparency",
    "family": "garp-availability-transparency",
    "difficulty": "uncalibrated",
    "reviewStatus": "draft-author-checked",
    "verificationDate": "2026-09-24",
    "editionBasis": "2017 section checked; full Revised Edition verification pending",
    "editorialReview": {
      "date": "2026-09-24",
      "method": "author revision in response to user-supplied blind review of 0.1.1",
      "status": "cold review of this revision pending"
    },
    "itemVersion": 2,
    "questionStyle": "concept"
  },
  {
    "id": "CDMP-P-008",
    "d": "DC",
    "t": "s",
    "q": "Which distinction between a synonym ring and an authority list matches DMBOK's treatment of controlled vocabularies?",
    "o": [
      "A ring treats equivalent terms alike; a list directs variants to a preferred term",
      "A ring requires a preferred term; a list treats every variant as an equal heading",
      "A ring defines classes and instances; a list defines subject-predicate relationships",
      "A ring supplies broader/narrower links; a list supplies multiple-parent hierarchies"
    ],
    "c": [
      0
    ],
    "e": "A synonym ring supports retrieval across equivalent terms. An authority list adds preference control by directing variants to an authorized term.",
    "rationales": [
      "Equal treatment of near-equivalent search terms differs from selecting a preferred authorized term.",
      "This reverses the roles of the two structures.",
      "These concern richer semantic representations rather than synonym preference.",
      "These describe hierarchical or polyhierarchical relationships rather than the stated distinction."
    ],
    "sources": [
      {
        "title": "DAMA-DMBOK2, second edition (2017)",
        "url": "https://technicspub.com/wp-content/uploads/2023/07/DAMA-DMBOK2.pdf",
        "locator": "Chapter 9; section 1.3.2.5 Synonym Rings and Authority Lists"
      }
    ],
    "subtopic": "controlled-vocabulary-structures",
    "family": "controlled-vocabulary-structures",
    "difficulty": "uncalibrated",
    "reviewStatus": "draft-author-checked",
    "verificationDate": "2026-09-24",
    "editionBasis": "2017 section checked; full Revised Edition verification pending",
    "editorialReview": {
      "date": "2026-09-24",
      "method": "author revision in response to user-supplied blind review of 0.1.1",
      "status": "cold review of this revision pending"
    },
    "itemVersion": 2,
    "questionStyle": "concept"
  },
  {
    "id": "CDMP-P-009",
    "d": "DE",
    "t": "s",
    "q": "Which privacy principle restricts personal data collection to what is necessary for the stated purpose?",
    "o": [
      "Purpose limitation",
      "Storage limitation",
      "Accuracy",
      "Data minimization"
    ],
    "c": [
      3
    ],
    "e": "The two principles constrain different aspects of handling personal data: the data required and its retention. This item tests the named concepts in the book, not a legal determination for a particular processing activity.",
    "rationales": [
      "Purpose limitation addresses specified purposes and compatible uses, not the duration of retention.",
      "This puts duration first and permitted purposes second, reversing and replacing the requested distinction.",
      "Accuracy concerns correctness and currency; accountability concerns demonstrating compliance.",
      "Minimization concerns the amount and relevance needed for the purpose; storage limitation concerns duration in identifiable form."
    ],
    "sources": [
      {
        "title": "DAMA-DMBOK2, second edition (2017)",
        "url": "https://technicspub.com/wp-content/uploads/2023/07/DAMA-DMBOK2.pdf",
        "locator": "Chapter 2; section 3.2 Principles Behind Data Privacy Law; Table 1"
      }
    ],
    "subtopic": "privacy-principle-distinction",
    "family": "privacy-principle-distinction",
    "difficulty": "uncalibrated",
    "reviewStatus": "draft-author-checked",
    "verificationDate": "2026-09-24",
    "editionBasis": "2017 section checked; full Revised Edition verification pending",
    "editorialReview": {
      "date": "2026-09-24",
      "method": "author revision in response to user-supplied blind review of 0.1.1",
      "status": "cold review of this revision pending"
    },
    "itemVersion": 2,
    "questionStyle": "concept"
  },
  {
    "id": "CDMP-P-010",
    "d": "DG",
    "t": "s",
    "q": "Which steward type represents business and technical stewardship teams in cross-team discussions, and which has oversight of a data domain across business functions, respectively?",
    "o": [
      "Technical; Coordinating",
      "Coordinating; Enterprise",
      "Enterprise; Executive",
      "Executive; Business"
    ],
    "c": [
      1
    ],
    "e": "Steward titles distinguish focus and organizational scope. Representing several teams and overseeing one enterprise data domain are separate responsibilities.",
    "rationales": [
      "Technical stewards work within technical knowledge areas; coordination is not the domain-wide oversight role.",
      "Coordinating stewards represent teams; enterprise stewards oversee a domain across functions.",
      "Enterprise stewardship is domain-wide, while executive stewards are senior managers serving on governance bodies.",
      "Executive stewards serve at the senior governance level; business stewards typically steward a subset of data."
    ],
    "sources": [
      {
        "title": "DAMA-DMBOK2, second edition (2017)",
        "url": "https://technicspub.com/wp-content/uploads/2023/07/DAMA-DMBOK2.pdf",
        "locator": "Chapter 3; section 1.3.5 Types of Data Stewards"
      },
      {
        "title": "DAMA DMBOK2 Revised Edition change summary",
        "url": "https://www.damadmbok.org/dmbok2-revisions",
        "locator": "Public chapter-change summary; not a verification of the full revised text"
      }
    ],
    "subtopic": "steward-role-types",
    "family": "steward-role-types",
    "difficulty": "uncalibrated",
    "reviewStatus": "draft-author-checked",
    "verificationDate": "2026-09-24",
    "editionBasis": "2017 section checked; full Revised Edition verification pending",
    "editorialReview": {
      "date": "2026-09-24",
      "method": "author revision in response to user-supplied blind review of 0.1.1",
      "status": "cold review of this revision pending"
    },
    "itemVersion": 2,
    "questionStyle": "concept"
  },
  {
    "id": "CDMP-P-011",
    "d": "DG",
    "t": "s",
    "q": "In DMBOK's typical governance structure, which body is the senior cross-functional authority that supports and funds governance activities on recommendations from the council and CDO?",
    "o": [
      "Data Governance Office",
      "Data Stewardship Team",
      "Data Governance Council",
      "Data Governance Steering Committee"
    ],
    "c": [
      3
    ],
    "e": "DMBOK distinguishes the steering committee from the council, office and stewardship teams. This is a typical model, not a requirement that every organization use these exact committee names.",
    "rationales": [
      "The office maintains ongoing enterprise definitions and standards and coordinates governance work.",
      "Stewardship teams focus on defined subject areas or projects rather than enterprise funding authority.",
      "The council manages governance initiatives and escalations, rather than being the higher funding body described.",
      "The steering committee provides senior oversight, support and funding."
    ],
    "sources": [
      {
        "title": "DAMA-DMBOK2, second edition (2017)",
        "url": "https://technicspub.com/wp-content/uploads/2023/07/DAMA-DMBOK2.pdf",
        "locator": "Chapter 3; section 1.3.2 Data Governance Organization; Table 4"
      },
      {
        "title": "DAMA DMBOK2 Revised Edition change summary",
        "url": "https://www.damadmbok.org/dmbok2-revisions",
        "locator": "Public chapter-change summary; not a verification of the full revised text"
      }
    ],
    "subtopic": "governance-body-responsibilities",
    "family": "governance-body-responsibilities",
    "difficulty": "uncalibrated",
    "reviewStatus": "draft-author-checked",
    "verificationDate": "2026-09-24",
    "editionBasis": "2017 section checked; full Revised Edition verification pending",
    "editorialReview": {
      "date": "2026-09-24",
      "method": "author revision in response to user-supplied blind review of 0.1.1",
      "status": "cold review of this revision pending"
    },
    "itemVersion": 2,
    "questionStyle": "concept"
  },
  {
    "id": "CDMP-P-012",
    "d": "DG",
    "t": "s",
    "q": "Which governance operating model gives business units local autonomy while coordinating shared standards across the enterprise?",
    "o": [
      "Centralized",
      "Replicated",
      "Decentralized",
      "Federated"
    ],
    "c": [
      3
    ],
    "e": "The distinction is how units relate to enterprise governance. A repeated local model is replicated; coordinated enterprise and business-unit participation is federated.",
    "rationales": [
      "The new body coordinates divisional governance rather than taking over all subject-area activity.",
      "The initial arrangement is not a single central body overseeing all activity, and the new arrangement adds coordination.",
      "The initial arrangement lacks the stated enterprise coordination, and the divisions are not being replaced by one operating body.",
      "Replication repeats the model across units; federation adds enterprise coordination while retaining unit participation."
    ],
    "sources": [
      {
        "title": "DAMA-DMBOK2, second edition (2017)",
        "url": "https://technicspub.com/wp-content/uploads/2023/07/DAMA-DMBOK2.pdf",
        "locator": "Chapter 3; section 1.3.3 Data Governance Operating Model Types"
      },
      {
        "title": "DAMA DMBOK2 Revised Edition change summary",
        "url": "https://www.damadmbok.org/dmbok2-revisions",
        "locator": "Public chapter-change summary; not a verification of the full revised text"
      }
    ],
    "subtopic": "replicated-federated-governance",
    "family": "replicated-federated-governance",
    "difficulty": "uncalibrated",
    "reviewStatus": "draft-author-checked",
    "verificationDate": "2026-09-24",
    "editionBasis": "2017 section checked; full Revised Edition verification pending",
    "editorialReview": {
      "date": "2026-09-24",
      "method": "author revision in response to user-supplied blind review of 0.1.1",
      "status": "cold review of this revision pending"
    },
    "itemVersion": 2,
    "questionStyle": "scenario"
  },
  {
    "id": "CDMP-P-013",
    "d": "DG",
    "t": "s",
    "q": "Which DMBOK data-valuation basis estimates exposure to penalties, remediation and litigation arising from missing, inappropriate or incorrect data?",
    "o": [
      "Risk cost",
      "Market value",
      "Identified opportunities",
      "Replacement cost"
    ],
    "c": [
      0
    ],
    "e": "The valuation bases answer different economic questions. Exposure to adverse consequences belongs to risk cost, rather than replacement expense or potential income.",
    "rationales": [
      "Risk cost evaluates potential adverse consequences associated with the data and its management.",
      "Market value treats data as a business asset in a market or transaction context.",
      "Identified opportunities estimate income or benefits enabled by using the data.",
      "Replacement cost estimates rebuilding or replacing lost data assets."
    ],
    "sources": [
      {
        "title": "DAMA-DMBOK2, second edition (2017)",
        "url": "https://technicspub.com/wp-content/uploads/2023/07/DAMA-DMBOK2.pdf",
        "locator": "Chapter 3; section 1.3.7 Data Asset Valuation"
      },
      {
        "title": "DAMA DMBOK2 Revised Edition change summary",
        "url": "https://www.damadmbok.org/dmbok2-revisions",
        "locator": "Public chapter-change summary; not a verification of the full revised text"
      }
    ],
    "subtopic": "data-asset-valuation-bases",
    "family": "data-asset-valuation-bases",
    "difficulty": "uncalibrated",
    "reviewStatus": "draft-author-checked",
    "verificationDate": "2026-09-24",
    "editionBasis": "2017 section checked; full Revised Edition verification pending",
    "editorialReview": {
      "date": "2026-09-24",
      "method": "author revision in response to user-supplied blind review of 0.1.1",
      "status": "cold review of this revision pending"
    },
    "itemVersion": 2,
    "questionStyle": "concept"
  },
  {
    "id": "CDMP-P-014",
    "d": "DI",
    "t": "s",
    "q": "In DMBOK's latency discussion, which characteristic separates synchronous integration from an asynchronous flow?",
    "o": [
      "The receiving process accepts updates only in a scheduled bulk interval",
      "The integration expresses each payload in an enterprise message format",
      "The initiating process waits for the required acknowledgement before proceeding",
      "The source captures changes by reading its database transaction log"
    ],
    "c": [
      2
    ],
    "e": "Synchrony concerns coordination of progress. It is distinct from batching, change detection and message representation, even when those mechanisms occur in the same integration.",
    "rationales": [
      "A scheduled bulk interval characterizes batch handling rather than synchrony.",
      "A canonical message format concerns representation, not whether the sender must wait.",
      "Waiting for acknowledgement couples progress to the other participant.",
      "Log-based CDC is a change-detection mechanism, not the defining acknowledgement behavior."
    ],
    "sources": [
      {
        "title": "DAMA-DMBOK2, second edition (2017)",
        "url": "https://technicspub.com/wp-content/uploads/2023/07/DAMA-DMBOK2.pdf",
        "locator": "Chapter 8; sections 1.3.2.4 Asynchronous and 1.3.2.5 Real-time, Synchronous"
      }
    ],
    "subtopic": "integration-latency-coupling",
    "family": "integration-latency-coupling",
    "difficulty": "uncalibrated",
    "reviewStatus": "draft-author-checked",
    "verificationDate": "2026-09-24",
    "editionBasis": "2017 section checked; full Revised Edition verification pending",
    "editorialReview": {
      "date": "2026-09-24",
      "method": "author revision in response to user-supplied blind review of 0.1.1",
      "status": "cold review of this revision pending"
    },
    "itemVersion": 2,
    "questionStyle": "concept"
  },
  {
    "id": "CDMP-P-015",
    "d": "DI",
    "t": "s",
    "q": "Which integration interaction model delivers messages to consumers that have registered interest in a service?",
    "o": [
      "Point-to-point",
      "Hub-and-spoke",
      "Request-response",
      "Publish-subscribe"
    ],
    "c": [
      3
    ],
    "e": "The subscription mechanism is decisive. Publish-subscribe may be implemented using a hub, so the alternatives explicitly distinguish routing topology from standing consumer registration.",
    "rationales": [
      "A direct interface does not itself establish topic or service subscriptions.",
      "A hub can support publish-subscribe, but routing through a hub alone does not define recipient registration.",
      "A request-response exchange serves an explicit request instead of a standing subscription.",
      "Subscriptions identify interested recipients for subsequent publications."
    ],
    "sources": [
      {
        "title": "DAMA-DMBOK2, second edition (2017)",
        "url": "https://technicspub.com/wp-content/uploads/2023/07/DAMA-DMBOK2.pdf",
        "locator": "Chapter 8; section 1.3.6 Interaction Models, especially 1.3.6.3 Publish - Subscribe"
      }
    ],
    "subtopic": "integration-interaction-models",
    "family": "integration-interaction-models",
    "difficulty": "uncalibrated",
    "reviewStatus": "draft-author-checked",
    "verificationDate": "2026-09-24",
    "editionBasis": "2017 section checked; full Revised Edition verification pending",
    "editorialReview": {
      "date": "2026-09-24",
      "method": "author revision in response to user-supplied blind review of 0.1.1",
      "status": "cold review of this revision pending"
    },
    "itemVersion": 2,
    "questionStyle": "concept"
  },
  {
    "id": "CDMP-P-016",
    "d": "DI",
    "t": "s",
    "q": "What does an enterprise canonical message model change about transformations between applications?",
    "o": [
      "Applications retain pair-specific representations but transmit them through one broker",
      "Applications use one physical database schema for all operational persistence",
      "Applications eliminate semantic mappings by adopting a common transport protocol",
      "Applications map to a shared representation instead of every partner representation"
    ],
    "c": [
      3
    ],
    "e": "Canonical modeling standardizes the exchange representation. It does not abolish transformation or require applications to share a physical storage schema.",
    "rationales": [
      "A common broker alone does not remove pair-specific formats or their transformations.",
      "A shared exchange representation does not require identical operational schemas.",
      "Common transport does not align business meaning, and a canonical model still needs mappings.",
      "A canonical representation reduces the number of partner-specific transformations while requiring governance of the common model."
    ],
    "sources": [
      {
        "title": "DAMA-DMBOK2, second edition (2017)",
        "url": "https://technicspub.com/wp-content/uploads/2023/07/DAMA-DMBOK2.pdf",
        "locator": "Chapter 8; section 1.3.5 Enterprise Message Format / Canonical Model"
      }
    ],
    "subtopic": "canonical-model-transformations",
    "family": "canonical-model-transformations",
    "difficulty": "uncalibrated",
    "reviewStatus": "draft-author-checked",
    "verificationDate": "2026-09-24",
    "editionBasis": "2017 section checked; full Revised Edition verification pending",
    "editorialReview": {
      "date": "2026-09-24",
      "method": "author revision in response to user-supplied blind review of 0.1.1",
      "status": "cold review of this revision pending"
    },
    "itemVersion": 2,
    "questionStyle": "concept"
  },
  {
    "id": "CDMP-P-017",
    "d": "MR",
    "t": "s",
    "q": "Which pair best illustrates reference data followed by master data?",
    "o": [
      "Individual invoice line items; the nightly import error log",
      "The organization's supplier entities; individual invoice line items",
      "An approved currency-code list; the organization's supplier entities",
      "The nightly import error log; an approved currency-code list"
    ],
    "c": [
      2
    ],
    "e": "Reference data supplies controlled classifications; master data represents shared core entities.",
    "rationales": [
      "Transactions and execution logs are not the requested pair.",
      "Suppliers are master data and invoice lines are transactions.",
      "Codes classify values; supplier entities represent core business objects.",
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
      "method": "author revision in response to user-supplied blind review of 0.1.1",
      "status": "cold review of this revision pending"
    },
    "itemVersion": 2,
    "questionStyle": "concept"
  },
  {
    "id": "CDMP-P-018",
    "d": "MR",
    "t": "s",
    "q": "A customer matcher accepts pairs above a similarity threshold. The team raises that threshold while holding scoring and review rules fixed. What is the expected direction of the tradeoff?",
    "o": [
      "More false positives; fewer false negatives",
      "Fewer false positives; more false negatives",
      "Fewer false positives; fewer false negatives",
      "More false positives; more false negatives"
    ],
    "c": [
      1
    ],
    "e": "A false positive links different entities; a false negative leaves the same entity unlinked. Raising the threshold shrinks the accepted set, so the tradeoff depends on which pairs lie near it.",
    "rationales": [
      "This is the usual direction of lowering, not raising, the acceptance threshold.",
      "A stricter acceptance threshold can prevent incorrect links while missing some true links.",
      "Reducing incorrect links does not guarantee improved recall of true links.",
      "Making acceptance stricter does not itself create additional accepted false matches."
    ],
    "sources": [
      {
        "title": "DAMA-DMBOK2, second edition (2017)",
        "url": "https://technicspub.com/wp-content/uploads/2023/07/DAMA-DMBOK2.pdf",
        "locator": "Chapter 10; section 1.3.3.4.4.1 Matching"
      }
    ],
    "subtopic": "matching-error-tradeoff",
    "family": "matching-error-tradeoff",
    "difficulty": "uncalibrated",
    "reviewStatus": "draft-author-checked",
    "verificationDate": "2026-09-24",
    "editionBasis": "2017 section checked; full Revised Edition verification pending",
    "editorialReview": {
      "date": "2026-09-24",
      "method": "author revision in response to user-supplied blind review of 0.1.1",
      "status": "cold review of this revision pending"
    },
    "itemVersion": 2,
    "questionStyle": "scenario"
  },
  {
    "id": "CDMP-P-019",
    "d": "MR",
    "t": "s",
    "q": "Which interpretation of a golden record is consistent with DMBOK's caution about that term?",
    "o": [
      "An entity identifier and links without a view of the resolved attribute values",
      "A source-priority list specifying which application owns each data domain",
      "The designated source record retained intact instead of resolving its attributes",
      "A best available entity representation produced through rules and stewardship"
    ],
    "c": [
      3
    ],
    "e": "DMBOK warns against interpreting golden as a guarantee of perfection. A trusted source reflects the best version supported by the current rules, evidence and stewardship.",
    "rationales": [
      "An identity registry supports linking but is not itself the resolved entity representation.",
      "Source priorities can guide resolution but are rules, not the resulting entity record.",
      "A golden record may combine or resolve source values; it is not defined by leaving one source untouched.",
      "A trusted view is managed toward quality but is not guaranteed complete or infallible."
    ],
    "sources": [
      {
        "title": "DAMA-DMBOK2, second edition (2017)",
        "url": "https://technicspub.com/wp-content/uploads/2023/07/DAMA-DMBOK2.pdf",
        "locator": "Chapter 10; section 1.3.3.2 Trusted Source, Golden Record"
      }
    ],
    "subtopic": "trusted-source-golden-record",
    "family": "trusted-source-golden-record",
    "difficulty": "uncalibrated",
    "reviewStatus": "draft-author-checked",
    "verificationDate": "2026-09-24",
    "editionBasis": "2017 section checked; full Revised Edition verification pending",
    "editorialReview": {
      "date": "2026-09-24",
      "method": "author revision in response to user-supplied blind review of 0.1.1",
      "status": "cold review of this revision pending"
    },
    "itemVersion": 2,
    "questionStyle": "concept"
  },
  {
    "id": "CDMP-P-020",
    "d": "MR",
    "t": "s",
    "q": "An MDM service initially assembles customer attributes from source applications when requested, using a central identity index. It later stores resolved copies centrally, while sources still maintain their records. Which DMBOK architecture transition does this describe?",
    "o": [
      "Transaction hub to consolidated",
      "Consolidated to registry",
      "Registry to consolidated",
      "Registry to transaction hub"
    ],
    "c": [
      2
    ],
    "e": "DMBOK describes registry, transaction hub and consolidated approaches. Its consolidated approach is itself described as a hybrid; Hybrid is therefore not used here as a separate competing label.",
    "rationales": [
      "This reverses the move from retrieving source attributes to maintaining central copies.",
      "The initial design does not centralize master-data creation and update as a transaction hub.",
      "The index-based design is registry; copied master attributes with continuing source maintenance characterize consolidation.",
      "A transaction hub becomes the system of record for master-data updates, which the stem does not describe."
    ],
    "sources": [
      {
        "title": "DAMA-DMBOK2, second edition (2017)",
        "url": "https://technicspub.com/wp-content/uploads/2023/07/DAMA-DMBOK2.pdf",
        "locator": "Chapter 10; section 1.3.4 Data Sharing Architecture"
      }
    ],
    "subtopic": "mdm-registry-consolidation-transition",
    "family": "mdm-registry-consolidation-transition",
    "difficulty": "uncalibrated",
    "reviewStatus": "draft-author-checked",
    "verificationDate": "2026-09-24",
    "editionBasis": "2017 section checked; full Revised Edition verification pending",
    "editorialReview": {
      "date": "2026-09-24",
      "method": "author revision in response to user-supplied blind review of 0.1.1",
      "status": "cold review of this revision pending"
    },
    "itemVersion": 2,
    "questionStyle": "scenario"
  },
  {
    "id": "CDMP-P-021",
    "d": "MD",
    "t": "s",
    "q": "How does DMBOK relate relational and dimensional modeling schemes to conceptual, logical and physical levels of detail?",
    "o": [
      "Relational schemes span all levels; dimensional schemes begin at the physical level",
      "Both schemes can be expressed at conceptual, logical and physical levels",
      "Dimensional schemes span all levels; relational schemes begin at the logical level",
      "Conceptual models use relational schemes; logical models use dimensional schemes"
    ],
    "c": [
      1
    ],
    "e": "A modeling scheme determines how data is organized or represented; level of detail determines abstraction. Relational versus dimensional is not equivalent to logical versus physical.",
    "rationales": [
      "A dimensional design is not restricted to physical implementation.",
      "Scheme and level of detail are different classifications; DMBOK illustrates both schemes across the levels.",
      "Relational modeling can represent conceptual business structure as well as logical and physical detail.",
      "The level does not select one of these schemes; this incorrectly conflates the two axes."
    ],
    "sources": [
      {
        "title": "DAMA-DMBOK2, second edition (2017)",
        "url": "https://technicspub.com/wp-content/uploads/2023/07/DAMA-DMBOK2.pdf",
        "locator": "Chapter 5; section 1.3.5 Data Model Levels of Detail"
      }
    ],
    "subtopic": "model-levels-versus-schemes",
    "family": "model-levels-versus-schemes",
    "difficulty": "uncalibrated",
    "reviewStatus": "draft-author-checked",
    "verificationDate": "2026-09-24",
    "editionBasis": "2017 section checked; full Revised Edition verification pending",
    "editorialReview": {
      "date": "2026-09-24",
      "method": "author revision in response to user-supplied blind review of 0.1.1",
      "status": "cold review of this revision pending"
    },
    "itemVersion": 2,
    "questionStyle": "concept"
  },
  {
    "id": "CDMP-P-022",
    "d": "MD",
    "t": "s",
    "q": "Each order line belongs to exactly one order. An order must contain at least one order line and may contain several. Which pair of cardinalities expresses both rules?",
    "o": [
      "An order has one or more lines; a line has zero or one order",
      "An order has one or more lines; a line has exactly one order",
      "An order has zero or more lines; a line has exactly one order",
      "An order has exactly one line; a line has one or more orders"
    ],
    "c": [
      1
    ],
    "e": "Cardinality must express the business rule in both directions.",
    "rationales": [
      "This incorrectly permits a line without an order.",
      "This captures mandatory participation and the one-to-many maximum cardinality.",
      "This incorrectly permits an order with no lines.",
      "This reverses the relationship and incorrectly permits a line to belong to several orders."
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
      "method": "author revision in response to user-supplied blind review of 0.1.1",
      "status": "cold review of this revision pending"
    },
    "itemVersion": 2,
    "questionStyle": "scenario"
  },
  {
    "id": "CDMP-P-023",
    "d": "MD",
    "t": "s",
    "q": "A purchasing table repeats a supplier's current contact address on every item row. Historical shipment addresses are stored separately. Updating some rows leaves conflicting current addresses. Which design change most directly removes the redundancy causing this anomaly?",
    "o": [
      "Use a trigger to copy each new supplier address to the other item rows",
      "Add a composite key containing the item identifier and supplier address",
      "Store the address as a structured object inside each purchased-item row",
      "Store current supplier attributes once and reference them from item rows"
    ],
    "c": [
      3
    ],
    "e": "Normalization organizes attributes around their dependencies so one fact need not be maintained in many rows.",
    "rationales": [
      "A trigger may synchronize the copies but preserves the redundancy the question asks to remove.",
      "A larger key does not remove the repeated supplier fact.",
      "Changing the representation inside each row still repeats the address.",
      "Separating the supplier fact addresses the dependency and eliminates repeated maintenance."
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
      "method": "author revision in response to user-supplied blind review of 0.1.1",
      "status": "cold review of this revision pending"
    },
    "itemVersion": 2,
    "questionStyle": "scenario"
  },
  {
    "id": "CDMP-P-024",
    "d": "MD",
    "t": "s",
    "q": "In a relational model, what distinguishes an identifying relationship from a non-identifying relationship?",
    "o": [
      "The relationship requires the child's foreign key to be non-null",
      "The migrated parent key forms part of the child's primary key",
      "The relationship permits no more than one child for each parent",
      "The parent and child each use a system-generated surrogate key"
    ],
    "c": [
      1
    ],
    "e": "Identifying status concerns the composition of the child primary key. Optionality, cardinality and use of surrogate keys are distinct modeling decisions.",
    "rationales": [
      "Mandatory participation can exist in a non-identifying relationship as well.",
      "Identity dependence is expressed through the parent key participating in the child primary key.",
      "Maximum cardinality does not determine whether the child identity includes the parent key.",
      "Surrogate-key use alone does not establish the identifying relationship."
    ],
    "sources": [
      {
        "title": "DAMA-DMBOK2, second edition (2017)",
        "url": "https://technicspub.com/wp-content/uploads/2023/07/DAMA-DMBOK2.pdf",
        "locator": "Chapter 5; section 1.3.3.3.2.3 Identifying vs. Non-Identifying Relationships"
      }
    ],
    "subtopic": "identifying-relationships",
    "family": "identifying-relationships",
    "difficulty": "uncalibrated",
    "reviewStatus": "draft-author-checked",
    "verificationDate": "2026-09-24",
    "editionBasis": "2017 section checked; full Revised Edition verification pending",
    "editorialReview": {
      "date": "2026-09-24",
      "method": "author revision in response to user-supplied blind review of 0.1.1",
      "status": "cold review of this revision pending"
    },
    "itemVersion": 2,
    "questionStyle": "concept"
  },
  {
    "id": "CDMP-P-025",
    "d": "DQ",
    "t": "s",
    "q": "A birth-date value has the required date format and falls within the allowed range, but it is the wrong date for that person. Which distinction best describes the issue?",
    "o": [
      "It must fail uniqueness because the value is incorrect",
      "It must fail completeness because the value is incorrect",
      "It can satisfy accuracy while failing validity rules",
      "It can satisfy validity rules while failing accuracy"
    ],
    "c": [
      3
    ],
    "e": "Validity checks permitted representations or values; accuracy concerns whether a value correctly represents the fact.",
    "rationales": [
      "No duplicate identity or record is established by the scenario.",
      "A populated field can be complete yet inaccurate.",
      "The scenario explicitly states that the recorded fact is wrong.",
      "Conforming to allowed values does not prove correspondence to reality."
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
      "method": "author revision in response to user-supplied blind review of 0.1.1",
      "status": "cold review of this revision pending"
    },
    "itemVersion": 2,
    "questionStyle": "scenario"
  },
  {
    "id": "CDMP-P-026",
    "d": "DQ",
    "t": "s",
    "q": "An email address is required only for the 800 customers who opted into email service. Of those, 720 have an address. Another 200 customers did not opt in. What is completeness against this stated requirement?",
    "o": [
      "90%",
      "100%",
      "80%",
      "72%"
    ],
    "c": [
      0
    ],
    "e": "A quality metric needs an explicit rule and applicable population: 720 / 800, not 720 / 1000.",
    "rationales": [
      "720 divided by the 800 applicable records equals 90%.",
      "Eighty applicable records are missing the required value.",
      "This divides applicable records by all records, not populated required values.",
      "This incorrectly includes 200 records to which the requirement does not apply."
    ],
    "sources": [
      {
        "title": "DAMA-DMBOK2, second edition (2017)",
        "url": "https://technicspub.com/wp-content/uploads/2023/07/DAMA-DMBOK2.pdf",
        "locator": "Chapter 13; Effective Data Quality Metrics"
      },
      {
        "title": "DAMA DMBOK2 Revised Edition change summary",
        "url": "https://www.damadmbok.org/dmbok2-revisions",
        "locator": "Public chapter-change summary; not a verification of the full revised text"
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
      "method": "author revision in response to user-supplied blind review of 0.1.1",
      "status": "cold review of this revision pending"
    },
    "itemVersion": 2,
    "questionStyle": "scenario"
  },
  {
    "id": "CDMP-P-027",
    "d": "DQ",
    "t": "s",
    "q": "In the Strong-Wang framework discussed in DMBOK, which pair consists entirely of intrinsic data-quality dimensions?",
    "o": [
      "Objectivity and believability",
      "Interpretability and concise representation",
      "Accessibility and access security",
      "Timeliness and completeness"
    ],
    "c": [
      0
    ],
    "e": "The category is framework-specific. The question concerns Strong-Wang, not a claim that every quality framework groups these dimensions in the same way.",
    "rationales": [
      "Objectivity and believability are intrinsic, alongside accuracy and reputation.",
      "These belong to representational data quality.",
      "These belong to the accessibility category.",
      "Timeliness and completeness are contextual in this named framework."
    ],
    "sources": [
      {
        "title": "DAMA-DMBOK2, second edition (2017)",
        "url": "https://technicspub.com/wp-content/uploads/2023/07/DAMA-DMBOK2.pdf",
        "locator": "Chapter 13; section 1.3.3 Data Quality Dimensions; Strong-Wang framework"
      },
      {
        "title": "DAMA DMBOK2 Revised Edition change summary",
        "url": "https://www.damadmbok.org/dmbok2-revisions",
        "locator": "Public chapter-change summary; not a verification of the full revised text"
      }
    ],
    "subtopic": "strong-wang-quality-categories",
    "family": "strong-wang-quality-categories",
    "difficulty": "uncalibrated",
    "reviewStatus": "draft-author-checked",
    "verificationDate": "2026-09-24",
    "editionBasis": "2017 section checked; full Revised Edition verification pending",
    "editorialReview": {
      "date": "2026-09-24",
      "method": "author revision in response to user-supplied blind review of 0.1.1",
      "status": "cold review of this revision pending"
    },
    "itemVersion": 2,
    "questionStyle": "concept"
  },
  {
    "id": "CDMP-P-028",
    "d": "DQ",
    "t": "s",
    "q": "Three systems show the same customer address, but the customer confirms that it is an old address and all systems should hold the current address. What can be concluded?",
    "o": [
      "The systems agree, but agreement alone does not establish accuracy",
      "The systems have duplicate customers because their addresses agree",
      "The systems are accurate because their address values are consistent",
      "The systems are incomplete because their address values agree"
    ],
    "c": [
      0
    ],
    "e": "Consistency across systems and accuracy against the required real-world fact are separate quality concerns.",
    "rationales": [
      "The common value is still wrong for the required current-address use.",
      "Agreement about one customer across systems does not prove duplicate entities.",
      "Agreement among copies is not evidence that the shared fact is correct.",
      "Completeness concerns missing required information, not agreement itself."
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
      "method": "author revision in response to user-supplied blind review of 0.1.1",
      "status": "cold review of this revision pending"
    },
    "itemVersion": 2,
    "questionStyle": "scenario"
  },
  {
    "id": "CDMP-P-029",
    "d": "DS",
    "t": "s",
    "q": "Which term is not one of the four A's in DMBOK's data-security process framework?",
    "o": [
      "Access",
      "Audit",
      "Accountability",
      "Authorization"
    ],
    "c": [
      2
    ],
    "e": "The item tests the particular process grouping used by DMBOK. Other security frameworks use other groupings, including availability or accountability.",
    "rationales": [
      "Accountability is meaningful in governance but does not replace Audit in this set.",
      "Accountability does not replace Authorization in the named four A's.",
      "Availability is a security property but does not replace Access in this set.",
      "This is the named set in the security-process discussion."
    ],
    "sources": [
      {
        "title": "DAMA-DMBOK2, second edition (2017)",
        "url": "https://technicspub.com/wp-content/uploads/2023/07/DAMA-DMBOK2.pdf",
        "locator": "Chapter 7; sections 1.3.6 Security Processes and 1.3.6.1 The Four A's"
      }
    ],
    "subtopic": "security-four-as",
    "family": "security-four-as",
    "difficulty": "uncalibrated",
    "reviewStatus": "draft-author-checked",
    "verificationDate": "2026-09-24",
    "editionBasis": "2017 section checked; full Revised Edition verification pending",
    "editorialReview": {
      "date": "2026-09-24",
      "method": "author revision in response to user-supplied blind review of 0.1.1",
      "status": "cold review of this revision pending"
    },
    "itemVersion": 2,
    "questionStyle": "concept"
  },
  {
    "id": "CDMP-P-030",
    "d": "DS",
    "t": "s",
    "q": "In DMBOK's extension of the four A's, what does an entitlement describe?",
    "o": [
      "The evidence used to establish that a user is the person they claim to be",
      "The collection of data elements exposed by one access authorization decision",
      "The privilege-granting process that approves a user's permitted operations",
      "The record of security actions examined for conformity with policy"
    ],
    "c": [
      1
    ],
    "e": "DMBOK adds entitlement to examine all the information made accessible by an authorization decision, including its confidentiality and regulatory implications.",
    "rationales": [
      "This concerns authentication rather than the scope of an entitlement.",
      "Entitlement identifies the aggregate information exposure associated with an authorization decision.",
      "Authorization is the grant decision; entitlement describes the resulting set of exposed data.",
      "This concerns audit evidence rather than the data exposed by access."
    ],
    "sources": [
      {
        "title": "DAMA-DMBOK2, second edition (2017)",
        "url": "https://technicspub.com/wp-content/uploads/2023/07/DAMA-DMBOK2.pdf",
        "locator": "Chapter 7; section 1.3.6.1 The Four A's; Entitlement discussion"
      }
    ],
    "subtopic": "security-entitlement",
    "family": "security-entitlement",
    "difficulty": "uncalibrated",
    "reviewStatus": "draft-author-checked",
    "verificationDate": "2026-09-24",
    "editionBasis": "2017 section checked; full Revised Edition verification pending",
    "editorialReview": {
      "date": "2026-09-24",
      "method": "author revision in response to user-supplied blind review of 0.1.1",
      "status": "cold review of this revision pending"
    },
    "itemVersion": 2,
    "questionStyle": "concept"
  },
  {
    "id": "CDMP-P-031",
    "d": "SO",
    "t": "s",
    "q": "During a network partition, which pair of guarantees is at the center of the CAP tradeoff for a distributed data service?",
    "o": [
      "Consistency and availability",
      "Atomicity and durability",
      "Isolation and consistency",
      "Durability and availability"
    ],
    "c": [
      0
    ],
    "e": "The partition qualifier matters. CAP does not mean every system freely chooses two permanent features; it concerns simultaneous consistency and availability guarantees when communication is disrupted.",
    "rationales": [
      "A partition can prevent a service from guaranteeing both a consistent view and a successful response to every request.",
      "Atomicity and durability are ACID properties rather than the C and A in CAP.",
      "Isolation is an ACID transaction property, not one of the three CAP properties.",
      "Durability is not the C in CAP; persistence of committed data differs from consistency between replicas."
    ],
    "sources": [
      {
        "title": "DAMA-DMBOK2, second edition (2017)",
        "url": "https://technicspub.com/wp-content/uploads/2023/07/DAMA-DMBOK2.pdf",
        "locator": "Chapter 6; section 1.3.5.3 CAP; partition-qualified tradeoff"
      },
      {
        "title": "Eric Brewer, CAP Twelve Years Later (2012)",
        "url": "https://www.infoq.com/articles/cap-twelve-years-later-how-the-rules-have-changed/",
        "locator": "Why the two-of-three formulation is misleading; consistency/availability during partitions"
      }
    ],
    "subtopic": "cap-partition-tradeoff",
    "family": "cap-partition-tradeoff",
    "difficulty": "uncalibrated",
    "reviewStatus": "draft-author-checked",
    "verificationDate": "2026-09-24",
    "editionBasis": "2017 section checked; full Revised Edition verification pending",
    "editorialReview": {
      "date": "2026-09-24",
      "method": "author revision in response to user-supplied blind review of 0.1.1",
      "status": "cold review of this revision pending"
    },
    "itemVersion": 2,
    "questionStyle": "concept"
  },
  {
    "id": "CDMP-P-032",
    "d": "SO",
    "t": "s",
    "q": "Which statement correctly interprets the consistency term in BASE?",
    "o": [
      "Concurrent transactions behave as though executed one at a time",
      "Every read reflects the latest committed write across the replicas",
      "Replicas may differ temporarily but converge if further updates cease",
      "A committed transaction remains stored after a subsequent system failure"
    ],
    "c": [
      2
    ],
    "e": "BASE combines basic availability, soft state and eventual consistency. Eventual convergence differs from transaction isolation, durability and an immediately consistent global view.",
    "rationales": [
      "This describes transaction isolation or serializability rather than eventual consistency.",
      "This is a stronger immediate consistency guarantee than BASE requires.",
      "Eventual consistency permits intermediate divergence with eventual convergence.",
      "This describes durability, not convergence among replicas."
    ],
    "sources": [
      {
        "title": "DAMA-DMBOK2, second edition (2017)",
        "url": "https://technicspub.com/wp-content/uploads/2023/07/DAMA-DMBOK2.pdf",
        "locator": "Chapter 6; section 1.3.5.2 BASE"
      }
    ],
    "subtopic": "base-eventual-consistency",
    "family": "base-eventual-consistency",
    "difficulty": "uncalibrated",
    "reviewStatus": "draft-author-checked",
    "verificationDate": "2026-09-24",
    "editionBasis": "2017 section checked; full Revised Edition verification pending",
    "editorialReview": {
      "date": "2026-09-24",
      "method": "author revision in response to user-supplied blind review of 0.1.1",
      "status": "cold review of this revision pending"
    },
    "itemVersion": 2,
    "questionStyle": "concept"
  },
  {
    "id": "CDMP-P-033",
    "d": "BI",
    "t": "s",
    "q": "Which pairing describes the characteristic integration structures in the Inmon and Kimball warehouse approaches, respectively?",
    "o": [
      "Independent departmental marts with local definitions; dimensional marts linked by conformed dimensions",
      "An enterprise warehouse feeding dependent marts; independent departmental marts with local definitions",
      "An enterprise warehouse feeding dependent marts; dimensional marts linked by conformed dimensions",
      "Dimensional marts linked by conformed dimensions; an enterprise warehouse feeding dependent marts"
    ],
    "c": [
      2
    ],
    "e": "Both approaches support enterprise integration. The distinction is not that one integrates and the other does not, but how the warehouse and marts are organized to achieve it.",
    "rationales": [
      "Independent local marts omit the enterprise integration central to the Inmon approach.",
      "Independent local definitions omit the conformance essential to Kimball's enterprise integration.",
      "Inmon's CIF places marts downstream of enterprise integration; Kimball integrates dimensional models through a shared bus.",
      "This reverses the characteristic descriptions of the two approaches."
    ],
    "sources": [
      {
        "title": "DAMA-DMBOK2, second edition (2017)",
        "url": "https://technicspub.com/wp-content/uploads/2023/07/DAMA-DMBOK2.pdf",
        "locator": "Chapter 11; sections 1.3.5 Corporate Information Factory (Inmon) and 1.3.6 Dimensional DW (Kimball)"
      }
    ],
    "subtopic": "inmon-kimball-integration",
    "family": "inmon-kimball-integration",
    "difficulty": "uncalibrated",
    "reviewStatus": "draft-author-checked",
    "verificationDate": "2026-09-24",
    "editionBasis": "2017 section checked; full Revised Edition verification pending",
    "editorialReview": {
      "date": "2026-09-24",
      "method": "author revision in response to user-supplied blind review of 0.1.1",
      "status": "cold review of this revision pending"
    },
    "itemVersion": 2,
    "questionStyle": "concept"
  },
  {
    "id": "CDMP-P-034",
    "d": "BI",
    "t": "s",
    "q": "In a dimensional warehouse bus matrix, what do the intersecting business-process and subject-area entries help identify?",
    "o": [
      "Measures that must use the same aggregation rule in every fact table",
      "Operational tables that must share a single transaction boundary",
      "Dimensions that can be conformed across multiple fact-producing processes",
      "Source applications that must publish their extracts on the same schedule"
    ],
    "c": [
      2
    ],
    "e": "The bus matrix connects business processes and dimensions, exposing reuse opportunities and supporting incremental delivery of an integrated dimensional warehouse.",
    "rationales": [
      "A shared dimension does not imply every measure has the same additive behavior.",
      "Transaction boundaries are an operational processing concern, not the matrix's purpose.",
      "Repeated use of a subject area across processes identifies candidates for shared, conformed dimensions.",
      "The matrix represents content requirements independently of extraction schedules."
    ],
    "sources": [
      {
        "title": "DAMA-DMBOK2, second edition (2017)",
        "url": "https://technicspub.com/wp-content/uploads/2023/07/DAMA-DMBOK2.pdf",
        "locator": "Chapter 11; section 1.3.6 Dimensional DW (Kimball); Table 27 DW-Bus Matrix Example"
      }
    ],
    "subtopic": "warehouse-bus-matrix",
    "family": "warehouse-bus-matrix",
    "difficulty": "uncalibrated",
    "reviewStatus": "draft-author-checked",
    "verificationDate": "2026-09-24",
    "editionBasis": "2017 section checked; full Revised Edition verification pending",
    "editorialReview": {
      "date": "2026-09-24",
      "method": "author revision in response to user-supplied blind review of 0.1.1",
      "status": "cold review of this revision pending"
    },
    "itemVersion": 2,
    "questionStyle": "concept"
  },
  {
    "id": "CDMP-P-035",
    "d": "BI",
    "t": "s",
    "q": "A customer dimension needs to show both the current sales territory and the immediately preceding territory in the same row. Older territories need not be retained, and no additional customer rows should be created. Which dimensional change-handling design fits?",
    "o": [
      "Insert a version row and close the preceding row's effective period",
      "Overwrite the existing value when the territory changes",
      "Keep current and prior values in separate columns on one row",
      "Normalize territories into a lookup while overwriting the customer link"
    ],
    "c": [
      2
    ],
    "e": "Type 3 preserves limited history through columns. It differs from Type 1 overwriting and Type 2 version rows; the requested design does not require a complete timeline.",
    "rationales": [
      "Type 2 version rows violate the stated single-row requirement.",
      "Type 1 overwriting removes the prior value from the dimensional row.",
      "This is the Type 3 approach: a limited prior value is held beside the current value.",
      "A normalized lookup can retain territories but an overwritten customer link does not preserve the customer's prior assignment."
    ],
    "sources": [
      {
        "title": "DAMA-DMBOK2, second edition (2017)",
        "url": "https://technicspub.com/wp-content/uploads/2023/07/DAMA-DMBOK2.pdf",
        "locator": "Chapter 5; section 1.3.4.2.2 Dimension Tables; Chapter 11 DW/BI"
      }
    ],
    "subtopic": "scd-type-three",
    "family": "scd-type-three",
    "difficulty": "uncalibrated",
    "reviewStatus": "draft-author-checked",
    "verificationDate": "2026-09-24",
    "editionBasis": "2017 section checked; full Revised Edition verification pending",
    "editorialReview": {
      "date": "2026-09-24",
      "method": "author revision in response to user-supplied blind review of 0.1.1",
      "status": "cold review of this revision pending"
    },
    "itemVersion": 2,
    "questionStyle": "scenario"
  },
  {
    "id": "CDMP-P-036",
    "d": "BI",
    "t": "s",
    "q": "A retailer needs a stable, reconciled view of sales performance across several operational systems and many years, even after source applications purge old transactions. Which foundation best supports that need?",
    "o": [
      "A canonical messaging service distributing operational changes",
      "An enterprise warehouse integrating time-variant analytical data",
      "An operational data store centered on current cross-system status",
      "A master-data hub resolving shared business-entity identities"
    ],
    "c": [
      1
    ],
    "e": "DW/BI turns data from operational and other sources into information suitable for analytical decisions.",
    "rationales": [
      "A messaging service moves data but does not supply the retained analytical structure.",
      "An integrated warehouse supports cross-process historical analysis independent of the operational retention windows.",
      "An ODS primarily supports current operational data and does not by itself supply the requested historical analytical foundation.",
      "An MDM hub reconciles core entities but does not replace a historical store of business-process facts."
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
      "method": "author revision in response to user-supplied blind review of 0.1.1",
      "status": "cold review of this revision pending"
    },
    "itemVersion": 2,
    "questionStyle": "scenario"
  },
  {
    "id": "CDMP-P-037",
    "d": "MM",
    "t": "s",
    "q": "Which metadata architecture supports changes initiated through a repository interface being coordinated back into the originating tools?",
    "o": [
      "Bi-directional",
      "Distributed",
      "Centralized",
      "Hybrid"
    ],
    "c": [
      0
    ],
    "e": "The defining feature is coordinated feedback to originating systems. A single portal, a repository or enrichment alone does not establish that capability.",
    "rationales": [
      "Bi-directional architecture coordinates changes back to original metadata sources.",
      "Distributed retrieval alone describes where metadata is fetched, not coordinated write-back.",
      "Centralized storage alone describes where metadata is held, not coordinated write-back.",
      "Hybrid retrieval and enrichment alone do not establish coordinated feedback to source tools."
    ],
    "sources": [
      {
        "title": "DAMA-DMBOK2, second edition (2017)",
        "url": "https://technicspub.com/wp-content/uploads/2023/07/DAMA-DMBOK2.pdf",
        "locator": "Chapter 12; section 1.3.6.4 Bi-Directional Metadata Architecture"
      }
    ],
    "subtopic": "bidirectional-metadata",
    "family": "bidirectional-metadata",
    "difficulty": "uncalibrated",
    "reviewStatus": "draft-author-checked",
    "verificationDate": "2026-09-24",
    "editionBasis": "2017 section checked; full Revised Edition verification pending",
    "editorialReview": {
      "date": "2026-09-24",
      "method": "author revision in response to user-supplied blind review of 0.1.1",
      "status": "cold review of this revision pending"
    },
    "itemVersion": 2,
    "questionStyle": "concept"
  },
  {
    "id": "CDMP-P-038",
    "d": "MM",
    "t": "s",
    "q": "In the library and information-science categorization discussed by DMBOK, which sequence classifies title and author, relationships among document parts, and archive/version details?",
    "o": [
      "Structural; administrative; descriptive",
      "Descriptive; structural; administrative",
      "Descriptive; administrative; structural",
      "Administrative; descriptive; structural"
    ],
    "c": [
      1
    ],
    "e": "This is an explicitly named classification context. It should not be confused with the separate business, technical and operational grouping used elsewhere in the chapter.",
    "rationales": [
      "This assigns each function to a different, inappropriate category.",
      "Descriptive metadata supports identification; structural metadata describes composition; administrative metadata supports resource management.",
      "The first category is right, but composition and management categories are reversed.",
      "Title/author identification is not the administrative function, and composition is not descriptive identification."
    ],
    "sources": [
      {
        "title": "DAMA-DMBOK2, second edition (2017)",
        "url": "https://technicspub.com/wp-content/uploads/2023/07/DAMA-DMBOK2.pdf",
        "locator": "Chapter 12; section 1.3.2 Types of Metadata; library/information-science categories"
      }
    ],
    "subtopic": "content-metadata-categories",
    "family": "content-metadata-categories",
    "difficulty": "uncalibrated",
    "reviewStatus": "draft-author-checked",
    "verificationDate": "2026-09-24",
    "editionBasis": "2017 section checked; full Revised Edition verification pending",
    "editorialReview": {
      "date": "2026-09-24",
      "method": "author revision in response to user-supplied blind review of 0.1.1",
      "status": "cold review of this revision pending"
    },
    "itemVersion": 2,
    "questionStyle": "concept"
  },
  {
    "id": "CDMP-P-039",
    "d": "MM",
    "t": "s",
    "q": "A catalog periodically harvests definitions from source tools into its own store. Users can query the catalog during a source outage, but may see yesterday's definitions. Which metadata architecture accounts for both observations?",
    "o": [
      "Centralized",
      "Hybrid",
      "Distributed",
      "Bi-directional"
    ],
    "c": [
      0
    ],
    "e": "The scenario describes centralized harvesting. Its availability and synchronization tradeoff differs from an architecture that delegates each query to the source tools.",
    "rationales": [
      "Stored copies provide source-independent retrieval but can lag source changes.",
      "Live portions of a hybrid query still depend on the corresponding sources being available.",
      "Live retrieval without a repository depends on source availability and does not explain these persisted copies.",
      "Bi-directional feedback does not by itself remove live-query dependence on source availability."
    ],
    "sources": [
      {
        "title": "DAMA-DMBOK2, second edition (2017)",
        "url": "https://technicspub.com/wp-content/uploads/2023/07/DAMA-DMBOK2.pdf",
        "locator": "Chapter 12; sections 1.3.6.1 Centralized Metadata Architecture through 1.3.6.4 Bi-Directional Metadata Architecture"
      }
    ],
    "subtopic": "centralized-metadata-tradeoff",
    "family": "centralized-metadata-tradeoff",
    "difficulty": "uncalibrated",
    "reviewStatus": "draft-author-checked",
    "verificationDate": "2026-09-24",
    "editionBasis": "2017 section checked; full Revised Edition verification pending",
    "editorialReview": {
      "date": "2026-09-24",
      "method": "author revision in response to user-supplied blind review of 0.1.1",
      "status": "cold review of this revision pending"
    },
    "itemVersion": 2,
    "questionStyle": "scenario"
  },
  {
    "id": "CDMP-P-040",
    "d": "MM",
    "t": "s",
    "q": "An audit finds that an approved mapping specifies a 30-day window, but the deployed transformation uses 28 days. Which lineage evidence establishes the behavior of the currently deployed pipeline?",
    "o": [
      "The mapping approval record documenting acceptance of the specification",
      "The business glossary entry defining the intended reporting window",
      "As Implemented lineage extracted from the deployed transformation",
      "As Designed lineage retained with the approved mapping"
    ],
    "c": [
      2
    ],
    "e": "DMBOK distinguishes As Designed from As Implemented lineage. A discrepancy needs investigation; approval of the intended mapping is not evidence that the implementation followed it.",
    "rationales": [
      "Approval establishes authorization of a design, not its faithful implementation.",
      "The definition helps assess correctness but does not prove which transformation is deployed.",
      "As Implemented lineage reflects the deployed logic whose behavior is being investigated.",
      "As Designed lineage establishes the intended mapping, which the scenario says differs from implementation."
    ],
    "sources": [
      {
        "title": "DAMA-DMBOK2, second edition (2017)",
        "url": "https://technicspub.com/wp-content/uploads/2023/07/DAMA-DMBOK2.pdf",
        "locator": "Chapter 12; section 4.1 Data Lineage and Impact Analysis"
      }
    ],
    "subtopic": "designed-implemented-lineage",
    "family": "designed-implemented-lineage",
    "difficulty": "uncalibrated",
    "reviewStatus": "draft-author-checked",
    "verificationDate": "2026-09-24",
    "editionBasis": "2017 section checked; full Revised Edition verification pending",
    "editorialReview": {
      "date": "2026-09-24",
      "method": "author revision in response to user-supplied blind review of 0.1.1",
      "status": "cold review of this revision pending"
    },
    "itemVersion": 2,
    "questionStyle": "scenario"
  }
] }));
