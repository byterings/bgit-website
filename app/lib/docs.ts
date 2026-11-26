export interface DocsSection {
  id: string;
  label: string;
  description: string;
  keywords: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const docsSections: DocsSection[] = [
  {
    id: "installation",
    label: "Installation",
    description:
      "Install the bgit desktop app or CLI on Linux, macOS, or Windows.",
    keywords: [
      "install",
      "desktop app",
      "installer",
      "dmg",
      "deb",
      "download app",
      "download",
      "linux",
      "macos",
      "windows",
      "verify",
      "curl",
      "powershell",
    ],
  },
  {
    id: "desktop-workflow",
    label: "Desktop workflow",
    description:
      "Get started in bgit Desktop: set up identities, repositories, commits, branches, and sync.",
    keywords: ["desktop", "repository", "commit", "changes", "diff", "branch", "history", "pull", "push"],
  },
  {
    id: "getting-started",
    label: "Getting Started",
    description:
      "Follow the recommended onboarding flow with bgit setup, add, use, and check.",
    keywords: [
      "setup",
      "first run",
      "onboarding",
      "getting started",
      "add identity",
      "switch identity",
    ],
  },
  {
    id: "usage",
    label: "Usage Guide",
    description:
      "Learn how to switch identities, clone repositories, run safety checks, and manage SSH keys.",
    keywords: [
      "use",
      "clone",
      "check",
      "prompt",
      "sync",
      "delete",
      "update ssh key",
    ],
  },
  {
    id: "workspaces",
    label: "Workspaces",
    description:
      "Organize repositories by identity with workspace folders and repo bindings.",
    keywords: [
      "workspace",
      "bind",
      "folders",
      "repo binding",
      "automatic identity",
    ],
  },
  {
    id: "identity-resolution",
    label: "Identity Resolution",
    description:
      "Understand how bgit picks the effective identity using workspace, binding, and global priority.",
    keywords: [
      "effective identity",
      "priority",
      "workspace",
      "binding",
      "global",
      "status",
    ],
  },
  {
    id: "configuration",
    label: "Configuration",
    description:
      "See where bgit stores config, how SSH keys are named, and what it changes in Git config.",
    keywords: [
      "config",
      "config.toml",
      "ssh keys",
      "gitconfig",
      "user.name",
      "user.email",
    ],
  },
  {
    id: "backups",
    label: "Backups & Restore",
    description:
      "Create encrypted bgit backup archives and restore them safely on the same or another machine.",
    keywords: [
      "export",
      "import",
      "backup",
      "restore",
      "encrypted archive",
      "portable ssh keys",
      "password",
    ],
  },
  {
    id: "troubleshooting",
    label: "Troubleshooting",
    description:
      "Fix SSH auth problems, identity mismatches, permissions, and missing PATH issues.",
    keywords: [
      "doctor",
      "fix",
      "ssh auth",
      "permissions",
      "wrong identity",
      "path",
      "troubleshooting",
    ],
  },
  {
    id: "faq",
    label: "FAQ",
    description:
      "Answers about workspaces, bindings, uninstall, GitLab support, and safe config changes.",
    keywords: [
      "faq",
      "workspaces",
      "bindings",
      "uninstall",
      "gitlab",
      "bitbucket",
      "safe",
    ],
  },
];

export const faqItems: FaqItem[] = [
  {
    question: "Does the bgit CLI replace Git?",
    answer:
      "No. The CLI manages identity and SSH configuration, and you continue using regular git commands in the terminal. The bgit Desktop app also provides a visual repository workflow for changes, commits, branches, and sync.",
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
    question: "How do I back up my bgit setup?",
    answer:
      "Run 'bgit export' to create an encrypted .bgit archive. You'll be prompted for the export password interactively, and that password is required later for import.",
  },
  {
    question: "How do I fix SSH permission errors?",
    answer:
      "Run 'bgit doctor --fix' to automatically set correct permissions (700 for ~/.ssh, 600 for key files).",
  },
  {
    question: "How do I uninstall bgit?",
    answer:
      "CLI: run 'bgit uninstall' to safely restore all repositories to standard GitHub format and remove bgit config, then remove the binary (sudo rm /usr/local/bin/bgit). Desktop app: choose Settings, Advanced, Remove bgit from this computer, then uninstall the app like any other app. Skip the removal step if you keep using the other one, because the CLI and the app share the same setup.",
  },
];
