import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  ToggleButtonGroup,
  ToggleButton
} from '@mui/material';

function UrlEncoderDecoder() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [mode, setMode] = useState('encode'); // 'encode' or 'decode'

  useEffect(() => {
    if (inputText) {
      try {
        if (mode === 'encode') {
          setOutputText(encodeURIComponent(inputText));
        } else {
          setOutputText(decodeURIComponent(inputText));
        }
      } catch (error) {
        setOutputText(`Error: ${error.message}`);
      }
    } else {
      setOutputText('');
    }
  }, [inputText, mode]);

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Typography variant="h4" gutterBottom>
        URL Encoder/Decoder
      </Typography>
      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
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
          </Grid>
          <Box sx={{ width: '100%', mb: 2 }}>
            <TextField
              label="Input URL/Text"
              multiline
              rows={6}
              fullWidth
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
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
          </Box>
          <Box sx={{ width: '100%' }}>
            <TextField
              label="Output URL/Text"
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
          </Box>
        </Grid>
      </Paper>
    </Box>
  );
}

export default UrlEncoderDecoder;
