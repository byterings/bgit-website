export type BlogSection = { heading: string; paragraphs: string[]; code?: string };
export type BlogPost = { slug: string; title: string; description: string; published: string; sections: BlogSection[] };

export const blogPosts: BlogPost[] = [
  {
    slug: 'multiple-github-accounts-one-computer', title: 'How to Use Multiple GitHub Accounts on One Computer',
    description: 'Set up separate work, personal, and client GitHub identities on one computer with bgit, repository bindings, workspaces, and SSH keys.', published: '2026-11-27',
    sections: [
      { heading: 'Why multiple accounts get confusing', paragraphs: [
        'A single development computer often serves several parts of life: a company account, personal projects, client repositories, and open source contributions. Git stores an author name and email in configuration, while SSH or HTTPS credentials determine how a remote host authenticates you. Those are related decisions, but they are not the same setting. A commit can have the right remote account and the wrong author email, or the right author but an SSH key for another account.',
        'The common workaround is to change global Git settings every time you switch projects. That is easy to forget, and it makes the current identity depend on what you last did. bgit provides identities plus repository and folder rules, so you can inspect the identity chosen for a project rather than relying only on memory.'
      ]},
      { heading: 'Add each account as a bgit identity', paragraphs: [
        'Start by installing bgit and running its one-time setup. Add one identity for each Git author profile you use. The interactive wizard asks for an alias, author name, email, GitHub username, and SSH key setup. An alias such as work or personal is a convenient label; it does not replace the actual name and email that Git writes into commits.',
        'You can use a new key created during setup or point bgit at an existing key. Keep the identity details aligned with the account you intend to use, and avoid placing private key material in a repository. The installation guide covers platform setup, and the command reference lists the available flags.'
      ], code: 'bgit setup\nbgit add\nbgit list' },
      { heading: 'Choose a predictable identity rule', paragraphs: [
        'For a quick one-off switch, use bgit use followed by an identity alias. This changes the active global identity. For regular work, assign identity by project location: a workspace applies to repositories under a configured folder, while a binding attaches one identity to a repository. A workspace takes priority over a repository binding, and the global identity is the fallback.',
        'For example, you might put company repositories under ~/code/work and personal projects under ~/code/personal. A workspace keeps the identity consistent across all repositories in that folder. If one repository needs an exception, bind that repository explicitly and then inspect the result with bgit status.'
      ], code: 'bgit use personal\nbgit workspace --path ~/code/work\nbgit workspace --users work\ncd ~/code/personal/project\nbgit bind --user personal\nbgit status' },
      { heading: 'Clone with the intended account', paragraphs: [
        'When cloning, bgit can use the effective identity’s SSH configuration and bind the new repository by default. This helps keep newly cloned projects associated with the account you selected. If you already have a checkout, run the status command from inside it to see which identity applies and whether the choice comes from a workspace, a binding, or the global default.',
        'Do not assume a repository’s display name or remote URL proves which commit author Git will use. Check both the effective bgit identity and the repository’s Git configuration before a sensitive commit. The bgit check command also validates owner identity, active user, Git config, and remote alignment.'
      ], code: 'bgit clone git@github.com:owner/repository.git\ncd repository\nbgit status\nbgit check' },
      { heading: 'Use Desktop or the CLI', paragraphs: [
        'bgit Desktop and the CLI share identities, SSH configuration, bindings, and workspaces. Use the desktop app to review changed files, diffs, history, branches, and sync operations in a visual repository workflow. Use the CLI when you prefer terminal commands, scripts, or quick identity checks. You do not have to choose one interface permanently.',
        'Before committing, verify the identity shown for the repository and review the changed files. Before pushing, check that the remote and authentication are what you expect. bgit helps organize local identity selection; the Git host still controls repository permissions and account authentication.'
      ]},
      { heading: 'A short repeatable checklist', paragraphs: [
        'Add and name each identity clearly, choose folder workspaces where project locations are predictable, and use repository bindings for exceptions. Run bgit status when you enter an unfamiliar repository. If Git author details or SSH setup look wrong, use the documented diagnostics before making a change. This keeps the setup understandable as repositories and accounts accumulate.',
        'For complete setup instructions, read the bgit install guide and the workspace guide. If you prefer to work from a window, visit the Desktop page for platform downloads. The [commands reference](/commands/) is useful when you need an exact option or want to explore a command beyond the examples here.',
        'A reliable routine is small and repeatable: check status at the start of work, review the author identity before the first commit, and run checks again when changing a repository’s remote or workspace location. If a project moves to another folder, verify that the same workspace rule still applies. These quick checks help catch configuration drift early, before it becomes a confusing commit or push.',
        'If switching from an existing setup, do not change every repository at once. Pick one work checkout and one personal checkout, confirm their recorded author values, and set up rules for those paths first. Once both behave as expected, you can apply the same layout to other projects. Keeping a small note of each identity alias and its intended email also makes it easier to review the setup months later. This staged approach is especially useful when you have several clones of the same project stored in different locations.'
      ]}
    ]
  },
  {
    slug: 'multiple-ssh-keys-for-git', title: 'How to Set Up Multiple SSH Keys for Git',
    description: 'A practical guide to using separate SSH keys for work and personal GitHub accounts, with bgit identity setup and diagnostics.', published: '2026-11-27',
    sections: [
      { heading: 'Why use separate keys?', paragraphs: [
        'SSH keys let a Git host authenticate your computer without asking for an account password on every operation. If you use more than one GitHub account, separate keys help you keep the credentials for each account distinct. A key is still only one part of the setup: Git commit author name and email are stored separately, and repository remotes identify where Git connects.',
        'Manually maintaining several keys often means coordinating key files, SSH config host aliases, remote URLs, and Git author settings. A missed setting can make a push authenticate as the wrong account or create a commit with an unexpected author. bgit groups account details into identities and manages associated SSH configuration for its supported workflow.'
      ]},
      { heading: 'Create identities with bgit', paragraphs: [
        'Run bgit setup once, then add each identity through the guided flow. Provide a distinct alias and the name, email, and GitHub username that match that account. During setup you can create a key or use an existing private key path. The identity record keeps these account details together so you can switch or bind them as a unit.',
        'If you have already created a key, pass its path using the documented --ssh-key option. Store private keys in your user SSH directory, protect access to them, and never commit them to a project. Public keys can be added to the matching GitHub account; the private key stays on your computer.'
      ], code: 'bgit setup\nbgit add --alias work --name "Work Name" --email "name@company.com" --github "work-account"\nbgit add --alias personal --name "Personal Name" --email "me@example.com" --github "personal-account" --ssh-key ~/.ssh/id_ed25519_personal' },
      { heading: 'Switch or bind the identity', paragraphs: [
        'Use bgit use when you want to make one identity the active global default. That is convenient for short tasks, but folder-based workspaces are less dependent on what you last selected. Workspaces apply identity rules to repositories inside a directory. A repository binding is a targeted choice for one checkout.',
        'The identity selection priority is visible through bgit status. It reports the effective identity and its source, such as a workspace, repository binding, or global active identity. This is valuable before a commit because it confirms the local Git author selection as well as the context bgit resolved for that directory.'
      ], code: 'bgit use work\nbgit workspace --path ~/code/work\nbgit workspace --users work\ncd ~/code/personal/project\nbgit bind --user personal\nbgit status' },
      { heading: 'Check the SSH and Git configuration', paragraphs: [
        'If authentication fails, use bgit doctor to inspect the bgit configuration, SSH directory and key permissions, SSH agent state, and Git configuration. The network option adds connectivity checks. The fix option can correct supported permission problems; read the diagnostic output before deciding how to proceed.',
        'bgit sync checks whether Git user.name and user.email, SSH key existence, and permissions line up with the active identity. Its --fix option can apply corrections. These checks are intended to expose setup mismatches, but they do not grant access to a GitHub repository; repository permissions and account-side key registration remain managed by GitHub.'
      ], code: 'bgit doctor\nbgit doctor --network\nbgit sync\nbgit sync --fix' },
      { heading: 'Clone and verify', paragraphs: [
        'Use bgit clone when you want a new checkout to use the effective identity’s SSH configuration. The command accepts HTTPS or SSH URLs and converts them for the configured flow; by default, it binds the new checkout to the effective identity. Then move into the repository and run status to see what identity applies.',
        'For an existing repository, verify the remote and identity before pushing. The bgit check command validates repository owner identity, active user, Git config, and remote alignment. If you intentionally use a different remote arrangement, review the command documentation and proceed with the settings you expect.'
      ], code: 'bgit clone git@github.com:owner/repository.git\ncd repository\nbgit status\nbgit check' },
      { heading: 'Manage keys safely over time', paragraphs: [
        'When rotating a key, update the identity to the replacement path and verify the new public key is registered with the matching account. Keep backups encrypted and protected. bgit export creates an encrypted archive that can include configured key pairs; it asks for the export password interactively, and that password is required for import.',
        'For a graphical way to review repositories and identity context, install bgit Desktop. It shares the CLI setup, so you can manage identities in one interface and continue using your keys in the other. The [SSH key guide](/docs/ssh-keys/) and [CLI command reference](/commands/) provide more detail, while the [Desktop page](/desktop/) links to current downloads.',
        'When migrating from hand-written SSH settings, make a safe copy of your current SSH config first and note which remote aliases each checkout uses. Add identities one at a time, confirm that the correct public key is registered on the corresponding GitHub account, and test with one repository before changing the rest. This lets you isolate a key-path or account-registration issue without disrupting every project at once.',
        'After confirming a key works, record its purpose and the identity alias that references it. This small inventory is helpful during key rotation and when setting up a second computer. Back up private material only through a secure method; bgit export creates an encrypted archive for its configuration and configured key pairs. Keep the archive and its password protected, and do not send either through a public issue or repository. If you suspect a key is exposed, rotate it at the Git host and update the local identity promptly. Finally, remove an old public key from the account when it is no longer needed.'
      ], code: 'bgit update work --ssh-key ~/.ssh/id_ed25519_work_new\nbgit export' }
    ]
  },
  {
    slug: 'fix-wrong-git-author', title: 'Fix Git Commits Showing the Wrong Author Name or Email',
    description: 'Diagnose an unexpected Git commit author by checking local Git config and bgit identity resolution, then fix future commits safely.', published: '2026-11-27',
    sections: [
      { heading: 'Git author and push account are different', paragraphs: [
        'A Git commit records an author name and email in the commit object. Pushing that commit authenticates to a remote using SSH or HTTPS credentials. These two identities can disagree: a commit may show your company email but push through a personal SSH account, or the reverse. Changing an SSH key does not rewrite a commit author, and changing user.email does not grant repository access.',
        'bgit resolves an identity for the current path from workspace rules, a repository binding, and the global active identity. That resolved identity is the context you should compare against Git’s effective config. First inspect what Git is using and where the value came from; then inspect bgit status in the repository.'
      ]},
      { heading: 'Check the repository and Git config', paragraphs: [
        'Run these commands from the affected repository. git config --show-origin --show-scope identifies the file and scope supplying each setting. A repository-local value can override a global value, so looking only at the global configuration may not reveal the setting that wins for this checkout.',
        'Then run bgit status. It reports the effective identity and whether it comes from the workspace, a repository binding, or the global default. Compare the resolved identity’s name and email with the values shown by Git. If they do not match, you have evidence about which layer needs correction.'
      ], code: 'git config --show-origin --show-scope --get user.name\ngit config --show-origin --show-scope --get user.email\nbgit status' },
      { heading: 'Repair the bgit identity selection', paragraphs: [
        'If the intended identity is not selected, choose the right rule. Use bgit use to change the global active identity for general fallback behavior. Use bgit bind --user from inside one repository to pin that checkout. Use a workspace if a group of repositories under one folder should share an identity. Workspace selection takes precedence over a repository binding, which takes precedence over the global identity.',
        'After changing the rule, run bgit status again and verify the displayed effective identity and reason. Then run bgit sync to check whether Git author configuration and SSH settings match the active identity. If the diagnostics describe a fixable mismatch, use --fix after reviewing what it will correct.'
      ], code: 'bgit use work\nbgit bind --user work\nbgit status\nbgit sync\nbgit sync --fix' },
      { heading: 'Check for repository-local overrides', paragraphs: [
        'Git configuration has multiple scopes. If --show-origin shows that user.name or user.email comes from the repository config, that local value can remain different from the bgit-selected global identity. Decide whether that local override is intentional. Do not delete settings blindly; the origin and scope output is there to guide your choice.',
        'bgit sync checks identity configuration against the active identity, but you should still understand any local override before asking it to change settings. If the mismatch returns after a repair, inspect scope and origin again, check workspace and binding selection with bgit status, and confirm which identity you mean to apply.'
      ]},
      { heading: 'What about commits already created?', paragraphs: [
        'Changing Git configuration affects commits you create afterward. It does not alter the author recorded in an existing commit. Rewriting an existing commit changes history and can affect collaborators, especially after it has been pushed. Decide with your team before amending or rebasing shared history, and use Git’s own documentation for the exact history-editing procedure.',
        'For a commit that has not been shared, you may choose to correct its metadata with standard Git tools. For published history, coordinate first. bgit manages identity selection and related configuration; it does not silently rewrite old commits.'
      ]},
      { heading: 'Prevent the mismatch next time', paragraphs: [
        'Use folder workspaces when directory layout reliably separates work and personal projects. Bind exceptions to the individual repository. When entering a checkout you did not configure, run bgit status and inspect effective Git values before your first commit. The bgit Desktop app also shows the repository identity context while you review changes.',
        'For more context, read the [workspace and binding guide](/docs/workspaces/), the [CLI reference](/commands/), or the [Desktop guide](/docs/desktop-app/). Download bgit from the [Desktop page](/desktop/) if you want to review identity and repository state in the visual app as well as the terminal.',
        'A good troubleshooting record includes the repository path, effective identity from bgit status, and the origin and scope reported for both Git author fields. That information narrows the cause without exposing private keys. If you share a configuration excerpt when requesting help, remove access tokens and private material first. Keep the diagnostic output focused on the settings that determine author identity and authentication.',
        'You can also inspect the latest commit itself with standard Git commands to confirm which author was recorded. Compare the exact spelling and email address with the expected profile rather than relying on the account avatar displayed by a hosting service. The recorded commit author is immutable unless you create a replacement commit, so use this check to distinguish a configuration problem affecting future work from an already-created commit that may need separate, coordinated correction.',
        'When several Git configuration files are involved, inspect both name and email separately because they can come from different origins. A repository-local email paired with a global name is possible, as is an included file that defines only one of the two. The exact scope output helps explain that combination. Keep your check local to the affected checkout and avoid making a global change if only one repository needs a different author.'
      ]}
    ]
  },
  {
    slug: 'git-includeif-vs-bgit', title: 'Git includeIf Conditional Config vs bgit',
    description: 'Compare Git includeIf rules with bgit identities, workspaces, and repository bindings for managing multiple Git author profiles.', published: '2026-11-27',
    sections: [
      { heading: 'Two ways to select Git author settings', paragraphs: [
        'Git can include another configuration file when a repository path matches a condition. A common arrangement keeps work repositories under one directory and personal projects under another, then uses an includeIf gitdir rule to load different user.name and user.email values. This is a Git-native option that does not require a separate identity manager.',
        'bgit offers identity records, a global active identity, directory workspaces, repository bindings, and SSH configuration management. It also shows the effective identity for the current location. The choice depends on whether you want a small Git config rule or a broader workflow for account identity and repository context.'
      ]},
      { heading: 'A basic includeIf example', paragraphs: [
        'A conditional include can point to a file containing the author settings for a group of repositories. The gitdir condition matches repository locations under a path. Configure the exact path syntax carefully for your operating system and Git version, and use git config --show-origin --show-scope to verify which values Git loads in a real repository.',
        'This pattern handles author configuration. It does not by itself create SSH keys, select an authentication identity, change remotes, provide a status explanation, or organize commits and pushes in a desktop UI. Those can be handled with additional Git and SSH configuration, depending on your setup.'
      ], code: '[includeIf "gitdir:~/code/work/"]\n    path = ~/.gitconfig-work\n\n# In ~/.gitconfig-work\n[user]\n    name = Work Name\n    email = name@company.com' },
      { heading: 'Where bgit adds workflow', paragraphs: [
        'With bgit, add the identities you use and then select them globally, by workspace folder, or per repository. A workspace applies to repositories in a configured directory; a binding applies to one repository. The workspace takes priority over a binding, and the global active identity is the fallback. Run bgit status to see the effective choice and its source.',
        'bgit also associates identities with SSH key configuration, includes doctor and sync diagnostics, and can create encrypted configuration backups. Its desktop app shares the same setup and provides a visual repository workflow. These features are useful when the problem includes more than choosing author fields from a path.'
      ], code: 'bgit add\nbgit workspace --path ~/code/work\nbgit workspace --users work\ncd ~/code/work/project\nbgit status' },
      { heading: 'Choose based on your needs', paragraphs: [
        'Use includeIf when you are comfortable maintaining Git configuration files, need only conditional author settings, and prefer to keep the setup entirely within Git. It is transparent and compact. Make sure your directory layout and path matching remain consistent, and verify the effective configuration from each repository where it matters.',
        'Use bgit when you want named identity records, SSH key association, status that explains workspace or repository resolution, diagnostics, and a CLI plus desktop workflow sharing one setup. The tools can also coexist in principle, but avoid two systems writing competing values without understanding Git configuration precedence.'
      ]},
      { heading: 'Verify the effective settings', paragraphs: [
        'Regardless of the method, run Git config inspection from inside the repository. Show origin and scope for user.name and user.email so you can see whether values came from system, global, included, or local configuration. Then compare those values to the identity you expect to use for the commit.',
        'With bgit, add bgit status and bgit sync to the check. With includeIf, confirm the condition matched the repository path and the included file is readable. In both cases, remember that author fields and remote authentication are separate concerns.'
      ], code: 'git config --show-origin --show-scope --get user.name\ngit config --show-origin --show-scope --get user.email\nbgit status\nbgit sync' },
      { heading: 'A practical migration path', paragraphs: [
        'If you already use includeIf rules and they work, document what they control before changing anything. You can trial bgit in one project, add identities, assign a binding or workspace, and check the resulting Git values. Keep a backup of configuration before migration and avoid leaving multiple rules that silently override one another.',
        'Read the [bgit configuration guide](/docs/), [workspace guide](/docs/workspaces/), and [CLI commands](/commands/) to understand available behavior. If you want to inspect repositories visually, see [bgit Desktop](/desktop/). Download the app or install the CLI from the official site and start with one isolated repository.',
        'One detail matters when using gitdir patterns: Git matches the location of the repository’s .git directory against a glob, and a pattern ending in a slash matches the directory recursively. Symlinked paths and linked worktrees can make the matched Git directory differ from the path where files appear. Confirm the conditional include from an actual checkout and inspect the config origin rather than assuming a rule matched. The [official git-config documentation](https://git-scm.com/docs/git-config) describes the matching rules in detail.',
        'Conditional includes are also evaluated as part of Git configuration loading, so order and scope can matter when more than one file defines the same key. A repository-local value may still override an included global value. This is why showing the origin and scope for each setting is a useful final check. Test from inside a representative repository, and repeat for a checkout stored through a symlink or worktree if your team uses those layouts.',
        'You can keep conditional includes and bgit concepts separate during an evaluation. First verify the author fields from Git itself. Then, if using bgit, check which identity it resolved and whether SSH configuration is healthy. Do not infer the authenticated account from commit metadata or infer the author from the SSH key alone. That distinction makes comparisons fair and avoids attributing a remote login issue to a path-based author rule.'
      ]}
    ]
  },
  {
    slug: 'bgit-vs-manual-ssh-config', title: 'bgit vs Manual SSH Config for Multiple Git Identities',
    description: 'Compare manually named SSH host aliases with bgit identity management for separate GitHub accounts, repository rules, and Git author settings.', published: '2026-11-27',
    sections: [
      { heading: 'What a manual SSH setup does', paragraphs: [
        'OpenSSH can define host aliases that point to the same GitHub hostname while selecting different key files. You then use the alias in a repository remote URL so SSH knows which configuration entry to apply. This is a flexible approach and can be enough when you only need explicit key selection for a small number of accounts.',
        'SSH host aliases affect authentication. They do not automatically set Git commit author name or email, assign project folders to an identity, explain identity resolution, or provide a repository management interface. Those tasks need separate Git configuration or tooling.'
      ]},
      { heading: 'Example manual alias pattern', paragraphs: [
        'A common pattern uses one host alias per account and sets IdentityFile for each. IdentitiesOnly asks SSH to use the specified identity rather than trying other keys from an agent. Register the corresponding public key on each GitHub account, then use the matching alias in the remote URL. Exact filenames and key paths are your choice.',
        'The remote URL must use the alias name, not simply github.com, for this host block to select the key. Check the repository’s configured remote before pushing. Treat private key files as credentials and never add them to source control.'
      ], code: 'Host github-work\n  HostName github.com\n  User git\n  IdentityFile ~/.ssh/id_ed25519_work\n  IdentitiesOnly yes\n\nHost github-personal\n  HostName github.com\n  User git\n  IdentityFile ~/.ssh/id_ed25519_personal\n  IdentitiesOnly yes\n\n# Example remote using the work alias:\n# git@github-work:company/project.git' },
      { heading: 'What bgit manages', paragraphs: [
        'bgit groups account alias, author name, email, GitHub username, and SSH key association into identities. You can switch the active identity or assign one through a workspace or repository binding. bgit status reports the effective identity and why it was chosen; doctor and sync help inspect SSH and Git settings.',
        'The bgit clone command uses the effective identity SSH configuration and binds the new repository by default. bgit Desktop shares identities and repository rules with the CLI, then adds a visual place to review changes, commits, branches, and sync. This combines identity selection with a broader repository workflow.'
      ], code: 'bgit add\nbgit use work\nbgit clone git@github.com:company/project.git\ncd project\nbgit status' },
      { heading: 'Trade-offs to consider', paragraphs: [
        'Manual configuration gives you direct control and keeps the moving parts visible in text files. It is a good fit if you know SSH and Git configuration well and want to maintain the rules yourself. You are responsible for making host aliases, remote URLs, keys, and author settings agree.',
        'bgit automates common identity and SSH configuration work and offers workspace or per-repository resolution. It reduces repetitive manual switching, but introduces bgit as the owner of its managed configuration. Use its setup, diagnostics, and documentation, and avoid manually editing managed SSH sections unless you understand how those changes interact.'
      ]},
      { heading: 'Keep author and authentication aligned', paragraphs: [
        'Neither SSH alias nor a Git remote alone determines the name and email stored in a commit. Inspect Git configuration from the repository, including origin and scope, and compare it with the account identity you intended. With bgit, run status to see the resolved identity and sync to validate configuration.',
        'If SSH authentication uses the wrong account, inspect the remote host alias and key registration. If the commit author is wrong, inspect user.name and user.email origins. Diagnose the right layer before changing settings; fixing one does not automatically fix the other.'
      ], code: 'git remote -v\ngit config --show-origin --show-scope --get user.name\ngit config --show-origin --show-scope --get user.email\nbgit status\nbgit doctor' },
      { heading: 'Which should you use?', paragraphs: [
        'Choose manual SSH config if key routing is your only need and you prefer hand-maintained files. Choose bgit if you want to manage multiple Git identities, map folders and repositories to those identities, inspect the effective selection, and share the setup between a CLI and desktop app. You can review current capabilities in the project docs before adopting either flow.',
        'See the [SSH keys guide](/docs/ssh-keys/), [workspace guide](/docs/workspaces/), and [commands reference](/commands/). For visual repository work, visit [bgit Desktop](/desktop/) and download the build for your system. Start with one repository and verify its author and authentication before expanding the setup.',
        'A useful test is to inspect both sides independently: check the Git author values with config origin and scope, and check the SSH destination with the configured remote. For bgit, also check status for the resolved identity and doctor for setup health. Perform a harmless fetch or other expected read operation first, then confirm the account shown by the Git host when you need to verify authentication. This process separates an author mismatch from a key-routing mismatch.',
        'Document the convention you choose so future repositories follow it. With manual aliases, write down the alias names and remote form expected for each account. With bgit, document the workspace folder layout and any repository-specific bindings. A short team note can prevent collaborators from copying a remote URL that points to a different account alias or from creating project folders outside the rule they expected to apply.',
        'If you work across several machines, keep account configuration reproducible without distributing private keys carelessly. Recreate or securely transfer key files according to your organization’s policy, then verify SSH access on the new computer. With bgit, restore a protected encrypted archive when appropriate and check the configured key paths afterward. On either approach, a quick fetch and a Git author check in each account-specific repository validate the complete workflow. Repeat the checks after rotating credentials or changing your repository folder layout.'
      ]}
    ]
  }
];
