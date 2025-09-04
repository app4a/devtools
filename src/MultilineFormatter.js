import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  TextareaAutosize
} from '@mui/material';

export default function QuoteMultiline() {
  const [inputText, setInputText] = useState('');
  const [wrapChar, setWrapChar] = useState("'");
  const [outputText, setOutputText] = useState('');

  useEffect(() => {
    if (!inputText) {
      setOutputText('');
      return;
    }

    const lines = inputText.split('\n');
    const wrappedLines = lines.map((line, index) => {
      const wrappedLine = `${wrapChar}${line}${wrapChar}`;
      if (index === lines.length - 1) {
        return wrappedLine;
      } else {
        return `${wrappedLine},`;
      }
    });
    setOutputText(wrappedLines.join('\n'));
  }, [inputText, wrapChar]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>

      <Paper sx={{ p: 1, borderBottom: '1px solid #444', backgroundColor: '#2d2d2d', display: 'flex', alignItems: 'center' }} elevation={0}>
        <Typography variant="body2" sx={{ml: 2, color: '#ffffff', flexGrow: 1}}>Paste Multiline Text</Typography>
        <TextField
          label="Wrap with"
          variant="outlined"
          size="small"
          value={wrapChar}
          onChange={(e) => setWrapChar(e.target.value)}
          sx={{
            mr: 2,
            backgroundColor: '#1e1e1e',
            input: { color: '#ffffff' },
            label: { color: '#ffffff' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#444',
              },
            },
          }}
        />
      </Paper>
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'row', gap: 2, p: 2 }}>
        <TextareaAutosize
          minRows={10}
          placeholder="Input Text"
          style={{ width: '50%', backgroundColor: '#1e1e1e', color: '#ffffff', border: '1px solid #444', resize: 'vertical' }}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <TextareaAutosize
          minRows={10}
          placeholder="Output Text"
          style={{ width: '50%', backgroundColor: '#1e1e1e', color: '#ffffff', border: '1px solid #444', resize: 'vertical' }}
          value={outputText}
          readOnly
        />
      </Box>
    </Box>
  );
}
