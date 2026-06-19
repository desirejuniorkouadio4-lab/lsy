import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Quote } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";

export function PrincipalMessage() {
  return (
    <section className="bg-lsy-blue-950 py-20 text-white lg:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">

          {/* Photo du proviseur */}
          <Reveal>
            <div className="relative mx-auto max-w-[18rem] lg:max-w-none">
              {/* Cadre décoratif doré décalé */}
              <div
                aria-hidden
                className="absolute -bottom-5 -right-5 h-full w-full rounded-2xl border-2 border-lsy-gold-500/25"
              />
              {/* Photo */}
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                <Image
                  src="/brand/Proviseur.jpg"
                  alt="Le Proviseur du Lycée Scientifique de Yamoussoukro"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 288px, 420px"
                />
                {/* Dégradé bas */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-lsy-blue-950/60 to-transparent" />
              </div>
              {/* Badge LSY */}
              <div className="absolute -left-4 -top-4 flex size-14 items-center justify-center rounded-xl bg-lsy-gold-500 shadow-gold">
                <span className="font-display text-xs font-black text-lsy-blue-950 leading-none text-center">
                  LSY
                </span>
              </div>
            </div>
          </Reveal>

          {/* Message */}
          <Reveal delay={0.1}>
            <div className="flex flex-col gap-6">
              {/* Eyebrow */}
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-lsy-gold-400">
                Mot du Proviseur
              </p>

              <h2 className="font-display text-3xl font-bold leading-tight lg:text-4xl">
                Un message de <br className="hidden sm:block" />
                notre direction
              </h2>

              {/* Citation */}
              <div className="relative rounded-2xl border border-white/10 bg-white/5 p-6 pt-8 backdrop-blur-sm">
                <Quote
                  aria-hidden
                  className="absolute -top-3 left-6 size-7 fill-lsy-gold-500 text-lsy-gold-500"
                />
                <p className="text-base leading-relaxed text-white/80 lg:text-lg">
                  Le Lycée Scientifique de Yamoussoukro est bien plus qu&apos;un
                  établissement scolaire. C&apos;est un creuset où se forgent les
                  élites scientifiques et technologiques de demain. Notre engagement
                  est de fournir à chaque élève les outils intellectuels et humains
                  pour exceller et servir notre nation.
                </p>
              </div>

              {/* Identité */}
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-white/10" />
                <div>
                  <p className="font-bold text-white">La Direction du Lycée</p>
                  <p className="text-sm text-white/45">
                    Proviseur — Lycée Scientifique de Yamoussoukro
                  </p>
                </div>
              </div>

              {/* CTA */}
              <div>
                <Link
                  href="/le-lycee/mot-du-proviseur"
                  className="inline-flex items-center gap-2 rounded-full border border-lsy-gold-500/30 px-5 py-2.5 text-sm font-semibold text-lsy-gold-300 transition-all hover:border-lsy-gold-500/60 hover:bg-lsy-gold-500/10 hover:text-lsy-gold-200"
                >
                  Lire le message complet
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
