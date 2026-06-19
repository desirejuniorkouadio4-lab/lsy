import type { Metadata } from "next";
import { db } from "@/lib/db";
import { AdminTable } from "@/components/admin/AdminTable";
import { formatDateShort } from "@/lib/utils";

export const metadata: Metadata = { title: "Majors" };

export default async function AdminMajorsPage() {
  const majors = await db.major.findMany({
    orderBy: [{ year: "desc" }],
    take: 100,
  });

  const rows = majors.map((m) => ({
    id: m.id,
    cells: [
      m.name,
      m.year,
      m.className,
      m.average ?? "—",
      m.isDemo ? "Démo" : "Officiel",
      formatDateShort(m.createdAt),
    ],
  }));

  return (
    <AdminTable
      title="Majors de promotion"
      columns={["Nom", "Promotion", "Classe", "Moyenne", "Type", "Ajouté"]}
      rows={rows}
      createHref="/admin/majors/nouveau"
      createLabel="Ajouter un major"
    />
  );
}
