import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { requireAdminSession } from "@/lib/admin-guard";
import { uniqueSlug } from "@/lib/slugify";

const schema = z.object({
  title: z.string().min(1),
  slug: z.string().optional(),
  content: z.string().min(1),
  target: z.enum(["TOUS", "ELEVES", "PARENTS", "ENSEIGNANTS"]).default("TOUS"),
  fileUrl: z.string().optional(),
  isUrgent: z.boolean().default(false),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("DRAFT"),
});

export async function POST(req: NextRequest) {
  const { error } = await requireAdminSession();
  if (error) return error;

  try {
    const data = schema.parse(await req.json());
    const slug = data.slug || uniqueSlug(data.title);
    const communique = await db.communique.create({
      data: {
        title: data.title, slug, content: data.content,
        target: data.target, fileUrl: data.fileUrl || null,
        isUrgent: data.isUrgent, status: data.status,
        publishedAt: data.status === "PUBLISHED" ? new Date() : null,
      },
    });
    return NextResponse.json(communique, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) return NextResponse.json({ error: err.issues }, { status: 422 });
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
