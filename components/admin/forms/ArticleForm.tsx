"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AdminFormLayout, fieldCls, labelCls } from "@/components/admin/AdminFormLayout";
import { slugify } from "@/lib/slugify";

type Category = { id: string; name: string };
type Article = {
  id: string; title: string; slug: string; excerpt: string;
  content: string; coverImage: string | null; categoryId: string | null;
  status: string; featured: boolean; publishedAt: Date | null;
};

interface Props {
  article?: Article;
  categories: Category[];
}

export function ArticleForm({ article, categories }: Props) {
  const router = useRouter();
  const isEdit = !!article;

  const [form, setForm] = useState({
    title: article?.title ?? "",
    slug: article?.slug ?? "",
    excerpt: article?.excerpt ?? "",
    content: article?.content ?? "",
    coverImage: article?.coverImage ?? "",
    categoryId: article?.categoryId ?? "",
    status: article?.status ?? "DRAFT",
    featured: article?.featured ?? false,
    publishedAt: article?.publishedAt
      ? new Date(article.publishedAt).toISOString().slice(0, 16)
      : "",
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const title = e.target.value;
    setForm((f) => ({
      ...f,
      title,
      slug: isEdit ? f.slug : slugify(title),
    }));
  }

  function set(key: string, value: string | boolean) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const url = isEdit
        ? `/api/admin/articles/${article.id}`
        : "/api/admin/articles";
      const res = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        router.push("/admin/articles");
        router.refresh();
      } else {
        const d = await res.json();
        setError(d.error ?? "Erreur lors de l'enregistrement.");
      }
    } catch {
      setError("Erreur réseau.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <AdminFormLayout
      title={isEdit ? "Modifier l'article" : "Nouvel article"}
      backHref="/admin/articles"
      backLabel="Articles"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={labelCls}>Titre *</label>
            <input type="text" required value={form.title}
              onChange={handleTitleChange}
              placeholder="Titre de l'article" className={fieldCls} />
          </div>

          <div className="sm:col-span-2">
            <label className={labelCls}>Slug (URL)</label>
            <input type="text" value={form.slug}
              onChange={(e) => set("slug", e.target.value)}
              placeholder="slug-de-larticle" className={fieldCls} />
          </div>

          <div className="sm:col-span-2">
            <label className={labelCls}>Résumé *</label>
            <textarea required rows={3} value={form.excerpt}
              onChange={(e) => set("excerpt", e.target.value)}
              placeholder="Court résumé visible dans les listes d'articles"
              className={fieldCls} />
          </div>

          <div className="sm:col-span-2">
            <label className={labelCls}>Contenu HTML *</label>
            <textarea required rows={12} value={form.content}
              onChange={(e) => set("content", e.target.value)}
              placeholder="<p>Contenu de l'article en HTML...</p>"
              className={`${fieldCls} font-mono text-xs`} />
          </div>

          <div>
            <label className={labelCls}>Catégorie</label>
            <select value={form.categoryId}
              onChange={(e) => set("categoryId", e.target.value)}
              className={fieldCls}>
              <option value="">— Aucune catégorie —</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelCls}>Statut</label>
            <select value={form.status}
              onChange={(e) => set("status", e.target.value)}
              className={fieldCls}>
              <option value="DRAFT">Brouillon</option>
              <option value="PUBLISHED">Publié</option>
              <option value="ARCHIVED">Archivé</option>
            </select>
          </div>

          <div>
            <label className={labelCls}>Image de couverture (URL)</label>
            <input type="text" value={form.coverImage}
              onChange={(e) => set("coverImage", e.target.value)}
              placeholder="https://..." className={fieldCls} />
          </div>

          <div>
            <label className={labelCls}>Date de publication</label>
            <input type="datetime-local" value={form.publishedAt}
              onChange={(e) => set("publishedAt", e.target.value)}
              className={fieldCls} />
          </div>
        </div>

        <label className="flex cursor-pointer items-center gap-2.5">
          <input type="checkbox" checked={form.featured}
            onChange={(e) => set("featured", e.target.checked)}
            className="size-4 accent-lsy-gold-500" />
          <span className="text-sm text-white/70">Mettre à la une</span>
        </label>

        {error && (
          <p className="rounded-xl bg-red-500/15 px-3 py-2 text-xs text-red-300">{error}</p>
        )}

        <div className="flex justify-end gap-3 border-t border-white/8 pt-5">
          <button type="button" onClick={() => router.push("/admin/articles")}
            className="rounded-lg px-4 py-2 text-sm font-semibold text-white/50 hover:text-white/80 transition-colors">
            Annuler
          </button>
          <button type="submit" disabled={saving}
            className="rounded-lg bg-lsy-gold-500 px-5 py-2 text-sm font-bold text-lsy-blue-950 transition-opacity hover:opacity-90 disabled:opacity-50">
            {saving ? "Enregistrement…" : isEdit ? "Enregistrer" : "Créer l'article"}
          </button>
        </div>
      </form>
    </AdminFormLayout>
  );
}
