import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, FileText, Megaphone, Phone } from "lucide-react";
import { db } from "@/lib/db";
import { formatDateLong } from "@/lib/utils";

export const metadata: Metadata = { title: "Espace parent — LSY" };

async function getData() {
  const now = new Date();
  const [communiques, docs, events] = await Promise.all([
    db.communique.findMany({
      where: { status: "PUBLISHED", target: { in: ["TOUS", "PARENTS"] } },
      orderBy: [{ isUrgent: "desc" }, { publishedAt: "desc" }],
      take: 6,
    }),
    db.document.findMany({
      where: { type: { in: ["Admission", "Règlement", "Calendrier"] } },
      orderBy: { createdAt: "desc" },
      take: 6,
    }),
    db.event.findMany({
      where: { status: "PUBLISHED", startDate: { gte: now } },
      orderBy: { startDate: "asc" },
      take: 3,
    }),
  ]);
  return { communiques, docs, events };
}

export default async function ParentPage() {
  const { communiques, docs, events } = await getData();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-lsy-blue-900 sm:text-3xl">
          Espace parent
        </h1>
        <p className="mt-1 text-sm text-lsy-muted">
          Communiqués, documents officiels et agenda de votre enfant.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Communiqués pour parents */}
        <div className="lg:col-span-2 space-y-3">
          <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-lsy-muted">
            <Megaphone className="size-3.5" aria-hidden />Notes officielles
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
        </div>

        {/* Événements + contact rapide */}
        <div className="space-y-4">
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
                      className="block rounded-2xl bg-lsy-blue-700 p-4 text-white transition-opacity hover:opacity-90">
                      <p className="text-xs font-bold text-lsy-gold-300">{formatDateLong(evt.startDate)}</p>
                      <p className="mt-1 text-sm font-semibold line-clamp-2">{evt.title}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Contacter le lycée */}
          <div className="rounded-2xl bg-lsy-blue-900 p-4 text-white">
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-lsy-gold-300">
              <Phone className="size-3.5" aria-hidden />Contact
            </p>
            <p className="mt-2 text-sm font-semibold">27 30 64 07 88</p>
            <p className="text-xs text-white/60">contact@lsy.ci</p>
            <Link href="/contact"
              className="mt-3 inline-flex items-center gap-1 rounded-lg bg-white/10 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/20 transition-colors">
              Envoyer un message →
            </Link>
          </div>
        </div>
      </div>

      {/* Documents utiles */}
      {docs.length > 0 && (
        <div className="space-y-3">
          <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-lsy-muted">
            <FileText className="size-3.5" aria-hidden />Documents officiels
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {docs.map((doc) => (
              <a key={doc.id} href={doc.fileUrl} target="_blank" rel="noreferrer"
                className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-soft ring-1 ring-lsy-line transition-all hover:shadow-card">
                <FileText className="mt-0.5 size-4 shrink-0 text-lsy-gold-600" aria-hidden />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-lsy-blue-900 line-clamp-2">{doc.title}</p>
                  <p className="mt-0.5 text-xs text-lsy-muted">{doc.type}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
