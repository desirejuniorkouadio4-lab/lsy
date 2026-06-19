import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { PersonCard } from "@/components/sections/PersonCard";
import { CTASection } from "@/components/sections/CTASection";
import { Reveal } from "@/components/animations/Reveal";
import { Stagger, StaggerItem } from "@/components/animations/Stagger";

export const metadata: Metadata = {
  title: "Administration",
  description: "L'équipe administrative et de direction du Lycée Scientifique de Yamoussoukro.",
};

const ADMIN = [
  { name: "Direction du Lycée", role: "Proviseur", bio: "À confirmer par l'administration." },
  { name: "Direction des Études", role: "Censeur chargé des études", bio: "À confirmer par l'administration." },
  { name: "Vie Scolaire", role: "Censeur chargé de la vie scolaire", bio: "À confirmer par l'administration." },
  { name: "Intendance", role: "Intendant(e)", bio: "À confirmer par l'administration." },
  { name: "Secrétariat Principal", role: "Secrétaire principal(e)", bio: "À confirmer par l'administration." },
  { name: "Infirmerie", role: "Infirmier(ère) chef", bio: "À confirmer par l'administration." },
];

export default function AdministrationPage() {
  return (
    <PageShell flush>
      <PageHero
        eyebrow="Le Lycée"
        title="Administration"
        body="L'équipe administrative qui veille au bon fonctionnement quotidien du Lycée Scientifique de Yamoussoukro."
        breadcrumbs={[
          { label: "Le Lycée", href: "/le-lycee/presentation" },
          { label: "Administration" },
        ]}
        pattern="wave"
      />

      <section className="bg-lsy-paper py-20 lg:py-28">
        <Container className="space-y-12">
          <Reveal>
            <SectionHeader
              eyebrow="Équipe dirigeante"
              title="L'encadrement administratif"
              body="Les responsables administratifs assurent la coordination entre les équipes pédagogiques, le personnel d'encadrement et les familles."
            />
          </Reveal>

          <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
            {ADMIN.map((person) => (
              <StaggerItem key={person.role}>
                <PersonCard
                  name={person.name}
                  role={person.role}
                  bio={person.bio}
                />
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.2}>
            <div className="rounded-3xl border border-lsy-orange/25 bg-lsy-orange/5 p-6">
              <p className="text-sm font-semibold text-lsy-orange mb-1">Note</p>
              <p className="text-sm text-lsy-slate">
                Les informations nominatives de l&apos;équipe administrative seront
                complétées après validation par la direction du lycée. Pour tout
                contact, utilisez l&apos;adresse{" "}
                <a href="mailto:contact@lsy.ci" className="font-semibold text-lsy-blue-800 hover:underline">
                  contact@lsy.ci
                </a>.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <CTASection
        eyebrow="Contact"
        title="Vous souhaitez contacter l'administration ?"
        body="L'équipe administrative est disponible pour répondre à vos questions sur la vie scolaire, les admissions et le fonctionnement de l'établissement."
        buttons={[
          { label: "Nous contacter", href: "/contact", primary: true },
          { label: "Présentation du lycée", href: "/le-lycee/presentation" },
        ]}
      />
    </PageShell>
  );
}
