"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface Props {
  title: string;
  backHref: string;
  backLabel?: string;
  children: React.ReactNode;
}

export function AdminFormLayout({ title, backHref, backLabel, children }: Props) {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <Link
          href={backHref}
          className="mb-4 inline-flex items-center gap-1.5 text-xs font-semibold text-white/40 transition-colors hover:text-white/70"
        >
          <ArrowLeft className="size-3.5" aria-hidden />
          {backLabel ?? "Retour"}
        </Link>
        <h1 className="text-xl font-bold text-white">{title}</h1>
      </div>

      <div className="max-w-3xl rounded-2xl border border-white/8 bg-white/5 p-6 lg:p-8">
        {children}
      </div>
    </div>
  );
}

// Champs de formulaire admin — fond sombre, options dark
export const fieldCls =
  "w-full rounded-xl border border-white/10 bg-white/8 px-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-lsy-gold-400/60 focus:ring-2 focus:ring-lsy-gold-400/20 transition";

// Select avec options dark (résout le fond blanc dans le dropdown natif)
export const selectCls =
  "w-full rounded-xl border border-white/10 bg-[#0f1829] px-4 py-2.5 text-sm text-white outline-none focus:border-lsy-gold-400/60 focus:ring-2 focus:ring-lsy-gold-400/20 transition [&>option]:bg-[#0f1829] [&>option]:text-white";

export const labelCls = "mb-1.5 block text-xs font-semibold text-white/60";

export const errorCls = "mt-1.5 text-xs text-red-400";
