"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Plus } from "lucide-react";
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

interface ProjectBiddingClientProps {
  project: any;
}

export function ProjectBiddingClient({ project }: ProjectBiddingClientProps) {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const basePath = `/crm/projects/${params.id}`;
  const [showCreate, setShowCreate] = useState(false);
  const [loading, setLoading] = useState(false);

  const bidPackages = (project.bidPackages || []).map((bp: any) => ({
    id: bp.id,
    number: bp.number,
    name: bp.name,
    dueDate: bp.dueDate ? new Date(bp.dueDate).toLocaleDateString() : "—",
    bids: bp.bids?.length || 0,
    awardedBidder: bp.awardedTo || "—",
  }));

  const columns = [
    { key: "number", label: "#" },
    { key: "name", label: "Name", sortable: true },
    { key: "dueDate", label: "Due Date", sortable: true },
    { key: "bids", label: "# Bids" },
    { key: "awardedBidder", label: "Awarded Bidder" },
  ];

  async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch(`/api/projects/${project.id}/bid-packages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name") as string,
          number: Number(form.get("number")),
          dueDate: (form.get("dueDate") as string) || undefined,
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setShowCreate(false);
      router.refresh();
    } catch {
      // silent
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

      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">Bid Packages</h2>
          <Button onClick={() => setShowCreate(true)}>
            <Plus className="mr-1.5 h-4 w-4" /> Add Bid Package
          </Button>
        </div>
        <div className="flex-1 overflow-auto">
          {bidPackages.length > 0 ? (
            <DataTable data={bidPackages} columns={columns} totalCount={bidPackages.length} />
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <p className="text-gray-500 mb-4">No bid packages yet</p>
                <Button onClick={() => setShowCreate(true)}>
                  <Plus className="mr-1.5 h-4 w-4" /> Add First Bid Package
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Modal open={showCreate} onClose={() => setShowCreate(false)} title="Add Bid Package">
        <form onSubmit={handleCreate} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Package # *</label>
              <Input name="number" type="number" required defaultValue={bidPackages.length + 1} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Due Date</label>
              <Input name="dueDate" type="date" />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Package Name *</label>
            <Input name="name" required placeholder="e.g. Earthwork & Grading" />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => setShowCreate(false)}>Cancel</Button>
            <Button type="submit" disabled={loading}>{loading ? "Creating..." : "Create"}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
