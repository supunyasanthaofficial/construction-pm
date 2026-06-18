"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type { Payload } from "recharts/types/component/DefaultTooltipContent";
import { monthlyExpenses } from "@/lib/mock-data";

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
          padding: "12px",
          boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
        }}
      >
        <p style={{ fontWeight: 600, color: "#0F172A", marginBottom: "8px" }}>
          {label}
        </p>
        {payload.map((entry, index) => (
          <p
            key={index}
            style={{ color: "#64748B", fontSize: "13px", margin: "2px 0" }}
          >
            <span style={{ color: entry.color, fontWeight: 600 }}>●</span>{" "}
            {entry.name}:{" "}
            <span style={{ fontWeight: 500, color: "#334155" }}>
              Rs {entry.value}M
            </span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function ExpenseBarChart() {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-slate-900">
          Monthly Expenses
        </h3>
        <p className="text-sm text-slate-500">
          Breakdown by category (LKR Millions)
        </p>
      </div>
      <div className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={monthlyExpenses} barGap={0} barCategoryGap="20%">
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
              tickFormatter={(value) => `${value}M`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend iconType="circle" wrapperStyle={{ paddingTop: "16px" }} />
            <Bar
              dataKey="materials"
              name="Materials"
              fill="#F97316"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="labor"
              name="Labor"
              fill="#3B82F6"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="equipment"
              name="Equipment"
              fill="#8B5CF6"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="subcontractor"
              name="Subcontractor"
              fill="#EC4899"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
