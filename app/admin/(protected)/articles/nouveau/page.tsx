import type { Metadata } from "next";
import { db } from "@/lib/db";
import { ArticleForm } from "@/components/admin/forms/ArticleForm";

export const metadata: Metadata = { title: "Nouvel article" };

export default async function Page() {
  const categories = await db.category.findMany({ orderBy: { name: "asc" } });
  return <ArticleForm categories={categories} />;
}
