"use client";

import React from "react";
import { SettingsLayout } from "@/components/settings/settings-layout";
import { SettingsCrudList } from "@/components/settings/settings-crud-list";

export default function CustomActivitiesPage() {
  return (
    <SettingsLayout title="Custom Activity Types">
      <SettingsCrudList
        apiType="customActivities"
        addButtonLabel="Add Activity Type"
        fields={[
          { key: "name", label: "Activity Type", required: true, sortable: true, placeholder: "e.g. Site Visit" },
        ]}
      />
    </SettingsLayout>
  );
}
