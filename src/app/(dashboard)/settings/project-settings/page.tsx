"use client";

import React, { useState } from "react";
import { SettingsLayout } from "@/components/settings/settings-layout";
import { SettingsCrudList } from "@/components/settings/settings-crud-list";
import { Tabs } from "@/components/ui/tabs";

export default function ProjectSettingsPage() {
  const [activeTab, setActiveTab] = useState("stages");

  return (
    <SettingsLayout title="Project Settings">
      <Tabs
        tabs={[
          { label: "Stages", value: "stages" },
          { label: "Loss Reasons", value: "loss-reasons" },
          { label: "Contract Types", value: "contract-types" },
          { label: "Tender Types", value: "tender-types" },
          { label: "Market Sectors", value: "market-sectors" },
          { label: "Delivery Methods", value: "delivery-methods" },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
        className="px-6"
      />

      {activeTab === "stages" && (
        <SettingsCrudList
          apiType="stages"
          addButtonLabel="Add Stage"
          fields={[
            { key: "name", label: "Stage Name", required: true, sortable: true, placeholder: "e.g. Pursuit" },
            { key: "color", label: "Color", placeholder: "#10B981", render: (val: string) => val ? <div className="h-4 w-4 rounded" style={{ backgroundColor: val }} /> : null },
          ]}
        />
      )}

      {activeTab === "loss-reasons" && (
        <SettingsCrudList
          apiType="lossReasons"
          addButtonLabel="Add Loss Reason"
          fields={[
            { key: "name", label: "Loss Reason", required: true, sortable: true, placeholder: "e.g. Price" },
          ]}
        />
      )}

      {activeTab === "contract-types" && (
        <SettingsCrudList
          apiType="contractTypes"
          addButtonLabel="Add Contract Type"
          fields={[
            { key: "name", label: "Contract Type", required: true, sortable: true, placeholder: "e.g. GMP" },
          ]}
        />
      )}

      {activeTab === "tender-types" && (
        <SettingsCrudList
          apiType="tenderTypes"
          addButtonLabel="Add Tender Type"
          fields={[
            { key: "name", label: "Tender Type", required: true, sortable: true, placeholder: "e.g. Invited" },
          ]}
        />
      )}

      {activeTab === "market-sectors" && (
        <SettingsCrudList
          apiType="marketSectors"
          addButtonLabel="Add Market Sector"
          fields={[
            { key: "name", label: "Market Sector", required: true, sortable: true, placeholder: "e.g. Office" },
          ]}
        />
      )}

      {activeTab === "delivery-methods" && (
        <SettingsCrudList
          apiType="deliveryMethods"
          addButtonLabel="Add Delivery Method"
          fields={[
            { key: "name", label: "Delivery Method", required: true, sortable: true, placeholder: "e.g. CM at Risk" },
          ]}
        />
      )}
    </SettingsLayout>
  );
}
