'use client';

import { startTransition, useState } from 'react';

interface TerminalBlock {
  label: string;
  path?: string;
  command: string;
  status: string;
  detail: string;
}

interface TerminalCardData {
  title: string;
  shell: string;
  tone: 'install' | 'identity' | 'workflow';
  blocks: TerminalBlock[];
}

interface InstallTab {
  id: string;
  label: string;
  eyebrow: string;
  intro: string;
  cards: TerminalCardData[];
}

const quickInstallTabs: InstallTab[] = [
  {
    id: 'linux',
    label: 'Linux',
    eyebrow: 'bash flow',
    intro: 'This Linux tab mirrors a realistic terminal flow: install bgit, add the freelance identity, switch to it, verify the active user, then clone or fix repositories.',
    cards: [
      {
        title: 'Install and add identity',
        shell: 'bgit - bash',
        tone: 'install',
        blocks: [
          {
            label: 'Install bgit on Linux',
            path: 'dev@linux-box:~/projects',
            command:
              'curl -L https://github.com/byterings/bgit/releases/latest/download/bgit-linux-amd64 -o bgit\nchmod +x bgit\nsudo mv bgit /usr/local/bin/',
            status: 'bgit version 0.3.0',
            detail:
              '% Total    % Received % Xferd  Average Speed   Time    Time     Time  Current\n100 9630k  100 9630k    0     0  4619k      0  0:00:02  0:00:02 --:--:-- 8259k',
          },
          {
            label: 'Add new identity',
            path: 'dev@linux-box:~/projects',
            command: 'bgit add',
            status: "✓ User 'freelance' added successfully",
            detail:
              'Adding new user identity\n\n? Alias (e.g., work, personal, freelance): freelance\n? Full name: test dev\n? Email address: test@freelance.com\n? GitHub username: test-freelance\n? How do you want to set up SSH key? Generate new key pair (Recommended)\n✓ SSH key generated: /home/dev/.ssh/bgit_test-freelance\n\n----------------------------------------------------------------------\nAdd this public key to your GitHub account:\nhttps://github.com/settings/keys\n----------------------------------------------------------------------\n\nNext: bgit use freelance',
          },
        ],
      },
      {
        title: 'Start working',
        shell: 'bgit - bash',
        tone: 'workflow',
        blocks: [
          {
            label: 'Switch to freelance',
            path: 'dev@linux-box:~/projects',
            command: 'bgit use freelance',
            status: '✓ Switched to identity: freelance (test@freelance.com)',
            detail:
              'ℹ SSH key loaded into agent\n\nClone repos: bgit clone <url>\nFix existing: bgit remote fix',
          },
          {
            label: 'Check active identity',
            path: 'dev@linux-box:~/projects',
            command: 'bgit active',
            status: 'Active user: freelance (global)',
            detail:
              'Name: test dev\nEmail: test@freelance.com\nGitHub: test-freelance',
          },
          {
            label: 'New repo',
            path: 'dev@linux-box:~/projects',
            command: 'bgit clone https://github.com/byterings/bgit-website.git',
            status: 'Ready to clone with the active freelance identity',
            detail: 'The active identity is already set before cloning this repository.',
          },
          {
            label: 'Existing repo',
            path: 'dev@linux-box:~/projects/existing-repo',
            command: 'bgit remote fix',
            status: 'Ready to fix an existing repository remote',
            detail: 'Run this after switching identity when a local repo already exists.',
          },
        ],
      },
    ],
  },
  {
    id: 'mac',
    label: 'macOS',
    eyebrow: 'zsh flow',
    intro: 'This macOS tab follows the same freelance identity flow: install bgit, add the identity, activate it, verify it, then clone or repair repositories.',
    cards: [
      {
        title: 'Install and add identity',
        shell: 'bgit - zsh',
        tone: 'install',
        blocks: [
          {
            label: 'Install bgit on macOS',
            path: 'dev@macbook:~/projects',
            command:
              'curl -L https://github.com/byterings/bgit/releases/latest/download/bgit-darwin-arm64 -o bgit\nchmod +x bgit\nsudo mv bgit /usr/local/bin/\nbgit -v',
            status: 'bgit version 0.3.0',
            detail:
              'For Intel Macs, use bgit-darwin-amd64 instead.\n\nbgit is now available globally.',
          },
          {
            label: 'Add new identity',
            path: 'dev@macbook:~/projects',
            command: 'bgit add',
            status: "✓ User 'freelance' added successfully",
            detail:
              'Adding new user identity\n\n? Alias (e.g., work, personal, freelance): freelance\n? Full name: test dev\n? Email address: test@freelance.com\n? GitHub username: test-freelance\n? How do you want to set up SSH key? Generate new key pair (Recommended)\n✓ SSH key generated: /Users/dev/.ssh/bgit_test-freelance\n\n----------------------------------------------------------------------\nAdd this public key to your GitHub account:\nhttps://github.com/settings/keys\n----------------------------------------------------------------------\n\nNext: bgit use freelance',
          },
        ],
      },
      {
        title: 'Start working',
        shell: 'bgit - zsh',
        tone: 'workflow',
        blocks: [
          {
            label: 'Switch to freelance',
            path: 'dev@macbook:~/projects',
            command: 'bgit use freelance',
            status: '✓ Switched to identity: freelance (test@freelance.com)',
            detail:
              'ℹ SSH key loaded into agent\n\nClone repos: bgit clone <url>\nFix existing: bgit remote fix',
          },
          {
            label: 'Check active identity',
            path: 'dev@macbook:~/projects',
            command: 'bgit active',
            status: 'Active user: freelance (global)',
            detail:
              'Name: test dev\nEmail: test@freelance.com\nGitHub: test-freelance',
          },
          {
            label: 'New repo',
            path: 'dev@macbook:~/projects',
            command: 'bgit clone https://github.com/byterings/bgit-website.git',
            status: 'Ready to clone with the active freelance identity',
            detail: 'The active identity is already set before cloning this repository.',
          },
          {
            label: 'Existing repo',
            path: 'dev@macbook:~/projects/existing-repo',
            command: 'bgit remote fix',
            status: 'Ready to fix an existing repository remote',
            detail: 'Run this after switching identity when a local repo already exists.',
          },
        ],
      },
    ],
  },
  {
    id: 'windows',
    label: 'Windows',
    eyebrow: 'PowerShell flow',
    intro: 'This Windows tab follows the same freelance identity flow: install bgit, add the identity, activate it, verify it, then clone or repair repositories.',
    cards: [
      {
        title: 'Install and add identity',
        shell: 'bgit - PowerShell',
        tone: 'install',
        blocks: [
          {
            label: 'Install bgit on Windows',
            path: 'PS C:\\Users\\dev\\Projects>',
            command:
              'irm https://raw.githubusercontent.com/byterings/bgit/main/install.ps1 | iex\nbgit -v',
            status: 'bgit version 0.3.0',
            detail:
              'The installer places bgit in your PATH so PowerShell can run it immediately.',
          },
          {
            label: 'Add new identity',
            path: 'PS C:\\Users\\dev\\Projects>',
            command: 'bgit add',
            status: "✓ User 'freelance' added successfully",
            detail:
              'Adding new user identity\n\n? Alias (e.g., work, personal, freelance): freelance\n? Full name: test dev\n? Email address: test@freelance.com\n? GitHub username: test-freelance\n? How do you want to set up SSH key? Generate new key pair (Recommended)\n✓ SSH key generated: C:\\Users\\dev\\.ssh\\bgit_test-freelance\n\n----------------------------------------------------------------------\nAdd this public key to your GitHub account:\nhttps://github.com/settings/keys\n----------------------------------------------------------------------\n\nNext: bgit use freelance',
          },
        ],
      },
      {
        title: 'Start working',
        shell: 'bgit - PowerShell',
        tone: 'workflow',
        blocks: [
          {
            label: 'Switch to freelance',
            path: 'PS C:\\Users\\dev\\Projects>',
            command: 'bgit use freelance',
            status: '✓ Switched to identity: freelance (test@freelance.com)',
            detail:
              'ℹ SSH key loaded into agent\n\nClone repos: bgit clone <url>\nFix existing: bgit remote fix',
          },
          {
            label: 'Check active identity',
            path: 'PS C:\\Users\\dev\\Projects>',
            command: 'bgit active',
            status: 'Active user: freelance (global)',
            detail:
              'Name: test dev\nEmail: test@freelance.com\nGitHub: test-freelance',
          },
          {
            label: 'New repo',
            path: 'PS C:\\Users\\dev\\Projects>',
            command: 'bgit clone https://github.com/byterings/bgit-website.git',
            status: 'Ready to clone with the active freelance identity',
            detail: 'The active identity is already set before cloning this repository.',
          },
          {
            label: 'Existing repo',
            path: 'PS C:\\Users\\dev\\Projects\\existing-repo>',
            command: 'bgit remote fix',
            status: 'Ready to fix an existing repository remote',
            detail: 'Run this after switching identity when a local repo already exists.',
          },
        ],
      },
    ],
  },
];

function TerminalCard({ title, shell, tone, blocks }: TerminalCardData) {
  return (
    <article className={`quick-install-terminal quick-install-terminal-${tone} group h-full overflow-hidden rounded-xl`}>
      <div className="quick-install-terminal-header flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#ffbd2f]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="quick-install-shell text-[11px] font-semibold text-muted uppercase">{shell}</div>
        <div className={`quick-install-card-title quick-install-card-title-${tone}`}>
          {title}
        </div>
      </div>

      <div className="space-y-6 p-5 font-mono text-sm">
        {blocks.map((block, index) => (
          <div key={`${block.label}-${index}`} className="space-y-2">
            <div className="quick-install-block-label">
              {block.label}
            </div>
            {block.path && <div className="quick-install-path">{block.path}</div>}
            <div className="quick-install-command whitespace-pre-wrap break-words">
              <span className="quick-install-path mr-2">$</span>
              {block.command}
            </div>
            <div className="quick-install-status">{block.status}</div>
            <div className="quick-install-detail">{block.detail}</div>
          </div>
        ))}
      </div>
    </article>
  );
}

function TerminalCardContent({ blocks }: Pick<TerminalCardData, 'blocks'>) {
  return (
    <div className="space-y-6 p-5 font-mono text-sm">
      {blocks.map((block, index) => (
        <div key={`${block.label}-${index}`} className="space-y-2">
          <div className="quick-install-block-label">
            {block.label}
          </div>
          {block.path && <div className="quick-install-path">{block.path}</div>}
          <div className="quick-install-command whitespace-pre-wrap break-words">
            <span className="quick-install-path mr-2">$</span>
            {block.command}
          </div>
          <div className="quick-install-status">{block.status}</div>
          <div className="quick-install-detail">{block.detail}</div>
        </div>
      ))}
    </div>
  );
}

function MobileTerminalAccordion({
  cards,
  openCard,
  onToggle,
}: {
  cards: TerminalCardData[];
  openCard: string;
  onToggle: (title: string) => void;
}) {
  return (
    <div className="space-y-4 lg:hidden">
      {cards.map((card, index) => {
        const isOpen = openCard === card.title;
        const panelId = `quick-install-panel-${card.title.replace(/\s+/g, '-').toLowerCase()}`;
        const buttonId = `quick-install-button-${index}`;

        return (
          <article
            key={card.title}
            className={`quick-install-terminal quick-install-terminal-${card.tone} overflow-hidden rounded-xl`}
          >
            <button
              id={buttonId}
              type="button"
              onClick={() => onToggle(card.title)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="quick-install-terminal-header flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                  <span className="h-3 w-3 rounded-full bg-[#ffbd2f]" />
                  <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                </div>
                <div>
                  <div className={`quick-install-card-title quick-install-card-title-${card.tone}`}>
                    {card.title}
                  </div>
                  <div className="quick-install-shell mt-1 text-[11px] font-semibold uppercase text-muted">
                    {card.shell}
                  </div>
                </div>
              </div>
              <svg
                aria-hidden="true"
                className={`h-5 w-5 flex-shrink-0 text-muted transition-transform duration-200 ${
                  isOpen ? 'rotate-180' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={`overflow-hidden transition-all duration-300 ${
                isOpen ? 'max-h-[1400px]' : 'max-h-0'
              }`}
            >
              <TerminalCardContent blocks={card.blocks} />
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default function QuickInstallSection() {
  const [activeTab, setActiveTab] = useState('linux');
  const [openMobileCard, setOpenMobileCard] = useState('Install and add identity');

  const activeConfig =
    quickInstallTabs.find((tab) => tab.id === activeTab) ?? quickInstallTabs[0];

  return (
    <section id="quick-start" className="py-20 px-6 bg-[#0d0d0d]">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-accent">
            Install in seconds
          </p>
          <h2 className="text-4xl font-bold mb-4 text-center">
            Install fast, add your identity, and start pushing with confidence
          </h2>
          <p className="text-center text-muted mb-8 text-lg max-w-3xl mx-auto">
            Choose your platform and preview the exact install flow, identity
            setup, and repo workflow before you copy a single command.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {quickInstallTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  startTransition(() => {
                    setActiveTab(tab.id);
                    setOpenMobileCard(tab.cards[0]?.title ?? '');
                  });
                }}
                className={`quick-install-tab rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'border-accent bg-accent text-white shadow-[0_10px_30px_rgba(82,168,255,0.28)]'
                    : 'border-gray-700 bg-[var(--card-bg)] text-muted hover:border-accent/50 hover:text-foreground'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div key={activeConfig.id} className="quick-install-content">
          <div className="quick-install-surface mb-8 rounded-xl px-5 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              {activeConfig.eyebrow}
            </p>
            <p className="mt-2 text-foreground/90">{activeConfig.intro}</p>
          </div>

          <MobileTerminalAccordion
            cards={activeConfig.cards}
            openCard={openMobileCard}
            onToggle={(title) =>
              setOpenMobileCard((current) => (current === title ? '' : title))
            }
          />

          <div className="hidden gap-6 lg:grid lg:grid-cols-2">
            {activeConfig.cards.map((card) => (
              <TerminalCard key={card.title} {...card} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
