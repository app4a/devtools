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
  Chip
} from '@mui/material';
import Link from 'next/link';
import SEO from '../../components/SEO';

export default function JsonFormattingGuide() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Complete Guide to JSON Formatting and Validation in 2024",
    "description": "Master JSON formatting with our comprehensive guide. Learn best practices, common errors, and advanced validation techniques for modern web development.",
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
      "@id": "https://yourdevtools.com/blog/json-formatting-guide-2024"
    }
  };

  return (
    <Container maxWidth="md">
      <SEO
        title="Complete Guide to JSON Formatting and Validation in 2024"
        description="Master JSON formatting with our comprehensive guide. Learn best practices, common errors, validation techniques, and advanced tips for modern web development and API design."
        canonical="/blog/json-formatting-guide-2024"
        schema={articleSchema}
        keywords={[
          'json formatting',
          'json validation',
          'json best practices',
          'json tutorial',
          'api design',
          'web development',
          'json parser',
          'json syntax'
        ]}
      />
      
      <Box sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Complete Guide to JSON Formatting and Validation in 2024
        </Typography>
        
        <Box sx={{ mb: 3 }}>
          <Chip label="Web Development" color="primary" sx={{ mr: 1 }} />
          <Chip label="8 min read" variant="outlined" />
        </Box>

        <Typography variant="h6" color="text.secondary" paragraph>
          Master JSON formatting with our comprehensive guide. Learn best practices, common errors, and advanced validation techniques for modern web development.
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
          What is JSON Formatting?
        </Typography>
        <Typography paragraph>
          JSON (JavaScript Object Notation) formatting refers to the process of structuring JSON data in a human-readable format. 
          Proper JSON formatting is crucial for debugging, development, and maintaining clean, readable code. A well-formatted JSON 
          file improves collaboration among team members and reduces the likelihood of syntax errors.
        </Typography>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
          Why JSON Formatting Matters
        </Typography>
        <List>
          <ListItem>
            <ListItemText 
              primary="Improved Readability" 
              secondary="Properly formatted JSON is easier to read and understand, especially for complex nested structures."
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Debugging Efficiency" 
              secondary="Well-formatted JSON helps identify syntax errors, missing commas, and structural issues quickly."
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Team Collaboration" 
              secondary="Consistent formatting standards improve code reviews and team productivity."
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="API Documentation" 
              secondary="Formatted JSON examples in API documentation are more professional and easier to follow."
            />
          </ListItem>
        </List>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
          JSON Formatting Best Practices
        </Typography>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          1. Proper Indentation
        </Typography>
        <Typography paragraph>
          Use consistent indentation (2 or 4 spaces) to show the hierarchy of your data structure:
        </Typography>
        <Paper sx={{ p: 2, backgroundColor: '#2d2d2d', color: '#ffffff', fontFamily: 'monospace' }}>
          <pre>{`{
  "user": {
    "id": 123,
    "name": "John Doe",
    "preferences": {
      "theme": "dark",
      "notifications": true
    }
  }
}`}</pre>
        </Paper>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          2. Consistent Key Naming
        </Typography>
        <Typography paragraph>
          Use consistent naming conventions for your JSON keys. Common conventions include:
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="camelCase: firstName, lastName, phoneNumber" />
          </ListItem>
          <ListItem>
            <ListItemText primary="snake_case: first_name, last_name, phone_number" />
          </ListItem>
          <ListItem>
            <ListItemText primary="kebab-case: first-name, last-name, phone-number" />
          </ListItem>
        </List>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          3. Proper Data Types
        </Typography>
        <Typography paragraph>
          Use appropriate data types for your values:
        </Typography>
        <Paper sx={{ p: 2, backgroundColor: '#2d2d2d', color: '#ffffff', fontFamily: 'monospace' }}>
          <pre>{`{
  "string": "Hello World",
  "number": 42,
  "boolean": true,
  "null": null,
  "array": [1, 2, 3],
  "object": {"nested": "value"}
}`}</pre>
        </Paper>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
          Common JSON Errors and How to Fix Them
        </Typography>

        <Alert severity="error" sx={{ mb: 2 }}>
          <Typography variant="h6">Trailing Commas</Typography>
          <Typography>JSON doesn't allow trailing commas. Remove any commas after the last item in objects or arrays.</Typography>
        </Alert>

        <Alert severity="error" sx={{ mb: 2 }}>
          <Typography variant="h6">Single Quotes</Typography>
          <Typography>JSON requires double quotes for strings. Single quotes will cause validation errors.</Typography>
        </Alert>

        <Alert severity="error" sx={{ mb: 2 }}>
          <Typography variant="h6">Unescaped Characters</Typography>
          <Typography>Special characters like quotes, backslashes, and newlines must be properly escaped.</Typography>
        </Alert>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
          JSON Validation Techniques
        </Typography>
        <Typography paragraph>
          Always validate your JSON before using it in production. Here are key validation steps:
        </Typography>
        <List>
          <ListItem>
            <ListItemText 
              primary="Syntax Validation" 
              secondary="Ensure proper JSON syntax with balanced brackets, correct quotes, and valid structure."
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Schema Validation" 
              secondary="Use JSON Schema to validate data types, required fields, and value constraints."
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Security Validation" 
              secondary="Sanitize and validate input data to prevent injection attacks and data corruption."
            />
          </ListItem>
        </List>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
          Advanced JSON Formatting Tips
        </Typography>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          Performance Considerations
        </Typography>
        <Typography paragraph>
          For large JSON files, consider these performance optimizations:
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Minimize whitespace for production APIs to reduce file size" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Use streaming parsers for very large JSON files" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Implement pagination for large datasets" />
          </ListItem>
        </List>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          Security Best Practices
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Never include sensitive data like passwords or API keys in JSON" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Validate all JSON input on the server side" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Use HTTPS for transmitting JSON data" />
          </ListItem>
        </List>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
          Try Our JSON Formatter Tool
        </Typography>
        <Typography paragraph>
          Ready to format your JSON? Use our free online JSON formatter tool to instantly beautify, 
          validate, and format your JSON data. No registration required, completely secure, and works 
          entirely in your browser.
        </Typography>
        
        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Link href="/json" passHref>
            <Typography component="a" variant="h6" color="primary" sx={{ textDecoration: 'none' }}>
              → Use JSON Formatter Tool
            </Typography>
          </Link>
        </Box>

        <Divider sx={{ my: 4 }} />
        
        <Typography variant="h6" gutterBottom>
          Related Articles
        </Typography>
        <List>
          <ListItem>
            <Link href="/blog/base64-encoding-explained" passHref>
              <Typography component="a" color="primary">Base64 Encoding Explained: When and How to Use It</Typography>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="/blog/jwt-security-best-practices" passHref>
              <Typography component="a" color="primary">JWT Tokens: Security Best Practices and Common Vulnerabilities</Typography>
            </Link>
          </ListItem>
        </List>
      </Box>
    </Container>
  );
}
