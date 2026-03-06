import { CrmEntity, WorkflowType } from "./types";

const SYSTEM_PROMPT = `You are an expert construction industry AI assistant embedded in a contractor's CRM system (Blackstone CRM). You help general contractors, construction managers, and preconstruction teams generate professional documents quickly.

Key principles:
- Use construction industry terminology accurately
- Be specific with numbers, ranges, and assumptions
- Always state assumptions and exclusions clearly
- Format output with clear headings and sections using markdown
- Keep language professional but not overly formal
- Tailor content to the specific market sector and client type`;

function formatEntityContext(entity?: CrmEntity): string {
  if (!entity) return "";

  const d = entity.data;
  const lines: string[] = [`\n--- CRM Context: ${entity.type.toUpperCase()} ---`];

  if (entity.type === "project") {
    lines.push(`Project Name: ${d.name}`);
    if (d.contractValue) lines.push(`Contract Value: $${Number(d.contractValue).toLocaleString()}`);
    if (d.stage) lines.push(`Stage: ${d.stage}`);
    if (d.company) lines.push(`Client Company: ${d.company}`);
    if (d.division) lines.push(`Division: ${d.division}`);
    if (d.gsf) lines.push(`Gross Square Feet: ${Number(d.gsf).toLocaleString()}`);
    if (d.units) lines.push(`Units: ${d.units}`);
    if (d.constructionType) lines.push(`Construction Type: ${d.constructionType}`);
    if (d.address) lines.push(`Location: ${[d.address, d.city, d.state].filter(Boolean).join(", ")}`);
    if (d.constructionStart) lines.push(`Construction Start: ${d.constructionStart}`);
    if (d.constructionEnd) lines.push(`Construction End: ${d.constructionEnd}`);
    if (d.projectDuration) lines.push(`Duration: ${d.projectDuration} months`);
    if (d.projectFeatures) lines.push(`Features: ${d.projectFeatures}`);
    if (d.deliveryMethod) lines.push(`Delivery Method: ${d.deliveryMethod}`);
    if (d.marketSector) lines.push(`Market Sector: ${d.marketSector}`);
  } else if (entity.type === "lead") {
    lines.push(`Lead Name: ${d.name}`);
    if (d.value) lines.push(`Estimated Value: $${Number(d.value).toLocaleString()}`);
    if (d.status) lines.push(`Status: ${d.status}`);
    if (d.company) lines.push(`Company: ${d.company}`);
    if (d.gsf) lines.push(`Gross Square Feet: ${Number(d.gsf).toLocaleString()}`);
    if (d.units) lines.push(`Units: ${d.units}`);
    if (d.source) lines.push(`Source: ${d.source}`);
    if (d.address) lines.push(`Location: ${[d.address, d.city, d.state].filter(Boolean).join(", ")}`);
    if (d.marketSector) lines.push(`Market Sector: ${d.marketSector}`);
    if (d.deliveryMethod) lines.push(`Delivery Method: ${d.deliveryMethod}`);
    if (d.constructionDuration) lines.push(`Est. Duration: ${d.constructionDuration} months`);
  } else if (entity.type === "company") {
    lines.push(`Company Name: ${d.name}`);
    if (d.category) lines.push(`Category: ${d.category}`);
    if (d.address) lines.push(`Location: ${[d.address, d.city, d.state].filter(Boolean).join(", ")}`);
    if (d.website) lines.push(`Website: ${d.website}`);
    if (d.description) lines.push(`Description: ${d.description}`);
    if (d.industries) lines.push(`Industries: ${d.industries}`);
  }

  lines.push("--- End CRM Context ---\n");
  return lines.join("\n");
}

const WORKFLOW_PROMPTS: Record<WorkflowType, (fields: Record<string, string>, entity?: CrmEntity) => string> = {
  "conceptual-estimate": (fields, entity) => `Generate a conceptual / rough order-of-magnitude (ROM) construction cost estimate.

${formatEntityContext(entity)}

Project Parameters:
- Project Type: ${fields.projectType || "Not specified"}
- Gross Square Feet: ${fields.gsf || "Not specified"}
- Number of Stories: ${fields.stories || "Not specified"}
- Location: ${fields.location || "Not specified"}
- Construction Type: ${fields.constructionType || "New Construction"}
- Quality Level: ${fields.qualityLevel || "Standard"}
${fields.specialConditions ? `- Special Conditions: ${fields.specialConditions}` : ""}

Please provide:
1. **Executive Summary** - One paragraph overview of the estimate
2. **Cost Breakdown by CSI Division** - Major cost categories with estimated ranges (use $/SF ranges appropriate for the project type, quality level, and location)
3. **Soft Costs** - Design fees, permits, testing, insurance, etc.
4. **Contingency Recommendations** - Design contingency, escalation, and owner contingency percentages
5. **Total Project Cost Range** - Low, mid, and high estimates
6. **Key Assumptions & Exclusions** - What's included and what's not
7. **Market Factors** - Current market conditions affecting pricing in this area

Format as a professional estimate document. Use tables where appropriate. All dollar amounts should use proper formatting.`,

  "marketing-one-pager": (fields, entity) => `Create a compelling marketing one-pager / project fact sheet for a construction company's business development efforts.

${formatEntityContext(entity)}

Parameters:
- Target Client/Audience: ${fields.targetClient || "General"}
- Key Project Highlights: ${fields.projectHighlights || "Use CRM context"}
- Company Strengths: ${fields.companyStrengths || "General construction expertise"}
- Tone: ${fields.tone || "Professional"}
- Call to Action: ${fields.callToAction || "Contact us to discuss your project"}

Please generate a one-pager with these sections:
1. **Headline** - Attention-grabbing project/company title
2. **Project Snapshot** - Quick facts (type, size, value, location, timeline) in a scannable format
3. **Project Description** - 2-3 compelling paragraphs about scope and approach
4. **Why Us** - 3-5 bullet points on company differentiators relevant to THIS client
5. **Relevant Experience** - 3-4 similar completed projects (create plausible examples based on the market sector)
6. **Key Team Members** - Suggest roles to feature (Project Executive, PM, Superintendent)
7. **Call to Action** - Professional closing with next steps

Format for easy copy into a designed template. Use markdown headings, bullets, and bold text for emphasis.`,

  "capability-statement": (fields, entity) => `Generate a tailored capability statement for a general contractor / construction management firm.

${formatEntityContext(entity)}

Parameters:
- Target Organization: ${fields.targetOrg || "Not specified"}
- Market Sector Focus: ${fields.marketSector || "Commercial"}
- Certifications: ${fields.certifications || "Not specified"}
- Core Competencies: ${fields.coreCompetencies || "General contracting, preconstruction, construction management"}
- Key Differentiators: ${fields.differentiators || "Use context to determine"}

Generate a capability statement with these sections:
1. **Company Overview** - Brief company description tailored to resonate with the target organization
2. **Core Competencies** - Detailed list of services and specialties relevant to the target
3. **Certifications & Designations** - Professional certifications, bonding capacity, safety ratings
4. **Relevant Project Experience** - 4-6 relevant projects with name, client, value, size, and brief description (create plausible examples matching the market sector)
5. **Key Personnel** - Suggest leadership roles and qualifications to feature
6. **Safety Record** - EMR, OSHA rates, safety program highlights
7. **Company Facts** - Founded year, annual revenue range, number of employees, bonding capacity, service area
8. **NAICS / NIGP Codes** - Relevant codes for the market sector
9. **Contact Information** - Placeholder format

This should be formatted to fit on 1-2 pages when designed. Use professional, confident language tailored to ${fields.targetOrg || "the target organization"}.`,

  "project-summary": (fields, entity) => `Generate an executive project summary / brief for construction stakeholders.

${formatEntityContext(entity)}

Parameters:
- Target Audience: ${fields.audience || "Executive"}
- Focus Areas: ${fields.focusAreas || "Overall project status"}
- Include Financial Details: ${fields.includeFinancials || "high-level"}

Generate a professional project summary including:
1. **Executive Overview** - Project name, client, scope, and current status
2. **Key Metrics** - Contract value, timeline, completion percentage, key dates
3. **Scope Summary** - What the project includes
4. **Schedule Status** - Key milestones and current progress
${fields.includeFinancials !== "no" ? "5. **Financial Summary** - Budget status, change orders, forecast\n" : ""}6. **Team** - Key project personnel
7. **Risks & Issues** - Current challenges and mitigation strategies
8. **Next Steps** - Upcoming milestones and action items

Tailor the depth and language for a ${fields.audience || "executive"} audience.`,

  "qualification-letter": (fields, entity) => `Draft a professional qualification / introduction letter from a general contractor to a prospective client.

${formatEntityContext(entity)}

Parameters:
- Recipient: ${fields.recipientName || "Prospective Client"}
- Organization: ${fields.recipientOrg || "Not specified"}
- Project/Opportunity: ${fields.projectReference || "General qualification"}
- Relevant Experience: ${fields.relevantExperience || "Use context"}
- Tone: ${fields.tone || "Professional but warm"}

Write a compelling letter that:
1. Opens with a personalized introduction referencing the specific opportunity
2. Establishes credibility with relevant project experience
3. Highlights 2-3 key differentiators specific to their needs
4. Demonstrates understanding of their organization and goals
5. Includes a clear, professional call to action
6. Closes with confidence and warmth

The letter should be 1-1.5 pages, professional, and feel personalized—not generic. Use a ${fields.tone || "professional"} tone throughout.`,

  chat: (_fields, entity) => `You are a construction industry AI assistant. Help the user with their question.

${formatEntityContext(entity)}

Provide helpful, accurate information using construction industry expertise. If referencing CRM data, use the context provided above.`,
};

export function buildPrompt(
  workflow: WorkflowType,
  fields: Record<string, string>,
  entity?: CrmEntity,
  additionalContext?: string
): { system: string; user: string } {
  const userPrompt = WORKFLOW_PROMPTS[workflow](fields, entity);
  const extra = additionalContext ? `\n\nAdditional context from user: ${additionalContext}` : "";

  return {
    system: SYSTEM_PROMPT,
    user: userPrompt + extra,
  };
}
