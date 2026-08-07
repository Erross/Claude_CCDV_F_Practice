// Public course catalog and release manifest.
//
// This file contains display/blueprint metadata only. Question banks are separate
// assets and the deployment build copies only assets marked "available" here.

registerCourseMetadata([
  {
    code: "CCAO-F",
    name: "Claude Certified Associate",
    tier: "Foundations",
    status: "available",
    asset: "data/ccao-f.js",
    bankSize: 246,
    blurb: "The non-developer credential: structured prompting, judging output quality, choosing the right product feature and model, configuring Projects, and responsible use.",
    items: 60,
    minutes: 120,
    passScore: 720,
    domains: [
      { id: "A2", name: "Output Evaluation and Validation", weight: 21, examCount: 13 },
      { id: "A4", name: "Workflow Integration and Solution Design", weight: 16, examCount: 10 },
      { id: "A6", name: "Governance, Risk, and Responsible Use", weight: 15, examCount: 9 },
      { id: "A1", name: "Prompting and Task Execution", weight: 14, examCount: 8 },
      { id: "A3", name: "Product and Model Selection", weight: 12, examCount: 7 },
      { id: "A5", name: "Configuration and Knowledge Management", weight: 12, examCount: 7 },
      { id: "A7", name: "Troubleshooting and Optimisation", weight: 10, examCount: 6 }
    ]
  },
  {
    code: "CCDV-F",
    name: "Claude Certified Developer",
    tier: "Foundations",
    status: "available",
    asset: "data/ccdv-f.js",
    bankSize: 208,
    blurb: "Hands-on building: Claude API mechanics, agents and workflows, Claude Code, model selection, prompting, security, and MCP.",
    items: 53,
    minutes: 120,
    passScore: 720,
    domains: [
      { id: "D2", name: "Applications and Integration", weight: 33.1, examCount: 17 },
      { id: "D5", name: "Model Selection and Optimization", weight: 16.8, examCount: 9 },
      { id: "D1", name: "Agents and Workflows", weight: 14.7, examCount: 8 },
      { id: "D6", name: "Prompt and Context Engineering", weight: 11, examCount: 6 },
      { id: "D8", name: "Tools and MCPs", weight: 10.6, examCount: 6 },
      { id: "D7", name: "Security and Safety", weight: 8.1, examCount: 4 },
      { id: "D3", name: "Claude Code", weight: 3.1, examCount: 2 },
      { id: "D4", name: "Eval, Testing, and Debugging", weight: 2.6, examCount: 1 }
    ]
  },
  {
    code: "CCAR-F",
    name: "Claude Certified Architect",
    tier: "Foundations",
    status: "available",
    asset: "data/ccar-f.js",
    bankSize: 164,
    blurb: "Scenario-based architecture judgement: agentic loops and orchestration, tool and MCP design, Claude Code configuration, prompting, and context reliability.",
    items: 60,
    minutes: 120,
    passScore: 720,
    domains: [
      { id: "R1", name: "Agentic Architecture", weight: 27 },
      { id: "R3", name: "Claude Code & Workflows", weight: 20 },
      { id: "R4", name: "Prompt Engineering & Output", weight: 20 },
      { id: "R2", name: "Tool Design & MCP", weight: 18 },
      { id: "R5", name: "Context & Reliability", weight: 15 }
    ]
  },
  {
    code: "CCAR-P",
    name: "Claude Certified Architect",
    tier: "Professional",
    status: "coming-soon",
    asset: "data/ccar-p.js",
    bankSize: 74,
    blurb: "Owning a production Claude system end to end: solution design, enterprise integration, evaluation, governance, and the stakeholder work around it.",
    items: 63,
    minutes: 120,
    passScore: 720,
    domains: [
      { id: "P3", name: "Integration", weight: 19, examCount: 12 },
      { id: "P1", name: "Solution Design & Architecture", weight: 17, examCount: 11 },
      { id: "P4", name: "Evaluation, Testing & Optimisation", weight: 16, examCount: 10 },
      { id: "P5", name: "Governance, Safety & Risk Management", weight: 14, examCount: 9 },
      { id: "P6", name: "Stakeholder Communication & Lifecycle", weight: 14, examCount: 9 },
      { id: "P2", name: "Claude Models, Prompting & Context", weight: 13, examCount: 8 },
      { id: "P7", name: "Developer Productivity & Enablement", weight: 7, examCount: 4 }
    ]
  }
]);
