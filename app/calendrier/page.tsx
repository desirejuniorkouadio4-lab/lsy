import type { Metadata } from "next";
import { CalendarDays, MapPin } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { CTASection } from "@/components/sections/CTASection";
import { Reveal } from "@/components/animations/Reveal";
import { Stagger, StaggerItem } from "@/components/animations/Stagger";
import { db } from "@/lib/db";
import { dateParts, formatDateLong } from "@/lib/utils";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Calendrier",
  description: "Le calendrier scolaire et les événements à venir au Lycée Scientifique de Yamoussoukro.",
};

const PERIODES = [
  { label: "1er trimestre", dates: "Septembre – Décembre" },
  { label: "2e trimestre", dates: "Janvier – Mars" },
  { label: "3e trimestre", dates: "Avril – Juin" },
  { label: "Congés", dates: "Dates fixées par la DELC" },
];

async function getUpcomingEvents() {
  return db.event.findMany({
    where: { status: "PUBLISHED", startDate: { gte: new Date() } },
    orderBy: { startDate: "asc" },
    take: 10,
  });
}

export default async function CalendrierPage() {
  const events = await getUpcomingEvents();

  return (
    <PageShell flush>
      <PageHero
        eyebrow="Calendrier"
        title="Calendrier scolaire"
        body="Les trimestres, examens, cérémonies et événements clés de l'année scolaire au Lycée Scientifique de Yamoussoukro."
        breadcrumbs={[{ label: "Calendrier" }]}
        pattern="wave"
      />

      <section className="bg-lsy-paper py-20 lg:py-28">
        <Container className="space-y-14">
          {/* Trimestres */}
          <div className="space-y-6">
            <Reveal>
              <SectionHeader eyebrow="Organisation" title="Rythme scolaire annuel" />
            </Reveal>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {PERIODES.map((p, i) => (
                <Reveal key={p.label} delay={i * 0.07}>
                  <div className="rounded-2xl bg-white p-5 shadow-soft ring-1 ring-lsy-line text-center">
                    <p className="font-bold text-lsy-blue-900">{p.label}</p>
                    <p className="mt-1 text-sm text-lsy-muted">{p.dates}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Événements à venir */}
          <div className="space-y-6">
            <Reveal>
              <SectionHeader eyebrow="Agenda" title="Prochains événements" />
            </Reveal>

            {events.length === 0 ? (
              <Reveal>
                <div className="rounded-3xl border border-dashed border-lsy-line py-12 text-center">
                  <CalendarDays className="mx-auto mb-3 size-10 text-lsy-muted/40" aria-hidden />
                  <p className="text-lsy-muted">Aucun événement à venir pour le moment.</p>
                </div>
              </Reveal>
            ) : (
              <Stagger className="space-y-3" stagger={0.06}>
                {events.map((event) => {
                  const parts = dateParts(event.startDate);
                  return (
                    <StaggerItem key={event.id}>
                      <div className="flex gap-4 rounded-2xl bg-white p-4 shadow-soft ring-1 ring-lsy-line">
                        <div className="flex w-12 shrink-0 flex-col items-center justify-center rounded-xl bg-lsy-blue-950 py-2">
                          <span className="font-display text-xl font-bold leading-none text-white">
                            {parts.day}
                          </span>
                          <span className="text-[0.5rem] font-bold uppercase tracking-widest text-lsy-gold-400">
                            {parts.month}
                          </span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-lsy-blue-900">{event.title}</p>
                          <div className="mt-1 flex flex-wrap gap-3 text-xs text-lsy-muted">
                            <span className="flex items-center gap-1">
                              <CalendarDays className="size-3" aria-hidden />
                              {formatDateLong(event.startDate)}
                            </span>
                            {event.location && (
                              <span className="flex items-center gap-1">
                                <MapPin className="size-3" aria-hidden />
                                {event.location}
                              </span>
                            )}
                          </div>
                        </div>
                        {event.category && (
                          <span
                            className={cn(
                              "shrink-0 self-start rounded-full px-2.5 py-0.5 text-[0.62rem] font-bold",
                              "bg-lsy-gold-100 text-lsy-gold-700",
                            )}
                          >
                            {event.category}
                          </span>
                        )}
                      </div>
                    </StaggerItem>
                  );
                })}
              </Stagger>
            )}
          </div>
        </Container>
      </section>

      <CTASection
        eyebrow="Voir tous les événements"
        title="Retrouvez l'agenda complet"
        buttons={[
          { label: "Tous les événements", href: "/actualites/evenements", primary: true },
          { label: "Actualités", href: "/actualites" },
        ]}
      />
    </PageShell>
  );
}
