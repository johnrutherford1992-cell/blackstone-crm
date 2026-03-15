"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { formatCurrency } from "@/lib/utils";
import { ArrowLeft, Building2, Edit } from "lucide-react";
import { cn } from "@/lib/utils";

const PROJECT_NAV = [
  { label: "Overview", href: "" },
  { label: "Details", href: "/details" },
  { label: "Drawings", href: "/drawings" },
  { label: "Directory", href: "/directory" },
  { label: "Documents", href: "/documents" },
  { label: "Budget", href: "/budget" },
  { label: "Bidding", href: "/bidding" },
  { label: "Financials", href: "/financials" },
  { label: "Activity", href: "/activity" },
];

interface ProjectDetailsClientProps {
  project: any;
  stages: { value: string; label: string }[];
  divisions: { value: string; label: string }[];
  companies: { value: string; label: string }[];
}

export function ProjectDetailsClient({ project, stages, divisions, companies }: ProjectDetailsClientProps) {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const basePath = `/crm/projects/${params.id}`;
  const [showEdit, setShowEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const cv = project.contractValue ? Number(project.contractValue) : null;
  const profit = project.profit ? Number(project.profit) : null;

  const details: [string, string][] = [
    ["Name", project.name],
    ["Division", project.division?.name || "—"],
    ["Assigned To", project.assignedTo ? `${project.assignedTo.firstName} ${project.assignedTo.lastName}` : "—"],
    ["Lead Source", project.source || "—"],
    ["Contract Value", cv ? formatCurrency(cv) : "—"],
    ["Profit", profit ? formatCurrency(profit) : "—"],
    ["GNG Score", project.gngScore ? String(project.gngScore) : "—"],
    ["Delivery Method", project.deliveryMethod?.name || "—"],
    ["Project Number", project.projectNumber || "—"],
    ["Precon Start Date", project.preconStartDate ? new Date(project.preconStartDate).toLocaleDateString() : "—"],
    ["Precon End Date", project.preconEndDate ? new Date(project.preconEndDate).toLocaleDateString() : "—"],
    ["Bid Due Date", project.bidDueDate ? new Date(project.bidDueDate).toLocaleDateString() : "—"],
    ["Construction Start", project.constructionStart ? new Date(project.constructionStart).toLocaleDateString() : "—"],
    ["Construction End", project.constructionEnd ? new Date(project.constructionEnd).toLocaleDateString() : "—"],
    ["Project Duration", project.projectDuration ? `${project.projectDuration} months` : "—"],
    ["Stage", project.stage?.name || "—"],
  ];

  async function handleEditSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(e.currentTarget);
    const body: Record<string, unknown> = {
      name: form.get("name") as string,
      projectNumber: (form.get("projectNumber") as string) || undefined,
      stageId: (form.get("stageId") as string) || undefined,
      divisionId: (form.get("divisionId") as string) || undefined,
      address: (form.get("address") as string) || undefined,
      city: (form.get("city") as string) || undefined,
      state: (form.get("state") as string) || undefined,
      source: (form.get("source") as string) || undefined,
      projectFeatures: (form.get("projectFeatures") as string) || undefined,
      contractFeatures: (form.get("contractFeatures") as string) || undefined,
      constructionType: (form.get("constructionType") as string) || undefined,
    };
    const cv = form.get("contractValue") as string;
    if (cv) body.contractValue = Number(cv);
    const wp = form.get("winProbability") as string;
    if (wp) body.winProbability = Number(wp);
    const gsf = form.get("gsf") as string;
    if (gsf) body.gsf = Number(gsf);
    const pd = form.get("projectDuration") as string;
    if (pd) body.projectDuration = Number(pd);

    try {
      const res = await fetch(`/api/projects/${project.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Failed to update project");
      setShowEdit(false);
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-1 overflow-hidden">
      <aside className="w-56 shrink-0 border-r border-gray-200 bg-white">
        <div className="border-b border-gray-200 p-4">
          <Link href="/crm/projects" className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-3">
            <ArrowLeft className="h-4 w-4" /> Back
          </Link>
          <h3 className="text-sm font-semibold text-gray-900">{project.name}</h3>
          <Badge variant="success" className="mt-1">{project.stage?.name || "—"}</Badge>
        </div>
        <nav className="p-2">
          {PROJECT_NAV.map((item) => {
            const href = `${basePath}${item.href}`;
            const isActive = item.href === "" ? pathname === basePath : pathname.startsWith(href);
            return (
              <Link key={item.label} href={href} className={cn("block rounded-md px-3 py-2 text-sm", isActive ? "bg-emerald-50 text-emerald-700 font-medium" : "text-gray-600 hover:bg-gray-50")}>
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="flex flex-1 flex-col overflow-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Opportunity Information</h2>
          <Button variant="outline" size="sm" onClick={() => setShowEdit(true)}>
            <Edit className="mr-1.5 h-3.5 w-3.5" /> Edit
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-x-12 gap-y-4 mb-8">
          {details.map(([label, value]) => (
            <div key={label} className="flex">
              <dt className="w-40 shrink-0 text-sm font-medium text-gray-500">{label}</dt>
              <dd className="text-sm text-gray-900">{value}</dd>
            </div>
          ))}
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Facts</h3>
        <div className="grid grid-cols-2 gap-x-12 gap-y-4 mb-8">
          {[
            ["Project Features", project.projectFeatures || "—"],
            ["Contract Features", project.contractFeatures || "—"],
            ["Construction Type", project.constructionType || "—"],
          ].map(([label, value]) => (
            <div key={label} className="flex">
              <dt className="w-40 shrink-0 text-sm font-medium text-gray-500">{label}</dt>
              <dd className="text-sm text-gray-900">{value}</dd>
            </div>
          ))}
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-4">Loss Info</h3>
        <div className="grid grid-cols-2 gap-x-12 gap-y-4">
          {[
            ["Competitor", project.competitorName || "—"],
            ["Competitor's Amount", project.competitorAmount ? formatCurrency(Number(project.competitorAmount)) : "—"],
            ["Additional Notes", project.lossNotes || "—"],
          ].map(([label, value]) => (
            <div key={label} className="flex">
              <dt className="w-40 shrink-0 text-sm font-medium text-gray-500">{label}</dt>
              <dd className="text-sm text-gray-900">{value}</dd>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Project Modal */}
      <Modal open={showEdit} onClose={() => setShowEdit(false)} title="Edit Project" className="max-w-2xl">
        <form onSubmit={handleEditSubmit} className="space-y-4 max-h-[70vh] overflow-auto">
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Project Name *</label>
              <Input name="name" required defaultValue={project.name} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Project Number</label>
              <Input name="projectNumber" defaultValue={project.projectNumber || ""} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Stage</label>
              <Select name="stageId" options={stages} defaultValue={project.stageId || ""} placeholder="Select stage" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Division</label>
              <Select name="divisionId" options={divisions} defaultValue={project.divisionId || ""} placeholder="Select division" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Contract Value</label>
              <Input name="contractValue" type="number" min="0" defaultValue={cv || ""} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Win Probability (%)</label>
              <Input name="winProbability" type="number" min="0" max="100" defaultValue={project.winProbability || ""} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">GSF</label>
              <Input name="gsf" type="number" min="0" defaultValue={project.gsf || ""} />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Address</label>
              <Input name="address" defaultValue={project.address || ""} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">City</label>
              <Input name="city" defaultValue={project.city || ""} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">State</label>
              <Input name="state" defaultValue={project.state || ""} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Lead Source</label>
              <Input name="source" defaultValue={project.source || ""} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Duration (months)</label>
              <Input name="projectDuration" type="number" min="0" defaultValue={project.projectDuration || ""} />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Construction Type</label>
            <Input name="constructionType" defaultValue={project.constructionType || ""} />
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
