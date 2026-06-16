import { NavItem, ProjectStatus, ExpenseCategory, UserRole } from "./types";

export const NAV_ITEMS: NavItem[] = [
  { title: "Dashboard", href: "/", icon: "LayoutDashboard" },
  {
    title: "Projects",
    href: "/projects",
    icon: "FolderKanban",
    children: [
      { title: "All Projects", href: "/projects", icon: "List" },
      { title: "New Project", href: "/projects/new", icon: "Plus" },
    ],
  },
  { title: "Reports", href: "/reports", icon: "BarChart3" },
  { title: "Documents", href: "/documents", icon: "FileText" },
  { title: "Settings", href: "/settings", icon: "Settings" },
];

export const PROJECT_STATUSES: Record<
  ProjectStatus,
  { label: string; color: string }
> = {
  planning: { label: "Planning", color: "bg-blue-100 text-blue-800" },
  active: { label: "Active", color: "bg-green-100 text-green-800" },
  on_hold: { label: "On Hold", color: "bg-yellow-100 text-yellow-800" },
  completed: { label: "Completed", color: "bg-gray-100 text-gray-800" },
};

export const EXPENSE_CATEGORIES: Record<
  ExpenseCategory,
  { label: string; icon: string }
> = {
  materials: { label: "Materials", icon: "Package" },
  labor: { label: "Labor", icon: "Users" },
  equipment: { label: "Equipment", icon: "Wrench" },
  subcontractor: { label: "Subcontractor", icon: "Building2" },
  permits: { label: "Permits", icon: "FileCheck" },
  other: { label: "Other", icon: "MoreHorizontal" },
};

export const ROLES: Record<UserRole, string> = {
  admin: "Administrator",
  project_manager: "Project Manager",
  engineer: "Engineer",
  accountant: "Accountant",
};
