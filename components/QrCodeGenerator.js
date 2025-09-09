import React, { useState, useRef, useEffect } from 'react';
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
  Button,
  Slider,
  Alert,
  IconButton,
  Snackbar
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Head from 'next/head';

export default function QrCodeGenerator({ name, description }) {
  const [text, setText] = useState('https://yourdevtools.com');
  const [size, setSize] = useState(200);
  const [errorLevel, setErrorLevel] = useState('M');
  const [foregroundColor, setForegroundColor] = useState('#000000');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const canvasRef = useRef(null);

  // Simple QR code generation using QR.js algorithm (simplified)
  const generateQRCode = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      const ctx = canvas.getContext('2d');
      if (!ctx) return; // Handle test environment where canvas context isn't available
      
      const qrSize = 25; // 25x25 grid for simplicity
      const cellSize = size / qrSize;

      canvas.width = size;
      canvas.height = size;

      // Clear canvas
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, size, size);

      // Create a simple pattern based on text (not a real QR code algorithm)
      // This is a simplified demonstration - real QR codes need proper encoding
      const pattern = generateSimplePattern(text, qrSize);

      ctx.fillStyle = foregroundColor;
      
      for (let row = 0; row < qrSize; row++) {
        for (let col = 0; col < qrSize; col++) {
          if (pattern[row][col]) {
            ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
          }
        }
      }

      // Add finder patterns (corners)
      drawFinderPattern(ctx, 0, 0, cellSize);
      drawFinderPattern(ctx, (qrSize - 7) * cellSize, 0, cellSize);
      drawFinderPattern(ctx, 0, (qrSize - 7) * cellSize, cellSize);
    } catch (error) {
      // Silently handle canvas context errors in test environment
      console.log('Canvas context not available:', error.message);
    }
  };

  const generateSimplePattern = (inputText, size) => {
    // Create a deterministic pattern based on the input text
    // This is NOT a real QR code algorithm, just a visual representation
    const pattern = Array(size).fill().map(() => Array(size).fill(false));
    
    // Create hash from text
    let hash = 0;
    for (let i = 0; i < inputText.length; i++) {
      const char = inputText.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }

    // Use hash to create pattern
    const random = () => {
      hash = (hash * 9301 + 49297) % 233280;
      return hash / 233280;
    };

    // Fill pattern based on hash
    for (let row = 3; row < size - 3; row++) {
      for (let col = 3; col < size - 3; col++) {
        // Skip finder pattern areas
        if ((row < 9 && col < 9) || 
            (row < 9 && col > size - 9) || 
            (row > size - 9 && col < 9)) {
          continue;
        }
        pattern[row][col] = random() > 0.5;
      }
    }

    return pattern;
  };

  const drawFinderPattern = (ctx, x, y, cellSize) => {
    // Draw the finder pattern (7x7 square with specific pattern)
    ctx.fillStyle = foregroundColor;
    
    // Outer 7x7 border
    ctx.fillRect(x, y, 7 * cellSize, 7 * cellSize);
    
    // Inner 5x5 white
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(x + cellSize, y + cellSize, 5 * cellSize, 5 * cellSize);
    
    // Inner 3x3 black
    ctx.fillStyle = foregroundColor;
    ctx.fillRect(x + 2 * cellSize, y + 2 * cellSize, 3 * cellSize, 3 * cellSize);
  };

  const downloadQRCode = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setOpenSnackbar(true);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  useEffect(() => {
    generateQRCode();
  }, [text, size, errorLevel, foregroundColor, backgroundColor]);

  const presetTexts = [
    { label: 'Website URL', value: 'https://yourdevtools.com' },
    { label: 'WiFi Network', value: 'WIFI:T:WPA;S:MyNetwork;P:MyPassword;;' },
    { label: 'Email', value: 'mailto:contact@example.com' },
    { label: 'Phone', value: 'tel:+1234567890' },
    { label: 'SMS', value: 'sms:+1234567890' },
    { label: 'Location', value: 'geo:37.7749,-122.4194' }
  ];

  return (
    <Box sx={{ p: 2 }}>
      <Head>
        <title>{name ? `${name} - Dev Tools` : 'QR Code Generator - Dev Tools'}</title>
        <meta name="description" content={description} />
      </Head>
      
      <Typography variant="h4" gutterBottom>
        {name}
      </Typography>
      <Typography variant="body1" paragraph color="text.secondary">
        {description}
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        <strong>Note:</strong> This is a simplified QR code generator for demonstration. 
        For production use, consider using a proper QR code library that implements the full QR specification.
      </Alert>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          {/* Input Section */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              QR Code Content
            </Typography>
            
            <TextField
              label="Text or URL to encode"
              value={text}
              onChange={(e) => setText(e.target.value)}
              fullWidth
              multiline
              rows={3}
              sx={{ mb: 2 }}
              placeholder="Enter text, URL, or other data to encode"
            />

            {/* Quick Actions */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <IconButton onClick={copyToClipboard} title="Copy text">
                <ContentCopyIcon />
              </IconButton>
              <FormControl size="small" sx={{ minWidth: 200 }}>
                <InputLabel>Quick Fill</InputLabel>
                <Select
                  value=""
                  onChange={(e) => setText(e.target.value)}
                  label="Quick Fill"
                >
                  {presetTexts.map((preset, index) => (
                    <MenuItem key={index} value={preset.value}>
                      {preset.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Paper>

          {/* QR Code Display */}
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Generated QR Code
            </Typography>
            
            <Box sx={{ mb: 2 }}>
              <canvas
                ref={canvasRef}
                style={{
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  maxWidth: '100%',
                  height: 'auto'
                }}
              />
            </Box>

            <Button
              variant="contained"
              startIcon={<DownloadIcon />}
              onClick={downloadQRCode}
              size="large"
            >
              Download QR Code
            </Button>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          {/* Customization */}
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Customization
              </Typography>
              
              {/* Size */}
              <Typography gutterBottom>
                Size: {size}px
              </Typography>
              <Slider
                value={size}
                onChange={(e, newValue) => setSize(newValue)}
                min={100}
                max={500}
                step={10}
                marks={[
                  { value: 100, label: '100px' },
                  { value: 200, label: '200px' },
                  { value: 300, label: '300px' },
                  { value: 500, label: '500px' }
                ]}
                sx={{ mb: 3 }}
              />

              {/* Error Correction Level */}
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Error Correction</InputLabel>
                <Select
                  value={errorLevel}
                  onChange={(e) => setErrorLevel(e.target.value)}
                  label="Error Correction"
                >
                  <MenuItem value="L">Low (~7%)</MenuItem>
                  <MenuItem value="M">Medium (~15%)</MenuItem>
                  <MenuItem value="Q">Quartile (~25%)</MenuItem>
                  <MenuItem value="H">High (~30%)</MenuItem>
                </Select>
              </FormControl>

              {/* Colors */}
              <Grid container spacing={2}>
                <Grid size={6}>
                  <Typography variant="subtitle2" gutterBottom>
                    Foreground Color
                  </Typography>
                  <input
                    type="color"
                    value={foregroundColor}
                    onChange={(e) => setForegroundColor(e.target.value)}
                    style={{
                      width: '100%',
                      height: '40px',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  />
                </Grid>
                <Grid size={6}>
                  <Typography variant="subtitle2" gutterBottom>
                    Background Color
                  </Typography>
                  <input
                    type="color"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    style={{
                      width: '100%',
                      height: '40px',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Usage Guide */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                QR Code Types
              </Typography>
              
              <Typography variant="subtitle2" gutterBottom>
                Common Formats:
              </Typography>
              
              <Typography variant="body2" paragraph>
                <strong>URL:</strong> https://example.com
              </Typography>
              
              <Typography variant="body2" paragraph>
                <strong>WiFi:</strong> WIFI:T:WPA;S:NetworkName;P:Password;;
              </Typography>
              
              <Typography variant="body2" paragraph>
                <strong>Email:</strong> mailto:name@example.com
              </Typography>
              
              <Typography variant="body2" paragraph>
                <strong>Phone:</strong> tel:+1234567890
              </Typography>
              
              <Typography variant="body2" paragraph>
                <strong>SMS:</strong> sms:+1234567890:Message
              </Typography>
              
              <Typography variant="body2">
                <strong>Location:</strong> geo:latitude,longitude
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
        message="Text copied to clipboard!"
      />
    </Box>
  );
}
