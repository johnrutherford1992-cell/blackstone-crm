"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { FilterBar } from "@/components/shared/filter-bar";
import { ViewsSidebar } from "@/components/shared/views-sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { ProjectForm } from "@/components/forms/project-form";

const PERSONAL_VIEWS = [{ id: "all", name: "All Projects" }];
const SHARED_VIEWS = [
  { id: "active", name: "Active Jobs" },
  { id: "bids-this-month", name: "Bids Due This Month" },
  { id: "bids-next-month", name: "Bids Due Next Month" },
  { id: "commercial", name: "Commercial" },
  { id: "discoveries", name: "Discoveries" },
  { id: "high-win", name: "High Win Probability" },
  { id: "lost", name: "Lost Jobs" },
  { id: "mixed-use", name: "Mixed-Use" },
  { id: "pending", name: "Pending/Submitted" },
  { id: "residential", name: "Residential" },
  { id: "upcoming", name: "Upcoming" },
];

const STAGE_VARIANTS: Record<string, "success" | "info" | "purple" | "warning" | "default" | "danger"> = {
  Discovery: "success",
  Bidding: "info",
  "Proposal Sent": "purple",
  "Contract Sent": "warning",
  Won: "success",
  "In Construction": "success",
  Completed: "default",
  Lost: "danger",
};

interface ProjectRow {
  id: string;
  name: string;
  stage: string;
  stageColor: string;
  contractValue: number;
  company: string;
  division: string;
}

interface ProjectsClientProps {
  projects: ProjectRow[];
  totalCount: number;
  stageOptions: { value: string; label: string }[];
  divisionOptions: { value: string; label: string }[];
}

export function ProjectsClient({ projects, totalCount, stageOptions, divisionOptions }: ProjectsClientProps) {
  const [activeView, setActiveView] = useState("all");
  const [showCreateForm, setShowCreateForm] = useState(false);

  const columns = [
    {
      key: "name",
      label: "Name",
      sortable: true,
      href: (row: ProjectRow) => `/crm/projects/${row.id}`,
    },
    {
      key: "stage",
      label: "Stage",
      sortable: true,
      render: (val: string) => <Badge variant={STAGE_VARIANTS[val] || "default"}>{val}</Badge>,
    },
    {
      key: "contractValue",
      label: "Contract Value",
      sortable: true,
      render: (val: number) => formatCurrency(val),
    },
    { key: "company", label: "Company" },
    { key: "division", label: "Division" },
  ];

  return (
    <div className="flex flex-1 overflow-hidden">
      <ViewsSidebar
        personalViews={PERSONAL_VIEWS}
        sharedViews={SHARED_VIEWS}
        activeViewId={activeView}
        onViewChange={setActiveView}
      />
      <div className="flex flex-1 flex-col overflow-hidden">
        <PageHeader
          title="Projects"
          actions={
            <Button onClick={() => setShowCreateForm(true)}>
              <Plus className="mr-1.5 h-4 w-4" /> Create Project
            </Button>
          }
        />
        <FilterBar viewName={SHARED_VIEWS.find(v => v.id === activeView)?.name || "All Projects"} />
        <div className="flex-1 overflow-auto">
          <DataTable data={projects} columns={columns} totalCount={totalCount} />
        </div>
      </div>

      <ProjectForm
        open={showCreateForm}
        onClose={() => setShowCreateForm(false)}
        stages={stageOptions}
        divisions={divisionOptions}
      />
    </div>
  );
}
