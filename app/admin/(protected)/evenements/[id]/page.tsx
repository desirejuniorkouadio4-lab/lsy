import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { EvenementForm } from "@/components/admin/forms/EvenementForm";

export const metadata: Metadata = { title: "Modifier l'événement" };
interface Props { params: Promise<{ id: string }> }

export default async function Page({ params }: Props) {
  const { id } = await params;
  const evenement = await db.event.findUnique({ where: { id } });
  if (!evenement) notFound();
  return <EvenementForm evenement={evenement} />;
}
