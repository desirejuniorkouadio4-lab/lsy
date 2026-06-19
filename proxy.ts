import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { SESSION_COOKIE } from "./lib/auth";
import { ADMIN_ROLES } from "./lib/constants";
import type { Role } from "./lib/constants";

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ?? "lsy-dev-secret-change-in-production-2025",
);

const PORTAL_RULES: { prefix: string; allowedRoles: Role[] }[] = [
  { prefix: "/portail/eleve", allowedRoles: ["STUDENT", ...ADMIN_ROLES] },
  { prefix: "/portail/parent", allowedRoles: ["PARENT", ...ADMIN_ROLES] },
  { prefix: "/portail/enseignant", allowedRoles: ["TEACHER", ...ADMIN_ROLES] },
];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ——— Admin routes ———
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const token = request.cookies.get(SESSION_COOKIE)?.value;
    if (!token) return NextResponse.redirect(new URL("/admin/login", request.url));
    try {
      const { payload } = await jwtVerify(token, SECRET);
      const role = payload.role as Role;
      if (!ADMIN_ROLES.includes(role)) {
        return NextResponse.redirect(new URL("/admin/login", request.url));
      }
    } catch {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    return NextResponse.next();
  }

  // ——— Portal spaces ———
  for (const rule of PORTAL_RULES) {
    if (pathname.startsWith(rule.prefix)) {
      const token = request.cookies.get(SESSION_COOKIE)?.value;
      const loginUrl = new URL("/portail/connexion", request.url);
      loginUrl.searchParams.set("from", pathname);

      if (!token) return NextResponse.redirect(loginUrl);

      try {
        const { payload } = await jwtVerify(token, SECRET);
        const role = payload.role as Role;
        if (!rule.allowedRoles.includes(role)) {
          return NextResponse.redirect(loginUrl);
        }
      } catch {
        return NextResponse.redirect(loginUrl);
      }
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/portail/eleve/:path*", "/portail/parent/:path*", "/portail/enseignant/:path*"],
};
