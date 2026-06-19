import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { requireAdminSession } from "@/lib/admin-guard";

const schema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  fileUrl: z.string().min(1),
  type: z.string().min(1),
  level: z.string().optional(),
  subject: z.string().optional(),
  year: z.string().optional(),
});

export async function POST(req: NextRequest) {
  const { error } = await requireAdminSession();
  if (error) return error;
  try {
    const data = schema.parse(await req.json());
    const doc = await db.document.create({
      data: {
        title: data.title, description: data.description || null,
        fileUrl: data.fileUrl, type: data.type,
        level: data.level || null, subject: data.subject || null,
        year: data.year || null,
      },
    });
    return NextResponse.json(doc, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) return NextResponse.json({ error: err.issues }, { status: 422 });
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
