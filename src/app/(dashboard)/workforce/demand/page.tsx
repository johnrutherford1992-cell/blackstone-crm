"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { FilterBar } from "@/components/shared/filter-bar";
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

const DEMAND_DATA = [
  { role: "Project Manager", available: 3, needed: 5, gap: -2 },
  { role: "Senior PM", available: 1, needed: 3, gap: -2 },
  { role: "APM", available: 2, needed: 4, gap: -2 },
  { role: "Superintendent", available: 2, needed: 6, gap: -4 },
  { role: "Foreman", available: 4, needed: 8, gap: -4 },
];

export default function DemandPage() {
  const pathname = usePathname();

  const maxValue = 10;

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
        <PageHeader title="Demand vs. Availability" />
        <FilterBar>
          <select className="rounded-md border border-gray-300 px-2 py-1 text-sm"><option>Next 12 Months</option><option>Next 6 Months</option><option>Next Quarter</option></select>
        </FilterBar>

        <div className="flex-1 overflow-auto p-6">
          <div className="grid grid-cols-1 gap-6">
            {DEMAND_DATA.map((item) => (
              <Card key={item.role}>
                <CardContent className="pt-6">
                  <div className="flex items-end justify-between gap-6">
                    <div className="flex-1">
                      <h3 className="mb-4 text-sm font-semibold text-gray-900">{item.role}</h3>
                      <div className="flex gap-8">
                        <div className="flex-1">
                          <p className="mb-2 text-xs text-gray-600">Available</p>
                          <div className="flex items-end gap-1">
                            {Array.from({ length: maxValue }).map((_, i) => (
                              <div
                                key={i}
                                className="flex-1 rounded-t-sm bg-emerald-200"
                                style={{ height: i < item.available ? "48px" : "4px" }}
                              />
                            ))}
                          </div>
                          <p className="mt-2 text-sm font-medium text-gray-900">{item.available}</p>
                        </div>
                        <div className="flex-1">
                          <p className="mb-2 text-xs text-gray-600">Needed</p>
                          <div className="flex items-end gap-1">
                            {Array.from({ length: maxValue }).map((_, i) => (
                              <div
                                key={i}
                                className="flex-1 rounded-t-sm bg-blue-200"
                                style={{ height: i < item.needed ? "48px" : "4px" }}
                              />
                            ))}
                          </div>
                          <p className="mt-2 text-sm font-medium text-gray-900">{item.needed}</p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-600">Gap</p>
                      <p className={`text-2xl font-bold ${item.gap < 0 ? "text-red-600" : "text-emerald-600"}`}>
                        {item.gap}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
