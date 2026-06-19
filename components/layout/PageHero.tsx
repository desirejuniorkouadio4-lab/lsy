import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Breadcrumb, type Crumb } from "@/components/ui/Breadcrumb";
import { ScientificPattern } from "@/components/brand/ScientificPattern";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  body?: string;
  breadcrumbs?: Crumb[];
  children?: ReactNode;
  pattern?: "atom" | "orbit" | "constellation" | "wave" | "molecule";
}

/**
 * En-tête immersif commun à toutes les pages institutionnelles.
 * Fond bleu nuit, liseré tricolore, motif scientifique, fil d'Ariane.
 */
export function PageHero({
  eyebrow,
  title,
  body,
  breadcrumbs,
  children,
  pattern = "atom",
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-lsy-blue-950 pb-16 pt-10 text-white">
      <div className="bg-grid-science absolute inset-0 opacity-25" aria-hidden />
      <ScientificPattern
        variant={pattern}
        className="absolute right-0 top-0 size-[36rem] translate-x-1/3 -translate-y-1/4 text-lsy-gold-400/8"
      />
      <div className="rule-civ absolute left-0 top-0 h-1 w-full" aria-hidden />

      <Container className="relative z-10 space-y-5">
        {breadcrumbs && <Breadcrumb items={breadcrumbs} variant="onDark" />}

        <div className="max-w-3xl space-y-4">
          {eyebrow && (
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-lsy-gold-300">
              {eyebrow}
            </p>
          )}
          <h1 className="font-display text-4xl font-bold leading-tight lg:text-5xl xl:text-6xl">
            {title}
          </h1>
          {body && (
            <p className="max-w-2xl text-[1.05rem] leading-relaxed text-white/65">
              {body}
            </p>
          )}
        </div>

        {children && <div className="flex flex-wrap gap-3 pt-2">{children}</div>}
      </Container>
    </section>
  );
}
