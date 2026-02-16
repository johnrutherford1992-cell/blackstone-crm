"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MetricCard } from "@/components/shared/metric-card";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { LayoutDashboard, GitBranch, Percent, UserCheck, BarChart3, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const WORKFORCE_NAV = [
  { label: "Overview", href: "/workforce", icon: LayoutDashboard },
  { label: "Assignments", href: "/workforce/assignments", icon: GitBranch },
  { label: "Utilization", href: "/workforce/utilization", icon: Percent },
  { label: "Bench", href: "/workforce/bench", icon: UserCheck },
  { label: "Demand", href: "/workforce/demand", icon: BarChart3 },
  { label: "Employees", href: "/workforce/employees", icon: Users },
];

const UNFILLED = [
  { id: "1", project: "Austin Office Tower", division: "Commercial", status: "Pursuit", role: "Superintendent" },
  { id: "2", project: "Dell Medical Center", division: "Commercial", status: "Bidding", role: "Project Manager" },
  { id: "3", project: "Domain Mixed-Use Phase III", division: "Commercial", status: "Pursuit", role: "APM" },
  { id: "4", project: "UT Engineering Building", division: "Commercial", status: "Contract Sent", role: "Foreman" },
];

const STATUS_VARIANTS: Record<string, "success" | "info" | "purple" | "warning"> = {
  Pursuit: "purple", Bidding: "info", "Contract Sent": "warning",
};

export default function WorkforceDashboardPage() {
  const pathname = usePathname();

  return (
    <div className="flex flex-1 overflow-hidden">
      <aside className="w-56 shrink-0 border-r border-gray-200 bg-white">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-sm font-semibold text-gray-900">Workforce</h2>
        </div>
        <nav className="p-2">
          {WORKFORCE_NAV.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-2 rounded-md px-3 py-2 text-sm",
                pathname === item.href ? "bg-emerald-50 text-emerald-700 font-medium" : "text-gray-600 hover:bg-gray-50"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      <div className="flex flex-1 flex-col overflow-auto p-6">
        <h1 className="mb-6 text-xl font-semibold text-gray-900">Workforce Overview</h1>

        <div className="mb-6 flex items-center gap-3">
          <select className="rounded-md border border-gray-300 px-3 py-1.5 text-sm">
            <option>Q1 2024</option>
            <option>Q2 2024</option>
          </select>
        </div>

        <div className="mb-8 grid grid-cols-2 gap-4">
          <MetricCard label="Projects" value={10} />
          <MetricCard label="Unfilled Assignments" value={4} />
        </div>

        <Card>
          <CardHeader><CardTitle>Unfilled Assignments</CardTitle></CardHeader>
          <CardContent className="p-0">
            <DataTable
              data={UNFILLED}
              columns={[
                { key: "project", label: "Project", sortable: true },
                { key: "division", label: "Division" },
                { key: "status", label: "Project Status", render: (val: string) => <Badge variant={STATUS_VARIANTS[val] || "default"}>{val}</Badge> },
                { key: "role", label: "Role" },
              ]}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
