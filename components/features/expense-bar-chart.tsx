"use client";

import { useState } from "react";
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
import { DollarSign, Layers } from "lucide-react";

interface CategoryFilter {
  key: string;
  name: string;
  color: string;
  active: boolean;
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
    const total = payload.reduce(
      (sum, entry) => sum + (Number(entry.value) || 0),
      0
    );

    return (
      <div className="rounded-xl border border-slate-200 bg-white/95 p-3.5 shadow-xl backdrop-blur-md min-w-[190px]">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2">
          <p className="font-semibold text-slate-900 text-xs">{label} 2025</p>
          <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md">
            Rs {total.toFixed(1)}M
          </span>
        </div>
        <div className="space-y-1.5">
          {payload.map((entry, index) => (
            <div
              key={index}
              className="flex items-center justify-between text-xs gap-3"
            >
              <div className="flex items-center gap-1.5">
                <span
                  className="h-2 w-2 rounded-full shrink-0"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-slate-600 capitalize font-medium">
                  {entry.name}
                </span>
              </div>
              <span className="font-semibold text-slate-800">
                Rs {entry.value}M
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export function ExpenseBarChart() {
  const [categories, setCategories] = useState<CategoryFilter[]>([
    { key: "materials", name: "Materials", color: "#F97316", active: true },
    { key: "labor", name: "Labor", color: "#3B82F6", active: true },
    { key: "equipment", name: "Equipment", color: "#8B5CF6", active: true },
    { key: "subcontractor", name: "Subcontractor", color: "#EC4899", active: true },
  ]);

  const [timeRange, setTimeRange] = useState<"all" | "h2">("all");

  const filteredData =
    timeRange === "h2" ? monthlyExpenses.slice(5, 11) : monthlyExpenses.slice(0, 11);

  const toggleCategory = (key: string) => {
    setCategories((prev) =>
      prev.map((cat) => (cat.key === key ? { ...cat, active: !cat.active } : cat))
    );
  };

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs transition-all hover:shadow-md">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-500/10 text-orange-600">
              <DollarSign className="h-4 w-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Monthly Expense Distribution
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Category-wise expenditure trends across all active project sites (LKR Millions)
          </p>
        </div>

        {/* Timeframe pill switcher */}
        <div className="flex items-center gap-2">
          <div className="flex rounded-lg border border-slate-200 bg-slate-50/80 p-0.5 text-xs font-medium">
            <button
              onClick={() => setTimeRange("all")}
              className={`rounded-md px-2.5 py-1 transition-all ${
                timeRange === "all"
                  ? "bg-white text-slate-900 shadow-xs font-semibold"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              YTD (11M)
            </button>
            <button
              onClick={() => setTimeRange("h2")}
              className={`rounded-md px-2.5 py-1 transition-all ${
                timeRange === "h2"
                  ? "bg-white text-slate-900 shadow-xs font-semibold"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Last 6 Months
            </button>
          </div>
        </div>
      </div>

      {/* Category toggle pills */}
      <div className="flex flex-wrap items-center gap-2 mb-5">
        <span className="text-xs font-medium text-slate-400 flex items-center gap-1 mr-1">
          <Layers className="h-3.5 w-3.5" /> Filter:
        </span>
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => toggleCategory(cat.key)}
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium transition-all ${
              cat.active
                ? "bg-slate-100 text-slate-800 border border-slate-300 shadow-xs"
                : "bg-transparent text-slate-400 border border-dashed border-slate-200 opacity-60 hover:opacity-100"
            }`}
          >
            <span
              className="h-2 w-2 rounded-full shrink-0"
              style={{
                backgroundColor: cat.active ? cat.color : "#94A3B8",
              }}
            />
            {cat.name}
          </button>
        ))}
      </div>

      {/* Recharts container with minWidth={0} */}
      <div className="h-[320px] w-full min-w-0">
        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
          <BarChart
            data={filteredData}
            barGap={2}
            barCategoryGap="18%"
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#F1F5F9"
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748B", fontSize: 11, fontWeight: 500 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748B", fontSize: 11 }}
              tickFormatter={(value) => `${value}M`}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "rgba(241, 245, 249, 0.6)" }}
            />
            {categories
              .filter((c) => c.active)
              .map((cat) => (
                <Bar
                  key={cat.key}
                  dataKey={cat.key}
                  name={cat.name}
                  fill={cat.color}
                  radius={[4, 4, 0, 0]}
                  maxBarSize={32}
                />
              ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Chart Footer summary chips */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-slate-100 pt-4 text-center">
        <div className="rounded-lg bg-slate-50 p-2.5">
          <p className="text-[11px] text-slate-500 font-medium">Materials Total</p>
          <p className="text-sm font-bold text-orange-600">Rs 287.0M</p>
        </div>
        <div className="rounded-lg bg-slate-50 p-2.5">
          <p className="text-[11px] text-slate-500 font-medium">Labor Total</p>
          <p className="text-sm font-bold text-blue-600">Rs 184.0M</p>
        </div>
        <div className="rounded-lg bg-slate-50 p-2.5">
          <p className="text-[11px] text-slate-500 font-medium">Equipment</p>
          <p className="text-sm font-bold text-purple-600">Rs 115.0M</p>
        </div>
        <div className="rounded-lg bg-slate-50 p-2.5">
          <p className="text-[11px] text-slate-500 font-medium">Subcontracts</p>
          <p className="text-sm font-bold text-pink-600">Rs 158.0M</p>
        </div>
      </div>
    </div>
  );
}
