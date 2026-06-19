"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Award,
  BookOpen,
  Building2,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  FileText,
  LayoutDashboard,
  LogOut,
  Mail,
  Megaphone,
  Users,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { SessionPayload } from "@/lib/auth";
import { ROLE_LABELS } from "@/lib/constants";
import type { Role } from "@/lib/constants";

interface Props {
  session: SessionPayload;
  expanded?: boolean;
  mobileOpen?: boolean;
  onToggleExpanded?: () => void;
  onCloseMobile?: () => void;
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
  { label: "Partenaires", href: "/admin/partners", Icon: Building2 },
];

export function AdminSidebar({
  session,
  expanded = true,
  mobileOpen = false,
  onToggleExpanded,
  onCloseMobile,
}: Props) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  const sidebarContent = (isMobile = false) => (
    <div className="flex h-full flex-col">
      {/* Brand */}
      <div
        className={cn(
          "flex h-14 shrink-0 items-center border-b border-white/8 px-3",
          !expanded && !isMobile ? "justify-center" : "justify-between gap-2",
        )}
      >
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-lsy-gold-500">
            <span className="text-[0.6rem] font-black leading-none text-lsy-blue-950">LSY</span>
          </div>
          {(expanded || isMobile) && (
            <span className="truncate text-sm font-bold text-white">Administration</span>
          )}
        </div>

        {/* Bouton fermer (mobile) */}
        {isMobile && onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="flex size-7 items-center justify-center rounded-lg text-white/40 hover:bg-white/8 hover:text-white transition-colors"
            aria-label="Fermer"
          >
            <X className="size-4" aria-hidden />
          </button>
        )}

        {/* Bouton collapse (desktop) */}
        {!isMobile && onToggleExpanded && (
          <button
            onClick={onToggleExpanded}
            className="flex size-7 shrink-0 items-center justify-center rounded-lg text-white/30 hover:bg-white/8 hover:text-white/70 transition-colors"
            aria-label={expanded ? "Réduire le menu" : "Agrandir le menu"}
          >
            {expanded
              ? <ChevronLeft className="size-4" aria-hidden />
              : <ChevronRight className="size-4" aria-hidden />
            }
          </button>
        )}
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
                  onClick={isMobile ? onCloseMobile : undefined}
                  title={!expanded && !isMobile ? label : undefined}
                  className={cn(
                    "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    !expanded && !isMobile && "justify-center px-2",
                    active
                      ? "bg-white/10 text-white"
                      : "text-white/50 hover:bg-white/5 hover:text-white/80",
                  )}
                >
                  <Icon className="size-4 shrink-0" aria-hidden />
                  {(expanded || isMobile) && (
                    <span className="truncate">{label}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User footer */}
      <div className="border-t border-white/8 p-2">
        {(expanded || isMobile) ? (
          <div className="mb-1.5 flex items-center gap-2.5 rounded-lg px-2 py-1.5">
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
        ) : (
          <div className="mb-1.5 flex justify-center py-1">
            <div
              className="flex size-7 items-center justify-center rounded-full bg-lsy-gold-500 text-[0.6rem] font-bold text-lsy-blue-950"
              title={session.name}
            >
              {session.name.charAt(0).toUpperCase()}
            </div>
          </div>
        )}

        <button
          onClick={handleLogout}
          title={!expanded && !isMobile ? "Déconnexion" : undefined}
          className={cn(
            "flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium text-white/40 hover:bg-white/5 hover:text-white/70 transition-colors",
            !expanded && !isMobile && "justify-center px-2",
          )}
        >
          <LogOut className="size-3.5 shrink-0" aria-hidden />
          {(expanded || isMobile) && <span>Déconnexion</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={cn(
          "hidden shrink-0 border-r border-white/8 bg-lsy-blue-950 transition-all duration-200 lg:flex lg:flex-col",
          expanded ? "w-56" : "w-14",
        )}
      >
        {sidebarContent(false)}
      </aside>

      {/* Mobile drawer */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-white/8 bg-lsy-blue-950 transition-transform duration-300 lg:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {sidebarContent(true)}
      </aside>
    </>
  );
}
