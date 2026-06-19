import type { Metadata } from "next";
import { Brain, HandHeart, MessageCircle, Users } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { CTASection } from "@/components/sections/CTASection";
import { Reveal } from "@/components/animations/Reveal";
import { Stagger, StaggerItem } from "@/components/animations/Stagger";

export const metadata: Metadata = {
  title: "Soutien psychologique",
  description: "Le service de soutien psychologique et d'écoute au Lycée Scientifique de Yamoussoukro.",
};

const DOMAINES = [
  {
    Icon: MessageCircle,
    titre: "Écoute et accompagnement",
    desc: "Un espace confidentiel pour que les élèves puissent exprimer leurs difficultés personnelles, émotionnelles ou relationnelles.",
  },
  {
    Icon: Brain,
    titre: "Gestion du stress scolaire",
    desc: "Techniques de gestion du stress, de l'anxiété liée aux examens et des pressions académiques dans un lycée d'excellence.",
  },
  {
    Icon: Users,
    titre: "Médiation et vie collective",
    desc: "Accompagnement dans les conflits entre élèves, intégration dans la vie de l'internat et socialisation au sein du groupe.",
  },
  {
    Icon: HandHeart,
    titre: "Orientation et projet de vie",
    desc: "Aide à la définition des projets d'études supérieures, orientation vocationnelle et préparation à la vie après le lycée.",
  },
];

const ENGAGEMENTS = [
  "Confidentialité totale des échanges",
  "Disponibilité sur rendez-vous discret",
  "Collaboration avec l'équipe enseignante si nécessaire et avec l'accord de l'élève",
  "Signalement aux autorités compétentes en cas de danger imminent",
  "Coordination avec les familles dans le respect du bien-être de l'élève",
];

export default function SoutienPsychologiquePage() {
  return (
    <PageShell flush>
      <PageHero
        eyebrow="Vie au LSY"
        title="Soutien psychologique"
        body="L'excellence scolaire ne va pas sans un bien-être mental solide. Le LSY propose un accompagnement psychologique discret et professionnel à tous ses élèves."
        breadcrumbs={[
          { label: "Vie au LSY", href: "/vie-au-lysee/internat" },
          { label: "Soutien psychologique" },
        ]}
        pattern="wave"
      />

      <section className="bg-lsy-paper py-20 lg:py-28">
        <Container className="space-y-14">
          {/* Domaines d'intervention */}
          <div className="space-y-8">
            <Reveal>
              <SectionHeader
                eyebrow="Accompagnement"
                title="Un soutien pour chaque situation"
                body="Le service de soutien psychologique du LSY est là pour accompagner les élèves dans toutes les dimensions de leur vie au lycée."
              />
            </Reveal>
            <Stagger className="grid gap-5 sm:grid-cols-2" stagger={0.08}>
              {DOMAINES.map((d) => {
                const Icon = d.Icon;
                return (
                  <StaggerItem key={d.titre}>
                    <div className="flex h-full flex-col rounded-3xl bg-white p-6 shadow-soft ring-1 ring-lsy-line">
                      <div className="mb-4 flex size-11 items-center justify-center rounded-xl bg-lsy-blue-950">
                        <Icon className="size-5 text-lsy-gold-400" aria-hidden />
                      </div>
                      <p className="mb-2 font-bold text-lsy-blue-900">{d.titre}</p>
                      <p className="flex-1 text-sm leading-relaxed text-lsy-muted">{d.desc}</p>
                    </div>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>

          {/* Engagements déontologiques */}
          <Reveal>
            <div className="rounded-3xl bg-lsy-blue-950 p-8 text-white">
              <p className="mb-5 text-[0.72rem] font-bold uppercase tracking-[0.18em] text-lsy-gold-300">
                Nos engagements
              </p>
              <ul className="space-y-3">
                {ENGAGEMENTS.map((eng) => (
                  <li key={eng} className="flex items-start gap-3 text-sm text-white/80">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-lsy-gold-400" />
                    {eng}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </Container>
      </section>

      <CTASection
        eyebrow="Santé globale"
        title="Santé physique et mentale, une priorité"
        buttons={[
          { label: "Santé et infirmerie", href: "/vie-au-lysee/sante-et-infirmerie", primary: true },
          { label: "Nous contacter", href: "/contact" },
        ]}
      />
    </PageShell>
  );
}
