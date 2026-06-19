import { cn } from "@/lib/utils";

type PatternVariant = "atom" | "molecule" | "orbit" | "constellation" | "wave";

interface ScientificPatternProps {
  variant?: PatternVariant;
  className?: string;
}

/**
 * Motifs scientifiques décoratifs (traits fins, currentColor).
 * Purement présentatifs : marqués aria-hidden.
 */
export function ScientificPattern({
  variant = "atom",
  className,
}: ScientificPatternProps) {
  const common = {
    "aria-hidden": true as const,
    className: cn("pointer-events-none select-none", className),
    fill: "none",
    stroke: "currentColor",
  };

  switch (variant) {
    case "atom":
      return (
        <svg viewBox="0 0 200 200" {...common}>
          <g strokeWidth="1.1" opacity="0.9">
            <ellipse cx="100" cy="100" rx="78" ry="30" />
            <ellipse cx="100" cy="100" rx="78" ry="30" transform="rotate(60 100 100)" />
            <ellipse cx="100" cy="100" rx="78" ry="30" transform="rotate(120 100 100)" />
            <circle cx="100" cy="100" r="7" fill="currentColor" stroke="none" />
            <circle cx="178" cy="100" r="3.4" fill="currentColor" stroke="none" />
            <circle cx="61" cy="32.5" r="3.4" fill="currentColor" stroke="none" />
            <circle cx="61" cy="167.5" r="3.4" fill="currentColor" stroke="none" />
          </g>
        </svg>
      );
    case "molecule":
      return (
        <svg viewBox="0 0 220 200" {...common}>
          <g strokeWidth="1.1" opacity="0.9">
            <path d="M40 150 L90 90 L150 110 L185 55" />
            <path d="M90 90 L110 160" />
            <path d="M150 110 L140 165" />
            {[
              [40, 150],
              [90, 90],
              [150, 110],
              [185, 55],
              [110, 160],
              [140, 165],
            ].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r={i % 2 ? 4 : 6} fill="currentColor" stroke="none" />
            ))}
          </g>
        </svg>
      );
    case "orbit":
      return (
        <svg viewBox="0 0 200 200" {...common}>
          <g strokeWidth="1" opacity="0.85">
            <circle cx="100" cy="100" r="30" />
            <circle cx="100" cy="100" r="58" strokeDasharray="2 7" />
            <circle cx="100" cy="100" r="86" strokeDasharray="2 9" />
            <circle cx="158" cy="100" r="4" fill="currentColor" stroke="none" />
            <circle cx="38" cy="78" r="3" fill="currentColor" stroke="none" />
          </g>
        </svg>
      );
    case "wave":
      return (
        <svg viewBox="0 0 240 80" {...common} preserveAspectRatio="none">
          <g strokeWidth="1.2" opacity="0.85">
            <path d="M0 40 Q30 5 60 40 T120 40 T180 40 T240 40" />
            <path d="M0 52 Q30 22 60 52 T120 52 T180 52 T240 52" opacity="0.5" />
          </g>
        </svg>
      );
    case "constellation":
    default:
      return (
        <svg viewBox="0 0 240 200" {...common}>
          <g strokeWidth="0.9" opacity="0.8">
            <path d="M20 40 L70 70 L60 130 L130 150 L190 110 L170 50 L110 30 L70 70" />
            {[
              [20, 40],
              [70, 70],
              [60, 130],
              [130, 150],
              [190, 110],
              [170, 50],
              [110, 30],
            ].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="2.6" fill="currentColor" stroke="none" />
            ))}
          </g>
        </svg>
      );
  }
}
