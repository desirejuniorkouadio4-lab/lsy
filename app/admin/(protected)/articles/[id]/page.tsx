import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { ArticleForm } from "@/components/admin/forms/ArticleForm";

export const metadata: Metadata = { title: "Modifier l'article" };

interface Props { params: Promise<{ id: string }> }

export default async function Page({ params }: Props) {
  const { id } = await params;
  const [article, categories] = await Promise.all([
    db.article.findUnique({ where: { id } }),
    db.category.findMany({ orderBy: { name: "asc" } }),
  ]);
  if (!article) notFound();
  return <ArticleForm article={article} categories={categories} />;
}
