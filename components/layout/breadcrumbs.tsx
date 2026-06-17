"use client";

import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";

export function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const breadcrumbs = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    const label = segment
      .replace(/-/g, " ")
      .replace(/\[.*\]/g, "")
      .replace(/\b\w/g, (c) => c.toUpperCase());

    return { href, label: label || "Details" };
  });

  return (
    <nav className="flex items-center gap-1.5 text-sm text-slate-500 px-6 py-3 border-b bg-white">
      <Link
        href="/"
        className="flex items-center gap-1.5 text-slate-400 hover:text-orange-600 transition-colors"
      >
        <Home className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Home</span>
      </Link>

      {breadcrumbs.map((crumb, index) => (
        <div key={crumb.href} className="flex items-center gap-1.5">
          <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
          {index === breadcrumbs.length - 1 ? (
            <span className="font-medium text-slate-700">{crumb.label}</span>
          ) : (
            <Link
              href={crumb.href}
              className="hover:text-orange-600 transition-colors"
            >
              {crumb.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}
