"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { ActivityFeed } from "@/components/shared/activity-feed";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Copy, Plus, Edit, Trash2 } from "lucide-react";

interface ContactDetailClientProps {
  contact: any;
  companies: { value: string; label: string }[];
}

export function ContactDetailClient({ contact, companies }: ContactDetailClientProps) {
  const router = useRouter();
  const [showEdit, setShowEdit] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fullName = `${contact.firstName} ${contact.lastName}`;
  const companyLine = contact.company ? `${contact.title || ""} at ${contact.company.name}`.trim() : contact.title || "";

  const activities = (contact.activities || []).map((a: any) => ({
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
      firstName: form.get("firstName") as string,
      lastName: form.get("lastName") as string,
      email: (form.get("email") as string) || undefined,
      mobilePhone: (form.get("mobilePhone") as string) || undefined,
      officePhone: (form.get("officePhone") as string) || undefined,
      title: (form.get("title") as string) || undefined,
      linkedIn: (form.get("linkedIn") as string) || undefined,
      companyId: (form.get("companyId") as string) || undefined,
      contactRole: (form.get("contactRole") as string) || undefined,
    };
    try {
      const res = await fetch(`/api/contacts/${contact.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Failed to update contact");
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
          contactId: contact.id,
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
    if (!confirm("Delete this contact?")) return;
    await fetch(`/api/contacts/${contact.id}`, { method: "DELETE" });
    router.push("/crm/contacts");
    router.refresh();
  }

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <PageHeader
        title={fullName}
        breadcrumbs={[
          { label: "Contacts", href: "/crm/contacts" },
          { label: fullName },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setShowEdit(true)}>
              <Edit className="mr-1.5 h-3.5 w-3.5" /> Edit
            </Button>
            <Button variant="outline" size="sm" onClick={handleDelete}>
              <Trash2 className="mr-1.5 h-3.5 w-3.5" />
            </Button>
          </div>
        }
      />

      <div className="flex flex-1 overflow-auto">
        {/* Left Column */}
        <div className="w-80 shrink-0 border-r border-gray-200 p-6">
          <div className="mb-6 text-center">
            <Avatar firstName={contact.firstName} lastName={contact.lastName} size="lg" className="mx-auto mb-3 !h-16 !w-16 !text-xl" />
            <h2 className="text-lg font-semibold text-gray-900">{fullName}</h2>
            {companyLine && <p className="text-sm text-gray-500">{companyLine}</p>}
          </div>

          <dl className="space-y-3">
            {contact.email && (
              <div>
                <dt className="text-xs font-medium text-gray-500">Email</dt>
                <dd className="flex items-center gap-1.5 text-sm text-gray-900">
                  {contact.email}
                  <button onClick={() => copyToClipboard(contact.email)} className="text-gray-400 hover:text-gray-600"><Copy className="h-3 w-3" /></button>
                </dd>
              </div>
            )}
            {contact.mobilePhone && (
              <div>
                <dt className="text-xs font-medium text-gray-500">Mobile Phone</dt>
                <dd className="text-sm text-gray-900">{contact.mobilePhone}</dd>
              </div>
            )}
            {contact.officePhone && (
              <div>
                <dt className="text-xs font-medium text-gray-500">Office Phone</dt>
                <dd className="text-sm text-gray-900">{contact.officePhone}</dd>
              </div>
            )}
            {contact.linkedIn && (
              <div>
                <dt className="text-xs font-medium text-gray-500">LinkedIn</dt>
                <dd className="text-sm text-emerald-600">{contact.linkedIn}</dd>
              </div>
            )}
            {contact.assignedTo && (
              <div>
                <dt className="text-xs font-medium text-gray-500">Assigned To</dt>
                <dd className="text-sm text-gray-900">{contact.assignedTo.firstName} {contact.assignedTo.lastName}</dd>
              </div>
            )}
            {contact.contactRole && (
              <div>
                <dt className="text-xs font-medium text-gray-500">Contact Role</dt>
                <dd className="text-sm text-gray-900">{contact.contactRole}</dd>
              </div>
            )}
          </dl>

          {/* Related Projects */}
          {contact.projectContacts?.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xs font-semibold uppercase text-gray-400 mb-2">Projects</h3>
              <ul className="space-y-1">
                {contact.projectContacts.map((pc: any) => (
                  <li key={pc.project.id}>
                    <a href={`/crm/projects/${pc.project.id}`} className="text-sm text-emerald-600 hover:underline">{pc.project.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Related Leads */}
          {contact.leadContacts?.length > 0 && (
            <div className="mt-4">
              <h3 className="text-xs font-semibold uppercase text-gray-400 mb-2">Leads</h3>
              <ul className="space-y-1">
                {contact.leadContacts.map((lc: any) => (
                  <li key={lc.lead.id}>
                    <a href={`/crm/leads/${lc.lead.id}`} className="text-sm text-emerald-600 hover:underline">{lc.lead.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="flex-1 p-6">
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
        </div>
      </div>

      {/* Edit Contact Modal */}
      <Modal open={showEdit} onClose={() => setShowEdit(false)} title="Edit Contact">
        <form onSubmit={handleEditSubmit} className="space-y-4">
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">First Name *</label>
              <Input name="firstName" required defaultValue={contact.firstName} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Last Name *</label>
              <Input name="lastName" required defaultValue={contact.lastName} />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Email</label>
            <Input name="email" type="email" defaultValue={contact.email || ""} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Mobile Phone</label>
              <Input name="mobilePhone" defaultValue={contact.mobilePhone || ""} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Office Phone</label>
              <Input name="officePhone" defaultValue={contact.officePhone || ""} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Title</label>
              <Input name="title" defaultValue={contact.title || ""} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Contact Role</label>
              <Input name="contactRole" defaultValue={contact.contactRole || ""} />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">LinkedIn</label>
            <Input name="linkedIn" defaultValue={contact.linkedIn || ""} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Company</label>
            <Select name="companyId" options={companies} defaultValue={contact.companyId || ""} placeholder="Select company" />
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
