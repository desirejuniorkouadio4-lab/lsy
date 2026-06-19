import type { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken, SESSION_COOKIE } from "@/lib/auth";
import { PortalShell } from "@/components/portail/PortalShell";

export default async function ParentLayout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) redirect("/portail/connexion?from=/portail/parent");

  const session = await verifyToken(token);
  if (!session) redirect("/portail/connexion?from=/portail/parent");

  const allowedRoles = ["PARENT", "SUPER_ADMIN", "ADMIN"];
  if (!allowedRoles.includes(session.role)) redirect("/portail/connexion?from=/portail/parent");

  return <PortalShell session={session}>{children}</PortalShell>;
}
