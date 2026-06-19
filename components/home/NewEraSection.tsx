import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  FlaskConical,
  HardHat,
  Monitor,
  Sparkles,
  Users,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/animations/Reveal";
import { Stagger, StaggerItem } from "@/components/animations/Stagger";
import { ScientificPattern } from "@/components/brand/ScientificPattern";

const ERA_CARDS = [
  {
    icon: HardHat,
    title: "Réhabilitation des infrastructures",
    body: "Rénovation complète des bâtiments, des salles de classe et des espaces communs pour offrir un cadre d'apprentissage moderne.",
  },
  {
    icon: FlaskConical,
    title: "Laboratoires modernisés",
    body: "Équipements scientifiques de nouvelle génération en physique, chimie et SVT, conformes aux standards internationaux.",
  },
  {
    icon: Monitor,
    title: "Espaces numériques",
    body: "Création de nouveaux espaces connectés : salles informatiques, espace multimédia et plateforme numérique pédagogique.",
  },
  {
    icon: Users,
    title: "Capacité d'accueil renforcée",
    body: "Extension et modernisation de l'internat pour accueillir davantage d'élèves dans de meilleures conditions de vie.",
  },
  {
    icon: BookOpen,
    title: "Classes préparatoires",
    body: "Développement de filières préparatoires aux grandes écoles scientifiques, pour les meilleurs élèves de Terminale.",
  },
  {
    icon: Sparkles,
    title: "Pôle scientifique national",
    body: "Ambition de devenir un Centre National de Développement Scientifique, rayonnant sur toute l'Afrique de l'Ouest.",
  },
];

export function NewEraSection() {
  return (
    <section
      aria-label="La nouvelle ère du LSY"
      className="relative overflow-hidden bg-lsy-blue-950 py-20 text-white lg:py-28"
    >
      {/* Grille et motif */}
      <div className="bg-grid-science absolute inset-0 opacity-30" aria-hidden />
      <ScientificPattern
        variant="constellation"
        className="absolute right-0 top-0 size-[40rem] translate-x-1/3 -translate-y-1/4 text-lsy-gold-400/8"
      />

      {/* Liseré tricolore */}
      <div className="rule-civ absolute left-0 top-0 h-1 w-full" aria-hidden />

      <Container className="relative z-10">
        <Reveal>
          <div className="max-w-2xl space-y-4 text-center mx-auto mb-14">
            <Eyebrow className="text-lsy-gold-300">Nouvelle ère</Eyebrow>
            <h2 className="font-display text-4xl font-bold leading-tight lg:text-5xl">
              Le LSY se réinvente
            </h2>
            <p className="text-[1.05rem] leading-relaxed text-white/60">
              Un projet de réhabilitation et de modernisation d&apos;envergure
              nationale pour faire du LSY un établissement de référence à
              l&apos;échelle africaine.
            </p>
          </div>
        </Reveal>

        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
          {ERA_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <StaggerItem key={card.title}>
                <div className="glass-dark group flex gap-4 rounded-2xl p-5 transition-all hover:border-lsy-gold-500/25">
                  <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl bg-lsy-gold-500/10 text-lsy-gold-400 transition-colors group-hover:bg-lsy-gold-500 group-hover:text-lsy-blue-950">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <div className="space-y-1">
                    <p className="font-bold text-white">{card.title}</p>
                    <p className="text-sm leading-relaxed text-white/50">
                      {card.body}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>

        <Reveal delay={0.3}>
          <div className="mt-12 flex justify-center">
            <Link
              href="/le-lycee/rehabilitation"
              className="inline-flex items-center gap-2.5 rounded-full border border-lsy-gold-500/40 bg-lsy-gold-500/10 px-7 py-3.5 text-sm font-bold text-lsy-gold-300 transition-all hover:border-lsy-gold-400/60 hover:bg-lsy-gold-500/20 hover:text-lsy-gold-200"
            >
              Suivre le projet de réhabilitation
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
