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
  Snackbar,
  ToggleButtonGroup,
  ToggleButton,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Divider
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import QrCodeIcon from '@mui/icons-material/QrCode';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import PrintIcon from '@mui/icons-material/Print';
import BatchPredictionIcon from '@mui/icons-material/BatchPrediction';
import InfoIcon from '@mui/icons-material/Info';
import Head from 'next/head';
import QRCode from 'qrcode';

export default function QrCodeGenerator({ name, description }) {
  const [text, setText] = useState('https://yourdevtools.com');
  const [size, setSize] = useState(200);
  const [errorLevel, setErrorLevel] = useState('M');
  const [foregroundColor, setForegroundColor] = useState('#000000');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [margin, setMargin] = useState(4);
  const [outputFormat, setOutputFormat] = useState('png');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  const [batchTexts, setBatchTexts] = useState('');
  const [batchResults, setBatchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [qrSvg, setQrSvg] = useState('');
  const canvasRef = useRef(null);

  // Real QR code generation using qrcode library
  const generateQRCode = async () => {
    if (!text.trim()) return;

    try {
      setLoading(true);
      
      const options = {
        errorCorrectionLevel: errorLevel,
        width: size,
        margin: margin,
        color: {
          dark: foregroundColor,
          light: backgroundColor
        }
      };

      // Generate canvas version
      const canvas = canvasRef.current;
      if (canvas) {
        await QRCode.toCanvas(canvas, text, options);
      }

      // Generate data URL for easy copying/saving
      const dataUrl = await QRCode.toDataURL(text, options);
      setQrDataUrl(dataUrl);

      // Generate SVG for vector format
      const svg = await QRCode.toString(text, { 
        ...options, 
        type: 'svg',
        width: size 
      });
      setQrSvg(svg);

    } catch (error) {
      console.error('QR Code generation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const downloadQRCode = (format = outputFormat) => {
    const canvas = canvasRef.current;
    if (!canvas && format === 'png') return;

    if (format === 'svg' && qrSvg) {
      const blob = new Blob([qrSvg], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = 'qrcode.svg';
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
    } else if (format === 'png' && canvas) {
      const link = document.createElement('a');
      link.download = 'qrcode.png';
      link.href = canvas.toDataURL();
      link.click();
    } else if (format === 'pdf') {
      // For PDF, we'll use the canvas data
      const link = document.createElement('a');
      link.download = 'qrcode-data.txt';
      link.href = `data:text/plain;charset=utf-8,${encodeURIComponent(qrDataUrl)}`;
      link.click();
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setOpenSnackbar(true);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const generateBatch = async () => {
    if (!batchTexts.trim()) return;
    
    setLoading(true);
    const lines = batchTexts.split('\n').filter(line => line.trim());
    const results = [];

    for (const line of lines) {
      try {
        const dataUrl = await QRCode.toDataURL(line.trim(), {
          errorCorrectionLevel: errorLevel,
          width: 150,
          margin: margin,
          color: {
            dark: foregroundColor,
            light: backgroundColor
          }
        });
        results.push({ text: line.trim(), dataUrl, success: true });
      } catch (error) {
        results.push({ text: line.trim(), error: error.message, success: false });
      }
    }

    setBatchResults(results);
    setLoading(false);
  };

  const downloadBatch = () => {
    batchResults.forEach((result, index) => {
      if (result.success) {
        const link = document.createElement('a');
        link.download = `qrcode-${index + 1}.png`;
        link.href = result.dataUrl;
        link.click();
      }
    });
  };

  const printQRCode = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>QR Code</title>
          <style>
            body { margin: 0; padding: 20px; text-align: center; }
            img { max-width: 100%; height: auto; }
            .info { margin-top: 20px; font-family: Arial, sans-serif; }
          </style>
        </head>
        <body>
          <img src="${canvas.toDataURL()}" alt="QR Code" />
          <div class="info">
            <p><strong>Content:</strong> ${text}</p>
            <p><strong>Size:</strong> ${size}px</p>
            <p><strong>Error Correction:</strong> ${errorLevel}</p>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  useEffect(() => {
    generateQRCode();
  }, [text, size, errorLevel, foregroundColor, backgroundColor, margin]);

  const presetTexts = [
    { 
      category: 'Web & Social',
      items: [
        { label: 'Website URL', value: 'https://yourdevtools.com' },
        { label: 'YouTube Video', value: 'https://youtube.com/watch?v=dQw4w9WgXcQ' },
        { label: 'Social Profile', value: 'https://twitter.com/username' },
        { label: 'App Store Link', value: 'https://apps.apple.com/app/appname/id123456789' }
      ]
    },
    {
      category: 'Contact & Communication', 
      items: [
        { label: 'Email', value: 'mailto:contact@example.com?subject=Hello&body=Hi there!' },
        { label: 'Phone Call', value: 'tel:+1234567890' },
        { label: 'SMS Message', value: 'sms:+1234567890?body=Hello from QR code!' },
        { label: 'WhatsApp', value: 'https://wa.me/1234567890?text=Hello' }
      ]
    },
    {
      category: 'Network & Location',
      items: [
        { label: 'WiFi Network', value: 'WIFI:T:WPA;S:MyNetwork;P:MyPassword;H:false;' },
        { label: 'Location (GPS)', value: 'geo:37.7749,-122.4194' },
        { label: 'Google Maps', value: 'https://maps.google.com/maps?q=37.7749,-122.4194' }
      ]
    },
    {
      category: 'Business & Events',
      items: [
        { 
          label: 'vCard Contact', 
          value: 'BEGIN:VCARD\nVERSION:3.0\nFN:John Doe\nORG:Company Inc\nTEL:+1234567890\nEMAIL:john@company.com\nURL:https://company.com\nEND:VCARD' 
        },
        { 
          label: 'Calendar Event', 
          value: 'BEGIN:VEVENT\nSUMMARY:Meeting\nDTSTART:20241201T100000Z\nDTEND:20241201T110000Z\nLOCATION:Office\nEND:VEVENT' 
        },
        { label: 'PayPal Payment', value: 'https://paypal.me/username/25.00' },
        { label: 'Bitcoin Address', value: 'bitcoin:1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa?amount=0.001' }
      ]
    }
  ];

  const formatInfo = {
    png: { name: 'PNG', description: 'Best for web use, supports transparency' },
    svg: { name: 'SVG', description: 'Vector format, scales perfectly at any size' },
    pdf: { name: 'PDF Data', description: 'Data URL for PDF generation' }
  };

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

      <Alert severity="success" sx={{ mb: 3 }}>
        <strong>Professional QR Generator:</strong> Uses industry-standard QR code library with full specification compliance. 
        Supports all QR code features including error correction, custom colors, and multiple output formats.
      </Alert>

      <Tabs value={currentTab} onChange={(e, newValue) => setCurrentTab(newValue)} sx={{ mb: 3 }}>
        <Tab label="Single QR Code" />
        <Tab label="Batch Generation" />
      </Tabs>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          {currentTab === 0 && (
            <>
              {/* Single QR Code Input */}
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
                  <Button 
                    variant="outlined" 
                    size="small"
                    onClick={() => setOpenDialog(true)}
                  >
                    Browse Templates
                  </Button>
                </Box>
              </Paper>
            </>
          )}

          {currentTab === 1 && (
            <>
              {/* Batch Generation */}
              <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  <BatchPredictionIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                  Batch QR Code Generation
                </Typography>
                
                <TextField
                  label="Multiple texts (one per line)"
                  value={batchTexts}
                  onChange={(e) => setBatchTexts(e.target.value)}
                  fullWidth
                  multiline
                  rows={6}
                  sx={{ mb: 2 }}
                  placeholder="Enter multiple texts, URLs, or data (one per line)&#10;https://example1.com&#10;https://example2.com&#10;Hello World&#10;Contact: john@example.com"
                />

                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                  <Button
                    variant="contained"
                    onClick={generateBatch}
                    disabled={loading || !batchTexts.trim()}
                    startIcon={loading ? <CircularProgress size={20} /> : <BatchPredictionIcon />}
                  >
                    Generate Batch
                  </Button>
                  {batchResults.length > 0 && (
                    <Button
                      variant="outlined"
                      onClick={downloadBatch}
                      startIcon={<DownloadIcon />}
                    >
                      Download All ({batchResults.filter(r => r.success).length})
                    </Button>
                  )}
                </Box>

                {batchResults.length > 0 && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle1" gutterBottom>
                      Generated QR Codes: {batchResults.filter(r => r.success).length} successful, {batchResults.filter(r => !r.success).length} failed
                    </Typography>
                    <Grid container spacing={2}>
                      {batchResults.map((result, index) => (
                        <Grid size={{ xs: 6, sm: 4, md: 3 }} key={index}>
                          <Card sx={{ textAlign: 'center', p: 1 }}>
                            {result.success ? (
                              <>
                                <img 
                                  src={result.dataUrl} 
                                  alt={`QR ${index + 1}`}
                                  style={{ width: '100%', maxWidth: 120, height: 'auto' }}
                                />
                                <Typography variant="caption" display="block" sx={{ mt: 1, wordBreak: 'break-all' }}>
                                  {result.text.length > 30 ? result.text.substring(0, 30) + '...' : result.text}
                                </Typography>
                              </>
                            ) : (
                              <Box sx={{ p: 2 }}>
                                <Typography color="error" variant="caption">
                                  Error: {result.error}
                                </Typography>
                              </Box>
                            )}
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                )}
              </Paper>
            </>
          )}

          {/* QR Code Display - Only show for single mode */}
          {currentTab === 0 && (
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>
                Generated QR Code
              </Typography>
              
              <Box sx={{ mb: 2, position: 'relative' }}>
                {loading && (
                  <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1 }}>
                    <CircularProgress />
                  </Box>
                )}
                <canvas
                  ref={canvasRef}
                  style={{
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    maxWidth: '100%',
                    height: 'auto',
                    opacity: loading ? 0.5 : 1
                  }}
                />
              </Box>

              <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  startIcon={<DownloadIcon />}
                  onClick={() => downloadQRCode()}
                  disabled={loading}
                >
                  Download {formatInfo[outputFormat].name}
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<PrintIcon />}
                  onClick={printQRCode}
                  disabled={loading}
                >
                  Print
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<ContentCopyIcon />}
                  onClick={copyToClipboard}
                >
                  Copy Text
                </Button>
              </Box>
            </Paper>
          )}
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          {/* Customization */}
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Customization
              </Typography>
              
              {/* Output Format */}
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Output Format</InputLabel>
                <Select
                  value={outputFormat}
                  onChange={(e) => setOutputFormat(e.target.value)}
                  label="Output Format"
                >
                  <MenuItem value="png">PNG - {formatInfo.png.description}</MenuItem>
                  <MenuItem value="svg">SVG - {formatInfo.svg.description}</MenuItem>
                  <MenuItem value="pdf">PDF Data - {formatInfo.pdf.description}</MenuItem>
                </Select>
              </FormControl>
              
              {/* Size */}
              <Typography gutterBottom>
                Size: {size}px
              </Typography>
              <Slider
                value={size}
                onChange={(e, newValue) => setSize(newValue)}
                min={100}
                max={800}
                step={10}
                marks={[
                  { value: 100, label: '100px' },
                  { value: 200, label: '200px' },
                  { value: 400, label: '400px' },
                  { value: 800, label: '800px' }
                ]}
                sx={{ mb: 3 }}
              />

              {/* Margin */}
              <Typography gutterBottom>
                Margin: {margin} modules
              </Typography>
              <Slider
                value={margin}
                onChange={(e, newValue) => setMargin(newValue)}
                min={0}
                max={10}
                step={1}
                marks={[
                  { value: 0, label: '0' },
                  { value: 4, label: '4' },
                  { value: 10, label: '10' }
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
                  <MenuItem value="L">Low (~7%) - More data capacity</MenuItem>
                  <MenuItem value="M">Medium (~15%) - Balanced</MenuItem>
                  <MenuItem value="Q">Quartile (~25%) - Good reliability</MenuItem>
                  <MenuItem value="H">High (~30%) - Maximum reliability</MenuItem>
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

          {/* QR Code Info */}
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <InfoIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                QR Code Information
              </Typography>
              
              {text && (
                <TableContainer>
                  <Table size="small">
                    <TableBody>
                      <TableRow>
                        <TableCell><strong>Content Length</strong></TableCell>
                        <TableCell>{text.length} characters</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>Error Correction</strong></TableCell>
                        <TableCell>{errorLevel} ({
                          errorLevel === 'L' ? '~7%' :
                          errorLevel === 'M' ? '~15%' :
                          errorLevel === 'Q' ? '~25%' : '~30%'
                        })</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>Output Size</strong></TableCell>
                        <TableCell>{size}×{size}px</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>Format</strong></TableCell>
                        <TableCell>{formatInfo[outputFormat].name}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </CardContent>
          </Card>

          {/* Usage Guide */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                QR Code Types & Formats
              </Typography>
              
              <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
                Quick Reference:
              </Typography>
              
              <Typography variant="body2" paragraph>
                <strong>URL:</strong> https://example.com
              </Typography>
              
              <Typography variant="body2" paragraph>
                <strong>WiFi:</strong> WIFI:T:WPA;S:NetworkName;P:Password;H:false;
              </Typography>
              
              <Typography variant="body2" paragraph>
                <strong>Email:</strong> mailto:name@example.com?subject=Hello
              </Typography>
              
              <Typography variant="body2" paragraph>
                <strong>Phone:</strong> tel:+1234567890
              </Typography>
              
              <Typography variant="body2" paragraph>
                <strong>SMS:</strong> sms:+1234567890?body=Message
              </Typography>
              
              <Typography variant="body2" paragraph>
                <strong>Location:</strong> geo:37.7749,-122.4194
              </Typography>

              <Typography variant="body2" paragraph>
                <strong>vCard:</strong> BEGIN:VCARD...END:VCARD
              </Typography>

              <Typography variant="body2">
                <strong>Event:</strong> BEGIN:VEVENT...END:VEVENT
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Template Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>QR Code Templates</DialogTitle>
        <DialogContent>
          {presetTexts.map((category, categoryIndex) => (
            <Box key={categoryIndex} sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom color="primary">
                {category.category}
              </Typography>
              <List dense>
                {category.items.map((preset, index) => (
                  <ListItem key={index} disablePadding>
                    <ListItemButton 
                      onClick={() => {
                        setText(preset.value);
                        setOpenDialog(false);
                      }}
                    >
                      <ListItemText
                        primary={preset.label}
                        secondary={
                          <Typography 
                            variant="caption" 
                            sx={{ fontFamily: 'monospace', display: 'block', mt: 0.5 }}
                          >
                            {preset.value.length > 80 ? 
                              preset.value.substring(0, 80) + '...' : 
                              preset.value
                            }
                          </Typography>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
              {categoryIndex < presetTexts.length - 1 && <Divider sx={{ mt: 2 }} />}
            </Box>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
        message="Text copied to clipboard!"
      />
    </Box>
  );
}
