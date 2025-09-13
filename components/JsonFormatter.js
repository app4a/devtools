import React, { useState, useMemo } from 'react';
import {
  Typography,
  Box,
  IconButton,
  Snackbar,
  Paper,
  Grid,
  ToggleButtonGroup,
  ToggleButton,
  Button,
  Card,
  CardContent,
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
  Divider,
  TextField
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import DownloadIcon from '@mui/icons-material/Download';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-json';
import Head from 'next/head';

const LineNumberedEditor = ({ value, onValueChange, readOnly, placeholder, error }) => {
  const lineNumbers = useMemo(() => {
    if (!value) {
      return '1';
    }
    
    const lines = value.split('\n');
    const lineCount = lines.length;
    
    // Show line numbers for actual content lines
    // If the last character is a newline, show one additional line for the cursor
    const showExtraLine = value.endsWith('\n');
    const totalLines = showExtraLine ? lineCount + 1 : lineCount;
    
    return Array.from({ length: totalLines }, (_, i) => i + 1).join('\n');
  }, [value]);

  return (
    <Paper 
      variant="outlined" 
      sx={{ 
        display: 'flex', 
        flex: 1, 
        overflow: 'hidden',
        backgroundColor: error ? 'error.light' : 'background.paper',
        border: error ? '1px solid' : undefined,
        borderColor: error ? 'error.main' : undefined
      }}
    >
      <Box
        component="pre"
        sx={{
          textAlign: 'right',
          userSelect: 'none',
          p: 1,
          pr: 2,
          color: '#666',
          borderRight: 1,
          borderColor: 'divider',
          overflow: 'auto',
          fontFamily: 'monospace',
          fontSize: 14,
          lineHeight: '21px',
          margin: 0,
          backgroundColor: '#f5f5f5',
          minWidth: '40px'
        }}
      >
        {lineNumbers}
      </Box>
      <Editor
        value={value}
        onValueChange={onValueChange}
        highlight={(code) => highlight(code, languages.json, 'json')}
        padding={10}
        readOnly={readOnly}
        placeholder={placeholder}
        style={{
          flex: 1,
          fontFamily: 'monospace',
          fontSize: 14,
          lineHeight: '21px',
          overflow: 'auto',
          backgroundColor: 'transparent'
        }}
      />
    </Paper>
  );
};

export default function JsonFormatter({ name, description }) {
  const [rawJson, setRawJson] = useState('{"name": "John Doe", "age": 30, "city": "New York", "hobbies": ["reading", "gaming"], "active": true}');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [formatMode, setFormatMode] = useState('formatted');
  const [indentSize, setIndentSize] = useState(2);

  const { formattedJson, error, jsonStats, parsedData } = useMemo(() => {
    if (!rawJson.trim()) {
      return { formattedJson: '', error: null, jsonStats: null, parsedData: null };
    }
    
    try {
      const parsed = JSON.parse(rawJson);
      let formatted;
      
      switch (formatMode) {
        case 'minified':
          formatted = JSON.stringify(parsed);
          break;
        case 'formatted':
          formatted = JSON.stringify(parsed, null, indentSize);
          break;
        case 'tabs':
          formatted = JSON.stringify(parsed, null, '\t');
          break;
        default:
          formatted = JSON.stringify(parsed, null, 2);
      }

      // Calculate stats
      const calculateStats = (obj, stats = { objects: 0, arrays: 0, strings: 0, numbers: 0, booleans: 0, nulls: 0 }) => {
        if (obj === null) {
          stats.nulls++;
        } else if (Array.isArray(obj)) {
          stats.arrays++;
          obj.forEach(item => calculateStats(item, stats));
        } else if (typeof obj === 'object') {
          stats.objects++;
          Object.values(obj).forEach(value => calculateStats(value, stats));
        } else if (typeof obj === 'string') {
          stats.strings++;
        } else if (typeof obj === 'number') {
          stats.numbers++;
        } else if (typeof obj === 'boolean') {
          stats.booleans++;
        }
        return stats;
      };

      const jsonStats = calculateStats(parsed);
      jsonStats.totalKeys = JSON.stringify(parsed).match(/"/g)?.length / 2 || 0;
      jsonStats.size = new Blob([formatted]).size;
      jsonStats.lines = formatted.split('\n').length;

      return { formattedJson: formatted, error: null, jsonStats, parsedData: parsed };
    } catch (e) {
      return { formattedJson: '', error: e.message, jsonStats: null, parsedData: null };
    }
  }, [rawJson, formatMode, indentSize]);

  const copyToClipboard = async (content) => {
    try {
      await navigator.clipboard.writeText(content);
      setOpenSnackbar(true);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const downloadJson = () => {
    const blob = new Blob([formattedJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `formatted.json`;
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
        setRawJson(e.target.result);
      };
      reader.readAsText(file);
    }
  };

  const jsonExamples = [
    {
      name: 'Simple Object',
      json: '{"name": "John", "age": 30, "active": true}'
    },
    {
      name: 'Array of Objects',
      json: '[{"id": 1, "name": "Alice"}, {"id": 2, "name": "Bob"}]'
    },
    {
      name: 'Nested Structure',
      json: '{"user": {"profile": {"name": "Jane", "settings": {"theme": "dark", "notifications": true}}, "posts": [{"title": "Hello World", "date": "2024-01-15"}]}}'
    },
    {
      name: 'API Response',
      json: '{"status": "success", "data": {"users": [{"id": 1, "username": "admin", "roles": ["admin", "user"]}], "pagination": {"page": 1, "limit": 10, "total": 1}}}'
    }
  ];

  const getErrorDetails = (errorMessage) => {
    const match = errorMessage.match(/at position (\d+)/);
    if (match) {
      const position = parseInt(match[1]);
      const lines = rawJson.split('\n');
      let currentPos = 0;
      let lineNumber = 1;
      let columnNumber = 1;

      for (const line of lines) {
        if (currentPos + line.length >= position) {
          columnNumber = position - currentPos + 1;
          break;
        }
        currentPos += line.length + 1; // +1 for newline
        lineNumber++;
      }

      return { lineNumber, columnNumber, position };
    }
    return null;
  };

  const errorDetails = error ? getErrorDetails(error) : null;

  return (
    <Box sx={{ p: 2 }}>
      <Head>
        <title>{name ? `${name} - Dev Tools` : 'JSON Formatter & Validator - Dev Tools'}</title>
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
          {/* Format Options */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Format Options
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
              <ToggleButtonGroup
                value={formatMode}
                exclusive
                onChange={(e, newMode) => newMode && setFormatMode(newMode)}
                size="small"
              >
                <ToggleButton value="formatted">Formatted</ToggleButton>
                <ToggleButton value="minified">Minified</ToggleButton>
                <ToggleButton value="tabs">Tabs</ToggleButton>
              </ToggleButtonGroup>
              
              {formatMode === 'formatted' && (
                <TextField
                  size="small"
                  label="Indent Size"
                  type="number"
                  value={indentSize}
                  onChange={(e) => setIndentSize(Math.max(1, parseInt(e.target.value) || 2))}
                  sx={{ width: 120 }}
                  inputProps={{ min: 1, max: 8 }}
                />
              )}
            </Box>
          </Paper>

          {/* Input JSON */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                Input JSON
              </Typography>
              <Box>
                <input
                  accept=".json,.txt"
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
            <LineNumberedEditor
              value={rawJson}
              onValueChange={setRawJson}
              placeholder="Paste or type your JSON here..."
              error={!!error}
            />
            
            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                <Typography variant="subtitle2">JSON Parse Error:</Typography>
                <Typography variant="body2">{error}</Typography>
                {errorDetails && (
                  <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                    Line {errorDetails.lineNumber}, Column {errorDetails.columnNumber} (Position {errorDetails.position})
                  </Typography>
                )}
              </Alert>
            )}
          </Paper>

          {/* Output JSON */}
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                Formatted Output
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                {!error && formattedJson && (
                  <>
                    <Chip 
                      icon={<CheckCircleIcon />}
                      label="Valid JSON" 
                      color="success" 
                      size="small"
                    />
                    <IconButton onClick={() => copyToClipboard(formattedJson)}>
                      <ContentCopyIcon />
                    </IconButton>
                    <IconButton onClick={downloadJson}>
                      <DownloadIcon />
                    </IconButton>
                  </>
                )}
                {error && (
                  <Chip 
                    icon={<ErrorIcon />}
                    label="Invalid JSON" 
                    color="error" 
                    size="small"
                  />
                )}
              </Box>
            </Box>
            <LineNumberedEditor
              value={error ? 'Fix the JSON errors above to see formatted output' : formattedJson}
              readOnly
              error={!!error}
            />
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          {/* JSON Statistics */}
          {jsonStats && (
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <InfoIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                  JSON Statistics
                </Typography>
                <TableContainer>
                  <Table size="small">
                    <TableBody>
                      <TableRow>
                        <TableCell>Objects</TableCell>
                        <TableCell align="right">{jsonStats.objects}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Arrays</TableCell>
                        <TableCell align="right">{jsonStats.arrays}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Strings</TableCell>
                        <TableCell align="right">{jsonStats.strings}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Numbers</TableCell>
                        <TableCell align="right">{jsonStats.numbers}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Booleans</TableCell>
                        <TableCell align="right">{jsonStats.booleans}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Nulls</TableCell>
                        <TableCell align="right">{jsonStats.nulls}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>Size</strong></TableCell>
                        <TableCell align="right"><strong>{jsonStats.size} bytes</strong></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>Lines</strong></TableCell>
                        <TableCell align="right"><strong>{jsonStats.lines}</strong></TableCell>
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
                {jsonExamples.map((example, index) => (
                  <ListItem key={index} disablePadding>
                    <ListItemButton 
                      onClick={() => setRawJson(example.json)}
                      sx={{ py: 0.5 }}
                    >
                      <ListItemText
                        primary={example.name}
                        secondary={
                          <Typography 
                            variant="caption" 
                            sx={{ fontFamily: 'monospace', display: 'block', mt: 0.5 }}
                          >
                            {example.json.length > 60 ? 
                              example.json.substring(0, 60) + '...' : 
                              example.json
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

          {/* Format Options Guide */}
          <Alert severity="info" sx={{ mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom>Format Options:</Typography>
            <Typography variant="body2" paragraph>
              • <strong>Formatted:</strong> Pretty-printed with indentation
            </Typography>
            <Typography variant="body2" paragraph>
              • <strong>Minified:</strong> Compact, single-line format
            </Typography>
            <Typography variant="body2">
              • <strong>Tabs:</strong> Uses tab characters for indentation
            </Typography>
          </Alert>

          {/* JSON Tips */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                JSON Tips
              </Typography>
              <Typography variant="body2" paragraph>
                • Strings must be in double quotes
              </Typography>
              <Typography variant="body2" paragraph>
                • No trailing commas allowed
              </Typography>
              <Typography variant="body2" paragraph>
                • No comments supported in JSON
              </Typography>
              <Typography variant="body2" paragraph>
                • Valid data types: string, number, boolean, null, object, array
              </Typography>
              <Typography variant="body2">
                • Use online validators for complex schemas
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