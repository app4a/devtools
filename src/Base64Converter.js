import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Typography,
  Paper,
  ToggleButtonGroup,
  ToggleButton
} from '@mui/material';

import { Helmet } from 'react-helmet-async';

export default function Base64Converter() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [mode, setMode] = useState('encode'); // 'encode' or 'decode'

  useEffect(() => {
    if (inputText) {
      try {
        if (mode === 'encode') {
          setOutputText(btoa(inputText));
        } else {
          setOutputText(atob(inputText));
        }
      } catch (error) {
        setOutputText(`Error: ${error.message}`);
      }
    } else {
      setOutputText('');
    }
  }, [inputText, mode]);

  return (
    <Box sx={{ p: 2 }}>
      <Helmet>
        <title>Base64 Encoder/Decoder - Dev Tools</title>
        <meta name="description" content="Encode or decode text using Base64." />
      </Helmet>
      <Typography variant="h4" gutterBottom>
        Base64 Encoder/Decoder
      </Typography>
      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        <ToggleButtonGroup
          value={mode}
          exclusive
          onChange={(event, newMode) => {
            if (newMode !== null) {
              setMode(newMode);
            }
          }}
          aria-label="text encoding mode"
          sx={{ mb: 2 }}
        >
          <ToggleButton value="encode" aria-label="encode">
            Encode
          </ToggleButton>
          <ToggleButton value="decode" aria-label="decode">
            Decode
          </ToggleButton>
        </ToggleButtonGroup>
        <TextField
          label="Input Text"
          multiline
          rows={6}
          fullWidth
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          variant="outlined"
          sx={{
            mb: 2,
            backgroundColor: '#1e1e1e',
            input: { color: '#ffffff' },
            textarea: { color: '#ffffff' },
            label: { color: '#ffffff' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#444',
              },
            },
          }}
        />
        <TextField
          label="Output Text"
          multiline
          rows={6}
          fullWidth
          value={outputText}
          InputProps={{ readOnly: true }}
          variant="outlined"
          sx={{
            backgroundColor: '#1e1e1e',
            input: { color: '#ffffff' },
            textarea: { color: '#ffffff' },
            label: { color: '#ffffff' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#444',
              },
            },
          }}
        />
      </Paper>
    </Box>
  );
}
