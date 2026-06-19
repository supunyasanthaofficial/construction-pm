import type { AttendanceStatus } from "./types";
import { NavItem, ProjectStatus, ExpenseCategory } from "./types";
import {
  LayoutDashboard,
  FolderKanban,
  BarChart3,
  FileText,
  Settings,
  Package,
  Wrench,
  Users,
  DollarSign,
  HardHat,
} from "lucide-react";
export const LOW_STOCK_THRESHOLD = 0.2; // 20% remaining = low stock
export const NAV_ITEMS: NavItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: "LayoutDashboard",
  },
  {
    title: "Projects",
    href: "/projects",
    icon: "FolderKanban",
  },
  {
    title: "Materials",
    href: "/materials",
    icon: "Package",
  },
  {
    title: "Workers",
    href: "/workers",
    icon: "HardHat",
  },
  {
    title: "Reports",
    href: "/reports",
    icon: "BarChart3",
  },
  {
    title: "Documents",
    href: "/documents",
    icon: "FileText",
  },
  {
    title: "Settings",
    href: "/settings",
    icon: "Settings",
  },
];

export const PROJECT_STATUS_OPTIONS: Record<
  ProjectStatus,
  { label: string; color: string }
> = {
  planning: {
    label: "Planning",
    color: "bg-blue-100 text-blue-700 border-blue-200",
  },
  active: {
    label: "Active",
    color: "bg-emerald-100 text-emerald-700 border-emerald-200",
  },
  on_hold: {
    label: "On Hold",
    color: "bg-amber-100 text-amber-700 border-amber-200",
  },
  completed: {
    label: "Completed",
    color: "bg-slate-100 text-slate-700 border-slate-200",
  },
};

export const EXPENSE_CATEGORY_OPTIONS: Record<
  ExpenseCategory,
  { label: string; color: string }
> = {
  materials: { label: "Materials", color: "#F97316" },
  labor: { label: "Labor", color: "#3B82F6" },
  equipment: { label: "Equipment", color: "#8B5CF6" },
  subcontractor: { label: "Subcontractor", color: "#EC4899" },
  permits: { label: "Permits", color: "#14B8A6" },
  other: { label: "Other", color: "#64748B" },
};
export const ATTENDANCE_STATUS_OPTIONS: Record<
  AttendanceStatus,
  { label: string; color: string }
> = {
  present: { label: "Present", color: "bg-emerald-100 text-emerald-700" },
  absent: { label: "Absent", color: "bg-red-100 text-red-700" },
  half_day: { label: "Half Day", color: "bg-amber-100 text-amber-700" },
  overtime: { label: "Overtime", color: "bg-blue-100 text-blue-700" },
};
