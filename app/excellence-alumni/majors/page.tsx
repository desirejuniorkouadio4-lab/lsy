import type { Metadata } from "next";
import { GraduationCap, Medal, Quote } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { CTASection } from "@/components/sections/CTASection";
import { Reveal } from "@/components/animations/Reveal";
import { Stagger, StaggerItem } from "@/components/animations/Stagger";
import { db } from "@/lib/db";

export const metadata: Metadata = {
  title: "Palmarès des majors",
  description: "Les majors de promotion du Lycée Scientifique de Yamoussoukro.",
};

async function getMajors() {
  return db.major.findMany({
    orderBy: [{ year: "desc" }, { average: "desc" }],
    take: 24,
  });
}

export default async function MajorsPage() {
  const majors = await getMajors();

  const byYear = majors.reduce<Record<string, typeof majors>>((acc, m) => {
    if (!acc[m.year]) acc[m.year] = [];
    acc[m.year].push(m);
    return acc;
  }, {});

  const years = Object.keys(byYear).sort((a, b) => b.localeCompare(a));

  return (
    <PageShell flush>
      <PageHero
        eyebrow="Excellence & Alumni"
        title="Palmarès des majors"
        body="Les meilleurs élèves du Lycée Scientifique de Yamoussoukro, promotion par promotion, témoins de l'excellence qui caractérise cette institution."
        breadcrumbs={[
          { label: "Excellence & Alumni", href: "/excellence-alumni/majors" },
          { label: "Majors" },
        ]}
        pattern="constellation"
      />

      <section className="bg-lsy-paper py-20 lg:py-28">
        <Container className="space-y-16">
          {years.length === 0 ? (
            <Reveal>
              <div className="rounded-3xl border border-dashed border-lsy-line py-16 text-center">
                <Medal className="mx-auto mb-3 size-10 text-lsy-muted/40" aria-hidden />
                <p className="font-semibold text-lsy-blue-900">Palmarès en cours de publication</p>
                <p className="mt-1 text-sm text-lsy-muted">
                  Les majors de promotion seront affichés dès validation par l&apos;administration.
                </p>
              </div>
            </Reveal>
          ) : (
            years.map((year) => (
              <div key={year} className="space-y-6">
                <Reveal>
                  <SectionHeader eyebrow="Promotion" title={`Majors ${year}`} />
                </Reveal>
                <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
                  {byYear[year].map((major) => {
                    const initials = major.name
                      .split(" ")
                      .slice(0, 2)
                      .map((w) => w[0])
                      .join("")
                      .toUpperCase();

                    return (
                      <StaggerItem key={major.id}>
                        <div className="flex h-full flex-col rounded-3xl bg-white p-6 shadow-soft ring-1 ring-lsy-line">
                          {/* Avatar + info */}
                          <div className="mb-4 flex items-center gap-4">
                            <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-lsy-blue-950 font-display text-xl font-bold text-lsy-gold-400">
                              {initials}
                            </div>
                            <div>
                              <p className="font-bold text-lsy-blue-900">{major.name}</p>
                              <p className="text-xs text-lsy-muted">{major.className}</p>
                              {major.average && (
                                <p className="mt-0.5 text-xs font-semibold text-lsy-gold-600">
                                  Moy. {major.average}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Témoignage */}
                          {major.testimony && (
                            <div className="relative rounded-xl bg-lsy-ivory p-4 pl-5">
                              <Quote
                                className="absolute left-2 top-2 size-3 text-lsy-gold-400"
                                aria-hidden
                              />
                              <p className="text-[0.82rem] leading-relaxed text-lsy-slate italic">
                                {major.testimony}
                              </p>
                            </div>
                          )}

                          {/* Badge major */}
                          <div className="mt-auto pt-4">
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-lsy-gold-500 px-3 py-0.5 text-[0.65rem] font-bold text-lsy-blue-950">
                              <GraduationCap className="size-3" aria-hidden />
                              Major de promotion {year}
                            </span>
                          </div>
                        </div>
                      </StaggerItem>
                    );
                  })}
                </Stagger>
              </div>
            ))
          )}
        </Container>
      </section>

      <CTASection
        eyebrow="Réseau alumni"
        title="Vous êtes ancien élève du LSY ?"
        body="Rejoignez le réseau des anciens élèves et participez à l'élan de la nouvelle génération."
        buttons={[
          { label: "Rejoindre le réseau", href: "/excellence-alumni/anciens-eleves", primary: true },
          { label: "Résultats", href: "/excellence-alumni/resultats" },
        ]}
      />
    </PageShell>
  );
}
