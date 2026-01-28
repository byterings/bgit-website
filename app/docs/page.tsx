"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import CodeBlock from "../components/CodeBlock";
import Accordion from "../components/Accordion";

const sections = [
  { id: "installation", label: "Installation" },
  { id: "getting-started", label: "Getting Started" },
  { id: "usage", label: "Usage Guide" },
  { id: "workspaces", label: "Workspaces" },
  { id: "identity-resolution", label: "Identity Resolution" },
  { id: "configuration", label: "Configuration" },
  { id: "troubleshooting", label: "Troubleshooting" },
  { id: "faq", label: "FAQ" },
];

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("installation");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -66%" }
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-12">
          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <h2 className="text-sm font-semibold text-muted uppercase tracking-wide mb-4">
                On This Page
              </h2>
              <nav className="space-y-1">
                {sections.map(({ id, label }) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    className={`block py-2 px-3 rounded-lg text-sm transition-colors ${
                      activeSection === id
                        ? "bg-accent/10 text-accent font-medium"
                        : "text-muted hover:text-foreground hover:bg-[#0d0d0d]"
                    }`}>
                    {label}
                  </a>
                ))}
              </nav>

              <div className="mt-8 pt-8 border-t border-gray-800">
                <Link
                  href="/commands"
                  className="flex items-center gap-2 text-sm text-muted hover:text-accent transition">
                  <span>View Commands Reference</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="min-w-0">
            {/* Header */}
            <div className="mb-12">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                Documentation
              </h1>
              <p className="text-xl text-muted">
                Complete guide to using the bgit CLI tool for managing multiple
                Git identities
              </p>
            </div>

            {/* Mobile TOC */}
            <div className="lg:hidden bg-[#0d0d0d] border border-gray-800 rounded-lg p-4 mb-8">
              <h2 className="text-sm font-semibold mb-3">On This Page</h2>
              <nav className="flex flex-wrap gap-2">
                {sections.map(({ id, label }) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    className="text-sm text-muted hover:text-accent transition px-3 py-1 bg-[#0a0a0a] rounded-full">
                    {label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Installation */}
            <section id="installation" className="mb-16 scroll-mt-28">
              <h2 className="text-3xl font-bold mb-6 pb-2 border-b border-gray-800">
                Installation
              </h2>

              <div className="space-y-8">
                {/* Linux */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-accent flex items-center gap-3">
                    <svg
                      className="w-6 h-6"
                      viewBox="0 0 24 24"
                      fill="currentColor">
                      <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.132 1.884 1.071.771-.06 1.592-.536 2.257-1.306.631-.765 1.683-1.084 2.378-1.503.348-.199.629-.469.649-.853.023-.4-.2-.811-.714-1.376v-.097l-.003-.003c-.17-.2-.25-.535-.338-.926-.085-.401-.182-.786-.492-1.046h-.003c-.059-.054-.123-.067-.188-.135a.357.357 0 00-.19-.064c.431-1.278.264-2.55-.173-3.694-.533-1.41-1.465-2.638-2.175-3.483-.796-1.005-1.576-1.957-1.56-3.368.026-2.152.236-6.133-3.544-6.139zm.529 3.405h.013c.213 0 .396.062.584.198.19.135.33.332.438.533.105.259.158.459.166.724 0-.02.006-.04.006-.06v.105a.086.086 0 01-.004-.021l-.004-.024a1.807 1.807 0 01-.15.706.953.953 0 01-.213.335.71.71 0 00-.088-.042c-.104-.045-.198-.064-.284-.133a1.312 1.312 0 00-.22-.066c.05-.06.146-.133.183-.198.053-.128.082-.264.088-.402v-.02a1.21 1.21 0 00-.061-.4c-.045-.134-.101-.2-.183-.333-.084-.066-.167-.132-.267-.132h-.016c-.093 0-.176.03-.262.132a.8.8 0 00-.205.334 1.18 1.18 0 00-.09.4v.019c.002.089.008.179.02.267-.193-.067-.438-.135-.607-.202a1.635 1.635 0 01-.018-.2v-.02a1.772 1.772 0 01.15-.768c.082-.22.232-.406.43-.533a.985.985 0 01.594-.2zm-2.962.059h.036c.142 0 .27.048.399.135.146.129.264.288.344.465.09.199.14.4.153.667v.004c.007.134.006.2-.002.266v.08c-.03.007-.056.018-.083.024-.152.055-.274.135-.393.2.012-.09.013-.18.003-.267v-.015c-.012-.133-.04-.2-.082-.333a.613.613 0 00-.166-.267.248.248 0 00-.183-.064h-.021c-.071.006-.13.04-.186.132a.552.552 0 00-.12.27.944.944 0 00-.023.33v.015c.012.135.037.2.08.334.046.134.098.2.166.268.01.009.02.018.034.024-.07.057-.117.07-.176.136a.304.304 0 01-.131.068 2.62 2.62 0 01-.275-.402 1.772 1.772 0 01-.155-.667 1.759 1.759 0 01.08-.668 1.43 1.43 0 01.283-.535c.128-.133.26-.2.418-.2zm1.37 1.706c.332 0 .733.065 1.216.399.293.2.523.269 1.052.468h.003c.255.136.405.266.478.399v-.131a.571.571 0 01.016.47c-.123.31-.516.643-1.063.842v.002c-.268.135-.501.333-.775.465-.276.135-.588.292-1.012.267a1.139 1.139 0 01-.448-.067 3.566 3.566 0 01-.322-.198c-.195-.135-.363-.332-.612-.465v-.005h-.005c-.4-.246-.616-.512-.686-.71-.07-.268-.005-.47.193-.6.224-.135.38-.271.483-.336.104-.074.143-.102.176-.131h.002v-.003c.169-.202.436-.47.839-.601.139-.036.294-.065.466-.065zm2.8 2.142c.358 1.417 1.196 3.475 1.735 4.473.286.534.855 1.659 1.102 3.024.156-.005.33.018.513.064.646-1.671-.546-3.467-1.089-3.966-.22-.2-.232-.335-.123-.335.59.534 1.365 1.572 1.646 2.757.13.535.16 1.104.021 1.67.067.028.135.06.205.067 1.032.534 1.413.938 1.23 1.537v-.043c-.06-.003-.12 0-.18 0h-.016c.151-.467-.182-.825-1.065-1.224-.915-.4-1.646-.336-1.77.465-.008.043-.013.066-.018.135-.068.023-.139.053-.209.064-.43.268-.662.669-.793 1.187-.13.533-.17 1.156-.205 1.869v.003c-.02.482-.04.965-.07 1.39l-.002.006a.398.398 0 01-.067-.134v-.003c-.094-.15-.255-.328-.373-.465-.157-.2-.256-.4-.317-.535-.078-.167-.12-.267-.163-.333a.347.347 0 00-.107-.133l-.005.003a.332.332 0 00-.12-.064c-.166-.067-.265-.2-.36-.333-.096-.133-.19-.266-.26-.4-.143-.266-.238-.533-.358-.8-.12-.266-.241-.533-.42-.8a4.26 4.26 0 00-.267-.334c-.02-.022-.037-.045-.058-.066-.49-.6-1.036-.933-1.536-1.067-.498-.133-1.012-.133-1.49-.066a4.015 4.015 0 00-1.106.333 4.463 4.463 0 00-.665.402c-.198.135-.338.27-.47.4-.263.267-.468.535-.675.802-.207.267-.418.6-.616.935-.096.135-.192.27-.284.4-.09.133-.186.266-.26.4-.14.266-.256.533-.367.8-.11.266-.22.533-.291.8-.053.2-.096.4-.127.533-.17.867-.254 1.6.008 2.468.262.867.773 1.736 1.707 2.536.934.8 2.285 1.533 4.206 1.866l.021.004c.196.032.393.06.591.084.667.08 1.35.116 2.046.111h.072c.267-.005.532-.02.793-.044.392-.033.774-.087 1.15-.158.087-.016.175-.033.26-.054.174-.04.344-.086.511-.138.109-.033.216-.07.323-.106.195-.067.385-.14.572-.22l.117-.052c.15-.067.297-.138.44-.213.109-.058.215-.119.318-.183.075-.045.148-.092.22-.14.168-.112.33-.23.482-.356.177-.148.344-.304.496-.468.055-.059.108-.12.16-.181.105-.122.2-.25.29-.38.039-.055.078-.112.114-.169l.036-.055c.035-.054.068-.11.1-.167.017-.03.034-.061.05-.092.05-.09.096-.184.138-.278l.021-.049c.021-.047.04-.095.057-.144.135-.401.172-.78.105-1.134v-.004c-.104.027-.202.068-.307.092-.02.024-.038.05-.058.074l-.045.06c-.165.218-.385.381-.64.481l-.049.019c-.111.044-.227.077-.344.103-.217.047-.44.065-.663.065-.224 0-.447-.017-.663-.064-.109-.024-.216-.056-.322-.094-.12-.044-.236-.095-.344-.153-.193-.103-.367-.228-.517-.379l-.012-.012c-.103-.102-.189-.215-.26-.335-.037-.062-.07-.127-.099-.192l-.013-.029a1.449 1.449 0 01-.064-.184c-.037-.126-.067-.267-.088-.402-.019-.133-.03-.266-.032-.4 0-.066-.002-.133 0-.2v-.022c.003-.133.013-.266.028-.4.031-.266.084-.533.168-.8.043-.133.095-.266.154-.4.06-.133.128-.266.205-.399.153-.266.346-.532.588-.799l.03-.03c.106-.113.218-.22.336-.32l.068-.055c.045-.035.091-.069.137-.101.152-.105.312-.199.479-.284h.003c.212-.107.437-.197.664-.27.058-.018.115-.036.173-.051.206-.058.418-.1.632-.13.107-.014.214-.026.322-.033h.001c.269-.022.54-.018.81.003.135.012.266.03.397.052.133.023.266.051.398.086.253.07.497.164.734.287l.016.01.066.037c.148.088.284.189.412.298.033.028.065.057.095.086.116.109.222.228.318.358.037.049.073.1.107.151.027.04.051.081.075.122l.006.01c.02.036.04.072.058.109l.014.03c.067.142.12.29.156.442l.006.027a.86.86 0 01.017.091c.007.041.012.083.015.125l.002.018.001.022v.028c.001.035 0 .07-.002.105l-.006.034a.87.87 0 01-.023.122l-.01.035c-.01.038-.024.076-.04.114l-.006.018a.616.616 0 01-.07.122c-.033.045-.07.087-.112.125l-.037.033a.46.46 0 01-.14.09c-.06.028-.124.049-.19.061a.613.613 0 01-.153.014h-.017a.584.584 0 01-.14-.02.49.49 0 01-.115-.05l-.02-.011a.477.477 0 01-.087-.06.41.41 0 01-.058-.055.33.33 0 01-.038-.049.29.29 0 01-.04-.079.244.244 0 01-.013-.068.19.19 0 010-.054c.003-.02.008-.039.016-.057a.24.24 0 01.032-.05c.013-.016.029-.03.046-.043.02-.014.04-.025.063-.034.024-.01.05-.016.076-.019a.345.345 0 01.082 0c.026.003.052.01.076.02.021.008.042.02.06.033l.015.012c.015.012.028.025.04.04l.01.013c.01.013.019.028.026.044l.006.014c.006.016.011.032.014.049l.002.017c.002.018.003.035.002.053 0 .017-.003.034-.008.05l-.005.013c-.005.015-.012.03-.02.044l-.004.007a.209.209 0 01-.037.045l-.003.003a.193.193 0 01-.053.035c-.02.01-.041.016-.063.02a.209.209 0 01-.067.002.195.195 0 01-.063-.02.18.18 0 01-.05-.04.164.164 0 01-.03-.055.155.155 0 01-.005-.066.142.142 0 01.02-.058.125.125 0 01.04-.042c.018-.012.039-.02.06-.024a.144.144 0 01.065.002c.021.006.04.016.056.03.016.013.029.03.037.048a.12.12 0 01.01.058.108.108 0 01-.018.051.093.093 0 01-.04.033.089.089 0 01-.052.006.078.078 0 01-.041-.022.07.07 0 01-.019-.038.063.063 0 01.009-.04.06.06 0 01.032-.024.059.059 0 01.04.001.05.05 0 01.027.022.047.047 0 01.006.032.04.04 0 01-.017.025.037.037 0 01-.028.006.033.033 0 01-.02-.015.029.029 0 01-.002-.022.025.025 0 01.013-.015.022.022 0 01.017-.001.019.019 0 01.01.011.016.016 0 010 .014l-.004.004z" />
                    </svg>
                    Linux
                  </h3>
                  <CodeBlock>{`curl -L https://github.com/byterings/bgit/releases/latest/download/bgit-linux-amd64 -o bgit
chmod +x bgit
sudo mv bgit /usr/local/bin/`}</CodeBlock>
                  <p className="text-muted text-sm mt-3">
                    For ARM architecture (Raspberry Pi, etc.), use{" "}
                    <code>bgit-linux-arm64</code>
                  </p>
                </div>

                {/* macOS */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-accent flex items-center gap-3">
                    <svg
                      className="w-6 h-6"
                      viewBox="0 0 24 24"
                      fill="currentColor">
                      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
                    </svg>
                    macOS
                  </h3>
                  <p className="text-muted mb-3 text-sm">
                    <strong>Intel Macs:</strong>
                  </p>
                  <CodeBlock className="mb-4">{`curl -L https://github.com/byterings/bgit/releases/latest/download/bgit-darwin-amd64 -o bgit
chmod +x bgit
sudo mv bgit /usr/local/bin/`}</CodeBlock>
                  <p className="text-muted mb-3 text-sm">
                    <strong>Apple Silicon (M1/M2/M3):</strong>
                  </p>
                  <CodeBlock>{`curl -L https://github.com/byterings/bgit/releases/latest/download/bgit-darwin-arm64 -o bgit
chmod +x bgit
sudo mv bgit /usr/local/bin/`}</CodeBlock>
                </div>

                {/* Windows */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-accent flex items-center gap-3">
                    <svg
                      className="w-6 h-6"
                      viewBox="0 0 24 24"
                      fill="currentColor">
                      <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
                    </svg>
                    Windows
                  </h3>
                  <p className="text-foreground font-bold mb-3 text-sm">
                    Run this command in PowerShell:
                  </p>
                  <CodeBlock>{`irm https://raw.githubusercontent.com/byterings/bgit/main/install.ps1 | iex`}</CodeBlock>
                </div>

                {/* Verify Installation */}
                <div className="bg-[#0d0d0d] border border-gray-800 rounded-lg p-5">
                  <h4 className="font-semibold mb-3">Verify Installation</h4>
                  <CodeBlock>{`bgit --version`}</CodeBlock>
                  <p className="text-muted text-sm mt-3">
                    You should see the version number printed
                  </p>
                </div>
              </div>
            </section>

            {/* Getting Started */}
            <section id="getting-started" className="mb-16 scroll-mt-28">
              <h2 className="text-3xl font-bold mb-6 pb-2 border-b border-gray-800">
                Getting Started
              </h2>

              <div className="space-y-6">
                {[
                  {
                    step: 1,
                    title: "Initialize bgit",
                    cmd: "bgit init",
                    desc: "This sets up bgit on your system and creates the necessary configuration directory at ~/.bgit/",
                  },
                  {
                    step: 2,
                    title: "Add your first identity",
                    cmd: "bgit add",
                    desc: "This launches an interactive wizard that will ask for alias, name, email, GitHub username, and SSH key setup.",
                  },
                  {
                    step: 3,
                    title: "Add more identities",
                    cmd: "bgit add",
                    desc: "Repeat the command to add your other accounts (personal, clients, etc.)",
                  },
                  {
                    step: 4,
                    title: "Switch between identities",
                    cmd: "bgit use work",
                    desc: "All subsequent Git operations will use the selected identity. Your global .gitconfig and SSH configuration are updated automatically.",
                  },
                ].map(({ step, title, cmd, desc }) => (
                  <div key={step} className="flex gap-4">
                    <div className="shrink-0 w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center font-bold">
                      {step}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold mb-2">{title}</h3>
                      <CodeBlock>{cmd}</CodeBlock>
                      <p className="text-muted text-sm mt-2">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Usage Guide */}
            <section id="usage" className="mb-16 scroll-mt-28">
              <h2 className="text-3xl font-bold mb-6 pb-2 border-b border-gray-800">
                Usage Guide
              </h2>

              <div className="grid gap-4">
                {[
                  {
                    title: "Switching Identities",
                    cmd: "bgit use personal",
                    desc: "Changes your active Git identity. All future commits will use this identity's name, email, and SSH key.",
                  },
                  {
                    title: "Viewing All Identities",
                    cmd: "bgit list",
                    desc: "Shows all configured identities. The currently active identity is marked with a → symbol.",
                  },
                  {
                    title: "Checking Active Identity",
                    cmd: "bgit active",
                    desc: "Shows which identity is currently active with full details.",
                  },
                  {
                    title: "Cloning Repositories",
                    cmd: "bgit clone https://github.com/org/repo.git",
                    desc: "Clones a repository using the active identity's SSH config. Accepts any GitHub URL format.",
                  },
                  {
                    title: "Fix Repository Remote",
                    cmd: "bgit remote fix",
                    desc: "Converts current repo's remote URL to use active identity's SSH config. Run inside a git repo.",
                  },
                  {
                    title: "Validating Configuration",
                    cmd: "bgit sync --fix",
                    desc: "Validates that your Git and SSH configurations are correct. Use --fix to automatically correct any issues.",
                  },
                  {
                    title: "Removing an Identity",
                    cmd: "bgit delete work",
                    desc: "Removes an identity from bgit. Optionally deletes SSH keys.",
                  },
                  {
                    title: "Updating SSH Keys",
                    cmd: "bgit update work --ssh-key ~/.ssh/new_key",
                    desc: "Updates the SSH key for an existing identity. Useful for adding a key to a user created without one.",
                  },
                ].map(({ title, cmd, desc }) => (
                  <div
                    key={title}
                    className="bg-[#0d0d0d] border border-gray-800 rounded-lg p-5">
                    <h3 className="font-semibold mb-2">{title}</h3>
                    <CodeBlock>{cmd}</CodeBlock>
                    <p className="text-muted text-sm mt-2">{desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 bg-yellow-950/20 border border-yellow-800/30 rounded-lg p-5">
                <p className="text-yellow-200 mb-2">
                  <strong>Tip: Cloning Made Easy</strong>
                </p>
                <p className="text-yellow-200/80 text-sm mb-3">
                  Use <code>bgit clone</code> to automatically clone with the
                  correct SSH config:
                </p>
                <CodeBlock>{`bgit clone https://github.com/org/repo.git`}</CodeBlock>
                <p className="text-yellow-200/80 text-sm mt-3">
                  This works with any GitHub URL format. bgit converts it to use
                  the active identity&apos;s SSH key automatically.
                </p>
              </div>

              <div className="mt-4 bg-blue-950/20 border border-blue-800/30 rounded-lg p-4 lg:p-5">
                <p className="text-blue-200 text-sm">
                  <strong>Pro Tip:</strong> After switching identities with{" "}
                  <code>bgit use</code>, you can continue using regular{" "}
                  <code>git</code> commands as normal. bgit only manages your
                  configuration—it doesn&apos;t wrap or replace git.
                </p>
              </div>
            </section>

            {/* Workspaces */}
            <section id="workspaces" className="mb-16 scroll-mt-28">
              <h2 className="text-3xl font-bold mb-6 pb-2 border-b border-gray-800">
                Workspaces
              </h2>

              <p className="text-muted mb-6">
                Workspaces let you organize projects by identity. Clone repos inside a workspace folder and bgit automatically uses the correct identity.
              </p>

              <div className="space-y-6">
                <div className="bg-[#0d0d0d] border border-gray-800 rounded-lg p-4 lg:p-5">
                  <h3 className="font-semibold mb-3">Create Workspaces</h3>
                  <CodeBlock>{`cd ~/projects
bgit workspace

# Creates folders for each identity:
#   ~/projects/work/      → uses "work" identity
#   ~/projects/personal/  → uses "personal" identity`}</CodeBlock>
                </div>

                <div className="bg-[#0d0d0d] border border-gray-800 rounded-lg p-4 lg:p-5">
                  <h3 className="font-semibold mb-3">Clone Inside Workspace</h3>
                  <CodeBlock>{`cd ~/projects/work
bgit clone https://github.com/company/repo.git
# Uses "work" identity automatically!

cd ~/projects/personal
bgit clone https://github.com/me/hobby.git
# Uses "personal" identity automatically!`}</CodeBlock>
                </div>

                <div className="bg-[#0d0d0d] border border-gray-800 rounded-lg p-4 lg:p-5">
                  <h3 className="font-semibold mb-3">Bind Individual Repos</h3>
                  <p className="text-muted text-sm mb-3">
                    For repos not in a workspace, bind them to an identity:
                  </p>
                  <CodeBlock>{`cd existing-repo
bgit bind --user work

# This repo now always uses "work" identity`}</CodeBlock>
                </div>
              </div>

              <div className="mt-6 bg-green-950/20 border border-green-800/30 rounded-lg p-4 lg:p-5">
                <p className="text-green-200 text-sm">
                  <strong>Benefit:</strong> No need to remember to switch identities.
                  Just work in the right folder and bgit handles the rest.
                </p>
              </div>
            </section>

            {/* Identity Resolution */}
            <section id="identity-resolution" className="mb-16 scroll-mt-28">
              <h2 className="text-3xl font-bold mb-6 pb-2 border-b border-gray-800">
                Identity Resolution
              </h2>

              <p className="text-muted mb-6">
                bgit determines which identity to use based on your current location:
              </p>

              <div className="space-y-4">
                {[
                  {
                    priority: 1,
                    title: "Workspace",
                    desc: "If inside a workspace folder, use that workspace's identity",
                  },
                  {
                    priority: 2,
                    title: "Binding",
                    desc: "If the repo has an explicit binding, use the bound identity",
                  },
                  {
                    priority: 3,
                    title: "Global",
                    desc: "Otherwise, use the global active user from bgit use",
                  },
                ].map(({ priority, title, desc }) => (
                  <div key={priority} className="flex gap-4">
                    <div className="shrink-0 w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {priority}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold">{title}</h3>
                      <p className="text-muted text-sm">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 bg-[#0d0d0d] border border-gray-800 rounded-lg p-4 lg:p-5">
                <h3 className="font-semibold mb-3">Check Current Resolution</h3>
                <CodeBlock>{`bgit status`}</CodeBlock>
                <p className="text-muted text-sm mt-3">
                  Shows which identity will be used and why (workspace, binding, or global).
                </p>
              </div>
            </section>

            {/* Configuration */}
            <section id="configuration" className="mb-16 scroll-mt-28">
              <h2 className="text-3xl font-bold mb-6 pb-2 border-b border-gray-800">
                Configuration
              </h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Configuration Files
                  </h3>
                  <p className="text-muted mb-4">
                    bgit stores all configuration in{" "}
                    <code>~/.bgit/config.toml</code>. This file contains:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-foreground/90 ml-4 text-sm">
                    <li>All your configured identities</li>
                    <li>Currently active identity</li>
                    <li>
                      SSH key paths and Git configuration for each identity
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">SSH Keys</h3>
                  <p className="text-muted mb-4">
                    By default, bgit generates Ed25519 SSH keys in{" "}
                    <code>~/.ssh/</code> with names like:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-foreground/90 ml-4 text-sm">
                    <li>
                      <code>~/.ssh/bgit_work</code>
                    </li>
                    <li>
                      <code>~/.ssh/bgit_personal</code>
                    </li>
                  </ul>
                  <p className="text-muted mt-4 text-sm">
                    You can also use existing SSH keys during the{" "}
                    <code>bgit add</code> process.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Git Configuration
                  </h3>
                  <p className="text-muted mb-3">
                    bgit modifies your global Git configuration (
                    <code>~/.gitconfig</code>) to update:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-foreground/90 ml-4 text-sm">
                    <li>
                      <code>user.name</code>
                    </li>
                    <li>
                      <code>user.email</code>
                    </li>
                  </ul>
                  <p className="text-muted mt-4 text-sm">
                    All other Git settings remain unchanged.
                  </p>
                </div>
              </div>
            </section>

            {/* Troubleshooting */}
            <section id="troubleshooting" className="mb-16 scroll-mt-28">
              <h2 className="text-3xl font-bold mb-6 pb-2 border-b border-gray-800">
                Troubleshooting
              </h2>

              <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 lg:p-5 mb-6">
                <h3 className="font-semibold mb-2 text-accent">Quick Fix: Run Doctor</h3>
                <p className="text-muted text-sm mb-3">
                  For most issues, start with the doctor command:
                </p>
                <CodeBlock>{`bgit doctor --fix`}</CodeBlock>
                <p className="text-muted text-sm mt-3">
                  This checks config, SSH permissions, and can auto-fix common problems.
                </p>
              </div>

              <div className="space-y-4">
                <div className="border border-gray-800 rounded-lg p-4 lg:p-5">
                  <h3 className="font-semibold mb-2">
                    SSH authentication fails
                  </h3>
                  <p className="text-muted text-sm mb-3">
                    Run diagnostics with network check:
                  </p>
                  <CodeBlock>{`bgit doctor --network`}</CodeBlock>
                  <p className="text-muted text-sm mt-3">
                    If your key isn&apos;t on GitHub, copy it and add to GitHub Settings → SSH keys:
                  </p>
                  <CodeBlock>{`cat ~/.ssh/bgit_work.pub`}</CodeBlock>
                </div>

                <div className="border border-gray-800 rounded-lg p-4 lg:p-5">
                  <h3 className="font-semibold mb-2">
                    Wrong identity being used
                  </h3>
                  <p className="text-muted text-sm mb-3">
                    Check which identity is active and why:
                  </p>
                  <CodeBlock>{`bgit status`}</CodeBlock>
                  <p className="text-muted text-sm mt-3">
                    If you&apos;re in a workspace or bound repo, that identity takes precedence.
                  </p>
                </div>

                <div className="border border-gray-800 rounded-lg p-4 lg:p-5">
                  <h3 className="font-semibold mb-2">SSH permission errors</h3>
                  <p className="text-muted text-sm mb-3">
                    SSH requires specific permissions. Auto-fix with:
                  </p>
                  <CodeBlock>{`bgit doctor --fix`}</CodeBlock>
                  <p className="text-muted text-sm mt-3">
                    This sets ~/.ssh to 700 and key files to 600.
                  </p>
                </div>

                <div className="border border-gray-800 rounded-lg p-4 lg:p-5">
                  <h3 className="font-semibold mb-2">Command not found</h3>
                  <p className="text-muted text-sm mb-3">
                    Make sure bgit is in your PATH:
                  </p>
                  <CodeBlock>{`which bgit`}</CodeBlock>
                  <p className="text-muted text-sm mt-3">
                    If nothing is returned, reinstall following the installation instructions.
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <p className="text-muted text-sm">
                  Still having issues?{" "}
                  <a
                    href="https://github.com/byterings/bgit/issues"
                    className="text-accent hover:underline"
                    target="_blank"
                    rel="noopener noreferrer">
                    Report an issue on GitHub
                  </a>
                </p>
              </div>
            </section>

            {/* FAQ */}
            <section id="faq" className="mb-16 scroll-mt-28">
              <h2 className="text-3xl font-bold mb-6 pb-2 border-b border-gray-800">
                Frequently Asked Questions
              </h2>

              <Accordion
                items={[
                  {
                    question: "Does bgit wrap Git commands?",
                    answer:
                      "No. bgit only manages your Git and SSH configuration. You continue using regular git commands after switching identities.",
                  },
                  {
                    question: "What's the difference between workspaces and bindings?",
                    answer:
                      "Workspaces apply to all repos in a folder (created with 'bgit workspace'). Bindings apply to individual repos ('bgit bind'). Workspace takes priority over binding.",
                  },
                  {
                    question: "How do I know which identity will be used?",
                    answer:
                      "Run 'bgit status' to see the effective identity and why (workspace, binding, or global).",
                  },
                  {
                    question: "Can I use bgit with GitLab or Bitbucket?",
                    answer:
                      "Yes! While bgit is optimized for GitHub, the Git configuration changes work with any Git hosting service.",
                  },
                  {
                    question: "Is my existing .gitconfig safe?",
                    answer:
                      "Yes. bgit only modifies user.name and user.email. All other settings are preserved.",
                  },
                  {
                    question: "How do I fix SSH permission errors?",
                    answer:
                      "Run 'bgit doctor --fix' to automatically set correct permissions (700 for ~/.ssh, 600 for key files).",
                  },
                  {
                    question: "How do I uninstall bgit?",
                    answer:
                      "Run 'bgit uninstall' to safely restore all repositories to standard GitHub format and remove bgit config. Then remove the binary: sudo rm /usr/local/bin/bgit",
                  },
                ]}
              />
            </section>

            {/* Next Steps */}
            <div className="bg-[#0d0d0d] border border-gray-800 rounded-lg p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Next Steps</h2>
              <p className="text-muted mb-6">
                Explore the full command reference or get help from the
                community
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/commands"
                  className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition font-semibold">
                  View All Commands
                </Link>
                <a
                  href="https://github.com/byterings/bgit/issues"
                  className="px-6 py-3 border border-gray-700 rounded-lg hover:border-accent transition font-semibold"
                  target="_blank"
                  rel="noopener noreferrer">
                  Get Help
                </a>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
