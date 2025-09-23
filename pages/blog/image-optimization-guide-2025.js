import React from 'react';
import {
  Box,
  Typography,
  Container,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  Alert,
  Chip,
  Grid,
  Card,
  CardContent,
  Button
} from '@mui/material';
import Link from 'next/link';
import SEO from '../../components/SEO';

export default function ImageOptimizationGuide2025() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Image Optimization and Performance: Modern Web Development Guide",
    "description": "Master image optimization for web performance: format selection, compression techniques, responsive images, lazy loading, and modern formats like WebP and AVIF.",
    "image": "https://app4a.github.io/devtools/logo512.png",
    "author": {
      "@type": "Organization",
      "name": "Developer Tools Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Developer Tools",
      "logo": {
        "@type": "ImageObject",
        "url": "https://app4a.github.io/devtools/logo512.png"
      }
    },
    "datePublished": "2025-09-23",
    "dateModified": "2025-09-23",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://app4a.github.io/devtools/blog/image-optimization-guide-2025"
    }
  };

  return (
    <Container maxWidth="md">
      <SEO
        title="Image Optimization and Performance: Modern Web Development Guide"
        description="Master image optimization for web performance: format selection, compression techniques, responsive images, lazy loading, and modern formats like WebP and AVIF."
        canonical="/blog/image-optimization-guide-2025"
        schema={articleSchema}
        keywords={[
          'image optimization',
          'web performance',
          'webp format',
          'avif compression',
          'responsive images',
          'lazy loading',
          'image formats',
          'compression techniques'
        ]}
      />
      
      <Box sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Image Optimization and Performance: Modern Web Development Guide
        </Typography>
        
        <Box sx={{ mb: 3, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Chip label="Performance" color="primary" />
          <Chip label="10 min read" variant="outlined" />
          <Chip label="2025 Guide" color="secondary" />
        </Box>

        <Typography variant="h6" color="text.secondary" paragraph>
          Master image optimization for superior web performance. Learn format selection, compression techniques, 
          responsive images, lazy loading, and modern formats like WebP and AVIF for faster loading websites.
        </Typography>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h4" component="h2" gutterBottom>
          Table of Contents
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="1. The Impact of Images on Web Performance" />
          </ListItem>
          <ListItem>
            <ListItemText primary="2. Image Formats: Choosing the Right Format" />
          </ListItem>
          <ListItem>
            <ListItemText primary="3. Compression Techniques and Quality Settings" />
          </ListItem>
          <ListItem>
            <ListItemText primary="4. Responsive Images and Device Optimization" />
          </ListItem>
          <ListItem>
            <ListItemText primary="5. Modern Loading Strategies" />
          </ListItem>
          <ListItem>
            <ListItemText primary="6. Implementation Best Practices" />
          </ListItem>
        </List>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h4" component="h2" gutterBottom>
          1. The Impact of Images on Web Performance
        </Typography>
        
        <Typography paragraph>
          Images typically account for 60-70% of a webpage's total size. Proper optimization can dramatically 
          improve loading times, user experience, and search engine rankings.
        </Typography>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom color="error">📈 Poor Image Optimization</Typography>
                <List dense>
                  <ListItem><ListItemText primary="• Slow page loading (3+ seconds)" /></ListItem>
                  <ListItem><ListItemText primary="• High bounce rates (53% mobile)" /></ListItem>
                  <ListItem><ListItemText primary="• Increased server costs" /></ListItem>
                  <ListItem><ListItemText primary="• Poor SEO rankings" /></ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom color="success.main">🚀 Optimized Images</Typography>
                <List dense>
                  <ListItem><ListItemText primary="• Fast loading (<2 seconds)" /></ListItem>
                  <ListItem><ListItemText primary="• Better user engagement" /></ListItem>
                  <ListItem><ListItemText primary="• Lower bandwidth costs" /></ListItem>
                  <ListItem><ListItemText primary="• Improved search rankings" /></ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Paper sx={{ p: 3, mb: 3, backgroundColor: 'action.hover' }}>
          <Typography variant="h6" gutterBottom>Performance Impact Statistics:</Typography>
          <List>
            <ListItem><ListItemText primary="📊 40% of users abandon sites that take >3 seconds to load" /></ListItem>
            <ListItem><ListItemText primary="⚡ 1-second delay reduces conversions by 7%" /></ListItem>
            <ListItem><ListItemText primary="📱 Mobile users expect <2-second load times" /></ListItem>
            <ListItem><ListItemText primary="🔍 Page speed is a Google ranking factor" /></ListItem>
          </List>
        </Paper>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 6 }}>
          2. Image Formats: Choosing the Right Format
        </Typography>

        <Typography paragraph>
          Different image formats excel in different scenarios. Understanding when to use each format 
          is crucial for optimal performance and quality.
        </Typography>

        <Typography variant="h5" component="h3" gutterBottom>
          Format Comparison and Use Cases:
        </Typography>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>JPEG (.jpg)</Typography>
                <Typography variant="body2" paragraph>
                  <strong>Best for:</strong> Photos, complex images with many colors
                </Typography>
                <Typography variant="body2" paragraph>
                  <strong>Compression:</strong> Lossy, adjustable quality
                </Typography>
                <Typography variant="body2" paragraph>
                  <strong>File size:</strong> Small to medium
                </Typography>
                <Typography variant="body2">
                  <strong>Browser support:</strong> Universal
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>PNG (.png)</Typography>
                <Typography variant="body2" paragraph>
                  <strong>Best for:</strong> Graphics, logos, images with transparency
                </Typography>
                <Typography variant="body2" paragraph>
                  <strong>Compression:</strong> Lossless
                </Typography>
                <Typography variant="body2" paragraph>
                  <strong>File size:</strong> Large
                </Typography>
                <Typography variant="body2">
                  <strong>Browser support:</strong> Universal
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>WebP (.webp)</Typography>
                <Typography variant="body2" paragraph>
                  <strong>Best for:</strong> All images, 25-50% smaller than JPEG/PNG
                </Typography>
                <Typography variant="body2" paragraph>
                  <strong>Compression:</strong> Lossy and lossless options
                </Typography>
                <Typography variant="body2" paragraph>
                  <strong>File size:</strong> Small
                </Typography>
                <Typography variant="body2">
                  <strong>Browser support:</strong> 95%+ (needs fallback)
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>AVIF (.avif)</Typography>
                <Typography variant="body2" paragraph>
                  <strong>Best for:</strong> Next-gen format, 50% smaller than JPEG
                </Typography>
                <Typography variant="body2" paragraph>
                  <strong>Compression:</strong> Superior lossy and lossless
                </Typography>
                <Typography variant="body2" paragraph>
                  <strong>File size:</strong> Very small
                </Typography>
                <Typography variant="body2">
                  <strong>Browser support:</strong> 85%+ (needs fallback)
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Paper sx={{ p: 3, mb: 3, backgroundColor: 'action.hover' }}>
          <Typography variant="h6" gutterBottom>Format Selection Decision Tree:</Typography>
          <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
{`Need transparency?
├─ Yes → WebP (with PNG fallback) or PNG
└─ No → Photography?
    ├─ Yes → AVIF > WebP > JPEG
    └─ No → Logo/Graphics?
        ├─ Yes → SVG (vector) or WebP > PNG
        └─ No → WebP > JPEG`}
          </Typography>
        </Paper>

        <Alert severity="success" sx={{ my: 3 }}>
          <Typography variant="body2">
            <strong>🖼️ Image Optimizer:</strong> Use our{' '}
            <Link href="/image-optimizer" passHref>
              <Button variant="text" color="primary" sx={{ p: 0, textTransform: 'none' }}>
                Image Optimizer & Converter
              </Button>
            </Link>{' '}
            to convert and optimize images in multiple formats.
          </Typography>
        </Alert>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 6 }}>
          3. Compression Techniques and Quality Settings
        </Typography>

        <Typography paragraph>
          Finding the right balance between file size and visual quality is key to effective image optimization. 
          Different compression levels work better for different types of content.
        </Typography>

        <Typography variant="h5" component="h3" gutterBottom>
          Quality Setting Guidelines:
        </Typography>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>High Quality (90-100%)</Typography>
                <Typography variant="body2" paragraph>
                  <strong>Use for:</strong> Hero images, product photos, portfolios
                </Typography>
                <Typography variant="body2">
                  <strong>Trade-off:</strong> Larger files, pristine quality
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Medium Quality (70-85%)</Typography>
                <Typography variant="body2" paragraph>
                  <strong>Use for:</strong> General website images, thumbnails
                </Typography>
                <Typography variant="body2">
                  <strong>Trade-off:</strong> Good balance of size and quality
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Lower Quality (50-70%)</Typography>
                <Typography variant="body2" paragraph>
                  <strong>Use for:</strong> Background images, decorative elements
                </Typography>
                <Typography variant="body2">
                  <strong>Trade-off:</strong> Small files, visible quality loss
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Typography variant="h5" component="h3" gutterBottom>
          Advanced Compression Techniques:
        </Typography>

        <List>
          <ListItem>
            <ListItemText 
              primary="Progressive JPEG" 
              secondary="Load images progressively for perceived faster loading"
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Adaptive Quality" 
              secondary="Use different quality settings for different image regions"
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Color Palette Optimization" 
              secondary="Reduce color count for graphics and illustrations"
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Metadata Removal" 
              secondary="Strip EXIF data and other metadata to reduce file size"
            />
          </ListItem>
        </List>

        <Paper sx={{ p: 3, mb: 3, backgroundColor: 'action.hover' }}>
          <Typography variant="h6" gutterBottom>Compression Best Practices:</Typography>
          <List>
            <ListItem><ListItemText primary="🎯 Aim for <100KB for above-the-fold images" /></ListItem>
            <ListItem><ListItemText primary="📏 Use appropriate dimensions (don't scale with CSS)" /></ListItem>
            <ListItem><ListItemText primary="🧪 Test different quality settings visually" /></ListItem>
            <ListItem><ListItemText primary="🔄 Automate compression in your build process" /></ListItem>
          </List>
        </Paper>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 6 }}>
          4. Responsive Images and Device Optimization
        </Typography>

        <Typography paragraph>
          Responsive images ensure users receive appropriately sized images for their device and viewport, 
          reducing unnecessary data transfer and improving performance.
        </Typography>

        <Typography variant="h5" component="h3" gutterBottom>
          Responsive Image Techniques:
        </Typography>

        <Paper sx={{ p: 3, mb: 3, backgroundColor: 'action.hover' }}>
          <Typography variant="h6" gutterBottom>srcset and sizes Attributes:</Typography>
          <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
{`<img 
  src="image-800w.jpg" 
  srcset="
    image-400w.jpg 400w,
    image-800w.jpg 800w,
    image-1200w.jpg 1200w
  "
  sizes="
    (max-width: 600px) 400px,
    (max-width: 1000px) 800px,
    1200px
  "
  alt="Responsive image example"
/>`}
          </Typography>
        </Paper>

        <Typography variant="h5" component="h3" gutterBottom>
          Picture Element for Art Direction:
        </Typography>

        <Paper sx={{ p: 3, mb: 3, backgroundColor: 'action.hover' }}>
          <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
{`<picture>
  <source 
    media="(max-width: 600px)" 
    srcset="hero-mobile.webp" 
    type="image/webp"
  />
  <source 
    media="(max-width: 600px)" 
    srcset="hero-mobile.jpg"
  />
  <source 
    srcset="hero-desktop.webp" 
    type="image/webp"
  />
  <img 
    src="hero-desktop.jpg" 
    alt="Hero image"
  />
</picture>`}
          </Typography>
        </Paper>

        <Typography variant="h5" component="h3" gutterBottom>
          Device-Specific Optimization:
        </Typography>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>📱 Mobile Optimization</Typography>
                <List dense>
                  <ListItem><ListItemText primary="• Smaller file sizes (30-50KB)" /></ListItem>
                  <ListItem><ListItemText primary="• Lower resolution for small screens" /></ListItem>
                  <ListItem><ListItemText primary="• Consider data usage" /></ListItem>
                  <ListItem><ListItemText primary="• Optimize for touch interactions" /></ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>🖥️ Desktop Optimization</Typography>
                <List dense>
                  <ListItem><ListItemText primary="• Higher quality images" /></ListItem>
                  <ListItem><ListItemText primary="• Retina display support (2x)" /></ListItem>
                  <ListItem><ListItemText primary="• Faster connection assumptions" /></ListItem>
                  <ListItem><ListItemText primary="• Larger viewport considerations" /></ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 6 }}>
          5. Modern Loading Strategies
        </Typography>

        <Typography paragraph>
          Strategic loading techniques can dramatically improve perceived performance and user experience 
          by prioritizing critical images and deferring non-essential ones.
        </Typography>

        <Typography variant="h5" component="h3" gutterBottom>
          Lazy Loading Implementation:
        </Typography>

        <Paper sx={{ p: 3, mb: 3, backgroundColor: 'action.hover' }}>
          <Typography variant="h6" gutterBottom>Native Lazy Loading:</Typography>
          <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
{`<!-- Lazy load images below the fold -->
<img src="image.jpg" loading="lazy" alt="Lazy loaded image" />

<!-- Eager load critical images -->
<img src="hero.jpg" loading="eager" alt="Hero image" />

<!-- Auto (browser decides) -->
<img src="content.jpg" loading="auto" alt="Content image" />`}
          </Typography>
        </Paper>

        <Typography variant="h5" component="h3" gutterBottom>
          Advanced Loading Techniques:
        </Typography>

        <List>
          <ListItem>
            <ListItemText 
              primary="Intersection Observer API" 
              secondary="More control over when images load with custom thresholds"
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Progressive Image Loading" 
              secondary="Load low-quality placeholders first, then high-quality versions"
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Blur-to-Sharp Transition" 
              secondary="Smooth visual transition from placeholder to final image"
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Critical Resource Hints" 
              secondary="Use preload, prefetch, and dns-prefetch for optimization"
            />
          </ListItem>
        </List>

        <Paper sx={{ p: 3, mb: 3, backgroundColor: 'action.hover' }}>
          <Typography variant="h6" gutterBottom>Resource Hints Example:</Typography>
          <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
{`<!-- Preload critical hero image -->
<link rel="preload" as="image" href="hero.webp" />

<!-- Prefetch likely next page images -->
<link rel="prefetch" as="image" href="next-page-hero.webp" />

<!-- DNS prefetch for image CDN -->
<link rel="dns-prefetch" href="//cdn.example.com" />`}
          </Typography>
        </Paper>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 6 }}>
          6. Implementation Best Practices
        </Typography>

        <Typography variant="h5" component="h3" gutterBottom>
          CDN and Delivery Optimization:
        </Typography>

        <List>
          <ListItem>
            <ListItemText 
              primary="Use Image CDNs" 
              secondary="Cloudinary, ImageKit, or Fastly for automatic optimization"
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Enable Compression" 
              secondary="Gzip/Brotli for text-based formats (SVG)"
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Set Proper Cache Headers" 
              secondary="Long cache times with versioning for immutable images"
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Geographic Distribution" 
              secondary="Serve images from edge locations closest to users"
            />
          </ListItem>
        </List>

        <Typography variant="h5" component="h3" gutterBottom>
          Automated Optimization Workflow:
        </Typography>

        <Paper sx={{ p: 3, mb: 3, backgroundColor: 'action.hover' }}>
          <Typography variant="h6" gutterBottom>Build Process Integration:</Typography>
          <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
{`// webpack.config.js example
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: { progressive: true, quality: 80 },
              pngquant: { quality: [0.65, 0.90], speed: 4 },
              webp: { quality: 75 }
            }
          }
        ]
      }
    ]
  }
};`}
          </Typography>
        </Paper>

        <Typography variant="h5" component="h3" gutterBottom>
          Performance Monitoring:
        </Typography>

        <List>
          <ListItem>
            <ListItemText 
              primary="Core Web Vitals" 
              secondary="Monitor LCP (Largest Contentful Paint) for image loading"
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Real User Monitoring" 
              secondary="Track actual user experience with image loading"
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Lighthouse Audits" 
              secondary="Regular performance audits for optimization opportunities"
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Bundle Analysis" 
              secondary="Monitor image contributions to bundle size"
            />
          </ListItem>
        </List>

        <Alert severity="warning" sx={{ my: 3 }}>
          <Typography variant="h6">Accessibility Considerations</Typography>
          <Typography variant="body2">
            Always provide meaningful alt text for images. Use empty alt="" for decorative images. 
            Consider users with slow connections and screen readers.
          </Typography>
        </Alert>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 6 }}>
          Conclusion
        </Typography>

        <Typography paragraph>
          Image optimization is crucial for web performance and user experience. Start with format selection, 
          implement responsive images, use modern loading strategies, and automate your optimization workflow.
        </Typography>

        <Typography paragraph>
          Focus on the user experience: fast loading, appropriate quality, and accessibility. The investment 
          in proper image optimization pays dividends in user engagement, conversions, and search rankings.
        </Typography>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h5" component="h3" gutterBottom>
          Related Tools & Resources
        </Typography>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <Link href="/image-optimizer" passHref>
                    <Button color="primary" sx={{ textTransform: 'none' }}>
                      Image Optimizer & Converter →
                    </Button>
                  </Link>
                </Typography>
                <Typography variant="body2">
                  Optimize and convert images to modern formats
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <Link href="/css-units" passHref>
                    <Button color="primary" sx={{ textTransform: 'none' }}>
                      CSS Unit Converter →
                    </Button>
                  </Link>
                </Typography>
                <Typography variant="body2">
                  Convert units for responsive image sizing
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <Link href="/color" passHref>
                    <Button color="primary" sx={{ textTransform: 'none' }}>
                      Color Converter →
                    </Button>
                  </Link>
                </Typography>
                <Typography variant="body2">
                  Work with image colors and palettes
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <Link href="/blog" passHref>
                    <Button color="primary" sx={{ textTransform: 'none' }}>
                      More Performance Guides →
                    </Button>
                  </Link>
                </Typography>
                <Typography variant="body2">
                  Explore more web performance tutorials
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}