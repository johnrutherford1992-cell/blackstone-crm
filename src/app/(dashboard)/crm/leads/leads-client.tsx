"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { Sidebar } from "@/components/layout/sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Inbox, Star, AtSign, Clock, Archive, Users, Plus, MoreHorizontal } from "lucide-react";
import { LeadForm } from "@/components/forms/lead-form";

const STAGE_VARIANTS: Record<string, "success" | "info" | "purple" | "warning"> = {
  Discovery: "success",
  Bidding: "info",
  "Proposal Sent": "purple",
  "Contract Sent": "warning",
};

interface LeadRow {
  id: string;
  name: string;
  company: string;
  value: number;
  lastActivity: string;
  stage: string;
}

interface LeadsClientProps {
  leads: LeadRow[];
  totalCount: number;
  companyOptions: { value: string; label: string }[];
  divisionOptions: { value: string; label: string }[];
}

export function LeadsClient({ leads, totalCount, companyOptions, divisionOptions }: LeadsClientProps) {
  const [showCreateForm, setShowCreateForm] = useState(false);

  const columns = [
    {
      key: "name",
      label: "Name",
      sortable: true,
      href: (row: LeadRow) => `/crm/leads/${row.id}`,
      render: (val: string, row: LeadRow) => (
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
      render: (val: string) => val ? formatDate(val) : "—",
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
          { label: "My Inbox", icon: <Inbox className="h-4 w-4" />, count: leads.length, href: "/crm/leads" },
          { label: "Priority", icon: <Star className="h-4 w-4" />, href: "/crm/leads" },
          { label: "Mentioned", icon: <AtSign className="h-4 w-4" />, href: "/crm/leads" },
          { label: "Unassigned", icon: <Users className="h-4 w-4" />, href: "/crm/leads" },
          { label: "Snoozed", icon: <Clock className="h-4 w-4" />, href: "/crm/leads" },
          { label: "Archived", icon: <Archive className="h-4 w-4" />, href: "/crm/leads" },
          { label: "All", count: totalCount, href: "/crm/leads" },
        ]}
      />
      <div className="flex flex-1 flex-col overflow-hidden">
        <PageHeader
          title="Leads"
          actions={
            <div className="flex items-center gap-2">
              <Button onClick={() => setShowCreateForm(true)}>
                <Plus className="mr-1.5 h-4 w-4" /> New Lead
              </Button>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          }
        />
        <div className="flex-1 overflow-auto">
          <DataTable data={leads} columns={columns} totalCount={totalCount} />
        </div>
      </div>

      <LeadForm
        open={showCreateForm}
        onClose={() => setShowCreateForm(false)}
        companies={companyOptions}
        divisions={divisionOptions}
      />
    </div>
  );
}
