"use client";

import React from "react";
import { PageHeader } from "@/components/shared/page-header";
import { MetricCard } from "@/components/shared/metric-card";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Activity, Users, TrendingUp, BarChart3 } from "lucide-react";

export default function ActivityPage() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <PageHeader title="Activity" />
      <div className="flex-1 overflow-auto p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Activity Overview</h2>
          <select className="rounded-md border border-gray-300 px-3 py-1.5 text-sm">
            <option>Last Month</option>
            <option>Last Week</option>
            <option>Last Quarter</option>
          </select>
        </div>

        <div className="mb-8 grid grid-cols-3 gap-4">
          <MetricCard label="Total Activities" value={247} icon={<Activity className="h-5 w-5" />} />
          <MetricCard label="Active Users" value={6} icon={<Users className="h-5 w-5" />} />
          <MetricCard label="Avg per User" value={41} icon={<TrendingUp className="h-5 w-5" />} />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <Card>
            <CardHeader><CardTitle>Activities by Type</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { type: "Meeting", count: 45, color: "bg-blue-500" },
                  { type: "Call", count: 38, color: "bg-emerald-500" },
                  { type: "Email", count: 92, color: "bg-purple-500" },
                  { type: "Note", count: 55, color: "bg-amber-500" },
                  { type: "Task", count: 17, color: "bg-gray-500" },
                ].map((item) => (
                  <div key={item.type} className="flex items-center gap-3">
                    <span className="w-16 text-sm text-gray-600">{item.type}</span>
                    <div className="flex-1">
                      <div className="h-6 rounded-full bg-gray-100">
                        <div
                          className={`h-6 rounded-full ${item.color} flex items-center justify-end pr-2`}
                          style={{ width: `${(item.count / 92) * 100}%` }}
                        >
                          <span className="text-xs font-medium text-white">{item.count}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Top Performers</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: "John Rutherford", count: 78 },
                  { name: "Sarah Mitchell", count: 52 },
                  { name: "David Chen", count: 45 },
                  { name: "Maria Rodriguez", count: 38 },
                  { name: "James Wilson", count: 34 },
                ].map((user) => (
                  <div key={user.name} className="flex items-center gap-3">
                    <span className="w-32 text-sm text-gray-600 truncate">{user.name}</span>
                    <div className="flex-1">
                      <div className="h-6 rounded-full bg-gray-100">
                        <div
                          className="h-6 rounded-full bg-emerald-500 flex items-center justify-end pr-2"
                          style={{ width: `${(user.count / 78) * 100}%` }}
                        >
                          <span className="text-xs font-medium text-white">{user.count}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
