import React, { useState, useMemo, useCallback, useRef } from 'react';
import {
  Box,
  Typography,
  TextField,
  Paper,
  Grid,
  IconButton,
  Snackbar,
  ToggleButtonGroup,
  ToggleButton,
  Button,
  Card,
  CardContent,
  Alert,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  LinearProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
  Chip
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import SortIcon from '@mui/icons-material/Sort';
import FilterListIcon from '@mui/icons-material/FilterList';
import InfoIcon from '@mui/icons-material/Info';
import ClearIcon from '@mui/icons-material/Clear';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import TextFieldsIcon from '@mui/icons-material/TextFields';
export default function SortDedup({ name, description }) {
  const [inputText, setInputText] = useState('apple\nbanana\napple\ncherry\nbanana\ndate\n123\n456\n123');
  const [currentTab, setCurrentTab] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [processing, setProcessing] = useState(false);
  
  // Sorting options
  const [sortType, setSortType] = useState('none');
  const [sortOrder, setSortOrder] = useState('asc');
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [numericSort, setNumericSort] = useState(false);
  
  // Deduplication options
  const [enableDedup, setEnableDedup] = useState(false);
  const [dedupCaseSensitive, setDedupCaseSensitive] = useState(false);
  const [keepOption, setKeepOption] = useState('first'); // first, last
  
  // File handling
  const fileInputRef = useRef(null);

  const processedText = useMemo(() => {
    if (!inputText.trim()) return '';
    
    setProcessing(true);
    
    let lines = inputText.split('\n');
    
    // Remove empty lines if requested
    lines = lines.filter(line => line.trim() !== '');
    
    // Deduplication
    if (enableDedup) {
      const seen = new Set();
      const dedupedLines = [];
      
      if (keepOption === 'first') {
        lines.forEach(line => {
          const key = dedupCaseSensitive ? line : line.toLowerCase();
          if (!seen.has(key)) {
            seen.add(key);
            dedupedLines.push(line);
          }
        });
        lines = dedupedLines;
      } else if (keepOption === 'last') {
        const reversedLines = [...lines].reverse();
        reversedLines.forEach(line => {
          const key = dedupCaseSensitive ? line : line.toLowerCase();
          if (!seen.has(key)) {
            seen.add(key);
            dedupedLines.unshift(line);
          }
        });
        lines = dedupedLines;
      }
    }
    
    // Sorting
    if (sortType !== 'none') {
      lines.sort((a, b) => {
        let result;
        
        if (sortType === 'length') {
          // Sort by string length
          result = a.length - b.length;
        } else {
          // Alphabetical or numeric sorting
          let aVal = caseSensitive ? a : a.toLowerCase();
          let bVal = caseSensitive ? b : b.toLowerCase();
          
          if (numericSort) {
            const aNum = parseFloat(aVal);
            const bNum = parseFloat(bVal);
            
            if (!isNaN(aNum) && !isNaN(bNum)) {
              aVal = aNum;
              bVal = bNum;
            }
          }
          
          if (typeof aVal === 'number' && typeof bVal === 'number') {
            result = aVal - bVal;
          } else {
            result = aVal.localeCompare(bVal);
          }
        }
        
        return sortOrder === 'desc' ? -result : result;
      });
    }
    
    setTimeout(() => setProcessing(false), 100);
    
    return lines.join('\n');
  }, [inputText, sortType, sortOrder, caseSensitive, numericSort, enableDedup, dedupCaseSensitive, keepOption]);

  const statistics = useMemo(() => {
    const original = inputText.trim();
    const processed = processedText.trim();
    
    const originalLines = original ? original.split('\n').filter(line => line.trim() !== '') : [];
    const processedLines = processed ? processed.split('\n').filter(line => line.trim() !== '') : [];
    
    const originalWords = original ? original.split(/\s+/).filter(word => word.length > 0) : [];
    const processedWords = processed ? processed.split(/\s+/).filter(word => word.length > 0) : [];
    
    return {
      original: {
        lines: originalLines.length,
        words: originalWords.length,
        characters: original.length,
        charactersNoSpaces: original.replace(/\s/g, '').length
      },
      processed: {
        lines: processedLines.length,
        words: processedWords.length,
        characters: processed.length,
        charactersNoSpaces: processed.replace(/\s/g, '').length
      },
      reduction: {
        lines: originalLines.length - processedLines.length,
        linesPercentage: originalLines.length > 0 ? ((originalLines.length - processedLines.length) / originalLines.length * 100).toFixed(1) : 0
      }
    };
  }, [inputText, processedText]);

  const handleFileUpload = useCallback((event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setInputText(e.target.result);
      };
      reader.readAsText(file);
    }
  }, []);

  const copyToClipboard = async (text) => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(text);
        setOpenSnackbar(true);
      }
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const downloadResult = () => {
    if (typeof document === 'undefined') return;
    
    const blob = new Blob([processedText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sorted-deduped.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const examples = [
    {
      name: 'Email List Cleanup',
      description: 'Remove duplicate email addresses and sort alphabetically',
      content: `john.doe@example.com
jane.smith@company.org
john.doe@example.com
admin@website.net
jane.smith@company.org
support@service.com
info@business.co
admin@website.net`
    },
    {
      name: 'Shopping List',
      description: 'Organize and deduplicate a shopping list',
      content: `Milk
Bread
Eggs
Milk
Cheese
Bread
Yogurt
Butter
Eggs
Apples`
    },
    {
      name: 'Server Log IPs',
      description: 'Extract and sort unique IP addresses',
      content: `192.168.1.1
10.0.0.1
192.168.1.1
172.16.0.1
10.0.0.1
192.168.1.100
172.16.0.1
192.168.1.1
10.0.0.5`
    },
    {
      name: 'Numeric Data',
      description: 'Sort numeric values and remove duplicates',
      content: `100
25
75
100
50
25
150
200
75
125`
    },
    {
      name: 'Programming Keywords',
      description: 'Sort programming language keywords',
      content: `function
class
if
else
for
while
function
return
class
const
let
var
if
return`
    }
  ];

  return (
    <>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          <SortIcon sx={{ mr: 2, verticalAlign: 'middle' }} />
          {name}
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          {description}
        </Typography>

        <Tabs value={currentTab} onChange={(e, newValue) => setCurrentTab(newValue)} sx={{ mb: 3 }}>
          <Tab label="Sort & Dedup" />
          <Tab label="Examples" />
          <Tab label="Guide" />
        </Tabs>

        {currentTab === 0 && (
          <>
            {/* Input Section */}
            <Paper sx={{ p: 3, mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">
                  <TextFieldsIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Input Text
                </Typography>
                <Button
                  component="label"
                  startIcon={<UploadIcon />}
                  size="small"
                  sx={{ ml: 1 }}
                >
                  Upload File
                  <input
                    type="file"
                    hidden
                    accept=".txt,.csv,.log"
                    onChange={handleFileUpload}
                    ref={fileInputRef}
                    id="file-upload"
                  />
                </Button>
              </Box>
              
              <TextField
                fullWidth
                multiline
                rows={12}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter text to sort and deduplicate... Each line will be processed separately."
                variant="outlined"
                sx={{
                  '& .MuiInputBase-input': {
                    fontFamily: 'monospace',
                    fontSize: '14px'
                  }
                }}
              />
            </Paper>

            {/* Options */}
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Processing Options
              </Typography>
              
              <Grid container spacing={3}>
                {/* Sorting Options */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    <SortIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Sorting
                  </Typography>
                  
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Sort Type</InputLabel>
                    <Select
                      value={sortType}
                      onChange={(e) => setSortType(e.target.value)}
                      label="Sort Type"
                    >
                      <MenuItem value="none">No Sorting</MenuItem>
                      <MenuItem value="alphabetical">Alphabetical</MenuItem>
                      <MenuItem value="length">By Length</MenuItem>
                    </Select>
                  </FormControl>
                  
                  {sortType !== 'none' && (
                    <>
                      <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel>Sort Order</InputLabel>
                        <Select
                          value={sortOrder}
                          onChange={(e) => setSortOrder(e.target.value)}
                          label="Sort Order"
                        >
                          <MenuItem value="asc">Ascending (A → Z)</MenuItem>
                          <MenuItem value="desc">Descending (Z → A)</MenuItem>
                        </Select>
                      </FormControl>
                      
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={caseSensitive}
                            onChange={(e) => setCaseSensitive(e.target.checked)}
                          />
                        }
                        label="Case Sensitive"
                      />
                      
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={numericSort}
                            onChange={(e) => setNumericSort(e.target.checked)}
                          />
                        }
                        label="Numeric Sort"
                      />
                    </>
                  )}
                </Grid>
                
                {/* Deduplication Options */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    <FilterListIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Deduplication
                  </Typography>
                  
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={enableDedup}
                        onChange={(e) => setEnableDedup(e.target.checked)}
                      />
                    }
                    label="Remove Duplicates"
                    sx={{ mb: 2, display: 'block' }}
                  />
                  
                  {enableDedup && (
                    <>
                      <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel>Keep Option</InputLabel>
                        <Select
                          value={keepOption}
                          onChange={(e) => setKeepOption(e.target.value)}
                          label="Keep Option"
                        >
                          <MenuItem value="first">Keep First Occurrence</MenuItem>
                          <MenuItem value="last">Keep Last Occurrence</MenuItem>
                        </Select>
                      </FormControl>
                      
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={dedupCaseSensitive}
                            onChange={(e) => setDedupCaseSensitive(e.target.checked)}
                          />
                        }
                        label="Case Sensitive Dedup"
                      />
                    </>
                  )}
                </Grid>
              </Grid>
            </Paper>

            {/* Statistics */}
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                <FormatListNumberedIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Statistics
              </Typography>
              
              {processing && <LinearProgress sx={{ mb: 2 }} />}
              
              <Grid container spacing={2}>
                <Grid size={{ xs: 6, sm: 3 }}>
                  <Card variant="outlined">
                    <CardContent sx={{ textAlign: 'center', py: 2 }}>
                      <Typography variant="h6" color="primary">
                        {statistics.original.lines}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Original Lines
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                
                <Grid size={{ xs: 6, sm: 3 }}>
                  <Card variant="outlined">
                    <CardContent sx={{ textAlign: 'center', py: 2 }}>
                      <Typography variant="h6" color="success.main">
                        {statistics.processed.lines}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Processed Lines
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                
                <Grid size={{ xs: 6, sm: 3 }}>
                  <Card variant="outlined">
                    <CardContent sx={{ textAlign: 'center', py: 2 }}>
                      <Typography variant="h6" color="error.main">
                        {statistics.reduction.lines}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Lines Removed
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                
                <Grid size={{ xs: 6, sm: 3 }}>
                  <Card variant="outlined">
                    <CardContent sx={{ textAlign: 'center', py: 2 }}>
                      <Typography variant="h6" color="warning.main">
                        {statistics.reduction.linesPercentage}%
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Reduction
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
              
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Words: {statistics.original.words} → {statistics.processed.words} | 
                  Characters: {statistics.original.characters} → {statistics.processed.characters}
                </Typography>
              </Box>
            </Paper>

            {/* Output Section */}
            <Paper sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Processed Output</Typography>
                <Box>
                  <IconButton onClick={() => copyToClipboard(processedText)} size="small" sx={{ mr: 1 }}>
                    <ContentCopyIcon />
                  </IconButton>
                  <IconButton onClick={downloadResult} size="small">
                    <DownloadIcon />
                  </IconButton>
                </Box>
              </Box>
              
              <TextField
                fullWidth
                multiline
                rows={12}
                value={processedText}
                InputProps={{
                  readOnly: true,
                  style: {
                    fontFamily: 'monospace',
                    fontSize: '14px'
                  }
                }}
                variant="outlined"
              />
            </Paper>
          </>
        )}

        {currentTab === 1 && (
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Examples
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Click on any example to load it into the editor.
            </Typography>
            
            <List>
              {examples.map((example, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemButton 
                    onClick={() => {
                      setInputText(example.content);
                      setCurrentTab(0);
                    }}
                    sx={{ py: 2 }}
                  >
                    <ListItemText
                      primary={example.name}
                      secondary={example.description}
                    />
                  </ListItemButton>
                  {index < examples.length - 1 && <Divider />}
                </ListItem>
              ))}
            </List>
          </Paper>
        )}

        {currentTab === 2 && (
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Sort & Dedup Guide
            </Typography>
            
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1">Sorting Options</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" paragraph>
                  <strong>Alphabetical:</strong> Standard A-Z sorting of text lines.
                </Typography>
                <Typography variant="body2" paragraph>
                  <strong>By Length:</strong> Sort lines by their character length.
                </Typography>
                <Typography variant="body2" paragraph>
                  <strong>Case Sensitive:</strong> Treats uppercase and lowercase letters differently (A ≠ a).
                </Typography>
                <Typography variant="body2" paragraph>
                  <strong>Numeric Sort:</strong> Treats numeric values as numbers rather than text (10 comes after 2).
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1">Deduplication Options</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" paragraph>
                  <strong>Keep First:</strong> When duplicates are found, keep the first occurrence and remove the rest.
                </Typography>
                <Typography variant="body2" paragraph>
                  <strong>Keep Last:</strong> When duplicates are found, keep the last occurrence and remove the rest.
                </Typography>
                <Typography variant="body2" paragraph>
                  <strong>Case Sensitive Dedup:</strong> Treats "Apple" and "apple" as different lines.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1">Common Use Cases</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" paragraph>
                  • <strong>Email Lists:</strong> Remove duplicate email addresses from mailing lists
                </Typography>
                <Typography variant="body2" paragraph>
                  • <strong>Log Analysis:</strong> Extract unique IP addresses or error messages
                </Typography>
                <Typography variant="body2" paragraph>
                  • <strong>Data Cleaning:</strong> Clean up CSV data by removing duplicate entries
                </Typography>
                <Typography variant="body2" paragraph>
                  • <strong>Shopping Lists:</strong> Organize and deduplicate grocery or shopping lists
                </Typography>
                <Typography variant="body2" paragraph>
                  • <strong>Word Lists:</strong> Create unique, sorted word lists for various purposes
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Paper>
        )}

        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={() => setOpenSnackbar(false)}
          message="Copied to clipboard!"
        />
      </Box>
    </>
  );
}
