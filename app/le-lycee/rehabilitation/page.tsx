import type { Metadata } from "next";
import { AlertCircle, BookOpen, CheckCircle2, FlaskConical, HardHat, Monitor, Users } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { CTASection } from "@/components/sections/CTASection";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/animations/Reveal";
import { rehabilitationFacts } from "@/data/institution";

export const metadata: Metadata = {
  title: "Réhabilitation",
  description: "Le projet de réhabilitation et de modernisation du Lycée Scientifique de Yamoussoukro.",
};

const AXES = [
  { icon: HardHat, title: "Rénovation des bâtiments", body: "Réhabilitation complète des bâtiments scolaires, des dortoirs et des espaces communs pour un cadre de vie digne et moderne." },
  { icon: FlaskConical, title: "Laboratoires modernes", body: "Renouvellement des équipements scientifiques en physique, chimie et SVT selon les standards internationaux." },
  { icon: Monitor, title: "Infrastructure numérique", body: "Déploiement d'une connexion haut débit, de salles informatiques modernes et d'une plateforme pédagogique en ligne." },
  { icon: Users, title: "Capacité d'accueil", body: "Extension de l'internat pour accueillir davantage d'élèves dans des conditions d'hébergement améliorées." },
  { icon: BookOpen, title: "Classes préparatoires", body: "Création de filières préparatoires aux grandes écoles et aux concours scientifiques de haut niveau." },
  { icon: AlertCircle, title: "Mise aux normes", body: "Conformité aux normes de sécurité, d'accessibilité et environnementales en vigueur." },
];

export default function RehabilitationPage() {
  return (
    <PageShell flush>
      <PageHero
        eyebrow="Le Lycée"
        title="Projet de réhabilitation"
        body="Le LSY entre dans une nouvelle ère. Un projet d'envergure nationale pour moderniser ses infrastructures et renforcer son rayonnement scientifique."
        breadcrumbs={[
          { label: "Le Lycée", href: "/le-lycee/presentation" },
          { label: "Réhabilitation" },
        ]}
        pattern="orbit"
      >
        <Badge variant="orange" className="text-sm px-4 py-1.5">
          En cours — {new Date().getFullYear()}
        </Badge>
      </PageHero>

      {/* Contexte */}
      <section className="bg-lsy-paper py-20 lg:py-28">
        <Container className="space-y-12">
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
              <div className="space-y-4">
                <SectionHeader
                  eyebrow="Contexte"
                  title="Pourquoi ce projet ?"
                  body={rehabilitationFacts.context}
                />
              </div>
              <div className="space-y-3 rounded-3xl border border-lsy-line bg-lsy-ivory p-6">
                <p className="text-[0.72rem] font-bold uppercase tracking-[0.18em] text-lsy-muted">
                  Objectifs du projet
                </p>
                <ul className="space-y-2.5">
                  {rehabilitationFacts.objectives.map((obj) => (
                    <li key={obj} className="flex items-start gap-2.5 text-sm text-lsy-slate">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-lsy-success" aria-hidden />
                      {obj}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 rounded-2xl bg-lsy-orange/10 border border-lsy-orange/25 p-4">
                  <p className="text-xs font-semibold text-lsy-orange mb-1">Situation actuelle</p>
                  <p className="text-sm text-lsy-slate">{rehabilitationFacts.statusNote}</p>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="space-y-8">
            <Reveal>
              <SectionHeader
                eyebrow="Axes du projet"
                title="Les 6 chantiers prioritaires"
                align="center"
              />
            </Reveal>
            <FeatureGrid features={AXES} cols={3} />
          </div>
        </Container>
      </section>

      <CTASection
        eyebrow="Soutenir le LSY"
        title="Contribuez à l'avenir du LSY"
        body="Entreprises, fondations, alumnis — plusieurs modalités de soutien sont disponibles pour accompagner ce projet historique."
        buttons={[
          { label: "Devenir partenaire", href: "/soutenir/partenaires", primary: true },
          { label: "Infrastructures actuelles", href: "/le-lycee/infrastructures" },
        ]}
      />
    </PageShell>
  );
}
