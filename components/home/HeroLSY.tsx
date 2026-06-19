"use client";

import { useReducedMotion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowDown, ArrowRight, HardHat, Info, Microscope } from "lucide-react";
import { motion } from "framer-motion";
import { ScientificPattern } from "@/components/brand/ScientificPattern";
import { LogoLSY } from "@/components/brand/LogoLSY";
import { CountUp } from "@/components/animations/CountUp";
import { site } from "@/lib/site";

const STATS = [
  { value: site.foundedYear, label: "Année de fondation", prefix: "", suffix: "" },
  { value: 50, label: "Ans d'excellence", prefix: "~", suffix: "" },
  { value: site.inaugurationYear, label: "Inauguration officielle", prefix: "", suffix: "" },
];

const CTAS = [
  {
    label: "Découvrir le lycée",
    href: "/le-lycee/presentation",
    icon: Info,
    primary: false,
  },
  {
    label: "Conditions d'admission",
    href: "/admissions/vue-d-ensemble",
    icon: Microscope,
    primary: true,
  },
  {
    label: "Suivre la réhabilitation",
    href: "/le-lycee/rehabilitation",
    icon: HardHat,
    primary: false,
  },
];

export function HeroLSY() {
  const reduced = useReducedMotion();
  const dur = reduced ? 0 : 1;

  return (
    <section
      aria-label="Accueil — Lycée Scientifique de Yamoussoukro"
      className="relative flex min-h-[92svh] flex-col items-center justify-center overflow-hidden bg-lsy-blue-950 px-4 py-24 text-center text-white"
    >
      {/* Photo du campus en arrière-plan */}
      <Image
        src="/brand/Hero.jpeg"
        alt="Campus du Lycée Scientifique de Yamoussoukro"
        fill
        priority
        quality={85}
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Overlay sombre pour la lisibilité du texte */}
      <div className="absolute inset-0 bg-lsy-blue-950/75" aria-hidden />

      {/* Grille scientifique en fond */}
      <div className="bg-grid-science absolute inset-0 opacity-20" aria-hidden />

      {/* Motif SVG scientifique décoratif */}
      <ScientificPattern
        variant="orbit"
        className="absolute right-0 top-0 size-[36rem] -translate-y-1/4 translate-x-1/4 text-lsy-gold-400/10 md:size-[48rem]"
      />
      <ScientificPattern
        variant="atom"
        className="absolute bottom-0 left-0 size-[28rem] translate-y-1/3 -translate-x-1/4 text-lsy-blue-700/40"
      />

      {/* Liseré tricolore haut */}
      <div className="rule-civ absolute left-0 top-0 h-1 w-full" aria-hidden />

      {/* Halo doré central */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 size-[60rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lsy-gold-500/[0.03] blur-3xl"
      />

      {/* Contenu principal */}
      <div className="relative z-10 flex max-w-4xl flex-col items-center gap-6">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: dur * 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <LogoLSY variant="onDark" size="lg" href={null} showText={false} />
        </motion.div>

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: dur * 0.5, delay: dur * 0.2 }}
          className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-lsy-gold-300"
        >
          Établissement public d&apos;excellence — Côte d&apos;Ivoire
        </motion.p>

        {/* Titre principal */}
        <motion.h1
          initial={{ opacity: 0, y: reduced ? 0 : 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: dur * 0.8, delay: dur * 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-4xl font-bold leading-[1.06] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl"
        >
          {site.name}
        </motion.h1>

        {/* Sous-titre */}
        <motion.p
          initial={{ opacity: 0, y: reduced ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: dur * 0.7, delay: dur * 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl text-lg font-medium leading-relaxed text-white/75 sm:text-xl"
        >
          {site.tagline}
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: dur * 0.6, delay: dur * 0.55 }}
          className="max-w-xl text-[0.93rem] leading-relaxed text-white/50"
        >
          Institution de référence, le LSY forme des générations d&apos;élèves
          à fort potentiel scientifique dans un cadre fondé sur la rigueur,
          la discipline, l&apos;innovation et l&apos;ambition nationale.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: dur * 0.6, delay: dur * 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mt-2 flex flex-wrap justify-center gap-3"
        >
          {CTAS.map((cta) => {
            const Icon = cta.icon;
            return (
              <Link
                key={cta.href}
                href={cta.href}
                className={
                  cta.primary
                    ? "inline-flex items-center gap-2 rounded-full bg-lsy-gold-500 px-6 py-3 text-sm font-bold text-lsy-blue-950 shadow-gold transition-all hover:bg-lsy-gold-400 hover:shadow-lg"
                    : "inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/85 backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/10 hover:text-white"
                }
              >
                <Icon className="size-4" aria-hidden />
                {cta.label}
              </Link>
            );
          })}
        </motion.div>

        {/* Chiffres clés */}
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: dur * 0.6, delay: dur * 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 flex flex-wrap justify-center gap-px overflow-hidden rounded-2xl border border-white/10 backdrop-blur-sm"
        >
          {STATS.map((stat, i) => (
            <div
              key={i}
              className="flex min-w-[8rem] flex-1 flex-col items-center gap-1 bg-white/5 px-6 py-4"
            >
              <span className="text-gold-gradient font-display text-2xl font-bold sm:text-3xl">
                {stat.prefix}
                <CountUp value={stat.value} />
                {stat.suffix}
              </span>
              <span className="text-center text-[0.72rem] font-medium text-white/45">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Indicateur de scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: dur * 0.5, delay: dur * 1.1 }}
        aria-hidden
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={reduced ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex size-10 items-center justify-center rounded-full border border-white/15 text-white/35"
        >
          <ArrowDown className="size-4" />
        </motion.div>
      </motion.div>

      {/* Dégradé de fondu en bas */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-lsy-paper to-transparent"
      />
    </section>
  );
}
