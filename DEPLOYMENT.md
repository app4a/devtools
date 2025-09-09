# 🚀 GitHub Pages Deployment Guide

## Quick Start (5 Minutes)

### 1. **Push to GitHub**
```bash
git add .
git commit -m "Add GitHub Pages deployment"
git push origin main
```

### 2. **Enable GitHub Pages**
1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Source: **GitHub Actions**
4. That's it! 🎉

Your site will be available at:
```
https://yourusername.github.io/repository-name
```

---

## 🔧 Configuration

### **Repository Settings Required:**
1. **Actions**: Enabled (Settings → Actions → General)
2. **Pages**: Source set to "GitHub Actions"
3. **Permissions**: Read and write permissions for Actions

### **Environment Variables (Optional):**
For Google Analytics, create repository secrets:
- `NEXT_PUBLIC_GA_ID`: Your Google Analytics 4 ID
- `NEXT_PUBLIC_GTM_ID`: Your Google Tag Manager ID

---

## 📁 **What Gets Deployed**

### **Automatic Deployment:**
```bash
├── Every push to main/master triggers deployment
├── Tests run first (deployment fails if tests fail)
├── Static site built and exported to /out
├── Deployed to GitHub Pages automatically
└── Available within 2-3 minutes
```

### **Build Process:**
1. ✅ Install dependencies (`npm ci`)
2. ✅ Run tests (`npm test`)
3. ✅ Build Next.js app (`npm run build`)
4. ✅ Create static export (`/out` folder)
5. ✅ Deploy to GitHub Pages
6. ✅ Site live at github.io URL

---

## 🌐 **Custom Domain (Optional)**

### **Add Custom Domain:**
1. **Buy domain** (e.g., yourdevtools.com)
2. **Create CNAME file:**
   ```bash
   echo "yourdevtools.com" > public/CNAME
   ```
3. **Configure DNS:**
   - Add CNAME record: `www` → `yourusername.github.io`
   - Add A records for apex domain:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
4. **Push changes**
5. **Enable in GitHub Pages settings**

---

## 🛠️ **Local Development**

### **Run Locally:**
```bash
npm run dev
# Opens http://localhost:3000
```

### **Test Build Locally:**
```bash
npm run build
npm run preview
# Tests the same build that will be deployed
```

### **Build for GitHub Pages:**
```bash
GITHUB_PAGES=true npm run build
# Tests the exact GitHub Pages configuration
```

---

## 📊 **SEO Setup After Deployment**

### **1. Google Search Console:**
1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add property: `https://yourusername.github.io/repository-name`
3. Verify ownership (HTML meta tag method)
4. Submit sitemap: `https://yourusername.github.io/repository-name/sitemap.xml`

### **2. Google Analytics:**
1. Create GA4 property
2. Add tracking ID to repository secrets as `NEXT_PUBLIC_GA_ID`
3. Redeploy to activate tracking

---

## 🚨 **Troubleshooting**

### **Common Issues:**

#### **404 on GitHub Pages:**
```bash
# Check GitHub Pages settings:
Settings → Pages → Source should be "GitHub Actions"

# Check workflow status:
Actions tab → Look for failed builds
```

#### **Assets Not Loading:**
```bash
# Check basePath configuration in next.config.js
# Ensure GITHUB_PAGES=true in workflow
```

#### **Build Failing:**
```bash
# Check Actions tab for error details
# Common causes:
├── Test failures
├── Build errors
├── Missing dependencies
└── Environment variable issues
```

#### **Slow Loading:**
```bash
# Ensure .nojekyll file exists (created automatically)
# Check network tab for 404s on assets
```

---

## 🎯 **Performance Tips**

### **Optimization Checklist:**
- ✅ **Static export**: No server-side rendering
- ✅ **Code splitting**: Automatic with Next.js
- ✅ **Asset optimization**: Images, CSS, JS minified
- ✅ **CDN delivery**: GitHub's global CDN
- ✅ **Caching headers**: Handled by GitHub Pages

### **Monitoring:**
```bash
# Use these tools to monitor performance:
├── Google Search Console (Core Web Vitals)
├── Google Analytics (user behavior)
├── Lighthouse (performance scores)
└── GitHub Pages insights (traffic)
```

---

## 🔄 **Deployment Workflow**

### **Development Process:**
```bash
1. Make changes locally
2. Test with `npm run dev`
3. Run tests with `npm test`
4. Commit and push to main
5. GitHub Actions builds and deploys automatically
6. Check live site in 2-3 minutes
```

### **Branch Strategy:**
```bash
main/master: Production deployment
feature/*: Development branches
hotfix/*: Emergency fixes
```

---

## 📈 **Scaling Considerations**

### **Traffic Limits:**
- **GitHub Pages**: 100GB/month soft limit
- **Very generous**: Handles millions of page views
- **No bandwidth costs**: Unlike other hosting

### **When to Migrate:**
- **Never, probably**: GitHub Pages scales incredibly well
- **Custom server features**: If you need APIs, databases
- **Advanced caching**: If you need more control

Your developer tools site is perfectly suited for GitHub Pages! 🚀
