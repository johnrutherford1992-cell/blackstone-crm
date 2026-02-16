"use client";

import React from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { DataTable } from "@/components/shared/data-table";
import { Tabs } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Upload } from "lucide-react";
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

const SAMPLE_SHEETS = [
  { id: "1", number: "A-101", title: "Floor Plan - Level 1", revision: "3", discipline: "Architectural" },
  { id: "2", number: "A-102", title: "Floor Plan - Level 2", revision: "3", discipline: "Architectural" },
  { id: "3", number: "S-101", title: "Foundation Plan", revision: "2", discipline: "Structural" },
  { id: "4", number: "M-101", title: "HVAC Plan - Level 1", revision: "1", discipline: "Mechanical" },
  { id: "5", number: "E-101", title: "Electrical Plan - Level 1", revision: "2", discipline: "Electrical" },
];

export default function ProjectDrawingsPage() {
  const params = useParams();
  const pathname = usePathname();
  const basePath = `/crm/projects/${params.id}`;

  const columns = [
    { key: "number", label: "Number", sortable: true, width: "100px" },
    { key: "title", label: "Title", sortable: true },
    { key: "revision", label: "Revision", width: "80px" },
    { key: "discipline", label: "Discipline", sortable: true },
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
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-gray-900">Drawings</h2>
            <span className="rounded bg-blue-100 px-1.5 py-0.5 text-[10px] font-medium text-blue-700">BETA</span>
          </div>
          <Button><Upload className="mr-1.5 h-4 w-4" /> Upload</Button>
        </div>
        <Tabs
          tabs={[{ label: "Sheets", value: "sheets" }, { label: "Drawing Sets", value: "sets" }]}
          activeTab="sheets"
          onChange={() => {}}
          className="px-6"
        />
        <div className="flex-1 overflow-auto">
          <DataTable data={SAMPLE_SHEETS} columns={columns} totalCount={5} />
        </div>
      </div>
    </div>
  );
}
