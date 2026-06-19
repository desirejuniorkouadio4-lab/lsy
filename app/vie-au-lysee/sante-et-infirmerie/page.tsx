import type { Metadata } from "next";
import { AlertCircle, CheckCircle2, HeartPulse, Phone, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { CTASection } from "@/components/sections/CTASection";
import { Reveal } from "@/components/animations/Reveal";
import { Stagger, StaggerItem } from "@/components/animations/Stagger";

export const metadata: Metadata = {
  title: "Santé et infirmerie",
  description: "Le service de santé scolaire et l'infirmerie du Lycée Scientifique de Yamoussoukro.",
};

const SERVICES = [
  "Consultation infirmière disponible pendant les heures scolaires",
  "Gestion des petits soins et premiers secours",
  "Suivi des élèves porteurs de maladies chroniques",
  "Vaccination et suivi du carnet de santé",
  "Orientation vers les structures de soins spécialisées",
  "Sensibilisation à l'hygiène et à la santé",
];

const PROTOCOLES = [
  {
    titre: "Urgence médicale",
    desc: "En cas d'urgence, l'infirmier ou l'infirmière en charge contacte immédiatement le SAMU ou l'hôpital le plus proche, et prévient les parents ou tuteurs.",
    Icon: ShieldCheck,
  },
  {
    titre: "Maladie chronique",
    desc: "Les élèves atteints de maladies chroniques (asthme, diabète, etc.) doivent remettre un protocole médical à l'infirmerie en début d'année scolaire.",
    Icon: HeartPulse,
  },
  {
    titre: "Retour après maladie",
    desc: "Un certificat médical de non-contagiosité est requis pour toute absence de plus de 3 jours pour raison de santé.",
    Icon: CheckCircle2,
  },
];

export default function SanteInfirmeriePage() {
  return (
    <PageShell flush>
      <PageHero
        eyebrow="Vie au LSY"
        title="Santé et infirmerie"
        body="La santé des élèves est une priorité absolue du Lycée Scientifique de Yamoussoukro. Une prise en charge rapide et un suivi adapté à chaque situation."
        breadcrumbs={[
          { label: "Vie au LSY", href: "/vie-au-lysee/internat" },
          { label: "Santé et infirmerie" },
        ]}
        pattern="wave"
      />

      <section className="bg-lsy-paper py-20 lg:py-28">
        <Container className="space-y-14">
          {/* Services */}
          <div className="space-y-8">
            <Reveal>
              <SectionHeader
                eyebrow="Services disponibles"
                title="Une prise en charge complète"
                body="L'infirmerie du LSY assure un service de proximité pour toute la communauté scolaire, avec une priorité à la prévention."
              />
            </Reveal>
            <Stagger className="grid gap-3 sm:grid-cols-2" stagger={0.06}>
              {SERVICES.map((service) => (
                <StaggerItem key={service}>
                  <div className="flex items-start gap-3 rounded-xl bg-white p-4 shadow-soft ring-1 ring-lsy-line">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-lsy-success" aria-hidden />
                    <span className="text-sm text-lsy-slate">{service}</span>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          {/* Protocoles */}
          <div className="space-y-8">
            <Reveal>
              <SectionHeader eyebrow="Protocoles" title="Comment l'infirmerie intervient" />
            </Reveal>
            <div className="grid gap-5 lg:grid-cols-3">
              {PROTOCOLES.map((proto, i) => {
                const Icon = proto.Icon;
                return (
                  <Reveal key={proto.titre} delay={i * 0.1}>
                    <div className="rounded-3xl bg-white p-6 shadow-soft ring-1 ring-lsy-line">
                      <Icon className="mb-3 size-7 text-lsy-gold-600" aria-hidden />
                      <p className="mb-2 font-bold text-lsy-blue-900">{proto.titre}</p>
                      <p className="text-sm leading-relaxed text-lsy-muted">{proto.desc}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>

          {/* Contact urgence */}
          <Reveal>
            <div className="flex items-start gap-4 rounded-2xl bg-lsy-blue-950 p-6 text-white">
              <Phone className="mt-0.5 size-6 shrink-0 text-lsy-gold-400" aria-hidden />
              <div>
                <p className="font-bold">Contact d&apos;urgence</p>
                <p className="mt-1 text-sm text-white/70">
                  En dehors des heures de l&apos;infirmerie, contactez le service de surveillance ou
                  la direction du lycée. Le numéro d&apos;urgence interne est affiché dans chaque
                  bâtiment.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="flex items-start gap-3 rounded-xl border border-lsy-line bg-lsy-ivory p-4">
              <AlertCircle className="mt-0.5 size-4 shrink-0 text-lsy-muted" aria-hidden />
              <p className="text-sm text-lsy-muted">
                Les horaires précis de l&apos;infirmerie et les coordonnées de contact sont disponibles
                auprès du service Vie Scolaire.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <CTASection
        eyebrow="Soutien psychologique"
        title="Un accompagnement au-delà du physique"
        buttons={[
          { label: "Soutien psychologique", href: "/vie-au-lysee/soutien-psychologique", primary: true },
          { label: "Vie à l'internat", href: "/vie-au-lysee/internat" },
        ]}
      />
    </PageShell>
  );
}
