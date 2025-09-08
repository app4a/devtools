import React, { useState, useMemo } from 'react';
import {
  Box,
  TextField,
  Typography,
  Paper,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import Head from 'next/head';

export default function RegexTester() {
  const [regex, setRegex] = useState('([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\\.[a-zA-Z0-9_-]+)');
  const [text, setText] = useState('You can contact me at test@example.com or my.other.email@domain.co.uk.');

  const { matches, error, highlightedText } = useMemo(() => {
    if (!regex || !text) {
      return { matches: [], error: null, highlightedText: text };
    }

    try {
      const re = new RegExp(regex, 'g');
      const allMatches = Array.from(text.matchAll(re));
      let lastIndex = 0;
      const parts = [];
      for (const match of allMatches) {
        if (match.index > lastIndex) {
          parts.push(text.substring(lastIndex, match.index));
        }
        parts.push(<mark key={match.index}>{match[0]}</mark>);
        lastIndex = match.index + match[0].length;
      }
      if (lastIndex < text.length) {
        parts.push(text.substring(lastIndex));
      }
      
      const highlighted = <>{parts}</>;

      return { matches: allMatches, error: null, highlightedText: highlighted };
    } catch (e) {
      return { matches: [], error: e.message, highlightedText: text };
    }
  }, [regex, text]);

  return (
    <Box sx={{ height: 'calc(100vh - 112px)', display: 'flex', flexDirection: 'column' }}>
      <Head>
        <title>Regex Tester - Dev Tools</title>
        <meta name="description" content="Test regular expressions against sample text. Highlight matches and capture groups." />
      </Head>
      <Typography variant="h4" gutterBottom sx={{ pl: 2, pt: 2 }}>
        Regex Tester
      </Typography>
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <Box sx={{ width: '33.33%', p: 2, display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h5" gutterBottom>
            Input
          </Typography>
          <Paper elevation={3} sx={{ p: 2, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            <TextField
              label="Regular Expression"
              fullWidth
              value={regex}
              onChange={(e) => setRegex(e.target.value)}
              variant="outlined"
              error={!!error}
              helperText={error}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Text"
              fullWidth
              multiline
              rows={10}
              value={text}
              onChange={(e) => setText(e.target.value)}
              variant="outlined"
              sx={{ flexGrow: 1 }}
            />
          </Paper>
        </Box>
        <Box sx={{ width: '33.33%', p: 2, display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h5" gutterBottom>
            Result
          </Typography>
          <Paper elevation={3} sx={{ flexGrow: 1, backgroundColor: '#1e1e1e', overflow: 'auto', p: 2 }}>
            <Typography component="div" sx={{ whiteSpace: 'pre-wrap' }}>
              {highlightedText}
            </Typography>
          </Paper>
        </Box>
        <Box sx={{ width: '33.33%', p: 2, display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h5" gutterBottom>
            Capture Groups
          </Typography>
          <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
            {matches.length > 0 ? (
              matches.map((match, index) => (
                <Accordion key={index}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography noWrap>Match {index + 1}: {match[0]}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box sx={{ width: '100%' }}>
                      {match.slice(1).map((group, groupIndex) => (
                        <Box key={groupIndex} sx={{ mb: 1 }}>
                          <Typography variant="subtitle1">Group {groupIndex + 1}</Typography>
                          <SyntaxHighlighter language="text" style={vscDarkPlus} customStyle={{height: '100px'}}>
                            {group || ''}
                          </SyntaxHighlighter>
                        </Box>
                      ))}
                    </Box>
                  </AccordionDetails>
                </Accordion>
              ))
            ) : (
              <Paper elevation={3} sx={{ p: 2, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography>No capture groups</Typography>
              </Paper>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}