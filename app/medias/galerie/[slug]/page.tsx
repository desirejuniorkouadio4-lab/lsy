import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";
import { db } from "@/lib/db";

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const album = await db.galleryAlbum.findUnique({ where: { slug } });
  if (!album) return { title: "Album introuvable" };
  return { title: album.title, description: album.description ?? undefined };
}

export default async function AlbumDetailPage({ params }: Props) {
  const { slug } = await params;
  const album = await db.galleryAlbum.findUnique({
    where: { slug },
    include: { photos: { orderBy: { sortOrder: "asc" } } },
  });
  if (!album) notFound();

  return (
    <PageShell>
      <section className="bg-lsy-paper py-16 lg:py-24">
        <Container>
          <Reveal>
            <Link
              href="/medias/galerie"
              className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-lsy-blue-700 transition-colors hover:text-lsy-blue-900"
            >
              <ArrowLeft className="size-4" aria-hidden />
              Retour à la galerie
            </Link>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="mb-10">
              <h1 className="font-display text-3xl font-bold text-lsy-blue-900 lg:text-4xl">
                {album.title}
              </h1>
              {album.year && (
                <p className="mt-1 text-sm font-semibold text-lsy-gold-600">{album.year}</p>
              )}
              {album.description && (
                <p className="mt-3 text-lsy-muted">{album.description}</p>
              )}
            </div>
          </Reveal>

          {album.photos.length === 0 ? (
            <Reveal>
              <p className="py-16 text-center text-lsy-muted">
                Aucune photo dans cet album pour le moment.
              </p>
            </Reveal>
          ) : (
            <Reveal delay={0.1}>
              <div className="columns-2 gap-3 sm:columns-3 lg:columns-4">
                {album.photos.map((photo) => (
                  <div key={photo.id} className="mb-3 break-inside-avoid overflow-hidden rounded-xl">
                    <div className="relative group">
                      <Image
                        src={photo.imageUrl}
                        alt={photo.caption ?? album.title}
                        width={400}
                        height={300}
                        className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                      {photo.caption && (
                        <div className="absolute inset-x-0 bottom-0 translate-y-full bg-black/70 px-3 py-2 text-xs text-white transition-transform group-hover:translate-y-0">
                          {photo.caption}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          )}
        </Container>
      </section>
    </PageShell>
  );
}
