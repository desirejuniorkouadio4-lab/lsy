import type { Metadata } from "next";
import { ImageIcon } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { CTASection } from "@/components/sections/CTASection";
import { Reveal } from "@/components/animations/Reveal";
import { Stagger, StaggerItem } from "@/components/animations/Stagger";
import { db } from "@/lib/db";

export const metadata: Metadata = {
  title: "Galerie photos",
  description: "La galerie photos du Lycée Scientifique de Yamoussoukro : albums par année et par événement.",
};

async function getAlbums() {
  return db.galleryAlbum.findMany({
    include: { photos: { take: 1, orderBy: { sortOrder: "asc" } } },
    orderBy: { createdAt: "desc" },
  });
}

export default async function GaleriePage() {
  const albums = await getAlbums();

  return (
    <PageShell flush>
      <PageHero
        eyebrow="Médias"
        title="Galerie photos"
        body="Les moments forts du Lycée Scientifique de Yamoussoukro, des cérémonies de remise de diplômes aux compétitions sportives."
        breadcrumbs={[
          { label: "Actualités", href: "/actualites" },
          { label: "Galerie" },
        ]}
        pattern="constellation"
      />

      <section className="bg-lsy-paper py-20 lg:py-28">
        <Container className="space-y-10">
          <Reveal>
            <SectionHeader
              eyebrow="Albums photos"
              title="La mémoire photographique du LSY"
            />
          </Reveal>

          {albums.length === 0 ? (
            <Reveal>
              <div className="rounded-3xl border border-dashed border-lsy-line py-16 text-center">
                <ImageIcon className="mx-auto mb-3 size-10 text-lsy-muted/40" aria-hidden />
                <p className="font-semibold text-lsy-blue-900">Albums en cours de préparation</p>
                <p className="mt-1 text-sm text-lsy-muted">
                  Les albums photos seront publiés prochainement.
                </p>
              </div>
            </Reveal>
          ) : (
            <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
              {albums.map((album) => {
                const cover = album.photos[0];
                return (
                  <StaggerItem key={album.id}>
                    <div className="group overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-lsy-line">
                      <div className="aspect-video w-full bg-lsy-blue-100 flex items-center justify-center">
                        {cover ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={cover.imageUrl}
                            alt={album.title}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <ImageIcon className="size-10 text-lsy-blue-300" aria-hidden />
                        )}
                      </div>
                      <div className="p-4">
                        <p className="font-bold text-lsy-blue-900">{album.title}</p>
                        {album.description && (
                          <p className="mt-1 text-sm text-lsy-muted line-clamp-2">{album.description}</p>
                        )}
                        {album.year && (
                          <p className="mt-2 text-xs font-semibold text-lsy-gold-600">{album.year}</p>
                        )}
                      </div>
                    </div>
                  </StaggerItem>
                );
              })}
            </Stagger>
          )}
        </Container>
      </section>

      <CTASection
        eyebrow="Web TV"
        title="Découvrir les vidéos du LSY"
        buttons={[
          { label: "Web TV", href: "/medias/web-tv", primary: true },
          { label: "Actualités", href: "/actualites" },
        ]}
      />
    </PageShell>
  );
}
