"use client";

import { useState } from "react";
import { mockProjects } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";
import { StatusBadge } from "@/components/shared/status-badge";
import {
  Building2,
  MapPin,
  ArrowUpRight,
  Search,
  Filter,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function RecentProjects() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filteredProjects = mockProjects.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" ? true : p.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white shadow-xs transition-all hover:shadow-md">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-slate-100 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-500/10 text-orange-600">
              <Building2 className="h-4 w-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Active Project Portfolio
            </h3>
            <span className="rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-bold text-orange-700">
              {mockProjects.length} Projects
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time status, budget utilization, and progress tracking across all sites
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative w-full sm:w-60">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Filter by name, client, site..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-9 pl-8 text-xs bg-slate-50/70 border-slate-200 focus-visible:ring-orange-500 rounded-lg"
            />
          </div>

          <div className="flex items-center rounded-lg border border-slate-200 bg-slate-50/70 p-0.5 text-xs font-medium">
            <button
              onClick={() => setFilterStatus("all")}
              className={`rounded-md px-2.5 py-1 transition-all ${
                filterStatus === "all"
                  ? "bg-white text-slate-900 shadow-xs font-semibold"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterStatus("active")}
              className={`rounded-md px-2.5 py-1 transition-all ${
                filterStatus === "active"
                  ? "bg-white text-slate-900 shadow-xs font-semibold"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setFilterStatus("planning")}
              className={`rounded-md px-2.5 py-1 transition-all ${
                filterStatus === "planning"
                  ? "bg-white text-slate-900 shadow-xs font-semibold"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Planning
            </button>
          </div>

          <Link href="/projects/new">
            <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white text-xs h-9 font-semibold gap-1 rounded-lg">
              + New Project
            </Button>
          </Link>
        </div>
      </div>

      {/* Projects Table / List */}
      <div className="divide-y divide-slate-100 overflow-x-auto">
        {filteredProjects.length === 0 ? (
          <div className="py-12 text-center text-slate-500 text-sm">
            No projects match your filter criteria.
          </div>
        ) : (
          filteredProjects.map((project) => {
            const utilization = Math.round(
              (project.totalExpenses / project.budget) * 100
            );

            return (
              <div
                key={project.id}
                className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4.5 hover:bg-slate-50/80 transition-colors"
              >
                {/* Project Info */}
                <div className="flex items-start gap-3.5 min-w-[280px]">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 text-slate-700 font-bold text-sm border border-slate-300/60 group-hover:from-orange-50 group-hover:to-orange-100 group-hover:text-orange-600 group-hover:border-orange-200 transition-all">
                    {project.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/projects/${project.id}`}
                        className="text-sm font-bold text-slate-900 hover:text-orange-600 transition-colors"
                      >
                        {project.name}
                      </Link>
                      <StatusBadge status={project.status} />
                    </div>
                    <div className="flex items-center gap-2.5 text-xs text-slate-500 mt-1">
                      <span className="font-medium text-slate-700">
                        {project.clientName}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-slate-400" />
                        {project.location}
                      </span>
                      <span>•</span>
                      <span>Target: {formatDate(project.endDate)}</span>
                    </div>
                  </div>
                </div>

                {/* Progress & Utilization */}
                <div className="flex flex-wrap items-center gap-6 sm:gap-8">
                  {/* Progress Meter */}
                  <div className="w-36 space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Progress</span>
                      <span className="font-bold text-slate-800">
                        {project.progress}%
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          project.progress === 100
                            ? "bg-emerald-500"
                            : project.progress >= 50
                            ? "bg-orange-500"
                            : "bg-sky-500"
                        }`}
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Budget & Spend */}
                  <div className="text-right min-w-[130px]">
                    <p className="text-xs text-slate-400">Budget / Spent</p>
                    <p className="text-sm font-bold text-slate-900">
                      {formatCurrency(project.budget)}
                    </p>
                    <p className="text-xs font-medium text-slate-500">
                      {formatCurrency(project.totalExpenses)}{" "}
                      <span
                        className={`font-semibold ${
                          utilization > 90
                            ? "text-red-600"
                            : utilization > 75
                            ? "text-amber-600"
                            : "text-emerald-600"
                        }`}
                      >
                        ({utilization}%)
                      </span>
                    </p>
                  </div>

                  {/* Action Link */}
                  <Link href={`/projects/${project.id}`}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-2.5 text-xs text-slate-600 hover:text-orange-600 hover:bg-orange-50 font-semibold gap-1"
                    >
                      Manage
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer view all link */}
      <div className="flex items-center justify-between border-t border-slate-100 px-6 py-3.5 bg-slate-50/50 rounded-b-2xl">
        <span className="text-xs text-slate-500">
          Showing {filteredProjects.length} of {mockProjects.length} projects
        </span>
        <Link
          href="/projects"
          className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1"
        >
          View Full Project Directory
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
