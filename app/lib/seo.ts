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
  type: "image/png",
  width: 1200,
  height: 630,
  alt: "bgit - Git identities for Desktop and CLI",
} as const;

const changelog = changelogData as ChangelogData;

export const metadataBase = new URL(siteConfig.url);

export const publicSiteRoutes = [
  "/",
  "/desktop/",
  "/docs/",
  "/commands/",
  "/changelog/",
  "/support/",
  "/blog/",
  "/blog/multiple-github-accounts-one-computer/",
  "/blog/multiple-ssh-keys-for-git/",
  "/blog/fix-wrong-git-author/",
  "/blog/git-includeif-vs-bgit/",
  "/blog/bgit-vs-manual-ssh-config/",
  "/docs/install/",
  "/docs/ssh-keys/",
  "/docs/workspaces/",
  "/docs/desktop-app/",
  "/docs/cli/",
] as const satisfies readonly SitePath[];

export const latestChangelogDate = changelog.releases.reduce(
  (latest, release) => (release.date > latest ? release.date : latest),
  changelog.releases[0]?.date ?? "2026-03-04",
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
      images: [{ url: siteConfig.ogImage, alt: defaultOgImage.alt }],
    },
  };
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ByteRings",
  url: siteConfig.authorUrl,
  logo: absoluteUrl("/images/logo.png"),
  sameAs: [siteConfig.github],
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: `${siteConfig.url}/`,
};

export function createSoftwareApplicationJsonLd(description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "bgit",
    description,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Windows, macOS, Linux",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    softwareVersion: siteConfig.version,
    license: "https://opensource.org/license/mit/",
    downloadUrl: siteConfig.releases,
    url: `${siteConfig.url}/`,
    image: absoluteUrl(siteConfig.ogImage),
    author: { "@type": "Organization", name: "ByteRings", url: siteConfig.authorUrl },
    publisher: { "@type": "Organization", name: "ByteRings", url: siteConfig.authorUrl },
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
