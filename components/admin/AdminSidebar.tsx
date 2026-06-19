"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Award,
  BookOpen,
  CalendarDays,
  FileText,
  LayoutDashboard,
  LogOut,
  Mail,
  Megaphone,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { SessionPayload } from "@/lib/auth";
import { ROLE_LABELS } from "@/lib/constants";
import type { Role } from "@/lib/constants";

interface Props {
  session: SessionPayload;
}

const NAV = [
  { label: "Tableau de bord", href: "/admin", Icon: LayoutDashboard },
  { label: "Articles", href: "/admin/articles", Icon: BookOpen },
  { label: "Communiqués", href: "/admin/communiques", Icon: Megaphone },
  { label: "Événements", href: "/admin/evenements", Icon: CalendarDays },
  { label: "Documents", href: "/admin/documents", Icon: FileText },
  { label: "Majors", href: "/admin/majors", Icon: Award },
  { label: "Messages", href: "/admin/messages", Icon: Mail },
  { label: "Alumni", href: "/admin/alumni", Icon: Users },
];

export function AdminSidebar({ session }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="flex w-56 shrink-0 flex-col border-r border-white/8 bg-lsy-blue-950">
      {/* Brand */}
      <div className="flex h-14 items-center gap-2.5 border-b border-white/8 px-4">
        <div className="flex size-7 items-center justify-center rounded-lg bg-lsy-gold-500">
          <span className="text-[0.6rem] font-black text-lsy-blue-950">LSY</span>
        </div>
        <span className="text-sm font-bold text-white">Administration</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3">
        <ul className="space-y-0.5 px-2">
          {NAV.map(({ label, href, Icon }) => {
            const active = href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-white/10 text-white"
                      : "text-white/50 hover:bg-white/5 hover:text-white/80",
                  )}
                >
                  <Icon className="size-4 shrink-0" aria-hidden />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User footer */}
      <div className="border-t border-white/8 p-3">
        <div className="mb-2 flex items-center gap-2.5 rounded-lg px-2 py-1.5">
          <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-lsy-gold-500 text-[0.6rem] font-bold text-lsy-blue-950">
            {session.name.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold text-white">{session.name}</p>
            <p className="truncate text-[0.62rem] text-white/40">
              {ROLE_LABELS[session.role as Role]}
            </p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium text-white/40 hover:bg-white/5 hover:text-white/70 transition-colors"
        >
          <LogOut className="size-3.5 shrink-0" aria-hidden />
          Déconnexion
        </button>
      </div>
    </aside>
  );
}
