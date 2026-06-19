import type { Metadata } from "next";
import { Quote } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/ui/Container";
import { CTASection } from "@/components/sections/CTASection";
import { Reveal } from "@/components/animations/Reveal";

export const metadata: Metadata = {
  title: "Mot du Proviseur",
  description: "Le message du Proviseur du Lycée Scientifique de Yamoussoukro.",
};

export default function MotDuProviseurPage() {
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
            <div className="mx-auto max-w-3xl space-y-8">
              {/* Carte proviseur */}
              <div className="flex items-start gap-5 rounded-3xl border border-lsy-line bg-white p-7 shadow-soft">
                <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-lsy-blue-900 font-display text-2xl font-bold text-white">
                  P
                </div>
                <div>
                  <p className="font-bold text-lsy-blue-900">La Direction du Lycée</p>
                  <p className="text-sm text-lsy-gold-600">Proviseur — Lycée Scientifique de Yamoussoukro</p>
                  <p className="mt-1 text-xs text-lsy-muted">
                    Le message officiel sera mis à jour après confirmation par l&apos;administration.
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
                  <p>
                    C&apos;est avec fierté et engagement que je m&apos;adresse à vous au nom de
                    la grande famille du Lycée Scientifique de Yamoussoukro — un
                    établissement qui incarne depuis près de cinquante ans l&apos;ambition
                    scientifique de la Côte d&apos;Ivoire.
                  </p>
                  <p>
                    Notre lycée a toujours été plus qu&apos;un lieu d&apos;apprentissage : c&apos;est
                    une communauté de rigueur, de discipline, d&apos;innovation et de
                    solidarité. Des générations d&apos;élèves y ont forgé leur caractère,
                    aiguisé leur intelligence et développé la vocation scientifique qui
                    les anime encore aujourd&apos;hui, qu&apos;ils soient chercheurs, ingénieurs,
                    médecins, enseignants ou entrepreneurs.
                  </p>
                  <p>
                    Nous traversons aujourd&apos;hui une période de transformation importante
                    avec le projet de réhabilitation de nos infrastructures. Cette
                    modernisation est l&apos;occasion de confirmer notre vocation et d&apos;élever
                    encore nos exigences, pour former les cadres scientifiques dont la
                    Côte d&apos;Ivoire et l&apos;Afrique ont besoin.
                  </p>
                  <p>
                    À tous nos élèves, parents, enseignants et partenaires : merci de
                    votre confiance. Ensemble, nous ferons du LSY un pôle d&apos;excellence
                    scientifique de référence pour l&apos;Afrique de l&apos;Ouest.
                  </p>
                </div>
                <Quote
                  className="ml-auto size-8 rotate-180 text-lsy-gold-300 opacity-40"
                  aria-hidden
                />
              </div>

              <div className="border-t border-lsy-line pt-5 text-sm text-lsy-muted italic">
                Ce message a été rédigé à titre provisoire dans l&apos;attente de la validation
                définitive par la Direction du Lycée Scientifique de Yamoussoukro.
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
