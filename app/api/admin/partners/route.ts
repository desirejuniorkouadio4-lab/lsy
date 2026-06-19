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
  isActive: z.boolean().default(true),
  sortOrder: z.number().int().default(0),
});

export async function POST(req: NextRequest) {
  const { error } = await requireAdminSession();
  if (error) return error;
  try {
    const data = schema.parse(await req.json());
    const partner = await db.partner.create({
      data: {
        name: data.name, acronym: data.acronym || null,
        logoUrl: data.logoUrl || null, website: data.website || null,
        category: data.category || null, isActive: data.isActive,
        sortOrder: data.sortOrder,
      },
    });
    return NextResponse.json(partner, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) return NextResponse.json({ error: err.issues }, { status: 422 });
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
