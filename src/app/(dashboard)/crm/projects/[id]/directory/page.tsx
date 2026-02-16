"use client";

import React from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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

const SAMPLE_COMPANIES = [
  { id: "1", name: "Turner Construction", role: "General Contractor", contact: "John Rutherford", email: "john@turnerconstruction.com", phone: "(512) 555-0101" },
  { id: "2", name: "Austin Grading Co", role: "Subcontractor - Earthwork", contact: "Mike Johnson", email: "mike@austingrading.com", phone: "(512) 555-0102" },
  { id: "3", name: "Elite Concrete Solutions", role: "Subcontractor - Concrete", contact: "David Chen", email: "david@eliteconcrete.com", phone: "(512) 555-0103" },
  { id: "4", name: "Precision Steel Inc", role: "Subcontractor - Structural Steel", contact: "Sarah Williams", email: "sarah@precisionsteel.com", phone: "(512) 555-0104" },
  { id: "5", name: "Austin HVAC Systems", role: "Subcontractor - Mechanical", contact: "Tom Martinez", email: "tom@austinhvac.com", phone: "(512) 555-0105" },
  { id: "6", name: "Bright Electric Corp", role: "Subcontractor - Electrical", contact: "Lisa Anderson", email: "lisa@brightelectric.com", phone: "(512) 555-0106" },
];

export default function ProjectDirectoryPage() {
  const params = useParams();
  const pathname = usePathname();
  const basePath = `/crm/projects/${params.id}`;

  const columns = [
    { key: "name", label: "Company", sortable: true },
    { key: "role", label: "Role" },
    { key: "contact", label: "Contact" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
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
      </aside>

      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">Project Directory</h2>
          <Button><Plus className="mr-1.5 h-4 w-4" /> Add Company</Button>
        </div>
        <div className="flex-1 overflow-auto">
          <DataTable data={SAMPLE_COMPANIES} columns={columns} totalCount={6} />
        </div>
      </div>
    </div>
  );
}
