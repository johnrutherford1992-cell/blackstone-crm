"use client";

import React from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Badge } from "@/components/ui/badge";
import { FilterBar } from "@/components/shared/filter-bar";

const PROJECTS = [
  { id: "1", name: "Austin Office Tower", stage: "Discovery", start: 2, end: 8, color: "#10B981" },
  { id: "2", name: "Dell Medical Center", stage: "Bidding", start: 3, end: 12, color: "#3B82F6" },
  { id: "3", name: "Samsung Fab Retrofit", stage: "Proposal Sent", start: 1, end: 6, color: "#8B5CF6" },
  { id: "4", name: "The Grove at Shoal Creek", stage: "In Construction", start: 0, end: 10, color: "#10B981" },
  { id: "5", name: "Lakeline Mall Renovation", stage: "Won", start: 4, end: 9, color: "#059669" },
  { id: "6", name: "Mueller Town Center", stage: "In Construction", start: 1, end: 11, color: "#10B981" },
  { id: "7", name: "UT Engineering Building", stage: "Contract Sent", start: 5, end: 12, color: "#F59E0B" },
  { id: "8", name: "Bee Cave Library", stage: "Won", start: 6, end: 10, color: "#059669" },
];

const QUARTERS = ["Q1 2024", "Q2 2024", "Q3 2024", "Q4 2024", "Q1 2025", "Q2 2025", "Q3 2025", "Q4 2025", "Q1 2026", "Q2 2026", "Q3 2026", "Q4 2026"];

export default function TimelinePage() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <PageHeader title="Timeline" />
      <FilterBar>
        <select className="rounded-md border border-gray-300 px-3 py-1.5 text-sm">
          <option>Year</option>
          <option>Quarter</option>
          <option>Month</option>
        </select>
      </FilterBar>

      <div className="flex-1 overflow-auto">
        <div className="min-w-[1200px]">
          {/* Time axis */}
          <div className="sticky top-0 z-10 flex border-b border-gray-200 bg-gray-50">
            <div className="w-64 shrink-0 border-r border-gray-200 px-4 py-2">
              <span className="text-xs font-medium text-gray-500">Project</span>
            </div>
            <div className="flex flex-1">
              {QUARTERS.map((q) => (
                <div key={q} className="flex-1 border-r border-gray-100 px-2 py-2 text-center">
                  <span className="text-xs font-medium text-gray-500">{q}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Project rows */}
          {PROJECTS.map((project) => (
            <div key={project.id} className="flex border-b border-gray-100 hover:bg-gray-50">
              <div className="w-64 shrink-0 border-r border-gray-200 px-4 py-3">
                <p className="text-sm font-medium text-gray-900">{project.name}</p>
                <p className="text-xs text-gray-500">{project.stage}</p>
              </div>
              <div className="relative flex flex-1 items-center py-2">
                <div
                  className="absolute h-6 rounded-full"
                  style={{
                    left: `${(project.start / 12) * 100}%`,
                    width: `${((project.end - project.start) / 12) * 100}%`,
                    backgroundColor: project.color,
                    opacity: 0.8,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
