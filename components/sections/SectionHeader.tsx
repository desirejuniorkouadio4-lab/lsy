import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/ui/Eyebrow";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  body?: string;
  align?: "left" | "center";
  onDark?: boolean;
  className?: string;
  titleClassName?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  body,
  align = "left",
  onDark = false,
  className,
  titleClassName,
}: SectionHeaderProps) {
  const centered = align === "center";
  return (
    <div
      className={cn(
        "max-w-2xl space-y-3",
        centered && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <Eyebrow variant={onDark ? "onDark" : "onLight"}>{eyebrow}</Eyebrow>
      )}
      <h2
        className={cn(
          "font-display text-4xl font-bold leading-tight lg:text-5xl",
          onDark ? "text-white" : "text-lsy-blue-900",
          titleClassName,
        )}
      >
        {title}
      </h2>
      {body && (
        <p
          className={cn(
            "text-[1.02rem] leading-relaxed",
            onDark ? "text-white/65" : "text-lsy-slate",
          )}
        >
          {body}
        </p>
      )}
    </div>
  );
}
