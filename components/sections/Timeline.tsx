import { cn } from "@/lib/utils";
import { Stagger, StaggerItem } from "@/components/animations/Stagger";

interface TimelineEvent {
  year: string | number;
  title: string;
  body: string;
  accent?: string;
}

interface TimelineProps {
  events: TimelineEvent[];
  className?: string;
}

const ACCENTS = [
  "bg-lsy-gold-500",
  "bg-lsy-blue-700",
  "bg-lsy-success",
  "bg-lsy-orange",
  "bg-lsy-blue-500",
  "bg-lsy-gold-600",
];

export function Timeline({ events, className }: TimelineProps) {
  return (
    <Stagger className={cn("space-y-4", className)} stagger={0.09}>
      {events.map((evt, i) => {
        const accent = evt.accent ?? ACCENTS[i % ACCENTS.length];
        return (
          <StaggerItem key={`${evt.year}-${i}`}>
            <div className="flex gap-5 rounded-2xl bg-white p-5 shadow-soft ring-1 ring-lsy-line transition-shadow hover:shadow-card">
              <div className="flex flex-col items-center gap-2">
                <span
                  className={cn(
                    "inline-flex h-12 w-16 shrink-0 items-center justify-center rounded-xl font-display text-sm font-bold text-white",
                    accent,
                  )}
                >
                  {evt.year}
                </span>
                {i < events.length - 1 && (
                  <div className="w-0.5 flex-1 rounded-full bg-lsy-line" />
                )}
              </div>
              <div className="space-y-1 pt-1">
                <p className="font-bold text-lsy-blue-900">{evt.title}</p>
                <p className="text-sm leading-relaxed text-lsy-muted">{evt.body}</p>
              </div>
            </div>
          </StaggerItem>
        );
      })}
    </Stagger>
  );
}
