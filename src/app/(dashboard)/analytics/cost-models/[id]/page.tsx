"use client";

import React from "react";
import { PageHeader } from "@/components/shared/page-header";
import { MetricCard } from "@/components/shared/metric-card";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { ChevronRight, ChevronDown, Plus, Download, MoreHorizontal } from "lucide-react";

const CSI_DIVISIONS = [
  { code: "01", name: "General Requirements", avgAmount: 2850000, avgPerUnit: 6.33 },
  { code: "02", name: "Existing Conditions", avgAmount: 450000, avgPerUnit: 1.00 },
  { code: "03", name: "Concrete", avgAmount: 5200000, avgPerUnit: 11.56 },
  { code: "04", name: "Masonry", avgAmount: 1100000, avgPerUnit: 2.44 },
  { code: "05", name: "Metals", avgAmount: 3800000, avgPerUnit: 8.44 },
  { code: "06", name: "Wood, Plastics & Composites", avgAmount: 890000, avgPerUnit: 1.98 },
  { code: "07", name: "Thermal & Moisture Protection", avgAmount: 1650000, avgPerUnit: 3.67 },
  { code: "08", name: "Openings", avgAmount: 2100000, avgPerUnit: 4.67 },
  { code: "09", name: "Finishes", avgAmount: 3200000, avgPerUnit: 7.11 },
  { code: "10", name: "Specialties", avgAmount: 450000, avgPerUnit: 1.00 },
];

export default function CostModelDetailPage() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <PageHeader
        title="Office Buildings 2024"
        breadcrumbs={[{ label: "Cost Models", href: "/analytics/cost-models" }, { label: "Office Buildings 2024" }]}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">Expand All</Button>
            <Button variant="outline" size="sm">Display Options</Button>
            <Button variant="outline" size="sm"><Plus className="mr-1 h-3 w-3" /> Create Lead</Button>
            <Button size="sm">Manage Projects</Button>
            <Button variant="ghost" size="sm"><MoreHorizontal className="h-4 w-4" /></Button>
          </div>
        }
      />

      <div className="border-b border-gray-200 bg-white px-6 py-3">
        <div className="grid grid-cols-3 gap-4">
          <MetricCard label="Comparing" value="5 Projects" />
          <MetricCard label="Avg Cost" value={formatCurrency(45200000)} />
          <MetricCard label="AVG Duration" value="16 months" />
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase w-20">Code</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase w-40">AVG Amount</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase w-32">AVG $/Unit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {CSI_DIVISIONS.map((div) => (
              <tr key={div.code} className="hover:bg-gray-50 cursor-pointer">
                <td className="px-4 py-3 font-medium text-gray-900">
                  <span className="flex items-center gap-1">
                    <ChevronRight className="h-3.5 w-3.5 text-gray-400" />
                    {div.code}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-700">{div.name}</td>
                <td className="px-4 py-3 text-right font-medium text-gray-900">{formatCurrency(div.avgAmount)}</td>
                <td className="px-4 py-3 text-right text-gray-600">${div.avgPerUnit.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
