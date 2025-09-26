/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

// Configuration optimized for GitHub Pages deployment

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  
  // Always use basePath for consistency between dev and production
  basePath: '/devtools',
  assetPrefix: '/devtools/',
  
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
          // Split large libraries into separate chunks
          mui: {
            name: 'mui',
            chunks: 'all',
            test: /[\\/]node_modules[\\/]@mui[\\/]/,
            priority: 40
          },
          react: {
            name: 'react',
            chunks: 'all',
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            priority: 35
          },
          markdown: {
            name: 'markdown',
            chunks: 'all',
            test: /[\\/]node_modules[\\/](react-markdown|remark|rehype|katex|highlight\.js)[\\/]/,
            priority: 30
          },
          syntax: {
            name: 'syntax',
            chunks: 'all',
            test: /[\\/]node_modules[\\/](prismjs)[\\/]/,
            priority: 25
          },
          vendor: {
            name: 'vendor',
            chunks: 'all',
            test: /node_modules/,
            priority: 20
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

module.exports = withBundleAnalyzer(nextConfig);