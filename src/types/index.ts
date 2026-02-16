// Navigation types
export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  badge?: number;
  children?: NavItem[];
}

export interface MegaMenuColumn {
  title: string;
  items: NavItem[];
}

// View system
export interface SavedViewConfig {
  id: string;
  name: string;
  visibility: "personal" | "shared";
  filters: Record<string, any>;
  columns: string[];
  sortOrder: { field: string; direction: "asc" | "desc" }[];
}

// Table
export interface DataTableColumn<T = any> {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
  width?: string;
}

// Filter
export interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

export interface FilterGroup {
  label: string;
  key: string;
  options: FilterOption[];
  type: "checkbox" | "radio" | "date-range";
}

// Stage colors
export const STAGE_COLORS: Record<string, string> = {
  Discovery: "#10B981",
  Bidding: "#3B82F6",
  "Proposal Sent": "#8B5CF6",
  "Contract Sent": "#F59E0B",
  Won: "#059669",
  Completed: "#6B7280",
  Lost: "#EF4444",
};

// Company categories
export const COMPANY_CATEGORIES = [
  "Client",
  "Design",
  "Engineering",
  "Finance",
  "Trade Partner",
  "Other",
] as const;
