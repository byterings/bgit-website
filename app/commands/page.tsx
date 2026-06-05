"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import CodeBlock from "../components/CodeBlock";
import { bgitCommands as commands } from "../lib/commands";

const popularCommandIds = [
  "add",
  "use",
  "active",
  "clone",
  "export",
  "remote-fix",
  "status",
  "doctor",
  "workspace",
];

export default function CommandsPage() {
  const [activeCommand, setActiveCommand] = useState("setup");
  const [showAllCommands, setShowAllCommands] = useState(false);

  const popularCommands = popularCommandIds
    .map((id) => commands.find((command) => command.id === id))
    .filter((command): command is (typeof commands)[number] => Boolean(command));

  const remainingCommands = commands.filter(
    (command) => !popularCommandIds.includes(command.id)
  );

  const orderedCommands = [...popularCommands, ...remainingCommands];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveCommand(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -66%" }
    );

    orderedCommands.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [orderedCommands]);

  return (
    <div className="pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="lg:grid lg:grid-cols-[200px_1fr] lg:gap-12">
          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 max-h-[calc(100vh-8rem)] flex flex-col">
              <h2 className="text-sm font-semibold text-muted uppercase tracking-wide mb-4 shrink-0">
                Commands
              </h2>
              <div className="overflow-y-auto flex-1 pr-2 space-y-5">
                <div>
                  <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                    Most Used
                  </p>
                  <nav className="space-y-1">
                    {popularCommands.map(({ id, name }) => (
                      <a
                        key={id}
                        href={`#${id}`}
                        className={`block py-1.5 px-3 rounded-lg text-sm font-mono transition-colors ${
                          activeCommand === id
                            ? "bg-accent/10 text-accent"
                            : "text-muted hover:text-foreground hover:bg-[#0d0d0d]"
                        }`}>
                        {name.replace("bgit ", "")}
                      </a>
                    ))}
                  </nav>
                </div>

                <div>
                  <button
                    type="button"
                    onClick={() => setShowAllCommands((current) => !current)}
                    className="w-full rounded-lg border border-gray-800 bg-[#0d0d0d] px-3 py-2 text-left text-sm font-semibold text-foreground transition hover:border-accent/40 hover:text-accent">
                    {showAllCommands ? "Hide extra commands" : "Load all commands"}
                  </button>
                </div>

                {showAllCommands && (
                  <div>
                    <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
                      All Commands
                    </p>
                    <nav className="space-y-1">
                      {remainingCommands.map(({ id, name }) => (
                        <a
                          key={id}
                          href={`#${id}`}
                          className={`block py-1.5 px-3 rounded-lg text-sm font-mono transition-colors ${
                            activeCommand === id
                              ? "bg-accent/10 text-accent"
                              : "text-muted hover:text-foreground hover:bg-[#0d0d0d]"
                          }`}>
                          {name.replace("bgit ", "")}
                        </a>
                      ))}
                    </nav>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-800 shrink-0">
                <Link
                  href="/docs"
                  className="flex items-center gap-2 text-sm text-muted hover:text-accent transition">
                  <span>View Documentation</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="min-w-0">
            {/* Header */}
            <div className="mb-12">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                Commands Reference
              </h1>
              <p className="text-xl text-muted">
                Complete CLI commands reference for the bgit tool
              </p>
            </div>

            {/* Mobile Command List */}
            <div className="lg:hidden bg-[#0d0d0d] border border-gray-800 rounded-lg p-4 mb-8">
              <div className="mb-4">
                <h2 className="text-sm font-semibold mb-3">Most Used Commands</h2>
                <nav className="flex flex-wrap gap-2">
                  {popularCommands.map(({ id, name }) => (
                    <a
                      key={id}
                      href={`#${id}`}
                      className="text-sm text-muted hover:text-accent transition px-3 py-1 bg-[#0a0a0a] rounded-full font-mono">
                      {name.replace("bgit ", "")}
                    </a>
                  ))}
                </nav>
              </div>

              <button
                type="button"
                onClick={() => setShowAllCommands((current) => !current)}
                className="mb-4 w-full rounded-lg border border-gray-800 bg-[#0a0a0a] px-4 py-2 text-sm font-semibold text-foreground transition hover:border-accent/40 hover:text-accent">
                {showAllCommands ? "Hide extra commands" : "Load all commands"}
              </button>

              {showAllCommands && (
                <div>
                  <h3 className="text-sm font-semibold mb-3 text-muted">All Commands</h3>
                  <nav className="flex flex-wrap gap-2">
                    {remainingCommands.map(({ id, name }) => (
                      <a
                        key={id}
                        href={`#${id}`}
                        className="text-sm text-muted hover:text-accent transition px-3 py-1 bg-[#0a0a0a] rounded-full font-mono">
                        {name.replace("bgit ", "")}
                      </a>
                    ))}
                  </nav>
                </div>
              )}
            </div>

            {/* Detailed Command Documentation */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-gray-800">
                Detailed Documentation
              </h2>

              <div className="space-y-6">
                {orderedCommands.map((cmd) => (
                  <div
                    key={cmd.id}
                    id={cmd.id}
                    className="bg-[#0d0d0d] border border-gray-800 rounded-lg p-6 scroll-mt-28">
                    <h3 className="text-xl font-bold text-accent mb-2">
                      {cmd.name}
                    </h3>
                    <p className="text-muted mb-4">{cmd.description}</p>

                    <div className="space-y-4">
                      <div>
                        <h4 className="text-xs font-semibold text-muted uppercase tracking-wide mb-2">
                          Usage
                        </h4>
                        <CodeBlock>{cmd.usage}</CodeBlock>
                      </div>

                      <div>
                        <h4 className="text-xs font-semibold text-muted uppercase tracking-wide mb-2">
                          Details
                        </h4>
                        <p className="text-sm text-foreground/90">
                          {cmd.details}
                        </p>
                      </div>

                      {cmd.example && (
                        <div>
                          <h4 className="text-xs font-semibold text-muted uppercase tracking-wide mb-2">
                            Example
                          </h4>
                          <CodeBlock>{cmd.example}</CodeBlock>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Common Workflows */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-gray-800">
                Common Workflows
              </h2>

              <div className="grid md:grid-cols-2 gap-4 lg:gap-6">
                <div className="bg-[#0d0d0d] border border-gray-800 rounded-lg p-4 lg:p-5">
                  <h3 className="font-semibold mb-3 lg:mb-4">First Time Setup</h3>
                  <CodeBlock>{`# One-time setup
bgit setup

# Add your work account
bgit add

# Add your personal account
bgit add

# Switch identity
bgit use work`}</CodeBlock>
                </div>

                <div className="bg-[#0d0d0d] border border-gray-800 rounded-lg p-4 lg:p-5">
                  <h3 className="font-semibold mb-3 lg:mb-4">Using Workspaces</h3>
                  <CodeBlock>{`# Create workspace folders
cd ~/projects
bgit workspace

# Clone in workspace - auto identity!
cd ~/projects/work
bgit clone https://github.com/company/repo.git`}</CodeBlock>
                </div>

                <div className="bg-[#0d0d0d] border border-gray-800 rounded-lg p-4 lg:p-5">
                  <h3 className="font-semibold mb-3 lg:mb-4">Encrypted Backups</h3>
                  <CodeBlock>{`# Create encrypted backup
bgit export

# Restore on this or another machine
bgit import backup-2026-06-02.bgit

# Verify restored identity
bgit status`}</CodeBlock>
                </div>

                <div className="bg-[#0d0d0d] border border-gray-800 rounded-lg p-4 lg:p-5">
                  <h3 className="font-semibold mb-3 lg:mb-4">Troubleshooting</h3>
                  <CodeBlock>{`# Run diagnostics
bgit doctor

# Auto-fix permission issues
bgit doctor --fix

# Check current status
bgit status`}</CodeBlock>
                </div>

                <div className="bg-[#0d0d0d] border border-gray-800 rounded-lg p-4 lg:p-5">
                  <h3 className="font-semibold mb-3 lg:mb-4">Bind Existing Repo</h3>
                  <CodeBlock>{`# Bind repo to identity
cd my-project
bgit bind --user work

# Run safety check
bgit check

# Push as usual
git push`}</CodeBlock>
                </div>
              </div>
            </section>

            {/* Important Note */}
            <div className="bg-yellow-950/20 border border-yellow-800/30 rounded-lg p-6 mb-6">
              <p className="text-yellow-200 mb-2">
                <strong>Tip: Use bgit clone</strong>
              </p>
              <p className="text-yellow-200/80 text-sm mb-3">
                The easiest way to clone is with <code>bgit clone</code> which automatically uses the correct SSH config:
              </p>
              <CodeBlock>{`bgit clone https://github.com/org/repo.git`}</CodeBlock>
              <p className="text-yellow-200/80 text-sm mt-3">
                bgit converts to identity-specific hostname format automatically (for example: <code>git@github.com-work-gh:org/repo.git</code>).
              </p>
            </div>

            {/* Tips */}
            <div className="bg-blue-950/20 border border-blue-800/30 rounded-lg p-4 lg:p-6 mb-12">
              <p className="text-blue-200 font-semibold mb-3">Pro Tips</p>
              <ul className="space-y-2 text-blue-200 text-sm">
                <li className="flex gap-2">
                  <span>•</span>
                  <span>
                    Use <code>bgit workspace</code> to auto-switch identity by folder
                  </span>
                </li>
                <li className="flex gap-2">
                  <span>•</span>
                  <span>
                    Run <code>bgit doctor</code> when SSH authentication fails
                  </span>
                </li>
                <li className="flex gap-2">
                  <span>•</span>
                  <span>
                    Use <code>bgit status</code> to see which identity will be used
                  </span>
                </li>
                <li className="flex gap-2">
                  <span>•</span>
                  <span>
                    Bind repos with <code>bgit bind</code> for sticky identity
                  </span>
                </li>
              </ul>
            </div>

            {/* Next Steps */}
            <div className="text-center">
              <p className="text-muted mb-6">
                Need more help? Check out the full documentation or ask the
                community
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/docs"
                  className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition font-semibold">
                  Read Documentation
                </Link>
                <a
                  href="https://github.com/byterings/bgit/issues"
                  className="px-6 py-3 border border-gray-700 rounded-lg hover:border-accent transition font-semibold"
                  target="_blank"
                  rel="noopener noreferrer">
                  Ask a Question
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
