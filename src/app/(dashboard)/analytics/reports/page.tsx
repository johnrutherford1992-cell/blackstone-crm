"use client";

import React from "react";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { Sidebar } from "@/components/layout/sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const SAMPLE_REPORTS = [
  { id: "1", name: "Monthly Pipeline Report", type: "Projects", visibility: "Shared", folder: "Monthly", createdBy: "John Rutherford", created: "Jan 15, 2024" },
  { id: "2", name: "Q1 Activity Summary", type: "Activity", visibility: "Shared", folder: "Quarterly", createdBy: "John Rutherford", created: "Jan 1, 2024" },
  { id: "3", name: "Company Engagement Tracker", type: "Company", visibility: "Personal", folder: "—", createdBy: "John Rutherford", created: "Dec 10, 2023" },
  { id: "4", name: "Win/Loss Analysis", type: "Projects", visibility: "Shared", folder: "Analytics", createdBy: "Sarah Mitchell", created: "Nov 20, 2023" },
  { id: "5", name: "Pursuit Duration Report", type: "Projects", visibility: "Shared", folder: "Analytics", createdBy: "Emily Park", created: "Oct 5, 2023" },
];

export default function ReportsPage() {
  const columns = [
    { key: "name", label: "Name", sortable: true, render: (val: string) => <span className="font-medium text-emerald-600">{val}</span> },
    { key: "type", label: "Type", render: (val: string) => <Badge variant="default">{val}</Badge> },
    { key: "visibility", label: "Visibility", render: (val: string) => <Badge variant={val === "Shared" ? "info" : "default"}>{val}</Badge> },
    { key: "folder", label: "Folder" },
    { key: "createdBy", label: "Created by" },
    { key: "created", label: "Created", sortable: true },
  ];

  return (
    <div className="flex flex-1 overflow-hidden">
      <Sidebar
        items={[
          { label: "All", href: "/analytics/reports" },
          { label: "Personal", href: "/analytics/reports" },
          { label: "Shared", href: "/analytics/reports" },
        ]}
        title="Reports"
      />
      <div className="flex flex-1 flex-col overflow-hidden">
        <PageHeader
          title="Reports"
          actions={<Button><Plus className="mr-1.5 h-4 w-4" /> New Report</Button>}
        />
        <div className="border-b border-gray-200 bg-white px-4 py-2">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input placeholder="Search reports..." className="pl-9" />
          </div>
        </div>
        <div className="flex-1 overflow-auto">
          <DataTable data={SAMPLE_REPORTS} columns={columns} totalCount={5} />
        </div>
      </div>
    </div>
  );
}
