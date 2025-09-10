import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Grid,
  IconButton,
  Snackbar,
  Card,
  CardContent,
  Tabs,
  Tab,
  Button,
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Switch,
  FormControlLabel,
  Stack
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InfoIcon from '@mui/icons-material/Info';
import CodeIcon from '@mui/icons-material/Code';
import DataObjectIcon from '@mui/icons-material/DataObject';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import DeleteIcon from '@mui/icons-material/Delete';

import Head from 'next/head';

export default function MultilineFormatter({ name, description }) {
  const [inputText, setInputText] = useState('');
  const [wrapChar, setWrapChar] = useState("'");
  const [endsWith, setEndsWith] = useState(',');
  const [outputText, setOutputText] = useState('');
  const [currentTab, setCurrentTab] = useState(0);
  const [formatType, setFormatType] = useState('array');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [customPreset, setCustomPreset] = useState('');
  const [removeEmptyLines, setRemoveEmptyLines] = useState(true);
  const [trimLines, setTrimLines] = useState(true);
  const [addLineNumbers, setAddLineNumbers] = useState(false);
  const [savedTemplates, setSavedTemplates] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load saved templates from localStorage on component mount
  useEffect(() => {
    const storedTemplates = localStorage.getItem('multilineFormatterTemplates');
    if (storedTemplates) {
      try {
        setSavedTemplates(JSON.parse(storedTemplates));
      } catch (error) {
        console.error('Failed to parse saved templates:', error);
      }
    }
    setIsInitialized(true);
  }, []);

  // Save templates to localStorage whenever savedTemplates changes (but only after initialization)
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('multilineFormatterTemplates', JSON.stringify(savedTemplates));
    }
  }, [savedTemplates, isInitialized]);

  const formatters = {
    array: (lines) => {
      const formatted = lines.map(line => `${wrapChar}${line}${wrapChar}`);
      return `[${formatted.join(`,\n  `)}]`;
    },
    
    sql_in: (lines) => {
      const formatted = lines.map(line => `${wrapChar}${line}${wrapChar}`);
      return `IN (${formatted.join(',\n    ')})`;
    },
    
    sql_values: (lines) => {
      const formatted = lines.map(line => `(${wrapChar}${line}${wrapChar})`);
      return `VALUES\n  ${formatted.join(',\n  ')}`;
    },
    
    json_array: (lines) => {
      const formatted = lines.map(line => `"${line.replace(/"/g, '\\"')}"`);
      return `[\n  ${formatted.join(',\n  ')}\n]`;
    },
    
    python_list: (lines) => {
      const formatted = lines.map(line => `"${line.replace(/"/g, '\\"')}"`);
      return `[\n    ${formatted.join(',\n    ')}\n]`;
    },
    
    javascript_array: (lines) => {
      const formatted = lines.map(line => `'${line.replace(/'/g, "\\'")}'`);
      return `[\n  ${formatted.join(',\n  ')}\n]`;
    },
    
    csv: (lines) => {
      return lines.map(line => `"${line.replace(/"/g, '""')}"`).join(',');
    },
    
    custom: (lines) => {
      return lines.map((line, index) => {
        let formatted = customPreset;
        formatted = formatted.replace(/\{line\}/g, line);
        formatted = formatted.replace(/\{index\}/g, index);
        formatted = formatted.replace(/\{index1\}/g, index + 1);
        formatted = formatted.replace(/\{wrap\}/g, wrapChar);
        formatted = formatted.replace(/\{end\}/g, endsWith);
        return formatted;
      }).join('\n');
    },
    
    basic: (lines) => {
      return lines.map(line => `${wrapChar}${line}${wrapChar}${endsWith}`).join('\n');
    }
  };

  const processLines = (text) => {
    if (!text) return [];
    
    let lines = text.split('\n');
    
    if (removeEmptyLines) {
      lines = lines.filter(line => line.trim() !== '');
    }
    
    if (trimLines) {
      lines = lines.map(line => line.trim());
    }
    
    return lines;
  };

  const textStats = useMemo(() => {
    if (!inputText) return null;
    
    const lines = processLines(inputText);
    const totalChars = inputText.length;
    const totalCharsNoSpaces = inputText.replace(/\s/g, '').length;
    const words = inputText.split(/\s+/).filter(word => word.length > 0);
    
    return {
      lines: lines.length,
      totalLines: inputText.split('\n').length,
      characters: totalChars,
      charactersNoSpaces: totalCharsNoSpaces,
      words: words.length,
      averageLineLength: lines.length > 0 ? Math.round(lines.reduce((sum, line) => sum + line.length, 0) / lines.length) : 0,
      longestLine: Math.max(...lines.map(line => line.length), 0),
      shortestLine: lines.length > 0 ? Math.min(...lines.map(line => line.length)) : 0
    };
  }, [inputText, removeEmptyLines, trimLines]);

  useEffect(() => {
    if (!inputText) {
      setOutputText('');
      return;
    }

    const lines = processLines(inputText);
    
    if (addLineNumbers) {
      const numberedLines = lines.map((line, index) => `${index + 1}. ${line}`);
      setOutputText(formatters[formatType](numberedLines));
    } else {
      setOutputText(formatters[formatType](lines));
    }
  }, [inputText, wrapChar, endsWith, formatType, customPreset, removeEmptyLines, trimLines, addLineNumbers]);

  const formatPresets = [
    { name: 'JavaScript Array', type: 'javascript_array', wrap: "'", end: '' },
    { name: 'Python List', type: 'python_list', wrap: '"', end: '' },
    { name: 'JSON Array', type: 'json_array', wrap: '', end: '' },
    { name: 'SQL IN Clause', type: 'sql_in', wrap: "'", end: '' },
    { name: 'SQL VALUES', type: 'sql_values', wrap: "'", end: '' },
    { name: 'CSV Row', type: 'csv', wrap: '', end: '' },
    { name: 'Basic Array', type: 'array', wrap: "'", end: ',' },
    { name: 'Custom Format', type: 'custom', wrap: "'", end: ',' }
  ];

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text || outputText);
      setOpenSnackbar(true);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
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

  const handleDownload = (content, filename) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const saveTemplate = () => {
    const newTemplate = {
      id: Date.now(),
      name: `Template ${savedTemplates.length + 1}`,
      formatType,
      wrapChar,
      endsWith,
      customPreset,
      removeEmptyLines,
      trimLines,
      addLineNumbers,
      createdAt: new Date().toLocaleDateString()
    };
    setSavedTemplates([...savedTemplates, newTemplate]);
  };

  const loadTemplate = (template) => {
    setFormatType(template.formatType);
    setWrapChar(template.wrapChar);
    setEndsWith(template.endsWith);
    setCustomPreset(template.customPreset);
    setRemoveEmptyLines(template.removeEmptyLines);
    setTrimLines(template.trimLines);
    setAddLineNumbers(template.addLineNumbers);
    setCurrentTab(0);
  };

  const deleteTemplate = (templateId) => {
    setSavedTemplates(savedTemplates.filter(template => template.id !== templateId));
  };

  const applyPreset = (preset) => {
    setFormatType(preset.type);
    setWrapChar(preset.wrap);
    setEndsWith(preset.end);
    if (preset.type === 'custom') {
      setCustomPreset('{wrap}{line}{wrap}{end}');
    }
  };

  const swapContent = () => {
    const temp = inputText;
    setInputText(outputText);
    setOutputText(temp);
  };

  const exampleTexts = [
    {
      name: 'Programming Languages',
      content: 'JavaScript\nPython\nJava\nC++\nRust\nGo\nKotlin'
    },
    {
      name: 'SQL Conditions',
      content: "status = 'active'\nuser_id IS NOT NULL\ncreated_at >= '2024-01-01'\ndeleted_at IS NULL"
    },
    {
      name: 'File Extensions',
      content: '.js\n.ts\n.jsx\n.tsx\n.vue\n.svelte\n.css\n.scss'
    },
    {
      name: 'HTTP Status Codes',
      content: '200 OK\n201 Created\n400 Bad Request\n401 Unauthorized\n404 Not Found\n500 Internal Server Error'
    }
  ];

  return (
    <Box sx={{ p: 2 }}>
      <Head>
        <title>{name ? `${name} - Dev Tools` : 'Professional Multiline Formatter - Dev Tools'}</title>
        <meta name="description" content={description} />
      </Head>
      
      <Typography variant="h4" gutterBottom>
        {name}
      </Typography>
      <Typography variant="body1" paragraph color="text.secondary">
        {description}
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        <strong>Professional Text Formatter:</strong> Convert multiline text into various formats for 
        programming, SQL, JSON, and custom patterns with advanced processing options.
      </Alert>

      <Tabs value={currentTab} onChange={(e, newValue) => setCurrentTab(newValue)} sx={{ mb: 3 }}>
        <Tab label="Text Formatter" />
        <Tab label="Text Analysis" />
        <Tab label="Saved Templates" />
      </Tabs>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          {currentTab === 0 && (
            <>
              {/* Format Controls */}
              <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  <FormatListBulletedIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                  Format Options
                </Typography>
                
                <Grid container spacing={2} sx={{ mb: 3 }}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <FormControl fullWidth>
                      <InputLabel>Format Type</InputLabel>
                      <Select
                        value={formatType}
                        onChange={(e) => setFormatType(e.target.value)}
                        label="Format Type"
                      >
                        <MenuItem value="javascript_array">JavaScript Array</MenuItem>
                        <MenuItem value="python_list">Python List</MenuItem>
                        <MenuItem value="json_array">JSON Array</MenuItem>
                        <MenuItem value="sql_in">SQL IN Clause</MenuItem>
                        <MenuItem value="sql_values">SQL VALUES</MenuItem>
                        <MenuItem value="csv">CSV Row</MenuItem>
                        <MenuItem value="array">Basic Array</MenuItem>
                        <MenuItem value="custom">Custom Format</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  
                  <Grid size={{ xs: 6, md: 3 }}>
                    <TextField
                      label="Wrap with"
                      value={wrapChar}
                      onChange={(e) => setWrapChar(e.target.value)}
                      fullWidth
                      placeholder="'"
                    />
                  </Grid>
                  
                  <Grid size={{ xs: 6, md: 3 }}>
                    <TextField
                      label="Ends with"
                      value={endsWith}
                      onChange={(e) => setEndsWith(e.target.value)}
                      fullWidth
                      placeholder=","
                    />
                  </Grid>
                </Grid>

                {formatType === 'custom' && (
                  <TextField
                    label="Custom Pattern"
                    value={customPreset}
                    onChange={(e) => setCustomPreset(e.target.value)}
                    fullWidth
                    placeholder="{wrap}{line}{wrap}{end}"
                    helperText="Use {line}, {index}, {index1}, {wrap}, {end} as placeholders"
                    sx={{ mb: 2 }}
                  />
                )}

                <Stack direction="row" spacing={2} flexWrap="wrap" sx={{ mb: 2 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={removeEmptyLines}
                        onChange={(e) => setRemoveEmptyLines(e.target.checked)}
                      />
                    }
                    label="Remove Empty Lines"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={trimLines}
                        onChange={(e) => setTrimLines(e.target.checked)}
                      />
                    }
                    label="Trim Lines"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={addLineNumbers}
                        onChange={(e) => setAddLineNumbers(e.target.checked)}
                      />
                    }
                    label="Add Line Numbers"
                  />
                </Stack>

                <Stack direction="row" spacing={1} flexWrap="wrap">
                  <Button
                    variant="outlined"
                    startIcon={<BookmarkIcon />}
                    onClick={saveTemplate}
                    size="small"
                  >
                    Save Template
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<UploadIcon />}
                    component="label"
                    size="small"
                  >
                    Upload File
                    <input
                      type="file"
                      hidden
                      accept=".txt,.csv,.json"
                      onChange={handleFileUpload}
                    />
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<DownloadIcon />}
                    onClick={() => handleDownload(outputText, 'formatted-text.txt')}
                    size="small"
                    disabled={!outputText}
                  >
                    Download
                  </Button>
                </Stack>
              </Paper>

              {/* Input/Output Section */}
              <Paper sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6">
                    Text Formatter
                  </Typography>
                  <IconButton onClick={swapContent} disabled={!inputText || !outputText}>
                    <SwapVertIcon />
                  </IconButton>
                </Box>

                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Input Text ({textStats?.totalLines || 0} lines)
                    </Typography>
                    <TextField
                      multiline
                      rows={15}
                      fullWidth
                      placeholder="Paste your multiline text here..."
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      variant="outlined"
                      InputProps={{
                        style: { fontFamily: 'monospace', fontSize: '0.9rem' }
                      }}
                    />
                  </Grid>
                  
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Typography variant="subtitle2">
                        Output Text ({formatType})
                      </Typography>
                      <IconButton 
                        size="small" 
                        onClick={() => handleCopy()}
                        disabled={!outputText}
                        title="Copy Output"
                      >
                        <ContentCopyIcon />
                      </IconButton>
                    </Box>
                    <TextField
                      multiline
                      rows={15}
                      fullWidth
                      value={outputText}
                      variant="outlined"
                      InputProps={{
                        readOnly: true,
                        style: { fontFamily: 'monospace', fontSize: '0.9rem' }
                      }}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </>
          )}

          {currentTab === 1 && textStats && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                <AnalyticsIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                Text Analysis
              </Typography>
              
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>Basic Statistics</Typography>
                      <TableContainer>
                        <Table size="small">
                          <TableBody>
                            <TableRow>
                              <TableCell><strong>Total Lines</strong></TableCell>
                              <TableCell>{textStats.totalLines}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell><strong>Processed Lines</strong></TableCell>
                              <TableCell>{textStats.lines}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell><strong>Characters</strong></TableCell>
                              <TableCell>{textStats.characters}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell><strong>Characters (no spaces)</strong></TableCell>
                              <TableCell>{textStats.charactersNoSpaces}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell><strong>Words</strong></TableCell>
                              <TableCell>{textStats.words}</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </CardContent>
                  </Card>
                </Grid>
                
                <Grid size={{ xs: 12, md: 6 }}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>Line Analysis</Typography>
                      <TableContainer>
                        <Table size="small">
                          <TableBody>
                            <TableRow>
                              <TableCell><strong>Average Line Length</strong></TableCell>
                              <TableCell>{textStats.averageLineLength} chars</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell><strong>Longest Line</strong></TableCell>
                              <TableCell>{textStats.longestLine} chars</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell><strong>Shortest Line</strong></TableCell>
                              <TableCell>{textStats.shortestLine} chars</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell><strong>Empty Lines</strong></TableCell>
                              <TableCell>{textStats.totalLines - textStats.lines}</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
                Output Preview
              </Typography>
              <TextField
                multiline
                rows={10}
                fullWidth
                value={outputText}
                variant="outlined"
                InputProps={{
                  readOnly: true,
                  style: { fontFamily: 'monospace', fontSize: '0.9rem' }
                }}
              />
            </Paper>
          )}

          {currentTab === 2 && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Saved Templates
              </Typography>
              
              {savedTemplates.length === 0 ? (
                <Alert severity="info">
                  No saved templates yet. Create some custom formatting templates and save them for quick reuse!
                </Alert>
              ) : (
                <List>
                  {savedTemplates.map((template) => (
                    <ListItem key={template.id} divider>
                      <ListItemText
                        primary={template.name}
                        secondary={`${template.formatType} | Created: ${template.createdAt}`}
                      />
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                          size="small"
                          onClick={() => loadTemplate(template)}
                        >
                          Load
                        </Button>
                        <IconButton
                          size="small"
                          onClick={() => deleteTemplate(template.id)}
                          color="error"
                          title="Delete Template"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </ListItem>
                  ))}
                </List>
              )}
            </Paper>
          )}
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          {/* Quick Presets */}
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <CodeIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                Quick Presets
              </Typography>
              
              <Stack spacing={1}>
                {formatPresets.map((preset, index) => (
                  <Button
                    key={index}
                    variant="outlined"
                    size="small"
                    onClick={() => applyPreset(preset)}
                    fullWidth
                    sx={{ justifyContent: 'flex-start' }}
                  >
                    {preset.name}
                  </Button>
                ))}
              </Stack>
            </CardContent>
          </Card>

          {/* Example Data */}
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <DataObjectIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                Example Data
              </Typography>
              
              <Accordion>
                {exampleTexts.map((example, index) => (
                  <div key={index}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography variant="subtitle2">{example.name}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Button
                        size="small"
                        onClick={() => setInputText(example.content)}
                        fullWidth
                      >
                        Load Example
                      </Button>
                    </AccordionDetails>
                  </div>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          {/* Usage Guide */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <InfoIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                Usage Guide
              </Typography>
              
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="subtitle2">Format Types</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" paragraph>
                    <strong>JavaScript Array:</strong> Creates JS array syntax
                  </Typography>
                  <Typography variant="body2" paragraph>
                    <strong>SQL IN:</strong> Generates SQL IN clause
                  </Typography>
                  <Typography variant="body2" paragraph>
                    <strong>JSON Array:</strong> Valid JSON array format
                  </Typography>
                  <Typography variant="body2">
                    <strong>Custom:</strong> Use placeholders for flexibility
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="subtitle2">Custom Patterns</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" paragraph>
                    <strong>{'{line}'}:</strong> The current line content
                  </Typography>
                  <Typography variant="body2" paragraph>
                    <strong>{'{index}'}:</strong> Zero-based line index
                  </Typography>
                  <Typography variant="body2" paragraph>
                    <strong>{'{index1}'}:</strong> One-based line index
                  </Typography>
                  <Typography variant="body2">
                    <strong>{'{wrap}'}:</strong> Wrap character
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="subtitle2">Quick Tips</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" paragraph>
                    • Use presets for common formatting needs
                  </Typography>
                  <Typography variant="body2" paragraph>
                    • Save custom templates for reuse
                  </Typography>
                  <Typography variant="body2" paragraph>
                    • Upload files to process large datasets
                  </Typography>
                  <Typography variant="body2">
                    • Check text analysis for insights
                  </Typography>
                </AccordionDetails>
              </Accordion>
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