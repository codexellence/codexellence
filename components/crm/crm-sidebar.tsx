"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  CalendarDays,
  Settings,
} from "lucide-react";

type Props = {
  user: {
    email: string;
    fullName: string;
    role: string;
  };
};

const navItems = [
  { label: "Dashboard", href: "/sales", icon: LayoutDashboard, exact: true },
  { label: "Leads", href: "/sales/leads", icon: Users },
  { label: "Jobs", href: "/sales/jobs", icon: Briefcase },
  { label: "Calendar", href: "/sales/calendar", icon: CalendarDays },
  { label: "Settings", href: "/sales/settings", icon: Settings },
];

export default function CrmSidebar({ user }: Props) {
  const pathname = usePathname();

  return (
    <aside className="hidden w-[280px] shrink-0 border-r border-black/5 bg-white/80 backdrop-blur-xl lg:flex lg:flex-col">
      <div className="border-b border-black/5 px-6 py-6">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-600">
          Codexellence CRM
        </div>
        <div className="mt-3">
          <div className="text-lg font-black tracking-tight text-gray-900">
            Internal workspace
          </div>
          <div className="mt-1 text-sm text-gray-500">
            Sales, delivery, and revenue
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 py-5">
        <div className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.exact
              ? pathname === item.href
              : pathname === item.href || pathname.startsWith(item.href + "/");

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-violet-50 text-violet-700"
                    : "text-gray-600 hover:bg-violet-50 hover:text-violet-700"
                }`}
              >
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-2xl border transition-all ${
                    isActive
                      ? "border-violet-100 bg-white text-violet-600 shadow-sm"
                      : "border-gray-100 bg-gray-50 text-gray-500 group-hover:border-violet-100 group-hover:bg-white group-hover:text-violet-600"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </span>
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="p-4">
        <div className="rounded-[26px] border border-teal-100 bg-gradient-to-br from-white to-teal-50 p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-600 text-white">
              {user.fullName?.slice(0, 1).toUpperCase() || "U"}
            </div>
            <div className="min-w-0">
              <div className="truncate text-sm font-bold text-gray-900">
                {user.fullName}
              </div>
              <div className="truncate text-xs uppercase tracking-[0.14em] text-teal-700">
                {user.role}
              </div>
            </div>
          </div>
          <div className="mt-3 truncate text-sm text-gray-500">
            {user.email}
          </div>
        </div>
      </div>
    </aside>
  );
}
