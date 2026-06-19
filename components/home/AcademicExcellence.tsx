import Link from "next/link";
import {
  ArrowRight,
  Atom,
  Award,
  BookOpen,
  Code2,
  FlaskConical,
  Leaf,
  Microscope,
  Sigma,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/animations/Reveal";
import { Stagger, StaggerItem } from "@/components/animations/Stagger";

const DISCIPLINES = [
  {
    icon: Sigma,
    label: "Mathématiques",
    body: "Algèbre, analyse, géométrie et statistiques — socle de toute pensée scientifique rigoureuse.",
    href: "/academie-innovation/programmes",
  },
  {
    icon: Atom,
    label: "Physique-Chimie",
    body: "Expérimentation, lois fondamentales et applications industrielles dans des laboratoires équipés.",
    href: "/academie-innovation/laboratoires",
  },
  {
    icon: Leaf,
    label: "SVT",
    body: "Sciences de la Vie et de la Terre : biologie cellulaire, génétique et sciences de l'environnement.",
    href: "/academie-innovation/programmes",
  },
  {
    icon: Code2,
    label: "Informatique",
    body: "Algorithmique, programmation Python et culture numérique pour les défis technologiques du siècle.",
    href: "/academie-innovation/programmes",
  },
  {
    icon: FlaskConical,
    label: "Laboratoires",
    body: "Physique, chimie et SVT — des espaces pratiques en cours de modernisation pour des TP de qualité.",
    href: "/academie-innovation/laboratoires",
  },
  {
    icon: Microscope,
    label: "Recherche junior",
    body: "Projets scientifiques encadrés pour initier les meilleurs élèves à la démarche de recherche.",
    href: "/academie-innovation/recherche-scientifique-junior",
  },
  {
    icon: BookOpen,
    label: "Ressources pédagogiques",
    body: "Sujets d'examens, corrigés et supports filtrables par niveau, matière et année.",
    href: "/academie-innovation/ressources-pedagogiques",
  },
  {
    icon: Award,
    label: "Examens & concours",
    body: "BEPC, BAC et olympiades — des élèves régulièrement distingués dans les compétitions nationales.",
    href: "/academie-innovation/examens-et-concours",
  },
];

export function AcademicExcellence() {
  return (
    <section
      aria-label="Académie & Innovation"
      className="bg-lsy-ivory py-20 lg:py-28"
    >
      <Container>
        <div className="grid gap-14 lg:grid-cols-[1fr_2fr] lg:gap-16 lg:items-start">
          {/* Colonne éditoriale */}
          <Reveal>
            <div className="space-y-5 lg:sticky lg:top-24">
              <Eyebrow>Académie & Innovation</Eyebrow>
              <h2 className="font-display text-4xl font-bold leading-tight text-lsy-blue-900 lg:text-5xl">
                Un enseignement scientifique de haut niveau
              </h2>
              <p className="text-[1.02rem] leading-relaxed text-lsy-slate">
                Du collège à la Terminale, le LSY propose un parcours scientifique
                exigeant, encadré par des enseignants spécialisés, dans des
                laboratoires équipés et avec des programmes adaptés aux concours
                nationaux et internationaux.
              </p>
              <Link
                href="/academie-innovation/organisation-pedagogique"
                className="inline-flex items-center gap-2 rounded-full bg-lsy-blue-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-lsy-blue-800"
              >
                Organisation pédagogique
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </Reveal>

          {/* Grille des disciplines */}
          <Stagger className="grid gap-3 sm:grid-cols-2" stagger={0.07}>
            {DISCIPLINES.map((d) => {
              const Icon = d.icon;
              return (
                <StaggerItem key={d.label}>
                  <Link
                    href={d.href}
                    className="group flex gap-4 rounded-2xl bg-white p-5 shadow-soft ring-1 ring-lsy-line transition-all hover:shadow-card hover:ring-lsy-gold-400/40"
                  >
                    <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl bg-lsy-blue-900/5 text-lsy-blue-800 transition-colors group-hover:bg-lsy-gold-500 group-hover:text-lsy-blue-950">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <div className="min-w-0 space-y-1">
                      <p className="flex items-center gap-1 font-bold text-lsy-blue-900">
                        {d.label}
                        <ArrowRight className="size-3.5 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" aria-hidden />
                      </p>
                      <p className="text-[0.82rem] leading-snug text-lsy-muted">
                        {d.body}
                      </p>
                    </div>
                  </Link>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </Container>
    </section>
  );
}
