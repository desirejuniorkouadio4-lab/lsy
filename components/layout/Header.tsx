"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { ChevronDown, MapPin, Menu } from "lucide-react";
import { headerActions, primaryNav, quickLinks } from "@/data/navigation";
import { LogoLSY } from "@/components/brand/LogoLSY";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { MegaMenu } from "./MegaMenu";
import { MobileNav } from "./MobileNav";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const topSeg = (href: string) => "/" + (href.split("/")[1] ?? "");

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setActive(null);
    setMobileOpen(false);
  }, [pathname]);

  const pathTop = topSeg(pathname);
  const itemActive = (item: (typeof primaryNav)[number]) => {
    if (item.href === "/") return pathname === "/";
    const segs = new Set<string>([
      topSeg(item.href),
      ...(item.mega?.links.map((l) => topSeg(l.href)) ?? []),
    ]);
    return segs.has(pathTop);
  };

  return (
    <>
      {/* Bandeau utilitaire (desktop) */}
      <div className="hidden border-b border-lsy-line bg-lsy-ivory lg:block">
        <Container className="flex h-9 items-center justify-between text-[0.78rem] text-lsy-muted">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="size-3.5 text-lsy-gold-600" aria-hidden />
            {site.contact.city}, {site.contact.country}
            <span className="mx-2 text-lsy-line">•</span>
            <span>L&apos;excellence scientifique au service de la nation</span>
          </span>
          <nav aria-label="Liens rapides" className="flex items-center gap-5">
            {quickLinks.slice(2, 5).map((q) => (
              <Link
                key={q.href}
                href={q.href}
                className="font-medium transition-colors hover:text-lsy-blue-800"
              >
                {q.label}
              </Link>
            ))}
          </nav>
        </Container>
      </div>

      {/* Barre principale */}
      <header
        className={cn(
          "sticky top-0 z-40 transition-shadow duration-300",
          scrolled
            ? "bg-white/85 shadow-soft backdrop-blur-lg supports-[backdrop-filter]:bg-white/75"
            : "bg-white/95",
        )}
      >
        <div
          className="relative border-b border-lsy-line"
          onMouseLeave={() => setActive(null)}
        >
          {/* Pleine largeur — pas de Container pour éviter le retrait */}
          <div className="flex h-[4.5rem] w-full items-center justify-between gap-3 px-4 sm:px-6 lg:px-8 xl:px-10">
            <LogoLSY variant="onLight" size="md" />

            {/* Navigation desktop */}
            <nav aria-label="Navigation principale" className="hidden flex-1 items-center justify-center xl:flex">
              <ul className="flex items-center">
                {primaryNav.map((item, i) => {
                  const selected = itemActive(item);
                  const open = active === i;
                  return (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        onMouseEnter={() => setActive(item.mega ? i : null)}
                        onFocus={() => setActive(item.mega ? i : null)}
                        aria-haspopup={item.mega ? "true" : undefined}
                        aria-expanded={item.mega ? open : undefined}
                        className={cn(
                          "relative inline-flex items-center gap-1 whitespace-nowrap rounded-lg px-2.5 py-2 text-[0.82rem] font-semibold transition-colors",
                          selected || open
                            ? "text-lsy-blue-900"
                            : "text-lsy-slate hover:text-lsy-blue-900",
                        )}
                      >
                        {item.label}
                        {item.mega && (
                          <ChevronDown
                            className={cn(
                              "size-3 transition-transform duration-200",
                              open && "rotate-180",
                            )}
                            aria-hidden
                          />
                        )}
                        <span
                          aria-hidden
                          className={cn(
                            "absolute -bottom-px left-2.5 right-2.5 h-0.5 origin-left rounded-full bg-lsy-gold-500 transition-transform duration-300",
                            selected || open ? "scale-x-100" : "scale-x-0",
                          )}
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Actions */}
            <div className="flex shrink-0 items-center gap-2">
              <Button
                href={headerActions.contact.href}
                variant="ghost"
                size="sm"
                className="hidden lg:inline-flex"
              >
                {headerActions.contact.label}
              </Button>
              <Button
                href={headerActions.portal.href}
                variant="gold"
                size="sm"
                className="hidden sm:inline-flex"
              >
                {headerActions.portal.label}
              </Button>
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                aria-label="Ouvrir le menu"
                className="inline-flex size-11 items-center justify-center rounded-xl border border-lsy-line text-lsy-blue-900 transition-colors hover:bg-lsy-ivory xl:hidden"
              >
                <Menu className="size-5" aria-hidden />
              </button>
            </div>
          </div>

          {/* Méga-menu */}
          <AnimatePresence>
            {active !== null && primaryNav[active]?.mega && (
              <MegaMenu
                item={primaryNav[active]}
                onNavigate={() => setActive(null)}
              />
            )}
          </AnimatePresence>
        </div>
      </header>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
