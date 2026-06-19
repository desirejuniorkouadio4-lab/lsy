import type { Metadata } from "next";
import { BookOpen, Scale, ShieldCheck, Users } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { CTASection } from "@/components/sections/CTASection";
import { Reveal } from "@/components/animations/Reveal";
import { Stagger, StaggerItem } from "@/components/animations/Stagger";

export const metadata: Metadata = {
  title: "Règlement intérieur",
  description: "Le règlement intérieur du Lycée Scientifique de Yamoussoukro : droits et devoirs des élèves.",
};

const SECTIONS = [
  {
    titre: "Assiduité et ponctualité",
    Icon: Scale,
    items: [
      "Présence obligatoire à tous les cours, devoirs et activités planifiées.",
      "Tout retard ou absence doit être justifié par les parents ou tuteurs légaux.",
      "Trois retards injustifiés équivalent à une absence disciplinaire.",
    ],
  },
  {
    titre: "Tenue et comportement",
    Icon: ShieldCheck,
    items: [
      "Port de l'uniforme scolaire obligatoire dans l'enceinte du lycée.",
      "Comportement respectueux envers les enseignants, le personnel et les autres élèves.",
      "Interdiction stricte de toute forme de violence physique ou verbale.",
    ],
  },
  {
    titre: "Matériel et équipements",
    Icon: BookOpen,
    items: [
      "Soin du matériel scolaire, des infrastructures et des équipements mis à disposition.",
      "Interdiction d'utiliser les téléphones portables pendant les cours et les études du soir.",
      "Responsabilité personnelle en cas de dommages intentionnels.",
    ],
  },
  {
    titre: "Vie collective",
    Icon: Users,
    items: [
      "Respect de la vie privée de chaque membre de la communauté.",
      "Interdiction de toute forme de discrimination, de harcèlement ou d'intimidation.",
      "Participation active aux activités de la vie scolaire et de l'internat.",
    ],
  },
];

export default function ReglementInterieurPage() {
  return (
    <PageShell flush>
      <PageHero
        eyebrow="Vie au LSY"
        title="Règlement intérieur"
        body="Un cadre de vie clair et juste, fondé sur le respect mutuel, la discipline et le développement personnel."
        breadcrumbs={[
          { label: "Vie au LSY", href: "/vie-au-lysee/internat" },
          { label: "Règlement intérieur" },
        ]}
        pattern="wave"
      />

      <section className="bg-lsy-paper py-20 lg:py-28">
        <Container className="space-y-12">
          <Reveal>
            <SectionHeader
              eyebrow="Droits et devoirs"
              title="Un cadre qui structure l'excellence"
              body="Le règlement intérieur du LSY définit les droits et les devoirs de chaque élève. Il est remis à chaque élève et à sa famille en début d'année scolaire."
            />
          </Reveal>

          <Stagger className="grid gap-6 lg:grid-cols-2" stagger={0.08}>
            {SECTIONS.map((section) => {
              const Icon = section.Icon;
              return (
                <StaggerItem key={section.titre}>
                  <div className="flex h-full flex-col rounded-3xl bg-white p-6 shadow-soft ring-1 ring-lsy-line">
                    <div className="mb-4 flex items-center gap-3">
                      <Icon className="size-6 text-lsy-gold-600" aria-hidden />
                      <h2 className="font-bold text-lsy-blue-900">{section.titre}</h2>
                    </div>
                    <ul className="space-y-2.5">
                      {section.items.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm text-lsy-slate">
                          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-lsy-blue-700" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>

          <Reveal>
            <div className="rounded-2xl bg-lsy-ivory p-5 text-sm text-lsy-muted">
              <strong className="text-lsy-blue-900">Note :</strong> Ce résumé présente les grands
              principes du règlement. Le document complet et officiel est disponible auprès de
              l&apos;administration du lycée.
            </div>
          </Reveal>
        </Container>
      </section>

      <CTASection
        eyebrow="Vie à l'internat"
        title="Découvrir l'internat du LSY"
        buttons={[
          { label: "L'internat", href: "/vie-au-lysee/internat", primary: true },
          { label: "Nous contacter", href: "/contact" },
        ]}
      />
    </PageShell>
  );
}
