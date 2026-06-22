"use client";

import { mockProjects, mockExpenses } from "@/lib/mock-data";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { formatCurrency } from "@/lib/utils";
import {
  EXPENSE_CATEGORY_OPTIONS,
  PROJECT_STATUS_OPTIONS,
} from "@/lib/constants";
import { Printer } from "lucide-react";
import { printReport } from "@/lib/utils";

const COLORS = ["#F97316", "#3B82F6", "#8B5CF6", "#EC4899", "#14B8A6"];

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
      <div className="bg-white border rounded p-2 text-sm">
        <p className="font-medium">{label}</p>
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

export default function GlobalReportsPage() {
  // Project status distribution
  const statusCounts = mockProjects.reduce(
    (acc, p) => {
      acc[p.status] = (acc[p.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );
  const statusPieData = Object.entries(PROJECT_STATUS_OPTIONS)
    .map(([key, { label }]) => ({
      name: label,
      value: statusCounts[key] || 0,
    }))
    .filter((d) => d.value > 0);

  const budgetData = mockProjects.map((p) => ({
    name: p.name.length > 15 ? p.name.slice(0, 15) + "..." : p.name,
    Budget: p.budget,
    Spent: p.totalExpenses,
  }));

  const allExpenses = mockExpenses;
  const globalCategory = allExpenses.reduce(
    (acc, e) => {
      acc[e.category] = (acc[e.category] || 0) + e.amount;
      return acc;
    },
    {} as Record<string, number>,
  );
  const globalPieData = Object.entries(globalCategory).map(([cat, amt]) => ({
    name:
      EXPENSE_CATEGORY_OPTIONS[cat as keyof typeof EXPENSE_CATEGORY_OPTIONS]
        ?.label || cat,
    value: amt,
  }));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Global Reports"
        description="Overall analytics across all projects."
      >
        <Button onClick={printReport} variant="outline" size="sm">
          <Printer className="h-4 w-4 mr-2" />
          Print Report
        </Button>
      </PageHeader>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              Project Status Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusPieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={90}
                    dataKey="value"
                  >
                    {statusPieData.map((_, idx) => (
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

        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              Overall Category Spending
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={globalPieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={90}
                    dataKey="value"
                  >
                    {globalPieData.map((_, idx) => (
                      <Cell
                        key={idx}
                        fill={COLORS[(idx + 1) % COLORS.length]}
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
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            Budget vs Spent by Project
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={budgetData} margin={{ left: 20, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="name"
                  angle={-20}
                  textAnchor="end"
                  height={80}
                  tick={{ fontSize: 12 }}
                />
                <YAxis tickFormatter={(v) => `${(v / 1000000).toFixed(0)}M`} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="Budget" fill="#F97316" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Spent" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
