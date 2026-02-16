"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { Sidebar } from "@/components/layout/sidebar";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";

const SIDEBAR_TABS = [
  { label: "All", href: "/analytics/forecast" },
  { label: "Pursuits", href: "/analytics/forecast" },
  { label: "Backlog", href: "/analytics/forecast" },
  { label: "WIP", href: "/analytics/forecast" },
  { label: "In Construction", href: "/analytics/forecast" },
  { label: "WIP + Pursuits", href: "/analytics/forecast" },
  { label: "Pursuits + Backlog", href: "/analytics/forecast" },
];

const SAMPLE_DATA = [
  { id: "1", name: "Austin Office Tower", stage: "Discovery", contractValue: 45000000, estimatedCost: 42750000 },
  { id: "2", name: "Dell Medical Center Expansion", stage: "Bidding", contractValue: 120000000, estimatedCost: 112000000 },
  { id: "3", name: "Samsung Fab Retrofit", stage: "Proposal Sent", contractValue: 85000000, estimatedCost: 80000000 },
  { id: "4", name: "The Grove at Shoal Creek", stage: "In Construction", contractValue: 95000000, estimatedCost: 88000000 },
  { id: "5", name: "Lakeline Mall Renovation", stage: "Won", contractValue: 18000000, estimatedCost: 16500000 },
  { id: "6", name: "Mueller Town Center", stage: "In Construction", contractValue: 55000000, estimatedCost: 51000000 },
];

const STAGE_VARIANTS: Record<string, "success" | "info" | "purple" | "warning" | "default"> = {
  Discovery: "success", Bidding: "info", "Proposal Sent": "purple", Won: "success", "In Construction": "success",
};

export default function ForecastPage() {
  const columns = [
    {
      key: "name",
      label: "Projects",
      sortable: true,
      render: (val: string, row: any) => (
        <div className="flex items-center gap-2">
          <span className="font-medium">{val}</span>
          <Badge variant={STAGE_VARIANTS[row.stage] || "default"}>{row.stage}</Badge>
        </div>
      ),
    },
    { key: "contractValue", label: "Contract Value", sortable: true, render: (val: number) => formatCurrency(val) },
    { key: "estimatedCost", label: "Est. Cost at Completion", sortable: true, render: (val: number) => formatCurrency(val) },
  ];

  return (
    <div className="flex flex-1 overflow-hidden">
      <Sidebar items={SIDEBAR_TABS} title="View" />
      <div className="flex flex-1 flex-col overflow-hidden">
        <PageHeader title="Forecast" subtitle="Calculated by Weighted Revenue" />
        <div className="flex items-center gap-3 border-b border-gray-200 bg-white px-4 py-2">
          <select className="rounded-md border border-gray-300 px-2 py-1 text-sm"><option>Revenue</option></select>
          <select className="rounded-md border border-gray-300 px-2 py-1 text-sm"><option>Display Options</option></select>
          <input type="date" className="rounded-md border border-gray-300 px-2 py-1 text-sm" />
          <span className="text-gray-400">—</span>
          <input type="date" className="rounded-md border border-gray-300 px-2 py-1 text-sm" />
          <select className="rounded-md border border-gray-300 px-2 py-1 text-sm"><option>Month</option></select>
        </div>
        <div className="flex-1 overflow-auto">
          <DataTable data={SAMPLE_DATA} columns={columns} totalCount={6} />
          <div className="border-t border-gray-300 bg-gray-50 px-4 py-3 text-sm font-semibold">
            <div className="flex">
              <span className="flex-1">Totals (6 results)</span>
              <span className="w-48 text-right">{formatCurrency(418000000)}</span>
              <span className="w-48 text-right">{formatCurrency(390250000)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
