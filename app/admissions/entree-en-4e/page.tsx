import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { CTASection } from "@/components/sections/CTASection";
import { Reveal } from "@/components/animations/Reveal";
import { Stagger, StaggerItem } from "@/components/animations/Stagger";
import { steps4e, requiredDocs4e } from "@/data/admissions";

export const metadata: Metadata = {
  title: "Entrée en 4e",
  description: "Procédure et conditions d'admission en classe de 4e au Lycée Scientifique de Yamoussoukro.",
};

export default function EntreeEn4ePage() {
  return (
    <PageShell flush>
      <PageHero
        eyebrow="Admissions"
        title="Entrée en 4e"
        body="Pour les élèves scolarisés en 5e à fort potentiel scientifique. Une sélection sur dossier et concours, pilotée par la Direction des Établissements et de la Logistique Centralisée (DELC)."
        breadcrumbs={[
          { label: "Admissions", href: "/admissions/vue-d-ensemble" },
          { label: "Entrée en 4e" },
        ]}
        pattern="atom"
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
                  body="Suivez ces étapes dans l'ordre pour soumettre votre dossier de candidature en 4e."
                />
              </Reveal>
              <Stagger className="space-y-4" stagger={0.08}>
                {steps4e.map((step, i) => (
                  <StaggerItem key={step.step}>
                    <div className="flex gap-4 rounded-2xl bg-white p-5 shadow-soft ring-1 ring-lsy-line">
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-lsy-blue-900 font-display text-base font-bold text-white">
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
                  {requiredDocs4e.map((doc) => (
                    <li key={doc.name} className="flex items-start gap-3 rounded-xl border border-lsy-line bg-white p-3.5">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-lsy-success" aria-hidden />
                      <span className="text-sm text-lsy-slate">{doc.name}</span>
                    </li>
                  ))}
                </ul>
                <div className="rounded-2xl bg-lsy-blue-900/5 border border-lsy-blue-900/10 p-5">
                  <p className="text-sm font-semibold text-lsy-blue-900 mb-1">Important</p>
                  <p className="text-sm text-lsy-slate">
                    La procédure d&apos;admission est gérée par la DELC (Direction des
                    Établissements et de la Logistique Centralisée). Consultez leur
                    site ou contactez-les pour les dates précises de dépôt de dossier.
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
          { label: "Documents à fournir", href: "/admissions/documents" },
        ]}
      />
    </PageShell>
  );
}
