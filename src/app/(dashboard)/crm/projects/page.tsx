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

const SAMPLE_PROJECTS = [
  { id: "1", name: "Austin Office Tower", stage: "Discovery", contractValue: 45000000, company: "Turner Construction", division: "Commercial" },
  { id: "2", name: "Dell Medical Center Expansion", stage: "Bidding", contractValue: 120000000, company: "Seton Healthcare", division: "Commercial" },
  { id: "3", name: "Samsung Fab Retrofit", stage: "Proposal Sent", contractValue: 85000000, company: "Samsung Austin", division: "Industrial" },
  { id: "4", name: "Domain Mixed-Use Phase III", stage: "Discovery", contractValue: 62000000, company: "Endeavor Real Estate", division: "Commercial" },
  { id: "5", name: "Lakeline Mall Renovation", stage: "Won", contractValue: 18000000, company: "Simon Property Group", division: "Commercial" },
  { id: "6", name: "The Grove at Shoal Creek", stage: "In Construction", contractValue: 95000000, company: "Milestone Community", division: "Residential-Custom" },
  { id: "7", name: "UT Engineering Building", stage: "Contract Sent", contractValue: 72000000, company: "University of Texas", division: "Commercial" },
  { id: "8", name: "Bee Cave Library", stage: "Won", contractValue: 12000000, company: "City of Bee Cave", division: "Commercial" },
  { id: "9", name: "Tesla Warehouse Complex", stage: "Lost", contractValue: 35000000, company: "Tesla Inc", division: "Industrial" },
  { id: "10", name: "Mueller Town Center", stage: "In Construction", contractValue: 55000000, company: "Catellus Development", division: "Commercial" },
];

export default function ProjectsPage() {
  const [activeView, setActiveView] = useState("all");

  const columns = [
    {
      key: "name",
      label: "Name",
      sortable: true,
      href: (row: any) => `/crm/projects/${row.id}`,
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
          actions={<Button><Plus className="mr-1.5 h-4 w-4" /> Create Project</Button>}
        />
        <FilterBar viewName={SHARED_VIEWS.find(v => v.id === activeView)?.name || "All Projects"} />
        <div className="flex-1 overflow-auto">
          <DataTable data={SAMPLE_PROJECTS} columns={columns} totalCount={SAMPLE_PROJECTS.length} />
        </div>
      </div>
    </div>
  );
}
