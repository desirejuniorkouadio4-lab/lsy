import type { Metadata } from "next";
import { db } from "@/lib/db";
import { AdminTable } from "@/components/admin/AdminTable";
import { formatDateShort } from "@/lib/utils";
import { COMMUNIQUE_TARGET_LABELS } from "@/lib/constants";
import type { CommuniqueTarget } from "@/lib/constants";

export const metadata: Metadata = { title: "Communiqués" };

export default async function AdminCommuniquesPage() {
  const communiques = await db.communique.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  const rows = communiques.map((c) => ({
    id: c.id,
    cells: [
      c.title,
      COMMUNIQUE_TARGET_LABELS[c.target as CommuniqueTarget] ?? c.target,
      c.isUrgent ? "Urgent" : "Normal",
      c.status,
      formatDateShort(c.publishedAt ?? c.createdAt),
    ],
  }));

  return (
    <AdminTable
      title="Communiqués"
      columns={["Titre", "Public cible", "Priorité", "Statut", "Date"]}
      rows={rows}
      createHref="/admin/communiques/nouveau"
      createLabel="Nouveau communiqué"
      editBasePath="/admin/communiques"
      deleteApiPath="/api/admin/communiques"
    />
  );
}
