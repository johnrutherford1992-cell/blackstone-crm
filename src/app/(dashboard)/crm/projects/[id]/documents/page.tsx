"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { DataTable } from "@/components/shared/data-table";
import { Sidebar } from "@/components/layout/sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Upload, FileText, Image, File, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

const DOC_CATEGORIES = [
  { label: "All", count: 24 },
  { label: "RFP", count: 3 },
  { label: "Drawings", count: 8 },
  { label: "Schedules", count: 2 },
  { label: "Permits", count: 1 },
  { label: "Contracts", count: 4 },
  { label: "Misc", count: 3 },
  { label: "Photos", count: 3 },
  { label: "Trash", count: 0 },
];

const SAMPLE_DOCS = [
  { id: "1", name: "RFP Package v2.pdf", type: "PDF", category: "RFP", size: "4.2 MB", createdBy: "John Rutherford", created: "Feb 1, 2024", modified: "Feb 10, 2024" },
  { id: "2", name: "Floor Plans - Level 1.dwg", type: "DWG", category: "Drawings", size: "12.8 MB", createdBy: "David Chen", created: "Jan 20, 2024", modified: "Feb 5, 2024" },
  { id: "3", name: "Master Schedule v3.pdf", type: "PDF", category: "Schedules", size: "1.1 MB", createdBy: "John Rutherford", created: "Feb 8, 2024", modified: "Feb 12, 2024" },
  { id: "4", name: "Subcontract - Electrical.docx", type: "DOCX", category: "Contracts", size: "890 KB", createdBy: "Emily Park", created: "Jan 15, 2024", modified: "Jan 28, 2024" },
  { id: "5", name: "Site Photo - Foundation.jpg", type: "JPG", category: "Photos", size: "3.5 MB", createdBy: "Mike Thompson", created: "Feb 14, 2024", modified: "Feb 14, 2024" },
];

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

export default function ProjectDocumentsPage() {
  const params = useParams();
  const pathname = usePathname();
  const basePath = `/crm/projects/${params.id}`;

  const columns = [
    { key: "name", label: "Name", sortable: true },
    { key: "type", label: "Type" },
    { key: "category", label: "Location" },
    { key: "size", label: "Size" },
    { key: "createdBy", label: "Created by" },
    { key: "created", label: "Created", sortable: true },
    { key: "modified", label: "Modified", sortable: true },
  ];

  return (
    <div className="flex flex-1 overflow-hidden">
      <aside className="w-56 shrink-0 border-r border-gray-200 bg-white">
        <div className="border-b border-gray-200 p-4">
          <Link href="/crm/projects" className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-3">
            <ArrowLeft className="h-4 w-4" /> Back
          </Link>
          <h3 className="text-sm font-semibold text-gray-900">Austin Office Tower</h3>
          <Badge variant="success" className="mt-1">Discovery</Badge>
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
        <div className="border-t border-gray-200 p-2 mt-2">
          <p className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gray-400">Categories</p>
          {DOC_CATEGORIES.map((cat) => (
            <button key={cat.label} className="flex w-full items-center justify-between rounded-md px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50">
              {cat.label}
              <span className="text-xs text-gray-400">{cat.count}</span>
            </button>
          ))}
        </div>
      </aside>

      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold text-gray-900">Documents</h2>
            <Input placeholder="Search documents..." className="w-64" />
          </div>
          <Button><Upload className="mr-1.5 h-4 w-4" /> Upload Documents</Button>
        </div>
        <div className="flex-1 overflow-auto">
          <DataTable data={SAMPLE_DOCS} columns={columns} totalCount={24} />
        </div>
      </div>
    </div>
  );
}
