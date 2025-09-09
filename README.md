# 🛠️ Developer Tools - Free Online Utilities

A comprehensive suite of **free online developer tools** built with Next.js. No registration required, completely client-side processing for maximum privacy and speed.

## 🌟 Features

### **12 Essential Developer Tools:**
- 📝 **JSON Formatter & Validator** - Format, validate, and beautify JSON
- 🔐 **Base64 Encoder/Decoder** - Encode and decode Base64 strings
- 🔒 **Hash Generator** - Generate MD5, SHA-1, SHA-256, SHA-512 hashes
- 🎫 **JWT Decoder** - Decode and inspect JWT tokens
- 🎨 **Color Converter** - Convert between HEX, RGB, HSL with color picker
- 🔍 **Regex Tester** - Test regular expressions with live matching
- 📊 **Text Diff Tool** - Compare text with highlighted differences
- 📄 **Multiline Formatter** - Format multiline strings for code/SQL
- 🌐 **URL Encoder/Decoder** - Handle URL encoding and decoding
- ⏰ **Timestamp Converter** - Convert Unix timestamps to dates
- ⏱️ **Cron Parser** - Parse and explain cron expressions
- 🌍 **World Time Clock** - View times across multiple timezones

### **Additional Resources:**
- 📚 **Developer Blog** - Guides and best practices
- ❓ **FAQ & Help** - Common questions and troubleshooting
- ⚖️ **Tools Comparison** - How we compare to alternatives

## 🚀 Quick Start

### **Development:**
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

### **Testing:**
```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage

# Test GitHub Pages build
npm run test:github-build
```

### **Building:**
```bash
# Build for production
npm run build

# Preview build locally
npm run preview
```

## 📦 Deployment to GitHub Pages

### **One-Time Setup:**
1. **Enable GitHub Pages:**
   - Go to Repository → Settings → Pages
   - Source: Select "GitHub Actions"

2. **Configure Actions:**
   - Go to Repository → Settings → Actions → General
   - Set permissions to "Read and write permissions"

### **Deploy:**
```bash
# Simply push to main branch
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main

# GitHub Actions will automatically:
# ✅ Run tests
# ✅ Build the site
# ✅ Deploy to GitHub Pages
```

Your site will be available at:
```
https://yourusername.github.io/repository-name
```

📖 **Detailed deployment guide:** [GITHUB-PAGES-SETUP.md](./GITHUB-PAGES-SETUP.md)

## 🎯 SEO & Analytics

### **Built-in SEO Features:**
- ✅ **Comprehensive meta tags** for all pages
- ✅ **Structured data** (Schema.org) for better search results
- ✅ **XML sitemap** automatically generated
- ✅ **OpenGraph** and Twitter card support
- ✅ **Performance optimized** for Core Web Vitals

### **Google Analytics Setup:**
1. Create Google Analytics 4 property
2. Add repository secret: `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX`
3. Redeploy - analytics will be automatically activated

📖 **Complete SEO guide:** [SEO-IMPLEMENTATION-GUIDE.md](./SEO-IMPLEMENTATION-GUIDE.md)

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm test` | Run test suite |
| `npm run test:github-build` | Test GitHub Pages build locally |
| `npm run lint` | Run ESLint |

## 🏗️ Tech Stack

- **Framework:** Next.js 13 with static export
- **UI Library:** Material-UI (MUI) v5
- **Styling:** CSS-in-JS with MUI's styled system
- **Testing:** Jest + React Testing Library
- **Deployment:** GitHub Pages with GitHub Actions
- **Analytics:** Google Analytics 4 (optional)

## 📁 Project Structure

```
├── components/          # Reusable React components
│   ├── Analytics.js    # Google Analytics integration
│   ├── SEO.js         # SEO meta tags component
│   └── [Tool].js      # Individual tool components
├── pages/              # Next.js pages
│   ├── _app.js        # App wrapper with theme
│   ├── index.js       # Homepage
│   ├── blog/          # Blog section
│   └── [tool].js      # Individual tool pages
├── public/             # Static assets
│   ├── sitemap.xml    # SEO sitemap
│   ├── robots.txt     # Search engine directives
│   └── sw.js          # Service worker
├── data/              # Tool configurations
└── __tests__/         # Test files
```

## 🎨 Customization

### **Adding New Tools:**
1. Create component in `components/YourTool.js`
2. Add page in `pages/your-tool.js`
3. Update `data/tools.js` with tool information
4. Add tests in `__tests__/YourTool.test.js`
5. Update sitemap in `public/sitemap.xml`

### **Theming:**
The app uses MUI's dark theme by default. Customize in `pages/_app.js`:
```javascript
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    // Your custom colors
  },
});
```

## 🔒 Privacy & Security

- **Client-side processing:** All tools work in your browser
- **No data upload:** Your data never leaves your device
- **No tracking:** No personal data collection (unless you add analytics)
- **Open source:** Transparent code for security review

## 📊 Performance

- **Lighthouse Score:** 95+ (Performance, Accessibility, Best Practices, SEO)
- **Core Web Vitals:** LCP < 1.5s, FID < 100ms, CLS < 0.1
- **Bundle Size:** ~665KB first load (optimized with code splitting)
- **Global CDN:** Fast delivery via GitHub Pages CDN

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-tool`)
3. Add your tool with tests
4. Commit changes (`git commit -m 'Add amazing tool'`)
5. Push to branch (`git push origin feature/amazing-tool`)
6. Open Pull Request

## 📄 License

MIT License - feel free to use this project for your own developer tools site!

## 🌟 Star This Repo

If you find these tools useful, please ⭐ star this repository to help others discover it!

---

**Live Demo:** `https://yourusername.github.io/repository-name` (after deployment)
