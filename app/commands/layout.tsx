import type { Metadata } from "next";
import JsonLd from "../components/JsonLd";
import { createBreadcrumbJsonLd, createPageMetadata } from "../lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Commands Reference - bgit | Full CLI Commands Documentation",
  description:
    "Complete CLI commands reference for bgit. Documentation for init, add, use, clone, workspace, bind, doctor, sync, and all other bgit commands with usage examples.",
  path: "/commands/",
});

export default function CommandsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
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
