"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { FilterBar } from "@/components/shared/filter-bar";
import { ViewsSidebar } from "@/components/shared/views-sidebar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const PERSONAL_VIEWS = [{ id: "my-view", name: "My View", count: 28 }];
const SHARED_VIEWS = [
  { id: "architects", name: "Architects", count: 12 },
  { id: "johns-leads", name: "John's Leads", count: 34 },
  { id: "owners", name: "Owners", count: 18 },
];

const SAMPLE_CONTACTS = [
  { id: "1", name: "Sarah Mitchell", email: "sarah@turnerconstruction.com", company: "Turner Construction", title: "VP of Operations" },
  { id: "2", name: "David Chen", email: "dchen@gensler.com", company: "Gensler", title: "Principal Architect" },
  { id: "3", name: "Maria Rodriguez", email: "mrodriguez@cityofaustin.gov", company: "City of Austin", title: "Project Manager" },
  { id: "4", name: "James Wilson", email: "jwilson@henselphelps.com", company: "Hensel Phelps", title: "Senior Estimator" },
  { id: "5", name: "Emily Park", email: "epark@skanska.com", company: "Skanska USA", title: "Director of Preconstruction" },
  { id: "6", name: "Michael Brown", email: "mbrown@dpr.com", company: "DPR Construction", title: "Project Executive" },
  { id: "7", name: "Lisa Thompson", email: "lthompson@hok.com", company: "HOK", title: "Design Director" },
  { id: "8", name: "Robert Garcia", email: "rgarcia@walterpmoore.com", company: "Walter P Moore", title: "Structural Engineer" },
];

export default function ContactsPage() {
  const [activeView, setActiveView] = useState("my-view");

  const columns = [
    {
      key: "name",
      label: "Name",
      sortable: true,
      href: (row: any) => `/crm/contacts/${row.id}`,
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
            <Button>
              <Plus className="mr-1.5 h-4 w-4" />
              Add Contact
            </Button>
          }
        />
        <FilterBar viewName="My View" />
        <div className="flex-1 overflow-auto">
          <DataTable data={SAMPLE_CONTACTS} columns={columns} totalCount={113} />
        </div>
      </div>
    </div>
  );
}
