import { mockProjects } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";
import { Calendar, Clock } from "lucide-react";

export function UpcomingDeadlines() {
  const deadlines = mockProjects
    .filter((p) => p.status === "active" || p.status === "planning")
    .sort(
      (a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime(),
    )
    .slice(0, 3);

  const getDaysRemaining = (endDate: string) => {
    const now = new Date();
    const end = new Date(endDate);
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="rounded-xl border bg-white shadow-sm">
      <div className="p-6 pb-4">
        <h3 className="text-base font-semibold text-slate-900">
          Upcoming Deadlines
        </h3>
        <p className="text-sm text-slate-500">Projects nearing completion</p>
      </div>
      <div className="divide-y">
        {deadlines.map((project) => {
          const daysRemaining = getDaysRemaining(project.endDate);
          const isUrgent = daysRemaining <= 30;

          return (
            <div
              key={project.id}
              className="p-4 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 truncate">
                    {project.name}
                  </p>
                  <div className="flex items-center gap-3 mt-1.5">
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <Calendar className="h-3 w-3" />
                      {formatDate(project.endDate)}
                    </div>
                    <div className="flex items-center gap-1 text-xs">
                      <Clock
                        className={`h-3 w-3 ${isUrgent ? "text-red-500" : "text-slate-500"}`}
                      />
                      <span
                        className={
                          isUrgent
                            ? "text-red-600 font-medium"
                            : "text-slate-500"
                        }
                      >
                        {daysRemaining} days left
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        project.progress >= 80
                          ? "bg-emerald-500"
                          : project.progress >= 50
                            ? "bg-orange-500"
                            : "bg-blue-500"
                      }`}
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-slate-600">
                    {project.progress}%
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
