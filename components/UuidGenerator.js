import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Typography,
  TextField,
  Paper,
  Grid,
  IconButton,
  Snackbar,
  Card,
  CardContent,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Stack,
  FormControlLabel,
  Switch,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ToggleButtonGroup,
  ToggleButton
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ClearIcon from '@mui/icons-material/Clear';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DownloadIcon from '@mui/icons-material/Download';
import InfoIcon from '@mui/icons-material/Info';
import RefreshIcon from '@mui/icons-material/Refresh';
import DeleteIcon from '@mui/icons-material/Delete';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Head from 'next/head';

// UUID generation functions
const generateUUIDv1 = () => {
  // Simplified UUID v1 (timestamp-based) - for demo purposes
  const timestamp = Date.now();
  const random = Math.random().toString(16).substring(2, 15);
  const timestampHex = timestamp.toString(16).padStart(12, '0');
  
  return [
    timestampHex.substring(0, 8),
    timestampHex.substring(8, 12),
    '1' + random.substring(0, 3), // version 1
    '8' + random.substring(3, 6),
    random.substring(6, 18).padEnd(12, '0')
  ].join('-');
};

const generateUUIDv4 = () => {
  // RFC 4122 compliant UUID v4
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

const generateUUIDv5 = (name, namespace = '6ba7b810-9dad-11d1-80b4-00c04fd430c8') => {
  // Simplified UUID v5 (SHA-1 hash-based) - for demo purposes
  const hash = btoa(namespace + name).replace(/[^a-f0-9]/gi, '').toLowerCase().padEnd(32, '0');
  
  return [
    hash.substring(0, 8),
    hash.substring(8, 12),
    '5' + hash.substring(13, 16), // version 5
    '8' + hash.substring(16, 19),
    hash.substring(19, 31)
  ].join('-');
};

const generateNil = () => '00000000-0000-0000-0000-000000000000';

const uuidVersions = {
  'UUID v1': {
    generator: generateUUIDv1,
    description: 'Time-based UUID with MAC address',
    example: '550e8400-e29b-41d4-a716-446655440000'
  },
  'UUID v4': {
    generator: generateUUIDv4,
    description: 'Random UUID (most common)',
    example: '6ba7b810-9dad-11d1-80b4-00c04fd430c8'
  },
  'UUID v5': {
    generator: generateUUIDv5,
    description: 'Name-based UUID using SHA-1',
    example: '886313e1-3b8a-5372-9b90-0c9aee199e5d'
  },
  'Nil UUID': {
    generator: generateNil,
    description: 'Special nil UUID (all zeros)',
    example: '00000000-0000-0000-0000-000000000000'
  }
};

const formatOptions = {
  'Lowercase': (uuid) => uuid.toLowerCase(),
  'Uppercase': (uuid) => uuid.toUpperCase(),
  'No Hyphens': (uuid) => uuid.replace(/-/g, ''),
  'Braces': (uuid) => `{${uuid}}`,
  'Parentheses': (uuid) => `(${uuid})`,
  'URN': (uuid) => `urn:uuid:${uuid}`
};

export default function UuidGenerator({ name, description }) {
  const [selectedVersion, setSelectedVersion] = useState('UUID v4');
  const [generatedUuids, setGeneratedUuids] = useState([]);
  const [bulkCount, setBulkCount] = useState(10);
  const [selectedFormat, setSelectedFormat] = useState('Lowercase');
  const [nameInput, setNameInput] = useState('example.com');
  const [namespaceInput, setNamespaceInput] = useState('6ba7b810-9dad-11d1-80b4-00c04fd430c8');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [autoGenerate, setAutoGenerate] = useState(true);

  // Load favorites from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('uuidGenerator_favorites');
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch (e) {
        console.error('Error loading favorites:', e);
      }
    }
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('uuidGenerator_favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Auto-generate on mount and version change
  useEffect(() => {
    if (autoGenerate) {
      generateSingle();
    }
  }, [selectedVersion, autoGenerate]);

  const generateSingle = () => {
    const generator = uuidVersions[selectedVersion].generator;
    let uuid;
    
    if (selectedVersion === 'UUID v5') {
      uuid = generator(nameInput, namespaceInput);
    } else {
      uuid = generator();
    }
    
    const formatted = formatOptions[selectedFormat](uuid);
    setGeneratedUuids([formatted]);
  };

  const generateBulk = () => {
    const generator = uuidVersions[selectedVersion].generator;
    const uuids = [];
    
    for (let i = 0; i < bulkCount; i++) {
      let uuid;
      if (selectedVersion === 'UUID v5') {
        uuid = generator(`${nameInput}-${i}`, namespaceInput);
      } else {
        uuid = generator();
      }
      uuids.push(formatOptions[selectedFormat](uuid));
    }
    
    setGeneratedUuids(uuids);
    setSnackbarMessage(`Generated ${bulkCount} UUIDs!`);
    setOpenSnackbar(true);
  };

  const validateUuid = (uuid) => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    const noDashRegex = /^[0-9a-f]{32}$/i;
    
    return uuidRegex.test(uuid) || noDashRegex.test(uuid);
  };

  const getUuidVersion = (uuid) => {
    const cleaned = uuid.replace(/[-{}()]/g, '').toLowerCase();
    if (cleaned === '00000000000000000000000000000000') return 'Nil UUID';
    if (cleaned.length !== 32) return 'Invalid';
    
    const versionChar = cleaned.charAt(12);
    switch (versionChar) {
      case '1': return 'UUID v1';
      case '2': return 'UUID v2';
      case '3': return 'UUID v3';
      case '4': return 'UUID v4';
      case '5': return 'UUID v5';
      default: return 'Unknown';
    }
  };

  const copyToClipboard = (text, label = 'UUID') => {
    navigator.clipboard.writeText(text).then(() => {
      setSnackbarMessage(`${label} copied to clipboard!`);
      setOpenSnackbar(true);
    });
  };

  const copyAllUuids = () => {
    const allUuids = generatedUuids.join('\n');
    copyToClipboard(allUuids, 'All UUIDs');
  };

  const downloadUuids = () => {
    const content = generatedUuids.join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `uuids-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    setSnackbarMessage('UUIDs downloaded!');
    setOpenSnackbar(true);
  };

  const downloadAsJson = () => {
    const jsonData = {
      generated_at: new Date().toISOString(),
      version: selectedVersion,
      format: selectedFormat,
      count: generatedUuids.length,
      uuids: generatedUuids.map((uuid, index) => ({
        id: index + 1,
        uuid: uuid,
        version: getUuidVersion(uuid),
        valid: validateUuid(uuid)
      }))
    };
    
    const content = JSON.stringify(jsonData, null, 2);
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `uuids-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    setSnackbarMessage('UUIDs downloaded as JSON!');
    setOpenSnackbar(true);
  };

  const downloadAsCsv = () => {
    const csvHeader = 'Index,UUID,Version,Valid\n';
    const csvRows = generatedUuids.map((uuid, index) => 
      `${index + 1},"${uuid}","${getUuidVersion(uuid)}",${validateUuid(uuid)}`
    ).join('\n');
    
    const content = csvHeader + csvRows;
    const blob = new Blob([content], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `uuids-${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    setSnackbarMessage('UUIDs downloaded as CSV!');
    setOpenSnackbar(true);
  };

  const addToFavorites = (uuid) => {
    const newFavorite = {
      uuid,
      version: getUuidVersion(uuid),
      timestamp: new Date().toISOString(),
      format: selectedFormat
    };
    
    setFavorites(prev => [newFavorite, ...prev.slice(0, 19)]); // Keep max 20 favorites
    setSnackbarMessage('Added to favorites!');
    setOpenSnackbar(true);
  };

  const removeFromFavorites = (index) => {
    setFavorites(prev => prev.filter((_, i) => i !== index));
  };

  const clearAll = () => {
    setGeneratedUuids([]);
    setNameInput('example.com');
    setNamespaceInput('6ba7b810-9dad-11d1-80b4-00c04fd430c8');
  };

  const statistics = {
    totalGenerated: generatedUuids.length,
    uniqueCount: new Set(generatedUuids).size,
    favoriteCount: favorites.length,
    currentVersion: selectedVersion,
    currentFormat: selectedFormat
  };

  return (
    <Box sx={{ p: 2 }}>
      <Head>
        <title>{name} | Developer Tools</title>
        <meta name="description" content={description} />
      </Head>

      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
        <FingerprintIcon sx={{ mr: 2, verticalAlign: 'middle' }} />
        UUID/GUID Generator
      </Typography>

      <Grid container spacing={3}>
        {/* Settings Section */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper elevation={2} sx={{ p: 2, height: 'fit-content' }}>
            <Typography variant="h6" gutterBottom>
              Generation Settings
            </Typography>

            {/* UUID Version */}
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>UUID Version</InputLabel>
              <Select
                value={selectedVersion}
                label="UUID Version"
                onChange={(e) => setSelectedVersion(e.target.value)}
              >
                {Object.keys(uuidVersions).map(version => (
                  <MenuItem key={version} value={version}>{version}</MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Format Options */}
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Format</InputLabel>
              <Select
                value={selectedFormat}
                label="Format"
                onChange={(e) => setSelectedFormat(e.target.value)}
              >
                {Object.keys(formatOptions).map(format => (
                  <MenuItem key={format} value={format}>{format}</MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* UUID v5 specific inputs */}
            {selectedVersion === 'UUID v5' && (
              <>
                <TextField
                  fullWidth
                  label="Name"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  sx={{ mb: 2 }}
                  helperText="The name to hash for UUID v5"
                />
                <TextField
                  fullWidth
                  label="Namespace UUID"
                  value={namespaceInput}
                  onChange={(e) => setNamespaceInput(e.target.value)}
                  sx={{ mb: 2 }}
                  helperText="The namespace UUID (default: DNS namespace)"
                />
              </>
            )}

            {/* Bulk Generation */}
            <TextField
              fullWidth
              type="number"
              label="Bulk Count"
              value={bulkCount}
              onChange={(e) => setBulkCount(Math.max(1, Math.min(1000, parseInt(e.target.value) || 1)))}
              inputProps={{ min: 1, max: 1000 }}
              sx={{ mb: 2 }}
              helperText="Generate multiple UUIDs at once (max 1000)"
            />

            {/* Settings */}
            <FormControlLabel
              control={
                <Switch
                  checked={autoGenerate}
                  onChange={(e) => setAutoGenerate(e.target.checked)}
                />
              }
              label="Auto-generate on version change"
              sx={{ mb: 2 }}
            />

            {/* Action Buttons */}
            <Stack spacing={1}>
              <Button
                variant="contained"
                fullWidth
                onClick={generateSingle}
                startIcon={<RefreshIcon />}
              >
                Generate Single
              </Button>
              <Button
                variant="outlined"
                fullWidth
                onClick={generateBulk}
                startIcon={<RefreshIcon />}
              >
                Generate {bulkCount} UUIDs
              </Button>
              <Button
                variant="outlined"
                fullWidth
                onClick={clearAll}
                startIcon={<ClearIcon />}
              >
                Clear All
              </Button>
            </Stack>

            {/* Statistics */}
            <Card sx={{ mt: 2 }}>
              <CardContent>
                <Typography variant="subtitle2" gutterBottom>
                  Statistics
                </Typography>
                <Typography variant="body2">
                  Generated: <strong>{statistics.totalGenerated}</strong>
                </Typography>
                <Typography variant="body2">
                  Unique: <strong>{statistics.uniqueCount}</strong>
                </Typography>
                <Typography variant="body2">
                  Favorites: <strong>{statistics.favoriteCount}</strong>
                </Typography>
                <Typography variant="body2">
                  Version: <strong>{statistics.currentVersion}</strong>
                </Typography>
              </CardContent>
            </Card>
          </Paper>
        </Grid>

        {/* Results Section */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                Generated UUIDs ({generatedUuids.length})
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  size="small"
                  onClick={copyAllUuids}
                  startIcon={<ContentCopyIcon />}
                  disabled={generatedUuids.length === 0}
                >
                  Copy All
                </Button>
                <Button
                  size="small"
                  onClick={downloadUuids}
                  startIcon={<DownloadIcon />}
                  disabled={generatedUuids.length === 0}
                >
                  Download
                </Button>
              </Box>
            </Box>

            <Box sx={{ maxHeight: 400, overflowY: 'auto', mb: 2 }}>
              {generatedUuids.map((uuid, index) => (
                <Card key={index} sx={{ mb: 1 }}>
                  <CardContent sx={{ py: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="body1" sx={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>
                          {uuid}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                          <Chip
                            label={getUuidVersion(uuid)}
                            size="small"
                            color="primary"
                            variant="outlined"
                          />
                          <Chip
                            label={validateUuid(uuid) ? 'Valid' : 'Invalid'}
                            size="small"
                            color={validateUuid(uuid) ? 'success' : 'error'}
                            variant="outlined"
                          />
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', gap: 0.5, ml: 1 }}>
                        <IconButton
                          size="small"
                          onClick={() => addToFavorites(uuid)}
                        >
                          <BookmarkIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => copyToClipboard(uuid)}
                        >
                          <ContentCopyIcon />
                        </IconButton>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>

            {/* Download Options */}
            {generatedUuids.length > 0 && (
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Button size="small" variant="outlined" onClick={downloadUuids}>
                  Download as TXT
                </Button>
                <Button size="small" variant="outlined" onClick={downloadAsJson}>
                  Download as JSON
                </Button>
                <Button size="small" variant="outlined" onClick={downloadAsCsv}>
                  Download as CSV
                </Button>
              </Box>
            )}
          </Paper>

          {/* Favorites */}
          {favorites.length > 0 && (
            <Paper elevation={2} sx={{ p: 2, mt: 2 }}>
              <Typography variant="h6" gutterBottom>
                Favorites ({favorites.length})
              </Typography>
              <Box sx={{ maxHeight: 200, overflowY: 'auto' }}>
                {favorites.map((favorite, index) => (
                  <Card key={index} sx={{ mb: 1 }}>
                    <CardContent sx={{ py: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="body2" sx={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>
                            {favorite.uuid}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {favorite.version} • {new Date(favorite.timestamp).toLocaleDateString()}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 0.5, ml: 1 }}>
                          <IconButton
                            size="small"
                            onClick={() => copyToClipboard(favorite.uuid)}
                          >
                            <ContentCopyIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => removeFromFavorites(index)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </Paper>
          )}
        </Grid>

        {/* Help Section */}
        <Grid size={{ xs: 12 }}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">
                <InfoIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                UUID/GUID Information
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                {Object.entries(uuidVersions).map(([version, info]) => (
                  <Grid size={{ xs: 12, sm: 6, md: 3 }} key={version}>
                    <Typography variant="subtitle1" gutterBottom>
                      {version}
                    </Typography>
                    <Typography variant="body2" paragraph>
                      {info.description}
                    </Typography>
                    <Typography variant="caption" sx={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>
                      {info.example}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body2">
                <strong>UUID (Universally Unique Identifier)</strong> is a 128-bit identifier used to uniquely 
                identify information in computer systems. UUIDs are standardized by RFC 4122 and are widely 
                used in databases, software systems, and distributed computing.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
      />
    </Box>
  );
}
