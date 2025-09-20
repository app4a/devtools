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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Stack,
  FormControlLabel,
  Switch,
  Slider,
  ToggleButtonGroup,
  ToggleButton
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ClearIcon from '@mui/icons-material/Clear';
import ArticleIcon from '@mui/icons-material/Article';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DownloadIcon from '@mui/icons-material/Download';
import InfoIcon from '@mui/icons-material/Info';
import RefreshIcon from '@mui/icons-material/Refresh';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import Head from 'next/head';

// Lorem Ipsum words
const loremWords = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
  'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
  'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
  'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
  'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
  'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
  'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
  'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum', 'at', 'vero', 'eos',
  'accusamus', 'accusantium', 'doloremque', 'laudantium', 'totam', 'rem',
  'aperiam', 'eaque', 'ipsa', 'quae', 'ab', 'illo', 'inventore', 'veritatis',
  'et', 'quasi', 'architecto', 'beatae', 'vitae', 'dicta', 'sunt', 'explicabo'
];

// Tech words for tech lorem
const techWords = [
  'algorithm', 'api', 'backend', 'database', 'frontend', 'framework', 'function',
  'interface', 'javascript', 'library', 'method', 'object', 'parameter', 'query',
  'react', 'server', 'typescript', 'variable', 'component', 'module', 'class',
  'async', 'await', 'promise', 'callback', 'event', 'listener', 'handler',
  'middleware', 'authentication', 'authorization', 'encryption', 'deployment',
  'optimization', 'performance', 'scalability', 'microservice', 'container',
  'docker', 'kubernetes', 'devops', 'pipeline', 'repository', 'branch', 'commit',
  'merge', 'pull', 'request', 'issue', 'bug', 'feature', 'testing', 'unit',
  'integration', 'endpoint', 'response', 'request', 'status', 'code', 'protocol'
];

// Corporate words
const corporateWords = [
  'synergy', 'leverage', 'paradigm', 'optimize', 'streamline', 'ecosystem',
  'innovative', 'disruptive', 'scalable', 'robust', 'agile', 'dynamic',
  'strategic', 'holistic', 'enterprise', 'solution', 'platform', 'framework',
  'methodology', 'deliverable', 'stakeholder', 'engagement', 'implementation',
  'integration', 'transformation', 'optimization', 'efficiency', 'productivity',
  'collaboration', 'communication', 'leadership', 'management', 'governance',
  'compliance', 'analytics', 'insights', 'intelligence', 'automation',
  'digitalization', 'innovation', 'excellence', 'quality', 'performance',
  'sustainability', 'responsibility', 'accountability', 'transparency',
  'partnership', 'relationship', 'customer', 'client', 'service', 'support'
];

const textTypes = {
  'Lorem Ipsum': loremWords,
  'Tech Lorem': techWords,
  'Corporate Speak': corporateWords
};

const outputTypes = {
  'Plain Text': 'plain',
  'Paragraphs': 'paragraphs',
  'Ordered List': 'ol',
  'Unordered List': 'ul',
  'HTML Paragraphs': 'html-p'
};

export default function LoremIpsumGenerator({ name, description }) {
  const [textType, setTextType] = useState('Lorem Ipsum');
  const [outputType, setOutputType] = useState('Plain Text');
  const [unitType, setUnitType] = useState('paragraphs');
  const [count, setCount] = useState(3);
  const [wordsPerSentence, setWordsPerSentence] = useState([8, 15]);
  const [sentencesPerParagraph, setSentencesPerParagraph] = useState([4, 8]);
  const [startWithLorem, setStartWithLorem] = useState(true);
  const [generatedText, setGeneratedText] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Generate random number between min and max
  const randomBetween = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  // Capitalize first letter
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  // Generate a sentence
  const generateSentence = (words, isFirst = false) => {
    const wordCount = randomBetween(wordsPerSentence[0], wordsPerSentence[1]);
    const selectedWords = [];
    
    // First sentence might start with "Lorem ipsum" if enabled
    if (isFirst && startWithLorem && textType === 'Lorem Ipsum') {
      selectedWords.push('Lorem', 'ipsum');
    }
    
    // Fill remaining words
    while (selectedWords.length < wordCount) {
      const randomWord = words[Math.floor(Math.random() * words.length)];
      selectedWords.push(randomWord);
    }
    
    // Capitalize first word and end with period
    selectedWords[0] = capitalize(selectedWords[0]);
    return selectedWords.join(' ') + '.';
  };

  // Generate a paragraph
  const generateParagraph = (words, isFirst = false) => {
    const sentenceCount = randomBetween(sentencesPerParagraph[0], sentencesPerParagraph[1]);
    const sentences = [];
    
    for (let i = 0; i < sentenceCount; i++) {
      sentences.push(generateSentence(words, isFirst && i === 0));
    }
    
    return sentences.join(' ');
  };

  // Generate words
  const generateWords = (words, count) => {
    const result = [];
    for (let i = 0; i < count; i++) {
      result.push(words[Math.floor(Math.random() * words.length)]);
    }
    return result.join(' ');
  };

  // Generate sentences
  const generateSentences = (words, count) => {
    const result = [];
    for (let i = 0; i < count; i++) {
      result.push(generateSentence(words, i === 0));
    }
    return result.join(' ');
  };

  // Generate content based on settings
  const generateContent = () => {
    const words = textTypes[textType];
    let content = '';

    switch (unitType) {
      case 'words':
        content = generateWords(words, count);
        break;
      case 'sentences':
        content = generateSentences(words, count);
        break;
      case 'paragraphs':
        const paragraphs = [];
        for (let i = 0; i < count; i++) {
          paragraphs.push(generateParagraph(words, i === 0));
        }
        content = paragraphs.join('\n\n');
        break;
      default:
        content = generateParagraph(words);
    }

    return content;
  };

  // Format output based on output type
  const formatOutput = (content) => {
    const paragraphs = content.split('\n\n');
    
    switch (outputTypes[outputType]) {
      case 'plain':
        return content;
      case 'paragraphs':
        return content;
      case 'ol':
        return paragraphs.map((p, i) => `${i + 1}. ${p}`).join('\n');
      case 'ul':
        return paragraphs.map(p => `• ${p}`).join('\n');
      case 'html-p':
        return paragraphs.map(p => `<p>${p}</p>`).join('\n');
      default:
        return content;
    }
  };

  // Generate text
  useEffect(() => {
    const content = generateContent();
    const formatted = formatOutput(content);
    setGeneratedText(formatted);
  }, [textType, outputType, unitType, count, wordsPerSentence, sentencesPerParagraph, startWithLorem]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setSnackbarMessage('Text copied to clipboard!');
      setOpenSnackbar(true);
    });
  };

  const downloadText = () => {
    const blob = new Blob([generatedText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lorem-ipsum-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    setSnackbarMessage('Text downloaded!');
    setOpenSnackbar(true);
  };

  const regenerateText = () => {
    const content = generateContent();
    const formatted = formatOutput(content);
    setGeneratedText(formatted);
    setSnackbarMessage('Text regenerated!');
    setOpenSnackbar(true);
  };

  const clearText = () => {
    setGeneratedText('');
  };

  const statistics = {
    characters: generatedText.length,
    charactersNoSpaces: generatedText.replace(/\s/g, '').length,
    words: generatedText.trim().split(/\s+/).length,
    sentences: generatedText.split(/[.!?]+/).filter(s => s.trim()).length,
    paragraphs: generatedText.split('\n\n').filter(p => p.trim()).length
  };

  return (
    <Box sx={{ p: 2 }}>
      <Head>
        <title>{name} | Developer Tools</title>
        <meta name="description" content={description} />
      </Head>

      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
        <ArticleIcon sx={{ mr: 2, verticalAlign: 'middle' }} />
        Lorem Ipsum Generator
      </Typography>

      <Grid container spacing={3}>
        {/* Settings Section */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper elevation={2} sx={{ p: 2, height: 'fit-content' }}>
            <Typography variant="h6" gutterBottom>
              Generation Settings
            </Typography>

            {/* Text Type */}
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Text Type</InputLabel>
              <Select
                value={textType}
                label="Text Type"
                onChange={(e) => setTextType(e.target.value)}
              >
                {Object.keys(textTypes).map(type => (
                  <MenuItem key={type} value={type}>{type}</MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Unit Type */}
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Generate</InputLabel>
              <Select
                value={unitType}
                label="Generate"
                onChange={(e) => setUnitType(e.target.value)}
              >
                <MenuItem value="words">Words</MenuItem>
                <MenuItem value="sentences">Sentences</MenuItem>
                <MenuItem value="paragraphs">Paragraphs</MenuItem>
              </Select>
            </FormControl>

            {/* Count */}
            <TextField
              fullWidth
              type="number"
              label={`Number of ${unitType}`}
              value={count}
              onChange={(e) => setCount(Math.max(1, parseInt(e.target.value) || 1))}
              inputProps={{ min: 1, max: 100 }}
              sx={{ mb: 2 }}
            />

            {/* Output Format */}
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Output Format</InputLabel>
              <Select
                value={outputType}
                label="Output Format"
                onChange={(e) => setOutputType(e.target.value)}
              >
                {Object.keys(outputTypes).map(type => (
                  <MenuItem key={type} value={type}>{type}</MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Advanced Settings */}
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle2">Advanced Settings</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack spacing={2}>
                  {textType === 'Lorem Ipsum' && (
                    <FormControlLabel
                      control={
                        <Switch
                          checked={startWithLorem}
                          onChange={(e) => setStartWithLorem(e.target.checked)}
                        />
                      }
                      label="Start with 'Lorem ipsum'"
                    />
                  )}

                  <Typography gutterBottom>Words per sentence: {wordsPerSentence[0]} - {wordsPerSentence[1]}</Typography>
                  <Slider
                    value={wordsPerSentence}
                    onChange={(e, newValue) => setWordsPerSentence(newValue)}
                    valueLabelDisplay="auto"
                    min={3}
                    max={25}
                    marks={[
                      { value: 5, label: '5' },
                      { value: 15, label: '15' },
                      { value: 25, label: '25' }
                    ]}
                  />

                  <Typography gutterBottom>Sentences per paragraph: {sentencesPerParagraph[0]} - {sentencesPerParagraph[1]}</Typography>
                  <Slider
                    value={sentencesPerParagraph}
                    onChange={(e, newValue) => setSentencesPerParagraph(newValue)}
                    valueLabelDisplay="auto"
                    min={2}
                    max={15}
                    marks={[
                      { value: 3, label: '3' },
                      { value: 8, label: '8' },
                      { value: 15, label: '15' }
                    ]}
                  />
                </Stack>
              </AccordionDetails>
            </Accordion>

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 2 }}>
              <Button
                variant="contained"
                size="small"
                onClick={regenerateText}
                startIcon={<RefreshIcon />}
              >
                Regenerate
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={() => copyToClipboard(generatedText)}
                startIcon={<ContentCopyIcon />}
              >
                Copy
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={downloadText}
                startIcon={<DownloadIcon />}
              >
                Download
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={clearText}
                startIcon={<ClearIcon />}
              >
                Clear
              </Button>
            </Box>

            {/* Statistics */}
            <Card sx={{ mt: 2 }}>
              <CardContent>
                <Typography variant="subtitle2" gutterBottom>
                  Statistics
                </Typography>
                <Grid container spacing={1}>
                  <Grid size={{ xs: 6 }}>
                    <Typography variant="body2">
                      Characters: <strong>{statistics.characters}</strong>
                    </Typography>
                    <Typography variant="body2">
                      No spaces: <strong>{statistics.charactersNoSpaces}</strong>
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <Typography variant="body2">
                      Words: <strong>{statistics.words}</strong>
                    </Typography>
                    <Typography variant="body2">
                      Sentences: <strong>{statistics.sentences}</strong>
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <Typography variant="body2">
                      Paragraphs: <strong>{statistics.paragraphs}</strong>
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Paper>
        </Grid>

        {/* Output Section */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper elevation={2} sx={{ p: 2, height: 'fit-content' }}>
            <Typography variant="h6" gutterBottom>
              Generated Text
            </Typography>

            <TextField
              fullWidth
              multiline
              rows={20}
              variant="outlined"
              value={generatedText}
              InputProps={{
                readOnly: true,
              }}
              sx={{ mb: 2 }}
            />
          </Paper>
        </Grid>

        {/* Help Section */}
        <Grid size={{ xs: 12 }}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">
                <InfoIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                About Lorem Ipsum & Text Types
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Lorem Ipsum
                  </Typography>
                  <Typography variant="body2">
                    Lorem Ipsum is dummy text used in the printing and typesetting industry. 
                    It has been the industry's standard dummy text since the 1500s, derived 
                    from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" 
                    by Cicero.
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Tech Lorem
                  </Typography>
                  <Typography variant="body2">
                    A modern twist on Lorem Ipsum using technology-related terms. Perfect for 
                    tech demos, software prototypes, and when you want placeholder text that 
                    feels more relevant to your development context.
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Corporate Speak
                  </Typography>
                  <Typography variant="body2">
                    Business jargon and corporate buzzwords assembled into readable placeholder 
                    text. Ideal for business presentations, corporate websites, and when you need 
                    professional-sounding dummy content.
                  </Typography>
                </Grid>
              </Grid>
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
