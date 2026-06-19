import { Suspense } from "react";
import { LogoLSY } from "@/components/brand/LogoLSY";
import { ConnexionForm } from "./ConnexionForm";

export default function PortailConnexionPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-lsy-blue-950 px-4">
      <div className="w-full max-w-sm space-y-8">
        <div className="flex justify-center">
          <LogoLSY variant="onDark" size="md" href="/portail" />
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur-sm">
          <Suspense fallback={<p className="text-center text-sm text-white/40">Chargement…</p>}>
            <ConnexionForm />
          </Suspense>
        </div>

        <p className="text-center text-xs text-white/25">
          <a href="/portail" className="hover:text-white/50 transition-colors">← Retour au portail</a>
          <span className="mx-3">·</span>
          <a href="/contact" className="hover:text-white/50 transition-colors">Demander un accès</a>
        </p>
      </div>
    </div>
  );
}
