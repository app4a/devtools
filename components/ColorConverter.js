import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Typography,
  Paper,
  Grid,
  IconButton,
  Snackbar,
  InputAdornment
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { SketchPicker } from 'react-color';

import Head from 'next/head';

// Helper function to convert hex to rgb
const hexToRgb = (hex) => {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgb(${r}, ${g}, ${b})`;
};

// Helper function to convert hex to hsl
const hexToHsl = (hex) => {
  let r = 0, g = 0, b = 0;
  // handle hex3
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else if (hex.length === 7) {
    r = parseInt(hex.slice(1, 3), 16);
    g = parseInt(hex.slice(3, 5), 16);
    b = parseInt(hex.slice(5, 7), 16);
  }

  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
      default: break;
    }
    h /= 6;
  }

  return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
};

export default function ColorConverter({ name, description }) {
  const [hexColor, setHexColor] = useState('#1976d2'); // Default to Material UI primary color
  const [rgbColor, setRgbColor] = useState('');
  const [hslColor, setHslColor] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    // Update RGB and HSL whenever hexColor changes
    setRgbColor(hexToRgb(hexColor));
    setHslColor(hexToHsl(hexColor));
  }, [hexColor]);

  const handleHexChange = (e) => {
    const value = e.target.value;
    setHexColor(value);
  };

  const handleRgbChange = (e) => {
    const value = e.target.value;
    setRgbColor(value);
    // Attempt to convert RGB to HEX
    try {
      const parts = value.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
      if (parts) {
        const r = parseInt(parts[1]);
        const g = parseInt(parts[2]);
        const b = parseInt(parts[3]);
        const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
        setHexColor(hex);
      }
    } catch (error) {
      // Invalid RGB format, do nothing or show error
    }
  };

  const handleHslChange = (e) => {
    const value = e.target.value;
    setHslColor(value);
    // Attempt to convert HSL to HEX (more complex, often requires a library or robust function)
    // For simplicity, we'll just update the HSL field and not attempt to convert back to HEX here
    // A full implementation would involve a more robust HSL to RGB to HEX conversion
  };

  const handleColorPickerChange = (color) => {
    setHexColor(color.hex);
  };

  const handleCopy = (textToCopy) => {
    navigator.clipboard.writeText(textToCopy);
    setOpenSnackbar(true);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Head>
        <title>{name} - Dev Tools</title>
        <meta name="description" content={description} />
      </Head>
      <Typography variant="h4" gutterBottom>
        {name}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={7}>
          <SketchPicker
            color={hexColor}
            onChangeComplete={handleColorPickerChange}
            disableAlpha={true}
            width={'calc(100% - 16px)'}
          />
        </Grid>
        <Grid item xs={12} md={5}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <TextField
              label="HEX"
              fullWidth
              value={hexColor}
              onChange={handleHexChange}
              variant="outlined"
              sx={{ mb: 2 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => handleCopy(hexColor)} edge="end">
                      <ContentCopyIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="RGB"
              fullWidth
              value={rgbColor}
              onChange={handleRgbChange}
              variant="outlined"
              sx={{ mb: 2 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => handleCopy(rgbColor)} edge="end">
                      <ContentCopyIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="HSL"
              fullWidth
              value={hslColor}
              onChange={handleHslChange}
              variant="outlined"
              sx={{ mb: 2 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => handleCopy(hslColor)} edge="end">
                      <ContentCopyIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Paper>
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