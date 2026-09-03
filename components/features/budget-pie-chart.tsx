"use client";

import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import type { Payload } from "recharts/types/component/DefaultTooltipContent";
import { budgetBreakdown } from "@/lib/mock-data";
import { PieChart as PieIcon, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Payload[];
}) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    const totalBudgetLKR = 2.5; // in Billions
    const amountVal = ((data.value as number) * totalBudgetLKR) / 100;

    return (
      <div className="rounded-xl border border-slate-200 bg-white/95 p-3 shadow-xl backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: data.payload?.fill || "#f97316" }}
          />
          <p className="font-semibold text-slate-900 text-xs">{data.name}</p>
        </div>
        <p className="mt-1 text-xs text-slate-500 font-medium">
          Allocation:{" "}
          <span className="font-bold text-slate-800">{data.value}%</span> (Rs {amountVal.toFixed(2)}B)
        </p>
      </div>
    );
  }
  return null;
};

export function BudgetPieChart() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const totalBudgetBillion = 2.5;

  return (
    <div className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs transition-all hover:shadow-md">
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-500/10 text-orange-600">
              <PieIcon className="h-4 w-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Budget Allocation
            </h3>
          </div>
          <Link
            href="/projects"
            className="text-xs font-semibold text-orange-600 hover:text-orange-700 flex items-center gap-0.5"
          >
            Details <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>
        <p className="text-xs text-slate-500 mb-4">
          Capital deployment breakdown across portfolio
        </p>

        {/* Donut Chart with Centered Metric */}
        <div className="relative h-[220px] w-full min-w-0">
          <ResponsiveContainer width="100%" height="100%" minWidth={0}>
            <PieChart>
              <Pie
                data={budgetBreakdown}
                cx="50%"
                cy="50%"
                innerRadius={64}
                outerRadius={92}
                paddingAngle={4}
                dataKey="value"
                onMouseEnter={(_, index) => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                {budgetBreakdown.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    stroke="#ffffff"
                    strokeWidth={2}
                    className="transition-all duration-300 cursor-pointer outline-none"
                    style={{
                      transform: activeIndex === index ? "scale(1.04)" : "scale(1)",
                      transformOrigin: "center center",
                    }}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>

          {/* Centered Total Label */}
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Total Budget
            </span>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              Rs {totalBudgetBillion}B
            </span>
            <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-1.5 py-0.2 rounded mt-0.5">
              4 Active Sites
            </span>
          </div>
        </div>
      </div>

      {/* Categorized Breakdown Progress Cards */}
      <div className="mt-4 space-y-2.5 border-t border-slate-100 pt-4">
        {budgetBreakdown.map((entry, idx) => {
          const amount = (entry.value * totalBudgetBillion) / 100;
          return (
            <div
              key={entry.name}
              onMouseEnter={() => setActiveIndex(idx)}
              onMouseLeave={() => setActiveIndex(null)}
              className={`rounded-xl p-2 transition-all cursor-pointer ${
                activeIndex === idx
                  ? "bg-slate-50 scale-[1.01]"
                  : "hover:bg-slate-50/60"
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <div className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="font-semibold text-slate-800">
                    {entry.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-500 font-medium">
                    Rs {amount.toFixed(2)}B
                  </span>
                  <span className="font-bold text-slate-900 w-8 text-right">
                    {entry.value}%
                  </span>
                </div>
              </div>
              <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${entry.value}%`,
                    backgroundColor: entry.color,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
