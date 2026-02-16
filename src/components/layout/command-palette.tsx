"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowRight, Plus } from "lucide-react";

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

const COMMANDS = [
  { label: "Home", href: "/home", type: "page" },
  { label: "Timeline", href: "/timeline", type: "page" },
  { label: "Map", href: "/map", type: "page" },
  { label: "AI Chat", href: "/ai-chat", type: "page" },
  { label: "Calendar", href: "/calendar", type: "page" },
  { label: "Leads", href: "/crm/leads", type: "page" },
  { label: "Directory", href: "/crm/directory", type: "page" },
  { label: "Contacts", href: "/crm/contacts", type: "page" },
  { label: "Projects", href: "/crm/projects", type: "page" },
  { label: "Tasks", href: "/crm/tasks", type: "page" },
  { label: "Activity", href: "/crm/activity", type: "page" },
  { label: "Forecast", href: "/analytics/forecast", type: "page" },
  { label: "Insights", href: "/analytics/insights", type: "page" },
  { label: "Reports", href: "/analytics/reports", type: "page" },
  { label: "Cost Models", href: "/analytics/cost-models", type: "page" },
  { label: "Workforce Dashboard", href: "/workforce", type: "page" },
  { label: "Assignments", href: "/workforce/assignments", type: "page" },
  { label: "Utilization", href: "/workforce/utilization", type: "page" },
  { label: "Employees", href: "/workforce/employees", type: "page" },
  { label: "Settings", href: "/settings", type: "page" },
  { label: "Create Task", href: "#create-task", type: "action" },
];

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    if (!query) return COMMANDS;
    const q = query.toLowerCase();
    return COMMANDS.filter((cmd) => cmd.label.toLowerCase().includes(q));
  }, [query]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
      }
      if (e.key === "Enter" && filtered[selectedIndex]) {
        e.preventDefault();
        const cmd = filtered[selectedIndex];
        if (cmd.href !== "#create-task") {
          router.push(cmd.href);
        }
        onClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, filtered, selectedIndex, router, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-50 w-full max-w-xl rounded-xl border border-gray-200 bg-white shadow-2xl">
        <div className="flex items-center gap-3 border-b border-gray-200 px-4 py-3">
          <Search className="h-5 w-5 text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command or search..."
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-gray-400"
          />
          <kbd className="rounded border border-gray-300 bg-gray-100 px-1.5 py-0.5 text-[10px] text-gray-500">
            ESC
          </kbd>
        </div>
        <div className="max-h-[50vh] overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <div className="px-4 py-8 text-center text-sm text-gray-500">
              No results found
            </div>
          ) : (
            filtered.map((cmd, i) => (
              <button
                key={cmd.href}
                onClick={() => {
                  if (cmd.href !== "#create-task") router.push(cmd.href);
                  onClose();
                }}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                  i === selectedIndex
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {cmd.type === "action" ? (
                  <Plus className="h-4 w-4" />
                ) : (
                  <ArrowRight className="h-4 w-4" />
                )}
                <span>
                  {cmd.type === "page" ? "Go to " : ""}
                  {cmd.label}
                </span>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
