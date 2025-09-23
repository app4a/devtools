# SEO Authentication Setup Guide

## 🚨 Current Issues & Solutions

### 1. Google Search Console: "Permission denied. Failed to verify the URL ownership."

**Problem**: Service account not properly configured in Google Search Console.

**Solution Steps:**

#### Step 1: Create Google Service Account
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the **"Web Search Indexing API"**
4. Go to **IAM & Admin** → **Service Accounts**
5. Click **"Create Service Account"**
6. Name it: `devtools-seo-automation`
7. Click **"Create and Continue"**
8. Skip roles (not needed for this use case)
9. Click **"Done"**

#### Step 2: Generate Service Account Key
1. Click on your new service account
2. Go to **"Keys"** tab
3. Click **"Add Key"** → **"Create new key"**
4. Choose **JSON** format
5. Download the JSON file
6. **IMPORTANT**: Copy the entire JSON content (it should start with `{"type":"service_account"...`)

#### Step 3: Add Service Account to Search Console
1. Go to [Google Search Console](https://search.google.com/search-console/)
2. Select your property: `https://app4a.github.io/devtools/`
3. Go to **Settings** → **Users and permissions**
4. Click **"Add user"**
5. Enter the service account email from the JSON (looks like: `devtools-seo-automation@your-project.iam.gserviceaccount.com`)
6. Set permission to **"Owner"** or **"Full"**
7. Click **"Add"**

#### Step 4: Add to GitHub Secrets
1. Go to your GitHub repository
2. Go to **Settings** → **Secrets and variables** → **Actions**
3. Click **"New repository secret"**
4. Name: `GOOGLE_SERVICE_ACCOUNT_KEY`
5. Value: Paste the ENTIRE JSON content from Step 2
6. Click **"Add secret"**

### 2. Bing Webmaster Tools: "ERROR!!! InvalidToken"

**Problem**: API key missing or invalid.

**Solution Steps:**

#### Step 1: Verify Site in Bing
1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters/)
2. Add your site: `https://app4a.github.io/devtools/`
3. Verify ownership (upload XML file or add meta tag)

#### Step 2: Generate API Key
1. In Bing Webmaster Tools, go to **Settings** → **API Access**
2. Click **"Generate API Key"**
3. Copy the generated key

#### Step 3: Add to GitHub Secrets
1. Go to your GitHub repository
2. Go to **Settings** → **Secrets and variables** → **Actions**
3. Click **"New repository secret"**
4. Name: `BING_WEBMASTER_API_KEY`
5. Value: Paste your API key from Step 2
6. Click **"Add secret"**

## 🔍 Verification

### Check GitHub Secrets
Go to your repository → **Settings** → **Secrets and variables** → **Actions**

You should see:
- ✅ `GOOGLE_SERVICE_ACCOUNT_KEY` (created X days ago)
- ✅ `BING_WEBMASTER_API_KEY` (created X days ago)

### Test the Setup
1. Make a small change to trigger the workflow
2. Check the **Actions** tab for detailed logs
3. Look for these debug messages:
   ```
   🔗 Submitting to Google: https://app4a.github.io/devtools/blog/...
   🔗 Submitting to Bing: https://app4a.github.io/devtools/blog/...
   API Key present: true
   ```

## 🚨 Troubleshooting

### Google Issues
- **"Invalid credentials"**: JSON is malformed - re-copy the entire JSON
- **"Access denied"**: Service account not added to Search Console
- **"API not enabled"**: Enable "Web Search Indexing API" in Cloud Console

### Bing Issues
- **"InvalidToken"**: API key expired or incorrect
- **"Site not found"**: Site not added to Bing Webmaster Tools
- **"Access denied"**: Site ownership not verified

### GitHub Secrets Issues
- **Secret not found**: Check secret name spelling
- **Secret truncated**: Ensure no extra spaces or line breaks
- **JSON parsing error**: Validate JSON format

## 📋 Manual Testing (Optional)

You can test manually using the script:

```bash
# Set up credentials
cp scripts/env-template.txt .env.local
# Edit .env.local with your real keys

# Test manual submission
npm run index-blogs
```

This will help you verify your credentials work before the automated workflow.

## 🔗 API Documentation
- [Google Indexing API](https://developers.google.com/search/apis/indexing-api/v3/quickstart)
- [Bing Webmaster API](https://docs.microsoft.com/en-us/bingwebmaster/getting-access)
