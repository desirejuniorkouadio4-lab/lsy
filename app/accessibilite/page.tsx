import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";

export const metadata: Metadata = {
  title: "Accessibilité",
  description: "Déclaration d'accessibilité du site web du Lycée Scientifique de Yamoussoukro.",
};

export default function AccessibilitePage() {
  return (
    <PageShell flush>
      <PageHero
        eyebrow="Informations légales"
        title="Accessibilité"
        breadcrumbs={[{ label: "Accessibilité" }]}
        pattern="wave"
      />
      <section className="bg-lsy-paper py-20 lg:py-24">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-3xl prose prose-headings:font-display prose-headings:text-lsy-blue-900 prose-a:text-lsy-blue-700 text-lsy-slate">
              <h2>Déclaration d&apos;accessibilité</h2>
              <p>
                Le Lycée Scientifique de Yamoussoukro s&apos;engage à rendre son site internet
                accessible à toutes et à tous, conformément aux recommandations du Web Content
                Accessibility Guidelines (WCAG 2.1).
              </p>

              <h2>État de conformité</h2>
              <p>
                Ce site est partiellement conforme aux normes WCAG 2.1 niveau AA.
                Des améliorations continues sont apportées pour atteindre une conformité totale.
              </p>

              <h2>Fonctionnalités d&apos;accessibilité</h2>
              <ul>
                <li>Respect de la préférence système de réduction des animations (<code>prefers-reduced-motion</code>)</li>
                <li>Textes alternatifs sur les images significatives</li>
                <li>Navigation au clavier entièrement fonctionnelle</li>
                <li>Contrastes de couleurs conformes aux niveaux AA</li>
                <li>Structure sémantique HTML avec titres hiérarchiques</li>
                <li>Attributs ARIA sur les éléments interactifs</li>
              </ul>

              <h2>Signaler un problème</h2>
              <p>
                Si vous rencontrez une difficulté d&apos;accès à une partie de ce site,
                contactez-nous via{" "}
                <a href="/contact">le formulaire de contact</a>.
                Nous nous engageons à répondre dans un délai de 5 jours ouvrés.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>
    </PageShell>
  );
}
