import { cn } from "@/lib/utils";
import { CountUp } from "@/components/animations/CountUp";

interface Stat {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

interface StatsRibbonProps {
  stats: Stat[];
  onDark?: boolean;
  className?: string;
}

export function StatsRibbon({ stats, onDark = false, className }: StatsRibbonProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap divide-x overflow-hidden rounded-2xl border",
        onDark
          ? "divide-white/10 border-white/10 bg-white/5"
          : "divide-lsy-line border-lsy-line bg-white",
        className,
      )}
    >
      {stats.map((s, i) => (
        <div
          key={i}
          className="flex min-w-[8rem] flex-1 flex-col items-center gap-1 px-6 py-5 text-center"
        >
          <span
            className={cn(
              "font-display text-3xl font-bold",
              onDark ? "text-gold-gradient" : "text-lsy-blue-900",
            )}
          >
            <CountUp
              value={s.value}
              prefix={s.prefix ?? ""}
              suffix={s.suffix ?? ""}
              decimals={s.decimals ?? 0}
            />
          </span>
          <span
            className={cn(
              "text-[0.72rem] font-semibold uppercase tracking-wide",
              onDark ? "text-white/45" : "text-lsy-muted",
            )}
          >
            {s.label}
          </span>
        </div>
      ))}
    </div>
  );
}
