import { cn } from "@/lib/utils";
import { Reveal } from "@/components/animations/Reveal";

interface EditorialSplitProps {
  left: React.ReactNode;
  right: React.ReactNode;
  reverse?: boolean;
  className?: string;
  gap?: "sm" | "md" | "lg";
}

const GAP = { sm: "gap-8 lg:gap-12", md: "gap-12 lg:gap-16", lg: "gap-14 lg:gap-20" };

export function EditorialSplit({
  left,
  right,
  reverse = false,
  className,
  gap = "md",
}: EditorialSplitProps) {
  return (
    <div
      className={cn(
        "grid items-center lg:grid-cols-2",
        GAP[gap],
        className,
      )}
    >
      <Reveal className={cn(reverse && "lg:order-2")}>{left}</Reveal>
      <Reveal delay={0.12} className={cn(reverse && "lg:order-1")}>{right}</Reveal>
    </div>
  );
}
