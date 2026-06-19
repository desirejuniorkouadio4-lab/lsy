import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: [
    "better-sqlite3",
    "@prisma/adapter-better-sqlite3",
  ],
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // Vercel Blob
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
      { protocol: "https", hostname: "*.blob.vercel-storage.com" },
      // Images externes génériques (CDN partenaires, etc.)
      { protocol: "https", hostname: "**" },
    ],
  },
};

export default nextConfig;
