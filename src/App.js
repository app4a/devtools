import React, { useState } from 'react';
import {
  AppBar,
  Tabs,
  Tab,
  Box,
  Typography,
  ThemeProvider,
  CssBaseline,
} from '@mui/material';
import { createTheme } from '@mui/material/styles';
import JsonFormatter from './JsonFormatter';
import ImageGenerator from './ImageGenerator';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function App() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ width: '100%' }}>
        <AppBar position="static">
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
            <Tab label="JSON Formatter" {...a11yProps(0)} />
            <Tab label="Image Generator" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <JsonFormatter />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ImageGenerator />
        </TabPanel>
      </Box>
    </ThemeProvider>
  );
}

export default App;