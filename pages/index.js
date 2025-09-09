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
  CardContent
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
    "url": "https://yourdevtools.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://yourdevtools.com/?q={search_term_string}"
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
        "item": "https://yourdevtools.com"
      }
    ]
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Developer Tools",
    "url": "https://yourdevtools.com",
    "logo": "https://yourdevtools.com/logo512.png",
    "description": "Providing free online developer tools and utilities for programmers worldwide",
    "knowsAbout": [
      "JSON formatting",
      "Base64 encoding",
      "Hash generation",
      "JWT decoding",
      "Color conversion",
      "Regular expressions",
      "Text processing"
    ]
  };

  const combinedSchema = [websiteSchema, breadcrumbSchema, organizationSchema];

  return (
    <Box sx={{ p: 2 }}>
      <SEO 
        title="Free Online Developer Tools & Utilities"
        description="Comprehensive suite of free online developer tools including JSON formatter, Base64 encoder/decoder, hash generator, JWT decoder, color converter, regex tester and more. No registration required."
        canonical="/"
        schema={combinedSchema}
        keywords={[
          'json formatter online',
          'base64 encoder decoder',
          'hash generator md5 sha256',
          'jwt token decoder',
          'color converter hex rgb',
          'regex tester online',
          'developer utilities',
          'web development tools'
        ]}
      />
      <Typography variant="h4" component="h1" gutterBottom>
        Free Online Developer Tools & Utilities
      </Typography>
      <Typography variant="h6" component="h2" sx={{ mb: 2, fontWeight: 'normal' }}>
        Powerful, fast, and completely free tools for developers and programmers
      </Typography>
      <Typography variant="body1" paragraph sx={{ mb: 4 }}>
        Access our comprehensive suite of developer tools without any registration. Format JSON, encode/decode Base64, 
        generate secure hashes, decode JWT tokens, convert colors, test regular expressions, and much more. 
        All tools work entirely in your browser for maximum privacy and speed.
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>🚀 Fast & Secure</Typography>
              <Typography variant="body2">All processing happens in your browser. No data leaves your device.</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>💯 100% Free</Typography>
              <Typography variant="body2">No registration, no limits, no hidden costs. Use all tools completely free.</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
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
    </Box>
  );
}

export default HomePage;
