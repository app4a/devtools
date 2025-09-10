import React, { useState, useEffect, useMemo } from 'react';
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
  Alert,
  Tabs,
  Tab,
  Button,
  IconButton,
  Snackbar,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
  Slider,
  FormControlLabel,
  Switch,
  LinearProgress,
  Tooltip
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DownloadIcon from '@mui/icons-material/Download';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import TabletIcon from '@mui/icons-material/Tablet';
import LaptopIcon from '@mui/icons-material/Laptop';
import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CodeIcon from '@mui/icons-material/Code';
import PaletteIcon from '@mui/icons-material/Palette';
import RuleIcon from '@mui/icons-material/Rule';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import DeleteIcon from '@mui/icons-material/Delete';
import Head from 'next/head';

export default function CssUnitConverter({ name, description }) {
  const [inputValue, setInputValue] = useState('16');
  const [inputUnit, setInputUnit] = useState('px');
  const [baseFontSize, setBaseFontSize] = useState('16');
  const [viewportWidth, setViewportWidth] = useState('1920');
  const [viewportHeight, setViewportHeight] = useState('1080');
  const [currentTab, setCurrentTab] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [savedPresets, setSavedPresets] = useState([]);
  const [showVisualPreview, setShowVisualPreview] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState('font-size');
  const [isInitialized, setIsInitialized] = useState(false);

  // Load saved presets from localStorage on component mount
  useEffect(() => {
    const storedPresets = localStorage.getItem('cssUnitConverterPresets');
    if (storedPresets) {
      try {
        setSavedPresets(JSON.parse(storedPresets));
      } catch (error) {
        console.error('Failed to parse saved presets:', error);
      }
    }
    setIsInitialized(true);
  }, []);

  // Save presets to localStorage whenever savedPresets changes (but only after initialization)
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('cssUnitConverterPresets', JSON.stringify(savedPresets));
    }
  }, [savedPresets, isInitialized]);

  // Comprehensive CSS units configuration
  const units = {
    // Absolute length units
    px: { name: 'Pixels', type: 'absolute', description: 'Device pixels, most common unit' },
    pt: { name: 'Points', type: 'absolute', description: '1/72 of an inch, used in print' },
    pc: { name: 'Picas', type: 'absolute', description: '12 points, typography unit' },
    in: { name: 'Inches', type: 'absolute', description: 'Physical inches' },
    cm: { name: 'Centimeters', type: 'absolute', description: 'Physical centimeters' },
    mm: { name: 'Millimeters', type: 'absolute', description: 'Physical millimeters' },
    Q: { name: 'Quarter-mm', type: 'absolute', description: 'Quarter of a millimeter' },
    
    // Relative length units
    rem: { name: 'Root EM', type: 'relative', description: 'Relative to root element font size' },
    em: { name: 'EM', type: 'relative', description: 'Relative to parent element font size' },
    ex: { name: 'X-height', type: 'relative', description: 'Height of lowercase x' },
    ch: { name: 'Character Width', type: 'relative', description: 'Width of character "0"' },
    lh: { name: 'Line Height', type: 'relative', description: 'Line height of element' },
    rlh: { name: 'Root Line Height', type: 'relative', description: 'Line height of root element' },
    '%': { name: 'Percentage', type: 'relative', description: 'Relative to parent element' },
    
    // Viewport units
    vw: { name: 'Viewport Width', type: 'viewport', description: '1% of viewport width' },
    vh: { name: 'Viewport Height', type: 'viewport', description: '1% of viewport height' },
    vmin: { name: 'Viewport Minimum', type: 'viewport', description: '1% of smaller viewport dimension' },
    vmax: { name: 'Viewport Maximum', type: 'viewport', description: '1% of larger viewport dimension' },
    vi: { name: 'Viewport Inline', type: 'viewport', description: '1% of viewport inline axis' },
    vb: { name: 'Viewport Block', type: 'viewport', description: '1% of viewport block axis' },
    
    // Container query units
    cqw: { name: 'Container Query Width', type: 'container', description: '1% of container width' },
    cqh: { name: 'Container Query Height', type: 'container', description: '1% of container height' },
    cqi: { name: 'Container Query Inline', type: 'container', description: '1% of container inline size' },
    cqb: { name: 'Container Query Block', type: 'container', description: '1% of container block size' },
    cqmin: { name: 'Container Query Min', type: 'container', description: '1% of smaller container dimension' },
    cqmax: { name: 'Container Query Max', type: 'container', description: '1% of larger container dimension' }
  };

  const devicePresets = {
    mobile: { width: 375, height: 812, name: 'Mobile (iPhone)', icon: PhoneAndroidIcon },
    tablet: { width: 768, height: 1024, name: 'Tablet (iPad)', icon: TabletIcon },
    laptop: { width: 1366, height: 768, name: 'Laptop', icon: LaptopIcon },
    desktop: { width: 1920, height: 1080, name: 'Desktop', icon: DesktopWindowsIcon }
  };

  const cssProperties = [
    'font-size', 'width', 'height', 'margin', 'padding', 'border-width',
    'top', 'right', 'bottom', 'left', 'border-radius', 'line-height'
  ];

  const convertToPx = (value, unit) => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return 0;

    const baseFontPx = parseFloat(baseFontSize);
    const vpWidth = parseFloat(viewportWidth);
    const vpHeight = parseFloat(viewportHeight);

    switch (unit) {
      case 'px':
        return numValue;
      case 'rem':
        return numValue * baseFontPx;
      case 'em':
        return numValue * baseFontPx; // Simplified - assumes parent font size = root
      case '%':
        return (numValue / 100) * baseFontPx; // For font-size context
      case 'vw':
        return (numValue / 100) * vpWidth;
      case 'vh':
        return (numValue / 100) * vpHeight;
      case 'vmin':
        return (numValue / 100) * Math.min(vpWidth, vpHeight);
      case 'vmax':
        return (numValue / 100) * Math.max(vpWidth, vpHeight);
      case 'vi':
        return (numValue / 100) * vpWidth; // Simplified for LTR
      case 'vb':
        return (numValue / 100) * vpHeight;
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
      case 'Q':
        return numValue * (96 / 101.6); // 1Q = 1/4 mm
      case 'ex':
        return numValue * (baseFontPx * 0.5); // Approximation
      case 'ch':
        return numValue * (baseFontPx * 0.6); // Approximation for monospace
      case 'lh':
        return numValue * (baseFontPx * 1.2); // Approximation
      case 'rlh':
        return numValue * (baseFontPx * 1.2); // Approximation
      // Container query units (simplified - assume same as viewport)
      case 'cqw':
        return (numValue / 100) * vpWidth;
      case 'cqh':
        return (numValue / 100) * vpHeight;
      case 'cqi':
        return (numValue / 100) * vpWidth;
      case 'cqb':
        return (numValue / 100) * vpHeight;
      case 'cqmin':
        return (numValue / 100) * Math.min(vpWidth, vpHeight);
      case 'cqmax':
        return (numValue / 100) * Math.max(vpWidth, vpHeight);
      default:
        return 0;
    }
  };

  const convertFromPx = (pxValue, targetUnit) => {
    if (pxValue === 0) return 0;

    const baseFontPx = parseFloat(baseFontSize);
    const vpWidth = parseFloat(viewportWidth);
    const vpHeight = parseFloat(viewportHeight);

    switch (targetUnit) {
      case 'px':
        return pxValue;
      case 'rem':
        return pxValue / baseFontPx;
      case 'em':
        return pxValue / baseFontPx;
      case '%':
        return (pxValue / baseFontPx) * 100;
      case 'vw':
        return (pxValue / vpWidth) * 100;
      case 'vh':
        return (pxValue / vpHeight) * 100;
      case 'vmin':
        return (pxValue / Math.min(vpWidth, vpHeight)) * 100;
      case 'vmax':
        return (pxValue / Math.max(vpWidth, vpHeight)) * 100;
      case 'vi':
        return (pxValue / vpWidth) * 100;
      case 'vb':
        return (pxValue / vpHeight) * 100;
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
      case 'Q':
        return pxValue * (101.6 / 96);
      case 'ex':
        return pxValue / (baseFontPx * 0.5);
      case 'ch':
        return pxValue / (baseFontPx * 0.6);
      case 'lh':
        return pxValue / (baseFontPx * 1.2);
      case 'rlh':
        return pxValue / (baseFontPx * 1.2);
      // Container query units
      case 'cqw':
        return (pxValue / vpWidth) * 100;
      case 'cqh':
        return (pxValue / vpHeight) * 100;
      case 'cqi':
        return (pxValue / vpWidth) * 100;
      case 'cqb':
        return (pxValue / vpHeight) * 100;
      case 'cqmin':
        return (pxValue / Math.min(vpWidth, vpHeight)) * 100;
      case 'cqmax':
        return (pxValue / Math.max(vpWidth, vpHeight)) * 100;
      default:
        return 0;
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

  const applyDevicePreset = (preset) => {
    setViewportWidth(preset.width.toString());
    setViewportHeight(preset.height.toString());
  };

  const savePreset = () => {
    const newPreset = {
      id: Date.now(),
      name: `Preset ${savedPresets.length + 1}`,
      inputValue,
      inputUnit,
      baseFontSize,
      viewportWidth,
      viewportHeight,
      createdAt: new Date().toLocaleDateString()
    };
    setSavedPresets([...savedPresets, newPreset]);
  };

  const loadPreset = (preset) => {
    setInputValue(preset.inputValue);
    setInputUnit(preset.inputUnit);
    setBaseFontSize(preset.baseFontSize);
    setViewportWidth(preset.viewportWidth);
    setViewportHeight(preset.viewportHeight);
    setCurrentTab(0);
  };

  const deletePreset = (presetId) => {
    setSavedPresets(savedPresets.filter(preset => preset.id !== presetId));
  };

  const generateCSS = () => {
    const pxValue = convertToPx(inputValue, inputUnit);
    const commonUnits = ['px', 'rem', 'em', '%', 'vw', 'vh'];
    
    const cssRules = commonUnits.map(unit => {
      const value = convertFromPx(pxValue, unit);
      const formattedValue = formatValue(value);
      return `  ${selectedProperty}: ${formattedValue}${unit};`;
    }).join('\n');

    return `.element {\n${cssRules}\n}`;
  };

  const exportData = () => {
    const pxValue = convertToPx(inputValue, inputUnit);
    const exportData = {
      inputValue,
      inputUnit,
      pxEquivalent: pxValue,
      baseFontSize,
      viewportWidth,
      viewportHeight,
      conversions: Object.keys(units).map(unit => ({
        unit,
        name: units[unit].name,
        value: convertFromPx(pxValue, unit),
        formatted: `${formatValue(convertFromPx(pxValue, unit))}${unit}`
      })),
      cssCode: generateCSS(),
      exportedAt: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `css-units-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const pxValue = convertToPx(inputValue, inputUnit);

  const conversions = useMemo(() => {
    return Object.keys(units).map(unit => ({
      unit,
      name: units[unit].name,
      type: units[unit].type,
      description: units[unit].description,
      value: convertFromPx(pxValue, unit),
      isInput: unit === inputUnit
    }));
  }, [inputValue, inputUnit, baseFontSize, viewportWidth, viewportHeight]);

  const formatValue = (value) => {
    if (value === 0) return '0';
    if (Math.abs(value) >= 1000) return value.toFixed(2);
    if (Math.abs(value) >= 100) return value.toFixed(3);
    if (Math.abs(value) >= 10) return value.toFixed(4);
    return value.toFixed(6);
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'absolute': return 'info';
      case 'relative': return 'warning';
      case 'viewport': return 'success';
      case 'container': return 'secondary';
      default: return 'default';
    }
  };

  const responsiveBreakpoints = [
    { name: 'Mobile S', width: 320 },
    { name: 'Mobile M', width: 375 },
    { name: 'Mobile L', width: 425 },
    { name: 'Tablet', width: 768 },
    { name: 'Laptop', width: 1024 },
    { name: 'Laptop L', width: 1440 },
    { name: 'Desktop', width: 2560 }
  ];

  return (
    <Box sx={{ p: 2 }}>
      <Head>
        <title>{name ? `${name} - Dev Tools` : 'Professional CSS Unit Converter - Dev Tools'}</title>
        <meta name="description" content={description} />
      </Head>
      
      <Typography variant="h4" gutterBottom>
        {name}
      </Typography>
      <Typography variant="body1" paragraph color="text.secondary">
        {description}
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        <strong>Professional CSS Unit Converter:</strong> Comprehensive conversion between 20+ CSS units 
        including modern container queries, responsive design presets, and visual previews.
      </Alert>

      <Tabs value={currentTab} onChange={(e, newValue) => setCurrentTab(newValue)} sx={{ mb: 3 }}>
        <Tab label="Unit Converter" />
        <Tab label="Visual Preview" />
        <Tab label="CSS Generator" />
        <Tab label="Responsive Analysis" />
        <Tab label="Saved Presets" />
      </Tabs>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          {currentTab === 0 && (
            <>
              {/* Input Section */}
              <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  <RuleIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                  Convert CSS Units
                </Typography>
                
                <Grid container spacing={2} alignItems="center">
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <TextField
                      label="Value"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      fullWidth
                      type="number"
                      inputProps={{ step: 'any' }}
                      InputProps={{
                        style: { fontFamily: 'monospace', fontSize: '1.1rem' }
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <FormControl fullWidth>
                      <InputLabel>From Unit</InputLabel>
                      <Select
                        value={inputUnit}
                        onChange={(e) => setInputUnit(e.target.value)}
                        label="From Unit"
                      >
                        {Object.entries(units).map(([unit, info]) => (
                          <MenuItem key={unit} value={unit}>
                            <Chip 
                              label={info.type} 
                              color={getTypeColor(info.type)} 
                              size="small" 
                              sx={{ mr: 1, minWidth: 60 }} 
                            />
                            {unit} - {info.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <Stack direction="row" spacing={1}>
                      <Button
                        variant="outlined"
                        startIcon={<BookmarkIcon />}
                        onClick={savePreset}
                        size="small"
                      >
                        Save Preset
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<DownloadIcon />}
                        onClick={exportData}
                        size="small"
                      >
                        Export
                      </Button>
                    </Stack>
                  </Grid>
                </Grid>

                <Alert severity="success" sx={{ mt: 2 }}>
                  <strong>Pixel Equivalent:</strong> {formatValue(pxValue)}px
                </Alert>
              </Paper>

              {/* Results Table */}
              <Paper sx={{ p: 0 }}>
                <Typography variant="h6" sx={{ p: 3, pb: 0 }}>
                  Conversion Results ({Object.keys(units).length} units)
                </Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell><strong>Unit</strong></TableCell>
                        <TableCell><strong>Value</strong></TableCell>
                        <TableCell><strong>Type</strong></TableCell>
                        <TableCell><strong>Description</strong></TableCell>
                        <TableCell><strong>Copy</strong></TableCell>
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
                          <TableCell sx={{ fontFamily: 'monospace', fontSize: '1.1rem' }}>
                            {formatValue(conversion.value)}{conversion.unit}
                          </TableCell>
                          <TableCell>
                            <Chip 
                              label={conversion.type}
                              color={getTypeColor(conversion.type)}
                              size="small"
                              sx={{ textTransform: 'capitalize' }}
                            />
                          </TableCell>
                          <TableCell sx={{ fontSize: '0.85rem', color: 'text.secondary' }}>
                            {conversion.description}
                          </TableCell>
                          <TableCell>
                            <IconButton 
                              size="small" 
                              onClick={() => handleCopy(`${formatValue(conversion.value)}${conversion.unit}`)}
                              title={`Copy ${conversion.unit} value`}
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

          {currentTab === 1 && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                <VisibilityIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                Visual Preview
              </Typography>
              
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>CSS Property</InputLabel>
                <Select
                  value={selectedProperty}
                  onChange={(e) => setSelectedProperty(e.target.value)}
                  label="CSS Property"
                >
                  {cssProperties.map((prop) => (
                    <MenuItem key={prop} value={prop}>{prop}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>Desktop Preview</Typography>
                      <Box 
                        sx={{ 
                          border: 1, 
                          borderColor: 'divider', 
                          p: 2, 
                          height: 200,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: 'grey.50'
                        }}
                      >
                        <Box
                          sx={{
                            backgroundColor: 'primary.main',
                            color: 'white',
                            p: 1,
                            ...(selectedProperty === 'font-size' && { fontSize: `${pxValue}px` }),
                            ...(selectedProperty === 'width' && { width: `${pxValue}px`, height: '50px' }),
                            ...(selectedProperty === 'height' && { height: `${pxValue}px`, width: '100px' }),
                            ...(selectedProperty === 'border-radius' && { 
                              borderRadius: `${pxValue}px`, 
                              width: '100px', 
                              height: '100px' 
                            }),
                            ...(selectedProperty.includes('margin') && { margin: `${pxValue}px` }),
                            ...(selectedProperty.includes('padding') && { padding: `${pxValue}px` })
                          }}
                        >
                          {selectedProperty === 'font-size' ? 'Sample Text' : 'Element'}
                        </Box>
                      </Box>
                      <Typography variant="caption" color="text.secondary">
                        {selectedProperty}: {formatValue(pxValue)}px
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>Mobile Preview</Typography>
                      <Box 
                        sx={{ 
                          border: 1, 
                          borderColor: 'divider', 
                          p: 1, 
                          height: 200,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: 'grey.50',
                          transform: 'scale(0.6)',
                          transformOrigin: 'top left'
                        }}
                      >
                        <Box
                          sx={{
                            backgroundColor: 'secondary.main',
                            color: 'white',
                            p: 1,
                            ...(selectedProperty === 'font-size' && { fontSize: `${pxValue}px` }),
                            ...(selectedProperty === 'width' && { width: `${pxValue}px`, height: '50px' }),
                            ...(selectedProperty === 'height' && { height: `${pxValue}px`, width: '100px' }),
                            ...(selectedProperty === 'border-radius' && { 
                              borderRadius: `${pxValue}px`, 
                              width: '100px', 
                              height: '100px' 
                            })
                          }}
                        >
                          {selectedProperty === 'font-size' ? 'Sample Text' : 'Element'}
                        </Box>
                      </Box>
                      <Typography variant="caption" color="text.secondary">
                        Scaled preview (60%)
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Paper>
          )}

          {currentTab === 2 && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                <CodeIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                CSS Code Generator
              </Typography>
              
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>CSS Property</InputLabel>
                <Select
                  value={selectedProperty}
                  onChange={(e) => setSelectedProperty(e.target.value)}
                  label="CSS Property"
                >
                  {cssProperties.map((prop) => (
                    <MenuItem key={prop} value={prop}>{prop}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                multiline
                rows={8}
                fullWidth
                value={generateCSS()}
                variant="outlined"
                label="Generated CSS"
                InputProps={{
                  readOnly: true,
                  style: { fontFamily: 'monospace', fontSize: '0.9rem' }
                }}
                sx={{ mb: 2 }}
              />

              <Stack direction="row" spacing={1}>
                <Button
                  variant="outlined"
                  startIcon={<ContentCopyIcon />}
                  onClick={() => handleCopy(generateCSS())}
                >
                  Copy CSS
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<DownloadIcon />}
                  onClick={() => {
                    const blob = new Blob([generateCSS()], { type: 'text/css' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'styles.css';
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                >
                  Download CSS
                </Button>
              </Stack>
            </Paper>
          )}

          {currentTab === 3 && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                <PaletteIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                Responsive Analysis
              </Typography>
              
              <Typography variant="subtitle1" gutterBottom>
                Value across common breakpoints:
              </Typography>

              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>Breakpoint</strong></TableCell>
                      <TableCell><strong>Viewport</strong></TableCell>
                      <TableCell><strong>Value (px)</strong></TableCell>
                      <TableCell><strong>Relative (%)</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {responsiveBreakpoints.map((bp) => {
                      const tempViewportWidth = viewportWidth;
                      const bpPxValue = inputUnit === 'vw' 
                        ? (parseFloat(inputValue) / 100) * bp.width
                        : pxValue;
                      const percentage = (bpPxValue / bp.width) * 100;
                      
                      return (
                        <TableRow key={bp.name}>
                          <TableCell>{bp.name}</TableCell>
                          <TableCell>{bp.width}px</TableCell>
                          <TableCell sx={{ fontFamily: 'monospace' }}>
                            {formatValue(bpPxValue)}px
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                              <LinearProgress 
                                variant="determinate" 
                                value={Math.min(percentage, 100)} 
                                sx={{ flexGrow: 1, mr: 1 }}
                              />
                              <Typography variant="body2" sx={{ minWidth: '60px' }}>
                                {formatValue(percentage)}%
                              </Typography>
                            </Box>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          )}

          {currentTab === 4 && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Saved Presets
              </Typography>
              
              {savedPresets.length === 0 ? (
                <Alert severity="info">
                  No saved presets yet. Create some conversion presets for quick reuse!
                </Alert>
              ) : (
                <List>
                  {savedPresets.map((preset) => (
                    <ListItem key={preset.id} divider>
                      <ListItemText
                        primary={preset.name}
                        secondary={`${preset.inputValue}${preset.inputUnit} | Font: ${preset.baseFontSize}px | Viewport: ${preset.viewportWidth}×${preset.viewportHeight} | ${preset.createdAt}`}
                      />
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                          size="small"
                          onClick={() => loadPreset(preset)}
                        >
                          Load
                        </Button>
                        <IconButton
                          size="small"
                          onClick={() => deletePreset(preset.id)}
                          color="error"
                          title="Delete Preset"
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
          {/* Device Presets */}
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Device Presets
              </Typography>
              
              <Stack spacing={1}>
                {Object.entries(devicePresets).map(([key, preset]) => {
                  const IconComponent = preset.icon;
                  return (
                    <Button
                      key={key}
                      variant="outlined"
                      startIcon={<IconComponent />}
                      onClick={() => applyDevicePreset(preset)}
                      fullWidth
                      sx={{ justifyContent: 'flex-start' }}
                    >
                      {preset.name} ({preset.width}×{preset.height})
                    </Button>
                  );
                })}
              </Stack>
            </CardContent>
          </Card>

          {/* Context Settings */}
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
                InputProps={{
                  style: { fontFamily: 'monospace' }
                }}
              />
              
              <TextField
                label="Viewport Width (px)"
                value={viewportWidth}
                onChange={(e) => setViewportWidth(e.target.value)}
                fullWidth
                type="number"
                sx={{ mb: 2 }}
                helperText="Used for vw, vmin, vmax calculations"
                InputProps={{
                  style: { fontFamily: 'monospace' }
                }}
              />
              
              <TextField
                label="Viewport Height (px)"
                value={viewportHeight}
                onChange={(e) => setViewportHeight(e.target.value)}
                fullWidth
                type="number"
                helperText="Used for vh, vmin, vmax calculations"
                InputProps={{
                  style: { fontFamily: 'monospace' }
                }}
              />
            </CardContent>
          </Card>

          {/* Unit Guide */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                CSS Unit Guide
              </Typography>
              
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="subtitle2">Absolute Units</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" paragraph>
                    <strong>px:</strong> Pixels, most common for precise control
                  </Typography>
                  <Typography variant="body2" paragraph>
                    <strong>pt:</strong> Points (1/72 inch), used in print
                  </Typography>
                  <Typography variant="body2">
                    <strong>in, cm, mm:</strong> Physical measurements
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="subtitle2">Relative Units</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" paragraph>
                    <strong>rem:</strong> Relative to root font size (best for scaling)
                  </Typography>
                  <Typography variant="body2" paragraph>
                    <strong>em:</strong> Relative to parent font size
                  </Typography>
                  <Typography variant="body2" paragraph>
                    <strong>%:</strong> Percentage of parent element
                  </Typography>
                  <Typography variant="body2">
                    <strong>ch:</strong> Width of "0" character
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="subtitle2">Viewport Units</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" paragraph>
                    <strong>vw/vh:</strong> 1% of viewport width/height
                  </Typography>
                  <Typography variant="body2" paragraph>
                    <strong>vmin/vmax:</strong> 1% of smaller/larger viewport dimension
                  </Typography>
                  <Typography variant="body2">
                    <strong>vi/vb:</strong> Inline/block axis (writing mode aware)
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="subtitle2">Container Query Units</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" paragraph>
                    <strong>cqw/cqh:</strong> 1% of container width/height
                  </Typography>
                  <Typography variant="body2" paragraph>
                    <strong>cqi/cqb:</strong> 1% of container inline/block size
                  </Typography>
                  <Typography variant="body2">
                    Modern units for container-based responsive design
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
