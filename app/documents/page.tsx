import type { Metadata } from "next";
import { Download, FileText } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { Reveal } from "@/components/animations/Reveal";
import { Stagger, StaggerItem } from "@/components/animations/Stagger";
import { db } from "@/lib/db";

export const metadata: Metadata = {
  title: "Documents",
  description: "Bibliothèque documentaire du Lycée Scientifique de Yamoussoukro.",
};

async function getDocuments() {
  const docs = await db.document.findMany({ orderBy: { createdAt: "desc" } });
  const grouped: Record<string, typeof docs> = {};
  for (const doc of docs) {
    if (!grouped[doc.type]) grouped[doc.type] = [];
    grouped[doc.type].push(doc);
  }
  return grouped;
}

export default async function DocumentsPage() {
  const grouped = await getDocuments();
  const types = Object.keys(grouped).sort();

  return (
    <PageShell flush>
      <PageHero
        eyebrow="Documents"
        title="Bibliothèque documentaire"
        body="Formulaires, notices, sujets d'examens et ressources officielles du Lycée Scientifique de Yamoussoukro."
        breadcrumbs={[{ label: "Documents" }]}
        pattern="wave"
      />

      <section className="bg-lsy-paper py-20 lg:py-28">
        <Container className="space-y-14">
          {types.length === 0 ? (
            <Reveal>
              <div className="rounded-3xl border border-dashed border-lsy-line py-16 text-center">
                <FileText className="mx-auto mb-3 size-10 text-lsy-muted/40" aria-hidden />
                <p className="font-semibold text-lsy-blue-900">Documents bientôt disponibles</p>
                <p className="mt-1 text-sm text-lsy-muted">
                  La bibliothèque documentaire est en cours de constitution.
                </p>
              </div>
            </Reveal>
          ) : (
            types.map((type) => (
              <div key={type} className="space-y-5">
                <Reveal>
                  <SectionHeader eyebrow="Catégorie" title={type} />
                </Reveal>
                <Stagger className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3" stagger={0.05}>
                  {grouped[type].map((doc) => (
                    <StaggerItem key={doc.id}>
                      <a
                        href={doc.fileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex items-start gap-4 rounded-2xl bg-white p-4 shadow-soft ring-1 ring-lsy-line transition-all hover:shadow-card"
                      >
                        <FileText className="mt-0.5 size-5 shrink-0 text-lsy-gold-600" aria-hidden />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-lsy-blue-900">
                            {doc.title}
                          </p>
                          {doc.description && (
                            <p className="mt-0.5 line-clamp-2 text-xs text-lsy-muted">
                              {doc.description}
                            </p>
                          )}
                          <div className="mt-1 flex flex-wrap gap-2">
                            {doc.level && (
                              <span className="text-[0.65rem] font-semibold text-lsy-blue-600">
                                {doc.level}
                              </span>
                            )}
                            {doc.subject && (
                              <span className="text-[0.65rem] font-semibold text-lsy-gold-600">
                                {doc.subject}
                              </span>
                            )}
                            {doc.year && (
                              <span className="text-[0.65rem] font-semibold text-lsy-muted">
                                {doc.year}
                              </span>
                            )}
                          </div>
                        </div>
                        <Download
                          className="mt-0.5 size-4 shrink-0 text-lsy-muted opacity-0 transition-opacity group-hover:opacity-100"
                          aria-hidden
                        />
                      </a>
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>
            ))
          )}
        </Container>
      </section>
    </PageShell>
  );
}
