import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Typography,
  TextField,
  Paper,
  Grid,
  IconButton,
  Snackbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  Chip,
  Tabs,
  Tab,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Stack,
  Switch,
  FormControlLabel
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import CalculateIcon from '@mui/icons-material/Calculate';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InfoIcon from '@mui/icons-material/Info';
import FunctionsIcon from '@mui/icons-material/Functions';
import DownloadIcon from '@mui/icons-material/Download';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import DeleteIcon from '@mui/icons-material/Delete';
import Head from 'next/head';

export default function NumberBaseConverter({ name, description }) {
  const [inputValue, setInputValue] = useState('255');
  const [inputBase, setInputBase] = useState(10);
  const [outputBase, setOutputBase] = useState(16);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [error, setError] = useState('');
  const [currentTab, setCurrentTab] = useState(0);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [savedNumbers, setSavedNumbers] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load saved numbers from localStorage on component mount
  useEffect(() => {
    const storedNumbers = localStorage.getItem('numberBaseConverterNumbers');
    if (storedNumbers) {
      try {
        setSavedNumbers(JSON.parse(storedNumbers));
      } catch (error) {
        console.error('Failed to parse saved numbers:', error);
      }
    }
    setIsInitialized(true);
  }, []);

  // Save numbers to localStorage whenever savedNumbers changes (but only after initialization)
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('numberBaseConverterNumbers', JSON.stringify(savedNumbers));
    }
  }, [savedNumbers, isInitialized]);

  const allBases = [
    { value: 2, name: 'Binary', prefix: '0b', digits: '01', description: 'Computer logic, digital systems' },
    { value: 3, name: 'Ternary', prefix: '0t', digits: '012', description: 'Balanced ternary, some computer architectures' },
    { value: 4, name: 'Quaternary', prefix: '0q', digits: '0123', description: 'DNA encoding, genetics' },
    { value: 5, name: 'Quinary', prefix: '0qi', digits: '01234', description: 'Hand counting (5 fingers)' },
    { value: 6, name: 'Senary', prefix: '0s', digits: '012345', description: 'Base-6 numbering' },
    { value: 7, name: 'Septenary', prefix: '0se', digits: '0123456', description: 'Week days (7 days)' },
    { value: 8, name: 'Octal', prefix: '0o', digits: '01234567', description: 'Unix permissions, legacy systems' },
    { value: 9, name: 'Nonary', prefix: '0n', digits: '012345678', description: 'Base-9 numbering' },
    { value: 10, name: 'Decimal', prefix: '', digits: '0123456789', description: 'Standard human counting' },
    { value: 11, name: 'Undecimal', prefix: '0u', digits: '0123456789A', description: 'Base-11 numbering' },
    { value: 12, name: 'Duodecimal', prefix: '0d', digits: '0123456789AB', description: 'Dozens, clock (12 hours)' },
    { value: 16, name: 'Hexadecimal', prefix: '0x', digits: '0123456789ABCDEF', description: 'Programming, colors, memory' },
    { value: 32, name: 'Base32', prefix: '0b32', digits: '0123456789ABCDEFGHIJKLMNOPQRSTUV', description: 'Data encoding, Crockford Base32' },
    { value: 36, name: 'Base36', prefix: '0b36', digits: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ', description: 'Short URLs, license plates' },
    { value: 64, name: 'Base64*', prefix: '0b64', digits: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/', description: 'Data encoding (simplified)' }
  ];

  const commonBases = allBases.filter(b => [2, 8, 10, 16].includes(b.value));
  const bases = showAdvanced ? allBases : commonBases;

  const convertNumber = (value, fromBase, toBase) => {
    if (!value.trim()) return '';

    try {
      // Remove any prefix
      let cleanValue = value.replace(/^(0x|0b|0o|0t|0q|0qi|0s|0se|0n|0u|0d|0b32|0b36|0b64)/i, '');
      
      // Validate input characters for the base
      const baseInfo = bases.find(b => b.value === fromBase);
      if (!baseInfo) throw new Error(`Unsupported base ${fromBase}`);
      
      if (!isValidForBase(cleanValue.toUpperCase(), baseInfo.digits)) {
        throw new Error(`Invalid characters for base ${fromBase}`);
      }

      // For bases > 36, use a custom converter (simplified for demo)
      let decimalValue;
      if (fromBase <= 36) {
        decimalValue = parseInt(cleanValue, fromBase);
      } else {
        // Custom conversion for base64 (simplified)
        decimalValue = customParseInt(cleanValue, fromBase, baseInfo.digits);
      }
      
      if (isNaN(decimalValue) || decimalValue < 0) {
        throw new Error('Invalid number format');
      }

      // Convert to target base
      let result;
      const targetBase = bases.find(b => b.value === toBase);
      if (toBase <= 36) {
        result = decimalValue.toString(toBase);
        if (toBase > 10) {
          result = result.toUpperCase();
        }
      } else {
        // Custom conversion for base64 (simplified)
        result = customToString(decimalValue, toBase, targetBase.digits);
      }

      return result;
    } catch (err) {
      throw new Error(err.message);
    }
  };

  const customParseInt = (value, base, digits) => {
    let result = 0;
    const len = value.length;
    for (let i = 0; i < len; i++) {
      const digit = digits.indexOf(value[i]);
      if (digit === -1) throw new Error('Invalid digit');
      result = result * base + digit;
    }
    return result;
  };

  const customToString = (value, base, digits) => {
    if (value === 0) return '0';
    let result = '';
    while (value > 0) {
      result = digits[value % base] + result;
      value = Math.floor(value / base);
    }
    return result;
  };

  const isValidForBase = (value, validChars) => {
    for (let char of value) {
      if (!validChars.includes(char)) {
        return false;
      }
    }
    return true;
  };

  const getAllConversions = () => {
    if (!inputValue.trim()) {
      return bases.map(base => ({ ...base, result: '', decimal: 0, withPrefix: '' }));
    }

    try {
      // Get base info for input
      const inputBaseInfo = bases.find(b => b.value === inputBase);
      let cleanValue = inputValue.replace(new RegExp(`^(${inputBaseInfo?.prefix})`, 'i'), '');
      
      let decimal;
      if (inputBase <= 36) {
        decimal = parseInt(cleanValue, inputBase);
      } else {
        decimal = customParseInt(cleanValue.toUpperCase(), inputBase, inputBaseInfo.digits);
      }
      
      if (isNaN(decimal) || decimal < 0) {
        throw new Error('Invalid number');
      }

      return bases.map(base => {
        let result;
        try {
          if (base.value <= 36) {
            result = decimal.toString(base.value);
            if (base.value > 10) {
              result = result.toUpperCase();
            }
          } else {
            result = customToString(decimal, base.value, base.digits);
          }
          
          return {
            ...base,
            result,
            decimal,
            withPrefix: base.prefix + result,
            bitLength: decimal ? Math.ceil(Math.log2(decimal + 1)) : 1
          };
        } catch (err) {
          return {
            ...base,
            result: 'Error',
            decimal: 0,
            withPrefix: 'Error',
            bitLength: 0
          };
        }
      });
    } catch (err) {
      setError(err.message);
      return bases.map(base => ({ 
        ...base, 
        result: 'Error', 
        decimal: 0, 
        withPrefix: 'Error',
        bitLength: 0 
      }));
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setOpenSnackbar(true);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const swapBases = () => {
    const originalInputBase = inputBase;
    const originalOutputBase = outputBase;
    
    // Convert current input to the target base before swapping
    try {
      const converted = convertNumber(inputValue, originalInputBase, originalOutputBase);
      setInputValue(converted);
    } catch (err) {
      // Keep current value if conversion fails
    }
    
    // Now swap the bases
    setInputBase(originalOutputBase);
    setOutputBase(originalInputBase);
  };

  const handleInputChange = (value) => {
    setInputValue(value);
    setError('');
  };

  const saveNumber = () => {
    const conversions = getAllConversions();
    const decimal = conversions.find(c => c.value === 10)?.decimal || 0;
    
    const newSaved = {
      id: Date.now(),
      decimal,
      inputValue,
      inputBase,
      name: `Number ${savedNumbers.length + 1}`,
      createdAt: new Date().toLocaleDateString()
    };
    
    setSavedNumbers([...savedNumbers, newSaved]);
  };

  const deleteNumber = (numberId) => {
    setSavedNumbers(savedNumbers.filter(number => number.id !== numberId));
  };

  const exportData = () => {
    const conversions = getAllConversions();
    const decimal = conversions.find(c => c.value === 10)?.decimal || 0;
    
    const exportData = {
      inputValue,
      inputBase,
      decimal,
      conversions: conversions.map(c => ({
        base: c.value,
        name: c.name,
        result: c.result,
        withPrefix: c.withPrefix
      })),
      bitAnalysis: getBitAnalysis(decimal),
      exportedAt: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `number-conversion-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getBitAnalysis = (decimal) => {
    if (!decimal || decimal === 0) return null;
    
    return {
      bitLength: Math.ceil(Math.log2(decimal + 1)),
      powerOf2: (decimal & (decimal - 1)) === 0,
      evenOdd: decimal % 2 === 0 ? 'Even' : 'Odd',
      binaryOnes: decimal.toString(2).split('1').length - 1,
      binaryZeros: decimal.toString(2).split('0').length - 1
    };
  };

  const conversions = getAllConversions();
  const currentDecimal = conversions.find(c => c.value === 10)?.decimal || 0;
  const bitAnalysis = getBitAnalysis(currentDecimal);

  // Common number examples for quick testing
  const quickNumbers = [
    { decimal: 0, description: 'Zero', category: 'basic' },
    { decimal: 1, description: 'One', category: 'basic' },
    { decimal: 7, description: 'Lucky number', category: 'basic' },
    { decimal: 42, description: 'Answer to everything', category: 'fun' },
    { decimal: 255, description: 'Common byte value (2^8 - 1)', category: 'programming' },
    { decimal: 256, description: '2^8', category: 'programming' },
    { decimal: 512, description: '2^9', category: 'programming' },
    { decimal: 1024, description: '2^10 (1KB)', category: 'programming' },
    { decimal: 2048, description: '2^11', category: 'programming' },
    { decimal: 4096, description: '2^12 (4KB page)', category: 'programming' },
    { decimal: 65535, description: '2^16 - 1 (16-bit max)', category: 'programming' },
    { decimal: 16777215, description: '2^24 - 1 (RGB max)', category: 'programming' },
    { decimal: 3735928559, description: 'DEADBEEF in hex', category: 'fun' },
    { decimal: 2147483647, description: '2^31 - 1 (32-bit signed max)', category: 'programming' }
  ];

  const arithmetic = {
    addition: (a, b, base) => {
      try {
        const result = parseInt(a, base) + parseInt(b, base);
        return result.toString(base).toUpperCase();
      } catch (err) {
        return 'Error';
      }
    },
    subtraction: (a, b, base) => {
      try {
        const result = parseInt(a, base) - parseInt(b, base);
        return result >= 0 ? result.toString(base).toUpperCase() : 'Negative';
      } catch (err) {
        return 'Error';
      }
    },
    multiplication: (a, b, base) => {
      try {
        const result = parseInt(a, base) * parseInt(b, base);
        return result.toString(base).toUpperCase();
      } catch (err) {
        return 'Error';
      }
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Head>
        <title>{name ? `${name} - Dev Tools` : 'Professional Number Base Converter - Dev Tools'}</title>
        <meta name="description" content={description} />
      </Head>
      
      <Typography variant="h4" gutterBottom>
        {name}
      </Typography>
      <Typography variant="body1" paragraph color="text.secondary">
        {description}
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        <strong>Professional Number Base Converter:</strong> Convert between 15+ number bases, 
        perform arithmetic operations, and analyze bit patterns with advanced features.
      </Alert>

      <Tabs value={currentTab} onChange={(e, newValue) => setCurrentTab(newValue)} sx={{ mb: 3 }}>
        <Tab label="Base Converter" />
        <Tab label="Bit Analysis" />
        <Tab label="Arithmetic" />
        <Tab label="Saved Numbers" />
      </Tabs>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          {currentTab === 0 && (
            <>
              {/* Input Section */}
              <Paper sx={{ p: 3, mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6">
                    <CalculateIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                    Number Conversion
                  </Typography>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={showAdvanced}
                        onChange={(e) => setShowAdvanced(e.target.checked)}
                      />
                    }
                    label="Show All Bases"
                  />
                </Box>
            
            <Grid container spacing={2} alignItems="center">
              <Grid size={{ xs: 12, sm: 4 }}>
                <FormControl fullWidth>
                  <InputLabel>From Base</InputLabel>
                  <Select
                    value={inputBase}
                    onChange={(e) => setInputBase(e.target.value)}
                    label="From Base"
                  >
                    {bases.map((base) => (
                      <MenuItem key={base.value} value={base.value}>
                        {base.name} ({base.value})
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid size={{ xs: 12, sm: 1 }} sx={{ textAlign: 'center' }}>
                <IconButton onClick={swapBases} color="primary">
                  <SwapHorizIcon />
                </IconButton>
              </Grid>
              
              <Grid size={{ xs: 12, sm: 4 }}>
                <FormControl fullWidth>
                  <InputLabel>To Base</InputLabel>
                  <Select
                    value={outputBase}
                    onChange={(e) => setOutputBase(e.target.value)}
                    label="To Base"
                  >
                    {bases.map((base) => (
                      <MenuItem key={base.value} value={base.value}>
                        {base.name} ({base.value})
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid size={{ xs: 12, sm: 3 }}>
                <Chip 
                  label={`Decimal: ${currentDecimal}`}
                  color="primary"
                  variant="outlined"
                />
              </Grid>
            </Grid>

                <TextField
                  label={`Enter number in ${bases.find(b => b.value === inputBase)?.name || 'base'} ${inputBase}`}
                  value={inputValue}
                  onChange={(e) => handleInputChange(e.target.value)}
                  fullWidth
                  sx={{ mt: 2 }}
                  error={!!error}
                  helperText={error || `Valid characters: ${bases.find(b => b.value === inputBase)?.digits || ''}`}
                  placeholder={`e.g., ${inputBase === 2 ? '1111' : inputBase === 8 ? '377' : inputBase === 10 ? '255' : 'FF'}`}
                  InputProps={{
                    style: { fontFamily: 'monospace', fontSize: '1.1rem' }
                  }}
                />
                
                <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                  <Button
                    variant="outlined"
                    startIcon={<BookmarkIcon />}
                    onClick={saveNumber}
                    disabled={!currentDecimal}
                  >
                    Save Number
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<DownloadIcon />}
                    onClick={exportData}
                    disabled={!currentDecimal}
                  >
                    Export Data
                  </Button>
                </Stack>
          </Paper>

              {/* All Conversions Table */}
              <Paper sx={{ p: 0 }}>
                <Typography variant="h6" sx={{ p: 3, pb: 0 }}>
                  All Base Conversions ({bases.length} bases)
                </Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell><strong>Base</strong></TableCell>
                        <TableCell><strong>Name</strong></TableCell>
                        <TableCell><strong>Result</strong></TableCell>
                        <TableCell><strong>With Prefix</strong></TableCell>
                        <TableCell><strong>Description</strong></TableCell>
                        <TableCell><strong>Copy</strong></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {conversions.map((conversion) => (
                        <TableRow 
                          key={conversion.value}
                          sx={{
                            backgroundColor: conversion.value === outputBase ? 'action.selected' : 'inherit',
                            '&:hover': { backgroundColor: 'action.hover' }
                          }}
                        >
                          <TableCell sx={{ fontFamily: 'monospace', fontWeight: 'bold' }}>
                            {conversion.value}
                          </TableCell>
                          <TableCell>{conversion.name}</TableCell>
                          <TableCell sx={{ fontFamily: 'monospace', fontSize: '1.1rem', maxWidth: 200, overflow: 'auto' }}>
                            {conversion.result}
                          </TableCell>
                          <TableCell sx={{ fontFamily: 'monospace', fontSize: '1rem', maxWidth: 200, overflow: 'auto' }}>
                            {conversion.withPrefix}
                          </TableCell>
                          <TableCell sx={{ fontSize: '0.85rem', color: 'text.secondary' }}>
                            {conversion.description}
                          </TableCell>
                          <TableCell>
                            <IconButton 
                              size="small" 
                              onClick={() => copyToClipboard(conversion.result)}
                              disabled={conversion.result === 'Error' || !conversion.result}
                              title={`Copy ${conversion.name}`}
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
            </>
          )}

          {currentTab === 1 && bitAnalysis && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                <InfoIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                Bit Analysis for {currentDecimal}
              </Typography>
              
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>Binary Representation</Typography>
                      <Typography sx={{ fontFamily: 'monospace', fontSize: '1.2rem', mb: 2 }}>
                        {currentDecimal.toString(2)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Length: {bitAnalysis.bitLength} bits
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                
                <Grid size={{ xs: 12, md: 6 }}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>Properties</Typography>
                      <List dense>
                        <ListItem>
                          <ListItemText 
                            primary="Power of 2" 
                            secondary={bitAnalysis.powerOf2 ? 'Yes' : 'No'} 
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText 
                            primary="Even/Odd" 
                            secondary={bitAnalysis.evenOdd} 
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText 
                            primary="Binary 1s" 
                            secondary={bitAnalysis.binaryOnes} 
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText 
                            primary="Binary 0s" 
                            secondary={bitAnalysis.binaryZeros} 
                          />
                        </ListItem>
                      </List>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
                Bit Shifting Examples
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>Operation</strong></TableCell>
                      <TableCell><strong>Result (Decimal)</strong></TableCell>
                      <TableCell><strong>Result (Binary)</strong></TableCell>
                      <TableCell><strong>Result (Hex)</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Left shift by 1 (&lt;&lt; 1)</TableCell>
                      <TableCell>{currentDecimal * 2}</TableCell>
                      <TableCell sx={{ fontFamily: 'monospace' }}>{(currentDecimal * 2).toString(2)}</TableCell>
                      <TableCell sx={{ fontFamily: 'monospace' }}>{(currentDecimal * 2).toString(16).toUpperCase()}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Right shift by 1 (&gt;&gt; 1)</TableCell>
                      <TableCell>{Math.floor(currentDecimal / 2)}</TableCell>
                      <TableCell sx={{ fontFamily: 'monospace' }}>{Math.floor(currentDecimal / 2).toString(2)}</TableCell>
                      <TableCell sx={{ fontFamily: 'monospace' }}>{Math.floor(currentDecimal / 2).toString(16).toUpperCase()}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          )}

          {currentTab === 2 && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                <FunctionsIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                Base Arithmetic Operations
              </Typography>
              
              <Alert severity="info" sx={{ mb: 3 }}>
                Perform arithmetic operations directly in different number bases
              </Alert>

              <Typography variant="subtitle1" gutterBottom>
                Examples with base {inputBase}:
              </Typography>
              
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>Operation</strong></TableCell>
                      <TableCell><strong>Example</strong></TableCell>
                      <TableCell><strong>Result (Base {inputBase})</strong></TableCell>
                      <TableCell><strong>Result (Decimal)</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Addition</TableCell>
                      <TableCell sx={{ fontFamily: 'monospace' }}>
                        {inputValue} + {inputValue}
                      </TableCell>
                      <TableCell sx={{ fontFamily: 'monospace', fontSize: '1.1rem' }}>
                        {arithmetic.addition(inputValue, inputValue, inputBase)}
                      </TableCell>
                      <TableCell>
                        {currentDecimal * 2}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Multiplication by 2</TableCell>
                      <TableCell sx={{ fontFamily: 'monospace' }}>
                        {inputValue} × 2
                      </TableCell>
                      <TableCell sx={{ fontFamily: 'monospace', fontSize: '1.1rem' }}>
                        {arithmetic.multiplication(inputValue, '2', inputBase)}
                      </TableCell>
                      <TableCell>
                        {currentDecimal * 2}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Division by 2</TableCell>
                      <TableCell sx={{ fontFamily: 'monospace' }}>
                        {inputValue} ÷ 2
                      </TableCell>
                      <TableCell sx={{ fontFamily: 'monospace', fontSize: '1.1rem' }}>
                        {Math.floor(currentDecimal / 2).toString(inputBase).toUpperCase()}
                      </TableCell>
                      <TableCell>
                        {Math.floor(currentDecimal / 2)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          )}

          {currentTab === 3 && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Saved Numbers
              </Typography>
              
              {savedNumbers.length === 0 ? (
                <Alert severity="info">
                  No saved numbers yet. Convert some numbers and save them for quick reference!
                </Alert>
              ) : (
                <List>
                  {savedNumbers.map((saved) => (
                    <ListItem key={saved.id} divider>
                      <ListItemText
                        primary={`${saved.name}: ${saved.decimal} (decimal)`}
                        secondary={`Saved: ${saved.createdAt} | Input: ${saved.inputValue} (base ${saved.inputBase})`}
                      />
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                          size="small"
                          onClick={() => {
                            setInputValue(saved.inputValue);
                            setInputBase(saved.inputBase);
                            setCurrentTab(0);
                          }}
                        >
                          Load
                        </Button>
                        <IconButton
                          size="small"
                          onClick={() => deleteNumber(saved.id)}
                          color="error"
                          title="Delete Number"
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
          {/* Quick Numbers */}
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Examples
              </Typography>
              
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="subtitle2">Programming Numbers</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {quickNumbers.filter(n => n.category === 'programming').map((num, index) => (
                    <Box 
                      key={index}
                      sx={{ 
                        mb: 1, 
                        p: 1, 
                        border: 1,
                        borderColor: 'divider', 
                        borderRadius: 1,
                        cursor: 'pointer',
                        '&:hover': { backgroundColor: 'action.hover' }
                      }}
                      onClick={() => {
                        setInputValue(num.decimal.toString());
                        setInputBase(10);
                        setCurrentTab(0);
                      }}
                    >
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        {num.decimal}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {num.description}
                      </Typography>
                    </Box>
                  ))}
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="subtitle2">Fun Numbers</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {quickNumbers.filter(n => n.category === 'fun').map((num, index) => (
                    <Box 
                      key={index}
                      sx={{ 
                        mb: 1, 
                        p: 1, 
                        border: 1,
                        borderColor: 'divider', 
                        borderRadius: 1,
                        cursor: 'pointer',
                        '&:hover': { backgroundColor: 'action.hover' }
                      }}
                      onClick={() => {
                        setInputValue(num.decimal.toString());
                        setInputBase(10);
                        setCurrentTab(0);
                      }}
                    >
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        {num.decimal}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {num.description}
                      </Typography>
                    </Box>
                  ))}
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="subtitle2">Basic Numbers</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {quickNumbers.filter(n => n.category === 'basic').map((num, index) => (
                    <Box 
                      key={index}
                      sx={{ 
                        mb: 1, 
                        p: 1, 
                        border: 1,
                        borderColor: 'divider', 
                        borderRadius: 1,
                        cursor: 'pointer',
                        '&:hover': { backgroundColor: 'action.hover' }
                      }}
                      onClick={() => {
                        setInputValue(num.decimal.toString());
                        setInputBase(10);
                        setCurrentTab(0);
                      }}
                    >
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        {num.decimal}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {num.description}
                      </Typography>
                    </Box>
                  ))}
                </AccordionDetails>
              </Accordion>
            </CardContent>
          </Card>

          {/* Number Base Guide */}
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <InfoIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                Number Base Guide
              </Typography>
              
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="subtitle2">Common Bases</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" paragraph>
                    <strong>Binary (2):</strong> 0,1 - Computer logic, digital systems
                  </Typography>
                  <Typography variant="body2" paragraph>
                    <strong>Octal (8):</strong> 0-7 - Unix permissions, legacy systems
                  </Typography>
                  <Typography variant="body2" paragraph>
                    <strong>Decimal (10):</strong> 0-9 - Human counting system
                  </Typography>
                  <Typography variant="body2">
                    <strong>Hexadecimal (16):</strong> 0-9,A-F - Programming, colors
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="subtitle2">Specialized Bases</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" paragraph>
                    <strong>Base32:</strong> Data encoding, file sharing
                  </Typography>
                  <Typography variant="body2" paragraph>
                    <strong>Base36:</strong> Short URLs, license plates
                  </Typography>
                  <Typography variant="body2">
                    <strong>Base64:</strong> Email attachments, web data
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </CardContent>
          </Card>

          {/* Quick Tips */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Tips
              </Typography>
              
              <Typography variant="body2" paragraph>
                • Toggle "Show All Bases" to see 15+ number systems
              </Typography>
              <Typography variant="body2" paragraph>
                • Use the swap button to quickly reverse conversion
              </Typography>
              <Typography variant="body2" paragraph>
                • Check bit analysis for binary insights
              </Typography>
              <Typography variant="body2" paragraph>
                • Save frequently used numbers for quick access
              </Typography>
              <Typography variant="body2">
                • Export conversions as JSON for documentation
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
        message="Number copied to clipboard!"
      />
    </Box>
  );
}
