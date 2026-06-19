import type { Metadata } from "next";
import { BookOpen, ClipboardCheck, GraduationCap, Target, Users } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { CTASection } from "@/components/sections/CTASection";
import { Reveal } from "@/components/animations/Reveal";

export const metadata: Metadata = {
  title: "Organisation pédagogique",
  description: "L'organisation pédagogique du Lycée Scientifique de Yamoussoukro : niveaux, encadrement et évaluation.",
};

const CYCLES = [
  {
    cycle: "Cycle collège",
    classes: ["4e", "3e"],
    description:
      "Cycle de formation fondamentale. Les élèves entrent en 4e après sélection par la DELC. L'accent est mis sur la rigueur en mathématiques, physique-chimie et SVT, tout en assurant une solide formation générale.",
    badge: "bg-lsy-blue-900 text-white",
  },
  {
    cycle: "Cycle lycée",
    classes: ["Seconde", "Première", "Terminale"],
    description:
      "Cycle préparatoire aux examens nationaux (BEPC, BAC) et aux grandes écoles. Les élèves de terminale sont orientés en séries scientifiques (C, D) et préparés aux concours de classes préparatoires.",
    badge: "bg-lsy-gold-500 text-lsy-blue-950",
  },
];

const FEATURES = [
  {
    icon: Users,
    title: "Classes à effectifs réduits",
    body: "Les classes du LSY accueillent des effectifs maîtrisés pour garantir un suivi individualisé de chaque élève.",
  },
  {
    icon: Target,
    title: "Programmes nationaux renforcés",
    body: "Les programmes officiels de l'ÉDUCATION NATIONALE sont appliqués avec des horaires renforcés en sciences.",
  },
  {
    icon: ClipboardCheck,
    title: "Évaluation continue",
    body: "Devoirs surveillés, compositions trimestrielles, TP notés et oraux blancs rythment l'année scolaire.",
  },
  {
    icon: GraduationCap,
    title: "Préparation aux concours",
    body: "Les élèves de terminale bénéficient d'une préparation intensive aux concours de grandes écoles et CPGE.",
  },
  {
    icon: BookOpen,
    title: "Ressources pédagogiques",
    body: "Bibliothèque, annales, corrigés et supports numériques disponibles pour chaque discipline.",
  },
  {
    icon: Users,
    title: "Encadrement 24h/24",
    body: "Conseillers d'éducation et surveillants assurent l'encadrement des pensionnaires en dehors des cours.",
  },
];

export default function OrganisationPedagogiquePage() {
  return (
    <PageShell flush>
      <PageHero
        eyebrow="Académie & Innovation"
        title="Organisation pédagogique"
        body="Un enseignement structuré en deux cycles, des classes à effectifs réduits et un encadrement permanent pour maximiser les résultats."
        breadcrumbs={[
          { label: "Académie & Innovation", href: "/academie-innovation/organisation-pedagogique" },
          { label: "Organisation pédagogique" },
        ]}
        pattern="wave"
      />

      <section className="bg-lsy-paper py-20 lg:py-28">
        <Container className="space-y-16">
          {/* Cycles */}
          <Reveal>
            <SectionHeader
              eyebrow="Les cycles"
              title="Du collège au lycée scientifique"
            />
          </Reveal>
          <div className="grid gap-6 lg:grid-cols-2">
            {CYCLES.map((c, i) => (
              <Reveal key={c.cycle} delay={i * 0.1}>
                <div className="flex h-full flex-col rounded-3xl bg-white p-7 shadow-soft ring-1 ring-lsy-line">
                  <div className="mb-4 flex flex-wrap gap-2">
                    {c.classes.map((cls) => (
                      <span
                        key={cls}
                        className={`rounded-full px-3 py-0.5 text-xs font-bold ${c.badge}`}
                      >
                        {cls}
                      </span>
                    ))}
                  </div>
                  <h2 className="mb-2 font-display text-2xl font-bold text-lsy-blue-900">{c.cycle}</h2>
                  <p className="flex-1 text-[0.95rem] leading-relaxed text-lsy-muted">{c.description}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Principes pédagogiques */}
          <div className="space-y-8">
            <Reveal>
              <SectionHeader
                eyebrow="Principes pédagogiques"
                title="Un cadre d'apprentissage rigoureux et bienveillant"
                align="center"
              />
            </Reveal>
            <FeatureGrid features={FEATURES} cols={3} />
          </div>
        </Container>
      </section>

      <CTASection
        eyebrow="Les programmes"
        title="Découvrez les disciplines enseignées"
        buttons={[
          { label: "Voir les programmes", href: "/academie-innovation/programmes", primary: true },
          { label: "Laboratoires", href: "/academie-innovation/laboratoires" },
        ]}
      />
    </PageShell>
  );
}
