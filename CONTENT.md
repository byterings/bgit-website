# Content Update Guide

This guide explains where to update content in the current multi-page bgit website.

## Source of Truth

The CLI source of truth is the main bgit repo in:
- `../bgit/README.md`
- `../bgit/changelog.json`
- `../bgit/cmd/*`

Website docs should mirror those files.

## Website Content Map

- Home page: `app/page.tsx`
- Documentation: `app/docs/page.tsx`
- Commands reference: `app/commands/page.tsx`
- Changelog UI: `app/changelog/ChangelogContent.tsx`
- Changelog data: `public/data/changelog.json`
- Shared site metadata: `app/lib/config.ts`

## Common Updates

### 1. Release / Changelog

1. Update `../bgit/changelog.json`
2. Sync website copy in `public/data/changelog.json` (or run prebuild fetch)
3. Verify changelog page renders expected phase/release grouping

### 2. Command Behavior Changes

Update both:
- `app/commands/page.tsx` (detailed command docs)
- `app/docs/page.tsx` (tutorial/workflow sections)

Current onboarding flow should start with:
```bash
bgit setup
```

### 3. Deprecated Commands

If CLI marks commands deprecated, reflect in docs immediately.
Current deprecations:
- `bgit init` -> use `bgit setup`
- `bgit setup-ssh` -> use `bgit setup`
- `bgit remote fix` -> legacy/advanced usage

### 4. Core Phase 3 Commands to Keep Visible

- `bgit setup`
- `bgit add`
- `bgit use <alias>`
- `bgit clone <url> [directory] [--no-bind]`
- `bgit check`
- `bgit prompt [--plain]`
- `bgit status`
- `bgit doctor`

## Validation Checklist

Before publishing docs changes:

1. Type check:
```bash
npx tsc --noEmit
```

2. Build (where environment allows Next.js/Turbopack build):
```bash
npm run build
```

3. Spot-check pages:
- `/docs`
- `/commands`
- `/changelog`

4. Confirm no stale references:
```bash
rg -n "bgit init|setup-ssh|USAGE.md|single-page" app *.md public
```

## Style Rules

- Keep wording direct and technical.
- Prefer exact command examples over long prose.
- Mark unreleased features clearly as unreleased.
- Avoid conflicting guidance between `/docs` and `/commands`.
