import type { Metadata } from "next";
import {
  BookOpen,
  Cpu,
  Dumbbell,
  FlaskConical,
  Leaf,
  Palette,
  type LucideIcon,
} from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { CTASection } from "@/components/sections/CTASection";
import { Reveal } from "@/components/animations/Reveal";
import { Stagger, StaggerItem } from "@/components/animations/Stagger";
import { clubs } from "@/data/clubs";

export const metadata: Metadata = {
  title: "Clubs et activités",
  description: "Les clubs et activités extrascolaires du Lycée Scientifique de Yamoussoukro.",
};

const ICON_MAP: Record<string, LucideIcon> = {
  FlaskConical,
  Cpu,
  Leaf,
  BookOpen,
  Dumbbell,
  Palette,
};

const CATEGORY_COLORS: Record<string, string> = {
  sciences: "bg-lsy-blue-900 text-white",
  informatique: "bg-lsy-blue-700 text-white",
  sport: "bg-lsy-gold-500 text-lsy-blue-950",
  culture: "bg-lsy-gold-400 text-lsy-blue-950",
  debat: "bg-lsy-orange/20 text-[#b5610f]",
  environnement: "bg-lsy-success/20 text-lsy-success",
  lecture: "bg-lsy-ivory text-lsy-blue-900",
  arts: "bg-lsy-gold-600 text-white",
};

const CATEGORY_LABELS: Record<string, string> = {
  sciences: "Sciences",
  informatique: "Informatique",
  sport: "Sport",
  culture: "Culture",
  debat: "Débat",
  environnement: "Environnement",
  lecture: "Lecture",
  arts: "Arts",
};

export default function ClubsPage() {
  return (
    <PageShell flush>
      <PageHero
        eyebrow="Vie au LSY"
        title="Clubs et activités"
        body="L'épanouissement au-delà des cours : sciences, robotique, sport, culture et engagement environnemental."
        breadcrumbs={[
          { label: "Vie au LSY", href: "/vie-au-lysee/internat" },
          { label: "Clubs" },
        ]}
        pattern="constellation"
      />

      <section className="bg-lsy-paper py-20 lg:py-28">
        <Container className="space-y-12">
          <Reveal>
            <SectionHeader
              eyebrow="Vie extrascolaire"
              title="S'épanouir au-delà des cours"
              body="Les clubs du LSY permettent aux élèves de cultiver leurs passions, développer leur leadership et s'ouvrir sur le monde."
            />
          </Reveal>

          <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
            {clubs.map((club) => {
              const Icon = ICON_MAP[club.icon] ?? FlaskConical;
              return (
                <StaggerItem key={club.name}>
                  <div className="flex h-full flex-col rounded-3xl bg-white p-6 shadow-soft ring-1 ring-lsy-line">
                    <div className="mb-4 flex items-start gap-4">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-lsy-blue-950">
                        <Icon className="size-5 text-lsy-gold-400" aria-hidden />
                      </div>
                      <div>
                        <p className="font-bold text-lsy-blue-900">{club.name}</p>
                        <span
                          className={`inline-block rounded-full px-2 py-0.5 text-[0.62rem] font-bold ${CATEGORY_COLORS[club.category] ?? "bg-lsy-ivory text-lsy-blue-900"}`}
                        >
                          {CATEGORY_LABELS[club.category] ?? club.category}
                        </span>
                      </div>
                    </div>

                    <p className="flex-1 text-sm leading-relaxed text-lsy-muted">{club.description}</p>

                    <div className="mt-4 border-t border-lsy-line pt-4">
                      <p className="mb-2 text-[0.68rem] font-bold uppercase tracking-widest text-lsy-gold-600">
                        Activités
                      </p>
                      <ul className="space-y-1">
                        {club.activities.map((act) => (
                          <li key={act} className="flex items-start gap-2 text-xs text-lsy-muted">
                            <span className="mt-1.5 size-1 shrink-0 rounded-full bg-lsy-gold-400" />
                            {act}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </Container>
      </section>

      <CTASection
        eyebrow="Sport & culture"
        title="Découvrez les activités sportives et culturelles"
        buttons={[
          { label: "Sport et culture", href: "/vie-au-lysee/sport-et-culture", primary: true },
          { label: "Vie à l'internat", href: "/vie-au-lysee/internat" },
        ]}
      />
    </PageShell>
  );
}
