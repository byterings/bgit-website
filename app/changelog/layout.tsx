import type { Metadata } from "next";
import JsonLd from "../components/JsonLd";

export const metadata: Metadata = {
  title: "Changelog - bgit | Release History and Version Updates",
  description:
    "Track the evolution of bgit across releases. View all features, bug fixes, and breaking changes for every version of the bgit CLI tool.",
  alternates: {
    canonical: "https://bgit.byterings.com/changelog/",
  },
  openGraph: {
    title: "Changelog - bgit | Release History and Version Updates",
    description:
      "Track the evolution of bgit across releases. All features, bug fixes, and breaking changes.",
    url: "https://bgit.byterings.com/changelog/",
  },
  twitter: {
    title: "Changelog - bgit | Release History and Version Updates",
    description:
      "Track the evolution of bgit across releases and version updates.",
  },
};

export default function ChangelogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://bgit.byterings.com/" },
            { "@type": "ListItem", position: 2, name: "Changelog", item: "https://bgit.byterings.com/changelog/" },
          ],
        }}
      />
      {children}
    </>
  );
}
