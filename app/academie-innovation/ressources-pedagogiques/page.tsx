import type { Metadata } from "next";
import { BookOpen, Download, FileText, Folders } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { CTASection } from "@/components/sections/CTASection";
import { Reveal } from "@/components/animations/Reveal";
import { db } from "@/lib/db";

export const metadata: Metadata = {
  title: "Ressources pédagogiques",
  description: "Sujets d'examens, corrigés et supports pédagogiques du Lycée Scientifique de Yamoussoukro.",
};

const CATEGORIES = [
  { label: "Sujets de BEPC", icon: FileText, desc: "Épreuves officielles des sessions précédentes." },
  { label: "Sujets de BAC", icon: FileText, desc: "Épreuves du Baccalauréat séries C et D." },
  { label: "Corrigés", icon: BookOpen, desc: "Corrections officielles et propositions de réponses." },
  { label: "Supports de cours", icon: Folders, desc: "Fiches de synthèse et résumés par discipline." },
];

async function getDocuments() {
  try {
    return await db.document.findMany({
      where: { type: "Ressource pédagogique" },
      orderBy: { createdAt: "desc" },
      take: 12,
    });
  } catch {
    return [];
  }
}

export default async function RessourcesPedagogiquesPage() {
  const documents = await getDocuments();

  return (
    <PageShell flush>
      <PageHero
        eyebrow="Académie & Innovation"
        title="Ressources pédagogiques"
        body="Sujets d'examens, corrigés et supports de cours mis à disposition de la communauté éducative du Lycée Scientifique de Yamoussoukro."
        breadcrumbs={[
          { label: "Académie & Innovation", href: "/academie-innovation/organisation-pedagogique" },
          { label: "Ressources pédagogiques" },
        ]}
        pattern="wave"
      />

      <section className="bg-lsy-paper py-20 lg:py-28">
        <Container className="space-y-14">
          {/* Types de ressources */}
          <Reveal>
            <SectionHeader
              eyebrow="Bibliothèque en ligne"
              title="Des ressources pour tous les niveaux"
              body="L'espace ressources pédagogiques du LSY regroupe les documents utiles aux élèves, enseignants et familles."
            />
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CATEGORIES.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <Reveal key={cat.label} delay={i * 0.06}>
                  <div className="rounded-2xl bg-white p-5 shadow-soft ring-1 ring-lsy-line text-center">
                    <Icon className="mx-auto mb-3 size-7 text-lsy-gold-600" aria-hidden />
                    <p className="font-bold text-lsy-blue-900">{cat.label}</p>
                    <p className="mt-1 text-xs text-lsy-muted">{cat.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* Documents disponibles */}
          {documents.length > 0 ? (
            <div className="space-y-5">
              <Reveal>
                <SectionHeader eyebrow="Documents disponibles" title="Téléchargements récents" />
              </Reveal>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {documents.map((doc, i) => (
                  <Reveal key={doc.id} delay={i * 0.05}>
                    <a
                      href={doc.fileUrl ?? "#"}
                      target={doc.fileUrl ? "_blank" : undefined}
                      rel="noreferrer"
                      className="group flex items-start gap-4 rounded-2xl bg-white p-4 shadow-soft ring-1 ring-lsy-line transition-all hover:shadow-card"
                    >
                      <FileText className="mt-0.5 size-5 shrink-0 text-lsy-gold-600" aria-hidden />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-lsy-blue-900">{doc.title}</p>
                        {doc.description && (
                          <p className="mt-0.5 truncate text-xs text-lsy-muted">{doc.description}</p>
                        )}
                      </div>
                      <Download className="mt-0.5 size-4 shrink-0 text-lsy-muted opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
                    </a>
                  </Reveal>
                ))}
              </div>
            </div>
          ) : (
            <Reveal>
              <div className="rounded-3xl border border-dashed border-lsy-line py-14 text-center">
                <Folders className="mx-auto mb-3 size-10 text-lsy-muted/40" aria-hidden />
                <p className="font-semibold text-lsy-blue-900">Documents bientôt disponibles</p>
                <p className="mt-1 text-sm text-lsy-muted">
                  L&apos;espace ressources pédagogiques est en cours de préparation.
                </p>
              </div>
            </Reveal>
          )}
        </Container>
      </section>

      <CTASection
        eyebrow="Accès rapide"
        title="Voir tous les documents publics"
        body="Consultez la médiathèque complète du LSY, disponible depuis l'espace documents."
        buttons={[
          { label: "Tous les documents", href: "/documents", primary: true },
          { label: "Programmes", href: "/academie-innovation/programmes" },
        ]}
      />
    </PageShell>
  );
}
