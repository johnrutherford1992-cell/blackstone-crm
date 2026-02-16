"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tabs } from "@/components/ui/tabs";
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

const COST_CODES = [
  { id: "1", code: "100-100", description: "General Labor", division: "Commercial", active: true },
  { id: "2", code: "100-200", description: "Skilled Trades", division: "Commercial", active: true },
  { id: "3", code: "100-300", description: "Equipment Rental", division: "Commercial", active: true },
  { id: "4", code: "100-400", description: "Materials", division: "Commercial", active: true },
];

const BUDGET_TYPES = [
  { id: "1", name: "Estimated", category: "Planning", active: true },
  { id: "2", name: "Committed", category: "Tracking", active: true },
  { id: "3", name: "Actual", category: "Tracking", active: true },
];

export default function BudgetSettingsPage() {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState("cost-codes");

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
          <h1 className="text-xl font-semibold text-gray-900">Budget Settings</h1>
        </div>

        <Tabs
          tabs={[
            { label: "Cost Codes", value: "cost-codes" },
            { label: "Budget Types", value: "budget-types" },
          ]}
          activeTab={activeTab}
          onChange={setActiveTab}
          className="px-6"
        />

        <div className="flex-1 overflow-auto p-6">
          {activeTab === "cost-codes" && (
            <div>
              <div className="mb-6">
                <Button><Plus className="mr-1.5 h-4 w-4" /> Add Cost Code</Button>
              </div>
              <DataTable
                data={COST_CODES}
                columns={[
                  { key: "code", label: "Code", sortable: true },
                  { key: "description", label: "Description" },
                  { key: "division", label: "Division" },
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
          )}

          {activeTab === "budget-types" && (
            <div>
              <div className="mb-6">
                <Button><Plus className="mr-1.5 h-4 w-4" /> Add Budget Type</Button>
              </div>
              <DataTable
                data={BUDGET_TYPES}
                columns={[
                  { key: "name", label: "Type", sortable: true },
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
          )}
        </div>
      </div>
    </div>
  );
}
