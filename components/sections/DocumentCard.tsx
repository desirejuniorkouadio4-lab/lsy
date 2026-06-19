import Link from "next/link";
import { Download, ExternalLink, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { formatDateShort } from "@/lib/utils";

interface DocumentCardProps {
  title: string;
  href: string;
  category?: string | null;
  fileType?: string | null;
  fileSize?: string | null;
  publishedAt?: Date | null;
  isExternal?: boolean;
  className?: string;
}

export function DocumentCard({
  title,
  href,
  category,
  fileType,
  fileSize,
  publishedAt,
  isExternal,
  className,
}: DocumentCardProps) {
  return (
    <div
      className={cn(
        "group flex items-start gap-4 rounded-2xl border border-lsy-line bg-white p-4 transition-all hover:border-lsy-gold-400/40 hover:shadow-soft",
        className,
      )}
    >
      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-lsy-blue-900/5 text-lsy-blue-800">
        <FileText className="size-5" aria-hidden />
      </span>
      <div className="min-w-0 flex-1 space-y-1.5">
        <div className="flex flex-wrap items-center gap-1.5">
          {category && <Badge variant="navy" className="text-[0.65rem]">{category}</Badge>}
          {fileType && (
            <span className="rounded bg-lsy-ivory px-1.5 py-0.5 text-[0.62rem] font-bold uppercase text-lsy-muted">
              {fileType}
            </span>
          )}
        </div>
        <p className="font-semibold leading-snug text-lsy-blue-900 line-clamp-2">
          {title}
        </p>
        <div className="flex items-center gap-3 text-xs text-lsy-muted">
          {fileSize && <span>{fileSize}</span>}
          {publishedAt && <span>{formatDateShort(publishedAt)}</span>}
        </div>
      </div>
      <Link
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noreferrer" : undefined}
        aria-label={`Télécharger : ${title}`}
        className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-lsy-line text-lsy-muted transition-all hover:border-lsy-gold-500/40 hover:bg-lsy-gold-500/10 hover:text-lsy-blue-900"
      >
        {isExternal ? (
          <ExternalLink className="size-4" aria-hidden />
        ) : (
          <Download className="size-4" aria-hidden />
        )}
      </Link>
    </div>
  );
}
