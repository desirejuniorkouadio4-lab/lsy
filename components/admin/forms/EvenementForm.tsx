"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AdminFormLayout, fieldCls, selectCls, labelCls } from "@/components/admin/AdminFormLayout";
import { slugify } from "@/lib/slugify";

type Evenement = {
  id: string; title: string; slug: string; description: string;
  location: string | null; startDate: Date; endDate: Date | null;
  coverImage: string | null; category: string | null; status: string;
};

interface Props { evenement?: Evenement }

function toLocal(d: Date | null): string {
  if (!d) return "";
  return new Date(d).toISOString().slice(0, 16);
}

export function EvenementForm({ evenement }: Props) {
  const router = useRouter();
  const isEdit = !!evenement;

  const [form, setForm] = useState({
    title: evenement?.title ?? "",
    slug: evenement?.slug ?? "",
    description: evenement?.description ?? "",
    location: evenement?.location ?? "",
    startDate: toLocal(evenement?.startDate ?? null),
    endDate: toLocal(evenement?.endDate ?? null),
    coverImage: evenement?.coverImage ?? "",
    category: evenement?.category ?? "",
    status: evenement?.status ?? "DRAFT",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function set(key: string, value: string) { setForm((f) => ({ ...f, [key]: value })); }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setSaving(true); setError("");
    try {
      const url = isEdit ? `/api/admin/evenements/${evenement.id}` : "/api/admin/evenements";
      const res = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) { router.push("/admin/evenements"); router.refresh(); }
      else { const d = await res.json(); setError(d.error ?? "Erreur."); }
    } catch { setError("Erreur réseau."); }
    finally { setSaving(false); }
  }

  return (
    <AdminFormLayout
      title={isEdit ? "Modifier l'événement" : "Nouvel événement"}
      backHref="/admin/evenements" backLabel="Événements">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className={labelCls}>Titre *</label>
          <input type="text" required value={form.title}
            onChange={(e) => { set("title", e.target.value); if (!isEdit) set("slug", slugify(e.target.value)); }}
            placeholder="Titre de l'événement" className={fieldCls} />
        </div>
        <div>
          <label className={labelCls}>Description *</label>
          <textarea required rows={5} value={form.description}
            onChange={(e) => set("description", e.target.value)}
            placeholder="Description de l'événement" className={fieldCls} />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={labelCls}>Date de début *</label>
            <input type="datetime-local" required value={form.startDate}
              onChange={(e) => set("startDate", e.target.value)} className={fieldCls} />
          </div>
          <div>
            <label className={labelCls}>Date de fin</label>
            <input type="datetime-local" value={form.endDate}
              onChange={(e) => set("endDate", e.target.value)} className={fieldCls} />
          </div>
          <div>
            <label className={labelCls}>Lieu</label>
            <input type="text" value={form.location}
              onChange={(e) => set("location", e.target.value)}
              placeholder="Salle des fêtes, Amphi A…" className={fieldCls} />
          </div>
          <div>
            <label className={labelCls}>Catégorie</label>
            <input type="text" value={form.category}
              onChange={(e) => set("category", e.target.value)}
              placeholder="Cérémonie, Sport, Culturel…" className={fieldCls} />
          </div>
          <div>
            <label className={labelCls}>Image (URL)</label>
            <input type="text" value={form.coverImage}
              onChange={(e) => set("coverImage", e.target.value)}
              placeholder="https://..." className={fieldCls} />
          </div>
          <div>
            <label className={labelCls}>Statut</label>
            <select value={form.status} onChange={(e) => set("status", e.target.value)} className={fieldCls}>
              <option value="DRAFT">Brouillon</option>
              <option value="PUBLISHED">Publié</option>
              <option value="ARCHIVED">Archivé</option>
            </select>
          </div>
        </div>

        {error && <p className="rounded-xl bg-red-500/15 px-3 py-2 text-xs text-red-300">{error}</p>}

        <div className="flex justify-end gap-3 border-t border-white/8 pt-5">
          <button type="button" onClick={() => router.push("/admin/evenements")}
            className="rounded-lg px-4 py-2 text-sm font-semibold text-white/50 hover:text-white/80 transition-colors">
            Annuler
          </button>
          <button type="submit" disabled={saving}
            className="rounded-lg bg-lsy-gold-500 px-5 py-2 text-sm font-bold text-lsy-blue-950 transition-opacity hover:opacity-90 disabled:opacity-50">
            {saving ? "Enregistrement…" : isEdit ? "Enregistrer" : "Créer"}
          </button>
        </div>
      </form>
    </AdminFormLayout>
  );
}
