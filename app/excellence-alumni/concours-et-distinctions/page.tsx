import type { Metadata } from "next";
import { Award } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { CTASection } from "@/components/sections/CTASection";
import { Reveal } from "@/components/animations/Reveal";
import { Stagger, StaggerItem } from "@/components/animations/Stagger";
import { contests } from "@/data/academics";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Concours et distinctions",
  description: "Les distinctions et participations du Lycée Scientifique de Yamoussoukro dans les concours nationaux et internationaux.",
};

const LEVEL_COLORS: Record<string, string> = {
  national: "bg-lsy-blue-900 text-white",
  regional: "bg-lsy-blue-700 text-white",
  africain: "bg-lsy-gold-500 text-lsy-blue-950",
  international: "bg-lsy-gold-600 text-white",
};

const LEVEL_LABELS: Record<string, string> = {
  national: "National",
  regional: "Régional",
  africain: "Africain",
  international: "International",
};

export default function ConcoursDistinctionsPage() {
  return (
    <PageShell flush>
      <PageHero
        eyebrow="Excellence & Alumni"
        title="Concours et distinctions"
        body="Les élèves du LSY brillent au-delà des examens officiels — olympiades, prix scientifiques et concours d'envergure panafricaine et internationale."
        breadcrumbs={[
          { label: "Excellence & Alumni", href: "/excellence-alumni/majors" },
          { label: "Concours et distinctions" },
        ]}
        pattern="orbit"
      />

      <section className="bg-lsy-paper py-20 lg:py-28">
        <Container className="space-y-12">
          <Reveal>
            <SectionHeader
              eyebrow="Distinctions"
              title="Un rayonnement au-delà des frontières"
              body="De Yamoussoukro aux scènes africaines et internationales, les élèves du LSY portent haut les couleurs de l'excellence scientifique ivoirienne."
            />
          </Reveal>

          <Stagger className="grid gap-5 lg:grid-cols-2" stagger={0.07}>
            {contests.map((contest) => (
              <StaggerItem key={contest.name}>
                <div className="flex h-full flex-col rounded-3xl bg-white p-6 shadow-soft ring-1 ring-lsy-line">
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <Award className="mt-0.5 size-5 shrink-0 text-lsy-gold-600" aria-hidden />
                      <div>
                        <h2 className="font-bold leading-snug text-lsy-blue-900">{contest.name}</h2>
                        <p className="text-xs text-lsy-muted">{contest.discipline}</p>
                      </div>
                    </div>
                    <span
                      className={cn(
                        "shrink-0 rounded-full px-2.5 py-0.5 text-[0.65rem] font-bold",
                        LEVEL_COLORS[contest.level],
                      )}
                    >
                      {LEVEL_LABELS[contest.level]}
                    </span>
                  </div>

                  <p className="flex-1 text-sm leading-relaxed text-lsy-muted">{contest.description}</p>

                  {contest.lsyParticipation && (
                    <div className="mt-4 rounded-xl bg-lsy-ivory px-4 py-3">
                      <p className="text-xs font-semibold text-lsy-blue-900">Participation du LSY</p>
                      <p className="mt-0.5 text-xs text-lsy-muted">{contest.lsyParticipation}</p>
                    </div>
                  )}
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <CTASection
        eyebrow="Palmarès"
        title="Consulter le palmarès des majors"
        buttons={[
          { label: "Palmarès des majors", href: "/excellence-alumni/majors", primary: true },
          { label: "Résultats", href: "/excellence-alumni/resultats" },
        ]}
      />
    </PageShell>
  );
}
