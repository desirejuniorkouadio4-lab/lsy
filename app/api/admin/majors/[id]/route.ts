import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { requireAdminSession } from "@/lib/admin-guard";

const schema = z.object({
  name: z.string().min(1),
  year: z.string().min(1),
  className: z.string().min(1),
  average: z.string().optional(),
  photoUrl: z.string().optional(),
  testimony: z.string().optional(),
  isDemo: z.boolean(),
});

interface Ctx { params: Promise<{ id: string }> }

export async function PUT(req: NextRequest, { params }: Ctx) {
  const { error } = await requireAdminSession();
  if (error) return error;
  const { id } = await params;
  try {
    const data = schema.parse(await req.json());
    const major = await db.major.update({
      where: { id },
      data: {
        name: data.name, year: data.year, className: data.className,
        average: data.average || null, photoUrl: data.photoUrl || null,
        testimony: data.testimony || null, isDemo: data.isDemo,
      },
    });
    return NextResponse.json(major);
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
    await db.major.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
