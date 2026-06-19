import type { Metadata } from "next";
import { AlertCircle, CalendarDays } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { CTASection } from "@/components/sections/CTASection";
import { Reveal } from "@/components/animations/Reveal";

export const metadata: Metadata = {
  title: "Calendrier des admissions",
  description: "Les dates et échéances du calendrier des admissions au Lycée Scientifique de Yamoussoukro.",
};

const PHASES = [
  {
    phase: "Phase 1",
    title: "Ouverture des inscriptions",
    date: "À confirmer par la DELC",
    description: "Mise à disposition des dossiers de candidature auprès de la DELC et des établissements agréés.",
    status: "upcoming",
  },
  {
    phase: "Phase 2",
    title: "Dépôt des dossiers",
    date: "À confirmer par la DELC",
    description: "Dépôt des dossiers complets dans les délais fixés. Aucun dossier incomplet ne sera accepté après la date limite.",
    status: "upcoming",
  },
  {
    phase: "Phase 3",
    title: "Étude des dossiers",
    date: "À confirmer par la DELC",
    description: "Examen des candidatures par la commission d'admission selon les critères académiques définis.",
    status: "upcoming",
  },
  {
    phase: "Phase 4",
    title: "Résultats",
    date: "À confirmer par la DELC",
    description: "Publication des résultats et communication aux familles concernées.",
    status: "upcoming",
  },
  {
    phase: "Phase 5",
    title: "Inscriptions définitives",
    date: "À confirmer par la DELC",
    description: "Finalisation des inscriptions des candidats retenus, versement des frais de scolarité et signature du contrat.",
    status: "upcoming",
  },
];

export default function CalendrierAdmissionsPage() {
  return (
    <PageShell flush>
      <PageHero
        eyebrow="Admissions"
        title="Calendrier des admissions"
        body="Les grandes étapes et échéances du processus d'admission au Lycée Scientifique de Yamoussoukro pour l'année scolaire en cours."
        breadcrumbs={[
          { label: "Admissions", href: "/admissions/vue-d-ensemble" },
          { label: "Calendrier" },
        ]}
        pattern="wave"
      />

      <section className="bg-lsy-paper py-20 lg:py-28">
        <Container className="space-y-12">
          <Reveal>
            <div className="flex items-start gap-4 rounded-2xl border border-lsy-orange/30 bg-lsy-orange/8 p-5">
              <AlertCircle className="mt-0.5 size-5 shrink-0 text-lsy-orange" aria-hidden />
              <div>
                <p className="font-semibold text-[#b5610f]">Calendrier en attente de confirmation</p>
                <p className="mt-1 text-sm text-lsy-slate">
                  Les dates officielles sont fixées par la Direction des Établissements et de la
                  Logistique Centralisée (DELC). Elles seront mises à jour dès leur publication.
                  Consultez régulièrement cette page ou contactez-nous.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <SectionHeader
              eyebrow="Calendrier prévisionnel"
              title="Les grandes phases"
              body="Voici les étapes habituelles du processus d'admission. Les dates précises seront publiées par la DELC."
            />
          </Reveal>

          <div className="space-y-4">
            {PHASES.map((phase, i) => (
              <Reveal key={phase.phase} delay={i * 0.07}>
                <div className="flex gap-5 rounded-2xl bg-white p-5 shadow-soft ring-1 ring-lsy-line">
                  <div className="flex flex-col items-center gap-2">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-lsy-blue-900 text-xs font-bold text-white">
                      {i + 1}
                    </span>
                    {i < PHASES.length - 1 && (
                      <div className="w-0.5 flex-1 rounded-full bg-lsy-line" />
                    )}
                  </div>
                  <div className="space-y-1 pt-1">
                    <p className="text-[0.72rem] font-bold uppercase tracking-[0.18em] text-lsy-gold-600">
                      {phase.phase}
                    </p>
                    <p className="font-bold text-lsy-blue-900">{phase.title}</p>
                    <p className="flex items-center gap-1.5 text-xs font-semibold text-lsy-muted">
                      <CalendarDays className="size-3.5" aria-hidden />
                      {phase.date}
                    </p>
                    <p className="text-sm leading-relaxed text-lsy-muted">{phase.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CTASection
        eyebrow="Préparer votre candidature"
        title="N'attendez pas la dernière minute"
        body="Constituez votre dossier dès maintenant pour être prêt lorsque les inscriptions seront ouvertes."
        buttons={[
          { label: "Documents à fournir", href: "/admissions/documents", primary: true },
          { label: "Consulter la FAQ", href: "/admissions/faq" },
        ]}
      />
    </PageShell>
  );
}
