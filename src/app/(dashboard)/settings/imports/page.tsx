"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Building2, Users, Layers, ClipboardCheck, Code, Upload, Globe, FolderKanban, DollarSign, UserCheck, Sliders, Activity, Plus, Check, AlertCircle } from "lucide-react";

const SETTINGS_NAV = [
  { title: "ACCOUNT", items: [
    { label: "Account Details", href: "/settings/account", icon: Building2 },
    { label: "Team Members", href: "/settings/team", icon: Users },
    { label: "Divisions", href: "/settings/divisions", icon: Layers },
    { label: "Go/No-Go", href: "/settings/go-no-go", icon: ClipboardCheck },
    { label: "Developer", href: "/settings/developer", icon: Code },
    { label: "Imports", href: "/settings/imports", icon: Upload },
  ]},
  { title: "CUSTOMIZATION", items: [
    { label: "Directory Settings", href: "/settings/directory-settings", icon: Globe },
    { label: "Project Settings", href: "/settings/project-settings", icon: FolderKanban },
    { label: "Budget Settings", href: "/settings/budget-settings", icon: DollarSign },
    { label: "Workforce Settings", href: "/settings/workforce-settings", icon: UserCheck },
    { label: "Custom Fields", href: "/settings/custom-fields", icon: Sliders },
    { label: "Custom Activities", href: "/settings/custom-activities", icon: Activity },
  ]},
];

const IMPORTS = [
  { id: "1", type: "Projects", file: "projects_2024.csv", status: "completed", date: "Feb 15, 2024", records: 12 },
  { id: "2", type: "Employees", file: "team_roster.csv", status: "completed", date: "Feb 10, 2024", records: 18 },
  { id: "3", type: "Budget Codes", file: "cost_codes.xlsx", status: "completed", date: "Jan 28, 2024", records: 95 },
  { id: "4", type: "Divisions", file: "divisions_update.csv", status: "failed", date: "Jan 20, 2024", records: 3, error: "Duplicate division names found" },
];

export default function ImportsPage() {
  const pathname = usePathname();

  return (
    <div className="flex flex-1 overflow-hidden">
      <aside className="w-60 shrink-0 border-r border-gray-200 bg-white overflow-y-auto">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Settings</h2>
        </div>
        {SETTINGS_NAV.map((section) => (
          <div key={section.title} className="p-2">
            <p className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gray-400">{section.title}</p>
            {section.items.map((item) => (
              <Link key={item.href} href={item.href} className={cn("flex items-center gap-2 rounded-md px-3 py-2 text-sm", pathname === item.href ? "bg-emerald-50 text-emerald-700 font-medium" : "text-gray-600 hover:bg-gray-50")}>
                <item.icon className="h-4 w-4" /> {item.label}
              </Link>
            ))}
          </div>
        ))}
      </aside>

      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="border-b border-gray-200 bg-white px-6 py-4">
          <h1 className="text-xl font-semibold text-gray-900">Import History</h1>
        </div>

        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-4xl">
            <div className="mb-6">
              <Button><Plus className="mr-1.5 h-4 w-4" /> New Import</Button>
            </div>

            <div className="space-y-4">
              {IMPORTS.map((imp) => (
                <Card key={imp.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-sm font-medium text-gray-900">{imp.type}</h3>
                          <Badge variant={imp.status === "completed" ? "success" : "warning"}>
                            {imp.status === "completed" ? "Completed" : "Failed"}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-500 mb-1">{imp.file}</p>
                        <p className="text-xs text-gray-600">{imp.records} records imported • {imp.date}</p>
                        {imp.error && (
                          <div className="mt-2 flex items-start gap-2 text-xs text-red-600">
                            <AlertCircle className="h-3 w-3 mt-0.5 flex-shrink-0" />
                            {imp.error}
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button className="rounded-md border border-gray-300 px-2 py-1 text-xs text-gray-600 hover:bg-gray-50">
                          Details
                        </button>
                        {imp.status === "failed" && (
                          <button className="rounded-md border border-gray-300 px-2 py-1 text-xs text-gray-600 hover:bg-gray-50">
                            Retry
                          </button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
