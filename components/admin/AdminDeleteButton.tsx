"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

interface Props {
  id: string;
  apiPath: string;
  label?: string;
}

export function AdminDeleteButton({ id, apiPath, label }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!window.confirm("Confirmer la suppression ? Cette action est irréversible.")) return;
    setLoading(true);
    try {
      const res = await fetch(`${apiPath}/${id}`, { method: "DELETE" });
      if (res.ok) {
        router.refresh();
      } else {
        alert("Erreur lors de la suppression.");
      }
    } catch {
      alert("Erreur réseau.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="rounded-lg px-2 py-1 text-xs font-semibold text-red-400/70 transition-colors hover:bg-red-500/10 hover:text-red-400 disabled:opacity-40"
      aria-label={label ?? "Supprimer"}
    >
      <Trash2 className="size-3.5" aria-hidden />
    </button>
  );
}
