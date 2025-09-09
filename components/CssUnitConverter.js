import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Paper,
  Grid,
  Card,
  CardContent,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert
} from '@mui/material';
import Head from 'next/head';

export default function CssUnitConverter({ name, description }) {
  const [inputValue, setInputValue] = useState('16');
  const [inputUnit, setInputUnit] = useState('px');
  const [baseFontSize, setBaseFontSize] = useState('16');
  const [viewportWidth, setViewportWidth] = useState('1920');
  const [viewportHeight, setViewportHeight] = useState('1080');

  // CSS units configuration
  const units = {
    px: { name: 'Pixels', type: 'absolute' },
    rem: { name: 'Root EM', type: 'relative' },
    em: { name: 'EM', type: 'relative' },
    '%': { name: 'Percentage', type: 'relative' },
    vw: { name: 'Viewport Width', type: 'viewport' },
    vh: { name: 'Viewport Height', type: 'viewport' },
    vmin: { name: 'Viewport Minimum', type: 'viewport' },
    vmax: { name: 'Viewport Maximum', type: 'viewport' },
    pt: { name: 'Points', type: 'absolute' },
    pc: { name: 'Picas', type: 'absolute' },
    in: { name: 'Inches', type: 'absolute' },
    cm: { name: 'Centimeters', type: 'absolute' },
    mm: { name: 'Millimeters', type: 'absolute' }
  };

  const convertToPx = (value, unit) => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return 0;

    switch (unit) {
      case 'px':
        return numValue;
      case 'rem':
        return numValue * parseFloat(baseFontSize);
      case 'em':
        return numValue * parseFloat(baseFontSize); // Simplified - assumes parent font size = root
      case '%':
        return (numValue / 100) * parseFloat(baseFontSize); // For font-size context
      case 'vw':
        return (numValue / 100) * parseFloat(viewportWidth);
      case 'vh':
        return (numValue / 100) * parseFloat(viewportHeight);
      case 'vmin':
        return (numValue / 100) * Math.min(parseFloat(viewportWidth), parseFloat(viewportHeight));
      case 'vmax':
        return (numValue / 100) * Math.max(parseFloat(viewportWidth), parseFloat(viewportHeight));
      case 'pt':
        return numValue * (96 / 72); // 1pt = 1/72 inch, 96px = 1 inch
      case 'pc':
        return numValue * 16; // 1pc = 12pt = 16px
      case 'in':
        return numValue * 96; // 96px = 1 inch
      case 'cm':
        return numValue * (96 / 2.54); // 1 inch = 2.54 cm
      case 'mm':
        return numValue * (96 / 25.4); // 1 inch = 25.4 mm
      default:
        return 0;
    }
  };

  const convertFromPx = (pxValue, targetUnit) => {
    if (pxValue === 0) return 0;

    switch (targetUnit) {
      case 'px':
        return pxValue;
      case 'rem':
        return pxValue / parseFloat(baseFontSize);
      case 'em':
        return pxValue / parseFloat(baseFontSize);
      case '%':
        return (pxValue / parseFloat(baseFontSize)) * 100;
      case 'vw':
        return (pxValue / parseFloat(viewportWidth)) * 100;
      case 'vh':
        return (pxValue / parseFloat(viewportHeight)) * 100;
      case 'vmin':
        return (pxValue / Math.min(parseFloat(viewportWidth), parseFloat(viewportHeight))) * 100;
      case 'vmax':
        return (pxValue / Math.max(parseFloat(viewportWidth), parseFloat(viewportHeight))) * 100;
      case 'pt':
        return pxValue * (72 / 96);
      case 'pc':
        return pxValue / 16;
      case 'in':
        return pxValue / 96;
      case 'cm':
        return pxValue * (2.54 / 96);
      case 'mm':
        return pxValue * (25.4 / 96);
      default:
        return 0;
    }
  };

  const pxValue = convertToPx(inputValue, inputUnit);

  const conversions = Object.keys(units).map(unit => ({
    unit,
    name: units[unit].name,
    type: units[unit].type,
    value: convertFromPx(pxValue, unit),
    isInput: unit === inputUnit
  }));

  const formatValue = (value) => {
    if (value === 0) return '0';
    if (Math.abs(value) >= 1000) return value.toFixed(2);
    if (Math.abs(value) >= 100) return value.toFixed(3);
    if (Math.abs(value) >= 10) return value.toFixed(4);
    return value.toFixed(6);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Head>
        <title>{name ? `${name} - Dev Tools` : 'CSS Unit Converter - Dev Tools'}</title>
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
              Convert CSS Units
            </Typography>
            
            <Grid container spacing={2} alignItems="center">
              <Grid size={6}>
                <TextField
                  label="Value"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  fullWidth
                  type="number"
                  inputProps={{ step: 'any' }}
                />
              </Grid>
              <Grid size={6}>
                <FormControl fullWidth>
                  <InputLabel>From Unit</InputLabel>
                  <Select
                    value={inputUnit}
                    onChange={(e) => setInputUnit(e.target.value)}
                    label="From Unit"
                  >
                    {Object.entries(units).map(([unit, info]) => (
                      <MenuItem key={unit} value={unit}>
                        {unit} - {info.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Paper>

          {/* Results Table */}
          <Paper sx={{ p: 0 }}>
            <Typography variant="h6" sx={{ p: 3, pb: 0 }}>
              Conversion Results
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Unit</strong></TableCell>
                    <TableCell><strong>Name</strong></TableCell>
                    <TableCell><strong>Value</strong></TableCell>
                    <TableCell><strong>Type</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {conversions.map((conversion) => (
                    <TableRow 
                      key={conversion.unit}
                      sx={{
                        backgroundColor: conversion.isInput ? 'action.selected' : 'inherit',
                        '&:hover': { backgroundColor: 'action.hover' }
                      }}
                    >
                      <TableCell sx={{ fontFamily: 'monospace', fontWeight: 'bold' }}>
                        {conversion.unit}
                      </TableCell>
                      <TableCell>{conversion.name}</TableCell>
                      <TableCell sx={{ fontFamily: 'monospace', fontSize: '1.1rem' }}>
                        {formatValue(conversion.value)}{conversion.unit}
                      </TableCell>
                      <TableCell>
                        <Typography 
                          variant="caption"
                          sx={{
                            backgroundColor: 
                              conversion.type === 'absolute' ? 'info.main' :
                              conversion.type === 'relative' ? 'warning.main' : 'success.main',
                            color: 'white',
                            px: 1,
                            py: 0.5,
                            borderRadius: 1,
                            textTransform: 'capitalize'
                          }}
                        >
                          {conversion.type}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          {/* Settings */}
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Context Settings
              </Typography>
              
              <TextField
                label="Base Font Size (px)"
                value={baseFontSize}
                onChange={(e) => setBaseFontSize(e.target.value)}
                fullWidth
                type="number"
                sx={{ mb: 2 }}
                helperText="Used for rem, em, and % calculations"
              />
              
              <TextField
                label="Viewport Width (px)"
                value={viewportWidth}
                onChange={(e) => setViewportWidth(e.target.value)}
                fullWidth
                type="number"
                sx={{ mb: 2 }}
                helperText="Used for vw, vmin, vmax calculations"
              />
              
              <TextField
                label="Viewport Height (px)"
                value={viewportHeight}
                onChange={(e) => setViewportHeight(e.target.value)}
                fullWidth
                type="number"
                helperText="Used for vh, vmin, vmax calculations"
              />
            </CardContent>
          </Card>

          {/* Quick Reference */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Unit Types
              </Typography>
              
              <Alert severity="info" sx={{ mb: 1 }}>
                <strong>Absolute:</strong> Fixed size regardless of context
              </Alert>
              
              <Alert severity="warning" sx={{ mb: 1 }}>
                <strong>Relative:</strong> Size depends on parent or root element
              </Alert>
              
              <Alert severity="success">
                <strong>Viewport:</strong> Size depends on viewport dimensions
              </Alert>

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle2" gutterBottom>
                Common Use Cases:
              </Typography>
              <Typography variant="body2" paragraph>
                • <strong>px:</strong> Precise control, borders, images
              </Typography>
              <Typography variant="body2" paragraph>
                • <strong>rem:</strong> Typography, consistent scaling
              </Typography>
              <Typography variant="body2" paragraph>
                • <strong>%:</strong> Responsive layouts, widths
              </Typography>
              <Typography variant="body2" paragraph>
                • <strong>vw/vh:</strong> Full viewport sections
              </Typography>
              <Typography variant="body2">
                • <strong>em:</strong> Component-relative sizing
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
