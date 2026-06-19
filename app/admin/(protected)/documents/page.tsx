import type { Metadata } from "next";
import { db } from "@/lib/db";
import { AdminTable } from "@/components/admin/AdminTable";
import { formatDateShort } from "@/lib/utils";

export const metadata: Metadata = { title: "Documents" };

export default async function AdminDocumentsPage() {
  const documents = await db.document.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  const rows = documents.map((d) => ({
    id: d.id,
    cells: [
      d.title,
      d.type,
      d.level ?? "—",
      d.subject ?? "—",
      formatDateShort(d.createdAt),
    ],
  }));

  return (
    <AdminTable
      title="Documents"
      columns={["Titre", "Type", "Niveau", "Matière", "Ajouté"]}
      rows={rows}
      createHref="/admin/documents/nouveau"
      createLabel="Nouveau document"
    />
  );
}
