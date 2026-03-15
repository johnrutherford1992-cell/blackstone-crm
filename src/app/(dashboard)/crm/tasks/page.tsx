"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { Sidebar } from "@/components/layout/sidebar";
import { Tabs } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Plus, CheckCircle2, Circle, AlertCircle } from "lucide-react";

const TASK_TABS = [
  { label: "My Tasks", value: "my" },
  { label: "All Tasks", value: "all" },
];

export default function TasksPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("all");
  const [tasks, setTasks] = useState<any[]>([]);
  const [showCreate, setShowCreate] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchTasks = useCallback(async () => {
    try {
      const res = await fetch("/api/tasks");
      if (res.ok) {
        const data = await res.json();
        setTasks(data);
      }
    } catch {
      // silent
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const tableData = tasks.map((t) => ({
    id: t.id,
    title: t.title,
    linkedItem: t.project?.name || t.company?.name || t.lead?.name || t.contact ? `${t.contact?.firstName} ${t.contact?.lastName}` : "—",
    dueDate: t.dueDate ? new Date(t.dueDate).toLocaleDateString() : "—",
    status: t.status === "COMPLETED" ? "completed" : (t.dueDate && new Date(t.dueDate) < new Date() ? "overdue" : "open"),
  }));

  const openCount = tableData.filter(t => t.status === "open").length;
  const overdueCount = tableData.filter(t => t.status === "overdue").length;
  const completedCount = tableData.filter(t => t.status === "completed").length;

  const columns = [
    {
      key: "title",
      label: "Title",
      sortable: true,
      render: (val: string, row: any) => (
        <div className="flex items-center gap-2">
          {row.status === "completed" ? (
            <button onClick={() => toggleTask(row.id, "OPEN")} className="shrink-0"><CheckCircle2 className="h-4 w-4 text-emerald-500" /></button>
          ) : row.status === "overdue" ? (
            <button onClick={() => toggleTask(row.id, "COMPLETED")} className="shrink-0"><AlertCircle className="h-4 w-4 text-red-500" /></button>
          ) : (
            <button onClick={() => toggleTask(row.id, "COMPLETED")} className="shrink-0"><Circle className="h-4 w-4 text-gray-300" /></button>
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

  async function toggleTask(id: string, status: string) {
    await fetch(`/api/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    fetchTasks();
  }

  async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.get("title") as string,
          dueDate: (form.get("dueDate") as string) || undefined,
          description: (form.get("description") as string) || undefined,
        }),
      });
      if (res.ok) {
        setShowCreate(false);
        fetchTasks();
      }
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-1 overflow-hidden">
      <Sidebar
        items={[
          { label: "All Open", count: openCount, href: "/crm/tasks" },
          { label: "Overdue", count: overdueCount, href: "/crm/tasks" },
          { label: "Completed", count: completedCount, href: "/crm/tasks" },
        ]}
      />
      <div className="flex flex-1 flex-col overflow-hidden">
        <PageHeader
          title="Tasks"
          actions={
            <Button onClick={() => setShowCreate(true)}>
              <Plus className="mr-1.5 h-4 w-4" /> New Task
            </Button>
          }
        />
        <Tabs tabs={TASK_TABS} activeTab={activeTab} onChange={setActiveTab} className="px-4" />
        <div className="flex-1 overflow-auto">
          <DataTable data={tableData} columns={columns} totalCount={tableData.length} />
        </div>
      </div>

      {/* Create Task Modal */}
      <Modal open={showCreate} onClose={() => setShowCreate(false)} title="New Task">
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Title *</label>
            <Input name="title" required placeholder="e.g. Follow up with client" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Description</label>
            <Input name="description" placeholder="Optional description" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Due Date</label>
            <Input name="dueDate" type="date" />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => setShowCreate(false)}>Cancel</Button>
            <Button type="submit" disabled={loading}>{loading ? "Creating..." : "Create Task"}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
