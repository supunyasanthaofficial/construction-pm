"use client";

import { useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { ExpenseBarChart } from "@/components/features/expense-bar-chart";
import { BudgetPieChart } from "@/components/features/budget-pie-chart";
import { ProjectProgressChart } from "@/components/features/project-progress-chart";
import { RecentProjects } from "@/components/features/recent-projects";
import { UpcomingDeadlines } from "@/components/features/upcoming-deadlines";
import {
  FolderKanban,
  DollarSign,
  HardHat,
  Package,
  TrendingUp,
  AlertTriangle,
  ShieldCheck,
  Truck,
  Plus,
  FileSpreadsheet,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const liveSiteFeed = [
  {
    id: "1",
    title: "Ready-Mix Concrete Batch Dispatched",
    location: "Colombo City Centre Tower - Floor 18 Slab",
    time: "15m ago",
    type: "logistics",
    icon: Truck,
    iconColor: "text-blue-600 bg-blue-50",
  },
  {
    id: "2",
    title: "Daily Safety Inspection Signed Off",
    location: "Kandy Hills Residences (Zero Hazards)",
    time: "1h ago",
    type: "safety",
    icon: ShieldCheck,
    iconColor: "text-emerald-600 bg-emerald-50",
  },
  {
    id: "3",
    title: "Overtime Approved for Rebar Team",
    location: "Galle Marina Hotel (8 workers • +2 hrs)",
    time: "2h ago",
    type: "workers",
    icon: HardHat,
    iconColor: "text-orange-600 bg-orange-50",
  },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "financials" | "site_ops">("overview");

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 p-6 sm:p-8 text-white shadow-xl">
        {/* Background accent glow */}
        <div className="absolute right-0 top-0 -mt-8 -mr-8 h-64 w-64 rounded-full bg-orange-500/15 blur-3xl pointer-events-none" />
        <div className="absolute left-1/3 bottom-0 -mb-8 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-500/20 px-3 py-0.5 text-xs font-bold text-orange-400 border border-orange-500/30">
                <Sparkles className="h-3.5 w-3.5" /> Site Operations Pulse
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-800 px-3 py-0.5 text-xs font-semibold text-slate-300 border border-slate-700">
                <Calendar className="h-3 w-3 text-slate-400" />
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Welcome back, David 👋
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
              All 4 active construction sites are operational. Portfolio budget burn is currently at <span className="font-semibold text-emerald-400">66.9%</span> with zero recorded safety incidents this month.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link href="/projects/new">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs h-10 px-4 rounded-xl shadow-md shadow-orange-500/20 gap-2">
                <Plus className="h-4 w-4" />
                New Project
              </Button>
            </Link>
            <Link href="/reports">
              <Button
                variant="outline"
                className="border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white font-semibold text-xs h-10 px-4 rounded-xl gap-2 backdrop-blur-sm"
              >
                <FileSpreadsheet className="h-4 w-4 text-orange-400" />
                Portfolio Report
              </Button>
            </Link>
          </div>
        </div>

        {/* Quick telemetry pills inside hero */}
        <div className="relative z-10 mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-slate-800/80 pt-5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Safety Index</p>
              <p className="text-sm font-bold text-white">100% Compliant</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30">
              <HardHat className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Daily Attendance</p>
              <p className="text-sm font-bold text-white">94.2% Present</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/20 text-purple-400 border border-purple-500/30">
              <Clock className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Schedule Health</p>
              <p className="text-sm font-bold text-white">8/12 On Schedule</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/20 text-orange-400 border border-orange-500/30">
              <Truck className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Deliveries Today</p>
              <p className="text-sm font-bold text-white">3 In Transit</p>
            </div>
          </div>
        </div>
      </div>

      {/* Top 4 Elevated Stat KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Active Projects"
          value="12"
          description="7 in progress, 3 planning, 2 hold"
          icon={FolderKanban}
          iconColor="orange"
          trend={{ value: 8, isPositive: true, period: "vs last month" }}
          progress={{ value: 58, label: "Portfolio completion" }}
        />
        <StatCard
          title="Total Budget Allocated"
          value="Rs 62.5M"
          description="Rs 41.8M spent (66.9% utilized)"
          icon={DollarSign}
          iconColor="blue"
          trend={{ value: 12, isPositive: true, period: "YTD allocation" }}
          progress={{ value: 67, label: "Budget utilized" }}
        />
        <StatCard
          title="Workers On-Site"
          value="248"
          description="Across 8 active construction zones"
          icon={HardHat}
          iconColor="purple"
          trend={{ value: 5, isPositive: true, period: "vs yesterday" }}
          progress={{ value: 94, label: "Attendance rate" }}
        />
        <StatCard
          title="Materials & Supplies"
          value="1,240"
          description="5 low stock items need reorder"
          icon={Package}
          iconColor="amber"
          trend={{ value: 3, isPositive: false, period: "depletion rate" }}
          progress={{ value: 78, label: "Warehouse capacity" }}
        />
      </div>

      {/* Primary Visual Analytics Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ExpenseBarChart />
        </div>
        <div>
          <BudgetPieChart />
        </div>
      </div>

      {/* Secondary Project Health & Milestones Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ProjectProgressChart />
        </div>
        <div>
          <UpcomingDeadlines />
        </div>
      </div>

      {/* Recent Projects Showcase */}
      <RecentProjects />

      {/* Operational Highlights & Real-Time Site Feed Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left 2 Cols: Site Pulse Badges */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-emerald-200/80 bg-gradient-to-br from-emerald-50/70 to-emerald-100/30 p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-700">
                <TrendingUp className="h-5 w-5" />
              </div>
              <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[11px] font-bold text-emerald-800">
                8 Active
              </span>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-black text-emerald-950">8 Projects</p>
              <p className="text-xs font-semibold text-emerald-700 mt-0.5">
                On Schedule & Target
              </p>
              <p className="text-[11px] text-emerald-600/80 mt-1">
                Zero structural delays logged this week
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-amber-200/80 bg-gradient-to-br from-amber-50/70 to-amber-100/30 p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/15 text-amber-700">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-[11px] font-bold text-amber-800">
                3 Sites
              </span>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-black text-amber-950">3 Warnings</p>
              <p className="text-xs font-semibold text-amber-700 mt-0.5">
                Budget Variance Flags
              </p>
              <p className="text-[11px] text-amber-600/80 mt-1">
                Approaching 80% ceiling on Galle Marina
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-sky-200/80 bg-gradient-to-br from-sky-50/70 to-sky-100/30 p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/15 text-sky-700">
                <Package className="h-5 w-5" />
              </div>
              <span className="rounded-full bg-sky-500/20 px-2 py-0.5 text-[11px] font-bold text-sky-800">
                5 Items
              </span>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-black text-sky-950">5 Materials</p>
              <p className="text-xs font-semibold text-sky-700 mt-0.5">
                Low Stock Warning
              </p>
              <p className="text-[11px] text-sky-600/80 mt-1">
                Automatic PO created for Tokyo Cement
              </p>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Live Site Activity Dispatch */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between mb-3.5">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-orange-500/10 text-orange-600">
                <Truck className="h-3.5 w-3.5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                Live Site Activity Log
              </h3>
            </div>
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>

          <div className="space-y-3">
            {liveSiteFeed.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className="flex items-start gap-2.5 rounded-xl border border-slate-100 bg-slate-50/50 p-2.5 transition-colors hover:bg-slate-50"
                >
                  <div
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${item.iconColor}`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-slate-800 truncate">
                        {item.title}
                      </p>
                      <span className="text-[10px] text-slate-400 font-medium">
                        {item.time}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">
                      {item.location}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
