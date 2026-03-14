"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { FilterBar } from "@/components/shared/filter-bar";
import { ViewsSidebar } from "@/components/shared/views-sidebar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ContactForm } from "@/components/forms/contact-form";

const PERSONAL_VIEWS = [{ id: "my-view", name: "My View", count: 28 }];
const SHARED_VIEWS = [
  { id: "architects", name: "Architects", count: 12 },
  { id: "johns-leads", name: "John's Leads", count: 34 },
  { id: "owners", name: "Owners", count: 18 },
];

interface ContactRow {
  id: string;
  name: string;
  email: string;
  company: string;
  title: string;
}

interface ContactsClientProps {
  contacts: ContactRow[];
  totalCount: number;
  companyOptions: { value: string; label: string }[];
}

export function ContactsClient({ contacts, totalCount, companyOptions }: ContactsClientProps) {
  const [activeView, setActiveView] = useState("my-view");
  const [showCreateForm, setShowCreateForm] = useState(false);

  const columns = [
    {
      key: "name",
      label: "Name",
      sortable: true,
      href: (row: ContactRow) => `/crm/contacts/${row.id}`,
    },
    { key: "email", label: "Email", sortable: true },
    { key: "company", label: "Company" },
    { key: "title", label: "Title" },
  ];

  return (
    <div className="flex flex-1 overflow-hidden">
      <ViewsSidebar
        personalViews={PERSONAL_VIEWS}
        sharedViews={SHARED_VIEWS}
        activeViewId={activeView}
        onViewChange={setActiveView}
      />
      <div className="flex flex-1 flex-col overflow-hidden">
        <PageHeader
          title="Contacts"
          actions={
            <Button onClick={() => setShowCreateForm(true)}>
              <Plus className="mr-1.5 h-4 w-4" />
              Add Contact
            </Button>
          }
        />
        <FilterBar viewName="My View" />
        <div className="flex-1 overflow-auto">
          <DataTable data={contacts} columns={columns} totalCount={totalCount} />
        </div>
      </div>

      <ContactForm
        open={showCreateForm}
        onClose={() => setShowCreateForm(false)}
        companies={companyOptions}
      />
    </div>
  );
}
