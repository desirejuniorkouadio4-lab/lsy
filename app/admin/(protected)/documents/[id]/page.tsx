import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { DocumentForm } from "@/components/admin/forms/DocumentForm";

export const metadata: Metadata = { title: "Modifier le document" };
interface Props { params: Promise<{ id: string }> }

export default async function Page({ params }: Props) {
  const { id } = await params;
  const document = await db.document.findUnique({ where: { id } });
  if (!document) notFound();
  return <DocumentForm document={document} />;
}
