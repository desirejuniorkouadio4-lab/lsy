import type { Metadata } from "next";
import type { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken, SESSION_COOKIE, isAdminRole } from "@/lib/auth";
import { AdminShell } from "@/components/admin/AdminShell";

export const metadata: Metadata = {
  title: { default: "Administration", template: "%s — Admin LSY" },
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (!token) redirect("/admin/login");

  const session = await verifyToken(token);
  if (!session || !isAdminRole(session.role)) redirect("/admin/login");

  return <AdminShell session={session}>{children}</AdminShell>;
}
