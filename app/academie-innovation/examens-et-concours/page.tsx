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
  title: "Examens et concours",
  description: "Les examens nationaux et concours scientifiques auxquels participent les élèves du Lycée Scientifique de Yamoussoukro.",
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

export default function ExamensConcourtsPage() {
  return (
    <PageShell flush>
      <PageHero
        eyebrow="Académie & Innovation"
        title="Examens et concours"
        body="Du BEPC au Baccalauréat, en passant par les olympiades et les concours de grandes écoles — une préparation aux plus hautes exigences académiques."
        breadcrumbs={[
          { label: "Académie & Innovation", href: "/academie-innovation/organisation-pedagogique" },
          { label: "Examens et concours" },
        ]}
        pattern="orbit"
      />

      {/* Examens nationaux */}
      <section className="bg-lsy-paper py-20 lg:py-28">
        <Container className="space-y-12">
          <Reveal>
            <SectionHeader
              eyebrow="Préparation"
              title="Examens et concours du LSY"
              body="Les élèves du LSY sont préparés aux examens officiels de l'Éducation Nationale ivoirienne et aux concours scientifiques d'envergure nationale, panafricaine et internationale."
            />
          </Reveal>

          {/* Examens officiels */}
          <Reveal delay={0.1}>
            <div className="rounded-3xl bg-lsy-blue-950 p-7 text-white">
              <p className="mb-4 text-[0.72rem] font-bold uppercase tracking-[0.18em] text-lsy-gold-300">
                Examens officiels
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { title: "BEPC", desc: "Brevet d'Études du Premier Cycle — Classes de 3e. Taux de réussite historiquement élevé au LSY.", badge: "bg-lsy-gold-500 text-lsy-blue-950" },
                  { title: "Baccalauréat C & D", desc: "Séries scientifiques — Classes de Terminale. Préparation intensive aux épreuves écrites et pratiques.", badge: "bg-lsy-gold-600 text-white" },
                ].map((exam) => (
                  <div key={exam.title} className="rounded-2xl bg-white/8 p-5">
                    <span className={cn("inline-flex rounded-full px-3 py-0.5 text-xs font-bold", exam.badge)}>
                      {exam.title}
                    </span>
                    <p className="mt-3 text-sm leading-relaxed text-white/70">{exam.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Concours */}
          <Stagger className="grid gap-5 lg:grid-cols-2" stagger={0.08}>
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
        eyebrow="Excellence & Alumni"
        title="Des résultats qui témoignent de l'excellence du LSY"
        buttons={[
          { label: "Palmarès des majors", href: "/excellence-alumni/majors", primary: true },
          { label: "Résultats", href: "/excellence-alumni/resultats" },
        ]}
      />
    </PageShell>
  );
}
