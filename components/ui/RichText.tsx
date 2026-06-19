import { cn } from "@/lib/utils";

interface RichTextProps {
  content: string;
  className?: string;
}

/**
 * Rendu éditorial léger et sûr (sans HTML injecté).
 * Conventions : double saut de ligne = paragraphe ; ligne « ## » = sous-titre ;
 * lignes « - » = liste à puces.
 */
export function RichText({ content, className }: RichTextProps) {
  const blocks = content.trim().split(/\n{2,}/);

  return (
    <div className={cn("space-y-5 text-[1.02rem] leading-relaxed text-lsy-slate", className)}>
      {blocks.map((block, i) => {
        const lines = block.split("\n");

        if (block.startsWith("## ")) {
          return (
            <h3
              key={i}
              className="font-display text-xl font-bold text-lsy-blue-900 sm:text-2xl"
            >
              {block.replace(/^##\s+/, "")}
            </h3>
          );
        }

        if (lines.every((l) => l.trim().startsWith("- "))) {
          return (
            <ul key={i} className="space-y-2.5">
              {lines.map((l, j) => (
                <li key={j} className="flex gap-3">
                  <span
                    aria-hidden
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-lsy-gold-500"
                  />
                  <span>{l.replace(/^-\s+/, "")}</span>
                </li>
              ))}
            </ul>
          );
        }

        return (
          <p key={i} className="text-pretty">
            {block}
          </p>
        );
      })}
    </div>
  );
}
