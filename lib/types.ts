export type ProjectStatus = "planning" | "active" | "on_hold" | "completed";
export type UserRole = "admin" | "project_manager" | "engineer" | "accountant";
export type AttendanceStatus = "present" | "absent" | "half_day" | "overtime";
export type ExpenseCategory =
  | "materials"
  | "labor"
  | "equipment"
  | "subcontractor"
  | "permits"
  | "other";

export interface Project {
  id: string;
  name: string;
  description: string;
  clientName: string;
  startDate: string;
  endDate: string;
  status: ProjectStatus;
  budget: number;
  createdAt: string;
}

export interface Expense {
  id: string;
  projectId: string;
  category: ExpenseCategory;
  amount: number;
  description: string;
  date: string;
}

export interface Material {
  id: string;
  projectId: string;
  name: string;
  unit: string;
  quantityOrdered: number;
  quantityUsed: number;
  unitCost: number;
  supplier: string;
}

export interface Worker {
  id: string;
  projectId: string;
  fullName: string;
  role: string;
  dailyWage: number;
  contactPhone: string;
}

export interface Attendance {
  id: string;
  workerId: string;
  projectId: string;
  date: string;
  status: AttendanceStatus;
  hoursWorked: number;
}

export interface NavItem {
  title: string;
  href: string;
  icon: string;
  children?: NavItem[];
}
