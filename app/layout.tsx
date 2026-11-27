import type { Metadata } from "next";
import "./globals.css";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import { siteConfig } from "./lib/config";
import { createPageMetadata, metadataBase, organizationJsonLd, websiteJsonLd } from "./lib/seo";

const homeMetadata = createPageMetadata({
  title: "bgit – Multiple Git Accounts for CLI & Desktop",
  description:
    "Manage multiple Git accounts and Git identities with bgit CLI and Desktop. Organize SSH keys, per-repository identity, and work and personal projects.",
  path: "/",
});

export const metadata: Metadata = {
  metadataBase,
  ...homeMetadata,
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
    icon: [{ url: "/favicon.ico" }, { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" }],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  other: {
    "theme-color": "#f3f4f8",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c") }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd).replace(/</g, "\\u003c") }} />
      </head>
      <body className="antialiased">
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
