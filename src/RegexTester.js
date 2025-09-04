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
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

const MatchHighlighter = ({ text, matches }) => {
  if (matches.length === 0) {
    return <Typography>{text}</Typography>;
  }

  const parts = [];
  let lastIndex = 0;

  matches.forEach((match, matchIndex) => {
    const [fullMatch, ...groups] = match;
    const startIndex = match.index;
    const endIndex = startIndex + fullMatch.length;

    // Add the text before the match
    if (startIndex > lastIndex) {
      parts.push(text.substring(lastIndex, startIndex));
    }

    // Add the highlighted match
    parts.push(
      <Box
        component="span"
        key={matchIndex}
        sx={{ backgroundColor: '#f5a623', color: '#000', borderRadius: '3px' }}
      >
        {fullMatch}
      </Box>
    );

    lastIndex = endIndex;
  });

  // Add the remaining text after the last match
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return <Typography component="pre" sx={{ whiteSpace: 'pre-wrap' }}>{parts}</Typography>;
};

export default function RegexTester() {
  const [regex, setRegex] = useState('([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\\.[a-zA-Z0-9_-]+)');
  const [text, setText] = useState('You can contact me at test@example.com or my.other.email@domain.co.uk.');


  const { matches, error } = useMemo(() => {
    if (!regex || !text) {
      return { matches: [], error: null };
    }

    try {
      const re = new RegExp(regex, 'g');
      const allMatches = Array.from(text.matchAll(re));
      return { matches: allMatches, error: null };
    } catch (e) {
      return { matches: [], error: e.message };
    }
  }, [regex, text]);

  return (
    <Box sx={{ height: 'calc(100vh - 112px)', display: 'flex', flexDirection: 'column' }}>
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
              label="Sample Text"
              multiline
              fullWidth
              value={text}
              onChange={(e) => setText(e.target.value)}
              variant="outlined"
              sx={{ flexGrow: 1, '& .MuiInputBase-root': { height: '100%' }, '& .MuiInputBase-input': { height: '100% !important' } }}
            />
          </Paper>
        </Box>
        <Box sx={{ width: '33.33%', p: 2, display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h5" gutterBottom>
            Result
          </Typography>
          <Paper elevation={3} sx={{ p: 2, flexGrow: 1, backgroundColor: '#2d2d2d', overflow: 'auto' }}>
            <MatchHighlighter text={text} matches={matches} />
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
                          <SyntaxHighlighter language="text" style={tomorrow}>
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