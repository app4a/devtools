import React, { useState, useEffect, useMemo, useRef } from 'react';
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
  Alert,
  IconButton,
  Snackbar,
  List,
  ListItem,
  ListItemText,
  Chip,
  Tabs,
  Tab,
  Stack,
  Divider,
  Switch,
  FormControlLabel,
  AccordionSummary,
  AccordionDetails,
  Accordion,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
  Slider,
  ToggleButtonGroup,
  ToggleButton
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EmailIcon from '@mui/icons-material/Email';
import PaletteIcon from '@mui/icons-material/Palette';
import PreviewIcon from '@mui/icons-material/Preview';
import CodeIcon from '@mui/icons-material/Code';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import SaveIcon from '@mui/icons-material/Save';
import LoadIcon from '@mui/icons-material/CloudDownload';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import LinkIcon from '@mui/icons-material/Link';
import ImageIcon from '@mui/icons-material/Image';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import TabletIcon from '@mui/icons-material/Tablet';
import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows';
import Head from 'next/head';

export default function EmailTemplateBuilder({ name, description }) {
  const [currentTab, setCurrentTab] = useState(0);
  const [templateName, setTemplateName] = useState('My Email Template');
  const [subject, setSubject] = useState('Welcome to our newsletter!');
  const [preheader, setPreheader] = useState('Thank you for subscribing to our updates');
  const [components, setComponents] = useState([
    {
      id: 1,
      type: 'header',
      content: {
        logo: 'https://via.placeholder.com/200x60?text=LOGO',
        backgroundColor: '#ffffff',
        textColor: '#333333'
      }
    },
    {
      id: 2,
      type: 'text',
      content: {
        text: '<h1>Welcome to Our Newsletter!</h1><p>Thank you for subscribing. We\'re excited to share our latest updates with you.</p>',
        backgroundColor: '#ffffff',
        textColor: '#333333',
        alignment: 'left',
        padding: '20px'
      }
    },
    {
      id: 3,
      type: 'button',
      content: {
        text: 'Get Started',
        url: 'https://example.com',
        backgroundColor: '#007bff',
        textColor: '#ffffff',
        alignment: 'center',
        borderRadius: '4px',
        padding: '12px 24px'
      }
    },
    {
      id: 4,
      type: 'footer',
      content: {
        text: '© 2025 Your Company. All rights reserved.',
        backgroundColor: '#f8f9fa',
        textColor: '#6c757d',
        links: [
          { text: 'Unsubscribe', url: '#' },
          { text: 'Privacy Policy', url: '#' }
        ]
      }
    }
  ]);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [previewMode, setPreviewMode] = useState('desktop');
  const [darkMode, setDarkMode] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [savedTemplates, setSavedTemplates] = useState([]);
  const [openTemplateDialog, setOpenTemplateDialog] = useState(false);
  const [saveTemplateName, setSaveTemplateName] = useState('');
  
  const previewRef = useRef(null);

  // Email client configurations
  const emailClients = {
    gmail: { name: 'Gmail', maxWidth: '650px', backgroundColor: '#ffffff' },
    outlook: { name: 'Outlook', maxWidth: '600px', backgroundColor: '#ffffff' },
    apple: { name: 'Apple Mail', maxWidth: '600px', backgroundColor: '#ffffff' },
    yahoo: { name: 'Yahoo', maxWidth: '600px', backgroundColor: '#ffffff' }
  };

  // Component templates
  const componentTemplates = {
    header: {
      name: 'Header',
      icon: <EmailIcon />,
      defaultContent: {
        logo: 'https://via.placeholder.com/200x60?text=LOGO',
        backgroundColor: '#ffffff',
        textColor: '#333333',
        padding: '20px'
      }
    },
    text: {
      name: 'Text Block',
      icon: <TextFieldsIcon />,
      defaultContent: {
        text: '<p>Your text content goes here...</p>',
        backgroundColor: '#ffffff',
        textColor: '#333333',
        alignment: 'left',
        padding: '20px'
      }
    },
    button: {
      name: 'Button',
      icon: <LinkIcon />,
      defaultContent: {
        text: 'Click Here',
        url: 'https://example.com',
        backgroundColor: '#007bff',
        textColor: '#ffffff',
        alignment: 'center',
        borderRadius: '4px',
        padding: '12px 24px'
      }
    },
    image: {
      name: 'Image',
      icon: <ImageIcon />,
      defaultContent: {
        src: 'https://via.placeholder.com/600x300?text=Image',
        alt: 'Image description',
        alignment: 'center',
        width: '100%',
        padding: '20px'
      }
    },
    spacer: {
      name: 'Spacer',
      icon: <DragIndicatorIcon />,
      defaultContent: {
        height: '20px',
        backgroundColor: 'transparent'
      }
    },
    divider: {
      name: 'Divider',
      icon: <DragIndicatorIcon />,
      defaultContent: {
        color: '#dee2e6',
        thickness: '1px',
        style: 'solid',
        padding: '20px'
      }
    },
    footer: {
      name: 'Footer',
      icon: <EmailIcon />,
      defaultContent: {
        text: '© 2025 Your Company. All rights reserved.',
        backgroundColor: '#f8f9fa',
        textColor: '#6c757d',
        links: [
          { text: 'Unsubscribe', url: '#' },
          { text: 'Privacy Policy', url: '#' }
        ],
        padding: '20px'
      }
    }
  };

  // Initialize saved templates from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('email-templates');
    if (saved) {
      setSavedTemplates(JSON.parse(saved));
    }
  }, []);

  // Generate inline CSS for email compatibility
  const generateInlineCSS = (styles) => {
    return Object.entries(styles)
      .map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value}`)
      .join('; ');
  };

  // Render component HTML
  const renderComponentHTML = (component) => {
    const { type, content } = component;

    switch (type) {
      case 'header':
        return `
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="${generateInlineCSS({
            backgroundColor: content.backgroundColor,
            padding: content.padding || '20px'
          })}">
            <tr>
              <td align="center">
                <img src="${content.logo}" alt="Logo" style="max-width: 200px; height: auto;">
              </td>
            </tr>
          </table>
        `;

      case 'text':
        return `
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="${generateInlineCSS({
            backgroundColor: content.backgroundColor
          })}">
            <tr>
              <td style="${generateInlineCSS({
                padding: content.padding || '20px',
                color: content.textColor,
                textAlign: content.alignment || 'left'
              })}">
                ${content.text}
              </td>
            </tr>
          </table>
        `;

      case 'button':
        return `
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="${generateInlineCSS({
            backgroundColor: content.backgroundColor || 'transparent'
          })}">
            <tr>
              <td align="${content.alignment || 'center'}" style="padding: 20px;">
                <a href="${content.url}" style="${generateInlineCSS({
                  backgroundColor: content.backgroundColor || '#007bff',
                  color: content.textColor || '#ffffff',
                  textDecoration: 'none',
                  padding: content.padding || '12px 24px',
                  borderRadius: content.borderRadius || '4px',
                  display: 'inline-block',
                  fontWeight: 'bold'
                })}">${content.text}</a>
              </td>
            </tr>
          </table>
        `;

      case 'image':
        return `
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td align="${content.alignment || 'center'}" style="padding: ${content.padding || '20px'};">
                <img src="${content.src}" alt="${content.alt || ''}" style="${generateInlineCSS({
                  maxWidth: content.width || '100%',
                  height: 'auto',
                  display: 'block'
                })}">
              </td>
            </tr>
          </table>
        `;

      case 'spacer':
        return `
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="${generateInlineCSS({
                height: content.height || '20px',
                backgroundColor: content.backgroundColor || 'transparent'
              })}"></td>
            </tr>
          </table>
        `;

      case 'divider':
        return `
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding: ${content.padding || '20px'};">
                <hr style="${generateInlineCSS({
                  border: 'none',
                  borderTop: `${content.thickness || '1px'} ${content.style || 'solid'} ${content.color || '#dee2e6'}`,
                  margin: '0'
                })}">
              </td>
            </tr>
          </table>
        `;

      case 'footer':
        return `
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="${generateInlineCSS({
            backgroundColor: content.backgroundColor || '#f8f9fa'
          })}">
            <tr>
              <td align="center" style="${generateInlineCSS({
                padding: content.padding || '20px',
                color: content.textColor || '#6c757d',
                fontSize: '14px'
              })}">
                <p style="margin: 0 0 10px 0;">${content.text}</p>
                ${content.links ? content.links.map(link => 
                  `<a href="${link.url}" style="color: ${content.textColor || '#6c757d'}; margin: 0 10px;">${link.text}</a>`
                ).join('') : ''}
              </td>
            </tr>
          </table>
        `;

      default:
        return '<div>Unknown component type</div>';
    }
  };

  // Generate complete email HTML
  const generateEmailHTML = () => {
    const maxWidth = emailClients[previewMode]?.maxWidth || '600px';
    
    return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${subject}</title>
  <style type="text/css">
    /* Reset styles */
    body, table, td, p, a, li, blockquote {
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }
    table, td {
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }
    img {
      -ms-interpolation-mode: bicubic;
      border: 0;
      outline: none;
      text-decoration: none;
    }
    
    /* Dark mode support */
    @media (prefers-color-scheme: dark) {
      .dark-mode {
        background-color: #1a1a1a !important;
        color: #ffffff !important;
      }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, sans-serif;">
  <!-- Preheader -->
  <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
    ${preheader}
  </div>
  
  <!-- Email Container -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: ${maxWidth}; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          ${components.map(component => renderComponentHTML(component)).join('')}
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
  };

  // Add new component
  const addComponent = (type) => {
    const newComponent = {
      id: Date.now(),
      type,
      content: { ...componentTemplates[type].defaultContent }
    };
    setComponents([...components, newComponent]);
    setSelectedComponent(newComponent.id);
    setSnackbarMessage(`${componentTemplates[type].name} added`);
    setOpenSnackbar(true);
  };

  // Update component content
  const updateComponent = (id, newContent) => {
    setComponents(components.map(comp => 
      comp.id === id ? { ...comp, content: { ...comp.content, ...newContent } } : comp
    ));
  };

  // Delete component
  const deleteComponent = (id) => {
    setComponents(components.filter(comp => comp.id !== id));
    if (selectedComponent === id) {
      setSelectedComponent(null);
    }
  };

  // Move component
  const moveComponent = (id, direction) => {
    const index = components.findIndex(comp => comp.id === id);
    if (
      (direction === 'up' && index > 0) ||
      (direction === 'down' && index < components.length - 1)
    ) {
      const newComponents = [...components];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      [newComponents[index], newComponents[targetIndex]] = [newComponents[targetIndex], newComponents[index]];
      setComponents(newComponents);
    }
  };

  // Copy to clipboard
  const copyToClipboard = (text, message) => {
    navigator.clipboard.writeText(text).then(() => {
      setSnackbarMessage(message);
      setOpenSnackbar(true);
    });
  };

  // Download HTML file
  const downloadHTML = () => {
    const html = generateEmailHTML();
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${templateName.toLowerCase().replace(/\s+/g, '-')}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Save template
  const saveTemplate = () => {
    if (!saveTemplateName.trim()) return;
    
    const template = {
      id: Date.now(),
      name: saveTemplateName,
      subject,
      preheader,
      components,
      createdAt: new Date().toISOString()
    };
    
    const updated = [...savedTemplates, template];
    setSavedTemplates(updated);
    localStorage.setItem('email-templates', JSON.stringify(updated));
    setSaveTemplateName('');
    setOpenTemplateDialog(false);
    setSnackbarMessage('Template saved successfully');
    setOpenSnackbar(true);
  };

  // Load template
  const loadTemplate = (template) => {
    setTemplateName(template.name);
    setSubject(template.subject);
    setPreheader(template.preheader);
    setComponents(template.components);
    setSelectedComponent(null);
    setSnackbarMessage(`Template "${template.name}" loaded`);
    setOpenSnackbar(true);
  };

  // Get preview width based on mode
  const getPreviewWidth = () => {
    switch (previewMode) {
      case 'mobile': return '320px';
      case 'tablet': return '768px';
      default: return '100%';
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Head>
        <title>{name ? `${name} - Dev Tools` : 'Email Template Builder - Dev Tools'}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content="email template builder, responsive email, html email, email design, newsletter builder" />
      </Head>
      
      <Typography variant="h4" gutterBottom>
        {name}
      </Typography>
      <Typography variant="body1" paragraph color="text.secondary">
        {description}
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        <strong>Professional Email Builder:</strong> Create responsive email templates with drag-and-drop 
        components, multi-client preview, and export capabilities.
      </Alert>

      <Tabs value={currentTab} onChange={(e, newValue) => setCurrentTab(newValue)} sx={{ mb: 3 }}>
        <Tab icon={<EditIcon />} label="Builder" />
        <Tab icon={<PreviewIcon />} label="Preview" />
        <Tab icon={<CodeIcon />} label="HTML" />
        <Tab icon={<SaveIcon />} label="Templates" />
      </Tabs>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          {currentTab === 0 && (
            <Paper sx={{ p: 3 }}>
              <Stack direction="row" spacing={2} sx={{ mb: 3 }} alignItems="center">
                <TextField
                  label="Template Name"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                  size="small"
                  sx={{ minWidth: 200 }}
                />
                <TextField
                  label="Subject Line"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  size="small"
                  sx={{ minWidth: 300 }}
                />
                <Button
                  variant="contained"
                  startIcon={<SaveIcon />}
                  onClick={() => setOpenTemplateDialog(true)}
                  size="small"
                >
                  Save Template
                </Button>
              </Stack>

              <TextField
                label="Preheader Text"
                value={preheader}
                onChange={(e) => setPreheader(e.target.value)}
                fullWidth
                sx={{ mb: 3 }}
                helperText="Preview text shown in email clients before opening"
              />

              <Typography variant="h6" gutterBottom>Email Components</Typography>
              
              <Box sx={{ display: 'flex', gap: 3 }}>
                <Box sx={{ width: 250 }}>
                  <Typography variant="subtitle2" gutterBottom>Add Components</Typography>
                  <Stack spacing={1}>
                    {Object.entries(componentTemplates).map(([type, template]) => (
                      <Button
                        key={type}
                        variant="outlined"
                        startIcon={template.icon}
                        onClick={() => addComponent(type)}
                        fullWidth
                        size="small"
                      >
                        {template.name}
                      </Button>
                    ))}
                  </Stack>

                  {selectedComponent && (
                    <Box sx={{ mt: 3 }}>
                      <Typography variant="subtitle2" gutterBottom>Component Settings</Typography>
                      {(() => {
                        const component = components.find(c => c.id === selectedComponent);
                        if (!component) return null;

                        return (
                          <Stack spacing={2}>
                            {component.type === 'text' && (
                              <>
                                <TextField
                                  label="Text Content"
                                  multiline
                                  rows={4}
                                  value={component.content.text}
                                  onChange={(e) => updateComponent(selectedComponent, { text: e.target.value })}
                                  fullWidth
                                  size="small"
                                />
                                <FormControl fullWidth size="small">
                                  <InputLabel>Alignment</InputLabel>
                                  <Select
                                    value={component.content.alignment || 'left'}
                                    onChange={(e) => updateComponent(selectedComponent, { alignment: e.target.value })}
                                    label="Alignment"
                                  >
                                    <MenuItem value="left">Left</MenuItem>
                                    <MenuItem value="center">Center</MenuItem>
                                    <MenuItem value="right">Right</MenuItem>
                                  </Select>
                                </FormControl>
                              </>
                            )}

                            {component.type === 'button' && (
                              <>
                                <TextField
                                  label="Button Text"
                                  value={component.content.text}
                                  onChange={(e) => updateComponent(selectedComponent, { text: e.target.value })}
                                  fullWidth
                                  size="small"
                                />
                                <TextField
                                  label="Button URL"
                                  value={component.content.url}
                                  onChange={(e) => updateComponent(selectedComponent, { url: e.target.value })}
                                  fullWidth
                                  size="small"
                                />
                                <TextField
                                  label="Background Color"
                                  type="color"
                                  value={component.content.backgroundColor}
                                  onChange={(e) => updateComponent(selectedComponent, { backgroundColor: e.target.value })}
                                  size="small"
                                />
                              </>
                            )}

                            {component.type === 'image' && (
                              <>
                                <TextField
                                  label="Image URL"
                                  value={component.content.src}
                                  onChange={(e) => updateComponent(selectedComponent, { src: e.target.value })}
                                  fullWidth
                                  size="small"
                                />
                                <TextField
                                  label="Alt Text"
                                  value={component.content.alt}
                                  onChange={(e) => updateComponent(selectedComponent, { alt: e.target.value })}
                                  fullWidth
                                  size="small"
                                />
                              </>
                            )}

                            <Button
                              variant="outlined"
                              color="error"
                              startIcon={<DeleteIcon />}
                              onClick={() => deleteComponent(selectedComponent)}
                              size="small"
                            >
                              Delete Component
                            </Button>
                          </Stack>
                        );
                      })()}
                    </Box>
                  )}
                </Box>

                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle2" gutterBottom>Email Structure</Typography>
                  <Paper variant="outlined" sx={{ p: 2, minHeight: 400 }}>
                    {components.length === 0 ? (
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          height: 200,
                          color: 'text.secondary'
                        }}
                      >
                        Add components to start building your email
                      </Box>
                    ) : (
                      <Stack spacing={2}>
                        {components.map((component, index) => (
                          <Card
                            key={component.id}
                            sx={{
                              border: selectedComponent === component.id ? 2 : 1,
                              borderColor: selectedComponent === component.id ? 'primary.main' : 'divider',
                              cursor: 'pointer'
                            }}
                            onClick={() => setSelectedComponent(component.id)}
                          >
                            <CardContent sx={{ p: 2 }}>
                              <Stack direction="row" alignItems="center" spacing={2}>
                                <Box sx={{ flex: 1 }}>
                                  <Typography variant="subtitle2">
                                    {componentTemplates[component.type]?.name}
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary">
                                    {component.type === 'text' ? 
                                      component.content.text.substring(0, 50) + '...' :
                                      component.type === 'button' ?
                                      `Button: ${component.content.text}` :
                                      `${componentTemplates[component.type]?.name}`
                                    }
                                  </Typography>
                                </Box>
                                <Stack direction="row" spacing={1}>
                                  <IconButton
                                    size="small"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      moveComponent(component.id, 'up');
                                    }}
                                    disabled={index === 0}
                                  >
                                    ↑
                                  </IconButton>
                                  <IconButton
                                    size="small"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      moveComponent(component.id, 'down');
                                    }}
                                    disabled={index === components.length - 1}
                                  >
                                    ↓
                                  </IconButton>
                                </Stack>
                              </Stack>
                            </CardContent>
                          </Card>
                        ))}
                      </Stack>
                    )}
                  </Paper>
                </Box>
              </Box>
            </Paper>
          )}

          {currentTab === 1 && (
            <Paper sx={{ p: 3 }}>
              <Stack direction="row" spacing={2} sx={{ mb: 3 }} alignItems="center">
                <Typography variant="h6">Preview</Typography>
                <ToggleButtonGroup
                  value={previewMode}
                  exclusive
                  onChange={(e, value) => value && setPreviewMode(value)}
                  size="small"
                >
                  <ToggleButton value="mobile">
                    <SmartphoneIcon />
                  </ToggleButton>
                  <ToggleButton value="tablet">
                    <TabletIcon />
                  </ToggleButton>
                  <ToggleButton value="desktop">
                    <DesktopWindowsIcon />
                  </ToggleButton>
                </ToggleButtonGroup>
                <FormControlLabel
                  control={
                    <Switch 
                      checked={darkMode} 
                      onChange={(e) => setDarkMode(e.target.checked)}
                    />
                  }
                  label="Dark Mode"
                />
              </Stack>

              <Box
                sx={{
                  border: 1,
                  borderColor: 'divider',
                  borderRadius: 1,
                  overflow: 'hidden',
                  backgroundColor: darkMode ? '#1a1a1a' : '#f4f4f4'
                }}
              >
                <Box
                  sx={{
                    width: getPreviewWidth(),
                    margin: '0 auto',
                    minHeight: 500
                  }}
                >
                  <iframe
                    ref={previewRef}
                    srcDoc={generateEmailHTML()}
                    style={{
                      width: '100%',
                      height: '600px',
                      border: 'none'
                    }}
                    title="Email Preview"
                  />
                </Box>
              </Box>
            </Paper>
          )}

          {currentTab === 2 && (
            <Paper sx={{ p: 3 }}>
              <Stack direction="row" spacing={2} sx={{ mb: 3 }} alignItems="center">
                <Typography variant="h6">HTML Code</Typography>
                <Button
                  variant="contained"
                  startIcon={<ContentCopyIcon />}
                  onClick={() => copyToClipboard(generateEmailHTML(), 'HTML copied to clipboard')}
                >
                  Copy HTML
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<DownloadIcon />}
                  onClick={downloadHTML}
                >
                  Download HTML
                </Button>
              </Stack>

              <TextField
                multiline
                rows={20}
                value={generateEmailHTML()}
                fullWidth
                InputProps={{
                  readOnly: true,
                  sx: {
                    fontFamily: 'monospace',
                    fontSize: '0.75rem',
                  }
                }}
              />
            </Paper>
          )}

          {currentTab === 3 && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>Saved Templates</Typography>
              
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setOpenTemplateDialog(true)}
                sx={{ mb: 3 }}
              >
                Save Current Template
              </Button>

              {savedTemplates.length === 0 ? (
                <Alert severity="info">
                  No saved templates yet. Save your current email template to create reusable templates.
                </Alert>
              ) : (
                <Grid container spacing={2}>
                  {savedTemplates.map((template) => (
                    <Grid size={{ xs: 12, md: 6 }} key={template.id}>
                      <Card>
                        <CardContent>
                          <Typography variant="h6" gutterBottom>{template.name}</Typography>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            Subject: {template.subject}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            Components: {template.components.length}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            Created: {new Date(template.createdAt).toLocaleDateString()}
                          </Typography>
                          <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                            <Button
                              size="small"
                              onClick={() => loadTemplate(template)}
                            >
                              Load
                            </Button>
                            <IconButton
                              size="small"
                              onClick={() => {
                                const updated = savedTemplates.filter(t => t.id !== template.id);
                                setSavedTemplates(updated);
                                localStorage.setItem('email-templates', JSON.stringify(updated));
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Stack>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}
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
                onClick={() => copyToClipboard(generateEmailHTML(), 'HTML copied to clipboard')}
                fullWidth
              >
                Copy HTML
              </Button>
              <Button
                variant="outlined"
                startIcon={<DownloadIcon />}
                onClick={downloadHTML}
                fullWidth
              >
                Download HTML
              </Button>
              <Button
                variant="outlined"
                startIcon={<SaveIcon />}
                onClick={() => setOpenTemplateDialog(true)}
                fullWidth
              >
                Save Template
              </Button>
            </Stack>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Template Info</Typography>
            <Stack spacing={1}>
              <Typography variant="body2">
                <strong>Name:</strong> {templateName}
              </Typography>
              <Typography variant="body2">
                <strong>Components:</strong> {components.length}
              </Typography>
              <Typography variant="body2">
                <strong>Subject:</strong> {subject}
              </Typography>
              <Typography variant="body2">
                <strong>HTML Size:</strong> {Math.round(generateEmailHTML().length / 1024)}KB
              </Typography>
              <Typography variant="body2">
                <strong>Saved Templates:</strong> {savedTemplates.length}
              </Typography>
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      {/* Template Save Dialog */}
      <Dialog open={openTemplateDialog} onClose={() => setOpenTemplateDialog(false)}>
        <DialogTitle>Save Email Template</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Template Name"
            fullWidth
            value={saveTemplateName}
            onChange={(e) => setSaveTemplateName(e.target.value)}
            placeholder="e.g., Welcome Email, Newsletter Template"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenTemplateDialog(false)}>Cancel</Button>
          <Button onClick={saveTemplate} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
      />
    </Box>
  );
}

