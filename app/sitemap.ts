import type { MetadataRoute } from "next";
import { execFileSync } from "node:child_process";
import { join } from "node:path";
import { statSync } from "node:fs";
import { absoluteUrl, publicSiteRoutes } from "./lib/seo";

export const dynamic = "force-static";

const routeSource: Record<(typeof publicSiteRoutes)[number], string> = {
  "/": "app/page.tsx",
  "/desktop/": "app/desktop/page.tsx",
  "/docs/": "app/docs/page.tsx",
  "/commands/": "app/commands/page.tsx",
  "/changelog/": "app/changelog/page.tsx",
  "/support/": "app/support/page.tsx",
  "/blog/": "app/blog/page.tsx",
  "/blog/multiple-github-accounts-one-computer/": "app/lib/blog.ts",
  "/blog/multiple-ssh-keys-for-git/": "app/lib/blog.ts",
  "/blog/fix-wrong-git-author/": "app/lib/blog.ts",
  "/blog/git-includeif-vs-bgit/": "app/lib/blog.ts",
  "/blog/bgit-vs-manual-ssh-config/": "app/lib/blog.ts",
  "/docs/install/": "app/docs/topic-data.ts",
  "/docs/ssh-keys/": "app/docs/topic-data.ts",
  "/docs/workspaces/": "app/docs/topic-data.ts",
  "/docs/desktop-app/": "app/docs/topic-data.ts",
  "/docs/cli/": "app/docs/topic-data.ts",
};

function lastModified(source: string): Date {
  try {
    const date = execFileSync("git", ["log", "-1", "--format=%cI", "--", source], { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
    if (date) return new Date(date);
  } catch { /* Use the source file timestamp when building without Git history. */ }
  return statSync(join(process.cwd(), source)).mtime;
}

export default function sitemap(): MetadataRoute.Sitemap {
  return publicSiteRoutes.map((path) => ({
    url: absoluteUrl(path),
    lastModified: lastModified(routeSource[path]),
  }));
}
