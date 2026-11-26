import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '../components/JsonLd';
import DesktopPreview from './DesktopPreview';
import { createBreadcrumbJsonLd, createPageMetadata } from '../lib/seo';

const release = 'https://github.com/byterings/bgit/releases/latest/download';
const downloads = [
  { os: 'Windows', detail: 'Windows 10 or 11 · 64-bit', file: 'bgit-desktop-windows-amd64-installer.exe' },
  { os: 'macOS', detail: 'macOS 11+ · Intel and Apple Silicon', file: 'bgit-desktop-darwin-universal.dmg' },
  { os: 'Linux', detail: 'Ubuntu 22.04+ / Debian 12+ · 64-bit', file: 'bgit-desktop-linux-amd64.deb' },
];

export const metadata: Metadata = createPageMetadata({
  title: 'bgit Desktop - Manage Git identities and repositories visually',
  description: 'Explore bgit Desktop: manage identities, inspect repositories, review changes, commit, and sync with the right Git account. Download for Windows, macOS, or Linux.',
  path: '/desktop/',
});

export default function DesktopPage() {
  return <div className="min-h-screen px-5 pb-24 pt-28 sm:px-8">
    <JsonLd data={createBreadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Desktop App', path: '/desktop/' }])}/>
    <JsonLd data={{ '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'bgit Desktop', applicationCategory: 'DeveloperApplication', operatingSystem: 'Windows, macOS, Linux', isAccessibleForFree: true, description: 'A desktop Git identity and repository workflow app that shares configuration with the bgit CLI.', downloadUrl: 'https://github.com/byterings/bgit/releases/latest' }}/>

    <section className="mx-auto max-w-7xl">
      <div className="grid items-center gap-12 xl:grid-cols-[.85fr_1.15fr]">
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[.2em] text-accent">bgit Desktop</p>
          <h1 className="text-5xl font-bold leading-tight sm:text-6xl">Your Git identities.<br/><span className="text-accent">In one clear workspace.</span></h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-muted">Manage accounts, repositories, commits, and sync in a visual app. Prefer the terminal? The bgit CLI works with the same identities and settings.</p>
          <div className="mt-8 flex flex-wrap gap-3"><a href="#downloads" className="rounded-xl bg-sky-300 px-6 py-3.5 font-semibold text-slate-950 transition hover:bg-sky-200">Download bgit Desktop</a><a href="#preview" className="rounded-xl border border-white/15 px-6 py-3.5 font-semibold transition hover:border-sky-300/50">Explore the preview</a></div>
          <p className="mt-5 text-sm text-muted">Free and open source · Windows · macOS · Linux</p>
        </div>
        <div id="preview"><DesktopPreview/><p className="mt-3 text-center text-xs text-muted">Interactive product preview with sample repository data. Select tabs to explore the workflow.</p></div>
      </div>
    </section>

    <section className="mx-auto mt-24 max-w-7xl">
      <div className="mb-10 max-w-2xl"><p className="text-sm font-semibold uppercase tracking-[.18em] text-accent">A safer daily workflow</p><h2 className="mt-3 text-3xl font-bold sm:text-4xl">See what you’re working on—and who you’re working as.</h2></div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[
          ['Know the identity before you commit', 'See which name, email, and GitHub account apply to each repository—and whether they come from a binding, workspace, or default identity.'],
          ['Review changes and commit', 'Browse changed files, inspect diffs, write a commit summary, and commit from the repository workspace.'],
          ['Keep branches in sync', 'Inspect history and branches, fetch remote updates, then pull or push with the repository’s identity.'],
          ['Manage multiple accounts', 'Create identities, set up SSH keys, copy public keys for GitHub, and test SSH connections.'],
          ['Catch setup problems early', 'Run Doctor checks, review repository health, and fix supported configuration issues.'],
          ['Back up and restore', 'Create or import password-protected .bgit backups from the app’s Backup & Restore settings.'],
        ].map(([title, description]) => <article key={title} className="rounded-2xl border border-white/10 bg-white/[.025] p-6"><h3 className="text-lg font-semibold">{title}</h3><p className="mt-3 text-sm leading-6 text-muted">{description}</p></article>)}
      </div>
      <div className="mt-5 rounded-xl border border-amber-300/15 bg-amber-300/[.04] p-5 text-sm leading-6 text-muted"><strong className="text-foreground">When a merge conflict happens:</strong> bgit Desktop shows conflicted files and status. Resolve the conflict markers in your editor, save the files, then return to bgit and commit to finish the merge.</div>
    </section>

    <section id="downloads" className="mx-auto mt-24 max-w-7xl scroll-mt-28">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm font-semibold uppercase tracking-[.18em] text-accent">Get the app</p><h2 className="mt-2 text-3xl font-bold">Download for your computer</h2></div><Link href="/docs/#desktop-app" className="text-sm font-semibold text-accent hover:underline">Full install and first-run guide →</Link></div>
      <div className="grid gap-4 md:grid-cols-3">{downloads.map(({ os, detail, file }) => <a key={os} href={`${release}/${file}`} className="group rounded-2xl border border-white/10 bg-white/[.025] p-6 transition hover:-translate-y-1 hover:border-sky-300/40"><p className="text-xl font-semibold">{os}</p><p className="mt-2 text-sm text-muted">{detail}</p><span className="mt-6 inline-flex rounded-lg bg-white/10 px-4 py-2 text-sm font-semibold transition group-hover:bg-sky-300 group-hover:text-slate-950">Download ↓</span></a>)}</div>
      <p className="mt-5 text-sm leading-6 text-muted">Already use bgit CLI? Install the app and your existing identities and repositories are available there. Both apps use the same bgit setup. <Link href="/docs/#installation" className="text-accent hover:underline">See CLI installation options</Link>.</p>
    </section>

    <section className="mx-auto mt-20 max-w-7xl rounded-2xl border border-white/10 bg-[#0d1118] p-7 sm:p-10"><div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center"><div><p className="text-sm font-semibold uppercase tracking-[.18em] text-accent">One setup, two ways to work</p><h2 className="mt-3 text-2xl font-bold">Use Desktop, CLI, or both.</h2><p className="mt-3 max-w-2xl leading-7 text-muted">The app and CLI share identities, SSH configuration, repository bindings, and workspaces. Install either one first; you can add the other later.</p></div><Link href="/docs" className="inline-flex justify-center rounded-xl border border-white/15 px-5 py-3 font-semibold hover:border-sky-300/50">Read the full docs</Link></div></section>
  </div>;
}
