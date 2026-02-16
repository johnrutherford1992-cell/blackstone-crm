"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, Columns3, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface FilterChip {
  key: string;
  label: string;
  value: string;
}

interface FilterBarProps {
  activeFilters?: FilterChip[];
  onRemoveFilter?: (key: string) => void;
  onClearAll?: () => void;
  viewName?: string;
  onViewChange?: () => void;
  children?: React.ReactNode;
}

export function FilterBar({
  activeFilters = [],
  onRemoveFilter,
  onClearAll,
  viewName,
  children,
}: FilterBarProps) {
  return (
    <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-2">
      <div className="flex items-center gap-2">
        {viewName && (
          <span className="text-sm font-medium text-gray-700">{viewName}</span>
        )}
        <button className="flex items-center gap-1.5 rounded-md border border-gray-300 px-2.5 py-1.5 text-sm text-gray-600 hover:bg-gray-50">
          <Columns3 className="h-3.5 w-3.5" />
          Columns
        </button>
        <button className="flex items-center gap-1.5 rounded-md border border-gray-300 px-2.5 py-1.5 text-sm text-gray-600 hover:bg-gray-50">
          <SlidersHorizontal className="h-3.5 w-3.5" />
          Filters
          {activeFilters.length > 0 && (
            <span className="rounded-full bg-emerald-100 px-1.5 py-0.5 text-xs font-medium text-emerald-700">
              {activeFilters.length}
            </span>
          )}
        </button>

        {activeFilters.length > 0 && (
          <>
            {activeFilters.map((filter) => (
              <span
                key={filter.key}
                className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700"
              >
                {filter.label}: {filter.value}
                <button
                  onClick={() => onRemoveFilter?.(filter.key)}
                  className="ml-0.5 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
            <button
              onClick={onClearAll}
              className="text-xs text-gray-500 hover:text-gray-700"
            >
              Clear all
            </button>
          </>
        )}
      </div>
      <div className="flex items-center gap-2">{children}</div>
    </div>
  );
}
