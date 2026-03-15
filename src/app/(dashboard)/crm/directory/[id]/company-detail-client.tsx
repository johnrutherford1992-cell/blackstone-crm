"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { ActivityFeed } from "@/components/shared/activity-feed";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Edit, MoreHorizontal, Plus, Trash2 } from "lucide-react";

const CATEGORY_OPTIONS = [
  { value: "CLIENT", label: "Client" },
  { value: "DESIGN", label: "Design" },
  { value: "ENGINEERING", label: "Engineering" },
  { value: "FINANCE", label: "Finance" },
  { value: "TRADE_PARTNER", label: "Trade Partner" },
  { value: "OTHER", label: "Other" },
];

interface CompanyDetailClientProps {
  company: any;
}

export function CompanyDetailClient({ company }: CompanyDetailClientProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [showEdit, setShowEdit] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const tabs = [
    { label: "Overview", value: "overview" },
    { label: "Contacts", value: "contacts", count: company.contacts?.length || 0 },
    { label: "Leads", value: "leads", count: company.leads?.length || 0 },
    { label: "Projects", value: "projects", count: company.projectCompanies?.length || 0 },
  ];

  const activities = (company.activities || []).map((a: any) => ({
    id: a.id,
    user: { firstName: a.user?.firstName || "System", lastName: a.user?.lastName || "" },
    type: a.type?.toLowerCase() || "note",
    content: a.content || "",
    createdAt: a.createdAt,
  }));

  async function handleEditSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(e.currentTarget);
    const body = {
      name: form.get("name") as string,
      phone: (form.get("phone") as string) || undefined,
      address: (form.get("address") as string) || undefined,
      city: (form.get("city") as string) || undefined,
      state: (form.get("state") as string) || undefined,
      website: (form.get("website") as string) || undefined,
      category: (form.get("category") as string) || undefined,
      description: (form.get("description") as string) || undefined,
    };
    try {
      const res = await fetch(`/api/companies/${company.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Failed to update company");
      setShowEdit(false);
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  async function handleTaskSubmit(e: React.FormEvent<HTMLFormElement>) {
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
          companyId: company.id,
        }),
      });
      if (!res.ok) throw new Error("Failed to create task");
      setShowTaskForm(false);
      router.refresh();
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!confirm("Delete this company? This will also remove all associated data.")) return;
    await fetch(`/api/companies/${company.id}`, { method: "DELETE" });
    router.push("/crm/directory");
    router.refresh();
  }

  const categoryLabel = CATEGORY_OPTIONS.find(c => c.value === company.category)?.label || company.category;
  const address = [company.address, company.city, company.state, company.zipCode].filter(Boolean).join(", ");

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <PageHeader
        title={company.name}
        breadcrumbs={[
          { label: "Directory", href: "/crm/directory" },
          { label: company.name },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setShowEdit(true)}>
              <Edit className="mr-1.5 h-3.5 w-3.5" /> Edit
            </Button>
            <Button variant="outline" size="sm" onClick={handleDelete}>
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        }
      />
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} className="px-6" />

      <div className="flex flex-1 overflow-auto">
        {/* Left - Company Details */}
        <div className="w-80 shrink-0 border-r border-gray-200 p-6">
          <Card>
            <CardHeader><CardTitle>Company Details</CardTitle></CardHeader>
            <CardContent>
              <dl className="space-y-3">
                {company.phone && (
                  <div>
                    <dt className="text-xs font-medium text-gray-500">Phone</dt>
                    <dd className="text-sm text-gray-900">{company.phone}</dd>
                  </div>
                )}
                {address && (
                  <div>
                    <dt className="text-xs font-medium text-gray-500">Address</dt>
                    <dd className="text-sm text-gray-900">{address}</dd>
                  </div>
                )}
                {company.website && (
                  <div>
                    <dt className="text-xs font-medium text-gray-500">Website</dt>
                    <dd className="text-sm text-emerald-600">{company.website}</dd>
                  </div>
                )}
                {company.industries?.length > 0 && (
                  <div>
                    <dt className="text-xs font-medium text-gray-500">Industries</dt>
                    <dd className="flex flex-wrap gap-1 mt-1">
                      {company.industries.map((ci: any) => (
                        <Badge key={ci.industry.id} variant="default">{ci.industry.name}</Badge>
                      ))}
                    </dd>
                  </div>
                )}
                <div>
                  <dt className="text-xs font-medium text-gray-500">Category</dt>
                  <dd><Badge variant="info">{categoryLabel}</Badge></dd>
                </div>
                {company.assignedTo && (
                  <div>
                    <dt className="text-xs font-medium text-gray-500">Assigned To</dt>
                    <dd className="text-sm text-gray-900">{company.assignedTo.firstName} {company.assignedTo.lastName}</dd>
                  </div>
                )}
                {company.description && (
                  <div>
                    <dt className="text-xs font-medium text-gray-500">Description</dt>
                    <dd className="text-sm text-gray-900">{company.description}</dd>
                  </div>
                )}
              </dl>
            </CardContent>
          </Card>
        </div>

        {/* Right - Content */}
        <div className="flex-1 p-6">
          {activeTab === "overview" && (
            <>
              <Card className="mb-6">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Open Tasks</CardTitle>
                    <Button size="sm" variant="outline" onClick={() => setShowTaskForm(true)}>
                      <Plus className="mr-1 h-3 w-3" /> New Task
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">No open tasks</p>
                </CardContent>
              </Card>

              <h3 className="mb-4 text-sm font-semibold text-gray-900">Activity</h3>
              {activities.length > 0 ? (
                <ActivityFeed activities={activities} />
              ) : (
                <p className="text-sm text-gray-500">No activity yet</p>
              )}
            </>
          )}

          {activeTab === "contacts" && (
            <div>
              {company.contacts?.length > 0 ? (
                <div className="space-y-2">
                  {company.contacts.map((c: any) => (
                    <a key={c.id} href={`/crm/contacts/${c.id}`} className="flex items-center justify-between rounded border p-3 hover:bg-gray-50">
                      <div>
                        <p className="font-medium text-gray-900">{c.firstName} {c.lastName}</p>
                        <p className="text-sm text-gray-500">{c.title || ""}</p>
                      </div>
                      <span className="text-sm text-gray-400">{c.email || ""}</span>
                    </a>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No contacts linked to this company</p>
              )}
            </div>
          )}

          {activeTab === "leads" && (
            <div>
              {company.leads?.length > 0 ? (
                <div className="space-y-2">
                  {company.leads.map((l: any) => (
                    <a key={l.id} href={`/crm/leads/${l.id}`} className="flex items-center justify-between rounded border p-3 hover:bg-gray-50">
                      <p className="font-medium text-gray-900">{l.name}</p>
                      <Badge variant={l.status === "OPEN" ? "success" : "default"}>{l.status}</Badge>
                    </a>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No leads linked to this company</p>
              )}
            </div>
          )}

          {activeTab === "projects" && (
            <div>
              {company.projectCompanies?.length > 0 ? (
                <div className="space-y-2">
                  {company.projectCompanies.map((pc: any) => (
                    <a key={pc.project.id} href={`/crm/projects/${pc.project.id}`} className="flex items-center justify-between rounded border p-3 hover:bg-gray-50">
                      <p className="font-medium text-gray-900">{pc.project.name}</p>
                      <Badge variant="default">{pc.role}</Badge>
                    </a>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No projects linked to this company</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Edit Company Modal */}
      <Modal open={showEdit} onClose={() => setShowEdit(false)} title="Edit Company">
        <form onSubmit={handleEditSubmit} className="space-y-4">
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Company Name *</label>
            <Input name="name" required defaultValue={company.name} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Category</label>
              <Select name="category" options={CATEGORY_OPTIONS} defaultValue={company.category} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Phone</label>
              <Input name="phone" defaultValue={company.phone || ""} />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Address</label>
            <Input name="address" defaultValue={company.address || ""} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">City</label>
              <Input name="city" defaultValue={company.city || ""} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">State</label>
              <Input name="state" defaultValue={company.state || ""} />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Website</label>
            <Input name="website" defaultValue={company.website || ""} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Description</label>
            <Input name="description" defaultValue={company.description || ""} />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => setShowEdit(false)}>Cancel</Button>
            <Button type="submit" disabled={loading}>{loading ? "Saving..." : "Save Changes"}</Button>
          </div>
        </form>
      </Modal>

      {/* New Task Modal */}
      <Modal open={showTaskForm} onClose={() => setShowTaskForm(false)} title="New Task">
        <form onSubmit={handleTaskSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Task Title *</label>
            <Input name="title" required placeholder="e.g. Follow up on proposal" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Due Date</label>
            <Input name="dueDate" type="date" />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => setShowTaskForm(false)}>Cancel</Button>
            <Button type="submit" disabled={loading}>{loading ? "Creating..." : "Create Task"}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
