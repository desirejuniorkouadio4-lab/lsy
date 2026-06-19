"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminFormLayout } from "@/components/admin/AdminFormLayout";
import { REQUEST_STATUS_LABELS } from "@/lib/constants";
import type { RequestStatus } from "@/lib/constants";

interface PageProps { params: Promise<{ id: string }> }

export default function AlumniDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function updateStatus(status: RequestStatus) {
    setLoading(true);
    await fetch(`/api/admin/alumni/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    router.push("/admin/alumni");
    router.refresh();
  }

  return (
    <AdminFormLayout title="Inscription alumni" backHref="/admin/alumni" backLabel="Alumni">
      <p className="text-sm text-white/50">
        Utilisez les boutons ci-dessous pour changer le statut de cette inscription.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        {(["REVIEWED", "APPROVED", "REJECTED"] as RequestStatus[]).map((s) => (
          <button key={s} disabled={loading}
            onClick={() => updateStatus(s)}
            className="rounded-lg border border-white/10 px-4 py-2 text-sm font-semibold text-white/70 transition-colors hover:bg-white/8 hover:text-white disabled:opacity-40">
            Marquer : {REQUEST_STATUS_LABELS[s]}
          </button>
        ))}
      </div>
    </AdminFormLayout>
  );
}
