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
  ToggleButton
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
import Head from 'next/head';

// Simple JavaScript formatter
const formatJavaScript = (code, options = {}) => {
  const {
    indentSize = 2,
    insertSpaces = true,
    insertFinalNewline = true,
    trimTrailingWhitespace = true,
    preserveNewlines = false,
    maxLineLength = 120
  } = options;

  if (!code.trim()) return '';

  try {
    let formatted = code;
    const indent = insertSpaces ? ' '.repeat(indentSize) : '\t';
    let indentLevel = 0;
    let lines = [];
    let inString = false;
    let stringChar = '';
    let inComment = false;
    let inMultiComment = false;
    
    // Split into characters for processing
    const chars = formatted.split('');
    let currentLine = '';
    
    for (let i = 0; i < chars.length; i++) {
      const char = chars[i];
      const nextChar = chars[i + 1] || '';
      const prevChar = chars[i - 1] || '';
      
      // Handle string literals
      if (!inComment && !inMultiComment && (char === '"' || char === "'" || char === '`')) {
        if (!inString) {
          inString = true;
          stringChar = char;
        } else if (char === stringChar && prevChar !== '\\') {
          inString = false;
          stringChar = '';
        }
      }
      
      // Handle comments
      if (!inString) {
        if (char === '/' && nextChar === '/') {
          inComment = true;
        } else if (char === '/' && nextChar === '*') {
          inMultiComment = true;
        } else if (inMultiComment && char === '*' && nextChar === '/') {
          inMultiComment = false;
          currentLine += char;
          continue;
        } else if (inComment && char === '\n') {
          inComment = false;
        }
      }
      
      // Handle newlines
      if (char === '\n') {
        if (trimTrailingWhitespace) {
          currentLine = currentLine.trimEnd();
        }
        lines.push(currentLine);
        currentLine = '';
        continue;
      }
      
      // Handle brackets and indentation
      if (!inString && !inComment && !inMultiComment) {
        if (char === '{') {
          currentLine += char;
          if (trimTrailingWhitespace) {
            currentLine = currentLine.trimEnd();
          }
          lines.push(currentLine);
          currentLine = '';
          indentLevel++;
          continue;
        } else if (char === '}') {
          indentLevel = Math.max(0, indentLevel - 1);
          if (currentLine.trim()) {
            if (trimTrailingWhitespace) {
              currentLine = currentLine.trimEnd();
            }
            lines.push(currentLine);
            currentLine = '';
          }
          currentLine = indent.repeat(indentLevel) + char;
          continue;
        } else if (char === ';') {
          currentLine += char;
          if (nextChar !== '\n' && nextChar !== '' && !preserveNewlines) {
            if (trimTrailingWhitespace) {
              currentLine = currentLine.trimEnd();
            }
            lines.push(currentLine);
            currentLine = '';
            continue;
          }
        }
      }
      
      // Add character to current line
      if (currentLine === '' && char !== ' ' && char !== '\t' && !inString && !inComment && !inMultiComment) {
        currentLine = indent.repeat(indentLevel);
      }
      
      currentLine += char;
    }
    
    // Add final line
    if (currentLine.trim()) {
      if (trimTrailingWhitespace) {
        currentLine = currentLine.trimEnd();
      }
      lines.push(currentLine);
    }
    
    formatted = lines.join('\n');
    
    if (insertFinalNewline && !formatted.endsWith('\n')) {
      formatted += '\n';
    }
    
    return formatted;
  } catch (error) {
    throw new Error('Failed to format JavaScript: ' + error.message);
  }
};

// Simple JavaScript minifier
const minifyJavaScript = (code) => {
  if (!code.trim()) return '';
  
  try {
    let minified = code;
    
    // Remove single-line comments
    minified = minified.replace(/\/\/.*$/gm, '');
    
    // Remove multi-line comments
    minified = minified.replace(/\/\*[\s\S]*?\*\//g, '');
    
    // Remove unnecessary whitespace
    minified = minified.replace(/\s+/g, ' ');
    
    // Remove spaces around operators and punctuation
    minified = minified.replace(/\s*([{}();,:])\s*/g, '$1');
    minified = minified.replace(/\s*([=+\-*/%&|^<>!]=?)\s*/g, '$1');
    
    // Remove trailing whitespace
    minified = minified.trim();
    
    return minified;
  } catch (error) {
    throw new Error('Failed to minify JavaScript: ' + error.message);
  }
};

// Simple JavaScript validator
const validateJavaScript = (code) => {
  const errors = [];
  const warnings = [];
  
  if (!code.trim()) {
    return { valid: true, errors: [], warnings: [] };
  }
  
  try {
    // Basic syntax validation using Function constructor
    new Function(code);
    
    // Check for common issues
    const lines = code.split('\n');
    
    lines.forEach((line, index) => {
      const lineNum = index + 1;
      
      // Check for missing semicolons
      if (line.trim() && 
          !line.trim().endsWith(';') && 
          !line.trim().endsWith('{') && 
          !line.trim().endsWith('}') &&
          !line.trim().startsWith('//') &&
          !line.trim().startsWith('*') &&
          !line.includes('//')) {
        warnings.push(`Line ${lineNum}: Consider adding semicolon`);
      }
      
      // Check for console.log
      if (line.includes('console.log')) {
        warnings.push(`Line ${lineNum}: console.log found (consider removing for production)`);
      }
      
      // Check for == instead of ===
      if (line.includes('==') && !line.includes('===') && !line.includes('!==')) {
        warnings.push(`Line ${lineNum}: Consider using === or !== instead of == or !=`);
      }
      
      // Check for var usage
      if (line.includes('var ')) {
        warnings.push(`Line ${lineNum}: Consider using let or const instead of var`);
      }
    });
    
    return {
      valid: true,
      errors: [],
      warnings: warnings.slice(0, 10) // Limit warnings
    };
  } catch (error) {
    errors.push(error.message);
    return {
      valid: false,
      errors,
      warnings
    };
  }
};

export default function JavaScriptFormatter({ name, description }) {
  const [inputCode, setInputCode] = useState(`function greetUser(name) {
if(name){
console.log("Hello, "+name+"!");
}else{
console.log("Hello, World!");
}
return true;
}`);
  const [outputCode, setOutputCode] = useState('');
  const [mode, setMode] = useState('format');
  const [indentSize, setIndentSize] = useState(2);
  const [insertSpaces, setInsertSpaces] = useState(true);
  const [insertFinalNewline, setInsertFinalNewline] = useState(true);
  const [trimTrailingWhitespace, setTrimTrailingWhitespace] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [autoProcess, setAutoProcess] = useState(false);

  // Validation results
  const validation = useMemo(() => {
    return validateJavaScript(inputCode);
  }, [inputCode]);

  // Process code based on mode
  const processCode = () => {
    if (!inputCode.trim()) {
      setOutputCode('');
      return;
    }

    try {
      let result = '';
      
      if (mode === 'format') {
        result = formatJavaScript(inputCode, {
          indentSize,
          insertSpaces,
          insertFinalNewline,
          trimTrailingWhitespace
        });
      } else if (mode === 'minify') {
        result = minifyJavaScript(inputCode);
      }
      
      setOutputCode(result);
      setSnackbarMessage(`JavaScript ${mode === 'format' ? 'formatted' : 'minified'} successfully!`);
      setOpenSnackbar(true);
    } catch (error) {
      setSnackbarMessage('Error: ' + error.message);
      setOpenSnackbar(true);
      setOutputCode('');
    }
  };

  // Auto-process when settings change
  useEffect(() => {
    if (autoProcess) {
      const timeoutId = setTimeout(processCode, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [inputCode, mode, indentSize, insertSpaces, insertFinalNewline, trimTrailingWhitespace, autoProcess]);

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text).then(() => {
      setSnackbarMessage(`${label} copied to clipboard!`);
      setOpenSnackbar(true);
    });
  };

  const downloadCode = () => {
    const content = outputCode || inputCode;
    const blob = new Blob([content], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `script-${mode}-${Date.now()}.js`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    setSnackbarMessage('JavaScript file downloaded!');
    setOpenSnackbar(true);
  };

  const swapInputOutput = () => {
    if (outputCode) {
      setInputCode(outputCode);
      setOutputCode('');
    }
  };

  const clearAll = () => {
    setInputCode('');
    setOutputCode('');
  };

  const statistics = {
    inputSize: new Blob([inputCode]).size,
    outputSize: new Blob([outputCode]).size,
    compressionRatio: outputCode ? ((1 - (new Blob([outputCode]).size / new Blob([inputCode]).size)) * 100).toFixed(1) : 0,
    inputLines: inputCode.split('\n').length,
    outputLines: outputCode.split('\n').length,
    valid: validation.valid,
    errors: validation.errors.length,
    warnings: validation.warnings.length
  };

  return (
    <Box sx={{ p: 2 }}>
      <Head>
        <title>{name} | Developer Tools</title>
        <meta name="description" content={description} />
      </Head>

      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
        <CodeIcon sx={{ mr: 2, verticalAlign: 'middle' }} />
        JavaScript Formatter & Minifier
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
                onClick={processCode}
                startIcon={mode === 'format' ? <FormatIndentIncreaseIcon /> : <CompressIcon />}
              >
                {mode === 'format' ? 'Format' : 'Minify'} Code
              </Button>
              <Button
                variant="outlined"
                fullWidth
                onClick={swapInputOutput}
                startIcon={<SwapVertIcon />}
                disabled={!outputCode}
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
                onClick={downloadCode}
                startIcon={<DownloadIcon />}
                disabled={!outputCode && !inputCode}
              >
                Download
              </Button>
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
                    {validation.valid ? 'Valid JavaScript' : 'Syntax Errors'}
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

        {/* Input Section */}
        <Grid size={{ xs: 12, md: 4.5 }}>
          <Paper elevation={2} sx={{ p: 2, height: 600 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                Input JavaScript
              </Typography>
              <IconButton
                size="small"
                onClick={() => copyToClipboard(inputCode, 'Input code')}
                disabled={!inputCode}
              >
                <ContentCopyIcon />
              </IconButton>
            </Box>

            <TextField
              fullWidth
              multiline
              rows={22}
              variant="outlined"
              placeholder="Enter JavaScript code to format or minify..."
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              sx={{
                '& .MuiInputBase-input': {
                  fontFamily: 'monospace',
                  fontSize: '0.875rem'
                }
              }}
            />
          </Paper>
        </Grid>

        {/* Output Section */}
        <Grid size={{ xs: 12, md: 4.5 }}>
          <Paper elevation={2} sx={{ p: 2, height: 600 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                {mode === 'format' ? 'Formatted' : 'Minified'} Output
              </Typography>
              <IconButton
                size="small"
                onClick={() => copyToClipboard(outputCode, 'Output code')}
                disabled={!outputCode}
              >
                <ContentCopyIcon />
              </IconButton>
            </Box>

            <TextField
              fullWidth
              multiline
              rows={22}
              variant="outlined"
              value={outputCode}
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
                    Syntax Errors ({validation.errors.length})
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
                JavaScript Formatting & Minification Guide
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12 }} md={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    Formatting
                  </Typography>
                  <Typography variant="body2" paragraph>
                    Code formatting improves readability by:
                  </Typography>
                  <ul style={{ marginTop: 0 }}>
                    <li>Adding consistent indentation</li>
                    <li>Properly spacing operators and brackets</li>
                    <li>Breaking long lines appropriately</li>
                    <li>Organizing code structure</li>
                  </ul>
                </Grid>
                <Grid size={{ xs: 12 }} md={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    Minification
                  </Typography>
                  <Typography variant="body2" paragraph>
                    Code minification reduces file size by:
                  </Typography>
                  <ul style={{ marginTop: 0 }}>
                    <li>Removing unnecessary whitespace</li>
                    <li>Removing comments</li>
                    <li>Shortening variable names (advanced)</li>
                    <li>Optimizing code structure</li>
                  </ul>
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
