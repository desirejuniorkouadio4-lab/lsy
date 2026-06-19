"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogOut, Home } from "lucide-react";
import type { SessionPayload } from "@/lib/auth";
import { ROLE_LABELS } from "@/lib/constants";
import type { Role } from "@/lib/constants";

const SPACE_COLOR: Record<string, string> = {
  STUDENT: "bg-lsy-blue-900",
  PARENT: "bg-lsy-blue-700",
  TEACHER: "bg-lsy-gold-600",
};

interface Props {
  session: SessionPayload;
  children: React.ReactNode;
}

export function PortalShell({ session, children }: Props) {
  const router = useRouter();
  const color = SPACE_COLOR[session.role] ?? "bg-lsy-blue-950";

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/portail");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-lsy-ivory">
      {/* Header portail */}
      <header className={`${color} text-white`}>
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-white/20">
              <span className="text-[0.55rem] font-black leading-none text-white">LSY</span>
            </div>
            <div className="hidden sm:block">
              <p className="text-xs font-bold leading-none">{ROLE_LABELS[session.role as Role]}</p>
              <p className="mt-0.5 text-[0.65rem] text-white/60 leading-none">{session.name}</p>
            </div>
          </div>

          <nav className="flex items-center gap-1">
            <Link href="/portail"
              className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-white/70 hover:bg-white/10 hover:text-white transition-colors">
              <Home className="size-3.5" aria-hidden />
              <span className="hidden sm:inline">Portail</span>
            </Link>
            <button onClick={handleLogout}
              className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-white/70 hover:bg-white/10 hover:text-white transition-colors">
              <LogOut className="size-3.5" aria-hidden />
              <span className="hidden sm:inline">Déconnexion</span>
            </button>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:py-12">
        {children}
      </main>
    </div>
  );
}
