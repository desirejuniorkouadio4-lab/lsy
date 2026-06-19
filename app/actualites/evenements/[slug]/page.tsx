import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, CalendarDays, MapPin, Tag } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";
import { db } from "@/lib/db";
import { formatDateLong } from "@/lib/utils";

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = await db.event.findUnique({ where: { slug } });
  if (!event) return { title: "Événement introuvable" };
  return { title: event.title, description: event.description.slice(0, 160) };
}

export default async function EvenementDetailPage({ params }: Props) {
  const { slug } = await params;
  const event = await db.event.findUnique({
    where: { slug, status: "PUBLISHED" },
  });
  if (!event) notFound();

  return (
    <PageShell>
      <section className="bg-lsy-paper py-16 lg:py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <Link
                href="/actualites/evenements"
                className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-lsy-blue-700 transition-colors hover:text-lsy-blue-900"
              >
                <ArrowLeft className="size-4" aria-hidden />
                Retour aux événements
              </Link>
            </Reveal>

            {event.coverImage && (
              <Reveal delay={0.05}>
                <div className="relative mb-8 h-56 overflow-hidden rounded-2xl sm:h-72">
                  <Image src={event.coverImage} alt={event.title} fill
                    className="object-cover" sizes="768px" priority />
                </div>
              </Reveal>
            )}

            <Reveal delay={0.05}>
              <div className="mb-6 space-y-3">
                {event.category && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-lsy-blue-100 px-3 py-0.5 text-xs font-bold text-lsy-blue-800">
                    <Tag className="size-3" aria-hidden />
                    {event.category}
                  </span>
                )}
                <h1 className="font-display text-3xl font-bold leading-tight text-lsy-blue-900 lg:text-4xl">
                  {event.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-sm text-lsy-muted">
                  <span className="flex items-center gap-1.5">
                    <CalendarDays className="size-4" aria-hidden />
                    {formatDateLong(event.startDate)}
                    {event.endDate && ` → ${formatDateLong(event.endDate)}`}
                  </span>
                  {event.location && (
                    <span className="flex items-center gap-1.5">
                      <MapPin className="size-4" aria-hidden />
                      {event.location}
                    </span>
                  )}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="prose prose-lg prose-headings:font-display prose-headings:text-lsy-blue-900 prose-a:text-lsy-blue-700 max-w-none text-lsy-slate">
                {event.description.split("\n\n").map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
