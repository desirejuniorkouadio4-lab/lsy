import type { Metadata } from "next";
import { db } from "@/lib/db";
import { AdminTable } from "@/components/admin/AdminTable";
import { formatDateShort } from "@/lib/utils";
import { REQUEST_STATUS_LABELS } from "@/lib/constants";
import type { RequestStatus } from "@/lib/constants";

export const metadata: Metadata = { title: "Inscriptions alumni" };

export default async function AdminAlumniPage() {
  const profiles = await db.alumniProfile.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  const rows = profiles.map((p) => ({
    id: p.id,
    cells: [
      p.fullName,
      p.email,
      p.graduationYear ?? "—",
      p.profession ?? "—",
      p.wantsMentor ? "Oui" : "Non",
      REQUEST_STATUS_LABELS[p.status as RequestStatus] ?? p.status,
      formatDateShort(p.createdAt),
    ],
  }));

  return (
    <AdminTable
      title="Inscriptions alumni"
      columns={["Nom", "Email", "Promotion", "Profession", "Mentor", "Statut", "Date"]}
      rows={rows}
      editBasePath="/admin/alumni"
    />
  );
}
