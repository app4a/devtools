import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  ToggleButtonGroup,
  ToggleButton,
  IconButton,
  Snackbar,
  Card,
  CardContent,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Divider
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import DownloadIcon from '@mui/icons-material/Download';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import LinkIcon from '@mui/icons-material/Link';
import Head from 'next/head';

function UrlEncoderDecoder({ name, description }) {
  const [inputText, setInputText] = useState('https://example.com/search?q=hello world&category=web development');
  const [outputText, setOutputText] = useState('');
  const [mode, setMode] = useState('encode'); // 'encode' or 'decode'
  const [encodingType, setEncodingType] = useState('component'); // 'component', 'uri', 'html', 'base64'
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [error, setError] = useState(null);

  const encodingTypes = {
    component: { name: 'URI Component', func: encodeURIComponent, decode: decodeURIComponent },
    uri: { name: 'Full URI', func: encodeURI, decode: decodeURI },
    html: { 
      name: 'HTML Entities', 
      func: (str) => str.replace(/[&<>"']/g, (m) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      }[m])),
      decode: (str) => str.replace(/&(amp|lt|gt|quot|#39);/g, (m) => ({
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&quot;': '"',
        '&#39;': "'"
      }[m]))
    },
    base64: { 
      name: 'Base64', 
      func: (str) => btoa(str), 
      decode: (str) => atob(str) 
    }
  };

  useEffect(() => {
    if (inputText) {
      try {
        const encoder = encodingTypes[encodingType];
        if (mode === 'encode') {
          setOutputText(encoder.func(inputText));
        } else {
          setOutputText(encoder.decode(inputText));
        }
        setError(null);
      } catch (err) {
        setOutputText('');
        setError(err.message);
      }
    } else {
      setOutputText('');
      setError(null);
    }
  }, [inputText, mode, encodingType]);

  const copyToClipboard = async (content) => {
    try {
      await navigator.clipboard.writeText(content);
      setOpenSnackbar(true);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const swapTexts = () => {
    setInputText(outputText);
    setMode(mode === 'encode' ? 'decode' : 'encode');
  };

  const downloadOutput = () => {
    const blob = new Blob([outputText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${mode}d_text.txt`;
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

  const urlExamples = [
    {
      name: 'Simple URL with spaces',
      text: 'https://example.com/search?q=hello world'
    },
    {
      name: 'URL with special characters',
      text: 'https://example.com/path?name=John&Doe&email=john@example.com'
    },
    {
      name: 'Complex query string',
      text: 'https://api.example.com/search?query=web development&category=programming&tags[]=javascript&tags[]=react'
    },
    {
      name: 'URL with Unicode',
      text: 'https://example.com/search?q=programmación&lang=español'
    },
    {
      name: 'HTML with special chars',
      text: '<script>alert("Hello & welcome!");</script>'
    }
  ];

  const analyzeUrl = (url) => {
    try {
      const urlObj = new URL(url);
      return {
        protocol: urlObj.protocol,
        hostname: urlObj.hostname,
        port: urlObj.port || 'default',
        pathname: urlObj.pathname,
        search: urlObj.search,
        hash: urlObj.hash,
        origin: urlObj.origin
      };
    } catch {
      return null;
    }
  };

  const urlAnalysis = inputText && !error ? analyzeUrl(inputText) : null;

  return (
    <Box sx={{ p: 2 }}>
      <Head>
        <title>{name ? `${name} - Dev Tools` : 'URL Encoder/Decoder - Dev Tools'}</title>
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
          {/* Encoding Options */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Encoding Options
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap', mb: 2 }}>
              <ToggleButtonGroup
                value={mode}
                exclusive
                onChange={(event, newMode) => newMode && setMode(newMode)}
                size="small"
              >
                <ToggleButton value="encode">Encode</ToggleButton>
                <ToggleButton value="decode">Decode</ToggleButton>
              </ToggleButtonGroup>
              
              <FormControl size="small" sx={{ minWidth: 160 }}>
                <InputLabel>Encoding Type</InputLabel>
                <Select
                  value={encodingType}
                  label="Encoding Type"
                  onChange={(e) => setEncodingType(e.target.value)}
                >
                  {Object.entries(encodingTypes).map(([key, type]) => (
                    <MenuItem key={key} value={key}>{type.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              
              <IconButton onClick={swapTexts} color="primary" title="Swap input/output">
                <SwapVertIcon />
              </IconButton>
            </Box>
          </Paper>

          {/* Input */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                Input {mode === 'encode' ? 'Text/URL' : 'Encoded Text'}
              </Typography>
              <Box>
                <input
                  accept=".txt,.url"
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
              multiline
              rows={6}
              fullWidth
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={mode === 'encode' ? 'Enter text or URL to encode...' : 'Enter encoded text to decode...'}
              variant="outlined"
            />
          </Paper>

          {/* Output */}
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                Output {mode === 'encode' ? 'Encoded Text' : 'Decoded Text/URL'}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                {!error && outputText && (
                  <>
                    <Chip 
                      icon={<CheckCircleIcon />}
                      label={`${mode}d Successfully`} 
                      color="success" 
                      size="small"
                    />
                    <IconButton onClick={() => copyToClipboard(outputText)}>
                      <ContentCopyIcon />
                    </IconButton>
                    <IconButton onClick={downloadOutput}>
                      <DownloadIcon />
                    </IconButton>
                  </>
                )}
                {error && (
                  <Chip 
                    icon={<ErrorIcon />}
                    label="Error" 
                    color="error" 
                    size="small"
                  />
                )}
              </Box>
            </Box>
            <TextField
              multiline
              rows={6}
              fullWidth
              value={error ? '' : outputText}
              InputProps={{ readOnly: true }}
              placeholder={error ? `Error: ${error}` : `${mode}d output will appear here...`}
              variant="outlined"
              error={!!error}
            />
            
            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                <Typography variant="subtitle2">Encoding Error:</Typography>
                <Typography variant="body2">{error}</Typography>
              </Alert>
            )}
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          {/* URL Analysis */}
          {urlAnalysis && (
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <LinkIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                  URL Analysis
                </Typography>
                <TableContainer>
                  <Table size="small">
                    <TableBody>
                      <TableRow>
                        <TableCell><strong>Protocol</strong></TableCell>
                        <TableCell>{urlAnalysis.protocol}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>Hostname</strong></TableCell>
                        <TableCell>{urlAnalysis.hostname}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>Port</strong></TableCell>
                        <TableCell>{urlAnalysis.port}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>Path</strong></TableCell>
                        <TableCell>{urlAnalysis.pathname || '/'}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>Query</strong></TableCell>
                        <TableCell>{urlAnalysis.search || 'None'}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>Fragment</strong></TableCell>
                        <TableCell>{urlAnalysis.hash || 'None'}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          )}

          {/* Quick Examples */}
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Examples
              </Typography>
              <List dense>
                {urlExamples.map((example, index) => (
                  <ListItem key={index} disablePadding>
                    <ListItemButton 
                      onClick={() => setInputText(example.text)}
                      sx={{ py: 0.5 }}
                    >
                      <ListItemText
                        primary={example.name}
                        secondary={
                          <Typography 
                            variant="caption" 
                            sx={{ fontFamily: 'monospace', display: 'block', mt: 0.5 }}
                          >
                            {example.text.length > 50 ? 
                              example.text.substring(0, 50) + '...' : 
                              example.text
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

          {/* Encoding Types Guide */}
          <Alert severity="info" sx={{ mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom>Encoding Types:</Typography>
            <Typography variant="body2" paragraph>
              • <strong>URI Component:</strong> Encodes all except: A-Z a-z 0-9 - _ . ! ~ * ' ( )
            </Typography>
            <Typography variant="body2" paragraph>
              • <strong>Full URI:</strong> Preserves URI structure, encodes only necessary chars
            </Typography>
            <Typography variant="body2" paragraph>
              • <strong>HTML Entities:</strong> Converts &amp;, &lt;, &gt;, &quot;, &apos; to HTML entities
            </Typography>
            <Typography variant="body2">
              • <strong>Base64:</strong> Binary-to-text encoding scheme
            </Typography>
          </Alert>

          {/* Encoding Tips */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Encoding Tips
              </Typography>
              <Typography variant="body2" paragraph>
                • Use URI Component for query parameters
              </Typography>
              <Typography variant="body2" paragraph>
                • Use Full URI for complete URLs
              </Typography>
              <Typography variant="body2" paragraph>
                • Use HTML Entities for web content
              </Typography>
              <Typography variant="body2" paragraph>
                • Always decode exactly with the same method used to encode
              </Typography>
              <Typography variant="body2">
                • Test with special characters: spaces, &, +, %, etc.
              </Typography>
            </CardContent>
          </Card>
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

export default UrlEncoderDecoder;