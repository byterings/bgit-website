import type { Metadata } from "next";
import JsonLd from "../components/JsonLd";
import { createBreadcrumbJsonLd, createPageMetadata } from "../lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Changelog - bgit | Release History and Version Updates",
  description:
    "Track bgit CLI and Desktop releases, including features, fixes, and breaking changes.",
  path: "/changelog/",
});

export default function ChangelogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd
        data={createBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Changelog", path: "/changelog/" },
        ])}
      />
      {children}
    </>
  );
}
