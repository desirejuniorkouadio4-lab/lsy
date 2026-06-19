import Link from "next/link";
import Image from "next/image";
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
  coverImage?: string | null;
  isUrgent?: boolean;
  featured?: boolean;
  className?: string;
}

export function NewsCard({
  title,
  href,
  excerpt,
  publishedAt,
  categoryName,
  coverImage,
  isUrgent,
  featured,
  className,
}: NewsCardProps) {
  if (featured && coverImage) {
    return (
      <Link
        href={href}
        className={cn(
          "group relative flex min-h-[22rem] flex-col justify-end overflow-hidden rounded-2xl border border-lsy-line transition-all hover:shadow-card",
          className,
        )}
      >
        <Image
          src={coverImage}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-lsy-blue-950/90 via-lsy-blue-950/40 to-transparent" />
        <div className="relative z-10 p-5 space-y-2">
          {categoryName && <Badge variant="navy">{categoryName}</Badge>}
          <p className="font-display text-lg font-bold leading-snug text-white line-clamp-2">
            {title}
          </p>
          {excerpt && (
            <p className="text-sm text-white/70 line-clamp-2">{excerpt}</p>
          )}
          {publishedAt && (
            <p className="text-xs text-white/50">{formatDateLong(publishedAt)}</p>
          )}
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={cn(
        "group flex flex-col gap-0 overflow-hidden rounded-2xl border border-lsy-line bg-white transition-all hover:border-lsy-gold-400/40 hover:shadow-card",
        className,
      )}
    >
      {coverImage && (
        <div className="relative h-44 overflow-hidden bg-lsy-ivory">
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-2.5 p-5">
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
        <div className="flex items-center justify-between pt-1">
          {publishedAt && (
            <span className="text-xs text-lsy-muted/70">
              {formatDateLong(publishedAt)}
            </span>
          )}
          <ArrowRight
            className="ml-auto size-4 text-lsy-muted opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
            aria-hidden
          />
        </div>
      </div>
    </Link>
  );
}
