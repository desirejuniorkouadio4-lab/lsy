"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AdminFormLayout, fieldCls, labelCls } from "@/components/admin/AdminFormLayout";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { slugify } from "@/lib/slugify";

type Video = { id: string; title: string; slug: string; description: string | null; videoUrl: string; thumbnail: string | null; category: string | null };

interface Props { video?: Video }

export function VideoForm({ video }: Props) {
  const router = useRouter();
  const isEdit = !!video;

  const [form, setForm] = useState({
    title: video?.title ?? "",
    slug: video?.slug ?? "",
    description: video?.description ?? "",
    videoUrl: video?.videoUrl ?? "",
    thumbnail: video?.thumbnail ?? "",
    category: video?.category ?? "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function set(key: string, value: string) { setForm((f) => ({ ...f, [key]: value })); }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setSaving(true); setError("");
    try {
      const url = isEdit ? `/api/admin/videos/${video.id}` : "/api/admin/videos";
      const res = await fetch(url, { method: isEdit ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (res.ok) { router.push("/admin/videos"); router.refresh(); }
      else { const d = await res.json(); setError(d.error ?? "Erreur."); }
    } catch { setError("Erreur réseau."); }
    finally { setSaving(false); }
  }

  return (
    <AdminFormLayout title={isEdit ? "Modifier la vidéo" : "Nouvelle vidéo"} backHref="/admin/videos" backLabel="Vidéos">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className={labelCls}>Titre *</label>
          <input type="text" required value={form.title}
            onChange={(e) => { set("title", e.target.value); if (!isEdit) set("slug", slugify(e.target.value)); }}
            className={fieldCls} />
        </div>
        <div>
          <label className={labelCls}>URL de la vidéo * <span className="text-white/30">(YouTube, Vimeo, lien direct…)</span></label>
          <input type="text" required value={form.videoUrl} onChange={(e) => set("videoUrl", e.target.value)}
            placeholder="https://youtube.com/watch?v=..." className={fieldCls} />
        </div>
        <div>
          <label className={labelCls}>Description</label>
          <textarea rows={3} value={form.description} onChange={(e) => set("description", e.target.value)} className={fieldCls} />
        </div>
        <div>
          <label className={labelCls}>Catégorie</label>
          <input type="text" value={form.category} onChange={(e) => set("category", e.target.value)}
            placeholder="Cérémonie, Reportage, Témoignage…" className={fieldCls} />
        </div>
        <ImageUpload label="Vignette (thumbnail)" value={form.thumbnail} onChange={(url) => set("thumbnail", url)} />

        {error && <p className="rounded-xl bg-red-500/15 px-3 py-2 text-xs text-red-300">{error}</p>}

        <div className="flex justify-end gap-3 border-t border-white/8 pt-5">
          <button type="button" onClick={() => router.push("/admin/videos")}
            className="rounded-lg px-4 py-2 text-sm font-semibold text-white/50 hover:text-white/80 transition-colors">Annuler</button>
          <button type="submit" disabled={saving}
            className="rounded-lg bg-lsy-gold-500 px-5 py-2 text-sm font-bold text-lsy-blue-950 transition-opacity hover:opacity-90 disabled:opacity-50">
            {saving ? "Enregistrement…" : isEdit ? "Enregistrer" : "Ajouter"}
          </button>
        </div>
      </form>
    </AdminFormLayout>
  );
}
