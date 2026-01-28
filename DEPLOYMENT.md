# Deployment Guide

This site is built as a static Next.js export and can be deployed to any static hosting platform.

## Quick Deploy Options

### 1. Cloudflare Pages (Recommended)

**Why Cloudflare Pages:**
- Free tier with unlimited bandwidth
- Global CDN
- Automatic SSL
- GitHub integration for auto-deploy

**Steps:**
1. Go to [Cloudflare Pages](https://pages.cloudflare.com/)
2. Connect your GitHub repository
3. Configure build settings:
   - **Build command:** `npm run build`
   - **Output directory:** `out`
   - **Node version:** `20`
4. Click "Save and Deploy"

**Custom domain:**
- Add your domain in Cloudflare Pages settings
- Update DNS to point to Cloudflare

---

### 2. Netlify

**Steps:**
1. Go to [Netlify](https://www.netlify.com/)
2. Click "Add new site" → "Import an existing project"
3. Connect your GitHub repository
4. Configure build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `out`
5. Click "Deploy site"

**Custom domain:**
- Go to Domain settings
- Add custom domain and follow DNS instructions

---

### 3. GitHub Pages

**Steps:**
1. Build the site locally:
   ```bash
   npm run build
   ```

2. Install `gh-pages` package:
   ```bash
   npm install -D gh-pages
   ```

3. Add deployment script to `package.json`:
   ```json
   "scripts": {
     "deploy": "gh-pages -d out"
   }
   ```

4. Deploy:
   ```bash
   npm run deploy
   ```

5. Enable GitHub Pages in your repository settings:
   - Settings → Pages
   - Source: Deploy from branch
   - Branch: `gh-pages` → `/ (root)`

**Custom domain:**
- Add `CNAME` file in `out` directory with your domain
- Update DNS with GitHub's IP addresses

---

### 4. Vercel

**Steps:**
1. Go to [Vercel](https://vercel.com/)
2. Click "Add New Project"
3. Import your GitHub repository
4. Vercel will auto-detect Next.js settings
5. Click "Deploy"

**Note:** Vercel works well with Next.js but may not be necessary for a static site.

---

## Manual Deployment (Any Static Host)

If you want to deploy to any other static hosting service:

1. Build the site:
   ```bash
   npm run build
   ```

2. The static files will be in the `out` directory

3. Upload the contents of `out` to your hosting provider:
   - AWS S3 + CloudFront
   - Google Cloud Storage
   - Azure Static Web Apps
   - DigitalOcean App Platform
   - Any static file hosting

---

## Continuous Deployment

For automatic deployments on every git push, use any of the platforms above with GitHub integration.

**Recommended workflow:**
1. Push changes to `main` branch
2. Hosting platform automatically:
   - Detects the push
   - Runs `npm run build`
   - Deploys the `out` directory
3. Site is live in 1-2 minutes

---

## Environment Variables

This site does not use any environment variables or secrets. Everything is static and public.

---

## Performance Optimization

The site is already optimized:
- Static HTML/CSS/JS only
- No server-side rendering
- No API calls
- Minimal JavaScript
- No external font loading
- No analytics or tracking scripts

**Lighthouse score should be near-perfect** (95-100 across all metrics).

---

## Post-Deployment Checklist

- [ ] Site loads correctly
- [ ] All navigation links work
- [ ] Download links point to correct GitHub releases
- [ ] Contact email is correct
- [ ] Ko-fi link is correct (if using)
- [ ] Footer credits are correct
- [ ] Mobile responsive layout works
- [ ] Code blocks are readable

---

## Updating Content

To update the site after deployment:

1. Edit [app/page.tsx](app/page.tsx)
2. Test locally: `npm run dev`
3. Commit and push to GitHub
4. Hosting platform auto-deploys (if CD is enabled)

Or manually:
1. Run `npm run build`
2. Upload `out` directory contents

---

## Troubleshooting

**Build fails:**
- Check Node.js version (should be 18+)
- Run `npm install` to ensure dependencies are installed
- Check build logs for errors

**404 errors:**
- Ensure output directory is set to `out`
- Check that `index.html` exists in `out` directory

**Styles not loading:**
- Check that `_next` directory is included in deployment
- Verify all files in `out` are uploaded

**Links not working:**
- All navigation uses hash links (`#install`, `#usage`)
- External links should open in new tabs

---

## Cost

All recommended platforms offer **free tiers** that are more than sufficient for a documentation site:

- **Cloudflare Pages:** Free (unlimited bandwidth)
- **Netlify:** Free (100GB bandwidth/month)
- **GitHub Pages:** Free (100GB bandwidth/month)
- **Vercel:** Free (100GB bandwidth/month)

For a small documentation site, you'll stay well within free tier limits.
