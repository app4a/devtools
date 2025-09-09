import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  TextField,
  Typography,
  Paper,
  Grid,
  IconButton,
  Snackbar,
  InputAdornment,
  Card,
  CardContent,
  Button,
  Tabs,
  Tab,
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  LinearProgress
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import PaletteIcon from '@mui/icons-material/Palette';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DownloadIcon from '@mui/icons-material/Download';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import InfoIcon from '@mui/icons-material/Info';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { SketchPicker } from 'react-color';

import Head from 'next/head';

// Comprehensive color conversion utilities
const colorUtils = {
  // Parse hex color to RGB values
  hexToRgb: (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  },

  // RGB to HEX
  rgbToHex: (r, g, b) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  },

  // RGB to HSL
  rgbToHsl: (r, g, b) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return { h: h * 360, s: s * 100, l: l * 100 };
  },

  // HSL to RGB
  hslToRgb: (h, s, l) => {
    h /= 360; s /= 100; l /= 100;
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    let r, g, b;
    if (s === 0) {
      r = g = b = l;
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }
    return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
  },

  // RGB to HSV
  rgbToHsv: (r, g, b) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, v = max;
    const d = max - min;
    s = max === 0 ? 0 : d / max;

    if (max === min) {
      h = 0;
    } else {
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return { h: h * 360, s: s * 100, v: v * 100 };
  },

  // Calculate relative luminance for accessibility
  getLuminance: (r, g, b) => {
    const sRGB = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
  },

  // Calculate contrast ratio
  getContrastRatio: (color1, color2) => {
    const lum1 = colorUtils.getLuminance(color1.r, color1.g, color1.b);
    const lum2 = colorUtils.getLuminance(color2.r, color2.g, color2.b);
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    return (brightest + 0.05) / (darkest + 0.05);
  },

  // Generate color harmonies
  generateHarmony: (baseColor, type) => {
    const { h, s, l } = colorUtils.rgbToHsl(baseColor.r, baseColor.g, baseColor.b);
    const colors = [baseColor];
    
    switch (type) {
      case 'complementary':
        colors.push(colorUtils.hslToRgb((h + 180) % 360, s, l));
        break;
      case 'triadic':
        colors.push(colorUtils.hslToRgb((h + 120) % 360, s, l));
        colors.push(colorUtils.hslToRgb((h + 240) % 360, s, l));
        break;
      case 'analogous':
        colors.push(colorUtils.hslToRgb((h + 30) % 360, s, l));
        colors.push(colorUtils.hslToRgb((h - 30 + 360) % 360, s, l));
        break;
      case 'monochromatic':
        colors.push(colorUtils.hslToRgb(h, s, Math.max(l - 20, 0)));
        colors.push(colorUtils.hslToRgb(h, s, Math.min(l + 20, 100)));
        break;
    }
    return colors.map(c => colorUtils.rgbToHex(c.r, c.g, c.b));
  },

  // Get color name (simplified)
  getColorName: (hex) => {
    const colorNames = {
      '#FF0000': 'Red', '#00FF00': 'Lime', '#0000FF': 'Blue',
      '#FFFF00': 'Yellow', '#FF00FF': 'Magenta', '#00FFFF': 'Cyan',
      '#000000': 'Black', '#FFFFFF': 'White', '#808080': 'Gray',
      '#800000': 'Maroon', '#008000': 'Green', '#000080': 'Navy',
      '#FFA500': 'Orange', '#800080': 'Purple', '#FFC0CB': 'Pink'
    };
    return colorNames[hex.toUpperCase()] || 'Custom Color';
  }
};

export default function ColorConverter({ name, description }) {
  const [baseColor, setBaseColor] = useState('#1976d2');
  const [currentTab, setCurrentTab] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [contrastBgColor, setContrastBgColor] = useState('#FFFFFF');
  const [savedPalettes, setSavedPalettes] = useState([]);
  const [harmonyType, setHarmonyType] = useState('complementary');

  const colorFormats = useMemo(() => {
    const rgb = colorUtils.hexToRgb(baseColor);
    if (!rgb) return {};
    
    const hsl = colorUtils.rgbToHsl(rgb.r, rgb.g, rgb.b);
    const hsv = colorUtils.rgbToHsv(rgb.r, rgb.g, rgb.b);
    
    return {
      hex: baseColor.toUpperCase(),
      rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
      rgba: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)`,
      hsl: `hsl(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%)`,
      hsla: `hsla(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%, 1)`,
      hsv: `hsv(${Math.round(hsv.h)}, ${Math.round(hsv.s)}%, ${Math.round(hsv.v)}%)`,
      name: colorUtils.getColorName(baseColor)
    };
  }, [baseColor]);

  const accessibilityInfo = useMemo(() => {
    const baseRgb = colorUtils.hexToRgb(baseColor);
    const bgRgb = colorUtils.hexToRgb(contrastBgColor);
    if (!baseRgb || !bgRgb) return {};

    const contrastRatio = colorUtils.getContrastRatio(baseRgb, bgRgb);
    return {
      contrastRatio: contrastRatio.toFixed(2),
      wcagAA: contrastRatio >= 4.5,
      wcagAAA: contrastRatio >= 7,
      wcagAALarge: contrastRatio >= 3,
      recommendation: contrastRatio >= 7 ? 'Excellent' : 
                     contrastRatio >= 4.5 ? 'Good' : 
                     contrastRatio >= 3 ? 'Poor (Large text only)' : 'Fail'
    };
  }, [baseColor, contrastBgColor]);

  const colorHarmony = useMemo(() => {
    const baseRgb = colorUtils.hexToRgb(baseColor);
    if (!baseRgb) return [];
    return colorUtils.generateHarmony(baseRgb, harmonyType);
  }, [baseColor, harmonyType]);

  const handleColorPickerChange = (color) => {
    setBaseColor(color.hex);
  };

  const handleCopy = async (textToCopy) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setOpenSnackbar(true);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const savePalette = () => {
    const newPalette = {
      id: Date.now(),
      name: `Palette ${savedPalettes.length + 1}`,
      colors: colorHarmony,
      createdAt: new Date().toLocaleDateString()
    };
    setSavedPalettes([...savedPalettes, newPalette]);
  };

  const exportPalette = () => {
    const paletteData = {
      baseColor,
      formats: colorFormats,
      harmony: { type: harmonyType, colors: colorHarmony },
      accessibility: accessibilityInfo,
      exportedAt: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(paletteData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `color-palette-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const popularColors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57',
    '#FF9FF3', '#54A0FF', '#5F27CD', '#00D2D3', '#FF9F43',
    '#EE5A24', '#0ABDE3', '#10AC84', '#F79F1F', '#A3CB38'
  ];

  return (
    <Box sx={{ p: 2 }}>
      <Head>
        <title>{name ? `${name} - Dev Tools` : 'Professional Color Converter - Dev Tools'}</title>
        <meta name="description" content={description} />
      </Head>
      
      <Typography variant="h4" gutterBottom>
        {name}
      </Typography>
      <Typography variant="body1" paragraph color="text.secondary">
        {description}
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        <strong>Professional Color Tool:</strong> Convert between formats, check accessibility, 
        generate harmonies, and create stunning color palettes.
      </Alert>

      <Tabs value={currentTab} onChange={(e, newValue) => setCurrentTab(newValue)} sx={{ mb: 3 }}>
        <Tab label="Color Converter" />
        <Tab label="Accessibility" />
        <Tab label="Color Harmony" />
        <Tab label="Saved Palettes" />
      </Tabs>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          {currentTab === 0 && (
            <>
              {/* Color Picker */}
              <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  <ColorLensIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                  Color Picker
                </Typography>
                
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, md: 7 }}>
                    <SketchPicker
                      color={baseColor}
                      onChangeComplete={handleColorPickerChange}
                      disableAlpha={true}
                      width={'100%'}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 5 }}>
                    {/* Color Preview */}
                    <Box
                      sx={{
                        width: '100%',
                        height: 120,
                        bgcolor: baseColor,
                        borderRadius: 2,
                        border: 1,
                        borderColor: 'divider',
                        mb: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          color: accessibilityInfo.wcagAA ? '#FFFFFF' : '#000000',
                          textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                        }}
                      >
                        {colorFormats.name}
                      </Typography>
                    </Box>
                    
                    <Button
                      variant="outlined"
                      fullWidth
                      startIcon={<BookmarkIcon />}
                      onClick={savePalette}
                      sx={{ mb: 1 }}
                    >
                      Save Palette
                    </Button>
                    
                    <Button
                      variant="outlined"
                      fullWidth
                      startIcon={<DownloadIcon />}
                      onClick={exportPalette}
                    >
                      Export Data
                    </Button>
                  </Grid>
                </Grid>
              </Paper>

              {/* Color Formats */}
              <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Color Formats
                </Typography>
                
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell><strong>Format</strong></TableCell>
                        <TableCell><strong>Value</strong></TableCell>
                        <TableCell><strong>Action</strong></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Object.entries(colorFormats).map(([format, value]) => (
                        <TableRow key={format}>
                          <TableCell>
                            <Chip label={format.toUpperCase()} size="small" variant="outlined" />
                          </TableCell>
                          <TableCell sx={{ fontFamily: 'monospace' }}>{value}</TableCell>
                          <TableCell>
                            <IconButton 
                              size="small" 
                              onClick={() => handleCopy(value)}
                              title={`Copy ${format.toUpperCase()}`}
                            >
                              <ContentCopyIcon fontSize="small" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>

              {/* Popular Colors */}
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Popular Colors
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {popularColors.map((color, index) => (
                    <Box
                      key={index}
                      sx={{
                        width: 40,
                        height: 40,
                        bgcolor: color,
                        borderRadius: 1,
                        border: 1,
                        borderColor: 'divider',
                        cursor: 'pointer',
                        '&:hover': { transform: 'scale(1.1)' }
                      }}
                      onClick={() => setBaseColor(color)}
                      title={color}
                    />
                  ))}
                </Box>
              </Paper>
            </>
          )}

          {currentTab === 1 && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                <AccessibilityIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                Accessibility Checker
              </Typography>
              
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Foreground Color
                  </Typography>
                  <Box
                    sx={{
                      width: '100%',
                      height: 60,
                      bgcolor: baseColor,
                      borderRadius: 1,
                      border: 1,
                      borderColor: 'divider',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2
                    }}
                  >
                    <Typography sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>
                      Sample Text
                    </Typography>
                  </Box>
                  
                  <TextField
                    label="Background Color"
                    fullWidth
                    value={contrastBgColor}
                    onChange={(e) => setContrastBgColor(e.target.value)}
                    sx={{ mb: 2 }}
                  />
                </Grid>
                
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Contrast Preview
                  </Typography>
                  <Box
                    sx={{
                      width: '100%',
                      height: 120,
                      bgcolor: contrastBgColor,
                      borderRadius: 1,
                      border: 1,
                      borderColor: 'divider',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      p: 2
                    }}
                  >
                    <Typography sx={{ color: baseColor, fontSize: '1.2rem', fontWeight: 'bold' }}>
                      Normal Text
                    </Typography>
                    <Typography sx={{ color: baseColor, fontSize: '1.5rem', fontWeight: 'bold' }}>
                      Large Text
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                WCAG Compliance Results
              </Typography>
              
              <TableContainer>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell><strong>Contrast Ratio</strong></TableCell>
                      <TableCell>{accessibilityInfo.contrastRatio}:1</TableCell>
                      <TableCell>
                        <LinearProgress
                          variant="determinate"
                          value={Math.min((parseFloat(accessibilityInfo.contrastRatio) / 7) * 100, 100)}
                          sx={{ width: 100 }}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><strong>WCAG AA (Normal)</strong></TableCell>
                      <TableCell>
                        <Chip 
                          label={accessibilityInfo.wcagAA ? 'Pass' : 'Fail'} 
                          color={accessibilityInfo.wcagAA ? 'success' : 'error'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>Requires 4.5:1</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><strong>WCAG AA (Large Text)</strong></TableCell>
                      <TableCell>
                        <Chip 
                          label={accessibilityInfo.wcagAALarge ? 'Pass' : 'Fail'} 
                          color={accessibilityInfo.wcagAALarge ? 'success' : 'error'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>Requires 3:1</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><strong>WCAG AAA</strong></TableCell>
                      <TableCell>
                        <Chip 
                          label={accessibilityInfo.wcagAAA ? 'Pass' : 'Fail'} 
                          color={accessibilityInfo.wcagAAA ? 'success' : 'error'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>Requires 7:1</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><strong>Recommendation</strong></TableCell>
                      <TableCell colSpan={2}>
                        <Chip 
                          label={accessibilityInfo.recommendation} 
                          color={
                            accessibilityInfo.recommendation === 'Excellent' ? 'success' :
                            accessibilityInfo.recommendation === 'Good' ? 'warning' : 'error'
                          }
                        />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          )}

          {currentTab === 2 && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                <PaletteIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                Color Harmony Generator
              </Typography>
              
              <FormControl sx={{ mb: 3, minWidth: 200 }}>
                <InputLabel>Harmony Type</InputLabel>
                <Select
                  value={harmonyType}
                  onChange={(e) => setHarmonyType(e.target.value)}
                  label="Harmony Type"
                >
                  <MenuItem value="complementary">Complementary</MenuItem>
                  <MenuItem value="triadic">Triadic</MenuItem>
                  <MenuItem value="analogous">Analogous</MenuItem>
                  <MenuItem value="monochromatic">Monochromatic</MenuItem>
                </Select>
              </FormControl>

              <Typography variant="subtitle1" gutterBottom>
                Generated Palette ({harmonyType})
              </Typography>
              
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
                {colorHarmony.map((color, index) => (
                  <Box key={index} sx={{ textAlign: 'center' }}>
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        bgcolor: color,
                        borderRadius: 2,
                        border: 1,
                        borderColor: 'divider',
                        cursor: 'pointer',
                        mb: 1
                      }}
                      onClick={() => setBaseColor(color)}
                    />
                    <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
                      {color}
                    </Typography>
                    <br />
                    <IconButton size="small" onClick={() => handleCopy(color)}>
                      <ContentCopyIcon fontSize="small" />
                    </IconButton>
                  </Box>
                ))}
              </Box>
              
              <Button
                variant="outlined"
                startIcon={<BookmarkIcon />}
                onClick={savePalette}
              >
                Save This Harmony
              </Button>
            </Paper>
          )}

          {currentTab === 3 && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Saved Palettes
              </Typography>
              
              {savedPalettes.length === 0 ? (
                <Alert severity="info">
                  No saved palettes yet. Create some color harmonies and save them!
                </Alert>
              ) : (
                <List>
                  {savedPalettes.map((palette) => (
                    <ListItem key={palette.id} divider>
                      <ListItemText
                        primary={palette.name}
                        secondary={`Created: ${palette.createdAt}`}
                      />
                      <Box sx={{ display: 'flex', gap: 1, mr: 2 }}>
                        {palette.colors.slice(0, 4).map((color, index) => (
                          <Box
                            key={index}
                            sx={{
                              width: 20,
                              height: 20,
                              bgcolor: color,
                              borderRadius: '50%',
                              border: 1,
                              borderColor: 'divider'
                            }}
                          />
                        ))}
                      </Box>
                    </ListItem>
                  ))}
                </List>
              )}
            </Paper>
          )}
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          {/* Color Theory Guide */}
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <InfoIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                Color Theory Guide
              </Typography>
              
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="subtitle2">Color Harmonies</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" paragraph>
                    <strong>Complementary:</strong> Colors opposite on the color wheel
                  </Typography>
                  <Typography variant="body2" paragraph>
                    <strong>Triadic:</strong> Three colors evenly spaced on the wheel
                  </Typography>
                  <Typography variant="body2" paragraph>
                    <strong>Analogous:</strong> Colors adjacent on the wheel
                  </Typography>
                  <Typography variant="body2">
                    <strong>Monochromatic:</strong> Different shades of the same hue
                  </Typography>
                </AccordionDetails>
              </Accordion>
              
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="subtitle2">Accessibility</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" paragraph>
                    <strong>WCAG AA:</strong> Minimum standard for web accessibility
                  </Typography>
                  <Typography variant="body2" paragraph>
                    <strong>WCAG AAA:</strong> Enhanced accessibility standard
                  </Typography>
                  <Typography variant="body2">
                    Always test your color combinations for sufficient contrast.
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
                • Use the color picker or enter hex values directly
              </Typography>
              <Typography variant="body2" paragraph>
                • Check accessibility for all text-background combinations
              </Typography>
              <Typography variant="body2" paragraph>
                • Explore different harmony types for inspiration
              </Typography>
              <Typography variant="body2" paragraph>
                • Save successful palettes for future reference
              </Typography>
              <Typography variant="body2">
                • Export color data for use in design tools
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