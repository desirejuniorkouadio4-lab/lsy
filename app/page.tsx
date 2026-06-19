import type { Metadata } from "next";
import { HeroLSY } from "@/components/home/HeroLSY";
import { QuickAccessDock } from "@/components/home/QuickAccessDock";
import { LegacySection } from "@/components/home/LegacySection";
import { NewEraSection } from "@/components/home/NewEraSection";
import { AdmissionPreview } from "@/components/home/AdmissionPreview";
import { AcademicExcellence } from "@/components/home/AcademicExcellence";
import { LifeAtLSY } from "@/components/home/LifeAtLSY";
import { NewsHighlights } from "@/components/home/NewsHighlights";
import { AlumniPreview } from "@/components/home/AlumniPreview";
import { PartnersBand } from "@/components/home/PartnersBand";
import { PrincipalMessage } from "@/components/home/PrincipalMessage";
import { PageShell } from "@/components/layout/PageShell";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: site.name,
  description: site.description,
  openGraph: {
    title: site.name,
    description: site.description,
    url: site.url,
    type: "website",
  },
};

export default function HomePage() {
  return (
    <PageShell flush>
      {/* 1. Hero immersif plein écran */}
      <HeroLSY />

      {/* 2. Dock d'accès rapides — remonte sur le hero */}
      <QuickAccessDock />

      {/* 3. Héritage — timeline des grandes dates */}
      <LegacySection />

      {/* 4. Nouvelle ère — cards verre sur fond sombre */}
      <NewEraSection />

      {/* 5. Mot du Proviseur */}
      <PrincipalMessage />

      {/* 6. Admissions — les deux voies d'entrée */}
      <AdmissionPreview />

      {/* 6. Académie — disciplines, labos, concours */}
      <AcademicExcellence />

      {/* 7. Vie au LSY — mosaïque internat, clubs, sport */}
      <LifeAtLSY />

      {/* 8. Actualités — articles, communiqués, événements */}
      <NewsHighlights />

      {/* 9. Alumni — majors, réseau, mentorat */}
      <AlumniPreview />

      {/* 10. Partenaires institutionnels */}
      <PartnersBand />
    </PageShell>
  );
}
