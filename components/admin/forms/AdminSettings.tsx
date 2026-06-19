"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AdminFormLayout, fieldCls, labelCls } from "@/components/admin/AdminFormLayout";

interface Props {
  initialProviseurName: string;
  initialProviseurMessage: string;
}

export function AdminSettings({ initialProviseurName, initialProviseurMessage }: Props) {
  const router = useRouter();
  const [name, setName] = useState(initialProviseurName);
  const [message, setMessage] = useState(initialProviseurMessage);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true); setSuccess(false); setError("");
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          settings: {
            proviseur_name: name,
            proviseur_message: message,
          },
        }),
      });
      if (res.ok) {
        setSuccess(true);
        router.refresh();
      } else {
        setError("Erreur lors de l'enregistrement.");
      }
    } catch {
      setError("Erreur réseau.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <AdminFormLayout title="Paramètres du site" backHref="/admin" backLabel="Tableau de bord">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h2 className="mb-4 text-sm font-bold text-lsy-gold-400 uppercase tracking-widest">
            Mot du Proviseur
          </h2>

          <div className="space-y-4">
            <div>
              <label className={labelCls}>Nom du Proviseur</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Prénom NOM"
                className={fieldCls}
              />
            </div>

            <div>
              <label className={labelCls}>Message du Proviseur</label>
              <p className="mb-2 text-xs text-white/30">
                Séparez les paragraphes par une ligne vide. Ce texte apparaît sur la page
                &ldquo;Mot du Proviseur&rdquo; et en version courte sur la page d&apos;accueil.
              </p>
              <textarea
                rows={14}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={fieldCls}
              />
            </div>
          </div>
        </div>

        {error && (
          <p className="rounded-xl bg-red-500/15 px-3 py-2 text-xs text-red-300">{error}</p>
        )}
        {success && (
          <p className="rounded-xl bg-green-500/15 px-3 py-2 text-xs text-green-300">
            Paramètres enregistrés avec succès.
          </p>
        )}

        <div className="flex justify-end gap-3 border-t border-white/8 pt-5">
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-lsy-gold-500 px-5 py-2 text-sm font-bold text-lsy-blue-950 transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {saving ? "Enregistrement…" : "Enregistrer les paramètres"}
          </button>
        </div>
      </form>
    </AdminFormLayout>
  );
}
