"use client";

import React from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

const PROJECT_NAV = [
  { label: "Overview", href: "" },
  { label: "Details", href: "/details" },
  { label: "Drawings", href: "/drawings" },
  { label: "Directory", href: "/directory" },
  { label: "Documents", href: "/documents" },
  { label: "Budget", href: "/budget" },
  { label: "Bidding", href: "/bidding" },
  { label: "Financials", href: "/financials" },
  { label: "Activity", href: "/activity" },
];

const ACTIVITIES = [
  { id: "1", type: "stage_change", user: "John Rutherford", action: "moved project to", stage: "Discovery", time: "2 days ago" },
  { id: "2", type: "document_upload", user: "David Chen", action: "uploaded", document: "RFP Package v2.pdf", time: "3 days ago" },
  { id: "3", type: "team_member_added", user: "Emily Park", action: "added", member: "Mike Thompson as Superintendent", time: "5 days ago" },
  { id: "4", type: "comment", user: "John Rutherford", action: "commented", text: "Schedule looks good. Moving forward with bid coordination.", time: "1 week ago" },
  { id: "5", type: "contract_value_change", user: "Sarah Williams", action: "updated contract value to", value: "$45,000,000", time: "2 weeks ago" },
  { id: "6", type: "project_created", user: "John Rutherford", action: "created project", project: "Austin Office Tower", time: "3 weeks ago" },
];

export default function ProjectActivityPage() {
  const params = useParams();
  const pathname = usePathname();
  const basePath = `/crm/projects/${params.id}`;

  return (
    <div className="flex flex-1 overflow-hidden">
      <aside className="w-56 shrink-0 border-r border-gray-200 bg-white">
        <div className="border-b border-gray-200 p-4">
          <Link href="/crm/projects" className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-3">
            <ArrowLeft className="h-4 w-4" /> Back
          </Link>
          <h3 className="text-sm font-semibold text-gray-900">Austin Office Tower</h3>
          <Badge variant="success" className="mt-1">Discovery</Badge>
        </div>
        <nav className="p-2">
          {PROJECT_NAV.map((item) => {
            const href = `${basePath}${item.href}`;
            const isActive = item.href === "" ? pathname === basePath : pathname.startsWith(href);
            return (
              <Link key={item.label} href={href} className={cn("block rounded-md px-3 py-2 text-sm", isActive ? "bg-emerald-50 text-emerald-700 font-medium" : "text-gray-600 hover:bg-gray-50")}>
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="border-b border-gray-200 bg-white px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">Activity Feed</h2>
        </div>

        <div className="flex-1 overflow-auto">
          <div className="divide-y divide-gray-100">
            {ACTIVITIES.map((activity) => (
              <div key={activity.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shrink-0 text-xs font-semibold">
                    {activity.user.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">
                      <span className="font-medium">{activity.user}</span>
                      {" "}{activity.action}{" "}
                      {activity.stage && <span className="font-medium text-emerald-600">{activity.stage}</span>}
                      {activity.document && <span className="font-medium">{activity.document}</span>}
                      {activity.member && <span className="font-medium">{activity.member}</span>}
                      {activity.project && <span className="font-medium">{activity.project}</span>}
                      {activity.value && <span className="font-medium">{activity.value}</span>}
                    </p>
                    {activity.text && <p className="text-sm text-gray-600 mt-1 italic">"{activity.text}"</p>}
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
