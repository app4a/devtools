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
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Stack,
  FormControlLabel,
  Switch
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ClearIcon from '@mui/icons-material/Clear';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DownloadIcon from '@mui/icons-material/Download';
import InfoIcon from '@mui/icons-material/Info';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import DeleteIcon from '@mui/icons-material/Delete';
import Head from 'next/head';

// Case conversion functions
const caseConverters = {
  camelCase: (str) => {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
  },
  
  PascalCase: (str) => {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => {
      return word.toUpperCase();
    }).replace(/\s+/g, '');
  },
  
  'snake_case': (str) => {
    return str.replace(/\W+/g, ' ')
      .split(/ |\B(?=[A-Z])/)
      .map(word => word.toLowerCase())
      .join('_');
  },
  
  'kebab-case': (str) => {
    return str.replace(/\W+/g, ' ')
      .split(/ |\B(?=[A-Z])/)
      .map(word => word.toLowerCase())
      .join('-');
  },
  
  'UPPER_CASE': (str) => {
    return str.replace(/\W+/g, ' ')
      .split(/ |\B(?=[A-Z])/)
      .map(word => word.toUpperCase())
      .join('_');
  },
  
  'lower case': (str) => {
    return str.toLowerCase().replace(/[_-]/g, ' ');
  },
  
  'Title Case': (str) => {
    return str.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }).replace(/[_-]/g, ' ');
  },
  
  'dot.case': (str) => {
    return str.replace(/\W+/g, ' ')
      .split(/ |\B(?=[A-Z])/)
      .map(word => word.toLowerCase())
      .join('.');
  },
  
  'UPPER CASE': (str) => {
    return str.toUpperCase().replace(/[_-]/g, ' ');
  },
  
  'alternating cAsE': (str) => {
    return str.split('').map((char, index) => {
      return index % 2 === 0 ? char.toLowerCase() : char.toUpperCase();
    }).join('');
  }
};

export default function TextCaseConverter({ name, description }) {
  const [inputText, setInputText] = useState('Hello World Example Text');
  const [selectedCases, setSelectedCases] = useState(['camelCase', 'PascalCase', 'snake_case', 'kebab-case']);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [batchInput, setBatchInput] = useState('');
  const [batchSeparator, setBatchSeparator] = useState('\n');
  const [preserveSpacing, setPreserveSpacing] = useState(false);

  // Calculate conversions
  const conversions = useMemo(() => {
    if (!inputText.trim()) return {};
    
    const results = {};
    Object.keys(caseConverters).forEach(caseType => {
      try {
        results[caseType] = caseConverters[caseType](inputText);
      } catch (error) {
        results[caseType] = 'Error in conversion';
      }
    });
    
    return results;
  }, [inputText]);

  // Calculate batch conversions
  const batchConversions = useMemo(() => {
    if (!batchInput.trim()) return [];
    
    const lines = batchInput.split(batchSeparator).filter(line => line.trim());
    return lines.map(line => {
      const results = { original: line };
      selectedCases.forEach(caseType => {
        try {
          results[caseType] = caseConverters[caseType](line);
        } catch (error) {
          results[caseType] = 'Error';
        }
      });
      return results;
    });
  }, [batchInput, batchSeparator, selectedCases]);

  // Load favorites from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('textCaseConverter_favorites');
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
    localStorage.setItem('textCaseConverter_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text).then(() => {
      setSnackbarMessage(`${label} copied to clipboard!`);
      setOpenSnackbar(true);
    });
  };

  const copyAllResults = () => {
    const results = selectedCases.map(caseType => 
      `${caseType}: ${conversions[caseType] || 'N/A'}`
    ).join('\n');
    
    copyToClipboard(results, 'All conversions');
  };

  const downloadResults = () => {
    const content = tabValue === 0 
      ? selectedCases.map(caseType => 
          `${caseType}: ${conversions[caseType] || 'N/A'}`
        ).join('\n')
      : batchConversions.map(row => {
          const line = [row.original, ...selectedCases.map(c => row[c] || 'N/A')];
          return line.join(',');
        }).join('\n');
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `case-conversions-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    setSnackbarMessage('Results downloaded!');
    setOpenSnackbar(true);
  };

  const toggleFavorite = (caseType) => {
    setFavorites(prev => {
      if (prev.includes(caseType)) {
        return prev.filter(f => f !== caseType);
      } else {
        return [...prev, caseType];
      }
    });
  };

  const toggleCaseSelection = (caseType) => {
    setSelectedCases(prev => {
      if (prev.includes(caseType)) {
        return prev.filter(c => c !== caseType);
      } else {
        return [...prev, caseType];
      }
    });
  };

  const clearAll = () => {
    setInputText('');
    setBatchInput('');
  };

  const statistics = {
    inputLength: inputText.length,
    wordCount: inputText.trim().split(/\s+/).length,
    caseTypes: Object.keys(caseConverters).length,
    selectedCount: selectedCases.length
  };

  return (
    <Box sx={{ p: 2 }}>
      <Head>
        <title>{name} | Developer Tools</title>
        <meta name="description" content={description} />
      </Head>

      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
        <TextFieldsIcon sx={{ mr: 2, verticalAlign: 'middle' }} />
        Text Case Converter
      </Typography>

      <Grid container spacing={3}>
        {/* Input Section */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper elevation={2} sx={{ p: 2, height: 'fit-content' }}>
            <Typography variant="h6" gutterBottom>
              Input Text
            </Typography>
            
            <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)} sx={{ mb: 2 }}>
              <Tab label="Single Text" />
              <Tab label="Batch Convert" />
            </Tabs>

            {tabValue === 0 ? (
              <TextField
                fullWidth
                multiline
                rows={6}
                variant="outlined"
                placeholder="Enter text to convert case..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                sx={{ mb: 2 }}
              />
            ) : (
              <>
                <TextField
                  fullWidth
                  multiline
                  rows={6}
                  variant="outlined"
                  placeholder="Enter multiple texts (one per line)..."
                  value={batchInput}
                  onChange={(e) => setBatchInput(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Separator"
                  value={batchSeparator}
                  onChange={(e) => setBatchSeparator(e.target.value)}
                  size="small"
                  sx={{ width: 120 }}
                />
              </>
            )}

            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 2 }}>
              <Button
                variant="outlined"
                size="small"
                onClick={clearAll}
                startIcon={<ClearIcon />}
              >
                Clear
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={copyAllResults}
                startIcon={<ContentCopyIcon />}
              >
                Copy All
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={downloadResults}
                startIcon={<DownloadIcon />}
              >
                Download
              </Button>
            </Box>

            {/* Statistics */}
            <Card sx={{ mt: 2 }}>
              <CardContent>
                <Typography variant="subtitle2" gutterBottom>
                  Statistics
                </Typography>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 6 }}>
                    <Typography variant="body2">
                      Characters: <strong>{statistics.inputLength}</strong>
                    </Typography>
                    <Typography variant="body2">
                      Words: <strong>{statistics.wordCount}</strong>
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <Typography variant="body2">
                      Available Cases: <strong>{statistics.caseTypes}</strong>
                    </Typography>
                    <Typography variant="body2">
                      Selected: <strong>{statistics.selectedCount}</strong>
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Paper>
        </Grid>

        {/* Results Section */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Converted Cases
            </Typography>

            {/* Case Selection */}
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Select Cases to Display:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {Object.keys(caseConverters).map(caseType => (
                  <Chip
                    key={caseType}
                    label={caseType}
                    onClick={() => toggleCaseSelection(caseType)}
                    color={selectedCases.includes(caseType) ? 'primary' : 'default'}
                    variant={selectedCases.includes(caseType) ? 'filled' : 'outlined'}
                    size="small"
                    icon={favorites.includes(caseType) ? <BookmarkIcon /> : undefined}
                    onDelete={favorites.includes(caseType) ? () => toggleFavorite(caseType) : undefined}
                    deleteIcon={<BookmarkIcon />}
                  />
                ))}
              </Box>
            </Box>

            {tabValue === 0 ? (
              /* Single Text Results */
              <Box sx={{ maxHeight: 400, overflowY: 'auto' }}>
                {selectedCases.map(caseType => (
                  <Card key={caseType} sx={{ mb: 1 }}>
                    <CardContent sx={{ py: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="subtitle2" color="primary">
                          {caseType}
                        </Typography>
                        <Box>
                          <IconButton
                            size="small"
                            onClick={() => toggleFavorite(caseType)}
                            color={favorites.includes(caseType) ? 'primary' : 'default'}
                          >
                            <BookmarkIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => copyToClipboard(conversions[caseType], caseType)}
                          >
                            <ContentCopyIcon />
                          </IconButton>
                        </Box>
                      </Box>
                      <Typography variant="body2" sx={{ mt: 1, wordBreak: 'break-all' }}>
                        {conversions[caseType]}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            ) : (
              /* Batch Results */
              <TableContainer sx={{ maxHeight: 400 }}>
                <Table size="small" stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell>Original</TableCell>
                      {selectedCases.map(caseType => (
                        <TableCell key={caseType}>{caseType}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {batchConversions.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{row.original}</TableCell>
                        {selectedCases.map(caseType => (
                          <TableCell key={caseType} sx={{ wordBreak: 'break-all' }}>
                            {row[caseType]}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Paper>
        </Grid>

        {/* Help Section */}
        <Grid size={{ xs: 12 }}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">
                <InfoIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Case Types & Examples
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Case Type</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Example</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>camelCase</TableCell>
                      <TableCell>First word lowercase, subsequent words capitalized</TableCell>
                      <TableCell>helloWorldExample</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>PascalCase</TableCell>
                      <TableCell>All words capitalized, no spaces</TableCell>
                      <TableCell>HelloWorldExample</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>snake_case</TableCell>
                      <TableCell>All lowercase with underscores</TableCell>
                      <TableCell>hello_world_example</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>kebab-case</TableCell>
                      <TableCell>All lowercase with hyphens</TableCell>
                      <TableCell>hello-world-example</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>UPPER_CASE</TableCell>
                      <TableCell>All uppercase with underscores</TableCell>
                      <TableCell>HELLO_WORLD_EXAMPLE</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Title Case</TableCell>
                      <TableCell>Each word capitalized with spaces</TableCell>
                      <TableCell>Hello World Example</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
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
