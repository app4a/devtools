import React, { useState, useEffect } from 'react';
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
  Alert
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import Head from 'next/head';

export default function HtmlEntityTool({ name, description }) {
  const [inputText, setInputText] = useState('<p>Hello & welcome to "HTML" encoding!</p>');
  const [outputText, setOutputText] = useState('');
  const [mode, setMode] = useState('encode');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // HTML entities mapping
  const htmlEntities = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '¡': '&iexcl;',
    '¢': '&cent;',
    '£': '&pound;',
    '¤': '&curren;',
    '¥': '&yen;',
    '¦': '&brvbar;',
    '§': '&sect;',
    '¨': '&uml;',
    '©': '&copy;',
    'ª': '&ordf;',
    '«': '&laquo;',
    '¬': '&not;',
    '®': '&reg;',
    '¯': '&macr;',
    '°': '&deg;',
    '±': '&plusmn;',
    '²': '&sup2;',
    '³': '&sup3;',
    '´': '&acute;',
    'µ': '&micro;',
    '¶': '&para;',
    '·': '&middot;',
    '¸': '&cedil;',
    '¹': '&sup1;',
    'º': '&ordm;',
    '»': '&raquo;',
    '¼': '&frac14;',
    '½': '&frac12;',
    '¾': '&frac34;',
    '¿': '&iquest;',
    'À': '&Agrave;',
    'Á': '&Aacute;',
    'Â': '&Acirc;',
    'Ã': '&Atilde;',
    'Ä': '&Auml;',
    'Å': '&Aring;',
    'Æ': '&AElig;',
    'Ç': '&Ccedil;',
    'È': '&Egrave;',
    'É': '&Eacute;',
    'Ê': '&Ecirc;',
    'Ë': '&Euml;',
    'Ì': '&Igrave;',
    'Í': '&Iacute;',
    'Î': '&Icirc;',
    'Ï': '&Iuml;',
    'Ð': '&ETH;',
    'Ñ': '&Ntilde;',
    'Ò': '&Ograve;',
    'Ó': '&Oacute;',
    'Ô': '&Ocirc;',
    'Õ': '&Otilde;',
    'Ö': '&Ouml;',
    '×': '&times;',
    'Ø': '&Oslash;',
    'Ù': '&Ugrave;',
    'Ú': '&Uacute;',
    'Û': '&Ucirc;',
    'Ü': '&Uuml;',
    'Ý': '&Yacute;',
    'Þ': '&THORN;',
    'ß': '&szlig;',
    'à': '&agrave;',
    'á': '&aacute;',
    'â': '&acirc;',
    'ã': '&atilde;',
    'ä': '&auml;',
    'å': '&aring;',
    'æ': '&aelig;',
    'ç': '&ccedil;',
    'è': '&egrave;',
    'é': '&eacute;',
    'ê': '&ecirc;',
    'ë': '&euml;',
    'ì': '&igrave;',
    'í': '&iacute;',
    'î': '&icirc;',
    'ï': '&iuml;',
    'ð': '&eth;',
    'ñ': '&ntilde;',
    'ò': '&ograve;',
    'ó': '&oacute;',
    'ô': '&ocirc;',
    'õ': '&otilde;',
    'ö': '&ouml;',
    '÷': '&divide;',
    'ø': '&oslash;',
    'ù': '&ugrave;',
    'ú': '&uacute;',
    'û': '&ucirc;',
    'ü': '&uuml;',
    'ý': '&yacute;',
    'þ': '&thorn;',
    'ÿ': '&yuml;',
    // Mathematical symbols
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
    '⋅': '&sdot;',
    // Greek letters
    'Α': '&Alpha;',
    'Β': '&Beta;',
    'Γ': '&Gamma;',
    'Δ': '&Delta;',
    'Ε': '&Epsilon;',
    'Ζ': '&Zeta;',
    'Η': '&Eta;',
    'Θ': '&Theta;',
    'Ι': '&Iota;',
    'Κ': '&Kappa;',
    'Λ': '&Lambda;',
    'Μ': '&Mu;',
    'Ν': '&Nu;',
    'Ξ': '&Xi;',
    'Ο': '&Omicron;',
    'Π': '&Pi;',
    'Ρ': '&Rho;',
    'Σ': '&Sigma;',
    'Τ': '&Tau;',
    'Υ': '&Upsilon;',
    'Φ': '&Phi;',
    'Χ': '&Chi;',
    'Ψ': '&Psi;',
    'Ω': '&Omega;',
    'α': '&alpha;',
    'β': '&beta;',
    'γ': '&gamma;',
    'δ': '&delta;',
    'ε': '&epsilon;',
    'ζ': '&zeta;',
    'η': '&eta;',
    'θ': '&theta;',
    'ι': '&iota;',
    'κ': '&kappa;',
    'λ': '&lambda;',
    'μ': '&mu;',
    'ν': '&nu;',
    'ξ': '&xi;',
    'ο': '&omicron;',
    'π': '&pi;',
    'ρ': '&rho;',
    'ς': '&sigmaf;',
    'σ': '&sigma;',
    'τ': '&tau;',
    'υ': '&upsilon;',
    'φ': '&phi;',
    'χ': '&chi;',
    'ψ': '&psi;',
    'ω': '&omega;'
  };

  const reverseEntities = Object.fromEntries(
    Object.entries(htmlEntities).map(([char, entity]) => [entity, char])
  );

  const encodeHtml = (text) => {
    return text.replace(/[&<>"']/g, (match) => htmlEntities[match] || match);
  };

  const encodeAllHtml = (text) => {
    return text.replace(/./g, (match) => htmlEntities[match] || match);
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

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(outputText);
      setOpenSnackbar(true);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const swapTexts = () => {
    const temp = inputText;
    setInputText(outputText);
    setOutputText(temp);
    setMode(mode === 'encode' ? 'decode' : 'encode');
  };

  const commonEntities = [
    { char: '&', entity: '&amp;', description: 'Ampersand' },
    { char: '<', entity: '&lt;', description: 'Less than' },
    { char: '>', entity: '&gt;', description: 'Greater than' },
    { char: '"', entity: '&quot;', description: 'Quotation mark' },
    { char: "'", entity: '&#39;', description: 'Apostrophe' },
    { char: '©', entity: '&copy;', description: 'Copyright' },
    { char: '®', entity: '&reg;', description: 'Registered' },
    { char: '™', entity: '&trade;', description: 'Trademark' },
    { char: '€', entity: '&euro;', description: 'Euro' },
    { char: '£', entity: '&pound;', description: 'Pound' },
    { char: '¥', entity: '&yen;', description: 'Yen' },
    { char: '°', entity: '&deg;', description: 'Degree' },
    { char: '±', entity: '&plusmn;', description: 'Plus-minus' },
    { char: '×', entity: '&times;', description: 'Multiplication' },
    { char: '÷', entity: '&divide;', description: 'Division' },
    { char: '≠', entity: '&ne;', description: 'Not equal' },
    { char: '≤', entity: '&le;', description: 'Less than or equal' },
    { char: '≥', entity: '&ge;', description: 'Greater than or equal' },
    { char: '∞', entity: '&infin;', description: 'Infinity' },
    { char: 'α', entity: '&alpha;', description: 'Alpha' }
  ];

  useEffect(() => {
    processText();
  }, [inputText, mode]);

  return (
    <Box sx={{ p: 2 }}>
      <Head>
        <title>{name ? `${name} - Dev Tools` : 'HTML Entity Encoder/Decoder - Dev Tools'}</title>
        <meta name="description" content={description} />
      </Head>
      
      <Typography variant="h4" gutterBottom>
        {name}
      </Typography>
      <Typography variant="body1" paragraph color="text.secondary">
        {description}
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          {/* Mode Selection */}
          <Paper sx={{ p: 2, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
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
          </Paper>

          {/* Input */}
          <Paper sx={{ p: 3, mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              Input
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
                'Enter text to encode (e.g., &lt;p&gt;Hello &amp; welcome!&lt;/p&gt;)'
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
                Output
              </Typography>
              <IconButton onClick={copyToClipboard} disabled={!outputText}>
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
                  fontFamily: 'monospace',
                  backgroundColor: '#2d2d2d',
                  color: '#ffffff'
                }
              }}
            />
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          {/* Common Entities Reference */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Common HTML Entities
              </Typography>
              <TableContainer sx={{ maxHeight: 400 }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>Char</strong></TableCell>
                      <TableCell><strong>Entity</strong></TableCell>
                      <TableCell><strong>Name</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {commonEntities.map((item, index) => (
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
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>

          {/* Usage Info */}
          <Alert severity="info" sx={{ mt: 2 }}>
            <strong>When to use HTML entities:</strong>
            <br />
            • Display special characters in HTML
            <br />
            • Prevent XSS attacks in user content
            <br />
            • Include reserved HTML characters in text
            <br />
            • Support international characters
          </Alert>
        </Grid>
      </Grid>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
        message="Output copied to clipboard!"
      />
    </Box>
  );
}
