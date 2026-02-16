"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DataTable } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Building2, Users, Layers, ClipboardCheck, Code, Upload, Globe, FolderKanban, DollarSign, UserCheck, Sliders, Activity, Plus, Edit2, Trash2 } from "lucide-react";

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

const WORKFORCE_ROLES = [
  { id: "1", role: "Project Manager", category: "Management", active: true },
  { id: "2", role: "Senior PM", category: "Management", active: true },
  { id: "3", role: "Assistant Project Manager", category: "Management", active: true },
  { id: "4", role: "Superintendent", category: "Field", active: true },
  { id: "5", role: "Foreman", category: "Field", active: true },
  { id: "6", role: "Preconstruction Manager", category: "Preconstruction", active: true },
];

export default function WorkforceSettingsPage() {
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
          <h1 className="text-xl font-semibold text-gray-900">Workforce Settings</h1>
        </div>

        <div className="flex-1 overflow-auto p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Workforce Roles</h2>
            <Button><Plus className="mr-1.5 h-4 w-4" /> Add Role</Button>
          </div>

          <DataTable
            data={WORKFORCE_ROLES}
            columns={[
              { key: "role", label: "Role", sortable: true },
              { key: "category", label: "Category" },
              {
                key: "id",
                label: "Actions",
                render: (val: string) => (
                  <div className="flex gap-2">
                    <button className="p-1 text-gray-400 hover:text-gray-600"><Edit2 className="h-4 w-4" /></button>
                    <button className="p-1 text-gray-400 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
                  </div>
                ),
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
