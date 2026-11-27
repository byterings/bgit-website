import type { Metadata } from "next";
import JsonLd from "../components/JsonLd";
import Breadcrumbs from "../components/Breadcrumbs";
import { createBreadcrumbJsonLd, createPageMetadata } from "../lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "bgit CLI Commands Reference",
  description:
    "Find bgit CLI commands for multiple Git accounts, identity switching, SSH keys, per-repository bindings, workspaces, diagnostics, and repository safety checks.",
  path: "/commands/",
});

export default function CommandsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="px-6 pt-24"><Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "CLI Commands", href: "/commands/" }]} /></div>
      <JsonLd
        data={createBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Commands Reference", path: "/commands/" },
        ])}
      />
      {children}
    </>
  );
}
