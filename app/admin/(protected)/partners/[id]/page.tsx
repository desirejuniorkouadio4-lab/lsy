import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { PartnerForm } from "@/components/admin/forms/PartnerForm";

export const metadata: Metadata = { title: "Modifier le partenaire" };
interface Props { params: Promise<{ id: string }> }

export default async function Page({ params }: Props) {
  const { id } = await params;
  const partner = await db.partner.findUnique({ where: { id } });
  if (!partner) notFound();
  return <PartnerForm partner={partner} />;
}
