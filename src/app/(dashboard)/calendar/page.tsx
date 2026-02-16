"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const EVENTS: Record<number, { name: string; color: string; type: string }[]> = {
  5: [{ name: "Samsung Fab - Bid Due", color: "bg-purple-500", type: "bid" }],
  12: [{ name: "Austin Office Tower - Construction Start", color: "bg-emerald-500", type: "construction" }],
  15: [{ name: "Dell Medical - Award Date", color: "bg-blue-500", type: "award" }],
  18: [{ name: "UT Engineering - Bid Due", color: "bg-purple-500", type: "bid" }],
  22: [{ name: "Domain Phase III - Construction Start", color: "bg-emerald-500", type: "construction" }],
  28: [{ name: "Mueller Town Center - Milestone", color: "bg-emerald-500", type: "construction" }],
};

export default function CalendarPage() {
  const [currentMonth] = useState(new Date(2024, 1)); // Feb 2024
  const daysInMonth = new Date(2024, 2, 0).getDate();
  const firstDayOfWeek = new Date(2024, 1, 1).getDay();

  const calendarDays = [];
  for (let i = 0; i < firstDayOfWeek; i++) calendarDays.push(null);
  for (let i = 1; i <= daysInMonth; i++) calendarDays.push(i);

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Sidebar */}
      <div className="w-56 shrink-0 border-r border-gray-200 bg-white p-4">
        <div className="mb-4">
          <label className="text-xs font-medium text-gray-500">Division</label>
          <select className="mt-1 w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm">
            <option>All Divisions</option>
            <option>Commercial</option>
            <option>Industrial</option>
            <option>Residential</option>
          </select>
        </div>
        <div className="mb-4 flex gap-2">
          {["All", "My Projects", "Bid Board"].map((tab) => (
            <button key={tab} className="rounded-md px-2 py-1 text-xs font-medium text-gray-600 hover:bg-gray-100">
              {tab}
            </button>
          ))}
        </div>
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">Event Type</p>
          {[
            { label: "Bid Due Date", color: "text-purple-500" },
            { label: "Award Date", color: "text-blue-500" },
            { label: "Construction", color: "text-emerald-500" },
          ].map((type) => (
            <label key={type.label} className="flex items-center gap-2 py-1 text-sm text-gray-600">
              <Check className={`h-4 w-4 ${type.color}`} />
              {type.label}
            </label>
          ))}
        </div>
      </div>

      {/* Calendar */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-3">
          <div className="flex items-center gap-3">
            <button className="rounded-md p-1 hover:bg-gray-100"><ChevronLeft className="h-5 w-5 text-gray-500" /></button>
            <h2 className="text-lg font-semibold text-gray-900">February 2024</h2>
            <button className="rounded-md p-1 hover:bg-gray-100"><ChevronRight className="h-5 w-5 text-gray-500" /></button>
          </div>
          <button className="rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50">Today</button>
        </div>

        <div className="flex-1 overflow-auto">
          {/* Day headers */}
          <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50">
            {DAYS.map((day) => (
              <div key={day} className="border-r border-gray-100 px-2 py-2 text-center text-xs font-medium text-gray-500">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 auto-rows-[120px]">
            {calendarDays.map((day, i) => (
              <div key={i} className="border-b border-r border-gray-100 p-1">
                {day && (
                  <>
                    <span className="text-xs font-medium text-gray-500">{day}</span>
                    {EVENTS[day]?.map((event, idx) => (
                      <div key={idx} className={`mt-1 rounded px-1.5 py-0.5 text-xs text-white ${event.color} truncate`}>
                        {event.name}
                      </div>
                    ))}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
