"use client";

import React from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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

export default function ProjectDetailsPage() {
  const params = useParams();
  const pathname = usePathname();
  const basePath = `/crm/projects/${params.id}`;

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

      <div className="flex flex-1 flex-col overflow-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Opportunity Information</h2>
          <Button variant="outline" size="sm"><Edit className="mr-1.5 h-3.5 w-3.5" /> Edit</Button>
        </div>

        <div className="grid grid-cols-2 gap-x-12 gap-y-4 mb-8">
          {[
            ["Name", "Austin Office Tower"],
            ["Division", "Commercial"],
            ["Assigned To", "John Rutherford"],
            ["Lead Source", "Referral"],
            ["Contract Value", "$45,000,000"],
            ["Profit", "$2,250,000"],
            ["GNG Score", "78"],
            ["Delivery Method", "CM at Risk"],
            ["Project Number", "PRJ-2024-001"],
            ["Precon Start Date", "Jan 15, 2024"],
            ["Precon End Date", "Jun 30, 2024"],
            ["Bid Due Date", "Jul 15, 2024"],
            ["Construction Start", "Sep 1, 2024"],
            ["Construction End", "Dec 31, 2025"],
            ["Project Duration", "18 months"],
            ["Project Status", "Pursuit"],
          ].map(([label, value]) => (
            <div key={label} className="flex">
              <dt className="w-40 shrink-0 text-sm font-medium text-gray-500">{label}</dt>
              <dd className="text-sm text-gray-900">{value}</dd>
            </div>
          ))}
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Facts</h3>
        <div className="grid grid-cols-2 gap-x-12 gap-y-4 mb-8">
          {[
            ["Project Features", "LEED Gold Certification, Smart Building Systems"],
            ["Contract Features", "Liquidated Damages, Performance Bond"],
            ["Construction Type", "New Construction"],
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
            ["Competitor", "—"],
            ["Competitor's Amount", "—"],
            ["Additional Notes", "—"],
          ].map(([label, value]) => (
            <div key={label} className="flex">
              <dt className="w-40 shrink-0 text-sm font-medium text-gray-500">{label}</dt>
              <dd className="text-sm text-gray-900">{value}</dd>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
