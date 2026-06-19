import Link from "next/link";
import { ArrowRight, Building2, Handshake } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/animations/Reveal";

const PARTNERS = [
  {
    acronym: "MEN",
    name: "Ministère de l'Éducation Nationale",
    category: "Tutelle",
  },
  {
    acronym: "DELC",
    name: "Direction des Établissements et de la Logistique Centralisée",
    category: "Administration",
  },
  {
    acronym: "DREN",
    name: "Direction Régionale de l'Éducation Nationale",
    category: "Régional",
  },
  {
    acronym: "CNDS",
    name: "Centre National de Développement Scientifique",
    category: "Scientifique",
  },
  {
    acronym: "COGES",
    name: "Comité de Gestion des Établissements Scolaires",
    category: "Gestion",
  },
  {
    acronym: "APE",
    name: "Association des Parents d'Élèves",
    category: "Communauté",
  },
];

export function PartnersBand() {
  return (
    <section
      aria-label="Partenaires institutionnels"
      className="bg-lsy-paper py-16 lg:py-20"
    >
      <Container>
        <Reveal>
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-2">
              <Eyebrow>Partenaires & soutiens</Eyebrow>
              <h2 className="font-display text-3xl font-bold text-lsy-blue-900 lg:text-4xl">
                Nos partenaires institutionnels
              </h2>
            </div>
            <Link
              href="/soutenir/partenaires"
              className="inline-flex items-center gap-2 text-sm font-semibold text-lsy-blue-800 hover:text-lsy-blue-900"
            >
              Devenir partenaire
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {PARTNERS.map((p) => (
              <div
                key={p.acronym}
                className="flex flex-col items-center gap-2.5 rounded-2xl border border-lsy-line bg-white p-4 text-center transition-all hover:border-lsy-blue-700/25 hover:shadow-soft"
              >
                <div className="flex size-12 items-center justify-center rounded-xl bg-lsy-blue-900/5 text-lsy-blue-800">
                  <Building2 className="size-5" aria-hidden />
                </div>
                <p className="font-display text-base font-bold text-lsy-blue-900">
                  {p.acronym}
                </p>
                <p className="text-[0.68rem] leading-tight text-lsy-muted">
                  {p.name}
                </p>
                <span className="inline-block rounded-full bg-lsy-ivory px-2 py-0.5 text-[0.62rem] font-semibold text-lsy-slate">
                  {p.category}
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        {/* CTA Devenir partenaire */}
        <Reveal delay={0.2}>
          <div className="mt-8 flex flex-col items-center gap-4 rounded-3xl bg-lsy-blue-900/4 border border-lsy-blue-900/10 p-8 text-center sm:flex-row sm:text-left">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-lsy-gold-500">
              <Handshake className="size-7 text-lsy-blue-950" aria-hidden />
            </div>
            <div className="flex-1">
              <p className="font-bold text-lsy-blue-900">
                Votre organisation souhaite soutenir le LSY ?
              </p>
              <p className="mt-1 text-sm text-lsy-slate">
                Entreprises, fondations et institutions — plusieurs modalités de
                partenariat sont disponibles pour contribuer à l&apos;excellence
                scientifique nationale.
              </p>
            </div>
            <Link
              href="/soutenir/partenaires"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-lsy-blue-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-lsy-blue-800"
            >
              Nous contacter
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
