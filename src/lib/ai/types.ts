export type WorkflowType =
  | "conceptual-estimate"
  | "marketing-one-pager"
  | "capability-statement"
  | "project-summary"
  | "qualification-letter"
  | "chat";

export interface WorkflowConfig {
  id: WorkflowType;
  label: string;
  description: string;
  icon: string;
  fields: WorkflowField[];
  entityTypes: CrmEntityType[];
}

export interface WorkflowField {
  key: string;
  label: string;
  type: "text" | "textarea" | "number" | "select";
  placeholder?: string;
  required?: boolean;
  options?: { label: string; value: string }[];
}

export type CrmEntityType = "project" | "lead" | "company";

export interface CrmEntity {
  id: string;
  type: CrmEntityType;
  name: string;
  subtitle?: string;
  data: Record<string, any>;
}

export interface GenerationRequest {
  workflow: WorkflowType;
  entity?: CrmEntity;
  fields: Record<string, string>;
  additionalContext?: string;
}

export interface AiMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  workflow?: WorkflowType;
  timestamp: Date;
  isGenerating?: boolean;
}
