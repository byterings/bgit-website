"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import BrandLogo from "./BrandLogo";
import ThemeToggle from "./ThemeToggle";
import SearchDialog from "./SearchDialog";

const navLinks = [
  { href: "/desktop", label: "Desktop" },
  { href: "/docs", label: "Docs" },
  { href: "/commands", label: "CLI reference" },
  { href: "/changelog", label: "Changelog" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const normalizePath = (path: string) =>
    path === "/" ? "/" : path.replace(/\/+$/, "");
  const isActive = (path: string) =>
    normalizePath(pathname) === normalizePath(path);

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/[.07] bg-[#090b10]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-[68px] max-w-[1320px] items-center justify-between px-4 sm:px-7">
        <Link href="/" className="group flex shrink-0 items-center" aria-label="bgit home">
          <BrandLogo priority />
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`rounded-md px-3 py-2 text-[13px] transition ${isActive(href) ? "bg-white/[.07] text-white" : "text-slate-400 hover:bg-white/[.045] hover:text-slate-100"}`}>
              {label}
            </Link>
          ))}
          <a
            href="https://github.com/byterings/bgit"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md px-3 py-2 text-[13px] text-slate-400 transition hover:bg-white/[.045] hover:text-slate-100">
            GitHub ↗
          </a>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <SearchDialog variant="mobile" />
          <span className="h-5 w-px bg-white/10" />
          <ThemeToggle />
          <Link
            href="/desktop#downloads"
            className="ml-1 inline-flex h-9 items-center rounded-lg bg-violet-500 px-4 text-xs font-semibold text-white shadow-[0_5px_18px_rgba(124,58,237,.2)] transition hover:bg-violet-400">
            Download
          </Link>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="rounded-md p-2 text-slate-200 hover:bg-white/[.07]"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}>
            {mobileMenuOpen ? (
              <svg
                aria-hidden="true"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                aria-hidden="true"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-white/[.07] bg-[#090b10]/95 px-4 pb-5 pt-3 backdrop-blur-xl md:hidden">
          <SearchDialog variant="mobile" />
          <div className="mt-3 space-y-1">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block rounded-lg px-3 py-2.5 text-sm ${isActive(href) ? "bg-violet-400/10 text-violet-200" : "text-slate-300 hover:bg-white/[.05]"}`}>
                {label}
              </Link>
            ))}
            <a
              href="https://github.com/byterings/bgit"
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg px-3 py-2.5 text-sm text-slate-300 hover:bg-white/[.05]">
              GitHub ↗
            </a>
            <Link
              href="/desktop#downloads"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 flex h-11 items-center justify-center rounded-lg bg-violet-500 text-sm font-semibold text-white">
              Download bgit Desktop
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
