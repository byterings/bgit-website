import type { Metadata } from "next";
import { createPageMetadata } from "../lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "bgit Docs: Git Identity and SSH Setup",
  description:
    "Install and use bgit CLI and Desktop to manage multiple Git accounts, SSH keys, per-repository identity, workspaces, and common Git configuration issues.",
  path: "/docs/",
});

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>{children}</>
  );
}
