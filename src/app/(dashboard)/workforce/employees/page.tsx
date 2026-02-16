"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { FilterBar } from "@/components/shared/filter-bar";
import { DataTable } from "@/components/shared/data-table";
import { Avatar } from "@/components/ui/avatar";
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

const EMPLOYEES = [
  { id: "1", firstName: "John", lastName: "Rutherford", role: "PM", division: "Commercial", status: "Active", email: "john@blackstone.com" },
  { id: "2", firstName: "Sarah", lastName: "Mitchell", role: "PM", division: "Commercial", status: "Active", email: "sarah@blackstone.com" },
  { id: "3", firstName: "Mike", lastName: "Thompson", role: "Superintendent", division: "Commercial", status: "Active", email: "mthompson@blackstone.com" },
  { id: "4", firstName: "David", lastName: "Chen", role: "Senior PM", division: "Commercial", status: "Active", email: "dchen@blackstone.com" },
  { id: "5", firstName: "Emily", lastName: "Park", role: "Preconstruction Manager", division: "Commercial", status: "Active", email: "epark@blackstone.com" },
  { id: "6", firstName: "James", lastName: "Wilson", role: "Foreman", division: "Commercial", status: "Active", email: "jwilson@blackstone.com" },
  { id: "7", firstName: "Lisa", lastName: "Park", role: "APM", division: "Commercial", status: "On Bench", email: "lpark@blackstone.com" },
];

export default function EmployeesPage() {
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
        <PageHeader title="Employees" />
        <FilterBar>
          <select className="rounded-md border border-gray-300 px-2 py-1 text-sm"><option>All Statuses</option><option>Active</option><option>On Bench</option><option>Inactive</option></select>
        </FilterBar>

        <div className="flex-1 overflow-auto">
          <DataTable
            data={EMPLOYEES}
            columns={[
              {
                key: "firstName",
                label: "Employee",
                render: (_: any, row: any) => (
                  <Link href={`/workforce/employees/${row.id}`} className="flex items-center gap-2 hover:text-emerald-700">
                    <Avatar firstName={row.firstName} lastName={row.lastName} size="sm" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{row.firstName} {row.lastName}</p>
                      <p className="text-xs text-gray-500">{row.email}</p>
                    </div>
                  </Link>
                ),
              },
              { key: "role", label: "Role" },
              { key: "division", label: "Division" },
              { key: "status", label: "Status", render: (val: string) => <Badge variant={val === "Active" ? "success" : "info"}>{val}</Badge> },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
