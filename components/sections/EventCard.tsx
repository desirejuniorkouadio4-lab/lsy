import Link from "next/link";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { dateParts } from "@/lib/utils";

interface EventCardProps {
  title: string;
  href: string;
  startDate: Date;
  location?: string | null;
  category?: string | null;
  className?: string;
}

export function EventCard({
  title,
  href,
  startDate,
  location,
  category,
  className,
}: EventCardProps) {
  const parts = dateParts(startDate);
  return (
    <Link
      href={href}
      className={cn(
        "group flex gap-4 rounded-2xl border border-lsy-line bg-white p-4 transition-all hover:border-lsy-blue-700/30 hover:shadow-card",
        className,
      )}
    >
      {/* Calendar chip */}
      <div className="flex w-14 shrink-0 flex-col items-center rounded-xl bg-lsy-blue-900 py-2.5 text-white">
        <span className="font-display text-2xl font-bold leading-none">{parts.day}</span>
        <span className="text-[0.62rem] font-bold uppercase tracking-wide text-lsy-gold-300">
          {parts.month}
        </span>
        <span className="text-[0.6rem] text-white/50">{parts.year}</span>
      </div>

      <div className="min-w-0 flex-1 space-y-1.5">
        {category && <Badge variant="navy" className="text-[0.68rem]">{category}</Badge>}
        <p className="font-bold leading-snug text-lsy-blue-900 line-clamp-2 group-hover:text-lsy-blue-700">
          {title}
        </p>
        {location && (
          <p className="flex items-center gap-1.5 text-xs text-lsy-muted">
            <MapPin className="size-3.5 shrink-0" aria-hidden />
            {location}
          </p>
        )}
      </div>
    </Link>
  );
}
