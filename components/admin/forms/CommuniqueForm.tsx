"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AdminFormLayout, fieldCls, labelCls } from "@/components/admin/AdminFormLayout";
import { AdminSelect } from "@/components/admin/AdminSelect";
import { slugify } from "@/lib/slugify";

type Communique = {
  id: string; title: string; slug: string; content: string;
  target: string; fileUrl: string | null; isUrgent: boolean; status: string;
};

interface Props { communique?: Communique }

const TARGET_OPTIONS = [
  { value: "TOUS", label: "Tous les publics" },
  { value: "ELEVES", label: "Élèves" },
  { value: "PARENTS", label: "Parents" },
  { value: "ENSEIGNANTS", label: "Enseignants" },
];

const STATUS_OPTIONS = [
  { value: "DRAFT", label: "Brouillon" },
  { value: "PUBLISHED", label: "Publié" },
  { value: "ARCHIVED", label: "Archivé" },
];

export function CommuniqueForm({ communique }: Props) {
  const router = useRouter();
  const isEdit = !!communique;

  const [form, setForm] = useState({
    title: communique?.title ?? "",
    slug: communique?.slug ?? "",
    content: communique?.content ?? "",
    target: communique?.target ?? "TOUS",
    fileUrl: communique?.fileUrl ?? "",
    isUrgent: communique?.isUrgent ?? false,
    status: communique?.status ?? "DRAFT",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function set(key: string, value: string | boolean) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setSaving(true); setError("");
    try {
      const url = isEdit ? `/api/admin/communiques/${communique.id}` : "/api/admin/communiques";
      const res = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) { router.push("/admin/communiques"); router.refresh(); }
      else { const d = await res.json(); setError(d.error ?? "Erreur."); }
    } catch { setError("Erreur réseau."); }
    finally { setSaving(false); }
  }

  return (
    <AdminFormLayout
      title={isEdit ? "Modifier le communiqué" : "Nouveau communiqué"}
      backHref="/admin/communiques" backLabel="Communiqués">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className={labelCls}>Titre *</label>
          <input type="text" required value={form.title}
            onChange={(e) => { set("title", e.target.value); if (!isEdit) set("slug", slugify(e.target.value)); }}
            placeholder="Titre du communiqué" className={fieldCls} />
        </div>

        <div>
          <label className={labelCls}>Slug</label>
          <input type="text" value={form.slug}
            onChange={(e) => set("slug", e.target.value)} className={fieldCls} />
        </div>

        <div>
          <label className={labelCls}>Contenu *</label>
          <textarea required rows={10} value={form.content}
            onChange={(e) => set("content", e.target.value)}
            placeholder="<p>Contenu du communiqué...</p>"
            className={`${fieldCls} font-mono text-xs`} />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={labelCls}>Public cible</label>
            <AdminSelect value={form.target} onChange={(v) => set("target", v)} options={TARGET_OPTIONS} />
          </div>
          <div>
            <label className={labelCls}>Statut</label>
            <AdminSelect value={form.status} onChange={(v) => set("status", v)} options={STATUS_OPTIONS} />
          </div>
          <div className="sm:col-span-2">
            <label className={labelCls}>Fichier joint (URL)</label>
            <input type="text" value={form.fileUrl}
              onChange={(e) => set("fileUrl", e.target.value)}
              placeholder="https://..." className={fieldCls} />
          </div>
        </div>

        <label className="flex cursor-pointer items-center gap-2.5">
          <input type="checkbox" checked={form.isUrgent}
            onChange={(e) => set("isUrgent", e.target.checked)}
            className="size-4 accent-lsy-gold-500" />
          <span className="text-sm text-white/70">Marquer comme urgent</span>
        </label>

        {error && <p className="rounded-xl bg-red-500/15 px-3 py-2 text-xs text-red-300">{error}</p>}

        <div className="flex justify-end gap-3 border-t border-white/8 pt-5">
          <button type="button" onClick={() => router.push("/admin/communiques")}
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
