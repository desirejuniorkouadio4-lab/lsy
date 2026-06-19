import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { CTASection } from "@/components/sections/CTASection";
import { Reveal } from "@/components/animations/Reveal";
import { requiredDocs4e, requiredDocs2nd } from "@/data/admissions";

export const metadata: Metadata = {
  title: "Documents à fournir",
  description: "Liste des documents requis pour candidater au Lycée Scientifique de Yamoussoukro.",
};

export default function DocumentsAdmissionsPage() {
  return (
    <PageShell flush>
      <PageHero
        eyebrow="Admissions"
        title="Documents à fournir"
        body="Pour chaque voie d'entrée, voici la liste précise des documents constitutifs du dossier de candidature."
        breadcrumbs={[
          { label: "Admissions", href: "/admissions/vue-d-ensemble" },
          { label: "Documents" },
        ]}
        pattern="constellation"
      />

      <section className="bg-lsy-paper py-20 lg:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            {/* 4e */}
            <Reveal>
              <div className="space-y-5">
                <SectionHeader
                  eyebrow="Entrée en 4e"
                  title="Dossier pour la 4e"
                />
                <ul className="space-y-2.5">
                  {requiredDocs4e.map((doc) => (
                    <li key={doc.name} className="flex items-start gap-3 rounded-xl border border-lsy-line bg-white p-3.5">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-lsy-success" aria-hidden />
                      <span className="text-sm text-lsy-slate">{doc.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Seconde */}
            <Reveal delay={0.1}>
              <div className="space-y-5">
                <SectionHeader
                  eyebrow="Entrée en seconde"
                  title="Dossier pour la seconde"
                />
                <ul className="space-y-2.5">
                  {requiredDocs2nd.map((doc) => (
                    <li key={doc.name} className="flex items-start gap-3 rounded-xl border border-lsy-line bg-white p-3.5">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-lsy-success" aria-hidden />
                      <span className="text-sm text-lsy-slate">{doc.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <div className="mt-10 rounded-3xl border border-lsy-blue-900/10 bg-lsy-blue-900/3 p-6">
              <p className="text-sm font-semibold text-lsy-blue-900 mb-1">Remarques importantes</p>
              <ul className="space-y-1.5 text-sm text-lsy-slate">
                <li>• Tous les documents doivent être des originaux ou des copies certifiées conformes.</li>
                <li>• Les dossiers incomplets ne seront pas traités.</li>
                <li>• Les délais de dépôt sont fixés par la DELC et doivent être strictement respectés.</li>
              </ul>
            </div>
          </Reveal>
        </Container>
      </section>

      <CTASection
        eyebrow="Prochaine étape"
        title="Prêt à constituer votre dossier ?"
        buttons={[
          { label: "Procédure entrée en 4e", href: "/admissions/entree-en-4e", primary: true },
          { label: "Procédure entrée en seconde", href: "/admissions/entree-en-seconde" },
        ]}
      />
    </PageShell>
  );
}
