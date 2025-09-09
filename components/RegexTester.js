import React, { useState, useMemo } from 'react';
import {
  Box,
  TextField,
  Typography,
  Paper,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControlLabel,
  Checkbox,
  IconButton,
  Snackbar,
  Chip,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemButton
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import InfoIcon from '@mui/icons-material/Info';
import Head from 'next/head';

export default function RegexTester({ name, description }) {
  const [regex, setRegex] = useState('([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\\.[a-zA-Z0-9_-]+)');
  const [text, setText] = useState('You can contact me at test@example.com or my.other.email@domain.co.uk.\nPhone: +1-555-123-4567\nDate: 2024-01-15\nURL: https://example.com');
  const [flags, setFlags] = useState({
    global: true,
    ignoreCase: false,
    multiline: false,
    unicode: false,
    sticky: false,
    dotAll: false
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const { matches, error, highlightedText, regexFlags } = useMemo(() => {
    if (!regex || !text) {
      return { matches: [], error: null, highlightedText: text, regexFlags: '' };
    }

    try {
      const flagsString = Object.entries(flags)
        .filter(([_, enabled]) => enabled)
        .map(([flag, _]) => {
          const flagMap = {
            global: 'g',
            ignoreCase: 'i',
            multiline: 'm',
            unicode: 'u',
            sticky: 'y',
            dotAll: 's'
          };
          return flagMap[flag];
        })
        .join('');

      const re = new RegExp(regex, flagsString);
      const allMatches = Array.from(text.matchAll(re));
      let lastIndex = 0;
      const parts = [];
      
      for (const match of allMatches) {
        if (match.index > lastIndex) {
          parts.push(text.substring(lastIndex, match.index));
        }
        parts.push(<mark key={match.index} style={{ backgroundColor: '#ffeb3b', padding: '0 2px' }}>{match[0]}</mark>);
        lastIndex = match.index + match[0].length;
      }
      if (lastIndex < text.length) {
        parts.push(text.substring(lastIndex));
      }
      
      const highlighted = <>{parts}</>;

      return { matches: allMatches, error: null, highlightedText: highlighted, regexFlags: flagsString };
    } catch (e) {
      return { matches: [], error: e.message, highlightedText: text, regexFlags: '' };
    }
  }, [regex, text, flags]);

  const copyToClipboard = async (content) => {
    try {
      await navigator.clipboard.writeText(content);
      setOpenSnackbar(true);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const handleFlagChange = (flag) => {
    setFlags(prev => ({ ...prev, [flag]: !prev[flag] }));
  };

  const commonPatterns = [
    { name: 'Email', pattern: '[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\\.[a-zA-Z0-9_-]+', description: 'Matches email addresses' },
    { name: 'Phone (US)', pattern: '\\+?1?-?\\s?\\(?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}', description: 'US phone numbers' },
    { name: 'URL', pattern: 'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)', description: 'HTTP/HTTPS URLs' },
    { name: 'Date (YYYY-MM-DD)', pattern: '\\d{4}-\\d{2}-\\d{2}', description: 'ISO date format' },
    { name: 'IP Address', pattern: '(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)', description: 'IPv4 addresses' },
    { name: 'Hex Color', pattern: '#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})', description: 'Hex color codes' },
    { name: 'Credit Card', pattern: '(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3[0-9]{13}|6(?:011|5[0-9]{2})[0-9]{12})', description: 'Major credit card numbers' },
    { name: 'HTML Tag', pattern: '<[^>]+>', description: 'HTML tags' }
  ];

  const regexCheatSheet = [
    { category: 'Basic', items: [
      { symbol: '.', meaning: 'Any character except newline' },
      { symbol: '*', meaning: 'Zero or more of preceding' },
      { symbol: '+', meaning: 'One or more of preceding' },
      { symbol: '?', meaning: 'Zero or one of preceding' },
      { symbol: '^', meaning: 'Start of string' },
      { symbol: '$', meaning: 'End of string' }
    ]},
    { category: 'Character Classes', items: [
      { symbol: '[abc]', meaning: 'Any of a, b, or c' },
      { symbol: '[^abc]', meaning: 'Not a, b, or c' },
      { symbol: '[a-z]', meaning: 'Any lowercase letter' },
      { symbol: '[A-Z]', meaning: 'Any uppercase letter' },
      { symbol: '[0-9]', meaning: 'Any digit' },
      { symbol: '\\d', meaning: 'Any digit [0-9]' },
      { symbol: '\\w', meaning: 'Any word character [a-zA-Z0-9_]' },
      { symbol: '\\s', meaning: 'Any whitespace character' }
    ]},
    { category: 'Quantifiers', items: [
      { symbol: '{3}', meaning: 'Exactly 3 times' },
      { symbol: '{3,}', meaning: '3 or more times' },
      { symbol: '{3,5}', meaning: 'Between 3 and 5 times' },
      { symbol: '*?', meaning: 'Non-greedy zero or more' },
      { symbol: '+?', meaning: 'Non-greedy one or more' }
    ]},
    { category: 'Groups', items: [
      { symbol: '(abc)', meaning: 'Capture group' },
      { symbol: '(?:abc)', meaning: 'Non-capturing group' },
      { symbol: '(?=abc)', meaning: 'Positive lookahead' },
      { symbol: '(?!abc)', meaning: 'Negative lookahead' }
    ]}
  ];

  return (
    <Box sx={{ p: 2 }}>
      <Head>
        <title>{name ? `${name} - Dev Tools` : 'Regex Tester - Dev Tools'}</title>
        <meta name="description" content={description} />
      </Head>
      
      <Typography variant="h4" gutterBottom>
        {name}
      </Typography>
      <Typography variant="body1" paragraph color="text.secondary">
        {description}
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          {/* Regex Input */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Regular Expression
            </Typography>
            <TextField
              fullWidth
              value={regex}
              onChange={(e) => setRegex(e.target.value)}
              variant="outlined"
              error={!!error}
              helperText={error || 'Enter your regular expression pattern'}
              placeholder="[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+"
              InputProps={{
                style: { fontFamily: 'monospace' },
                endAdornment: (
                  <IconButton onClick={() => copyToClipboard(regex)} edge="end">
                    <ContentCopyIcon />
                  </IconButton>
                )
              }}
              sx={{ mb: 2 }}
            />
            
            {/* Regex Flags */}
            <Typography variant="subtitle1" gutterBottom>
              Flags
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
              {Object.entries(flags).map(([flag, enabled]) => {
                const flagLabels = {
                  global: 'Global (g)',
                  ignoreCase: 'Ignore Case (i)', 
                  multiline: 'Multiline (m)',
                  unicode: 'Unicode (u)',
                  sticky: 'Sticky (y)',
                  dotAll: 'Dot All (s)'
                };
                return (
                  <FormControlLabel
                    key={flag}
                    control={
                      <Checkbox
                        checked={enabled}
                        onChange={() => handleFlagChange(flag)}
                        size="small"
                      />
                    }
                    label={flagLabels[flag]}
                  />
                );
              })}
            </Box>
            
            {/* Constructed Regex Display */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Constructed regex:
              </Typography>
              <Chip 
                label={`/${regex}/${regexFlags}`}
                variant="outlined"
                sx={{ fontFamily: 'monospace' }}
              />
            </Box>
          </Paper>

          {/* Test Text Input */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Test Text
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={8}
              value={text}
              onChange={(e) => setText(e.target.value)}
              variant="outlined"
              placeholder="Enter text to test your regex pattern against..."
              InputProps={{
                style: { fontFamily: 'monospace' }
              }}
            />
          </Paper>

          {/* Results */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                Highlighted Results
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Chip 
                  label={`${matches.length} match${matches.length !== 1 ? 'es' : ''}`}
                  color={matches.length > 0 ? 'success' : 'default'}
                />
                {matches.length > 0 && (
                  <IconButton 
                    size="small"
                    onClick={() => copyToClipboard(matches.map(m => m[0]).join('\n'))}
                  >
                    <ContentCopyIcon />
                  </IconButton>
                )}
              </Box>
            </Box>
            
            <Paper 
              variant="outlined" 
              sx={{ 
                p: 2, 
                minHeight: 200, 
                backgroundColor: 'background.default',
                overflow: 'auto',
                maxHeight: 400
              }}
            >
              <Typography 
                component="div" 
                sx={{ 
                  whiteSpace: 'pre-wrap',
                  fontFamily: 'monospace',
                  lineHeight: 1.6
                }}
              >
                {highlightedText}
              </Typography>
            </Paper>
          </Paper>

          {/* Match Details */}
          {matches.length > 0 && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Match Details
              </Typography>
              {matches.map((match, index) => (
                <Accordion key={index}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                      <Typography variant="subtitle1">
                        Match {index + 1}
                      </Typography>
                      <Chip 
                        label={match[0]} 
                        size="small" 
                        sx={{ fontFamily: 'monospace', maxWidth: 200 }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        Position: {match.index}
                      </Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <TableContainer>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell><strong>Group</strong></TableCell>
                            <TableCell><strong>Value</strong></TableCell>
                            <TableCell><strong>Copy</strong></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell>Full Match</TableCell>
                            <TableCell sx={{ fontFamily: 'monospace' }}>{match[0]}</TableCell>
                            <TableCell>
                              <IconButton size="small" onClick={() => copyToClipboard(match[0])}>
                                <ContentCopyIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                          {match.slice(1).map((group, groupIndex) => (
                            <TableRow key={groupIndex}>
                              <TableCell>Group {groupIndex + 1}</TableCell>
                              <TableCell sx={{ fontFamily: 'monospace' }}>
                                {group || <em>empty</em>}
                              </TableCell>
                              <TableCell>
                                <IconButton 
                                  size="small" 
                                  onClick={() => copyToClipboard(group || '')}
                                  disabled={!group}
                                >
                                  <ContentCopyIcon />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Paper>
          )}
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          {/* Common Patterns */}
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Common Patterns
              </Typography>
              <List dense>
                {commonPatterns.map((pattern, index) => (
                  <ListItem key={index} disablePadding>
                    <ListItemButton 
                      onClick={() => setRegex(pattern.pattern)}
                      sx={{ py: 0.5 }}
                    >
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="subtitle2">{pattern.name}</Typography>
                            <IconButton 
                              size="small" 
                              onClick={(e) => {
                                e.stopPropagation();
                                copyToClipboard(pattern.pattern);
                              }}
                            >
                              <ContentCopyIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        }
                        secondary={
                          <Typography 
                            variant="caption" 
                            sx={{ fontFamily: 'monospace', display: 'block', mt: 0.5 }}
                          >
                            {pattern.pattern.length > 50 ? 
                              pattern.pattern.substring(0, 50) + '...' : 
                              pattern.pattern
                            }
                          </Typography>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>

          {/* Regex Cheat Sheet */}
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <InfoIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                Regex Cheat Sheet
              </Typography>
              {regexCheatSheet.map((section, index) => (
                <Accordion key={index} variant="outlined">
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle1">{section.category}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <TableContainer>
                      <Table size="small">
                        <TableBody>
                          {section.items.map((item, itemIndex) => (
                            <TableRow key={itemIndex}>
                              <TableCell sx={{ fontFamily: 'monospace', py: 0.5 }}>
                                {item.symbol}
                              </TableCell>
                              <TableCell sx={{ py: 0.5, fontSize: '0.8rem' }}>
                                {item.meaning}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </AccordionDetails>
                </Accordion>
              ))}
            </CardContent>
          </Card>

          {/* Usage Tips */}
          <Alert severity="info" sx={{ mb: 2 }}>
            <strong>Tips:</strong>
            <br />
            • Use the global flag (g) to find all matches
            <br />
            • Test your regex thoroughly with edge cases
            <br />
            • Escape special characters with backslash (\)
            <br />
            • Use non-capturing groups (?:) for better performance
          </Alert>
        </Grid>
      </Grid>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
        message="Copied to clipboard!"
      />
    </Box>
  );
}