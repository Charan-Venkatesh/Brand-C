import type { MetadataRoute } from "next";
import { SITE_URL, projects } from "@/data/portfolio";

export const dynamic = "force-static";

const pages: { path: string; priority: number }[] = [
  { path: "", priority: 1 },
  { path: "hire/", priority: 0.9 },
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
  const all = [...pages, ...projects.map((p) => ({ path: `work/${p.id}/`, priority: p.isFeatured ? 0.8 : 0.6 }))];
  return all.map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority,
  }));
}
