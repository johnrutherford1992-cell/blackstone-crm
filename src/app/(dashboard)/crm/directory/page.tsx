"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { FilterBar } from "@/components/shared/filter-bar";
import { Sidebar } from "@/components/layout/sidebar";
import { Button } from "@/components/ui/button";
import { Tabs } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Building2, Plus } from "lucide-react";

const CATEGORY_TABS = [
  { label: "Client", value: "CLIENT" },
  { label: "Design", value: "DESIGN" },
  { label: "Engineering", value: "ENGINEERING" },
  { label: "Finance", value: "FINANCE" },
  { label: "Trade Partner", value: "TRADE_PARTNER" },
  { label: "Other", value: "OTHER" },
  { label: "More", value: "MORE" },
];

const INDUSTRIES = [
  { label: "Construction", value: "construction", count: 24 },
  { label: "Food & Beverage", value: "food", count: 8 },
  { label: "Government", value: "government", count: 12 },
  { label: "Media", value: "media", count: 3 },
  { label: "Other", value: "other", count: 15 },
  { label: "Transportation", value: "transportation", count: 5 },
];

const SAMPLE_COMPANIES = [
  { id: "1", name: "Turner Construction", assignedTo: "John Rutherford", category: "CLIENT", industry: "Construction" },
  { id: "2", name: "Hensel Phelps", assignedTo: "John Rutherford", category: "TRADE_PARTNER", industry: "Construction" },
  { id: "3", name: "Gensler", assignedTo: "John Rutherford", category: "DESIGN", industry: "Construction" },
  { id: "4", name: "DPR Construction", assignedTo: "John Rutherford", category: "CLIENT", industry: "Construction" },
  { id: "5", name: "Skanska USA", assignedTo: "John Rutherford", category: "CLIENT", industry: "Construction" },
  { id: "6", name: "HOK", assignedTo: "John Rutherford", category: "DESIGN", industry: "Construction" },
  { id: "7", name: "Thornton Tomasetti", assignedTo: "John Rutherford", category: "ENGINEERING", industry: "Construction" },
  { id: "8", name: "Walter P Moore", assignedTo: "John Rutherford", category: "ENGINEERING", industry: "Construction" },
  { id: "9", name: "City of Austin", assignedTo: "John Rutherford", category: "CLIENT", industry: "Government" },
  { id: "10", name: "JPMorgan Chase", assignedTo: "John Rutherford", category: "FINANCE", industry: "Banking" },
];

export default function DirectoryPage() {
  const [activeTab, setActiveTab] = useState("CLIENT");

  const columns = [
    {
      key: "name",
      label: "Company Name",
      sortable: true,
      href: (row: any) => `/crm/directory/${row.id}`,
    },
    { key: "assignedTo", label: "Assigned To", sortable: true },
  ];

  const filtered = SAMPLE_COMPANIES.filter(
    (c) => activeTab === "MORE" || c.category === activeTab
  );

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Left Sidebar */}
      <Sidebar
        title="Filters"
        items={[
          {
            label: "Industries",
            children: INDUSTRIES.map((ind) => ({
              label: ind.label,
              count: ind.count,
            })),
          },
          {
            label: "Project Status",
            children: [
              { label: "Won", count: 15 },
              { label: "Active", count: 8 },
              { label: "Open", count: 22 },
              { label: "Closed", count: 10 },
            ],
          },
        ]}
      />

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <PageHeader
          title="Directory"
          actions={
            <Button>
              <Plus className="mr-1.5 h-4 w-4" />
              New Company
            </Button>
          }
        />
        <Tabs tabs={CATEGORY_TABS} activeTab={activeTab} onChange={setActiveTab} className="px-4" />
        <FilterBar viewName="All Companies" />
        <div className="flex-1 overflow-auto">
          <DataTable data={filtered} columns={columns} totalCount={filtered.length} />
        </div>
      </div>
    </div>
  );
}
