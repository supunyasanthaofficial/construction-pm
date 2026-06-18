import { mockProjects } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { PROJECT_STATUS_OPTIONS } from "@/lib/constants";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function RecentProjects() {
  const recentProjects = mockProjects.slice(0, 4);

  return (
    <div className="rounded-xl border bg-white shadow-sm">
      <div className="flex items-center justify-between p-6 pb-4">
        <div>
          <h3 className="text-base font-semibold text-slate-900">
            Recent Projects
          </h3>
          <p className="text-sm text-slate-500">Latest project updates</p>
        </div>
        <Link
          href="/projects"
          className="text-sm font-medium text-orange-600 hover:text-orange-700 flex items-center gap-1"
        >
          View all
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
      <div className="divide-y">
        {recentProjects.map((project) => {
          const status = PROJECT_STATUS_OPTIONS[project.status];
          return (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-slate-900 truncate">
                    {project.name}
                  </p>
                  <Badge
                    variant="outline"
                    className={`text-xs ${status.color}`}
                  >
                    {status.label}
                  </Badge>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  {project.clientName} · {formatDate(project.startDate)}
                </p>
              </div>
              <div className="text-right ml-4">
                <p className="text-sm font-semibold text-slate-900">
                  {formatCurrency(project.budget)}
                </p>
                <div className="mt-1.5 w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-orange-500 rounded-full transition-all"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
