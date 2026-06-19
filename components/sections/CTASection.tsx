import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";

interface CTAButton {
  label: string;
  href: string;
  primary?: boolean;
}

interface CTASectionProps {
  eyebrow?: string;
  title: string;
  body?: string;
  buttons: CTAButton[];
  onDark?: boolean;
  className?: string;
}

export function CTASection({
  eyebrow,
  title,
  body,
  buttons,
  onDark = false,
  className,
}: CTASectionProps) {
  return (
    <section
      className={cn(
        "py-20 lg:py-24",
        onDark ? "bg-lsy-blue-950" : "bg-lsy-ivory",
        className,
      )}
    >
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl space-y-5 text-center">
            {eyebrow && (
              <p
                className={cn(
                  "text-[0.72rem] font-bold uppercase tracking-[0.2em]",
                  onDark ? "text-lsy-gold-300" : "text-lsy-gold-600",
                )}
              >
                {eyebrow}
              </p>
            )}
            <h2
              className={cn(
                "font-display text-4xl font-bold leading-tight lg:text-5xl",
                onDark ? "text-white" : "text-lsy-blue-900",
              )}
            >
              {title}
            </h2>
            {body && (
              <p
                className={cn(
                  "text-[1.02rem] leading-relaxed",
                  onDark ? "text-white/60" : "text-lsy-slate",
                )}
              >
                {body}
              </p>
            )}
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              {buttons.map((btn) => (
                <Link
                  key={btn.href}
                  href={btn.href}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all",
                    btn.primary
                      ? "bg-lsy-gold-500 text-lsy-blue-950 hover:bg-lsy-gold-400"
                      : onDark
                      ? "border border-white/25 text-white hover:border-white/50 hover:bg-white/10"
                      : "border border-lsy-blue-900/20 text-lsy-blue-900 hover:border-lsy-blue-900/40 hover:bg-lsy-blue-900/5",
                  )}
                >
                  {btn.label}
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
