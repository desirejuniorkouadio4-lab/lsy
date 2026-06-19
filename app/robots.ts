import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/portail/eleve/", "/portail/parent/", "/portail/enseignant/"],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
