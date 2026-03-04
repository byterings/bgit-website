# bgit Website - Site Structure

## Overview

Multi-page Next.js documentation site for bgit.
Primary goal: accurate, up-to-date product guidance.

## Routes

### `/`
- Product overview
- Problem/solution framing
- Feature highlights
- Entry points to docs and GitHub

### `/docs`
- Installation instructions
- Getting started flow
- Usage guide
- Workspaces and identity resolution
- Configuration and troubleshooting
- FAQ

### `/commands`
- Full command catalog with usage/details/examples
- Includes current and deprecated command guidance
- Includes common workflows

### `/changelog`
- Release timeline grouped by phase
- Reads from `public/data/changelog.json`

### `/support`
- Contribution/support options
- Issue reporting and repo links

## Command Documentation Coverage

Core guidance should prioritize:
- `bgit setup`
- `bgit add`
- `bgit use`
- `bgit clone`
- `bgit check`
- `bgit prompt`
- `bgit status`

Advanced/legacy commands are still documented, but marked appropriately.

## Navigation

Top nav links:
- Home
- Documentation
- Commands
- Changelog
- Support
- GitHub (external)

## Update Rule

If a command behavior changes in `../bgit/cmd/*`, update both:
- `app/docs/page.tsx`
- `app/commands/page.tsx`
