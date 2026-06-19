import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { requireAdminSession } from "@/lib/admin-guard";

const schema = z.object({
  imageUrl: z.string().min(1),
  caption: z.string().optional(),
  sortOrder: z.number().int().default(0),
});

interface Ctx { params: Promise<{ id: string }> }

export async function POST(req: NextRequest, { params }: Ctx) {
  const { error } = await requireAdminSession();
  if (error) return error;
  const { id: albumId } = await params;
  try {
    const data = schema.parse(await req.json());
    const photo = await db.galleryPhoto.create({
      data: { albumId, imageUrl: data.imageUrl, caption: data.caption || null, sortOrder: data.sortOrder },
    });
    return NextResponse.json(photo, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) return NextResponse.json({ error: err.issues }, { status: 422 });
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
