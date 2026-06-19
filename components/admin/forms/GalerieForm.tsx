"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { AdminFormLayout, fieldCls, labelCls } from "@/components/admin/AdminFormLayout";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { slugify } from "@/lib/slugify";

type Photo = { id: string; imageUrl: string; caption: string | null; sortOrder: number };
type Album = { id: string; title: string; slug: string; description: string | null; coverImage: string | null; year: string | null; photos: Photo[] };

interface Props { album?: Album }

export function GalerieForm({ album }: Props) {
  const router = useRouter();
  const isEdit = !!album;

  const [form, setForm] = useState({
    title: album?.title ?? "",
    slug: album?.slug ?? "",
    description: album?.description ?? "",
    coverImage: album?.coverImage ?? "",
    year: album?.year ?? new Date().getFullYear().toString(),
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Upload nouvelle photo
  const [newPhoto, setNewPhoto] = useState("");
  const [newCaption, setNewCaption] = useState("");
  const [addingPhoto, setAddingPhoto] = useState(false);

  function set(key: string, value: string) { setForm((f) => ({ ...f, [key]: value })); }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setSaving(true); setError("");
    try {
      const url = isEdit ? `/api/admin/galerie/${album.id}` : "/api/admin/galerie";
      const res = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) { router.push("/admin/galerie"); router.refresh(); }
      else { const d = await res.json(); setError(d.error ?? "Erreur."); }
    } catch { setError("Erreur réseau."); }
    finally { setSaving(false); }
  }

  async function addPhoto() {
    if (!newPhoto || !album) return;
    setAddingPhoto(true);
    await fetch(`/api/admin/galerie/${album.id}/photos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageUrl: newPhoto, caption: newCaption }),
    });
    setNewPhoto(""); setNewCaption("");
    router.refresh();
    setAddingPhoto(false);
  }

  async function deletePhoto(photoId: string) {
    if (!album) return;
    await fetch(`/api/admin/galerie/${album.id}/photos/${photoId}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <AdminFormLayout
      title={isEdit ? "Modifier l'album" : "Nouvel album"}
      backHref="/admin/galerie" backLabel="Galerie">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className={labelCls}>Titre *</label>
          <input type="text" required value={form.title}
            onChange={(e) => { set("title", e.target.value); if (!isEdit) set("slug", slugify(e.target.value)); }}
            className={fieldCls} />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={labelCls}>Année</label>
            <input type="text" value={form.year} onChange={(e) => set("year", e.target.value)} className={fieldCls} />
          </div>
          <div>
            <label className={labelCls}>Slug</label>
            <input type="text" value={form.slug} onChange={(e) => set("slug", e.target.value)} className={fieldCls} />
          </div>
        </div>
        <div>
          <label className={labelCls}>Description</label>
          <textarea rows={3} value={form.description} onChange={(e) => set("description", e.target.value)} className={fieldCls} />
        </div>
        <ImageUpload label="Image de couverture" value={form.coverImage} onChange={(url) => set("coverImage", url)} />

        {error && <p className="rounded-xl bg-red-500/15 px-3 py-2 text-xs text-red-300">{error}</p>}

        <div className="flex justify-end gap-3 border-t border-white/8 pt-5">
          <button type="button" onClick={() => router.push("/admin/galerie")}
            className="rounded-lg px-4 py-2 text-sm font-semibold text-white/50 hover:text-white/80 transition-colors">Annuler</button>
          <button type="submit" disabled={saving}
            className="rounded-lg bg-lsy-gold-500 px-5 py-2 text-sm font-bold text-lsy-blue-950 transition-opacity hover:opacity-90 disabled:opacity-50">
            {saving ? "Enregistrement…" : isEdit ? "Enregistrer" : "Créer l'album"}
          </button>
        </div>
      </form>

      {/* Section photos (seulement en mode édition) */}
      {isEdit && (
        <div className="mt-8 border-t border-white/8 pt-6 space-y-4">
          <p className="text-sm font-bold text-lsy-gold-400 uppercase tracking-widest">Photos de l&apos;album</p>

          {/* Grille des photos existantes */}
          {album.photos.length > 0 && (
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
              {album.photos.map((photo) => (
                <div key={photo.id} className="group relative aspect-square overflow-hidden rounded-xl">
                  <Image src={photo.imageUrl} alt={photo.caption ?? ""} fill className="object-cover" sizes="150px" />
                  <button onClick={() => deletePhoto(photo.id)}
                    className="absolute right-1 top-1 flex size-6 items-center justify-center rounded-full bg-red-600/80 text-white opacity-0 transition-opacity group-hover:opacity-100">
                    <Trash2 className="size-3" aria-hidden />
                  </button>
                  {photo.caption && (
                    <div className="absolute inset-x-0 bottom-0 bg-black/50 px-2 py-1 text-[0.6rem] text-white truncate">
                      {photo.caption}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Ajout d'une nouvelle photo */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-3">
            <p className="text-xs font-semibold text-white/60">Ajouter une photo</p>
            <ImageUpload label="" value={newPhoto} onChange={setNewPhoto} />
            {newPhoto && (
              <>
                <input type="text" value={newCaption} onChange={(e) => setNewCaption(e.target.value)}
                  placeholder="Légende (optionnel)" className={fieldCls} />
                <button type="button" onClick={addPhoto} disabled={addingPhoto || !newPhoto}
                  className="rounded-lg bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/15 disabled:opacity-50 transition-colors">
                  {addingPhoto ? "Ajout…" : "Ajouter la photo"}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </AdminFormLayout>
  );
}
