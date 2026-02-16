"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { Sidebar } from "@/components/layout/sidebar";
import { Tabs } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, MoreHorizontal, CheckCircle2, Circle, AlertCircle } from "lucide-react";

const TASK_TABS = [
  { label: "My Tasks", value: "my" },
  { label: "All Tasks", value: "all" },
];

const SAMPLE_TASKS = [
  { id: "1", title: "Follow up with Turner on Austin Office Tower bid", linkedItem: "Austin Office Tower", dueDate: "2024-02-20", status: "open" },
  { id: "2", title: "Review Samsung Fab structural drawings", linkedItem: "Samsung Fab Retrofit", dueDate: "2024-02-18", status: "open" },
  { id: "3", title: "Send updated schedule to City of Austin", linkedItem: "City Hall Renovation", dueDate: "2024-02-16", status: "overdue" },
  { id: "4", title: "Complete Go/No-Go for Tesla warehouse", linkedItem: "Tesla Gigafactory Warehouse", dueDate: "2024-02-22", status: "open" },
  { id: "5", title: "Prepare cost estimate for Domain Phase III", linkedItem: "Domain Mixed-Use Phase III", dueDate: "2024-02-25", status: "open" },
  { id: "6", title: "Schedule kickoff meeting with Seton", linkedItem: "Dell Medical Center Expansion", dueDate: "2024-02-15", status: "completed" },
];

export default function TasksPage() {
  const [activeTab, setActiveTab] = useState("my");

  const columns = [
    {
      key: "title",
      label: "Title",
      sortable: true,
      render: (val: string, row: any) => (
        <div className="flex items-center gap-2">
          {row.status === "completed" ? (
            <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
          ) : row.status === "overdue" ? (
            <AlertCircle className="h-4 w-4 text-red-500 shrink-0" />
          ) : (
            <Circle className="h-4 w-4 text-gray-300 shrink-0" />
          )}
          <span className={row.status === "completed" ? "line-through text-gray-400" : ""}>{val}</span>
        </div>
      ),
    },
    {
      key: "linkedItem",
      label: "Linked Item",
      render: (val: string) => <span className="text-emerald-600">{val}</span>,
    },
    { key: "dueDate", label: "Due Date", sortable: true },
  ];

  return (
    <div className="flex flex-1 overflow-hidden">
      <Sidebar
        items={[
          { label: "All Open", count: 5, href: "/crm/tasks" },
          { label: "Due This Week", count: 3, href: "/crm/tasks" },
          { label: "Due Today", count: 1, href: "/crm/tasks" },
          { label: "Overdue", count: 1, href: "/crm/tasks" },
          { label: "Stale", count: 2, href: "/crm/tasks" },
          { label: "Completed", count: 15, href: "/crm/tasks" },
        ]}
      />
      <div className="flex flex-1 flex-col overflow-hidden">
        <PageHeader
          title="Tasks"
          actions={
            <div className="flex items-center gap-2">
              <Button>
                <Plus className="mr-1.5 h-4 w-4" /> New Task
              </Button>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          }
        />
        <Tabs tabs={TASK_TABS} activeTab={activeTab} onChange={setActiveTab} className="px-4" />
        <div className="flex-1 overflow-auto">
          <DataTable data={SAMPLE_TASKS} columns={columns} totalCount={SAMPLE_TASKS.length} />
        </div>
        <div className="border-t border-gray-200 px-4 py-2">
          <button className="text-xs text-gray-500 hover:text-gray-700">View deleted tasks</button>
        </div>
      </div>
    </div>
  );
}
