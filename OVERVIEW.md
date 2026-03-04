# bgit Website - Visual/Content Overview

## What Users Should Learn Quickly

1. bgit solves multi-identity Git mistakes.
2. Start with one command: `bgit setup`.
3. Add identities and switch with `bgit add` / `bgit use`.
4. Clone with `bgit clone` and rely on safety checks via `bgit check`.

## Content Model (Current)

- Home provides product context and entry points.
- Docs provides guided onboarding and troubleshooting.
- Commands provides exact command-level reference.
- Changelog provides release/phase visibility.

## Messaging Priorities

- Prefer practical command sequences over marketing copy.
- Keep deprecated commands visible but clearly labeled.
- Keep examples aligned with implemented behavior.

## Canonical Onboarding Flow

```bash
bgit setup
bgit add
bgit use work
bgit clone https://github.com/org/repo.git
```

## Canonical Safety Flow

```bash
bgit check
# then push normally
git push
```

## Deprecated Flow Note

The following are retained for compatibility and should not be primary onboarding:
- `bgit init`
- `bgit setup-ssh`
