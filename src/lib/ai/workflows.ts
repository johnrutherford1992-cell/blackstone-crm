import { WorkflowConfig } from "./types";

export const WORKFLOWS: WorkflowConfig[] = [
  {
    id: "conceptual-estimate",
    label: "Conceptual Estimate",
    description: "Generate a rough order-of-magnitude cost estimate for a project based on type, size, location, and market conditions.",
    icon: "DollarSign",
    entityTypes: ["project", "lead"],
    fields: [
      { key: "projectType", label: "Project Type", type: "select", required: true, options: [
        { label: "Commercial Office", value: "commercial-office" },
        { label: "Retail / Mixed-Use", value: "retail-mixed-use" },
        { label: "Healthcare / Medical", value: "healthcare" },
        { label: "Industrial / Warehouse", value: "industrial" },
        { label: "Education / Institutional", value: "education" },
        { label: "Residential - Multi-Family", value: "residential-multi" },
        { label: "Residential - Custom", value: "residential-custom" },
        { label: "Hospitality", value: "hospitality" },
        { label: "Renovation / TI", value: "renovation" },
        { label: "Infrastructure / Site Work", value: "infrastructure" },
      ]},
      { key: "gsf", label: "Gross Square Feet", type: "number", placeholder: "e.g. 50000" },
      { key: "stories", label: "Number of Stories", type: "number", placeholder: "e.g. 4" },
      { key: "location", label: "Location (City, State)", type: "text", placeholder: "e.g. Austin, TX" },
      { key: "constructionType", label: "Construction Type", type: "select", options: [
        { label: "New Construction", value: "new" },
        { label: "Renovation", value: "renovation" },
        { label: "Tenant Improvement", value: "tenant-improvement" },
        { label: "Addition", value: "addition" },
      ]},
      { key: "qualityLevel", label: "Quality Level", type: "select", options: [
        { label: "Economy", value: "economy" },
        { label: "Standard", value: "standard" },
        { label: "Above Average", value: "above-average" },
        { label: "Premium / Class A", value: "premium" },
      ]},
      { key: "specialConditions", label: "Special Conditions / Notes", type: "textarea", placeholder: "LEED cert, phased delivery, occupied renovation, parking structure, etc." },
    ],
  },
  {
    id: "marketing-one-pager",
    label: "Marketing 1-Pager",
    description: "Create a client-ready project summary sheet highlighting scope, team qualifications, and key differentiators.",
    icon: "FileText",
    entityTypes: ["project", "lead", "company"],
    fields: [
      { key: "targetClient", label: "Target Client / Audience", type: "text", required: true, placeholder: "e.g. Seton Healthcare Family" },
      { key: "projectHighlights", label: "Key Project Highlights", type: "textarea", placeholder: "Unique features, sustainability goals, design elements..." },
      { key: "companyStrengths", label: "Company Strengths to Emphasize", type: "textarea", placeholder: "Safety record, local experience, preconstruction expertise..." },
      { key: "tone", label: "Tone", type: "select", options: [
        { label: "Professional / Corporate", value: "professional" },
        { label: "Approachable / Collaborative", value: "approachable" },
        { label: "Technical / Detailed", value: "technical" },
        { label: "Bold / Competitive", value: "bold" },
      ]},
      { key: "callToAction", label: "Call to Action", type: "text", placeholder: "e.g. Schedule a preconstruction meeting" },
    ],
  },
  {
    id: "capability-statement",
    label: "Capability Statement",
    description: "Generate a tailored capability statement showcasing relevant experience, certifications, and qualifications for a specific client or RFP.",
    icon: "Award",
    entityTypes: ["company", "project", "lead"],
    fields: [
      { key: "targetOrg", label: "Target Organization", type: "text", required: true, placeholder: "e.g. City of Austin, Google, UT System" },
      { key: "marketSector", label: "Market Sector Focus", type: "select", required: true, options: [
        { label: "Commercial", value: "commercial" },
        { label: "Healthcare", value: "healthcare" },
        { label: "Education", value: "education" },
        { label: "Government / Public", value: "government" },
        { label: "Industrial", value: "industrial" },
        { label: "Residential", value: "residential" },
        { label: "Mixed-Use", value: "mixed-use" },
      ]},
      { key: "certifications", label: "Certifications / Designations", type: "textarea", placeholder: "MBE, WBE, HUB, LEED AP, bonding capacity, safety certifications..." },
      { key: "coreCompetencies", label: "Core Competencies", type: "textarea", placeholder: "Preconstruction, design-build, self-perform, virtual design & construction..." },
      { key: "differentiators", label: "Key Differentiators", type: "textarea", placeholder: "What sets you apart from competitors?" },
    ],
  },
  {
    id: "project-summary",
    label: "Project Summary / Brief",
    description: "Generate an executive project summary for internal stakeholders or client presentations.",
    icon: "ClipboardList",
    entityTypes: ["project", "lead"],
    fields: [
      { key: "audience", label: "Target Audience", type: "select", required: true, options: [
        { label: "Executive / Leadership", value: "executive" },
        { label: "Client Presentation", value: "client" },
        { label: "Project Team", value: "team" },
        { label: "Board / Investors", value: "board" },
      ]},
      { key: "focusAreas", label: "Focus Areas", type: "textarea", placeholder: "Budget, schedule, milestones, risks, team assignments..." },
      { key: "includeFinancials", label: "Include Financial Details?", type: "select", options: [
        { label: "Yes - Full Detail", value: "full" },
        { label: "Yes - High Level Only", value: "high-level" },
        { label: "No", value: "no" },
      ]},
    ],
  },
  {
    id: "qualification-letter",
    label: "Qualification / Intro Letter",
    description: "Draft a personalized qualification or introduction letter for a prospective client or RFQ/RFP response.",
    icon: "Mail",
    entityTypes: ["company", "lead"],
    fields: [
      { key: "recipientName", label: "Recipient Name & Title", type: "text", required: true, placeholder: "e.g. Jane Smith, VP of Facilities" },
      { key: "recipientOrg", label: "Recipient Organization", type: "text", required: true, placeholder: "e.g. University of Texas at Austin" },
      { key: "projectReference", label: "Project / Opportunity Reference", type: "text", placeholder: "e.g. New Engineering Building RFQ #2024-0312" },
      { key: "relevantExperience", label: "Relevant Experience to Highlight", type: "textarea", placeholder: "Similar projects, client relationships, local knowledge..." },
      { key: "tone", label: "Tone", type: "select", options: [
        { label: "Formal", value: "formal" },
        { label: "Professional but Warm", value: "warm" },
        { label: "Confident / Assertive", value: "confident" },
      ]},
    ],
  },
];

export function getWorkflow(id: string): WorkflowConfig | undefined {
  return WORKFLOWS.find((w) => w.id === id);
}
