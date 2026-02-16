"use client";

import React from "react";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const SAMPLE_MODELS = [
  { id: "1", name: "Office Buildings 2024", projects: 5 },
  { id: "2", name: "Healthcare Facilities", projects: 3 },
  { id: "3", name: "Mixed-Use Developments", projects: 4 },
  { id: "4", name: "Industrial / Manufacturing", projects: 2 },
];

export default function CostModelsPage() {
  const columns = [
    { key: "name", label: "Name", sortable: true, href: (row: any) => `/analytics/cost-models/${row.id}` },
    { key: "projects", label: "Projects" },
  ];

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <PageHeader title="Cost Models" actions={<Button><Plus className="mr-1.5 h-4 w-4" /> New Cost Model</Button>} />
      <div className="flex-1 overflow-auto">
        <DataTable data={SAMPLE_MODELS} columns={columns} totalCount={4} />
      </div>
    </div>
  );
}
