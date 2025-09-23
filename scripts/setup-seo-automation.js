#!/usr/bin/env node
// Setup script for SEO automation

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise(resolve => {
    rl.question(prompt, resolve);
  });
}

async function setupSEOAutomation() {
  console.log('🚀 Setting up SEO Automation for your site');
  console.log('==========================================\n');

  try {
    // Create necessary directories
    const dirs = ['logs', 'logs/reports', 'config'];
    dirs.forEach(dir => {
      const dirPath = path.join(__dirname, '..', dir);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
        console.log(`✅ Created directory: ${dir}`);
      }
    });

    // Check if .env.local exists
    const envPath = path.join(__dirname, '..', '.env.local');
    if (!fs.existsSync(envPath)) {
      console.log('\n📝 Creating .env.local file...');
      const envExample = fs.readFileSync(path.join(__dirname, '..', '.env.example'), 'utf8');
      fs.writeFileSync(envPath, envExample);
      console.log('✅ Created .env.local from template');
    }

    console.log('\n🔑 API Credentials Setup');
    console.log('========================');

    const setupGoogle = await question('\nWould you like to set up Google Search Console API? (y/n): ');
    if (setupGoogle.toLowerCase() === 'y') {
      console.log('\n📋 Google Search Console Setup Steps:');
      console.log('1. Go to https://console.cloud.google.com/');
      console.log('2. Create a new project or select existing one');
      console.log('3. Enable the "Web Search Indexing API"');
      console.log('4. Create a Service Account');
      console.log('5. Download the JSON key file');
      console.log('6. Add your site to Google Search Console');
      console.log('7. Add the service account email as a user in Search Console');
      
      await question('\nPress Enter when you have the JSON key ready...');
      console.log('\nPaste the entire JSON content into your .env.local file as GOOGLE_SERVICE_ACCOUNT_KEY');
    }

    const setupBing = await question('\nWould you like to set up Bing Webmaster Tools API? (y/n): ');
    if (setupBing.toLowerCase() === 'y') {
      console.log('\n📋 Bing Webmaster Tools Setup Steps:');
      console.log('1. Go to https://www.bing.com/webmasters/');
      console.log('2. Add and verify your site');
      console.log('3. Go to Settings > API Access');
      console.log('4. Generate an API key');
      
      await question('\nPress Enter when you have the API key ready...');
      console.log('\nAdd your API key to .env.local as BING_WEBMASTER_API_KEY');
    }

    console.log('\n🔧 Configuration');
    console.log('================');

    const siteUrl = await question('Enter your site URL (e.g., https://yoursite.com): ');
    
    // Update configuration
    const configPath = path.join(__dirname, '..', 'config', 'seo-automation.json');
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    
    // You could update config with site-specific settings here
    
    console.log('\n📊 Testing Setup');
    console.log('================');

    const testSetup = await question('\nWould you like to test the setup now? (y/n): ');
    if (testSetup.toLowerCase() === 'y') {
      console.log('\nRunning test...');
      
      try {
        // Test sitemap ping
        const SitemapPing = require('./sitemap-ping');
        const pinger = new SitemapPing(siteUrl);
        const validation = await pinger.validateSitemap();
        
        if (validation.valid) {
          console.log('✅ Sitemap validation successful');
        } else {
          console.log('❌ Sitemap validation failed:', validation.error);
        }
      } catch (error) {
        console.log('⚠️ Test failed (this is normal if APIs aren\'t set up yet):', error.message);
      }
    }

    console.log('\n🎉 Setup Complete!');
    console.log('==================');
    console.log('\nNext steps:');
    console.log('1. Edit .env.local with your API credentials');
    console.log('2. Test with: npm run ping-sitemap');
    console.log('3. Submit URLs with: npm run submit-urls');
    console.log('4. Set up GitHub Actions for automatic submission');
    console.log('\nSee README-SEO-AUTOMATION.md for detailed instructions.');

  } catch (error) {
    console.error('❌ Setup failed:', error);
  } finally {
    rl.close();
  }
}

if (require.main === module) {
  setupSEOAutomation();
}

module.exports = setupSEOAutomation;
