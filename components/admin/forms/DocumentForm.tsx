"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AdminFormLayout, fieldCls, labelCls } from "@/components/admin/AdminFormLayout";
import { AdminSelect } from "@/components/admin/AdminSelect";
import { FileUpload } from "@/components/admin/FileUpload";
import { DOCUMENT_TYPES, LEVELS, SUBJECTS } from "@/lib/constants";

type Document = {
  id: string; title: string; description: string | null;
  fileUrl: string; type: string; level: string | null;
  subject: string | null; year: string | null;
};

interface Props { document?: Document }

const TYPE_OPTIONS = DOCUMENT_TYPES.map((t) => ({ value: t, label: t }));
const LEVEL_OPTIONS = [
  { value: "", label: "— Tous niveaux —" },
  ...LEVELS.map((l) => ({ value: l, label: l })),
];
const SUBJECT_OPTIONS = [
  { value: "", label: "— Toutes matières —" },
  ...SUBJECTS.map((s) => ({ value: s, label: s })),
];

export function DocumentForm({ document }: Props) {
  const router = useRouter();
  const isEdit = !!document;

  const [form, setForm] = useState({
    title: document?.title ?? "",
    description: document?.description ?? "",
    fileUrl: document?.fileUrl ?? "",
    type: document?.type ?? "Ressource pédagogique",
    level: document?.level ?? "",
    subject: document?.subject ?? "",
    year: document?.year ?? new Date().getFullYear().toString(),
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function set(key: string, value: string) { setForm((f) => ({ ...f, [key]: value })); }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setSaving(true); setError("");
    try {
      const url = isEdit ? `/api/admin/documents/${document.id}` : "/api/admin/documents";
      const res = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) { router.push("/admin/documents"); router.refresh(); }
      else { const d = await res.json(); setError(d.error ?? "Erreur."); }
    } catch { setError("Erreur réseau."); }
    finally { setSaving(false); }
  }

  return (
    <AdminFormLayout
      title={isEdit ? "Modifier le document" : "Nouveau document"}
      backHref="/admin/documents" backLabel="Documents">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className={labelCls}>Titre *</label>
          <input type="text" required value={form.title}
            onChange={(e) => set("title", e.target.value)}
            placeholder="Titre du document" className={fieldCls} />
        </div>
        <div>
          <label className={labelCls}>Description</label>
          <textarea rows={3} value={form.description}
            onChange={(e) => set("description", e.target.value)}
            placeholder="Description courte du document" className={fieldCls} />
        </div>
        <div>
          <FileUpload
            label="Fichier *"
            value={form.fileUrl}
            onChange={(url) => set("fileUrl", url)}
          />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={labelCls}>Type *</label>
            <AdminSelect value={form.type} onChange={(v) => set("type", v)} options={TYPE_OPTIONS} />
          </div>
          <div>
            <label className={labelCls}>Niveau</label>
            <AdminSelect value={form.level} onChange={(v) => set("level", v)} options={LEVEL_OPTIONS} />
          </div>
          <div>
            <label className={labelCls}>Matière</label>
            <AdminSelect value={form.subject} onChange={(v) => set("subject", v)} options={SUBJECT_OPTIONS} />
          </div>
          <div>
            <label className={labelCls}>Année</label>
            <input type="text" value={form.year}
              onChange={(e) => set("year", e.target.value)}
              placeholder="2024-2025" className={fieldCls} />
          </div>
        </div>

        {error && <p className="rounded-xl bg-red-500/15 px-3 py-2 text-xs text-red-300">{error}</p>}

        <div className="flex justify-end gap-3 border-t border-white/8 pt-5">
          <button type="button" onClick={() => router.push("/admin/documents")}
            className="rounded-lg px-4 py-2 text-sm font-semibold text-white/50 hover:text-white/80 transition-colors">
            Annuler
          </button>
          <button type="submit" disabled={saving}
            className="rounded-lg bg-lsy-gold-500 px-5 py-2 text-sm font-bold text-lsy-blue-950 transition-opacity hover:opacity-90 disabled:opacity-50">
            {saving ? "Enregistrement…" : isEdit ? "Enregistrer" : "Ajouter le document"}
          </button>
        </div>
      </form>
    </AdminFormLayout>
  );
}
