import Link from "next/link";
import { ArrowRight, CalendarDays, Megaphone, Newspaper } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/animations/Reveal";
import { formatDateLong, formatDayMonth, dateParts } from "@/lib/utils";
import { db } from "@/lib/db";

async function getData() {
  const [articles, communiques, events] = await Promise.all([
    db.article.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { publishedAt: "desc" },
      take: 3,
      select: {
        title: true,
        slug: true,
        excerpt: true,
        publishedAt: true,
        category: { select: { name: true } },
      },
    }),
    db.communique.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { publishedAt: "desc" },
      take: 2,
      select: {
        title: true,
        slug: true,
        publishedAt: true,
        isUrgent: true,
        target: true,
      },
    }),
    db.event.findMany({
      where: {
        status: "PUBLISHED",
        startDate: { gte: new Date() },
      },
      orderBy: { startDate: "asc" },
      take: 2,
      select: {
        title: true,
        slug: true,
        startDate: true,
        location: true,
        category: true,
      },
    }),
  ]);
  return { articles, communiques, events };
}

export async function NewsHighlights() {
  const { articles, communiques, events } = await getData();

  return (
    <section
      aria-label="Actualités & Médias"
      className="bg-lsy-paper py-20 lg:py-28"
    >
      <Container>
        <Reveal>
          <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-2">
              <Eyebrow>Actualités & Médias</Eyebrow>
              <h2 className="font-display text-4xl font-bold leading-tight text-lsy-blue-900 lg:text-5xl">
                Vie de la communauté
              </h2>
            </div>
            <Link
              href="/actualites"
              className="inline-flex items-center gap-2 text-sm font-semibold text-lsy-blue-800 hover:text-lsy-blue-900"
            >
              Toutes les actualités
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Articles — colonne principale */}
          <div className="space-y-4 lg:col-span-2">
            <Reveal>
              <h3 className="flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.18em] text-lsy-muted">
                <Newspaper className="size-3.5" aria-hidden />
                Actualités
              </h3>
            </Reveal>
            {articles.length === 0 ? (
              <p className="rounded-2xl border border-lsy-line p-6 text-sm text-lsy-muted">
                Aucune actualité publiée pour l&apos;instant.
              </p>
            ) : (
              <div className="space-y-3">
                {articles.map((article, i) => (
                  <Reveal key={article.slug} delay={i * 0.08}>
                    <Link
                      href={`/actualites/${article.slug}`}
                      className="group flex gap-4 rounded-2xl border border-lsy-line bg-white p-5 transition-all hover:border-lsy-gold-400/40 hover:shadow-card"
                    >
                      <div className="flex-1 min-w-0 space-y-2">
                        {article.category && (
                          <Badge variant="navy" className="text-[0.7rem]">
                            {article.category.name}
                          </Badge>
                        )}
                        <p className="font-bold leading-snug text-lsy-blue-900 group-hover:text-lsy-blue-700 line-clamp-2">
                          {article.title}
                        </p>
                        <p className="text-sm text-lsy-muted line-clamp-2">
                          {article.excerpt}
                        </p>
                        {article.publishedAt && (
                          <p className="text-xs text-lsy-muted/70">
                            {formatDateLong(article.publishedAt)}
                          </p>
                        )}
                      </div>
                      <ArrowRight
                        className="mt-1 size-4 shrink-0 text-lsy-muted opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
                        aria-hidden
                      />
                    </Link>
                  </Reveal>
                ))}
              </div>
            )}
          </div>

          {/* Communiqués + Événements — colonne latérale */}
          <div className="space-y-6">
            {/* Communiqués */}
            <div className="space-y-3">
              <Reveal>
                <h3 className="flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.18em] text-lsy-muted">
                  <Megaphone className="size-3.5" aria-hidden />
                  Communiqués
                </h3>
              </Reveal>
              {communiques.length === 0 ? (
                <p className="rounded-2xl border border-lsy-line p-4 text-sm text-lsy-muted">
                  Aucun communiqué récent.
                </p>
              ) : (
                <ul className="space-y-2">
                  {communiques.map((c, i) => (
                    <Reveal key={c.slug} delay={i * 0.08}>
                      <li>
                        <Link
                          href={`/actualites/communiques#${c.slug}`}
                          className="group flex items-start gap-3 rounded-xl border border-lsy-line bg-white p-4 transition-all hover:border-lsy-orange/40 hover:bg-lsy-orange/3"
                        >
                          {c.isUrgent && (
                            <Badge variant="urgent" className="mt-0.5 shrink-0 text-[0.65rem]">
                              Urgent
                            </Badge>
                          )}
                          <p className="flex-1 text-sm font-semibold leading-snug text-lsy-blue-900 line-clamp-2">
                            {c.title}
                          </p>
                        </Link>
                      </li>
                    </Reveal>
                  ))}
                </ul>
              )}
              <Link
                href="/actualites/communiques"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-lsy-blue-800 hover:text-lsy-blue-900"
              >
                Tous les communiqués <ArrowRight className="size-3.5" aria-hidden />
              </Link>
            </div>

            {/* Événements */}
            <div className="space-y-3">
              <Reveal>
                <h3 className="flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.18em] text-lsy-muted">
                  <CalendarDays className="size-3.5" aria-hidden />
                  Prochains événements
                </h3>
              </Reveal>
              {events.length === 0 ? (
                <p className="rounded-2xl border border-lsy-line p-4 text-sm text-lsy-muted">
                  Aucun événement à venir.
                </p>
              ) : (
                <ul className="space-y-2">
                  {events.map((evt, i) => {
                    const parts = dateParts(evt.startDate);
                    return (
                      <Reveal key={evt.slug} delay={i * 0.08}>
                        <li>
                          <Link
                            href={`/actualites/evenements#${evt.slug}`}
                            className="group flex items-start gap-3 rounded-xl border border-lsy-line bg-white p-3.5 transition-all hover:border-lsy-blue-700/30 hover:shadow-soft"
                          >
                            <div className="flex w-12 shrink-0 flex-col items-center rounded-xl bg-lsy-blue-900 py-2 text-white">
                              <span className="font-display text-xl font-bold leading-none">
                                {parts.day}
                              </span>
                              <span className="text-[0.62rem] font-bold uppercase tracking-wide text-lsy-gold-300">
                                {parts.month}
                              </span>
                            </div>
                            <div className="min-w-0 space-y-0.5">
                              <p className="text-sm font-bold leading-snug text-lsy-blue-900 line-clamp-2">
                                {evt.title}
                              </p>
                              {evt.location && (
                                <p className="text-xs text-lsy-muted">{evt.location}</p>
                              )}
                            </div>
                          </Link>
                        </li>
                      </Reveal>
                    );
                  })}
                </ul>
              )}
              <Link
                href="/actualites/evenements"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-lsy-blue-800 hover:text-lsy-blue-900"
              >
                Tout le calendrier <ArrowRight className="size-3.5" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
