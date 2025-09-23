import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Container
} from '@mui/material';
import Link from 'next/link';
import SEO from '../../components/SEO';

const blogPosts = [
  {
    title: "AI in Development: Complete Guide to Prompt Engineering and Token Optimization",
    excerpt: "Master AI integration in development workflows. Learn prompt engineering, token optimization, cost management, and best practices for ChatGPT, Claude, and Gemini integration.",
    slug: "ai-development-guide-2025",
    category: "AI Development",
    readTime: "12 min read",
    keywords: ["ai development", "prompt engineering", "token optimization", "chatgpt development"]
  },
  {
    title: "CSS Mastery: Units, Flexbox, Grid, and Modern Styling Techniques",
    excerpt: "Master modern CSS with comprehensive guide to units, flexbox, grid, responsive design, and optimization techniques. Learn CSS best practices for 2025.",
    slug: "css-mastery-guide-2025",
    category: "CSS Development",
    readTime: "14 min read",
    keywords: ["css mastery", "css units", "flexbox guide", "css grid"]
  },
  {
    title: "Data Transformation Guide: CSV, JSON, XML Conversion Best Practices",
    excerpt: "Master data transformation between CSV, JSON, and XML formats. Learn conversion best practices, data validation, API integration, and optimization techniques.",
    slug: "data-transformation-guide-2025",
    category: "Data Processing",
    readTime: "11 min read",
    keywords: ["data transformation", "csv to json", "json to xml", "data conversion"]
  },
  {
    title: "Web Security Essentials: UUID Generation, Hash Functions, and Password Management",
    excerpt: "Master web security fundamentals: UUID generation for unique identifiers, cryptographic hash functions, secure password management, and authentication best practices.",
    slug: "web-security-essentials-2025",
    category: "Security",
    readTime: "13 min read",
    keywords: ["web security", "uuid generation", "hash functions", "password security"]
  },
  {
    title: "Image Optimization and Performance: Modern Web Development Guide",
    excerpt: "Master image optimization for web performance: format selection, compression techniques, responsive images, lazy loading, and modern formats like WebP and AVIF.",
    slug: "image-optimization-guide-2025",
    category: "Performance",
    readTime: "10 min read",
    keywords: ["image optimization", "web performance", "webp format", "avif compression"]
  },
  {
    title: "Time Zone Management and Scheduling for Global Development Teams",
    excerpt: "Master time zone management for global teams: UTC best practices, scheduling coordination, timestamp handling, cron jobs, and world clock implementation.",
    slug: "timezone-management-guide-2025",
    category: "Team Management",
    readTime: "9 min read",
    keywords: ["timezone management", "global teams", "utc timestamps", "world clock"]
  },
  {
    title: "Complete Guide to JSON Formatting and Validation in 2025",
    excerpt: "Master JSON formatting with our comprehensive guide. Learn best practices, common errors, and advanced validation techniques for modern web development.",
    slug: "json-formatting-guide-2025",
    category: "Web Development",
    readTime: "8 min read",
    keywords: ["json formatting", "json validation", "web development", "api design"]
  },
  {
    title: "Base64 Encoding Explained: When and How to Use It",
    excerpt: "Understanding Base64 encoding and decoding. Learn when to use Base64, security considerations, and practical examples for web developers.",
    slug: "base64-encoding-explained",
    category: "Security",
    readTime: "6 min read",
    keywords: ["base64 encoding", "data encoding", "web security", "http headers"]
  },
  {
    title: "JWT Tokens: Security Best Practices and Common Vulnerabilities",
    excerpt: "Comprehensive guide to JWT token security. Learn about common vulnerabilities, best practices, and how to implement secure JWT authentication.",
    slug: "jwt-security-best-practices",
    category: "Security",
    readTime: "12 min read",
    keywords: ["jwt security", "token authentication", "web security", "oauth"]
  },
  {
    title: "Regular Expressions Mastery: From Beginner to Expert",
    excerpt: "Master regular expressions with practical examples. Learn regex patterns, performance optimization, and advanced techniques for text processing.",
    slug: "regex-mastery-guide",
    category: "Programming",
    readTime: "15 min read",
    keywords: ["regular expressions", "regex patterns", "text processing", "programming"]
  },
  {
    title: "Developer Productivity: Essential Online Tools Every Programmer Needs",
    excerpt: "Boost your development productivity with these essential online tools. From code formatters to converters, discover tools that save time and reduce errors.",
    slug: "essential-developer-tools-2025",
    category: "Productivity",
    readTime: "10 min read",
    keywords: ["developer tools", "productivity", "programming tools", "web development"]
  },
  {
    title: "Hash Functions in Web Development: MD5, SHA-1, SHA-256 Comparison",
    excerpt: "Complete comparison of hash functions for web developers. Learn when to use MD5, SHA-1, SHA-256, and SHA-512, plus security considerations.",
    slug: "hash-functions-comparison",
    category: "Security",
    readTime: "9 min read",
    keywords: ["hash functions", "md5", "sha256", "cryptography", "web security"]
  }
];

export default function BlogIndex() {
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Developer Tools Blog",
    "description": "Expert guides, tutorials, and best practices for web developers. Learn AI development, CSS mastery, data transformation, web security, image optimization, timezone management, and essential development tools.",
    "url": "https://app4a.github.io/devtools/blog",
    "publisher": {
      "@type": "Organization",
      "name": "Developer Tools",
      "url": "https://app4a.github.io/devtools"
    },
    "blogPost": blogPosts.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "url": `https://app4a.github.io/devtools/blog/${post.slug}`,
      "datePublished": "2024-01-01",
      "author": {
        "@type": "Organization",
        "name": "Developer Tools Team"
      }
    }))
  };

  return (
    <Container maxWidth="lg">
      <SEO
        title="Developer Tools Blog - Guides, Tutorials & Best Practices"
        description="Expert guides and tutorials for web developers. Learn AI development, CSS mastery, data transformation, web security, image optimization, timezone management, and essential development tools."
        canonical="/blog"
        schema={blogSchema}
        keywords={[
          'developer blog',
          'web development tutorials',
          'programming guides',
          'ai development guide',
          'css mastery',
          'data transformation',
          'web security essentials',
          'image optimization',
          'timezone management',
          'json tutorial',
          'base64 guide',
          'jwt security',
          'regex tutorial',
          'development best practices'
        ]}
      />
      
      <Box sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Developer Tools Blog
        </Typography>
        <Typography variant="h6" component="h2" align="center" color="text.secondary" sx={{ mb: 6 }}>
          Expert guides, tutorials, and best practices for modern web development
        </Typography>

        <Grid container spacing={4}>
          {blogPosts.map((post, index) => (
            <Grid size={{ xs: 12, md: 6, lg: 4 }} key={index}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ mb: 2 }}>
                    <Chip 
                      label={post.category} 
                      size="small" 
                      color="primary" 
                      sx={{ mr: 1 }}
                    />
                    <Chip 
                      label={post.readTime} 
                      size="small" 
                      variant="outlined"
                    />
                  </Box>
                  <Typography variant="h5" component="h3" gutterBottom>
                    {post.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {post.excerpt}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Link href={`/blog/${post.slug}`} passHref>
                    <Button size="small" color="primary">
                      Read More
                    </Button>
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Why Choose Our Developer Tools?
          </Typography>
          <Grid container spacing={3} sx={{ mt: 2 }}>
            <Grid size={{ xs: 12, md: 3 }}>
              <Typography variant="h6" gutterBottom>🔒 Privacy First</Typography>
              <Typography variant="body2">All processing happens locally in your browser. Your data never leaves your device.</Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <Typography variant="h6" gutterBottom>⚡ Lightning Fast</Typography>
              <Typography variant="body2">Optimized for speed with instant results. No waiting, no delays, just productivity.</Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <Typography variant="h6" gutterBottom>🆓 Always Free</Typography>
              <Typography variant="body2">No registration required, no usage limits. Access all tools completely free forever.</Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <Typography variant="h6" gutterBottom>📱 Mobile Ready</Typography>
              <Typography variant="body2">Responsive design works perfectly on desktop, tablet, and mobile devices.</Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
