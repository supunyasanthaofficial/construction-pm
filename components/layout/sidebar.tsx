"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FolderKanban,
  Package,
  HardHat,
  BarChart3,
  FileText,
  Settings,
  X,
  Building2,
  ChevronDown,
  Radio,
  ExternalLink,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navSections = [
  {
    title: "MAIN",
    items: [
      {
        title: "Dashboard",
        href: "/",
        icon: LayoutDashboard,
        badge: null,
      },
      {
        title: "Projects",
        href: "/projects",
        icon: FolderKanban,
        badge: "5 Active",
      },
    ],
  },
  {
    title: "OPERATIONS",
    items: [
      {
        title: "Materials & Inventory",
        href: "/projects/1/materials",
        icon: Package,
        badge: "5 Low",
        badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
      },
      {
        title: "Site Workforce",
        href: "/projects/1/workers",
        icon: HardHat,
        badge: "248 On-site",
      },
      {
        title: "Project Documents",
        href: "/projects/1/documents",
        icon: FileText,
        badge: null,
      },
    ],
  },
  {
    title: "ANALYTICS & CONTROL",
    items: [
      {
        title: "Financial Reports",
        href: "/reports",
        icon: BarChart3,
        badge: null,
      },
      {
        title: "Project Budgets",
        href: "/projects/1/budget",
        icon: Building2,
        badge: null,
      },
    ],
  },
  {
    title: "SYSTEM",
    items: [
      {
        title: "Settings & Config",
        href: "/projects",
        icon: Settings,
        badge: null,
      },
    ],
  },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile backdrop overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-xs lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex h-full w-72 flex-col bg-slate-950 text-slate-200 border-r border-slate-800/80 transition-transform duration-300 ease-in-out shadow-2xl lg:sticky lg:top-0 lg:h-screen lg:w-72 lg:shrink-0 lg:translate-x-0 lg:shadow-none",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header Branding - Aligned exactly with top header h-16 */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-800/80 px-5 bg-slate-950">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 shadow-md shadow-orange-500/20 text-white font-black group-hover:scale-105 transition-transform">
              <HardHat className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 leading-tight">
                <span className="text-base font-extrabold tracking-tight text-white">
                  BuildPro
                </span>
                <span className="rounded bg-orange-500/20 px-1.5 py-0.2 text-[10px] font-bold text-orange-400 border border-orange-500/30">
                  PM
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium tracking-wide">
                Construction Management
              </p>
            </div>
          </Link>

          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white lg:hidden transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Workspace Switcher */}
        <div className="shrink-0 p-3.5 border-b border-slate-800/60">
          <button className="flex w-full items-center justify-between rounded-xl bg-slate-900/90 p-2.5 text-left border border-slate-800/90 hover:border-slate-700 hover:bg-slate-850 transition-all">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-orange-400">
                <Building2 className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-slate-100 truncate leading-tight">
                  Enterprise Portfolio
                </p>
                <p className="text-[10px] text-slate-400 truncate mt-0.5">
                  5 Active Sites Connected
                </p>
              </div>
            </div>
            <ChevronDown className="h-3.5 w-3.5 text-slate-400 shrink-0 ml-1.5" />
          </button>
        </div>

        {/* Navigation Area with smooth scrolling */}
        <div className="flex-1 overflow-y-auto px-3.5 py-4 custom-scrollbar space-y-6">
          {navSections.map((section) => (
            <div key={section.title} className="space-y-1.5">
              <p className="px-3 text-[10px] font-bold tracking-wider text-slate-500 uppercase">
                {section.title}
              </p>
              <nav className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname === item.href ||
                        (item.href !== "/" && pathname.startsWith(item.href));

                  return (
                    <Link
                      key={item.href + item.title}
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        "group flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-semibold transition-all duration-200",
                        isActive
                          ? "bg-gradient-to-r from-orange-500/20 to-orange-500/5 text-orange-400 border border-orange-500/30 shadow-xs font-bold"
                          : "text-slate-400 hover:bg-slate-900/90 hover:text-slate-100"
                      )}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <Icon
                          className={cn(
                            "h-4 w-4 shrink-0 transition-transform duration-200 group-hover:scale-110",
                            isActive
                              ? "text-orange-400"
                              : "text-slate-400 group-hover:text-slate-200"
                          )}
                        />
                        <span className="truncate">{item.title}</span>
                      </div>

                      {item.badge && (
                        <span
                          className={cn(
                            "rounded-full px-2 py-0.5 text-[10px] font-bold border shrink-0 ml-auto",
                            item.badgeColor ||
                              (isActive
                                ? "bg-orange-500/20 text-orange-300 border-orange-500/30"
                                : "bg-slate-800 text-slate-400 border-slate-700")
                          )}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>

        {/* Bottom Pinned Footer Widgets */}
        <div className="shrink-0 border-t border-slate-800/80 p-3.5 space-y-2.5 bg-slate-950">
          {/* Live site telemetry status */}
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Radio className="h-3.5 w-3.5 text-emerald-400 animate-pulse" />
                <span className="text-[11px] font-bold text-emerald-300">
                  Site Telemetry
                </span>
              </div>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/20 px-1.5 py-0.2 rounded border border-emerald-500/30">
                Live Sync
              </span>
            </div>
            <p className="mt-1 text-[10px] text-slate-400 leading-relaxed">
              Colombo • Kandy • Galle • Negombo
            </p>
          </div>

          {/* User Profile Card */}
          <div className="flex items-center justify-between rounded-xl bg-slate-900 p-2.5 border border-slate-800/80">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="relative shrink-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500 font-bold text-white text-xs shadow-xs">
                  DY
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-slate-950" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-200 truncate leading-tight">
                  David Yasantha
                </p>
                <p className="text-[10px] text-slate-400 truncate mt-0.5">
                  Director of Projects
                </p>
              </div>
            </div>
            <Link
              href="/reports"
              className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-slate-800 transition-colors shrink-0 ml-1"
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
