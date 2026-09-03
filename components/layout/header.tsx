"use client";

import { useState } from "react";
import {
  Bell,
  ChevronDown,
  Menu,
  Search,
  Plus,
  HardHat,
  Package,
  DollarSign,
  FileText,
  Sun,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FolderKanban,
  ExternalLink,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getInitials } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface HeaderProps {
  onMenuClick: () => void;
}

const mockNotifications = [
  {
    id: "1",
    title: "Material Stock Alert",
    description: "Cement stock on Site 1 below 20% threshold (800 bags remaining).",
    time: "10m ago",
    type: "warning",
    icon: AlertTriangle,
    unread: true,
  },
  {
    id: "2",
    title: "Structural Inspection Passed",
    description: "Kandy Hills Residences Floor 12 sign-off approved by chief engineer.",
    time: "45m ago",
    type: "success",
    icon: CheckCircle2,
    unread: true,
  },
  {
    id: "3",
    title: "Equipment Delivery",
    description: "Mobile crane dispatched for Galle Marina Hotel foundation works.",
    time: "2h ago",
    type: "info",
    icon: HardHat,
    unread: false,
  },
];

export function Header({ onMenuClick }: HeaderProps) {
  const pathname = usePathname();
  const [notifications, setNotifications] = useState(mockNotifications);
  const unreadCount = notifications.filter((n) => n.unread).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const user = {
    name: "David Yasantha",
    email: "david.pm@buildpro.lk",
    role: "Director of Projects",
    avatarUrl: null,
  };

  // Determine current page title
  const getPageTitle = () => {
    if (pathname === "/") return "Dashboard Overview";
    if (pathname === "/projects") return "Project Directory";
    if (pathname === "/reports") return "Financial Analytics & Reports";
    if (pathname.includes("/budget")) return "Budget Management";
    if (pathname.includes("/materials")) return "Materials & Inventory";
    if (pathname.includes("/workers")) return "Site Workforce & Attendance";
    if (pathname.includes("/documents")) return "Project Documents";
    return "BuildPro Management";
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200/80 bg-white/90 px-4 sm:px-6 backdrop-blur-md">
      {/* Left: Mobile hamburger & breadcrumb/title */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 text-slate-600 hover:bg-slate-100 lg:hidden rounded-lg"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>

        <div className="hidden sm:flex flex-col">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
            <span>BuildPro</span>
            <span>/</span>
            <span className="text-slate-600 font-semibold">{getPageTitle()}</span>
          </div>
        </div>
      </div>

      {/* Middle: Omnibar Search */}
      <div className="flex-1 max-w-md mx-4 hidden md:block">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search projects, materials, work logs, blueprints (Ctrl + K)..."
            className="h-9 w-full rounded-xl border-slate-200 bg-slate-50/80 pl-9 pr-12 text-xs focus-visible:bg-white focus-visible:ring-orange-500 focus-visible:border-orange-500 transition-all"
          />
          <kbd className="absolute right-2.5 top-2 rounded bg-slate-200/70 px-1.5 py-0.5 text-[10px] font-semibold text-slate-500">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right: Actions, Live Site Widget, Notifications, User Menu */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Weather & Site Condition Widget */}
        <div className="hidden xl:flex items-center gap-2 rounded-lg bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 text-xs font-semibold text-amber-800">
          <Sun className="h-3.5 w-3.5 text-amber-600" />
          <span>Colombo Site: 29°C Sunny • Safe Conditions</span>
        </div>

        {/* Quick Add Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="sm"
              className="h-9 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs gap-1.5 rounded-lg shadow-xs"
            >
              <Plus className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Quick Action</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 rounded-xl p-1.5 shadow-lg border-slate-200">
            <DropdownMenuLabel className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
              Create New
            </DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Link href="/projects/new" className="flex items-center gap-2.5 px-2 py-1.5 text-xs font-medium cursor-pointer rounded-lg hover:bg-orange-50 hover:text-orange-700">
                <FolderKanban className="h-4 w-4 text-orange-600" />
                <span>Create New Project</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/projects/1/materials" className="flex items-center gap-2.5 px-2 py-1.5 text-xs font-medium cursor-pointer rounded-lg hover:bg-orange-50 hover:text-orange-700">
                <Package className="h-4 w-4 text-blue-600" />
                <span>Log Material Order</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/projects/1/budget" className="flex items-center gap-2.5 px-2 py-1.5 text-xs font-medium cursor-pointer rounded-lg hover:bg-orange-50 hover:text-orange-700">
                <DollarSign className="h-4 w-4 text-emerald-600" />
                <span>Record Site Expense</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/projects/1/workers" className="flex items-center gap-2.5 px-2 py-1.5 text-xs font-medium cursor-pointer rounded-lg hover:bg-orange-50 hover:text-orange-700">
                <HardHat className="h-4 w-4 text-purple-600" />
                <span>Mark Worker Attendance</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Notifications Popover */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative h-9 w-9 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            >
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-[9px] font-bold text-white ring-2 ring-white">
                  {unreadCount}
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            align="end"
            className="w-80 sm:w-96 rounded-2xl p-0 shadow-2xl border-slate-200 overflow-hidden"
          >
            <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/80 px-4 py-3">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-slate-900">Notifications</h4>
                {unreadCount > 0 && (
                  <span className="rounded-full bg-orange-100 px-2 py-0.2 text-[10px] font-bold text-orange-700">
                    {unreadCount} new
                  </span>
                )}
              </div>
              {unreadCount > 0 && (
                <button
                  onClick={markAllRead}
                  className="text-xs font-semibold text-orange-600 hover:text-orange-700"
                >
                  Mark all read
                </button>
              )}
            </div>

            <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto custom-scrollbar">
              {notifications.map((n) => {
                const Icon = n.icon;
                return (
                  <div
                    key={n.id}
                    className={`flex items-start gap-3 p-3.5 transition-colors hover:bg-slate-50 ${
                      n.unread ? "bg-orange-50/30" : ""
                    }`}
                  >
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                        n.type === "warning"
                          ? "bg-amber-100 text-amber-700"
                          : n.type === "success"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-bold text-slate-900 truncate">
                          {n.title}
                        </p>
                        <span className="text-[10px] text-slate-400 font-medium">
                          {n.time}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-snug mt-0.5 line-clamp-2">
                        {n.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-slate-100 p-2 text-center bg-slate-50/50">
              <Link
                href="/reports"
                className="text-xs font-semibold text-orange-600 hover:text-orange-700"
              >
                View all site activity alerts →
              </Link>
            </div>
          </PopoverContent>
        </Popover>

        {/* User Profile Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-2 pl-2 pr-1 sm:pr-2.5 py-1.5 h-9 rounded-xl hover:bg-slate-100"
            >
              <Avatar className="h-7 w-7 border border-slate-200">
                <AvatarImage src={user.avatarUrl || ""} alt={user.name} />
                <AvatarFallback className="bg-gradient-to-tr from-orange-500 to-amber-500 text-white text-xs font-bold">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <div className="hidden lg:flex flex-col items-start text-left">
                <span className="text-xs font-bold text-slate-900 leading-none">
                  {user.name}
                </span>
                <span className="text-[10px] text-slate-500 font-medium mt-0.5">
                  {user.role}
                </span>
              </div>
              <ChevronDown className="h-3.5 w-3.5 text-slate-400 hidden sm:block" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 rounded-xl p-1.5 shadow-xl border-slate-200">
            <div className="px-2 py-1.5">
              <p className="text-xs font-bold text-slate-900">{user.name}</p>
              <p className="text-[11px] text-slate-500">{user.email}</p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/projects" className="text-xs font-medium cursor-pointer rounded-lg">
                Active Projects Directory
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/reports" className="text-xs font-medium cursor-pointer rounded-lg">
                Financial Audit Logs
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-xs font-medium text-red-600 cursor-pointer rounded-lg hover:bg-red-50 hover:text-red-700">
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
