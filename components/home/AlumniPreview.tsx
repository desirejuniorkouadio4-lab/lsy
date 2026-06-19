import Link from "next/link";
import { ArrowRight, Quote, UserCheck, Users } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/animations/Reveal";
import { Stagger, StaggerItem } from "@/components/animations/Stagger";
import { db } from "@/lib/db";

async function getMajors() {
  return db.major.findMany({
    orderBy: { year: "desc" },
    take: 3,
  });
}

export async function AlumniPreview() {
  const majors = await getMajors();

  return (
    <section
      aria-label="Excellence & Alumni"
      className="bg-lsy-ivory py-20 lg:py-28"
    >
      <Container>
        <div className="grid gap-14 lg:grid-cols-[2fr_1.2fr] lg:gap-12 lg:items-start">
          {/* Majors */}
          <div className="space-y-6">
            <Reveal>
              <div className="space-y-3">
                <Eyebrow>Excellence & Alumni</Eyebrow>
                <h2 className="font-display text-4xl font-bold leading-tight text-lsy-blue-900 lg:text-5xl">
                  Ils incarnent l&apos;excellence
                </h2>
                <p className="text-[1.02rem] leading-relaxed text-lsy-slate">
                  Chaque promotion du LSY révèle des profils d&apos;exception.
                  Découvrez les majors de notre palmarès et les parcours inspirants
                  de nos anciens élèves.
                </p>
              </div>
            </Reveal>

            {majors.length === 0 ? (
              <p className="rounded-2xl border border-lsy-line p-6 text-sm text-lsy-muted">
                Le palmarès des majors sera publié prochainement.
              </p>
            ) : (
              <Stagger className="space-y-4" stagger={0.1}>
                {majors.map((major) => (
                  <StaggerItem key={major.id}>
                    <div className="group rounded-2xl bg-white p-5 shadow-soft ring-1 ring-lsy-line transition-shadow hover:shadow-card">
                      <div className="flex items-start gap-4">
                        {/* Initiales */}
                        <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-lsy-blue-900 font-display text-lg font-bold text-white">
                          {major.name
                            .split(" ")
                            .slice(-2)
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="font-bold text-lsy-blue-900">{major.name}</p>
                            {major.isDemo && (
                              <Badge variant="muted" className="text-[0.65rem]">
                                Exemple
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-lsy-muted">
                            {major.className} · Promotion {major.year}
                            {major.average && ` · ${major.average}`}
                          </p>
                          {major.testimony && (
                            <blockquote className="mt-3 flex gap-2 text-sm italic leading-relaxed text-lsy-slate">
                              <Quote
                                className="mt-0.5 size-4 shrink-0 text-lsy-gold-500"
                                aria-hidden
                              />
                              <p className="line-clamp-2">{major.testimony}</p>
                            </blockquote>
                          )}
                        </div>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            )}

            <Reveal delay={0.3}>
              <Link
                href="/excellence-alumni/majors"
                className="inline-flex items-center gap-2 font-semibold text-lsy-blue-800 hover:text-lsy-blue-900"
              >
                Voir tout le palmarès
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Reveal>
          </div>

          {/* Réseau alumni + mentorat */}
          <div className="space-y-4">
            <Reveal delay={0.15}>
              <div className="rounded-3xl bg-lsy-blue-900 p-7 text-white">
                <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-lsy-gold-500/15">
                  <Users className="size-6 text-lsy-gold-400" aria-hidden />
                </div>
                <p className="text-[0.72rem] font-bold uppercase tracking-[0.18em] text-lsy-gold-300 mb-2">
                  Réseau alumni
                </p>
                <h3 className="font-display text-2xl font-bold mb-3">
                  Rejoindre la communauté
                </h3>
                <p className="text-sm leading-relaxed text-white/60 mb-5">
                  Vous avez été élève au LSY ? Inscrivez-vous au réseau alumni,
                  partagez votre parcours et contribuez à l&apos;avenir de
                  l&apos;établissement.
                </p>
                <Link
                  href="/excellence-alumni/anciens-eleves"
                  className="inline-flex items-center gap-2 rounded-full bg-lsy-gold-500 px-5 py-2.5 text-sm font-bold text-lsy-blue-950 transition-colors hover:bg-lsy-gold-400"
                >
                  Rejoindre le réseau
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.22}>
              <div className="rounded-3xl border border-lsy-line bg-white p-7">
                <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-lsy-blue-900/5">
                  <UserCheck className="size-6 text-lsy-blue-800" aria-hidden />
                </div>
                <p className="text-[0.72rem] font-bold uppercase tracking-[0.18em] text-lsy-muted mb-2">
                  Mentorat
                </p>
                <h3 className="font-display text-xl font-bold text-lsy-blue-900 mb-3">
                  Inspirer la prochaine génération
                </h3>
                <p className="text-sm leading-relaxed text-lsy-slate mb-5">
                  Devenez mentor pour accompagner les élèves actuels du LSY
                  dans leur orientation et leur développement personnel.
                </p>
                <Link
                  href="/excellence-alumni/mentorat"
                  className="inline-flex items-center gap-2 text-sm font-bold text-lsy-blue-800 hover:text-lsy-blue-900"
                >
                  Devenir mentor
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
