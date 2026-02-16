import React from "react";
import { Card } from "@/components/ui/card";

interface MetricCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  change?: { value: number; label: string };
  className?: string;
}

export function MetricCard({ label, value, icon, change, className }: MetricCardProps) {
  return (
    <Card className={className}>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-500">{label}</p>
          {icon && <div className="text-gray-400">{icon}</div>}
        </div>
        <p className="mt-2 text-2xl font-bold text-gray-900">{value}</p>
        {change && (
          <p className={`mt-1 text-xs ${change.value >= 0 ? "text-emerald-600" : "text-red-600"}`}>
            {change.value >= 0 ? "+" : ""}{change.value}% {change.label}
          </p>
        )}
      </div>
    </Card>
  );
}
