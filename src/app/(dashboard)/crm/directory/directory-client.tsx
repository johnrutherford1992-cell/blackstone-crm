"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { FilterBar } from "@/components/shared/filter-bar";
import { Tabs } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Plus } from "lucide-react";

const CATEGORY_TABS = [
  { label: "All", value: "ALL" },
  { label: "Client", value: "CLIENT" },
  { label: "Design", value: "DESIGN" },
  { label: "Engineering", value: "ENGINEERING" },
  { label: "Finance", value: "FINANCE" },
  { label: "Trade Partner", value: "TRADE_PARTNER" },
  { label: "Other", value: "OTHER" },
];

const CATEGORY_OPTIONS = [
  { value: "CLIENT", label: "Client" },
  { value: "DESIGN", label: "Design" },
  { value: "ENGINEERING", label: "Engineering" },
  { value: "FINANCE", label: "Finance" },
  { value: "TRADE_PARTNER", label: "Trade Partner" },
  { value: "OTHER", label: "Other" },
];

interface CompanyRow {
  id: string;
  name: string;
  assignedTo: string;
  category: string;
  phone: string;
}

interface DirectoryClientProps {
  companies: CompanyRow[];
  totalCount: number;
}

export function DirectoryClient({ companies, totalCount }: DirectoryClientProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("ALL");
  const [showCreate, setShowCreate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const columns = [
    {
      key: "name",
      label: "Company Name",
      sortable: true,
      href: (row: CompanyRow) => `/crm/directory/${row.id}`,
    },
    { key: "assignedTo", label: "Assigned To", sortable: true },
    { key: "phone", label: "Phone" },
  ];

  const filtered = activeTab === "ALL" ? companies : companies.filter((c) => c.category === activeTab);

  async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(e.currentTarget);
    const body = {
      name: form.get("name") as string,
      category: (form.get("category") as string) || undefined,
      phone: (form.get("phone") as string) || undefined,
      address: (form.get("address") as string) || undefined,
      city: (form.get("city") as string) || undefined,
      state: (form.get("state") as string) || undefined,
      website: (form.get("website") as string) || undefined,
    };
    try {
      const res = await fetch("/api/companies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create company");
      }
      setShowCreate(false);
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <PageHeader
        title="Directory"
        actions={
          <Button onClick={() => setShowCreate(true)}>
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

      {/* Create Company Modal */}
      <Modal open={showCreate} onClose={() => setShowCreate(false)} title="New Company">
        <form onSubmit={handleCreate} className="space-y-4">
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Company Name *</label>
            <Input name="name" required placeholder="e.g. Turner Construction" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Category</label>
              <Select name="category" options={CATEGORY_OPTIONS} placeholder="Select category" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Phone</label>
              <Input name="phone" placeholder="(555) 123-4567" />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Address</label>
            <Input name="address" placeholder="Street address" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">City</label>
              <Input name="city" placeholder="City" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">State</label>
              <Input name="state" placeholder="State" />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Website</label>
            <Input name="website" placeholder="www.example.com" />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => setShowCreate(false)}>Cancel</Button>
            <Button type="submit" disabled={loading}>{loading ? "Creating..." : "Create Company"}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
