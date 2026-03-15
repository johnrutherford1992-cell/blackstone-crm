"use client";

import React from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { MetricCard } from "@/components/shared/metric-card";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { ArrowLeft, FileText, Building2, MapPin, Grid3X3 } from "lucide-react";
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

interface ProjectOverviewClientProps {
  project: any;
}

export function ProjectOverviewClient({ project }: ProjectOverviewClientProps) {
  const params = useParams();
  const pathname = usePathname();
  const basePath = `/crm/projects/${params.id}`;

  const contractValue = project.contractValue ? Number(project.contractValue) : 0;
  const feeAmount = project.feeAmount ? Number(project.feeAmount) : 0;
  const feePercent = project.feePercent || 0;
  const profit = project.profit ? Number(project.profit) : 0;
  const primaryCompany = project.companies?.[0]?.company;

  return (
    <div className="flex flex-1 overflow-hidden">
      <aside className="w-56 shrink-0 border-r border-gray-200 bg-white">
        <div className="border-b border-gray-200 p-4">
          <Link href="/crm/projects" className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-3">
            <ArrowLeft className="h-4 w-4" /> Back to Projects
          </Link>
          <div className="flex items-center gap-2 mb-1">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-emerald-100 text-emerald-600">
              <Building2 className="h-4 w-4" />
            </div>
            <span className="text-xs font-medium text-gray-500">{project.division?.name || "—"}</span>
          </div>
          <h3 className="text-sm font-semibold text-gray-900 mt-2">{project.name}</h3>
          <Badge variant="success" className="mt-1">{project.stage?.name || "—"}</Badge>
          {primaryCompany && <p className="mt-2 text-xs text-gray-500">{primaryCompany.name}</p>}
          <p className="text-sm font-semibold text-gray-900">{contractValue ? formatCurrency(contractValue) : "—"}</p>
        </div>
        <nav className="p-2">
          {PROJECT_NAV.map((item) => {
            const href = `${basePath}${item.href}`;
            const isActive = item.href === "" ? pathname === basePath : pathname.startsWith(href);
            return (
              <Link key={item.label} href={href} className={cn("flex items-center justify-between rounded-md px-3 py-2 text-sm", isActive ? "bg-emerald-50 text-emerald-700 font-medium" : "text-gray-600 hover:bg-gray-50")}>
                {item.label}
                {item.badge && <span className="rounded bg-blue-100 px-1.5 py-0.5 text-[10px] font-medium text-blue-700">{item.badge}</span>}
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="flex flex-1 flex-col overflow-auto">
        <div className="border-b border-gray-200 bg-white px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Project Overview</h1>
              <p className="text-sm text-gray-500">Created {new Date(project.createdAt).toLocaleDateString()}</p>
            </div>
            <Link href={`${basePath}/details`}>
              <Button variant="outline" size="sm">View All Details</Button>
            </Link>
          </div>
        </div>

        <div className="p-6 space-y-8">
          <div className="grid grid-cols-4 gap-4">
            <MetricCard label="Contract Type" value={project.contractType?.name || "—"} icon={<FileText className="h-5 w-5" />} />
            <MetricCard label="Market Sector" value={project.marketSector?.name || "—"} icon={<Building2 className="h-5 w-5" />} />
            <MetricCard label="GSF" value={project.gsf ? project.gsf.toLocaleString() : "—"} icon={<Grid3X3 className="h-5 w-5" />} />
            <MetricCard label="Units" value={project.units ? String(project.units) : "—"} icon={<MapPin className="h-5 w-5" />} />
          </div>

          <Card>
            <CardHeader><CardTitle>Project Status</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-6 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Stage</p>
                  <Badge variant="purple">{project.stage?.name || "—"}</Badge>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Win Probability</p>
                  <p className="text-lg font-semibold">{project.winProbability ? `${project.winProbability}%` : "—"}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Pursuit Duration</p>
                  <p className="text-sm font-medium">{project.pursuitDuration ? `${project.pursuitDuration} days` : "—"}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Stage Age</p>
                  <p className="text-sm font-medium">{project.stageAge ? `${project.stageAge} days` : "—"}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Assigned To</p>
                  <p className="text-sm font-medium">{project.assignedTo ? `${project.assignedTo.firstName} ${project.assignedTo.lastName}` : "—"}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Created</p>
                  <p className="text-sm font-medium">{new Date(project.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Financials</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <MetricCard label="Total Contract Value" value={contractValue ? formatCurrency(contractValue) : "—"} />
                <MetricCard label="Fee" value={feeAmount ? `${formatCurrency(feeAmount)} (${feePercent}%)` : "—"} />
                <MetricCard label="Profit" value={profit ? formatCurrency(profit) : "—"} />
              </div>
            </CardContent>
          </Card>

          {primaryCompany && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Company</CardTitle>
                  <Link href={`/crm/directory/${primaryCompany.id}`}>
                    <Button variant="outline" size="sm">View Company</Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <p className="font-medium text-gray-900">{primaryCompany.name}</p>
                <Badge variant="success" className="mt-1">{primaryCompany.category || "Client"}</Badge>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Construction Team</CardTitle>
                <Link href={`${basePath}/directory`}>
                  <Button variant="outline" size="sm">Manage Workforce</Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              {project.workforce?.length > 0 ? (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs font-medium text-gray-500 uppercase">
                      <th className="pb-2">Role</th>
                      <th className="pb-2">Person</th>
                      <th className="pb-2">Date Range</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {project.workforce.map((w: any) => (
                      <tr key={w.id}>
                        <td className="py-2 font-medium text-gray-900">{w.role?.name || "—"}</td>
                        <td className="py-2 text-gray-600">{w.employee ? `${w.employee.firstName} ${w.employee.lastName}` : "—"}</td>
                        <td className="py-2 text-gray-500">{new Date(w.startDate).toLocaleDateString()} - {w.endDate ? new Date(w.endDate).toLocaleDateString() : "Present"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-sm text-gray-500">No team assigned yet</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
