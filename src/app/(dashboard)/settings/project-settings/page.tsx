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

const STAGES = [
  { id: "1", name: "Prospect", order: 1, color: "#9CA3AF" },
  { id: "2", name: "Pursuit", order: 2, color: "#8B5CF6" },
  { id: "3", name: "Bidding", order: 3, color: "#3B82F6" },
  { id: "4", name: "Contract Sent", order: 4, color: "#F59E0B" },
  { id: "5", name: "Contract Signed", order: 5, color: "#10B981" },
  { id: "6", name: "In Progress", order: 6, color: "#06B6D4" },
];

const LOSS_REASONS = [
  { id: "1", reason: "Price", frequency: 12 },
  { id: "2", reason: "Schedule", frequency: 5 },
  { id: "3", reason: "Scope", frequency: 3 },
  { id: "4", reason: "Competitor Selection", frequency: 8 },
];

export default function ProjectSettingsPage() {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState("stages");

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
          <h1 className="text-xl font-semibold text-gray-900">Project Settings</h1>
        </div>

        <Tabs
          tabs={[
            { label: "Stages", value: "stages" },
            { label: "Loss Reasons", value: "loss-reasons" },
          ]}
          activeTab={activeTab}
          onChange={setActiveTab}
          className="px-6"
        />

        <div className="flex-1 overflow-auto p-6">
          {activeTab === "stages" && (
            <div>
              <div className="mb-6">
                <Button><Plus className="mr-1.5 h-4 w-4" /> Add Stage</Button>
              </div>
              <DataTable
                data={STAGES}
                columns={[
                  { key: "name", label: "Stage", sortable: true },
                  { key: "order", label: "Order" },
                  { key: "color", label: "Color", render: (val: string) => <div className="h-4 w-4 rounded" style={{ backgroundColor: val }}></div> },
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

          {activeTab === "loss-reasons" && (
            <div>
              <div className="mb-6">
                <Button><Plus className="mr-1.5 h-4 w-4" /> Add Loss Reason</Button>
              </div>
              <DataTable
                data={LOSS_REASONS}
                columns={[
                  { key: "reason", label: "Loss Reason", sortable: true },
                  { key: "frequency", label: "Times Used" },
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
