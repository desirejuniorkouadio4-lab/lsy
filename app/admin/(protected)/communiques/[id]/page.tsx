import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { CommuniqueForm } from "@/components/admin/forms/CommuniqueForm";

export const metadata: Metadata = { title: "Modifier le communiqué" };
interface Props { params: Promise<{ id: string }> }

export default async function Page({ params }: Props) {
  const { id } = await params;
  const communique = await db.communique.findUnique({ where: { id } });
  if (!communique) notFound();
  return <CommuniqueForm communique={communique} />;
}
