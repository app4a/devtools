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

export default function ColorTheoryDesignSystems() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Color Theory and Design Systems: Complete Guide to Creating Cohesive Digital Experiences",
    "description": "Master color theory and design systems with comprehensive guide covering color psychology, accessibility, brand consistency, and scalable design implementation for modern applications.",
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
      "@id": "https://app4a.github.io/devtools/blog/color-theory-design-systems"
    }
  };

  return (
    <Container maxWidth="md">
      <SEO
        title="Color Theory and Design Systems: Complete Guide to Creating Cohesive Digital Experiences"
        description="Master color theory and design systems with comprehensive guide covering color psychology, accessibility, brand consistency, and scalable design implementation for modern applications."
        canonical="/blog/color-theory-design-systems"
        schema={articleSchema}
        keywords={[
          'color theory',
          'design systems',
          'color accessibility',
          'brand colors',
          'color psychology',
          'color palettes',
          'design tokens',
          'color contrast',
          'ui design',
          'design consistency'
        ]}
      />
      
      <Box sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Chip label="Design" color="primary" sx={{ mr: 1, mb: 2 }} />
          <Chip label="17 min read" variant="outlined" sx={{ mb: 2 }} />
        </Box>

        <Typography variant="h3" component="h1" gutterBottom>
          Color Theory and Design Systems
        </Typography>
        
        <Typography variant="h6" component="h2" color="text.secondary" gutterBottom sx={{ mb: 4 }}>
          Complete guide to understanding color theory, building accessible color palettes, and implementing scalable design systems for consistent digital experiences
        </Typography>

        <Typography variant="body1" paragraph>
          Color is one of the most powerful tools in digital design, influencing user emotions, behavior, and accessibility. A well-designed color system forms the foundation of any successful digital product, ensuring consistency across interfaces while supporting brand identity and user experience goals. Understanding color theory and implementing systematic approaches to color management is essential for creating professional, accessible, and engaging digital experiences.
        </Typography>

        <Typography variant="body1" paragraph>
          This comprehensive guide explores color fundamentals, accessibility requirements, and practical implementation strategies for building robust design systems that scale across teams and platforms while maintaining visual coherence and usability.
        </Typography>

        <Alert severity="info" sx={{ mb: 4 }}>
          <Typography variant="body2">
            <strong>Pro Tip:</strong> Use our <Link href="/color" style={{ color: 'inherit', textDecoration: 'underline' }}>Color Converter</Link> to work with different color formats, check WCAG accessibility compliance, and generate harmonious color palettes.
          </Typography>
        </Alert>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
          Table of Contents
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="1. Color Theory Fundamentals" />
          </ListItem>
          <ListItem>
            <ListItemText primary="2. Color Psychology and User Experience" />
          </ListItem>
          <ListItem>
            <ListItemText primary="3. Accessibility and Color Contrast" />
          </ListItem>
          <ListItem>
            <ListItemText primary="4. Building Color Palettes" />
          </ListItem>
          <ListItem>
            <ListItemText primary="5. Design System Implementation" />
          </ListItem>
          <ListItem>
            <ListItemText primary="6. Color in Different Contexts" />
          </ListItem>
          <ListItem>
            <ListItemText primary="7. Brand Consistency and Guidelines" />
          </ListItem>
          <ListItem>
            <ListItemText primary="8. Tools and Workflow Optimization" />
          </ListItem>
        </List>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
          1. Color Theory Fundamentals
        </Typography>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          The Color Wheel and Color Relationships
        </Typography>
        <Typography variant="body1" paragraph>
          Understanding color relationships is fundamental to creating harmonious palettes. The color wheel illustrates how colors relate to each other and guides color selection:
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom color="primary">
                  Primary Colors
                </Typography>
                <Typography variant="body2">
                  Red, Blue, Yellow - cannot be created by mixing other colors. Foundation of all other colors.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom color="secondary">
                  Secondary Colors
                </Typography>
                <Typography variant="body2">
                  Orange, Green, Purple - created by mixing two primary colors.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom color="info.main">
                  Tertiary Colors
                </Typography>
                <Typography variant="body2">
                  Red-orange, Yellow-green, etc. - created by mixing primary and secondary colors.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom color="warning.main">
                  Neutral Colors
                </Typography>
                <Typography variant="body2">
                  Black, white, gray, brown - support and balance other colors in design.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          Color Harmony Schemes
        </Typography>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
{`Color Harmony Types:

🎯 Monochromatic
- Uses variations of a single hue
- Different tints, shades, and tones
- Creates cohesive, calming effect
- Example: Light blue, blue, dark blue

🔀 Analogous  
- Uses adjacent colors on color wheel
- Harmonious and pleasing combinations
- One dominant color with supporting colors
- Example: Blue, blue-green, green

⚖️ Complementary
- Uses opposite colors on color wheel
- High contrast and vibrant combinations
- Use sparingly for emphasis
- Example: Red and green, blue and orange

🔺 Triadic
- Uses three evenly spaced colors
- Balanced and vibrant palette
- One dominant, two accent colors
- Example: Red, yellow, blue

🏃 Split-Complementary
- Base color plus two adjacent to complement
- Less harsh than complementary
- Good for beginners
- Example: Blue with red-orange and yellow-orange

🎨 Tetradic (Rectangle)
- Two pairs of complementary colors
- Rich color palette with many possibilities
- Requires careful balance
- Example: Red, orange, blue, blue-green`}
          </Typography>
        </Paper>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          Color Properties: Hue, Saturation, and Lightness
        </Typography>
        <List>
          <ListItem>
            <ListItemText 
              primary="Hue" 
              secondary="The pure color itself - red, blue, green, etc. Position on color wheel (0-360°)" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Saturation (Chroma)" 
              secondary="Intensity or purity of color. Range from gray (0%) to pure color (100%)" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Lightness (Value)" 
              secondary="How light or dark a color appears. Range from black (0%) to white (100%)" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Tint" 
              secondary="Color + white (lighter version)" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Shade" 
              secondary="Color + black (darker version)" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Tone" 
              secondary="Color + gray (muted version)" 
            />
          </ListItem>
        </List>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
          2. Color Psychology and User Experience
        </Typography>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          Emotional Impact of Colors
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom style={{ color: '#d32f2f' }}>
                  🔴 Red
                </Typography>
                <Typography variant="body2">
                  <strong>Emotions:</strong> Energy, passion, urgency, excitement<br/>
                  <strong>Use for:</strong> CTAs, alerts, sale prices, food brands<br/>
                  <strong>Avoid for:</strong> Large background areas, medical applications
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom style={{ color: '#1976d2' }}>
                  🔵 Blue
                </Typography>
                <Typography variant="body2">
                  <strong>Emotions:</strong> Trust, stability, professionalism, calm<br/>
                  <strong>Use for:</strong> Corporate brands, healthcare, finance, social media<br/>
                  <strong>Cultural note:</strong> Generally positive across cultures
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom style={{ color: '#388e3c' }}>
                  🟢 Green
                </Typography>
                <Typography variant="body2">
                  <strong>Emotions:</strong> Nature, growth, harmony, success, money<br/>
                  <strong>Use for:</strong> Environmental brands, success states, go buttons<br/>
                  <strong>Applications:</strong> Finance, health, sustainability
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom style={{ color: '#f57c00' }}>
                  🟠 Orange
                </Typography>
                <Typography variant="body2">
                  <strong>Emotions:</strong> Enthusiasm, creativity, warmth, affordable<br/>
                  <strong>Use for:</strong> Creative brands, food, entertainment, calls-to-action<br/>
                  <strong>Effect:</strong> Stimulates appetite and conversation
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom style={{ color: '#7b1fa2' }}>
                  🟣 Purple
                </Typography>
                <Typography variant="body2">
                  <strong>Emotions:</strong> Luxury, creativity, mystery, spirituality<br/>
                  <strong>Use for:</strong> Premium brands, beauty, creative industries<br/>
                  <strong>Associations:</strong> Royalty, magic, imagination
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom style={{ color: '#fbc02d' }}>
                  🟡 Yellow
                </Typography>
                <Typography variant="body2">
                  <strong>Emotions:</strong> Happiness, optimism, attention, caution<br/>
                  <strong>Use for:</strong> Highlights, warnings, children's products<br/>
                  <strong>Warning:</strong> Can cause eye strain in large amounts
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          Cultural Considerations
        </Typography>
        <Typography variant="body1" paragraph>
          Color meanings vary significantly across cultures. Consider your audience when making color choices:
        </Typography>
        <List>
          <ListItem>
            <ListItemText 
              primary="Red" 
              secondary="Good fortune in China, danger in Western cultures, purity in India" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="White" 
              secondary="Purity in Western cultures, mourning in some Asian cultures" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Green" 
              secondary="Nature globally, but sacred color in Islam, bad luck in Indonesia" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Blue" 
              secondary="Most universally positive color across cultures" 
            />
          </ListItem>
        </List>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
          3. Accessibility and Color Contrast
        </Typography>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          WCAG Color Contrast Guidelines
        </Typography>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
{`WCAG 2.1 Contrast Requirements:

📊 Level AA (Minimum)
- Normal text: 4.5:1 contrast ratio
- Large text (18pt+ or 14pt+ bold): 3:1 contrast ratio
- Graphical objects and UI components: 3:1 contrast ratio

⭐ Level AAA (Enhanced)
- Normal text: 7:1 contrast ratio  
- Large text: 4.5:1 contrast ratio

📏 Text Size Classifications:
- Small text: Under 18pt regular or 14pt bold
- Large text: 18pt+ regular or 14pt+ bold

🎯 UI Components:
- Form inputs, buttons, focus indicators: 3:1 minimum
- Icons and graphical elements: 3:1 minimum
- Inactive/disabled elements: No requirement

Example Calculations:
White (#FFFFFF) on Blue (#1976D2) = 3.1:1 ❌ (Fails AA)
White (#FFFFFF) on Dark Blue (#0D47A1) = 8.5:1 ✅ (Passes AAA)
Black (#000000) on Yellow (#FFEB3B) = 19.6:1 ✅ (Passes AAA)`}
          </Typography>
        </Paper>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          Color Blindness Considerations
        </Typography>
        <Typography variant="body1" paragraph>
          Approximately 8% of men and 0.5% of women have some form of color vision deficiency. Design inclusively:
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom color="primary">
                  Design Strategies
                </Typography>
                <Typography variant="body2">
                  • Don't rely solely on color to convey information<br/>
                  • Use patterns, icons, or text labels<br/>
                  • Ensure sufficient contrast<br/>
                  • Test with color blindness simulators
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom color="secondary">
                  Common Types
                </Typography>
                <Typography variant="body2">
                  • Protanomaly/Protanopia (red weakness)<br/>
                  • Deuteranomaly/Deuteranopia (green weakness)<br/>
                  • Tritanomaly/Tritanopia (blue weakness)<br/>
                  • Monochromacy (complete color blindness)
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Alert severity="success" sx={{ mb: 3 }}>
          <Typography variant="body2">
            Check your color combinations for accessibility compliance with our <Link href="/color" style={{ color: 'inherit', textDecoration: 'underline' }}>Color Converter</Link> featuring built-in WCAG contrast checking.
          </Typography>
        </Alert>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
          4. Building Color Palettes
        </Typography>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          Primary, Secondary, and Semantic Colors
        </Typography>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
{`Color Palette Structure:

🎨 Primary Colors (1-2 colors)
- Brand identity colors
- Main CTAs and important elements
- Used sparingly for maximum impact
- Example: Brand blue, brand red

🎭 Secondary Colors (2-4 colors)  
- Supporting brand colors
- Secondary actions and accents
- Complement primary colors
- Example: Light blue, gray-blue variants

⚠️ Semantic Colors (System colors)
- Success: Green (#22C55E)
- Warning: Yellow/Orange (#F59E0B)  
- Error: Red (#EF4444)
- Info: Blue (#3B82F6)

🎯 Neutral Colors (5-10 shades)
- Text colors (multiple contrast levels)
- Background colors
- Borders and dividers
- Grays from white to black

📊 Extended Palette
- Tints and shades of primary colors
- Functional color variations
- Hover and active states
- Disabled states

Example Palette Structure:
primary: {
  50: '#eff6ff',   // Lightest tint
  100: '#dbeafe',
  200: '#bfdbfe',
  300: '#93c5fd',
  400: '#60a5fa',
  500: '#3b82f6',  // Base color
  600: '#2563eb',
  700: '#1d4ed8',
  800: '#1e40af',
  900: '#1e3a8a'   // Darkest shade
}`}
          </Typography>
        </Paper>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          Color Palette Generation Methods
        </Typography>
        <List>
          <ListItem>
            <ListItemText 
              primary="Mathematical Approach" 
              secondary="Use HSL adjustments to create systematic color variations" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Nature Inspiration" 
              secondary="Extract colors from photographs, landscapes, or natural objects" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Brand Guidelines" 
              secondary="Start with existing brand colors and expand systematically" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Mood Boards" 
              secondary="Collect visual inspiration and extract common color themes" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Color Tools" 
              secondary="Use tools like Adobe Color, Coolors, or Paletton for harmony" 
            />
          </ListItem>
        </List>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
          5. Design System Implementation
        </Typography>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          Design Tokens for Color Management
        </Typography>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
{`/* Design Tokens Structure */

/* Primitive tokens (raw values) */
:root {
  --color-blue-50: #eff6ff;
  --color-blue-500: #3b82f6;
  --color-blue-900: #1e3a8a;
  --color-gray-50: #f9fafb;
  --color-gray-900: #111827;
}

/* Semantic tokens (purpose-based) */
:root {
  --color-primary: var(--color-blue-500);
  --color-primary-hover: var(--color-blue-600);
  --color-text-primary: var(--color-gray-900);
  --color-text-secondary: var(--color-gray-600);
  --color-background: var(--color-gray-50);
  --color-surface: #ffffff;
  --color-success: #22c55e;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
}

/* Component-specific tokens */
:root {
  --button-primary-bg: var(--color-primary);
  --button-primary-text: #ffffff;
  --button-secondary-bg: transparent;
  --button-secondary-text: var(--color-primary);
  --input-border: var(--color-gray-300);
  --input-border-focus: var(--color-primary);
}

/* Dark mode variants */
[data-theme="dark"] {
  --color-text-primary: var(--color-gray-50);
  --color-text-secondary: var(--color-gray-300);
  --color-background: var(--color-gray-900);
  --color-surface: var(--color-gray-800);
}`}
          </Typography>
        </Paper>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          CSS Custom Properties Implementation
        </Typography>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
{`/* Component styling with design tokens */
.button {
  background-color: var(--button-primary-bg);
  color: var(--button-primary-text);
  border: 1px solid var(--button-primary-bg);
  transition: all 0.2s ease;
}

.button:hover {
  background-color: var(--color-primary-hover);
  border-color: var(--color-primary-hover);
}

.button--secondary {
  background-color: var(--button-secondary-bg);
  color: var(--button-secondary-text);
  border-color: var(--color-primary);
}

.input {
  border: 1px solid var(--input-border);
  background-color: var(--color-surface);
  color: var(--color-text-primary);
}

.input:focus {
  border-color: var(--input-border-focus);
  outline: 2px solid color-mix(in srgb, var(--color-primary) 20%, transparent);
}

/* Utility classes for rapid development */
.text-primary { color: var(--color-text-primary); }
.text-secondary { color: var(--color-text-secondary); }
.bg-primary { background-color: var(--color-primary); }
.bg-surface { background-color: var(--color-surface); }
.border-primary { border-color: var(--color-primary); }`}
          </Typography>
        </Paper>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          Component Library Integration
        </Typography>
        <Typography variant="body1" paragraph>
          Integrate color systems into popular frameworks:
        </Typography>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
{`// React with styled-components
const theme = {
  colors: {
    primary: {
      50: '#eff6ff',
      500: '#3b82f6',
      900: '#1e3a8a'
    },
    semantic: {
      success: '#22c55e',
      warning: '#f59e0b',
      error: '#ef4444'
    }
  }
};

const Button = styled.button\`
  background-color: \${props => props.theme.colors.primary[500]};
  color: white;
  &:hover {
    background-color: \${props => props.theme.colors.primary[600]};
  }
\`;

// Tailwind CSS configuration
module.exports = {
  theme: {
    colors: {
      primary: {
        50: '#eff6ff',
        500: '#3b82f6',
        900: '#1e3a8a'
      },
      gray: {
        50: '#f9fafb',
        900: '#111827'
      }
    }
  }
};

// Material-UI theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#3b82f6',
      light: '#60a5fa',
      dark: '#1d4ed8'
    },
    secondary: {
      main: '#6366f1'
    }
  }
});`}
          </Typography>
        </Paper>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
          6. Color in Different Contexts
        </Typography>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          Dark Mode and Theme Switching
        </Typography>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
{`/* System-aware dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #0f172a;
    --color-surface: #1e293b;
    --color-text-primary: #f1f5f9;
    --color-text-secondary: #94a3b8;
  }
}

/* Manual theme switching */
[data-theme="light"] {
  --color-background: #ffffff;
  --color-surface: #f8fafc;
  --color-text-primary: #0f172a;
  --color-text-secondary: #475569;
}

[data-theme="dark"] {
  --color-background: #0f172a;
  --color-surface: #1e293b;
  --color-text-primary: #f1f5f9;
  --color-text-secondary: #94a3b8;
}

/* JavaScript theme switching */
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
}

// Initialize theme on page load
const savedTheme = localStorage.getItem('theme') || 
  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
document.documentElement.setAttribute('data-theme', savedTheme);`}
          </Typography>
        </Paper>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          Print and High Contrast Modes
        </Typography>
        <List>
          <ListItem>
            <ListItemText 
              primary="Print Styles" 
              secondary="Use black text on white backgrounds, remove color dependencies" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="High Contrast Mode" 
              secondary="Support Windows high contrast mode with system colors" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Reduced Motion" 
              secondary="Respect prefers-reduced-motion for color transitions" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Forced Colors" 
              secondary="Use forced-colors media query for accessibility compliance" 
            />
          </ListItem>
        </List>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
          7. Brand Consistency and Guidelines
        </Typography>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          Creating Color Guidelines
        </Typography>
        <Typography variant="body1" paragraph>
          Comprehensive color guidelines ensure consistent usage across teams and touchpoints:
        </Typography>
        <List>
          <ListItem>
            <ListItemText 
              primary="Color Values" 
              secondary="Hex, RGB, HSL, and CMYK values for all brand colors" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Usage Rules" 
              secondary="When and how to use each color, including dos and don'ts" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Accessibility Requirements" 
              secondary="Approved color combinations that meet contrast requirements" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Application Examples" 
              secondary="Visual examples of colors in context (UI, print, merchandise)" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Alternative Colors" 
              secondary="Fallback options when primary colors aren't suitable" 
            />
          </ListItem>
        </List>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          Multi-Platform Consistency
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom color="primary">
                  Digital Platforms
                </Typography>
                <Typography variant="body2">
                  • Web applications (sRGB color space)<br/>
                  • Mobile apps (device-specific calibration)<br/>
                  • Email templates (limited color support)<br/>
                  • Social media (platform-specific formats)
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom color="secondary">
                  Physical Materials
                </Typography>
                <Typography variant="body2">
                  • Print materials (CMYK conversion)<br/>
                  • Merchandise and packaging<br/>
                  • Environmental graphics<br/>
                  • Vehicle wraps and signage
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
          8. Tools and Workflow Optimization
        </Typography>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          Essential Color Tools
        </Typography>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
{`🎨 Color Palette Generators:
- Adobe Color (color.adobe.com)
- Coolors (coolors.co)  
- Paletton (paletton.com)
- Material Design Color Tool

🔍 Accessibility Tools:
- WebAIM Contrast Checker
- Colour Contrast Analyser (CCA)
- Stark (Figma/Sketch plugin)
- axe DevTools

⚙️ Development Tools:
- CSS Custom Properties
- Sass/SCSS color functions
- PostCSS plugins
- Design token platforms (Style Dictionary)

📐 Design Software:
- Figma (with color style libraries)
- Adobe Creative Suite
- Sketch (with shared libraries)

🧪 Testing Tools:
- Color Oracle (color blindness simulator)
- Chrome DevTools (vision deficiencies)
- Lighthouse accessibility audits

📱 Mobile Tools:
- iOS Accessibility Inspector
- Android Accessibility Scanner
- Device color calibration tools`}
          </Typography>
        </Paper>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          Automated Color Testing
        </Typography>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
{`// Automated accessibility testing
const axeCore = require('@axe-core/core');

// Test color contrast in automated tests
function testColorContrast() {
  axeCore.run({
    rules: {
      'color-contrast': { enabled: true },
      'color-contrast-enhanced': { enabled: true }
    }
  }).then(results => {
    if (results.violations.length > 0) {
      console.error('Color contrast violations found:', results.violations);
    }
  });
}

// Lighthouse CI for accessibility
module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:3000'],
      numberOfRuns: 3
    },
    assert: {
      assertions: {
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'color-contrast': 'error'
      }
    }
  }
};

// Jest color contrast testing
import { getContrast } from 'polished';

describe('Color Contrast', () => {
  test('primary text meets AA standards', () => {
    const contrast = getContrast('#000000', '#ffffff');
    expect(contrast).toBeGreaterThanOrEqual(4.5);
  });
  
  test('large text meets AA standards', () => {
    const contrast = getContrast('#666666', '#ffffff');
    expect(contrast).toBeGreaterThanOrEqual(3);
  });
});`}
          </Typography>
        </Paper>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          Design System Maintenance
        </Typography>
        <List>
          <ListItem>
            <ListItemText 
              primary="Version Control" 
              secondary="Track color changes and maintain backward compatibility" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Documentation" 
              secondary="Keep color guidelines updated with usage examples" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Audit Process" 
              secondary="Regular accessibility and brand compliance reviews" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Team Training" 
              secondary="Educate team members on proper color usage" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Feedback Loop" 
              secondary="Collect user feedback and iterate on color choices" 
            />
          </ListItem>
        </List>

        <Alert severity="success" sx={{ mb: 3 }}>
          <Typography variant="body2">
            Streamline your color workflow with our <Link href="/color" style={{ color: 'inherit', textDecoration: 'underline' }}>Color Converter</Link> - convert between formats, check accessibility, and generate harmonious palettes all in one tool.
          </Typography>
        </Alert>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h4" component="h2" gutterBottom>
          Conclusion
        </Typography>
        <Typography variant="body1" paragraph>
          Mastering color theory and implementing systematic color management is essential for creating professional, accessible, and emotionally resonant digital experiences. By understanding color relationships, accessibility requirements, and design system principles, you can build cohesive color palettes that enhance user experience while supporting brand goals.
        </Typography>

        <Typography variant="body1" paragraph>
          Remember that color is both an art and a science. While understanding the technical aspects is crucial, don't forget the emotional and cultural impact of your color choices. Test your designs with real users, iterate based on feedback, and maintain consistency across all touchpoints to create truly effective color systems.
        </Typography>

        <Alert severity="success" sx={{ mt: 4 }}>
          <Typography variant="body2">
            <strong>Start designing:</strong> Create accessible color palettes with our <Link href="/color" style={{ color: 'inherit', textDecoration: 'underline' }}>Color Converter</Link> and build consistent visual systems for your projects.
          </Typography>
        </Alert>

        <Box sx={{ mt: 4, p: 3, backgroundColor: 'action.hover', borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            Related Tools
          </Typography>
          <Typography variant="body2">
            • <Link href="/color">Color Converter</Link> - Convert formats and check accessibility<br/>
            • <Link href="/css-formatter">CSS Formatter</Link> - Format CSS with color properties<br/>
            • <Link href="/svg-icon-generator">SVG Icon Generator</Link> - Create colorful scalable icons<br/>
            • <Link href="/image-optimizer">Image Optimizer</Link> - Optimize colorful graphics<br/>
            • <Link href="/hex-to-rgb">Hex to RGB Converter</Link> - Convert between color formats
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
