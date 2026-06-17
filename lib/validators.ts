import { z } from "zod";

export const projectSchema = z
  .object({
    name: z
      .string()
      .min(2, "Project name must be at least 2 characters")
      .max(100),
    description: z
      .string()
      .min(10, "Description must be at least 10 characters")
      .max(500),
    clientName: z.string().min(2, "Client name is required").max(100),
    location: z.string().min(2, "Location is required").max(200),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().min(1, "End date is required"),
    budget: z.string().min(1, "Budget is required"),
    status: z.enum(["planning", "active", "on_hold", "completed"]),
  })
  .refine((data) => new Date(data.endDate) > new Date(data.startDate), {
    message: "End date must be after start date",
    path: ["endDate"],
  });

export type ProjectFormValues = z.infer<typeof projectSchema>;

export const expenseSchema = z.object({
  category: z.enum([
    "materials",
    "labor",
    "equipment",
    "subcontractor",
    "permits",
    "other",
  ]),
  amount: z.string().min(1, "Amount is required"),
  description: z.string().min(5, "Description is required"),
  date: z.string().min(1, "Date is required"),
});

export type ExpenseFormValues = z.infer<typeof expenseSchema>;
