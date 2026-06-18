"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import type { Payload } from "recharts/types/component/DefaultTooltipContent";
import { EXPENSE_CATEGORY_OPTIONS } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";
import type { Expense } from "@/lib/types";

interface ExpenseCategoryChartProps {
  expenses: Expense[];
}

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Payload[];
}) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div
        style={{
          backgroundColor: "#fff",
          border: "1px solid #E2E8F0",
          borderRadius: "8px",
          padding: "8px 12px",
        }}
      >
        <p style={{ color: "#64748B", fontSize: "13px", margin: 0 }}>
          {data.name}:{" "}
          <span style={{ fontWeight: 600, color: "#0F172A" }}>
            {formatCurrency(data.value as number)}
          </span>
        </p>
      </div>
    );
  }
  return null;
};

export function ExpenseCategoryChart({ expenses }: ExpenseCategoryChartProps) {
  // Group expenses by category
  const categoryTotals = expenses.reduce(
    (acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    },
    {} as Record<string, number>,
  );

  const chartData = Object.entries(categoryTotals).map(
    ([category, amount]) => ({
      name: EXPENSE_CATEGORY_OPTIONS[
        category as keyof typeof EXPENSE_CATEGORY_OPTIONS
      ].label,
      value: amount,
      color:
        EXPENSE_CATEGORY_OPTIONS[
          category as keyof typeof EXPENSE_CATEGORY_OPTIONS
        ].color,
    }),
  );

  if (chartData.length === 0) {
    return null;
  }

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-slate-900">
          Expense Breakdown
        </h3>
        <p className="text-sm text-slate-500">Spending by category</p>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={4}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  strokeWidth={0}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend iconType="circle" wrapperStyle={{ paddingTop: "16px" }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
