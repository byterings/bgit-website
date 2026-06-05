# bgit Website

Documentation, product marketing, and release-history site for [bgit](https://github.com/byterings/bgit).

## What Lives Here

- `/` product overview and install entry points
- `/docs/` guided documentation and FAQ
- `/commands/` command reference
- `/changelog/` release history sourced from changelog data
- `/support/` support and contribution links

This repo should keep project-level documentation in `README.md`. Avoid adding new standalone top-level markdown guides unless they are genuinely required.

## Stack

- Next.js 16 App Router
- TypeScript
- Tailwind CSS v4
- Static export via `output: "export"`

## Development

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```

The build runs `scripts/fetch-release-data.js` first. It tries to refresh both the current bgit `version.txt` and `changelog.json` from the main `bgit` repository, then regenerates local release metadata files. If the network fetch fails, it falls back to the committed local copies.

## Deployment

The site deploys as static files from `out/`.

- Build command: `npm run build`
- Output directory: `out`
- Canonical production domain: `https://bgitcli.com`

This works on Cloudflare Pages, Netlify, GitHub Pages, Vercel static output, or any other static host.

## Content and Maintenance

Primary update surfaces:

- Home page: `app/page.tsx`
- Docs page: `app/docs/page.tsx`
- Commands page: `app/commands/page.tsx`
- Changelog UI: `app/changelog/ChangelogContent.tsx`
- Release data sync: `scripts/fetch-release-data.js`
- Cached changelog data: `public/data/changelog.json`
- Generated version source: `app/lib/generated-release.ts`
- Shared site config: `app/lib/config.ts`
- Shared SEO helpers: `app/lib/seo.ts`
- Generated crawl files: `app/robots.ts` and `app/sitemap.ts`
- LLM metadata: `public/llms.txt`

Recommended update flow when `bgit` changes:

1. Update the main `bgit` repository behavior and docs first.
2. Sync the website copy in `/docs` and `/commands`.
3. Update `version.txt` and changelog data in `bgit`, or confirm the prebuild fetch will pull the latest release metadata.
4. Run `npm run build`.
5. Spot-check `/`, `/docs/`, `/commands/`, `/changelog/`, and `/support/`.

## SEO Notes

The canonical host is owned by `app/lib/config.ts` and consumed through `app/lib/seo.ts`.

- Do not hardcode absolute site URLs in page metadata or JSON-LD.
- Keep sitemap and robots generation in the App Router metadata routes.
- If the domain ever changes, update the shared config first and verify the generated output in `out/`.

## Verification

Useful local checks:

```bash
npm run build
rg -n "bgitcli.com" app public out README.md
```

## License

MIT License. Site content and code maintained for the bgit project by ByteRings.
