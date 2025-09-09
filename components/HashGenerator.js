import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  TextField,
  Typography,
  Paper,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Snackbar,
  Grid,
  Card,
  CardContent,
  Tabs,
  Tab,
  Alert,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ListItemButton,
  Divider,
  LinearProgress,
  FormControlLabel,
  Switch,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import DownloadIcon from '@mui/icons-material/Download';
import SecurityIcon from '@mui/icons-material/Security';
import InfoIcon from '@mui/icons-material/Info';
import SpeedIcon from '@mui/icons-material/Speed';
import CompareIcon from '@mui/icons-material/Compare';
import CryptoJS from 'crypto-js';

import Head from 'next/head';

export default function HashGenerator({ name, description }) {
  const [text, setText] = useState('The quick brown fox jumps over the lazy dog');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [tab, setTab] = useState(0);
  const [hmacKey, setHmacKey] = useState('secret-key');
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileHashing, setFileHashing] = useState(false);
  const [includeUppercase, setIncludeUppercase] = useState(false);
  const [selectedAlgorithms, setSelectedAlgorithms] = useState(['md5', 'sha1', 'sha256', 'sha512']);

  const allAlgorithms = {
    // Cryptographic Hash Functions
    md5: { 
      name: 'MD5', 
      func: (text) => CryptoJS.MD5(text).toString(), 
      category: 'Legacy',
      security: 'Weak',
      bits: 128,
      description: 'Legacy hash function, not secure for cryptographic use'
    },
    sha1: { 
      name: 'SHA-1', 
      func: (text) => CryptoJS.SHA1(text).toString(),
      category: 'Legacy', 
      security: 'Weak',
      bits: 160,
      description: 'Legacy SHA family, deprecated for security applications'
    },
    sha256: { 
      name: 'SHA-256', 
      func: (text) => CryptoJS.SHA256(text).toString(),
      category: 'SHA-2',
      security: 'Strong', 
      bits: 256,
      description: 'Most widely used secure hash function'
    },
    sha512: { 
      name: 'SHA-512', 
      func: (text) => CryptoJS.SHA512(text).toString(),
      category: 'SHA-2',
      security: 'Strong',
      bits: 512, 
      description: 'Stronger variant of SHA-256 with larger output'
    },
    sha3: { 
      name: 'SHA-3', 
      func: (text) => CryptoJS.SHA3(text).toString(),
      category: 'SHA-3',
      security: 'Strong',
      bits: 224,
      description: 'Latest SHA standard, different construction than SHA-2'
    },
    ripemd160: { 
      name: 'RIPEMD-160', 
      func: (text) => CryptoJS.RIPEMD160(text).toString(),
      category: 'RIPEMD',
      security: 'Good',
      bits: 160,
      description: 'European alternative to SHA-1, used in Bitcoin'
    },
    // HMAC variants
    hmacMd5: { 
      name: 'HMAC-MD5', 
      func: (text, key) => CryptoJS.HmacMD5(text, key).toString(),
      category: 'HMAC',
      security: 'Weak',
      bits: 128,
      description: 'HMAC using MD5, provides authentication'
    },
    hmacSha1: { 
      name: 'HMAC-SHA1', 
      func: (text, key) => CryptoJS.HmacSHA1(text, key).toString(),
      category: 'HMAC',
      security: 'Weak',
      bits: 160,
      description: 'HMAC using SHA-1, provides authentication'
    },
    hmacSha256: { 
      name: 'HMAC-SHA256', 
      func: (text, key) => CryptoJS.HmacSHA256(text, key).toString(),
      category: 'HMAC',
      security: 'Strong',
      bits: 256,
      description: 'HMAC using SHA-256, secure authentication'
    },
    hmacSha512: { 
      name: 'HMAC-SHA512', 
      func: (text, key) => CryptoJS.HmacSHA512(text, key).toString(),
      category: 'HMAC',
      security: 'Strong',
      bits: 512,
      description: 'HMAC using SHA-512, strongest authentication'
    }
  };

  const hashes = useMemo(() => {
    if (!text) return {};
    
    const result = {};
    const input = includeUppercase ? text.toUpperCase() : text;
    
    selectedAlgorithms.forEach(alg => {
      try {
        const algorithm = allAlgorithms[alg];
        if (algorithm.category === 'HMAC') {
          result[alg] = algorithm.func(input, hmacKey);
        } else {
          result[alg] = algorithm.func(input);
        }
      } catch (error) {
        result[alg] = `Error: ${error.message}`;
      }
    });
    
    return result;
  }, [text, hmacKey, includeUppercase, selectedAlgorithms]);

  const handleCopy = async (textToCopy) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setOpenSnackbar(true);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFileHashing(true);
      
      try {
        const text = await file.text();
        setText(text);
      } catch (error) {
        setText(`Error reading file: ${error.message}`);
      } finally {
        setFileHashing(false);
      }
    }
  };

  const downloadHashes = () => {
    const hashData = Object.entries(hashes)
      .map(([alg, hash]) => `${allAlgorithms[alg].name}: ${hash}`)
      .join('\n');
    
    const content = `Input: ${text}\n\nHashes:\n${hashData}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'hashes.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const hashExamples = [
    {
      name: 'Lorem Ipsum',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
      name: 'Test String',
      text: 'The quick brown fox jumps over the lazy dog'
    },
    {
      name: 'Password Example',
      text: 'MySecurePassword123!'
    },
    {
      name: 'JSON Data',
      text: '{"user": "john", "id": 12345, "active": true}'
    },
    {
      name: 'Empty String',
      text: ''
    },
    {
      name: 'Unicode Text',
      text: 'Hello 世界 🌍 émojis'
    }
  ];

  const algorithmsByCategory = {
    'Legacy': ['md5', 'sha1'],
    'SHA-2': ['sha256', 'sha512'],
    'SHA-3': ['sha3'],
    'RIPEMD': ['ripemd160'],
    'HMAC': ['hmacMd5', 'hmacSha1', 'hmacSha256', 'hmacSha512']
  };

  return (
    <Box sx={{ p: 2 }}>
      <Head>
        <title>{name ? `${name} - Dev Tools` : 'Hash & HMAC Generator - Dev Tools'}</title>
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
          {/* Input Section */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                Input Text
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={includeUppercase}
                      onChange={(e) => setIncludeUppercase(e.target.checked)}
                      size="small"
                    />
                  }
                  label="Uppercase"
                />
                <input
                  accept=".txt,.json,.js,.html,.css,.md"
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
            
            {fileHashing && <LinearProgress sx={{ mb: 2 }} />}
            
            <TextField
              multiline
              rows={6}
              fullWidth
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text to hash..."
              variant="outlined"
              sx={{ mb: 2 }}
            />
            
            {selectedFile && (
              <Alert severity="info" sx={{ mb: 2 }}>
                File loaded: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
              </Alert>
            )}
          </Paper>

          {/* HMAC Key Section */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              HMAC Configuration
            </Typography>
            <TextField
              label="HMAC Secret Key"
              fullWidth
              value={hmacKey}
              onChange={(e) => setHmacKey(e.target.value)}
              placeholder="Enter secret key for HMAC algorithms..."
              variant="outlined"
              helperText="Used for HMAC variants to provide message authentication"
            />
          </Paper>

          {/* Hash Results */}
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                Hash Results
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                {Object.keys(hashes).length > 0 && (
                  <>
                    <Button
                      startIcon={<DownloadIcon />}
                      onClick={downloadHashes}
                      size="small"
                    >
                      Download
                    </Button>
                  </>
                )}
              </Box>
            </Box>
            
            {Object.keys(hashes).length === 0 ? (
              <Alert severity="info">
                Enter text to generate hashes automatically
              </Alert>
            ) : (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>Algorithm</strong></TableCell>
                      <TableCell><strong>Hash Value</strong></TableCell>
                      <TableCell><strong>Length</strong></TableCell>
                      <TableCell><strong>Security</strong></TableCell>
                      <TableCell><strong>Actions</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Object.entries(hashes).map(([alg, hash]) => {
                      const algorithm = allAlgorithms[alg];
                      return (
                        <TableRow key={alg}>
                          <TableCell>
                            <Typography variant="subtitle2">
                              {algorithm.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {algorithm.category}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography 
                              variant="body2" 
                              sx={{ 
                                fontFamily: 'monospace', 
                                wordBreak: 'break-all',
                                fontSize: '0.75rem'
                              }}
                            >
                              {hash}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">
                              {hash.length} chars<br/>
                              <Typography variant="caption" color="text.secondary">
                                {algorithm.bits} bits
                              </Typography>
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip 
                              label={algorithm.security} 
                              size="small"
                              color={
                                algorithm.security === 'Strong' ? 'success' :
                                algorithm.security === 'Good' ? 'warning' : 'error'
                              }
                            />
                          </TableCell>
                          <TableCell>
                            <IconButton 
                              onClick={() => handleCopy(hash)}
                              size="small"
                            >
                              <ContentCopyIcon fontSize="small" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          {/* Algorithm Selection */}
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <SecurityIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                Algorithm Selection
              </Typography>
              
              {Object.entries(algorithmsByCategory).map(([category, algs]) => (
                <Box key={category} sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    {category}
                  </Typography>
                  {algs.map(alg => (
                    <FormControlLabel
                      key={alg}
                      control={
                        <Switch
                          checked={selectedAlgorithms.includes(alg)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedAlgorithms([...selectedAlgorithms, alg]);
                            } else {
                              setSelectedAlgorithms(selectedAlgorithms.filter(a => a !== alg));
                            }
                          }}
                          size="small"
                        />
                      }
                      label={
                        <Box>
                          <Typography variant="body2">
                            {allAlgorithms[alg].name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {allAlgorithms[alg].bits} bits
                          </Typography>
                        </Box>
                      }
                      sx={{ display: 'block', mb: 0.5 }}
                    />
                  ))}
                  {category !== 'HMAC' && <Divider sx={{ mt: 1 }} />}
                </Box>
              ))}
            </CardContent>
          </Card>

          {/* Quick Examples */}
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Examples
              </Typography>
              <List dense>
                {hashExamples.map((example, index) => (
                  <ListItem key={index} disablePadding>
                    <ListItemButton 
                      onClick={() => setText(example.text)}
                      sx={{ py: 0.5 }}
                    >
                      <ListItemText
                        primary={example.name}
                        secondary={
                          <Typography 
                            variant="caption" 
                            sx={{ fontFamily: 'monospace', display: 'block', mt: 0.5 }}
                          >
                            {example.text.length > 40 ? 
                              example.text.substring(0, 40) + '...' : 
                              example.text || '(empty)'
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

          {/* Hash Information */}
          <Alert severity="info" sx={{ mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom>Hash Security Guide:</Typography>
            <Typography variant="body2" paragraph>
              • <strong>Strong:</strong> SHA-256, SHA-512, HMAC variants - Recommended for security
            </Typography>
            <Typography variant="body2" paragraph>
              • <strong>Good:</strong> RIPEMD-160 - Acceptable for some uses
            </Typography>
            <Typography variant="body2">
              • <strong>Weak:</strong> MD5, SHA-1 - Only for checksums, not security
            </Typography>
          </Alert>

          {/* Hash Tips */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Hash Tips
              </Typography>
              <Typography variant="body2" paragraph>
                • Use SHA-256 or SHA-512 for cryptographic security
              </Typography>
              <Typography variant="body2" paragraph>
                • HMAC variants provide message authentication
              </Typography>
              <Typography variant="body2" paragraph>
                • MD5 and SHA-1 are deprecated for security uses
              </Typography>
              <Typography variant="body2" paragraph>
                • Longer hashes (SHA-512) are more secure but slower
              </Typography>
              <Typography variant="body2">
                • Always use proper salt for password hashing
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