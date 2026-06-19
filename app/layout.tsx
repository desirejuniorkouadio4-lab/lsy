import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BottomMobileNav } from "@/components/layout/BottomMobileNav";
import { site } from "@/lib/site";
import "./globals.css";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "@id": `${site.url}/#organization`,
  name: site.name,
  alternateName: site.shortName,
  url: site.url,
  logo: `${site.url}/brand/logo-lsy.png`,
  description: site.description,
  foundingDate: String(site.foundedYear),
  address: {
    "@type": "PostalAddress",
    addressLocality: site.contact.city,
    addressCountry: "CI",
  },
  contactPoint: {
    "@type": "ContactPoint",
    email: site.contact.email,
    contactType: "customer service",
  },
  sameAs: [
    site.social.facebook,
    site.social.youtube,
    site.social.linkedin,
    site.social.x,
  ].filter(Boolean),
};

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} — L'excellence scientifique`,
    template: `%s — ${site.shortName}`,
  },
  description: site.description,
  metadataBase: new URL(site.url),
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: `${site.name} — L'excellence scientifique`,
    description: site.description,
    images: [
      {
        url: "/brand/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${site.name} — établissement d'excellence`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — L'excellence scientifique`,
    description: site.description,
  },
  keywords: [
    "Lycée Scientifique de Yamoussoukro",
    "LSY",
    "lycée d'excellence Côte d'Ivoire",
    "admission Lycée Scientifique Yamoussoukro",
    "lycée scientifique Côte d'Ivoire",
    "classes préparatoires Côte d'Ivoire",
    "excellence scientifique Côte d'Ivoire",
    "réhabilitation Lycée Scientifique de Yamoussoukro",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: site.url,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${manrope.variable} ${playfair.variable} h-full`}
    >
      <body className="flex min-h-full flex-col antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <Header />
        {/*
          pb-20 xl:pb-0 — espace réservé pour BottomMobileNav sur mobile.
          La nav fixe mesure h-16 (4rem) + ~0.5rem pour le liseré.
        */}
        <main className="flex-1 pb-20 xl:pb-0">
          {children}
        </main>
        <Footer />
        <BottomMobileNav />
      </body>
    </html>
  );
}
