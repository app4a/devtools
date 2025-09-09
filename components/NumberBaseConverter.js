import React, { useState, useEffect } from 'react';
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
  Chip
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import Head from 'next/head';

export default function NumberBaseConverter({ name, description }) {
  const [inputValue, setInputValue] = useState('255');
  const [inputBase, setInputBase] = useState(10);
  const [outputBase, setOutputBase] = useState(16);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [error, setError] = useState('');

  const bases = [
    { value: 2, name: 'Binary', prefix: '0b', maxDigit: '1' },
    { value: 8, name: 'Octal', prefix: '0o', maxDigit: '7' },
    { value: 10, name: 'Decimal', prefix: '', maxDigit: '9' },
    { value: 16, name: 'Hexadecimal', prefix: '0x', maxDigit: 'F' }
  ];

  const convertNumber = (value, fromBase, toBase) => {
    if (!value.trim()) return '';

    try {
      // Remove any prefix
      let cleanValue = value.replace(/^(0x|0b|0o)/i, '');
      
      // Validate input characters for the base
      const validChars = getValidCharsForBase(fromBase);
      if (!isValidForBase(cleanValue, validChars)) {
        throw new Error(`Invalid characters for base ${fromBase}`);
      }

      // Convert to decimal first
      const decimalValue = parseInt(cleanValue, fromBase);
      
      if (isNaN(decimalValue)) {
        throw new Error('Invalid number format');
      }

      // Convert to target base
      let result = decimalValue.toString(toBase);
      
      if (toBase === 16) {
        result = result.toUpperCase();
      }

      return result;
    } catch (err) {
      throw new Error(err.message);
    }
  };

  const getValidCharsForBase = (base) => {
    switch (base) {
      case 2: return '01';
      case 8: return '01234567';
      case 10: return '0123456789';
      case 16: return '0123456789ABCDEFabcdef';
      default: return '';
    }
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
      return bases.map(base => ({ ...base, result: '', decimal: 0 }));
    }

    try {
      let cleanValue = inputValue.replace(/^(0x|0b|0o)/i, '');
      const decimal = parseInt(cleanValue, inputBase);
      
      if (isNaN(decimal)) {
        throw new Error('Invalid number');
      }

      return bases.map(base => ({
        ...base,
        result: base.value === 16 ? 
          decimal.toString(base.value).toUpperCase() : 
          decimal.toString(base.value),
        decimal: decimal
      }));
    } catch (err) {
      setError(err.message);
      return bases.map(base => ({ ...base, result: 'Error', decimal: 0 }));
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
    const temp = inputBase;
    setInputBase(outputBase);
    setOutputBase(temp);
    
    // Convert current input to new base
    try {
      const converted = convertNumber(inputValue, inputBase, temp);
      setInputValue(converted);
    } catch (err) {
      // Keep current value if conversion fails
    }
  };

  const handleInputChange = (value) => {
    setInputValue(value);
    setError('');
  };

  const conversions = getAllConversions();
  const currentDecimal = conversions.find(c => c.value === 10)?.decimal || 0;

  // Common number examples for quick testing
  const quickNumbers = [
    { decimal: 0, description: 'Zero' },
    { decimal: 1, description: 'One' },
    { decimal: 255, description: 'Common byte value' },
    { decimal: 256, description: '2^8' },
    { decimal: 1024, description: '2^10 (1KB)' },
    { decimal: 65535, description: '2^16 - 1' },
    { decimal: 16777215, description: '2^24 - 1 (RGB max)' }
  ];

  return (
    <Box sx={{ p: 2 }}>
      <Head>
        <title>{name ? `${name} - Dev Tools` : 'Number Base Converter - Dev Tools'}</title>
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
          {/* Input Section */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Number Conversion
            </Typography>
            
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
              helperText={error || `Valid characters: ${getValidCharsForBase(inputBase)}`}
              placeholder={`e.g., ${inputBase === 2 ? '1111' : inputBase === 8 ? '377' : inputBase === 10 ? '255' : 'FF'}`}
              InputProps={{
                style: { fontFamily: 'monospace', fontSize: '1.1rem' }
              }}
            />
          </Paper>

          {/* All Conversions Table */}
          <Paper sx={{ p: 0 }}>
            <Typography variant="h6" sx={{ p: 3, pb: 0 }}>
              All Base Conversions
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Base</strong></TableCell>
                    <TableCell><strong>Name</strong></TableCell>
                    <TableCell><strong>Prefix</strong></TableCell>
                    <TableCell><strong>Result</strong></TableCell>
                    <TableCell><strong>With Prefix</strong></TableCell>
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
                      <TableCell sx={{ fontFamily: 'monospace' }}>
                        {conversion.prefix || 'none'}
                      </TableCell>
                      <TableCell sx={{ fontFamily: 'monospace', fontSize: '1.1rem' }}>
                        {conversion.result}
                      </TableCell>
                      <TableCell sx={{ fontFamily: 'monospace', fontSize: '1rem' }}>
                        {conversion.prefix + conversion.result}
                      </TableCell>
                      <TableCell>
                        <IconButton 
                          size="small" 
                          onClick={() => copyToClipboard(conversion.result)}
                          disabled={conversion.result === 'Error' || !conversion.result}
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
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          {/* Quick Numbers */}
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Examples
              </Typography>
              {quickNumbers.map((num, index) => (
                <Box 
                  key={index}
                  sx={{ 
                    mb: 1, 
                    p: 1, 
                    border: '1px solid #444', 
                    borderRadius: 1,
                    cursor: 'pointer',
                    '&:hover': { backgroundColor: 'action.hover' }
                  }}
                  onClick={() => {
                    setInputValue(num.decimal.toString());
                    setInputBase(10);
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    {num.decimal} - {num.description}
                  </Typography>
                  <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
                    Binary: {num.decimal.toString(2)}<br />
                    Hex: {num.decimal.toString(16).toUpperCase()}
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>

          {/* Base Information */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Number Base Guide
              </Typography>
              
              <Alert severity="info" sx={{ mb: 2 }}>
                <strong>Binary (Base 2):</strong> Uses digits 0-1<br />
                Common in computer science and digital electronics
              </Alert>
              
              <Alert severity="warning" sx={{ mb: 2 }}>
                <strong>Octal (Base 8):</strong> Uses digits 0-7<br />
                Used in Unix file permissions (e.g., 755)
              </Alert>
              
              <Alert severity="success" sx={{ mb: 2 }}>
                <strong>Decimal (Base 10):</strong> Uses digits 0-9<br />
                Standard human number system
              </Alert>
              
              <Alert severity="error">
                <strong>Hexadecimal (Base 16):</strong> Uses 0-9, A-F<br />
                Common in programming for colors, memory addresses
              </Alert>

              <Typography variant="subtitle2" sx={{ mt: 2 }} gutterBottom>
                Common Use Cases:
              </Typography>
              <Typography variant="body2" paragraph>
                • <strong>Binary:</strong> Logic operations, flags
              </Typography>
              <Typography variant="body2" paragraph>
                • <strong>Octal:</strong> File permissions (chmod)
              </Typography>
              <Typography variant="body2" paragraph>
                • <strong>Hex:</strong> Colors (#FF0000), memory addresses
              </Typography>
              <Typography variant="body2">
                • <strong>Decimal:</strong> User interfaces, calculations
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
