import { put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin-guard";

export async function POST(req: NextRequest) {
  const { error } = await requireAdminSession();
  if (error) return error;

  const form = await req.formData();
  const file = form.get("file") as File | null;

  if (!file || !file.size) {
    return NextResponse.json({ error: "Fichier manquant" }, { status: 400 });
  }

  const blob = await put(file.name, file, {
    access: "public",
    addRandomSuffix: true,
  });

  return NextResponse.json({ url: blob.url });
}
