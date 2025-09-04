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
  AccordionDetails
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';

import { Helmet } from 'react-helmet-async';

const toolCategories = [
  {
    name: 'Text Tools',
    tools: [
      { name: 'JSON Formatter', path: '/json', description: 'Format and validate JSON data for better readability.' },
      { name: 'Diff Tool', path: '/diff', description: 'Compare two text inputs and highlight the differences.' },
      { name: 'Multiline Formatter', path: '/multiline', description: 'Format multiline strings, useful for SQL queries or code snippets.' },
      { name: 'Regex Tester', path: '/regex', description: 'Test regular expressions against sample text. Highlight matches and capture groups.' },
      { name: 'Base64 Encoder/Decoder', path: '/base64', description: 'Encode or decode text using Base64.' },
      { name: 'URL Encoder/Decoder', path: '/url', description: 'Encode or decode URL components, query parameters, and entire URLs to ensure proper formatting and prevent issues with special characters.' },
    ],
  },
  {
    name: 'Security Tools',
    tools: [
      { name: 'Hash Generator', path: '/hash', description: 'Generate hashes like MD5, SHA-1, SHA-256 for text' },
      { name: 'JWT Decoder', path: '/jwt', description: 'Decode JWT tokens and inspect their header, payload, and signature.' },
    ],
  },
  {
    name: 'Date & Time Tools',
    tools: [
      { name: 'World Time', path: '/worldtime', description: 'View current times in various cities around the world.' },
      { name: 'Timestamp Converter', path: '/timestamp', description: 'Convert Unix timestamps to human-readable dates and vice-versa, supporting various time zones.' },
      { name: 'Cron Expression Parser', path: '/cron', description: 'Parse cron expressions and get human-readable descriptions and upcoming dates.' },
    ],
  },
  {
    name: 'Color Tools',
    tools: [
      { name: 'Color Converter', path: '/color', description: 'Convert between HEX, RGB, HSL & Include a color picker for convenience.' },
    ],
  },
];

function HomePage() {
  return (
    <Box sx={{ p: 2 }}>
      <Helmet>
        <title>Dev Tools - A Collection of Developer Utilities</title>
        <meta name="description" content="A comprehensive suite of online developer tools including JSON formatter, Diff tool, Base64 encoder/decoder, Hash generator, and more." />
      </Helmet>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to Dev Tools
      </Typography>
      <Typography variant="body1" paragraph>
        A collection of useful tools for developers.
      </Typography>
      <Divider sx={{ my: 3 }} />
      <Typography variant="h5" component="h2" gutterBottom>
        Available Tools:
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
                    <ListItem component={Link} to={tool.path} sx={{ '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.08)' } }}>
                      <ListItemText
                        primary={<Typography variant="body1">{tool.name}</Typography>}
                        secondary={<Typography variant="body2" color="text.secondary">{tool.description}</Typography>}
                      />
                    </ListItem>
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