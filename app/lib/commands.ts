export interface CommandDoc {
  id: string;
  name: string;
  description: string;
  usage: string;
  details: string;
  example: string | null;
}

export const bgitCommands: CommandDoc[] = [
  {
    id: "setup",
    name: "bgit setup",
    description: "Run one-time setup",
    usage: "bgit setup",
    details:
      "Initializes bgit configuration, installs managed pre-push safety checks, updates SSH managed section, and configures first-run defaults.",
    example: null,
  },
  {
    id: "init",
    name: "bgit init",
    description: "Initialize bgit on your system (Deprecated)",
    usage: "bgit init",
    details:
      "Deprecated. Use bgit setup instead. This command is kept for backward compatibility and routes users to the setup flow.",
    example: null,
  },
  {
    id: "add",
    name: "bgit add",
    description: "Add a new Git identity",
    usage: 'bgit add\nbgit add --alias work --name "John Doe" --email "john@work.com" --github "john-work"',
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
    usage: "bgit clone <url> [directory]\nbgit clone <url> --no-bind",
    details:
      "Clones a GitHub repository using the effective identity's SSH configuration. Accepts HTTPS or SSH URLs and converts them automatically. By default, cloned repositories are auto-bound to the effective identity. Use --no-bind to skip.",
    example: "bgit clone https://github.com/user/repo.git",
  },
  {
    id: "check",
    name: "bgit check",
    description: "Run pre-push safety checks manually",
    usage: "bgit check",
    details:
      "Validates repo owner identity, active user, git config, and remote URL alignment. This is also used by the managed pre-push hook installed during setup.",
    example: null,
  },
  {
    id: "remote-fix",
    name: "bgit remote fix",
    description: "Fix repository remote URL for active identity (Legacy/Advanced)",
    usage: "bgit remote fix",
    details:
      "Legacy/advanced command. Converts the current repository's origin remote URL to use the active user's SSH config. In normal flow, bgit check and pre-push checks guide/fix this automatically.",
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
    description: "Setup SSH agent and load keys (Deprecated)",
    usage: "bgit setup-ssh",
    details:
      "Deprecated. Use bgit setup instead. This command is kept for backward compatibility and manual SSH-agent workflows.",
    example: null,
  },
  {
    id: "prompt",
    name: "bgit prompt",
    description: "Print effective identity for shell prompt integration",
    usage: "bgit prompt\nbgit prompt --plain",
    details:
      "Outputs the effective identity for the current path. Use --plain for alias-only output, intended for shell prompt integrations.",
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
    details:
      "Displays help information and available commands. Use --help with any command to see its specific options.",
    example: null,
  },
];
