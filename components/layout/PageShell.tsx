import { cn } from "@/lib/utils";

interface PageShellProps {
  children: React.ReactNode;
  className?: string;
  /**
   * Passe à true pour les pages qui gèrent leur propre hero plein-écran
   * et n'ont pas besoin du padding supérieur standard.
   */
  flush?: boolean;
}

/**
 * Enveloppe commune pour les pages publiques.
 * Garantit un flex column cohérent et l'espacement vertical standard.
 */
export function PageShell({ children, className, flush = false }: PageShellProps) {
  return (
    <div
      className={cn(
        "flex flex-1 flex-col",
        !flush && "pt-0",
        className,
      )}
    >
      {children}
    </div>
  );
}
