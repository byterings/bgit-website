import type { Metadata } from "next";
import JsonLd from "../components/JsonLd";

export const metadata: Metadata = {
  title: "Commands Reference - bgit | Full CLI Commands Documentation",
  description:
    "Complete CLI commands reference for bgit. Documentation for init, add, use, clone, workspace, bind, doctor, sync, and all other bgit commands with usage examples.",
  alternates: {
    canonical: "https://bgit.byterings.com/commands/",
  },
  openGraph: {
    title: "Commands Reference - bgit | Full CLI Commands Documentation",
    description:
      "Complete CLI commands reference for bgit. All commands with usage, details, and workflow examples.",
    url: "https://bgit.byterings.com/commands/",
  },
  twitter: {
    title: "Commands Reference - bgit | Full CLI Commands Documentation",
    description:
      "Complete CLI commands reference for bgit with usage examples and common workflows.",
  },
};

export default function CommandsLayout({
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
            { "@type": "ListItem", position: 2, name: "Commands Reference", item: "https://bgit.byterings.com/commands/" },
          ],
        }}
      />
      {children}
    </>
  );
}
