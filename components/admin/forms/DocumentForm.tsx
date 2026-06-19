"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AdminFormLayout, fieldCls, labelCls } from "@/components/admin/AdminFormLayout";
import { DOCUMENT_TYPES, LEVELS, SUBJECTS } from "@/lib/constants";

type Document = {
  id: string; title: string; description: string | null;
  fileUrl: string; type: string; level: string | null;
  subject: string | null; year: string | null;
};

interface Props { document?: Document }

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
          <label className={labelCls}>URL du fichier *</label>
          <input type="text" required value={form.fileUrl}
            onChange={(e) => set("fileUrl", e.target.value)}
            placeholder="https://drive.google.com/... ou /uploads/fichier.pdf"
            className={fieldCls} />
          <p className="mt-1 text-xs text-white/30">Lien Google Drive, Dropbox, ou chemin relatif</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={labelCls}>Type *</label>
            <select value={form.type} onChange={(e) => set("type", e.target.value)} className={fieldCls}>
              {DOCUMENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className={labelCls}>Niveau</label>
            <select value={form.level} onChange={(e) => set("level", e.target.value)} className={fieldCls}>
              <option value="">— Tous niveaux —</option>
              {LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
          <div>
            <label className={labelCls}>Matière</label>
            <select value={form.subject} onChange={(e) => set("subject", e.target.value)} className={fieldCls}>
              <option value="">— Toutes matières —</option>
              {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
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
