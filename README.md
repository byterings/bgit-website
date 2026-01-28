# bgit Website

Minimal documentation and download site for [bgit](https://github.com/byterings/bgit) - Multi-Git Identity Manager.

## Overview

This is a static Next.js site designed to be:
- Developer-focused and content-first
- Lightweight with no animations or heavy UI
- Easy to update when documentation changes
- Deployable to static hosting (Cloudflare Pages, GitHub Pages, Netlify, etc.)

## Tech Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **Static Export** (no server required)

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build static site
npm run build

# Output will be in ./out directory
```

## Project Structure

```
bgit-website/
├── app/
│   ├── layout.tsx       # Root layout with metadata
│   ├── page.tsx         # Main page (all sections)
│   └── globals.css      # Global styles and Tailwind
├── next.config.ts       # Next.js config (static export)
├── tsconfig.json        # TypeScript config
├── postcss.config.mjs   # PostCSS config for Tailwind
└── package.json
```

## Deployment

### Cloudflare Pages

1. Connect your GitHub repository
2. Build command: `npm run build`
3. Output directory: `out`

### Netlify

1. Connect your GitHub repository
2. Build command: `npm run build`
3. Publish directory: `out`

### GitHub Pages

1. Build locally: `npm run build`
2. Push the `out` directory to `gh-pages` branch
3. Enable GitHub Pages in repository settings

### Vercel

1. Connect your GitHub repository
2. Framework: Next.js
3. Output directory will be detected automatically

## Updating Content

All content is in [app/page.tsx](app/page.tsx). To update:

1. Edit the JSX content directly
2. Run `npm run dev` to preview changes
3. Build and deploy: `npm run build`

Content can be extracted to separate files/components if needed in the future.

## Design Principles

- **No animations** - Fast and accessible
- **System fonts** - No custom font loading
- **Dark theme** - Developer-friendly
- **Minimal colors** - Dark neutrals with subtle blue accent
- **Mobile-responsive** - Works on all devices
- **SEO-friendly** - Proper meta tags and semantic HTML

## Customization

### Colors

Edit colors in [app/globals.css](app/globals.css):

```css
:root {
  --background: #0a0a0a;
  --foreground: #e5e5e5;
  --muted: #6b7280;
  --accent: #3b82f6;
}
```

### Version Number

Update the version in [app/page.tsx](app/page.tsx) footer section.

### Contact Info

Update email and links in the footer section of [app/page.tsx](app/page.tsx).

## License

MIT License - Built for bgit by ByteRings
