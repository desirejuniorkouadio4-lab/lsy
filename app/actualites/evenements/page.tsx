import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { Reveal } from "@/components/animations/Reveal";
import { Stagger, StaggerItem } from "@/components/animations/Stagger";
import { db } from "@/lib/db";
import { dateParts, formatDateLong } from "@/lib/utils";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Événements",
  description: "L'agenda des événements du Lycée Scientifique de Yamoussoukro.",
};

async function getEvents() {
  const now = new Date();
  const [upcoming, past] = await Promise.all([
    db.event.findMany({
      where: { status: "PUBLISHED", startDate: { gte: now } },
      orderBy: { startDate: "asc" },
      take: 6,
    }),
    db.event.findMany({
      where: { status: "PUBLISHED", startDate: { lt: now } },
      orderBy: { startDate: "desc" },
      take: 6,
    }),
  ]);
  return { upcoming, past };
}

function EventCard({
  event,
  past = false,
}: {
  event: Awaited<ReturnType<typeof getEvents>>["upcoming"][number];
  past?: boolean;
}) {
  const parts = dateParts(event.startDate);
  return (
    <Link
      href={`/actualites/evenements/${event.slug}`}
      className={cn(
        "group flex gap-4 rounded-2xl bg-white p-5 shadow-soft ring-1 ring-lsy-line transition-all hover:ring-lsy-gold-400/40 hover:shadow-card",
        past && "opacity-70",
      )}
    >
      {/* Calendar chip */}
      <div className="flex w-12 shrink-0 flex-col items-center justify-start gap-0 rounded-xl bg-lsy-blue-950 py-2">
        <span className="font-display text-xl font-bold leading-none text-white">{parts.day}</span>
        <span className="text-[0.55rem] font-bold uppercase tracking-widest text-lsy-gold-400">
          {parts.month}
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-bold leading-snug text-lsy-blue-900">{event.title}</p>
        <div className="mt-1 flex flex-wrap gap-3">
          <span className="flex items-center gap-1 text-xs text-lsy-muted">
            <CalendarDays className="size-3" aria-hidden />
            {formatDateLong(event.startDate)}
          </span>
          {event.location && (
            <span className="flex items-center gap-1 text-xs text-lsy-muted">
              <MapPin className="size-3" aria-hidden />
              {event.location}
            </span>
          )}
        </div>
        <p className="mt-2 line-clamp-2 text-sm text-lsy-muted">{event.description}</p>
      </div>
    </Link>
  );
}

export default async function EvenementsPage() {
  const { upcoming, past } = await getEvents();

  return (
    <PageShell flush>
      <PageHero
        eyebrow="Actualités & Médias"
        title="Événements"
        body="L'agenda des cérémonies, compétitions et temps forts de la vie du Lycée Scientifique de Yamoussoukro."
        breadcrumbs={[
          { label: "Actualités", href: "/actualites" },
          { label: "Événements" },
        ]}
        pattern="wave"
      />

      <section className="bg-lsy-paper py-20 lg:py-28">
        <Container className="space-y-14">
          {/* À venir */}
          <div className="space-y-7">
            <Reveal>
              <SectionHeader eyebrow="Agenda" title="Prochains événements" />
            </Reveal>
            {upcoming.length === 0 ? (
              <Reveal>
                <div className="rounded-3xl border border-dashed border-lsy-line py-12 text-center">
                  <p className="text-lsy-muted">Aucun événement à venir pour le moment.</p>
                </div>
              </Reveal>
            ) : (
              <Stagger className="grid gap-4 lg:grid-cols-2" stagger={0.07}>
                {upcoming.map((event) => (
                  <StaggerItem key={event.id}>
                    <EventCard event={event} />
                  </StaggerItem>
                ))}
              </Stagger>
            )}
          </div>

          {/* Passés */}
          {past.length > 0 && (
            <div className="space-y-7">
              <Reveal>
                <SectionHeader eyebrow="Archives" title="Événements passés" />
              </Reveal>
              <Stagger className="grid gap-4 lg:grid-cols-2" stagger={0.06}>
                {past.map((event) => (
                  <StaggerItem key={event.id}>
                    <EventCard event={event} past />
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          )}
        </Container>
      </section>
    </PageShell>
  );
}
