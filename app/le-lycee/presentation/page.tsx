import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Award, BookOpen, Globe, Shield, Star, Target, Users, Zap } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { EditorialSplit } from "@/components/sections/EditorialSplit";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { StatsRibbon } from "@/components/sections/StatsRibbon";
import { CTASection } from "@/components/sections/CTASection";
import { Reveal } from "@/components/animations/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Présentation",
  description: `Découvrez le Lycée Scientifique de Yamoussoukro, établissement public d'excellence fondé en 1975.`,
};

const VALUES = [
  { icon: Award, title: "Excellence", body: "Une exigence académique élevée, des résultats au Baccalauréat parmi les meilleurs du pays." },
  { icon: Shield, title: "Discipline", body: "Un cadre strict mais bienveillant, fondement de la réussite et de l'épanouissement personnel." },
  { icon: Target, title: "Rigueur", body: "La précision, la méthode et l'esprit critique comme socle de toute démarche scientifique." },
  { icon: Zap, title: "Innovation", body: "Ouverture aux nouvelles technologies, à la recherche et aux défis scientifiques du XXIe siècle." },
  { icon: Globe, title: "Ouverture", body: "Un établissement tourné vers le monde, les échanges et la coopération internationale." },
  { icon: Star, title: "Patriotisme", body: "Former des cadres engagés au service du développement durable de la Côte d'Ivoire." },
];

const STATS = [
  { value: 1975, label: "Année de fondation" },
  { value: 1978, label: "Inauguration officielle" },
  { value: 50, label: "Ans d'histoire", prefix: "~", suffix: "" },
];

export default function PresentationPage() {
  return (
    <PageShell flush>
      <PageHero
        eyebrow="Le Lycée"
        title="Présentation du LSY"
        body="Établissement public d'excellence, le Lycée Scientifique de Yamoussoukro forme depuis 1975 les futures élites scientifiques de la Côte d'Ivoire."
        breadcrumbs={[
          { label: "Le Lycée" },
          { label: "Présentation" },
        ]}
        pattern="orbit"
      />

      {/* Intro éditoriale */}
      <section className="bg-lsy-paper py-20 lg:py-28">
        <Container>
          <EditorialSplit
            left={
              <div className="space-y-5">
                <SectionHeader
                  eyebrow="Identité"
                  title="Une institution au service de la science"
                  body="Le LSY est bien plus qu'un lycée. C'est un projet national fondé sur la conviction que l'excellence scientifique est le levier le plus puissant du développement d'une nation."
                />
                <p className="text-[1.02rem] leading-relaxed text-lsy-slate">
                  Depuis sa création par les autorités ivoiriennes, l&apos;établissement
                  accueille les meilleurs élèves scientifiques du pays, sélectionnés sur
                  concours, et les forme dans un environnement exigeant, structuré et stimulant.
                </p>
                <p className="text-[1.02rem] leading-relaxed text-lsy-slate">
                  Ses lauréats occupent aujourd&apos;hui des positions clés dans les domaines
                  scientifiques, académiques et techniques, en Côte d&apos;Ivoire et à travers
                  le monde.
                </p>
                <Link
                  href="/le-lycee/histoire"
                  className="inline-flex items-center gap-2 font-semibold text-lsy-blue-800 hover:text-lsy-blue-900"
                >
                  Lire notre histoire <ArrowRight className="size-4" aria-hidden />
                </Link>
              </div>
            }
            right={
              <div className="space-y-4">
                <StatsRibbon stats={STATS} />
                <div className="rounded-3xl border border-lsy-line bg-lsy-ivory p-6 space-y-3">
                  <p className="text-[0.72rem] font-bold uppercase tracking-[0.18em] text-lsy-muted">
                    Mission
                  </p>
                  <p className="font-display text-xl font-bold text-lsy-blue-900 leading-snug">
                    Former les élites scientifiques de la Côte d&apos;Ivoire
                  </p>
                  <p className="text-sm leading-relaxed text-lsy-slate">
                    Accueillir des élèves à fort potentiel, les former avec exigence et
                    bienveillance, et les préparer à contribuer au progrès scientifique
                    et technologique du continent africain.
                  </p>
                </div>
              </div>
            }
          />
        </Container>
      </section>

      {/* Valeurs */}
      <section className="bg-lsy-ivory py-20 lg:py-28">
        <Container className="space-y-12">
          <Reveal>
            <SectionHeader
              eyebrow="Nos valeurs"
              title="Ce qui nous définit"
              body="Six principes fondateurs guident chaque aspect de la vie au LSY, des apprentissages en classe à la vie en internat."
              align="center"
            />
          </Reveal>
          <FeatureGrid features={VALUES} cols={3} />
        </Container>
      </section>

      {/* CTA */}
      <CTASection
        eyebrow="Rejoindre le LSY"
        title="Vous souhaitez intégrer le lycée ?"
        body="Découvrez les conditions d'admission et la procédure de candidature pour rejoindre le Lycée Scientifique de Yamoussoukro."
        buttons={[
          { label: "Conditions d'admission", href: "/admissions/vue-d-ensemble", primary: true },
          { label: "Nous contacter", href: "/contact" },
        ]}
      />
    </PageShell>
  );
}
