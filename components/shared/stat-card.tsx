import { cn } from "@/lib/utils";
import { type LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  description?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
    period?: string;
  };
  highlight?: {
    label: string;
    color?: "orange" | "blue" | "emerald" | "amber";
  };
  progress?: {
    value: number;
    max?: number;
    label?: string;
  };
  iconColor?: "orange" | "blue" | "emerald" | "purple" | "amber";
  className?: string;
}

const colorVariants = {
  orange: {
    bg: "bg-orange-500/10 text-orange-600",
    border: "border-orange-200/50",
    gradient: "from-orange-500/10 to-transparent",
    progress: "bg-orange-500",
  },
  blue: {
    bg: "bg-blue-500/10 text-blue-600",
    border: "border-blue-200/50",
    gradient: "from-blue-500/10 to-transparent",
    progress: "bg-blue-500",
  },
  emerald: {
    bg: "bg-emerald-500/10 text-emerald-600",
    border: "border-emerald-200/50",
    gradient: "from-emerald-500/10 to-transparent",
    progress: "bg-emerald-500",
  },
  purple: {
    bg: "bg-purple-500/10 text-purple-600",
    border: "border-purple-200/50",
    gradient: "from-purple-500/10 to-transparent",
    progress: "bg-purple-500",
  },
  amber: {
    bg: "bg-amber-500/10 text-amber-600",
    border: "border-amber-200/50",
    gradient: "from-amber-500/10 to-transparent",
    progress: "bg-amber-500",
  },
};

export function StatCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  highlight,
  progress,
  iconColor = "orange",
  className,
}: StatCardProps) {
  const colors = colorVariants[iconColor];

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all duration-300 hover:shadow-md hover:border-slate-300 group",
        className
      )}
    >
      {/* Subtle top ambient glow */}
      <div
        className={cn(
          "absolute inset-x-0 top-0 h-1 bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100",
          colors.gradient
        )}
      />

      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {title}
            </p>
            {highlight && (
              <span className="inline-flex items-center rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-600">
                {highlight.label}
              </span>
            )}
          </div>
          <p className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            {value}
          </p>
        </div>

        <div
          className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105",
            colors.bg
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>

      {/* Description or trend */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3 text-xs">
        {trend ? (
          <div className="flex items-center gap-1.5">
            <span
              className={cn(
                "inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 font-semibold text-[11px]",
                trend.isPositive
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-red-50 text-red-700"
              )}
            >
              {trend.isPositive ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              {trend.isPositive ? "+" : "-"}
              {Math.abs(trend.value)}%
            </span>
            <span className="text-slate-400">
              {trend.period || "vs last month"}
            </span>
          </div>
        ) : (
          description && (
            <p className="text-slate-500 truncate font-medium">{description}</p>
          )
        )}

        {trend && description && (
          <span className="text-slate-500 font-medium ml-auto truncate max-w-[140px] text-right">
            {description}
          </span>
        )}
      </div>

      {/* Optional progress indicator */}
      {progress && (
        <div className="mt-2.5 space-y-1">
          {progress.label && (
            <div className="flex justify-between text-[11px] text-slate-500">
              <span>{progress.label}</span>
              <span className="font-semibold text-slate-700">
                {progress.value}%
              </span>
            </div>
          )}
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className={cn("h-full rounded-full transition-all duration-500", colors.progress)}
              style={{
                width: `${Math.min(
                  (progress.value / (progress.max || 100)) * 100,
                  100
                )}%`,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
