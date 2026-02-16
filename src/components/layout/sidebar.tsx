"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

export interface SidebarItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  count?: number;
  children?: SidebarItem[];
  isActive?: boolean;
}

interface SidebarProps {
  items: SidebarItem[];
  title?: string;
  className?: string;
}

export function Sidebar({ items, title, className }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className={cn("w-60 shrink-0 border-r border-gray-200 bg-gray-50/50 overflow-y-auto", className)}>
      {title && (
        <div className="px-4 py-3 border-b border-gray-200">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500">{title}</h3>
        </div>
      )}
      <nav className="p-2">
        {items.map((item, idx) => (
          <SidebarLink key={idx} item={item} pathname={pathname} />
        ))}
      </nav>
    </aside>
  );
}

function SidebarLink({ item, pathname, depth = 0 }: { item: SidebarItem; pathname: string; depth?: number }) {
  const [expanded, setExpanded] = React.useState(true);
  const isActive = item.href ? pathname === item.href || pathname.startsWith(item.href + "/") : false;
  const hasChildren = item.children && item.children.length > 0;

  if (hasChildren) {
    return (
      <div>
        <button
          onClick={() => setExpanded(!expanded)}
          className={cn(
            "flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100",
            { "pl-6": depth > 0 }
          )}
        >
          <span className="flex items-center gap-2">
            {item.icon}
            {item.label}
          </span>
          <ChevronRight className={cn("h-4 w-4 transition-transform", expanded && "rotate-90")} />
        </button>
        {expanded && (
          <div className="ml-2">
            {item.children!.map((child, idx) => (
              <SidebarLink key={idx} item={child} pathname={pathname} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    );
  }

  const Comp = item.href ? Link : "div";

  return (
    <Comp
      href={item.href || "#"}
      className={cn(
        "flex items-center justify-between rounded-md px-3 py-2 text-sm transition-colors",
        isActive
          ? "bg-emerald-50 text-emerald-700 font-medium"
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
        { "pl-6": depth > 0 }
      )}
    >
      <span className="flex items-center gap-2">
        {item.icon}
        {item.label}
      </span>
      {item.count !== undefined && (
        <span className={cn(
          "min-w-[20px] rounded-full px-1.5 py-0.5 text-center text-xs font-medium",
          isActive ? "bg-emerald-100 text-emerald-700" : "bg-gray-200 text-gray-600"
        )}>
          {item.count}
        </span>
      )}
    </Comp>
  );
}
