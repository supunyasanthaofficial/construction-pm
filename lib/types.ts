export type ProjectStatus = "planning" | "active" | "on_hold" | "completed";
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
  totalExpenses: number;
  progress: number;
  location: string;
  createdAt: string;
}

export interface Expense {
  id: string;
  projectId: string;
  category: ExpenseCategory;
  amount: number;
  description: string;
  date: string;
  receiptUrl?: string;
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
  phone: string;
}

export interface Attendance {
  id: string;
  workerId: string;
  workerName: string;
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

export interface Document {
  id: string;
  projectId: string;
  name: string;
  filePath: string; // storage path (mock for now)
  fileType: string; // extension e.g. "pdf", "jpg"
  fileSize: string; // human‑readable e.g. "2.4 MB"
  uploadedBy: string;
  uploadedAt: string; // ISO date
}
