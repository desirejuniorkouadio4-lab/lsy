import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Modules natifs / Prisma : à garder hors du bundle serveur.
  serverExternalPackages: [
    "better-sqlite3",
    "@prisma/adapter-better-sqlite3",
  ],
  images: {
    // Le site s'appuie sur un habillage SVG/gradient de marque + le logo local.
    // Formats modernes pour les rares images bitmap.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
