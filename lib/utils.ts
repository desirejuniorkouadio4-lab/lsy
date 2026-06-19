import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Fusionne des classes Tailwind sans conflit. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const FR = "fr-FR";

/** 14 mars 2026 */
export function formatDateLong(date: Date | string) {
  return new Intl.DateTimeFormat(FR, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

/** 14 mars */
export function formatDayMonth(date: Date | string) {
  return new Intl.DateTimeFormat(FR, {
    day: "numeric",
    month: "long",
  }).format(new Date(date));
}

/** 14/03/2026 */
export function formatDateShort(date: Date | string) {
  return new Intl.DateTimeFormat(FR, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date));
}

/** { day: "14", month: "MARS", year: "2026" } pour les pastilles calendrier */
export function dateParts(date: Date | string) {
  const d = new Date(date);
  return {
    day: new Intl.DateTimeFormat(FR, { day: "2-digit" }).format(d),
    month: new Intl.DateTimeFormat(FR, { month: "short" })
      .format(d)
      .replace(".", "")
      .toUpperCase(),
    year: new Intl.DateTimeFormat(FR, { year: "numeric" }).format(d),
  };
}

/** Transforme un titre en slug exploitable dans une URL. */
export function slugify(input: string) {
  return input
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Coupe proprement un texte à une longueur maximale. */
export function truncate(text: string, max = 160) {
  if (text.length <= max) return text;
  return text.slice(0, max).replace(/\s+\S*$/, "") + "…";
}

/** Liste de tags depuis une chaîne séparée par des virgules. */
export function parseTags(tags?: string | null) {
  if (!tags) return [];
  return tags
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}
