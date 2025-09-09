import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Paper,
  Grid,
  IconButton,
  Snackbar,
  ToggleButtonGroup,
  ToggleButton,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  Button
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import DownloadIcon from '@mui/icons-material/Download';
import Head from 'next/head';

export default function Base64Converter({ name, description }) {
  const [inputText, setInputText] = useState('Hello, World! 🌍');
  const [outputText, setOutputText] = useState('');
  const [mode, setMode] = useState('encode');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const processText = () => {
    if (!inputText.trim()) {
      setOutputText('');
      return;
    }

    try {
      let result;
      if (mode === 'encode') {
        // Handle Unicode characters properly
        result = btoa(unescape(encodeURIComponent(inputText)));
      } else {
        // Handle Unicode characters properly
        result = decodeURIComponent(escape(atob(inputText)));
      }
      setOutputText(result);
    } catch (error) {
      setOutputText('Error: ' + error.message);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(outputText);
      setOpenSnackbar(true);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const swapTexts = () => {
    const temp = inputText;
    setInputText(outputText);
    setOutputText(temp);
    setMode(mode === 'encode' ? 'decode' : 'encode');
  };

  const downloadAsFile = () => {
    const blob = new Blob([outputText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `base64-${mode}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setInputText(e.target.result);
      };
      reader.readAsText(file);
    }
  };

  const commonExamples = [
    { text: 'Hello, World!', encoded: 'SGVsbG8sIFdvcmxkIQ==' },
    { text: 'The quick brown fox', encoded: 'VGhlIHF1aWNrIGJyb3duIGZveA==' },
    { text: 'Base64 encoding example', encoded: 'QmFzZTY0IGVuY29kaW5nIGV4YW1wbGU=' },
    { text: 'Special chars: @#$%^&*()', encoded: 'U3BlY2lhbCBjaGFyczogQCMkJV4mKigp' },
    { text: 'Unicode: 🚀🌟💻', encoded: '8J+agPCfjJ/wn4+7' }
  ];

  useEffect(() => {
    processText();
  }, [inputText, mode]);

  return (
    <Box sx={{ p: 2 }}>
      <Head>
        <title>{name ? `${name} - Dev Tools` : 'Base64 Encoder/Decoder - Dev Tools'}</title>
        <meta name="description" content={description} />
      </Head>
      
      <Typography variant="h4" gutterBottom>
        {name}
      </Typography>
      <Typography variant="body1" paragraph color="text.secondary">
        {description}
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          {/* Mode Selection */}
          <Paper sx={{ p: 2, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Conversion Mode
            </Typography>
            <ToggleButtonGroup
              value={mode}
              exclusive
              onChange={(event, newMode) => {
                if (newMode !== null) {
                  setMode(newMode);
                }
              }}
              aria-label="conversion mode"
            >
              <ToggleButton value="encode" aria-label="encode">
                Encode to Base64
              </ToggleButton>
              <ToggleButton value="decode" aria-label="decode">
                Decode from Base64
              </ToggleButton>
            </ToggleButtonGroup>
          </Paper>

          {/* Input */}
          <Paper sx={{ p: 3, mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                Input {mode === 'encode' ? 'Text' : 'Base64'}
              </Typography>
              <Box>
                <input
                  accept=".txt"
                  style={{ display: 'none' }}
                  id="file-upload"
                  type="file"
                  onChange={handleFileUpload}
                />
                <label htmlFor="file-upload">
                  <IconButton component="span" color="primary">
                    <FileUploadIcon />
                  </IconButton>
                </label>
              </Box>
            </Box>
            <TextField
              fullWidth
              multiline
              rows={6}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              variant="outlined"
              placeholder={mode === 'encode' ? 
                'Enter text to encode (supports Unicode characters)' :
                'Enter Base64 encoded text to decode'
              }
              sx={{
                '& .MuiInputBase-root': {
                  fontFamily: 'monospace'
                }
              }}
            />
          </Paper>

          {/* Swap Button */}
          <Box sx={{ textAlign: 'center', mb: 2 }}>
            <IconButton onClick={swapTexts} size="large" color="primary">
              <SwapVertIcon />
            </IconButton>
          </Box>

          {/* Output */}
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                Output {mode === 'encode' ? 'Base64' : 'Text'}
              </Typography>
              <Box>
                <IconButton onClick={copyToClipboard} disabled={!outputText}>
                  <ContentCopyIcon />
                </IconButton>
                <IconButton onClick={downloadAsFile} disabled={!outputText}>
                  <DownloadIcon />
                </IconButton>
              </Box>
            </Box>
            <TextField
              fullWidth
              multiline
              rows={6}
              value={outputText}
              variant="outlined"
              InputProps={{
                readOnly: true,
                style: {
                  fontFamily: 'monospace',
                  backgroundColor: '#2d2d2d',
                  color: '#ffffff'
                }
              }}
            />
            {outputText && !outputText.startsWith('Error:') && (
              <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
                Length: {outputText.length} characters
                {mode === 'encode' && ` (${Math.ceil(outputText.length / 4 * 3)} bytes before encoding)`}
              </Typography>
            )}
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          {/* Common Examples */}
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Examples
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>Text</strong></TableCell>
                      <TableCell><strong>Base64</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {commonExamples.map((example, index) => (
                      <TableRow 
                        key={index}
                        sx={{ cursor: 'pointer', '&:hover': { backgroundColor: 'action.hover' } }}
                        onClick={() => {
                          setInputText(mode === 'encode' ? example.text : example.encoded);
                        }}
                      >
                        <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.8rem', maxWidth: 120 }}>
                          {example.text.substring(0, 15)}
                          {example.text.length > 15 ? '...' : ''}
                        </TableCell>
                        <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.8rem', maxWidth: 120 }}>
                          {example.encoded.substring(0, 15)}
                          {example.encoded.length > 15 ? '...' : ''}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
                Click any example to use it
              </Typography>
            </CardContent>
          </Card>

          {/* Information */}
          <Alert severity="info" sx={{ mb: 2 }}>
            <strong>About Base64:</strong>
            <br />
            Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format.
          </Alert>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Common Use Cases
              </Typography>
              <Typography variant="body2" paragraph>
                • <strong>Email attachments:</strong> MIME encoding
              </Typography>
              <Typography variant="body2" paragraph>
                • <strong>Data URLs:</strong> Embed images in HTML/CSS
              </Typography>
              <Typography variant="body2" paragraph>
                • <strong>API tokens:</strong> Safe transmission of credentials
              </Typography>
              <Typography variant="body2" paragraph>
                • <strong>Data storage:</strong> Store binary data in text fields
              </Typography>
              <Typography variant="body2" paragraph>
                • <strong>URL encoding:</strong> Safe transmission of special characters
              </Typography>
              
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Character Set
              </Typography>
              <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                A-Z, a-z, 0-9, +, /, =
              </Typography>
              <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                64 characters total (+ padding character =)
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
        message="Output copied to clipboard!"
      />
    </Box>
  );
}