import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { requireAdminSession } from "@/lib/admin-guard";
import { uniqueSlug } from "@/lib/slugify";

const schema = z.object({
  title: z.string().min(1),
  slug: z.string().optional(),
  description: z.string().optional(),
  coverImage: z.string().optional(),
  year: z.string().optional(),
});

export async function POST(req: NextRequest) {
  const { error } = await requireAdminSession();
  if (error) return error;
  try {
    const data = schema.parse(await req.json());
    const album = await db.galleryAlbum.create({
      data: {
        title: data.title,
        slug: data.slug || uniqueSlug(data.title),
        description: data.description || null,
        coverImage: data.coverImage || null,
        year: data.year || null,
      },
    });
    return NextResponse.json(album, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) return NextResponse.json({ error: err.issues }, { status: 422 });
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
