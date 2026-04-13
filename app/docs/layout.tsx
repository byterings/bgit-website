import type { Metadata } from "next";
import JsonLd from "../components/JsonLd";
import { createBreadcrumbJsonLd, createPageMetadata } from "../lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Documentation - bgit | Complete Guide to Multi-Git Identity Management",
  description:
    "Complete documentation for bgit CLI tool. Learn installation, setup, workspaces, identity resolution, SSH key management, troubleshooting, and FAQ.",
  path: "/docs/",
});

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd
        data={createBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Documentation", path: "/docs/" },
        ])}
      />
      {children}
    </>
  );
}
