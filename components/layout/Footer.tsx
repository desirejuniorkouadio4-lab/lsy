import Link from "next/link";
import { ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import { LogoLSY } from "@/components/brand/LogoLSY";
import { DigitalAccessSignature } from "@/components/brand/DigitalAccessSignature";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/site";

function ColHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-4 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-lsy-gold-300">
      {children}
    </h3>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="text-[0.875rem] text-white/50 transition-colors hover:text-lsy-gold-300"
      >
        {children}
      </Link>
    </li>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  const hasSocial = Object.values(site.social).some(Boolean);

  return (
    <footer
      aria-label="Pied de page"
      className="bg-lsy-blue-950 text-white"
    >
      {/* Liseré tricolore — rappel ivoirien */}
      <div className="rule-civ h-1 w-full" aria-hidden />

      {/* Corps principal */}
      <Container className="py-14 lg:py-20">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.9fr_1fr_1fr_1fr_1.4fr] lg:gap-8">

          {/* Colonne 1 — Identité institutionnelle */}
          <div className="space-y-5 sm:col-span-2 lg:col-span-1">
            <LogoLSY variant="onDark" size="md" href="/" />
            <p className="max-w-[24ch] text-sm leading-relaxed text-white/55">
              {site.tagline}
            </p>
            <p className="text-xs text-white/30">
              Fondé en&nbsp;{site.foundedYear}&ensp;·&ensp;Inauguré en&nbsp;
              {site.inaugurationYear}
            </p>

            {/* Réseaux sociaux (affichés si renseignés) */}
            {hasSocial && (
              <div className="flex flex-wrap gap-2 pt-1">
                {site.social.facebook && (
                  <a
                    href={site.social.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-white/10 px-3 py-1.5 text-xs font-semibold text-white/50 transition-colors hover:border-lsy-gold-500/40 hover:text-lsy-gold-300"
                  >
                    Facebook
                  </a>
                )}
                {site.social.youtube && (
                  <a
                    href={site.social.youtube}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-white/10 px-3 py-1.5 text-xs font-semibold text-white/50 transition-colors hover:border-lsy-gold-500/40 hover:text-lsy-gold-300"
                  >
                    YouTube
                  </a>
                )}
                {site.social.linkedin && (
                  <a
                    href={site.social.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-white/10 px-3 py-1.5 text-xs font-semibold text-white/50 transition-colors hover:border-lsy-gold-500/40 hover:text-lsy-gold-300"
                  >
                    LinkedIn
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Colonne 2 — Accès rapides */}
          <div>
            <ColHeading>Accès rapides</ColHeading>
            <ul className="space-y-2.5">
              <NavLink href="/admissions/entree-en-4e">Admission en 4e</NavLink>
              <NavLink href="/admissions/entree-en-seconde">Admission en seconde</NavLink>
              <NavLink href="/actualites/communiques">Communiqués</NavLink>
              <NavLink href="/documents">Documents utiles</NavLink>
              <NavLink href="/calendrier">Calendrier scolaire</NavLink>
              <NavLink href="/portail">Portail élèves</NavLink>
              <NavLink href="/contact">Nous contacter</NavLink>
            </ul>
          </div>

          {/* Colonne 3 — Le Lycée */}
          <div>
            <ColHeading>Le Lycée</ColHeading>
            <ul className="space-y-2.5">
              <NavLink href="/le-lycee/presentation">Présentation</NavLink>
              <NavLink href="/le-lycee/mot-du-proviseur">Mot du Proviseur</NavLink>
              <NavLink href="/le-lycee/histoire">Histoire</NavLink>
              <NavLink href="/le-lycee/mission-vision-valeurs">Mission & Valeurs</NavLink>
              <NavLink href="/le-lycee/administration">Administration</NavLink>
              <NavLink href="/le-lycee/infrastructures">Infrastructures</NavLink>
              <NavLink href="/le-lycee/rehabilitation">Réhabilitation</NavLink>
            </ul>
          </div>

          {/* Colonne 4 — Ressources */}
          <div>
            <ColHeading>Ressources</ColHeading>
            <ul className="space-y-2.5">
              <NavLink href="/academie-innovation/programmes">Programmes</NavLink>
              <NavLink href="/academie-innovation/ressources-pedagogiques">
                Ressources pédagogiques
              </NavLink>
              <NavLink href="/academie-innovation/examens-et-concours">
                Examens & concours
              </NavLink>
              <NavLink href="/excellence-alumni/majors">Palmarès des majors</NavLink>
              <NavLink href="/medias/galerie">Galerie photos</NavLink>
              <NavLink href="/medias/web-tv">Web TV</NavLink>
              <NavLink href="/admissions/faq">FAQ admissions</NavLink>
            </ul>
          </div>

          {/* Colonne 5 — Contact */}
          <div>
            <ColHeading>Contact</ColHeading>
            <address className="not-italic space-y-4">
              <div className="flex items-start gap-3 text-sm text-white/55">
                <MapPin
                  className="mt-0.5 size-4 shrink-0 text-lsy-gold-400"
                  aria-hidden
                />
                <div>
                  <p>Yamoussoukro</p>
                  <p>Côte d&apos;Ivoire</p>
                  <p className="mt-1 text-xs text-white/30">
                    Adresse complète à confirmer
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <Mail
                  className="size-4 shrink-0 text-lsy-gold-400"
                  aria-hidden
                />
                <a
                  href={`mailto:${site.contact.email}`}
                  className="text-white/55 transition-colors hover:text-lsy-gold-300"
                >
                  {site.contact.email}
                </a>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <Phone
                  className="size-4 shrink-0 text-lsy-gold-400"
                  aria-hidden
                />
                {site.contact.phoneHref ? (
                  <a
                    href={`tel:${site.contact.phoneHref}`}
                    className="text-white/55 transition-colors hover:text-lsy-gold-300"
                  >
                    {site.contact.phoneDisplay}
                  </a>
                ) : (
                  <span className="italic text-white/30">
                    {site.contact.phoneDisplay}
                  </span>
                )}
              </div>

              <a
                href={site.contact.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-lsy-gold-500/25 px-4 py-2 text-xs font-semibold text-lsy-gold-300 transition-all hover:border-lsy-gold-400/50 hover:text-lsy-gold-300"
              >
                <MapPin className="size-3.5" aria-hidden />
                Voir sur Google Maps
                <ExternalLink className="size-3 text-white/30" aria-hidden />
              </a>
            </address>
          </div>
        </div>
      </Container>

      {/* Barre de bas — légal + signature */}
      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-3 py-5 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year}&ensp;{site.name}&ensp;—&ensp;Tous droits réservés.
          </p>
          <nav aria-label="Liens légaux" className="flex flex-wrap gap-x-5 gap-y-1">
            <Link
              href="/mentions-legales"
              className="transition-colors hover:text-white/65"
            >
              Mentions légales
            </Link>
            <Link
              href="/politique-de-confidentialite"
              className="transition-colors hover:text-white/65"
            >
              Politique de confidentialité
            </Link>
          </nav>
          <DigitalAccessSignature variant="onDark" />
        </Container>
      </div>
    </footer>
  );
}
