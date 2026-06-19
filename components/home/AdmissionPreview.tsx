import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  FileText,
  GraduationCap,
  HelpCircle,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/animations/Reveal";
import { Stagger, StaggerItem } from "@/components/animations/Stagger";

const VOIES = [
  {
    level: "Entrée en 4e",
    icon: GraduationCap,
    color: "bg-lsy-blue-900",
    tagline: "Pour les élèves de 5e à fort potentiel",
    conditions: [
      "Être scolarisé en classe de 5e",
      "Excellents résultats en mathématiques",
      "Dossier déposé via la DELC",
      "Sélection sur critères académiques",
    ],
    href: "/admissions/entree-en-4e",
  },
  {
    level: "Entrée en seconde",
    icon: GraduationCap,
    color: "bg-lsy-gold-500",
    tagline: "Pour les titulaires du BEPC avec mention",
    conditions: [
      "Titulaire du BEPC",
      "Niveau scientifique élevé requis",
      "Bulletin scolaire solide",
      "Candidature via procédure officielle",
    ],
    href: "/admissions/entree-en-seconde",
  },
];

const QUICK_LINKS = [
  { label: "Calendrier des admissions", icon: CalendarDays, href: "/admissions/calendrier" },
  { label: "Documents à fournir", icon: FileText, href: "/admissions/documents" },
  { label: "FAQ admissions", icon: HelpCircle, href: "/admissions/faq" },
];

export function AdmissionPreview() {
  return (
    <section
      aria-label="Admissions au LSY"
      className="bg-lsy-paper py-20 lg:py-28"
    >
      <Container>
        <Reveal>
          <div className="max-w-xl space-y-3 mb-12">
            <Eyebrow>Admissions</Eyebrow>
            <h2 className="font-display text-4xl font-bold leading-tight text-lsy-blue-900 lg:text-5xl">
              Rejoindre le LSY
            </h2>
            <p className="text-[1.05rem] leading-relaxed text-lsy-slate">
              Le Lycée Scientifique de Yamoussoukro recrute les meilleurs profils
              scientifiques à deux niveaux. Une sélection exigeante pour
              une formation d&apos;excellence.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-[1fr_1fr_auto]">
          {/* Cartes des deux voies */}
          <Stagger className="grid gap-6 sm:grid-cols-2 lg:col-span-2" stagger={0.12}>
            {VOIES.map((voie) => {
              const Icon = voie.icon;
              const isDark = voie.color === "bg-lsy-blue-900";
              return (
                <StaggerItem key={voie.level}>
                  <div
                    className={`group flex h-full flex-col justify-between rounded-3xl p-7 ${voie.color} ${isDark ? "text-white" : "text-lsy-blue-950"}`}
                  >
                    <div className="space-y-4">
                      <span
                        className={`inline-flex size-12 items-center justify-center rounded-2xl ${isDark ? "bg-white/10" : "bg-lsy-blue-900/10"}`}
                      >
                        <Icon className="size-6" aria-hidden />
                      </span>
                      <div>
                        <p
                          className={`text-[0.72rem] font-bold uppercase tracking-[0.18em] ${isDark ? "text-lsy-gold-300" : "text-lsy-blue-800"} mb-1`}
                        >
                          {voie.tagline}
                        </p>
                        <h3 className="font-display text-2xl font-bold">
                          {voie.level}
                        </h3>
                      </div>
                      <ul className="space-y-2.5">
                        {voie.conditions.map((c) => (
                          <li key={c} className="flex items-start gap-2.5 text-sm">
                            <CheckCircle2
                              className={`mt-0.5 size-4 shrink-0 ${isDark ? "text-lsy-gold-400" : "text-lsy-blue-800"}`}
                              aria-hidden
                            />
                            <span className={isDark ? "text-white/80" : "text-lsy-slate"}>
                              {c}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Link
                      href={voie.href}
                      className={`mt-6 inline-flex items-center gap-2 text-sm font-bold transition-colors ${isDark ? "text-lsy-gold-300 hover:text-lsy-gold-200" : "text-lsy-blue-900 hover:text-lsy-blue-700"}`}
                    >
                      En savoir plus
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                    </Link>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>

          {/* Liens rapides verticaux */}
          <Reveal delay={0.2}>
            <div className="flex flex-col justify-between rounded-3xl border border-lsy-line bg-lsy-ivory p-6 lg:min-w-[14rem]">
              <div className="space-y-2">
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-lsy-muted">
                  Ressources utiles
                </p>
                <ul className="space-y-1.5 pt-2">
                  {QUICK_LINKS.map((ql) => {
                    const Icon = ql.icon;
                    return (
                      <li key={ql.href}>
                        <Link
                          href={ql.href}
                          className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-lsy-blue-900 transition-colors hover:bg-white"
                        >
                          <Icon className="size-4 shrink-0 text-lsy-gold-600" aria-hidden />
                          {ql.label}
                          <ArrowRight className="ml-auto size-3.5 text-lsy-muted opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" aria-hidden />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="mt-6 rounded-2xl bg-lsy-blue-900 p-4 text-white">
                <p className="text-xs font-semibold text-lsy-gold-300 mb-1">Vue d&apos;ensemble</p>
                <p className="text-sm font-bold leading-snug mb-3">
                  Tout ce qu&apos;il faut savoir pour candidater
                </p>
                <Link
                  href="/admissions/vue-d-ensemble"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-lsy-gold-300 hover:text-lsy-gold-200"
                >
                  Commencer ici <ArrowRight className="size-3.5" aria-hidden />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
