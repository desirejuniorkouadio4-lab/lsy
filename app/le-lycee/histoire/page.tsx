import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { Timeline } from "@/components/sections/Timeline";
import { CTASection } from "@/components/sections/CTASection";
import { Reveal } from "@/components/animations/Reveal";
import { timeline } from "@/data/institution";

export const metadata: Metadata = {
  title: "Histoire",
  description: "L'histoire du Lycée Scientifique de Yamoussoukro depuis sa fondation en 1975.",
};

export default function HistoirePage() {
  return (
    <PageShell flush>
      <PageHero
        eyebrow="Le Lycée"
        title="Notre histoire"
        body="De sa fondation en 1975 à aujourd'hui, le LSY a traversé près de cinq décennies de formation scientifique d'excellence au service de la Côte d'Ivoire."
        breadcrumbs={[
          { label: "Le Lycée", href: "/le-lycee/presentation" },
          { label: "Histoire" },
        ]}
        pattern="constellation"
      />

      <section className="bg-lsy-paper py-20 lg:py-28">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1fr_1.6fr] lg:gap-16 lg:items-start">
            <Reveal>
              <div className="space-y-5 lg:sticky lg:top-24">
                <SectionHeader
                  eyebrow="Chronologie"
                  title="50 ans d'excellence scientifique"
                  body="Depuis sa création par les autorités ivoiriennes, le LSY a su traverser les épreuves du temps pour rester un pilier de l'enseignement scientifique national."
                />
                <blockquote className="border-l-2 border-lsy-gold-500 pl-5 italic text-lsy-slate">
                  &ldquo;Le Lycée Scientifique de Yamoussoukro est le symbole de l&apos;ambition
                  scientifique de la Côte d&apos;Ivoire.&rdquo;
                </blockquote>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <Timeline
                events={timeline.map((e) => ({
                  year: e.year,
                  title: e.title,
                  body: e.description,
                }))}
              />
            </Reveal>
          </div>
        </Container>
      </section>

      <CTASection
        eyebrow="L'avenir commence maintenant"
        title="Un nouveau chapitre s'ouvre"
        body="Le projet de réhabilitation en cours marque une nouvelle étape dans l'histoire du LSY, vers un établissement de référence à l'échelle africaine."
        buttons={[
          { label: "Suivre la réhabilitation", href: "/le-lycee/rehabilitation", primary: true },
          { label: "Présentation générale", href: "/le-lycee/presentation" },
        ]}
      />
    </PageShell>
  );
}
