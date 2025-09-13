import React, { useState, useCallback, useMemo, useRef } from 'react';
import {
  Typography,
  Box,
  IconButton,
  Snackbar,
  Paper,
  Grid,
  Button,
  Card,
  CardContent,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tabs,
  Tab,
  Slider,
  LinearProgress
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import DownloadIcon from '@mui/icons-material/Download';
import ImageIcon from '@mui/icons-material/Image';
import CompressIcon from '@mui/icons-material/Compress';
import InfoIcon from '@mui/icons-material/Info';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// SVGO will be loaded dynamically to avoid server-side issues
import Head from 'next/head';

const ImagePreview = ({ src, alt, title, maxHeight = 300 }) => {
  const [zoom, setZoom] = useState(1);
  
  if (!src) {
    return (
      <Paper 
        sx={{ 
          height: maxHeight, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          backgroundColor: 'grey.100',
          color: 'text.secondary'
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <ImageIcon sx={{ fontSize: 48, mb: 1 }} />
          <Typography variant="body2">No image loaded</Typography>
        </Box>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 1, backgroundColor: 'grey.50' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography variant="subtitle2">{title}</Typography>
        <Box>
          <IconButton size="small" onClick={() => setZoom(z => Math.max(0.1, z - 0.1))}>
            <ZoomOutIcon />
          </IconButton>
          <Typography variant="caption" sx={{ mx: 1 }}>{Math.round(zoom * 100)}%</Typography>
          <IconButton size="small" onClick={() => setZoom(z => Math.min(3, z + 0.1))}>
            <ZoomInIcon />
          </IconButton>
        </Box>
      </Box>
      <Box 
        sx={{ 
          height: maxHeight, 
          overflow: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
          border: 1,
          borderColor: 'divider'
        }}
      >
        <img
          src={src}
          alt={alt}
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            transform: `scale(${zoom})`,
            transition: 'transform 0.2s ease'
          }}
        />
      </Box>
    </Paper>
  );
};

const ConversionOptions = ({ onConvert, originalFormat, disabled }) => {
  const [targetFormat, setTargetFormat] = useState('webp');
  const [quality, setQuality] = useState(85);
  const [progressive, setProgressive] = useState(true);

  const supportedFormats = [
    { value: 'webp', label: 'WebP', description: 'Best compression, modern browsers' },
    { value: 'jpeg', label: 'JPEG', description: 'Universal support, lossy' },
    { value: 'png', label: 'PNG', description: 'Lossless, transparency support' },
    { value: 'avif', label: 'AVIF', description: 'Next-gen format, excellent compression' }
  ];

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          <CompressIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
          Conversion Options
        </Typography>
        
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl fullWidth>
              <InputLabel>Target Format</InputLabel>
              <Select
                value={targetFormat}
                onChange={(e) => setTargetFormat(e.target.value)}
                label="Target Format"
              >
                {supportedFormats.map(format => (
                  <MenuItem key={format.value} value={format.value}>
                    {format.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="body2" gutterBottom>
              Quality: {quality}%
            </Typography>
            <Slider
              value={quality}
              onChange={(e, value) => setQuality(value)}
              min={1}
              max={100}
              step={1}
              disabled={targetFormat === 'png'}
            />
          </Grid>
          
          <Grid size={{ xs: 12 }}>
            <Alert severity="info" sx={{ mb: 2 }}>
              <strong>{supportedFormats.find(f => f.value === targetFormat)?.label}:</strong>{' '}
              {supportedFormats.find(f => f.value === targetFormat)?.description}
            </Alert>
          </Grid>
          
          <Grid size={{ xs: 12 }}>
            <Button
              variant="contained"
              onClick={() => onConvert({ format: targetFormat, quality, progressive })}
              disabled={disabled}
              fullWidth
            >
              Convert to {targetFormat.toUpperCase()}
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

const SVGOptimizer = ({ svgContent, onOptimize }) => {
  const [optimizationLevel, setOptimizationLevel] = useState('balanced');
  const [customOptions, setCustomOptions] = useState(false);
  
  const optimizationPresets = {
    minimal: {
      name: 'Minimal',
      description: 'Basic optimization, preserves most attributes',
      plugins: ['removeDoctype', 'removeComments', 'removeMetadata']
    },
    balanced: {
      name: 'Balanced',
      description: 'Good compression with safe optimizations',
      plugins: ['preset-default']
    },
    aggressive: {
      name: 'Aggressive',
      description: 'Maximum compression, may affect appearance',
      plugins: ['preset-default', 'removeViewBox', 'removeDimensions']
    }
  };

  const handleOptimize = () => {
    try {
      // Basic SVG optimization without external dependencies
      let optimized = svgContent;
      
      // Remove comments
      optimized = optimized.replace(/<!--[\s\S]*?-->/g, '');
      
      // Remove excessive whitespace
      optimized = optimized.replace(/\s+/g, ' ');
      
      // Remove whitespace around tag brackets
      optimized = optimized.replace(/>\s+</g, '><');
      
      // Trim
      optimized = optimized.trim();
      
      // Apply different levels of optimization
      if (optimizationLevel === 'aggressive') {
        // Remove some optional attributes
        optimized = optimized.replace(/\s*version="[^"]*"/g, '');
        optimized = optimized.replace(/\s*xmlns:xlink="[^"]*"/g, '');
      }
      
      const originalSize = new Blob([svgContent]).size;
      const optimizedSize = new Blob([optimized]).size;
      const savings = originalSize > 0 ? ((originalSize - optimizedSize) / originalSize * 100) : 0;
      
      onOptimize(optimized, {
        originalSize,
        optimizedSize,
        savings: savings.toFixed(1)
      });
    } catch (error) {
      console.error('SVG optimization failed:', error);
      // Fallback: just return the original content
      onOptimize(svgContent, {
        originalSize: new Blob([svgContent]).size,
        optimizedSize: new Blob([svgContent]).size,
        savings: 0
      });
    }
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          SVG Optimization
        </Typography>
        
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Optimization Level</InputLabel>
          <Select
            value={optimizationLevel}
            onChange={(e) => setOptimizationLevel(e.target.value)}
            label="Optimization Level"
          >
            {Object.entries(optimizationPresets).map(([key, preset]) => (
              <MenuItem key={key} value={key}>
                {preset.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        
        <Alert severity="info" sx={{ mb: 2 }}>
          <strong>{optimizationPresets[optimizationLevel].name}:</strong>{' '}
          {optimizationPresets[optimizationLevel].description}
        </Alert>
        
        <Button
          variant="contained"
          onClick={handleOptimize}
          disabled={!svgContent}
          fullWidth
        >
          Optimize SVG
        </Button>
      </CardContent>
    </Card>
  );
};

export default function ImageOptimizer({ name, description }) {
  const [currentTab, setCurrentTab] = useState(0);
  const [originalFile, setOriginalFile] = useState(null);
  const [originalImage, setOriginalImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [fileHistory, setFileHistory] = useState([]);
  const [svgContent, setSvgContent] = useState('');
  const [optimizedSvg, setOptimizedSvg] = useState('');
  const [optimizationStats, setOptimizationStats] = useState(null);
  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);

  const fileStats = useMemo(() => {
    if (!originalFile) return null;
    
    return {
      name: originalFile.name,
      size: originalFile.size,
      type: originalFile.type,
      lastModified: new Date(originalFile.lastModified).toLocaleDateString(),
      dimensions: originalImage ? `${originalImage.naturalWidth} × ${originalImage.naturalHeight}` : 'Unknown'
    };
  }, [originalFile, originalImage]);

  const compressionStats = useMemo(() => {
    if (!originalFile || !processedImage) return null;
    
    // Convert data URL to blob to get size
    const [header, data] = processedImage.split(',');
    const binary = atob(data);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    const processedSize = bytes.length;
    
    const savings = ((originalFile.size - processedSize) / originalFile.size * 100);
    const ratio = (processedSize / originalFile.size);
    
    return {
      originalSize: originalFile.size,
      processedSize,
      savings: savings.toFixed(1),
      ratio: ratio.toFixed(2)
    };
  }, [originalFile, processedImage]);

  const handleFileUpload = useCallback((event) => {
    const file = event.target.files[0];
    if (!file) return;

    setOriginalFile(file);
    setProcessedImage(null);
    
    // Check if it's an SVG file by type or extension
    const isSvgFile = file.type === 'image/svg+xml' || 
                     file.type === 'text/xml' || 
                     file.name.toLowerCase().endsWith('.svg');
    
    if (isSvgFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        setSvgContent(content);
        setOriginalImage(null);
        
        // Switch to SVG Optimizer tab automatically
        setCurrentTab(1);
      };
      reader.readAsText(file);
    } else {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          setOriginalImage({
            src: e.target.result,
            naturalWidth: img.naturalWidth,
            naturalHeight: img.naturalHeight
          });
          setSvgContent('');
          
          // Stay on Image Converter tab
          setCurrentTab(0);
        };
        img.onerror = () => {
          console.error('Failed to load image');
          setOriginalImage(null);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
    
    // Clear the file input value to allow re-uploading the same file
    event.target.value = '';
  }, []);

  const convertImage = useCallback(async ({ format, quality, progressive }) => {
    if (!originalImage || !canvasRef.current) return;
    
    setProcessing(true);
    
    try {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        ctx.drawImage(img, 0, 0);
        
        let mimeType;
        let qualityValue = quality / 100;
        
        switch (format) {
          case 'webp':
            mimeType = 'image/webp';
            break;
          case 'jpeg':
            mimeType = 'image/jpeg';
            break;
          case 'png':
            mimeType = 'image/png';
            qualityValue = undefined; // PNG doesn't use quality
            break;
          case 'avif':
            mimeType = 'image/avif';
            break;
          default:
            mimeType = 'image/jpeg';
        }
        
        const dataURL = canvas.toDataURL(mimeType, qualityValue);
        setProcessedImage(dataURL);
        setProcessing(false);
      };
      
      img.src = originalImage.src;
    } catch (error) {
      console.error('Image conversion failed:', error);
      setProcessing(false);
    }
  }, [originalImage]);

  const handleSvgOptimization = useCallback((optimized, stats) => {
    setOptimizedSvg(optimized);
    setOptimizationStats(stats);
  }, []);

  const downloadFile = useCallback((content, filename, mimeType) => {
    let blob;
    
    if (mimeType === 'image/svg+xml') {
      blob = new Blob([content], { type: mimeType });
    } else {
      // Convert data URL to blob
      const [header, data] = content.split(',');
      const binary = atob(data);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      blob = new Blob([bytes], { type: mimeType });
    }
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, []);

  const copyToClipboard = async (content) => {
    try {
      await navigator.clipboard.writeText(content);
      setOpenSnackbar(true);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const supportedFormats = [
    'image/jpeg', 'image/jpg', 'image/png', 'image/webp', 
    'image/svg+xml', 'image/gif', 'image/bmp'
  ];

  return (
    <Box sx={{ p: 2 }}>
      <Head>
        <title>{name ? `${name} - Dev Tools` : 'Image Optimizer & Converter - Dev Tools'}</title>
        <meta name="description" content={description} />
      </Head>
      
      <Typography variant="h4" gutterBottom>
        {name}
      </Typography>
      <Typography variant="body1" paragraph color="text.secondary">
        {description}
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        <strong>Professional Image Tool:</strong> Optimize SVGs, convert between formats, 
        compress images, and analyze file properties with advanced options.
      </Alert>

      <Tabs value={currentTab} onChange={(e, newValue) => setCurrentTab(newValue)} sx={{ mb: 3 }}>
        <Tab label="Image Converter" />
        <Tab label="SVG Optimizer" />
        <Tab label="Batch Processing" />
      </Tabs>

      {/* Hidden canvas for image processing */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          {currentTab === 0 && (
            <>
              {/* File Upload */}
              <Paper sx={{ p: 3, mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6">
                    Image Upload
                  </Typography>
                  <Box>
                    <input
                      accept={supportedFormats.join(',')}
                      style={{ display: 'none' }}
                      id="file-upload"
                      type="file"
                      onChange={handleFileUpload}
                      ref={fileInputRef}
                    />
                    <label htmlFor="file-upload">
                      <Button
                        component="span"
                        variant="outlined"
                        startIcon={<FileUploadIcon />}
                      >
                        Select Image
                      </Button>
                    </label>
                  </Box>
                </Box>
                
                {!originalFile && (
                  <Box
                    sx={{
                      border: 2,
                      borderColor: 'primary.main',
                      borderStyle: 'dashed',
                      borderRadius: 2,
                      p: 4,
                      textAlign: 'center',
                      backgroundColor: 'action.hover',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        borderColor: 'primary.dark',
                        backgroundColor: 'action.selected'
                      }
                    }}
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={(e) => {
                      e.preventDefault();
                      e.currentTarget.style.borderColor = '#1976d2';
                      e.currentTarget.style.backgroundColor = '#e3f2fd';
                    }}
                    onDragLeave={(e) => {
                      e.preventDefault();
                      e.currentTarget.style.borderColor = '#1976d2';
                      e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.04)';
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      e.currentTarget.style.borderColor = '#1976d2';
                      e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.04)';
                      
                      const files = e.dataTransfer.files;
                      if (files.length > 0) {
                        const file = files[0];
                        // Create a fake event object for handleFileUpload
                        const fakeEvent = {
                          target: { files: [file], value: '' }
                        };
                        handleFileUpload(fakeEvent);
                      }
                    }}
                  >
                    <CloudUploadIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                    <Typography variant="h6" gutterBottom>
                      Drop an image here or click to select
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Supports: JPEG, PNG, WebP, SVG, GIF, BMP (Max 10MB)
                    </Typography>
                  </Box>
                )}
                
                {originalFile && (
                  <Alert severity="success" sx={{ mt: 2 }}>
                    <Typography variant="body2">
                      <strong>File loaded:</strong> {originalFile.name} ({(originalFile.size / 1024).toFixed(1)} KB)
                    </Typography>
                  </Alert>
                )}
              </Paper>

              {originalFile && originalFile.type !== 'image/svg+xml' && (
                <>
                  {/* Image Preview */}
                  <Paper sx={{ p: 3, mb: 3 }}>
                    <Typography variant="h6" gutterBottom>
                      Image Preview
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <ImagePreview
                          src={originalImage?.src}
                          alt="Original"
                          title="Original Image"
                        />
                      </Grid>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <ImagePreview
                          src={processedImage}
                          alt="Processed"
                          title="Processed Image"
                        />
                        {processing && (
                          <Box sx={{ mt: 2 }}>
                            <LinearProgress />
                            <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
                              Processing image...
                            </Typography>
                          </Box>
                        )}
                      </Grid>
                    </Grid>
                  </Paper>

                  {/* Download Options */}
                  {processedImage && (
                    <Paper sx={{ p: 3, mb: 3 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h6">
                          Download Processed Image
                        </Typography>
                        <Button
                          variant="contained"
                          startIcon={<DownloadIcon />}
                          onClick={() => {
                            const format = processedImage.split(';')[0].split(':')[1];
                            const extension = format.split('/')[1];
                            downloadFile(
                              processedImage, 
                              `optimized.${extension}`, 
                              format
                            );
                          }}
                        >
                          Download
                        </Button>
                      </Box>
                      
                      {compressionStats && (
                        <Alert severity="success">
                          <Typography variant="subtitle2">Optimization Results:</Typography>
                          <Typography variant="body2">
                            Size reduced by {compressionStats.savings}% 
                            ({(compressionStats.originalSize / 1024).toFixed(1)}KB → {(compressionStats.processedSize / 1024).toFixed(1)}KB)
                          </Typography>
                        </Alert>
                      )}
                    </Paper>
                  )}
                </>
              )}
            </>
          )}

          {currentTab === 1 && (
            <>
              {/* SVG Content */}
              <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  SVG Content
                </Typography>
                
                {svgContent ? (
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Typography variant="subtitle2" gutterBottom>
                        Original SVG
                      </Typography>
                      <Box
                        sx={{
                          border: 1,
                          borderColor: 'divider',
                          borderRadius: 1,
                          p: 2,
                          height: 300,
                          overflow: 'auto',
                          backgroundColor: 'white'
                        }}
                        dangerouslySetInnerHTML={{ __html: svgContent }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Typography variant="subtitle2" gutterBottom>
                        Optimized SVG
                      </Typography>
                      <Box
                        sx={{
                          border: 1,
                          borderColor: 'divider',
                          borderRadius: 1,
                          p: 2,
                          height: 300,
                          overflow: 'auto',
                          backgroundColor: 'white'
                        }}
                        dangerouslySetInnerHTML={{ __html: optimizedSvg || 'No optimization yet' }}
                      />
                    </Grid>
                  </Grid>
                ) : (
                  <Alert severity="info">
                    Upload an SVG file to begin optimization
                  </Alert>
                )}
              </Paper>

              {/* SVG Code */}
              {optimizedSvg && (
                <Paper sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6">
                      Optimized SVG Code
                    </Typography>
                    <Box>
                      <IconButton onClick={() => copyToClipboard(optimizedSvg)}>
                        <ContentCopyIcon />
                      </IconButton>
                      <IconButton onClick={() => downloadFile(optimizedSvg, 'optimized.svg', 'image/svg+xml')}>
                        <DownloadIcon />
                      </IconButton>
                    </Box>
                  </Box>
                  <TextField
                    fullWidth
                    multiline
                    rows={10}
                    value={optimizedSvg}
                    InputProps={{
                      readOnly: true,
                      style: {
                        fontFamily: 'monospace',
                        fontSize: '12px'
                      }
                    }}
                  />
                  
                  {optimizationStats && (
                    <Alert severity="success" sx={{ mt: 2 }}>
                      <Typography variant="subtitle2">Optimization Results:</Typography>
                      <Typography variant="body2">
                        Size reduced by {optimizationStats.savings}% 
                        ({(optimizationStats.originalSize / 1024).toFixed(1)}KB → {(optimizationStats.optimizedSize / 1024).toFixed(1)}KB)
                      </Typography>
                    </Alert>
                  )}
                </Paper>
              )}
            </>
          )}

          {currentTab === 2 && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Batch Processing
              </Typography>
              <Alert severity="info">
                <Typography variant="subtitle2">Coming Soon!</Typography>
                <Typography variant="body2">
                  Batch processing for multiple images will be available in the next update.
                  Features will include:
                </Typography>
                <ul>
                  <li>Upload multiple images at once</li>
                  <li>Apply same optimization settings to all</li>
                  <li>Download as ZIP archive</li>
                  <li>Progress tracking</li>
                </ul>
              </Alert>
            </Paper>
          )}
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          {/* File Information */}
          {fileStats && (
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <InfoIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                  File Information
                </Typography>
                <TableContainer>
                  <Table size="small">
                    <TableBody>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>{fileStats.name}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Size</TableCell>
                        <TableCell>{(fileStats.size / 1024).toFixed(1)} KB</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Type</TableCell>
                        <TableCell>{fileStats.type}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Dimensions</TableCell>
                        <TableCell>{fileStats.dimensions}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Modified</TableCell>
                        <TableCell>{fileStats.lastModified}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          )}

          {/* Conversion Options */}
          {originalFile && originalFile.type !== 'image/svg+xml' && (
            <ConversionOptions
              onConvert={convertImage}
              originalFormat={originalFile.type}
              disabled={processing}
            />
          )}

          {/* SVG Optimization */}
          {svgContent && (
            <SVGOptimizer
              svgContent={svgContent}
              onOptimize={handleSvgOptimization}
            />
          )}

          {/* Format Guide */}
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Format Guide
              </Typography>
              
              <Typography variant="subtitle2" gutterBottom>
                <strong>WebP:</strong> Modern format
              </Typography>
              <Typography variant="body2" paragraph>
                • 25-35% smaller than JPEG
                • Supports transparency
                • Excellent for web use
              </Typography>
              
              <Typography variant="subtitle2" gutterBottom>
                <strong>AVIF:</strong> Next-generation
              </Typography>
              <Typography variant="body2" paragraph>
                • Up to 50% smaller than JPEG
                • Excellent quality
                • Limited browser support
              </Typography>
              
              <Typography variant="subtitle2" gutterBottom>
                <strong>JPEG:</strong> Universal
              </Typography>
              <Typography variant="body2" paragraph>
                • Best for photos
                • Universal support
                • Lossy compression
              </Typography>
              
              <Typography variant="subtitle2" gutterBottom>
                <strong>PNG:</strong> Lossless
              </Typography>
              <Typography variant="body2">
                • Perfect for graphics
                • Transparency support
                • Larger file sizes
              </Typography>
            </CardContent>
          </Card>

          {/* Tips */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Optimization Tips
              </Typography>
              
              <Typography variant="body2" paragraph>
                • Use WebP for modern web applications
              </Typography>
              <Typography variant="body2" paragraph>
                • Quality 80-85% often provides best balance
              </Typography>
              <Typography variant="body2" paragraph>
                • SVG optimization can reduce size by 20-60%
              </Typography>
              <Typography variant="body2" paragraph>
                • Consider progressive JPEG for large images
              </Typography>
              <Typography variant="body2">
                • Test different formats for your use case
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
