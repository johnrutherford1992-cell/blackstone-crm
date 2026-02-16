"use client";

import React from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { MetricCard } from "@/components/shared/metric-card";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatRelativeTime } from "@/lib/utils";
import {
  ArrowLeft, FileText, Building2, MapPin, Grid3X3, Users2,
  MessageSquare, ChevronRight, Plus, Calendar, DollarSign, Percent,
} from "lucide-react";
import { cn } from "@/lib/utils";

const PROJECT_NAV = [
  { label: "Overview", href: "" },
  { label: "Details", href: "/details" },
  { label: "Drawings", href: "/drawings", badge: "BETA" },
  { label: "Directory", href: "/directory" },
  { label: "Documents", href: "/documents" },
  { label: "Budget", href: "/budget" },
  { label: "Bidding", href: "/bidding" },
  { label: "Financials", href: "/financials" },
  { label: "Activity", href: "/activity" },
];

export default function ProjectOverviewPage() {
  const params = useParams();
  const pathname = usePathname();
  const projectId = params.id;
  const basePath = `/crm/projects/${projectId}`;

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Project Sidebar Navigation */}
      <aside className="w-56 shrink-0 border-r border-gray-200 bg-white">
        <div className="border-b border-gray-200 p-4">
          <Link href="/crm/projects" className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-3">
            <ArrowLeft className="h-4 w-4" /> Back to Projects
          </Link>
          <div className="flex items-center gap-2 mb-1">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-emerald-100 text-emerald-600">
              <Building2 className="h-4 w-4" />
            </div>
            <span className="text-xs font-medium text-gray-500">Commercial</span>
          </div>
          <h3 className="text-sm font-semibold text-gray-900 mt-2">Austin Office Tower</h3>
          <Badge variant="success" className="mt-1">Discovery</Badge>
          <p className="mt-2 text-xs text-gray-500">Turner Construction</p>
          <p className="text-sm font-semibold text-gray-900">{formatCurrency(45000000)}</p>
        </div>
        <nav className="p-2">
          {PROJECT_NAV.map((item) => {
            const href = `${basePath}${item.href}`;
            const isActive = item.href === "" ? pathname === basePath : pathname.startsWith(href);
            return (
              <Link
                key={item.label}
                href={href}
                className={cn(
                  "flex items-center justify-between rounded-md px-3 py-2 text-sm",
                  isActive ? "bg-emerald-50 text-emerald-700 font-medium" : "text-gray-600 hover:bg-gray-50"
                )}
              >
                {item.label}
                {item.badge && <span className="rounded bg-blue-100 px-1.5 py-0.5 text-[10px] font-medium text-blue-700">{item.badge}</span>}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-auto">
        <div className="border-b border-gray-200 bg-white px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Project Overview</h1>
              <p className="text-sm text-gray-500">Created 45 days ago &bull; Last updated 2 days ago</p>
            </div>
            <Button variant="outline" size="sm">View All Details</Button>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Info Cards */}
          <div className="grid grid-cols-4 gap-4">
            <MetricCard label="Contract Type" value="GMP" icon={<FileText className="h-5 w-5" />} />
            <MetricCard label="Market Sector" value="Office" icon={<Building2 className="h-5 w-5" />} />
            <MetricCard label="GSF" value="450,000" icon={<Grid3X3 className="h-5 w-5" />} />
            <MetricCard label="Units" value="—" icon={<MapPin className="h-5 w-5" />} />
          </div>

          {/* Project Status */}
          <Card>
            <CardHeader><CardTitle>Project Status</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-6 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Status</p>
                  <Badge variant="purple">Pursuit</Badge>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Win Probability</p>
                  <p className="text-lg font-semibold">65%</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Stage</p>
                  <p className="text-sm font-medium">Discovery</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Pursuit Duration</p>
                  <p className="text-sm font-medium">45 days</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Stage Age</p>
                  <p className="text-sm font-medium">12 days</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Created</p>
                  <p className="text-sm font-medium">Jan 2, 2024</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Financials */}
          <Card>
            <CardHeader><CardTitle>Financials</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <MetricCard label="Total Contract Value" value={formatCurrency(45000000)} />
                <MetricCard label="Fee" value={`${formatCurrency(2250000)} (5%)`} />
                <MetricCard label="Fee per Month" value={formatCurrency(125000)} />
              </div>
            </CardContent>
          </Card>

          {/* Company Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Company</CardTitle>
                <Button variant="outline" size="sm">View Company</Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="font-medium text-gray-900">Turner Construction</p>
              <Badge variant="success" className="mt-1">Repeat Customer</Badge>
              <div className="mt-3 grid grid-cols-5 gap-2 text-center text-xs">
                <div><p className="font-semibold text-blue-600">2</p><p className="text-gray-500">Pursuits</p></div>
                <div><p className="font-semibold text-red-600">1</p><p className="text-gray-500">Lost</p></div>
                <div><p className="font-semibold text-emerald-600">4</p><p className="text-gray-500">Won</p></div>
                <div><p className="font-semibold text-gray-900">67%</p><p className="text-gray-500">Win Rate</p></div>
                <div><p className="font-semibold text-gray-900">7</p><p className="text-gray-500">Projects</p></div>
              </div>
            </CardContent>
          </Card>

          {/* Construction Team */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Construction Team</CardTitle>
                <Button variant="outline" size="sm">Manage Workforce</Button>
              </div>
            </CardHeader>
            <CardContent>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs font-medium text-gray-500 uppercase">
                    <th className="pb-2">Role</th>
                    <th className="pb-2">Person</th>
                    <th className="pb-2">Date Range</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { role: "Project Manager", person: "John Rutherford", range: "Jan 2024 - Dec 2025" },
                    { role: "Superintendent", person: "Mike Thompson", range: "Mar 2024 - Dec 2025" },
                    { role: "Preconstruction", person: "Emily Park", range: "Jan 2024 - Jun 2024" },
                  ].map((member) => (
                    <tr key={member.role}>
                      <td className="py-2 font-medium text-gray-900">{member.role}</td>
                      <td className="py-2 text-gray-600">{member.person}</td>
                      <td className="py-2 text-gray-500">{member.range}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
