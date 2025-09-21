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
  ToggleButtonGroup,
  ToggleButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControlLabel,
  Switch,
  Chip
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import DownloadIcon from '@mui/icons-material/Download';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TableViewIcon from '@mui/icons-material/TableView';
import DataObjectIcon from '@mui/icons-material/DataObject';
import CodeIcon from '@mui/icons-material/Code';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Head from 'next/head';

export default function CsvConverter({ name, description }) {
  const [inputData, setInputData] = useState('');
  const [outputData, setOutputData] = useState('');
  const [inputFormat, setInputFormat] = useState('csv');
  const [outputFormat, setOutputFormat] = useState('json');
  const [csvDelimiter, setCsvDelimiter] = useState(',');
  const [hasHeaders, setHasHeaders] = useState(true);
  const [prettyFormat, setPrettyFormat] = useState(true);
  const [customDelimiter, setCustomDelimiter] = useState('');
  const [xmlRootElement, setXmlRootElement] = useState('root');
  const [xmlItemElement, setXmlItemElement] = useState('item');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [conversionError, setConversionError] = useState('');

  const formatOptions = {
    csv: { name: 'CSV', icon: <TableViewIcon /> },
    json: { name: 'JSON', icon: <DataObjectIcon /> },
    xml: { name: 'XML', icon: <CodeIcon /> }
  };

  const delimiterOptions = {
    ',': 'Comma (,)',
    ';': 'Semicolon (;)',
    '\t': 'Tab',
    '|': 'Pipe (|)',
    'custom': 'Custom'
  };

  // CSV parsing function
  const parseCSV = (csvData, delimiter = ',', hasHeaders = true) => {
    try {
      const lines = csvData.trim().split('\n');
      if (lines.length === 0) return [];

      const actualDelimiter = delimiter === 'custom' ? customDelimiter : delimiter;
      
      const parseCSVLine = (line) => {
        const result = [];
        let current = '';
        let inQuotes = false;
        let i = 0;

        while (i < line.length) {
          const char = line[i];
          const nextChar = line[i + 1];

          if (char === '"') {
            if (inQuotes && nextChar === '"') {
              current += '"';
              i++; // Skip next quote
            } else {
              inQuotes = !inQuotes;
            }
          } else if (char === actualDelimiter && !inQuotes) {
            result.push(current);
            current = '';
          } else {
            current += char;
          }
          i++;
        }
        result.push(current);
        return result;
      };

      const parsedLines = lines.map(line => parseCSVLine(line));
      
      if (hasHeaders && parsedLines.length > 0) {
        const headers = parsedLines[0];
        const dataLines = parsedLines.slice(1);
        
        return dataLines.map(line => {
          const obj = {};
          headers.forEach((header, index) => {
            const value = line[index] || '';
            // Try to convert to appropriate type
            if (!isNaN(value) && value !== '') {
              obj[header] = Number(value);
            } else if (value.toLowerCase() === 'true' || value.toLowerCase() === 'false') {
              obj[header] = value.toLowerCase() === 'true';
            } else {
              obj[header] = value;
            }
          });
          return obj;
        });
      } else {
        return parsedLines.map((line, index) => {
          const obj = {};
          line.forEach((cell, cellIndex) => {
            obj[`column${cellIndex + 1}`] = cell;
          });
          return obj;
        });
      }
    } catch (error) {
      throw new Error(`CSV parsing error: ${error.message}`);
    }
  };

  // JSON to CSV conversion
  const jsonToCSV = (jsonData, delimiter = ',') => {
    try {
      const data = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
      if (!Array.isArray(data) || data.length === 0) {
        throw new Error('JSON data should be an array of objects');
      }

      const actualDelimiter = delimiter === 'custom' ? customDelimiter : delimiter;
      
      // Get all unique keys from all objects
      const allKeys = [...new Set(data.flatMap(obj => Object.keys(obj)))];
      
      // Create header row
      const headers = allKeys.map(key => `"${key}"`).join(actualDelimiter);
      
      // Create data rows
      const rows = data.map(obj => {
        return allKeys.map(key => {
          const value = obj[key];
          if (value === null || value === undefined) return '""';
          const stringValue = String(value);
          // Escape quotes and wrap in quotes if contains delimiter, quotes, or newlines
          if (stringValue.includes(actualDelimiter) || stringValue.includes('"') || stringValue.includes('\n')) {
            return `"${stringValue.replace(/"/g, '""')}"`;
          }
          return `"${stringValue}"`;
        }).join(actualDelimiter);
      });

      return [headers, ...rows].join('\n');
    } catch (error) {
      throw new Error(`JSON to CSV conversion error: ${error.message}`);
    }
  };

  // JSON to XML conversion
  const jsonToXML = (jsonData, rootElement = 'root', itemElement = 'item') => {
    try {
      const data = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
      
      const convertValue = (value) => {
        if (value === null || value === undefined) return '';
        if (typeof value === 'object') {
          if (Array.isArray(value)) {
            return value.map(item => convertValue(item)).join('');
          } else {
            return Object.entries(value).map(([key, val]) => 
              `<${key}>${convertValue(val)}</${key}>`
            ).join('');
          }
        }
        return String(value);
      };

      if (Array.isArray(data)) {
        const items = data.map(item => {
          const content = Object.entries(item).map(([key, value]) => 
            `<${key}>${convertValue(value)}</${key}>`
          ).join('');
          return `<${itemElement}>${content}</${itemElement}>`;
        }).join('');
        
        return prettyFormat 
          ? `<?xml version="1.0" encoding="UTF-8"?>\n<${rootElement}>\n${items.replace(/></g, '>\n<')}\n</${rootElement}>`
          : `<?xml version="1.0" encoding="UTF-8"?><${rootElement}>${items}</${rootElement}>`;
      } else {
        const content = Object.entries(data).map(([key, value]) => 
          `<${key}>${convertValue(value)}</${key}>`
        ).join('');
        
        return prettyFormat
          ? `<?xml version="1.0" encoding="UTF-8"?>\n<${rootElement}>\n${content.replace(/></g, '>\n<')}\n</${rootElement}>`
          : `<?xml version="1.0" encoding="UTF-8"?><${rootElement}>${content}</${rootElement}>`;
      }
    } catch (error) {
      throw new Error(`JSON to XML conversion error: ${error.message}`);
    }
  };

  // XML to JSON conversion
  const xmlToJSON = (xmlData) => {
    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlData.trim(), 'text/xml');
      
      if (xmlDoc.getElementsByTagName('parsererror').length > 0) {
        throw new Error('Invalid XML format');
      }

      const convertElement = (element) => {
        if (element.children.length === 0) {
          return element.textContent;
        }

        const obj = {};
        const children = Array.from(element.children);
        
        children.forEach(child => {
          const key = child.tagName;
          const value = convertElement(child);
          
          if (obj[key]) {
            if (Array.isArray(obj[key])) {
              obj[key].push(value);
            } else {
              obj[key] = [obj[key], value];
            }
          } else {
            obj[key] = value;
          }
        });

        return obj;
      };

      const result = convertElement(xmlDoc.documentElement);
      return result;
    } catch (error) {
      throw new Error(`XML to JSON conversion error: ${error.message}`);
    }
  };

  // CSV to XML conversion
  const csvToXML = (csvData, delimiter = ',', hasHeaders = true) => {
    try {
      const jsonData = parseCSV(csvData, delimiter, hasHeaders);
      return jsonToXML(jsonData, xmlRootElement, xmlItemElement);
    } catch (error) {
      throw new Error(`CSV to XML conversion error: ${error.message}`);
    }
  };

  // XML to CSV conversion
  const xmlToCSV = (xmlData, delimiter = ',') => {
    try {
      const jsonData = xmlToJSON(xmlData);
      
      // Convert to array if it's not already
      let arrayData = Array.isArray(jsonData[Object.keys(jsonData)[0]]) 
        ? jsonData[Object.keys(jsonData)[0]]
        : [jsonData];
        
      return jsonToCSV(arrayData, delimiter);
    } catch (error) {
      throw new Error(`XML to CSV conversion error: ${error.message}`);
    }
  };

  // Main conversion function
  const convertData = () => {
    if (!inputData.trim()) {
      setConversionError('Please enter data to convert');
      return;
    }

    try {
      setConversionError('');
      let result = '';

      if (inputFormat === 'csv' && outputFormat === 'json') {
        const jsonData = parseCSV(inputData, csvDelimiter, hasHeaders);
        result = prettyFormat ? JSON.stringify(jsonData, null, 2) : JSON.stringify(jsonData);
      } else if (inputFormat === 'json' && outputFormat === 'csv') {
        result = jsonToCSV(inputData, csvDelimiter);
      } else if (inputFormat === 'csv' && outputFormat === 'xml') {
        result = csvToXML(inputData, csvDelimiter, hasHeaders);
      } else if (inputFormat === 'xml' && outputFormat === 'json') {
        const jsonData = xmlToJSON(inputData);
        result = prettyFormat ? JSON.stringify(jsonData, null, 2) : JSON.stringify(jsonData);
      } else if (inputFormat === 'json' && outputFormat === 'xml') {
        result = jsonToXML(inputData, xmlRootElement, xmlItemElement);
      } else if (inputFormat === 'xml' && outputFormat === 'csv') {
        result = xmlToCSV(inputData, csvDelimiter);
      } else {
        throw new Error('Unsupported conversion type');
      }

      setOutputData(result);
      setSnackbarMessage('Data converted successfully!');
      setOpenSnackbar(true);
    } catch (error) {
      setConversionError(error.message);
      setOutputData('');
    }
  };

  // Auto convert when input changes
  useEffect(() => {
    if (inputData.trim()) {
      convertData();
    } else {
      setOutputData('');
      setConversionError('');
    }
  }, [inputData, inputFormat, outputFormat, csvDelimiter, hasHeaders, prettyFormat, customDelimiter, xmlRootElement, xmlItemElement]);

  const swapFormats = () => {
    setInputData(outputData);
    setOutputData('');
    const oldInputFormat = inputFormat;
    setInputFormat(outputFormat);
    setOutputFormat(oldInputFormat);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setSnackbarMessage('Copied to clipboard!');
      setOpenSnackbar(true);
    });
  };

  const downloadData = (data, format) => {
    const blob = new Blob([data], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `converted.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    setSnackbarMessage(`${format.toUpperCase()} file downloaded!`);
    setOpenSnackbar(true);
  };

  const loadSampleData = () => {
    const samples = {
      csv: `name,age,city,email
John Doe,28,New York,john@example.com
Jane Smith,32,Los Angeles,jane@example.com
Mike Johnson,25,Chicago,mike@example.com`,
      json: `[
  {
    "name": "John Doe",
    "age": 28,
    "city": "New York",
    "email": "john@example.com"
  },
  {
    "name": "Jane Smith", 
    "age": 32,
    "city": "Los Angeles",
    "email": "jane@example.com"
  },
  {
    "name": "Mike Johnson",
    "age": 25,
    "city": "Chicago", 
    "email": "mike@example.com"
  }
]`,
      xml: `<?xml version="1.0" encoding="UTF-8"?>
<root>
  <item>
    <name>John Doe</name>
    <age>28</age>
    <city>New York</city>
    <email>john@example.com</email>
  </item>
  <item>
    <name>Jane Smith</name>
    <age>32</age>
    <city>Los Angeles</city>
    <email>jane@example.com</email>
  </item>
  <item>
    <name>Mike Johnson</name>
    <age>25</age>
    <city>Chicago</city>
    <email>mike@example.com</email>
  </item>
</root>`
    };

    setInputData(samples[inputFormat] || '');
    setSnackbarMessage(`Sample ${inputFormat.toUpperCase()} data loaded!`);
    setOpenSnackbar(true);
  };

  const statistics = {
    inputSize: inputData.length,
    outputSize: outputData.length,
    inputLines: inputData.split('\n').length,
    outputLines: outputData.split('\n').length
  };

  return (
    <Box sx={{ p: 2 }}>
      <Head>
        <title>{name} | AI Developer Tools</title>
        <meta name="description" content={description} />
      </Head>

      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
        <SwapHorizIcon sx={{ mr: 2, verticalAlign: 'middle' }} />
        CSV ↔ JSON ↔ XML Converter
      </Typography>

      <Grid container spacing={3}>
        {/* Controls */}
        <Grid size={{ xs: 12 }}>
          <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <FormControl fullWidth>
                  <InputLabel>From</InputLabel>
                  <Select
                    value={inputFormat}
                    onChange={(e) => setInputFormat(e.target.value)}
                  >
                    {Object.entries(formatOptions).map(([key, option]) => (
                      <MenuItem key={key} value={key}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {option.icon}
                          {option.name}
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid size={{ xs: 12, sm: 12, md: 1 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <IconButton onClick={swapFormats} disabled={!outputData}>
                    <SwapHorizIcon />
                  </IconButton>
                </Box>
              </Grid>

              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <FormControl fullWidth>
                  <InputLabel>To</InputLabel>
                  <Select
                    value={outputFormat}
                    onChange={(e) => setOutputFormat(e.target.value)}
                  >
                    {Object.entries(formatOptions).map(([key, option]) => (
                      <MenuItem key={key} value={key}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {option.icon}
                          {option.name}
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={prettyFormat}
                      onChange={(e) => setPrettyFormat(e.target.checked)}
                    />
                  }
                  label="Pretty Format"
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button size="small" variant="outlined" onClick={loadSampleData}>
                    Load Sample
                  </Button>
                  <Button size="small" variant="outlined" onClick={() => { setInputData(''); setOutputData(''); }}>
                    Clear
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Input */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper elevation={2} sx={{ height: 600 }}>
            <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6">
                {formatOptions[inputFormat].icon}
                <Box component="span" sx={{ ml: 1 }}>Input ({formatOptions[inputFormat].name})</Box>
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button size="small" onClick={() => copyToClipboard(inputData)} disabled={!inputData}>
                  <ContentCopyIcon />
                </Button>
              </Box>
            </Box>
            
            <TextField
              multiline
              fullWidth
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
              placeholder={`Enter your ${formatOptions[inputFormat].name} data here...`}
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  height: 'calc(600px - 73px)',
                  alignItems: 'flex-start',
                  overflow: 'hidden',
                  '& fieldset': { border: 'none' },
                  '& textarea': {
                    fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
                    fontSize: '14px',
                    verticalAlign: 'top',
                    overflow: 'auto !important',
                    resize: 'none',
                    height: '100% !important',
                    maxHeight: '100%'
                  }
                }
              }}
            />
          </Paper>
        </Grid>

        {/* Output */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper elevation={2} sx={{ height: 600 }}>
            <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6">
                {formatOptions[outputFormat].icon}
                <Box component="span" sx={{ ml: 1 }}>Output ({formatOptions[outputFormat].name})</Box>
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button size="small" onClick={() => copyToClipboard(outputData)} disabled={!outputData}>
                  <ContentCopyIcon />
                </Button>
                <Button size="small" onClick={() => downloadData(outputData, outputFormat)} disabled={!outputData}>
                  <DownloadIcon />
                </Button>
              </Box>
            </Box>
            
            {conversionError ? (
              <Box sx={{ p: 2 }}>
                <Alert severity="error">{conversionError}</Alert>
              </Box>
            ) : (
              <TextField
                multiline
                fullWidth
                value={outputData}
                placeholder={`Converted ${formatOptions[outputFormat].name} will appear here...`}
                variant="outlined"
                InputProps={{ readOnly: true }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    height: conversionError ? 'calc(600px - 125px)' : 'calc(600px - 73px)',
                    alignItems: 'flex-start',
                    overflow: 'hidden',
                    '& fieldset': { border: 'none' },
                    '& textarea': {
                      fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
                      fontSize: '14px',
                      verticalAlign: 'top',
                      overflow: 'auto !important',
                      resize: 'none',
                      height: '100% !important',
                      maxHeight: '100%'
                    }
                  }
                }}
              />
            )}
          </Paper>
        </Grid>

        {/* Settings */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">CSV Settings</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <FormControl fullWidth>
                  <InputLabel>Delimiter</InputLabel>
                  <Select
                    value={csvDelimiter}
                    onChange={(e) => setCsvDelimiter(e.target.value)}
                  >
                    {Object.entries(delimiterOptions).map(([key, name]) => (
                      <MenuItem key={key} value={key}>{name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                
                {csvDelimiter === 'custom' && (
                  <TextField
                    label="Custom Delimiter"
                    value={customDelimiter}
                    onChange={(e) => setCustomDelimiter(e.target.value)}
                    placeholder="Enter custom delimiter"
                    fullWidth
                  />
                )}

                <FormControlLabel
                  control={
                    <Switch
                      checked={hasHeaders}
                      onChange={(e) => setHasHeaders(e.target.checked)}
                    />
                  }
                  label="First row contains headers"
                />
              </Box>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">XML Settings</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  label="Root Element Name"
                  value={xmlRootElement}
                  onChange={(e) => setXmlRootElement(e.target.value)}
                  fullWidth
                />
                <TextField
                  label="Item Element Name"
                  value={xmlItemElement}
                  onChange={(e) => setXmlItemElement(e.target.value)}
                  fullWidth
                />
              </Box>
            </AccordionDetails>
          </Accordion>
        </Grid>

        {/* Statistics */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Statistics
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 6, sm: 3 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h5" color="primary">
                    {statistics.inputSize}
                  </Typography>
                  <Typography variant="body2">Input Size</Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 6, sm: 3 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h5" color="success.main">
                    {statistics.outputSize}
                  </Typography>
                  <Typography variant="body2">Output Size</Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 6, sm: 3 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h5" color="warning.main">
                    {statistics.inputLines}
                  </Typography>
                  <Typography variant="body2">Input Lines</Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 6, sm: 3 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h5" color="error.main">
                    {statistics.outputLines}
                  </Typography>
                  <Typography variant="body2">Output Lines</Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
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
