import { cn } from "@/lib/utils";

interface EyebrowProps {
  children: React.ReactNode;
  variant?: "onLight" | "onDark";
  className?: string;
}

/**
 * Sur-titre éditorial (uppercase, filet doré) posé au-dessus des titres de section.
 */
export function Eyebrow({
  children,
  variant = "onLight",
  className,
}: EyebrowProps) {
  const dark = variant === "onDark";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.2em]",
        dark ? "text-lsy-gold-300" : "text-lsy-gold-600",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "h-px w-7",
          dark ? "bg-lsy-gold-400/70" : "bg-lsy-gold-500/70",
        )}
      />
      {children}
    </span>
  );
}
