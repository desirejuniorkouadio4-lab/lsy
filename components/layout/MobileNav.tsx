"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  Mail,
  Navigation,
  Phone,
  Search,
  X,
} from "lucide-react";
import { headerActions, primaryNav } from "@/data/navigation";
import { LogoLSY } from "@/components/brand/LogoLSY";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  const router = useRouter();
  const [expanded, setExpanded] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    onClose();
    router.push(q ? `/recherche?q=${encodeURIComponent(q)}` : "/recherche");
  };

  const actions = [
    {
      label: "Appeler",
      icon: Phone,
      href: site.contact.phoneHref || "/contact",
    },
    { label: "Écrire", icon: Mail, href: `mailto:${site.contact.email}` },
    { label: "Itinéraire", icon: Navigation, href: site.contact.mapsUrl },
  ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] xl:hidden"
          initial="hidden"
          animate="show"
          exit="hidden"
        >
          <motion.div
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="absolute inset-0 bg-lsy-blue-950/55 backdrop-blur-sm"
            aria-hidden
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navigation"
            variants={{
              hidden: { x: "100%" },
              show: { x: 0 },
            }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="absolute right-0 top-0 flex h-full w-[min(26rem,92vw)] flex-col bg-lsy-paper shadow-elevated"
          >
            {/* En-tête */}
            <div className="flex items-center justify-between border-b border-lsy-line px-5 py-4">
              <LogoLSY variant="onLight" size="sm" />
              <button
                type="button"
                onClick={onClose}
                aria-label="Fermer le menu"
                className="inline-flex size-10 items-center justify-center rounded-xl border border-lsy-line text-lsy-blue-900 hover:bg-lsy-ivory"
              >
                <X className="size-5" aria-hidden />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-5">
              {/* Recherche */}
              <form onSubmit={onSearch} className="relative">
                <Search
                  className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-lsy-muted"
                  aria-hidden
                />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Rechercher sur le site…"
                  aria-label="Rechercher"
                  className="w-full rounded-xl border border-lsy-line bg-white py-3 pl-10 pr-4 text-sm text-lsy-blue-900 outline-none placeholder:text-lsy-muted focus:border-lsy-gold-500 focus:ring-2 focus:ring-lsy-gold-500/30"
                />
              </form>

              {/* Actions rapides */}
              <div className="mt-4 grid grid-cols-3 gap-2">
                {actions.map((a) => {
                  const Icon = a.icon;
                  const external = a.href.startsWith("http");
                  return (
                    <a
                      key={a.label}
                      href={a.href}
                      onClick={onClose}
                      {...(external
                        ? { target: "_blank", rel: "noreferrer" }
                        : {})}
                      className="flex flex-col items-center gap-1.5 rounded-2xl border border-lsy-line bg-white py-3 text-xs font-semibold text-lsy-blue-900 transition-colors hover:bg-lsy-ivory"
                    >
                      <Icon className="size-5 text-lsy-gold-600" aria-hidden />
                      {a.label}
                    </a>
                  );
                })}
              </div>

              {/* Navigation */}
              <nav aria-label="Navigation mobile" className="mt-6 space-y-1">
                {primaryNav.map((item) => {
                  if (!item.mega) {
                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={onClose}
                        className="block rounded-xl px-3 py-3 text-[0.95rem] font-bold text-lsy-blue-900 hover:bg-lsy-ivory"
                      >
                        {item.label}
                      </Link>
                    );
                  }
                  const isOpen = expanded === item.label;
                  return (
                    <div key={item.label} className="border-b border-lsy-line/70 last:border-0">
                      <button
                        type="button"
                        onClick={() =>
                          setExpanded(isOpen ? null : item.label)
                        }
                        aria-expanded={isOpen}
                        className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-[0.95rem] font-bold text-lsy-blue-900 hover:bg-lsy-ivory"
                      >
                        {item.label}
                        <ChevronDown
                          className={cn(
                            "size-4 text-lsy-muted transition-transform",
                            isOpen && "rotate-180",
                          )}
                          aria-hidden
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            {item.mega.links.map((link) => {
                              const Icon = link.icon;
                              return (
                                <li key={link.href}>
                                  <Link
                                    href={link.href}
                                    onClick={onClose}
                                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-lsy-slate hover:bg-lsy-ivory hover:text-lsy-blue-900"
                                  >
                                    <Icon
                                      className="size-4 shrink-0 text-lsy-gold-600"
                                      aria-hidden
                                    />
                                    {link.label}
                                  </Link>
                                </li>
                              );
                            })}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </nav>
            </div>

            {/* Pied */}
            <div className="grid grid-cols-2 gap-2 border-t border-lsy-line p-4">
              <Link
                href={headerActions.contact.href}
                onClick={onClose}
                className="inline-flex items-center justify-center rounded-full border border-lsy-blue-900/20 px-4 py-2.5 text-sm font-semibold text-lsy-blue-900 hover:bg-lsy-ivory"
              >
                {headerActions.contact.label}
              </Link>
              <Link
                href={headerActions.portal.href}
                onClick={onClose}
                className="inline-flex items-center justify-center rounded-full bg-lsy-gold-500 px-4 py-2.5 text-sm font-semibold text-lsy-blue-950 hover:bg-lsy-gold-400"
              >
                Portail
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
