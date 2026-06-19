import type { Metadata } from "next";
import { AlertCircle, Dumbbell, Music, Trophy } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { CTASection } from "@/components/sections/CTASection";
import { Reveal } from "@/components/animations/Reveal";
import { Stagger, StaggerItem } from "@/components/animations/Stagger";
import { sportsInfo } from "@/data/clubs";

export const metadata: Metadata = {
  title: "Sport et culture",
  description: "Les activités sportives et culturelles au Lycée Scientifique de Yamoussoukro.",
};

const CULTURAL_EVENTS = [
  "Journée portes ouvertes annuelle",
  "Cérémonie de remise des diplômes",
  "Semaine culturelle du LSY",
  "Concours d'éloquence et de débat",
  "Soirée de gala des majors",
  "Célébrations nationales (Fête d'Indépendance…)",
];

export default function SportCulturePage() {
  return (
    <PageShell flush>
      <PageHero
        eyebrow="Vie au LSY"
        title="Sport et culture"
        body="Corps sain, esprit sain — compétitions inter-lycées, événements culturels et cérémonies qui font la richesse de la vie au LSY."
        breadcrumbs={[
          { label: "Vie au LSY", href: "/vie-au-lysee/internat" },
          { label: "Sport et culture" },
        ]}
        pattern="wave"
      />

      <section className="bg-lsy-paper py-20 lg:py-28">
        <Container className="space-y-14">
          {/* Sports */}
          <div className="space-y-8">
            <Reveal>
              <SectionHeader eyebrow="Sports pratiqués" title="Une culture du sport au service du caractère" />
            </Reveal>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* Disciplines */}
              <Reveal>
                <div className="rounded-3xl bg-lsy-blue-950 p-7 text-white">
                  <Dumbbell className="mb-4 size-8 text-lsy-gold-400" aria-hidden />
                  <p className="mb-4 text-lg font-bold">Disciplines sportives</p>
                  <Stagger className="grid grid-cols-2 gap-2" stagger={0.06}>
                    {sportsInfo.disciplines.map((disc) => (
                      <StaggerItem key={disc}>
                        <div className="rounded-xl bg-white/8 px-3 py-2 text-sm text-white/80">
                          {disc}
                        </div>
                      </StaggerItem>
                    ))}
                  </Stagger>
                </div>
              </Reveal>

              {/* Compétitions */}
              <Reveal delay={0.1}>
                <div className="rounded-3xl bg-white p-7 shadow-soft ring-1 ring-lsy-line">
                  <Trophy className="mb-4 size-8 text-lsy-gold-600" aria-hidden />
                  <p className="mb-4 text-lg font-bold text-lsy-blue-900">Compétitions</p>
                  <ul className="space-y-3">
                    {sportsInfo.competitions.map((comp) => (
                      <li key={comp} className="flex items-start gap-2.5 text-sm text-lsy-slate">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-lsy-gold-500" />
                        {comp}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-xs text-lsy-muted italic">{sportsInfo.note}</p>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Vie culturelle */}
          <div className="space-y-8">
            <Reveal>
              <SectionHeader eyebrow="Vie culturelle" title="Des moments qui font la fierté du lycée" />
            </Reveal>

            <Stagger className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
              {CULTURAL_EVENTS.map((event) => (
                <StaggerItem key={event}>
                  <div className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-soft ring-1 ring-lsy-line">
                    <Music className="size-4 shrink-0 text-lsy-gold-600" aria-hidden />
                    <span className="text-sm font-semibold text-lsy-blue-900">{event}</span>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          <Reveal>
            <div className="flex items-start gap-3 rounded-xl border border-lsy-line bg-lsy-ivory p-4">
              <AlertCircle className="mt-0.5 size-4 shrink-0 text-lsy-muted" aria-hidden />
              <p className="text-sm text-lsy-muted">
                Le calendrier détaillé des activités sportives et culturelles est disponible auprès
                du service Vie Scolaire.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <CTASection
        eyebrow="Clubs & activités"
        title="Découvrez tous les clubs du LSY"
        buttons={[
          { label: "Les clubs", href: "/vie-au-lysee/clubs", primary: true },
          { label: "Vie à l'internat", href: "/vie-au-lysee/internat" },
        ]}
      />
    </PageShell>
  );
}
