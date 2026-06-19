import { cn } from "@/lib/utils";
import { Stagger, StaggerItem } from "@/components/animations/Stagger";
import type { LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  body: string;
}

interface FeatureGridProps {
  features: Feature[];
  cols?: 2 | 3 | 4;
  onDark?: boolean;
  className?: string;
}

const COLS = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

export function FeatureGrid({ features, cols = 3, onDark = false, className }: FeatureGridProps) {
  return (
    <Stagger className={cn("grid gap-4", COLS[cols], className)} stagger={0.07}>
      {features.map((f) => {
        const Icon = f.icon;
        return (
          <StaggerItem key={f.title}>
            <div
              className={cn(
                "flex gap-4 rounded-2xl p-5",
                onDark
                  ? "glass-dark"
                  : "bg-white shadow-soft ring-1 ring-lsy-line",
              )}
            >
              <span
                className={cn(
                  "mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl",
                  onDark
                    ? "bg-lsy-gold-500/10 text-lsy-gold-400"
                    : "bg-lsy-blue-900/5 text-lsy-blue-800",
                )}
              >
                <Icon className="size-5" aria-hidden />
              </span>
              <div className="space-y-1">
                <p
                  className={cn(
                    "font-bold",
                    onDark ? "text-white" : "text-lsy-blue-900",
                  )}
                >
                  {f.title}
                </p>
                <p
                  className={cn(
                    "text-sm leading-relaxed",
                    onDark ? "text-white/55" : "text-lsy-muted",
                  )}
                >
                  {f.body}
                </p>
              </div>
            </div>
          </StaggerItem>
        );
      })}
    </Stagger>
  );
}
