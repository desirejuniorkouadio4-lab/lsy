import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { GalerieForm } from "@/components/admin/forms/GalerieForm";

export const metadata: Metadata = { title: "Modifier l'album" };
interface Props { params: Promise<{ id: string }> }

export default async function Page({ params }: Props) {
  const { id } = await params;
  const album = await db.galleryAlbum.findUnique({
    where: { id },
    include: { photos: { orderBy: { sortOrder: "asc" } } },
  });
  if (!album) notFound();
  return <GalerieForm album={album} />;
}
