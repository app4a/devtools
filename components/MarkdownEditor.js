import React, { useState, useMemo, useRef } from 'react';
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
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import DownloadIcon from '@mui/icons-material/Download';
import PreviewIcon from '@mui/icons-material/Preview';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import TableChartIcon from '@mui/icons-material/TableChart';
import FunctionsIcon from '@mui/icons-material/Functions';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import 'katex/dist/katex.min.css';
import 'highlight.js/styles/github-dark.css';
import Head from 'next/head';

const LineNumberedEditor = ({ value, onValueChange, placeholder }) => {
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
        minHeight: '400px'
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
        highlight={(code) => {
          try {
            return highlight(code, languages.markdown || languages.text || {}, 'markdown');
          } catch (error) {
            return code;
          }
        }}
        padding={10}
        placeholder={placeholder}
        style={{
          flex: 1,
          fontFamily: 'monospace',
          fontSize: 14,
          lineHeight: '21px',
          minHeight: '400px',
          overflow: 'auto',
          backgroundColor: 'transparent'
        }}
      />
    </Paper>
  );
};

const MarkdownPreview = ({ content, renderMode }) => {
  return (
    <Paper 
      variant="outlined" 
      sx={{ 
        p: 2, 
        minHeight: '400px', 
        overflow: 'auto',
        backgroundColor: 'background.paper'
      }}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex, rehypeHighlight]}
        components={{
          // Custom styling for preview
          h1: ({children}) => <Typography variant="h3" component="h1" gutterBottom>{children}</Typography>,
          h2: ({children}) => <Typography variant="h4" component="h2" gutterBottom>{children}</Typography>,
          h3: ({children}) => <Typography variant="h5" component="h3" gutterBottom>{children}</Typography>,
          h4: ({children}) => <Typography variant="h6" component="h4" gutterBottom>{children}</Typography>,
          p: ({children}) => <Typography paragraph>{children}</Typography>,
          blockquote: ({children}) => (
            <Alert severity="info" sx={{ my: 2, '& .MuiAlert-message': { width: '100%' } }}>
              {children}
            </Alert>
          ),
          code: ({node, inline, className, children, ...props}) => {
            if (inline) {
              return (
                <code
                  style={{
                    backgroundColor: '#f5f5f5',
                    padding: '2px 4px',
                    borderRadius: '3px',
                    fontFamily: 'monospace',
                    fontSize: '0.9em'
                  }}
                  {...props}
                >
                  {children}
                </code>
              );
            }
            return (
              <Paper sx={{ p: 2, my: 2, backgroundColor: '#2d2d2d', color: '#ffffff' }}>
                <code style={{ fontFamily: 'monospace', fontSize: '0.9em' }} {...props}>
                  {children}
                </code>
              </Paper>
            );
          },
          table: ({children}) => (
            <TableContainer component={Paper} sx={{ my: 2 }}>
              <Table size="small">{children}</Table>
            </TableContainer>
          ),
          thead: ({children}) => <TableHead>{children}</TableHead>,
          tbody: ({children}) => <TableBody>{children}</TableBody>,
          tr: ({children}) => <TableRow>{children}</TableRow>,
          td: ({children}) => <TableCell>{children}</TableCell>,
          th: ({children}) => <TableCell component="th">{children}</TableCell>
        }}
      >
        {content}
      </ReactMarkdown>
    </Paper>
  );
};

const TableGenerator = ({ open, onClose, onInsert }) => {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [headers, setHeaders] = useState(true);

  const generateTable = () => {
    let table = '';
    
    // Header row
    if (headers) {
      table += '| ' + Array.from({ length: cols }, (_, i) => `Header ${i + 1}`).join(' | ') + ' |\n';
      table += '| ' + Array.from({ length: cols }, () => '---').join(' | ') + ' |\n';
    }
    
    // Data rows
    for (let r = 0; r < (headers ? rows - 1 : rows); r++) {
      table += '| ' + Array.from({ length: cols }, (_, c) => `Row ${r + 1} Col ${c + 1}`).join(' | ') + ' |\n';
    }
    
    onInsert(table);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Generate Table</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid size={{ xs: 6 }}>
            <TextField
              label="Rows"
              type="number"
              value={rows}
              onChange={(e) => setRows(Math.max(1, parseInt(e.target.value) || 1))}
              fullWidth
              inputProps={{ min: 1, max: 20 }}
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <TextField
              label="Columns"
              type="number"
              value={cols}
              onChange={(e) => setCols(Math.max(1, parseInt(e.target.value) || 1))}
              fullWidth
              inputProps={{ min: 1, max: 20 }}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <FormControl fullWidth>
              <InputLabel>Include Headers</InputLabel>
              <Select
                value={headers}
                onChange={(e) => setHeaders(e.target.value)}
                label="Include Headers"
              >
                <MenuItem value={true}>Yes</MenuItem>
                <MenuItem value={false}>No</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={generateTable} variant="contained">Insert Table</Button>
      </DialogActions>
    </Dialog>
  );
};

export default function MarkdownEditor({ name, description }) {
  const [markdown, setMarkdown] = useState(`# Welcome to Markdown Editor

This is a **professional markdown editor** with live preview and advanced features.

## Features

- 📝 Live preview with GitHub Flavored Markdown
- 🧮 Math equations support: $E = mc^2$
- 📊 Tables with beautiful styling
- 🎨 Syntax highlighting for code blocks
- 📈 Statistics and word count

### Code Example

\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`

### Table Example

| Feature | Status | Priority |
| --- | --- | --- |
| Live Preview | ✅ Complete | High |
| Export Options | ✅ Complete | Medium |
| Math Support | ✅ Complete | Low |

> **Note:** This is a blockquote example

### Math Equations

Block equation:
$$\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}$$

Inline equation: $f(x) = ax^2 + bx + c$

Happy writing! 🚀`);
  
  const [viewMode, setViewMode] = useState('split');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  const [tableDialogOpen, setTableDialogOpen] = useState(false);
  const fileInputRef = useRef(null);

  const markdownStats = useMemo(() => {
    const text = markdown.replace(/[#*_`~\[\]()]/g, ''); // Remove markdown syntax
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const paragraphs = markdown.split(/\n\s*\n/).filter(p => p.trim().length > 0);
    
    return {
      characters: markdown.length,
      charactersNoSpaces: markdown.replace(/\s/g, '').length,
      words: words.length,
      sentences: sentences.length,
      paragraphs: paragraphs.length,
      lines: markdown.split('\n').length,
      readingTime: Math.ceil(words.length / 200), // Average 200 words per minute
      size: new Blob([markdown]).size
    };
  }, [markdown]);

  const copyToClipboard = async (content, type) => {
    try {
      await navigator.clipboard.writeText(content);
      setOpenSnackbar(true);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const downloadMarkdown = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadHTML = () => {
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Markdown Export</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/katex.min.css">
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; line-height: 1.6; }
        pre { background: #f5f5f5; padding: 15px; border-radius: 5px; overflow-x: auto; }
        code { background: #f5f5f5; padding: 2px 4px; border-radius: 3px; font-family: 'Monaco', 'Consolas', monospace; }
        table { border-collapse: collapse; width: 100%; margin: 20px 0; }
        th, td { border: 1px solid #ddd; padding: 8px 12px; text-align: left; }
        th { background-color: #f2f2f2; }
        blockquote { border-left: 4px solid #ddd; margin: 0; padding-left: 20px; color: #666; }
    </style>
</head>
<body>
    ${markdown}
</body>
</html>`;
    
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.html';
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
        setMarkdown(e.target.result);
      };
      reader.readAsText(file);
    }
  };

  const insertTable = (tableMarkdown) => {
    setMarkdown(prev => prev + '\n\n' + tableMarkdown + '\n');
  };

  const markdownExamples = [
    {
      name: 'Simple Blog Post',
      content: `# Getting Started with React Hooks

*Published on March 15, 2024*

React Hooks have revolutionized how we write **functional components**. Let's explore the basics.

## What are Hooks?

Hooks are functions that let you "hook into" React state and lifecycle features from function components.

### useState Example

\`\`\`javascript
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
\`\`\`

> **Tip:** Always start useState with a sensible default value.

## Conclusion

Hooks make React development more intuitive and fun! 🎉`
    },
    {
      name: 'Technical Specification',
      content: `# Database Schema Design

## User Management System

### Tables Overview

| Table | Purpose | Relationships |
|-------|---------|---------------|
| users | Store user accounts | → profiles, orders |
| profiles | Extended user info | ← users |
| orders | Purchase history | ← users, → items |
| items | Product catalog | ← orders |

### User Table Schema

\`\`\`sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
\`\`\`

### Performance Metrics

**Query Performance:**
- Average response time: $\\bar{t} = 45ms$
- 95th percentile: $t_{95} = 120ms$
- Cache hit ratio: $\\frac{hits}{total} = 0.92$

### Implementation Notes

1. **Indexing Strategy**
   - Primary keys: B-tree indexes
   - Search fields: GIN indexes for full-text
   - Foreign keys: Automatic indexing

2. **Security Considerations**
   - Password hashing with bcrypt (cost=12)
   - Email validation on input
   - Rate limiting on authentication endpoints

> ⚠️ **Warning:** Never store plain text passwords!`
    },
    {
      name: 'Meeting Notes Template',
      content: `# Weekly Team Standup

**Date:** March 15, 2024  
**Attendees:** Alice, Bob, Carol, Dave  
**Duration:** 30 minutes

## 📋 Agenda

1. Sprint review
2. Blockers discussion
3. Next week planning
4. Action items

## 🎯 Sprint Review

### Completed Tasks
- [x] User authentication system
- [x] Dashboard UI components
- [x] API integration tests
- [x] Database migration scripts

### In Progress
- [ ] Payment processing (80% complete)
- [ ] Email notifications (50% complete)

### Blocked
- [ ] Mobile app deployment (waiting for certificates)

## 🚧 Blockers & Solutions

| Blocker | Owner | Solution | ETA |
|---------|-------|----------|-----|
| SSL Certificate | DevOps | Contact IT support | March 18 |
| API Rate Limits | Backend | Implement caching | March 20 |

## 📅 Next Week Plan

### High Priority
1. **Payment Integration** - Bob
   - Complete Stripe implementation
   - Add error handling
   - Write unit tests

2. **Mobile Deployment** - Alice
   - Resolve certificate issues
   - Test on staging environment

### Medium Priority
- Code review for authentication module
- Update documentation
- Performance optimization

## ✅ Action Items

- [ ] Bob: Schedule payment testing session by March 18
- [ ] Alice: Follow up with IT on certificates by EOD
- [ ] Carol: Prepare demo for stakeholder meeting
- [ ] Dave: Review and merge pending PRs

---

**Next Meeting:** March 22, 2024 at 10:00 AM`
    },
    {
      name: 'GitHub README',
      content: `# 🛠️ DevTools Pro

*A comprehensive suite of developer utilities for modern web development*

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js CI](https://github.com/username/devtools-pro/workflows/Node.js%20CI/badge.svg)](https://github.com/username/devtools-pro/actions)
[![codecov](https://codecov.io/gh/username/devtools-pro/branch/main/graph/badge.svg)](https://codecov.io/gh/username/devtools-pro)

## ✨ Features

- 🎨 **JSON Formatter** - Format and validate JSON with syntax highlighting
- 🔐 **Base64 Encoder** - Encode/decode with Unicode support
- 🌈 **Color Converter** - Convert between HEX, RGB, HSL with WCAG compliance
- 📝 **Markdown Editor** - Live preview with math equation support
- 🗄️ **SQL Formatter** - Multi-dialect support with syntax validation

## 🚀 Quick Start

### Prerequisites

- Node.js 16.x or higher
- npm 8.x or higher

### Installation

\`\`\`bash
# Clone the repository
git clone https://github.com/username/devtools-pro.git

# Navigate to project directory
cd devtools-pro

# Install dependencies
npm install

# Start development server
npm run dev
\`\`\`

Visit [http://localhost:3000](http://localhost:3000) to see the application.

### Building for Production

\`\`\`bash
# Create optimized build
npm run build

# Start production server
npm start
\`\`\`

## 📁 Project Structure

\`\`\`
devtools-pro/
├── components/          # Reusable React components
│   ├── JsonFormatter.js # JSON formatting tool
│   ├── ColorConverter.js# Color conversion utilities
│   └── ...
├── pages/              # Next.js pages
│   ├── index.js        # Homepage
│   ├── json.js         # JSON formatter page
│   └── ...
├── public/             # Static assets
├── styles/             # Global styles
└── __tests__/          # Test files
\`\`\`

## 🧪 Testing

\`\`\`bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
\`\`\`

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch: \`git checkout -b feature/amazing-feature\`
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass: \`npm test\`
6. Commit your changes: \`git commit -m 'Add amazing feature'\`
7. Push to the branch: \`git push origin feature/amazing-feature\`
8. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Material-UI](https://mui.com/) for beautiful components
- [Prism.js](https://prismjs.com/) for syntax highlighting

---

Made with ❤️ by the DevTools Pro team`
    }
  ];

  return (
    <Box sx={{ p: 2 }}>
      <Head>
        <title>{name ? `${name} - Dev Tools` : 'Markdown Editor & Preview - Dev Tools'}</title>
        <meta name="description" content={description} />
      </Head>
      
      <Typography variant="h4" gutterBottom>
        {name}
      </Typography>
      <Typography variant="body1" paragraph color="text.secondary">
        {description}
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        <strong>Professional Markdown Editor:</strong> Live preview, GitHub Flavored Markdown, 
        math equations, syntax highlighting, and export options.
      </Alert>

      <Tabs value={currentTab} onChange={(e, newValue) => setCurrentTab(newValue)} sx={{ mb: 3 }}>
        <Tab label="Editor" />
        <Tab label="Examples" />
        <Tab label="Cheat Sheet" />
      </Tabs>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          {currentTab === 0 && (
            <>
              {/* Editor Controls */}
              <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Editor Options
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
                  <ToggleButtonGroup
                    value={viewMode}
                    exclusive
                    onChange={(e, newMode) => newMode && setViewMode(newMode)}
                    size="small"
                  >
                    <ToggleButton value="edit">
                      <EditIcon sx={{ mr: 1 }} />
                      Edit Only
                    </ToggleButton>
                    <ToggleButton value="split">
                      <PreviewIcon sx={{ mr: 1 }} />
                      Split View
                    </ToggleButton>
                    <ToggleButton value="preview">
                      <PreviewIcon sx={{ mr: 1 }} />
                      Preview Only
                    </ToggleButton>
                  </ToggleButtonGroup>
                  
                  <Button
                    variant="outlined"
                    startIcon={<TableChartIcon />}
                    onClick={() => setTableDialogOpen(true)}
                    size="small"
                  >
                    Insert Table
                  </Button>
                  
                  <Button
                    variant="outlined"
                    startIcon={<FunctionsIcon />}
                    onClick={() => setMarkdown(prev => prev + '\n\n$$\\int_{a}^{b} f(x) dx$$\n')}
                    size="small"
                  >
                    Insert Math
                  </Button>
                </Box>
              </Paper>

              {/* File Operations */}
              <Paper sx={{ p: 3, mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6">
                    Document
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <input
                      accept=".md,.txt,.markdown"
                      style={{ display: 'none' }}
                      id="file-upload"
                      type="file"
                      onChange={handleFileUpload}
                      ref={fileInputRef}
                    />
                    <label htmlFor="file-upload">
                      <IconButton component="span" color="primary">
                        <FileUploadIcon />
                      </IconButton>
                    </label>
                    <IconButton onClick={() => copyToClipboard(markdown)} title="Copy Markdown">
                      <ContentCopyIcon />
                    </IconButton>
                    <IconButton onClick={downloadMarkdown} title="Download Markdown">
                      <DownloadIcon />
                    </IconButton>
                    <IconButton onClick={downloadHTML} title="Export as HTML">
                      <DownloadIcon color="secondary" />
                    </IconButton>
                  </Box>
                </Box>

                {/* Editor/Preview */}
                <Grid container spacing={2}>
                  {(viewMode === 'edit' || viewMode === 'split') && (
                    <Grid size={{ xs: 12, md: viewMode === 'split' ? 6 : 12 }}>
                      <Typography variant="subtitle2" gutterBottom>
                        Markdown Source
                      </Typography>
                      <LineNumberedEditor
                        value={markdown}
                        onValueChange={setMarkdown}
                        placeholder="# Start writing your markdown here..."
                      />
                    </Grid>
                  )}
                  
                  {(viewMode === 'preview' || viewMode === 'split') && (
                    <Grid size={{ xs: 12, md: viewMode === 'split' ? 6 : 12 }}>
                      <Typography variant="subtitle2" gutterBottom>
                        Live Preview
                      </Typography>
                      <MarkdownPreview content={markdown} />
                    </Grid>
                  )}
                </Grid>
              </Paper>
            </>
          )}

          {currentTab === 1 && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Quick Examples
              </Typography>
              <List>
                {markdownExamples.map((example, index) => (
                  <ListItem key={index} disablePadding>
                    <ListItemButton 
                      onClick={() => {
                        setMarkdown(example.content);
                        setCurrentTab(0);
                      }}
                      sx={{ py: 2 }}
                    >
                      <ListItemText
                        primary={example.name}
                        secondary={
                          <Typography 
                            variant="caption" 
                            sx={{ fontFamily: 'monospace', display: 'block', mt: 0.5 }}
                          >
                            {example.content.split('\n')[0]}
                          </Typography>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Paper>
          )}

          {currentTab === 2 && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Markdown Cheat Sheet
              </Typography>
              
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>Element</strong></TableCell>
                      <TableCell><strong>Syntax</strong></TableCell>
                      <TableCell><strong>Example</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Headings</TableCell>
                      <TableCell sx={{ fontFamily: 'monospace' }}># H1 ## H2 ### H3</TableCell>
                      <TableCell># Main Title</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Bold</TableCell>
                      <TableCell sx={{ fontFamily: 'monospace' }}>**text**</TableCell>
                      <TableCell>**bold text**</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Italic</TableCell>
                      <TableCell sx={{ fontFamily: 'monospace' }}>*text*</TableCell>
                      <TableCell>*italic text*</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Code Inline</TableCell>
                      <TableCell sx={{ fontFamily: 'monospace' }}>`code`</TableCell>
                      <TableCell>`console.log()`</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Code Block</TableCell>
                      <TableCell sx={{ fontFamily: 'monospace' }}>```language</TableCell>
                      <TableCell>```javascript</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Link</TableCell>
                      <TableCell sx={{ fontFamily: 'monospace' }}>[text](url)</TableCell>
                      <TableCell>[Google](https://google.com)</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Image</TableCell>
                      <TableCell sx={{ fontFamily: 'monospace' }}>![alt](url)</TableCell>
                      <TableCell>![Logo](logo.png)</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>List</TableCell>
                      <TableCell sx={{ fontFamily: 'monospace' }}>- item</TableCell>
                      <TableCell>- First item</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Table</TableCell>
                      <TableCell sx={{ fontFamily: 'monospace' }}>| col | col |</TableCell>
                      <TableCell>| Name | Age |</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Blockquote</TableCell>
                      <TableCell sx={{ fontFamily: 'monospace' }}>&gt; text</TableCell>
                      <TableCell>&gt; Important note</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Math Inline</TableCell>
                      <TableCell sx={{ fontFamily: 'monospace' }}>$equation$</TableCell>
                      <TableCell>$E = mc^2$</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Math Block</TableCell>
                      <TableCell sx={{ fontFamily: 'monospace' }}>$$equation$$</TableCell>
                      <TableCell>$$\int f(x) dx$$</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          )}
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          {/* Document Statistics */}
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <InfoIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                Document Statistics
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell>Characters</TableCell>
                      <TableCell align="right">{markdownStats.characters.toLocaleString()}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Characters (no spaces)</TableCell>
                      <TableCell align="right">{markdownStats.charactersNoSpaces.toLocaleString()}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Words</TableCell>
                      <TableCell align="right">{markdownStats.words.toLocaleString()}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Sentences</TableCell>
                      <TableCell align="right">{markdownStats.sentences}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Paragraphs</TableCell>
                      <TableCell align="right">{markdownStats.paragraphs}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Lines</TableCell>
                      <TableCell align="right">{markdownStats.lines}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><strong>Reading Time</strong></TableCell>
                      <TableCell align="right"><strong>{markdownStats.readingTime} min</strong></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><strong>File Size</strong></TableCell>
                      <TableCell align="right"><strong>{markdownStats.size} bytes</strong></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>

          {/* Features Info */}
          <Alert severity="info" sx={{ mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom>Features Supported:</Typography>
            <Typography variant="body2" paragraph>
              • GitHub Flavored Markdown (GFM)
            </Typography>
            <Typography variant="body2" paragraph>
              • Math equations with KaTeX
            </Typography>
            <Typography variant="body2" paragraph>
              • Syntax highlighting
            </Typography>
            <Typography variant="body2">
              • Tables, lists, and blockquotes
            </Typography>
          </Alert>

          {/* Tips */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Pro Tips
              </Typography>
              <Typography variant="body2" paragraph>
                • Use **Ctrl+Z** / **Cmd+Z** to undo changes
              </Typography>
              <Typography variant="body2" paragraph>
                • Switch to split view for real-time preview
              </Typography>
              <Typography variant="body2" paragraph>
                • Use the table generator for complex tables
              </Typography>
              <Typography variant="body2" paragraph>
                • Math equations support LaTeX syntax
              </Typography>
              <Typography variant="body2">
                • Export to HTML for sharing or publishing
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <TableGenerator
        open={tableDialogOpen}
        onClose={() => setTableDialogOpen(false)}
        onInsert={insertTable}
      />

      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
        message="Copied to clipboard!"
      />
    </Box>
  );
}
