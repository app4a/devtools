
import React from 'react';
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

import HomePage from './HomePage';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
                <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Dev Tools
              </Typography>
              <Button color="inherit" component={Link} to="/">Home</Button>
              <Button color="inherit" component={Link} to="/json">JSON Formatter</Button>
              <Button color="inherit" component={Link} to="/diff">Diff Tool</Button>
              <Button color="inherit" component={Link} to="/multiline">Multiline Formatter</Button>
              <Button color="inherit" component={Link} to="/worldtime">World Time</Button>
              <Button color="inherit" component={Link} to="/url">URL Encoder/Decoder</Button>
              <Button color="inherit" component={Link} to="/timestamp">Timestamp Converter</Button>
              <Button color="inherit" component={Link} to="/regex">Regex Tester</Button>
              <Button color="inherit" component={Link} to="/hash">Hash Generator</Button>
              <Button color="inherit" component={Link} to="/color">Color Converter</Button>
            </Toolbar>
          </AppBar>
          <Box>
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
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
