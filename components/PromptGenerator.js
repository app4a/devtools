import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Paper,
  Grid,
  IconButton,
  Snackbar,
  Card,
  CardContent,
  Button,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Divider,
  Alert,
  Tabs,
  Tab,
  ToggleButton,
  ToggleButtonGroup
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import CodeIcon from '@mui/icons-material/Code';
import SchoolIcon from '@mui/icons-material/School';
import BusinessIcon from '@mui/icons-material/Business';
import Head from 'next/head';

export default function PromptGenerator({ name, description }) {
  const [activeTab, setActiveTab] = useState(0);
  const [customPrompt, setCustomPrompt] = useState('');
  const [optimizedPrompt, setOptimizedPrompt] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [selectedRole, setSelectedRole] = useState('assistant');
  const [selectedModel, setSelectedModel] = useState('gpt-5');
  const [favorites, setFavorites] = useState([]);
  const [customFavorites, setCustomFavorites] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);

  const promptCategories = {
    general: 'General Assistant',
    creative: 'Creative Writing',
    coding: 'Code Generation', 
    analysis: 'Data Analysis',
    education: 'Educational',
    business: 'Business & Marketing',
    research: 'Research & Summary'
  };

  const aiModels = {
    chatgpt: 'ChatGPT (GPT-3.5/4)',
    'gpt-5': 'GPT-5 (Latest)',
    claude: 'Claude (Anthropic)',
    gemini: 'Gemini (Google)',
    generic: 'Generic AI Model'
  };

  const roleTemplates = {
    assistant: 'You are a helpful AI assistant.',
    expert: 'You are an expert in [FIELD]. You have years of experience and deep knowledge.',
    teacher: 'You are a patient and knowledgeable teacher. Explain concepts clearly and provide examples.',
    analyst: 'You are a data analyst. Provide detailed analysis with insights and recommendations.',
    writer: 'You are a skilled creative writer. Write engaging and well-structured content.',
    coder: 'You are an experienced software developer. Write clean, efficient, and well-documented code.',
    consultant: 'You are a business consultant. Provide strategic advice and actionable recommendations.'
  };

  const promptTemplates = {
    general: [
      {
        title: 'Basic Question',
        template: 'Please help me understand [TOPIC]. Can you explain it in simple terms?'
      },
      {
        title: 'Step-by-Step Guide',
        template: 'Create a step-by-step guide on how to [TASK]. Include tips and best practices.'
      },
      {
        title: 'Pros and Cons',
        template: 'Analyze the pros and cons of [TOPIC/DECISION]. Provide a balanced perspective.'
      }
    ],
    creative: [
      {
        title: 'Story Beginning',
        template: 'Write the opening paragraph of a [GENRE] story about [CHARACTER/SITUATION]. Make it engaging and hook the reader.'
      },
      {
        title: 'Character Development',
        template: 'Create a detailed character profile for [CHARACTER TYPE] in a [SETTING]. Include background, personality, and motivations.'
      },
      {
        title: 'Creative Brainstorming',
        template: 'Generate 10 creative ideas for [PROJECT/CAMPAIGN]. Think outside the box and be innovative.'
      }
    ],
    coding: [
      {
        title: 'Code Generation',
        template: 'Write [LANGUAGE] code to [FUNCTIONALITY]. Include error handling and comments explaining the logic.'
      },
      {
        title: 'Code Review',
        template: 'Review this [LANGUAGE] code and suggest improvements for performance, readability, and best practices: [CODE]'
      },
      {
        title: 'Debug Help',
        template: 'Help me debug this [LANGUAGE] code. The error is: [ERROR]. Here\'s the code: [CODE]'
      }
    ],
    analysis: [
      {
        title: 'Data Analysis',
        template: 'Analyze this data and provide key insights: [DATA]. Focus on trends, patterns, and actionable recommendations.'
      },
      {
        title: 'Market Research',
        template: 'Conduct a market analysis for [PRODUCT/INDUSTRY]. Include target audience, competitors, and opportunities.'
      },
      {
        title: 'Performance Metrics',
        template: 'Create KPIs and metrics to measure [GOAL/OBJECTIVE]. Explain why each metric is important.'
      }
    ],
    education: [
      {
        title: 'Lesson Plan',
        template: 'Create a lesson plan for teaching [SUBJECT] to [GRADE LEVEL]. Include objectives, activities, and assessments.'
      },
      {
        title: 'Study Guide',
        template: 'Generate a comprehensive study guide for [TOPIC]. Include key concepts, practice questions, and memory aids.'
      },
      {
        title: 'Explanation for Kids',
        template: 'Explain [COMPLEX TOPIC] in a way that a [AGE] year old would understand. Use simple language and analogies.'
      }
    ],
    business: [
      {
        title: 'Marketing Copy',
        template: 'Write compelling marketing copy for [PRODUCT/SERVICE]. Target audience is [DEMOGRAPHICS]. Focus on benefits and call-to-action.'
      },
      {
        title: 'Business Plan Section',
        template: 'Write the [SECTION] section of a business plan for [BUSINESS TYPE]. Be detailed and professional.'
      },
      {
        title: 'Email Template',
        template: 'Create a professional email template for [PURPOSE]. Tone should be [FORMAL/FRIENDLY] and include clear next steps.'
      }
    ],
    research: [
      {
        title: 'Research Summary',
        template: 'Summarize the key findings from this research on [TOPIC]: [RESEARCH]. Highlight the most important insights.'
      },
      {
        title: 'Literature Review',
        template: 'Conduct a literature review on [TOPIC]. Find key studies, methodologies, and conclusions in the field.'
      },
      {
        title: 'Fact Check',
        template: 'Fact-check this information about [TOPIC]: [INFORMATION]. Provide sources and correct any inaccuracies.'
      }
    ]
  };

  const optimizationTips = [
    'Be specific about what you want the AI to do',
    'Provide context and background information',
    'Use clear, direct language',
    'Break complex requests into steps',
    'Specify the desired format or structure',
    'Include examples when helpful',
    'Set constraints and parameters',
    'Ask for explanations of reasoning',
    'Request different perspectives or approaches',
    'Use role-playing to get specialized responses'
  ];

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setSnackbarMessage('Copied to clipboard!');
      setOpenSnackbar(true);
    });
  };

  const optimizePrompt = () => {
    if (!customPrompt.trim()) {
      setSnackbarMessage('Please enter a prompt to optimize');
      setOpenSnackbar(true);
      return;
    }

    // Simple prompt optimization logic
    let optimized = customPrompt;
    
    // Add role context if not present
    if (!customPrompt.toLowerCase().includes('you are')) {
      optimized = `${roleTemplates[selectedRole]} ${optimized}`;
    }
    
    // Add specificity suggestions
    if (optimized.length < 50) {
      optimized += '\n\nPlease provide detailed explanations and specific examples in your response.';
    }
    
    // Add format specification
    if (!optimized.toLowerCase().includes('format') && !optimized.toLowerCase().includes('structure')) {
      optimized += '\n\nFormat your response clearly with headings and bullet points where appropriate.';
    }

    setOptimizedPrompt(optimized);
    setSnackbarMessage('Prompt optimized! Check the result below.');
    setOpenSnackbar(true);
  };

  const loadTemplate = (template) => {
    setCustomPrompt(template.template);
    setOptimizedPrompt('');
    setActiveTab(0); // Switch to Custom Prompt tab
    setSnackbarMessage('Template loaded! You can now customize it.');
    setOpenSnackbar(true);
  };

  const toggleFavorite = (template) => {
    const isFavorite = favorites.some(fav => fav.title === template.title);
    if (isFavorite) {
      setFavorites(favorites.filter(fav => fav.title !== template.title));
      setSnackbarMessage('Removed from favorites');
    } else {
      setFavorites([...favorites, template]);
      setSnackbarMessage('Added to favorites');
    }
    setOpenSnackbar(true);
  };

  const saveCustomPrompt = () => {
    if (!customPrompt.trim()) {
      setSnackbarMessage('Please enter a custom prompt to save');
      setOpenSnackbar(true);
      return;
    }
    
    const customFavorite = {
      title: `Custom Prompt ${customFavorites.length + 1}`,
      template: customPrompt,
      isCustom: true
    };
    
    setCustomFavorites([...customFavorites, customFavorite]);
    setSnackbarMessage('Custom prompt saved to favorites!');
    setOpenSnackbar(true);
  };

  const removeCustomFavorite = (index) => {
    setCustomFavorites(customFavorites.filter((_, i) => i !== index));
    setSnackbarMessage('Custom favorite removed');
    setOpenSnackbar(true);
  };

  // Load favorites from localStorage on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedFavorites = localStorage.getItem('promptGenerator_favorites');
      const storedCustomFavorites = localStorage.getItem('promptGenerator_customFavorites');
      
      if (storedFavorites) {
        try {
          setFavorites(JSON.parse(storedFavorites));
        } catch (error) {
          console.error('Failed to parse stored favorites:', error);
        }
      }
      
      if (storedCustomFavorites) {
        try {
          setCustomFavorites(JSON.parse(storedCustomFavorites));
        } catch (error) {
          console.error('Failed to parse stored custom favorites:', error);
        }
      }
      
      setIsInitialized(true);
    }
  }, []);

  // Save favorites to localStorage whenever they change (but only after initialization)
  useEffect(() => {
    if (isInitialized && typeof window !== 'undefined') {
      localStorage.setItem('promptGenerator_favorites', JSON.stringify(favorites));
    }
  }, [favorites, isInitialized]);

  // Save custom favorites to localStorage whenever they change (but only after initialization)
  useEffect(() => {
    if (isInitialized && typeof window !== 'undefined') {
      localStorage.setItem('promptGenerator_customFavorites', JSON.stringify(customFavorites));
    }
  }, [customFavorites, isInitialized]);

  const statistics = {
    promptLength: customPrompt.length,
    wordCount: customPrompt.trim().split(/\s+/).length,
    templateCount: Object.values(promptTemplates).reduce((sum, templates) => sum + templates.length, 0),
    favoriteCount: favorites.length + customFavorites.length
  };

  return (
    <Box sx={{ p: 2 }}>
      <Head>
        <title>{name} | AI Developer Tools</title>
        <meta name="description" content={description} />
      </Head>

      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
        <SmartToyIcon sx={{ mr: 2, verticalAlign: 'middle' }} />
        AI Prompt Generator & Optimizer
      </Typography>

      <Grid container spacing={3}>
        {/* Main Content */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
            <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
              <Tab label="Custom Prompt" />
              <Tab label="Templates" />
              <Tab label="Favorites" />
            </Tabs>

            {activeTab === 0 && (
              <Box sx={{ mt: 3 }}>
                <Grid container spacing={2} sx={{ mb: 3 }}>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <FormControl fullWidth>
                      <InputLabel>AI Model</InputLabel>
                      <Select
                        value={selectedModel}
                        onChange={(e) => setSelectedModel(e.target.value)}
                      >
                        {Object.entries(aiModels).map(([key, name]) => (
                          <MenuItem key={key} value={key}>{name}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <FormControl fullWidth>
                      <InputLabel>Role</InputLabel>
                      <Select
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value)}
                      >
                        {Object.entries(roleTemplates).map(([key, template]) => (
                          <MenuItem key={key} value={key}>
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <Button
                      variant="contained"
                      startIcon={<AutoFixHighIcon />}
                      onClick={optimizePrompt}
                      fullWidth
                      sx={{ height: '56px' }}
                    >
                      Optimize
                    </Button>
                  </Grid>
                </Grid>

                <TextField
                  label="Your Prompt"
                  multiline
                  rows={6}
                  fullWidth
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder="Enter your prompt here and click Optimize to improve it..."
                  sx={{ mb: 2 }}
                />

                <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
                  <Button 
                    variant="outlined" 
                    onClick={saveCustomPrompt}
                    disabled={!customPrompt.trim()}
                  >
                    Save to Favorites
                  </Button>
                  <Button 
                    variant="outlined" 
                    onClick={() => setCustomPrompt('')}
                  >
                    Clear
                  </Button>
                </Box>

                {optimizedPrompt && (
                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="h6">Optimized Prompt</Typography>
                      <IconButton onClick={() => copyToClipboard(optimizedPrompt)}>
                        <ContentCopyIcon />
                      </IconButton>
                    </Box>
                    <Paper sx={{ p: 2, backgroundColor: 'action.hover', whiteSpace: 'pre-wrap' }}>
                      {optimizedPrompt}
                    </Paper>
                  </Box>
                )}
              </Box>
            )}

            {activeTab === 1 && (
              <Box sx={{ mt: 3 }}>
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {Object.entries(promptCategories).map(([key, name]) => (
                      <MenuItem key={key} value={key}>{name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Grid container spacing={2}>
                  {promptTemplates[selectedCategory]?.map((template, index) => (
                    <Grid size={{ xs: 12 }} key={index}>
                      <Card variant="outlined">
                        <CardContent>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                            <Typography variant="h6" gutterBottom>
                              {template.title}
                            </Typography>
                            <Box>
                              <IconButton
                                onClick={() => toggleFavorite(template)}
                                color={favorites.some(fav => fav.title === template.title) ? 'error' : 'default'}
                              >
                                {favorites.some(fav => fav.title === template.title) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                              </IconButton>
                              <IconButton onClick={() => copyToClipboard(template.template)}>
                                <ContentCopyIcon />
                              </IconButton>
                            </Box>
                          </Box>
                          <Typography variant="body2" sx={{ mb: 2, fontFamily: 'monospace', backgroundColor: 'action.hover', p: 1, borderRadius: 1 }}>
                            {template.template}
                          </Typography>
                          <Button variant="outlined" size="small" onClick={() => loadTemplate(template)}>
                            Use Template
                          </Button>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}

            {activeTab === 2 && (
              <Box sx={{ mt: 3 }}>
                {favorites.length === 0 && customFavorites.length === 0 ? (
                  <Alert severity="info">
                    No favorite prompts yet. Click the heart icon on templates to add them to favorites, or save custom prompts.
                  </Alert>
                ) : (
                  <Box>
                    {customFavorites.length > 0 && (
                      <Box sx={{ mb: 4 }}>
                        <Typography variant="h6" gutterBottom>Custom Favorites</Typography>
                        <Grid container spacing={2}>
                          {customFavorites.map((template, index) => (
                            <Grid size={{ xs: 12 }} key={`custom-${index}`}>
                              <Card variant="outlined">
                                <CardContent>
                                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                    <Typography variant="h6" gutterBottom>
                                      {template.title}
                                    </Typography>
                                    <Box>
                                      <IconButton
                                        onClick={() => removeCustomFavorite(index)}
                                        color="error"
                                      >
                                        <FavoriteIcon />
                                      </IconButton>
                                      <IconButton onClick={() => copyToClipboard(template.template)}>
                                        <ContentCopyIcon />
                                      </IconButton>
                                    </Box>
                                  </Box>
                                  <Typography variant="body2" sx={{ mb: 2, fontFamily: 'monospace', backgroundColor: 'action.hover', p: 1, borderRadius: 1 }}>
                                    {template.template}
                                  </Typography>
                                  <Button variant="outlined" size="small" onClick={() => loadTemplate(template)}>
                                    Use Template
                                  </Button>
                                </CardContent>
                              </Card>
                            </Grid>
                          ))}
                        </Grid>
                      </Box>
                    )}
                    
                    {favorites.length > 0 && (
                      <Box>
                        <Typography variant="h6" gutterBottom>Template Favorites</Typography>
                        <Grid container spacing={2}>
                          {favorites.map((template, index) => (
                            <Grid size={{ xs: 12 }} key={`template-${index}`}>
                              <Card variant="outlined">
                                <CardContent>
                                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                    <Typography variant="h6" gutterBottom>
                                      {template.title}
                                    </Typography>
                                    <Box>
                                      <IconButton
                                        onClick={() => toggleFavorite(template)}
                                        color="error"
                                      >
                                        <FavoriteIcon />
                                      </IconButton>
                                      <IconButton onClick={() => copyToClipboard(template.template)}>
                                        <ContentCopyIcon />
                                      </IconButton>
                                    </Box>
                                  </Box>
                                  <Typography variant="body2" sx={{ mb: 2, fontFamily: 'monospace', backgroundColor: 'action.hover', p: 1, borderRadius: 1 }}>
                                    {template.template}
                                  </Typography>
                                  <Button variant="outlined" size="small" onClick={() => loadTemplate(template)}>
                                    Use Template
                                  </Button>
                                </CardContent>
                              </Card>
                            </Grid>
                          ))}
                        </Grid>
                      </Box>
                    )}
                  </Box>
                )}
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Sidebar */}
        <Grid size={{ xs: 12, md: 4 }}>
          {/* Statistics */}
          <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Statistics
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 6 }}>
                <Typography variant="body2">
                  Characters: <strong>{statistics.promptLength}</strong>
                </Typography>
                <Typography variant="body2">
                  Words: <strong>{statistics.wordCount}</strong>
                </Typography>
              </Grid>
              <Grid size={{ xs: 6 }}>
                <Typography variant="body2">
                  Templates: <strong>{statistics.templateCount}</strong>
                </Typography>
                <Typography variant="body2">
                  Favorites: <strong>{statistics.favoriteCount}</strong>
                </Typography>
              </Grid>
            </Grid>
          </Paper>

          {/* Optimization Tips */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LightbulbIcon sx={{ mr: 1 }} />
                <Typography variant="h6">Optimization Tips</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <List dense>
                {optimizationTips.map((tip, index) => (
                  <ListItem key={index}>
                    <ListItemText 
                      primary={tip}
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
      />
    </Box>
  );
}
