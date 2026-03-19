import changelogData from "../../public/data/changelog.json";
import { bgitCommands } from "./commands";
import { docsSections, faqItems } from "./docs";
import { siteConfig } from "./config";

export interface SearchEntry {
  id: string;
  title: string;
  description: string;
  href: string;
  category: "Page" | "Docs" | "Command" | "FAQ" | "Release";
  keywords?: string[];
}

export interface SearchResult extends SearchEntry {
  score: number;
}

const staticEntries: SearchEntry[] = [
  {
    id: "page-home",
    title: "Home",
    description:
      "Overview of bgit, key features, GitHub link, and entry points into docs and commands.",
    href: "/",
    category: "Page",
    keywords: ["overview", "features", "home", "intro", "download"],
  },
  {
    id: "page-docs",
    title: "Documentation",
    description:
      "Complete guide covering installation, setup, workspaces, troubleshooting, and FAQ.",
    href: "/docs",
    category: "Page",
    keywords: ["docs", "guide", "manual", "help"],
  },
  {
    id: "page-commands",
    title: "Commands Reference",
    description:
      "Full bgit CLI command catalog with usage, details, and common workflows.",
    href: "/commands",
    category: "Page",
    keywords: ["commands", "reference", "cli", "manual"],
  },
  {
    id: "page-changelog",
    title: "Changelog",
    description:
      "Track release phases, features, fixes, and breaking changes across bgit versions.",
    href: "/changelog",
    category: "Page",
    keywords: ["releases", "versions", "updates", "history"],
  },
  {
    id: "page-support",
    title: "Support the Project",
    description:
      "Find links for bug reports, contributors, repository support, and project promotion.",
    href: "/support",
    category: "Page",
    keywords: ["support", "issues", "contribute", "contributors"],
  },
];

const docsEntries: SearchEntry[] = docsSections.map((section) => ({
  id: `docs-${section.id}`,
  title: section.label,
  description: section.description,
  href: `/docs#${section.id}`,
  category: "Docs",
  keywords: section.keywords,
}));

const commandEntries: SearchEntry[] = bgitCommands.map((command) => ({
  id: `command-${command.id}`,
  title: command.name,
  description: command.description,
  href: `/commands#${command.id}`,
  category: "Command",
  keywords: [command.usage, command.details, command.example ?? ""],
}));

const faqEntries: SearchEntry[] = faqItems.map((faq, index) => ({
  id: `faq-${index + 1}`,
  title: faq.question,
  description: faq.answer,
  href: "/docs#faq",
  category: "FAQ",
  keywords: [faq.answer],
}));

const releaseEntries: SearchEntry[] = changelogData.releases.map((release) => ({
  id: `release-${release.version}`,
  title: `v${release.version}`,
  description: release.summary,
  href: `/changelog#v${release.version}`,
  category: "Release",
  keywords: [
    `phase ${release.phase}`,
    release.date,
    ...release.features.map((feature) => feature.title),
    ...release.features.map((feature) =>
      "command" in feature ? feature.command ?? "" : ""
    ),
    ...(release.fixes?.map((fix) => fix.title) ?? []),
  ],
}));

export const searchEntries: SearchEntry[] = [
  ...staticEntries,
  ...docsEntries,
  ...commandEntries,
  ...faqEntries,
  ...releaseEntries,
];

const categoryBoost: Record<SearchEntry["category"], number> = {
  Page: 0,
  Docs: 8,
  Command: 10,
  FAQ: 4,
  Release: 2,
};

function normalize(value: string) {
  return value.toLowerCase().replace(/[^\w\s./-]+/g, " ").replace(/\s+/g, " ").trim();
}

function scoreEntry(entry: SearchEntry, query: string) {
  const normalizedQuery = normalize(query);
  if (!normalizedQuery) {
    return 0;
  }

  const title = normalize(entry.title);
  const description = normalize(entry.description);
  const keywords = normalize((entry.keywords ?? []).join(" "));
  const href = normalize(entry.href);
  const haystack = `${title} ${description} ${keywords} ${href}`;
  const tokens = normalizedQuery.split(" ").filter(Boolean);

  let score = categoryBoost[entry.category];

  if (title === normalizedQuery) {
    score += 160;
  }

  if (title.startsWith(normalizedQuery)) {
    score += 80;
  }

  if (haystack.includes(normalizedQuery)) {
    score += 45;
  }

  for (const token of tokens) {
    if (!haystack.includes(token)) {
      return 0;
    }

    if (title.includes(token)) {
      score += 24;
    }

    if (keywords.includes(token)) {
      score += 14;
    }

    if (description.includes(token)) {
      score += 10;
    }

    if (href.includes(token)) {
      score += 6;
    }
  }

  return score;
}

export function searchSite(query: string, limit = 8): SearchResult[] {
  const normalizedQuery = normalize(query);
  if (!normalizedQuery) {
    return [];
  }

  return searchEntries
    .map((entry) => ({
      ...entry,
      score: scoreEntry(entry, normalizedQuery),
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
    .slice(0, limit);
}

export const searchMeta = {
  totalEntries: searchEntries.length,
  version: siteConfig.version,
};
