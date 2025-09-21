import React, { useState, useEffect, useMemo } from 'react';
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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculateIcon from '@mui/icons-material/Calculate';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import TokenIcon from '@mui/icons-material/Token';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import Head from 'next/head';

export default function TokenCounter({ name, description }) {
  const [inputText, setInputText] = useState('');
  const [selectedModel, setSelectedModel] = useState('gpt-5');
  const [batchTexts, setBatchTexts] = useState('');
  const [activeMode, setActiveMode] = useState('single');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // OpenAI pricing (as of 2024) - prices per 1K tokens
  const modelPricing = {
    'gpt-5': { input: 0.01, output: 0.03, name: 'GPT-5 (Latest)' },
    'gpt-4': { input: 0.03, output: 0.06, name: 'GPT-4' },
    'gpt-4-turbo': { input: 0.01, output: 0.03, name: 'GPT-4 Turbo' },
    'gpt-3.5-turbo': { input: 0.0015, output: 0.002, name: 'GPT-3.5 Turbo' },
    'text-embedding-ada-002': { input: 0.0001, output: 0.0001, name: 'Text Embedding Ada' },
    'gpt-4-vision': { input: 0.01, output: 0.03, name: 'GPT-4 Vision' },
    'dall-e-3': { input: 0.04, output: 0.08, name: 'DALL-E 3 (per image)' }
  };

  // Simple token estimation - more accurate would require tiktoken
  const estimateTokens = (text) => {
    if (!text) return 0;
    // Rough estimation: ~4 characters per token for English text
    // This is a simplified version - real implementation would use tiktoken
    const words = text.trim().split(/\s+/).length;
    const characters = text.length;
    
    // Better estimation considering punctuation, spaces, etc.
    return Math.ceil(characters / 4);
  };

  const calculateCost = (tokens, model, type = 'input') => {
    const pricing = modelPricing[model];
    if (!pricing) return 0;
    
    const costPer1K = type === 'input' ? pricing.input : pricing.output;
    return (tokens / 1000) * costPer1K;
  };

  const tokenCount = useMemo(() => estimateTokens(inputText), [inputText]);
  const inputCost = useMemo(() => calculateCost(tokenCount, selectedModel, 'input'), [tokenCount, selectedModel]);
  const outputCost = useMemo(() => calculateCost(tokenCount, selectedModel, 'output'), [tokenCount, selectedModel]);

  const batchResults = useMemo(() => {
    if (!batchTexts.trim()) return [];
    
    const lines = batchTexts.split('\n').filter(line => line.trim());
    return lines.map((text, index) => {
      const tokens = estimateTokens(text);
      const cost = calculateCost(tokens, selectedModel, 'input');
      return {
        id: index + 1,
        text: text.substring(0, 50) + (text.length > 50 ? '...' : ''),
        tokens,
        cost,
        fullText: text
      };
    });
  }, [batchTexts, selectedModel]);

  const batchTotals = useMemo(() => {
    const totalTokens = batchResults.reduce((sum, item) => sum + item.tokens, 0);
    const totalCost = batchResults.reduce((sum, item) => sum + item.cost, 0);
    return { totalTokens, totalCost };
  }, [batchResults]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setSnackbarMessage('Copied to clipboard!');
      setOpenSnackbar(true);
    });
  };

  const loadSampleText = () => {
    const sample = `You are an expert AI assistant specialized in helping developers build applications. 

Please analyze the following code and provide suggestions for optimization, security improvements, and best practices. Consider performance, readability, and maintainability in your recommendations.

Your response should include:
1. Code review with specific line-by-line feedback
2. Security vulnerability assessment
3. Performance optimization suggestions
4. Best practice recommendations
5. Alternative approaches or design patterns

Please format your response with clear headings and code examples where appropriate.`;
    
    setInputText(sample);
    setSnackbarMessage('Sample text loaded!');
    setOpenSnackbar(true);
  };

  const loadBatchSample = () => {
    const samples = [
      "Explain quantum computing in simple terms",
      "Write a Python function to sort a list of dictionaries",
      "What are the benefits of using TypeScript over JavaScript?",
      "Create a marketing email for a new product launch",
      "Summarize the key points of machine learning"
    ];
    
    setBatchTexts(samples.join('\n'));
    setSnackbarMessage('Batch samples loaded!');
    setOpenSnackbar(true);
  };

  const exportResults = () => {
    let exportData = '';
    
    if (activeMode === 'single') {
      exportData = `Token Analysis Report
Model: ${modelPricing[selectedModel].name}
Text Length: ${inputText.length} characters
Estimated Tokens: ${tokenCount}
Input Cost: $${inputCost.toFixed(6)}
Output Cost: $${outputCost.toFixed(6)}
Total Cost (Input + Output): $${(inputCost + outputCost).toFixed(6)}

Text:
${inputText}`;
    } else {
      exportData = `Batch Token Analysis Report
Model: ${modelPricing[selectedModel].name}
Total Items: ${batchResults.length}
Total Tokens: ${batchTotals.totalTokens}
Total Cost: $${batchTotals.totalCost.toFixed(6)}

Item Details:
${batchResults.map(item => `${item.id}. ${item.text} | ${item.tokens} tokens | $${item.cost.toFixed(6)}`).join('\n')}`;
    }

    const blob = new Blob([exportData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `token-analysis-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    setSnackbarMessage('Results exported!');
    setOpenSnackbar(true);
  };

  const statistics = {
    characters: inputText.length,
    words: inputText.trim().split(/\s+/).filter(word => word.length > 0).length,
    tokens: tokenCount,
    costPer1K: modelPricing[selectedModel]?.input || 0
  };

  return (
    <Box sx={{ p: 2 }}>
      <Head>
        <title>{name} | AI Developer Tools</title>
        <meta name="description" content={description} />
      </Head>

      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
        <TokenIcon sx={{ mr: 2, verticalAlign: 'middle' }} />
        OpenAI Token Counter & Cost Calculator
      </Typography>

      <Grid container spacing={3}>
        {/* Main Content */}
        <Grid size={{ xs: 12, md: 8 }}>
          {/* Model Selection */}
          <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Model Configuration
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl fullWidth>
                  <InputLabel>OpenAI Model</InputLabel>
                  <Select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                  >
                    {Object.entries(modelPricing).map(([key, model]) => (
                      <MenuItem key={key} value={key}>
                        {model.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Alert severity="info">
                  Input: ${modelPricing[selectedModel]?.input}/1K tokens | 
                  Output: ${modelPricing[selectedModel]?.output}/1K tokens
                </Alert>
              </Grid>
            </Grid>
          </Paper>

          {/* Mode Toggle */}
          <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
              <Button
                variant={activeMode === 'single' ? 'contained' : 'outlined'}
                onClick={() => setActiveMode('single')}
              >
                Single Text
              </Button>
              <Button
                variant={activeMode === 'batch' ? 'contained' : 'outlined'}
                onClick={() => setActiveMode('batch')}
              >
                Batch Processing
              </Button>
            </Box>

            {activeMode === 'single' ? (
              <Box>
                <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                  <Button variant="outlined" onClick={loadSampleText}>
                    Load Sample
                  </Button>
                  <Button variant="outlined" onClick={() => setInputText('')}>
                    Clear
                  </Button>
                  <Button variant="outlined" onClick={exportResults}>
                    Export Results
                  </Button>
                </Box>

                <TextField
                  label="Text to Analyze"
                  multiline
                  rows={8}
                  fullWidth
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Enter your text here to count tokens and estimate costs..."
                  sx={{ mb: 3 }}
                />

                {/* Results */}
                <Paper sx={{ p: 3, backgroundColor: 'action.hover' }}>
                  <Typography variant="h6" gutterBottom>
                    Analysis Results
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 6, md: 3 }}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h4" color="primary">
                          {tokenCount}
                        </Typography>
                        <Typography variant="body2">Tokens</Typography>
                      </Box>
                    </Grid>
                    <Grid size={{ xs: 6, md: 3 }}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h4" color="success.main">
                          ${inputCost.toFixed(6)}
                        </Typography>
                        <Typography variant="body2">Input Cost</Typography>
                      </Box>
                    </Grid>
                    <Grid size={{ xs: 6, md: 3 }}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h4" color="warning.main">
                          ${outputCost.toFixed(6)}
                        </Typography>
                        <Typography variant="body2">Output Cost</Typography>
                      </Box>
                    </Grid>
                    <Grid size={{ xs: 6, md: 3 }}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h4" color="error.main">
                          ${(inputCost + outputCost).toFixed(6)}
                        </Typography>
                        <Typography variant="body2">Total Cost</Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Paper>
              </Box>
            ) : (
              <Box>
                <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                  <Button variant="outlined" onClick={loadBatchSample}>
                    Load Samples
                  </Button>
                  <Button variant="outlined" onClick={() => setBatchTexts('')}>
                    Clear All
                  </Button>
                  <Button variant="outlined" onClick={exportResults}>
                    Export Results
                  </Button>
                </Box>

                <TextField
                  label="Batch Text (one per line)"
                  multiline
                  rows={6}
                  fullWidth
                  value={batchTexts}
                  onChange={(e) => setBatchTexts(e.target.value)}
                  placeholder="Enter multiple texts, one per line..."
                  sx={{ mb: 3 }}
                />

                {batchResults.length > 0 && (
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Batch Results
                    </Typography>
                    
                    {/* Batch Summary */}
                    <Paper sx={{ p: 2, mb: 3, backgroundColor: 'action.hover' }}>
                      <Grid container spacing={2}>
                        <Grid size={{ xs: 3 }}>
                          <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h5" color="primary">
                              {batchResults.length}
                            </Typography>
                            <Typography variant="body2">Items</Typography>
                          </Box>
                        </Grid>
                        <Grid size={{ xs: 3 }}>
                          <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h5" color="primary">
                              {batchTotals.totalTokens}
                            </Typography>
                            <Typography variant="body2">Total Tokens</Typography>
                          </Box>
                        </Grid>
                        <Grid size={{ xs: 3 }}>
                          <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h5" color="success.main">
                              ${batchTotals.totalCost.toFixed(4)}
                            </Typography>
                            <Typography variant="body2">Total Cost</Typography>
                          </Box>
                        </Grid>
                        <Grid size={{ xs: 3 }}>
                          <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h5" color="warning.main">
                              ${(batchTotals.totalCost / batchResults.length).toFixed(4)}
                            </Typography>
                            <Typography variant="body2">Avg Cost</Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </Paper>

                    {/* Detailed Results Table */}
                    <TableContainer component={Paper}>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Text Preview</TableCell>
                            <TableCell align="right">Tokens</TableCell>
                            <TableCell align="right">Cost</TableCell>
                            <TableCell align="center">Actions</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {batchResults.map((row) => (
                            <TableRow key={row.id}>
                              <TableCell>{row.id}</TableCell>
                              <TableCell>{row.text}</TableCell>
                              <TableCell align="right">
                                <Chip label={row.tokens} size="small" />
                              </TableCell>
                              <TableCell align="right">
                                <Chip label={`$${row.cost.toFixed(6)}`} size="small" color="success" />
                              </TableCell>
                              <TableCell align="center">
                                <IconButton 
                                  size="small" 
                                  onClick={() => copyToClipboard(row.fullText)}
                                >
                                  <ContentCopyIcon />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
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
              <CalculateIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
              Quick Stats
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 6 }}>
                <Typography variant="body2">
                  Characters: <strong>{statistics.characters}</strong>
                </Typography>
                <Typography variant="body2">
                  Words: <strong>{statistics.words}</strong>
                </Typography>
              </Grid>
              <Grid size={{ xs: 6 }}>
                <Typography variant="body2">
                  Tokens: <strong>{statistics.tokens}</strong>
                </Typography>
                <Typography variant="body2">
                  Rate: <strong>${statistics.costPer1K}/1K</strong>
                </Typography>
              </Grid>
            </Grid>
          </Paper>

          {/* Model Comparison */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TrendingUpIcon sx={{ mr: 1 }} />
                <Typography variant="h6">Model Comparison</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Model</TableCell>
                    <TableCell align="right">Cost</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.entries(modelPricing).map(([key, model]) => (
                    <TableRow key={key}>
                      <TableCell>{model.name}</TableCell>
                      <TableCell align="right">
                        ${calculateCost(tokenCount, key, 'input').toFixed(6)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </AccordionDetails>
          </Accordion>

          {/* Token Tips */}
          <Accordion sx={{ mt: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">💡 Token Tips</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" paragraph>
                • 1 token ≈ 4 characters for English text
              </Typography>
              <Typography variant="body2" paragraph>
                • Common words are usually 1 token
              </Typography>
              <Typography variant="body2" paragraph>
                • Punctuation often counts as separate tokens
              </Typography>
              <Typography variant="body2" paragraph>
                • Code and special characters use more tokens
              </Typography>
              <Typography variant="body2">
                • Use shorter prompts to reduce costs
              </Typography>
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
