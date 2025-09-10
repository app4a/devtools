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
    title: "Complete Guide to JSON Formatting and Validation in 2024",
    excerpt: "Master JSON formatting with our comprehensive guide. Learn best practices, common errors, and advanced validation techniques for modern web development.",
    slug: "json-formatting-guide-2024",
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
    slug: "essential-developer-tools-2024",
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
    "description": "Expert guides, tutorials, and best practices for web developers. Learn about JSON, Base64, JWT, regex, and other essential development tools.",
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
        description="Expert guides and tutorials for web developers. Learn JSON formatting, Base64 encoding, JWT security, regex patterns, and essential development tools and techniques."
        canonical="/blog"
        schema={blogSchema}
        keywords={[
          'developer blog',
          'web development tutorials',
          'programming guides',
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
