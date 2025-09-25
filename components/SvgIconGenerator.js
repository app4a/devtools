import React, { useState, useRef, useEffect, useCallback } from 'react';
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
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Divider,
  Tooltip,
  Switch,
  FormControlLabel,
  AccordionSummary,
  AccordionDetails,
  Accordion
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CreateIcon from '@mui/icons-material/Create';
import PaletteIcon from '@mui/icons-material/Palette';
import CodeIcon from '@mui/icons-material/Code';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import ClearIcon from '@mui/icons-material/Clear';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import SaveIcon from '@mui/icons-material/Save';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import CircleIcon from '@mui/icons-material/Circle';
import RectangleIcon from '@mui/icons-material/Rectangle';
import Head from 'next/head';

export default function SvgIconGenerator({ name, description }) {
  const [currentTab, setCurrentTab] = useState(0);
  const [svgContent, setSvgContent] = useState('<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7v10l10 5 10-5V7l-10-5z"/></svg>');
  const [iconSize, setIconSize] = useState(24);
  const [strokeWidth, setStrokeWidth] = useState(1.5);
  const [fillColor, setFillColor] = useState('#000000');
  const [strokeColor, setStrokeColor] = useState('#000000');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [currentTool, setCurrentTool] = useState('select');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [exportFormat, setExportFormat] = useState('svg');
  const [componentName, setComponentName] = useState('MyIcon');
  const [exportFramework, setExportFramework] = useState('react');
  const [favorites, setFavorites] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showGrid, setShowGrid] = useState(true);
  const [snapToGrid, setSnapToGrid] = useState(true);
  const [gridSize, setGridSize] = useState(1);
  
  const canvasRef = useRef(null);
  const svgRef = useRef(null);

  // Built-in icon templates
  const iconTemplates = {
    'Basic Shapes': [
      { name: 'Circle', svg: '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>' },
      { name: 'Square', svg: '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="2" width="20" height="20"/></svg>' },
      { name: 'Triangle', svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L22 20H2L12 2z"/></svg>' },
      { name: 'Diamond', svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L18 12L12 22L6 12L12 2z"/></svg>' },
    ],
    'UI Icons': [
      { name: 'Home', svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>' },
      { name: 'User', svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>' },
      { name: 'Settings', svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.82,11.69,4.82,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.43-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/></svg>' },
      { name: 'Menu', svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>' },
    ],
    'Arrows': [
      { name: 'Arrow Up', svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 14l5-5 5 5z"/></svg>' },
      { name: 'Arrow Down', svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z"/></svg>' },
      { name: 'Arrow Left', svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>' },
      { name: 'Arrow Right', svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>' },
    ],
    'Social': [
      { name: 'Heart', svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>' },
      { name: 'Star', svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>' },
      { name: 'Share', svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.50-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/></svg>' },
    ],
  };

  // Initialize favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('svg-icon-favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Save to history for undo/redo
  const saveToHistory = useCallback((newSvg) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newSvg);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [history, historyIndex]);

  // Update SVG content and save to history
  const updateSvgContent = useCallback((newSvg) => {
    setSvgContent(newSvg);
    saveToHistory(newSvg);
  }, [saveToHistory]);

  // Undo function
  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setSvgContent(history[historyIndex - 1]);
    }
  };

  // Redo function
  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setSvgContent(history[historyIndex + 1]);
    }
  };

  // Copy to clipboard
  const copyToClipboard = (text, message) => {
    navigator.clipboard.writeText(text).then(() => {
      setSnackbarMessage(message);
      setOpenSnackbar(true);
    });
  };

  // Generate component code
  const generateComponentCode = () => {
    const cleanSvg = svgContent.replace(/fill="currentColor"/g, `fill="${fillColor}"`);
    
    if (exportFramework === 'react') {
      return `import React from 'react';

const ${componentName} = ({ size = ${iconSize}, color = "${fillColor}", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    {...props}
  >
    ${cleanSvg.match(/<svg[^>]*>(.*?)<\/svg>/s)?.[1] || ''}
  </svg>
);

export default ${componentName};`;
    } else {
      return `<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    :fill="color"
    v-bind="$attrs"
  >
    ${cleanSvg.match(/<svg[^>]*>(.*?)<\/svg>/s)?.[1] || ''}
  </svg>
</template>

<script>
export default {
  name: '${componentName}',
  props: {
    size: {
      type: [Number, String],
      default: ${iconSize}
    },
    color: {
      type: String,
      default: '${fillColor}'
    }
  }
}
</script>`;
    }
  };

  // Download SVG file
  const downloadSvg = () => {
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${componentName.toLowerCase()}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Download PNG (requires canvas conversion)
  const downloadPng = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = iconSize * 4; // Higher resolution
      canvas.height = iconSize * 4;
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${componentName.toLowerCase()}.png`;
        a.click();
        URL.revokeObjectURL(url);
      });
    };
    
    const svgBlob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(svgBlob);
    img.src = url;
  };

  // Load template
  const loadTemplate = (templateSvg) => {
    updateSvgContent(templateSvg);
    setSnackbarMessage('Template loaded successfully');
    setOpenSnackbar(true);
  };

  // Add to favorites
  const addToFavorites = () => {
    const newFavorite = {
      id: Date.now(),
      name: componentName,
      svg: svgContent,
      createdAt: new Date().toISOString()
    };
    const updatedFavorites = [...favorites, newFavorite];
    setFavorites(updatedFavorites);
    localStorage.setItem('svg-icon-favorites', JSON.stringify(updatedFavorites));
    setSnackbarMessage('Added to favorites');
    setOpenSnackbar(true);
  };

  // Remove from favorites
  const removeFromFavorites = (id) => {
    const updatedFavorites = favorites.filter(fav => fav.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem('svg-icon-favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <Box sx={{ p: 2 }}>
      <Head>
        <title>{name ? `${name} - Dev Tools` : 'SVG Icon Generator & Editor - Dev Tools'}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content="svg icon generator, icon editor, vector graphics, react icons, vue icons, svg to component" />
      </Head>
      
      <Typography variant="h4" gutterBottom>
        {name}
      </Typography>
      <Typography variant="body1" paragraph color="text.secondary">
        {description}
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        <strong>Professional SVG Icon Tool:</strong> Create, edit, and export SVG icons with visual editor, 
        template library, and component generation for React/Vue.
      </Alert>

      <Tabs value={currentTab} onChange={(e, newValue) => setCurrentTab(newValue)} sx={{ mb: 3 }}>
        <Tab icon={<CreateIcon />} label="Editor" />
        <Tab icon={<LibraryBooksIcon />} label="Templates" />
        <Tab icon={<CodeIcon />} label="Export" />
        <Tab icon={<PaletteIcon />} label="Styles" />
      </Tabs>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          {currentTab === 0 && (
            <Paper sx={{ p: 3 }}>
              <Stack direction="row" spacing={2} sx={{ mb: 3 }} alignItems="center">
                <TextField
                  label="Icon Name"
                  value={componentName}
                  onChange={(e) => setComponentName(e.target.value)}
                  size="small"
                  sx={{ minWidth: 150 }}
                />
                <Button
                  variant="outlined"
                  startIcon={<UndoIcon />}
                  onClick={undo}
                  disabled={historyIndex <= 0}
                  size="small"
                >
                  Undo
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<RedoIcon />}
                  onClick={redo}
                  disabled={historyIndex >= history.length - 1}
                  size="small"
                >
                  Redo
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<ClearIcon />}
                  onClick={() => updateSvgContent('<svg viewBox="0 0 24 24" fill="currentColor"></svg>')}
                  size="small"
                >
                  Clear
                </Button>
                <Button
                  variant="contained"
                  startIcon={<SaveIcon />}
                  onClick={addToFavorites}
                  size="small"
                >
                  Save to Favorites
                </Button>
              </Stack>

              <Box sx={{ display: 'flex', gap: 3, mb: 3 }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" gutterBottom>SVG Code</Typography>
                  <TextField
                    multiline
                    rows={12}
                    value={svgContent}
                    onChange={(e) => updateSvgContent(e.target.value)}
                    fullWidth
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        fontFamily: 'monospace',
                        fontSize: '0.875rem',
                      }
                    }}
                  />
                </Box>
                <Box sx={{ width: 300 }}>
                  <Typography variant="h6" gutterBottom>Preview</Typography>
                  <Box
                    sx={{
                      border: 1,
                      borderColor: 'divider',
                      borderRadius: 1,
                      p: 3,
                      backgroundColor: showGrid ? 'background.paper' : backgroundColor,
                      backgroundImage: showGrid ? 'radial-gradient(circle, #ccc 1px, transparent 1px)' : 'none',
                      backgroundSize: showGrid ? `${gridSize * 10}px ${gridSize * 10}px` : 'auto',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minHeight: 200,
                    }}
                  >
                    <Box
                      ref={svgRef}
                      dangerouslySetInnerHTML={{ __html: svgContent }}
                      sx={{
                        '& svg': {
                          width: iconSize * 2,
                          height: iconSize * 2,
                          color: fillColor,
                        }
                      }}
                    />
                  </Box>
                </Box>
              </Box>

              <Stack direction="row" spacing={2} flexWrap="wrap">
                <FormControlLabel
                  control={<Switch checked={showGrid} onChange={(e) => setShowGrid(e.target.checked)} />}
                  label="Show Grid"
                />
                <FormControlLabel
                  control={<Switch checked={snapToGrid} onChange={(e) => setSnapToGrid(e.target.checked)} />}
                  label="Snap to Grid"
                />
              </Stack>
            </Paper>
          )}

          {currentTab === 1 && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>Icon Templates</Typography>
              {Object.entries(iconTemplates).map(([category, icons]) => (
                <Accordion key={category} defaultExpanded>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle1">{category}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={2}>
                      {icons.map((icon, index) => (
                        <Grid size={{ xs: 6, sm: 4, md: 3 }} key={index}>
                          <Card 
                            sx={{ 
                              cursor: 'pointer',
                              '&:hover': { bgcolor: 'action.hover' }
                            }}
                            onClick={() => loadTemplate(icon.svg)}
                          >
                            <CardContent sx={{ textAlign: 'center', p: 2 }}>
                              <Box 
                                dangerouslySetInnerHTML={{ __html: icon.svg }}
                                sx={{ 
                                  '& svg': { 
                                    width: 32, 
                                    height: 32,
                                    color: 'text.primary'
                                  },
                                  mb: 1
                                }}
                              />
                              <Typography variant="caption">{icon.name}</Typography>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              ))}

              {favorites.length > 0 && (
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle1">Your Favorites</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={2}>
                      {favorites.map((favorite) => (
                        <Grid size={{ xs: 6, sm: 4, md: 3 }} key={favorite.id}>
                          <Card sx={{ position: 'relative' }}>
                            <IconButton
                              size="small"
                              sx={{ position: 'absolute', top: 4, right: 4, zIndex: 1 }}
                              onClick={() => removeFromFavorites(favorite.id)}
                            >
                              <ClearIcon fontSize="small" />
                            </IconButton>
                            <CardContent 
                              sx={{ 
                                textAlign: 'center', 
                                p: 2,
                                cursor: 'pointer',
                                '&:hover': { bgcolor: 'action.hover' }
                              }}
                              onClick={() => loadTemplate(favorite.svg)}
                            >
                              <Box 
                                dangerouslySetInnerHTML={{ __html: favorite.svg }}
                                sx={{ 
                                  '& svg': { 
                                    width: 32, 
                                    height: 32,
                                    color: 'text.primary'
                                  },
                                  mb: 1
                                }}
                              />
                              <Typography variant="caption">{favorite.name}</Typography>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              )}
            </Paper>
          )}

          {currentTab === 2 && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>Export Options</Typography>
              
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Export Format</InputLabel>
                    <Select
                      value={exportFormat}
                      onChange={(e) => setExportFormat(e.target.value)}
                      label="Export Format"
                    >
                      <MenuItem value="svg">SVG File</MenuItem>
                      <MenuItem value="png">PNG Image</MenuItem>
                      <MenuItem value="component">Component Code</MenuItem>
                    </Select>
                  </FormControl>

                  {exportFormat === 'component' && (
                    <FormControl fullWidth sx={{ mb: 2 }}>
                      <InputLabel>Framework</InputLabel>
                      <Select
                        value={exportFramework}
                        onChange={(e) => setExportFramework(e.target.value)}
                        label="Framework"
                      >
                        <MenuItem value="react">React</MenuItem>
                        <MenuItem value="vue">Vue</MenuItem>
                      </Select>
                    </FormControl>
                  )}

                  <Stack direction="row" spacing={2}>
                    {exportFormat === 'svg' && (
                      <Button
                        variant="contained"
                        startIcon={<DownloadIcon />}
                        onClick={downloadSvg}
                      >
                        Download SVG
                      </Button>
                    )}
                    {exportFormat === 'png' && (
                      <Button
                        variant="contained"
                        startIcon={<DownloadIcon />}
                        onClick={downloadPng}
                      >
                        Download PNG
                      </Button>
                    )}
                    {exportFormat === 'component' && (
                      <Button
                        variant="contained"
                        startIcon={<ContentCopyIcon />}
                        onClick={() => copyToClipboard(generateComponentCode(), 'Component code copied to clipboard')}
                      >
                        Copy Component
                      </Button>
                    )}
                  </Stack>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  {exportFormat === 'component' && (
                    <Box>
                      <Typography variant="subtitle2" gutterBottom>Generated Code:</Typography>
                      <TextField
                        multiline
                        rows={10}
                        value={generateComponentCode()}
                        fullWidth
                        InputProps={{
                          readOnly: true,
                          sx: {
                            fontFamily: 'monospace',
                            fontSize: '0.75rem',
                          }
                        }}
                      />
                    </Box>
                  )}
                </Grid>
              </Grid>
            </Paper>
          )}

          {currentTab === 3 && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>Style Settings</Typography>
              
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography gutterBottom>Icon Size: {iconSize}px</Typography>
                  <Slider
                    value={iconSize}
                    onChange={(e, value) => setIconSize(value)}
                    min={16}
                    max={128}
                    step={4}
                    marks={[
                      { value: 16, label: '16px' },
                      { value: 24, label: '24px' },
                      { value: 48, label: '48px' },
                      { value: 128, label: '128px' }
                    ]}
                    sx={{ mb: 3 }}
                  />

                  <Typography gutterBottom>Stroke Width: {strokeWidth}px</Typography>
                  <Slider
                    value={strokeWidth}
                    onChange={(e, value) => setStrokeWidth(value)}
                    min={0.5}
                    max={4}
                    step={0.5}
                    sx={{ mb: 3 }}
                  />

                  <Typography gutterBottom>Grid Size: {gridSize}px</Typography>
                  <Slider
                    value={gridSize}
                    onChange={(e, value) => setGridSize(value)}
                    min={0.5}
                    max={5}
                    step={0.5}
                    sx={{ mb: 3 }}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Stack spacing={2}>
                    <Box>
                      <Typography gutterBottom>Fill Color</Typography>
                      <TextField
                        type="color"
                        value={fillColor}
                        onChange={(e) => setFillColor(e.target.value)}
                        size="small"
                        sx={{ width: 100 }}
                      />
                    </Box>

                    <Box>
                      <Typography gutterBottom>Stroke Color</Typography>
                      <TextField
                        type="color"
                        value={strokeColor}
                        onChange={(e) => setStrokeColor(e.target.value)}
                        size="small"
                        sx={{ width: 100 }}
                      />
                    </Box>

                    <Box>
                      <Typography gutterBottom>Background Color</Typography>
                      <TextField
                        type="color"
                        value={backgroundColor}
                        onChange={(e) => setBackgroundColor(e.target.value)}
                        size="small"
                        sx={{ width: 100 }}
                      />
                    </Box>
                  </Stack>
                </Grid>
              </Grid>
            </Paper>
          )}
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>Quick Actions</Typography>
            <Stack spacing={2}>
              <Button
                variant="outlined"
                startIcon={<ContentCopyIcon />}
                onClick={() => copyToClipboard(svgContent, 'SVG code copied to clipboard')}
                fullWidth
              >
                Copy SVG Code
              </Button>
              <Button
                variant="outlined"
                startIcon={<DownloadIcon />}
                onClick={downloadSvg}
                fullWidth
              >
                Download SVG
              </Button>
              <Button
                variant="outlined"
                startIcon={<CodeIcon />}
                onClick={() => copyToClipboard(generateComponentCode(), 'Component code copied to clipboard')}
                fullWidth
              >
                Copy as Component
              </Button>
            </Stack>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Icon Information</Typography>
            <Stack spacing={1}>
              <Typography variant="body2">
                <strong>Size:</strong> {iconSize}px × {iconSize}px
              </Typography>
              <Typography variant="body2">
                <strong>Format:</strong> SVG Vector
              </Typography>
              <Typography variant="body2">
                <strong>ViewBox:</strong> 0 0 24 24
              </Typography>
              <Typography variant="body2">
                <strong>Fill:</strong> {fillColor}
              </Typography>
              <Typography variant="body2">
                <strong>Stroke:</strong> {strokeColor} ({strokeWidth}px)
              </Typography>
              <Typography variant="body2">
                <strong>Favorites:</strong> {favorites.length} saved
              </Typography>
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      {/* Hidden canvas for PNG export */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
      />
    </Box>
  );
}

