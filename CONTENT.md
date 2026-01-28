# Content Update Guide

This guide helps you update the website content when bgit documentation changes.

## Quick Reference

All content is in: **[app/page.tsx](app/page.tsx)**

## Common Updates

### 1. Update Version Number

**Location:** Footer section in [app/page.tsx](app/page.tsx)

```tsx
<div>
  <h3 className="font-semibold mb-3">Version</h3>
  <p className="text-muted">v1.0.0</p>  {/* Change this */}
</div>
```

---

### 2. Update Installation Commands

**Location:** Installation section in [app/page.tsx](app/page.tsx)

Update the download URLs to match the latest release:

```tsx
{`curl -L https://github.com/byterings/bgit/releases/latest/download/bgit-linux-amd64 -o bgit
chmod +x bgit
sudo mv bgit /usr/local/bin/`}
```

**For Windows installer:**
```tsx
<a
  href="https://github.com/byterings/bgit/releases/latest/download/bgit-installer-v1.0.0.exe"
  // Update version number here ↑
>
```

---

### 3. Add New Commands

**Location:** Commands section in [app/page.tsx](app/page.tsx)

Add a new command block:

```tsx
<div className="border border-gray-800 rounded-lg p-6">
  <code className="text-accent text-lg">bgit new-command</code>
  <p className="text-muted mt-2">Description of the new command</p>
</div>
```

---

### 4. Update FAQ

**Location:** FAQ section in [app/page.tsx](app/page.tsx)

Add a new FAQ entry:

```tsx
<div>
  <h3 className="text-lg font-semibold mb-2">Question here?</h3>
  <p className="text-muted">
    Answer here with <code>inline code</code> if needed.
  </p>
</div>
```

---

### 5. Update Contact Information

**Location:** Footer section in [app/page.tsx](app/page.tsx)

```tsx
<a
  href="mailto:hello@byterings.dev"  {/* Update email */}
  className="text-muted hover:text-accent transition block mb-3"
>
  hello@byterings.dev
</a>
```

---

### 6. Update Quick Start Steps

**Location:** Quick Start section in [app/page.tsx](app/page.tsx)

Edit any step:

```tsx
<div>
  <h3 className="text-xl font-semibold mb-3">1. Initialize bgit</h3>
  <pre><code>bgit init</code></pre>
</div>
```

---

## Syncing with GitHub Repository

If you update the main bgit repository's README or docs, reflect those changes here:

### From README.md → Website

| README Section | Website Section | File Location |
|---------------|-----------------|---------------|
| Why bgit? | Problem Section | app/page.tsx |
| Installation | Installation Section | app/page.tsx |
| Quick Start | Quick Start Section | app/page.tsx |
| Commands | Commands Section | app/page.tsx |
| FAQ | FAQ Section | app/page.tsx |

### Example: Updating from bgit README

1. Read changes in `bgit/README.md`
2. Open `app/page.tsx`
3. Find the corresponding section
4. Update the content
5. Test: `npm run dev`
6. Build: `npm run build`
7. Deploy

---

## Adding New Sections

To add a new section to the single-page site:

1. **Add navigation link** (top of page):
```tsx
<a href="#newsection" className="hover:text-accent transition">New Section</a>
```

2. **Add section content**:
```tsx
<section id="newsection" className="py-20 px-6">
  <div className="max-w-4xl mx-auto">
    <h2 className="text-3xl font-bold mb-8">New Section Title</h2>
    {/* Content here */}
  </div>
</section>
```

3. **Alternate background** (optional):
   - Add `bg-[#0d0d0d]` to section className for darker background
   - Remove it for normal background

---

## Code Block Formatting

For command examples, use:

```tsx
<pre><code>{`command here`}</code></pre>
```

For multi-line commands:

```tsx
<pre><code>{`command line 1
command line 2
command line 3`}</code></pre>
```

For inline code in paragraphs:

```tsx
<p>Use the <code>bgit use</code> command to switch.</p>
```

---

## Styling Guidelines

### Colors

- **Links:** Use `text-accent hover:underline` or `hover:text-accent`
- **Muted text:** Use `text-muted`
- **Accent color:** Use `text-accent` for highlights
- **Borders:** Use `border-gray-800`

### Spacing

- **Section padding:** `py-20 px-6`
- **Heading margin:** `mb-8` (for h2), `mb-6` (for h3)
- **Paragraph margin:** `mb-4` or `mb-6`
- **List spacing:** `space-y-3` or `space-y-6`

### Responsive Design

The site is mobile-responsive by default. Use:
- `md:grid-cols-3` for multi-column layouts on desktop
- `max-w-4xl mx-auto` to center content
- `px-6` for consistent side padding

---

## Testing Changes

Before deploying:

1. **Development server:**
   ```bash
   npm run dev
   ```
   Open http://localhost:3000

2. **Static build preview:**
   ```bash
   ./preview.sh
   ```
   Open http://localhost:8000

3. **Check:**
   - All navigation links work
   - Code blocks are readable
   - Mobile layout looks good (resize browser)
   - No console errors

---

## Common Mistakes to Avoid

1. **Don't forget to escape special characters:**
   - Use `&apos;` for apostrophes in JSX
   - Use `{` and `}` inside strings

2. **Don't break JSX syntax:**
   - Always close tags: `<br />` not `<br>`
   - Use `className` not `class`

3. **Don't hardcode dates:**
   - Version numbers should be updated manually
   - Avoid "current year" or "latest version" text

4. **Don't add complex features:**
   - Keep the site static and simple
   - No forms, no API calls, no databases

---

## Need to Extract Content?

If the site grows and you want to extract content to separate files:

1. Create a `content` directory
2. Add markdown files or JSON files
3. Import and parse them in components
4. Example structure:
   ```
   content/
   ├── install.md
   ├── usage.md
   └── faq.json
   ```

For now, keeping everything in one file makes updates simple and fast.
