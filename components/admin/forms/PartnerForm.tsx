"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AdminFormLayout, fieldCls, labelCls } from "@/components/admin/AdminFormLayout";
import { ImageUpload } from "@/components/admin/ImageUpload";

type Partner = {
  id: string; name: string; acronym: string | null; logoUrl: string | null;
  website: string | null; category: string | null; isActive: boolean; sortOrder: number;
};

interface Props { partner?: Partner }

export function PartnerForm({ partner }: Props) {
  const router = useRouter();
  const isEdit = !!partner;

  const [form, setForm] = useState({
    name: partner?.name ?? "",
    acronym: partner?.acronym ?? "",
    logoUrl: partner?.logoUrl ?? "",
    website: partner?.website ?? "",
    category: partner?.category ?? "",
    isActive: partner?.isActive ?? true,
    sortOrder: partner?.sortOrder ?? 0,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function set(key: string, value: string | boolean | number) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setSaving(true); setError("");
    try {
      const url = isEdit ? `/api/admin/partners/${partner.id}` : "/api/admin/partners";
      const res = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, sortOrder: Number(form.sortOrder) }),
      });
      if (res.ok) { router.push("/admin/partners"); router.refresh(); }
      else { const d = await res.json(); setError(d.error ?? "Erreur."); }
    } catch { setError("Erreur réseau."); }
    finally { setSaving(false); }
  }

  return (
    <AdminFormLayout
      title={isEdit ? "Modifier le partenaire" : "Ajouter un partenaire"}
      backHref="/admin/partners" backLabel="Partenaires">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={labelCls}>Nom complet *</label>
            <input type="text" required value={form.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="Ministère de l'Éducation Nationale" className={fieldCls} />
          </div>
          <div>
            <label className={labelCls}>Sigle / Acronyme</label>
            <input type="text" value={form.acronym}
              onChange={(e) => set("acronym", e.target.value)}
              placeholder="MEN" className={fieldCls} />
          </div>
          <div>
            <label className={labelCls}>Catégorie</label>
            <input type="text" value={form.category}
              onChange={(e) => set("category", e.target.value)}
              placeholder="Tutelle, Institution, Entreprise…" className={fieldCls} />
          </div>
          <div className="sm:col-span-2">
            <label className={labelCls}>Site web</label>
            <input type="text" value={form.website}
              onChange={(e) => set("website", e.target.value)}
              placeholder="https://..." className={fieldCls} />
          </div>
          <div>
            <label className={labelCls}>Ordre d&apos;affichage</label>
            <input type="number" value={form.sortOrder}
              onChange={(e) => set("sortOrder", e.target.value)}
              className={fieldCls} />
          </div>
        </div>

        <ImageUpload
          label="Logo du partenaire"
          value={form.logoUrl}
          onChange={(url) => set("logoUrl", url)}
        />

        <label className="flex cursor-pointer items-center gap-2.5">
          <input type="checkbox" checked={form.isActive}
            onChange={(e) => set("isActive", e.target.checked)}
            className="size-4 accent-lsy-gold-500" />
          <span className="text-sm text-white/70">Afficher sur le site public</span>
        </label>

        {error && <p className="rounded-xl bg-red-500/15 px-3 py-2 text-xs text-red-300">{error}</p>}

        <div className="flex justify-end gap-3 border-t border-white/8 pt-5">
          <button type="button" onClick={() => router.push("/admin/partners")}
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
