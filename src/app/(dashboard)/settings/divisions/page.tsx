"use client";

import React from "react";
import { SettingsLayout } from "@/components/settings/settings-layout";
import { SettingsCrudList } from "@/components/settings/settings-crud-list";

export default function DivisionsPage() {
  return (
    <SettingsLayout title="Divisions">
      <SettingsCrudList
        apiType="divisions"
        addButtonLabel="Add Division"
        fields={[
          { key: "name", label: "Name", required: true, sortable: true, placeholder: "e.g. Commercial" },
        ]}
      />
    </SettingsLayout>
  );
}
