import type { Metadata } from "next";
import { db } from "@/lib/db";
import { AdminTable } from "@/components/admin/AdminTable";
import { formatDateShort } from "@/lib/utils";
import { REQUEST_STATUS_LABELS } from "@/lib/constants";
import type { RequestStatus } from "@/lib/constants";

export const metadata: Metadata = { title: "Messages de contact" };

export default async function AdminMessagesPage() {
  const messages = await db.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  const rows = messages.map((m) => ({
    id: m.id,
    cells: [
      m.name,
      m.email,
      m.subject,
      REQUEST_STATUS_LABELS[m.status as RequestStatus] ?? m.status,
      formatDateShort(m.createdAt),
    ],
  }));

  return (
    <AdminTable
      title="Messages de contact"
      columns={["Nom", "Email", "Objet", "Statut", "Reçu le"]}
      rows={rows}
    />
  );
}
