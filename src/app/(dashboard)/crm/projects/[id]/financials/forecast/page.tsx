"use client";

import React from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { DataTable } from "@/components/shared/data-table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download } from "lucide-react";
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

const FORECAST_DATA = [
  { id: "1", month: "January 2024", revenue: 3000000, costs: 2850000, profit: 150000 },
  { id: "2", month: "February 2024", revenue: 3500000, costs: 3200000, profit: 300000 },
  { id: "3", month: "March 2024", revenue: 4000000, costs: 3700000, profit: 300000 },
  { id: "4", month: "April 2024", revenue: 4000000, costs: 3800000, profit: 200000 },
  { id: "5", month: "May 2024", revenue: 3800000, costs: 3600000, profit: 200000 },
  { id: "6", month: "June 2024", revenue: 3500000, costs: 3300000, profit: 200000 },
];

export default function ProjectForecastPage() {
  const params = useParams();
  const pathname = usePathname();
  const basePath = `/crm/projects/${params.id}`;

  const columns = [
    { key: "month", label: "Month", sortable: true },
    { key: "revenue", label: "Revenue", sortable: true, render: (val: number) => formatCurrency(val) },
    { key: "costs", label: "Costs", sortable: true, render: (val: number) => formatCurrency(val) },
    { key: "profit", label: "Profit", sortable: true, render: (val: number) => formatCurrency(val) },
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
          <h2 className="text-lg font-semibold text-gray-900">Financial Forecast</h2>
          <Button variant="outline" size="sm"><Download className="mr-1.5 h-4 w-4" /> Export</Button>
        </div>

        <div className="flex-1 overflow-auto p-6">
          <div className="space-y-6">
            {/* Forecast Chart Placeholder */}
            <Card>
              <CardHeader><CardTitle>Monthly Forecast</CardTitle></CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200">
                  <div className="text-center">
                    <p className="text-gray-500 text-sm">Chart visualization would be displayed here</p>
                    <p className="text-gray-400 text-xs mt-1">Revenue and cost trends over time</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Forecast Table */}
            <Card>
              <CardHeader><CardTitle>Forecast Details</CardTitle></CardHeader>
              <CardContent className="pt-0">
                <div className="overflow-auto">
                  <DataTable data={FORECAST_DATA} columns={columns} totalCount={6} />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
