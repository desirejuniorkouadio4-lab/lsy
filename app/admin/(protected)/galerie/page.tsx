import type { Metadata } from "next";
import { db } from "@/lib/db";
import { AdminTable } from "@/components/admin/AdminTable";
import { formatDateShort } from "@/lib/utils";

export const metadata: Metadata = { title: "Galerie photos" };

export default async function AdminGaleriePage() {
  const albums = await db.galleryAlbum.findMany({
    include: { _count: { select: { photos: true } } },
    orderBy: { createdAt: "desc" },
  });

  const rows = albums.map((a) => ({
    id: a.id,
    cells: [a.title, a.year ?? "—", `${a._count.photos} photo(s)`, formatDateShort(a.createdAt)],
  }));

  return (
    <AdminTable
      title="Albums galerie"
      columns={["Titre", "Année", "Photos", "Créé"]}
      rows={rows}
      createHref="/admin/galerie/nouveau"
      createLabel="Nouvel album"
      editBasePath="/admin/galerie"
      deleteApiPath="/api/admin/galerie"
    />
  );
}
