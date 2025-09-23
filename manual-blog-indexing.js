#!/usr/bin/env node

/**
 * Manual Blog Indexing Script
 * Submits all 2025 blog pages to Google and Bing for indexing
 */

const submitGoogle = require('./scripts/google-indexing-api');
const submitBing = require('./scripts/bing-webmaster-api');

const SITE_BASE = 'https://app4a.github.io/devtools';

const BLOG_PAGES_2025 = [
  '/blog/ai-development-guide-2025',
  '/blog/css-mastery-guide-2025',
  '/blog/data-transformation-guide-2025', 
  '/blog/essential-developer-tools-2025',
  '/blog/image-optimization-guide-2025',
  '/blog/json-formatting-guide-2025',
  '/blog/timezone-management-guide-2025',
  '/blog/web-security-essentials-2025'
];

async function manuallySubmitBlogPages() {
  console.log('🚀 Starting manual blog page indexing...');
  console.log(`📊 Total pages to submit: ${BLOG_PAGES_2025.length}`);
  
  let googleSubmitted = 0;
  let bingSubmitted = 0;
  let errors = [];

  // Submit to Google Search Console
  console.log('\n📤 Submitting to Google Search Console...');
  for (const page of BLOG_PAGES_2025) {
    try {
      const fullUrl = SITE_BASE + page;
      await submitGoogle(fullUrl);
      console.log(`✅ Google: ${page}`);
      googleSubmitted++;
      
      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`❌ Google failed: ${page} - ${error.message}`);
      errors.push({ service: 'Google', page, error: error.message });
    }
  }

  // Submit to Bing Webmaster Tools  
  console.log('\n📤 Submitting to Bing Webmaster Tools...');
  for (const page of BLOG_PAGES_2025) {
    try {
      const fullUrl = SITE_BASE + page;
      await submitBing(fullUrl);
      console.log(`✅ Bing: ${page}`);
      bingSubmitted++;
      
      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error(`❌ Bing failed: ${page} - ${error.message}`);
      errors.push({ service: 'Bing', page, error: error.message });
    }
  }

  // Summary
  console.log('\n📈 Submission Summary:');
  console.log(`✅ Google: ${googleSubmitted}/${BLOG_PAGES_2025.length}`);
  console.log(`✅ Bing: ${bingSubmitted}/${BLOG_PAGES_2025.length}`);
  
  if (errors.length > 0) {
    console.log(`\n❌ Errors (${errors.length}):`);
    errors.forEach(err => {
      console.log(`   ${err.service}: ${err.page} - ${err.error}`);
    });
  }
  
  console.log('\n🎉 Manual indexing completed!');
}

// Check for required environment variables
const requiredVars = ['GOOGLE_SERVICE_ACCOUNT_KEY', 'BING_WEBMASTER_API_KEY'];
const missingVars = requiredVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.log('⚠️  Missing environment variables:');
  missingVars.forEach(varName => {
    console.log(`   - ${varName}`);
  });
  console.log('\n💡 Create a .env.local file with your API credentials');
  console.log('   Or run: cp scripts/env-template.txt .env.local');
  process.exit(1);
}

// Run the script
manuallySubmitBlogPages().catch(error => {
  console.error('💥 Script failed:', error);
  process.exit(1);
});
