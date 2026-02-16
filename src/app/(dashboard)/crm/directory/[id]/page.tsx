"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { ActivityFeed } from "@/components/shared/activity-feed";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, Phone, Globe, MapPin, Edit, MoreHorizontal, Plus } from "lucide-react";

const DETAIL_TABS = [
  { label: "Overview", value: "overview" },
  { label: "Contacts", value: "contacts", count: 5 },
  { label: "Leads", value: "leads", count: 3 },
  { label: "Projects", value: "projects", count: 8 },
];

const SAMPLE_ACTIVITIES = [
  {
    id: "1",
    user: { firstName: "John", lastName: "Rutherford" },
    type: "system",
    content: "created the company on Mar 6, 2023",
    createdAt: "2023-03-06T10:00:00Z",
  },
  {
    id: "2",
    user: { firstName: "John", lastName: "Rutherford" },
    type: "note",
    content: "Met with the project team to discuss upcoming Q3 opportunities. They are looking at a new office build in downtown Austin.",
    createdAt: "2024-01-15T14:30:00Z",
  },
];

export default function CompanyDetailPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <PageHeader
        title="Turner Construction"
        breadcrumbs={[
          { label: "Directory", href: "/crm/directory" },
          { label: "Turner Construction" },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Edit className="mr-1.5 h-3.5 w-3.5" /> Edit
            </Button>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        }
      />
      <Tabs tabs={DETAIL_TABS} activeTab={activeTab} onChange={setActiveTab} className="px-6" />

      <div className="flex flex-1 overflow-auto">
        {/* Left - Company Details */}
        <div className="w-80 shrink-0 border-r border-gray-200 p-6">
          <Card>
            <CardHeader>
              <CardTitle>Company Details</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-3">
                <div>
                  <dt className="text-xs font-medium text-gray-500">Phone</dt>
                  <dd className="text-sm text-gray-900">(512) 555-0123</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-gray-500">Address</dt>
                  <dd className="text-sm text-gray-900">1234 Construction Ave, Austin, TX 78701</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-gray-500">Website</dt>
                  <dd className="text-sm text-emerald-600">turnerconstruction.com</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-gray-500">Industries</dt>
                  <dd><Badge variant="default">Construction</Badge></dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-gray-500">Category</dt>
                  <dd><Badge variant="info">Client</Badge></dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-gray-500">Assigned To</dt>
                  <dd className="text-sm text-gray-900">John Rutherford</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </div>

        {/* Right - Activity */}
        <div className="flex-1 p-6">
          <div className="mb-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Open Tasks</CardTitle>
                  <Button size="sm" variant="outline">
                    <Plus className="mr-1 h-3 w-3" /> New Task
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">No open tasks</p>
              </CardContent>
            </Card>
          </div>

          <h3 className="mb-4 text-sm font-semibold text-gray-900">Activity</h3>
          <ActivityFeed activities={SAMPLE_ACTIVITIES} />
        </div>
      </div>
    </div>
  );
}
