import { cn } from "@/lib/utils";

type BadgeVariant =
  | "navy"
  | "gold"
  | "green"
  | "orange"
  | "outline"
  | "urgent"
  | "muted";

const VARIANTS: Record<BadgeVariant, string> = {
  navy: "bg-lsy-blue-900/8 text-lsy-blue-800 ring-1 ring-lsy-blue-900/10",
  gold: "bg-lsy-gold-100 text-lsy-gold-700 ring-1 ring-lsy-gold-500/30",
  green: "bg-lsy-success/10 text-lsy-success ring-1 ring-lsy-success/20",
  orange: "bg-lsy-orange/12 text-[#b5610f] ring-1 ring-lsy-orange/25",
  outline: "text-lsy-slate ring-1 ring-lsy-line",
  urgent: "bg-red-50 text-red-700 ring-1 ring-red-200",
  muted: "bg-lsy-ivory text-lsy-muted ring-1 ring-lsy-line",
};

interface BadgeProps extends React.ComponentProps<"span"> {
  variant?: BadgeVariant;
}

export function Badge({
  variant = "navy",
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold tracking-tight",
        VARIANTS[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
