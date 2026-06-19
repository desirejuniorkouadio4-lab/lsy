import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { requireAdminSession } from "@/lib/admin-guard";

const albumSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().optional(),
  coverImage: z.string().optional(),
  year: z.string().optional(),
});

const photoSchema = z.object({
  imageUrl: z.string().min(1),
  caption: z.string().optional(),
  sortOrder: z.number().int().default(0),
});

interface Ctx { params: Promise<{ id: string }> }

export async function PUT(req: NextRequest, { params }: Ctx) {
  const { error } = await requireAdminSession();
  if (error) return error;
  const { id } = await params;
  try {
    const data = albumSchema.parse(await req.json());
    const album = await db.galleryAlbum.update({
      where: { id },
      data: { title: data.title, slug: data.slug, description: data.description || null, coverImage: data.coverImage || null, year: data.year || null },
    });
    return NextResponse.json(album);
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
    await db.galleryAlbum.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
