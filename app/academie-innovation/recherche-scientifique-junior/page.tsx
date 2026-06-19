import type { Metadata } from "next";
import { CheckCircle2, Microscope } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { CTASection } from "@/components/sections/CTASection";
import { Reveal } from "@/components/animations/Reveal";
import { Stagger, StaggerItem } from "@/components/animations/Stagger";
import { juniorResearchInfo } from "@/data/academics";

export const metadata: Metadata = {
  title: "Recherche scientifique junior",
  description: "Le programme de recherche scientifique junior du Lycée Scientifique de Yamoussoukro.",
};

export default function RechercheScientifiqueJuniorPage() {
  return (
    <PageShell flush>
      <PageHero
        eyebrow="Académie & Innovation"
        title="Recherche scientifique junior"
        body="Initiation à la démarche scientifique rigoureuse dès le secondaire : projets tutorés, investigations originales et culture de la recherche."
        breadcrumbs={[
          { label: "Académie & Innovation", href: "/academie-innovation/organisation-pedagogique" },
          { label: "Recherche junior" },
        ]}
        pattern="constellation"
      />

      <section className="bg-lsy-paper py-20 lg:py-28">
        <Container className="space-y-16">
          {/* Introduction */}
          <Reveal>
            <div className="mx-auto max-w-3xl space-y-5 rounded-3xl bg-lsy-blue-950 p-8 text-white">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-white/10">
                <Microscope className="size-6 text-lsy-gold-400" aria-hidden />
              </div>
              <h2 className="font-display text-2xl font-bold">{juniorResearchInfo.title}</h2>
              <p className="leading-relaxed text-white/70">{juniorResearchInfo.introduction}</p>
            </div>
          </Reveal>

          {/* Objectifs */}
          <div className="grid gap-10 lg:grid-cols-2">
            <Reveal>
              <div className="space-y-5">
                <SectionHeader eyebrow="Objectifs" title="Ce que le programme développe" />
                <ul className="space-y-3">
                  {juniorResearchInfo.objectives.map((obj) => (
                    <li key={obj} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-lsy-success" aria-hidden />
                      <span className="text-[0.95rem] text-lsy-slate">{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="space-y-5">
                <SectionHeader eyebrow="Domaines" title="Champs de recherche couverts" />
                <Stagger className="space-y-2" stagger={0.06}>
                  {juniorResearchInfo.domains.map((domain, i) => (
                    <StaggerItem key={domain}>
                      <div className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-soft ring-1 ring-lsy-line">
                        <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-lsy-blue-900 text-xs font-bold text-white">
                          {i + 1}
                        </span>
                        <span className="text-sm font-semibold text-lsy-blue-900">{domain}</span>
                      </div>
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>
            </Reveal>
          </div>

          {/* Note de statut */}
          <Reveal>
            <div className="rounded-2xl border border-lsy-gold-300/50 bg-lsy-gold-50 p-5">
              <p className="text-sm text-lsy-blue-800">
                <strong className="text-lsy-blue-900">Note :</strong>{" "}
                {juniorResearchInfo.statusNote}
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <CTASection
        eyebrow="Examens & concours"
        title="Des élèves préparés aux plus hauts niveaux"
        buttons={[
          { label: "Examens et concours", href: "/academie-innovation/examens-et-concours", primary: true },
          { label: "Laboratoires", href: "/academie-innovation/laboratoires" },
        ]}
      />
    </PageShell>
  );
}
