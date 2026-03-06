"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Send,
  DollarSign,
  FileText,
  Award,
  ClipboardList,
  Mail,
  MessageSquare,
  Search,
  X,
  Copy,
  Check,
  ChevronDown,
  Loader2,
  Building2,
  FolderKanban,
  Inbox,
  Sparkles,
} from "lucide-react";
import { WORKFLOWS } from "@/lib/ai/workflows";
import { SAMPLE_CRM_ENTITIES, searchCrmEntities } from "@/lib/ai/sample-data";
import type { WorkflowType, CrmEntity, AiMessage, WorkflowField } from "@/lib/ai/types";

const WORKFLOW_ICONS: Record<string, React.ElementType> = {
  DollarSign,
  FileText,
  Award,
  ClipboardList,
  Mail,
};

const ENTITY_TYPE_ICONS: Record<string, React.ElementType> = {
  project: FolderKanban,
  lead: Inbox,
  company: Building2,
};

function MarkdownContent({ content }: { content: string }) {
  // Simple markdown rendering: headings, bold, bullets, tables, horizontal rules
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let inTable = false;
  let tableRows: string[][] = [];
  let tableKey = 0;

  function flushTable() {
    if (tableRows.length > 0) {
      const headers = tableRows[0];
      const body = tableRows.slice(2); // skip separator row
      elements.push(
        <div key={`table-${tableKey++}`} className="my-4 overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                {headers.map((h, i) => (
                  <th key={i} className="border border-gray-700 bg-gray-800 px-3 py-2 text-left text-gray-300 font-semibold">
                    {formatInline(h.trim())}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {body.map((row, ri) => (
                <tr key={ri}>
                  {row.map((cell, ci) => (
                    <td key={ci} className="border border-gray-700 px-3 py-2 text-gray-300">
                      {formatInline(cell.trim())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      tableRows = [];
      inTable = false;
    }
  }

  function formatInline(text: string): React.ReactNode {
    // Bold
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={i} className="text-white font-semibold">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Table detection
    if (line.includes("|") && line.trim().startsWith("|")) {
      const cells = line.split("|").filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
      if (!inTable) inTable = true;
      tableRows.push(cells);
      continue;
    } else if (inTable) {
      flushTable();
    }

    // Headings
    if (line.startsWith("### ")) {
      elements.push(<h3 key={i} className="mt-5 mb-2 text-base font-bold text-emerald-400">{formatInline(line.slice(4))}</h3>);
    } else if (line.startsWith("## ")) {
      elements.push(<h2 key={i} className="mt-6 mb-2 text-lg font-bold text-emerald-300">{formatInline(line.slice(3))}</h2>);
    } else if (line.startsWith("# ")) {
      elements.push(<h1 key={i} className="mt-6 mb-3 text-xl font-bold text-white">{formatInline(line.slice(2))}</h1>);
    } else if (line.startsWith("---")) {
      elements.push(<hr key={i} className="my-4 border-gray-700" />);
    } else if (line.match(/^[\-\*] /)) {
      elements.push(
        <div key={i} className="flex gap-2 ml-2 my-0.5">
          <span className="text-emerald-500 mt-1 shrink-0">•</span>
          <span className="text-gray-300">{formatInline(line.slice(2))}</span>
        </div>
      );
    } else if (line.match(/^\d+\. /)) {
      const num = line.match(/^(\d+)\. /)?.[1];
      elements.push(
        <div key={i} className="flex gap-2 ml-2 my-0.5">
          <span className="text-emerald-500 mt-0 shrink-0 font-medium min-w-[1.25rem]">{num}.</span>
          <span className="text-gray-300">{formatInline(line.replace(/^\d+\. /, ""))}</span>
        </div>
      );
    } else if (line.trim() === "") {
      elements.push(<div key={i} className="h-2" />);
    } else {
      elements.push(<p key={i} className="text-gray-300 my-1">{formatInline(line)}</p>);
    }
  }

  if (inTable) flushTable();

  return <div className="space-y-0">{elements}</div>;
}

function EntityPicker({
  selectedEntity,
  onSelect,
  allowedTypes,
}: {
  selectedEntity?: CrmEntity;
  onSelect: (entity?: CrmEntity) => void;
  allowedTypes: string[];
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const filtered = query
    ? searchCrmEntities(query).filter((e) => allowedTypes.includes(e.type))
    : SAMPLE_CRM_ENTITIES.filter((e) => allowedTypes.includes(e.type));

  if (selectedEntity) {
    const Icon = ENTITY_TYPE_ICONS[selectedEntity.type] || Building2;
    return (
      <div className="flex items-center gap-2 rounded-lg border border-gray-600 bg-gray-750 px-3 py-2">
        <Icon className="h-4 w-4 text-emerald-400 shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-gray-200 truncate">{selectedEntity.name}</div>
          <div className="text-xs text-gray-500 truncate">{selectedEntity.subtitle}</div>
        </div>
        <button onClick={() => onSelect(undefined)} className="text-gray-500 hover:text-gray-300">
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div ref={ref} className="relative">
      <div
        className="flex items-center gap-2 rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 cursor-pointer hover:border-gray-600"
        onClick={() => setOpen(!open)}
      >
        <Search className="h-4 w-4 text-gray-500" />
        <input
          className="flex-1 bg-transparent text-sm text-gray-200 placeholder:text-gray-500 outline-none"
          placeholder="Link a project, lead, or company..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
        />
        <ChevronDown className="h-4 w-4 text-gray-500" />
      </div>
      {open && (
        <div className="absolute z-20 mt-1 w-full max-h-64 overflow-auto rounded-lg border border-gray-700 bg-gray-800 shadow-xl">
          {filtered.length === 0 ? (
            <div className="px-3 py-4 text-sm text-gray-500 text-center">No matching records</div>
          ) : (
            filtered.map((entity) => {
              const Icon = ENTITY_TYPE_ICONS[entity.type] || Building2;
              return (
                <button
                  key={entity.id}
                  className="flex w-full items-center gap-3 px-3 py-2.5 text-left hover:bg-gray-700"
                  onClick={() => {
                    onSelect(entity);
                    setQuery("");
                    setOpen(false);
                  }}
                >
                  <Icon className="h-4 w-4 text-gray-400 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-gray-200 truncate">{entity.name}</div>
                    <div className="text-xs text-gray-500 truncate">{entity.subtitle}</div>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-gray-600 font-medium">{entity.type}</span>
                </button>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}

function WorkflowForm({
  fields,
  values,
  onChange,
}: {
  fields: WorkflowField[];
  values: Record<string, string>;
  onChange: (key: string, value: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {fields.map((field) => {
        const isFullWidth = field.type === "textarea";
        return (
          <div key={field.key} className={isFullWidth ? "col-span-2" : ""}>
            <label className="block text-xs font-medium text-gray-400 mb-1">
              {field.label}
              {field.required && <span className="text-red-400 ml-0.5">*</span>}
            </label>
            {field.type === "textarea" ? (
              <textarea
                value={values[field.key] || ""}
                onChange={(e) => onChange(field.key, e.target.value)}
                placeholder={field.placeholder}
                className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-200 placeholder:text-gray-600 focus:border-emerald-500 focus:outline-none resize-none"
                rows={2}
              />
            ) : field.type === "select" ? (
              <select
                value={values[field.key] || ""}
                onChange={(e) => onChange(field.key, e.target.value)}
                className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-200 focus:border-emerald-500 focus:outline-none"
              >
                <option value="">Select...</option>
                {field.options?.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            ) : (
              <input
                type={field.type === "number" ? "number" : "text"}
                value={values[field.key] || ""}
                onChange={(e) => onChange(field.key, e.target.value)}
                placeholder={field.placeholder}
                className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-200 placeholder:text-gray-600 focus:border-emerald-500 focus:outline-none"
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function AiChatPage() {
  const [activeWorkflow, setActiveWorkflow] = useState<WorkflowType>("conceptual-estimate");
  const [selectedEntity, setSelectedEntity] = useState<CrmEntity | undefined>();
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [additionalContext, setAdditionalContext] = useState("");
  const [messages, setMessages] = useState<AiMessage[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [chatInput, setChatInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const workflow = WORKFLOWS.find((w) => w.id === activeWorkflow);
  const isChat = activeWorkflow === "chat";

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Reset form when switching workflows
  useEffect(() => {
    setFormValues({});
    setAdditionalContext("");
  }, [activeWorkflow]);

  const handleFormChange = useCallback((key: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  }, []);

  async function handleGenerate() {
    if (isGenerating) return;

    const userSummary = isChat
      ? chatInput
      : `Generate **${workflow?.label}**${selectedEntity ? ` for ${selectedEntity.name}` : ""}`;

    const userMsg: AiMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: userSummary,
      workflow: activeWorkflow,
      timestamp: new Date(),
    };

    const assistantMsg: AiMessage = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: "",
      workflow: activeWorkflow,
      timestamp: new Date(),
      isGenerating: true,
    };

    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setIsGenerating(true);
    if (isChat) setChatInput("");

    try {
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          workflow: activeWorkflow,
          entity: selectedEntity,
          fields: isChat ? {} : formValues,
          additionalContext: isChat ? chatInput : additionalContext,
        }),
      });

      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error("No stream reader");

      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") break;
            try {
              const parsed = JSON.parse(data);
              if (parsed.text) {
                setMessages((prev) => {
                  const updated = [...prev];
                  const last = updated[updated.length - 1];
                  if (last.role === "assistant") {
                    updated[updated.length - 1] = {
                      ...last,
                      content: last.content + parsed.text,
                    };
                  }
                  return updated;
                });
              }
              if (parsed.error) {
                setMessages((prev) => {
                  const updated = [...prev];
                  const last = updated[updated.length - 1];
                  if (last.role === "assistant") {
                    updated[updated.length - 1] = {
                      ...last,
                      content: `Error: ${parsed.error}`,
                      isGenerating: false,
                    };
                  }
                  return updated;
                });
              }
            } catch {
              // skip malformed JSON
            }
          }
        }
      }
    } catch (err: any) {
      setMessages((prev) => {
        const updated = [...prev];
        const last = updated[updated.length - 1];
        if (last.role === "assistant") {
          updated[updated.length - 1] = {
            ...last,
            content: `Error: ${err.message || "Failed to generate content. Make sure ANTHROPIC_API_KEY is set."}`,
            isGenerating: false,
          };
        }
        return updated;
      });
    } finally {
      setIsGenerating(false);
      setMessages((prev) => {
        const updated = [...prev];
        const last = updated[updated.length - 1];
        if (last.role === "assistant") {
          updated[updated.length - 1] = { ...last, isGenerating: false };
        }
        return updated;
      });
    }
  }

  function copyToClipboard(id: string, content: string) {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  return (
    <div className="flex flex-1 overflow-hidden bg-gray-900">
      {/* Left Sidebar - Workflow Selector */}
      <div className="w-64 shrink-0 border-r border-gray-700 bg-gray-800 flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-200">
            <Sparkles className="h-4 w-4 text-emerald-400" />
            AI Workflows
          </div>
        </div>

        <div className="flex-1 overflow-auto p-2 space-y-0.5">
          <p className="px-3 py-1.5 text-[10px] font-semibold tracking-wider text-gray-500 uppercase">
            Generate Documents
          </p>
          {WORKFLOWS.map((wf) => {
            const Icon = WORKFLOW_ICONS[wf.icon] || FileText;
            const isActive = activeWorkflow === wf.id;
            return (
              <button
                key={wf.id}
                onClick={() => setActiveWorkflow(wf.id as WorkflowType)}
                className={`flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-left transition-colors ${
                  isActive
                    ? "bg-emerald-600/20 text-emerald-400 border border-emerald-600/30"
                    : "text-gray-400 hover:bg-gray-700 hover:text-gray-200 border border-transparent"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="text-sm truncate">{wf.label}</span>
              </button>
            );
          })}

          <div className="h-2" />
          <p className="px-3 py-1.5 text-[10px] font-semibold tracking-wider text-gray-500 uppercase">
            Other
          </p>
          <button
            onClick={() => setActiveWorkflow("chat")}
            className={`flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-left transition-colors ${
              isChat
                ? "bg-emerald-600/20 text-emerald-400 border border-emerald-600/30"
                : "text-gray-400 hover:bg-gray-700 hover:text-gray-200 border border-transparent"
            }`}
          >
            <MessageSquare className="h-4 w-4 shrink-0" />
            <span className="text-sm">Free Chat</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top: Form Panel (for document workflows) */}
        {!isChat && workflow && (
          <div className="border-b border-gray-700 bg-gray-850 p-5 overflow-auto max-h-[45%]">
            <div className="max-w-3xl mx-auto space-y-4">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  {React.createElement(WORKFLOW_ICONS[workflow.icon] || FileText, {
                    className: "h-5 w-5 text-emerald-400",
                  })}
                  {workflow.label}
                </h2>
                <p className="text-sm text-gray-400 mt-1">{workflow.description}</p>
              </div>

              {/* Entity Picker */}
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">
                  Link CRM Record (auto-fills context)
                </label>
                <EntityPicker
                  selectedEntity={selectedEntity}
                  onSelect={setSelectedEntity}
                  allowedTypes={workflow.entityTypes}
                />
              </div>

              {/* Workflow Fields */}
              <WorkflowForm
                fields={workflow.fields}
                values={formValues}
                onChange={handleFormChange}
              />

              {/* Additional Context */}
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">
                  Additional Context (optional)
                </label>
                <textarea
                  value={additionalContext}
                  onChange={(e) => setAdditionalContext(e.target.value)}
                  placeholder="Any extra details, preferences, or instructions..."
                  className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-200 placeholder:text-gray-600 focus:border-emerald-500 focus:outline-none resize-none"
                  rows={2}
                />
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Generate {workflow.label}
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Messages / Output Area */}
        <div className="flex-1 overflow-auto p-5">
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-600/20">
                  <Sparkles className="h-7 w-7 text-emerald-400" />
                </div>
                <h2 className="text-xl font-bold text-white mb-2">
                  {isChat ? "Construction AI Assistant" : `Generate ${workflow?.label || "Document"}`}
                </h2>
                <p className="text-gray-500 max-w-md">
                  {isChat
                    ? "Ask anything about construction — costs, methods, materials, scheduling, or get help analyzing your CRM data."
                    : "Fill out the form above and click Generate. Link a CRM record to automatically pull in project details."}
                </p>
              </div>
            )}

            {messages.map((msg) => (
              <div key={msg.id} className={msg.role === "user" ? "flex justify-end" : ""}>
                {msg.role === "user" ? (
                  <div className="max-w-md rounded-lg bg-emerald-600/20 border border-emerald-600/30 px-4 py-2.5">
                    <p className="text-sm text-emerald-200">
                      <MarkdownContent content={msg.content} />
                    </p>
                  </div>
                ) : (
                  <div className="rounded-lg border border-gray-700 bg-gray-800/50 px-5 py-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
                        AI Generated
                        {msg.isGenerating && (
                          <Loader2 className="h-3 w-3 animate-spin text-emerald-400" />
                        )}
                      </div>
                      {!msg.isGenerating && msg.content && (
                        <button
                          onClick={() => copyToClipboard(msg.id, msg.content)}
                          className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-300 transition-colors"
                        >
                          {copiedId === msg.id ? (
                            <>
                              <Check className="h-3.5 w-3.5 text-emerald-400" />
                              <span className="text-emerald-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-3.5 w-3.5" />
                              Copy
                            </>
                          )}
                        </button>
                      )}
                    </div>
                    <div className="prose-sm">
                      <MarkdownContent content={msg.content || (msg.isGenerating ? "Thinking..." : "")} />
                    </div>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Chat Input (for free chat mode) */}
        {isChat && (
          <div className="border-t border-gray-700 bg-gray-800 p-4">
            <div className="max-w-3xl mx-auto">
              {/* Entity picker for chat */}
              <div className="mb-3">
                <EntityPicker
                  selectedEntity={selectedEntity}
                  onSelect={setSelectedEntity}
                  allowedTypes={["project", "lead", "company"]}
                />
              </div>
              <div className="flex gap-2">
                <textarea
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      if (chatInput.trim() && !isGenerating) handleGenerate();
                    }
                  }}
                  placeholder="Ask about costs, schedules, materials, project data..."
                  className="flex-1 rounded-lg border border-gray-700 bg-gray-900 px-4 py-2.5 text-sm text-gray-200 placeholder:text-gray-500 focus:border-emerald-500 focus:outline-none resize-none"
                  rows={2}
                />
                <button
                  onClick={handleGenerate}
                  disabled={!chatInput.trim() || isGenerating}
                  className="self-end rounded-lg bg-emerald-600 p-2.5 text-white hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isGenerating ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Send className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
