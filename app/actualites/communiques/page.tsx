import type { Metadata } from "next";
import { AlertCircle, CalendarDays, Download } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { Reveal } from "@/components/animations/Reveal";
import { Stagger, StaggerItem } from "@/components/animations/Stagger";
import { db } from "@/lib/db";
import { formatDateLong } from "@/lib/utils";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Communiqués",
  description: "Les communiqués officiels du Lycée Scientifique de Yamoussoukro.",
};

const TARGET_LABELS: Record<string, string> = {
  TOUS: "Toute la communauté",
  ELEVES: "Élèves",
  PARENTS: "Parents",
  ENSEIGNANTS: "Enseignants",
};

async function getCommuniques() {
  return db.communique.findMany({
    where: { status: "PUBLISHED" },
    orderBy: [{ isUrgent: "desc" }, { publishedAt: "desc" }],
  });
}

export default async function CommuniquesPage() {
  const communiques = await getCommuniques();

  return (
    <PageShell flush>
      <PageHero
        eyebrow="Actualités & Médias"
        title="Communiqués officiels"
        body="Les notes et informations officielles de la direction du Lycée Scientifique de Yamoussoukro à destination de la communauté scolaire."
        breadcrumbs={[
          { label: "Actualités", href: "/actualites" },
          { label: "Communiqués" },
        ]}
        pattern="wave"
      />

      <section className="bg-lsy-paper py-20 lg:py-28">
        <Container className="space-y-10">
          <Reveal>
            <SectionHeader
              eyebrow="Notes officielles"
              title="Derniers communiqués"
            />
          </Reveal>

          {communiques.length === 0 ? (
            <Reveal>
              <div className="rounded-3xl border border-dashed border-lsy-line py-14 text-center">
                <p className="text-lsy-muted">Aucun communiqué publié pour le moment.</p>
              </div>
            </Reveal>
          ) : (
            <Stagger className="space-y-4" stagger={0.06}>
              {communiques.map((c) => (
                <StaggerItem key={c.id}>
                  <div
                    className={cn(
                      "rounded-2xl bg-white p-5 shadow-soft ring-1 transition-all",
                      c.isUrgent ? "ring-lsy-orange/40" : "ring-lsy-line",
                    )}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        {c.isUrgent && (
                          <AlertCircle className="mt-0.5 size-5 shrink-0 text-lsy-orange" aria-hidden />
                        )}
                        <div>
                          <div className="flex flex-wrap gap-2 mb-1.5">
                            {c.isUrgent && (
                              <span className="rounded-full bg-lsy-orange/15 px-2 py-0.5 text-[0.62rem] font-bold text-[#b5610f]">
                                Urgent
                              </span>
                            )}
                            <span className="rounded-full bg-lsy-ivory px-2 py-0.5 text-[0.62rem] font-semibold text-lsy-muted">
                              {TARGET_LABELS[c.target] ?? c.target}
                            </span>
                          </div>
                          <p className="font-bold text-lsy-blue-900">{c.title}</p>
                          <p className="mt-0.5 flex items-center gap-1.5 text-xs text-lsy-muted">
                            <CalendarDays className="size-3" aria-hidden />
                            {formatDateLong(c.publishedAt ?? c.createdAt)}
                          </p>
                        </div>
                      </div>

                      {c.fileUrl && (
                        <a
                          href={c.fileUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="shrink-0 inline-flex items-center gap-1.5 rounded-xl bg-lsy-blue-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-lsy-blue-800 transition-colors"
                        >
                          <Download className="size-3.5" aria-hidden />
                          Télécharger
                        </a>
                      )}
                    </div>

                    <p className="mt-3 text-sm leading-relaxed text-lsy-slate line-clamp-3">
                      {c.content}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          )}
        </Container>
      </section>
    </PageShell>
  );
}
