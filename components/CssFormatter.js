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
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tabs,
  Tab,
  FormControlLabel,
  Checkbox,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import DownloadIcon from '@mui/icons-material/Download';
import FormatIndentIncreaseIcon from '@mui/icons-material/FormatIndentIncrease';
import CompressIcon from '@mui/icons-material/Compress';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-less';
// PostCSS and plugins will be loaded dynamically to avoid server-side issues
import Head from 'next/head';

const LineNumberedEditor = ({ value, onValueChange, readOnly, placeholder, error, language = 'css' }) => {
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
        borderColor: error ? 'error.main' : undefined,
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
          backgroundColor: 'action.hover',
          minWidth: '40px'
        }}
      >
        {lineNumbers}
      </Box>
      <Editor
        value={value}
        onValueChange={onValueChange}
        highlight={(code) => highlight(code, languages[language] || languages.css, language)}
        padding={10}
        readOnly={readOnly}
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

const CssValidator = ({ css }) => {
  const issues = useMemo(() => {
    const problems = [];
    
    try {
      // Basic CSS validation checks
      const lines = css.split('\n');
      
      lines.forEach((line, index) => {
        const lineNum = index + 1;
        const trimmed = line.trim();
        
        // Check for unclosed braces
        const openBraces = (line.match(/{/g) || []).length;
        const closeBraces = (line.match(/}/g) || []).length;
        
        // Check for missing semicolons (basic check)
        if (trimmed.includes(':') && !trimmed.includes(';') && !trimmed.endsWith('{') && !trimmed.endsWith('}') && trimmed !== '') {
          problems.push({
            line: lineNum,
            type: 'warning',
            message: 'Missing semicolon',
            code: trimmed
          });
        }
        
        // Check for unknown properties and typos
        const propertyMatch = trimmed.match(/^([a-zA-Z-]+):\s*/);
        if (propertyMatch) {
          const property = propertyMatch[1];
          const commonProperties = [
            'color', 'background', 'border', 'margin', 'padding', 'width', 'height',
            'display', 'position', 'font', 'text', 'line-height', 'letter-spacing',
            'opacity', 'visibility', 'overflow', 'z-index', 'float', 'clear',
            'flex', 'grid', 'animation', 'transition', 'transform', 'box-shadow',
            'cursor', 'outline', 'content', 'counter', 'list-style', 'table',
            'caption', 'border-collapse', 'border-spacing', 'empty-cells',
            'vertical-align', 'white-space', 'word', 'direction', 'unicode-bidi',
            'clip', 'resize', 'min-width', 'max-width', 'min-height', 'max-height',
            'top', 'left', 'right', 'bottom', 'gap', 'place', 'justify', 'align'
          ];

          // Check for common CSS property typos
          const propertyTypos = [
            { wrong: 'colr', correct: 'color' },
            { wrong: 'backgroud', correct: 'background' },
            { wrong: 'bordr', correct: 'border' },
            { wrong: 'margn', correct: 'margin' },
            { wrong: 'paddin', correct: 'padding' },
            { wrong: 'wdth', correct: 'width' },
            { wrong: 'heght', correct: 'height' },
            { wrong: 'dispay', correct: 'display' },
            { wrong: 'positon', correct: 'position' },
            { wrong: 'fnt-size', correct: 'font-size' },
            { wrong: 'txt-align', correct: 'text-align' },
            { wrong: 'lne-height', correct: 'line-height' },
            { wrong: 'opacty', correct: 'opacity' },
            { wrong: 'visiblity', correct: 'visibility' },
            { wrong: 'overflw', correct: 'overflow' },
            { wrong: 'transfom', correct: 'transform' },
            { wrong: 'transistion', correct: 'transition' },
            { wrong: 'aniamtion', correct: 'animation' }
          ];

          // Check for typos first
          const typo = propertyTypos.find(t => t.wrong === property);
          if (typo) {
            problems.push({
              line: lineNum,
              type: 'error',
              message: `CSS property typo: "${typo.wrong}" should be "${typo.correct}"`,
              code: trimmed
            });
          } else if (!commonProperties.some(prop => property.startsWith(prop))) {
            problems.push({
              line: lineNum,
              type: 'info',
              message: 'Uncommon CSS property - verify spelling',
              code: property
            });
          }
        }

        // Check for invalid CSS values
        if (trimmed.includes(':')) {
          const [prop, value] = trimmed.split(':').map(s => s.trim());
          if (value && !value.endsWith(';')) {
            const cleanValue = value.replace(';', '').trim();
            
            // Check for common value typos
            const valueTypos = [
              { wrong: 'blck', correct: 'block' },
              { wrong: 'inlne', correct: 'inline' },
              { wrong: 'absoulte', correct: 'absolute' },
              { wrong: 'relatve', correct: 'relative' },
              { wrong: 'centter', correct: 'center' },
              { wrong: 'lft', correct: 'left' },
              { wrong: 'rght', correct: 'right' },
              { wrong: 'nne', correct: 'none' },
              { wrong: 'auot', correct: 'auto' },
              { wrong: 'hiden', correct: 'hidden' },
              { wrong: 'visibl', correct: 'visible' }
            ];

            const valueTypo = valueTypos.find(t => cleanValue.includes(t.wrong));
            if (valueTypo) {
              problems.push({
                line: lineNum,
                type: 'error',
                message: `CSS value typo: "${valueTypo.wrong}" should be "${valueTypo.correct}"`,
                code: trimmed
              });
            }
          }
        }
        
        // Check for vendor prefixes without standard property
        if (trimmed.includes('-webkit-') || trimmed.includes('-moz-') || trimmed.includes('-ms-')) {
          problems.push({
            line: lineNum,
            type: 'info',
            message: 'Vendor prefix detected - consider using autoprefixer',
            code: trimmed
          });
        }
      });
      
      // Check overall structure
      const totalOpenBraces = (css.match(/{/g) || []).length;
      const totalCloseBraces = (css.match(/}/g) || []).length;
      
      if (totalOpenBraces !== totalCloseBraces) {
        problems.push({
          line: 0,
          type: 'error',
          message: `Mismatched braces: ${totalOpenBraces} opening, ${totalCloseBraces} closing`,
          code: ''
        });
      }
      
    } catch (error) {
      problems.push({
        line: 0,
        type: 'error',
        message: 'CSS parsing error: ' + error.message,
        code: ''
      });
    }
    
    return problems;
  }, [css]);

  if (issues.length === 0) {
    return (
      <Alert severity="success" sx={{ mb: 2 }}>
        <CheckCircleIcon sx={{ mr: 1 }} />
        CSS appears to be valid with no issues detected
      </Alert>
    );
  }

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          CSS Validation Results
        </Typography>
        
        <List dense>
          {issues.map((issue, index) => (
            <ListItem key={index} divider>
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                {issue.type === 'error' && <ErrorIcon color="error" sx={{ mr: 1 }} />}
                {issue.type === 'warning' && <WarningIcon color="warning" sx={{ mr: 1 }} />}
                {issue.type === 'info' && <InfoIcon color="info" sx={{ mr: 1 }} />}
                
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="body2">
                    {issue.line > 0 && `Line ${issue.line}: `}{issue.message}
                  </Typography>
                  {issue.code && (
                    <Typography variant="caption" sx={{ fontFamily: 'monospace', color: 'text.secondary' }}>
                      {issue.code}
                    </Typography>
                  )}
                </Box>
              </Box>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

const CssPropertyAnalyzer = ({ css }) => {
  const analysis = useMemo(() => {
    const properties = {};
    const selectors = [];
    const mediaQueries = [];
    const imports = [];
    
    try {
      // Extract properties
      const propertyMatches = css.match(/([a-zA-Z-]+)\s*:/g) || [];
      propertyMatches.forEach(match => {
        const prop = match.replace(':', '').trim();
        properties[prop] = (properties[prop] || 0) + 1;
      });
      
      // Extract selectors (basic)
      const selectorMatches = css.match(/^[^{]+{/gm) || [];
      selectorMatches.forEach(match => {
        const selector = match.replace('{', '').trim();
        if (selector) selectors.push(selector);
      });
      
      // Extract media queries
      const mediaMatches = css.match(/@media[^{]+/g) || [];
      mediaMatches.forEach(match => {
        mediaQueries.push(match.trim());
      });
      
      // Extract imports
      const importMatches = css.match(/@import[^;]+;/g) || [];
      importMatches.forEach(match => {
        imports.push(match.trim());
      });
      
    } catch (error) {
      console.error('CSS analysis error:', error);
    }
    
    return {
      properties: Object.entries(properties).sort((a, b) => b[1] - a[1]),
      selectors: selectors.slice(0, 20), // Show first 20
      mediaQueries,
      imports,
      totalProperties: Object.values(properties).reduce((sum, count) => sum + count, 0),
      uniqueProperties: Object.keys(properties).length
    };
  }, [css]);

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          CSS Analysis
        </Typography>
        
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle2">
              Properties ({analysis.uniqueProperties} unique, {analysis.totalProperties} total)
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Property</TableCell>
                    <TableCell align="right">Count</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {analysis.properties.slice(0, 15).map(([prop, count]) => (
                    <TableRow key={prop}>
                      <TableCell sx={{ fontFamily: 'monospace' }}>{prop}</TableCell>
                      <TableCell align="right">{count}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </AccordionDetails>
        </Accordion>
        
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle2">
              Selectors ({analysis.selectors.length})
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List dense>
              {analysis.selectors.map((selector, index) => (
                <ListItem key={index}>
                  <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                    {selector}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
        
        {analysis.mediaQueries.length > 0 && (
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle2">
                Media Queries ({analysis.mediaQueries.length})
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List dense>
                {analysis.mediaQueries.map((query, index) => (
                  <ListItem key={index}>
                    <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                      {query}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        )}
      </CardContent>
    </Card>
  );
};

export default function CssFormatter({ name, description }) {
  const [inputCss, setInputCss] = useState(`.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
}

.header {
  background-color: #333;
  color: white;
  padding: 1rem;
  text-align: center;
}

.nav ul {
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: center;
}

.nav li {
  margin: 0 15px;
}

.nav a {
  color: white;
  text-decoration: none;
  transition: color 0.3s ease;
}

.nav a:hover {
  color: #007bff;
}

@media (max-width: 768px) {
  .container {
    padding: 10px;
  }
  
  .nav ul {
    flex-direction: column;
  }
}`);
  
  const [outputCss, setOutputCss] = useState('');
  const [formatMode, setFormatMode] = useState('beautify');
  const [indentSize, setIndentSize] = useState(2);
  const [indentType, setIndentType] = useState('spaces');
  const [sortProperties, setSortProperties] = useState(false);
  const [addAutoprefixes, setAddAutoprefixes] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  const fileInputRef = useRef(null);

  const cssStats = useMemo(() => {
    if (!inputCss.trim()) return null;
    
    const lines = inputCss.split('\n').length;
    const size = new Blob([inputCss]).size;
    const selectors = (inputCss.match(/[^{]+{/g) || []).length;
    const properties = (inputCss.match(/[a-zA-Z-]+\s*:/g) || []).length;
    const mediaQueries = (inputCss.match(/@media/g) || []).length;
    const comments = (inputCss.match(/\/\*[\s\S]*?\*\//g) || []).length;
    
    const outputSize = outputCss ? new Blob([outputCss]).size : 0;
    const compressionRatio = outputSize && size ? ((size - outputSize) / size * 100).toFixed(1) : 0;
    
    return {
      lines,
      size,
      selectors,
      properties,
      mediaQueries,
      comments,
      outputSize,
      compressionRatio
    };
  }, [inputCss, outputCss]);

  const processCss = () => {
    if (!inputCss.trim()) {
      setOutputCss('');
      return;
    }
    
    setProcessing(true);
    
    try {
      let result = inputCss;
      
      if (formatMode === 'minify') {
        // Basic CSS minification
        result = minifyCss(result);
      } else {
        // CSS beautification
        result = beautifyCss(result);
      }
      
      // Basic autoprefixer simulation (add common prefixes)
      if (addAutoprefixes) {
        result = addBasicPrefixes(result);
      }
      
      setOutputCss(result);
    } catch (error) {
      console.error('CSS processing error:', error);
      setOutputCss('/* Error processing CSS: ' + error.message + ' */');
    }
    
    setProcessing(false);
  };

  const minifyCss = (css) => {
    return css
      .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .replace(/;\s*}/g, '}') // Remove semicolon before closing brace
      .replace(/\s*{\s*/g, '{') // Remove spaces around opening brace
      .replace(/;\s*/g, ';') // Remove spaces after semicolon
      .replace(/,\s*/g, ',') // Remove spaces after comma
      .replace(/:\s*/g, ':') // Remove spaces after colon
      .trim();
  };

  const addBasicPrefixes = (css) => {
    // Add some common vendor prefixes
    const prefixes = [
      { property: 'transform', prefixes: ['-webkit-', '-moz-', '-ms-'] },
      { property: 'transition', prefixes: ['-webkit-', '-moz-'] },
      { property: 'animation', prefixes: ['-webkit-', '-moz-'] },
      { property: 'border-radius', prefixes: ['-webkit-', '-moz-'] },
      { property: 'box-shadow', prefixes: ['-webkit-', '-moz-'] },
      { property: 'user-select', prefixes: ['-webkit-', '-moz-', '-ms-'] },
    ];
    
    let result = css;
    
    prefixes.forEach(({ property, prefixes: vendorPrefixes }) => {
      const regex = new RegExp(`(\\s|^)${property}\\s*:`, 'g');
      if (regex.test(result)) {
        const replacement = vendorPrefixes
          .map(prefix => `$1${prefix}${property}:`)
          .join('') + `$1${property}:`;
        result = result.replace(regex, replacement);
      }
    });
    
    return result;
  };

  const beautifyCss = (css) => {
    let formatted = css;
    
    // Remove excessive whitespace
    formatted = formatted.replace(/\s+/g, ' ');
    
    // Add newlines and indentation
    const indent = indentType === 'tabs' ? '\t' : ' '.repeat(indentSize);
    
    formatted = formatted
      .replace(/{/g, ' {\n')
      .replace(/}/g, '\n}\n')
      .replace(/;/g, ';\n')
      .replace(/,/g, ',\n');
    
    // Apply indentation
    const lines = formatted.split('\n');
    let indentLevel = 0;
    const indentedLines = lines.map(line => {
      const trimmed = line.trim();
      if (!trimmed) return '';
      
      if (trimmed.includes('}')) {
        indentLevel = Math.max(0, indentLevel - 1);
      }
      
      const indentedLine = indent.repeat(indentLevel) + trimmed;
      
      if (trimmed.includes('{')) {
        indentLevel++;
      }
      
      return indentedLine;
    });
    
    formatted = indentedLines.join('\n');
    
    // Clean up extra newlines
    formatted = formatted.replace(/\n{3,}/g, '\n\n');
    
    // Sort properties if requested
    if (sortProperties) {
      formatted = sortCssProperties(formatted);
    }
    
    return formatted;
  };

  const sortCssProperties = (css) => {
    return css.replace(/([^{]+)\{([^}]+)\}/g, (match, selector, properties) => {
      const props = properties
        .split(';')
        .map(prop => prop.trim())
        .filter(prop => prop)
        .sort();
      
      return selector + '{\n' + props.map(prop => '  ' + prop + ';').join('\n') + '\n}';
    });
  };

  const copyToClipboard = async (content) => {
    try {
      await navigator.clipboard.writeText(content);
      setOpenSnackbar(true);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const downloadCss = () => {
    const blob = new Blob([outputCss || inputCss], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${formatMode === 'minify' ? 'minified' : 'formatted'}.css`;
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
        setInputCss(e.target.result);
      };
      reader.readAsText(file);
    }
  };

  const cssExamples = [
    {
      name: 'Modern Card Component',
      css: `/* Modern card component with glass morphism effect */
.card {
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  padding: 2rem;
  margin: 1rem;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 20px 40px rgba(31, 38, 135, 0.5);
}

.card-header {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.card-body {
  color: rgba(0, 0, 0, 0.8);
  line-height: 1.6;
}`
    },
    {
      name: 'Responsive Navigation Bar',
      css: `/* Responsive navigation with mobile hamburger menu */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: linear-gradient(90deg, #1e3c72 0%, #2a5298 100%);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.nav-brand {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
}

.nav-menu {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 2rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  position: relative;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 50%;
  width: 0;
  height: 2px;
  background: white;
  transition: all 0.3s ease;
  transform: translateX(-50%);
}

.nav-link:hover::after {
  width: 80%;
}

.hamburger {
  display: none;
  flex-direction: column;
  cursor: pointer;
}

.hamburger span {
  width: 25px;
  height: 3px;
  background: white;
  margin: 3px 0;
  transition: 0.3s;
}

@media (max-width: 768px) {
  .nav-menu {
    position: fixed;
    left: -100%;
    top: 70px;
    flex-direction: column;
    background-color: #1e3c72;
    width: 100%;
    text-align: center;
    transition: 0.3s;
    padding: 2rem 0;
  }

  .nav-menu.active {
    left: 0;
  }

  .hamburger {
    display: flex;
  }

  .hamburger.active span:nth-child(2) {
    opacity: 0;
  }

  .hamburger.active span:nth-child(1) {
    transform: translateY(8px) rotate(45deg);
  }

  .hamburger.active span:nth-child(3) {
    transform: translateY(-8px) rotate(-45deg);
  }
}`
    },
    {
      name: 'Advanced Grid Layout',
      css: `/* Complex dashboard grid layout */
.dashboard {
  display: grid;
  grid-template-areas: 
    "header header header"
    "sidebar main aside"
    "footer footer footer";
  grid-template-columns: 250px 1fr 300px;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
  gap: 1rem;
  padding: 1rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.header {
  grid-area: header;
  background: white;
  padding: 1rem 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sidebar {
  grid-area: sidebar;
  background: white;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
}

.main-content {
  grid-area: main;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}

.widget {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.widget:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.aside {
  grid-area: aside;
  background: white;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
}

.footer {
  grid-area: footer;
  background: white;
  padding: 1rem 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
  text-align: center;
}

@media (max-width: 1024px) {
  .dashboard {
    grid-template-areas: 
      "header"
      "main"
      "aside"
      "footer";
    grid-template-columns: 1fr;
  }

  .sidebar {
    display: none;
  }
}

@media (max-width: 768px) {
  .main-content {
    grid-template-columns: 1fr;
  }
}`
    },
    {
      name: 'Custom Button Styles',
      css: `/* Advanced button component library */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  user-select: none;
  min-width: 120px;
}

.btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.btn:hover::before {
  left: 100%;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.btn-primary:hover {
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6);
  transform: translateY(-2px);
}

.btn-secondary {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(240, 147, 251, 0.4);
}

.btn-outline {
  background: transparent;
  color: #667eea;
  border: 2px solid #667eea;
}

.btn-outline:hover {
  background: #667eea;
  color: white;
  transform: translateY(-2px);
}

.btn-ghost {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #333;
}

.btn-lg {
  padding: 1rem 2rem;
  font-size: 1.125rem;
  border-radius: 12px;
}

.btn-sm {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  border-radius: 6px;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
  box-shadow: none !important;
}

.btn-icon {
  padding: 0.75rem;
  border-radius: 50%;
  min-width: auto;
  width: 48px;
  height: 48px;
}

.btn-group {
  display: inline-flex;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.btn-group .btn {
  border-radius: 0;
  margin: 0;
  border-right: 1px solid rgba(255, 255, 255, 0.2);
}

.btn-group .btn:last-child {
  border-right: none;
}`
    }
  ];

  // Auto-process when settings change
  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      processCss();
    }, 300);
    
    return () => clearTimeout(timeoutId);
  }, [inputCss, formatMode, indentSize, indentType, sortProperties, addAutoprefixes]);

  return (
    <Box sx={{ p: 2 }}>
      <Head>
        <title>{name ? `${name} - Dev Tools` : 'CSS Formatter & Minifier - Dev Tools'}</title>
        <meta name="description" content={description} />
      </Head>
      
      <Typography variant="h4" gutterBottom>
        {name}
      </Typography>
      <Typography variant="body1" paragraph color="text.secondary">
        {description}
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        <strong>Professional CSS Tool:</strong> Format, minify, validate, and analyze CSS with 
        advanced options including autoprefixer and property sorting.
      </Alert>

      <Tabs value={currentTab} onChange={(e, newValue) => setCurrentTab(newValue)} sx={{ mb: 3 }}>
        <Tab label="Formatter" />
        <Tab label="Validator" />
        <Tab label="Analyzer" />
        <Tab label="Examples" />
      </Tabs>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          {currentTab === 0 && (
            <>
              {/* Format Options */}
              <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Format Options
                </Typography>
                <Grid container spacing={2} alignItems="center">
                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <ToggleButtonGroup
                      value={formatMode}
                      exclusive
                      onChange={(e, newMode) => newMode && setFormatMode(newMode)}
                      size="small"
                      fullWidth
                    >
                      <ToggleButton value="beautify">
                        <FormatIndentIncreaseIcon sx={{ mr: 1 }} />
                        Beautify
                      </ToggleButton>
                      <ToggleButton value="minify">
                        <CompressIcon sx={{ mr: 1 }} />
                        Minify
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </Grid>
                  
                  <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                    <FormControl size="small" fullWidth>
                      <InputLabel>Indent</InputLabel>
                      <Select
                        value={indentType}
                        onChange={(e) => setIndentType(e.target.value)}
                        label="Indent"
                      >
                        <MenuItem value="spaces">Spaces</MenuItem>
                        <MenuItem value="tabs">Tabs</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  
                  {indentType === 'spaces' && (
                    <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                      <TextField
                        size="small"
                        label="Size"
                        type="number"
                        value={indentSize}
                        onChange={(e) => setIndentSize(Math.max(1, parseInt(e.target.value) || 2))}
                        fullWidth
                        inputProps={{ min: 1, max: 8 }}
                      />
                    </Grid>
                  )}
                  
                  <Grid size={{ xs: 12, md: 5 }}>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      <FormControlLabel
                        control={
                          <Checkbox 
                            checked={sortProperties} 
                            onChange={(e) => setSortProperties(e.target.checked)}
                            size="small"
                          />
                        }
                        label="Sort Properties"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox 
                            checked={addAutoprefixes} 
                            onChange={(e) => setAddAutoprefixes(e.target.checked)}
                            size="small"
                          />
                        }
                        label="Autoprefixer"
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Paper>

              {/* Input CSS */}
              <Paper sx={{ p: 3, mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6">
                    Input CSS
                  </Typography>
                  <Box>
                    <input
                      accept=".css,.scss,.less"
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
                  </Box>
                </Box>
                <LineNumberedEditor
                  value={inputCss}
                  onValueChange={setInputCss}
                  placeholder="/* Paste your CSS here... */"
                />
              </Paper>

              {/* Output CSS */}
              <Paper sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6">
                    {formatMode === 'minify' ? 'Minified' : 'Formatted'} Output
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    {outputCss && (
                      <>
                        <IconButton onClick={() => copyToClipboard(outputCss)}>
                          <ContentCopyIcon />
                        </IconButton>
                        <IconButton onClick={downloadCss}>
                          <DownloadIcon />
                        </IconButton>
                      </>
                    )}
                  </Box>
                </Box>
                <LineNumberedEditor
                  value={outputCss || 'Processed CSS will appear here...'}
                  readOnly
                />
                
                {cssStats && cssStats.compressionRatio > 0 && (
                  <Alert severity="success" sx={{ mt: 2 }}>
                    <Typography variant="subtitle2">Processing Results:</Typography>
                    <Typography variant="body2">
                      Size reduced by {cssStats.compressionRatio}% 
                      ({(cssStats.size / 1024).toFixed(1)}KB → {(cssStats.outputSize / 1024).toFixed(1)}KB)
                    </Typography>
                  </Alert>
                )}
              </Paper>
            </>
          )}

          {currentTab === 1 && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                CSS Validation
              </Typography>
              <CssValidator css={inputCss} />
            </Paper>
          )}

          {currentTab === 2 && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                CSS Analysis
              </Typography>
              <CssPropertyAnalyzer css={inputCss} />
            </Paper>
          )}

          {currentTab === 3 && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                CSS Examples
              </Typography>
              <List>
                {cssExamples.map((example, index) => (
                  <ListItem key={index} disablePadding>
                    <ListItemButton 
                      onClick={() => {
                        setInputCss(example.css);
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
                            {example.css.split('\n')[0]}
                          </Typography>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Paper>
          )}
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          {/* CSS Statistics */}
          {cssStats && (
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <InfoIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                  CSS Statistics
                </Typography>
                <TableContainer>
                  <Table size="small">
                    <TableBody>
                      <TableRow>
                        <TableCell>Lines</TableCell>
                        <TableCell align="right">{cssStats.lines.toLocaleString()}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Selectors</TableCell>
                        <TableCell align="right">{cssStats.selectors}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Properties</TableCell>
                        <TableCell align="right">{cssStats.properties}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Media Queries</TableCell>
                        <TableCell align="right">{cssStats.mediaQueries}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Comments</TableCell>
                        <TableCell align="right">{cssStats.comments}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>File Size</strong></TableCell>
                        <TableCell align="right"><strong>{(cssStats.size / 1024).toFixed(1)} KB</strong></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          )}

          {/* Features Info */}
          <Alert severity="info" sx={{ mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom>Features:</Typography>
            <Typography variant="body2" paragraph>
              • CSS beautification and minification
            </Typography>
            <Typography variant="body2" paragraph>
              • Autoprefixer for vendor prefixes
            </Typography>
            <Typography variant="body2" paragraph>
              • Property sorting and validation
            </Typography>
            <Typography variant="body2">
              • SCSS and LESS syntax highlighting
            </Typography>
          </Alert>

          {/* CSS Tips */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                CSS Best Practices
              </Typography>
              <Typography variant="body2" paragraph>
                • Use consistent indentation (2 or 4 spaces)
              </Typography>
              <Typography variant="body2" paragraph>
                • Group related properties together
              </Typography>
              <Typography variant="body2" paragraph>
                • Use meaningful class and ID names
              </Typography>
              <Typography variant="body2" paragraph>
                • Minimize use of !important
              </Typography>
              <Typography variant="body2" paragraph>
                • Consider using CSS custom properties
              </Typography>
              <Typography variant="body2">
                • Use autoprefixer instead of manual prefixes
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
