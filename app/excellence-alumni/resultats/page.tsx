import type { Metadata } from "next";
import { BarChart3, GraduationCap, TrendingUp } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { CTASection } from "@/components/sections/CTASection";
import { Reveal } from "@/components/animations/Reveal";
import { Stagger, StaggerItem } from "@/components/animations/Stagger";

export const metadata: Metadata = {
  title: "Résultats aux examens",
  description: "Les taux de réussite et performances aux examens du Lycée Scientifique de Yamoussoukro.",
};

const EXAMS_STATS = [
  {
    exam: "BEPC",
    level: "Cycle collège — 3e",
    note: "Taux de réussite historiquement parmi les plus élevés du pays.",
    color: "bg-lsy-blue-900 text-white",
  },
  {
    exam: "BAC C",
    level: "Série Mathématiques",
    note: "Série phare du LSY, préparant aux filières d'ingénierie et aux grandes écoles.",
    color: "bg-lsy-gold-500 text-lsy-blue-950",
  },
  {
    exam: "BAC D",
    level: "Série Sciences",
    note: "Formation solide en SVT, chimie et biologie, ouvrant vers médecine et sciences naturelles.",
    color: "bg-lsy-gold-600 text-white",
  },
];

const ORIENTATIONS = [
  "Classes préparatoires aux grandes écoles (CPGE) en Côte d'Ivoire",
  "Classes préparatoires en France (MPSI, PCSI, BCPST)",
  "Universités ivoiriennes et africaines",
  "Instituts polytechniques et grandes écoles d'ingénieurs",
  "Facultés de médecine et de pharmacie",
  "Écoles normales supérieures (ENS)",
];

export default function ResultatsPage() {
  return (
    <PageShell flush>
      <PageHero
        eyebrow="Excellence & Alumni"
        title="Résultats aux examens"
        body="Des performances aux examens nationaux qui font la réputation du Lycée Scientifique de Yamoussoukro depuis 1975."
        breadcrumbs={[
          { label: "Excellence & Alumni", href: "/excellence-alumni/majors" },
          { label: "Résultats" },
        ]}
        pattern="orbit"
      />

      <section className="bg-lsy-paper py-20 lg:py-28">
        <Container className="space-y-14">
          {/* Examens */}
          <div className="space-y-8">
            <Reveal>
              <SectionHeader
                eyebrow="Examens officiels"
                title="Des taux de réussite d'excellence"
                body="Les chiffres précis sont mis à jour par l'administration en fin d'année scolaire. Les résultats ci-dessous reflètent la performance historique du LSY."
              />
            </Reveal>

            <Stagger className="grid gap-5 lg:grid-cols-3" stagger={0.09}>
              {EXAMS_STATS.map((stat) => (
                <StaggerItem key={stat.exam}>
                  <div className={`flex h-full flex-col rounded-3xl p-7 ${stat.color}`}>
                    <GraduationCap className="mb-3 size-8 opacity-70" aria-hidden />
                    <p className="font-display text-4xl font-bold">{stat.exam}</p>
                    <p className="mt-1 text-sm font-semibold opacity-80">{stat.level}</p>
                    <p className="mt-3 flex-1 text-sm leading-relaxed opacity-70">{stat.note}</p>
                    <div className="mt-4 flex items-center gap-1.5 text-xs font-bold opacity-60">
                      <TrendingUp className="size-3.5" aria-hidden />
                      Excellence historique
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          {/* Orientations post-bac */}
          <div className="space-y-8">
            <Reveal>
              <SectionHeader
                eyebrow="Après le LSY"
                title="Des diplômés dans les meilleures institutions"
                body="Les anciens élèves du LSY poursuivent leur parcours dans les filières les plus exigeantes en Côte d'Ivoire, en Afrique et à l'international."
              />
            </Reveal>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {ORIENTATIONS.map((ori, i) => (
                <Reveal key={ori} delay={i * 0.06}>
                  <div className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-soft ring-1 ring-lsy-line">
                    <BarChart3 className="size-4 shrink-0 text-lsy-gold-600" aria-hidden />
                    <span className="text-sm font-medium text-lsy-blue-900">{ori}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <CTASection
        eyebrow="Palmarès"
        title="Découvrez les majors de promotion"
        buttons={[
          { label: "Palmarès des majors", href: "/excellence-alumni/majors", primary: true },
          { label: "Concours et distinctions", href: "/excellence-alumni/concours-et-distinctions" },
        ]}
      />
    </PageShell>
  );
}
