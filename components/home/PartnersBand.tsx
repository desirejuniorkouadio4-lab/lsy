import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Building2, Handshake } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/animations/Reveal";
import { db } from "@/lib/db";

async function getPartners() {
  const dbPartners = await db.partner.findMany({
    where: { isActive: true },
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
  });

  // Partenaires par défaut si la DB est vide
  if (dbPartners.length === 0) {
    return [
      { id: "1", name: "Ministère de l'Éducation Nationale", acronym: "MEN", logoUrl: null, website: null, category: "Tutelle" },
      { id: "2", name: "Direction des Établissements Scolaires", acronym: "DELC", logoUrl: null, website: null, category: "Administration" },
      { id: "3", name: "Direction Régionale de l'Éducation", acronym: "DREN", logoUrl: null, website: null, category: "Régional" },
      { id: "4", name: "Centre National de Développement Scientifique", acronym: "CNDS", logoUrl: null, website: null, category: "Scientifique" },
      { id: "5", name: "Comité de Gestion des Établissements", acronym: "COGES", logoUrl: null, website: null, category: "Gestion" },
      { id: "6", name: "Association des Parents d'Élèves", acronym: "APE", logoUrl: null, website: null, category: "Communauté" },
    ];
  }
  return dbPartners;
}

export async function PartnersBand() {
  const partners = await getPartners();

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
              href="/soutenir"
              className="inline-flex items-center gap-2 text-sm font-semibold text-lsy-blue-800 hover:text-lsy-blue-900"
            >
              Devenir partenaire
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {partners.map((p) => {
              const card = (
                <div className="flex flex-col items-center gap-2.5 rounded-2xl border border-lsy-line bg-white p-4 text-center transition-all hover:border-lsy-blue-700/25 hover:shadow-soft">
                  {/* Logo ou fallback icône */}
                  <div className="relative flex size-14 items-center justify-center overflow-hidden rounded-xl bg-lsy-blue-900/5">
                    {p.logoUrl ? (
                      <Image
                        src={p.logoUrl}
                        alt={`Logo ${p.name}`}
                        fill
                        className="object-contain p-1.5"
                        sizes="56px"
                      />
                    ) : (
                      <Building2 className="size-6 text-lsy-blue-700/50" aria-hidden />
                    )}
                  </div>
                  <p className="font-display text-sm font-bold text-lsy-blue-900">
                    {p.acronym ?? p.name.split(" ").slice(0, 2).join(" ")}
                  </p>
                  <p className="line-clamp-2 text-[0.65rem] leading-tight text-lsy-muted">
                    {p.name}
                  </p>
                  {p.category && (
                    <span className="inline-block rounded-full bg-lsy-ivory px-2 py-0.5 text-[0.6rem] font-semibold text-lsy-slate">
                      {p.category}
                    </span>
                  )}
                </div>
              );

              return p.website ? (
                <Link key={p.id} href={p.website} target="_blank" rel="noopener noreferrer">
                  {card}
                </Link>
              ) : (
                <div key={p.id}>{card}</div>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-8 flex flex-col items-center gap-4 rounded-3xl border border-lsy-blue-900/10 bg-lsy-blue-900/4 p-8 text-center sm:flex-row sm:text-left">
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
              href="/soutenir"
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
