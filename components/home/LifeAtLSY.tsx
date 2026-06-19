import Link from "next/link";
import {
  ArrowRight,
  BedDouble,
  Cpu,
  Dumbbell,
  HandHeart,
  HeartPulse,
  Palette,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/animations/Reveal";
import { Stagger, StaggerItem } from "@/components/animations/Stagger";
import { ScientificPattern } from "@/components/brand/ScientificPattern";

const LIFE_ITEMS = [
  {
    icon: BedDouble,
    title: "Internat",
    body: "Un cadre de vie encadré, structuré et convivial, propice à la concentration et à la réussite.",
    href: "/vie-au-lysee/internat",
    span: "lg:col-span-2",
    dark: true,
  },
  {
    icon: Cpu,
    title: "Clubs & activités",
    body: "Sciences, robotique, informatique, débat, environnement, arts — des activités pour tous les profils.",
    href: "/vie-au-lysee/clubs",
    span: "",
    dark: false,
  },
  {
    icon: Dumbbell,
    title: "Sport & culture",
    body: "Football, athlétisme, cérémonies culturelles et compétitions inter-lycées tout au long de l'année.",
    href: "/vie-au-lysee/sport-et-culture",
    span: "",
    dark: false,
  },
  {
    icon: HeartPulse,
    title: "Santé & infirmerie",
    body: "Personnel médical disponible pour les soins courants et la gestion des urgences.",
    href: "/vie-au-lysee/sante-et-infirmerie",
    span: "",
    dark: false,
  },
  {
    icon: HandHeart,
    title: "Soutien psychologique",
    body: "Écoute, orientation et accompagnement pour les élèves qui en ont besoin.",
    href: "/vie-au-lysee/soutien-psychologique",
    span: "",
    dark: false,
  },
  {
    icon: Palette,
    title: "Arts & expression",
    body: "Valorisation des talents artistiques et de la créativité au sein de la communauté scolaire.",
    href: "/vie-au-lysee/sport-et-culture",
    span: "",
    dark: false,
  },
];

export function LifeAtLSY() {
  return (
    <section
      aria-label="Vie au LSY"
      className="relative overflow-hidden bg-lsy-blue-950 py-20 text-white lg:py-28"
    >
      <div className="bg-grid-science absolute inset-0 opacity-25" aria-hidden />
      <ScientificPattern
        variant="wave"
        className="absolute left-0 bottom-0 size-[32rem] -translate-x-1/3 translate-y-1/4 text-lsy-blue-800/50"
      />
      <div className="rule-civ absolute left-0 top-0 h-1 w-full" aria-hidden />

      <Container className="relative z-10">
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <Reveal>
            <div className="max-w-xl space-y-3">
              <Eyebrow className="text-lsy-gold-300">Vie au LSY</Eyebrow>
              <h2 className="font-display text-4xl font-bold leading-tight lg:text-5xl">
                Un cadre de vie pour s&apos;épanouir
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <Link
              href="/vie-au-lysee/internat"
              className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-lsy-gold-300 hover:text-lsy-gold-200"
            >
              Explorer la vie scolaire
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Reveal>
        </div>

        {/* Mosaïque */}
        <Stagger
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          stagger={0.08}
        >
          {LIFE_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <StaggerItem key={item.title} className={item.span}>
                <Link
                  href={item.href}
                  className={`group flex h-full min-h-[9rem] flex-col justify-between rounded-2xl p-5 transition-all ${
                    item.dark
                      ? "bg-lsy-gold-500 text-lsy-blue-950 hover:bg-lsy-gold-400"
                      : "glass-dark hover:border-lsy-gold-500/25"
                  }`}
                >
                  <Icon
                    className={`size-7 transition-colors ${item.dark ? "text-lsy-blue-900" : "text-lsy-gold-400"}`}
                    aria-hidden
                  />
                  <div className="space-y-1.5">
                    <p
                      className={`font-bold ${item.dark ? "text-lsy-blue-950" : "text-white"}`}
                    >
                      {item.title}
                    </p>
                    <p
                      className={`text-sm leading-relaxed ${item.dark ? "text-lsy-blue-900/70" : "text-white/50"}`}
                    >
                      {item.body}
                    </p>
                    <p
                      className={`inline-flex items-center gap-1 text-xs font-semibold opacity-0 transition-opacity group-hover:opacity-100 ${item.dark ? "text-lsy-blue-800" : "text-lsy-gold-300"}`}
                    >
                      En savoir plus
                      <ArrowRight className="size-3" aria-hidden />
                    </p>
                  </div>
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Container>
    </section>
  );
}
