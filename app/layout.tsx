import type { Metadata } from "next";
import "./globals.css";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "bgit - CLI Tool for Multi-User Git Identity Management",
  description: "bgit is a powerful CLI tool for managing multiple Git identities. Switch between work, personal, and client accounts with one command. Automatic SSH key management, workspaces, and zero configuration mistakes.",
  keywords: ["bgit", "git cli tool", "git identity manager", "multiple git accounts", "git multi-user", "ssh key management", "git account switcher", "developer tools", "command line tool"],
  authors: [{ name: "Byterings" }],
  creator: "Byterings",
  publisher: "Byterings",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bgit.byterings.com",
    siteName: "bgit",
    title: "bgit - CLI Tool for Multi-User Git Identity Management",
    description: "A powerful CLI tool for managing multiple Git identities. Switch between accounts with one command, automatic SSH management, and workspace organization.",
  },
  twitter: {
    card: "summary_large_image",
    title: "bgit - CLI Tool for Multi-User Git Identity Management",
    description: "A powerful CLI tool for managing multiple Git identities. Switch between accounts with one command.",
  },
  alternates: {
    canonical: "https://bgit.byterings.com",
  },
  icons: {
    icon: "/images/favicon.ico",
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
