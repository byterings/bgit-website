import Link from "next/link";
import HeroTerminalScene from "./components/HeroTerminalScene";
import JsonLd from "./components/JsonLd";
import QuickInstallSection from "./components/QuickInstallSection";
import { siteConfig } from "./lib/config";

export default function Home() {
  return (
    <div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "bgit",
          description:
            "A powerful CLI tool for managing multiple Git identities. Switch between work, personal, and client accounts with one command.",
          applicationCategory: "DeveloperApplication",
          operatingSystem: "Linux, macOS, Windows",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
          url: "https://bgit.byterings.com",
          downloadUrl: "https://github.com/byterings/bgit/releases",
          softwareVersion: siteConfig.version,
          author: {
            "@type": "Organization",
            name: "ByteRings",
            url: "https://byterings.com",
          },
        }}
      />
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto lg:grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12 lg:items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-6xl md:text-7xl font-bold mb-6">bgit</h1>
            <p className="text-3xl text-muted mb-8">
              Stop switching Git accounts manually.
              <br />
              Manage multiple identities with one command.
            </p>
            <p className="text-xl text-foreground/90 mb-12 max-w-3xl mx-auto lg:mx-0 leading-relaxed">
              Switch between work, personal, and client Git accounts instantly
              — no config editing, no remote URL headaches.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <a
                href="#quick-start"
                className="inline-flex min-w-[168px] items-center justify-center rounded-xl border border-sky-200/70 bg-gradient-to-r from-cyan-200 via-sky-200 to-blue-300 px-8 py-4 text-lg font-semibold text-slate-950 shadow-[0_14px_34px_rgba(96,165,250,0.24)] transition-all duration-200 hover:-translate-y-0.5 hover:from-cyan-100 hover:via-sky-100 hover:to-blue-200 hover:shadow-[0_18px_40px_rgba(96,165,250,0.3)]">
                Quick Start
              </a>
              <a
                href="#why-bgit"
                className="inline-flex min-w-[168px] items-center justify-center rounded-xl border border-white/14 bg-gradient-to-r from-white/7 to-sky-300/8 px-8 py-4 text-lg font-semibold text-white shadow-[0_12px_28px_rgba(15,23,42,0.2)] backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-sky-200/30 hover:from-white/10 hover:to-sky-300/12 hover:shadow-[0_16px_34px_rgba(59,130,246,0.14)]">
                Why bgit
              </a>
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm text-muted lg:justify-start">
              <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
                Built by developers, for developers
              </div>
              <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
                Open source on GitHub
              </div>
            </div>
          </div>

          <div className="mt-14 lg:mt-0">
            <p className="mb-4 text-center text-sm font-semibold uppercase tracking-[0.22em] text-accent lg:text-left">
              Real workflow in seconds
            </p>
            <HeroTerminalScene />
          </div>
        </div>
      </section>

      <QuickInstallSection />

      {/* Problem/Solution Section */}
      <section id="why-bgit" className="py-20 px-6 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Why bgit?</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Problem Card */}
            <div className="bg-[#0a0a0a] border border-red-900/40 rounded-xl p-8 shadow-[0_4px_24px_rgba(239,68,68,0.15)] hover:shadow-[0_8px_32px_rgba(239,68,68,0.25)] hover:border-red-800/60 transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-red-500/15 border border-red-500/30 flex items-center justify-center">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-red-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-red-400">The Problem</h3>
              </div>
              <ul className="space-y-4 text-foreground/90">
                <li className="flex gap-3">
                  <span className="text-red-400 mt-0.5">-</span>
                  <span>
                    Constantly switching SSH configs
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-red-400 mt-0.5">-</span>
                  <span>Pushing with wrong identity</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-red-400 mt-0.5">-</span>
                  <span>Fixing remotes again and again</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-red-400 mt-0.5">-</span>
                  <span>
                    Never sure which account you&apos;re currently using
                  </span>
                </li>
              </ul>
            </div>

            {/* Solution Card */}
            <div className="bg-[#0a0a0a] border border-green-900/40 rounded-xl p-8 shadow-[0_4px_24px_rgba(34,197,94,0.15)] hover:shadow-[0_8px_32px_rgba(34,197,94,0.25)] hover:border-green-800/60 transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-green-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-green-400">
                  The Solution
                </h3>
              </div>
              <ul className="space-y-4 text-foreground/90">
                <li className="flex gap-3">
                  <span className="text-green-400 mt-0.5">+</span>
                  <span>
                    One command to switch: <code>bgit use work</code>
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-green-400 mt-0.5">+</span>
                  <span>
                    Workspaces for automatic identity by folder
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-green-400 mt-0.5">+</span>
                  <span>
                    Built-in diagnostics with <code>bgit doctor</code>
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-green-400 mt-0.5">+</span>
                  <span>
                    Keep using normal <code>git</code> commands
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center">Features</h2>
          <p className="text-center text-muted mb-12 text-lg">
            Everything you need in a Git identity management CLI tool
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Identity Switching */}
            <div className="bg-[#0d0d0d] border border-gray-800 rounded-xl p-6 shadow-[0_4px_20px_rgba(82,168,255,0.08)] hover:shadow-[0_8px_30px_rgba(82,168,255,0.18)] hover:border-accent/40 hover:-translate-y-1 transition-all duration-300">
              <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 flex items-center justify-center mb-4">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-accent"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Switch accounts instantly</h3>
              <p className="text-muted text-sm">
                No config edits. No mistakes.
              </p>
            </div>

            {/* Workspaces */}
            <div className="bg-[#0d0d0d] border border-gray-800 rounded-xl p-6 shadow-[0_4px_20px_rgba(82,168,255,0.08)] hover:shadow-[0_8px_30px_rgba(82,168,255,0.18)] hover:border-accent/40 hover:-translate-y-1 transition-all duration-300">
              <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 flex items-center justify-center mb-4">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-accent"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Workspaces</h3>
              <p className="text-muted text-sm">
                Organize projects by identity. Repos in workspace folders automatically use the right account
              </p>
            </div>

            {/* SSH Management */}
            <div className="bg-[#0d0d0d] border border-gray-800 rounded-xl p-6 shadow-[0_4px_20px_rgba(82,168,255,0.08)] hover:shadow-[0_8px_30px_rgba(82,168,255,0.18)] hover:border-accent/40 hover:-translate-y-1 transition-all duration-300">
              <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 flex items-center justify-center mb-4">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-accent"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">SSH Management</h3>
              <p className="text-muted text-sm">
                Automatic SSH key generation and configuration for each identity
              </p>
            </div>

            {/* Diagnostics */}
            <div className="bg-[#0d0d0d] border border-gray-800 rounded-xl p-6 shadow-[0_4px_20px_rgba(82,168,255,0.08)] hover:shadow-[0_8px_30px_rgba(82,168,255,0.18)] hover:border-accent/40 hover:-translate-y-1 transition-all duration-300">
              <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 flex items-center justify-center mb-4">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-accent"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Diagnostics</h3>
              <p className="text-muted text-sm">
                Built-in doctor command to diagnose and auto-fix SSH permissions and config issues
              </p>
            </div>

            {/* Cross-Platform */}
            <div className="bg-[#0d0d0d] border border-gray-800 rounded-xl p-6 shadow-[0_4px_20px_rgba(82,168,255,0.08)] hover:shadow-[0_8px_30px_rgba(82,168,255,0.18)] hover:border-accent/40 hover:-translate-y-1 transition-all duration-300">
              <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 flex items-center justify-center mb-4">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-accent"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Cross-Platform</h3>
              <p className="text-muted text-sm">
                Works perfectly on Linux, macOS, and Windows
              </p>
            </div>

            {/* Repo Binding */}
            <div className="bg-[#0d0d0d] border border-gray-800 rounded-xl p-6 shadow-[0_4px_20px_rgba(82,168,255,0.08)] hover:shadow-[0_8px_30px_rgba(82,168,255,0.18)] hover:border-accent/40 hover:-translate-y-1 transition-all duration-300">
              <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 flex items-center justify-center mb-4">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-accent"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Repo Binding</h3>
              <p className="text-muted text-sm">
                Bind individual repos to specific identities for persistent ownership
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-[#0d0d0d]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Stop wasting time switching Git accounts
            <br />
            Start using bgit in seconds
          </h2>
          <p className="text-xl text-muted mb-12 max-w-2xl mx-auto">
            Join developers who use this CLI tool to manage multiple Git
            accounts effortlessly
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/docs"
              className="inline-flex min-w-[190px] items-center justify-center rounded-xl border border-sky-200/70 bg-gradient-to-r from-cyan-200 via-sky-200 to-blue-300 px-10 py-5 text-lg font-semibold text-slate-950 shadow-[0_14px_34px_rgba(96,165,250,0.24)] transition-all duration-200 hover:-translate-y-0.5 hover:from-cyan-100 hover:via-sky-100 hover:to-blue-200 hover:shadow-[0_18px_40px_rgba(96,165,250,0.3)]">
              Get Started Now
            </Link>
            <Link
              href="/commands"
              className="inline-flex min-w-[190px] items-center justify-center rounded-xl border border-white/14 bg-gradient-to-r from-white/7 to-sky-300/8 px-10 py-5 text-lg font-semibold text-white shadow-[0_12px_28px_rgba(15,23,42,0.2)] backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-sky-200/30 hover:from-white/10 hover:to-sky-300/12 hover:shadow-[0_16px_34px_rgba(59,130,246,0.14)]">
              View All Commands
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
