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
      "Install bgit on Linux, macOS, or Windows and verify the CLI is available.",
    keywords: [
      "install",
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
];
