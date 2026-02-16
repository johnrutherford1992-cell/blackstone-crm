"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { FilterBar } from "@/components/shared/filter-bar";
import { DataTable } from "@/components/shared/data-table";
import { Avatar } from "@/components/ui/avatar";
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

const BENCH_DATA = [
  { id: "1", firstName: "Lisa", lastName: "Park", role: "APM", availability: "Immediate", experience: "8 years" },
  { id: "2", firstName: "Tom", lastName: "Richards", role: "Superintendent", availability: "Apr 2024", experience: "12 years" },
  { id: "3", firstName: "Jennifer", lastName: "Lopez", role: "Project Manager", availability: "Immediate", experience: "6 years" },
  { id: "4", firstName: "Kevin", lastName: "Martinez", role: "Senior PM", availability: "Mar 2024", experience: "15 years" },
  { id: "5", firstName: "Amanda", lastName: "Thompson", role: "Preconstruction", availability: "Immediate", experience: "5 years" },
];

export default function BenchPage() {
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
        <PageHeader title="Bench" />
        <FilterBar>
          <select className="rounded-md border border-gray-300 px-2 py-1 text-sm"><option>All Roles</option><option>PM</option><option>APM</option><option>Superintendent</option></select>
        </FilterBar>

        <div className="flex-1 overflow-auto">
          <DataTable
            data={BENCH_DATA}
            columns={[
              {
                key: "firstName",
                label: "Employee",
                render: (_: any, row: any) => (
                  <div className="flex items-center gap-2">
                    <Avatar firstName={row.firstName} lastName={row.lastName} size="sm" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{row.firstName} {row.lastName}</p>
                    </div>
                  </div>
                ),
              },
              { key: "role", label: "Role" },
              { key: "availability", label: "Availability" },
              { key: "experience", label: "Experience" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
