import { mockProjects } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";
import { Calendar, Clock, AlertTriangle, CheckCircle2, ChevronRight } from "lucide-react";
import Link from "next/link";

export function UpcomingDeadlines() {
  const deadlines = mockProjects
    .filter((p) => p.status === "active" || p.status === "planning")
    .sort(
      (a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime()
    )
    .slice(0, 4);

  const getDaysRemaining = (endDate: string) => {
    const now = new Date();
    const end = new Date(endDate);
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs transition-all hover:shadow-md">
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-500/10 text-red-600">
              <Clock className="h-4 w-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Critical Milestones
            </h3>
          </div>
          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
            {deadlines.length} Active
          </span>
        </div>
        <p className="text-xs text-slate-500 mb-4">
          Key handover target dates and inspection deadlines
        </p>

        <div className="space-y-3">
          {deadlines.map((project) => {
            const daysRemaining = getDaysRemaining(project.endDate);
            const isUrgent = daysRemaining > 0 && daysRemaining <= 45;
            const isOverdue = daysRemaining < 0;

            return (
              <Link
                key={project.id}
                href={`/projects/${project.id}`}
                className="group block rounded-xl border border-slate-100 bg-slate-50/50 p-3.5 transition-all hover:bg-slate-50 hover:border-slate-200 hover:shadow-xs"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-slate-900 truncate group-hover:text-orange-600 transition-colors">
                      {project.name}
                    </p>
                    <p className="text-xs text-slate-500 truncate mt-0.5">
                      Client: {project.clientName}
                    </p>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold shrink-0 ${
                      isOverdue
                        ? "bg-red-100 text-red-700"
                        : isUrgent
                        ? "bg-amber-100 text-amber-700 animate-pulse"
                        : "bg-emerald-100 text-emerald-700"
                    }`}
                  >
                    {isUrgent && <AlertTriangle className="h-3 w-3" />}
                    {isOverdue
                      ? "Overdue"
                      : `${Math.abs(daysRemaining)}d left`}
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-between border-t border-slate-200/50 pt-2 text-[11px] text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-slate-400" />
                    <span>Target: {formatDate(project.endDate)}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-16 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-orange-500 rounded-full"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                    <span className="font-semibold text-slate-700">
                      {project.progress}%
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="mt-4 border-t border-slate-100 pt-3">
        <Link
          href="/projects"
          className="flex items-center justify-center gap-1 text-xs font-semibold text-slate-600 hover:text-orange-600 transition-colors"
        >
          View Full Milestone Schedule <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
