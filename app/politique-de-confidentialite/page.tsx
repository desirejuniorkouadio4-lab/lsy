import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Politique de confidentialité du site web du Lycée Scientifique de Yamoussoukro.",
};

export default function PolitiqueConfidentialitePage() {
  return (
    <PageShell flush>
      <PageHero
        eyebrow="Informations légales"
        title="Politique de confidentialité"
        breadcrumbs={[{ label: "Politique de confidentialité" }]}
        pattern="wave"
      />
      <section className="bg-lsy-paper py-20 lg:py-24">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-3xl prose prose-headings:font-display prose-headings:text-lsy-blue-900 prose-a:text-lsy-blue-700 text-lsy-slate">
              <h2>Collecte des données personnelles</h2>
              <p>
                Le site du Lycée Scientifique de Yamoussoukro collecte uniquement les données
                personnelles fournies volontairement par les utilisateurs via les formulaires
                de contact, d&apos;inscription alumni ou de candidature à l&apos;admission.
              </p>

              <h2>Finalité du traitement</h2>
              <p>Les données collectées sont utilisées exclusivement pour :</p>
              <ul>
                <li>Répondre aux demandes de contact</li>
                <li>Gérer les candidatures d&apos;admission</li>
                <li>Constituer et animer le réseau alumni</li>
                <li>Diffuser les communications officielles du lycée</li>
              </ul>

              <h2>Conservation des données</h2>
              <p>
                Les données personnelles sont conservées pour la durée nécessaire à la finalité
                du traitement, et au maximum pendant 5 ans à compter de la dernière interaction.
              </p>

              <h2>Droits des utilisateurs</h2>
              <p>
                Conformément à la réglementation applicable, vous disposez d&apos;un droit d&apos;accès,
                de rectification, d&apos;effacement et d&apos;opposition concernant vos données personnelles.
              </p>
              <p>
                Pour exercer ces droits, contactez-nous via{" "}
                <a href="/contact">le formulaire de contact</a>.
              </p>

              <h2>Cookies</h2>
              <p>
                Ce site utilise des cookies techniques essentiels au fonctionnement du site.
                Aucun cookie publicitaire ou de tracking tiers n&apos;est utilisé.
              </p>

              <h2>Sécurité</h2>
              <p>
                Des mesures techniques et organisationnelles appropriées sont mises en place
                pour protéger vos données contre tout accès non autorisé, perte ou divulgation.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>
    </PageShell>
  );
}
