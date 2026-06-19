import type { Metadata } from "next";
import { AlertCircle, BedDouble, CheckCircle2, ShieldAlert } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { CTASection } from "@/components/sections/CTASection";
import { Reveal } from "@/components/animations/Reveal";
import { Stagger, StaggerItem } from "@/components/animations/Stagger";
import { internInfo } from "@/data/clubs";

export const metadata: Metadata = {
  title: "Internat",
  description: "La vie à l'internat du Lycée Scientifique de Yamoussoukro : hébergement, encadrement et vie quotidienne.",
};

export default function InternatPage() {
  return (
    <PageShell flush>
      <PageHero
        eyebrow="Vie au LSY"
        title="L'internat"
        body="La grande majorité des élèves du LSY sont pensionnaires. L'internat est un pilier de l'excellence : encadrement permanent, discipline et solidarité."
        breadcrumbs={[
          { label: "Vie au LSY", href: "/vie-au-lysee/internat" },
          { label: "Internat" },
        ]}
        pattern="wave"
      />

      <section className="bg-lsy-paper py-20 lg:py-28">
        <Container className="space-y-14">
          {/* Description */}
          <Reveal>
            <div className="mx-auto max-w-3xl rounded-3xl bg-lsy-blue-950 p-8 text-white">
              <BedDouble className="mb-4 size-10 text-lsy-gold-400" aria-hidden />
              <p className="text-[1.05rem] leading-relaxed text-white/80">{internInfo.description}</p>
            </div>
          </Reveal>

          {/* Ce que propose l'internat */}
          <div className="space-y-7">
            <Reveal>
              <SectionHeader
                eyebrow="Prestations"
                title="Un cadre de vie structuré"
              />
            </Reveal>
            <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
              {internInfo.features.map((feature) => (
                <StaggerItem key={feature}>
                  <div className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-soft ring-1 ring-lsy-line">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-lsy-success" aria-hidden />
                    <span className="text-sm font-semibold text-lsy-blue-900">{feature}</span>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          {/* Règles de base */}
          <div className="space-y-7">
            <Reveal>
              <SectionHeader
                eyebrow="Discipline"
                title="Le cadre de l'internat"
              />
            </Reveal>
            <Stagger className="space-y-3" stagger={0.06}>
              {internInfo.rules.map((rule) => (
                <StaggerItem key={rule}>
                  <div className="flex items-start gap-3 rounded-xl border border-lsy-line bg-white p-4">
                    <ShieldAlert className="mt-0.5 size-4 shrink-0 text-lsy-blue-700" aria-hidden />
                    <span className="text-sm text-lsy-slate">{rule}</span>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          <Reveal>
            <div className="flex items-start gap-3 rounded-xl border border-lsy-line bg-lsy-ivory p-4">
              <AlertCircle className="mt-0.5 size-4 shrink-0 text-lsy-muted" aria-hidden />
              <p className="text-sm text-lsy-muted">{internInfo.note}</p>
            </div>
          </Reveal>
        </Container>
      </section>

      <CTASection
        eyebrow="Règlement intérieur"
        title="Consulter le règlement intérieur complet"
        buttons={[
          { label: "Règlement intérieur", href: "/vie-au-lysee/reglement-interieur", primary: true },
          { label: "Santé et infirmerie", href: "/vie-au-lysee/sante-et-infirmerie" },
        ]}
      />
    </PageShell>
  );
}
