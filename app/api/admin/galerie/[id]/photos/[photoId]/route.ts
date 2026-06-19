import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdminSession } from "@/lib/admin-guard";

interface Ctx { params: Promise<{ id: string; photoId: string }> }

export async function DELETE(_req: NextRequest, { params }: Ctx) {
  const { error } = await requireAdminSession();
  if (error) return error;
  const { photoId } = await params;
  try {
    await db.galleryPhoto.delete({ where: { id: photoId } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
