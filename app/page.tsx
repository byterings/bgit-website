import Link from 'next/link';
import dynamic from 'next/dynamic';
import JsonLd from './components/JsonLd';
import QuickInstallSection from './components/QuickInstallSection';
import { createSoftwareApplicationJsonLd } from './lib/seo';

const DesktopPreview = dynamic(() => import('./desktop/DesktopPreview'), { loading: () => <div aria-hidden="true" className="min-h-[400px] animate-pulse rounded-xl bg-white/[.03]" /> });

const homeFaq = [
  { question: 'What is bgit?', answer: 'bgit is a free, open source Git identity manager with a command-line interface and a desktop app. It helps organize identities, SSH keys, repository bindings, and workspaces.' },
  { question: 'Is bgit free?', answer: 'Yes. bgit is free and open source under the MIT License.' },
  { question: 'How do I use multiple GitHub accounts on one computer?', answer: 'Add each account as a bgit identity, then switch with bgit use or assign identities to repositories and workspaces. bgit helps manage the related Git and SSH configuration.' },
  { question: 'Does bgit replace Git?', answer: 'No. The CLI works alongside your Git installation and you continue to use regular Git commands. bgit Desktop also offers a visual repository workflow.' },
  { question: 'Do Desktop and CLI share the same setup?', answer: 'Yes. The desktop app and CLI use the same bgit identities, SSH configuration, repository bindings, and workspaces.' },
  { question: 'How does bgit manage SSH keys?', answer: 'You can add an identity with a new or existing SSH key. bgit manages the associated SSH configuration and provides diagnostics through its doctor command.' },
];

const productFacts = [
  { value: 'One setup', detail: 'Desktop and CLI share your bgit identities' },
  { value: 'Per-repo', detail: 'See which identity applies before you commit' },
  { value: 'Open source', detail: 'Free to use and inspect' },
];

const capabilities = [
  {
    number: '01',
    title: 'Know who a repository belongs to.',
    description:
      'Give each repository its own identity, organize projects into workspaces, and keep a clear default for everything else.',
    tags: ['Repository bindings', 'Workspace rules', 'Default identity'],
  },
  {
    number: '02',
    title: 'Review the work before it leaves.',
    description:
      'Browse changed files, inspect diffs, write a commit, then fetch, pull, or push from the repository workspace.',
    tags: ['File-by-file changes', 'Diffs and history', 'Branch sync'],
  },
  {
    number: '03',
    title: 'Keep account setup in order.',
    description:
      'Manage SSH keys, run diagnostics, and create encrypted backups from the app or the command line.',
    tags: ['SSH keys', 'Doctor checks', 'Encrypted backups'],
  },
];

export default function Home() {
  return (
    <div className="product-shell overflow-hidden">
      <JsonLd data={createSoftwareApplicationJsonLd('Manage multiple Git identities with bgit Desktop or CLI. Organize repositories, SSH keys, commits, and pushes across work and personal accounts.')} />
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: homeFaq.map(({ question, answer }) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })) }} />

      <section className="relative isolate px-5 pb-20 pt-32 sm:px-8 sm:pt-36 lg:pb-28">
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[760px] overflow-hidden">
          <div className="absolute left-[44%] top-[-360px] h-[720px] w-[720px] -translate-x-1/2 rounded-full bg-violet-600/[.12] blur-[150px]" />
          <div className="absolute right-[-180px] top-[220px] h-[420px] w-[420px] rounded-full bg-indigo-500/[.07] blur-[130px]" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-background" />
        </div>

        <div className="mx-auto grid max-w-[1320px] items-center gap-12 xl:grid-cols-[.78fr_1.22fr] xl:gap-14">
          <div className="max-w-[560px]">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-violet-300/15 bg-violet-300/[.06] px-3.5 py-2 text-xs font-medium text-violet-100/90">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-300 shadow-[0_0_10px_rgba(167,139,250,.8)]" />
              Git identities, handled.
            </div>
            <h1 className="text-[clamp(3.4rem,6.4vw,6.1rem)] font-semibold leading-[.99] tracking-[-.065em] text-white">
              Every repo.
              <br />
              <span className="bg-gradient-to-r from-violet-200 via-violet-300 to-indigo-300 bg-clip-text text-transparent">The right identity.</span>
            </h1>
            <p className="mt-4 text-sm font-medium text-violet-200 sm:text-base">Multiple Git accounts manager for the terminal and desktop.</p>
            <p className="mt-7 max-w-[480px] text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
              Keep work, personal, and client Git accounts in order. Use bgit Desktop to manage repositories visually, or the CLI from your terminal. They share the same setup.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link href="/desktop#downloads" className="group inline-flex min-h-12 items-center gap-2 rounded-lg bg-violet-500 px-5 text-sm font-semibold text-white shadow-[0_8px_28px_rgba(124,58,237,.25)] transition hover:-translate-y-0.5 hover:bg-violet-400">
                Get bgit Desktop
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">↗</span>
              </Link>
              <Link href="/docs/#cli" className="inline-flex min-h-12 items-center gap-2 rounded-lg border border-white/12 bg-white/[.035] px-5 text-sm font-semibold text-slate-100 transition hover:border-white/25 hover:bg-white/[.07]">
                Install the CLI <span aria-hidden="true" className="text-slate-400">⌘</span>
              </Link>
            </div>
            <p className="mt-5 text-xs text-slate-500">Free and open source <span className="mx-2 text-slate-700">/</span> Windows, macOS, Linux <span className="mx-2 text-slate-700">/</span> Uses your existing Git installation</p>
          </div>

          <div id="product-preview" className="relative scroll-mt-28">
            <div className="absolute -inset-5 -z-10 rounded-[2rem] bg-gradient-to-br from-violet-500/[.13] via-indigo-500/[.05] to-transparent blur-2xl" />
            <div className="rounded-[18px] border border-white/[.12] bg-[#0b0f19]/90 p-1.5 shadow-[0_32px_100px_rgba(0,0,0,.6)] sm:p-2.5">
              <DesktopPreview />
            </div>
            <div className="mt-3 flex items-center justify-between px-1 text-[11px] text-slate-500">
              <span>bgit Desktop · interactive preview</span>
              <Link href="/desktop#preview" className="text-violet-300 transition hover:text-violet-200">Explore the app <span aria-hidden="true">→</span></Link>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Product principles" className="border-y border-white/[.07] bg-white/[.018] px-5 sm:px-8">
        <div className="mx-auto grid max-w-[1320px] divide-y divide-white/[.07] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {productFacts.map(({ value, detail }) => (
            <div key={value} className="flex items-center gap-4 py-5 sm:px-6 sm:first:pl-0 sm:last:pr-0">
              <span className="shrink-0 text-sm font-semibold text-violet-200">{value}</span>
              <span className="text-xs leading-5 text-slate-400">{detail}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-[1160px]">
          <div className="mb-12 grid gap-5 md:grid-cols-[.8fr_1.2fr] md:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[.2em] text-violet-300">A clearer Git routine</p>
              <h2 className="mt-4 max-w-md text-3xl font-semibold tracking-[-.04em] text-white sm:text-4xl">Identity should follow the repository.</h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-slate-400 md:justify-self-end">
              Stop wondering which account is active. bgit explains whether a repository uses its binding, its workspace, its remote, or your default identity.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/[.09] bg-[#0d111b]">
            {capabilities.map(({ number, title, description, tags }, index) => (
              <article key={number} className={`grid gap-5 px-5 py-7 sm:px-8 sm:py-9 md:grid-cols-[72px_1fr_1fr] md:items-center ${index > 0 ? 'border-t border-white/[.08]' : ''}`}>
                <span className="font-mono text-xs text-violet-300/80">{number}</span>
                <div>
                  <h3 className="max-w-sm text-xl font-medium leading-snug tracking-[-.025em] text-white sm:text-2xl">{title}</h3>
                  <div className="mt-4 flex flex-wrap gap-2">{tags.map((tag) => <span key={tag} className="rounded-full border border-white/[.09] px-2.5 py-1 text-[10px] text-slate-400">{tag}</span>)}</div>
                </div>
                <p className="max-w-md text-sm leading-6 text-slate-400 md:justify-self-end">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative border-y border-white/[.07] bg-[#0c1019] px-5 py-20 sm:px-8 sm:py-24">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(124,58,237,.12),transparent_60%)]" />
        <div className="relative mx-auto max-w-[1160px]">
          <div className="mb-10 max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[.2em] text-violet-300">Choose your flow</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-.04em] text-white sm:text-4xl">One shared setup.<br/>Your way of working.</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Link href="/desktop" className="group rounded-2xl border border-violet-300/20 bg-violet-300/[.045] p-6 transition hover:-translate-y-1 hover:border-violet-300/40 hover:bg-violet-300/[.07] sm:p-8">
              <div className="flex items-center justify-between"><span className="rounded-md bg-violet-400/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-violet-200">Desktop app</span><span className="text-slate-500 transition group-hover:translate-x-1 group-hover:text-violet-200">↗</span></div>
              <h3 className="mt-6 text-2xl font-semibold tracking-[-.03em] text-white">See the whole repo.</h3>
              <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">Review changed files and diffs, commit, manage branches, and sync—all with the repository’s identity in view.</p>
              <span className="mt-7 inline-flex text-sm font-medium text-violet-200">Explore bgit Desktop <span className="ml-2">→</span></span>
            </Link>
            <Link href="/docs/#cli" className="group rounded-2xl border border-white/[.1] bg-white/[.025] p-6 transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/[.04] sm:p-8">
              <div className="flex items-center justify-between"><span className="rounded-md bg-white/[.08] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-300">Command line</span><span className="text-slate-500 transition group-hover:translate-x-1 group-hover:text-white">↗</span></div>
              <h3 className="mt-6 text-2xl font-semibold tracking-[-.03em] text-white">Keep your terminal flow.</h3>
              <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">Switch identities, bind repositories, organize workspaces, and diagnose setup with familiar commands.</p>
              <span className="mt-7 inline-flex text-sm font-medium text-slate-200">Explore the CLI <span className="ml-2">→</span></span>
            </Link>
          </div>
        </div>
      </section>

      <QuickInstallSection />

      <section aria-labelledby="why-bgit" className="border-y border-white/[.07] bg-[#0c1019] px-5 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-[1160px]">
          <p className="text-xs font-semibold uppercase tracking-[.2em] text-violet-300">Different projects, clear identity</p>
          <h2 id="why-bgit" className="mt-3 text-3xl font-semibold tracking-[-.04em] text-white sm:text-4xl">Why bgit?</h2>
          <div className="mt-9 grid gap-4 sm:grid-cols-2">
            {[
              ['Freelancers', 'Keep client and personal identities organized. Bind a repository to the right identity so your global default does not have to change for every project.'],
              ['Agencies', 'Separate team and client repositories with workspaces and repository bindings. Check which identity applies before making a commit or push.'],
              ['Work and personal accounts', 'Add both identities once, then switch from the CLI or let a repository binding select the identity for a project.'],
              ['Open-source contributors', 'Use a dedicated identity for community work while keeping employer or personal repositories connected to their own Git identity.'],
            ].map(([title, copy]) => <article key={title} className="rounded-xl border border-white/[.09] bg-[#0d111b] p-6"><h3 className="text-lg font-semibold text-white">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-400">{copy}</p></article>)}
          </div>
        </div>
      </section>

      <section aria-labelledby="home-faq" className="px-5 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-[900px]"><p className="text-xs font-semibold uppercase tracking-[.2em] text-violet-300">Common questions</p><h2 id="home-faq" className="mt-3 text-3xl font-semibold tracking-[-.04em] text-white">bgit FAQ</h2>
          <div className="mt-8 divide-y divide-white/10 border-y border-white/10">{homeFaq.map(({ question, answer }) => <details key={question} className="group py-5"><summary className="cursor-pointer list-none pr-8 text-base font-medium text-white marker:hidden">{question}<span aria-hidden="true" className="float-right text-violet-300 group-open:rotate-45">+</span></summary><p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">{answer}</p></details>)}</div>
        </div>
      </section>

      <section className="px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-[1160px] rounded-3xl border border-violet-300/15 bg-[radial-gradient(ellipse_at_50%_0%,rgba(124,58,237,.18),rgba(13,17,27,.94)_65%)] px-6 py-12 text-center sm:px-12 sm:py-16">
          <p className="text-xs font-semibold uppercase tracking-[.2em] text-violet-300">Start with the app. Add the CLI anytime.</p>
          <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-semibold tracking-[-.045em] text-white sm:text-5xl">Make the right Git identity the easy one.</h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-slate-400">Download bgit Desktop, or follow the guided install for the command-line tool.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/desktop#downloads" className="inline-flex min-h-12 items-center rounded-lg bg-violet-500 px-5 text-sm font-semibold text-white transition hover:bg-violet-400">Download Desktop</Link>
            <Link href="/docs" className="inline-flex min-h-12 items-center rounded-lg border border-white/15 px-5 text-sm font-semibold text-slate-100 transition hover:border-white/30">Read the docs</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
