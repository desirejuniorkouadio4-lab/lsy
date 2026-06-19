import Link from "next/link";
import { ArrowRight, CalendarDays, Megaphone, Newspaper } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Badge } from "@/components/ui/Badge";
import { NewsCard } from "@/components/sections/NewsCard";
import { Reveal } from "@/components/animations/Reveal";
import { formatDateLong, dateParts } from "@/lib/utils";
import { db } from "@/lib/db";

async function getData() {
  const [articles, communiques, events] = await Promise.all([
    db.article.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { publishedAt: "desc" },
      take: 4,
      select: {
        title: true, slug: true, excerpt: true,
        publishedAt: true, coverImage: true, featured: true,
        category: { select: { name: true } },
      },
    }),
    db.communique.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { publishedAt: "desc" },
      take: 3,
      select: { title: true, slug: true, publishedAt: true, isUrgent: true, target: true },
    }),
    db.event.findMany({
      where: { status: "PUBLISHED", startDate: { gte: new Date() } },
      orderBy: { startDate: "asc" },
      take: 3,
      select: { title: true, slug: true, startDate: true, location: true, category: true },
    }),
  ]);
  return { articles, communiques, events };
}

export async function NewsHighlights() {
  const { articles, communiques, events } = await getData();

  const [featured, ...rest] = articles;

  return (
    <section aria-label="Actualités & Médias" className="bg-lsy-paper py-20 lg:py-28">
      <Container>
        <Reveal>
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-2">
              <Eyebrow>Actualités & Médias</Eyebrow>
              <h2 className="font-display text-4xl font-bold leading-tight text-lsy-blue-900 lg:text-5xl">
                Vie de la communauté
              </h2>
            </div>
            <Link href="/actualites"
              className="inline-flex items-center gap-2 text-sm font-semibold text-lsy-blue-800 hover:text-lsy-blue-900">
              Toutes les actualités <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </Reveal>

        {/* Articles — grille principale */}
        {articles.length > 0 && (
          <Reveal delay={0.05}>
            <div className="mb-10">
              <h3 className="mb-4 flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.18em] text-lsy-muted">
                <Newspaper className="size-3.5" aria-hidden />
                Dernières actualités
              </h3>
              {/* Featured + grille */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {featured && (
                  <NewsCard
                    href={`/actualites/${featured.slug}`}
                    title={featured.title}
                    excerpt={featured.excerpt}
                    publishedAt={featured.publishedAt}
                    categoryName={featured.category?.name}
                    coverImage={featured.coverImage}
                    featured
                    className="sm:col-span-2 lg:col-span-1 lg:row-span-2"
                  />
                )}
                {rest.map((article, i) => (
                  <Reveal key={article.slug} delay={i * 0.06}>
                    <NewsCard
                      href={`/actualites/${article.slug}`}
                      title={article.title}
                      excerpt={article.excerpt}
                      publishedAt={article.publishedAt}
                      categoryName={article.category?.name}
                      coverImage={article.coverImage}
                    />
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>
        )}

        {articles.length === 0 && (
          <p className="mb-10 rounded-2xl border border-lsy-line p-6 text-sm text-lsy-muted">
            Aucune actualité publiée pour l&apos;instant.
          </p>
        )}

        {/* Communiqués + Événements */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Communiqués */}
          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-lsy-line bg-white p-5">
              <h3 className="mb-4 flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.18em] text-lsy-muted">
                <Megaphone className="size-3.5" aria-hidden />
                Communiqués officiels
              </h3>
              {communiques.length === 0 ? (
                <p className="text-sm text-lsy-muted">Aucun communiqué récent.</p>
              ) : (
                <ul className="divide-y divide-lsy-line">
                  {communiques.map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={`/actualites/communiques#${c.slug}`}
                        className="group flex items-start gap-3 py-3.5 transition-colors hover:text-lsy-blue-700"
                      >
                        {c.isUrgent && (
                          <Badge variant="urgent" className="mt-0.5 shrink-0 text-[0.65rem]">
                            Urgent
                          </Badge>
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold leading-snug text-lsy-blue-900 line-clamp-2 group-hover:text-lsy-blue-700">
                            {c.title}
                          </p>
                          {c.publishedAt && (
                            <p className="mt-0.5 text-xs text-lsy-muted/70">
                              {formatDateLong(c.publishedAt)}
                            </p>
                          )}
                        </div>
                        <ArrowRight className="mt-0.5 size-4 shrink-0 text-lsy-muted opacity-0 transition group-hover:opacity-100" aria-hidden />
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
              <Link href="/actualites/communiques"
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-lsy-blue-800 hover:text-lsy-blue-900">
                Tous les communiqués <ArrowRight className="size-3.5" aria-hidden />
              </Link>
            </div>
          </Reveal>

          {/* Événements */}
          <Reveal delay={0.15}>
            <div className="rounded-2xl border border-lsy-line bg-white p-5">
              <h3 className="mb-4 flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.18em] text-lsy-muted">
                <CalendarDays className="size-3.5" aria-hidden />
                Prochains événements
              </h3>
              {events.length === 0 ? (
                <p className="text-sm text-lsy-muted">Aucun événement à venir.</p>
              ) : (
                <ul className="space-y-3">
                  {events.map((evt) => {
                    const parts = dateParts(evt.startDate);
                    return (
                      <li key={evt.slug}>
                        <Link
                          href={`/actualites/evenements#${evt.slug}`}
                          className="group flex items-start gap-3 transition-colors"
                        >
                          <div className="flex w-12 shrink-0 flex-col items-center rounded-xl bg-lsy-blue-900 py-2 text-white">
                            <span className="font-display text-xl font-bold leading-none">{parts.day}</span>
                            <span className="text-[0.6rem] font-bold uppercase tracking-wide text-lsy-gold-300">{parts.month}</span>
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-bold leading-snug text-lsy-blue-900 line-clamp-2 group-hover:text-lsy-blue-700">
                              {evt.title}
                            </p>
                            {evt.location && (
                              <p className="text-xs text-lsy-muted">{evt.location}</p>
                            )}
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
              <Link href="/actualites/evenements"
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-lsy-blue-800 hover:text-lsy-blue-900">
                Tout le calendrier <ArrowRight className="size-3.5" aria-hidden />
              </Link>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
