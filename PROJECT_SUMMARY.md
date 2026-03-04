# bgit Website - Project Summary

## Purpose

The website is the documentation and release-information surface for bgit.
It is intended to be the fastest way for users to understand:
- how to install bgit
- how to use the current recommended command flow
- what changed across releases/phases

## Current Architecture

- Framework: Next.js 16 (App Router)
- Language: TypeScript
- Styling: Tailwind CSS v4
- Output mode: static export compatible

## Current Pages

- `/` Home: overview + value proposition
- `/docs` Documentation: install, setup, usage, workspaces, troubleshooting
- `/commands` Command reference: command-by-command details
- `/changelog` Release history grouped by phase
- `/support` Support and contribution options

## Current Product Direction Reflected in Site

The site now reflects the Phase 3 direction in main branch:
- one-time onboarding via `bgit setup`
- automatic push safety checks with `bgit check`
- prompt integration via `bgit prompt`
- clone auto-bind behavior with `bgit clone` (and `--no-bind`)
- deprecated flow notes for `bgit init` and `bgit setup-ssh`

## Data Sources

- CLI/project source: `../bgit`
- website changelog cache: `public/data/changelog.json`
- runtime changelog page: `app/changelog/ChangelogContent.tsx`

## Maintenance Notes

When CLI behavior changes:
1. Update `../bgit/README.md` and command implementations first
2. Update website docs in `app/docs/page.tsx` and `app/commands/page.tsx`
3. Update changelog data and verify `/changelog`
4. Run `npx tsc --noEmit`
