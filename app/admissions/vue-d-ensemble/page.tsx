import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays, FileText, GraduationCap, HelpCircle } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { CTASection } from "@/components/sections/CTASection";
import { Reveal } from "@/components/animations/Reveal";
import { Stagger, StaggerItem } from "@/components/animations/Stagger";

export const metadata: Metadata = {
  title: "Admissions — Vue d'ensemble",
  description: "Tout ce qu'il faut savoir pour candidater au Lycée Scientifique de Yamoussoukro.",
};

const VOIES = [
  {
    level: "Entrée en 4e",
    description: "Pour les élèves scolarisés en 5e à fort potentiel scientifique.",
    href: "/admissions/entree-en-4e",
    color: "bg-lsy-blue-900",
    dark: true,
  },
  {
    level: "Entrée en seconde",
    description: "Pour les titulaires du BEPC avec un excellent niveau scientifique.",
    href: "/admissions/entree-en-seconde",
    color: "bg-lsy-gold-500",
    dark: false,
  },
];

const LINKS = [
  { label: "Entrée en 4e", icon: GraduationCap, href: "/admissions/entree-en-4e" },
  { label: "Entrée en seconde", icon: GraduationCap, href: "/admissions/entree-en-seconde" },
  { label: "Calendrier des admissions", icon: CalendarDays, href: "/admissions/calendrier" },
  { label: "Documents à fournir", icon: FileText, href: "/admissions/documents" },
  { label: "FAQ admissions", icon: HelpCircle, href: "/admissions/faq" },
];

export default function AdmissionsOverviewPage() {
  return (
    <PageShell flush>
      <PageHero
        eyebrow="Admissions"
        title="Rejoindre le LSY"
        body="Le Lycée Scientifique de Yamoussoukro sélectionne les meilleurs profils scientifiques à deux niveaux. Une procédure rigoureuse pour une formation d'excellence."
        breadcrumbs={[{ label: "Admissions" }, { label: "Vue d'ensemble" }]}
        pattern="orbit"
      />

      {/* Les deux voies */}
      <section className="bg-lsy-paper py-20 lg:py-28">
        <Container className="space-y-12">
          <Reveal>
            <SectionHeader
              eyebrow="Deux voies d'entrée"
              title="Comment intégrer le LSY ?"
              body="L'admission au LSY se fait par concours et dossier, à deux niveaux distincts. Les critères sont fondés sur l'excellence académique en sciences."
            />
          </Reveal>

          <Stagger className="grid gap-6 sm:grid-cols-2" stagger={0.1}>
            {VOIES.map((voie) => (
              <StaggerItem key={voie.level}>
                <Link
                  href={voie.href}
                  className={`group flex h-full flex-col justify-between rounded-3xl p-8 transition-all hover:shadow-card ${voie.color} ${voie.dark ? "text-white" : "text-lsy-blue-950"}`}
                >
                  <div className="space-y-3">
                    <GraduationCap
                      className={`size-8 ${voie.dark ? "text-lsy-gold-400" : "text-lsy-blue-900"}`}
                      aria-hidden
                    />
                    <h2 className="font-display text-3xl font-bold">{voie.level}</h2>
                    <p className={voie.dark ? "text-white/70" : "text-lsy-blue-900/70"}>
                      {voie.description}
                    </p>
                  </div>
                  <p
                    className={`mt-6 inline-flex items-center gap-2 text-sm font-bold transition-colors ${voie.dark ? "text-lsy-gold-300 hover:text-lsy-gold-200" : "text-lsy-blue-900 hover:text-lsy-blue-700"}`}
                  >
                    Découvrir la procédure
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                  </p>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>

          {/* Liens rapides */}
          <Reveal delay={0.2}>
            <div className="rounded-3xl border border-lsy-line bg-lsy-ivory p-6">
              <p className="mb-4 text-[0.72rem] font-bold uppercase tracking-[0.18em] text-lsy-muted">
                Ressources utiles
              </p>
              <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {LINKS.map((l) => {
                  const Icon = l.icon;
                  return (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-lsy-blue-900 transition-colors hover:bg-white"
                      >
                        <Icon className="size-4 shrink-0 text-lsy-gold-600" aria-hidden />
                        {l.label}
                        <ArrowRight className="ml-auto size-3.5 text-lsy-muted opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" aria-hidden />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>
        </Container>
      </section>

      <CTASection
        eyebrow="Une question ?"
        title="Besoin d'informations complémentaires ?"
        body="Notre FAQ répond aux questions les plus fréquentes sur les admissions au LSY."
        buttons={[
          { label: "Consulter la FAQ", href: "/admissions/faq", primary: true },
          { label: "Nous contacter", href: "/contact" },
        ]}
      />
    </PageShell>
  );
}
