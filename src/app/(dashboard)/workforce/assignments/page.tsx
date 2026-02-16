"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { FilterBar } from "@/components/shared/filter-bar";
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

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const ASSIGNMENTS = [
  {
    project: "Austin Office Tower",
    roles: [
      { role: "PM", person: "John Rutherford", start: 0, end: 11, color: "#10B981" },
      { role: "SUPER", person: "Mike Thompson", start: 2, end: 11, color: "#10B981" },
      { role: "PRECON", person: "Emily Park", start: 0, end: 5, color: "#8B5CF6" },
    ],
  },
  {
    project: "Dell Medical Center",
    roles: [
      { role: "PM", person: "—", start: 3, end: 11, color: "#D1D5DB" },
      { role: "SPM", person: "David Chen", start: 3, end: 11, color: "#3B82F6" },
    ],
  },
  {
    project: "The Grove at Shoal Creek",
    roles: [
      { role: "PM", person: "Sarah Mitchell", start: 0, end: 9, color: "#10B981" },
      { role: "SUPER", person: "James Wilson", start: 0, end: 9, color: "#10B981" },
      { role: "APM", person: "Lisa Park", start: 1, end: 8, color: "#10B981" },
    ],
  },
];

export default function AssignmentsPage() {
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
        <PageHeader title="Assignments" />
        <FilterBar>
          <select className="rounded-md border border-gray-300 px-2 py-1 text-sm"><option>Month</option><option>Quarter</option></select>
        </FilterBar>

        <div className="flex-1 overflow-auto">
          <div className="min-w-[1000px]">
            <div className="sticky top-0 flex border-b border-gray-200 bg-gray-50">
              <div className="w-64 shrink-0 border-r border-gray-200 px-4 py-2 text-xs font-medium text-gray-500">Project / Role</div>
              <div className="flex flex-1">
                {MONTHS.map((m) => (
                  <div key={m} className="flex-1 border-r border-gray-100 px-1 py-2 text-center text-xs font-medium text-gray-500">{m}</div>
                ))}
              </div>
            </div>
            {ASSIGNMENTS.map((assignment) => (
              <div key={assignment.project}>
                <div className="flex border-b border-gray-200 bg-gray-50/50">
                  <div className="w-64 shrink-0 border-r border-gray-200 px-4 py-2">
                    <span className="text-sm font-medium text-gray-900">{assignment.project}</span>
                  </div>
                  <div className="flex-1" />
                </div>
                {assignment.roles.map((role) => (
                  <div key={role.role} className="flex border-b border-gray-100">
                    <div className="w-64 shrink-0 border-r border-gray-200 px-4 py-2 pl-8">
                      <span className="text-xs font-medium text-gray-500">{role.role}</span>
                      <span className="ml-2 text-xs text-gray-700">{role.person}</span>
                    </div>
                    <div className="relative flex flex-1 items-center py-1">
                      <div className="absolute h-5 rounded-full text-[10px] text-white flex items-center px-2 font-medium" style={{ left: `${(role.start / 12) * 100}%`, width: `${((role.end - role.start) / 12) * 100}%`, backgroundColor: role.color }}>
                        {role.person !== "—" ? role.person.split(" ")[0] : ""}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
