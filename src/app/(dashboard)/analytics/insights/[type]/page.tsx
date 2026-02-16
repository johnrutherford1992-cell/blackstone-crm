"use client";

import React from "react";
import { useParams } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const TITLES: Record<string, string> = {
  "win-rate": "Win Rate by Company",
  profit: "Profit by Project",
  lost: "Lost Projects Analysis",
  acv: "Annual Construction Volume",
  "employee-revenue": "Employee Project Revenue",
};

const WIN_RATE_DATA = [
  { id: "1", name: "Turner Construction", winRate: 78, wonAmount: 85000000, avgPursuitDuration: 45 },
  { id: "2", name: "Seton Healthcare", winRate: 67, wonAmount: 120000000, avgPursuitDuration: 62 },
  { id: "3", name: "Samsung Austin", winRate: 50, wonAmount: 42000000, avgPursuitDuration: 38 },
  { id: "4", name: "Endeavor Real Estate", winRate: 83, wonAmount: 155000000, avgPursuitDuration: 55 },
  { id: "5", name: "City of Austin", winRate: 60, wonAmount: 56000000, avgPursuitDuration: 72 },
  { id: "6", name: "University of Texas", winRate: 71, wonAmount: 92000000, avgPursuitDuration: 48 },
];

const FILTER_CHIPS = ["Company", "Industry", "Market Sector", "Assigned To", "Contract Type", "Lead Source", "Project Size", "Project Duration", "Top Customers"];

export default function InsightDetailPage() {
  const params = useParams();
  const type = params.type as string;
  const title = TITLES[type] || "Insight Detail";

  const columns = [
    { key: "name", label: "Name", sortable: true },
    { key: "winRate", label: "Win Rate %", sortable: true, render: (val: number) => `${val}%` },
    { key: "wonAmount", label: "Won Amount", sortable: true, render: (val: number) => `$${(val / 1000000).toFixed(1)}M` },
    { key: "avgPursuitDuration", label: "Avg Pursuit Duration", sortable: true, render: (val: number) => `${val} days` },
  ];

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <PageHeader
        title={title}
        breadcrumbs={[{ label: "Insights", href: "/analytics/insights" }, { label: title }]}
        actions={
          <div className="flex items-center gap-2">
            <select className="rounded-md border border-gray-300 px-2 py-1 text-sm"><option>All Divisions</option></select>
            <Button variant="outline" size="sm"><Download className="mr-1.5 h-3.5 w-3.5" /> Export</Button>
          </div>
        }
      />
      <div className="flex flex-wrap gap-2 border-b border-gray-200 bg-white px-4 py-2">
        {FILTER_CHIPS.map((chip) => (
          <button key={chip} className="rounded-full border border-gray-300 px-3 py-1 text-xs font-medium text-gray-600 hover:bg-gray-50">
            {chip}
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-auto">
        <DataTable data={WIN_RATE_DATA} columns={columns} totalCount={6} />
      </div>
    </div>
  );
}
