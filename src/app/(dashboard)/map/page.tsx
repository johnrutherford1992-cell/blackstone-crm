"use client";

import React from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Badge } from "@/components/ui/badge";
import { Tabs } from "@/components/ui/tabs";
import { MapPin, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const PROJECTS = [
  { id: "1", name: "Austin Office Tower", company: "Turner Construction", stage: "Discovery", lat: 30.267, lng: -97.743 },
  { id: "2", name: "Dell Medical Center", company: "Seton Healthcare", stage: "Bidding", lat: 30.306, lng: -97.727 },
  { id: "3", name: "Samsung Fab Retrofit", company: "Samsung Austin", stage: "Proposal Sent", lat: 30.396, lng: -97.723 },
  { id: "4", name: "The Grove at Shoal Creek", company: "Milestone Community", stage: "In Construction", lat: 30.303, lng: -97.753 },
  { id: "5", name: "Mueller Town Center", company: "Catellus Development", stage: "In Construction", lat: 30.297, lng: -97.706 },
];

const STAGE_VARIANTS: Record<string, "success" | "info" | "purple" | "warning"> = {
  Discovery: "success", Bidding: "info", "Proposal Sent": "purple", "In Construction": "success",
};

export default function MapPage() {
  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Map Area */}
      <div className="flex-1 relative bg-gray-200">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="mx-auto h-12 w-12 text-gray-400 mb-2" />
            <p className="text-sm text-gray-500">Google Maps integration</p>
            <p className="text-xs text-gray-400">Set NEXT_PUBLIC_GOOGLE_MAPS_KEY in .env</p>
          </div>
        </div>
        {/* Map/Satellite toggle */}
        <div className="absolute top-4 left-4 flex rounded-md border border-gray-300 bg-white shadow-sm">
          <button className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 rounded-l-md">Map</button>
          <button className="px-3 py-1.5 text-xs font-medium text-gray-500 rounded-r-md">Satellite</button>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-96 shrink-0 border-l border-gray-200 bg-white flex flex-col">
        <Tabs
          tabs={[{ label: "Projects", value: "projects" }, { label: "Employees", value: "employees" }]}
          activeTab="projects"
          onChange={() => {}}
          className="px-4"
        />
        <div className="px-4 py-3 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input placeholder="Search projects..." className="pl-9" />
          </div>
        </div>
        <div className="flex-1 overflow-auto">
          {PROJECTS.map((project) => (
            <div key={project.id} className="border-b border-gray-100 px-4 py-3 hover:bg-gray-50 cursor-pointer">
              <p className="text-sm font-medium text-gray-900">{project.name}</p>
              <p className="text-xs text-gray-500">{project.company}</p>
              <Badge variant={STAGE_VARIANTS[project.stage] || "default"} className="mt-1">{project.stage}</Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
