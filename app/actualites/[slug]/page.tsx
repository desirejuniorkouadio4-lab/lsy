import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, CalendarDays, Tag } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";
import { db } from "@/lib/db";
import { formatDateLong } from "@/lib/utils";
import { site } from "@/lib/site";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await db.article.findUnique({ where: { slug } });
  if (!article) return { title: "Article introuvable" };
  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await db.article.findUnique({
    where: { slug, status: "PUBLISHED" },
    include: { category: true, author: true },
  });

  if (!article) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.excerpt,
    datePublished: (article.publishedAt ?? article.createdAt).toISOString(),
    dateModified: article.updatedAt.toISOString(),
    author: article.author
      ? { "@type": "Person", name: article.author.name }
      : { "@type": "Organization", name: site.name },
    publisher: {
      "@type": "EducationalOrganization",
      name: site.name,
      logo: { "@type": "ImageObject", url: `${site.url}/brand/logo-lsy.png` },
    },
    url: `${site.url}/actualites/${article.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <PageShell>
      <section className="bg-lsy-paper py-16 lg:py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <Link
                href="/actualites"
                className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-lsy-blue-700 hover:text-lsy-blue-900 transition-colors"
              >
                <ArrowLeft className="size-4" aria-hidden />
                Retour aux actualités
              </Link>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="mb-6 space-y-3">
                {article.category && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-lsy-blue-100 px-3 py-0.5 text-xs font-bold text-lsy-blue-800">
                    <Tag className="size-3" aria-hidden />
                    {article.category.name}
                  </span>
                )}
                <h1 className="font-display text-3xl font-bold leading-tight text-lsy-blue-900 lg:text-4xl">
                  {article.title}
                </h1>
                <p className="flex items-center gap-2 text-sm text-lsy-muted">
                  <CalendarDays className="size-4" aria-hidden />
                  {formatDateLong(article.publishedAt ?? article.createdAt)}
                  {article.author && (
                    <span className="before:mx-2 before:content-['·']">
                      {article.author.name}
                    </span>
                  )}
                </p>
              </div>
            </Reveal>

            {article.coverImage && (
              <Reveal delay={0.1}>
                <div className="relative mb-8 h-64 overflow-hidden rounded-2xl sm:h-80 lg:h-96">
                  <Image
                    src={article.coverImage}
                    alt={article.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 768px"
                    priority
                  />
                </div>
              </Reveal>
            )}

            <Reveal delay={0.12}>
              <p className="mb-8 text-lg leading-relaxed text-lsy-slate font-medium">{article.excerpt}</p>
            </Reveal>

            <Reveal delay={0.15}>
              <div
                className="prose prose-lg prose-headings:font-display prose-headings:text-lsy-blue-900 prose-a:text-lsy-blue-700 max-w-none text-lsy-slate"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </Reveal>
          </div>
        </Container>
      </section>
    </PageShell>
    </>
  );
}
