"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { FilterBar } from "@/components/shared/filter-bar";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
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

const UTILIZATION_DATA = [
  { id: "1", name: "John Rutherford", role: "PM", utilization: 95, projects: 2, allocation: "100%" },
  { id: "2", name: "Sarah Mitchell", role: "PM", utilization: 85, projects: 1, allocation: "85%" },
  { id: "3", name: "Mike Thompson", role: "Superintendent", utilization: 90, projects: 2, allocation: "100%" },
  { id: "4", name: "David Chen", role: "Senior PM", utilization: 100, projects: 3, allocation: "100%" },
  { id: "5", name: "Emily Park", role: "Preconstruction", utilization: 65, projects: 1, allocation: "65%" },
  { id: "6", name: "James Wilson", role: "Foreman", utilization: 78, projects: 1, allocation: "80%" },
];

const getUtilizationColor = (value: number) => {
  if (value >= 90) return "success";
  if (value >= 70) return "info";
  return "warning";
};

export default function UtilizationPage() {
  const pathname = usePathname();

  return (
    <div className="flex flex-1 overflow-hidden">
      <aside className="w-56 shrink-0 border-r border-gray-200 bg-white">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-sm font-semibold text-gray-900">Workforce</h2>
        </div>
        <nav className="p-2">
          {WORKFORCE_NAV.map((item) => (
            <Link key={item.label} href={item.href} className={cn("flex items-center gap-2 rounded-md px-3 py-2 text-sm", pathname === item.href ? "bg-emerald-50 text-emerald-700 font-medium" : "text-gray-600 hover:bg-gray-50")}>
              <item.icon className="h-4 w-4" /> {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      <div className="flex flex-1 flex-col overflow-hidden">
        <PageHeader title="Utilization" />
        <FilterBar>
          <select className="rounded-md border border-gray-300 px-2 py-1 text-sm"><option>This Quarter</option><option>Next Quarter</option></select>
        </FilterBar>

        <div className="flex-1 overflow-auto">
          <DataTable
            data={UTILIZATION_DATA}
            columns={[
              { key: "name", label: "Employee", sortable: true },
              { key: "role", label: "Role" },
              { 
                key: "utilization", 
                label: "Utilization", 
                render: (val: number) => (
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500" style={{ width: `${val}%` }}></div>
                    </div>
                    <span className="text-sm font-medium">{val}%</span>
                  </div>
                )
              },
              { key: "projects", label: "Assigned Projects" },
              { key: "allocation", label: "Allocation" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
