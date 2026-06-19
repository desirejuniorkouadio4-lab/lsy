"use client";

import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { AdminSidebar } from "./AdminSidebar";
import type { SessionPayload } from "@/lib/auth";

interface Props {
  session: SessionPayload;
  children: React.ReactNode;
}

export function AdminShell({ session, children }: Props) {
  const [expanded, setExpanded] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function onResize() {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className="flex min-h-screen bg-[#0f1623]">
      {/* Overlay mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <AdminSidebar
        session={session}
        expanded={expanded}
        mobileOpen={mobileOpen}
        onToggleExpanded={() => setExpanded((v) => !v)}
        onCloseMobile={() => setMobileOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Barre mobile */}
        <div className="flex h-14 shrink-0 items-center gap-3 border-b border-white/8 px-4 lg:hidden">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Ouvrir le menu"
            className="flex size-9 items-center justify-center rounded-lg text-white/50 transition-colors hover:bg-white/8 hover:text-white"
          >
            <Menu className="size-5" aria-hidden />
          </button>
          <div className="flex items-center gap-2">
            <div className="flex size-6 shrink-0 items-center justify-center rounded-md bg-lsy-gold-500">
              <span className="text-[0.5rem] font-black leading-none text-lsy-blue-950">LSY</span>
            </div>
            <span className="text-sm font-bold text-white">Administration</span>
          </div>
        </div>

        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
