"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AdminFormLayout, fieldCls, labelCls } from "@/components/admin/AdminFormLayout";
import { LEVELS } from "@/lib/constants";

type Major = {
  id: string; name: string; year: string; className: string;
  average: string | null; photoUrl: string | null;
  testimony: string | null; isDemo: boolean;
};

interface Props { major?: Major }

export function MajorForm({ major }: Props) {
  const router = useRouter();
  const isEdit = !!major;

  const [form, setForm] = useState({
    name: major?.name ?? "",
    year: major?.year ?? new Date().getFullYear().toString(),
    className: major?.className ?? "",
    average: major?.average ?? "",
    photoUrl: major?.photoUrl ?? "",
    testimony: major?.testimony ?? "",
    isDemo: major?.isDemo ?? false,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function set(key: string, value: string | boolean) { setForm((f) => ({ ...f, [key]: value })); }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setSaving(true); setError("");
    try {
      const url = isEdit ? `/api/admin/majors/${major.id}` : "/api/admin/majors";
      const res = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) { router.push("/admin/majors"); router.refresh(); }
      else { const d = await res.json(); setError(d.error ?? "Erreur."); }
    } catch { setError("Erreur réseau."); }
    finally { setSaving(false); }
  }

  return (
    <AdminFormLayout
      title={isEdit ? "Modifier le major" : "Ajouter un major"}
      backHref="/admin/majors" backLabel="Majors">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={labelCls}>Nom complet *</label>
            <input type="text" required value={form.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="Prénom NOM" className={fieldCls} />
          </div>
          <div>
            <label className={labelCls}>Promotion (année) *</label>
            <input type="text" required value={form.year}
              onChange={(e) => set("year", e.target.value)}
              placeholder="2024" className={fieldCls} />
          </div>
          <div>
            <label className={labelCls}>Classe *</label>
            <select value={form.className} onChange={(e) => set("className", e.target.value)} className={fieldCls}>
              <option value="">— Choisir —</option>
              {LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
              <option value="BAC C">BAC C</option>
              <option value="BAC D">BAC D</option>
              <option value="BEPC">BEPC</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>Moyenne</label>
            <input type="text" value={form.average}
              onChange={(e) => set("average", e.target.value)}
              placeholder="18.50" className={fieldCls} />
          </div>
          <div className="sm:col-span-2">
            <label className={labelCls}>Photo (URL)</label>
            <input type="text" value={form.photoUrl}
              onChange={(e) => set("photoUrl", e.target.value)}
              placeholder="https://..." className={fieldCls} />
          </div>
          <div className="sm:col-span-2">
            <label className={labelCls}>Témoignage</label>
            <textarea rows={4} value={form.testimony}
              onChange={(e) => set("testimony", e.target.value)}
              placeholder="Témoignage du major (affiché sur la page Majors)"
              className={fieldCls} />
          </div>
        </div>

        <label className="flex cursor-pointer items-center gap-2.5">
          <input type="checkbox" checked={form.isDemo}
            onChange={(e) => set("isDemo", e.target.checked)}
            className="size-4 accent-lsy-gold-500" />
          <span className="text-sm text-white/70">Données de démonstration (ne s&apos;affiche pas en production)</span>
        </label>

        {error && <p className="rounded-xl bg-red-500/15 px-3 py-2 text-xs text-red-300">{error}</p>}

        <div className="flex justify-end gap-3 border-t border-white/8 pt-5">
          <button type="button" onClick={() => router.push("/admin/majors")}
            className="rounded-lg px-4 py-2 text-sm font-semibold text-white/50 hover:text-white/80 transition-colors">
            Annuler
          </button>
          <button type="submit" disabled={saving}
            className="rounded-lg bg-lsy-gold-500 px-5 py-2 text-sm font-bold text-lsy-blue-950 transition-opacity hover:opacity-90 disabled:opacity-50">
            {saving ? "Enregistrement…" : isEdit ? "Enregistrer" : "Ajouter"}
          </button>
        </div>
      </form>
    </AdminFormLayout>
  );
}
