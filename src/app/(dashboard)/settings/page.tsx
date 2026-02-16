"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Building2, Users, Layers, ClipboardCheck, Code, Upload, Globe, FolderKanban, DollarSign, UserCheck, Sliders, Activity } from "lucide-react";

const SETTINGS_NAV = [
  {
    title: "ACCOUNT",
    items: [
      { label: "Account Details", href: "/settings/account", icon: Building2 },
      { label: "Team Members", href: "/settings/team", icon: Users },
      { label: "Divisions", href: "/settings/divisions", icon: Layers },
      { label: "Go/No-Go", href: "/settings/go-no-go", icon: ClipboardCheck },
      { label: "Developer", href: "/settings/developer", icon: Code },
      { label: "Imports", href: "/settings/imports", icon: Upload },
    ],
  },
  {
    title: "CUSTOMIZATION",
    items: [
      { label: "Directory Settings", href: "/settings/directory-settings", icon: Globe },
      { label: "Project Settings", href: "/settings/project-settings", icon: FolderKanban },
      { label: "Budget Settings", href: "/settings/budget-settings", icon: DollarSign },
      { label: "Workforce Settings", href: "/settings/workforce-settings", icon: UserCheck },
      { label: "Custom Fields", href: "/settings/custom-fields", icon: Sliders },
      { label: "Custom Activities", href: "/settings/custom-activities", icon: Activity },
    ],
  },
];

export default function SettingsPage() {
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
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 rounded-md px-3 py-2 text-sm",
                  pathname === item.href ? "bg-emerald-50 text-emerald-700 font-medium" : "text-gray-600 hover:bg-gray-50"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </div>
        ))}
      </aside>

      <div className="flex flex-1 flex-col overflow-auto p-6">
        <h1 className="mb-6 text-xl font-semibold text-gray-900">Account Details</h1>
        <div className="max-w-2xl space-y-6">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Account Name</label>
            <input className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" defaultValue="Blackstone Construction" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Account Logo</label>
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-emerald-600">
                <span className="text-2xl font-bold text-white">B</span>
              </div>
              <button className="rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50">Upload Logo</button>
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Website</label>
            <input className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" defaultValue="https://blackstoneconstruction.com" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Account Country</label>
              <select className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm">
                <option>United States</option>
                <option>Canada</option>
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Account Time Zone</label>
              <select className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm">
                <option>America/Chicago (CST)</option>
                <option>America/New_York (EST)</option>
                <option>America/Los_Angeles (PST)</option>
              </select>
            </div>
          </div>
          <button className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700">Save Changes</button>
        </div>
      </div>
    </div>
  );
}
