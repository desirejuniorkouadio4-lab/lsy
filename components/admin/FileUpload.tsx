"use client";

import { useRef, useState } from "react";
import { FileText, Upload, X, ExternalLink } from "lucide-react";

interface Props {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  accept?: string;
}

function basename(url: string): string {
  try {
    const u = new URL(url);
    const parts = u.pathname.split("/");
    return decodeURIComponent(parts[parts.length - 1] ?? url);
  } catch {
    return url.split("/").pop() ?? url;
  }
}

export function FileUpload({
  value,
  onChange,
  label,
  accept = ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip,.txt,.csv",
}: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
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
        /* Fichier déjà uploadé */
        <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
          <FileText className="size-5 shrink-0 text-lsy-gold-400" aria-hidden />
          <span className="min-w-0 flex-1 truncate text-sm text-white/80">
            {basename(value)}
          </span>
          <a
            href={value}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 text-white/30 hover:text-white/60 transition-colors"
            aria-label="Ouvrir le fichier"
          >
            <ExternalLink className="size-4" aria-hidden />
          </a>
          <button
            type="button"
            onClick={() => onChange("")}
            className="shrink-0 text-white/30 hover:text-red-400 transition-colors"
            aria-label="Supprimer le fichier"
          >
            <X className="size-4" aria-hidden />
          </button>
        </div>
      ) : (
        /* Zone d'upload */
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-white/15 py-7 text-sm text-white/40 transition-colors hover:border-lsy-gold-400/40 hover:text-white/60 disabled:opacity-50"
        >
          <Upload className="size-5" aria-hidden />
          {uploading ? "Upload en cours…" : "Cliquer pour importer un fichier"}
          <span className="text-xs text-white/20">
            PDF, Word, Excel, PowerPoint, ZIP — max 50 Mo
          </span>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />

      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
