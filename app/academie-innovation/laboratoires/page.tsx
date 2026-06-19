import type { Metadata } from "next";
import { CheckCircle2, Clock, FlaskConical, Wrench } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { CTASection } from "@/components/sections/CTASection";
import { Reveal } from "@/components/animations/Reveal";
import { Stagger, StaggerItem } from "@/components/animations/Stagger";
import { laboratories, type Laboratory } from "@/data/academics";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Laboratoires",
  description: "Les laboratoires scientifiques du Lycée Scientifique de Yamoussoukro : physique, chimie, SVT et informatique.",
};

const STATUS_CONFIG: Record<
  Laboratory["status"],
  { label: string; Icon: typeof CheckCircle2; className: string }
> = {
  actif: { label: "Actif", Icon: CheckCircle2, className: "text-lsy-success bg-lsy-success/10" },
  "en-renovation": { label: "En rénovation", Icon: Wrench, className: "text-lsy-orange bg-lsy-orange/10" },
  "a-venir": { label: "À venir", Icon: Clock, className: "text-lsy-blue-700 bg-lsy-blue-100" },
};

export default function LaboratoiresPage() {
  return (
    <PageShell flush>
      <PageHero
        eyebrow="Académie & Innovation"
        title="Laboratoires scientifiques"
        body="Des espaces de travaux pratiques essentiels à la formation scientifique rigoureuse dispensée au Lycée Scientifique de Yamoussoukro."
        breadcrumbs={[
          { label: "Académie & Innovation", href: "/academie-innovation/organisation-pedagogique" },
          { label: "Laboratoires" },
        ]}
        pattern="molecule"
      />

      <section className="bg-lsy-paper py-20 lg:py-28">
        <Container className="space-y-12">
          <Reveal>
            <SectionHeader
              eyebrow="Nos équipements"
              title="Des espaces de pratique scientifique"
              body="Les laboratoires du LSY sont au cœur de la formation. La réhabilitation en cours permettra leur mise à niveau aux standards internationaux."
            />
          </Reveal>

          <Stagger className="grid gap-6 lg:grid-cols-2" stagger={0.08}>
            {laboratories.map((lab) => {
              const { label, Icon, className } = STATUS_CONFIG[lab.status];
              return (
                <StaggerItem key={lab.name}>
                  <div className="flex h-full flex-col rounded-3xl bg-white p-6 shadow-soft ring-1 ring-lsy-line">
                    <div className="mb-5 flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-xl bg-lsy-blue-950">
                          <FlaskConical className="size-5 text-lsy-gold-400" aria-hidden />
                        </div>
                        <h2 className="font-bold text-lsy-blue-900">{lab.name}</h2>
                      </div>
                      <span
                        className={cn(
                          "inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold",
                          className,
                        )}
                      >
                        <Icon className="size-3" aria-hidden />
                        {label}
                      </span>
                    </div>

                    <p className="text-sm leading-relaxed text-lsy-muted">{lab.description}</p>

                    <div className="mt-5 grid grid-cols-2 gap-4">
                      <div>
                        <p className="mb-2 text-[0.7rem] font-bold uppercase tracking-widest text-lsy-gold-600">
                          Équipements
                        </p>
                        <ul className="space-y-1">
                          {lab.equipment.map((eq) => (
                            <li key={eq} className="flex items-start gap-1.5 text-xs text-lsy-muted">
                              <span className="mt-1.5 size-1 shrink-0 rounded-full bg-lsy-gold-400" />
                              {eq}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="mb-2 text-[0.7rem] font-bold uppercase tracking-widest text-lsy-gold-600">
                          Activités
                        </p>
                        <ul className="space-y-1">
                          {lab.activities.map((act) => (
                            <li key={act} className="flex items-start gap-1.5 text-xs text-lsy-muted">
                              <span className="mt-1.5 size-1 shrink-0 rounded-full bg-lsy-blue-400" />
                              {act}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </Container>
      </section>

      <CTASection
        eyebrow="Réhabilitation en cours"
        title="Des laboratoires bientôt au niveau international"
        body="Le projet de réhabilitation du LSY prévoit la modernisation complète des équipements scientifiques."
        buttons={[
          { label: "Suivre la réhabilitation", href: "/le-lycee/rehabilitation", primary: true },
          { label: "Programmes", href: "/academie-innovation/programmes" },
        ]}
      />
    </PageShell>
  );
}
