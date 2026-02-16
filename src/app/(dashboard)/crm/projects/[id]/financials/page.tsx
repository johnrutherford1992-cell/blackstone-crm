"use client";

import React from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { MetricCard } from "@/components/shared/metric-card";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, DollarSign, TrendingUp } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
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

export default function ProjectFinancialsPage() {
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

      <div className="flex flex-1 flex-col overflow-auto">
        <div className="border-b border-gray-200 bg-white px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-900">Project Financials</h1>
            <Button variant="outline" size="sm"><TrendingUp className="mr-1.5 h-4 w-4" /> View Forecast</Button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Financial Metrics */}
          <div className="grid grid-cols-3 gap-4">
            <MetricCard label="Total Contract Value" value={formatCurrency(45000000)} icon={<DollarSign className="h-5 w-5" />} />
            <MetricCard label="Total Fee" value={`${formatCurrency(2250000)} (5%)`} icon={<DollarSign className="h-5 w-5" />} />
            <MetricCard label="Fee per Month" value={formatCurrency(125000)} icon={<DollarSign className="h-5 w-5" />} />
          </div>

          {/* Financial Summary Card */}
          <Card>
            <CardHeader><CardTitle>Financial Summary</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Estimated Cost</p>
                  <p className="text-lg font-semibold">{formatCurrency(42750000)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Estimated Profit</p>
                  <p className="text-lg font-semibold text-emerald-600">{formatCurrency(2250000)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Profit Margin</p>
                  <p className="text-lg font-semibold">5.0%</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Status</p>
                  <Badge variant="success">On Track</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
