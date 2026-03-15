"use client";

import React, { useState } from "react";
import { SettingsLayout } from "@/components/settings/settings-layout";
import { SettingsCrudList } from "@/components/settings/settings-crud-list";
import { Tabs } from "@/components/ui/tabs";

export default function BudgetSettingsPage() {
  const [activeTab, setActiveTab] = useState("cost-codes");

  return (
    <SettingsLayout title="Budget Settings">
      <Tabs
        tabs={[
          { label: "Cost Codes", value: "cost-codes" },
          { label: "Cost Types", value: "cost-types" },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
        className="px-6"
      />

      {activeTab === "cost-codes" && (
        <SettingsCrudList
          apiType="costCodes"
          addButtonLabel="Add Cost Code"
          fields={[
            { key: "code", label: "Code", required: true, sortable: true, placeholder: "e.g. 100-100" },
            { key: "description", label: "Description", required: true, placeholder: "e.g. General Labor" },
          ]}
        />
      )}

      {activeTab === "cost-types" && (
        <SettingsCrudList
          apiType="costTypes"
          addButtonLabel="Add Cost Type"
          fields={[
            { key: "name", label: "Type Name", required: true, sortable: true, placeholder: "e.g. Estimated" },
          ]}
        />
      )}
    </SettingsLayout>
  );
}
