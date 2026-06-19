import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const schema = z.object({
  fullName: z.string().min(2).max(100),
  email: z.string().email(),
  graduationYear: z.string().max(10).optional(),
  profession: z.string().max(100).optional(),
  message: z.string().max(1000).optional(),
  wantsMentor: z.boolean().optional().default(false),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    await db.alumniProfile.create({
      data: {
        fullName: data.fullName,
        email: data.email,
        graduationYear: data.graduationYear ?? null,
        profession: data.profession ?? null,
        message: data.message ?? null,
        wantsMentor: data.wantsMentor ?? false,
      },
    });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ errors: err.issues }, { status: 422 });
    }
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
