"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Building2, Users, Layers, ClipboardCheck, Code, Upload, Globe, FolderKanban, DollarSign, UserCheck, Sliders, Activity, Plus, Copy, RefreshCw } from "lucide-react";

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

const API_KEYS = [
  { id: "1", name: "Production API Key", key: "sk_live_51234567890abcdef", created: "Jan 15, 2024", lastUsed: "Feb 15, 2024" },
  { id: "2", name: "Development API Key", key: "sk_test_98765432100fedcba", created: "Dec 10, 2023", lastUsed: "Feb 14, 2024" },
];

export default function DeveloperPage() {
  const pathname = usePathname();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (key: string, id: string) => {
    navigator.clipboard.writeText(key);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

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
          <h1 className="text-xl font-semibold text-gray-900">Developer Settings</h1>
        </div>

        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-3xl">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">API Keys</h2>
                <Button><Plus className="mr-1.5 h-4 w-4" /> Generate New Key</Button>
              </div>

              <div className="space-y-4">
                {API_KEYS.map((apiKey) => (
                  <Card key={apiKey.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{apiKey.name}</p>
                          <p className="text-xs text-gray-500 mt-1">Created {apiKey.created}</p>
                        </div>
                        <Badge variant="success">Active</Badge>
                      </div>

                      <div className="mb-4 flex items-center gap-2">
                        <code className="flex-1 rounded bg-gray-100 px-3 py-2 font-mono text-xs text-gray-700">
                          {apiKey.key}
                        </code>
                        <button
                          onClick={() => handleCopy(apiKey.key, apiKey.id)}
                          className="rounded-md border border-gray-300 p-2 text-gray-600 hover:bg-gray-50"
                        >
                          {copiedId === apiKey.id ? "Copied!" : <Copy className="h-4 w-4" />}
                        </button>
                      </div>

                      <p className="mb-3 text-xs text-gray-600">Last used {apiKey.lastUsed}</p>

                      <div className="flex gap-2">
                        <button className="text-xs text-gray-600 hover:text-gray-900">Revoke</button>
                        <button className="text-xs text-gray-600 hover:text-gray-900 flex items-center gap-1">
                          <RefreshCw className="h-3 w-3" /> Regenerate
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <Card>
              <CardHeader><CardTitle>Webhooks</CardTitle></CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">Configure webhooks to receive real-time notifications about events in your account.</p>
                <Button><Plus className="mr-1.5 h-4 w-4" /> Add Webhook</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
