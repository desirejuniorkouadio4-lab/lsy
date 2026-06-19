import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { requireAdminSession } from "@/lib/admin-guard";

const schema = z.object({
  name: z.string().min(1),
  acronym: z.string().optional(),
  logoUrl: z.string().optional(),
  website: z.string().optional(),
  category: z.string().optional(),
  isActive: z.boolean(),
  sortOrder: z.number().int(),
});

interface Ctx { params: Promise<{ id: string }> }

export async function PUT(req: NextRequest, { params }: Ctx) {
  const { error } = await requireAdminSession();
  if (error) return error;
  const { id } = await params;
  try {
    const data = schema.parse(await req.json());
    const partner = await db.partner.update({
      where: { id },
      data: {
        name: data.name, acronym: data.acronym || null,
        logoUrl: data.logoUrl || null, website: data.website || null,
        category: data.category || null, isActive: data.isActive,
        sortOrder: data.sortOrder,
      },
    });
    return NextResponse.json(partner);
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
    await db.partner.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
