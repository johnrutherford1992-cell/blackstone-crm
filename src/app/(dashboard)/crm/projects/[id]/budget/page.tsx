"use client";

import React from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { EmptyState } from "@/components/shared/empty-state";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, DollarSign } from "lucide-react";
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

export default function ProjectBudgetPage() {
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

      <div className="flex flex-1 items-center justify-center">
        <EmptyState
          icon={<DollarSign className="h-8 w-8" />}
          title="Setup your budget for this project"
          description="Budgets allow you to track all revisions of your project's costs."
          actionLabel="Start from Scratch"
          secondaryActionLabel="Copy from Another Project"
        />
      </div>
    </div>
  );
}
