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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Alert,
  Switch,
  FormControlLabel
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CodeIcon from '@mui/icons-material/Code';
import DownloadIcon from '@mui/icons-material/Download';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArticleIcon from '@mui/icons-material/Article';
import PaletteIcon from '@mui/icons-material/Palette';
import Head from 'next/head';

export default function MarkdownConverter({ name, description }) {
  const [markdown, setMarkdown] = useState('');
  const [viewMode, setViewMode] = useState('split');
  const [cssTheme, setCssTheme] = useState('github');
  const [includeCSS, setIncludeCSS] = useState(true);
  const [syntaxHighlight, setSyntaxHighlight] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Markdown parsing functions
  const parseMarkdown = (md) => {
    let html = md;

    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

    // Bold
    html = html.replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>');
    html = html.replace(/__(.*?)__/gim, '<strong>$1</strong>');

    // Italic
    html = html.replace(/\*(.*)\*/gim, '<em>$1</em>');
    html = html.replace(/_(.*?)_/gim, '<em>$1</em>');

    // Code blocks with language
    html = html.replace(/```(\w+)?\n?([\s\S]*?)```/gim, (match, lang, code) => {
      const language = lang || 'text';
      const highlightClass = syntaxHighlight ? ` class="language-${language}"` : '';
      return `<pre><code${highlightClass}>${escapeHtml(code.trim())}</code></pre>`;
    });

    // Inline code
    html = html.replace(/`([^`]+)`/gim, '<code>$1</code>');

    // Links
    html = html.replace(/\[([^\]]+)\]\(([^\)]+)\)/gim, '<a href="$2">$1</a>');

    // Images
    html = html.replace(/!\[([^\]]*)\]\(([^\)]+)\)/gim, '<img alt="$1" src="$2" />');

    // Lists
    html = html.replace(/^\* (.*$)/gim, '<li>$1</li>');
    html = html.replace(/^\d+\. (.*$)/gim, '<li>$1</li>');

    // Wrap list items in ul/ol tags
    html = html.replace(/(<li>.*<\/li>)/gims, (match) => {
      return `<ul>${match}</ul>`;
    });

    // Blockquotes
    html = html.replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>');

    // Horizontal rules
    html = html.replace(/^---$/gim, '<hr>');
    html = html.replace(/^\*\*\*$/gim, '<hr>');

    // Tables (basic)
    const tableRegex = /^\|(.+)\|\s*\n\|([:\-|\s]+)\|\s*\n((?:\|.*\|\s*\n?)*)/gm;
    html = html.replace(tableRegex, (match, headers, separator, rows) => {
      const headerCells = headers.split('|').map(h => `<th>${h.trim()}</th>`).join('');
      const rowCells = rows.trim().split('\n').map(row => {
        const cells = row.split('|').slice(1, -1).map(cell => `<td>${cell.trim()}</td>`).join('');
        return `<tr>${cells}</tr>`;
      }).join('');
      
      return `<table><thead><tr>${headerCells}</tr></thead><tbody>${rowCells}</tbody></table>`;
    });

    // Strikethrough
    html = html.replace(/~~(.*)~~/gim, '<del>$1</del>');

    // Line breaks
    html = html.replace(/\n/gim, '<br>');

    // Clean up multiple breaks
    html = html.replace(/<br><br>/gim, '</p><p>');
    html = `<p>${html}</p>`;

    // Clean up empty paragraphs and fix nested elements
    html = html.replace(/<p><\/p>/gim, '');
    html = html.replace(/<p>(<h[1-6]>)/gim, '$1');
    html = html.replace(/(<\/h[1-6]>)<\/p>/gim, '$1');
    html = html.replace(/<p>(<ul>)/gim, '$1');
    html = html.replace(/(<\/ul>)<\/p>/gim, '$1');
    html = html.replace(/<p>(<table>)/gim, '$1');
    html = html.replace(/(<\/table>)<\/p>/gim, '$1');
    html = html.replace(/<p>(<blockquote>)/gim, '$1');
    html = html.replace(/(<\/blockquote>)<\/p>/gim, '$1');
    html = html.replace(/<p>(<hr>)<\/p>/gim, '$1');
    html = html.replace(/<p>(<pre>)/gim, '$1');
    html = html.replace(/(<\/pre>)<\/p>/gim, '$1');

    return html;
  };

  const escapeHtml = (text) => {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
  };

  const cssThemes = {
    github: {
      name: 'GitHub',
      css: `
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif; line-height: 1.6; color: #24292f; max-width: 980px; margin: 0 auto; padding: 45px; }
h1, h2, h3, h4, h5, h6 { margin-top: 24px; margin-bottom: 16px; font-weight: 600; line-height: 1.25; }
h1 { font-size: 2em; padding-bottom: 0.3em; border-bottom: 1px solid #eaecef; }
h2 { font-size: 1.5em; padding-bottom: 0.3em; border-bottom: 1px solid #eaecef; }
p { margin-bottom: 16px; }
blockquote { margin: 0; padding: 0 1em; color: #6a737d; border-left: 0.25em solid #dfe2e5; }
code { padding: 0.2em 0.4em; margin: 0; font-size: 85%; background-color: #f6f8fa; border-radius: 6px; font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace; }
pre { padding: 16px; overflow: auto; font-size: 85%; line-height: 1.45; background-color: #f6f8fa; border-radius: 6px; }
pre code { display: inline; max-width: auto; padding: 0; margin: 0; overflow: visible; line-height: inherit; word-wrap: normal; background-color: transparent; border: 0; }
table { border-spacing: 0; border-collapse: collapse; width: 100%; overflow: auto; }
th, td { padding: 6px 13px; border: 1px solid #dfe2e5; }
th { font-weight: 600; background-color: #f6f8fa; }
ul, ol { padding-left: 2em; }
hr { height: 0.25em; padding: 0; margin: 24px 0; background-color: #e1e4e8; border: 0; }
a { color: #0366d6; text-decoration: none; }
a:hover { text-decoration: underline; }
img { max-width: 100%; box-sizing: content-box; }
del { color: #6a737d; }
`
    },
    material: {
      name: 'Material Design',
      css: `
body { font-family: 'Roboto', 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #212121; max-width: 900px; margin: 0 auto; padding: 24px; }
h1, h2, h3, h4, h5, h6 { font-weight: 500; margin-top: 24px; margin-bottom: 16px; color: #1976d2; }
h1 { font-size: 2.5rem; }
h2 { font-size: 2rem; }
h3 { font-size: 1.5rem; }
p { margin-bottom: 16px; }
blockquote { margin: 16px 0; padding: 16px; background: #f5f5f5; border-left: 4px solid #2196f3; border-radius: 4px; }
code { padding: 2px 8px; background: #f5f5f5; border-radius: 4px; font-family: 'Roboto Mono', monospace; font-size: 0.875rem; }
pre { padding: 16px; background: #263238; color: #ffffff; border-radius: 8px; overflow: auto; }
pre code { background: transparent; color: inherit; padding: 0; }
table { width: 100%; border-collapse: collapse; margin: 16px 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
th, td { padding: 12px 16px; text-align: left; border-bottom: 1px solid #e0e0e0; }
th { background: #f5f5f5; font-weight: 500; color: #1976d2; }
ul, ol { padding-left: 24px; }
hr { border: none; height: 1px; background: #e0e0e0; margin: 24px 0; }
a { color: #1976d2; text-decoration: none; }
a:hover { text-decoration: underline; }
img { max-width: 100%; border-radius: 8px; }
`
    },
    dark: {
      name: 'Dark Theme',
      css: `
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif; line-height: 1.6; color: #e6edf3; background: #0d1117; max-width: 980px; margin: 0 auto; padding: 45px; }
h1, h2, h3, h4, h5, h6 { margin-top: 24px; margin-bottom: 16px; font-weight: 600; line-height: 1.25; color: #58a6ff; }
h1 { font-size: 2em; padding-bottom: 0.3em; border-bottom: 1px solid #21262d; }
h2 { font-size: 1.5em; padding-bottom: 0.3em; border-bottom: 1px solid #21262d; }
p { margin-bottom: 16px; }
blockquote { margin: 0; padding: 0 1em; color: #8b949e; border-left: 0.25em solid #30363d; }
code { padding: 0.2em 0.4em; margin: 0; font-size: 85%; background-color: #161b22; border-radius: 6px; color: #e6edf3; }
pre { padding: 16px; overflow: auto; font-size: 85%; line-height: 1.45; background-color: #161b22; border-radius: 6px; }
pre code { background-color: transparent; }
table { border-spacing: 0; border-collapse: collapse; width: 100%; overflow: auto; }
th, td { padding: 6px 13px; border: 1px solid #30363d; }
th { font-weight: 600; background-color: #161b22; }
ul, ol { padding-left: 2em; }
hr { height: 0.25em; padding: 0; margin: 24px 0; background-color: #30363d; border: 0; }
a { color: #58a6ff; text-decoration: none; }
a:hover { text-decoration: underline; }
img { max-width: 100%; }
del { color: #8b949e; }
`
    }
  };

  const htmlOutput = useMemo(() => parseMarkdown(markdown), [markdown, syntaxHighlight]);

  const generateFullHTML = () => {
    const css = includeCSS ? `<style>${cssThemes[cssTheme].css}</style>` : '';
    const syntaxCSS = syntaxHighlight ? '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/themes/prism.min.css">' : '';
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generated HTML</title>
    ${syntaxCSS}
    ${css}
</head>
<body>
    ${htmlOutput}
    ${syntaxHighlight ? '<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/prism.min.js"></script>' : ''}
</body>
</html>`;
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setSnackbarMessage('Copied to clipboard!');
      setOpenSnackbar(true);
    });
  };

  const downloadHTML = () => {
    const blob = new Blob([generateFullHTML()], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    setSnackbarMessage('HTML file downloaded!');
    setOpenSnackbar(true);
  };

  const loadSample = () => {
    const sample = `# Markdown to HTML Converter

Welcome to the **Markdown to HTML Converter**! This tool helps you convert *Markdown* to clean HTML with syntax highlighting.

## Features

- ✅ GitHub-flavored Markdown support
- ✅ Syntax highlighting for code blocks
- ✅ Multiple CSS themes
- ✅ Live preview
- ✅ Export options

### Code Example

\`\`\`javascript
function greet(name) {
    console.log(\`Hello, \${name}!\`);
}

greet("World");
\`\`\`

### Table Example

| Feature | Status | Priority |
|---------|--------|----------|
| Headers | ✅ Done | High |
| Tables | ✅ Done | Medium |
| Lists | ✅ Done | High |

### Links and Images

Check out [GitHub](https://github.com) for more examples.

> **Note**: This is a blockquote example with important information.

### List Example

1. First item
2. Second item
   - Nested item
   - Another nested item
3. Third item

---

*Happy converting!* 🚀`;

    setMarkdown(sample);
    setSnackbarMessage('Sample markdown loaded!');
    setOpenSnackbar(true);
  };

  const statistics = {
    characters: markdown.length,
    words: markdown.trim().split(/\s+/).filter(word => word.length > 0).length,
    lines: markdown.split('\n').length,
    htmlSize: htmlOutput.length
  };

  return (
    <Box sx={{ p: 2 }}>
      <Head>
        <title>{name} | AI Developer Tools</title>
        <meta name="description" content={description} />
      </Head>

      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
        <ArticleIcon sx={{ mr: 2, verticalAlign: 'middle' }} />
        Markdown to HTML Converter
      </Typography>

      <Grid container spacing={3}>
        {/* Controls */}
        <Grid size={{ xs: 12 }}>
          <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <ToggleButtonGroup
                  value={viewMode}
                  exclusive
                  onChange={(e, newMode) => newMode && setViewMode(newMode)}
                  size="small"
                  fullWidth
                >
                  <ToggleButton value="split">Split</ToggleButton>
                  <ToggleButton value="preview">Preview</ToggleButton>
                  <ToggleButton value="html">HTML</ToggleButton>
                </ToggleButtonGroup>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <FormControl fullWidth size="small">
                  <InputLabel>CSS Theme</InputLabel>
                  <Select
                    value={cssTheme}
                    onChange={(e) => setCssTheme(e.target.value)}
                  >
                    {Object.entries(cssThemes).map(([key, theme]) => (
                      <MenuItem key={key} value={key}>{theme.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={includeCSS}
                      onChange={(e) => setIncludeCSS(e.target.checked)}
                      size="small"
                    />
                  }
                  label="Include CSS"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={syntaxHighlight}
                      onChange={(e) => setSyntaxHighlight(e.target.checked)}
                      size="small"
                    />
                  }
                  label="Syntax HL"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 2 }}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button size="small" variant="outlined" onClick={loadSample}>
                    Sample
                  </Button>
                  <Button size="small" variant="outlined" onClick={downloadHTML}>
                    <DownloadIcon />
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Main Content */}
        <Grid size={{ xs: 12, md: viewMode === 'split' ? 6 : 12 }}>
          {(viewMode === 'split' || viewMode === 'markdown') && (
            <Paper elevation={2} sx={{ height: 600 }}>
              <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">Markdown Input</Typography>
                <Button size="small" onClick={() => setMarkdown('')}>
                  Clear
                </Button>
              </Box>
              <TextField
                multiline
                fullWidth
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                placeholder="Enter your Markdown here..."
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
          )}
        </Grid>

        {viewMode === 'split' && (
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper elevation={2} sx={{ height: 600 }}>
              <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">Live Preview</Typography>
                <IconButton size="small" onClick={() => copyToClipboard(htmlOutput)}>
                  <ContentCopyIcon />
                </IconButton>
              </Box>
              <Box 
                sx={{ 
                  height: 'calc(600px - 73px)', 
                  overflow: 'auto', 
                  p: 2,
                  '& *': { maxWidth: '100%' }
                }}
                dangerouslySetInnerHTML={{ __html: htmlOutput }}
              />
            </Paper>
          </Grid>
        )}

        {viewMode === 'preview' && (
          <Grid size={{ xs: 12 }}>
            <Paper elevation={2} sx={{ minHeight: 400 }}>
              <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">Preview</Typography>
                <IconButton onClick={() => copyToClipboard(htmlOutput)}>
                  <ContentCopyIcon />
                </IconButton>
              </Box>
              <Box 
                sx={{ 
                  p: 3,
                  '& *': { maxWidth: '100%' }
                }}
                dangerouslySetInnerHTML={{ __html: htmlOutput }}
              />
            </Paper>
          </Grid>
        )}

        {viewMode === 'html' && (
          <Grid size={{ xs: 12 }}>
            <Paper elevation={2} sx={{ minHeight: 400 }}>
              <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">HTML Output</Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button size="small" onClick={() => copyToClipboard(htmlOutput)}>
                    Copy HTML
                  </Button>
                  <Button size="small" onClick={() => copyToClipboard(generateFullHTML())}>
                    Copy Full
                  </Button>
                </Box>
              </Box>
              <TextField
                multiline
                fullWidth
                value={generateFullHTML()}
                variant="outlined"
                InputProps={{ readOnly: true }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    minHeight: 400,
                    alignItems: 'flex-start',
                    overflow: 'hidden',
                    '& fieldset': { border: 'none' },
                    '& textarea': {
                      fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
                      fontSize: '12px',
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
        )}

        {/* Statistics Sidebar */}
        {viewMode === 'split' && (
          <Grid size={{ xs: 12 }}>
            <Paper elevation={2} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Statistics
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 6, sm: 3 }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h5" color="primary">
                      {statistics.characters}
                    </Typography>
                    <Typography variant="body2">Characters</Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 6, sm: 3 }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h5" color="success.main">
                      {statistics.words}
                    </Typography>
                    <Typography variant="body2">Words</Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 6, sm: 3 }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h5" color="warning.main">
                      {statistics.lines}
                    </Typography>
                    <Typography variant="body2">Lines</Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 6, sm: 3 }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h5" color="error.main">
                      {statistics.htmlSize}
                    </Typography>
                    <Typography variant="body2">HTML Size</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        )}
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
