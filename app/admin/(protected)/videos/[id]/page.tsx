import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { VideoForm } from "@/components/admin/forms/VideoForm";

export const metadata: Metadata = { title: "Modifier la vidéo" };
interface Props { params: Promise<{ id: string }> }

export default async function Page({ params }: Props) {
  const { id } = await params;
  const video = await db.video.findUnique({ where: { id } });
  if (!video) notFound();
  return <VideoForm video={video} />;
}
