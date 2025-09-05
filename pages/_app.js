import '../styles/globals.css';
import React from 'react';
import Sidebar from '../components/Sidebar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const drawerWidth = 240;
const collapsedDrawerWidth = 60;

function MyApp({ Component, pageProps }) {
  const [open, setOpen] = React.useState(true);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <React.Fragment>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Box sx={{ display: 'flex' }}>
          <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerToggle}
                edge="start"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div">
                Dev Tools
              </Typography>
            </Toolbar>
          </AppBar>
          <Sidebar 
            open={open} 
            drawerWidth={drawerWidth} 
            collapsedDrawerWidth={collapsedDrawerWidth} 
          />
          <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
            <Component {...pageProps} />
          </Box>
        </Box>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default MyApp;