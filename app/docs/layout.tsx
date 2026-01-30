import type { Metadata } from "next";
import JsonLd from "../components/JsonLd";

export const metadata: Metadata = {
  title: "Documentation - bgit | Complete Guide to Multi-Git Identity Management",
  description:
    "Complete documentation for bgit CLI tool. Learn installation, setup, workspaces, identity resolution, SSH key management, troubleshooting, and FAQ.",
  alternates: {
    canonical: "https://bgit.byterings.com/docs/",
  },
  openGraph: {
    title: "Documentation - bgit | Complete Guide to Multi-Git Identity Management",
    description:
      "Complete documentation for bgit CLI tool. Learn installation, setup, workspaces, identity resolution, SSH key management, and troubleshooting.",
    url: "https://bgit.byterings.com/docs/",
  },
  twitter: {
    title: "Documentation - bgit | Complete Guide to Multi-Git Identity Management",
    description:
      "Complete documentation for bgit CLI tool. Installation, workspaces, SSH management, and more.",
  },
};

export default function DocsLayout({
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
            { "@type": "ListItem", position: 2, name: "Documentation", item: "https://bgit.byterings.com/docs/" },
          ],
        }}
      />
      {children}
    </>
  );
}
