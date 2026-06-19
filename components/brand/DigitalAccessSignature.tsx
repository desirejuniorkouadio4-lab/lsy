import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

interface SignatureProps {
  variant?: "onLight" | "onDark";
  className?: string;
}

/**
 * Signature de conception — Digital Access – Web Access Solution.
 * Présente discrètement mais clairement, conformément au cahier des charges.
 */
export function DigitalAccessSignature({
  variant = "onDark",
  className,
}: SignatureProps) {
  const dark = variant === "onDark";
  const linkProvided = site.designer.url && site.designer.url !== "#";

  const name = linkProvided ? (
    <a
      href={site.designer.url}
      className="font-semibold underline-offset-4 hover:underline"
    >
      {site.designer.name}
    </a>
  ) : (
    <span className="font-semibold">{site.designer.name}</span>
  );

  return (
    <p
      className={cn(
        "text-[0.78rem] leading-relaxed",
        dark ? "text-white/65" : "text-lsy-muted",
        className,
      )}
    >
      Site conçu et développé par{" "}
      <span className={dark ? "text-lsy-gold-300" : "text-lsy-blue-800"}>
        {name}
      </span>
      .
    </p>
  );
}
