import type { MetadataRoute } from "next";
import { absoluteUrl, latestChangelogDate, publicSiteRoutes } from "./lib/seo";

export const dynamic = "force-static";

const priorities: Record<(typeof publicSiteRoutes)[number], number> = {
  "/": 1,
  "/docs/": 0.9,
  "/commands/": 0.8,
  "/changelog/": 0.6,
  "/support/": 0.5,
};

const changeFrequencies: Record<
  (typeof publicSiteRoutes)[number],
  MetadataRoute.Sitemap[number]["changeFrequency"]
> = {
  "/": "weekly",
  "/docs/": "weekly",
  "/commands/": "weekly",
  "/changelog/": "monthly",
  "/support/": "monthly",
};

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(latestChangelogDate);

  return publicSiteRoutes.map((path) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency: changeFrequencies[path],
    priority: priorities[path],
  }));
}
