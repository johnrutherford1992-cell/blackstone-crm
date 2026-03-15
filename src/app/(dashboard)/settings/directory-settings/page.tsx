"use client";

import React from "react";
import { SettingsLayout } from "@/components/settings/settings-layout";
import { SettingsCrudList } from "@/components/settings/settings-crud-list";

export default function DirectorySettingsPage() {
  return (
    <SettingsLayout title="Directory Settings - Industries">
      <SettingsCrudList
        apiType="industries"
        addButtonLabel="Add Industry"
        fields={[
          { key: "name", label: "Industry", required: true, sortable: true, placeholder: "e.g. Commercial" },
        ]}
      />
    </SettingsLayout>
  );
}
