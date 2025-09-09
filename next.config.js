/** @type {import('next').NextConfig} */

// Determine if we're building for GitHub Pages
const isGithubPages = process.env.GITHUB_PAGES === 'true';
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] || 'developer-tools';

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['react-syntax-highlighter'],
  output: 'export',
  
  // GitHub Pages configuration
  ...(isGithubPages && {
    basePath: `/${repoName}`,
    assetPrefix: `/${repoName}/`,
  }),
  
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
  
  // Trailing slash for better GitHub Pages compatibility
  trailingSlash: true,
  
  // Performance optimizations
  compress: true,
  generateEtags: false,
  poweredByHeader: false,
  
  // Image optimization (disabled for static export)
  images: {
    unoptimized: true,
  },
  
  // Experimental features for better performance
  experimental: {
    // optimizeCss: true, // Disabled due to critters compatibility issues
    optimizePackageImports: ['@mui/material', '@mui/icons-material'],
  },
  
  // Bundle analyzer (uncomment for analysis)
  // bundleAnalyzer: {
  //   enabled: process.env.ANALYZE === 'true',
  // },
  
  // Webpack optimizations
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Optimize bundle size
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          vendor: {
            name: 'vendor',
            chunks: 'all',
            test: /node_modules/,
            priority: 20
          },
          mui: {
            name: 'mui',
            chunks: 'all',
            test: /[\\/]node_modules[\\/]@mui[\\/]/,
            priority: 30
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 10,
            reuseExistingChunk: true,
            enforce: true
          }
        }
      };
    }
    
    return config;
  },
  
  // Note: Headers are not supported with output: 'export'
  // Security headers should be configured at the hosting level (Vercel, Netlify, etc.)
};

module.exports = nextConfig;