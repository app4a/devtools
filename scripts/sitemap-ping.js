#!/usr/bin/env node
// Sitemap ping utility for automatic search engine notification

const axios = require('axios');
const fs = require('fs');
const path = require('path');

class SitemapPing {
  constructor(siteUrl = 'https://app4a.github.io/devtools') {
    this.siteUrl = siteUrl;
    this.sitemapUrl = `${siteUrl}/sitemap.xml`;
  }

  async pingGoogle() {
    try {
      const pingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(this.sitemapUrl)}`;
      const response = await axios.get(pingUrl, { timeout: 10000 });
      
      console.log('✅ Google sitemap ping successful');
      return { success: true, service: 'Google', response: response.status };
    } catch (error) {
      console.error('❌ Google sitemap ping failed:', error.message);
      return { success: false, service: 'Google', error: error.message };
    }
  }

  async pingBing() {
    try {
      const pingUrl = `https://www.bing.com/ping?sitemap=${encodeURIComponent(this.sitemapUrl)}`;
      const response = await axios.get(pingUrl, { timeout: 10000 });
      
      console.log('✅ Bing sitemap ping successful');
      return { success: true, service: 'Bing', response: response.status };
    } catch (error) {
      console.error('❌ Bing sitemap ping failed:', error.message);
      return { success: false, service: 'Bing', error: error.message };
    }
  }

  async pingYandex() {
    try {
      const pingUrl = `https://webmaster.yandex.com/ping?sitemap=${encodeURIComponent(this.sitemapUrl)}`;
      const response = await axios.get(pingUrl, { timeout: 10000 });
      
      console.log('✅ Yandex sitemap ping successful');
      return { success: true, service: 'Yandex', response: response.status };
    } catch (error) {
      console.error('❌ Yandex sitemap ping failed:', error.message);
      return { success: false, service: 'Yandex', error: error.message };
    }
  }

  async pingAll() {
    console.log(`🔔 Pinging search engines about sitemap: ${this.sitemapUrl}`);
    
    const results = await Promise.allSettled([
      this.pingGoogle(),
      this.pingBing(),
      this.pingYandex()
    ]);

    const summary = results.map(result => result.value || result.reason);
    
    console.log('\n📋 PING SUMMARY');
    console.log('===============');
    summary.forEach(result => {
      const status = result.success ? '✅' : '❌';
      console.log(`${status} ${result.service}: ${result.success ? 'Success' : result.error}`);
    });

    return summary;
  }

  async validateSitemap() {
    try {
      console.log(`🔍 Validating sitemap: ${this.sitemapUrl}`);
      const response = await axios.get(this.sitemapUrl, { timeout: 10000 });
      
      if (response.status === 200) {
        const sitemapContent = response.data;
        const urlCount = (sitemapContent.match(/<url>/g) || []).length;
        
        console.log(`✅ Sitemap is valid and contains ${urlCount} URLs`);
        return { valid: true, urlCount, lastModified: response.headers['last-modified'] };
      } else {
        throw new Error(`HTTP ${response.status}`);
      }
    } catch (error) {
      console.error('❌ Sitemap validation failed:', error.message);
      return { valid: false, error: error.message };
    }
  }

  async logPingActivity() {
    const logFile = path.join(__dirname, '../logs/sitemap-pings.json');
    const logDir = path.dirname(logFile);
    
    // Ensure logs directory exists
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }

    // Load existing log
    let logData = [];
    if (fs.existsSync(logFile)) {
      try {
        logData = JSON.parse(fs.readFileSync(logFile, 'utf8'));
      } catch (error) {
        console.log('Creating new ping log file');
      }
    }

    // Add new ping entry
    const pingEntry = {
      timestamp: new Date().toISOString(),
      sitemapUrl: this.sitemapUrl,
      results: await this.pingAll()
    };

    logData.push(pingEntry);

    // Keep only last 50 entries
    if (logData.length > 50) {
      logData = logData.slice(-50);
    }

    // Save updated log
    fs.writeFileSync(logFile, JSON.stringify(logData, null, 2));
    console.log(`📝 Ping activity logged to ${logFile}`);

    return pingEntry;
  }
}

// CLI usage
if (require.main === module) {
  const args = process.argv.slice(2);
  const siteUrl = args[0] || 'https://app4a.github.io/devtools';
  
  const pinger = new SitemapPing(siteUrl);
  
  async function run() {
    // Validate sitemap first
    const validation = await pinger.validateSitemap();
    if (!validation.valid) {
      console.error('⚠️ Sitemap validation failed, aborting ping');
      process.exit(1);
    }

    // Log the ping activity
    await pinger.logPingActivity();
    
    console.log('🎉 Sitemap ping completed!');
  }

  run().catch(error => {
    console.error('💥 Ping failed:', error);
    process.exit(1);
  });
}

module.exports = SitemapPing;
