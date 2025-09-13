import React, { useState, useMemo, useCallback } from 'react';
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
  Pagination,
  InputAdornment,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SearchIcon from '@mui/icons-material/Search';
import InfoIcon from '@mui/icons-material/Info';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import CodeIcon from '@mui/icons-material/Code';
import FilterListIcon from '@mui/icons-material/FilterList';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import Head from 'next/head';

// Unicode block ranges and descriptions
const unicodeBlocks = {
  'Basic Latin': { start: 0x0000, end: 0x007F, description: 'ASCII characters' },
  'Latin-1 Supplement': { start: 0x0080, end: 0x00FF, description: 'Extended Latin characters' },
  'Latin Extended-A': { start: 0x0100, end: 0x017F, description: 'Additional Latin characters' },
  'Greek and Coptic': { start: 0x0370, end: 0x03FF, description: 'Greek alphabet and symbols' },
  'Cyrillic': { start: 0x0400, end: 0x04FF, description: 'Cyrillic alphabet' },
  'Arabic': { start: 0x0600, end: 0x06FF, description: 'Arabic script' },
  'Hebrew': { start: 0x0590, end: 0x05FF, description: 'Hebrew script' },
  'General Punctuation': { start: 0x2000, end: 0x206F, description: 'Punctuation marks' },
  'Currency Symbols': { start: 0x20A0, end: 0x20CF, description: 'Currency symbols' },
  'Letterlike Symbols': { start: 0x2100, end: 0x214F, description: 'Mathematical letters' },
  'Number Forms': { start: 0x2150, end: 0x218F, description: 'Number forms and fractions' },
  'Arrows': { start: 0x2190, end: 0x21FF, description: 'Arrow symbols' },
  'Mathematical Operators': { start: 0x2200, end: 0x22FF, description: 'Math operators' },
  'Miscellaneous Technical': { start: 0x2300, end: 0x23FF, description: 'Technical symbols' },
  'Box Drawing': { start: 0x2500, end: 0x257F, description: 'Box drawing characters' },
  'Block Elements': { start: 0x2580, end: 0x259F, description: 'Block elements' },
  'Geometric Shapes': { start: 0x25A0, end: 0x25FF, description: 'Geometric shapes' },
  'Miscellaneous Symbols': { start: 0x2600, end: 0x26FF, description: 'Various symbols' },
  'Dingbats': { start: 0x2700, end: 0x27BF, description: 'Ornamental symbols' },
  'Emoticons': { start: 0x1F600, end: 0x1F64F, description: 'Emoji faces' },
  'Miscellaneous Symbols and Pictographs': { start: 0x1F300, end: 0x1F5FF, description: 'Various emoji' },
  'Transport and Map Symbols': { start: 0x1F680, end: 0x1F6FF, description: 'Transport emoji' }
};

// Common emoji categories
const emojiCategories = {
  'Smileys & Emotion': {
    ranges: [[0x1F600, 0x1F64F], [0x1F910, 0x1F96B]],
    examples: ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😌']
  },
  'People & Body': {
    ranges: [[0x1F64B, 0x1F64F], [0x1F926, 0x1F937]],
    examples: ['👋', '🤚', '🖐', '✋', '👌', '🤏', '✌', '🤞', '🤟', '🤘']
  },
  'Animals & Nature': {
    ranges: [[0x1F400, 0x1F4FF]],
    examples: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯']
  },
  'Food & Drink': {
    ranges: [[0x1F32D, 0x1F37F]],
    examples: ['🍎', '🍊', '🍌', '🍓', '🥝', '🍅', '🥥', '🥑', '🍆', '🥔']
  },
  'Travel & Places': {
    ranges: [[0x1F680, 0x1F6FF], [0x1F3E0, 0x1F3FF]],
    examples: ['🚗', '🚕', '🚙', '🚌', '🚎', '🏎', '🚓', '🚑', '🚒', '🚐']
  },
  'Activities': {
    ranges: [[0x1F3A0, 0x1F3FF]],
    examples: ['⚽', '🏀', '🏈', '⚾', '🥎', '🎾', '🏐', '🏉', '🥏', '🎱']
  },
  'Objects': {
    ranges: [[0x1F4A0, 0x1F4FF]],
    examples: ['⌚', '📱', '📲', '💻', '⌨', '🖥', '🖨', '🖱', '🖲', '🕹']
  },
  'Symbols': {
    ranges: [[0x1F500, 0x1F5FF]],
    examples: ['❤', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔']
  }
};

const CharacterGrid = ({ characters, onCharacterClick, favoriteChars, onToggleFavorite }) => {
  const [hoveredChar, setHoveredChar] = useState(null);

  return (
    <Grid container spacing={1}>
      {characters.map((char, index) => (
        <Grid key={index} size={{ xs: 2, sm: 1.5, md: 1, lg: 0.8 }}>
          <Tooltip
            title={
              <Box>
                <Typography variant="subtitle2">U+{char.codePoint.toString(16).toUpperCase().padStart(4, '0')}</Typography>
                <Typography variant="body2">{char.name || 'Unknown'}</Typography>
                <Typography variant="caption">Click to copy</Typography>
              </Box>
            }
            arrow
          >
            <Paper
              sx={{
                p: 1,
                textAlign: 'center',
                cursor: 'pointer',
                height: 60,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                backgroundColor: hoveredChar === char.codePoint ? 'action.hover' : 'background.paper',
                border: favoriteChars.includes(char.codePoint) ? 2 : 1,
                borderColor: favoriteChars.includes(char.codePoint) ? 'primary.main' : 'divider',
                '&:hover': {
                  backgroundColor: 'action.hover',
                  transform: 'scale(1.05)'
                },
                transition: 'all 0.2s ease'
              }}
              onClick={() => onCharacterClick(char)}
              onMouseEnter={() => setHoveredChar(char.codePoint)}
              onMouseLeave={() => setHoveredChar(null)}
            >
              <Typography variant="h6" sx={{ fontSize: '1.5rem', lineHeight: 1 }}>
                {char.character}
              </Typography>
              <Typography variant="caption" sx={{ fontSize: '0.7rem', opacity: 0.7 }}>
                U+{char.codePoint.toString(16).toUpperCase()}
              </Typography>
              
              {favoriteChars.includes(char.codePoint) && (
                <FavoriteIcon 
                  sx={{ 
                    position: 'absolute',
                    top: 2,
                    right: 2,
                    fontSize: 12,
                    color: 'primary.main'
                  }} 
                />
              )}
            </Paper>
          </Tooltip>
        </Grid>
      ))}
    </Grid>
  );
};

const CharacterDetails = ({ character, open, onClose, onToggleFavorite, isFavorite }) => {
  if (!character) return null;

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const htmlEntity = character.codePoint < 256 ? `&#${character.codePoint};` : null;
  const cssEscape = `\\${character.codePoint.toString(16).toUpperCase()}`;
  const jsEscape = `\\u{${character.codePoint.toString(16).toUpperCase()}}`;
  const pythonEscape = `\\u${character.codePoint.toString(16).toUpperCase().padStart(4, '0')}`;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="h4">{character.character}</Typography>
          <Typography variant="h6">Character Details</Typography>
        </Box>
        <IconButton
          onClick={() => onToggleFavorite(character.codePoint)}
          color={isFavorite ? 'primary' : 'default'}
        >
          <FavoriteIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell><strong>Character</strong></TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="h5">{character.character}</Typography>
                    <IconButton size="small" onClick={() => copyToClipboard(character.character)}>
                      <ContentCopyIcon />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell><strong>Unicode Code Point</strong></TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography sx={{ fontFamily: 'monospace' }}>
                      U+{character.codePoint.toString(16).toUpperCase().padStart(4, '0')}
                    </Typography>
                    <IconButton size="small" onClick={() => copyToClipboard(`U+${character.codePoint.toString(16).toUpperCase().padStart(4, '0')}`)}>
                      <ContentCopyIcon />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell><strong>Decimal</strong></TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography sx={{ fontFamily: 'monospace' }}>{character.codePoint}</Typography>
                    <IconButton size="small" onClick={() => copyToClipboard(character.codePoint.toString())}>
                      <ContentCopyIcon />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell><strong>Hexadecimal</strong></TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography sx={{ fontFamily: 'monospace' }}>
                      0x{character.codePoint.toString(16).toUpperCase()}
                    </Typography>
                    <IconButton size="small" onClick={() => copyToClipboard(`0x${character.codePoint.toString(16).toUpperCase()}`)}>
                      <ContentCopyIcon />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell><strong>Binary</strong></TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography sx={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>
                      {character.codePoint.toString(2).padStart(16, '0')}
                    </Typography>
                    <IconButton size="small" onClick={() => copyToClipboard(character.codePoint.toString(2))}>
                      <ContentCopyIcon />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell><strong>Name</strong></TableCell>
                <TableCell>{character.name || 'Unknown'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><strong>Category</strong></TableCell>
                <TableCell>{character.category || 'Unknown'}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
          Usage in Code
        </Typography>
        
        <Grid container spacing={2}>
          {htmlEntity && (
            <Grid size={{ xs: 12, sm: 6 }}>
              <Paper sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="subtitle2">HTML Entity</Typography>
                  <IconButton size="small" onClick={() => copyToClipboard(htmlEntity)}>
                    <ContentCopyIcon />
                  </IconButton>
                </Box>
                <Typography sx={{ fontFamily: 'monospace', fontSize: '0.9rem' }}>
                  {htmlEntity}
                </Typography>
              </Paper>
            </Grid>
          )}
          
          <Grid size={{ xs: 12, sm: 6 }}>
            <Paper sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="subtitle2">CSS Escape</Typography>
                <IconButton size="small" onClick={() => copyToClipboard(cssEscape)}>
                  <ContentCopyIcon />
                </IconButton>
              </Box>
              <Typography sx={{ fontFamily: 'monospace', fontSize: '0.9rem' }}>
                {cssEscape}
              </Typography>
            </Paper>
          </Grid>
          
          <Grid size={{ xs: 12, sm: 6 }}>
            <Paper sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="subtitle2">JavaScript</Typography>
                <IconButton size="small" onClick={() => copyToClipboard(jsEscape)}>
                  <ContentCopyIcon />
                </IconButton>
              </Box>
              <Typography sx={{ fontFamily: 'monospace', fontSize: '0.9rem' }}>
                {jsEscape}
              </Typography>
            </Paper>
          </Grid>
          
          <Grid size={{ xs: 12, sm: 6 }}>
            <Paper sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="subtitle2">Python</Typography>
                <IconButton size="small" onClick={() => copyToClipboard(pythonEscape)}>
                  <ContentCopyIcon />
                </IconButton>
              </Box>
              <Typography sx={{ fontFamily: 'monospace', fontSize: '0.9rem' }}>
                {pythonEscape}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </DialogContent>
      
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default function UnicodeBrowser({ name, description }) {
  const [currentTab, setCurrentTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBlock, setSelectedBlock] = useState('Basic Latin');
  const [selectedCategory, setSelectedCategory] = useState('Smileys & Emotion');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(100);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [favoriteChars, setFavoriteChars] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [isInitialized, setIsInitialized] = useState(false);

  // Load favorites from localStorage on component mount
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('unicodeBrowserFavorites');
      if (saved) {
        try {
          setFavoriteChars(JSON.parse(saved));
        } catch (error) {
          console.error('Failed to parse saved favorites:', error);
        }
      }
      setIsInitialized(true);
    }
  }, []);

  // Save favorites to localStorage whenever favoriteChars changes (but only after initialization)
  React.useEffect(() => {
    if (isInitialized && typeof window !== 'undefined') {
      localStorage.setItem('unicodeBrowserFavorites', JSON.stringify(favoriteChars));
    }
  }, [favoriteChars, isInitialized]);

  const generateCharacters = useCallback((start, end) => {
    const chars = [];
    
    // Limit the range to avoid too many characters at once
    const maxChars = 1000;
    const actualEnd = Math.min(end, start + maxChars);
    
    for (let i = start; i <= actualEnd; i++) {
      try {
        if (typeof String.fromCodePoint === 'undefined') {
          // Fallback for older environments
          continue;
        }
        
        const character = String.fromCodePoint(i);
        // Skip control characters and invalid code points
        if (character && character !== '\uFFFD' && !/[\x00-\x1F\x7F-\x9F]/.test(character)) {
          chars.push({
            character,
            codePoint: i,
            name: `Character ${i}`, // In a real app, you'd use Unicode name database
            category: 'Unknown'
          });
        }
      } catch (error) {
        // Skip invalid code points
        continue;
      }
    }
    return chars;
  }, []);

  const generateEmojiFromCategory = useCallback((category) => {
    const chars = [];
    const ranges = emojiCategories[category]?.ranges || [];
    
    ranges.forEach(([start, end]) => {
      for (let i = start; i <= Math.min(end, start + 200); i++) { // Limit for performance
        try {
          const character = String.fromCodePoint(i);
          if (character && character !== '\uFFFD') {
            chars.push({
              character,
              codePoint: i,
              name: `Emoji ${i}`,
              category: category
            });
          }
        } catch (error) {
          // Skip invalid code points
        }
      }
    });
    
    return chars;
  }, []);

  const allCharacters = useMemo(() => {
    if (currentTab === 0) {
      // Unicode blocks
      const block = unicodeBlocks[selectedBlock];
      if (!block) return [];
      return generateCharacters(block.start, block.end);
    } else if (currentTab === 1) {
      // Emoji categories
      return generateEmojiFromCategory(selectedCategory);
    } else if (currentTab === 2) {
      // Favorites
      return favoriteChars.map(codePoint => ({
        character: String.fromCodePoint(codePoint),
        codePoint,
        name: `Character ${codePoint}`,
        category: 'Favorite'
      }));
    }
    return [];
  }, [currentTab, selectedBlock, selectedCategory, favoriteChars, generateCharacters, generateEmojiFromCategory]);

  const filteredCharacters = useMemo(() => {
    if (!searchQuery) return allCharacters;
    
    const query = searchQuery.toLowerCase();
    return allCharacters.filter(char => {
      const codePointHex = char.codePoint.toString(16).toLowerCase();
      const codePointDec = char.codePoint.toString();
      const name = (char.name || '').toLowerCase();
      
      return (
        name.includes(query) ||
        codePointHex.includes(query) ||
        codePointDec.includes(query) ||
        char.character === searchQuery
      );
    });
  }, [allCharacters, searchQuery]);

  const paginatedCharacters = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredCharacters.slice(startIndex, startIndex + pageSize);
  }, [filteredCharacters, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredCharacters.length / pageSize);

  const handleCharacterClick = useCallback((char) => {
    setSelectedCharacter(char);
    setDetailsOpen(true);
    
    // Also copy to clipboard
    navigator.clipboard.writeText(char.character).then(() => {
      setOpenSnackbar(true);
    }).catch(err => console.error('Failed to copy:', err));
  }, []);

  const toggleFavorite = useCallback((codePoint) => {
    setFavoriteChars(prev => {
      if (prev.includes(codePoint)) {
        return prev.filter(cp => cp !== codePoint);
      } else {
        return [...prev, codePoint];
      }
    });
  }, []);

  const clearFavorites = useCallback(() => {
    setFavoriteChars([]);
  }, []);

  return (
    <Box sx={{ p: 2 }}>
      <Head>
        <title>{name ? `${name} - Dev Tools` : 'Unicode & Emoji Browser - Dev Tools'}</title>
        <meta name="description" content={description} />
      </Head>
      
      <Typography variant="h4" gutterBottom>
        {name}
      </Typography>
      <Typography variant="body1" paragraph color="text.secondary">
        {description}
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        <strong>Unicode & Emoji Browser:</strong> Explore character sets, copy Unicode characters, 
        browse emoji categories, and save favorites with detailed character information.
      </Alert>

      <Tabs value={currentTab} onChange={(e, newValue) => setCurrentTab(newValue)} sx={{ mb: 3 }}>
        <Tab label="Unicode Blocks" icon={<CodeIcon />} />
        <Tab label="Emoji Categories" icon={<EmojiEmotionsIcon />} />
        <Tab label={`Favorites (${favoriteChars.length})`} icon={<BookmarkIcon />} />
      </Tabs>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 9 }}>
          {/* Search and Filters */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  placeholder="Search by name, code point, or character..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              
              <Grid size={{ xs: 12, md: 4 }}>
                {currentTab === 0 && (
                  <FormControl fullWidth>
                    <InputLabel>Unicode Block</InputLabel>
                    <Select
                      value={selectedBlock}
                      onChange={(e) => {
                        setSelectedBlock(e.target.value);
                        setCurrentPage(1);
                      }}
                      label="Unicode Block"
                    >
                      {Object.keys(unicodeBlocks).map(block => (
                        <MenuItem key={block} value={block}>
                          {block}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
                
                {currentTab === 1 && (
                  <FormControl fullWidth>
                    <InputLabel>Emoji Category</InputLabel>
                    <Select
                      value={selectedCategory}
                      onChange={(e) => {
                        setSelectedCategory(e.target.value);
                        setCurrentPage(1);
                      }}
                      label="Emoji Category"
                    >
                      {Object.keys(emojiCategories).map(category => (
                        <MenuItem key={category} value={category}>
                          {category}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
                
                {currentTab === 2 && favoriteChars.length > 0 && (
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={clearFavorites}
                    fullWidth
                  >
                    Clear All
                  </Button>
                )}
              </Grid>
              
              <Grid size={{ xs: 12, md: 2 }}>
                <FormControl fullWidth>
                  <InputLabel>Per Page</InputLabel>
                  <Select
                    value={pageSize}
                    onChange={(e) => {
                      setPageSize(e.target.value);
                      setCurrentPage(1);
                    }}
                    label="Per Page"
                  >
                    <MenuItem value={50}>50</MenuItem>
                    <MenuItem value={100}>100</MenuItem>
                    <MenuItem value={200}>200</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Paper>

          {/* Results Info */}
          <Paper sx={{ p: 2, mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body2">
                Showing {paginatedCharacters.length} of {filteredCharacters.length} characters
                {currentTab === 0 && ` from ${selectedBlock}`}
                {currentTab === 1 && ` from ${selectedCategory}`}
              </Typography>
              
              {totalPages > 1 && (
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={(e, page) => setCurrentPage(page)}
                  size="small"
                />
              )}
            </Box>
          </Paper>

          {/* Character Grid */}
          <Paper sx={{ p: 3 }}>
            {paginatedCharacters.length > 0 ? (
              <CharacterGrid
                characters={paginatedCharacters}
                onCharacterClick={handleCharacterClick}
                favoriteChars={favoriteChars}
                onToggleFavorite={toggleFavorite}
              />
            ) : (
              <Alert severity="info">
                No characters found. Try adjusting your search or filters.
              </Alert>
            )}
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, lg: 3 }}>
          {/* Current Selection Info */}
          {currentTab === 0 && unicodeBlocks[selectedBlock] && (
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <InfoIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                  {selectedBlock}
                </Typography>
                <Typography variant="body2" paragraph>
                  {unicodeBlocks[selectedBlock].description}
                </Typography>
                <Typography variant="body2">
                  <strong>Range:</strong> U+{unicodeBlocks[selectedBlock].start.toString(16).toUpperCase().padStart(4, '0')} 
                  {' - '}U+{unicodeBlocks[selectedBlock].end.toString(16).toUpperCase().padStart(4, '0')}
                </Typography>
              </CardContent>
            </Card>
          )}

          {currentTab === 1 && emojiCategories[selectedCategory] && (
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <EmojiEmotionsIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                  {selectedCategory}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Common examples:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {emojiCategories[selectedCategory].examples.map((emoji, index) => (
                    <Typography key={index} variant="h6" sx={{ cursor: 'pointer' }}>
                      {emoji}
                    </Typography>
                  ))}
                </Box>
              </CardContent>
            </Card>
          )}

          {/* Usage Guide */}
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                How to Use
              </Typography>
              <Typography variant="body2" paragraph>
                • Click any character to copy and view details
              </Typography>
              <Typography variant="body2" paragraph>
                • Use the search box to find specific characters
              </Typography>
              <Typography variant="body2" paragraph>
                • Click the heart icon to add to favorites
              </Typography>
              <Typography variant="body2" paragraph>
                • Browse different Unicode blocks and emoji categories
              </Typography>
              <Typography variant="body2">
                • Character details include HTML entities and escape codes
              </Typography>
            </CardContent>
          </Card>

          {/* Character Encodings */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Character Encodings
              </Typography>
              <Typography variant="body2" paragraph>
                <strong>Unicode:</strong> U+XXXX format
              </Typography>
              <Typography variant="body2" paragraph>
                <strong>HTML Entity:</strong> &amp;#XXXX; format
              </Typography>
              <Typography variant="body2" paragraph>
                <strong>CSS Escape:</strong> \\XXXX format
              </Typography>
              <Typography variant="body2" paragraph>
                <strong>JavaScript:</strong> \\u{'{'} XXXX{'}'} format
              </Typography>
              <Typography variant="body2">
                <strong>Python:</strong> \\uXXXX format
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Character Details Dialog */}
      <CharacterDetails
        character={selectedCharacter}
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        onToggleFavorite={toggleFavorite}
        isFavorite={selectedCharacter ? favoriteChars.includes(selectedCharacter.codePoint) : false}
      />

      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
        message="Character copied to clipboard!"
      />
    </Box>
  );
}
