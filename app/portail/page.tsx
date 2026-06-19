import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, GraduationCap, Presentation, ShieldCheck, Users } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { Reveal } from "@/components/animations/Reveal";
import { Stagger, StaggerItem } from "@/components/animations/Stagger";

export const metadata: Metadata = {
  title: "Portail LSY",
  description: "Le portail numérique du Lycée Scientifique de Yamoussoukro : espace élève, parent, enseignant et administration.",
};

const ESPACES = [
  {
    label: "Espace élève",
    desc: "Emploi du temps, ressources pédagogiques et notifications.",
    href: "/portail/eleve",
    Icon: GraduationCap,
    color: "bg-lsy-blue-900",
    available: false,
  },
  {
    label: "Espace parent",
    desc: "Communiqués, documents et suivi de scolarité.",
    href: "/portail/parent",
    Icon: Users,
    color: "bg-lsy-blue-700",
    available: false,
  },
  {
    label: "Espace enseignant",
    desc: "Dépôt de ressources, notes et communiqués internes.",
    href: "/portail/enseignant",
    Icon: Presentation,
    color: "bg-lsy-gold-600",
    available: false,
  },
  {
    label: "Administration",
    desc: "Gestion des contenus, utilisateurs et du site.",
    href: "/admin",
    Icon: ShieldCheck,
    color: "bg-lsy-blue-950",
    available: true,
  },
];

export default function PortailPage() {
  return (
    <PageShell flush>
      <PageHero
        eyebrow="Portail"
        title="Portail LSY"
        body="Une plateforme numérique sécurisée pour toute la communauté scolaire du Lycée Scientifique de Yamoussoukro."
        breadcrumbs={[{ label: "Portail" }]}
        pattern="constellation"
      />

      <section className="bg-lsy-paper py-20 lg:py-28">
        <Container className="space-y-12">
          <Reveal>
            <SectionHeader
              eyebrow="Accès sécurisé"
              title="Choisissez votre espace"
              body="Le portail LSY offre des espaces numériques dédiés à chaque membre de la communauté scolaire. Certains espaces sont en cours de déploiement."
              align="center"
            />
          </Reveal>

          <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
            {ESPACES.map((espace) => {
              const Icon = espace.Icon;
              const innerContent = (
                <>
                  <Icon className="mb-4 size-8 opacity-80" aria-hidden />
                  <p className="font-bold">{espace.label}</p>
                  <p className="mt-1 flex-1 text-sm text-white/65">{espace.desc}</p>
                  {espace.available ? (
                    <p className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-lsy-gold-300">
                      Accéder
                      <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
                    </p>
                  ) : (
                    <span className="mt-5 inline-block rounded-full bg-white/15 px-2.5 py-0.5 text-[0.62rem] font-bold">
                      En préparation
                    </span>
                  )}
                </>
              );
              const sharedClass = `group flex h-full flex-col rounded-3xl p-6 text-white transition-all ${espace.color} ${espace.available ? "cursor-pointer hover:opacity-90 hover:shadow-gold" : "cursor-default"}`;
              return (
                <StaggerItem key={espace.label}>
                  {espace.available ? (
                    <Link href={espace.href} className={sharedClass}>{innerContent}</Link>
                  ) : (
                    <div className={sharedClass}>{innerContent}</div>
                  )}
                </StaggerItem>
              );
            })}
          </Stagger>
        </Container>
      </section>
    </PageShell>
  );
}
