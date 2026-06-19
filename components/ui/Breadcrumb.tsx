import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Crumb {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: Crumb[];
  variant?: "onLight" | "onDark";
  className?: string;
}

export function Breadcrumb({
  items,
  variant = "onLight",
  className,
}: BreadcrumbProps) {
  const dark = variant === "onDark";
  return (
    <nav aria-label="Fil d'Ariane" className={cn("text-sm", className)}>
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <Link
            href="/"
            className={cn(
              "inline-flex items-center gap-1 rounded-md transition-colors",
              dark
                ? "text-white/60 hover:text-white"
                : "text-lsy-muted hover:text-lsy-blue-800",
            )}
          >
            <Home className="size-3.5" aria-hidden />
            <span className="sr-only">Accueil</span>
          </Link>
        </li>
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={`${item.label}-${i}`} className="flex items-center gap-1.5">
              <ChevronRight
                className={cn(
                  "size-3.5 shrink-0",
                  dark ? "text-white/35" : "text-lsy-muted/60",
                )}
                aria-hidden
              />
              {item.href && !last ? (
                <Link
                  href={item.href}
                  className={cn(
                    "rounded-md transition-colors",
                    dark
                      ? "text-white/65 hover:text-white"
                      : "text-lsy-muted hover:text-lsy-blue-800",
                  )}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={last ? "page" : undefined}
                  className={cn(
                    "font-semibold",
                    dark ? "text-white" : "text-lsy-blue-900",
                  )}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
