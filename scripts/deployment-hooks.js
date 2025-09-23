#!/usr/bin/env node
// Deployment hooks for automatic SEO submission

const AutoSubmitURLs = require('./auto-submit-urls');
const SitemapPing = require('./sitemap-ping');
const config = require('../config/seo-automation.json');

class DeploymentHooks {
  constructor() {
    this.config = config;
    this.autoSubmit = new AutoSubmitURLs();
    this.sitemapPing = new SitemapPing();
  }

  async onDeploymentSuccess() {
    if (!this.config.automation.enabled) {
      console.log('📴 SEO automation is disabled');
      return;
    }

    console.log('🚀 Deployment successful! Starting SEO automation...');

    try {
      // Wait for deployment to propagate
      if (this.config.automation.delayAfterDeploy > 0) {
        console.log(`⏱️ Waiting ${this.config.automation.delayAfterDeploy}s for deployment to propagate...`);
        await new Promise(resolve => 
          setTimeout(resolve, this.config.automation.delayAfterDeploy * 1000)
        );
      }

      const results = [];

      // Step 1: Validate and ping sitemap
      if (this.config.searchEngines.google.sitemapPing || 
          this.config.searchEngines.bing.sitemapPing) {
        console.log('📡 Pinging search engines about sitemap...');
        const pingResult = await this.sitemapPing.pingAll();
        results.push({ step: 'sitemap_ping', result: pingResult });
      }

      // Step 2: Submit new/updated URLs
      if (this.config.automation.triggerOnNewPages) {
        console.log('📤 Submitting new pages for indexing...');
        const submitResult = await this.autoSubmit.submitNewPages();
        results.push({ step: 'url_submission', result: submitResult });
      }

      // Step 3: Generate activity report
      if (this.config.monitoring.generateReports) {
        const report = await this.generateActivityReport(results);
        console.log('📊 Activity report generated');
        results.push({ step: 'report_generation', result: report });
      }

      console.log('✅ SEO automation completed successfully!');
      return results;

    } catch (error) {
      console.error('❌ SEO automation failed:', error);
      
      if (this.config.monitoring.alertOnFailures) {
        await this.sendFailureAlert(error);
      }
      
      throw error;
    }
  }

  async onNewPageDetected(pagePaths) {
    if (!this.config.automation.triggerOnNewPages) {
      return;
    }

    console.log(`🔍 New pages detected: ${pagePaths.join(', ')}`);
    
    try {
      // Submit specific pages
      const googleAPI = new (require('./google-indexing-api'))();
      const bingAPI = new (require('./bing-webmaster-api'))();

      const results = [];

      if (this.config.searchEngines.google.enabled) {
        await googleAPI.authenticate();
        const googleResult = await googleAPI.submitMultipleUrls(pagePaths);
        results.push({ service: 'google', result: googleResult });
      }

      if (this.config.searchEngines.bing.enabled) {
        const bingResult = await bingAPI.submitMultipleUrls(pagePaths);
        results.push({ service: 'bing', result: bingResult });
      }

      console.log(`✅ Submitted ${pagePaths.length} new pages for indexing`);
      return results;

    } catch (error) {
      console.error('❌ Failed to submit new pages:', error);
      throw error;
    }
  }

  async generateActivityReport(results) {
    const report = {
      timestamp: new Date().toISOString(),
      deployment: {
        trigger: 'deployment_success',
        duration: Date.now()
      },
      activities: results,
      summary: {
        totalSteps: results.length,
        successfulSteps: results.filter(r => !r.error).length,
        failedSteps: results.filter(r => r.error).length
      }
    };

    // Save report to file
    const fs = require('fs');
    const path = require('path');
    const reportsDir = path.join(__dirname, '../logs/reports');
    
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir, { recursive: true });
    }

    const reportFile = path.join(reportsDir, `seo-report-${Date.now()}.json`);
    fs.writeFileSync(reportFile, JSON.stringify(report, null, 2));
    
    console.log(`📄 Report saved: ${reportFile}`);
    return report;
  }

  async sendFailureAlert(error) {
    // This could integrate with Slack, Discord, email, etc.
    console.log('🚨 FAILURE ALERT 🚨');
    console.log('===================');
    console.log(`Time: ${new Date().toISOString()}`);
    console.log(`Error: ${error.message}`);
    console.log(`Stack: ${error.stack}`);
    
    // Example: Send to webhook (replace with your notification service)
    /*
    const axios = require('axios');
    await axios.post(process.env.SLACK_WEBHOOK_URL, {
      text: `🚨 SEO Automation Failed: ${error.message}`,
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*SEO Automation Failure*\n\`\`\`${error.message}\`\`\``
          }
        }
      ]
    });
    */
  }

  // Webhook endpoint for external triggers
  async handleWebhook(event, data) {
    switch (event) {
      case 'deployment.success':
        return await this.onDeploymentSuccess();
      
      case 'pages.created':
        return await this.onNewPageDetected(data.pages || []);
      
      case 'sitemap.updated':
        return await this.sitemapPing.pingAll();
      
      default:
        console.log(`Unknown webhook event: ${event}`);
        return { error: 'Unknown event' };
    }
  }
}

// CLI usage
if (require.main === module) {
  const hooks = new DeploymentHooks();
  const event = process.argv[2] || 'deployment.success';
  const data = process.argv[3] ? JSON.parse(process.argv[3]) : {};

  hooks.handleWebhook(event, data)
    .then(result => {
      console.log('🎉 Hook execution completed:', result);
      process.exit(0);
    })
    .catch(error => {
      console.error('💥 Hook execution failed:', error);
      process.exit(1);
    });
}

module.exports = DeploymentHooks;
