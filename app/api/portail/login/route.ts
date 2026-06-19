import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { db } from "@/lib/db";
import { signToken, verifyPassword, SESSION_COOKIE } from "@/lib/auth";
import type { Role } from "@/lib/constants";

const PORTAL_ROLES: Role[] = ["STUDENT", "PARENT", "TEACHER", "ALUMNI", "PARTNER"];

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const ROLE_REDIRECT: Partial<Record<Role, string>> = {
  STUDENT: "/portail/eleve",
  PARENT: "/portail/parent",
  TEACHER: "/portail/enseignant",
  ALUMNI: "/portail/eleve",
  PARTNER: "/portail/eleve",
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = schema.parse(body);

    const user = await db.user.findUnique({ where: { email } });
    if (!user || !user.password || !user.isActive) {
      return NextResponse.json({ error: "Identifiants incorrects" }, { status: 401 });
    }

    const role = user.role as Role;
    if (!PORTAL_ROLES.includes(role)) {
      return NextResponse.json({ error: "Accès non autorisé pour ce portail" }, { status: 403 });
    }

    const valid = await verifyPassword(password, user.password);
    if (!valid) {
      return NextResponse.json({ error: "Identifiants incorrects" }, { status: 401 });
    }

    const token = await signToken({ userId: user.id, email: user.email, name: user.name, role });
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE, token, {
      httpOnly: true, sameSite: "lax", path: "/",
      maxAge: 60 * 60 * 24 * 7,
      secure: process.env.NODE_ENV === "production",
    });

    const redirectTo = ROLE_REDIRECT[role] ?? "/portail";
    return NextResponse.json({ ok: true, redirectTo }, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) return NextResponse.json({ error: "Données invalides" }, { status: 422 });
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
