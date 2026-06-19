import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { requireAdminSession } from "@/lib/admin-guard";

const schema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().optional(),
  videoUrl: z.string().min(1),
  thumbnail: z.string().optional(),
  category: z.string().optional(),
});

interface Ctx { params: Promise<{ id: string }> }

export async function PUT(req: NextRequest, { params }: Ctx) {
  const { error } = await requireAdminSession();
  if (error) return error;
  const { id } = await params;
  try {
    const data = schema.parse(await req.json());
    const video = await db.video.update({ where: { id }, data: { title: data.title, slug: data.slug, description: data.description || null, videoUrl: data.videoUrl, thumbnail: data.thumbnail || null, category: data.category || null } });
    return NextResponse.json(video);
  } catch (err) {
    if (err instanceof z.ZodError) return NextResponse.json({ error: err.issues }, { status: 422 });
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: Ctx) {
  const { error } = await requireAdminSession();
  if (error) return error;
  const { id } = await params;
  try {
    await db.video.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
