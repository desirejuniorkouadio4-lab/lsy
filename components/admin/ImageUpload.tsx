"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Upload, X, Link as LinkIcon } from "lucide-react";

interface Props {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export function ImageUpload({ value, onChange, label }: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [showUrl, setShowUrl] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const fieldCls =
    "w-full rounded-xl border border-white/10 bg-white/8 px-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-lsy-gold-400/60 focus:ring-2 focus:ring-lsy-gold-400/20 transition";

  async function handleFile(file: File) {
    setUploading(true);
    setError("");
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: form });
      if (res.ok) {
        const { url } = await res.json();
        onChange(url);
      } else {
        setError("Erreur lors de l'upload.");
      }
    } catch {
      setError("Erreur réseau.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-2">
      {label && (
        <p className="mb-1.5 text-xs font-semibold text-white/60">{label}</p>
      )}

      {value ? (
        <div className="relative inline-block">
          <div className="relative h-40 w-full overflow-hidden rounded-xl border border-white/10">
            <Image
              src={value}
              alt="Aperçu"
              fill
              className="object-cover"
              sizes="640px"
            />
          </div>
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute right-2 top-2 flex size-7 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80"
            aria-label="Supprimer l'image"
          >
            <X className="size-4" aria-hidden />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-white/15 py-8 text-sm text-white/40 transition-colors hover:border-lsy-gold-400/40 hover:text-white/60 disabled:opacity-50"
        >
          <Upload className="size-5" aria-hidden />
          {uploading ? "Import en cours…" : "Cliquer pour importer une image"}
          <span className="text-xs text-white/25">PNG, JPG, WEBP — max 4.5 Mo</span>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />

      {/* Fallback URL */}
      <button
        type="button"
        onClick={() => setShowUrl((v) => !v)}
        className="flex items-center gap-1.5 text-xs text-white/30 hover:text-white/50 transition-colors"
      >
        <LinkIcon className="size-3" aria-hidden />
        {showUrl ? "Masquer le champ URL" : "Ou coller une URL d'image"}
      </button>

      {showUrl && (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://..."
          className={fieldCls}
        />
      )}

      {error && (
        <p className="text-xs text-red-400">{error}</p>
      )}
    </div>
  );
}
