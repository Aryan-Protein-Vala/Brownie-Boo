import type { MetadataRoute } from "next";
import { publicOrigin } from "../lib/search";

export default function robots(): MetadataRoute.Robots {
  return {
    // Search crawlers can read public HTML, including OAI-SearchBot.
    // Crawl access also lets bots see the preview pages' noindex tags.
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/admin"] },
    ...(publicOrigin && { sitemap: `${publicOrigin}/sitemap.xml` }),
  };
}
