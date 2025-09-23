// Bing Webmaster Tools API Integration
const axios = require('axios');
const fs = require('fs');

class BingWebmasterAPI {
  constructor() {
    // Get API key from Bing Webmaster Tools
    this.apiKey = process.env.BING_WEBMASTER_API_KEY;
    this.siteUrl = 'https://app4a.github.io/devtools/';
    this.baseUrl = 'https://ssl.bing.com/webmaster/api.svc/json';
  }

  async submitUrl(url) {
    try {
      const fullUrl = url.startsWith('http') ? url : `${this.siteUrl}${url.replace(/^\//, '')}`;
      
      const response = await axios.post(
        `${this.baseUrl}/SubmitUrl`,
        {
          siteUrl: this.siteUrl,
          url: fullUrl
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`
          }
        }
      );

      console.log(`✅ Successfully submitted to Bing: ${fullUrl}`);
      return response.data;
    } catch (error) {
      console.error(`❌ Failed to submit ${url} to Bing:`, error.response?.data || error.message);
      throw error;
    }
  }

  async submitMultipleUrls(urls) {
    const results = [];
    
    for (const url of urls) {
      try {
        await new Promise(resolve => setTimeout(resolve, 500)); // Rate limiting
        const result = await this.submitUrl(url);
        results.push({ url, success: true, result });
      } catch (error) {
        results.push({ url, success: false, error: error.message });
      }
    }

    return results;
  }

  async submitUrlViaBatch(urls) {
    try {
      const fullUrls = urls.map(url => 
        url.startsWith('http') ? url : `${this.siteUrl}${url.replace(/^\//, '')}`
      );

      const response = await axios.post(
        `${this.baseUrl}/SubmitUrlBatch`,
        {
          siteUrl: this.siteUrl,
          urlList: fullUrls
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`
          }
        }
      );

      console.log(`✅ Successfully submitted ${urls.length} URLs to Bing`);
      return response.data;
    } catch (error) {
      console.error('❌ Failed to submit batch to Bing:', error.response?.data || error.message);
      throw error;
    }
  }

  async getQuota() {
    try {
      const response = await axios.get(
        `${this.baseUrl}/GetUrlSubmissionQuota?siteUrl=${encodeURIComponent(this.siteUrl)}`,
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`
          }
        }
      );

      return response.data;
    } catch (error) {
      console.error('❌ Failed to get Bing quota:', error.response?.data || error.message);
      throw error;
    }
  }
}

module.exports = BingWebmasterAPI;

// Example usage
if (require.main === module) {
  async function example() {
    const bingAPI = new BingWebmasterAPI();
    
    try {
      // Check quota first
      const quota = await bingAPI.getQuota();
      console.log('Bing quota:', quota);

      // Submit new URLs
      const newUrls = [
        '/blog/ai-development-guide-2025',
        '/blog/css-mastery-guide-2025',
        '/blog/data-transformation-guide-2025'
      ];

      const results = await bingAPI.submitMultipleUrls(newUrls);
      console.log('Submission results:', results);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  example();
}
