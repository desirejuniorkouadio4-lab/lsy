import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/animations/Reveal";
import { Stagger, StaggerItem } from "@/components/animations/Stagger";

const MILESTONES = [
  {
    year: "1975",
    title: "Fondation",
    body: "Création du Lycée Scientifique de Yamoussoukro dans la capitale politique de la Côte d'Ivoire, pour former les futures élites scientifiques du pays.",
    accent: "bg-lsy-gold-500",
  },
  {
    year: "1978",
    title: "Inauguration",
    body: "Inauguration officielle et accueil des premières promotions d'élèves, sélectionnés sur critères d'excellence à l'échelle nationale.",
    accent: "bg-lsy-blue-700",
  },
  {
    year: "50 ans",
    title: "D'excellence",
    body: "Un demi-siècle de formation scientifique de haut niveau, de majors au Baccalauréat et de diplômés intégrés dans les plus grandes universités.",
    accent: "bg-lsy-success",
  },
  {
    year: "2024+",
    title: "Nouvelle ère",
    body: "Lancement du projet de réhabilitation et de modernisation des infrastructures, pour hisser le LSY au niveau des établissements scientifiques de référence en Afrique.",
    accent: "bg-lsy-orange",
  },
];

export function LegacySection() {
  return (
    <section
      aria-label="Héritage du LSY"
      className="bg-lsy-ivory py-20 lg:py-28"
    >
      <Container>
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20 lg:items-center">
          {/* Texte éditorial */}
          <Reveal>
            <div className="space-y-6 max-w-lg">
              <Eyebrow>Notre héritage</Eyebrow>
              <h2 className="font-display text-4xl font-bold leading-tight text-lsy-blue-900 lg:text-5xl">
                Près de 50 ans au service de la science
              </h2>
              <p className="text-[1.05rem] leading-relaxed text-lsy-slate">
                Fondé en 1975 et inauguré en 1978, le Lycée Scientifique de
                Yamoussoukro est l&apos;un des établissements d&apos;excellence les plus
                anciens et les plus emblématiques de Côte d&apos;Ivoire.
              </p>
              <p className="text-[1.05rem] leading-relaxed text-lsy-slate">
                Depuis sa création, il a formé des générations d&apos;élèves
                brillants qui occupent aujourd&apos;hui des positions clés dans les
                secteurs scientifiques, technologiques et académiques à travers
                le continent africain et dans le monde.
              </p>
              <Link
                href="/le-lycee/histoire"
                className="inline-flex items-center gap-2 font-semibold text-lsy-blue-800 hover:text-lsy-blue-900"
              >
                Découvrir notre histoire complète
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </Reveal>

          {/* Timeline */}
          <Stagger className="space-y-4" stagger={0.1}>
            {MILESTONES.map((m) => (
              <StaggerItem key={m.year}>
                <div className="flex gap-5 rounded-2xl bg-white p-5 shadow-soft ring-1 ring-lsy-line transition-shadow hover:shadow-card">
                  <div className="flex flex-col items-center gap-2">
                    <span
                      className={`inline-flex h-12 w-14 shrink-0 items-center justify-center rounded-xl ${m.accent} font-display text-base font-bold text-white`}
                    >
                      {m.year}
                    </span>
                    <div className="w-0.5 flex-1 rounded-full bg-lsy-line" />
                  </div>
                  <div className="space-y-1 pt-1">
                    <p className="font-bold text-lsy-blue-900">{m.title}</p>
                    <p className="text-sm leading-relaxed text-lsy-muted">
                      {m.body}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Container>
    </section>
  );
}
