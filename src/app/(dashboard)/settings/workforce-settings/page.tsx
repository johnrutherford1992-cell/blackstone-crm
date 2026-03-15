"use client";

import React from "react";
import { SettingsLayout } from "@/components/settings/settings-layout";
import { SettingsCrudList } from "@/components/settings/settings-crud-list";

export default function WorkforceSettingsPage() {
  return (
    <SettingsLayout title="Workforce Settings">
      <SettingsCrudList
        apiType="workforceRoles"
        addButtonLabel="Add Role"
        fields={[
          { key: "name", label: "Role Name", required: true, sortable: true, placeholder: "e.g. Project Manager" },
          { key: "abbreviation", label: "Abbreviation", required: true, placeholder: "e.g. PM" },
        ]}
      />
    </SettingsLayout>
  );
}
