"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Lock, Globe, Plus } from "lucide-react";

interface View {
  id: string;
  name: string;
  count?: number;
  isActive?: boolean;
}

interface ViewsSidebarProps {
  personalViews: View[];
  sharedViews: View[];
  activeViewId?: string;
  onViewChange: (viewId: string) => void;
  onCreateView?: () => void;
}

export function ViewsSidebar({
  personalViews,
  sharedViews,
  activeViewId,
  onViewChange,
  onCreateView,
}: ViewsSidebarProps) {
  return (
    <aside className="w-56 shrink-0 border-r border-gray-200 bg-gray-50/50 p-3">
      {/* Personal Views */}
      <div className="mb-4">
        <div className="mb-1 flex items-center justify-between px-2">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            Personal Views
          </h4>
          {onCreateView && (
            <button onClick={onCreateView} className="text-gray-400 hover:text-gray-600">
              <Plus className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
        {personalViews.map((view) => (
          <button
            key={view.id}
            onClick={() => onViewChange(view.id)}
            className={cn(
              "flex w-full items-center justify-between rounded-md px-2 py-1.5 text-sm",
              activeViewId === view.id
                ? "bg-emerald-50 text-emerald-700 font-medium"
                : "text-gray-600 hover:bg-gray-100"
            )}
          >
            <span className="flex items-center gap-2">
              <Lock className="h-3 w-3" />
              {view.name}
            </span>
            {view.count !== undefined && (
              <span className="text-xs text-gray-400">{view.count}</span>
            )}
          </button>
        ))}
      </div>

      {/* Shared Views */}
      <div>
        <h4 className="mb-1 px-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
          Shared Views
        </h4>
        {sharedViews.map((view) => (
          <button
            key={view.id}
            onClick={() => onViewChange(view.id)}
            className={cn(
              "flex w-full items-center justify-between rounded-md px-2 py-1.5 text-sm",
              activeViewId === view.id
                ? "bg-emerald-50 text-emerald-700 font-medium"
                : "text-gray-600 hover:bg-gray-100"
            )}
          >
            <span className="flex items-center gap-2">
              <Globe className="h-3 w-3" />
              {view.name}
            </span>
            {view.count !== undefined && (
              <span className="text-xs text-gray-400">{view.count}</span>
            )}
          </button>
        ))}
      </div>
    </aside>
  );
}
