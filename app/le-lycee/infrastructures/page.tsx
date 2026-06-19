import type { Metadata } from "next";
import { CheckCircle2, Clock, Wrench } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { CTASection } from "@/components/sections/CTASection";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/animations/Reveal";
import { Stagger, StaggerItem } from "@/components/animations/Stagger";
import { infrastructure } from "@/data/institution";

export const metadata: Metadata = {
  title: "Infrastructures",
  description: "Les infrastructures et équipements du Lycée Scientifique de Yamoussoukro.",
};

const STATUS_BADGE: Record<string, { label: string; variant: "green" | "orange" | "navy"; Icon: React.ComponentType<{ className?: string }> }> = {
  operationnel: { label: "Opérationnel", variant: "green", Icon: CheckCircle2 },
  "en-renovation": { label: "En rénovation", variant: "orange", Icon: Wrench },
  "a-venir": { label: "À venir", variant: "navy", Icon: Clock },
};

export default function InfrastructuresPage() {
  return (
    <PageShell flush>
      <PageHero
        eyebrow="Le Lycée"
        title="Infrastructures"
        body="Un panorama des installations du LSY — bâtiments scolaires, internat, laboratoires et équipements sportifs."
        breadcrumbs={[
          { label: "Le Lycée", href: "/le-lycee/presentation" },
          { label: "Infrastructures" },
        ]}
        pattern="atom"
      />

      <section className="bg-lsy-paper py-20 lg:py-28">
        <Container className="space-y-12">
          <Reveal>
            <SectionHeader
              eyebrow="État des lieux"
              title="Nos infrastructures"
              body="Le projet de réhabilitation en cours vise à moderniser l'ensemble des espaces pour offrir un cadre d'apprentissage et de vie à la hauteur des ambitions du LSY."
            />
          </Reveal>

          <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
            {infrastructure.map((item) => {
              const status = STATUS_BADGE[item.status] ?? STATUS_BADGE.operational;
              const StatusIcon = status.Icon;
              return (
                <StaggerItem key={item.name}>
                  <div className="flex flex-col gap-3 rounded-2xl bg-white p-5 shadow-soft ring-1 ring-lsy-line h-full">
                    <div className="flex items-start justify-between gap-3">
                      <p className="font-bold text-lsy-blue-900">{item.name}</p>
                      <Badge variant={status.variant} className="shrink-0 text-[0.65rem]">
                        <StatusIcon className="size-3" aria-hidden />
                        {status.label}
                      </Badge>
                    </div>
                    {item.description && (
                      <p className="text-sm leading-relaxed text-lsy-muted flex-1">
                        {item.description}
                      </p>
                    )}
                    {item.capacity && (
                      <p className="text-xs font-semibold text-lsy-blue-800">
                        Capacité : {item.capacity}
                      </p>
                    )}
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </Container>
      </section>

      <CTASection
        eyebrow="Modernisation"
        title="Un lycée en pleine transformation"
        body="Le projet de réhabilitation va profondément transformer les infrastructures du LSY. Découvrez les chantiers en cours."
        buttons={[
          { label: "Projet de réhabilitation", href: "/le-lycee/rehabilitation", primary: true },
          { label: "Soutenir le LSY", href: "/soutenir/partenaires" },
        ]}
      />
    </PageShell>
  );
}
