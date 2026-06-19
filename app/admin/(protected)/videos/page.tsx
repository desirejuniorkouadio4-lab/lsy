import type { Metadata } from "next";
import { db } from "@/lib/db";
import { AdminTable } from "@/components/admin/AdminTable";
import { formatDateShort } from "@/lib/utils";

export const metadata: Metadata = { title: "Vidéos" };

export default async function AdminVideosPage() {
  const videos = await db.video.findMany({ orderBy: { createdAt: "desc" } });
  const rows = videos.map((v) => ({
    id: v.id,
    cells: [v.title, v.category ?? "—", formatDateShort(v.createdAt)],
  }));
  return (
    <AdminTable title="Vidéos (Web TV)" columns={["Titre", "Catégorie", "Ajouté"]}
      rows={rows} createHref="/admin/videos/nouveau" createLabel="Ajouter une vidéo"
      editBasePath="/admin/videos" deleteApiPath="/api/admin/videos" />
  );
}
