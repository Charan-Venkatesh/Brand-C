import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/portfolio";

export const dynamic = "force-static";

const pages: { path: string; priority: number }[] = [
  { path: "", priority: 1 },
  { path: "projects/", priority: 0.9 },
  { path: "experience/", priority: 0.8 },
  { path: "journey/", priority: 0.7 },
  { path: "about/", priority: 0.7 },
  { path: "skills/", priority: 0.6 },
  { path: "certifications/", priority: 0.6 },
  { path: "resume/", priority: 0.8 },
  { path: "contact/", priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return pages.map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority,
  }));
}
