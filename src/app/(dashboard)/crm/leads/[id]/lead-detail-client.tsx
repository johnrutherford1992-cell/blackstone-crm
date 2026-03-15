"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { ActivityFeed } from "@/components/shared/activity-feed";
import { formatCurrency } from "@/lib/utils";
import { Clock, Archive, Flag, Edit, FolderPlus, Building2, Trash2 } from "lucide-react";

const TABS = [
  { label: "Details", value: "details" },
  { label: "Go/No Go", value: "gng" },
  { label: "Tasks", value: "tasks" },
  { label: "Comments", value: "comments" },
];

interface LeadDetailClientProps {
  lead: any;
  companies: { value: string; label: string }[];
  divisions: { value: string; label: string }[];
}

export function LeadDetailClient({ lead, companies, divisions }: LeadDetailClientProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("details");
  const [showEdit, setShowEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const activities = (lead.activities || []).map((a: any) => ({
    id: a.id,
    user: { firstName: a.user?.firstName || "System", lastName: a.user?.lastName || "" },
    type: a.type?.toLowerCase() || "note",
    content: a.content || "",
    createdAt: a.createdAt,
  }));

  async function updateLead(data: Record<string, unknown>) {
    const res = await fetch(`/api/leads/${lead.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update lead");
    router.refresh();
  }

  async function handleSnooze() {
    await updateLead({ isSnoozed: !lead.isSnoozed });
  }

  async function handleArchive() {
    if (!confirm("Archive this lead?")) return;
    await updateLead({ isArchived: true });
    router.push("/crm/leads");
  }

  async function handleFlag() {
    await updateLead({ isPriority: !lead.isPriority });
  }

  async function handleCreateProject() {
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: lead.name,
          contractValue: lead.value ? Number(lead.value) : undefined,
          companyId: lead.companyId || undefined,
          divisionId: lead.divisionId || undefined,
          address: lead.address || undefined,
          city: lead.city || undefined,
          state: lead.state || undefined,
          gsf: lead.gsf || undefined,
        }),
      });
      if (!res.ok) throw new Error("Failed to create project");
      const project = await res.json();
      router.push(`/crm/projects/${project.id}`);
    } catch {
      alert("Failed to create project from lead");
    }
  }

  async function handleDelete() {
    if (!confirm("Delete this lead?")) return;
    await fetch(`/api/leads/${lead.id}`, { method: "DELETE" });
    router.push("/crm/leads");
  }

  async function handleEditSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(e.currentTarget);
    const body: Record<string, unknown> = {
      name: form.get("name") as string,
      source: (form.get("source") as string) || undefined,
      companyId: (form.get("companyId") as string) || undefined,
      divisionId: (form.get("divisionId") as string) || undefined,
      address: (form.get("address") as string) || undefined,
      city: (form.get("city") as string) || undefined,
      state: (form.get("state") as string) || undefined,
    };
    const val = form.get("value") as string;
    if (val) body.value = Number(val);
    const gsf = form.get("gsf") as string;
    if (gsf) body.gsf = Number(gsf);

    try {
      await updateLead(body);
      setShowEdit(false);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  const detailFields: [string, string][] = [
    ["Division", lead.division?.name || "—"],
    ["Lead Source", lead.source || "—"],
    ["Construction Duration", lead.constructionDuration ? `${lead.constructionDuration} months` : "—"],
    ["Address", [lead.address, lead.city, lead.state].filter(Boolean).join(", ") || "—"],
    ["Market Sector", lead.marketSector?.name || "—"],
    ["Tender Type", lead.tenderType?.name || "—"],
    ["Delivery Method", lead.deliveryMethod?.name || "—"],
    ["Contract Type", lead.contractType?.name || "—"],
    ["GSF", lead.gsf ? lead.gsf.toLocaleString() : "—"],
    ["Units", lead.units ? String(lead.units) : "—"],
  ];

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <PageHeader
        title={lead.name}
        breadcrumbs={[
          { label: "Leads", href: "/crm/leads" },
          { label: lead.name },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleSnooze}>
              <Clock className="mr-1.5 h-3.5 w-3.5" /> {lead.isSnoozed ? "Unsnooze" : "Snooze"}
            </Button>
            <Button variant="outline" size="sm" onClick={handleArchive}>
              <Archive className="mr-1.5 h-3.5 w-3.5" /> Archive
            </Button>
            <Button variant={lead.isPriority ? "primary" : "outline"} size="sm" onClick={handleFlag}>
              <Flag className="h-3.5 w-3.5" />
            </Button>
            <div className="h-6 w-px bg-gray-200" />
            <Button variant="outline" size="sm" onClick={() => setShowEdit(true)}>
              <Edit className="mr-1.5 h-3.5 w-3.5" /> Edit
            </Button>
            <Button size="sm" onClick={handleCreateProject}>
              <FolderPlus className="mr-1.5 h-3.5 w-3.5" /> Create Project
            </Button>
            <Button variant="outline" size="sm" onClick={handleDelete}>
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        }
      />

      <div className="flex items-center gap-3 border-b border-gray-200 bg-white px-6 py-3">
        <Badge variant={lead.isArchived ? "default" : "success"}>{lead.status}</Badge>
        {lead.isPriority && <Badge variant="warning">Priority</Badge>}
        {lead.isSnoozed && <Badge variant="info">Snoozed</Badge>}
        <span className="text-sm text-gray-500">Updated {new Date(lead.updatedAt).toLocaleDateString()}</span>
      </div>

      <div className="grid grid-cols-4 gap-4 border-b border-gray-200 bg-white px-6 py-4">
        <div>
          <p className="text-xs font-medium text-gray-500">Value</p>
          <p className="text-lg font-semibold text-gray-900">{lead.value ? formatCurrency(Number(lead.value)) : "—"}</p>
        </div>
        <div>
          <p className="text-xs font-medium text-gray-500">Estimated Start</p>
          <p className="text-lg font-semibold text-gray-900">{lead.estimatedStart ? new Date(lead.estimatedStart).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "—"}</p>
        </div>
        <div>
          <p className="text-xs font-medium text-gray-500">Assigned To</p>
          <p className="text-lg font-semibold text-gray-900">{lead.assignedTo ? `${lead.assignedTo.firstName} ${lead.assignedTo.lastName}` : "—"}</p>
        </div>
        <div>
          <p className="text-xs font-medium text-gray-500">Go/No Go</p>
          <p className="text-sm text-emerald-600 font-medium">{lead.gngScore ? `Score: ${lead.gngScore}` : "Not completed"}</p>
        </div>
      </div>

      <Tabs tabs={TABS} activeTab={activeTab} onChange={setActiveTab} className="px-6" />

      <div className="flex-1 overflow-auto p-6">
        {activeTab === "details" && (
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="mb-4 text-sm font-semibold text-gray-900">Project Information</h3>
              <dl className="grid grid-cols-2 gap-x-6 gap-y-3">
                {detailFields.map(([label, value]) => (
                  <div key={label}>
                    <dt className="text-xs font-medium text-gray-500">{label}</dt>
                    <dd className="text-sm text-gray-900">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" /> Company
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {lead.company ? (
                    <>
                      <a href={`/crm/directory/${lead.company.id}`} className="font-medium text-gray-900 hover:text-emerald-600">
                        {lead.company.name}
                      </a>
                      <Badge variant="info" className="mt-1">{lead.company.category || "Client"}</Badge>
                    </>
                  ) : (
                    <p className="text-sm text-gray-500">No company linked</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === "comments" && (
          <div>
            {activities.length > 0 ? (
              <ActivityFeed activities={activities} />
            ) : (
              <p className="text-sm text-gray-500">No comments yet</p>
            )}
          </div>
        )}

        {activeTab === "gng" && (
          <div>
            {lead.gngResponses?.length > 0 ? (
              <div className="space-y-3">
                {lead.gngResponses.map((r: any) => (
                  <div key={r.id} className="flex items-center justify-between rounded border p-3">
                    <span className="text-sm">{r.question?.question || "Question"}</span>
                    <span className="text-sm font-medium">{r.isNA ? "N/A" : r.score !== null ? `${r.score}/5` : "—"}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No Go/No Go responses yet</p>
            )}
          </div>
        )}

        {activeTab === "tasks" && (
          <p className="text-sm text-gray-500">No tasks linked to this lead</p>
        )}
      </div>

      {/* Edit Lead Modal */}
      <Modal open={showEdit} onClose={() => setShowEdit(false)} title="Edit Lead">
        <form onSubmit={handleEditSubmit} className="space-y-4">
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Lead Name *</label>
            <Input name="name" required defaultValue={lead.name} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Estimated Value</label>
              <Input name="value" type="number" min="0" defaultValue={lead.value ? Number(lead.value) : ""} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Source</label>
              <Input name="source" defaultValue={lead.source || ""} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Company</label>
              <Select name="companyId" options={companies} defaultValue={lead.companyId || ""} placeholder="Select company" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Division</label>
              <Select name="divisionId" options={divisions} defaultValue={lead.divisionId || ""} placeholder="Select division" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Address</label>
              <Input name="address" defaultValue={lead.address || ""} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">City</label>
              <Input name="city" defaultValue={lead.city || ""} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">State</label>
              <Input name="state" defaultValue={lead.state || ""} />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">GSF</label>
            <Input name="gsf" type="number" min="0" defaultValue={lead.gsf || ""} />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => setShowEdit(false)}>Cancel</Button>
            <Button type="submit" disabled={loading}>{loading ? "Saving..." : "Save Changes"}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
