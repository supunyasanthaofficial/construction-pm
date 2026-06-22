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
  PieChart,
  Pie,
  Cell,
} from "recharts";
import type { Payload } from "recharts/types/component/DefaultTooltipContent";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  EXPENSE_CATEGORY_OPTIONS,
  ATTENDANCE_STATUS_OPTIONS,
} from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";
import type {
  Project,
  Expense,
  Material,
  Attendance,
  Worker,
} from "@/lib/types";

const COLORS = [
  "#F97316",
  "#3B82F6",
  "#8B5CF6",
  "#EC4899",
  "#14B8A6",
  "#64748B",
];

// Custom Tooltip for charts
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
      <div className="bg-white border border-slate-200 rounded-lg p-2 shadow text-sm">
        <p className="font-medium text-slate-700">{label}</p>
        {payload.map((entry, idx) => (
          <p key={idx} style={{ color: entry.color }}>
            {entry.name}:{" "}
            {typeof entry.value === "number"
              ? formatCurrency(entry.value)
              : entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

interface ProjectReportChartsProps {
  project: Project;
  expenses: Expense[];
  materials: Material[];
  attendance: Attendance[];
  workers: Worker[];
}

export function ProjectReportCharts({
  project,
  expenses,
  materials,
  attendance,
}: ProjectReportChartsProps) {
  //  Budget vs Actual
  const budgetVsActual = [
    { name: "Budget", amount: project.budget },
    { name: "Spent", amount: project.totalExpenses },
    {
      name: "Remaining",
      amount: Math.max(0, project.budget - project.totalExpenses),
    },
  ];

  //  Expenses by category
  const categoryTotals = expenses.reduce(
    (acc, e) => {
      acc[e.category] = (acc[e.category] || 0) + e.amount;
      return acc;
    },
    {} as Record<string, number>,
  );
  const expensePieData = Object.entries(categoryTotals).map(([cat, amt]) => ({
    name:
      EXPENSE_CATEGORY_OPTIONS[cat as keyof typeof EXPENSE_CATEGORY_OPTIONS]
        ?.label || cat,
    value: amt,
  }));

  //  Material consumption (top 5 by used cost)
  const materialData = materials
    .map((m) => ({
      name: m.name,
      usedCost: m.quantityUsed * m.unitCost,
    }))
    .sort((a, b) => b.usedCost - a.usedCost)
    .slice(0, 6);

  //  Attendance summary
  const statusCounts = attendance.reduce(
    (acc, rec) => {
      acc[rec.status] = (acc[rec.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );
  const attendancePieData = Object.entries(ATTENDANCE_STATUS_OPTIONS)
    .map(([key, { label }]) => ({
      name: label,
      value: statusCounts[key] || 0,
    }))
    .filter((d) => d.value > 0);

  return (
    <div className="space-y-6 print:space-y-4">
      {/* Budget vs Actual */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Budget vs Actual</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={budgetVsActual}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis
                  tickFormatter={(v) => `${(v / 1000000).toFixed(0)}M`}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="amount"
                  fill="#F97316"
                  radius={[4, 4, 0, 0]}
                  name="Amount"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Expense Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Expense Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={expensePieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={90}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {expensePieData.map((_, idx) => (
                      <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Material Consumption */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              Material Used Cost (Top)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={materialData}
                  layout="vertical"
                  margin={{ left: 60 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis
                    type="number"
                    tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                  />
                  <YAxis
                    dataKey="name"
                    type="category"
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    dataKey="usedCost"
                    fill="#8B5CF6"
                    radius={[0, 4, 4, 0]}
                    name="Cost"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Attendance Distribution */}
      {attendancePieData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Attendance Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={attendancePieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={90}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {attendancePieData.map((_, idx) => (
                      <Cell
                        key={idx}
                        fill={COLORS[(idx + 2) % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
