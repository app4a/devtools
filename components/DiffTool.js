import React, { useState, useMemo } from 'react';
import ReactDiffViewer from 'react-diff-viewer-continued';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Grid,
  Card,
  CardContent,
  Button,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  ToggleButtonGroup,
  ToggleButton,
  Chip,
  Alert,
  Snackbar,
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
  Tabs,
  Tab,
  Switch,
  FormControlLabel,
  Divider,
  useTheme
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import ViewSidebarIcon from '@mui/icons-material/ViewSidebar';
import ViewStreamIcon from '@mui/icons-material/ViewStream';
import InfoIcon from '@mui/icons-material/Info';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import HistoryIcon from '@mui/icons-material/History';

import Head from 'next/head';

export default function DiffTool({ name, description }) {
  const theme = useTheme();
  const [originalText, setOriginalText] = useState('function greet(name) {\n  console.log("Hello " + name);\n}');
  const [modifiedText, setModifiedText] = useState('function greet(name) {\n  console.log(`Hello ${name}!`);\n  return `Welcome, ${name}`;\n}');
  
  const [viewMode, setViewMode] = useState('split'); // 'split', 'unified'
  const [showWordDiff, setShowWordDiff] = useState(true);
  const [ignoreWhitespace, setIgnoreWhitespace] = useState(false);
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  const [compareMode, setCompareMode] = useState('chars'); // 'chars', 'words', 'lines'
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  const [originalFileName, setOriginalFileName] = useState('original.txt');
  const [modifiedFileName, setModifiedFileName] = useState('modified.txt');

  // Dynamic styles based on theme
  const diffStyles = useMemo(() => {
    const isDark = theme.palette.mode === 'dark';
    return {
      variables: {
        light: {
          diffViewerBackground: theme.palette.background.paper,
          diffViewerColor: theme.palette.text.primary,
          addedBackground: theme.palette.success.light + '20',
          addedColor: theme.palette.success.dark,
          removedBackground: theme.palette.error.light + '20',
          removedColor: theme.palette.error.dark,
          wordAddedBackground: theme.palette.success.main + '40',
          wordRemovedBackground: theme.palette.error.main + '40',
          addedGutterBackground: theme.palette.success.light + '15',
          removedGutterBackground: theme.palette.error.light + '15',
          gutterBackground: theme.palette.background.default,
          gutterBackgroundDark: theme.palette.background.default,
          highlightBackground: theme.palette.action.hover,
          highlightGutterBackground: theme.palette.action.selected,
        },
        dark: {
          diffViewerBackground: theme.palette.background.paper,
          diffViewerColor: theme.palette.text.primary,
          addedBackground: '#1b4332',
          addedColor: '#d8f3dc',
          removedBackground: '#7d1128',
          removedColor: '#fecaca',
          wordAddedBackground: '#2d5a3d',
          wordRemovedBackground: '#8b2635',
          addedGutterBackground: '#0d3518',
          removedGutterBackground: '#5a0a1a',
          gutterBackground: theme.palette.background.default,
          gutterBackgroundDark: theme.palette.background.default,
          highlightBackground: theme.palette.action.hover,
          highlightGutterBackground: theme.palette.action.selected,
        }
      }
    };
  }, [theme]);

  const diffStats = useMemo(() => {
    if (!originalText || !modifiedText) return null;
    
    const originalLines = originalText.split('\n');
    const modifiedLines = modifiedText.split('\n');
    
    // Simple line-based comparison
    const addedLines = modifiedLines.filter((line, index) => 
      index >= originalLines.length || originalLines[index] !== line
    ).length;
    
    const removedLines = originalLines.filter((line, index) => 
      index >= modifiedLines.length || modifiedLines[index] !== line
    ).length;
    
    const unchangedLines = Math.min(originalLines.length, modifiedLines.length) - Math.max(addedLines, removedLines);
    
    return {
      originalLines: originalLines.length,
      modifiedLines: modifiedLines.length,
      addedLines: Math.max(0, modifiedLines.length - originalLines.length),
      removedLines: Math.max(0, originalLines.length - modifiedLines.length),
      modifiedLinesCount: addedLines + removedLines,
      unchangedLines: Math.max(0, unchangedLines),
      similarity: originalLines.length > 0 ? Math.round((unchangedLines / Math.max(originalLines.length, modifiedLines.length)) * 100) : 0
    };
  }, [originalText, modifiedText]);

  const handleFileUpload = async (event, isOriginal = true) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const text = await file.text();
        if (isOriginal) {
          setOriginalText(text);
          setOriginalFileName(file.name);
        } else {
          setModifiedText(text);
          setModifiedFileName(file.name);
        }
      } catch (error) {
        console.error('Error reading file:', error);
      }
    }
  };

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setOpenSnackbar(true);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const handleSwapTexts = () => {
    const tempText = originalText;
    const tempFileName = originalFileName;
    setOriginalText(modifiedText);
    setOriginalFileName(modifiedFileName);
    setModifiedText(tempText);
    setModifiedFileName(tempFileName);
  };

  const downloadDiff = (format = 'txt') => {
    let content = '';
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    
    if (format === 'txt') {
      content = `--- ${originalFileName}\n+++ ${modifiedFileName}\n\n`;
      content += `Original (${diffStats?.originalLines || 0} lines):\n`;
      content += originalText + '\n\n';
      content += `Modified (${diffStats?.modifiedLines || 0} lines):\n`;
      content += modifiedText + '\n\n';
      content += `Statistics:\n`;
      content += `- Added lines: ${diffStats?.addedLines || 0}\n`;
      content += `- Removed lines: ${diffStats?.removedLines || 0}\n`;
      content += `- Similarity: ${diffStats?.similarity || 0}%\n`;
    }
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `diff-${timestamp}.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const quickExamples = [
    {
      name: 'Code Refactoring',
      original: 'function add(a, b) {\n  var result = a + b;\n  return result;\n}',
      modified: 'const add = (a, b) => {\n  return a + b;\n};'
    },
    {
      name: 'JSON Structure',
      original: '{\n  "name": "John",\n  "age": 30\n}',
      modified: '{\n  "name": "John Doe",\n  "age": 31,\n  "city": "New York"\n}'
    },
    {
      name: 'Configuration Changes',
      original: 'server.port=8080\ndb.host=localhost\ndb.port=5432',
      modified: 'server.port=3000\ndb.host=production-db\ndb.port=5432\nssl.enabled=true'
    },
    {
      name: 'Documentation Update',
      original: '# Project Setup\n\nInstall dependencies:\n```\nnpm install\n```',
      modified: '# Project Setup\n\nInstall dependencies:\n```\nnpm install\n```\n\nRun the development server:\n```\nnpm run dev\n```'
    }
  ];

  return (
    <Box sx={{ p: 2 }}>
      <Head>
        <title>{name ? `${name} - Dev Tools` : 'Advanced Diff Tool - Dev Tools'}</title>
        <meta name="description" content={description} />
      </Head>
      
      <Typography variant="h4" gutterBottom>
        {name}
      </Typography>
      <Typography variant="body1" paragraph color="text.secondary">
        {description}
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        <strong>Professional Diff Tool:</strong> Compare text, code, and files with advanced algorithms. 
        Supports multiple view modes, file uploads, and detailed statistics.
      </Alert>

      <Tabs value={currentTab} onChange={(e, newValue) => setCurrentTab(newValue)} sx={{ mb: 3 }}>
        <Tab label="Text Comparison" />
        <Tab label="File Comparison" />
        <Tab label="Examples" />
      </Tabs>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 9 }}>
          {/* Input Section */}
          {currentTab === 0 && (
            <Paper sx={{ p: 3, mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Text Input</Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<SwapHorizIcon />}
                    onClick={handleSwapTexts}
                  >
                    Swap
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<HistoryIcon />}
                    onClick={() => setCurrentTab(2)}
                  >
                    Examples
                  </Button>
                </Box>
              </Box>
              
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Original Text
                  </Typography>
                  <TextField
                    multiline
                    rows={12}
                    fullWidth
                    value={originalText}
                    onChange={(e) => setOriginalText(e.target.value)}
                    placeholder="Enter original text..."
                    variant="outlined"
                    sx={{ mb: 1 }}
                  />
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton
                      size="small"
                      onClick={() => handleCopy(originalText)}
                      title="Copy original text"
                    >
                      <ContentCopyIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Modified Text
                  </Typography>
                  <TextField
                    multiline
                    rows={12}
                    fullWidth
                    value={modifiedText}
                    onChange={(e) => setModifiedText(e.target.value)}
                    placeholder="Enter modified text..."
                    variant="outlined"
                    sx={{ mb: 1 }}
                  />
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton
                      size="small"
                      onClick={() => handleCopy(modifiedText)}
                      title="Copy modified text"
                    >
                      <ContentCopyIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          )}

          {currentTab === 1 && (
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>File Upload</Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Original File: {originalFileName}
                  </Typography>
                  <input
                    accept=".txt,.js,.json,.html,.css,.md,.py,.java,.cpp,.c,.php"
                    style={{ display: 'none' }}
                    id="original-file-upload"
                    type="file"
                    onChange={(e) => handleFileUpload(e, true)}
                  />
                  <label htmlFor="original-file-upload">
                    <Button
                      variant="outlined"
                      component="span"
                      startIcon={<FileUploadIcon />}
                      fullWidth
                    >
                      Upload Original File
                    </Button>
                  </label>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Modified File: {modifiedFileName}
                  </Typography>
                  <input
                    accept=".txt,.js,.json,.html,.css,.md,.py,.java,.cpp,.c,.php"
                    style={{ display: 'none' }}
                    id="modified-file-upload"
                    type="file"
                    onChange={(e) => handleFileUpload(e, false)}
                  />
                  <label htmlFor="modified-file-upload">
                    <Button
                      variant="outlined"
                      component="span"
                      startIcon={<FileUploadIcon />}
                      fullWidth
                    >
                      Upload Modified File
                    </Button>
                  </label>
                </Grid>
              </Grid>
            </Paper>
          )}

          {currentTab === 2 && (
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>Quick Examples</Typography>
              <List>
                {quickExamples.map((example, index) => (
                  <ListItem key={index} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        setOriginalText(example.original);
                        setModifiedText(example.modified);
                        setCurrentTab(0);
                      }}
                    >
                      <ListItemText
                        primary={example.name}
                        secondary={
                          <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
                            {example.original.substring(0, 60)}...
                          </Typography>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Paper>
          )}

          {/* Diff Viewer */}
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                <CompareArrowsIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                Comparison Result
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<DownloadIcon />}
                  onClick={() => downloadDiff('txt')}
                >
                  Export
                </Button>
              </Box>
            </Box>
            
            {originalText || modifiedText ? (
              <Box sx={{ 
                border: 1, 
                borderColor: 'divider', 
                borderRadius: 1,
                '& .diff-viewer': {
                  fontFamily: 'monospace',
                  fontSize: '0.875rem'
                }
              }}>
                <ReactDiffViewer
                  oldValue={originalText}
                  newValue={modifiedText}
                  splitView={viewMode === 'split'}
                  showDiffOnly={false}
                  disableWordDiff={!showWordDiff}
                  hideLineNumbers={!showLineNumbers}
                  useDarkTheme={theme.palette.mode === 'dark'}
                  styles={diffStyles}
                  leftTitle={originalFileName}
                  rightTitle={modifiedFileName}
                />
              </Box>
            ) : (
              <Alert severity="info">
                Enter text in both fields above to see the comparison
              </Alert>
            )}
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, lg: 3 }}>
          {/* View Options */}
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                View Options
              </Typography>
              
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>View Mode</InputLabel>
                <Select
                  value={viewMode}
                  onChange={(e) => setViewMode(e.target.value)}
                  label="View Mode"
                >
                  <MenuItem value="split">Side by Side</MenuItem>
                  <MenuItem value="unified">Unified View</MenuItem>
                </Select>
              </FormControl>


              <FormControlLabel
                control={
                  <Switch
                    checked={showWordDiff}
                    onChange={(e) => setShowWordDiff(e.target.checked)}
                  />
                }
                label="Word-level highlighting"
                sx={{ display: 'block', mb: 1 }}
              />

              <FormControlLabel
                control={
                  <Switch
                    checked={showLineNumbers}
                    onChange={(e) => setShowLineNumbers(e.target.checked)}
                  />
                }
                label="Show line numbers"
                sx={{ display: 'block', mb: 1 }}
              />

              <FormControlLabel
                control={
                  <Switch
                    checked={ignoreWhitespace}
                    onChange={(e) => setIgnoreWhitespace(e.target.checked)}
                  />
                }
                label="Ignore whitespace"
                sx={{ display: 'block' }}
              />
            </CardContent>
          </Card>

          {/* Statistics */}
          {diffStats && (
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <AnalyticsIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                  Statistics
                </Typography>
                
                <TableContainer>
                  <Table size="small">
                    <TableBody>
                      <TableRow>
                        <TableCell><strong>Similarity</strong></TableCell>
                        <TableCell>
                          <Chip 
                            label={`${diffStats.similarity}%`}
                            color={diffStats.similarity > 80 ? 'success' : diffStats.similarity > 50 ? 'warning' : 'error'}
                            size="small"
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>Original Lines</strong></TableCell>
                        <TableCell>{diffStats.originalLines}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>Modified Lines</strong></TableCell>
                        <TableCell>{diffStats.modifiedLines}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>Added Lines</strong></TableCell>
                        <TableCell>
                          <Chip label={`+${diffStats.addedLines}`} color="success" size="small" />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>Removed Lines</strong></TableCell>
                        <TableCell>
                          <Chip label={`-${diffStats.removedLines}`} color="error" size="small" />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>Unchanged</strong></TableCell>
                        <TableCell>{diffStats.unchangedLines}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          )}

          {/* Diff Guide */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <InfoIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                Diff Guide
              </Typography>
              
              <Typography variant="body2" paragraph>
                <strong>View Modes:</strong>
              </Typography>
              <Typography variant="body2" paragraph>
                • <strong>Side by Side:</strong> Shows original and modified text in separate columns
              </Typography>
              <Typography variant="body2" paragraph>
                • <strong>Unified:</strong> Shows changes in a single column with +/- indicators
              </Typography>
              
              <Typography variant="body2" paragraph>
                <strong>Color Coding:</strong>
              </Typography>
              <Typography variant="body2" paragraph>
                • <span style={{ backgroundColor: theme.palette.success.light + '40', padding: '2px 4px' }}>Green</span> - Added content
              </Typography>
              <Typography variant="body2" paragraph>
                • <span style={{ backgroundColor: theme.palette.error.light + '40', padding: '2px 4px' }}>Red</span> - Removed content
              </Typography>
              <Typography variant="body2">
                • Gray - Unchanged content
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