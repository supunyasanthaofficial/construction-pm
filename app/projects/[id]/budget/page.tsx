"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { mockProjects, mockExpenses } from "@/lib/mock-data";
import { PageHeader } from "@/components/shared/page-header";
import { ExpenseForm } from "../../../../components/features/expenses/expense-form";
import { ExpenseList } from "../../../../components/features/expenses/expense-list";
import { ExpenseCategoryChart } from "../../../../components/features/expenses/expense-category-chart";
import { ExpenseTrendChart } from "../../../../components/features/expenses/expense-trend-chart";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import type { Expense } from "@/lib/types";

export default function BudgetPage() {
  const params = useParams();
  const project = mockProjects.find((p) => p.id === params.id);
  const [expenses, setExpenses] = useState<Expense[]>(
    mockExpenses.filter((e) => e.projectId === params.id),
  );

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <h2 className="text-xl font-semibold">Project not found</h2>
        <Link href="/projects" className="mt-4">
          <Button variant="outline">Back to Projects</Button>
        </Link>
      </div>
    );
  }

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const remainingBudget = project.budget - totalExpenses;
  const budgetUtilization = (totalExpenses / project.budget) * 100;

  const handleAddExpense = (data: Omit<Expense, "id">) => {
    const newExpense: Expense = {
      ...data,
      id: Date.now().toString(),
    };
    setExpenses([newExpense, ...expenses]);
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses(expenses.filter((e) => e.id !== id));
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Budget - ${project.name}`}
        description="Track expenses, manage budget, and monitor spending."
      >
        <div className="flex gap-3">
          <Link href={`/projects/${project.id}`}>
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Project
            </Button>
          </Link>
          <ExpenseForm projectId={project.id} onSubmit={handleAddExpense} />
        </div>
      </PageHeader>

      {/* Budget Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-slate-500 uppercase tracking-wider">
              Total Budget
            </p>
            <p className="text-xl font-bold text-slate-900 mt-1">
              {formatCurrency(project.budget)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-slate-500 uppercase tracking-wider">
              Total Spent
            </p>
            <p className="text-xl font-bold text-amber-600 mt-1">
              {formatCurrency(totalExpenses)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-slate-500 uppercase tracking-wider">
              Remaining
            </p>
            <p
              className={`text-xl font-bold mt-1 ${remainingBudget < 0 ? "text-red-600" : "text-emerald-600"}`}
            >
              {formatCurrency(remainingBudget)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-slate-500 uppercase tracking-wider">
              Utilization
            </p>
            <div className="flex items-center gap-2 mt-1">
              <p
                className={`text-xl font-bold ${
                  budgetUtilization > 90
                    ? "text-red-600"
                    : budgetUtilization > 75
                      ? "text-amber-600"
                      : "text-emerald-600"
                }`}
              >
                {budgetUtilization.toFixed(1)}%
              </p>
              {budgetUtilization > 75 && (
                <AlertTriangle className="h-5 w-5 text-amber-500" />
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Budget Progress Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-700">
              Budget Progress
            </span>
            <span className="text-sm text-slate-500">
              {formatCurrency(totalExpenses)} / {formatCurrency(project.budget)}
            </span>
          </div>
          <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                budgetUtilization > 100
                  ? "bg-red-500"
                  : budgetUtilization > 90
                    ? "bg-red-400"
                    : budgetUtilization > 75
                      ? "bg-amber-400"
                      : budgetUtilization > 50
                        ? "bg-orange-400"
                        : "bg-emerald-400"
              }`}
              style={{ width: `${Math.min(budgetUtilization, 100)}%` }}
            />
          </div>
          {budgetUtilization > 100 && (
            <p className="text-xs text-red-600 mt-2 flex items-center gap-1">
              <AlertTriangle className="h-3 w-3" />
              Over budget by {formatCurrency(Math.abs(remainingBudget))}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Charts */}
      {expenses.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ExpenseCategoryChart expenses={expenses} />
          <ExpenseTrendChart expenses={expenses} />
        </div>
      )}

      {/* Expense List */}
      <ExpenseList expenses={expenses} onDelete={handleDeleteExpense} />
    </div>
  );
}
