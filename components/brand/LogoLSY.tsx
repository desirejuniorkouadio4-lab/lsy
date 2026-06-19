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
  lg: "size-16",
};

export function LogoLSY({
  variant = "onLight",
  showText = true,
  href = "/",
  className,
  size = "md",
}: LogoLSYProps) {
  const dark = variant === "onDark";

  const content = (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      {/* Armoiries — fond transparent, pas de boîte blanche */}
      <span className={cn("relative block shrink-0 overflow-hidden", CREST_SIZES[size])}>
        <Image
          src="/brand/Logo-LSY.svg"
          alt="Armoiries du Lycée Scientifique de Yamoussoukro"
          fill
          sizes="64px"
          className="object-contain"
          priority
        />
      </span>

      {showText && (
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              "whitespace-nowrap font-display text-[0.88rem] font-bold tracking-tight",
              dark ? "text-white" : "text-lsy-blue-900",
            )}
          >
            Lycée Scientifique
          </span>
          <span
            className={cn(
              "mt-1 whitespace-nowrap text-[0.62rem] font-semibold uppercase tracking-[0.16em]",
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
