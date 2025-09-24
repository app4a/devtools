// Google Search Console Indexing API Integration
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

class GoogleIndexingAPI {
  constructor() {
    // Service account key file (download from Google Cloud Console)
    this.keyFile = path.join(__dirname, '../config/google-service-account.json');
    this.scopes = ['https://www.googleapis.com/auth/indexing'];
    this.siteUrl = 'https://app4a.github.io/devtools/';
  }

  async authenticate() {
    try {
      const auth = new google.auth.GoogleAuth({
        keyFile: this.keyFile,
        scopes: this.scopes,
      });

      this.authClient = await auth.getClient();
      this.indexing = google.indexing({ version: 'v3', auth: this.authClient });
      
      console.log('✅ Google API authenticated successfully');
      return true;
    } catch (error) {
      console.error('❌ Google API authentication failed:', error.message);
      return false;
    }
  }

  async submitUrl(url, type = 'URL_UPDATED') {
    try {
      const fullUrl = url.startsWith('http') ? url : `${this.siteUrl}${url.replace(/^\//, '')}`;
      
      const response = await this.indexing.urlNotifications.publish({
        requestBody: {
          url: fullUrl,
          type: type, // 'URL_UPDATED' or 'URL_DELETED'
        },
      });

      console.log(`✅ Successfully submitted to Google: ${fullUrl}`);
      return response.data;
    } catch (error) {
      console.error(`❌ Failed to submit ${url} to Google:`, error.message);
      throw error;
    }
  }

  async submitMultipleUrls(urls) {
    const results = [];
    
    for (const url of urls) {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Rate limiting
        const result = await this.submitUrl(url);
        results.push({ url, success: true, result });
      } catch (error) {
        results.push({ url, success: false, error: error.message });
      }
    }

    return results;
  }

  async getSubmissionStatus(url) {
    try {
      const fullUrl = url.startsWith('http') ? url : `${this.siteUrl}${url.replace(/^\//, '')}`;
      
      const response = await this.indexing.urlNotifications.getMetadata({
        url: fullUrl,
      });

      return response.data;
    } catch (error) {
      console.error(`❌ Failed to get status for ${url}:`, error.message);
      throw error;
    }
  }
}

module.exports = GoogleIndexingAPI;

// Example usage
if (require.main === module) {
  async function example() {
    const googleAPI = new GoogleIndexingAPI();
    
    if (await googleAPI.authenticate()) {
      // Submit new blog articles
      const newUrls = [
        '/blog/web-security-essentials-2025',
        '/blog/image-optimization-guide-2025',
        '/blog/timezone-management-guide-2025'
      ];

      const results = await googleAPI.submitMultipleUrls(newUrls);
      console.log('Submission results:', results);
    }
  }

  example().catch(console.error);
}
