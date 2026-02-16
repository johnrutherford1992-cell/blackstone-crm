"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  ChevronDown,
  Zap,
  HelpCircle,
  Command,
} from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Dropdown, DropdownItem } from "@/components/ui/dropdown";
import { MegaMenu } from "./mega-menu";
import { CommandPalette } from "./command-palette";

const PAGE_TITLES: Record<string, string> = {
  "/home": "Home",
  "/timeline": "Timeline",
  "/map": "Map",
  "/ai-chat": "Buildr AI",
  "/calendar": "Calendar",
  "/crm/leads": "Leads",
  "/crm/directory": "Directory",
  "/crm/contacts": "Contacts",
  "/crm/projects": "Projects",
  "/crm/tasks": "Tasks",
  "/crm/activity": "Activity",
  "/analytics/forecast": "Forecast",
  "/analytics/insights": "Insights",
  "/analytics/reports": "Reports",
  "/analytics/cost-models": "Cost Models",
  "/workforce": "Workforce",
  "/workforce/assignments": "Assignments",
  "/workforce/utilization": "Utilization",
  "/workforce/bench": "Bench",
  "/workforce/demand": "Demand",
  "/workforce/employees": "Employees",
  "/settings": "Settings",
};

export function TopBar() {
  const pathname = usePathname();
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const currentPage = Object.entries(PAGE_TITLES).find(([path]) =>
    pathname.startsWith(path)
  )?.[1] || "Home";

  React.useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setShowCommandPalette(true);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-gray-200 bg-white px-4">
        {/* Left section */}
        <div className="flex items-center gap-4">
          <Link href="/home" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-emerald-600">
              <span className="text-sm font-bold text-white">B</span>
            </div>
            <span className="text-lg font-bold text-emerald-600 hidden sm:inline">BLACKSTONE</span>
          </Link>

          <button
            onClick={() => setShowMegaMenu(!showMegaMenu)}
            className="flex items-center gap-1 rounded-md px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            {currentPage}
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>

        {/* Center - Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 w-full rounded-md border border-gray-300 bg-gray-50 pl-9 pr-12 text-sm placeholder:text-gray-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 rounded border border-gray-300 bg-gray-100 px-1.5 py-0.5 text-[10px] text-gray-500">
              /
            </kbd>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowCommandPalette(true)}
            className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm text-gray-600 hover:bg-gray-100"
          >
            <Zap className="h-4 w-4" />
            <span className="hidden sm:inline">Quick Actions</span>
            <kbd className="hidden sm:inline rounded border border-gray-300 bg-gray-100 px-1 py-0.5 text-[10px] text-gray-500">
              <Command className="inline h-3 w-3" />K
            </kbd>
          </button>

          <Link
            href="#"
            className="flex items-center gap-1 rounded-md px-2 py-1.5 text-sm text-gray-600 hover:bg-gray-100"
          >
            <HelpCircle className="h-4 w-4" />
            <span className="hidden sm:inline">Support</span>
          </Link>

          <Dropdown
            trigger={
              <button className="ml-1">
                <Avatar firstName="John" lastName="Rutherford" size="md" />
              </button>
            }
            align="right"
          >
            <div className="px-3 py-2 border-b border-gray-100">
              <p className="text-sm font-medium text-gray-900">John Rutherford</p>
              <p className="text-xs text-gray-500">john@blackstone.com</p>
            </div>
            <DropdownItem>
              <Link href="/settings/account" className="w-full text-left">Profile</Link>
            </DropdownItem>
            <DropdownItem>Documentation</DropdownItem>
            <div className="border-t border-gray-100 mt-1 pt-1">
              <DropdownItem className="text-red-600">Sign Out</DropdownItem>
            </div>
          </Dropdown>
        </div>
      </header>

      {showMegaMenu && (
        <MegaMenu onClose={() => setShowMegaMenu(false)} />
      )}

      <CommandPalette
        open={showCommandPalette}
        onClose={() => setShowCommandPalette(false)}
      />
    </>
  );
}
