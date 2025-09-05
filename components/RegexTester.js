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
import Editor from '@monaco-editor/react';
import Head from 'next/head';

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
            <Editor
              height="100%"
              language="text"
              theme="vs-dark"
              value={text}
              onChange={(value) => setText(value)}
            />
          </Paper>
        </Box>
        <Box sx={{ width: '33.33%', p: 2, display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h5" gutterBottom>
            Result
          </Typography>
          <Paper elevation={3} sx={{ flexGrow: 1, backgroundColor: '#2d2d2d', overflow: 'auto' }}>
            <Editor
              height="100%"
              language="text"
              theme="vs-dark"
              value={text}
              options={{ readOnly: true, domReadOnly: true }}
            />
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
                          <Editor
                            height="100px"
                            language="text"
                            theme="vs-dark"
                            value={group || ''}
                            options={{ readOnly: true, domReadOnly: true, minimap: { enabled: false } }}
                          />
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