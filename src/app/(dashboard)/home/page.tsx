"use client";

import React from "react";
import { MetricCard } from "@/components/shared/metric-card";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { formatCurrency, formatDate } from "@/lib/utils";
import { FolderKanban, DollarSign, CheckSquare } from "lucide-react";

const STAGE_VARIANTS: Record<string, "success" | "info" | "purple" | "warning"> = {
  Discovery: "success", Bidding: "info", "Proposal Sent": "purple", "Contract Sent": "warning",
};

const MY_PURSUITS = [
  { id: "1", name: "Austin Office Tower", company: "Turner Construction", contractValue: 45000000, stage: "Discovery", lastActivity: "2024-02-15T10:00:00Z", awardDate: "Jul 2024" },
  { id: "2", name: "Dell Medical Center Expansion", company: "Seton Healthcare", contractValue: 120000000, stage: "Bidding", lastActivity: "2024-02-14T15:30:00Z", awardDate: "Aug 2024" },
  { id: "3", name: "Samsung Fab Retrofit", company: "Samsung Austin", contractValue: 85000000, stage: "Proposal Sent", lastActivity: "2024-02-12T09:00:00Z", awardDate: "Jun 2024" },
  { id: "4", name: "Domain Mixed-Use Phase III", company: "Endeavor Real Estate", contractValue: 62000000, stage: "Discovery", lastActivity: "2024-02-10T14:00:00Z", awardDate: "Sep 2024" },
  { id: "5", name: "UT Engineering Building", company: "University of Texas", contractValue: 72000000, stage: "Contract Sent", lastActivity: "2024-02-08T11:00:00Z", awardDate: "May 2024" },
];

export default function HomePage() {
  const columns = [
    { key: "name", label: "Name", sortable: true, href: (row: any) => `/crm/projects/${row.id}` },
    { key: "company", label: "Company" },
    { key: "contractValue", label: "Contract Value", sortable: true, render: (val: number) => formatCurrency(val) },
    { key: "stage", label: "Stage", render: (val: string) => <Badge variant={STAGE_VARIANTS[val] || "default"}>{val}</Badge> },
    { key: "lastActivity", label: "Last Activity", render: (val: string) => formatDate(val) },
    { key: "awardDate", label: "Award Date" },
  ];

  return (
    <div className="flex-1 overflow-auto p-6">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Overview</h1>

      <div className="mb-8 grid grid-cols-3 gap-4">
        <MetricCard label="My Upcoming Pursuits" value={5} icon={<FolderKanban className="h-5 w-5" />} />
        <MetricCard label="My Pipeline" value="$384M" icon={<DollarSign className="h-5 w-5" />} />
        <MetricCard label="My Open Tasks" value={8} icon={<CheckSquare className="h-5 w-5" />} />
      </div>

      <Card>
        <CardHeader><CardTitle>My Pursuits</CardTitle></CardHeader>
        <CardContent className="p-0">
          <DataTable data={MY_PURSUITS} columns={columns} />
        </CardContent>
      </Card>
    </div>
  );
}
