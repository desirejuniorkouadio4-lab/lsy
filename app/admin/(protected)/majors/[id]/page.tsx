import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { MajorForm } from "@/components/admin/forms/MajorForm";

export const metadata: Metadata = { title: "Modifier le major" };
interface Props { params: Promise<{ id: string }> }

export default async function Page({ params }: Props) {
  const { id } = await params;
  const major = await db.major.findUnique({ where: { id } });
  if (!major) notFound();
  return <MajorForm major={major} />;
}
