import type { Metadata } from "next";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { db } from "@/lib/db";
import { AdminTable } from "@/components/admin/AdminTable";
import { formatDateShort } from "@/lib/utils";

export const metadata: Metadata = { title: "Articles" };

export default async function AdminArticlesPage() {
  const articles = await db.article.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  const rows = articles.map((a) => ({
    id: a.id,
    cells: [
      a.title,
      a.category?.name ?? "—",
      a.status,
      a.featured ? "Oui" : "Non",
      formatDateShort(a.publishedAt ?? a.createdAt),
    ],
  }));

  return (
    <AdminTable
      title="Articles"
      columns={["Titre", "Catégorie", "Statut", "À la une", "Date"]}
      rows={rows}
      createHref="/admin/articles/nouveau"
      createLabel="Nouvel article"
    />
  );
}
