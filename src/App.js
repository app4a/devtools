
import React, { useState } from 'react';
import {
  Box,
  Typography,
  ThemeProvider,
  CssBaseline,
  AppBar,
  Toolbar,
  Button
} from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import JsonFormatter from './JsonFormatter';
import DiffTool from './DiffTool';
import MultilineFormatter from './MultilineFormatter';
import WorldTime from './WorldTime';
import UrlEncoderDecoder from './UrlEncoderDecoder';
import TimestampConverter from './TimestampConverter';
import RegexTester from './RegexTester';
import HashGenerator from './HashGenerator';
import ColorConverter from './ColorConverter';
import Base64Converter from './Base64Converter';
import CronParser from './CronParser';
import JwtDecoder from './JwtDecoder';

import HomePage from './HomePage';
import Sidebar from './Sidebar'; // Will create this component next

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const drawerWidth = 240;
const collapsedDrawerWidth = 60; // Define a width for the collapsed sidebar

function App() {
  const [open, setOpen] = useState(true);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
              <Typography
                variant="h6"
                component={Link}
                to="/"
                sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}
              >
                Dev Tools
              </Typography>
            </Toolbar>
          </AppBar>
          <Sidebar open={open} handleDrawerToggle={handleDrawerToggle} drawerWidth={drawerWidth} collapsedDrawerWidth={collapsedDrawerWidth} />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 0,
              ml: open ? `${drawerWidth}px` : `${collapsedDrawerWidth}px`, // Adjust margin based on sidebar state
              width: open ? `calc(100% - ${drawerWidth}px)` : `calc(100% - ${collapsedDrawerWidth}px)`, // Adjust width based on sidebar state
              mt: '64px', // AppBar height
            }}
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/json" element={<JsonFormatter />} />
              <Route path="/diff" element={<DiffTool />} />
              <Route path="/multiline" element={<MultilineFormatter />} />
              <Route path="/worldtime" element={<WorldTime />} />
              <Route path="/url" element={<UrlEncoderDecoder />} />
              <Route path="/timestamp" element={<TimestampConverter />} />
              <Route path="/regex" element={<RegexTester />} />
              <Route path="/hash" element={<HashGenerator />} />
              <Route path="/color" element={<ColorConverter />} />
              <Route path="/base64" element={<Base64Converter />} />
              <Route path="/cron" element={<CronParser />} />
              <Route path="/jwt" element={<JwtDecoder />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
