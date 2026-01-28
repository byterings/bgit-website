# GitHub Publishing Instructions

Your local git repository is ready. Follow these steps to publish to GitHub:

## Option 1: Using GitHub Web Interface (Recommended)

### Step 1: Create Repository on GitHub

1. Go to [https://github.com/new](https://github.com/new)
2. Fill in repository details:
   - **Repository name:** `bgit-website`
   - **Description:** `Documentation and download site for bgit - Multi-Git Identity Manager`
   - **Visibility:** Public (recommended for open source)
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
3. Click "Create repository"

### Step 2: Push Your Code

After creating the repository, GitHub will show you commands. Use these:

```bash
cd /home/chaitanya/Documents/bgit-site/bgit-website

# Add the remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/bgit-website.git

# Push to GitHub
git push -u origin main
```

**Example:**
If your GitHub username is `byterings`, the command would be:
```bash
git remote add origin https://github.com/byterings/bgit-website.git
git push -u origin main
```

---

## Option 2: Using GitHub CLI

If you want to install GitHub CLI:

```bash
# Install GitHub CLI (on Ubuntu/Debian)
sudo apt install gh

# Or on other systems, see: https://cli.github.com/manual/installation

# Authenticate
gh auth login

# Create repository and push (from project directory)
cd /home/chaitanya/Documents/bgit-site/bgit-website
gh repo create bgit-website --public --source=. --remote=origin --push
```

---

## Verify Repository

After pushing, verify:
1. Go to `https://github.com/YOUR_USERNAME/bgit-website`
2. Check that all files are there
3. README.md should display automatically

---

## Next Steps: Deploy to Cloudflare Pages

Once your repository is on GitHub:

### 1. Go to Cloudflare Pages
Visit [https://pages.cloudflare.com/](https://pages.cloudflare.com/)

### 2. Create New Project
- Click "Create a project"
- Click "Connect to Git"
- Select your GitHub account
- Select the `bgit-website` repository

### 3. Configure Build Settings
- **Project name:** `bgit-website` (or your preferred subdomain)
- **Production branch:** `main`
- **Build command:** `npm run build`
- **Build output directory:** `out`
- **Root directory:** `/` (leave empty or use root)

### 4. Environment Variables
No environment variables needed (leave empty)

### 5. Deploy
- Click "Save and Deploy"
- Wait 1-2 minutes for build
- Your site will be live at: `https://bgit-website.pages.dev`

### 6. Custom Domain (Optional)
- Go to Custom domains in Cloudflare Pages
- Add your domain (e.g., `bgit.dev` or `bgit.byterings.dev`)
- Follow DNS configuration instructions
- SSL certificate is automatic

---

## Alternative Deployment Options

See [DEPLOYMENT.md](DEPLOYMENT.md) for instructions on:
- Netlify
- GitHub Pages
- Vercel
- Any static hosting

---

## Continuous Deployment

Once connected to GitHub, any push to the `main` branch will automatically:
1. Trigger a new build
2. Deploy to production
3. Update your site (usually in 1-2 minutes)

---

## Repository Settings (Recommended)

After creating the repository:

### Add Description and Website
1. Go to repository settings
2. Add description: "Documentation and download site for bgit - Multi-Git Identity Manager"
3. Add website URL (after deploying): Your Cloudflare Pages URL

### Add Topics
Add these topics to help discovery:
- `git`
- `git-tools`
- `developer-tools`
- `identity-management`
- `nextjs`
- `documentation`

### Branch Protection (Optional)
For the `main` branch:
- Require pull request reviews before merging
- Require status checks to pass before merging

---

## Update bgit Repository

After deploying the website:

1. Update the main bgit repository README.md
2. Add link to the website in the introduction
3. Example:
   ```markdown
   # bgit - Multi-Git Identity Manager

   **Website:** https://bgit-website.pages.dev (or your custom domain)
   ```

---

## Current Status

✅ Local git repository initialized
✅ Initial commit created
✅ All files staged and committed
✅ Branch renamed to `main`
⏳ Waiting for GitHub remote repository

**Next action:** Create GitHub repository and push!
