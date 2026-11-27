import type { Metadata } from "next";
import JsonLd from "../components/JsonLd";
import Breadcrumbs from "../components/Breadcrumbs";
import { createBreadcrumbJsonLd, createPageMetadata } from "../lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "bgit Changelog and Release History",
  description:
    "Review bgit CLI and Desktop release notes, version updates, new features, fixes, and changes to the Git identity manager and SSH key workflows.",
  path: "/changelog/",
});

export default function ChangelogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="px-6 pt-24"><Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Changelog", href: "/changelog/" }]} /></div>
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
