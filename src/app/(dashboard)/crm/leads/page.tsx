"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { Sidebar } from "@/components/layout/sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Inbox, Star, AtSign, Clock, Archive, Users, Plus, MoreHorizontal } from "lucide-react";

const SAMPLE_LEADS = [
  { id: "1", name: "Austin Office Tower", company: "Turner Construction", value: 45000000, lastActivity: "2024-02-15T10:00:00Z", stage: "Discovery" },
  { id: "2", name: "Dell Medical Center Expansion", company: "Seton Healthcare", value: 120000000, lastActivity: "2024-02-14T15:30:00Z", stage: "Bidding" },
  { id: "3", name: "Samsung Fab Retrofit", company: "Samsung Austin", value: 85000000, lastActivity: "2024-02-12T09:00:00Z", stage: "Proposal Sent" },
  { id: "4", name: "Domain Mixed-Use Phase III", company: "Endeavor Real Estate", value: 62000000, lastActivity: "2024-02-10T14:00:00Z", stage: "Discovery" },
  { id: "5", name: "City Hall Renovation", company: "City of Austin", value: 28000000, lastActivity: "2024-02-08T11:00:00Z", stage: "Contract Sent" },
  { id: "6", name: "Tesla Gigafactory Warehouse", company: "Tesla Inc", value: 35000000, lastActivity: "2024-02-06T16:00:00Z", stage: "Discovery" },
  { id: "7", name: "UT Stadium Expansion", company: "University of Texas", value: 200000000, lastActivity: "2024-02-05T13:00:00Z", stage: "Bidding" },
  { id: "8", name: "Whole Foods HQ Remodel", company: "Whole Foods Market", value: 15000000, lastActivity: "2024-02-03T10:00:00Z", stage: "Proposal Sent" },
];

const STAGE_VARIANTS: Record<string, "success" | "info" | "purple" | "warning"> = {
  Discovery: "success",
  Bidding: "info",
  "Proposal Sent": "purple",
  "Contract Sent": "warning",
};

export default function LeadsPage() {
  const columns = [
    {
      key: "name",
      label: "Name",
      sortable: true,
      href: (row: any) => `/crm/leads/${row.id}`,
      render: (val: string, row: any) => (
        <div>
          <div className="font-medium">{val}</div>
          <div className="text-xs text-gray-500">{row.company}</div>
        </div>
      ),
    },
    {
      key: "value",
      label: "Value",
      sortable: true,
      render: (val: number) => formatCurrency(val),
    },
    {
      key: "lastActivity",
      label: "Last Activity",
      sortable: true,
      render: (val: string) => formatDate(val),
    },
    {
      key: "stage",
      label: "Stage",
      render: (val: string) => (
        <Badge variant={STAGE_VARIANTS[val] || "default"}>{val}</Badge>
      ),
    },
  ];

  return (
    <div className="flex flex-1 overflow-hidden">
      <Sidebar
        items={[
          { label: "My Inbox", icon: <Inbox className="h-4 w-4" />, count: 5, href: "/crm/leads" },
          { label: "Priority", icon: <Star className="h-4 w-4" />, href: "/crm/leads" },
          { label: "Mentioned", icon: <AtSign className="h-4 w-4" />, href: "/crm/leads" },
          { label: "Unassigned", icon: <Users className="h-4 w-4" />, href: "/crm/leads" },
          { label: "Snoozed", icon: <Clock className="h-4 w-4" />, href: "/crm/leads" },
          { label: "Archived", icon: <Archive className="h-4 w-4" />, count: 12, href: "/crm/leads" },
          { label: "All", count: 48, href: "/crm/leads" },
        ]}
      />
      <div className="flex flex-1 flex-col overflow-hidden">
        <PageHeader
          title="Leads"
          actions={
            <div className="flex items-center gap-2">
              <Button>
                <Plus className="mr-1.5 h-4 w-4" /> New Lead
              </Button>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          }
        />
        <div className="flex-1 overflow-auto">
          <DataTable data={SAMPLE_LEADS} columns={columns} totalCount={48} />
        </div>
      </div>
    </div>
  );
}
