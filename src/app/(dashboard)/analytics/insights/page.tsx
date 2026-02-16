"use client";

import React from "react";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, DollarSign, XCircle, BarChart3, Users } from "lucide-react";

const INSIGHT_CARDS = [
  { type: "win-rate", title: "Win Rate", description: "Compare win rates across project types, companies, and market sectors", icon: TrendingUp, color: "text-emerald-600 bg-emerald-50" },
  { type: "profit", title: "Profit", description: "View highest and lowest profit projects and analyze margins", icon: DollarSign, color: "text-blue-600 bg-blue-50" },
  { type: "lost", title: "Lost Projects", description: "Analyze loss reasons and identify patterns in lost pursuits", icon: XCircle, color: "text-red-600 bg-red-50" },
  { type: "acv", title: "Annual Construction Volume", description: "Track annualized profit and revenue trends over time", icon: BarChart3, color: "text-purple-600 bg-purple-50" },
  { type: "employee-revenue", title: "Employee Project Revenue", description: "Per-employee revenue and profit breakdown across projects", icon: Users, color: "text-amber-600 bg-amber-50" },
];

export default function InsightsPage() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <PageHeader title="Insights" />
      <div className="flex-1 overflow-auto p-6">
        <div className="grid grid-cols-3 gap-4">
          {INSIGHT_CARDS.slice(0, 3).map((card) => (
            <Link key={card.type} href={`/analytics/insights/${card.type}`}>
              <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${card.color} mb-3`}>
                    <card.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900">{card.title}</h3>
                  <p className="mt-1 text-xs text-gray-500">{card.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          {INSIGHT_CARDS.slice(3).map((card) => (
            <Link key={card.type} href={`/analytics/insights/${card.type}`}>
              <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${card.color} mb-3`}>
                    <card.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900">{card.title}</h3>
                  <p className="mt-1 text-xs text-gray-500">{card.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
