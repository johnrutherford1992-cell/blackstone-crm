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

interface PursuitRow {
  id: string;
  name: string;
  company: string;
  contractValue: number;
  stage: string;
  lastActivity: string;
  awardDate: string;
}

interface HomeClientProps {
  pursuits: PursuitRow[];
  pipelineValue: number;
}

export function HomeClient({ pursuits, pipelineValue }: HomeClientProps) {
  const columns = [
    { key: "name", label: "Name", sortable: true, href: (row: PursuitRow) => `/crm/projects/${row.id}` },
    { key: "company", label: "Company" },
    { key: "contractValue", label: "Contract Value", sortable: true, render: (val: number) => formatCurrency(val) },
    { key: "stage", label: "Stage", render: (val: string) => <Badge variant={STAGE_VARIANTS[val] || "default"}>{val}</Badge> },
    { key: "lastActivity", label: "Last Activity", render: (val: string) => val ? formatDate(val) : "—" },
    { key: "awardDate", label: "Award Date" },
  ];

  const formattedPipeline = pipelineValue >= 1000000
    ? `$${Math.round(pipelineValue / 1000000)}M`
    : formatCurrency(pipelineValue);

  return (
    <div className="flex-1 overflow-auto p-6">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Overview</h1>

      <div className="mb-8 grid grid-cols-3 gap-4">
        <MetricCard label="My Upcoming Pursuits" value={pursuits.length} icon={<FolderKanban className="h-5 w-5" />} />
        <MetricCard label="My Pipeline" value={formattedPipeline} icon={<DollarSign className="h-5 w-5" />} />
        <MetricCard label="My Open Tasks" value={0} icon={<CheckSquare className="h-5 w-5" />} />
      </div>

      <Card>
        <CardHeader><CardTitle>My Pursuits</CardTitle></CardHeader>
        <CardContent className="p-0">
          <DataTable data={pursuits} columns={columns} />
        </CardContent>
      </Card>
    </div>
  );
}
