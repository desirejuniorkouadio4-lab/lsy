import type { Metadata } from "next";
import { BookOpen, Globe, GraduationCap, HandHeart, Lightbulb, Shield, Star, Target, type LucideIcon } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { CTASection } from "@/components/sections/CTASection";
import { Reveal } from "@/components/animations/Reveal";
import { values } from "@/data/institution";

export const metadata: Metadata = {
  title: "Mission & Valeurs",
  description: "La mission et les valeurs fondatrices du Lycée Scientifique de Yamoussoukro.",
};

const ICON_MAP: Record<string, LucideIcon> = {
  Excellence: Star,
  Discipline: Shield,
  Rigueur: Target,
  Innovation: Lightbulb,
  Responsabilité: HandHeart,
  Patriotisme: Globe,
  Ouverture: BookOpen,
};

export default function MissionValeursPage() {
  const features = values.map((v) => ({
    icon: ICON_MAP[v.label] ?? GraduationCap,
    title: v.label,
    body: v.description,
  }));

  return (
    <PageShell flush>
      <PageHero
        eyebrow="Le Lycée"
        title="Mission & Valeurs"
        body="Ce qui guide notre action, notre pédagogie et notre vision pour former les scientifiques de demain."
        breadcrumbs={[
          { label: "Le Lycée", href: "/le-lycee/presentation" },
          { label: "Mission & Valeurs" },
        ]}
        pattern="molecule"
      />

      {/* Mission */}
      <section className="bg-lsy-paper py-20 lg:py-28">
        <Container className="space-y-14">
          <Reveal>
            <div className="mx-auto max-w-3xl rounded-3xl bg-lsy-blue-900 p-8 text-white text-center space-y-4">
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-lsy-gold-300">
                Notre mission
              </p>
              <p className="font-display text-2xl font-bold leading-snug lg:text-3xl">
                Former les élites scientifiques au service du développement durable de la Côte d&apos;Ivoire et de l&apos;Afrique
              </p>
              <p className="text-[1.02rem] leading-relaxed text-white/65 max-w-2xl mx-auto">
                Le LSY s&apos;engage à offrir à chaque élève sélectionné un environnement
                rigoureux, stimulant et bienveillant, où les talents scientifiques
                peuvent s&apos;épanouir pleinement.
              </p>
            </div>
          </Reveal>

          <div className="space-y-8">
            <Reveal>
              <SectionHeader
                eyebrow="Nos valeurs"
                title="Les sept piliers de notre engagement"
                align="center"
              />
            </Reveal>
            <FeatureGrid features={features} cols={3} />
          </div>
        </Container>
      </section>

      <CTASection
        eyebrow="En savoir plus"
        title="Découvrez notre histoire et notre organisation"
        buttons={[
          { label: "Notre histoire", href: "/le-lycee/histoire", primary: true },
          { label: "Administration", href: "/le-lycee/administration" },
        ]}
      />
    </PageShell>
  );
}
