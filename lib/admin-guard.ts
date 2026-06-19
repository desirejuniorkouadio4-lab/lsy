import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verifyToken, SESSION_COOKIE, isAdminRole } from "./auth";

export async function requireAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) {
    return {
      session: null,
      error: NextResponse.json({ error: "Non authentifié" }, { status: 401 }),
    };
  }
  const session = await verifyToken(token);
  if (!session || !isAdminRole(session.role)) {
    return {
      session: null,
      error: NextResponse.json({ error: "Accès refusé" }, { status: 403 }),
    };
  }
  return { session, error: null };
}
