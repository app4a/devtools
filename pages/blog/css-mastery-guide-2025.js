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

export default function CSSMasteryGuide2025() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "CSS Mastery: Units, Flexbox, Grid, and Modern Styling Techniques",
    "description": "Master modern CSS with comprehensive guide to units, flexbox, grid, responsive design, and optimization techniques. Learn CSS best practices for 2025 web development.",
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
      "@id": "https://app4a.github.io/devtools/blog/css-mastery-guide-2025"
    }
  };

  return (
    <Container maxWidth="md">
      <SEO
        title="CSS Mastery: Units, Flexbox, Grid, and Modern Styling Techniques"
        description="Master modern CSS with comprehensive guide to units, flexbox, grid, responsive design, and optimization techniques. Learn CSS best practices for 2025 web development."
        canonical="/blog/css-mastery-guide-2025"
        schema={articleSchema}
        keywords={[
          'css mastery',
          'css units',
          'flexbox guide',
          'css grid',
          'responsive design',
          'css optimization',
          'modern css',
          'css best practices'
        ]}
      />
      
      <Box sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          CSS Mastery: Units, Flexbox, Grid, and Modern Styling Techniques
        </Typography>
        
        <Box sx={{ mb: 3, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Chip label="CSS Development" color="primary" />
          <Chip label="14 min read" variant="outlined" />
          <Chip label="2025 Guide" color="secondary" />
        </Box>

        <Typography variant="h6" color="text.secondary" paragraph>
          Master modern CSS with this comprehensive guide covering units, layout systems, responsive design, 
          and optimization techniques. Learn the latest CSS features and best practices for 2025.
        </Typography>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h4" component="h2" gutterBottom>
          Table of Contents
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="1. CSS Units: The Foundation of Design" />
          </ListItem>
          <ListItem>
            <ListItemText primary="2. Flexbox: One-Dimensional Layout Mastery" />
          </ListItem>
          <ListItem>
            <ListItemText primary="3. CSS Grid: Two-Dimensional Layout Power" />
          </ListItem>
          <ListItem>
            <ListItemText primary="4. Responsive Design with Modern CSS" />
          </ListItem>
          <ListItem>
            <ListItemText primary="5. CSS Optimization and Performance" />
          </ListItem>
          <ListItem>
            <ListItemText primary="6. Advanced CSS Techniques" />
          </ListItem>
        </List>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h4" component="h2" gutterBottom>
          1. CSS Units: The Foundation of Design
        </Typography>
        
        <Typography paragraph>
          Understanding CSS units is crucial for creating scalable, responsive designs. Different units serve 
          different purposes, and choosing the right one can make or break your layout.
        </Typography>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Absolute Units</Typography>
                <List dense>
                  <ListItem><ListItemText primary="px - Pixels (most common)" /></ListItem>
                  <ListItem><ListItemText primary="pt - Points (print media)" /></ListItem>
                  <ListItem><ListItemText primary="in - Inches" /></ListItem>
                  <ListItem><ListItemText primary="cm - Centimeters" /></ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Relative Units</Typography>
                <List dense>
                  <ListItem><ListItemText primary="% - Percentage of parent" /></ListItem>
                  <ListItem><ListItemText primary="em - Relative to font size" /></ListItem>
                  <ListItem><ListItemText primary="rem - Relative to root font" /></ListItem>
                  <ListItem><ListItemText primary="vw/vh - Viewport units" /></ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Paper sx={{ p: 3, mb: 3, backgroundColor: 'action.hover' }}>
          <Typography variant="h6" gutterBottom>Modern Unit Recommendations:</Typography>
          <List>
            <ListItem><ListItemText primary="🎯 Use rem for typography and spacing" /></ListItem>
            <ListItem><ListItemText primary="📱 Use vw/vh for responsive layouts" /></ListItem>
            <ListItem><ListItemText primary="🎨 Use % for flexible containers" /></ListItem>
            <ListItem><ListItemText primary="🔧 Use px for borders and fine details" /></ListItem>
          </List>
        </Paper>

        <Alert severity="success" sx={{ my: 3 }}>
          <Typography variant="body2">
            <strong>🔧 Unit Converter:</strong> Use our{' '}
            <Link href="/css-units" passHref>
              <Button variant="text" color="primary" sx={{ p: 0, textTransform: 'none' }}>
                CSS Unit Converter
              </Button>
            </Link>{' '}
            to convert between different CSS units and see live previews.
          </Typography>
        </Alert>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 6 }}>
          2. Flexbox: One-Dimensional Layout Mastery
        </Typography>

        <Typography paragraph>
          Flexbox revolutionized CSS layouts by providing an efficient way to arrange items in one dimension. 
          It's perfect for navigation bars, card layouts, and centering content.
        </Typography>

        <Typography variant="h5" component="h3" gutterBottom>
          Essential Flexbox Properties:
        </Typography>

        <Paper sx={{ p: 3, mb: 3, backgroundColor: 'action.hover' }}>
          <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
{`.container {
  display: flex;
  flex-direction: row; /* row | column */
  justify-content: center; /* start | end | center | space-between */
  align-items: center; /* start | end | center | stretch */
  flex-wrap: wrap; /* nowrap | wrap */
  gap: 1rem; /* Modern spacing */
}`}
          </Typography>
        </Paper>

        <Typography variant="h5" component="h3" gutterBottom>
          Flexbox Use Cases:
        </Typography>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Navigation Bars</Typography>
                <Typography variant="body2">
                  Perfect for horizontal navigation with proper spacing and alignment.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Card Layouts</Typography>
                <Typography variant="body2">
                  Create flexible card grids that adapt to content and screen size.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Centering Content</Typography>
                <Typography variant="body2">
                  The most reliable way to center content both horizontally and vertically.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 6 }}>
          3. CSS Grid: Two-Dimensional Layout Power
        </Typography>

        <Typography paragraph>
          CSS Grid provides unprecedented control over two-dimensional layouts. It's ideal for complex page 
          structures, dashboard layouts, and responsive design systems.
        </Typography>

        <Paper sx={{ p: 3, mb: 3, backgroundColor: 'action.hover' }}>
          <Typography variant="h6" gutterBottom>Basic Grid Setup:</Typography>
          <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
{`.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-template-rows: auto;
  gap: 2rem;
  grid-template-areas: 
    "header header header"
    "sidebar main aside"
    "footer footer footer";
}`}
          </Typography>
        </Paper>

        <Typography variant="h5" component="h3" gutterBottom>
          Grid vs Flexbox Decision Guide:
        </Typography>

        <List>
          <ListItem>
            <ListItemText 
              primary="Use Flexbox when:" 
              secondary="• One-dimensional layouts • Navigation bars • Simple centering • Component-level layouts"
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Use Grid when:" 
              secondary="• Two-dimensional layouts • Complex page structures • Dashboard layouts • Magazine-style designs"
            />
          </ListItem>
        </List>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 6 }}>
          4. Responsive Design with Modern CSS
        </Typography>

        <Typography paragraph>
          Modern responsive design goes beyond media queries. Container queries, fluid typography, 
          and intrinsic web design create truly adaptive layouts.
        </Typography>

        <Typography variant="h5" component="h3" gutterBottom>
          Responsive Typography:
        </Typography>

        <Paper sx={{ p: 3, mb: 3, backgroundColor: 'action.hover' }}>
          <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
{`/* Fluid typography with clamp() */
h1 {
  font-size: clamp(2rem, 5vw, 4rem);
}

/* Container queries (modern browsers) */
@container (min-width: 700px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
}`}
          </Typography>
        </Paper>

        <Typography variant="h5" component="h3" gutterBottom>
          Modern Responsive Techniques:
        </Typography>

        <List>
          <ListItem>
            <ListItemText 
              primary="Intrinsic Web Design" 
              secondary="Let content determine layout using min-content, max-content, and fit-content"
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Container Queries" 
              secondary="Style components based on their container size, not viewport size"
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Fluid Spacing" 
              secondary="Use clamp() for margins, padding, and gaps that scale smoothly"
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Logical Properties" 
              secondary="Use margin-inline, padding-block for better internationalization"
            />
          </ListItem>
        </List>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 6 }}>
          5. CSS Optimization and Performance
        </Typography>

        <Typography paragraph>
          Optimized CSS improves page load times and user experience. Focus on minimizing file size, 
          reducing specificity conflicts, and organizing code efficiently.
        </Typography>

        <Typography variant="h5" component="h3" gutterBottom>
          Performance Optimization Strategies:
        </Typography>

        <List>
          <ListItem>
            <ListItemText 
              primary="Minimize CSS File Size" 
              secondary="Remove unused styles, use shorthand properties, and minify production code"
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Optimize CSS Specificity" 
              secondary="Keep specificity low, avoid !important, use CSS methodology like BEM"
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Use Critical CSS" 
              secondary="Inline critical above-the-fold styles, defer non-critical CSS"
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Leverage CSS Custom Properties" 
              secondary="Use CSS variables for consistent theming and reduced repetition"
            />
          </ListItem>
        </List>

        <Alert severity="info" sx={{ my: 3 }}>
          <Typography variant="body2">
            <strong>🚀 CSS Optimizer:</strong> Use our{' '}
            <Link href="/css-formatter" passHref>
              <Button variant="text" color="primary" sx={{ p: 0, textTransform: 'none' }}>
                CSS Formatter & Minifier
              </Button>
            </Link>{' '}
            to format, validate, and optimize your CSS code.
          </Typography>
        </Alert>

        <Typography variant="h5" component="h3" gutterBottom>
          CSS Architecture Best Practices:
        </Typography>

        <Paper sx={{ p: 3, mb: 3, backgroundColor: 'action.hover' }}>
          <Typography variant="h6" gutterBottom>ITCSS (Inverted Triangle CSS) Structure:</Typography>
          <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
{`1. Settings - Variables and configuration
2. Tools - Mixins and functions
3. Generic - Reset and normalize
4. Elements - Bare HTML elements
5. Objects - Layout and structural classes
6. Components - UI components
7. Utilities - Helper classes`}
          </Typography>
        </Paper>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 6 }}>
          6. Advanced CSS Techniques
        </Typography>

        <Typography variant="h5" component="h3" gutterBottom>
          Modern CSS Features:
        </Typography>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>CSS Subgrid</Typography>
                <Typography variant="body2" paragraph>
                  Inherit grid from parent container for perfect alignment across nested components.
                </Typography>
                <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>
{`.child {
  display: grid;
  grid-template-columns: subgrid;
}`}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>CSS Cascade Layers</Typography>
                <Typography variant="body2" paragraph>
                  Control cascade order without relying on specificity or source order.
                </Typography>
                <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>
{`@layer reset, base, theme, components;

@layer components {
  .button { /* styles */ }
}`}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>CSS Nesting</Typography>
                <Typography variant="body2" paragraph>
                  Native CSS nesting support (Sass-like syntax) coming to browsers.
                </Typography>
                <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>
{`.card {
  padding: 1rem;
  
  & .title {
    font-size: 1.5rem;
  }
}`}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>CSS :has() Selector</Typography>
                <Typography variant="body2" paragraph>
                  Style parent elements based on their children (parent selector).
                </Typography>
                <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>
{`.card:has(img) {
  display: grid;
  grid-template-columns: auto 1fr;
}`}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Typography variant="h5" component="h3" gutterBottom>
          CSS Animation and Interactions:
        </Typography>

        <Paper sx={{ p: 3, mb: 3, backgroundColor: 'action.hover' }}>
          <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
{`/* Smooth micro-interactions */
.button {
  transition: all 0.2s ease;
  transform-origin: center;
}

.button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

/* Scroll-driven animations */
@supports (animation-timeline: scroll()) {
  .parallax {
    animation: parallax linear;
    animation-timeline: scroll();
  }
}`}
          </Typography>
        </Paper>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 6 }}>
          Conclusion
        </Typography>

        <Typography paragraph>
          Modern CSS is incredibly powerful and continues to evolve rapidly. Master the fundamentals of units, 
          flexbox, and grid, then explore advanced features like container queries and cascade layers.
        </Typography>

        <Typography paragraph>
          Focus on writing maintainable, performant CSS that serves your users well across all devices and 
          contexts. The investment in learning modern CSS techniques pays dividends in development speed and 
          user experience.
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
                  <Link href="/css-units" passHref>
                    <Button color="primary" sx={{ textTransform: 'none' }}>
                      CSS Unit Converter →
                    </Button>
                  </Link>
                </Typography>
                <Typography variant="body2">
                  Convert between CSS units with live preview
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <Link href="/css-formatter" passHref>
                    <Button color="primary" sx={{ textTransform: 'none' }}>
                      CSS Formatter & Minifier →
                    </Button>
                  </Link>
                </Typography>
                <Typography variant="body2">
                  Format, validate, and optimize CSS code
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
                  Work with colors in HEX, RGB, HSL formats
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
                      More CSS Guides →
                    </Button>
                  </Link>
                </Typography>
                <Typography variant="body2">
                  Explore more CSS tutorials and guides
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
