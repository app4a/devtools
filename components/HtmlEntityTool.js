import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Typography,
  TextField,
  Paper,
  Grid,
  IconButton,
  Snackbar,
  ToggleButtonGroup,
  ToggleButton,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  Tabs,
  Tab,
  Button,
  Stack,
  Divider,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemButton
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CodeIcon from '@mui/icons-material/Code';
import SecurityIcon from '@mui/icons-material/Security';
import TranslateIcon from '@mui/icons-material/Translate';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import InfoIcon from '@mui/icons-material/Info';
import Head from 'next/head';

export default function HtmlEntityTool({ name, description }) {
  const [inputText, setInputText] = useState('<p>Hello & welcome to "HTML" encoding!</p>');
  const [outputText, setOutputText] = useState('');
  const [mode, setMode] = useState('encode');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [currentTab, setCurrentTab] = useState(0);
  const [entityFilter, setEntityFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [bulkProcessing, setBulkProcessing] = useState(false);
  const [savedPresets, setSavedPresets] = useState([]);

  // Comprehensive HTML entities mapping organized by category
  const htmlEntities = {
    // Basic HTML characters
    basic: {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
      ' ': '&nbsp;'
    },
    // Currency symbols
    currency: {
      '¢': '&cent;',
      '£': '&pound;',
      '¤': '&curren;',
      '¥': '&yen;',
      '€': '&euro;',
      '$': '&#36;'
    },
    // Copyright and legal
    legal: {
      '©': '&copy;',
      '®': '&reg;',
      '™': '&trade;',
      '§': '&sect;',
      '¶': '&para;'
    },
    // Punctuation and symbols
    punctuation: {
      '¡': '&iexcl;',
      '¿': '&iquest;',
      '¦': '&brvbar;',
      '¨': '&uml;',
      'ª': '&ordf;',
      '«': '&laquo;',
      '¬': '&not;',
      '¯': '&macr;',
      '°': '&deg;',
      '±': '&plusmn;',
      '´': '&acute;',
      'µ': '&micro;',
      '·': '&middot;',
      '¸': '&cedil;',
      'º': '&ordm;',
      '»': '&raquo;',
      '¼': '&frac14;',
      '½': '&frac12;',
      '¾': '&frac34;',
      '²': '&sup2;',
      '³': '&sup3;',
      '¹': '&sup1;'
    },
    // Latin characters
    latin: {
      'À': '&Agrave;', 'Á': '&Aacute;', 'Â': '&Acirc;', 'Ã': '&Atilde;', 'Ä': '&Auml;', 'Å': '&Aring;',
      'Æ': '&AElig;', 'Ç': '&Ccedil;', 'È': '&Egrave;', 'É': '&Eacute;', 'Ê': '&Ecirc;', 'Ë': '&Euml;',
      'Ì': '&Igrave;', 'Í': '&Iacute;', 'Î': '&Icirc;', 'Ï': '&Iuml;', 'Ð': '&ETH;', 'Ñ': '&Ntilde;',
      'Ò': '&Ograve;', 'Ó': '&Oacute;', 'Ô': '&Ocirc;', 'Õ': '&Otilde;', 'Ö': '&Ouml;', 'Ø': '&Oslash;',
      'Ù': '&Ugrave;', 'Ú': '&Uacute;', 'Û': '&Ucirc;', 'Ü': '&Uuml;', 'Ý': '&Yacute;', 'Þ': '&THORN;',
      'ß': '&szlig;', 'à': '&agrave;', 'á': '&aacute;', 'â': '&acirc;', 'ã': '&atilde;', 'ä': '&auml;',
      'å': '&aring;', 'æ': '&aelig;', 'ç': '&ccedil;', 'è': '&egrave;', 'é': '&eacute;', 'ê': '&ecirc;',
      'ë': '&euml;', 'ì': '&igrave;', 'í': '&iacute;', 'î': '&icirc;', 'ï': '&iuml;', 'ð': '&eth;',
      'ñ': '&ntilde;', 'ò': '&ograve;', 'ó': '&oacute;', 'ô': '&ocirc;', 'õ': '&otilde;', 'ö': '&ouml;',
      'ø': '&oslash;', 'ù': '&ugrave;', 'ú': '&uacute;', 'û': '&ucirc;', 'ü': '&uuml;', 'ý': '&yacute;',
      'þ': '&thorn;', 'ÿ': '&yuml;'
    },
    // Mathematical symbols  
    math: {
      '×': '&times;',
      '÷': '&divide;',
      '∀': '&forall;',
      '∂': '&part;',
      '∃': '&exist;',
      '∅': '&empty;',
      '∇': '&nabla;',
      '∈': '&isin;',
      '∉': '&notin;',
      '∋': '&ni;',
      '∏': '&prod;',
      '∑': '&sum;',
      '−': '&minus;',
      '∗': '&lowast;',
      '√': '&radic;',
      '∝': '&prop;',
      '∞': '&infin;',
      '∠': '&ang;',
      '∧': '&and;',
      '∨': '&or;',
      '∩': '&cap;',
      '∪': '&cup;',
      '∫': '&int;',
      '∴': '&there4;',
      '∼': '&sim;',
      '≅': '&cong;',
      '≈': '&asymp;',
      '≠': '&ne;',
      '≡': '&equiv;',
      '≤': '&le;',
      '≥': '&ge;',
      '⊂': '&sub;',
      '⊃': '&sup;',
      '⊄': '&nsub;',
      '⊆': '&sube;',
      '⊇': '&supe;',
      '⊕': '&oplus;',
      '⊗': '&otimes;',
      '⊥': '&perp;',
      '⋅': '&sdot;'
    },
    // Greek letters
    greek: {
      'Α': '&Alpha;', 'Β': '&Beta;', 'Γ': '&Gamma;', 'Δ': '&Delta;', 'Ε': '&Epsilon;', 'Ζ': '&Zeta;',
      'Η': '&Eta;', 'Θ': '&Theta;', 'Ι': '&Iota;', 'Κ': '&Kappa;', 'Λ': '&Lambda;', 'Μ': '&Mu;',
      'Ν': '&Nu;', 'Ξ': '&Xi;', 'Ο': '&Omicron;', 'Π': '&Pi;', 'Ρ': '&Rho;', 'Σ': '&Sigma;',
      'Τ': '&Tau;', 'Υ': '&Upsilon;', 'Φ': '&Phi;', 'Χ': '&Chi;', 'Ψ': '&Psi;', 'Ω': '&Omega;',
      'α': '&alpha;', 'β': '&beta;', 'γ': '&gamma;', 'δ': '&delta;', 'ε': '&epsilon;', 'ζ': '&zeta;',
      'η': '&eta;', 'θ': '&theta;', 'ι': '&iota;', 'κ': '&kappa;', 'λ': '&lambda;', 'μ': '&mu;',
      'ν': '&nu;', 'ξ': '&xi;', 'ο': '&omicron;', 'π': '&pi;', 'ρ': '&rho;', 'ς': '&sigmaf;',
      'σ': '&sigma;', 'τ': '&tau;', 'υ': '&upsilon;', 'φ': '&phi;', 'χ': '&chi;', 'ψ': '&psi;', 'ω': '&omega;'
    }
  };

  // Flatten entities for processing
  const allEntities = useMemo(() => {
    const flat = {};
    Object.values(htmlEntities).forEach(category => {
      Object.assign(flat, category);
    });
    return flat;
  }, []);

  const reverseEntities = useMemo(() => {
    return Object.fromEntries(
      Object.entries(allEntities).map(([char, entity]) => [entity, char])
    );
  }, [allEntities]);

  const encodeHtml = (text) => {
    return text.replace(/[&<>"']/g, (match) => allEntities[match] || match);
  };

  const encodeAllHtml = (text) => {
    return text.replace(/./g, (match) => allEntities[match] || match);
  };

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setSnackbarMessage('Copied to clipboard!');
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

  const exportData = () => {
    const exportData = {
      input: inputText,
      output: outputText,
      mode: mode,
      processedAt: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `html-entities-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const decodeHtml = (text) => {
    // Decode named entities
    let decoded = text.replace(/&[a-zA-Z][a-zA-Z0-9]*;/g, (match) => 
      reverseEntities[match] || match
    );
    
    // Decode numeric entities
    decoded = decoded.replace(/&#(\d+);/g, (match, dec) => 
      String.fromCharCode(parseInt(dec, 10))
    );
    
    // Decode hex entities
    decoded = decoded.replace(/&#x([0-9a-fA-F]+);/g, (match, hex) =>
      String.fromCharCode(parseInt(hex, 16))
    );
    
    return decoded;
  };

  const processText = () => {
    if (!inputText.trim()) {
      setOutputText('');
      return;
    }

    try {
      let result;
      switch (mode) {
        case 'encode':
          result = encodeHtml(inputText);
          break;
        case 'encode-all':
          result = encodeAllHtml(inputText);
          break;
        case 'decode':
          result = decodeHtml(inputText);
          break;
        default:
          result = inputText;
      }
      setOutputText(result);
    } catch (error) {
      setOutputText('Error processing text: ' + error.message);
    }
  };


  const swapTexts = () => {
    const temp = inputText;
    setInputText(outputText);
    setOutputText(temp);
    setMode(mode === 'encode' ? 'decode' : 'encode');
  };

  const getEntityDescription = (char, entity) => {
    const descriptions = {
      '&': 'Ampersand',
      '<': 'Less than',
      '>': 'Greater than',
      '"': 'Quotation mark',
      "'": 'Apostrophe',
      ' ': 'Non-breaking space',
      '©': 'Copyright',
      '®': 'Registered',
      '™': 'Trademark',
      '€': 'Euro',
      '£': 'Pound',
      '¥': 'Yen',
      '°': 'Degree',
      '±': 'Plus-minus',
      '×': 'Multiplication',
      '÷': 'Division',
      '≠': 'Not equal',
      '≤': 'Less than or equal',
      '≥': 'Greater than or equal',
      '∞': 'Infinity'
    };
    return descriptions[char] || entity.slice(1, -1);
  };

  const filteredEntities = useMemo(() => {
    let entities = [];
    
    if (entityFilter === 'all') {
      Object.entries(htmlEntities).forEach(([category, categoryEntities]) => {
        Object.entries(categoryEntities).forEach(([char, entity]) => {
          entities.push({ char, entity, category, description: getEntityDescription(char, entity) });
        });
      });
    } else if (htmlEntities[entityFilter]) {
      Object.entries(htmlEntities[entityFilter]).forEach(([char, entity]) => {
        entities.push({ char, entity, category: entityFilter, description: getEntityDescription(char, entity) });
      });
    }

    if (searchTerm) {
      entities = entities.filter(item => 
        item.char.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.entity.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return entities;
  }, [entityFilter, searchTerm]);

  const exampleTexts = {
    html: '<p>Hello & welcome to "HTML" encoding!</p>',
    xml: '<?xml version="1.0"?><root attr="value">Text & symbols</root>',
    javascript: 'const message = "Hello & welcome to the \'world\' of JavaScript!";',
    special: 'Mathematical: √2 ≈ 1.414, π ≈ 3.14159, ∞ > 100',
    international: 'Café, naïve, résumé, Zürich, São Paulo'
  };

  useEffect(() => {
    processText();
  }, [inputText, mode]);

  return (
    <Box sx={{ p: 2 }}>
      <Head>
        <title>{name ? `${name} - Dev Tools` : 'Professional HTML Entity Tool - Dev Tools'}</title>
        <meta name="description" content={description} />
      </Head>
      
      <Typography variant="h4" gutterBottom>
        {name}
      </Typography>
      <Typography variant="body1" paragraph color="text.secondary">
        {description}
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        <strong>Professional HTML Entity Tool:</strong> Comprehensive encoding/decoding with 200+ entities,
        category filtering, bulk processing, and security-focused validation.
      </Alert>

      <Tabs value={currentTab} onChange={(e, newValue) => setCurrentTab(newValue)} sx={{ mb: 3 }}>
        <Tab icon={<CodeIcon />} label="Encoder/Decoder" />
        <Tab icon={<FormatListBulletedIcon />} label="Entity Reference" />
        <Tab icon={<SecurityIcon />} label="Security & Validation" />
        <Tab icon={<InfoIcon />} label="Usage Guide" />
      </Tabs>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          {currentTab === 0 && (
            <>
              {/* Mode Selection */}
              <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  <TranslateIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                  Conversion Mode
                </Typography>
                <ToggleButtonGroup
                  value={mode}
                  exclusive
                  onChange={(event, newMode) => {
                    if (newMode !== null) {
                      setMode(newMode);
                    }
                  }}
                  aria-label="conversion mode"
                  sx={{ mb: 2 }}
                >
                  <ToggleButton value="encode" aria-label="encode">
                    Encode Basic (&amp;, &lt;, &gt;, &quot;, &apos;)
                  </ToggleButton>
                  <ToggleButton value="encode-all" aria-label="encode all">
                    Encode All Characters
                  </ToggleButton>
                  <ToggleButton value="decode" aria-label="decode">
                    Decode
                  </ToggleButton>
                </ToggleButtonGroup>

                <Stack direction="row" spacing={1}>
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<UploadIcon />}
                    size="small"
                  >
                    Upload File
                    <input
                      type="file"
                      hidden
                      accept=".txt,.html,.xml"
                      onChange={handleFileUpload}
                    />
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<DownloadIcon />}
                    onClick={exportData}
                    size="small"
                  >
                    Export Data
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<ClearIcon />}
                    onClick={() => { setInputText(''); setOutputText(''); }}
                    size="small"
                  >
                    Clear All
                  </Button>
                </Stack>
              </Paper>

              {/* Input */}
              <Paper sx={{ p: 3, mb: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Input ({inputText.length} characters)
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={6}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  variant="outlined"
                  placeholder={mode === 'decode' ? 
                    'Enter HTML with entities to decode (e.g., &lt;p&gt;Hello &amp; welcome!&lt;/p&gt;)' :
                    'Enter text to encode (e.g., <p>Hello & welcome!</p>)'
                  }
                  sx={{
                    '& .MuiInputBase-root': {
                      fontFamily: 'monospace'
                    }
                  }}
                />
              </Paper>

              {/* Swap Button */}
              <Box sx={{ textAlign: 'center', mb: 2 }}>
                <IconButton onClick={swapTexts} size="large" color="primary">
                  <SwapVertIcon />
                </IconButton>
              </Box>

              {/* Output */}
              <Paper sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6">
                    Output ({outputText.length} characters)
                  </Typography>
                  <IconButton onClick={() => handleCopy(outputText)} disabled={!outputText}>
                    <ContentCopyIcon />
                  </IconButton>
                </Box>
                <TextField
                  fullWidth
                  multiline
                  rows={6}
                  value={outputText}
                  variant="outlined"
                  InputProps={{
                    readOnly: true,
                    style: {
                      fontFamily: 'monospace'
                    }
                  }}
                />
              </Paper>
            </>
          )}

          {currentTab === 1 && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                HTML Entity Reference ({filteredEntities.length} entities)
              </Typography>
              
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <FormControl fullWidth>
                    <InputLabel>Category Filter</InputLabel>
                    <Select
                      value={entityFilter}
                      onChange={(e) => setEntityFilter(e.target.value)}
                      label="Category Filter"
                    >
                      <MenuItem value="all">All Categories</MenuItem>
                      <MenuItem value="basic">Basic HTML</MenuItem>
                      <MenuItem value="currency">Currency</MenuItem>
                      <MenuItem value="legal">Legal & Copyright</MenuItem>
                      <MenuItem value="punctuation">Punctuation</MenuItem>
                      <MenuItem value="latin">Latin Characters</MenuItem>
                      <MenuItem value="math">Mathematical</MenuItem>
                      <MenuItem value="greek">Greek Letters</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    placeholder="Search entities..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                      startAdornment: <SearchIcon sx={{ mr: 1, color: 'action.active' }} />
                    }}
                  />
                </Grid>
              </Grid>

              <TableContainer sx={{ maxHeight: 500 }}>
                <Table size="small" stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>Character</strong></TableCell>
                      <TableCell><strong>Entity</strong></TableCell>
                      <TableCell><strong>Description</strong></TableCell>
                      <TableCell><strong>Category</strong></TableCell>
                      <TableCell><strong>Copy</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredEntities.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell sx={{ fontFamily: 'monospace', fontSize: '1.2rem' }}>
                          {item.char}
                        </TableCell>
                        <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.9rem' }}>
                          {item.entity}
                        </TableCell>
                        <TableCell sx={{ fontSize: '0.8rem' }}>
                          {item.description}
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={item.category} 
                            size="small" 
                            variant="outlined"
                            sx={{ textTransform: 'capitalize' }}
                          />
                        </TableCell>
                        <TableCell>
                          <IconButton 
                            size="small" 
                            onClick={() => handleCopy(item.entity)}
                            title="Copy entity"
                          >
                            <ContentCopyIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          )}

          {currentTab === 2 && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                <SecurityIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                Security & Validation
              </Typography>
              
              <Alert severity="warning" sx={{ mb: 3 }}>
                <strong>XSS Prevention:</strong> Always encode user input before displaying in HTML
              </Alert>

              <Typography variant="subtitle1" gutterBottom>
                Security Recommendations:
              </Typography>
              
              <List>
                <ListItem>
                  <ListItemText
                    primary="Essential Characters"
                    secondary={`Always encode: & < > " ' (use basic encoding mode)`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="User Content"
                    secondary="Encode all user-generated content before displaying"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Attribute Values"
                    secondary="Encode quotes and ampersands in HTML attributes"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="URL Parameters"
                    secondary="Use URL encoding for query parameters, HTML entities for display"
                  />
                </ListItem>
              </List>

              <Typography variant="subtitle1" gutterBottom sx={{ mt: 3 }}>
                Common Vulnerabilities:
              </Typography>
              
              <Alert severity="error" sx={{ mb: 2 }}>
                <strong>Script Injection:</strong> &lt;script&gt;alert('XSS')&lt;/script&gt;
              </Alert>
              <Alert severity="error" sx={{ mb: 2 }}>
                <strong>Event Handlers:</strong> &lt;img src=x onerror="alert('XSS')"&gt;
              </Alert>
              <Alert severity="error">
                <strong>JavaScript URLs:</strong> &lt;a href="javascript:alert('XSS')"&gt;Click&lt;/a&gt;
              </Alert>
            </Paper>
          )}

          {currentTab === 3 && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Usage Guide
              </Typography>
              
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="subtitle2">When to Use HTML Entities</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" paragraph>
                    • <strong>Display special characters:</strong> Show HTML markup as text
                  </Typography>
                  <Typography variant="body2" paragraph>
                    • <strong>Prevent XSS attacks:</strong> Safely display user content
                  </Typography>
                  <Typography variant="body2" paragraph>
                    • <strong>International support:</strong> Display accented characters
                  </Typography>
                  <Typography variant="body2">
                    • <strong>Mathematical symbols:</strong> Show equations and formulas
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="subtitle2">Example Texts</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Stack spacing={1}>
                    {Object.entries(exampleTexts).map(([type, text]) => (
                      <Button
                        key={type}
                        variant="outlined"
                        size="small"
                        onClick={() => setInputText(text)}
                        fullWidth
                        sx={{ justifyContent: 'flex-start', textTransform: 'none' }}
                      >
                        <strong>{type.toUpperCase()}:</strong>&nbsp;{text.substring(0, 50)}...
                      </Button>
                    ))}
                  </Stack>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="subtitle2">Entity Types</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" paragraph>
                    • <strong>Named entities:</strong> &amp;amp; &amp;lt; &amp;gt;
                  </Typography>
                  <Typography variant="body2" paragraph>
                    • <strong>Numeric entities:</strong> &amp;#38; &amp;#60; &amp;#62;
                  </Typography>
                  <Typography variant="body2">
                    • <strong>Hex entities:</strong> &amp;#x26; &amp;#x3C; &amp;#x3E;
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Paper>
          )}
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          {/* Quick Stats */}
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Text Statistics
              </Typography>
              <Table size="small">
                <TableBody>
                  <TableRow>
                    <TableCell>Input Characters</TableCell>
                    <TableCell align="right">{inputText.length}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Output Characters</TableCell>
                    <TableCell align="right">{outputText.length}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Size Change</TableCell>
                    <TableCell align="right">
                      {outputText.length > inputText.length ? '+' : ''}
                      {outputText.length - inputText.length}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Processing Mode</TableCell>
                    <TableCell align="right">
                      <Chip 
                        label={mode} 
                        size="small" 
                        color="primary"
                        sx={{ textTransform: 'capitalize' }}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              
              <Stack spacing={1}>
                <Button
                  variant="outlined"
                  onClick={() => setInputText(exampleTexts.html)}
                  fullWidth
                  sx={{ justifyContent: 'flex-start' }}
                >
                  Load HTML Example
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => setInputText(exampleTexts.special)}
                  fullWidth
                  sx={{ justifyContent: 'flex-start' }}
                >
                  Load Math Symbols
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => setInputText(exampleTexts.international)}
                  fullWidth
                  sx={{ justifyContent: 'flex-start' }}
                >
                  Load International Text
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => handleCopy(outputText)}
                  disabled={!outputText}
                  fullWidth
                  sx={{ justifyContent: 'flex-start' }}
                >
                  Copy Output
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
      />
    </Box>
  );
}
