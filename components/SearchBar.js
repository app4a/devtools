import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  TextField,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Typography,
  Chip,
  InputAdornment,
  IconButton,
  Fade,
  Popper,
  ClickAwayListener,
  alpha
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { searchTools, highlightText } from '../utils/searchUtils';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [anchorEl, setAnchorEl] = useState(null);
  
  const inputRef = useRef(null);
  const resultsRef = useRef(null);
  const router = useRouter();
  
  // Update search results when query changes (with debouncing)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query.trim() && query.length >= 2) {
        const searchResults = searchTools(query);
        setResults(searchResults);
        setOpen(true);
        setSelectedIndex(-1);
      } else {
        setResults([]);
        setOpen(false);
      }
    }, 150); // 150ms debounce

    return () => clearTimeout(timeoutId);
  }, [query]);
  
  // Handle input focus
  const handleFocus = (event) => {
    setAnchorEl(event.currentTarget);
    if (query.trim()) {
      setOpen(true);
    }
  };
  
  // Handle input change
  const handleChange = (event) => {
    setQuery(event.target.value);
  };
  
  // Handle clear
  const handleClear = () => {
    setQuery('');
    setOpen(false);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };
  
  // Handle keyboard navigation
  const handleKeyDown = (event) => {
    if (!open || results.length === 0) return;
    
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setSelectedIndex(prev => 
          prev < results.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        event.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : results.length - 1
        );
        break;
      case 'Enter':
        event.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < results.length) {
          handleToolSelect(results[selectedIndex]);
        }
        break;
      case 'Escape':
        setOpen(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };
  
  // Handle tool selection
  const handleToolSelect = (tool) => {
    setQuery('');
    setOpen(false);
    setSelectedIndex(-1);
    router.push(tool.path);
  };
  
  // Handle click away
  const handleClickAway = () => {
    setOpen(false);
    setSelectedIndex(-1);
  };
  
  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box sx={{ 
        position: 'relative', 
        flexGrow: 1, 
        maxWidth: { xs: '100%', sm: 500, md: 600 }, 
        mx: { xs: 1, sm: 2 },
        minWidth: { xs: 200, sm: 300 }
      }}>
        <TextField
          ref={inputRef}
          fullWidth
          variant="outlined"
          placeholder="Search tools..."
          value={query}
          onChange={handleChange}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          size="small"
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: alpha('#fff', 0.1),
              '&:hover': {
                backgroundColor: alpha('#fff', 0.15),
              },
              '&.Mui-focused': {
                backgroundColor: alpha('#fff', 0.2),
              },
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: alpha('#fff', 0.3),
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: alpha('#fff', 0.5),
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#1976d2',
            },
            '& .MuiInputBase-input': {
              fontSize: { xs: '0.875rem', sm: '1rem' },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ 
                  color: alpha('#fff', 0.7),
                  fontSize: { xs: '1.1rem', sm: '1.25rem' }
                }} />
              </InputAdornment>
            ),
            endAdornment: query && (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  onClick={handleClear}
                  sx={{ color: alpha('#fff', 0.7) }}
                >
                  <ClearIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        
        <Popper
          open={open && results.length > 0}
          anchorEl={anchorEl}
          placement="bottom-start"
          style={{ width: anchorEl?.offsetWidth, zIndex: 1300 }}
        >
          <Fade in={open && results.length > 0}>
            <Paper
              ref={resultsRef}
              elevation={8}
              sx={{
                mt: 1,
                maxHeight: 400,
                overflow: 'auto',
                backgroundColor: '#1e1e1e',
                border: '1px solid',
                borderColor: alpha('#fff', 0.1),
              }}
            >
              <List dense>
                {results.map((tool, index) => (
                  <ListItem key={`${tool.path}-${index}`} disablePadding>
                    <ListItemButton
                      selected={index === selectedIndex}
                      onClick={() => handleToolSelect(tool)}
                      sx={{
                        '&.Mui-selected': {
                          backgroundColor: alpha('#1976d2', 0.2),
                        },
                        '&:hover': {
                          backgroundColor: alpha('#fff', 0.05),
                        },
                      }}
                    >
                      <ListItemText
                        primary={
                          <Box>
                            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                              {highlightText(tool.name, query).map((part, index) => 
                                typeof part === 'string' ? part : (
                                  <Box component="span" key={index} sx={{ 
                                    backgroundColor: alpha('#1976d2', 0.3),
                                    fontWeight: 'bold',
                                    borderRadius: '2px',
                                    px: 0.5
                                  }}>
                                    {part.content}
                                  </Box>
                                )
                              )}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                              <Chip
                                label={tool.category}
                                size="small"
                                sx={{
                                  height: 20,
                                  fontSize: '0.7rem',
                                  backgroundColor: alpha('#1976d2', 0.2),
                                  color: '#1976d2',
                                }}
                              />
                            </Box>
                            <Typography
                              variant="caption"
                              sx={{
                                color: alpha('#fff', 0.7),
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                mt: 0.5,
                              }}
                            >
                              {highlightText(tool.description, query).map((part, index) => 
                                typeof part === 'string' ? part : (
                                  <Box component="span" key={index} sx={{ 
                                    backgroundColor: alpha('#1976d2', 0.3),
                                    fontWeight: 'bold',
                                    borderRadius: '2px',
                                    px: 0.5
                                  }}>
                                    {part.content}
                                  </Box>
                                )
                              )}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
              
              {results.length > 0 && (
                <Box sx={{ 
                  p: 1, 
                  borderTop: 1, 
                  borderColor: alpha('#fff', 0.1),
                  backgroundColor: alpha('#000', 0.2)
                }}>
                  <Typography variant="caption" sx={{ color: alpha('#fff', 0.5) }}>
                    Use ↑↓ to navigate, Enter to select, Esc to close
                  </Typography>
                </Box>
              )}
            </Paper>
          </Fade>
        </Popper>
      </Box>
    </ClickAwayListener>
  );
}
