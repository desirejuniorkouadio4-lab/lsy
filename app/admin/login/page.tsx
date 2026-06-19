"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { LogoLSY } from "@/components/brand/LogoLSY";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export default function AdminLoginPage() {
  const router = useRouter();
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
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error ?? "Identifiants incorrects.");
      }
    } catch {
      setError("Erreur de connexion. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  }

  const fieldClass = cn(
    "w-full rounded-xl border border-white/10 bg-white/8 px-4 py-2.5 text-sm text-white placeholder:text-white/40",
    "outline-none focus:border-lsy-gold-400/60 focus:ring-2 focus:ring-lsy-gold-400/20 transition",
  );

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-lsy-blue-950 px-4">
      <div className="w-full max-w-sm space-y-8">
        {/* Logo */}
        <div className="flex justify-center">
          <LogoLSY variant="onDark" size="md" href={null} />
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur-sm">
          <p className="mb-6 text-center text-lg font-bold text-white">
            Accès administration
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-xs font-semibold text-white/60">
                Adresse email
              </label>
              <input
                type="email"
                required
                autoComplete="email"
                placeholder="admin@lsy.ci"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={fieldClass}
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-white/60">
                Mot de passe
              </label>
              <div className="relative">
                <input
                  type={showPwd ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={cn(fieldClass, "pr-10")}
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                  aria-label={showPwd ? "Masquer" : "Afficher"}
                >
                  {showPwd ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            {error && (
              <p className="rounded-xl bg-red-500/15 px-3 py-2 text-xs text-red-300">{error}</p>
            )}

            <Button
              type="submit"
              variant="primary"
              disabled={loading}
              className="w-full"
            >
              {loading ? (
                "Connexion en cours…"
              ) : (
                <>
                  <LogIn className="mr-2 size-4" aria-hidden />
                  Se connecter
                </>
              )}
            </Button>
          </form>
        </div>

        <p className="text-center text-xs text-white/30">
          Lycée Scientifique de Yamoussoukro — Administration
        </p>
      </div>
    </div>
  );
}
