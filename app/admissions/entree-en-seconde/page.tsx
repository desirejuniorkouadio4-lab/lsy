import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { CTASection } from "@/components/sections/CTASection";
import { Reveal } from "@/components/animations/Reveal";
import { Stagger, StaggerItem } from "@/components/animations/Stagger";
import { steps2nd, requiredDocs2nd } from "@/data/admissions";

export const metadata: Metadata = {
  title: "Entrée en seconde",
  description: "Procédure et conditions d'admission en classe de seconde au Lycée Scientifique de Yamoussoukro.",
};

export default function EntreeEnSecondePage() {
  return (
    <PageShell flush>
      <PageHero
        eyebrow="Admissions"
        title="Entrée en seconde"
        body="Pour les titulaires du BEPC avec d'excellents résultats en mathématiques et sciences. Une sélection rigoureuse sur dossier académique."
        breadcrumbs={[
          { label: "Admissions", href: "/admissions/vue-d-ensemble" },
          { label: "Entrée en seconde" },
        ]}
        pattern="molecule"
      />

      <section className="bg-lsy-paper py-20 lg:py-28">
        <Container>
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
            {/* Étapes */}
            <div className="space-y-8">
              <Reveal>
                <SectionHeader
                  eyebrow="Procédure"
                  title="Les étapes de candidature"
                  body="Suivez ces étapes pour postuler à l'entrée en classe de seconde au LSY."
                />
              </Reveal>
              <Stagger className="space-y-4" stagger={0.08}>
                {steps2nd.map((step, i) => (
                  <StaggerItem key={step.step}>
                    <div className="flex gap-4 rounded-2xl bg-white p-5 shadow-soft ring-1 ring-lsy-line">
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-lsy-gold-500 font-display text-base font-bold text-lsy-blue-950">
                        {i + 1}
                      </div>
                      <div className="space-y-1">
                        <p className="font-bold text-lsy-blue-900">{step.title}</p>
                        <p className="text-sm leading-relaxed text-lsy-muted">{step.description}</p>
                        {step.deadline && (
                          <p className="text-xs font-semibold text-lsy-gold-600">
                            Délai : {step.deadline}
                          </p>
                        )}
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>

            {/* Documents requis */}
            <Reveal delay={0.15}>
              <div className="space-y-6">
                <SectionHeader
                  eyebrow="Dossier"
                  title="Documents à fournir"
                />
                <ul className="space-y-2.5">
                  {requiredDocs2nd.map((doc) => (
                    <li key={doc.name} className="flex items-start gap-3 rounded-xl border border-lsy-line bg-white p-3.5">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-lsy-success" aria-hidden />
                      <span className="text-sm text-lsy-slate">{doc.name}</span>
                    </li>
                  ))}
                </ul>
                <div className="rounded-2xl bg-lsy-gold-100 border border-lsy-gold-500/30 p-5">
                  <p className="text-sm font-semibold text-lsy-gold-700 mb-1">Critère clé</p>
                  <p className="text-sm text-lsy-slate">
                    Un excellent niveau en mathématiques et en sciences physiques
                    est indispensable. La moyenne générale du BEPC et les appréciations
                    des enseignants sont des critères déterminants.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <CTASection
        eyebrow="Questions ?"
        title="Besoin d'aide pour votre candidature ?"
        buttons={[
          { label: "Consulter la FAQ", href: "/admissions/faq", primary: true },
          { label: "Vue d'ensemble des admissions", href: "/admissions/vue-d-ensemble" },
        ]}
      />
    </PageShell>
  );
}
