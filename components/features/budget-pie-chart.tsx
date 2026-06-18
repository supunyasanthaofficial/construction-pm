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
import { budgetBreakdown } from "@/lib/mock-data";

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
          fontSize: "14px",
        }}
      >
        <p style={{ color: "#64748B", margin: 0 }}>
          {data.name}:{" "}
          <span style={{ fontWeight: 600, color: "#0F172A" }}>
            {data.value}%
          </span>
        </p>
      </div>
    );
  }
  return null;
};

export function BudgetPieChart() {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-slate-900">
          Budget Allocation
        </h3>
        <p className="text-sm text-slate-500">Total: Rs 2.5B</p>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={budgetBreakdown}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={4}
              dataKey="value"
            >
              {budgetBreakdown.map((entry, index) => (
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
