import type { Metadata } from "next";
import "./globals.css";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import { siteConfig } from "./lib/config";
import { createPageMetadata, metadataBase } from "./lib/seo";

const homeMetadata = createPageMetadata({
  title: "bgit - Git identities, in your terminal or desktop",
  description:
    "Manage multiple Git identities with bgit Desktop or the CLI. Keep repository identity, SSH keys, commits, and pushes organized across work and personal accounts.",
  path: "/",
});

export const metadata: Metadata = {
  metadataBase,
  ...homeMetadata,
  keywords: ["bgit", "git cli tool", "git desktop app", "git identity manager", "multiple git accounts", "git multi-user", "ssh key management", "git account switcher", "developer tools"],
  authors: [{ name: siteConfig.author }],
  creator: siteConfig.author,
  publisher: siteConfig.author,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: "/images/favicon.ico",
  },
  other: {
    "theme-color": "#0a0a0a",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
