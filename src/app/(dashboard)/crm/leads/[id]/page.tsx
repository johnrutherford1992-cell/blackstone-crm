"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ActivityFeed } from "@/components/shared/activity-feed";
import { formatCurrency } from "@/lib/utils";
import { Clock, Archive, Flag, Edit, FolderPlus, Building2 } from "lucide-react";

const TABS = [
  { label: "Details", value: "details" },
  { label: "Go/No Go", value: "gng" },
  { label: "Tasks", value: "tasks", count: 2 },
  { label: "Attachments", value: "attachments", count: 0 },
  { label: "Comments", value: "comments", count: 3 },
];

export default function LeadDetailPage() {
  const [activeTab, setActiveTab] = useState("details");

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <PageHeader
        title="Austin Office Tower"
        breadcrumbs={[
          { label: "Leads", href: "/crm/leads" },
          { label: "Austin Office Tower" },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm"><Clock className="mr-1.5 h-3.5 w-3.5" /> Snooze</Button>
            <Button variant="outline" size="sm"><Archive className="mr-1.5 h-3.5 w-3.5" /> Archive</Button>
            <Button variant="outline" size="sm"><Flag className="mr-1.5 h-3.5 w-3.5" /></Button>
            <div className="w-px h-6 bg-gray-200" />
            <Button variant="outline" size="sm"><Edit className="mr-1.5 h-3.5 w-3.5" /> Edit</Button>
            <Button size="sm"><FolderPlus className="mr-1.5 h-3.5 w-3.5" /> Create Project</Button>
          </div>
        }
      />

      <div className="flex items-center gap-3 border-b border-gray-200 bg-white px-6 py-3">
        <Badge variant="success">Open</Badge>
        <span className="text-sm text-gray-500">Updated 2 days ago</span>
      </div>

      {/* Key Metrics Row */}
      <div className="grid grid-cols-4 gap-4 border-b border-gray-200 bg-white px-6 py-4">
        <div>
          <p className="text-xs font-medium text-gray-500">Value</p>
          <p className="text-lg font-semibold text-gray-900">{formatCurrency(45000000)}</p>
        </div>
        <div>
          <p className="text-xs font-medium text-gray-500">Estimated Start</p>
          <p className="text-lg font-semibold text-gray-900">Sep 2025</p>
        </div>
        <div>
          <p className="text-xs font-medium text-gray-500">Assigned To</p>
          <p className="text-lg font-semibold text-gray-900">John Rutherford</p>
        </div>
        <div>
          <p className="text-xs font-medium text-gray-500">Go/No Go</p>
          <p className="text-sm text-emerald-600 font-medium cursor-pointer hover:underline">Complete Go/No Go Survey</p>
        </div>
      </div>

      <Tabs tabs={TABS} activeTab={activeTab} onChange={setActiveTab} className="px-6" />

      <div className="flex-1 overflow-auto p-6">
        {activeTab === "details" && (
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="mb-4 text-sm font-semibold text-gray-900">Project Information</h3>
              <dl className="grid grid-cols-2 gap-x-6 gap-y-3">
                {[
                  ["Division", "Commercial"],
                  ["Lead Source", "Referral"],
                  ["Construction Duration", "18 months"],
                  ["Address", "300 Congress Ave, Austin, TX"],
                  ["Market Sector", "Office"],
                  ["Tender Type", "Invited"],
                  ["Delivery Method", "CM at Risk"],
                  ["Contract Type", "GMP"],
                  ["GSF", "450,000"],
                  ["Units", "—"],
                ].map(([label, value]) => (
                  <div key={label}>
                    <dt className="text-xs font-medium text-gray-500">{label}</dt>
                    <dd className="text-sm text-gray-900">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div>
              <Card>
                <CardHeader><CardTitle className="flex items-center gap-2"><Building2 className="h-4 w-4" /> Company</CardTitle></CardHeader>
                <CardContent>
                  <p className="font-medium text-gray-900">Turner Construction</p>
                  <Badge variant="info" className="mt-1">Client</Badge>
                  <div className="mt-3 flex items-center gap-4">
                    <Badge variant="default">New Customer</Badge>
                  </div>
                  <div className="mt-3 grid grid-cols-4 gap-2 text-center text-xs">
                    <div><p className="font-semibold text-emerald-600">3</p><p className="text-gray-500">Leads</p></div>
                    <div><p className="font-semibold text-blue-600">2</p><p className="text-gray-500">Pursuits</p></div>
                    <div><p className="font-semibold text-red-600">1</p><p className="text-gray-500">Lost</p></div>
                    <div><p className="font-semibold text-emerald-600">4</p><p className="text-gray-500">Won</p></div>
                  </div>
                  <div className="mt-2 text-center">
                    <p className="text-xs text-gray-500">Win Rate: <span className="font-semibold text-gray-900">67%</span></p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === "comments" && (
          <ActivityFeed
            activities={[
              { id: "1", user: { firstName: "John", lastName: "Rutherford" }, type: "note", content: "Initial discussion with Turner. They're excited about this project and want to move quickly.", createdAt: "2024-02-15T10:00:00Z" },
              { id: "2", user: { firstName: "John", lastName: "Rutherford" }, type: "note", content: "Follow-up call scheduled for next week to discuss budget parameters.", createdAt: "2024-02-12T14:00:00Z" },
            ]}
          />
        )}
      </div>
    </div>
  );
}
