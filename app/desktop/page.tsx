import type { Metadata } from 'next';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import JsonLd from '../components/JsonLd';
import Breadcrumbs from '../components/Breadcrumbs';
import { siteConfig } from '../lib/config';
import { createBreadcrumbJsonLd, createPageMetadata } from '../lib/seo';

const release = 'https://github.com/byterings/bgit/releases/latest/download';
const DesktopPreview = dynamic(() => import('./DesktopPreview'), { loading: () => <div aria-hidden="true" className="min-h-[400px] animate-pulse rounded-xl bg-white/[.03]" /> });
const downloads = [
  { os: 'Windows', requirement: 'Windows 10 or 11 · 64-bit', file: 'bgit-desktop-windows-amd64-installer.exe', action: 'Download for Windows' },
  { os: 'macOS', requirement: 'macOS 11+ · Intel and Apple Silicon', file: 'bgit-desktop-darwin-universal.dmg', action: 'Download for macOS' },
  { os: 'Linux', requirement: 'Ubuntu 22.04+ / Debian 12+ · 64-bit', file: 'bgit-desktop-linux-amd64.deb', action: 'Download for Linux' },
];

export const metadata: Metadata = createPageMetadata({
  title: 'bgit Desktop Git Identity Manager',
  description: 'Manage multiple Git accounts in a desktop app. Review repositories, commits, SSH keys, and per-repository identities alongside your bgit CLI setup.',
  path: '/desktop/',
});

const highlights = [
  ['See the identity first', 'The repository header shows which identity applies and whether it comes from a binding, workspace, remote, or default.'],
  ['Work from one repository view', 'Review changed files and diffs, create commits, inspect history, manage branches, and sync with the remote.'],
  ['Keep the setup healthy', 'Manage identities and SSH keys, run Doctor checks, and protect your setup with encrypted backups.'],
];

export default function DesktopPage() {
  return (
    <div className="product-shell overflow-hidden">
      <JsonLd data={createBreadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Desktop App', path: '/desktop/' }])} />
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'bgit', applicationCategory: 'DeveloperApplication', operatingSystem: 'Windows, macOS, Linux', isAccessibleForFree: true, offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }, softwareVersion: siteConfig.version, license: 'https://opensource.org/license/mit/', description: 'A desktop Git identity and repository workflow app that shares configuration with the bgit CLI.', url: 'https://bgitcli.com/desktop/', image: 'https://bgitcli.com/images/og-image.png', downloadUrl: 'https://github.com/byterings/bgit/releases/latest', author: { '@type': 'Organization', name: 'ByteRings', url: 'https://byterings.com' }, publisher: { '@type': 'Organization', name: 'ByteRings', url: 'https://byterings.com' } }} />
      <div className="px-5 sm:px-8"><Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Desktop App', href: '/desktop/' }]} /></div>

      <section className="relative isolate px-5 pb-16 pt-32 sm:px-8 sm:pt-36">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-1/2 top-[-430px] h-[760px] w-[900px] -translate-x-1/2 rounded-full bg-violet-600/[.15] blur-[150px]" />
          <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-b from-transparent to-background" />
        </div>
        <div className="mx-auto max-w-[1320px] text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-violet-300/15 bg-violet-300/[.06] px-3.5 py-2 text-xs font-medium text-violet-100/90"><span className="h-1.5 w-1.5 rounded-full bg-violet-300"/>bgit Desktop <span className="text-violet-200/50">·</span> v{siteConfig.version}</p>
          <h1 className="mx-auto mt-7 max-w-4xl text-[clamp(3rem,6vw,5.75rem)] font-semibold leading-[1.01] tracking-[-.065em] text-white">Many identities.<br/><span className="bg-gradient-to-r from-violet-200 via-violet-300 to-indigo-300 bg-clip-text text-transparent">No second guessing.</span></h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">See your repositories, review changes, and know which Git identity applies before you commit or push. Your existing bgit CLI setup comes with you.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="#downloads" className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-violet-500 px-5 text-sm font-semibold text-white shadow-[0_8px_28px_rgba(124,58,237,.25)] transition hover:-translate-y-0.5 hover:bg-violet-400">Download bgit Desktop <span aria-hidden="true">↓</span></a>
            <a href="#preview" className="inline-flex min-h-12 items-center rounded-lg border border-white/15 bg-white/[.025] px-5 text-sm font-semibold text-slate-100 transition hover:border-white/30 hover:bg-white/[.06]">Explore the preview</a>
          </div>
          <div id="preview" className="mx-auto mt-14 max-w-[1180px] scroll-mt-28 text-left">
            <div className="rounded-[20px] border border-white/[.12] bg-[#0b0f19]/90 p-1.5 shadow-[0_36px_110px_rgba(0,0,0,.6)] sm:p-2.5"><DesktopPreview /></div>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 px-1 text-[11px] text-slate-500"><span>Interactive preview · Sample repositories and identities</span><span>Choose a section in the app bar to explore</span></div>
          </div>
        </div>
      </section>

      <section id="downloads" className="scroll-mt-24 border-y border-white/[.07] bg-white/[.018] px-5 py-14 sm:px-8">
        <div className="mx-auto max-w-[1160px]">
          <div className="mb-7 flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[.2em] text-violet-300">Get started</p><h2 className="mt-2 text-2xl font-semibold tracking-[-.035em] text-white sm:text-3xl">Download for your computer.</h2></div><Link href="/docs/#desktop-app" className="text-sm text-slate-400 transition hover:text-violet-200">Read the install guide <span aria-hidden="true">→</span></Link></div>
          <div className="grid gap-3 md:grid-cols-3">
            {downloads.map(({ os, requirement, file, action }) => (
              <a key={os} href={`${release}/${file}`} className="group flex min-h-[120px] flex-col justify-between rounded-xl border border-white/[.09] bg-[#0d111b] p-5 transition hover:-translate-y-0.5 hover:border-violet-300/30 hover:bg-[#101522]">
                <div className="flex items-start justify-between gap-3"><div><p className="text-sm font-semibold text-white">{os}</p><p className="mt-1.5 text-xs text-slate-400">{requirement}</p></div><span aria-hidden="true" className="text-slate-500 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-violet-200">↗</span></div>
                <span className="mt-5 text-xs font-medium text-violet-200">{action}</span>
              </a>
            ))}
          </div>
          <p className="mt-4 text-xs leading-5 text-slate-500">Requires Git on your computer. Linux package installs Git and its desktop dependencies. <Link href="/docs/#desktop-app" className="text-slate-300 underline decoration-white/20 underline-offset-4 hover:text-white">Installation steps and requirements</Link>.</p>
        </div>
      </section>

      <section className="px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-[1160px]">
          <div className="mb-12 max-w-2xl"><p className="text-xs font-semibold uppercase tracking-[.2em] text-violet-300">Made for multi-account work</p><h2 className="mt-4 text-3xl font-semibold tracking-[-.045em] text-white sm:text-4xl">The details you need.<br/>Right where you need them.</h2></div>
          <div className="grid gap-3 md:grid-cols-3">
            {highlights.map(([title, description], index) => (
              <article key={title} className="relative min-h-[230px] overflow-hidden rounded-2xl border border-white/[.09] bg-[#0d111b] p-6 sm:p-7">
                <span className="font-mono text-[11px] text-violet-300/70">0{index + 1}</span>
                <h3 className="mt-8 text-lg font-semibold tracking-[-.02em] text-white">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{description}</p>
                <div aria-hidden="true" className="absolute -bottom-16 -right-12 h-36 w-36 rounded-full bg-violet-500/[.07] blur-3xl" />
              </article>
            ))}
          </div>
          <div className="mt-5 rounded-xl border border-amber-300/15 bg-amber-300/[.035] p-5 text-sm leading-6 text-slate-400"><strong className="text-slate-200">Merge conflicts:</strong> bgit Desktop shows conflicted files and status. Resolve conflict markers in your editor, save the files, then return to bgit to commit and finish the merge.</div>
        </div>
      </section>

      <section className="border-y border-white/[.07] bg-[#0c1019] px-5 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-[1160px] gap-10 md:grid-cols-[.8fr_1.2fr] md:items-center">
          <div><p className="text-xs font-semibold uppercase tracking-[.2em] text-violet-300">Already use bgit?</p><h2 className="mt-4 text-3xl font-semibold tracking-[-.04em] text-white">Pick up where you left off.</h2><p className="mt-4 text-sm leading-6 text-slate-400">Desktop and CLI share identities, SSH configuration, repository bindings, and workspaces. Install the app and your existing bgit setup is ready to use.</p><Link href="/docs/#desktop-workflow" className="mt-6 inline-flex text-sm font-medium text-violet-200 hover:text-white">See the first-session guide <span className="ml-2">→</span></Link></div>
          <div className="rounded-2xl border border-white/[.09] bg-[#0d111b] p-5 sm:p-7">
            <div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/15 text-sm font-semibold text-violet-200">1</span><div><p className="text-sm font-semibold text-white">Install bgit Desktop</p><p className="mt-1 text-xs text-slate-500">Choose Windows, macOS, or Linux above</p></div></div>
            <div className="ml-[17px] h-8 border-l border-dashed border-white/15" />
            <div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/15 text-sm font-semibold text-violet-200">2</span><div><p className="text-sm font-semibold text-white">Open your repositories</p><p className="mt-1 text-xs text-slate-500">Your identities and bindings are shared</p></div></div>
            <div className="ml-[17px] h-8 border-l border-dashed border-white/15" />
            <div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/15 text-sm font-semibold text-violet-200">3</span><div><p className="text-sm font-semibold text-white">Work visually or in the terminal</p><p className="mt-1 text-xs text-slate-500">Use whichever fits the task</p></div></div>
          </div>
        </div>
      </section>

      <section className="px-5 py-24 sm:px-8 sm:py-28">
        <div className="mx-auto flex max-w-[1160px] flex-col items-start justify-between gap-7 rounded-3xl border border-violet-300/15 bg-[radial-gradient(ellipse_at_60%_0%,rgba(124,58,237,.18),rgba(13,17,27,.94)_65%)] p-7 sm:flex-row sm:items-center sm:p-10">
          <div><p className="text-xs font-semibold uppercase tracking-[.2em] text-violet-300">Desktop + CLI</p><h2 className="mt-3 text-2xl font-semibold tracking-[-.04em] text-white sm:text-3xl">One setup. Pick your workflow.</h2><p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">The app is optional. The CLI is optional. Your identities stay in sync.</p></div>
          <Link href="/docs" className="inline-flex min-h-11 shrink-0 items-center rounded-lg border border-white/15 px-4 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/[.04]">Read the full guide</Link>
        </div>
      </section>
    </div>
  );
}
