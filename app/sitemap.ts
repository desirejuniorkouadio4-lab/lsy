import type { MetadataRoute } from "next";
import { db } from "@/lib/db";
import { site } from "@/lib/site";

const BASE = site.url;
const now = new Date();

const STATIC_ROUTES: MetadataRoute.Sitemap = [
  { url: BASE, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
  { url: `${BASE}/le-lycee`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
  { url: `${BASE}/le-lycee/presentation`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE}/le-lycee/histoire`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
  { url: `${BASE}/le-lycee/mission-et-valeurs`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
  { url: `${BASE}/le-lycee/mot-du-proviseur`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE}/le-lycee/infrastructures`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
  { url: `${BASE}/admissions`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
  { url: `${BASE}/admissions/entree-en-4e`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE}/admissions/entree-en-seconde`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE}/admissions/calendrier`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE}/admissions/documents`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE}/admissions/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE}/admissions/tarification`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
  { url: `${BASE}/academie-innovation`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE}/academie-innovation/programmes`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE}/academie-innovation/laboratoires`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
  { url: `${BASE}/academie-innovation/organisation-pedagogique`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
  { url: `${BASE}/academie-innovation/recherche-scientifique-junior`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE}/academie-innovation/examens-et-concours`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE}/academie-innovation/ressources-pedagogiques`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
  { url: `${BASE}/vie-au-lycee`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE}/vie-au-lycee/internat`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
  { url: `${BASE}/vie-au-lycee/clubs`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE}/vie-au-lycee/sport-et-culture`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE}/vie-au-lycee/sante-et-infirmerie`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
  { url: `${BASE}/vie-au-lycee/soutien-psychologique`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
  { url: `${BASE}/vie-au-lycee/reglement-interieur`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
  { url: `${BASE}/excellence-alumni`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE}/excellence-alumni/majors`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
  { url: `${BASE}/excellence-alumni/resultats`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
  { url: `${BASE}/excellence-alumni/concours-et-distinctions`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE}/excellence-alumni/anciens-eleves`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE}/excellence-alumni/mentorat`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  { url: `${BASE}/actualites`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
  { url: `${BASE}/actualites/communiques`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
  { url: `${BASE}/actualites/evenements`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
  { url: `${BASE}/medias/galerie`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
  { url: `${BASE}/medias/web-tv`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
  { url: `${BASE}/documents`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
  { url: `${BASE}/calendrier`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
  { url: `${BASE}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
  { url: `${BASE}/soutenir`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  { url: `${BASE}/portail`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Dynamic article URLs
  const articles = await db.article.findMany({
    where: { status: "PUBLISHED" },
    select: { slug: true, updatedAt: true },
    orderBy: { publishedAt: "desc" },
  });

  const articleUrls: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${BASE}/actualites/${a.slug}`,
    lastModified: a.updatedAt,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...STATIC_ROUTES, ...articleUrls];
}
