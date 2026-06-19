"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { bottomNav } from "@/data/navigation";
import { cn } from "@/lib/utils";

export function BottomMobileNav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav
      aria-label="Navigation mobile inférieure"
      className="fixed bottom-0 left-0 right-0 z-30 xl:hidden"
    >
      <div className="rule-civ h-0.5 w-full" aria-hidden />
      <div className="bg-white/95 shadow-[0_-4px_24px_-8px_rgba(6,17,58,0.15)] backdrop-blur-md supports-[backdrop-filter]:bg-white/85">
        <ul className="flex h-16">
          {bottomNav.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <li key={item.href} className="flex-1">
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative flex h-full flex-col items-center justify-center gap-1 text-[0.62rem] font-semibold tracking-wide transition-colors",
                    active
                      ? "text-lsy-blue-900"
                      : "text-lsy-muted hover:text-lsy-blue-800",
                  )}
                >
                  {active && (
                    <span
                      aria-hidden
                      className="absolute top-0 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-lsy-gold-500"
                    />
                  )}
                  <Icon
                    className={cn(
                      "size-5 transition-colors",
                      active ? "text-lsy-gold-600" : "",
                    )}
                    aria-hidden
                  />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
        <div
          aria-hidden
          className="bg-white"
          style={{ height: "env(safe-area-inset-bottom)" }}
        />
      </div>
    </nav>
  );
}
