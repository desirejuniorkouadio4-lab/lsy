import type { Metadata } from "next";
import {
  Atom,
  BookOpen,
  Brain,
  Code2,
  Globe,
  GraduationCap,
  Languages,
  Leaf,
  Sigma,
  type LucideIcon,
} from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { CTASection } from "@/components/sections/CTASection";
import { Reveal } from "@/components/animations/Reveal";
import { Stagger, StaggerItem } from "@/components/animations/Stagger";
import { subjects } from "@/data/academics";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Programmes d'enseignement",
  description: "Les disciplines scientifiques et littéraires enseignées au Lycée Scientifique de Yamoussoukro.",
};

const ICON_MAP: Record<string, LucideIcon> = {
  Sigma,
  Atom,
  Leaf,
  Code2,
  BookOpen,
  Languages,
  Brain,
  Globe2: Globe,
};

const LEVEL_COLORS: Record<string, string> = {
  "4e": "bg-lsy-blue-900 text-white",
  "3e": "bg-lsy-blue-700 text-white",
  Seconde: "bg-lsy-gold-500 text-lsy-blue-950",
  Première: "bg-lsy-gold-400 text-lsy-blue-950",
  Terminale: "bg-lsy-gold-600 text-white",
};

export default function ProgrammesPage() {
  return (
    <PageShell flush>
      <PageHero
        eyebrow="Académie & Innovation"
        title="Programmes d'enseignement"
        body="Disciplines scientifiques et littéraires d'un lycée d'exception, avec des horaires renforcés en mathématiques, physique-chimie et SVT."
        breadcrumbs={[
          { label: "Académie & Innovation", href: "/academie-innovation/organisation-pedagogique" },
          { label: "Programmes" },
        ]}
        pattern="atom"
      />

      <section className="bg-lsy-paper py-20 lg:py-28">
        <Container className="space-y-12">
          <Reveal>
            <SectionHeader
              eyebrow="Disciplines"
              title="Un enseignement scientifique de haut niveau"
              body="Le LSY dispense un enseignement complet couvrant les sciences fondamentales, les lettres et les sciences humaines, avec un accent particulier sur les disciplines scientifiques."
            />
          </Reveal>

          <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
            {subjects.map((subject) => {
              const Icon = ICON_MAP[subject.icon] ?? GraduationCap;
              return (
                <StaggerItem key={subject.code}>
                  <div className="flex h-full flex-col rounded-3xl bg-white p-6 shadow-soft ring-1 ring-lsy-line">
                    <div className="mb-4 flex items-start gap-4">
                      <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-lsy-blue-950 text-lsy-gold-400">
                        <Icon className="size-5" aria-hidden />
                      </div>
                      <div>
                        <p className="font-bold text-lsy-blue-900">{subject.name}</p>
                        <p className="text-[0.7rem] font-bold uppercase tracking-widest text-lsy-muted">
                          {subject.code}
                        </p>
                      </div>
                    </div>

                    <p className="flex-1 text-sm leading-relaxed text-lsy-muted">{subject.description}</p>

                    {subject.hoursPerWeek && (
                      <p className="mt-4 text-xs font-semibold text-lsy-gold-600">
                        {subject.hoursPerWeek}
                      </p>
                    )}

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {subject.levels.map((lvl) => (
                        <span
                          key={lvl}
                          className={cn(
                            "rounded-full px-2.5 py-0.5 text-[0.65rem] font-bold",
                            LEVEL_COLORS[lvl] ?? "bg-lsy-ivory text-lsy-blue-900",
                          )}
                        >
                          {lvl}
                        </span>
                      ))}
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </Container>
      </section>

      <CTASection
        eyebrow="Organisation pédagogique"
        title="Découvrez comment s'organise l'enseignement au LSY"
        buttons={[
          { label: "Organisation pédagogique", href: "/academie-innovation/organisation-pedagogique", primary: true },
          { label: "Laboratoires", href: "/academie-innovation/laboratoires" },
        ]}
      />
    </PageShell>
  );
}
