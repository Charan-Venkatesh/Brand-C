import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/portfolio";

export const dynamic = "force-static";

// Served at the domain root on charan-venkatesh.github.io.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: "/admin/" }],
    sitemap: `${SITE_URL}sitemap.xml`,
    host: SITE_URL,
  };
}
