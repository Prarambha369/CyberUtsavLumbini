import type { MetadataRoute } from "next";

export const dynamic = "force-static";
import { SITE_URL } from "@/lib/data";

/**
 * Single-page site: one canonical URL. `#section` fragments are ignored by search
 * engines, and sitemaps may only list URLs on this host, so neither belongs here.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      images: [`${SITE_URL}/opengraph-image`],
    },
  ];
}
