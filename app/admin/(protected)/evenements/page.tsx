import type { Metadata } from "next";
import { db } from "@/lib/db";
import { AdminTable } from "@/components/admin/AdminTable";
import { formatDateShort } from "@/lib/utils";

export const metadata: Metadata = { title: "Événements" };

export default async function AdminEvenementsPage() {
  const events = await db.event.findMany({
    orderBy: { startDate: "desc" },
    take: 50,
  });

  const rows = events.map((e) => ({
    id: e.id,
    cells: [
      e.title,
      e.category ?? "—",
      e.location ?? "—",
      e.status,
      formatDateShort(e.startDate),
    ],
  }));

  return (
    <AdminTable
      title="Événements"
      columns={["Titre", "Catégorie", "Lieu", "Statut", "Date"]}
      rows={rows}
      createHref="/admin/evenements/nouveau"
      createLabel="Nouvel événement"
    />
  );
}
