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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import Link from 'next/link';
import SEO from '../../components/SEO';

export default function Base64EncodingExplained() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Base64 Encoding Explained: When and How to Use It",
    "description": "Understanding Base64 encoding and decoding. Learn when to use Base64, security considerations, and practical examples for web developers.",
    "image": "https://yourdevtools.com/logo512.png",
    "author": {
      "@type": "Organization",
      "name": "Developer Tools Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Developer Tools",
      "logo": {
        "@type": "ImageObject",
        "url": "https://yourdevtools.com/logo512.png"
      }
    },
    "datePublished": "2024-01-01",
    "dateModified": "2024-01-01",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://yourdevtools.com/blog/base64-encoding-explained"
    }
  };

  return (
    <Container maxWidth="md">
      <SEO
        title="Base64 Encoding Explained: When and How to Use It"
        description="Complete guide to Base64 encoding and decoding. Learn when to use Base64, security considerations, practical examples, and best practices for web developers."
        canonical="/blog/base64-encoding-explained"
        schema={articleSchema}
        keywords={[
          'base64 encoding',
          'base64 decoding',
          'data encoding',
          'web security',
          'http headers',
          'binary data',
          'encoding tutorial',
          'base64 explained'
        ]}
      />
      
      <Box sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Base64 Encoding Explained: When and How to Use It
        </Typography>
        
        <Box sx={{ mb: 3 }}>
          <Chip label="Security" color="primary" sx={{ mr: 1 }} />
          <Chip label="6 min read" variant="outlined" />
        </Box>

        <Typography variant="h6" color="text.secondary" paragraph>
          Understanding Base64 encoding and decoding. Learn when to use Base64, security considerations, and practical examples for web developers.
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
          What is Base64 Encoding?
        </Typography>
        <Typography paragraph>
          Base64 is a binary-to-text encoding scheme that converts binary data into a radix-64 representation using 
          a 64-character set. It's designed to carry data stored in binary formats across channels that only reliably 
          support text content. Base64 is commonly used in web development for encoding binary data like images, 
          audio files, and certificates into text format.
        </Typography>

        <Typography paragraph>
          The Base64 character set consists of:
        </Typography>
        <Paper sx={{ p: 2, backgroundColor: '#2d2d2d', color: '#ffffff', fontFamily: 'monospace' }}>
          <pre>A-Z (26 characters)
a-z (26 characters)  
0-9 (10 characters)
+ and / (2 characters)
= (padding character)</pre>
        </Paper>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
          How Base64 Encoding Works
        </Typography>
        <Typography paragraph>
          Base64 encoding works by taking groups of 3 bytes (24 bits) and converting them into 4 Base64 characters. 
          Here's the step-by-step process:
        </Typography>

        <List>
          <ListItem>
            <ListItemText 
              primary="1. Group Input" 
              secondary="Take input data and group it into 3-byte chunks (24 bits)."
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="2. Split Bits" 
              secondary="Split the 24 bits into four 6-bit groups."
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="3. Map to Characters" 
              secondary="Map each 6-bit group (0-63) to a Base64 character."
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="4. Add Padding" 
              secondary="Add '=' padding characters if the input length isn't divisible by 3."
            />
          </ListItem>
        </List>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          Example: Encoding "Hello"
        </Typography>
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Step</TableCell>
                <TableCell>Value</TableCell>
                <TableCell>Binary</TableCell>
                <TableCell>Base64</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Input</TableCell>
                <TableCell>"Hello"</TableCell>
                <TableCell>01001000 01100101 01101100 01101100 01101111</TableCell>
                <TableCell>-</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Output</TableCell>
                <TableCell>Encoded</TableCell>
                <TableCell>Groups of 6 bits</TableCell>
                <TableCell>SGVsbG8=</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
          When to Use Base64 Encoding
        </Typography>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          1. Data URLs for Images
        </Typography>
        <Typography paragraph>
          Embed small images directly in HTML or CSS:
        </Typography>
        <Paper sx={{ p: 2, backgroundColor: '#2d2d2d', color: '#ffffff', fontFamily: 'monospace' }}>
          <pre>{`<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..." alt="Logo" />`}</pre>
        </Paper>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          2. HTTP Basic Authentication
        </Typography>
        <Typography paragraph>
          Encode credentials for HTTP Basic Authentication headers:
        </Typography>
        <Paper sx={{ p: 2, backgroundColor: '#2d2d2d', color: '#ffffff', fontFamily: 'monospace' }}>
          <pre>{`Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=`}</pre>
        </Paper>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          3. Email Attachments (MIME)
        </Typography>
        <Typography paragraph>
          Encode binary attachments in email messages using MIME encoding.
        </Typography>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          4. JSON Web Tokens (JWT)
        </Typography>
        <Typography paragraph>
          JWT headers and payloads are Base64URL encoded (a variant of Base64).
        </Typography>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
          Base64 vs Base64URL
        </Typography>
        <Typography paragraph>
          Base64URL is a variant of Base64 that's URL and filename safe:
        </Typography>
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Character</TableCell>
                <TableCell>Base64</TableCell>
                <TableCell>Base64URL</TableCell>
                <TableCell>Reason</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>62nd</TableCell>
                <TableCell>+</TableCell>
                <TableCell>-</TableCell>
                <TableCell>+ has special meaning in URLs</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>63rd</TableCell>
                <TableCell>/</TableCell>
                <TableCell>_</TableCell>
                <TableCell>/ is path separator in URLs</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Padding</TableCell>
                <TableCell>=</TableCell>
                <TableCell>None</TableCell>
                <TableCell>= can be problematic in URLs</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
          Security Considerations
        </Typography>

        <Alert severity="warning" sx={{ mb: 2 }}>
          <Typography variant="h6">Base64 is NOT Encryption</Typography>
          <Typography>Base64 is encoding, not encryption. It provides no security and can be easily decoded by anyone.</Typography>
        </Alert>

        <Alert severity="error" sx={{ mb: 2 }}>
          <Typography variant="h6">Don't Store Sensitive Data</Typography>
          <Typography>Never use Base64 to "hide" passwords, API keys, or other sensitive information. It's trivially reversible.</Typography>
        </Alert>

        <Alert severity="info" sx={{ mb: 2 }}>
          <Typography variant="h6">Data Size Increase</Typography>
          <Typography>Base64 encoding increases data size by approximately 33% due to the conversion from binary to text.</Typography>
        </Alert>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
          Best Practices for Base64
        </Typography>

        <List>
          <ListItem>
            <ListItemText 
              primary="Use for Data Transport" 
              secondary="Use Base64 when you need to transport binary data over text-based protocols."
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Consider File Size" 
              secondary="For large files, consider alternatives like multipart/form-data or direct binary upload."
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Validate Input" 
              secondary="Always validate Base64 input to prevent injection attacks and handle malformed data."
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Use Base64URL for URLs" 
              secondary="Use Base64URL encoding when the encoded data will appear in URLs or filenames."
            />
          </ListItem>
        </List>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
          Common Use Cases in Web Development
        </Typography>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          API Authentication
        </Typography>
        <Typography paragraph>
          Many APIs use Base64 encoding for API keys in headers:
        </Typography>
        <Paper sx={{ p: 2, backgroundColor: '#2d2d2d', color: '#ffffff', fontFamily: 'monospace' }}>
          <pre>{`const apiKey = 'myapikey:secret';
const encoded = btoa(apiKey);
headers['Authorization'] = 'Basic ' + encoded;`}</pre>
        </Paper>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          File Upload Processing
        </Typography>
        <Typography paragraph>
          Converting files to Base64 for AJAX uploads:
        </Typography>
        <Paper sx={{ p: 2, backgroundColor: '#2d2d2d', color: '#ffffff', fontFamily: 'monospace' }}>
          <pre>{`const reader = new FileReader();
reader.onload = function(e) {
  const base64 = e.target.result.split(',')[1];
  // Send base64 data to server
};
reader.readAsDataURL(file);`}</pre>
        </Paper>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
          Performance Considerations
        </Typography>

        <List>
          <ListItem>
            <ListItemText 
              primary="CPU Overhead" 
              secondary="Encoding/decoding requires CPU time. For large files, consider streaming approaches."
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Memory Usage" 
              secondary="Base64 strings must be held in memory entirely during processing."
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Network Efficiency" 
              secondary="33% size increase means more bandwidth usage compared to binary transfer."
            />
          </ListItem>
        </List>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
          Try Our Base64 Encoder/Decoder
        </Typography>
        <Typography paragraph>
          Ready to encode or decode Base64 data? Use our free online Base64 tool with advanced features 
          including Unicode support, file upload/download, and educational content. Perfect for developers 
          working with APIs, data URLs, and binary data transport.
        </Typography>
        
        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Link href="/base64" passHref>
            <Typography component="a" variant="h6" color="primary" sx={{ textDecoration: 'none' }}>
              → Use Base64 Encoder/Decoder Tool
            </Typography>
          </Link>
        </Box>

        <Divider sx={{ my: 4 }} />
        
        <Typography variant="h6" gutterBottom>
          Related Articles
        </Typography>
        <List>
          <ListItem>
            <Link href="/blog/jwt-security-best-practices" passHref>
              <Typography component="a" color="primary">JWT Tokens: Security Best Practices and Common Vulnerabilities</Typography>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="/blog/hash-functions-comparison" passHref>
              <Typography component="a" color="primary">Hash Functions in Web Development: MD5, SHA-1, SHA-256 Comparison</Typography>
            </Link>
          </ListItem>
        </List>
      </Box>
    </Container>
  );
}
