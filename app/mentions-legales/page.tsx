import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site web du Lycée Scientifique de Yamoussoukro.",
};

export default function MentionsLegalesPage() {
  return (
    <PageShell flush>
      <PageHero
        eyebrow="Informations légales"
        title="Mentions légales"
        breadcrumbs={[{ label: "Mentions légales" }]}
        pattern="wave"
      />
      <section className="bg-lsy-paper py-20 lg:py-24">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-3xl prose prose-headings:font-display prose-headings:text-lsy-blue-900 prose-a:text-lsy-blue-700 text-lsy-slate">
              <h2>Éditeur du site</h2>
              <p>
                <strong>Lycée Scientifique de Yamoussoukro (LSY)</strong><br />
                Établissement public d&apos;enseignement secondaire<br />
                Yamoussoukro, Côte d&apos;Ivoire<br />
                Sous tutelle du Ministère de l&apos;Éducation Nationale et de l&apos;Alphabétisation (MENA)
              </p>

              <h2>Conception et réalisation</h2>
              <p>
                Site conçu et développé par{" "}
                <strong>Digital Access – Web Access Solution</strong>.
              </p>

              <h2>Hébergement</h2>
              <p>
                Les informations relatives à l&apos;hébergeur du site seront précisées
                lors de la mise en production.
              </p>

              <h2>Propriété intellectuelle</h2>
              <p>
                L&apos;ensemble des contenus présents sur ce site (textes, images, logos, structure)
                sont la propriété du Lycée Scientifique de Yamoussoukro ou de leurs auteurs
                respectifs et sont protégés par les lois en vigueur en Côte d&apos;Ivoire.
              </p>
              <p>
                Toute reproduction, même partielle, est soumise à autorisation préalable.
              </p>

              <h2>Responsabilité</h2>
              <p>
                Le LSY s&apos;efforce de mettre à jour régulièrement les informations publiées sur ce site.
                Cependant, il ne peut être tenu responsable des omissions, inexactitudes ou de la
                mise à jour tardive des informations.
              </p>

              <h2>Contact</h2>
              <p>
                Pour toute question relative aux mentions légales, contactez-nous via{" "}
                <a href="/contact">le formulaire de contact</a>.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>
    </PageShell>
  );
}
