"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { cn } from "@/lib/utils";

const SPACE_LABELS: Record<string, string> = {
  "/portail/eleve": "Espace élève",
  "/portail/parent": "Espace parent",
  "/portail/enseignant": "Espace enseignant",
};

const fieldCls = "w-full rounded-xl border border-white/10 bg-white/8 px-4 py-2.5 text-sm text-white placeholder:text-white/40 outline-none focus:border-lsy-gold-400/60 focus:ring-2 focus:ring-lsy-gold-400/20 transition";

export function ConnexionForm() {
  const router = useRouter();
  const params = useSearchParams();
  const from = params.get("from") ?? "/portail";
  const spaceLabel = SPACE_LABELS[from] ?? "Portail LSY";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/portail/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        const data = await res.json();
        router.push(data.redirectTo ?? from);
        router.refresh();
      } else {
        const d = await res.json();
        setError(d.error ?? "Identifiants incorrects.");
      }
    } catch {
      setError("Erreur de connexion. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <p className="mb-1 text-center text-lg font-bold text-white">{spaceLabel}</p>
      <p className="mb-6 text-center text-xs text-white/40">
        Connectez-vous avec vos identifiants LSY
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-xs font-semibold text-white/60">Email</label>
          <input type="email" required autoComplete="email" placeholder="votre@email.ci"
            value={email} onChange={(e) => setEmail(e.target.value)} className={fieldCls} />
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold text-white/60">Mot de passe</label>
          <div className="relative">
            <input type={showPwd ? "text" : "password"} required autoComplete="current-password"
              placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)}
              className={cn(fieldCls, "pr-10")} />
            <button type="button" onClick={() => setShowPwd((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors">
              {showPwd ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
        </div>

        {error && (
          <p className="rounded-xl bg-red-500/15 px-3 py-2 text-xs text-red-300">{error}</p>
        )}

        <button type="submit" disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-lsy-gold-500 py-2.5 text-sm font-bold text-lsy-blue-950 transition-opacity hover:opacity-90 disabled:opacity-50">
          {loading ? "Connexion…" : <><LogIn className="size-4" aria-hidden />Se connecter</>}
        </button>
      </form>
    </>
  );
}
