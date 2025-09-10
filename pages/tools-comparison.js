import React from 'react';
import {
  Box,
  Typography,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Rating,
  Button,
  Grid,
  Card,
  CardContent
} from '@mui/material';
import Link from 'next/link';
import SEO from '../components/SEO';

const competitorComparison = [
  {
    feature: 'JSON Formatting',
    ourTool: '✅ Free, Fast, Offline',
    competitor1: '✅ Free, Requires Registration',
    competitor2: '❌ Limited Free Tier',
    competitor3: '✅ Free, Ads Heavy',
    ourRating: 5,
    avgRating: 3.5
  },
  {
    feature: 'Base64 Encoding',
    ourTool: '✅ Instant, No Upload',
    competitor1: '✅ Basic Features',
    competitor2: '❌ File Size Limits',
    competitor3: '✅ Good, Slow Loading',
    ourRating: 5,
    avgRating: 3.8
  },
  {
    feature: 'JWT Decoding',
    ourTool: '✅ Secure, Client-Side',
    competitor1: '⚠️ Server Processing',
    competitor2: '❌ Premium Feature',
    competitor3: '✅ Basic, No Validation',
    ourRating: 5,
    avgRating: 3.2
  },
  {
    feature: 'Hash Generation',
    ourTool: '✅ Multiple Algorithms',
    competitor1: '✅ Limited Algorithms',
    competitor2: '❌ MD5 Only',
    competitor3: '✅ Good Coverage',
    ourRating: 5,
    avgRating: 3.6
  },
  {
    feature: 'Privacy & Security',
    ourTool: '✅ 100% Client-Side',
    competitor1: '⚠️ Data Collection',
    competitor2: '❌ Server Processing',
    competitor3: '⚠️ Unknown Policy',
    ourRating: 5,
    avgRating: 2.8
  },
  {
    feature: 'Mobile Experience',
    ourTool: '✅ Fully Responsive',
    competitor1: '⚠️ Basic Mobile',
    competitor2: '❌ Desktop Only',
    competitor3: '✅ Good Mobile',
    ourRating: 5,
    avgRating: 3.4
  },
  {
    feature: 'Performance',
    ourTool: '✅ Lightning Fast',
    competitor1: '⚠️ Moderate Speed',
    competitor2: '❌ Slow Loading',
    competitor3: '⚠️ Ad-Heavy, Slow',
    ourRating: 5,
    avgRating: 3.1
  },
  {
    feature: 'No Registration',
    ourTool: '✅ Always Free',
    competitor1: '❌ Registration Required',
    competitor2: '❌ Account Needed',
    competitor3: '✅ No Registration',
    ourRating: 5,
    avgRating: 3.0
  }
];

const toolCategories = [
  {
    name: 'Text Processing',
    description: 'JSON formatting, multiline formatting, and text manipulation tools',
    tools: ['JSON Formatter', 'Multiline Formatter', 'Text Diff Tool'],
    competitors: ['JSONLint', 'JSONFormatter', 'Text-Compare']
  },
  {
    name: 'Encoding & Decoding',
    description: 'Base64, URL encoding, and data conversion utilities',
    tools: ['Base64 Encoder/Decoder', 'URL Encoder/Decoder'],
    competitors: ['Base64Decode.org', 'URLEncoder.org', 'Online-Tools.org']
  },
  {
    name: 'Security Tools',
    description: 'Hash generation, JWT decoding, and cryptographic utilities',
    tools: ['Hash Generator', 'JWT Decoder'],
    competitors: ['HashGenerator.com', 'JWT.io', 'QuickHash']
  },
  {
    name: 'Developer Utilities',
    description: 'Color conversion, regex testing, and development helpers',
    tools: ['Color Converter', 'Regex Tester', 'Cron Parser'],
    competitors: ['ColorHexa', 'RegExr', 'Crontab.guru']
  }
];

export default function ToolsComparison() {
  const comparisonSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Developer Tools Comparison: Free vs Premium Online Tools",
    "description": "Compare the best online developer tools. See why our free, privacy-focused tools outperform competitors in speed, security, and features.",
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
    "datePublished": "2024-01-01",
    "dateModified": "2024-01-01"
  };

  return (
    <Container maxWidth="lg">
      <SEO
        title="Developer Tools Comparison - Free vs Premium Online Tools"
        description="Compare the best online developer tools. See why our free, privacy-focused JSON formatter, Base64 encoder, hash generator, and other tools outperform competitors."
        canonical="/tools-comparison"
        schema={comparisonSchema}
        keywords={[
          'developer tools comparison',
          'best online developer tools',
          'free developer tools',
          'json formatter comparison',
          'base64 encoder comparison',
          'jwt decoder comparison',
          'hash generator comparison',
          'developer tools review'
        ]}
      />
      
      <Box sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Developer Tools Comparison
        </Typography>
        <Typography variant="h6" component="h2" align="center" color="text.secondary" sx={{ mb: 6 }}>
          Why choose our free, privacy-focused tools over the competition
        </Typography>

        <Grid container spacing={4} sx={{ mb: 6 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom color="primary">
                  🏆 Our Advantages
                </Typography>
                <Box component="ul" sx={{ pl: 2 }}>
                  <li><Typography>100% free with no registration required</Typography></li>
                  <li><Typography>Complete privacy - all processing happens in your browser</Typography></li>
                  <li><Typography>Lightning-fast performance with optimized code</Typography></li>
                  <li><Typography>Mobile-responsive design for all devices</Typography></li>
                  <li><Typography>No ads, no tracking, no data collection</Typography></li>
                  <li><Typography>Open-source approach with transparent functionality</Typography></li>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom color="error">
                  ❌ Competitor Limitations
                </Typography>
                <Box component="ul" sx={{ pl: 2 }}>
                  <li><Typography>Registration requirements and account creation</Typography></li>
                  <li><Typography>Server-side processing compromises privacy</Typography></li>
                  <li><Typography>Heavy advertising and slow loading times</Typography></li>
                  <li><Typography>Limited features in free tiers</Typography></li>
                  <li><Typography>Data collection and tracking policies</Typography></li>
                  <li><Typography>Poor mobile experience and outdated interfaces</Typography></li>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 6, mb: 3 }}>
          Feature Comparison Table
        </Typography>
        
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Feature</strong></TableCell>
                <TableCell><strong>Our Tools</strong></TableCell>
                <TableCell><strong>Competitor A</strong></TableCell>
                <TableCell><strong>Competitor B</strong></TableCell>
                <TableCell><strong>Competitor C</strong></TableCell>
                <TableCell><strong>Our Rating</strong></TableCell>
                <TableCell><strong>Avg Rating</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {competitorComparison.map((row, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    <strong>{row.feature}</strong>
                  </TableCell>
                  <TableCell>
                    <Chip label={row.ourTool} color="success" size="small" />
                  </TableCell>
                  <TableCell>{row.competitor1}</TableCell>
                  <TableCell>{row.competitor2}</TableCell>
                  <TableCell>{row.competitor3}</TableCell>
                  <TableCell>
                    <Rating value={row.ourRating} readOnly size="small" />
                  </TableCell>
                  <TableCell>
                    <Rating value={row.avgRating} readOnly size="small" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 6, mb: 3 }}>
          Tool Categories & Alternatives
        </Typography>

        <Grid container spacing={3}>
          {toolCategories.map((category, index) => (
            <Grid size={{ xs: 12, md: 6 }} key={index}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    {category.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {category.description}
                  </Typography>
                  
                  <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                    Our Tools:
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    {category.tools.map((tool, toolIndex) => (
                      <Chip 
                        key={toolIndex}
                        label={tool} 
                        color="primary" 
                        size="small" 
                        sx={{ mr: 1, mb: 1 }}
                      />
                    ))}
                  </Box>
                  
                  <Typography variant="h6" gutterBottom>
                    Popular Alternatives:
                  </Typography>
                  <Box>
                    {category.competitors.map((competitor, compIndex) => (
                      <Chip 
                        key={compIndex}
                        label={competitor} 
                        variant="outlined" 
                        size="small" 
                        sx={{ mr: 1, mb: 1 }}
                      />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ textAlign: 'center', mt: 6, p: 4, backgroundColor: 'primary.main', color: 'white', borderRadius: 2 }}>
          <Typography variant="h4" gutterBottom>
            Ready to Experience the Difference?
          </Typography>
          <Typography variant="body1" paragraph>
            Try our developer tools and see why thousands of developers choose our platform for their daily workflow.
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            <Grid>
              <Link href="/json" passHref>
                <Button variant="contained" color="secondary" size="large">
                  Try JSON Formatter
                </Button>
              </Link>
            </Grid>
            <Grid>
              <Link href="/base64" passHref>
                <Button variant="contained" color="secondary" size="large">
                  Try Base64 Tool
                </Button>
              </Link>
            </Grid>
            <Grid>
              <Link href="/jwt" passHref>
                <Button variant="contained" color="secondary" size="large">
                  Try JWT Decoder
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Box>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 6 }}>
          Frequently Asked Questions
        </Typography>
        
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h6" gutterBottom>
              Why are your tools completely free?
            </Typography>
            <Typography paragraph>
              We believe essential developer tools should be accessible to everyone. Our tools are funded by optional donations and don't require user data monetization.
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h6" gutterBottom>
              How do you ensure privacy without servers?
            </Typography>
            <Typography paragraph>
              All processing happens locally in your browser using JavaScript. Your data never leaves your device, ensuring complete privacy and security.
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h6" gutterBottom>
              What makes your tools faster than competitors?
            </Typography>
            <Typography paragraph>
              Client-side processing eliminates server round trips, optimized code reduces load times, and minimal UI ensures maximum performance.
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h6" gutterBottom>
              Are there any usage limitations?
            </Typography>
            <Typography paragraph>
              No artificial limits! Since processing happens locally, the only limitation is your device's capability, which easily handles most use cases.
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
