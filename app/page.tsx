import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { ExpenseBarChart } from "../components/features/expense-bar-chart";
import { BudgetPieChart } from "../components/features/budget-pie-chart";
import { ProjectProgressChart } from "../components/features/project-progress-chart";
import { RecentProjects } from "../components/features/recent-projects";
import { UpcomingDeadlines } from "../components/features/upcoming-deadlines";
import {
  FolderKanban,
  DollarSign,
  HardHat,
  Package,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Welcome back, David! Here's your project overview for today."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Active Projects"
          value="12"
          description="3 in planning, 7 active, 2 on hold"
          icon={FolderKanban}
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="Total Budget"
          value="Rs 62.5M"
          description="Across all active projects"
          icon={DollarSign}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Workers On-site"
          value="248"
          description="Across 8 active sites"
          icon={HardHat}
          trend={{ value: 5, isPositive: true }}
        />
        <StatCard
          title="Materials Stock"
          value="1,240"
          description="Units across warehouses"
          icon={Package}
          trend={{ value: 3, isPositive: false }}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ExpenseBarChart />
        </div>
        <BudgetPieChart />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ProjectProgressChart />
        </div>
        <div className="space-y-6">
          <UpcomingDeadlines />
        </div>
      </div>

      <RecentProjects />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border bg-emerald-50 p-4 flex items-center gap-3">
          <TrendingUp className="h-5 w-5 text-emerald-600" />
          <div>
            <p className="text-sm font-medium text-emerald-900">
              On Track Projects
            </p>
            <p className="text-2xl font-bold text-emerald-700">8</p>
          </div>
        </div>
        <div className="rounded-xl border bg-amber-50 p-4 flex items-center gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-600" />
          <div>
            <p className="text-sm font-medium text-amber-900">Budget Alerts</p>
            <p className="text-2xl font-bold text-amber-700">3</p>
          </div>
        </div>
        <div className="rounded-xl border bg-blue-50 p-4 flex items-center gap-3">
          <Package className="h-5 w-5 text-blue-600" />
          <div>
            <p className="text-sm font-medium text-blue-900">Low Stock Items</p>
            <p className="text-2xl font-bold text-blue-700">5</p>
          </div>
        </div>
      </div>
    </div>
  );
}
