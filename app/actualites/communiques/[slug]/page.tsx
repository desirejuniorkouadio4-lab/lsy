import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Download, Megaphone } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";
import { Badge } from "@/components/ui/Badge";
import { db } from "@/lib/db";
import { formatDateLong } from "@/lib/utils";
import { COMMUNIQUE_TARGET_LABELS } from "@/lib/constants";
import type { CommuniqueTarget } from "@/lib/constants";

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = await db.communique.findUnique({ where: { slug } });
  if (!c) return { title: "Communiqué introuvable" };
  return { title: c.title };
}

export default async function CommuniqueDetailPage({ params }: Props) {
  const { slug } = await params;
  const communique = await db.communique.findUnique({
    where: { slug, status: "PUBLISHED" },
  });
  if (!communique) notFound();

  return (
    <PageShell>
      <section className="bg-lsy-paper py-16 lg:py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <Link
                href="/actualites/communiques"
                className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-lsy-blue-700 transition-colors hover:text-lsy-blue-900"
              >
                <ArrowLeft className="size-4" aria-hidden />
                Retour aux communiqués
              </Link>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="mb-6 space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="navy" className="flex items-center gap-1.5">
                    <Megaphone className="size-3" aria-hidden />
                    Communiqué officiel
                  </Badge>
                  {communique.isUrgent && <Badge variant="urgent">Urgent</Badge>}
                  <span className="rounded-full bg-lsy-ivory px-2.5 py-0.5 text-xs font-semibold text-lsy-slate">
                    {COMMUNIQUE_TARGET_LABELS[communique.target as CommuniqueTarget] ?? communique.target}
                  </span>
                </div>

                <h1 className="font-display text-3xl font-bold leading-tight text-lsy-blue-900 lg:text-4xl">
                  {communique.title}
                </h1>

                {communique.publishedAt && (
                  <p className="text-sm text-lsy-muted">
                    Publié le {formatDateLong(communique.publishedAt)}
                  </p>
                )}
              </div>
            </Reveal>

            {communique.fileUrl && (
              <Reveal delay={0.08}>
                <a
                  href={communique.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mb-8 inline-flex items-center gap-2 rounded-xl border border-lsy-line bg-white px-4 py-2.5 text-sm font-semibold text-lsy-blue-800 shadow-soft transition-all hover:border-lsy-gold-400/40 hover:shadow-card"
                >
                  <Download className="size-4 text-lsy-gold-600" aria-hidden />
                  Télécharger le document officiel
                </a>
              </Reveal>
            )}

            <Reveal delay={0.1}>
              <div
                className="prose prose-lg prose-headings:font-display prose-headings:text-lsy-blue-900 prose-a:text-lsy-blue-700 max-w-none text-lsy-slate"
                dangerouslySetInnerHTML={{ __html: communique.content }}
              />
            </Reveal>
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
