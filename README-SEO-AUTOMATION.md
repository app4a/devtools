# SEO Automation Setup Guide

This guide explains how to set up automatic URL submission to Google Search Console and Bing Webmaster Tools after deployment.

## 🚀 Quick Setup

### 1. Install Dependencies

```bash
npm install googleapis axios
```

### 2. Get API Credentials

#### Google Search Console API
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the "Web Search Indexing API"
4. Create a Service Account
5. Download the JSON key file
6. Add your site to Google Search Console
7. Add the service account email as a user in Search Console

#### Bing Webmaster Tools API
1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters/)
2. Add and verify your site
3. Go to Settings > API Access
4. Generate an API key

### 3. Set Environment Variables

Create a `.env.local` file:

```bash
# Google Search Console
GOOGLE_SERVICE_ACCOUNT_KEY="paste-your-json-key-here"

# Bing Webmaster Tools
BING_WEBMASTER_API_KEY="your-bing-api-key"

# Optional: Notification webhooks
SLACK_WEBHOOK_URL="your-slack-webhook-url"
DISCORD_WEBHOOK_URL="your-discord-webhook-url"
```

### 4. GitHub Secrets (for CI/CD)

Add these secrets to your GitHub repository:
- `GOOGLE_SERVICE_ACCOUNT_KEY`
- `BING_WEBMASTER_API_KEY`

## 📋 Available Scripts

```bash
# Submit all new pages automatically
npm run submit-urls

# Submit to Google only
npm run submit-google

# Submit to Bing only
npm run submit-bing

# Ping search engines about sitemap
npm run ping-sitemap

# Full SEO submission (sitemap + URLs)
npm run seo-submit

# Deploy and submit (build + SEO)
npm run deploy
```

## 🔄 Automation Options

### Option 1: GitHub Actions (Recommended)
The included `.github/workflows/deploy-and-index.yml` automatically:
- Detects new/changed pages
- Submits URLs to Google and Bing
- Pings sitemap endpoints
- Runs on every push to main branch

### Option 2: Manual Triggers
```bash
# After adding new pages
npm run submit-urls

# After updating sitemap
npm run ping-sitemap
```

### Option 3: Scheduled Submissions
Add to your CI/CD or use cron jobs:

```bash
# Daily sitemap ping
0 9 * * * cd /path/to/project && npm run ping-sitemap

# Weekly full submission check
0 9 * * 1 cd /path/to/project && npm run submit-urls
```

## 📊 Monitoring & Logging

### Submission Logs
- **Location**: `logs/url-submissions.json`
- **Contains**: Successfully submitted URLs, timestamps
- **Purpose**: Prevents duplicate submissions

### Activity Reports
- **Location**: `logs/reports/seo-report-*.json`
- **Contains**: Detailed submission results, errors
- **Generated**: After each automation run

### Sitemap Ping History
- **Location**: `logs/sitemap-pings.json`
- **Contains**: Ping attempts and results
- **Retained**: Last 50 entries

## 🛠️ Configuration

Edit `config/seo-automation.json` to customize:

```json
{
  "automation": {
    "enabled": true,
    "triggerOnDeploy": true,
    "triggerOnNewPages": true,
    "delayAfterDeploy": 300
  },
  "searchEngines": {
    "google": {
      "enabled": true,
      "indexingAPI": true,
      "sitemapPing": true,
      "rateLimitMs": 1000
    },
    "bing": {
      "enabled": true,
      "webmasterAPI": true,
      "sitemapPing": true,
      "rateLimitMs": 500
    }
  }
}
```

## 🚨 Troubleshooting

### Common Issues

#### Google API Authentication Failed
- Verify service account JSON is valid
- Ensure service account has access to Search Console
- Check API is enabled in Google Cloud Console

#### Bing API Key Invalid
- Verify API key from Bing Webmaster Tools
- Ensure site is verified in Bing Webmaster
- Check API quotas aren't exceeded

#### No New Pages Detected
- Check submission log: `logs/url-submissions.json`
- Verify page files are in `pages/` directory
- Ensure pages end with `.js` extension

### Debug Mode

Run with debug output:

```bash
DEBUG=* npm run submit-urls
```

### Rate Limiting

If you hit rate limits:
- Increase `rateLimitMs` in config
- Reduce `batchSize` for submissions
- Implement exponential backoff

## 📈 Best Practices

### 1. Timing
- Wait 5+ minutes after deployment before submitting
- Don't submit more than 100 URLs per day to Google
- Bing allows more submissions but still respect limits

### 2. Sitemap Strategy
- Keep sitemap updated automatically
- Ping after sitemap changes
- Include priority and lastmod dates

### 3. Monitoring
- Check submission logs regularly
- Monitor indexing status in Search Console
- Set up failure alerts

### 4. URL Selection
- Only submit important pages
- Avoid submitting low-value or duplicate content
- Focus on new content and major updates

## 🔗 API Documentation

- [Google Search Console API](https://developers.google.com/search/apis/indexing-api/v3/quickstart)
- [Bing Webmaster Tools API](https://docs.microsoft.com/en-us/bingwebmaster/getting-access)
- [Google Sitemap Ping](https://developers.google.com/search/docs/advanced/sitemaps/build-sitemap#addsitemap)
- [Bing Sitemap Ping](https://www.bing.com/webmasters/help/how-to-submit-sitemaps-82a15bd4)

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review logs in the `logs/` directory
3. Verify API credentials and permissions
4. Test individual components separately

## 🔒 Security Notes

- Never commit API keys to version control
- Use environment variables for sensitive data
- Rotate API keys periodically
- Monitor API usage for unusual activity
- Keep service account permissions minimal
