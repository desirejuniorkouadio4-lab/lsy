import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, Tag } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { Reveal } from "@/components/animations/Reveal";
import { Stagger, StaggerItem } from "@/components/animations/Stagger";
import { db } from "@/lib/db";
import { formatDateLong } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Actualités",
  description: "Toutes les actualités et informations du Lycée Scientifique de Yamoussoukro.",
};

async function getData() {
  const [articles, communiques] = await Promise.all([
    db.article.findMany({
      where: { status: "PUBLISHED" },
      include: { category: true },
      orderBy: { publishedAt: "desc" },
      take: 9,
    }),
    db.communique.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { publishedAt: "desc" },
      take: 3,
    }),
  ]);
  return { articles, communiques };
}

export default async function ActualitesPage() {
  const { articles, communiques } = await getData();

  return (
    <PageShell flush>
      <PageHero
        eyebrow="Actualités & Médias"
        title="Actualités"
        body="Toutes les informations de la vie du Lycée Scientifique de Yamoussoukro."
        breadcrumbs={[{ label: "Actualités" }]}
        pattern="wave"
      />

      <section className="bg-lsy-paper py-20 lg:py-28">
        <Container>
          <div className="grid gap-10 lg:grid-cols-3">
            {/* Articles */}
            <div className="lg:col-span-2 space-y-10">
              <Reveal>
                <SectionHeader eyebrow="Articles" title="Dernières nouvelles" />
              </Reveal>

              {articles.length === 0 ? (
                <Reveal>
                  <div className="rounded-3xl border border-dashed border-lsy-line py-14 text-center">
                    <p className="text-lsy-muted">Aucun article publié pour le moment.</p>
                  </div>
                </Reveal>
              ) : (
                <Stagger className="space-y-5" stagger={0.06}>
                  {articles.map((article) => (
                    <StaggerItem key={article.id}>
                      <Link
                        href={`/actualites/${article.slug}`}
                        className="group flex gap-5 rounded-3xl bg-white p-5 shadow-soft ring-1 ring-lsy-line transition-all hover:shadow-card"
                      >
                        {/* Image placeholder */}
                        <div className="hidden size-20 shrink-0 rounded-2xl bg-lsy-blue-100 sm:flex items-center justify-center">
                          <Tag className="size-7 text-lsy-blue-400" aria-hidden />
                        </div>
                        <div className="min-w-0 flex-1">
                          {article.category && (
                            <span className="inline-block rounded-full bg-lsy-blue-100 px-2.5 py-0.5 text-[0.65rem] font-bold text-lsy-blue-800">
                              {article.category.name}
                            </span>
                          )}
                          <p className="mt-1.5 font-bold leading-snug text-lsy-blue-900 group-hover:text-lsy-blue-700 transition-colors">
                            {article.title}
                          </p>
                          <p className="mt-1 line-clamp-2 text-sm text-lsy-muted">{article.excerpt}</p>
                          <p className="mt-2 flex items-center gap-1.5 text-xs text-lsy-muted">
                            <CalendarDays className="size-3.5" aria-hidden />
                            {formatDateLong(article.publishedAt ?? article.createdAt)}
                          </p>
                        </div>
                      </Link>
                    </StaggerItem>
                  ))}
                </Stagger>
              )}
            </div>

            {/* Sidebar — communiqués récents */}
            <div className="space-y-6">
              <Reveal>
                <SectionHeader eyebrow="Communiqués" title="Notes officielles" />
              </Reveal>
              {communiques.length === 0 ? (
                <Reveal>
                  <p className="text-sm text-lsy-muted">Aucun communiqué récent.</p>
                </Reveal>
              ) : (
                <div className="space-y-3">
                  {communiques.map((c, i) => (
                    <Reveal key={c.id} delay={i * 0.07}>
                      <div className="rounded-2xl bg-white p-4 shadow-soft ring-1 ring-lsy-line">
                        {c.isUrgent && (
                          <span className="mb-2 inline-block rounded-full bg-lsy-orange/15 px-2 py-0.5 text-[0.62rem] font-bold text-[#b5610f]">
                            Urgent
                          </span>
                        )}
                        <p className="text-sm font-semibold text-lsy-blue-900">{c.title}</p>
                        <p className="mt-1 text-xs text-lsy-muted">
                          {formatDateLong(c.publishedAt ?? c.createdAt)}
                        </p>
                      </div>
                    </Reveal>
                  ))}
                  <Reveal delay={0.25}>
                    <Link
                      href="/actualites/communiques"
                      className="block text-center text-sm font-semibold text-lsy-blue-700 hover:text-lsy-blue-900 transition-colors"
                    >
                      Voir tous les communiqués →
                    </Link>
                  </Reveal>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
