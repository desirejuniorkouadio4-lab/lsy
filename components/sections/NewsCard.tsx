import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { formatDateLong } from "@/lib/utils";

interface NewsCardProps {
  title: string;
  href: string;
  excerpt?: string | null;
  publishedAt?: Date | null;
  categoryName?: string | null;
  isUrgent?: boolean;
  className?: string;
}

export function NewsCard({
  title,
  href,
  excerpt,
  publishedAt,
  categoryName,
  isUrgent,
  className,
}: NewsCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex flex-col gap-3 rounded-2xl border border-lsy-line bg-white p-5 transition-all hover:border-lsy-gold-400/40 hover:shadow-card",
        className,
      )}
    >
      <div className="flex flex-wrap gap-2">
        {categoryName && <Badge variant="navy">{categoryName}</Badge>}
        {isUrgent && <Badge variant="urgent">Urgent</Badge>}
      </div>
      <p className="font-bold leading-snug text-lsy-blue-900 group-hover:text-lsy-blue-700 line-clamp-2">
        {title}
      </p>
      {excerpt && (
        <p className="flex-1 text-sm leading-relaxed text-lsy-muted line-clamp-3">
          {excerpt}
        </p>
      )}
      <div className="flex items-center justify-between">
        {publishedAt && (
          <span className="text-xs text-lsy-muted/70">
            {formatDateLong(publishedAt)}
          </span>
        )}
        <ArrowRight className="ml-auto size-4 text-lsy-muted opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" aria-hidden />
      </div>
    </Link>
  );
}
