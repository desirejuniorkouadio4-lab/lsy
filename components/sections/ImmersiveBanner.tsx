import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ScientificPattern } from "@/components/brand/ScientificPattern";

interface ImmersiveBannerProps {
  eyebrow?: string;
  title: string;
  body?: string;
  children?: React.ReactNode;
  pattern?: "atom" | "orbit" | "constellation" | "wave" | "molecule";
  className?: string;
}

export function ImmersiveBanner({
  eyebrow,
  title,
  body,
  children,
  pattern = "constellation",
  className,
}: ImmersiveBannerProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-lsy-blue-950 py-20 text-white lg:py-28",
        className,
      )}
    >
      <div className="bg-grid-science absolute inset-0 opacity-30" aria-hidden />
      <ScientificPattern
        variant={pattern}
        className="absolute right-0 top-0 size-[40rem] translate-x-1/3 -translate-y-1/4 text-lsy-gold-400/8"
      />
      <div className="rule-civ absolute left-0 top-0 h-1 w-full" aria-hidden />

      <Container className="relative z-10">
        <div className="max-w-3xl space-y-5">
          {eyebrow && <Eyebrow variant="onDark">{eyebrow}</Eyebrow>}
          <h1 className="font-display text-4xl font-bold leading-tight lg:text-5xl xl:text-6xl">
            {title}
          </h1>
          {body && (
            <p className="max-w-2xl text-[1.05rem] leading-relaxed text-white/65">
              {body}
            </p>
          )}
          {children && <div className="mt-6 flex flex-wrap gap-3">{children}</div>}
        </div>
      </Container>
    </section>
  );
}
