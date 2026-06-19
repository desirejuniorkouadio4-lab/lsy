import type { Metadata } from "next";
import { db } from "@/lib/db";
import { AdminTable } from "@/components/admin/AdminTable";

export const metadata: Metadata = { title: "Partenaires" };

export default async function AdminPartnersPage() {
  const partners = await db.partner.findMany({ orderBy: [{ sortOrder: "asc" }, { name: "asc" }] });

  const rows = partners.map((p) => ({
    id: p.id,
    cells: [
      p.name,
      p.acronym ?? "—",
      p.category ?? "—",
      p.isActive ? "Actif" : "Masqué",
    ],
  }));

  return (
    <AdminTable
      title="Partenaires institutionnels"
      columns={["Nom", "Sigle", "Catégorie", "Statut"]}
      rows={rows}
      createHref="/admin/partners/nouveau"
      createLabel="Ajouter un partenaire"
      editBasePath="/admin/partners"
      deleteApiPath="/api/admin/partners"
    />
  );
}
