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

const SAMPLE_BID_PACKAGES = [
  { id: "1", number: 1, name: "Earthwork & Grading", dueDate: "Mar 15, 2024", bids: 4, awardedBidder: "Austin Grading Co", changeRequests: 0 },
  { id: "2", number: 2, name: "Concrete - Foundations", dueDate: "Mar 20, 2024", bids: 6, awardedBidder: "—", changeRequests: 0 },
  { id: "3", number: 3, name: "Structural Steel", dueDate: "Mar 25, 2024", bids: 3, awardedBidder: "—", changeRequests: 0 },
  { id: "4", number: 4, name: "Mechanical / HVAC", dueDate: "Apr 1, 2024", bids: 5, awardedBidder: "—", changeRequests: 0 },
  { id: "5", number: 5, name: "Electrical", dueDate: "Apr 1, 2024", bids: 4, awardedBidder: "—", changeRequests: 0 },
  { id: "6", number: 6, name: "Plumbing", dueDate: "Apr 5, 2024", bids: 3, awardedBidder: "—", changeRequests: 0 },
];

export default function ProjectBiddingPage() {
  const params = useParams();
  const pathname = usePathname();
  const basePath = `/crm/projects/${params.id}`;

  const columns = [
    { key: "number", label: "#", width: "60px" },
    { key: "name", label: "Name", sortable: true },
    { key: "dueDate", label: "Due Date", sortable: true },
    { key: "bids", label: "# Bids" },
    { key: "awardedBidder", label: "Awarded Bidder" },
    { key: "changeRequests", label: "Change Requests" },
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
          <h2 className="text-lg font-semibold text-gray-900">Bid Packages</h2>
          <Button><Plus className="mr-1.5 h-4 w-4" /> Add Bid Package</Button>
        </div>
        <div className="flex-1 overflow-auto">
          <DataTable data={SAMPLE_BID_PACKAGES} columns={columns} totalCount={6} />
        </div>
      </div>
    </div>
  );
}
