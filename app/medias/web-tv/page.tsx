import type { Metadata } from "next";
import { PlayCircle } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { CTASection } from "@/components/sections/CTASection";
import { Reveal } from "@/components/animations/Reveal";
import { Stagger, StaggerItem } from "@/components/animations/Stagger";
import { db } from "@/lib/db";

export const metadata: Metadata = {
  title: "Web TV",
  description: "Les vidéos du Lycée Scientifique de Yamoussoukro : reportages, cérémonies et témoignages.",
};

async function getVideos() {
  return db.video.findMany({ orderBy: { createdAt: "desc" }, take: 12 });
}

export default async function WebTVPage() {
  const videos = await getVideos();

  return (
    <PageShell flush>
      <PageHero
        eyebrow="Médias"
        title="Web TV"
        body="Reportages, cérémonies, témoignages d'élèves et temps forts du Lycée Scientifique de Yamoussoukro en vidéo."
        breadcrumbs={[
          { label: "Actualités", href: "/actualites" },
          { label: "Web TV" },
        ]}
        pattern="wave"
      />

      <section className="bg-lsy-paper py-20 lg:py-28">
        <Container className="space-y-10">
          <Reveal>
            <SectionHeader eyebrow="Vidéos" title="La chaîne vidéo du LSY" />
          </Reveal>

          {videos.length === 0 ? (
            <Reveal>
              <div className="rounded-3xl border border-dashed border-lsy-line py-16 text-center">
                <PlayCircle className="mx-auto mb-3 size-10 text-lsy-muted/40" aria-hidden />
                <p className="font-semibold text-lsy-blue-900">Vidéos bientôt disponibles</p>
                <p className="mt-1 text-sm text-lsy-muted">
                  La Web TV du LSY est en cours de mise en place.
                </p>
              </div>
            </Reveal>
          ) : (
            <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
              {videos.map((video) => (
                <StaggerItem key={video.id}>
                  <a
                    href={video.videoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="group block overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-lsy-line transition-all hover:shadow-card"
                  >
                    <div className="relative aspect-video w-full bg-lsy-blue-950 flex items-center justify-center">
                      {video.thumbnail ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="h-full w-full object-cover opacity-70 group-hover:opacity-90 transition-opacity"
                        />
                      ) : null}
                      <PlayCircle className="absolute size-12 text-white/80 group-hover:text-white transition-colors" aria-hidden />
                    </div>
                    <div className="p-4">
                      <p className="font-bold text-lsy-blue-900 line-clamp-2">{video.title}</p>
                      {video.description && (
                        <p className="mt-1 text-sm text-lsy-muted line-clamp-2">{video.description}</p>
                      )}
                      {video.category && (
                        <p className="mt-2 text-xs font-semibold text-lsy-gold-600">{video.category}</p>
                      )}
                    </div>
                  </a>
                </StaggerItem>
              ))}
            </Stagger>
          )}
        </Container>
      </section>

      <CTASection
        eyebrow="Galerie"
        title="Découvrir la galerie photos du LSY"
        buttons={[
          { label: "Galerie photos", href: "/medias/galerie", primary: true },
          { label: "Actualités", href: "/actualites" },
        ]}
      />
    </PageShell>
  );
}
