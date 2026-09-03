"use client";

import { useState } from "react";
import { projectProgressData } from "@/lib/mock-data";
import { Activity, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import Link from "next/link";

export function ProjectProgressChart() {
  const [viewMode, setViewMode] = useState<"progress" | "budget">("progress");

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs transition-all hover:shadow-md">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-500/10 text-orange-600">
              <Activity className="h-4 w-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Project Execution & Health
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Physical progress vs financial capital consumption
          </p>
        </div>

        {/* View toggle */}
        <div className="flex rounded-lg border border-slate-200 bg-slate-50 p-0.5 text-xs font-medium self-start sm:self-auto">
          <button
            onClick={() => setViewMode("progress")}
            className={`rounded-md px-3 py-1 transition-all ${
              viewMode === "progress"
                ? "bg-white text-slate-900 shadow-xs font-semibold"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            Physical Progress
          </button>
          <button
            onClick={() => setViewMode("budget")}
            className={`rounded-md px-3 py-1 transition-all ${
              viewMode === "budget"
                ? "bg-white text-slate-900 shadow-xs font-semibold"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            Budget Burn Rate
          </button>
        </div>
      </div>

      {/* Progress Cards List */}
      <div className="space-y-4">
        {projectProgressData.map((project, idx) => {
          const budgetBurnPercent = Math.round(
            (project.spent / project.budget) * 100
          );
          const isCompleted = project.progress === 100;
          const isAtRisk = budgetBurnPercent > project.progress + 15;

          return (
            <div
              key={idx}
              className="group rounded-xl border border-slate-100 bg-slate-50/40 p-3.5 transition-all hover:border-slate-200 hover:bg-slate-50"
            >
              <div className="flex items-center justify-between gap-4 mb-2">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                      isCompleted
                        ? "bg-emerald-100 text-emerald-700"
                        : isAtRisk
                        ? "bg-amber-100 text-amber-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    ) : isAtRisk ? (
                      <AlertCircle className="h-3.5 w-3.5" />
                    ) : (
                      <Clock className="h-3.5 w-3.5" />
                    )}
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-slate-900 group-hover:text-orange-600 transition-colors">
                      {project.name}
                    </span>
                    <span className="text-[11px] text-slate-400 ml-2 hidden sm:inline">
                      Budget: Rs {(project.budget / 1000).toFixed(1)}B
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-700">
                    {viewMode === "progress"
                      ? `${project.progress}% completed`
                      : `${budgetBurnPercent}% spent (Rs ${project.spent}M)`}
                  </span>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                      isCompleted
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : isAtRisk
                        ? "bg-amber-50 text-amber-700 border-amber-200"
                        : "bg-sky-50 text-sky-700 border-sky-200"
                    }`}
                  >
                    {isCompleted
                      ? "Handed Over"
                      : isAtRisk
                      ? "Budget Warning"
                      : "On Track"}
                  </span>
                </div>
              </div>

              {/* Progress track */}
              <div className="relative h-2 w-full overflow-hidden rounded-full bg-slate-200/70">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    isCompleted
                      ? "bg-emerald-500"
                      : viewMode === "budget" && isAtRisk
                      ? "bg-amber-500"
                      : "bg-gradient-to-r from-orange-500 to-amber-500"
                  }`}
                  style={{
                    width: `${
                      viewMode === "progress"
                        ? project.progress
                        : Math.min(budgetBurnPercent, 100)
                    }%`,
                  }}
                />
              </div>

              {/* Bottom sub-metrics */}
              <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
                <span>Phase: Structural Works & Fitout</span>
                <span>
                  {project.spent}M spent of {project.budget}M
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-500">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-emerald-500" /> 1 Handed Over
          •
          <span className="h-2 w-2 rounded-full bg-orange-500" /> 3 In Progress
          •
          <span className="h-2 w-2 rounded-full bg-amber-500" /> 1 Budget Review
        </span>
        <Link
          href="/projects"
          className="font-semibold text-orange-600 hover:text-orange-700 hover:underline"
        >
          View detailed Gantt chart →
        </Link>
      </div>
    </div>
  );
}
