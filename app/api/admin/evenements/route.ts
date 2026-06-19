import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { requireAdminSession } from "@/lib/admin-guard";
import { uniqueSlug } from "@/lib/slugify";

const schema = z.object({
  title: z.string().min(1),
  slug: z.string().optional(),
  description: z.string().min(1),
  location: z.string().optional(),
  startDate: z.string().min(1),
  endDate: z.string().optional(),
  coverImage: z.string().optional(),
  category: z.string().optional(),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("DRAFT"),
});

export async function POST(req: NextRequest) {
  const { error } = await requireAdminSession();
  if (error) return error;
  try {
    const data = schema.parse(await req.json());
    const slug = data.slug || uniqueSlug(data.title);
    const event = await db.event.create({
      data: {
        title: data.title, slug, description: data.description,
        location: data.location || null, startDate: new Date(data.startDate),
        endDate: data.endDate ? new Date(data.endDate) : null,
        coverImage: data.coverImage || null,
        category: data.category || null, status: data.status,
      },
    });
    return NextResponse.json(event, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) return NextResponse.json({ error: err.issues }, { status: 422 });
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
