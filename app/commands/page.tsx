"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import CodeBlock from "../components/CodeBlock";

const commands = [
  {
    id: "init",
    name: "bgit init",
    description: "Initialize bgit on your system",
    usage: "bgit init",
    details:
      "Sets up bgit configuration directory at ~/.bgit/ and prepares the system for managing multiple Git identities. Optional - bgit auto-initializes on first use.",
    example: null,
  },
  {
    id: "add",
    name: "bgit add",
    description: "Add a new Git identity",
    usage: "bgit add\nbgit add --alias work --name \"John Doe\" --email \"john@work.com\" --github \"john-work\"",
    details:
      "Launches an interactive wizard to configure a new identity. You'll be prompted for alias, name, email, GitHub username, and SSH key setup. You can also provide flags directly to skip prompts. Use --ssh-key to specify an existing SSH key path.",
    example: null,
  },
  {
    id: "list",
    name: "bgit list",
    description: "List all configured identities",
    usage: "bgit list\nbgit ls",
    details:
      'Displays all identities you\'ve configured. The currently active identity is marked with a → symbol. You can also use the short alias "ls".',
    example: null,
  },
  {
    id: "use",
    name: "bgit use",
    description: "Switch to a different identity",
    usage:
      "bgit use <alias>\nbgit use -u <github-username>\nbgit use -m <email>",
    details:
      "Switches your Git configuration to use the specified identity. Updates your global .gitconfig and SSH configuration. You can switch by alias (default), GitHub username (-u), or email (-m). On Windows, automatically starts SSH agent and loads keys.",
    example: "bgit use work",
  },
  {
    id: "active",
    name: "bgit active",
    description: "Show the currently active identity",
    usage: "bgit active",
    details:
      "Displays which identity is currently being used for Git operations, including name, email, GitHub username, and SSH key path.",
    example: null,
  },
  {
    id: "clone",
    name: "bgit clone",
    description: "Clone a repository with correct SSH config",
    usage: "bgit clone <url> [directory]",
    details:
      "Clones a GitHub repository using the active user's SSH configuration. Accepts any GitHub URL format (HTTPS or SSH) and automatically converts it to use the correct SSH key for the active identity.",
    example: "bgit clone https://github.com/user/repo.git",
  },
  {
    id: "remote-fix",
    name: "bgit remote fix",
    description: "Fix repository remote URL for active identity",
    usage: "bgit remote fix",
    details:
      "Converts the current repository's origin remote URL to use the active user's SSH config. Run this inside a git repository after switching identities to fix authentication issues.",
    example: null,
  },
  {
    id: "remote-restore",
    name: "bgit remote restore",
    description: "Restore remote URL to standard GitHub format",
    usage: "bgit remote restore",
    details:
      "Converts the current repository's origin remote URL back to standard GitHub format. Useful before uninstalling bgit or when you want to revert to normal git@github.com URLs.",
    example: null,
  },
  {
    id: "sync",
    name: "bgit sync",
    description: "Validate and fix Git/SSH configuration",
    usage: "bgit sync\nbgit sync --fix",
    details:
      "Checks that your Git and SSH configurations match the active identity. Validates user.name, user.email, SSH key existence, and file permissions. Use --fix flag to automatically correct any issues.",
    example: "bgit sync --fix",
  },
  {
    id: "workspace",
    name: "bgit workspace",
    description: "Create workspace folders with automatic identity binding",
    usage: "bgit workspace\nbgit workspace --path ~/code\nbgit workspace --users work,personal\nbgit workspace --list\nbgit workspace --remove work",
    details:
      "Creates organized workspace directories for each identity. All repositories cloned within a workspace folder automatically use that identity, regardless of the global active user. Use --list to view configured workspaces, --remove to delete a workspace binding.",
    example: "bgit workspace --path ~/projects",
  },
  {
    id: "bind",
    name: "bgit bind",
    description: "Bind current repository to a specific identity",
    usage: "bgit bind\nbgit bind --user work\nbgit bind --force\nbgit bind --remove",
    details:
      "Binds the current repository to a specific identity. The binding persists regardless of the global active user. Use --user to specify identity, --force to override existing binding, --remove to unbind.",
    example: "bgit bind --user work",
  },
  {
    id: "status",
    name: "bgit status",
    description: "Show current identity status and bindings",
    usage: "bgit status",
    details:
      "Displays comprehensive identity status including: active global identity, current location, effective identity (workspace/binding/global), configured workspaces, and repository bindings. Helps understand which identity will be used for the current context.",
    example: null,
  },
  {
    id: "doctor",
    name: "bgit doctor",
    description: "Diagnose and fix configuration issues",
    usage: "bgit doctor\nbgit doctor --network\nbgit doctor --fix",
    details:
      "Runs comprehensive diagnostics on your bgit setup. Checks config validity, SSH directory/key permissions (700/600), SSH agent status, git config, and optionally network connectivity to GitHub. Use --fix to automatically correct permission issues.",
    example: "bgit doctor --fix",
  },
  {
    id: "delete",
    name: "bgit delete",
    description: "Remove an identity",
    usage: "bgit delete <alias>",
    details:
      "Removes an identity from bgit. Confirms before deletion and optionally deletes SSH key files. Clears active user if deleted identity was active.",
    example: "bgit delete old-work",
  },
  {
    id: "update",
    name: "bgit update",
    description: "Update an identity's SSH key",
    usage: "bgit update <alias> --ssh-key <path>",
    details:
      "Updates the SSH key for an existing identity. Useful for adding a key to a user created without one, or changing to a new key. Automatically updates SSH config.",
    example: "bgit update work --ssh-key ~/.ssh/new_key",
  },
  {
    id: "setup-ssh",
    name: "bgit setup-ssh",
    description: "Setup SSH agent and load keys",
    usage: "bgit setup-ssh",
    details:
      "Sets up SSH agent and loads SSH keys for all configured identities. On Windows, starts the SSH agent service and sets it to automatic startup. On Linux/macOS, provides instructions if SSH agent isn't running.",
    example: null,
  },
  {
    id: "uninstall",
    name: "bgit uninstall",
    description: "Safely uninstall bgit",
    usage: "bgit uninstall\nbgit uninstall --force\nbgit uninstall --skip-repos",
    details:
      "Safely uninstalls bgit by scanning for repositories with bgit remote URLs and restoring them to standard GitHub format. Removes bgit SSH config entries and configuration directory. Use --skip-repos to skip repository scanning, --force to skip confirmation.",
    example: null,
  },
  {
    id: "version",
    name: "bgit --version",
    description: "Show bgit version",
    usage: "bgit --version",
    details: "Displays the current version of bgit.",
    example: null,
  },
  {
    id: "help",
    name: "bgit help",
    description: "Show help information",
    usage: "bgit help\nbgit <command> --help",
    details: "Displays help information and available commands. Use --help with any command to see its specific options.",
    example: null,
  },
];

export default function CommandsPage() {
  const [activeCommand, setActiveCommand] = useState("init");

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

    commands.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

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
              <nav className="space-y-1 overflow-y-auto flex-1 pr-2">
                {commands.map(({ id, name }) => (
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
              <h2 className="text-sm font-semibold mb-3">Commands</h2>
              <nav className="flex flex-wrap gap-2">
                {commands.map(({ id, name }) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    className="text-sm text-muted hover:text-accent transition px-3 py-1 bg-[#0a0a0a] rounded-full font-mono">
                    {name.replace("bgit ", "")}
                  </a>
                ))}
              </nav>
            </div>

            {/* Detailed Command Documentation */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-gray-800">
                Detailed Documentation
              </h2>

              <div className="space-y-6">
                {commands.map((cmd) => (
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
                  <CodeBlock>{`# Add your work account
bgit add

# Add your personal account
bgit add

# List all identities
bgit list`}</CodeBlock>
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

# Fix remote URL
bgit remote fix

# Now git push/pull works!`}</CodeBlock>
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
                Alternatively, you can use identity-specific hostname format manually: <code>git@github.com-work:org/repo.git</code>
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
