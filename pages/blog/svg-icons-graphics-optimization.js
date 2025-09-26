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
  Card,
  CardContent,
  Grid
} from '@mui/material';
import Link from 'next/link';
import SEO from '../../components/SEO';

export default function SvgIconsGraphicsOptimization() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "SVG Icons and Graphics Optimization: Complete Design Guide for Modern Web Applications",
    "description": "Master SVG icon creation, optimization techniques, and graphics performance for web applications. Learn best practices for scalable vector graphics, icon libraries, and performance optimization.",
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
    "datePublished": "2025-09-25",
    "dateModified": "2025-09-25",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://app4a.github.io/devtools/blog/svg-icons-graphics-optimization"
    }
  };

  return (
    <Container maxWidth="md">
      <SEO
        title="SVG Icons and Graphics Optimization: Complete Design Guide for Modern Web Applications"
        description="Master SVG icon creation, optimization techniques, and graphics performance for web applications. Learn best practices for scalable vector graphics, icon libraries, and performance optimization."
        canonical="/blog/svg-icons-graphics-optimization"
        schema={articleSchema}
        keywords={[
          'svg icons',
          'graphics optimization',
          'scalable vector graphics',
          'icon design',
          'web performance',
          'svg optimization',
          'icon libraries',
          'react icons',
          'vue icons',
          'svg sprites'
        ]}
      />
      
      <Box sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Chip label="Design" color="primary" sx={{ mr: 1, mb: 2 }} />
          <Chip label="15 min read" variant="outlined" sx={{ mb: 2 }} />
        </Box>

        <Typography variant="h3" component="h1" gutterBottom>
          SVG Icons and Graphics Optimization
        </Typography>
        
        <Typography variant="h6" component="h2" color="text.secondary" gutterBottom sx={{ mb: 4 }}>
          Complete guide to creating, optimizing, and implementing scalable vector graphics for modern web applications
        </Typography>

        <Typography variant="body1" paragraph>
          SVG (Scalable Vector Graphics) icons have become the standard for modern web applications. They offer crisp rendering at any size, small file sizes, and unlimited styling possibilities through CSS. Whether you're building a design system, creating custom icons, or optimizing existing graphics, understanding SVG best practices is essential for performance and user experience.
        </Typography>

        <Typography variant="body1" paragraph>
          This comprehensive guide covers everything from SVG fundamentals to advanced optimization techniques, helping you create lightning-fast, beautiful graphics that scale perfectly across all devices and screen densities.
        </Typography>

        <Alert severity="info" sx={{ mb: 4 }}>
          <Typography variant="body2">
            <strong>Pro Tip:</strong> Use our <Link href="/svg-icon-generator" style={{ color: 'inherit', textDecoration: 'underline' }}>SVG Icon Generator</Link> to create and edit SVG icons with a visual editor, built-in icon library, and export to React/Vue components.
          </Typography>
        </Alert>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
          Table of Contents
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="1. SVG Fundamentals and Advantages" />
          </ListItem>
          <ListItem>
            <ListItemText primary="2. Creating SVG Icons" />
          </ListItem>
          <ListItem>
            <ListItemText primary="3. SVG Optimization Techniques" />
          </ListItem>
          <ListItem>
            <ListItemText primary="4. Implementation Strategies" />
          </ListItem>
          <ListItem>
            <ListItemText primary="5. Icon Libraries and Design Systems" />
          </ListItem>
          <ListItem>
            <ListItemText primary="6. Performance Best Practices" />
          </ListItem>
          <ListItem>
            <ListItemText primary="7. Accessibility and User Experience" />
          </ListItem>
          <ListItem>
            <ListItemText primary="8. Advanced Techniques and Animations" />
          </ListItem>
        </List>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
          1. SVG Fundamentals and Advantages
        </Typography>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          Why Choose SVG Over Other Formats?
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ height: '100%', backgroundColor: 'success.light', color: 'success.contrastText' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  ✅ SVG Advantages
                </Typography>
                <Typography variant="body2">
                  • Infinite scalability<br/>
                  • Small file sizes<br/>
                  • CSS styling support<br/>
                  • Interactive elements<br/>
                  • SEO-friendly text<br/>
                  • Animation capabilities
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ height: '100%', backgroundColor: 'warning.light', color: 'warning.contrastText' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  ⚠️ When to Use PNG/WebP
                </Typography>
                <Typography variant="body2">
                  • Complex photographs<br/>
                  • Very detailed illustrations<br/>
                  • Legacy browser support<br/>
                  • Large complex graphics<br/>
                  • When SVG file size exceeds raster
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          SVG Structure Basics
        </Typography>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
{`<!-- Basic SVG structure -->
<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <!-- Shapes and paths go here -->
  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
</svg>

<!-- Key attributes explained -->
<!-- width/height: Display dimensions -->
<!-- viewBox: Coordinate system (x y width height) -->
<!-- xmlns: SVG namespace declaration -->
<!-- path d: Drawing commands using SVG path syntax -->`}
          </Typography>
        </Paper>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
          2. Creating SVG Icons
        </Typography>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          Design Principles for Icons
        </Typography>
        <List>
          <ListItem>
            <ListItemText 
              primary="Grid-based Design" 
              secondary="Use consistent grid (8px, 16px, 24px) for alignment and proportion" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Consistent Stroke Width" 
              secondary="Maintain uniform line weights across icon sets (1px, 2px, etc.)" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Optical Alignment" 
              secondary="Adjust mathematically centered icons for visual balance" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Scalability Consideration" 
              secondary="Ensure icons remain clear at 16px and large sizes" 
            />
          </ListItem>
        </List>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          SVG Path Commands
        </Typography>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
{`<!-- Essential SVG path commands -->
M x y     - Move to absolute position
L x y     - Line to absolute position
H x       - Horizontal line to x
V y       - Vertical line to y
C x1 y1 x2 y2 x y - Cubic Bezier curve
Q x1 y1 x y       - Quadratic Bezier curve
A rx ry rotation large-arc sweep x y - Arc
Z         - Close path

<!-- Example: Simple arrow icon -->
<path d="M8 5l5 7-5 7V5z"/>

<!-- Example: More complex heart icon -->
<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>`}
          </Typography>
        </Paper>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          Icon Creation Workflow
        </Typography>
        <List>
          <ListItem>
            <ListItemText 
              primary="1. Sketch and Plan" 
              secondary="Start with paper sketches or design tools like Figma/Sketch" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="2. Create Vector Paths" 
              secondary="Use design tools or hand-code simple shapes" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="3. Optimize Paths" 
              secondary="Simplify curves and remove unnecessary points" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="4. Test Scalability" 
              secondary="Check appearance at different sizes (16px to 64px)" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="5. Optimize File Size" 
              secondary="Use optimization tools to reduce file size" 
            />
          </ListItem>
        </List>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
          3. SVG Optimization Techniques
        </Typography>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          Manual Optimization
        </Typography>
        <Typography variant="body1" paragraph>
          Before using automated tools, apply these manual optimization techniques:
        </Typography>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
{`<!-- Before optimization (verbose) -->
<svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <g fill="none" stroke="currentColor" stroke-width="2">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="8" x2="12" y2="16"></line>
    <line x1="8" y1="12" x2="16" y2="12"></line>
  </g>
</svg>

<!-- After optimization (clean) -->
<svg viewBox="0 0 24 24" fill="currentColor">
  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
</svg>`}
          </Typography>
        </Paper>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          Automated Optimization Tools
        </Typography>
        <List>
          <ListItem>
            <ListItemText 
              primary="SVGO" 
              secondary="Command-line tool for SVG optimization with customizable plugins" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="SVG OMG" 
              secondary="Web-based interface for SVGO with real-time preview" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="ImageOptim" 
              secondary="Mac app with SVG optimization capabilities" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Build Tools" 
              secondary="Webpack, Vite, or Rollup plugins for automatic optimization" 
            />
          </ListItem>
        </List>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          File Size Reduction Techniques
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom color="primary">
                  Remove Unnecessary Elements
                </Typography>
                <Typography variant="body2">
                  • Metadata and comments<br/>
                  • Hidden layers<br/>
                  • Unused definitions<br/>
                  • Default attributes<br/>
                  • Empty groups
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom color="secondary">
                  Optimize Paths
                </Typography>
                <Typography variant="body2">
                  • Simplify complex curves<br/>
                  • Remove redundant points<br/>
                  • Use relative commands<br/>
                  • Combine similar paths<br/>
                  • Round coordinate values
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
          4. Implementation Strategies
        </Typography>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          Inline SVG
        </Typography>
        <Typography variant="body1" paragraph>
          Best for icons that need styling, interactivity, or animation:
        </Typography>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
{`<!-- Inline SVG with CSS styling -->
<svg class="icon icon-heart" viewBox="0 0 24 24">
  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5..."/>
</svg>

<style>
.icon {
  width: 24px;
  height: 24px;
  fill: currentColor;
}

.icon-heart:hover {
  fill: red;
  transform: scale(1.1);
  transition: all 0.3s ease;
}
</style>`}
          </Typography>
        </Paper>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          SVG Sprites
        </Typography>
        <Typography variant="body1" paragraph>
          Efficient for large icon sets with reduced HTTP requests:
        </Typography>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
{`<!-- SVG sprite definition -->
<svg style="display: none;">
  <defs>
    <symbol id="icon-home" viewBox="0 0 24 24">
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
    </symbol>
    <symbol id="icon-user" viewBox="0 0 24 24">
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
    </symbol>
  </defs>
</svg>

<!-- Using sprite icons -->
<svg class="icon">
  <use href="#icon-home"></use>
</svg>

<svg class="icon">
  <use href="#icon-user"></use>
</svg>`}
          </Typography>
        </Paper>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          React/Vue Components
        </Typography>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
{`// React SVG component
import React from 'react';

interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

export const HeartIcon: React.FC<IconProps> = ({ 
  size = 24, 
  color = 'currentColor',
  className 
}) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill={color}
    className={className}
  >
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
);

// Usage
<HeartIcon size={32} color="red" className="animated-heart" />`}
          </Typography>
        </Paper>

        <Alert severity="success" sx={{ mb: 3 }}>
          <Typography variant="body2">
            Our <Link href="/svg-icon-generator" style={{ color: 'inherit', textDecoration: 'underline' }}>SVG Icon Generator</Link> can export icons as React and Vue components with TypeScript support and customizable props.
          </Typography>
        </Alert>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
          5. Icon Libraries and Design Systems
        </Typography>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          Popular Icon Libraries
        </Typography>
        <List>
          <ListItem>
            <ListItemText 
              primary="Heroicons" 
              secondary="Beautiful hand-crafted SVG icons by Tailwind team" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Lucide" 
              secondary="Clean, consistent icon set with 1000+ icons" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Phosphor Icons" 
              secondary="Flexible icon family with multiple weights" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Tabler Icons" 
              secondary="Free SVG icons designed for web interfaces" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Feather" 
              secondary="Simply beautiful open source icons" 
            />
          </ListItem>
        </List>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          Building Custom Icon Systems
        </Typography>
        <Typography variant="body1" paragraph>
          When creating a custom icon system:
        </Typography>
        <List>
          <ListItem>
            <ListItemText 
              primary="Establish Guidelines" 
              secondary="Define grid, stroke width, corner radius, and style rules" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Create Templates" 
              secondary="Base templates for common icon categories (UI, social, etc.)" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Naming Convention" 
              secondary="Consistent naming like 'icon-category-name' or 'category/name'" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Version Control" 
              secondary="Track icon versions and maintain backwards compatibility" 
            />
          </ListItem>
        </List>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
          6. Performance Best Practices
        </Typography>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          Loading Strategies
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom color="primary">
                  Critical Icons
                </Typography>
                <Typography variant="body2">
                  Inline essential icons in HTML to prevent layout shifts and ensure immediate visibility.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom color="secondary">
                  Non-Critical Icons
                </Typography>
                <Typography variant="body2">
                  Load secondary icons asynchronously or use sprite sheets for better caching.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom color="info.main">
                  Conditional Icons
                </Typography>
                <Typography variant="body2">
                  Load icons only when needed using dynamic imports or lazy loading.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          Caching and Delivery
        </Typography>
        <List>
          <ListItem>
            <ListItemText 
              primary="HTTP Caching" 
              secondary="Set long cache headers for static SVG files" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="CDN Distribution" 
              secondary="Serve icons from CDN for global performance" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Gzip Compression" 
              secondary="SVG text compresses very well with gzip/brotli" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Bundle Optimization" 
              secondary="Tree-shake unused icons in build process" 
            />
          </ListItem>
        </List>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
          7. Accessibility and User Experience
        </Typography>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          Accessible SVG Icons
        </Typography>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
{`<!-- Decorative icon (hidden from screen readers) -->
<svg aria-hidden="true" class="icon">
  <path d="..."/>
</svg>

<!-- Meaningful icon with accessible name -->
<svg role="img" aria-labelledby="heart-title">
  <title id="heart-title">Favorite this item</title>
  <path d="..."/>
</svg>

<!-- Icon button with proper labeling -->
<button aria-label="Add to favorites">
  <svg aria-hidden="true" class="icon">
    <path d="..."/>
  </svg>
</button>

<!-- Icon with accompanying text -->
<a href="/profile">
  <svg aria-hidden="true" class="icon">
    <path d="..."/>
  </svg>
  Profile
</a>`}
          </Typography>
        </Paper>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          Color and Contrast
        </Typography>
        <List>
          <ListItem>
            <ListItemText 
              primary="Sufficient Contrast" 
              secondary="Ensure 3:1 contrast ratio for graphical elements (WCAG AA)" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Color Independence" 
              secondary="Don't rely solely on color to convey information" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Dark Mode Support" 
              secondary="Use CSS custom properties for theme-aware icons" 
            />
          </ListItem>
        </List>

        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="body2">
            Use our <Link href="/color" style={{ color: 'inherit', textDecoration: 'underline' }}>Color Converter</Link> with built-in WCAG accessibility checker to ensure your icon colors meet contrast requirements.
          </Typography>
        </Alert>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
          8. Advanced Techniques and Animations
        </Typography>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          CSS Animations
        </Typography>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
{`/* Rotating loading spinner */
.icon-spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Pulsing heart animation */
.icon-heart {
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

/* Morphing hamburger menu */
.icon-menu {
  transition: all 0.3s ease;
}

.icon-menu.open path:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.icon-menu.open path:nth-child(2) {
  opacity: 0;
}

.icon-menu.open path:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -6px);
}`}
          </Typography>
        </Paper>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          SVG Animations
        </Typography>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
{`<!-- SVG path animation -->
<svg viewBox="0 0 100 100">
  <path d="M20,50 Q50,10 80,50 Q50,90 20,50" 
        stroke="currentColor" 
        fill="none" 
        stroke-width="2">
    <animate attributeName="stroke-dasharray" 
             values="0,200;100,200;100,200" 
             dur="2s" 
             repeatCount="indefinite"/>
    <animate attributeName="stroke-dashoffset" 
             values="0;-100;-200" 
             dur="2s" 
             repeatCount="indefinite"/>
  </path>
</svg>

<!-- Color transition animation -->
<svg viewBox="0 0 24 24">
  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z">
    <animateTransform attributeName="transform" 
                      type="rotate" 
                      values="0 12 12;360 12 12" 
                      dur="3s" 
                      repeatCount="indefinite"/>
  </path>
</svg>`}
          </Typography>
        </Paper>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          Performance Considerations for Animations
        </Typography>
        <List>
          <ListItem>
            <ListItemText 
              primary="Use CSS Transform" 
              secondary="Prefer transform over changing position properties" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Will-Change Property" 
              secondary="Optimize performance for complex animations" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Respect Preferences" 
              secondary="Honor prefers-reduced-motion user preference" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Optimize Duration" 
              secondary="Keep animations brief and purposeful" 
            />
          </ListItem>
        </List>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h4" component="h2" gutterBottom>
          Conclusion
        </Typography>
        <Typography variant="body1" paragraph>
          SVG icons and graphics are essential components of modern web applications. By understanding the fundamentals, applying optimization techniques, and implementing proper accessibility practices, you can create beautiful, performant icon systems that enhance user experience across all devices and contexts.
        </Typography>

        <Typography variant="body1" paragraph>
          Remember that great icons combine technical excellence with thoughtful design. Focus on consistency, performance, and accessibility to build icon systems that not only look great but also provide exceptional user experiences.
        </Typography>

        <Alert severity="success" sx={{ mt: 4 }}>
          <Typography variant="body2">
            <strong>Start creating:</strong> Design and optimize your SVG icons with our <Link href="/svg-icon-generator" style={{ color: 'inherit', textDecoration: 'underline' }}>SVG Icon Generator</Link> and ensure perfect colors with our <Link href="/color" style={{ color: 'inherit', textDecoration: 'underline' }}>Color Converter</Link>.
          </Typography>
        </Alert>

        <Box sx={{ mt: 4, p: 3, backgroundColor: 'action.hover', borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            Related Tools
          </Typography>
          <Typography variant="body2">
            • <Link href="/svg-icon-generator">SVG Icon Generator</Link> - Create and edit SVG icons<br/>
            • <Link href="/color">Color Converter</Link> - Check accessibility and manage colors<br/>
            • <Link href="/image-optimizer">Image Optimizer</Link> - Optimize and convert graphics<br/>
            • <Link href="/base64">Base64 Encoder</Link> - Embed SVGs in CSS/HTML<br/>
            • <Link href="/css-formatter">CSS Formatter</Link> - Format and optimize CSS animations
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
