import type { Metadata } from "next";
import type { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";
import { SESSION_COOKIE } from "@/lib/auth";
import { isAdminRole } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export const metadata: Metadata = {
  title: { default: "Administration", template: "%s — Admin LSY" },
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: ReactNode }) {
  // Server-side auth guard (defense-in-depth — proxy also guards)
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (!token) redirect("/admin/login");

  const session = await verifyToken(token);
  if (!session || !isAdminRole(session.role)) redirect("/admin/login");

  return (
    <div className="flex min-h-screen bg-[#0f1623]">
      <AdminSidebar session={session} />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
