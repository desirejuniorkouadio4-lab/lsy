import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoVariant = "onLight" | "onDark";

interface LogoLSYProps {
  variant?: LogoVariant;
  showText?: boolean;
  href?: string | null;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const CREST_SIZES: Record<NonNullable<LogoLSYProps["size"]>, string> = {
  sm: "size-9",
  md: "size-11",
  lg: "size-14",
};

/**
 * Logo institutionnel. Les armoiries sont posées sur une pastille claire
 * pour rester nettes aussi bien sur fond clair que sur fond bleu nuit.
 */
export function LogoLSY({
  variant = "onLight",
  showText = true,
  href = "/",
  className,
  size = "md",
}: LogoLSYProps) {
  const dark = variant === "onDark";

  const content = (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <span
        className={cn(
          "relative block shrink-0 overflow-hidden rounded-xl bg-white",
          dark
            ? "ring-1 ring-white/25 shadow-[0_6px_20px_-8px_rgba(0,0,0,0.6)]"
            : "ring-1 ring-lsy-blue-900/10 shadow-soft",
          CREST_SIZES[size],
        )}
      >
        <Image
          src="/brand/logo-lsy.jpg"
          alt="Armoiries du Lycée Scientifique de Yamoussoukro"
          fill
          sizes="56px"
          className="object-contain p-1"
          priority
        />
      </span>

      {showText && (
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              "font-display text-[0.95rem] font-bold tracking-tight sm:text-base",
              dark ? "text-white" : "text-lsy-blue-900",
            )}
          >
            Lycée Scientifique
          </span>
          <span
            className={cn(
              "mt-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em]",
              dark ? "text-lsy-gold-300" : "text-lsy-gold-600",
            )}
          >
            de Yamoussoukro
          </span>
        </span>
      )}
    </span>
  );

  if (href) {
    return (
      <Link
        href={href}
        aria-label="Lycée Scientifique de Yamoussoukro — accueil"
        className="inline-flex rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-lsy-gold-500 focus-visible:ring-offset-2"
      >
        {content}
      </Link>
    );
  }

  return content;
}
