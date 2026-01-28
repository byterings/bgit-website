"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Feature {
  title: string;
  description: string;
  command?: string | null;
  docs_link?: string;
}

interface Fix {
  title: string;
  description: string;
}

interface Release {
  version: string;
  date: string;
  phase: number;
  summary: string;
  features: Feature[];
  fixes?: Fix[];
  breaking_changes?: Fix[];
}

interface Changelog {
  releases: Release[];
}

interface ChangelogContentProps {
  changelog: Changelog | null;
}

const phaseNames: Record<number, string> = {
  1: "Core Identity Management",
  2: "Repository-Aware Identity",
  3: "Shell Integration & Safety"
};

export default function ChangelogContent({ changelog }: ChangelogContentProps) {
  const [activeVersion, setActiveVersion] = useState<string>("");
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);

  // Calculate stats
  const totalFeatures = changelog?.releases.reduce((acc, r) => acc + r.features.length, 0) || 0;
  const phases = changelog ? [...new Set(changelog.releases.map(r => r.phase))] : [];

  // Group releases by phase
  const releasesByPhase = phases.sort((a, b) => b - a).map(phase => ({
    phase,
    releases: changelog?.releases.filter(r => r.phase === phase) || []
  }));

  useEffect(() => {
    if (!changelog || changelog.releases.length === 0) return;

    setActiveVersion(changelog.releases[0].version);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const version = entry.target.id.replace("v", "");
            setActiveVersion(version);
          }
        });
      },
      { rootMargin: "-100px 0px -66%" }
    );

    changelog.releases.forEach(({ version }) => {
      const element = document.getElementById(`v${version}`);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [changelog]);

  const copyCommand = (command: string) => {
    navigator.clipboard.writeText(command);
    setCopiedCommand(command);
    setTimeout(() => setCopiedCommand(null), 2000);
  };

  return (
    <div className="pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="lg:grid lg:grid-cols-[200px_1fr] lg:gap-12">
          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 max-h-[calc(100vh-8rem)] flex flex-col">
              <h2 className="text-sm font-semibold text-muted uppercase tracking-wide mb-4 shrink-0">
                Versions
              </h2>
              {changelog && changelog.releases.length > 0 && (
                <nav className="space-y-1 overflow-y-auto flex-1 pr-2">
                  {changelog.releases.map(({ version, phase }, index) => (
                    <a
                      key={version}
                      href={`#v${version}`}
                      onClick={() => setActiveVersion(version)}
                      className={`flex items-center justify-between gap-2 py-2 px-3 rounded-lg text-sm font-mono transition-colors ${
                        activeVersion === version
                          ? "bg-accent/10 text-accent"
                          : "text-muted hover:text-foreground hover:bg-[#0d0d0d]"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span>v{version}</span>
                        {index === 0 && (
                          <span className="text-xs px-1.5 py-0.5 bg-green-500/15 text-green-400 rounded border border-green-500/30">
                            Latest
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-muted">P{phase}</span>
                    </a>
                  ))}
                </nav>
              )}

              <div className="mt-4 pt-4 border-t border-gray-800 shrink-0 space-y-2">
                <a
                  href="https://github.com/byterings/bgit/releases"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted hover:text-accent transition"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  <span>GitHub Releases</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="min-w-0">
            <div className="max-w-4xl">
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-4xl lg:text-5xl font-bold mb-4">Changelog</h1>
                <p className="text-xl text-muted">
                  Track the evolution of bgit across releases
                </p>
              </div>

              {/* Stats Bar */}
              {changelog && (
                <div className="grid grid-cols-3 gap-4 mb-12">
                  <div className="bg-[#0d0d0d] border border-gray-800 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold text-accent mb-1">{changelog.releases.length}</div>
                    <div className="text-sm text-muted">Releases</div>
                  </div>
                  <div className="bg-[#0d0d0d] border border-gray-800 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold text-green-400 mb-1">{totalFeatures}</div>
                    <div className="text-sm text-muted">Features</div>
                  </div>
                  <div className="bg-[#0d0d0d] border border-gray-800 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold text-purple-400 mb-1">{phases.length}</div>
                    <div className="text-sm text-muted">Phases</div>
                  </div>
                </div>
              )}

              {/* Mobile Version List */}
              {changelog && changelog.releases.length > 0 && (
                <div className="lg:hidden bg-[#0d0d0d] border border-gray-800 rounded-lg p-4 mb-8">
                  <h2 className="text-sm font-semibold mb-3">Jump to version</h2>
                  <nav className="flex flex-wrap gap-2">
                    {changelog.releases.map(({ version }, index) => (
                      <a
                        key={version}
                        href={`#v${version}`}
                        className="text-sm text-muted hover:text-accent transition px-3 py-1.5 bg-[#0a0a0a] rounded-full font-mono flex items-center gap-1.5"
                      >
                        v{version}
                        {index === 0 && (
                          <span className="w-2 h-2 rounded-full bg-green-400" />
                        )}
                      </a>
                    ))}
                  </nav>
                </div>
              )}

              {!changelog ? (
                <div className="bg-[#0d0d0d] border border-gray-800 rounded-xl p-8 text-center">
                  <p className="text-muted">
                    Changelog data is not available yet. It will be populated after the first release.
                  </p>
                </div>
              ) : (
                /* Releases by Phase */
                <div className="space-y-16">
                  {releasesByPhase.map(({ phase, releases }) => (
                    <div key={phase}>
                      {/* Phase Header */}
                      <div className="flex items-center gap-4 mb-8">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/30 to-purple-500/20 border border-accent/30 flex items-center justify-center">
                            <span className="text-lg font-bold text-accent">{phase}</span>
                          </div>
                          <div>
                            <div className="text-xs text-muted uppercase tracking-wide">Phase {phase}</div>
                            <h2 className="text-xl font-semibold">{phaseNames[phase] || `Phase ${phase}`}</h2>
                          </div>
                        </div>
                        <div className="flex-1 h-px bg-gradient-to-r from-accent/30 to-transparent" />
                      </div>

                      {/* Releases in this phase */}
                      <div className="space-y-8 pl-4 border-l-2 border-gray-800">
                        {releases.map((release, releaseIndex) => (
                          <div
                            key={release.version}
                            id={`v${release.version}`}
                            className="relative scroll-mt-28"
                          >
                            {/* Timeline dot */}
                            <div className="absolute -left-[calc(1rem+5px)] top-0">
                              <div className="w-3 h-3 rounded-full bg-accent border-2 border-background" />
                            </div>

                            {/* Release Card */}
                            <div className="ml-4">
                              {/* Release Header */}
                              <div className="flex flex-wrap items-center gap-3 mb-4">
                                <h3 className="text-2xl font-bold">v{release.version}</h3>
                                {release.date ? (
                                  <span className="px-3 py-1 text-sm bg-accent/15 text-accent rounded-full border border-accent/30">
                                    {release.date}
                                  </span>
                                ) : (
                                  <span className="px-3 py-1 text-sm bg-amber-500/15 text-amber-400 rounded-full border border-amber-500/30">
                                    Coming Soon
                                  </span>
                                )}
                                {releaseIndex === 0 && phase === Math.max(...phases) && (
                                  <span className="px-3 py-1 text-sm bg-green-500/15 text-green-400 rounded-full border border-green-500/30">
                                    Latest
                                  </span>
                                )}
                              </div>

                              <p className="text-muted mb-6">{release.summary}</p>

                              {/* Features Section */}
                              {release.features.length > 0 && (
                                <div className="bg-[#0d0d0d] border border-gray-800 rounded-xl overflow-hidden mb-4">
                                  <div className="px-5 py-3 border-b border-gray-800 bg-[#0a0a0a] flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                      <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                      </svg>
                                      <span className="font-semibold text-sm">Features</span>
                                    </div>
                                    <span className="text-xs text-muted bg-[#0d0d0d] px-2 py-0.5 rounded-full">{release.features.length}</span>
                                  </div>
                                  <div className="divide-y divide-gray-800/50">
                                    {release.features.map((feature, featureIndex) => (
                                      <div key={featureIndex} className="p-5 hover:bg-[#0a0a0a]/50 transition-colors">
                                        <div className="flex items-start gap-3">
                                          <span className="text-green-400 mt-0.5 shrink-0">
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                            </svg>
                                          </span>
                                          <div className="flex-1 min-w-0">
                                            <h4 className="font-semibold text-foreground mb-1">{feature.title}</h4>
                                            <p className="text-muted text-sm mb-3">{feature.description}</p>

                                            {/* Command Block */}
                                            {feature.command && (
                                              <div className="flex items-center gap-2 mb-3">
                                                <code className="flex-1 text-sm bg-[#0a0a0a] border border-gray-800 rounded-lg px-3 py-2 font-mono text-accent">
                                                  $ {feature.command}
                                                </code>
                                                <button
                                                  onClick={() => copyCommand(feature.command!)}
                                                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-muted hover:text-foreground"
                                                  title="Copy command"
                                                >
                                                  {copiedCommand === feature.command ? (
                                                    <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                  ) : (
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                    </svg>
                                                  )}
                                                </button>
                                              </div>
                                            )}

                                            {/* Docs Link */}
                                            {feature.docs_link && (
                                              <Link
                                                href={feature.docs_link}
                                                className="inline-flex items-center gap-1.5 text-sm text-accent hover:text-accent/80 transition-colors"
                                              >
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                                </svg>
                                                <span>View Documentation</span>
                                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                                </svg>
                                              </Link>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Bug Fixes Section */}
                              {release.fixes && release.fixes.length > 0 && (
                                <div className="bg-[#0d0d0d] border border-gray-800 rounded-xl overflow-hidden mb-4">
                                  <div className="px-5 py-3 border-b border-gray-800 bg-[#0a0a0a] flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                      <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                      </svg>
                                      <span className="font-semibold text-sm">Bug Fixes</span>
                                    </div>
                                    <span className="text-xs text-muted bg-[#0d0d0d] px-2 py-0.5 rounded-full">{release.fixes.length}</span>
                                  </div>
                                  <div className="p-5">
                                    <ul className="space-y-3">
                                      {release.fixes.map((fix, fixIndex) => (
                                        <li key={fixIndex} className="flex gap-2 text-sm">
                                          <span className="text-amber-400 mt-0.5">-</span>
                                          <div>
                                            <span className="font-medium text-foreground">{fix.title}</span>
                                            <p className="text-muted">{fix.description}</p>
                                          </div>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              )}

                              {/* Breaking Changes Section */}
                              {release.breaking_changes && release.breaking_changes.length > 0 && (
                                <div className="bg-[#0d0d0d] border border-red-900/30 rounded-xl overflow-hidden">
                                  <div className="px-5 py-3 border-b border-red-900/30 bg-red-950/20 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                      <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                      </svg>
                                      <span className="font-semibold text-sm text-red-400">Breaking Changes</span>
                                    </div>
                                    <span className="text-xs text-red-400/70 bg-red-950/30 px-2 py-0.5 rounded-full">{release.breaking_changes.length}</span>
                                  </div>
                                  <div className="p-5">
                                    <ul className="space-y-3">
                                      {release.breaking_changes.map((change, changeIndex) => (
                                        <li key={changeIndex} className="flex gap-2 text-sm">
                                          <span className="text-red-400 mt-0.5">!</span>
                                          <div>
                                            <span className="font-medium text-foreground">{change.title}</span>
                                            <p className="text-muted">{change.description}</p>
                                          </div>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Footer CTA */}
              <div className="mt-20 text-center">
                <div className="bg-gradient-to-r from-accent/5 via-purple-500/5 to-accent/5 border border-gray-800 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold mb-2">Want to see what&apos;s coming next?</h3>
                  <p className="text-muted mb-6">
                    Check out our roadmap and upcoming features on GitHub
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <a
                      href="https://github.com/byterings/bgit/issues"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition-all duration-200 font-medium"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      View Roadmap
                    </a>
                    <a
                      href="https://github.com/byterings/bgit"
                      className="inline-flex items-center gap-2 px-6 py-3 border border-gray-700 rounded-lg hover:border-accent hover:shadow-lg hover:shadow-accent/20 transition-all duration-200 font-medium"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                      Star on GitHub
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
