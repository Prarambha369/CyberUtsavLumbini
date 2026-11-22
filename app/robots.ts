import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/data";

/**
 * Everything is crawlable — including /_next/ (CSS, JS, optimized images), which
 * Google needs to render the page. Search and AI answer engines are explicitly
 * welcomed so the event can be cited; Bytespider stays blocked.
 */
export default function robots(): MetadataRoute.Robots {
  const answerEngines = [
    "Googlebot",
    "Bingbot",
    "GPTBot",
    "OAI-SearchBot",
    "ChatGPT-User",
    "Google-Extended",
    "PerplexityBot",
    "ClaudeBot",
    "Claude-SearchBot",
    "Applebot-Extended",
  ];

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      { userAgent: answerEngines, allow: "/", disallow: ["/api/"] },
      { userAgent: "Bytespider", disallow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
