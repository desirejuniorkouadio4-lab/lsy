import type { Metadata } from "next";
import { CheckCircle2, Lightbulb, Users, UserCheck } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { CTASection } from "@/components/sections/CTASection";
import { Reveal } from "@/components/animations/Reveal";
import { Stagger, StaggerItem } from "@/components/animations/Stagger";

export const metadata: Metadata = {
  title: "Programme de mentorat",
  description: "Le programme de mentorat du Lycée Scientifique de Yamoussoukro : anciens élèves au service des élèves actuels.",
};

const COMMENT_CA_MARCHE = [
  {
    n: 1,
    titre: "Inscription comme mentor",
    desc: "Les anciens élèves s'inscrivent via le formulaire dédié en précisant leur domaine d'expertise et leur disponibilité.",
    Icon: UserCheck,
  },
  {
    n: 2,
    titre: "Mise en relation",
    desc: "L'équipe du LSY met en relation les mentors avec des élèves de terminale ou des étudiants en prépa selon les affinités et les objectifs.",
    Icon: Users,
  },
  {
    n: 3,
    titre: "Accompagnement",
    desc: "Échanges réguliers (présentiel, visioconférence, e-mail) sur les études, les choix d'orientation et les défis personnels.",
    Icon: Lightbulb,
  },
];

const BENEFICES_MENTOR = [
  "Transmission de votre expérience et de votre parcours",
  "Renforcement de votre leadership et de vos compétences relationnelles",
  "Contribution directe au rayonnement du LSY",
  "Intégration dans le réseau actif des anciens élèves",
];

const BENEFICES_ELEVE = [
  "Accès à des témoignages concrets de parcours de réussite",
  "Conseils personnalisés pour les choix d'orientation",
  "Préparation aux entretiens et aux concours de grandes écoles",
  "Motivation et confiance en soi renforcées",
];

export default function MentoratPage() {
  return (
    <PageShell flush>
      <PageHero
        eyebrow="Excellence & Alumni"
        title="Programme de mentorat"
        body="Des anciens élèves engagés qui transmettent leur expérience et inspirent la prochaine génération de scientifiques du LSY."
        breadcrumbs={[
          { label: "Excellence & Alumni", href: "/excellence-alumni/majors" },
          { label: "Mentorat" },
        ]}
        pattern="wave"
      />

      <section className="bg-lsy-paper py-20 lg:py-28">
        <Container className="space-y-16">
          {/* Comment ça marche */}
          <div className="space-y-8">
            <Reveal>
              <SectionHeader
                eyebrow="Fonctionnement"
                title="Comment fonctionne le mentorat ?"
                align="center"
              />
            </Reveal>
            <Stagger className="grid gap-5 lg:grid-cols-3" stagger={0.09}>
              {COMMENT_CA_MARCHE.map((step) => {
                const Icon = step.Icon;
                return (
                  <StaggerItem key={step.n}>
                    <div className="relative flex h-full flex-col rounded-3xl bg-white p-6 shadow-soft ring-1 ring-lsy-line">
                      <span className="absolute -top-3 left-5 flex size-7 items-center justify-center rounded-full bg-lsy-gold-500 text-xs font-bold text-lsy-blue-950">
                        {step.n}
                      </span>
                      <Icon className="mb-3 mt-1 size-7 text-lsy-blue-900" aria-hidden />
                      <p className="mb-2 font-bold text-lsy-blue-900">{step.titre}</p>
                      <p className="flex-1 text-sm leading-relaxed text-lsy-muted">{step.desc}</p>
                    </div>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>

          {/* Bénéfices */}
          <div className="grid gap-7 lg:grid-cols-2">
            <Reveal>
              <div className="rounded-3xl bg-lsy-blue-950 p-7 text-white">
                <p className="mb-4 text-[0.72rem] font-bold uppercase tracking-[0.18em] text-lsy-gold-300">
                  Pour les mentors
                </p>
                <ul className="space-y-3">
                  {BENEFICES_MENTOR.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-sm text-white/80">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-lsy-gold-400" aria-hidden />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="rounded-3xl bg-white p-7 shadow-soft ring-1 ring-lsy-line">
                <p className="mb-4 text-[0.72rem] font-bold uppercase tracking-[0.18em] text-lsy-gold-600">
                  Pour les élèves
                </p>
                <ul className="space-y-3">
                  {BENEFICES_ELEVE.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-sm text-lsy-slate">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-lsy-success" aria-hidden />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <CTASection
        eyebrow="Rejoindre le réseau"
        title="Vous êtes ancien élève du LSY ?"
        body="Inscrivez-vous au réseau alumni pour rejoindre le programme de mentorat et contribuer à l'excellence de la prochaine génération."
        buttons={[
          { label: "S'inscrire comme mentor", href: "/excellence-alumni/anciens-eleves", primary: true },
          { label: "Palmarès des majors", href: "/excellence-alumni/majors" },
        ]}
      />
    </PageShell>
  );
}
