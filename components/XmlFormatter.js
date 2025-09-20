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
  Slider,
  ToggleButtonGroup,
  ToggleButton,
  Tabs,
  Tab
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ClearIcon from '@mui/icons-material/Clear';
import CodeIcon from '@mui/icons-material/Code';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DownloadIcon from '@mui/icons-material/Download';
import InfoIcon from '@mui/icons-material/Info';
import CompressIcon from '@mui/icons-material/Compress';
import FormatIndentIncreaseIcon from '@mui/icons-material/FormatIndentIncrease';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import SearchIcon from '@mui/icons-material/Search';
import Head from 'next/head';

// Simple XML formatter
const formatXml = (xml, options = {}) => {
  const {
    indentSize = 2,
    insertSpaces = true,
    insertFinalNewline = true,
    trimTrailingWhitespace = true
  } = options;

  if (!xml.trim()) return '';

  try {
    const indent = insertSpaces ? ' '.repeat(indentSize) : '\t';
    let formatted = xml;
    let indentLevel = 0;
    let result = '';
    
    // Remove existing whitespace between tags
    formatted = formatted.replace(/>\s*</g, '><');
    
    // Split by tags
    const tags = formatted.split(/(<[^>]*>)/);
    
    for (let i = 0; i < tags.length; i++) {
      const tag = tags[i];
      
      if (!tag) continue;
      
      if (tag.startsWith('<?')) {
        // XML declaration
        result += tag + '\n';
      } else if (tag.startsWith('<!--')) {
        // Comment
        result += indent.repeat(indentLevel) + tag + '\n';
      } else if (tag.startsWith('</')) {
        // Closing tag
        indentLevel = Math.max(0, indentLevel - 1);
        result += indent.repeat(indentLevel) + tag + '\n';
      } else if (tag.startsWith('<') && tag.endsWith('/>')) {
        // Self-closing tag
        result += indent.repeat(indentLevel) + tag + '\n';
      } else if (tag.startsWith('<')) {
        // Opening tag
        result += indent.repeat(indentLevel) + tag + '\n';
        indentLevel++;
      } else if (tag.trim()) {
        // Text content
        result += indent.repeat(indentLevel) + tag.trim() + '\n';
      }
    }
    
    if (trimTrailingWhitespace) {
      result = result.split('\n').map(line => line.trimEnd()).join('\n');
    }
    
    if (insertFinalNewline && !result.endsWith('\n')) {
      result += '\n';
    }
    
    return result.trim() + (insertFinalNewline ? '\n' : '');
  } catch (error) {
    throw new Error('Failed to format XML: ' + error.message);
  }
};

// Simple XML minifier
const minifyXml = (xml) => {
  if (!xml.trim()) return '';
  
  try {
    let minified = xml;
    
    // Remove comments
    minified = minified.replace(/<!--[\s\S]*?-->/g, '');
    
    // Remove unnecessary whitespace
    minified = minified.replace(/>\s+</g, '><');
    minified = minified.replace(/\s+/g, ' ');
    
    // Remove whitespace around tags
    minified = minified.replace(/\s*<\s*/g, '<');
    minified = minified.replace(/\s*>\s*/g, '>');
    
    return minified.trim();
  } catch (error) {
    throw new Error('Failed to minify XML: ' + error.message);
  }
};

// Simple XML validator
const validateXml = (xml) => {
  const errors = [];
  const warnings = [];
  
  if (!xml.trim()) {
    return { valid: true, errors: [], warnings: [] };
  }
  
  try {
    // Basic structure validation
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, 'text/xml');
    
    // Check for parsing errors
    const parserErrors = doc.getElementsByTagName('parsererror');
    if (parserErrors.length > 0) {
      errors.push('XML parsing error: ' + parserErrors[0].textContent);
    }
    
    // Check for well-formedness
    const tags = xml.match(/<[^>]+>/g) || [];
    const openTags = [];
    
    tags.forEach((tag, index) => {
      if (tag.startsWith('<?') || tag.startsWith('<!--')) {
        // Skip processing instructions and comments
        return;
      }
      
      if (tag.endsWith('/>')) {
        // Self-closing tag - no action needed
        return;
      }
      
      if (tag.startsWith('</')) {
        // Closing tag
        const tagName = tag.slice(2, -1).split(' ')[0];
        const lastOpen = openTags.pop();
        if (!lastOpen || lastOpen !== tagName) {
          errors.push(`Mismatched closing tag: ${tag}`);
        }
      } else {
        // Opening tag
        const tagName = tag.slice(1, -1).split(' ')[0];
        openTags.push(tagName);
      }
    });
    
    // Check for unclosed tags
    if (openTags.length > 0) {
      errors.push(`Unclosed tags: ${openTags.join(', ')}`);
    }
    
    // Check for common issues
    if (xml.includes('&') && !xml.match(/&(amp|lt|gt|quot|apos);/)) {
      warnings.push('Unescaped ampersand found - consider using &amp;');
    }
    
    if (xml.includes('<') && xml.includes('>') && !xml.match(/^<\?xml/)) {
      warnings.push('XML declaration missing');
    }
    
    return {
      valid: errors.length === 0,
      errors: errors.slice(0, 10),
      warnings: warnings.slice(0, 10)
    };
  } catch (error) {
    errors.push('Validation error: ' + error.message);
    return {
      valid: false,
      errors,
      warnings
    };
  }
};

// Simple XPath tester
const testXPath = (xml, xpath) => {
  if (!xml.trim() || !xpath.trim()) {
    return { results: [], error: null };
  }
  
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, 'text/xml');
    
    // Check for parsing errors
    const parserErrors = doc.getElementsByTagName('parsererror');
    if (parserErrors.length > 0) {
      return { results: [], error: 'XML parsing error' };
    }
    
    // Simple XPath simulation (basic queries only)
    const results = [];
    
    if (xpath.startsWith('//')) {
      // Find all elements with tag name
      const tagName = xpath.slice(2).split('[')[0];
      const elements = doc.getElementsByTagName(tagName);
      for (let i = 0; i < elements.length; i++) {
        results.push({
          type: 'element',
          tagName: elements[i].tagName,
          textContent: elements[i].textContent,
          attributes: Array.from(elements[i].attributes).reduce((acc, attr) => {
            acc[attr.name] = attr.value;
            return acc;
          }, {})
        });
      }
    } else if (xpath.startsWith('/')) {
      // Simple path query
      const path = xpath.slice(1).split('/');
      let current = [doc.documentElement];
      
      for (const segment of path) {
        const next = [];
        for (const node of current) {
          if (node && node.children) {
            for (const child of node.children) {
              if (child.tagName === segment) {
                next.push(child);
              }
            }
          }
        }
        current = next;
      }
      
      current.forEach(node => {
        results.push({
          type: 'element',
          tagName: node.tagName,
          textContent: node.textContent,
          attributes: Array.from(node.attributes).reduce((acc, attr) => {
            acc[attr.name] = attr.value;
            return acc;
          }, {})
        });
      });
    }
    
    return { results: results.slice(0, 20), error: null }; // Limit results
  } catch (error) {
    return { results: [], error: error.message };
  }
};

// Convert XML to JSON
const xmlToJson = (xml) => {
  if (!xml.trim()) return '';
  
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, 'text/xml');
    
    const parserErrors = doc.getElementsByTagName('parsererror');
    if (parserErrors.length > 0) {
      throw new Error('XML parsing error');
    }
    
    const convertNode = (node) => {
      const obj = {};
      
      // Add attributes
      if (node.attributes && node.attributes.length > 0) {
        obj['@attributes'] = {};
        for (let i = 0; i < node.attributes.length; i++) {
          const attr = node.attributes[i];
          obj['@attributes'][attr.name] = attr.value;
        }
      }
      
      // Add child nodes
      if (node.childNodes && node.childNodes.length > 0) {
        for (let i = 0; i < node.childNodes.length; i++) {
          const child = node.childNodes[i];
          
          if (child.nodeType === Node.TEXT_NODE) {
            const text = child.textContent.trim();
            if (text) {
              obj['#text'] = text;
            }
          } else if (child.nodeType === Node.ELEMENT_NODE) {
            const childObj = convertNode(child);
            
            if (obj[child.tagName]) {
              // Multiple elements with same name - convert to array
              if (!Array.isArray(obj[child.tagName])) {
                obj[child.tagName] = [obj[child.tagName]];
              }
              obj[child.tagName].push(childObj);
            } else {
              obj[child.tagName] = childObj;
            }
          }
        }
      }
      
      return obj;
    };
    
    const result = {};
    result[doc.documentElement.tagName] = convertNode(doc.documentElement);
    
    return JSON.stringify(result, null, 2);
  } catch (error) {
    throw new Error('Failed to convert XML to JSON: ' + error.message);
  }
};

export default function XmlFormatter({ name, description }) {
  const [inputXml, setInputXml] = useState(`<?xml version="1.0" encoding="UTF-8"?>
<bookstore>
<book id="1" category="fiction">
<title>The Great Gatsby</title>
<author>F. Scott Fitzgerald</author>
<price>12.99</price>
</book>
<book id="2" category="mystery">
<title>The Da Vinci Code</title>
<author>Dan Brown</author>
<price>15.99</price>
</book>
</bookstore>`);
  const [outputXml, setOutputXml] = useState('');
  const [mode, setMode] = useState('format');
  const [indentSize, setIndentSize] = useState(2);
  const [insertSpaces, setInsertSpaces] = useState(true);
  const [insertFinalNewline, setInsertFinalNewline] = useState(true);
  const [trimTrailingWhitespace, setTrimTrailingWhitespace] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [autoProcess, setAutoProcess] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [xpathQuery, setXpathQuery] = useState('//book');
  const [jsonOutput, setJsonOutput] = useState('');

  // Validation results
  const validation = useMemo(() => {
    return validateXml(inputXml);
  }, [inputXml]);

  // XPath results
  const xpathResults = useMemo(() => {
    return testXPath(inputXml, xpathQuery);
  }, [inputXml, xpathQuery]);

  // Process XML based on mode
  const processXml = () => {
    if (!inputXml.trim()) {
      setOutputXml('');
      setJsonOutput('');
      return;
    }

    try {
      let result = '';
      
      if (mode === 'format') {
        result = formatXml(inputXml, {
          indentSize,
          insertSpaces,
          insertFinalNewline,
          trimTrailingWhitespace
        });
      } else if (mode === 'minify') {
        result = minifyXml(inputXml);
      } else if (mode === 'json') {
        result = xmlToJson(inputXml);
        setJsonOutput(result);
        setSnackbarMessage('XML converted to JSON successfully!');
        setOpenSnackbar(true);
        return;
      }
      
      setOutputXml(result);
      setSnackbarMessage(`XML ${mode === 'format' ? 'formatted' : 'minified'} successfully!`);
      setOpenSnackbar(true);
    } catch (error) {
      setSnackbarMessage('Error: ' + error.message);
      setOpenSnackbar(true);
      setOutputXml('');
      setJsonOutput('');
    }
  };

  // Auto-process when settings change
  useEffect(() => {
    if (autoProcess) {
      const timeoutId = setTimeout(processXml, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [inputXml, mode, indentSize, insertSpaces, insertFinalNewline, trimTrailingWhitespace, autoProcess]);

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text).then(() => {
      setSnackbarMessage(`${label} copied to clipboard!`);
      setOpenSnackbar(true);
    });
  };

  const downloadFile = (content, filename) => {
    const blob = new Blob([content], { type: 'text/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    setSnackbarMessage('File downloaded!');
    setOpenSnackbar(true);
  };

  const swapInputOutput = () => {
    if (outputXml) {
      setInputXml(outputXml);
      setOutputXml('');
    }
  };

  const clearAll = () => {
    setInputXml('');
    setOutputXml('');
    setJsonOutput('');
    setXpathQuery('//book');
  };

  const statistics = {
    inputSize: new Blob([inputXml]).size,
    outputSize: new Blob([outputXml]).size,
    compressionRatio: outputXml ? ((1 - (new Blob([outputXml]).size / new Blob([inputXml]).size)) * 100).toFixed(1) : 0,
    inputLines: inputXml.split('\n').length,
    outputLines: outputXml.split('\n').length,
    valid: validation.valid,
    errors: validation.errors.length,
    warnings: validation.warnings.length,
    xpathResults: xpathResults.results.length
  };

  return (
    <Box sx={{ p: 2 }}>
      <Head>
        <title>{name} | Developer Tools</title>
        <meta name="description" content={description} />
      </Head>

      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
        <CodeIcon sx={{ mr: 2, verticalAlign: 'middle' }} />
        XML Formatter & Validator
      </Typography>

      <Grid container spacing={3}>
        {/* Settings Section */}
        <Grid size={{ xs: 12, md: 3 }}>
          <Paper elevation={2} sx={{ p: 2, height: 'fit-content' }}>
            <Typography variant="h6" gutterBottom>
              Settings
            </Typography>

            {/* Mode Selection */}
            <ToggleButtonGroup
              value={mode}
              exclusive
              onChange={(e, newMode) => newMode && setMode(newMode)}
              orientation="vertical"
              fullWidth
              sx={{ mb: 2 }}
            >
              <ToggleButton value="format">
                <FormatIndentIncreaseIcon sx={{ mr: 1 }} />
                Format
              </ToggleButton>
              <ToggleButton value="minify">
                <CompressIcon sx={{ mr: 1 }} />
                Minify
              </ToggleButton>
              <ToggleButton value="json">
                <CodeIcon sx={{ mr: 1 }} />
                To JSON
              </ToggleButton>
            </ToggleButtonGroup>

            {/* Format Settings */}
            {mode === 'format' && (
              <>
                <Typography gutterBottom>Indent Size: {indentSize}</Typography>
                <Slider
                  value={indentSize}
                  onChange={(e, newValue) => setIndentSize(newValue)}
                  min={1}
                  max={8}
                  marks={[
                    { value: 2, label: '2' },
                    { value: 4, label: '4' },
                    { value: 8, label: '8' }
                  ]}
                  sx={{ mb: 2 }}
                />

                <FormControlLabel
                  control={
                    <Switch
                      checked={insertSpaces}
                      onChange={(e) => setInsertSpaces(e.target.checked)}
                    />
                  }
                  label="Use spaces"
                  sx={{ mb: 1, display: 'block' }}
                />

                <FormControlLabel
                  control={
                    <Switch
                      checked={insertFinalNewline}
                      onChange={(e) => setInsertFinalNewline(e.target.checked)}
                    />
                  }
                  label="Insert final newline"
                  sx={{ mb: 1, display: 'block' }}
                />

                <FormControlLabel
                  control={
                    <Switch
                      checked={trimTrailingWhitespace}
                      onChange={(e) => setTrimTrailingWhitespace(e.target.checked)}
                    />
                  }
                  label="Trim trailing whitespace"
                  sx={{ mb: 2, display: 'block' }}
                />
              </>
            )}

            <FormControlLabel
              control={
                <Switch
                  checked={autoProcess}
                  onChange={(e) => setAutoProcess(e.target.checked)}
                />
              }
              label="Auto-process"
              sx={{ mb: 2, display: 'block' }}
            />

            {/* Action Buttons */}
            <Stack spacing={1}>
              <Button
                variant="contained"
                fullWidth
                onClick={processXml}
                startIcon={
                  mode === 'format' ? <FormatIndentIncreaseIcon /> :
                  mode === 'minify' ? <CompressIcon /> : <CodeIcon />
                }
              >
                {mode === 'format' ? 'Format' : mode === 'minify' ? 'Minify' : 'Convert'} XML
              </Button>
              <Button
                variant="outlined"
                fullWidth
                onClick={swapInputOutput}
                startIcon={<SwapVertIcon />}
                disabled={!outputXml}
              >
                Swap Input/Output
              </Button>
              <Button
                variant="outlined"
                fullWidth
                onClick={clearAll}
                startIcon={<ClearIcon />}
              >
                Clear All
              </Button>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => downloadFile(outputXml || inputXml, `xml-${mode}-${Date.now()}.xml`)}
                startIcon={<DownloadIcon />}
                disabled={!outputXml && !inputXml}
              >
                Download XML
              </Button>
              {jsonOutput && (
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => downloadFile(jsonOutput, `xml-converted-${Date.now()}.json`)}
                  startIcon={<DownloadIcon />}
                >
                  Download JSON
                </Button>
              )}
            </Stack>

            {/* Statistics */}
            <Card sx={{ mt: 2 }}>
              <CardContent>
                <Typography variant="subtitle2" gutterBottom>
                  Statistics
                </Typography>
                <Grid container spacing={1}>
                  <Grid size={{ xs: 6 }}>
                    <Typography variant="body2">
                      Input: <strong>{statistics.inputSize}B</strong>
                    </Typography>
                    <Typography variant="body2">
                      Lines: <strong>{statistics.inputLines}</strong>
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <Typography variant="body2">
                      Output: <strong>{statistics.outputSize}B</strong>
                    </Typography>
                    <Typography variant="body2">
                      Saved: <strong>{statistics.compressionRatio}%</strong>
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            {/* Validation Status */}
            <Card sx={{ mt: 1 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  {validation.valid ? (
                    <CheckCircleIcon color="success" />
                  ) : (
                    <ErrorIcon color="error" />
                  )}
                  <Typography variant="subtitle2">
                    {validation.valid ? 'Valid XML' : 'Invalid XML'}
                  </Typography>
                </Box>
                <Typography variant="body2">
                  Errors: <strong>{statistics.errors}</strong>
                </Typography>
                <Typography variant="body2">
                  Warnings: <strong>{statistics.warnings}</strong>
                </Typography>
              </CardContent>
            </Card>
          </Paper>
        </Grid>

        {/* Main Content */}
        <Grid size={{ xs: 12, md: 9 }}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)} sx={{ mb: 2 }}>
              <Tab label="Input/Output" />
              <Tab label="XPath Tester" />
              {jsonOutput && <Tab label="JSON Output" />}
            </Tabs>

            {tabValue === 0 && (
              <Grid container spacing={2}>
                {/* Input Section */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6">
                      Input XML
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() => copyToClipboard(inputXml, 'Input XML')}
                      disabled={!inputXml}
                    >
                      <ContentCopyIcon />
                    </IconButton>
                  </Box>

                  <TextField
                    fullWidth
                    multiline
                    rows={20}
                    variant="outlined"
                    placeholder="Enter XML to format, validate, or convert..."
                    value={inputXml}
                    onChange={(e) => setInputXml(e.target.value)}
                    sx={{
                      '& .MuiInputBase-input': {
                        fontFamily: 'monospace',
                        fontSize: '0.875rem'
                      }
                    }}
                  />
                </Grid>

                {/* Output Section */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6">
                      {mode === 'format' ? 'Formatted' : mode === 'minify' ? 'Minified' : 'JSON'} Output
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() => copyToClipboard(mode === 'json' ? jsonOutput : outputXml, 'Output')}
                      disabled={!outputXml && !jsonOutput}
                    >
                      <ContentCopyIcon />
                    </IconButton>
                  </Box>

                  <TextField
                    fullWidth
                    multiline
                    rows={20}
                    variant="outlined"
                    value={mode === 'json' ? jsonOutput : outputXml}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{
                      '& .MuiInputBase-input': {
                        fontFamily: 'monospace',
                        fontSize: '0.875rem'
                      }
                    }}
                  />
                </Grid>
              </Grid>
            )}

            {tabValue === 1 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  XPath Tester
                </Typography>
                
                <TextField
                  fullWidth
                  label="XPath Expression"
                  value={xpathQuery}
                  onChange={(e) => setXpathQuery(e.target.value)}
                  placeholder="//book or /bookstore/book"
                  sx={{ mb: 2 }}
                  InputProps={{
                    startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
                  }}
                />

                {xpathResults.error ? (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    XPath Error: {xpathResults.error}
                  </Alert>
                ) : (
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    Found {xpathResults.results.length} result(s)
                  </Typography>
                )}

                <Box sx={{ maxHeight: 400, overflowY: 'auto' }}>
                  {xpathResults.results.map((result, index) => (
                    <Card key={index} sx={{ mb: 1 }}>
                      <CardContent>
                        <Typography variant="subtitle2" gutterBottom>
                          &lt;{result.tagName}&gt;
                        </Typography>
                        {Object.keys(result.attributes).length > 0 && (
                          <Box sx={{ mb: 1 }}>
                            <Typography variant="caption" color="text.secondary">
                              Attributes:
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                              {Object.entries(result.attributes).map(([key, value]) => (
                                <Chip
                                  key={key}
                                  label={`${key}="${value}"`}
                                  size="small"
                                  variant="outlined"
                                />
                              ))}
                            </Box>
                          </Box>
                        )}
                        {result.textContent && (
                          <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                            {result.textContent}
                          </Typography>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              </Box>
            )}

            {tabValue === 2 && jsonOutput && (
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6">
                    JSON Conversion Result
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={() => copyToClipboard(jsonOutput, 'JSON output')}
                  >
                    <ContentCopyIcon />
                  </IconButton>
                </Box>

                <TextField
                  fullWidth
                  multiline
                  rows={20}
                  variant="outlined"
                  value={jsonOutput}
                  InputProps={{
                    readOnly: true,
                  }}
                  sx={{
                    '& .MuiInputBase-input': {
                      fontFamily: 'monospace',
                      fontSize: '0.875rem'
                    }
                  }}
                />
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Validation Results */}
        {(validation.errors.length > 0 || validation.warnings.length > 0) && (
          <Grid size={{ xs: 12 }}>
            <Paper elevation={2} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Validation Results
              </Typography>

              {validation.errors.length > 0 && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Errors ({validation.errors.length})
                  </Typography>
                  <ul style={{ margin: 0, paddingLeft: 20 }}>
                    {validation.errors.map((error, index) => (
                      <li key={index}>
                        <Typography variant="body2">{error}</Typography>
                      </li>
                    ))}
                  </ul>
                </Alert>
              )}

              {validation.warnings.length > 0 && (
                <Alert severity="warning">
                  <Typography variant="subtitle2" gutterBottom>
                    Warnings ({validation.warnings.length})
                  </Typography>
                  <ul style={{ margin: 0, paddingLeft: 20 }}>
                    {validation.warnings.map((warning, index) => (
                      <li key={index}>
                        <Typography variant="body2">{warning}</Typography>
                      </li>
                    ))}
                  </ul>
                </Alert>
              )}
            </Paper>
          </Grid>
        )}

        {/* Help Section */}
        <Grid size={{ xs: 12 }}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">
                <InfoIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                XML Tools Guide
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12 }} md={4}>
                  <Typography variant="subtitle1" gutterBottom>
                    XML Formatting
                  </Typography>
                  <Typography variant="body2" paragraph>
                    Formats XML with proper indentation and structure for better readability.
                    Customizable indent size and spacing options.
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12 }} md={4}>
                  <Typography variant="subtitle1" gutterBottom>
                    XML Validation
                  </Typography>
                  <Typography variant="body2" paragraph>
                    Validates XML structure, checks for well-formedness, matching tags,
                    and common syntax errors.
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12 }} md={4}>
                  <Typography variant="subtitle1" gutterBottom>
                    XPath Testing
                  </Typography>
                  <Typography variant="body2" paragraph>
                    Test XPath expressions against your XML. Supports basic queries like
                    //element and /root/child paths.
                  </Typography>
                </Grid>
              </Grid>
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
