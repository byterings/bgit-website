import { bgitVersion } from "./generated-release";

export const siteConfig = {
  version: bgitVersion,
  url: "https://bgitcli.com",
  github: "https://github.com/byterings/bgit",
  releases: "https://github.com/byterings/bgit/releases",
  name: "bgit",
  author: "ByteRings",
  authorUrl: "https://byterings.com",
  contactEmail: "bgit@byterings.com",
  ogImage: "/images/og-image.svg",
} as const;
