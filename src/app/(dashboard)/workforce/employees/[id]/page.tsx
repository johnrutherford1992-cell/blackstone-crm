"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/shared/data-table";
import { LayoutDashboard, GitBranch, Percent, UserCheck, BarChart3, Users, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const WORKFORCE_NAV = [
  { label: "Overview", href: "/workforce", icon: LayoutDashboard },
  { label: "Assignments", href: "/workforce/assignments", icon: GitBranch },
  { label: "Utilization", href: "/workforce/utilization", icon: Percent },
  { label: "Bench", href: "/workforce/bench", icon: UserCheck },
  { label: "Demand", href: "/workforce/demand", icon: BarChart3 },
  { label: "Employees", href: "/workforce/employees", icon: Users },
];

const EMPLOYEES: Record<string, any> = {
  "1": { firstName: "John", lastName: "Rutherford", role: "Project Manager", division: "Commercial", status: "Active", email: "john@blackstone.com", phone: "(512) 555-0101", startDate: "Jan 2020" },
  "2": { firstName: "Sarah", lastName: "Mitchell", role: "Project Manager", division: "Commercial", status: "Active", email: "sarah@blackstone.com", phone: "(512) 555-0102", startDate: "Mar 2019" },
  "3": { firstName: "Mike", lastName: "Thompson", role: "Superintendent", division: "Commercial", status: "Active", email: "mthompson@blackstone.com", phone: "(512) 555-0103", startDate: "Jul 2018" },
  "4": { firstName: "David", lastName: "Chen", role: "Senior PM", division: "Commercial", status: "Active", email: "dchen@blackstone.com", phone: "(512) 555-0104", startDate: "Feb 2017" },
  "5": { firstName: "Emily", lastName: "Park", role: "Preconstruction Manager", division: "Commercial", status: "Active", email: "epark@blackstone.com", phone: "(512) 555-0105", startDate: "Sep 2021" },
};

const ASSIGNMENTS = [
  { id: "1", project: "Austin Office Tower", role: "Project Manager", startDate: "Jan 2024", endDate: "Dec 2024", status: "Active" },
  { id: "2", project: "The Grove at Shoal Creek", role: "Project Manager", startDate: "Feb 2023", endDate: "Sep 2023", status: "Completed" },
];

export default function EmployeeDetailPage() {
  const pathname = usePathname();
  const params = useParams();
  const employee = EMPLOYEES[params.id as string] || EMPLOYEES["1"];

  return (
    <div className="flex flex-1 overflow-hidden">
      <aside className="w-56 shrink-0 border-r border-gray-200 bg-white">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-sm font-semibold text-gray-900">Workforce</h2>
        </div>
        <nav className="p-2">
          {WORKFORCE_NAV.map((item) => (
            <Link key={item.label} href={item.href} className={cn("flex items-center gap-2 rounded-md px-3 py-2 text-sm", pathname.includes(item.href) && item.href !== "/workforce/employees" ? "bg-emerald-50 text-emerald-700 font-medium" : "text-gray-600 hover:bg-gray-50")}>
              <item.icon className="h-4 w-4" /> {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      <div className="flex flex-1 flex-col overflow-auto">
        <div className="border-b border-gray-200 bg-white px-6 py-4">
          <Link href="/workforce/employees" className="mb-4 flex items-center gap-2 text-sm text-emerald-700 hover:text-emerald-800">
            <ArrowLeft className="h-4 w-4" /> Back to Employees
          </Link>
          <div className="flex items-center gap-4">
            <Avatar firstName={employee.firstName} lastName={employee.lastName} size="lg" />
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">{employee.firstName} {employee.lastName}</h1>
              <p className="text-sm text-gray-600">{employee.role}</p>
            </div>
            <div className="ml-auto">
              <Badge variant="success">{employee.status}</Badge>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-6">
          <div className="grid grid-cols-3 gap-6 mb-6">
            <Card>
              <CardContent className="pt-6">
                <p className="text-xs text-gray-600 mb-1">Email</p>
                <p className="text-sm font-medium text-gray-900">{employee.email}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-xs text-gray-600 mb-1">Phone</p>
                <p className="text-sm font-medium text-gray-900">{employee.phone}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-xs text-gray-600 mb-1">Started</p>
                <p className="text-sm font-medium text-gray-900">{employee.startDate}</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader><CardTitle>Project Assignments</CardTitle></CardHeader>
            <CardContent className="p-0">
              <DataTable
                data={ASSIGNMENTS}
                columns={[
                  { key: "project", label: "Project", sortable: true },
                  { key: "role", label: "Role" },
                  { key: "startDate", label: "Start Date" },
                  { key: "endDate", label: "End Date" },
                  { key: "status", label: "Status", render: (val: string) => <Badge variant={val === "Active" ? "success" : "default"}>{val}</Badge> },
                ]}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
