import type { Metadata } from "next";
import Image from "next/image";
import { Quote } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/ui/Container";
import { CTASection } from "@/components/sections/CTASection";
import { Reveal } from "@/components/animations/Reveal";
import { db } from "@/lib/db";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Mot du Proviseur",
  description: "Le message du Proviseur du Lycée Scientifique de Yamoussoukro.",
};

const DEFAULT_MESSAGE = `C'est avec fierté et engagement que je m'adresse à vous au nom de la grande famille du Lycée Scientifique de Yamoussoukro — un établissement qui incarne depuis près de cinquante ans l'ambition scientifique de la Côte d'Ivoire.

Notre lycée a toujours été plus qu'un lieu d'apprentissage : c'est une communauté de rigueur, de discipline, d'innovation et de solidarité. Des générations d'élèves y ont forgé leur caractère, aiguisé leur intelligence et développé la vocation scientifique qui les anime encore aujourd'hui, qu'ils soient chercheurs, ingénieurs, médecins, enseignants ou entrepreneurs.

Nous traversons aujourd'hui une période de transformation importante avec le projet de réhabilitation de nos infrastructures. Cette modernisation est l'occasion de confirmer notre vocation et d'élever encore nos exigences, pour former les cadres scientifiques dont la Côte d'Ivoire et l'Afrique ont besoin.

À tous nos élèves, parents, enseignants et partenaires : merci de votre confiance. Ensemble, nous ferons du LSY un pôle d'excellence scientifique de référence pour l'Afrique de l'Ouest.`;

async function getSettings() {
  const settings = await db.siteSetting.findMany({
    where: { key: { in: ["proviseur_name", "proviseur_message"] } },
  });
  const map = Object.fromEntries(settings.map((s) => [s.key, s.value]));
  return {
    name: map["proviseur_name"] ?? site.proviseur.name,
    message: map["proviseur_message"] ?? DEFAULT_MESSAGE,
  };
}

export default async function MotDuProviseurPage() {
  const { name, message } = await getSettings();
  const paragraphs = message.split("\n\n").filter(Boolean);

  return (
    <PageShell flush>
      <PageHero
        eyebrow="Le Lycée"
        title="Mot du Proviseur"
        breadcrumbs={[
          { label: "Le Lycée", href: "/le-lycee/presentation" },
          { label: "Mot du Proviseur" },
        ]}
        pattern="wave"
      />

      <section className="bg-lsy-paper py-20 lg:py-28">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-3xl">
              <div className="mb-10 flex flex-col items-center gap-6 sm:flex-row sm:items-start">
                {/* Photo */}
                <div className="relative size-28 shrink-0 overflow-hidden rounded-2xl sm:size-36">
                  <Image
                    src={site.proviseur.photoUrl}
                    alt={`${name}, Proviseur du LSY`}
                    fill
                    className="object-cover object-top"
                    sizes="144px"
                    priority
                  />
                </div>
                <div className="text-center sm:text-left">
                  <p className="font-display text-xl font-bold text-lsy-blue-900 sm:text-2xl">
                    {name}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-lsy-gold-600">
                    {site.proviseur.title}
                  </p>
                </div>
              </div>

              {/* Message */}
              <div className="relative space-y-5">
                <Quote
                  className="absolute -left-2 -top-3 size-10 text-lsy-gold-300 opacity-50"
                  aria-hidden
                />
                <div className="space-y-4 pl-6 text-[1.05rem] leading-relaxed text-lsy-slate">
                  {paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                <Quote
                  className="ml-auto size-8 rotate-180 text-lsy-gold-300 opacity-40"
                  aria-hidden
                />
              </div>

              <div className="mt-8 border-t border-lsy-line pt-5">
                <p className="font-bold text-lsy-blue-900">{name}</p>
                <p className="text-sm text-lsy-gold-600">{site.proviseur.title}</p>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <CTASection
        eyebrow="L'institution"
        title="En savoir plus sur le LSY"
        buttons={[
          { label: "Présentation", href: "/le-lycee/presentation", primary: true },
          { label: "Histoire", href: "/le-lycee/histoire" },
        ]}
      />
    </PageShell>
  );
}
