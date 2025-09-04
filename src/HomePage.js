import React from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';
import { Link } from 'react-router-dom';

function HomePage() {
  const tools = [
    {
      name: 'JSON Formatter',
      path: '/json',
      description: 'Format and validate JSON data for better readability.',
    },
    {
      name: 'Diff Tool',
      path: '/diff',
      description: 'Compare two text inputs and highlight the differences.',
    },
    {
      name: 'Multiline Formatter',
      path: '/multiline',
      description: 'Format multiline strings, useful for SQL queries or code snippets.',
    },
    {
      name: 'World Time',
      path: '/worldtime',
      description: 'View current times in various cities around the world.',
    },
    {
      name: 'URL Encoder/Decoder',
      path: '/url',
      description: 'Encode or decode URL components, query parameters, and entire URLs to ensure proper formatting and prevent issues with special characters.',
    },
    {
      name: 'Timestamp Converter',
      path: '/timestamp',
      description: 'Convert Unix timestamps to human-readable dates and vice-versa, supporting various time zones.',
    },
    {
      name: 'Regex Tester',
      path: '/regex',
      description: 'Test regular expressions against sample text. Highlight matches and capture groups.',
    },
    {
      name: 'Hash Generator',
      path: '/hash',
      description: 'Generate hashes like MD5, SHA-1, SHA-256 for text',
    },
    {
      name: 'Color Converter',
      path: '/color',
      description: 'Convert between HEX, RGB, HSL & Include a color picker for convenience.',
    },
    {
      name: 'Base64 Encoder/Decoder',
      path: '/base64',
      description: 'Encode or decode text using Base64.',
    },
    {
      name: 'Cron Expression Parser',
      path: '/cron',
      description: 'Parse cron expressions and get human-readable descriptions and upcoming dates.',
    },
    {
      name: 'JWT Decoder',
      path: '/jwt',
      description: 'Decode JWT tokens and inspect their header, payload, and signature.',
    },
  ];

  return (
    <Box sx={{ p: 2 }}>
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
        {tools.map((tool) => (
          <React.Fragment key={tool.name}>
            <ListItem component={Link} to={tool.path} sx={{ '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.08)' } }}>
              <ListItemText
                primary={<Typography variant="h6">{tool.name}</Typography>}
                secondary={<Typography variant="body2" color="text.secondary">{tool.description}</Typography>}
              />
            </ListItem>
            <Divider component="li" />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
}

export default HomePage;
