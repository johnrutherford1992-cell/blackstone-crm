"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import {
  Home, Clock, Map, MessageSquare, Calendar, Settings,
  Inbox, Building2, Users, FolderKanban, CheckSquare, Activity,
  TrendingUp, BarChart3, FileText, DollarSign,
  LayoutDashboard, GitBranch, Percent, UserCheck,
} from "lucide-react";

interface MegaMenuProps {
  onClose: () => void;
}

const MENU_COLUMNS = [
  {
    title: "OVERVIEW",
    items: [
      { label: "Home", href: "/home", icon: Home },
      { label: "Timeline", href: "/timeline", icon: Clock },
      { label: "Map", href: "/map", icon: Map },
      { label: "AI Chat", href: "/ai-chat", icon: MessageSquare },
      { label: "Calendar", href: "/calendar", icon: Calendar },
      { label: "Settings", href: "/settings", icon: Settings },
    ],
  },
  {
    title: "CRM",
    items: [
      { label: "Leads", href: "/crm/leads", icon: Inbox },
      { label: "Directory", href: "/crm/directory", icon: Building2 },
      { label: "Contacts", href: "/crm/contacts", icon: Users },
      { label: "Projects", href: "/crm/projects", icon: FolderKanban },
      { label: "Tasks", href: "/crm/tasks", icon: CheckSquare },
      { label: "Activity", href: "/crm/activity", icon: Activity },
    ],
  },
  {
    title: "ANALYTICS",
    items: [
      { label: "Forecast", href: "/analytics/forecast", icon: TrendingUp },
      { label: "Insights", href: "/analytics/insights", icon: BarChart3 },
      { label: "Reports", href: "/analytics/reports", icon: FileText },
      { label: "Cost Models", href: "/analytics/cost-models", icon: DollarSign },
    ],
  },
  {
    title: "WORKFORCE",
    items: [
      { label: "Dashboard", href: "/workforce", icon: LayoutDashboard },
      { label: "Assignments", href: "/workforce/assignments", icon: GitBranch },
      { label: "Utilization", href: "/workforce/utilization", icon: Percent },
      { label: "Bench", href: "/workforce/bench", icon: UserCheck },
      { label: "Demand", href: "/workforce/demand", icon: BarChart3 },
      { label: "Employees", href: "/workforce/employees", icon: Users },
    ],
  },
];

export function MegaMenu({ onClose }: MegaMenuProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    }
    function handleEsc(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-30 bg-black/20" onClick={onClose}>
      <div
        ref={ref}
        className="absolute left-0 right-0 top-14 mx-auto max-w-4xl rounded-b-lg border border-gray-200 bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid grid-cols-4 gap-8">
          {MENU_COLUMNS.map((column) => (
            <div key={column.title}>
              <h3 className="mb-3 text-xs font-semibold tracking-wider text-gray-400">
                {column.title}
              </h3>
              <ul className="space-y-1">
                {column.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="flex items-center gap-2.5 rounded-md px-2 py-1.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-700"
                    >
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
