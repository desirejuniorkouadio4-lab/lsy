import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2, HandHeart, Users } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { CTASection } from "@/components/sections/CTASection";
import { Reveal } from "@/components/animations/Reveal";
import { Stagger, StaggerItem } from "@/components/animations/Stagger";

export const metadata: Metadata = {
  title: "Soutenir le LSY",
  description: "Comment soutenir le Lycée Scientifique de Yamoussoukro : dons, partenariats et engagement alumni.",
};

const FORMES = [
  {
    Icon: HandHeart,
    titre: "Don individuel",
    desc: "Particuliers et anciens élèves : contribuez à l'achat d'équipements pédagogiques, de bourses ou à la réhabilitation des infrastructures.",
    cta: "Nous contacter",
    href: "/contact",
  },
  {
    Icon: Building2,
    titre: "Partenariat institutionnel",
    desc: "Entreprises, ONG et institutions : devenez partenaire officiel du LSY et engagez-vous en faveur de l'excellence scientifique ivoirienne.",
    cta: "Proposer un partenariat",
    href: "/contact",
  },
  {
    Icon: Users,
    titre: "Engagement alumni",
    desc: "Anciens élèves : offrez votre temps comme mentor, parrainez un projet scientifique ou témoignez auprès des élèves actuels.",
    cta: "Rejoindre le réseau alumni",
    href: "/excellence-alumni/anciens-eleves",
  },
];

const BESOINS = [
  "Équipements pour les laboratoires scientifiques (physique, chimie, SVT)",
  "Postes informatiques et matériel numérique",
  "Livres et manuels pédagogiques pour la bibliothèque",
  "Bourses pour les élèves les plus méritants en situation difficile",
  "Soutien au programme de recherche scientifique junior",
  "Financement de compétitions et déplacements pour les olympiades",
];

export default function SoutenirPage() {
  return (
    <PageShell flush>
      <PageHero
        eyebrow="Soutenir"
        title="Soutenir le LSY"
        body="Particuliers, entreprises, institutions et anciens élèves — chacun peut contribuer à l'excellence du Lycée Scientifique de Yamoussoukro."
        breadcrumbs={[{ label: "Soutenir" }]}
        pattern="wave"
      />

      <section className="bg-lsy-paper py-20 lg:py-28">
        <Container className="space-y-16">
          {/* Formes de soutien */}
          <div className="space-y-8">
            <Reveal>
              <SectionHeader
                eyebrow="Formes de soutien"
                title="Comment contribuer ?"
                body="Il existe plusieurs façons de soutenir le développement du LSY et d'accompagner la formation de la prochaine génération de scientifiques ivoiriens."
              />
            </Reveal>
            <Stagger className="grid gap-5 lg:grid-cols-3" stagger={0.09}>
              {FORMES.map((forme) => {
                const Icon = forme.Icon;
                return (
                  <StaggerItem key={forme.titre}>
                    <div className="flex h-full flex-col rounded-3xl bg-white p-6 shadow-soft ring-1 ring-lsy-line">
                      <Icon className="mb-4 size-8 text-lsy-gold-600" aria-hidden />
                      <p className="mb-2 font-bold text-lsy-blue-900">{forme.titre}</p>
                      <p className="flex-1 text-sm leading-relaxed text-lsy-muted">{forme.desc}</p>
                      <Link
                        href={forme.href}
                        className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-lsy-blue-700 hover:text-lsy-blue-900 transition-colors"
                      >
                        {forme.cta}
                        <ArrowRight className="size-4" aria-hidden />
                      </Link>
                    </div>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>

          {/* Besoins prioritaires */}
          <Reveal>
            <div className="rounded-3xl bg-lsy-blue-950 p-8 text-white">
              <p className="mb-5 text-[0.72rem] font-bold uppercase tracking-[0.18em] text-lsy-gold-300">
                Besoins prioritaires
              </p>
              <p className="mb-5 text-sm leading-relaxed text-white/70">
                Dans le cadre de la réhabilitation en cours, voici les principaux besoins identifiés
                par l&apos;administration du LSY :
              </p>
              <ul className="grid gap-2 sm:grid-cols-2">
                {BESOINS.map((besoin) => (
                  <li key={besoin} className="flex items-start gap-2.5 text-sm text-white/75">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-lsy-gold-400" />
                    {besoin}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </Container>
      </section>

      <CTASection
        eyebrow="Contact"
        title="Prendre contact avec l'équipe LSY"
        body="Pour tout projet de soutien ou de partenariat, contactez directement la direction du lycée."
        buttons={[
          { label: "Nous contacter", href: "/contact", primary: true },
          { label: "Réhabilitation", href: "/le-lycee/rehabilitation" },
        ]}
      />
    </PageShell>
  );
}
