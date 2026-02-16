"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DataTable } from "@/components/shared/data-table";
import { Tabs } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Building2, Users, Layers, ClipboardCheck, Code, Upload, Globe, FolderKanban, DollarSign, UserCheck, Sliders, Activity, Plus } from "lucide-react";

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

const TEAM = [
  { id: "1", firstName: "John", lastName: "Rutherford", email: "john@blackstone.com", role: "Admin", lastLogin: "Feb 16, 2024" },
  { id: "2", firstName: "Sarah", lastName: "Mitchell", email: "sarah@blackstone.com", role: "Admin", lastLogin: "Feb 15, 2024" },
  { id: "3", firstName: "David", lastName: "Chen", email: "dchen@blackstone.com", role: "Limited", lastLogin: "Feb 14, 2024" },
  { id: "4", firstName: "Emily", lastName: "Park", email: "epark@blackstone.com", role: "Limited", lastLogin: "Feb 12, 2024" },
  { id: "5", firstName: "Mike", lastName: "Thompson", email: "mthompson@blackstone.com", role: "Limited", lastLogin: "Feb 10, 2024" },
  { id: "6", firstName: "James", lastName: "Wilson", email: "jwilson@blackstone.com", role: "Limited", lastLogin: "Feb 8, 2024" },
];

export default function TeamSettingsPage() {
  const pathname = usePathname();

  const columns = [
    {
      key: "firstName",
      label: "Name",
      render: (_: any, row: any) => (
        <div className="flex items-center gap-2">
          <Avatar firstName={row.firstName} lastName={row.lastName} size="sm" />
          <div>
            <p className="text-sm font-medium text-gray-900">{row.firstName} {row.lastName}</p>
            <p className="text-xs text-gray-500">{row.email}</p>
          </div>
        </div>
      ),
    },
    { key: "role", label: "Permissions", render: (val: string) => <Badge variant={val === "Admin" ? "info" : "default"}>{val}</Badge> },
    { key: "lastLogin", label: "Last Login" },
  ];

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
        <div className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
          <h1 className="text-xl font-semibold text-gray-900">Team Members</h1>
          <Button><Plus className="mr-1.5 h-4 w-4" /> Add Team Member</Button>
        </div>
        <Tabs tabs={[{ label: "Users", value: "users" }, { label: "Deactivated Users", value: "deactivated" }]} activeTab="users" onChange={() => {}} className="px-6" />
        <div className="flex-1 overflow-auto">
          <DataTable data={TEAM} columns={columns} totalCount={6} />
        </div>
      </div>
    </div>
  );
}
