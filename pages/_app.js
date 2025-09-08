import '../styles/globals.css';
import React from 'react';
import Sidebar from '../components/Sidebar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
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
              <Link href="/" passHref style={{ textDecoration: 'none', color: 'inherit' }}>     
                <Typography variant="h6" noWrap component="div">
                  Dev Tools
                </Typography>
              </Link>   
            </Toolbar>
          </AppBar>
          <Sidebar 
            open={open} 
            drawerWidth={drawerWidth} 
            collapsedDrawerWidth={collapsedDrawerWidth}
            handleDrawerToggle={handleDrawerToggle}
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