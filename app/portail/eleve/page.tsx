import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, CalendarDays, FileText, Megaphone } from "lucide-react";
import { db } from "@/lib/db";
import { formatDateLong } from "@/lib/utils";

export const metadata: Metadata = { title: "Espace élève — LSY" };

async function getData() {
  const now = new Date();
  const [communiques, docs, events, articles] = await Promise.all([
    db.communique.findMany({
      where: { status: "PUBLISHED", target: { in: ["TOUS", "ELEVES"] } },
      orderBy: [{ isUrgent: "desc" }, { publishedAt: "desc" }],
      take: 5,
    }),
    db.document.findMany({
      where: { type: { in: ["Ressource pédagogique", "Sujet", "Corrigé", "Calendrier"] } },
      orderBy: { createdAt: "desc" },
      take: 6,
    }),
    db.event.findMany({
      where: { status: "PUBLISHED", startDate: { gte: now } },
      orderBy: { startDate: "asc" },
      take: 4,
    }),
    db.article.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { publishedAt: "desc" },
      take: 3,
      include: { category: true },
    }),
  ]);
  return { communiques, docs, events, articles };
}

export default async function ElevePage() {
  const { communiques, docs, events, articles } = await getData();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-lsy-blue-900 sm:text-3xl">
          Espace élève
        </h1>
        <p className="mt-1 text-sm text-lsy-muted">
          Vos ressources, communiqués et événements à venir.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Communiqués */}
        <div className="lg:col-span-2 space-y-3">
          <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-lsy-muted">
            <Megaphone className="size-3.5" aria-hidden />Communiqués
          </h2>
          {communiques.length === 0 ? (
            <p className="text-sm text-lsy-muted">Aucun communiqué pour le moment.</p>
          ) : (
            <ul className="space-y-2">
              {communiques.map((c) => (
                <li key={c.id}>
                  <Link href={`/actualites/communiques/${c.slug}`}
                    className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-soft ring-1 ring-lsy-line transition-all hover:shadow-card hover:ring-lsy-gold-400/40">
                    {c.isUrgent && (
                      <span className="mt-0.5 shrink-0 rounded-full bg-red-100 px-2 py-0.5 text-[0.6rem] font-bold text-red-700">Urgent</span>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-lsy-blue-900 line-clamp-2">{c.title}</p>
                      {c.publishedAt && (
                        <p className="mt-0.5 text-xs text-lsy-muted">{formatDateLong(c.publishedAt)}</p>
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <Link href="/actualites/communiques"
            className="inline-flex items-center gap-1 text-xs font-semibold text-lsy-blue-700 hover:text-lsy-blue-900">
            Tous les communiqués →
          </Link>
        </div>

        {/* Événements à venir */}
        <div className="space-y-3">
          <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-lsy-muted">
            <CalendarDays className="size-3.5" aria-hidden />Prochains événements
          </h2>
          {events.length === 0 ? (
            <p className="text-sm text-lsy-muted">Aucun événement à venir.</p>
          ) : (
            <ul className="space-y-2">
              {events.map((evt) => (
                <li key={evt.id}>
                  <Link href={`/actualites/evenements/${evt.slug}`}
                    className="block rounded-2xl bg-lsy-blue-900 p-4 text-white transition-opacity hover:opacity-90">
                    <p className="text-xs font-bold text-lsy-gold-300">{formatDateLong(evt.startDate)}</p>
                    <p className="mt-1 text-sm font-semibold line-clamp-2">{evt.title}</p>
                    {evt.location && <p className="mt-0.5 text-xs text-white/60">{evt.location}</p>}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Ressources */}
      <div className="space-y-3">
        <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-lsy-muted">
          <FileText className="size-3.5" aria-hidden />Ressources pédagogiques
        </h2>
        {docs.length === 0 ? (
          <p className="text-sm text-lsy-muted">Aucune ressource disponible pour le moment.</p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {docs.map((doc) => (
              <a key={doc.id} href={doc.fileUrl} target="_blank" rel="noreferrer"
                className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-soft ring-1 ring-lsy-line transition-all hover:shadow-card">
                <FileText className="mt-0.5 size-4 shrink-0 text-lsy-gold-600" aria-hidden />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-lsy-blue-900 line-clamp-2">{doc.title}</p>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {doc.level && <span className="text-[0.6rem] font-semibold text-lsy-blue-600">{doc.level}</span>}
                    {doc.subject && <span className="text-[0.6rem] font-semibold text-lsy-gold-600">{doc.subject}</span>}
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
        <Link href="/documents"
          className="inline-flex items-center gap-1 text-xs font-semibold text-lsy-blue-700 hover:text-lsy-blue-900">
          Toute la bibliothèque →
        </Link>
      </div>

      {articles.length > 0 && (
        <div className="space-y-3">
          <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-lsy-muted">
            <BookOpen className="size-3.5" aria-hidden />Actualités du lycée
          </h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {articles.map((a) => (
              <Link key={a.id} href={`/actualites/${a.slug}`}
                className="rounded-2xl bg-white p-4 shadow-soft ring-1 ring-lsy-line transition-all hover:shadow-card hover:ring-lsy-gold-400/40">
                {a.category && (
                  <span className="mb-1.5 inline-block rounded-full bg-lsy-blue-100 px-2 py-0.5 text-[0.6rem] font-bold text-lsy-blue-800">
                    {a.category.name}
                  </span>
                )}
                <p className="text-sm font-semibold text-lsy-blue-900 line-clamp-2">{a.title}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
