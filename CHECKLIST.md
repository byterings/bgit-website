# Pre-Deployment Checklist

Use this checklist before deploying the bgit website to production.

## Content Review

### URLs and Links

- [ ] Update GitHub repository URL from placeholder to actual: `https://github.com/byterings/bgit`
- [ ] Verify all download links point to correct release assets
- [ ] Check Windows installer version number in download link
- [ ] Test all external links open in new tab
- [ ] Verify Ko-fi link is correct (or remove if not using)
- [ ] Check ByteRings website link: `https://byterings.dev`

### Contact Information

- [ ] Update email address: `hello@byterings.dev`
- [ ] Verify Ko-fi username (if using)
- [ ] Check footer credits are correct

### Version Information

- [ ] Update version number in footer to match current release
- [ ] Verify installation commands match latest release version
- [ ] Check that Windows installer filename matches actual release

### Content Accuracy

- [ ] All commands are correct and up-to-date
- [ ] Quick Start steps match actual bgit workflow
- [ ] FAQ answers are accurate
- [ ] Installation instructions tested and work
- [ ] Code examples use correct syntax

## Technical Checks

### Build and Preview

- [ ] Run `npm install` successfully
- [ ] Run `npm run dev` and site loads at http://localhost:3000
- [ ] Run `npm run build` completes without errors
- [ ] Static files generated in `out` directory
- [ ] Run `./preview.sh` and preview static build

### Navigation

- [ ] All nav links scroll to correct sections
- [ ] Smooth scrolling works
- [ ] Mobile menu works (if applicable)
- [ ] Back to top works (if added)

### Visual Check

- [ ] Dark theme looks good
- [ ] All text is readable
- [ ] Code blocks are properly styled
- [ ] Links have hover effects
- [ ] Spacing and padding look correct
- [ ] Mobile responsive layout works
- [ ] Tablet layout works
- [ ] Desktop layout works

### Browser Testing

- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest, if on Mac)
- [ ] Mobile Safari (iOS)
- [ ] Chrome for Android

### Functionality

- [ ] External links open in new tab
- [ ] Hash links work (e.g., #install, #usage)
- [ ] Copy-paste from code blocks works
- [ ] No console errors
- [ ] No 404s for assets

## SEO and Meta

- [ ] Page title is correct: "bgit - Multi-Git Identity Manager"
- [ ] Meta description is present and accurate
- [ ] Favicon added (optional)
- [ ] Open Graph tags (optional, for social sharing)

## Files and Configuration

- [ ] `.gitignore` includes `node_modules`, `.next`, `out`
- [ ] `README.md` has correct information
- [ ] `package.json` has correct scripts
- [ ] `.node-version` file present (for deployment)
- [ ] No sensitive data in code or config files

## Deployment Setup

### Choose Platform

- [ ] Decided on hosting platform (Cloudflare Pages, Netlify, etc.)
- [ ] Platform account created
- [ ] GitHub repository connected (if using CD)

### Build Settings

- [ ] Build command: `npm run build`
- [ ] Output directory: `out`
- [ ] Node version: `20` or higher

### Domain Configuration (if applicable)

- [ ] Custom domain purchased
- [ ] DNS configured
- [ ] SSL certificate enabled (usually automatic)

## Post-Deployment

### After First Deploy

- [ ] Site loads at production URL
- [ ] All sections render correctly
- [ ] Navigation works
- [ ] Download links work
- [ ] External links work
- [ ] Mobile layout looks good on real device
- [ ] Test on slow connection (throttle network in DevTools)

### Performance

- [ ] Run Lighthouse audit
  - Performance: 95+
  - Accessibility: 95+
  - Best Practices: 95+
  - SEO: 95+
- [ ] Check page load time (should be <1s)
- [ ] Check total page size (should be <500KB)

### Monitoring

- [ ] Set up uptime monitoring (optional)
- [ ] Add site to Google Search Console (optional)
- [ ] Submit sitemap (optional, for SEO)

## Documentation

- [ ] README.md is clear and helpful
- [ ] DEPLOYMENT.md has correct instructions
- [ ] CONTENT.md explains how to update site
- [ ] All documentation is up-to-date

## Final Checks

- [ ] No placeholder text (Lorem ipsum, TODO, etc.)
- [ ] No broken images
- [ ] No dead links
- [ ] All content proofread
- [ ] Version numbers are consistent
- [ ] Contact info is correct
- [ ] Credits are correct

## Launch

- [ ] Production site is live
- [ ] URL shared with team
- [ ] URL added to bgit README
- [ ] Announcement prepared (optional)

---

## Quick Test Commands

```bash
# Install dependencies
npm install

# Test dev server
npm run dev

# Test build
npm run build

# Preview static build
./preview.sh

# Check for TypeScript errors
npx tsc --noEmit

# Check for linting issues (if ESLint configured)
npm run lint
```

## Common Issues

**Build fails:**
- Check Node.js version (18+)
- Delete `node_modules` and `.next`, reinstall
- Check for TypeScript errors

**Styles not loading:**
- Check that Tailwind is configured correctly
- Verify PostCSS config
- Clear `.next` cache and rebuild

**Links don't work:**
- Check hash links have corresponding IDs
- External links need `target="_blank"`
- Verify `href` attributes are correct

**Mobile layout broken:**
- Check responsive classes (`md:`, `lg:`)
- Test with browser DevTools mobile view
- Test on real device

---

## When to Update

Update the site when:
- bgit releases a new version
- Commands change or new commands added
- Installation instructions change
- Documentation significantly updated
- Contact information changes
- Important bug fixes or improvements

---

**After completing this checklist, the site is ready to go live!** ✓
