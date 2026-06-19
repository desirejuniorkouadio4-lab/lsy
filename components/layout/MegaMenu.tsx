"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { NavItem } from "@/data/navigation";
import { ScientificPattern } from "@/components/brand/ScientificPattern";
import { cn } from "@/lib/utils";

interface MegaMenuProps {
  item: NavItem;
  onNavigate: () => void;
}

export function MegaMenu({ item, onNavigate }: MegaMenuProps) {
  if (!item.mega) return null;
  const { links, feature, intro } = item.mega;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 6 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className="absolute left-1/2 top-full z-50 w-[min(64rem,calc(100vw-2rem))] -translate-x-1/2 pt-3"
    >
      <div className="overflow-hidden rounded-3xl bg-white shadow-elevated ring-1 ring-lsy-blue-900/10">
        <div className="rule-civ h-1 w-full" aria-hidden />
        <div
          className={cn(
            "grid gap-2 p-4 sm:p-6",
            feature ? "lg:grid-cols-[1.7fr_1fr]" : "lg:grid-cols-1",
          )}
        >
          <div>
            {intro && (
              <p className="mb-3 px-2 text-sm text-lsy-muted">{intro}</p>
            )}
            <ul className="grid gap-1 sm:grid-cols-2">
              {links.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={onNavigate}
                      className="group flex items-start gap-3 rounded-2xl p-3 transition-colors hover:bg-lsy-ivory"
                    >
                      <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl bg-lsy-blue-900/5 text-lsy-blue-800 transition-colors group-hover:bg-lsy-gold-500 group-hover:text-lsy-blue-950">
                        <Icon className="size-5" aria-hidden />
                      </span>
                      <span className="min-w-0">
                        <span className="flex items-center gap-1 font-semibold text-lsy-blue-900">
                          {link.label}
                          <ArrowRight className="size-3.5 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" aria-hidden />
                        </span>
                        <span className="mt-0.5 block text-[0.82rem] leading-snug text-lsy-muted">
                          {link.description}
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {feature && (
            <Link
              href={feature.href}
              onClick={onNavigate}
              className="group relative flex flex-col justify-end overflow-hidden rounded-2xl bg-lsy-blue-900 p-6 text-white"
            >
              <ScientificPattern
                variant="orbit"
                className="absolute -right-6 -top-6 size-40 text-lsy-gold-400/30"
              />
              <div className="bg-grid-science absolute inset-0 opacity-40" aria-hidden />
              <div className="relative">
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-lsy-gold-300">
                  {feature.eyebrow}
                </span>
                <h3 className="mt-2 font-display text-lg font-bold leading-tight">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-white/75">
                  {feature.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-lsy-gold-300">
                  {feature.cta}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                </span>
              </div>
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}
