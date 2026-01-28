# bgit Website - Site Structure

## Overview

Multi-page documentation and support site for bgit, built with Next.js 16 and designed with a developer-first approach.

## Page Structure

### 1. Home (`/`)
**Purpose:** Introduction and quick overview

**Sections:**
- Hero with main value proposition
- Problem vs Solution comparison (visual red/green contrast)
- 4-step quick start guide
- Feature grid (6 key features)
- Call-to-action

**Goal:** Get visitors to understand bgit in 30 seconds and click through to docs or downloads

---

### 2. Documentation (`/docs`)
**Purpose:** Complete usage guide

**Sections:**
- Table of contents (sticky navigation)
- Installation (Linux, macOS, Windows)
- Getting started (4-step tutorial)
- Usage guide (all commands explained)
- Configuration details
- Troubleshooting
- FAQ

**Goal:** Enable users to install and use bgit successfully

---

### 3. Commands (`/commands`)
**Purpose:** Complete command reference

**Sections:**
- Quick reference table
- Detailed documentation for each command:
  - Usage
  - Details
  - Examples
- Common workflows
- Pro tips

**Commands Documented:**
- `bgit init`
- `bgit add`
- `bgit list`
- `bgit use <name>`
- `bgit active`
- `bgit sync [--fix]`
- `bgit delete <name>`
- `bgit version`
- `bgit help`

**Goal:** Serve as a quick reference for developers using bgit

---

### 4. Support (`/support`)
**Purpose:** Ways to contribute and support the project

**Section Order (Priority):**
1. **Report Issues** (most valuable)
2. **Contribute Code** (community-driven)
3. **Support Development (Optional)** (financial, clearly optional)
4. **Spread the Word** (social support)

**Financial Support Approach:**
- **NOT pushy** - positioned as one of four equal options
- **Clearly marked "(Optional)"** in the heading
- **Honest messaging:** "bgit is free to use. If it saves you time..."
- **Lower visual priority:** Slightly reduced opacity (90%)
- **No emotional manipulation** or urgent language
- **Simple CTA:** "Support on Ko-fi" (not "Buy Me a Coffee")

**Commitment Statement:**
> bgit will always be free and open source under the MIT license.
> No features are locked behind payment. Financial support is completely optional
> and simply helps cover infrastructure costs and development time.

**Goal:** Enable community contributions without feeling like begging

---

## Navigation Structure

**Fixed Top Navigation:**
- Home
- Documentation
- Commands
- Support
- GitHub (external link)

**Active state highlighting:** Current page is highlighted in accent color

---

## Footer Structure

**4 Columns:**
1. **bgit** - Description
2. **Product** - Docs, Commands, Releases, Changelog
3. **Resources** - GitHub, Issues, Contributing
4. **Connect** - Email, Support, ByteRings link

**Bottom:**
- Copyright and MIT license
- Current version number

---

## Design Principles

### Visual Hierarchy
1. **Most important:** Report issues, contribute code (primary actions)
2. **Important:** Documentation, getting started
3. **Supporting:** Financial support (optional, not primary)
4. **Secondary:** Social sharing, stars

### Tone & Messaging
- **Professional** - No marketing fluff
- **Honest** - Clear about what bgit does and doesn't do
- **Helpful** - Focus on solving user problems
- **Not pushy** - Support is optional, clearly stated

### Support Page Specifically
- **Order matters:** Issues and code first, money third
- **Language matters:** "Optional", "If it saves you time", "helps justify"
- **Visual matters:** Slightly reduced opacity on financial support card
- **No guilt:** "Can't contribute financially? No problem!" removed
- **Equal footing:** All four options presented as equally valuable

---

## Content Strategy

### What Works
✅ Clear problem/solution framing
✅ Step-by-step guides
✅ Command reference with examples
✅ Multiple ways to contribute
✅ Honest, transparent messaging

### What to Avoid
❌ Marketing speak
❌ Pushy donation requests
❌ Overpromising features
❌ Complex jargon
❌ Wall of text

---

## Key Differences from Original

| Aspect | Before | After |
|--------|--------|-------|
| Structure | Single page | Multi-page with routing |
| Navigation | Hash links | Proper page navigation |
| Support | Ko-fi footer link | Dedicated page (4 options) |
| Financial ask | Small footer mention | One of four equal options |
| Commands | Basic list | Full reference with examples |
| Documentation | Mixed with home | Dedicated comprehensive page |

---

## Mobile Considerations

- Sticky navigation collapses on small screens
- Grid layouts stack to single column
- Code blocks scroll horizontally
- Touch-friendly button sizes
- Readable font sizes on mobile

---

## SEO & Meta

Each page has:
- Unique title
- Unique description
- Semantic HTML structure
- Proper heading hierarchy

---

## Future Enhancements (Optional)

Consider adding:
1. **Blog/Changelog page** - Release announcements
2. **Examples page** - Real-world usage scenarios
3. **Integrations page** - IDE plugins, shell completions
4. **Comparison page** - bgit vs manual setup
5. **Video tutorials** - Screen recordings of setup
6. **Search functionality** - If content grows significantly

---

## Maintenance

### To Update Version Number
1. Edit footer in `/app/components/Footer.tsx`
2. Update download links in `/app/docs/page.tsx`

### To Add a New Command
1. Add to `/app/commands/page.tsx` in the `commands` array
2. Update `/app/docs/page.tsx` usage guide if needed

### To Update Support Options
1. Edit `/app/support/page.tsx`
2. Keep priority order: Issues → Code → Money → Social

---

## Key Metrics for Success

1. **Time to first install:** Can users install bgit in < 5 minutes?
2. **Command reference usage:** Do users find what they need quickly?
3. **Issue quality:** Are bug reports detailed and helpful?
4. **Community growth:** Are people contributing code/issues?
5. **Support ratio:** What % of users support vs use? (Both are fine!)

---

## Philosophy

**The site exists to:**
- Help users solve their Git identity problems
- Provide clear, accurate documentation
- Enable community contribution
- Maintain the project long-term

**The site does NOT exist to:**
- Sell a product
- Maximize donations
- Compete with commercial tools
- Generate leads or conversions

**Financial support is:**
- Optional
- One of several contribution methods
- Clearly stated as non-essential
- Used for infrastructure and time

---

**Last Updated:** 2026-01-15
**Version:** 1.0.0
**Status:** Production Ready
