# bgit Website - Visual Overview

## Site Structure (Single Page with Sections)

```
┌─────────────────────────────────────────┐
│         FIXED NAVIGATION BAR            │
│  bgit    Install | Usage | FAQ | Contact│
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│                                         │
│              HERO SECTION               │
│                                         │
│                 bgit                    │
│       Multi-Git Identity Manager        │
│                                         │
│  Switch between multiple Git accounts   │
│     safely. One command, zero mistakes. │
│                                         │
│   [ Get Started ]  [ View on GitHub ]  │
│                                         │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│         THE PROBLEM (Dark BG)           │
│                                         │
│  If you manage multiple GitHub          │
│  accounts, you know the pain:           │
│                                         │
│  • Manually editing .gitconfig          │
│  • Accidentally pushing with wrong ID   │
│  • Complex SSH configurations           │
│  • Forgetting which account you're using│
│                                         │
│         THE SOLUTION                    │
│                                         │
│  ✓ One command: bgit use work          │
│  ✓ Automatic Git and SSH config        │
│  ✓ Keep using normal git commands      │
│  ✓ Clear indication of active identity │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│    INSTALLATION (id="install")          │
│                                         │
│  Linux                                  │
│  ┌───────────────────────────────────┐ │
│  │ curl -L https://...               │ │
│  │ chmod +x bgit                     │ │
│  │ sudo mv bgit /usr/local/bin/      │ │
│  └───────────────────────────────────┘ │
│                                         │
│  macOS (Intel)                          │
│  ┌───────────────────────────────────┐ │
│  │ curl -L https://...               │ │
│  │ chmod +x bgit                     │ │
│  │ sudo mv bgit /usr/local/bin/      │ │
│  └───────────────────────────────────┘ │
│                                         │
│  macOS (Apple Silicon)                  │
│  ┌───────────────────────────────────┐ │
│  │ curl -L https://...               │ │
│  │ chmod +x bgit                     │ │
│  │ sudo mv bgit /usr/local/bin/      │ │
│  └───────────────────────────────────┘ │
│                                         │
│  Windows                                │
│  Download: bgit-installer-v1.0.0.exe    │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│   QUICK START (id="usage", Dark BG)     │
│                                         │
│  1. Initialize bgit                     │
│  ┌───────────────────────────────────┐ │
│  │ bgit init                         │ │
│  └───────────────────────────────────┘ │
│                                         │
│  2. Add your identities                 │
│  ┌───────────────────────────────────┐ │
│  │ bgit add                          │ │
│  └───────────────────────────────────┘ │
│  Interactive mode guides you...         │
│                                         │
│  3. Switch between identities           │
│  ┌───────────────────────────────────┐ │
│  │ bgit use work                     │ │
│  │ bgit use personal                 │ │
│  └───────────────────────────────────┘ │
│                                         │
│  4. List your identities                │
│  ┌───────────────────────────────────┐ │
│  │ bgit list                         │ │
│  └───────────────────────────────────┘ │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│            COMMANDS REFERENCE           │
│                                         │
│  ┌───────────────────────────────────┐ │
│  │ bgit init                         │ │
│  │ Initialize bgit on your system    │ │
│  └───────────────────────────────────┘ │
│                                         │
│  ┌───────────────────────────────────┐ │
│  │ bgit add                          │ │
│  │ Add a new Git identity            │ │
│  └───────────────────────────────────┘ │
│                                         │
│  ┌───────────────────────────────────┐ │
│  │ bgit list                         │ │
│  │ List all configured identities    │ │
│  └───────────────────────────────────┘ │
│                                         │
│  ┌───────────────────────────────────┐ │
│  │ bgit use <name>                   │ │
│  │ Switch to a different identity    │ │
│  └───────────────────────────────────┘ │
│                                         │
│  ... (more commands)                    │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│        FAQ (id="faq", Dark BG)          │
│                                         │
│  Does bgit wrap git commands?           │
│  No. bgit only manages configuration.   │
│                                         │
│  Does it work on Windows?               │
│  Yes! Fully cross-platform.             │
│                                         │
│  What if I already have SSH keys?       │
│  bgit can import existing keys.         │
│                                         │
│  ... (more FAQs)                        │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│      FOOTER (id="contact")              │
│                                         │
│  Version        Links         Contact   │
│  v1.0.0         GitHub       email@...  │
│                 Docs         Ko-fi      │
│                                         │
│       Developed at ByteRings            │
│              MIT License                │
└─────────────────────────────────────────┘
```

## Color Scheme

```
Background:    #0a0a0a  ████████  (Very dark, almost black)
Alt BG:        #0d0d0d  ████████  (Slightly lighter for alternating sections)
Foreground:    #e5e5e5  ████████  (Light gray text)
Muted:         #6b7280  ████████  (Secondary text)
Accent:        #3b82f6  ████████  (Blue links/highlights)
Border:        #374151  ────────  (Gray borders)
Code BG:       #1a1a1a  ████████  (Dark gray for code blocks)
```

## Typography

**Headings:**
- H1: 3rem (48px), bold
- H2: 1.875rem (30px), bold
- H3: 1.25rem (20px), semibold

**Body:**
- Paragraph: 1rem (16px)
- Code: 0.875rem (14px), monospace

**Font Stack:**
- Body: system-ui, -apple-system, Segoe UI, Roboto
- Code: ui-monospace, SFMono-Regular, Menlo, Consolas

## Spacing System

```
Section Padding:
  Top/Bottom: 5rem (80px)
  Left/Right: 1.5rem (24px)

Content Max Width: 896px (centered)

Vertical Spacing:
  H2 margin-bottom: 2rem (32px)
  H3 margin-bottom: 1.5rem (24px)
  Paragraph margin-bottom: 1.5rem (24px)
  List item spacing: 0.75rem (12px)
```

## Components

### Navigation Bar
```
Position: Fixed top
Background: Semi-transparent with backdrop blur
Height: ~60px
Border: Bottom border (gray-800)
Items: Left-aligned logo, right-aligned nav links
```

### Hero Section
```
Padding: 8rem top, 5rem bottom
Max Width: 896px
CTA Buttons: Primary (blue bg), Secondary (border only)
```

### Code Blocks
```
Background: #1a1a1a
Border: 1px solid #374151
Border Radius: 0.5rem
Padding: 1rem
Font: Monospace, 14px
```

### Command Cards
```
Border: 1px solid #374151
Border Radius: 0.5rem
Padding: 1.5rem
Command: Blue accent color
Description: Muted text
```

## Responsive Breakpoints

```
Mobile:   < 768px   (Single column)
Tablet:   768px+    (May use 2 columns)
Desktop:  1024px+   (Max 3 columns for footer)
```

## Interactions

**Hover Effects:**
- Links: Color changes to accent blue
- Buttons: Slight opacity change (90%)
- Minimal transitions (150ms)

**No Animations:**
- No fade-ins
- No slide-ins
- No scroll effects
- Only smooth scrolling for hash links

## Performance

**Bundle Size:** ~80-100KB (gzipped)
- HTML: ~30KB
- CSS: ~20KB
- JS: ~50KB

**Load Time:** <500ms on good connection
**Assets:** All inline (no external requests)

## Accessibility

- Semantic HTML (header, nav, section, footer)
- Proper heading hierarchy (h1 → h2 → h3)
- Sufficient color contrast (WCAG AA)
- Keyboard navigation supported
- Focus indicators visible
- Alt text for any images (none currently)

## Mobile Considerations

**Navigation:** Sticky top bar, reduced padding
**Typography:** Font sizes scale slightly smaller
**Spacing:** Reduced padding on mobile (px-4 instead of px-6)
**Code Blocks:** Horizontal scroll for overflow
**Buttons:** Stack vertically on mobile

## Browser Support

✓ Chrome 90+
✓ Firefox 90+
✓ Safari 14+
✓ Edge 90+
✓ Mobile Safari (iOS 13+)
✓ Chrome for Android

## File Sizes (Approximate)

```
app/page.tsx:      ~10KB  (Main content)
app/layout.tsx:    ~1KB   (Layout wrapper)
app/globals.css:   ~2KB   (Styles)
package.json:      ~1KB   (Dependencies)
tsconfig.json:     ~1KB   (TS config)
next.config.ts:    <1KB   (Next config)

Total source:      ~15KB  (before build)
Built site:        ~100KB (after optimization)
```

## Key Design Decisions

1. **Single Page:** Easier navigation, no route changes
2. **Dark Theme:** Developer preference, reduces eye strain
3. **No Logo:** Text wordmark is simpler and more maintainable
4. **System Fonts:** No loading delay, always available
5. **Minimal JS:** Faster load, works without JavaScript for most content
6. **Static Export:** No server needed, works anywhere
7. **No Search:** Content is short enough for Ctrl+F
8. **No CMS:** Direct file editing is simpler for small sites

## Future Enhancement Ideas

If needed later (not implemented now):
- Syntax highlighting for code blocks
- Copy button for code snippets
- Dark/light theme toggle
- Platform auto-detection for downloads
- Animated command terminal demo
- Video walkthrough
- Screenshots section
- Testimonials
- Changelog page
- Blog for updates

**Current state: Minimal, functional, ready to deploy.**
