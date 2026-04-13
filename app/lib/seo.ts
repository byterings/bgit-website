import type { Metadata } from "next";
import changelogData from "../../public/data/changelog.json";
import { siteConfig } from "./config";

type SitePath = "/" | `/${string}`;

type PageMetadataOptions = {
  title: string;
  description: string;
  path: SitePath;
};

type BreadcrumbItem = {
  name: string;
  path: SitePath;
};

type ChangelogData = {
  releases: Array<{
    date: string;
  }>;
};

const defaultOgImage = {
  url: siteConfig.ogImage,
  width: 1200,
  height: 630,
  alt: "bgit - CLI Tool for Multi-User Git Identity Management",
} as const;

const changelog = changelogData as ChangelogData;

export const metadataBase = new URL(siteConfig.url);

export const publicSiteRoutes = [
  "/",
  "/docs/",
  "/commands/",
  "/changelog/",
  "/support/",
] as const satisfies readonly SitePath[];

export const latestChangelogDate = changelog.releases.reduce(
  (latest, release) => (release.date > latest ? release.date : latest),
  changelog.releases[0]?.date ?? "2026-03-04"
);

export function absoluteUrl(path: SitePath): string {
  return new URL(path, siteConfig.url).toString();
}

export function createPageMetadata({
  title,
  description,
  path,
}: PageMetadataOptions): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: siteConfig.name,
      title,
      description,
      url: path,
      images: [defaultOgImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [siteConfig.ogImage],
    },
  };
}

export function createBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
