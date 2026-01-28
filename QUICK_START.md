# Quick Start - Publish to GitHub

## Your repository is ready! Follow these 3 steps:

### 1️⃣ Create GitHub Repository

Go to: **https://github.com/new**

Settings:
- Name: `bgit-website`
- Description: `Documentation and download site for bgit`
- Public repository
- **Don't** initialize with README (we have one)

Click "Create repository"

---

### 2️⃣ Push Your Code

Copy and run these commands (replace `YOUR_USERNAME` with your GitHub username):

```bash
cd /home/chaitanya/Documents/bgit-site/bgit-website

# Add remote (update YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/bgit-website.git

# Push to GitHub
git push -u origin main
```

**If your username is `byterings`:**
```bash
git remote add origin https://github.com/byterings/bgit-website.git
git push -u origin main
```

---

### 3️⃣ Deploy to Cloudflare Pages

1. Go to: **https://pages.cloudflare.com/**
2. Click "Create a project" → "Connect to Git"
3. Select your GitHub repository: `bgit-website`
4. Build settings:
   - Build command: `npm run build`
   - Output directory: `out`
5. Click "Save and Deploy"

**Done!** Your site will be live in ~2 minutes at `https://bgit-website.pages.dev`

---

## Current Status

✅ Git repository initialized
✅ All files committed
✅ Ready to push

**Next:** Create GitHub repo → Push → Deploy

---

## Need Help?

See detailed instructions in [GITHUB_SETUP.md](GITHUB_SETUP.md)
