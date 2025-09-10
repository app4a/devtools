import React from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Grid,
  Card,
  CardContent,
  Button
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Link from 'next/link';
import SEO from '../components/SEO';

import { toolCategories } from '../data/tools';

function HomePage() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Developer Tools",
    "description": "Free online developer tools and utilities for programmers and web developers",
    "url": "https://app4a.github.io/devtools",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://app4a.github.io/devtools/?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    "mainEntity": {
      "@type": "SoftwareApplication",
      "name": "Developer Tools Suite",
      "applicationCategory": "DeveloperApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "operatingSystem": "Web Browser"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://app4a.github.io/devtools"
      }
    ]
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Developer Tools",
    "url": "https://app4a.github.io/devtools",
    "logo": "https://app4a.github.io/devtools/logo512.png",
    "description": "Providing free online developer tools and utilities for programmers worldwide",
    "knowsAbout": [
      "Professional JSON formatting and validation",
      "Advanced Base64 encoding with Unicode support",
      "Cryptographic hash generation (MD5, SHA-1/256/512, SHA-3, HMAC)",
      "JWT token analysis and signature verification",
      "Color conversion with accessibility compliance",
      "Regular expression testing with pattern libraries",
      "HTML entity encoding and security analysis",
      "URL encoding and analysis",
      "Password generation and strength analysis",
      "Cron expression parsing and scheduling",
      "World time and timezone conversion",
      "QR code generation and customization",
      "CSS unit conversion and responsive design",
      "Text comparison and differential analysis",
      "Number base conversion and arithmetic",
      "Multiline text formatting and templates",
      "Timestamp conversion and date formatting"
    ]
  };

  const combinedSchema = [websiteSchema, breadcrumbSchema, organizationSchema];

  return (
    <Box sx={{ p: 2 }}>
      <SEO 
        title="Free Professional Developer Tools & Utilities Suite"
        description="Complete suite of professional-grade developer tools: JSON formatter with validation, advanced hash generator with 10+ algorithms, JWT analyzer with signature verification, color tools with accessibility checker, regex tester with pattern library, and enhanced tools. No registration required."
        canonical="/"
        schema={combinedSchema}
        keywords={[
          'professional json formatter validator',
          'jwt decoder signature verification',
          'hash generator md5 sha256 sha512 hmac',
          'color converter accessibility wcag',
          'regex tester pattern library',
          'base64 encoder unicode support',
          'password generator strength analysis',
          'cron parser visual builder',
          'world time timezone converter',
          'developer tools professional grade',
          'qr code generator batch',
          'css unit converter responsive',
          'html entity encoder decoder',
          'url encoder analyzer',
          'diff tool comparison',
          'multiline formatter presets'
        ]}
      />
      <Typography variant="h4" component="h1" gutterBottom>
        Professional Developer Tools & Utilities Suite
      </Typography>
      <Typography variant="h6" component="h2" sx={{ mb: 2, fontWeight: 'normal' }}>
        Professional-grade tools for developers - completely free
      </Typography>
      <Typography variant="body1" paragraph sx={{ mb: 4 }}>
        Access our comprehensive suite of enhanced developer tools without any registration. Features include: 
        JSON formatter with validation & statistics, advanced hash generator with 10+ algorithms, JWT analyzer with signature verification, 
        color tools with accessibility checker, regex tester with pattern library, and much more. 
        All tools work entirely in your browser for maximum privacy and speed.
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>🚀 Fast & Secure</Typography>
              <Typography variant="body2">All processing happens in your browser. No data leaves your device.</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>💯 100% Free</Typography>
              <Typography variant="body2">No registration, no limits, no hidden costs. Use all tools completely free.</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>⚡ No Installation</Typography>
              <Typography variant="body2">Works directly in your web browser. Compatible with all modern browsers.</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Typography variant="h5" component="h2" gutterBottom>
        Popular Developer Tools:
      </Typography>
      <List>
        {toolCategories.map((category) => (
          <Accordion key={category.name} defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`${category.name}-content`}
              id={`${category.name}-header`}
            >
              <Typography variant="h6">{category.name}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 0 }}>
              <List component="div" disablePadding>
                {category.tools.map((tool) => (
                  <React.Fragment key={tool.name}>
                    <Link href={tool.path} passHref>
                      <ListItem sx={{ '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.08)' } }}>
                        <ListItemText
                          primary={<Typography variant="body1">{tool.name}</Typography>}
                          secondary={<Typography variant="body2" color="text.secondary">{tool.description}</Typography>}
                        />
                      </ListItem>
                    </Link>
                    <Divider component="li" />
                  </React.Fragment>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        ))}
      </List>

      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
        📚 Developer Resources:
      </Typography>
      
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom color="primary">
                📖 Developer Blog
              </Typography>
              <Typography variant="body2" paragraph>
                Expert guides, tutorials, and best practices for web development. Learn JSON formatting, Base64 encoding, JWT security, and more.
              </Typography>
              <Link href="/blog" passHref>
                <Button variant="outlined" color="primary" fullWidth>
                  Read Articles →
                </Button>
              </Link>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom color="primary">
                ❓ FAQ & Help
              </Typography>
              <Typography variant="body2" paragraph>
                Get answers to common questions about our developer tools. Find help with JSON formatting, Base64 encoding, and more.
              </Typography>
              <Link href="/faq" passHref>
                <Button variant="outlined" color="primary" fullWidth>
                  Get Help →
                </Button>
              </Link>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom color="primary">
                ⚖️ Tools Comparison
              </Typography>
              <Typography variant="body2" paragraph>
                See how our free, privacy-focused tools compare to popular alternatives. Discover why developers choose our platform.
              </Typography>
              <Link href="/tools-comparison" passHref>
                <Button variant="outlined" color="primary" fullWidth>
                  Compare Tools →
                </Button>
              </Link>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default HomePage;
