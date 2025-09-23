#!/usr/bin/env node
// Automated URL submission script for new pages/tools

const GoogleIndexingAPI = require('./google-indexing-api');
const BingWebmasterAPI = require('./bing-webmaster-api');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

class AutoSubmitURLs {
  constructor() {
    this.siteUrl = 'https://app4a.github.io/devtools';
    this.submissionLogFile = path.join(__dirname, '../logs/url-submissions.json');
    this.googleAPI = new GoogleIndexingAPI();
    this.bingAPI = new BingWebmasterAPI();
  }

  async detectNewPages() {
    try {
      // Get list of all current pages
      const pagesDir = path.join(__dirname, '../pages');
      const pages = await this.scanPagesDirectory(pagesDir);
      
      // Load previous submission log
      const previousSubmissions = await this.loadSubmissionLog();
      
      // Find new pages
      const newPages = pages.filter(page => !previousSubmissions.includes(page));
      
      console.log(`Found ${newPages.length} new pages:`, newPages);
      return newPages;
    } catch (error) {
      console.error('Error detecting new pages:', error);
      return [];
    }
  }

  async scanPagesDirectory(dir, baseDir = dir) {
    const pages = [];
    const items = fs.readdirSync(dir);

    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory() && !item.startsWith('_')) {
        // Recursively scan subdirectories
        const subPages = await this.scanPagesDirectory(fullPath, baseDir);
        pages.push(...subPages);
      } else if (item.endsWith('.js') && !item.startsWith('_')) {
        // Convert file path to URL path
        const relativePath = path.relative(baseDir, fullPath);
        let urlPath = relativePath.replace(/\.js$/, '').replace(/\\/g, '/');
        
        if (urlPath === 'index') {
          urlPath = '/';
        } else {
          urlPath = '/' + urlPath;
        }
        
        pages.push(urlPath);
      }
    }

    return pages;
  }

  async loadSubmissionLog() {
    try {
      if (fs.existsSync(this.submissionLogFile)) {
        const data = fs.readFileSync(this.submissionLogFile, 'utf8');
        const log = JSON.parse(data);
        return log.submittedPages || [];
      }
    } catch (error) {
      console.log('No previous submission log found, starting fresh');
    }
    return [];
  }

  async saveSubmissionLog(submittedPages) {
    try {
      const logDir = path.dirname(this.submissionLogFile);
      if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
      }

      const logData = {
        lastUpdate: new Date().toISOString(),
        submittedPages: submittedPages,
        totalSubmissions: submittedPages.length
      };

      fs.writeFileSync(this.submissionLogFile, JSON.stringify(logData, null, 2));
      console.log(`✅ Submission log updated: ${submittedPages.length} pages recorded`);
    } catch (error) {
      console.error('Error saving submission log:', error);
    }
  }

  async submitNewPages() {
    try {
      console.log('🔍 Detecting new pages...');
      const newPages = await this.detectNewPages();

      if (newPages.length === 0) {
        console.log('✅ No new pages found to submit');
        return;
      }

      console.log(`📤 Submitting ${newPages.length} new pages...`);

      // Authenticate APIs
      const googleAuth = await this.googleAPI.authenticate();
      const results = {
        google: [],
        bing: [],
        errors: []
      };

      // Submit to Google Search Console
      if (googleAuth) {
        try {
          console.log('📤 Submitting to Google Search Console...');
          results.google = await this.googleAPI.submitMultipleUrls(newPages);
        } catch (error) {
          console.error('Google submission failed:', error);
          results.errors.push({ service: 'Google', error: error.message });
        }
      }

      // Submit to Bing Webmaster Tools
      if (process.env.BING_WEBMASTER_API_KEY) {
        try {
          console.log('📤 Submitting to Bing Webmaster Tools...');
          results.bing = await this.bingAPI.submitMultipleUrls(newPages);
        } catch (error) {
          console.error('Bing submission failed:', error);
          results.errors.push({ service: 'Bing', error: error.message });
        }
      } else {
        console.log('⚠️ Bing API key not found, skipping Bing submission');
      }

      // Update submission log
      const allSubmittedPages = await this.loadSubmissionLog();
      const successfulSubmissions = newPages.filter(page => {
        const googleSuccess = results.google.some(r => r.url === page && r.success);
        const bingSuccess = results.bing.some(r => r.url === page && r.success);
        return googleSuccess || bingSuccess;
      });

      await this.saveSubmissionLog([...allSubmittedPages, ...successfulSubmissions]);

      // Ping sitemaps
      await this.pingSitemaps();

      // Print summary
      this.printSubmissionSummary(results, newPages);

      return results;
    } catch (error) {
      console.error('❌ Auto-submission failed:', error);
      throw error;
    }
  }

  async pingSitemaps() {
    try {
      console.log('📡 Pinging search engines about sitemap updates...');
      
      const sitemapUrl = `${this.siteUrl}/sitemap.xml`;
      
      // Ping Google
      await execAsync(`curl -s "https://www.google.com/ping?sitemap=${sitemapUrl}"`);
      console.log('✅ Google sitemap ping sent');
      
      // Ping Bing  
      await execAsync(`curl -s "https://www.bing.com/ping?sitemap=${sitemapUrl}"`);
      console.log('✅ Bing sitemap ping sent');
      
    } catch (error) {
      console.error('⚠️ Sitemap ping failed:', error.message);
    }
  }

  printSubmissionSummary(results, newPages) {
    console.log('\n📋 SUBMISSION SUMMARY');
    console.log('=====================');
    console.log(`Total new pages: ${newPages.length}`);
    
    const googleSuccessCount = results.google.filter(r => r.success).length;
    const bingSuccessCount = results.bing.filter(r => r.success).length;
    
    console.log(`Google submissions: ${googleSuccessCount}/${results.google.length}`);
    console.log(`Bing submissions: ${bingSuccessCount}/${results.bing.length}`);
    
    if (results.errors.length > 0) {
      console.log('\n❌ Errors:');
      results.errors.forEach(error => {
        console.log(`- ${error.service}: ${error.error}`);
      });
    }
    
    console.log('\n✅ Auto-submission completed!');
  }
}

// CLI usage
if (require.main === module) {
  const autoSubmit = new AutoSubmitURLs();
  
  autoSubmit.submitNewPages()
    .then(() => {
      console.log('🎉 All done!');
      process.exit(0);
    })
    .catch(error => {
      console.error('💥 Failed:', error);
      process.exit(1);
    });
}

module.exports = AutoSubmitURLs;
