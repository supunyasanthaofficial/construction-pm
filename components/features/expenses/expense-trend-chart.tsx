"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { Payload } from "recharts/types/component/DefaultTooltipContent";
import { formatCurrency } from "@/lib/utils";
import type { Expense } from "@/lib/types";

interface ExpenseTrendChartProps {
  expenses: Expense[];
}

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Payload[];
  label?: string;
}) => {
  if (active && payload && payload.length) {
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
          {label}:{" "}
          <span style={{ fontWeight: 600, color: "#F97316" }}>
            {formatCurrency(payload[0].value as number)}
          </span>
        </p>
      </div>
    );
  }
  return null;
};

export function ExpenseTrendChart({ expenses }: ExpenseTrendChartProps) {
  // Group expenses by month
  const monthlyData = expenses.reduce(
    (acc, expense) => {
      const date = new Date(expense.date);
      const monthKey = date.toLocaleString("en-US", {
        month: "short",
        year: "2-digit",
      });
      acc[monthKey] = (acc[monthKey] || 0) + expense.amount;
      return acc;
    },
    {} as Record<string, number>,
  );

  const chartData = Object.entries(monthlyData)
    .map(([month, amount]) => ({ month, amount }))
    .sort((a, b) => {
      // Sort by date
      const [aMonth, aYear] = a.month.split(" ");
      const [bMonth, bYear] = b.month.split(" ");
      return (
        new Date(`${aMonth} 20${aYear}`).getTime() -
        new Date(`${bMonth} 20${bYear}`).getTime()
      );
    });

  if (chartData.length === 0) {
    return null;
  }

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-slate-900">
          Monthly Trend
        </h3>
        <p className="text-sm text-slate-500">Expense pattern over time</p>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#E2E8F0"
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94A3B8", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94A3B8", fontSize: 12 }}
              tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="amount" fill="#F97316" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
