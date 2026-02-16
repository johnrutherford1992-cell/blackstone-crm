"use client";

import React from "react";
import { PageHeader } from "@/components/shared/page-header";
import { ActivityFeed } from "@/components/shared/activity-feed";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Linkedin, Copy, Plus } from "lucide-react";

const SAMPLE_ACTIVITIES = [
  {
    id: "1",
    user: { firstName: "John", lastName: "Rutherford" },
    type: "email",
    content: "Sent proposal follow-up email regarding the downtown office project.",
    createdAt: "2024-02-10T09:15:00Z",
  },
  {
    id: "2",
    user: { firstName: "Sarah", lastName: "Mitchell" },
    type: "meeting",
    content: "Discussed project timeline and budget for Q2 kick-off.",
    createdAt: "2024-02-08T14:00:00Z",
  },
];

export default function ContactDetailPage() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <PageHeader
        title="Sarah Mitchell"
        breadcrumbs={[
          { label: "Contacts", href: "/crm/contacts" },
          { label: "Sarah Mitchell" },
        ]}
      />

      <div className="flex flex-1 overflow-auto">
        {/* Left Column */}
        <div className="w-80 shrink-0 border-r border-gray-200 p-6">
          <div className="mb-6 text-center">
            <Avatar firstName="Sarah" lastName="Mitchell" size="lg" className="mx-auto mb-3 !h-16 !w-16 !text-xl" />
            <h2 className="text-lg font-semibold text-gray-900">Sarah Mitchell</h2>
            <p className="text-sm text-gray-500">VP of Operations at Turner Construction</p>
          </div>

          <dl className="space-y-3">
            <div>
              <dt className="text-xs font-medium text-gray-500">Email</dt>
              <dd className="flex items-center gap-1.5 text-sm text-gray-900">
                sarah@turnerconstruction.com
                <button className="text-gray-400 hover:text-gray-600"><Copy className="h-3 w-3" /></button>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-gray-500">Mobile Phone</dt>
              <dd className="text-sm text-gray-900">(512) 555-0456</dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-gray-500">Office Phone</dt>
              <dd className="text-sm text-gray-900">(512) 555-0100</dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-gray-500">LinkedIn</dt>
              <dd className="text-sm text-emerald-600">linkedin.com/in/sarahmitchell</dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-gray-500">Assigned To</dt>
              <dd className="text-sm text-gray-900">John Rutherford</dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-gray-500">Contact Role</dt>
              <dd className="text-sm text-gray-900">Decision Maker</dd>
            </div>
          </dl>
        </div>

        {/* Right Column */}
        <div className="flex-1 p-6">
          <Card className="mb-6">
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

          <h3 className="mb-4 text-sm font-semibold text-gray-900">Activity</h3>
          <ActivityFeed activities={SAMPLE_ACTIVITIES} />
        </div>
      </div>
    </div>
  );
}
