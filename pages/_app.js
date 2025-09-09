import '../styles/globals.css';
import React from 'react';
import Head from 'next/head';
import Sidebar from '../components/Sidebar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import Box from '@mui/material/Box';
import { GoogleAnalytics, GoogleTagManager, GoogleTagManagerNoScript, useAnalytics } from '../components/Analytics';
import ServiceWorkerManager from '../components/ServiceWorker';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarWidth: 'thin',
          scrollbarColor: '#6b6b6b #2b2b2b',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#2b2b2b',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#6b6b6b',
            borderRadius: '4px',
          },
        },
      },
    },
  },
});

const drawerWidth = 240;
const collapsedDrawerWidth = 60;

function MyApp({ Component, pageProps }) {
  const [open, setOpen] = React.useState(true);
  
  // Track page views
  useAnalytics();

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <React.Fragment>
      <Head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        
        {/* DNS prefetch for faster loading */}
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        
        {/* Viewport and responsive design */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        
        {/* Performance hints */}
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      </Head>

      {/* Google Tag Manager */}
      <GoogleTagManager />
      
      {/* Google Tag Manager (noscript) */}
      <GoogleTagManagerNoScript />
      
      {/* Google Analytics */}
      <GoogleAnalytics />

      {/* Service Worker for caching and performance */}
      <ServiceWorkerManager />

      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
          <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
              <Link href="/" passHref style={{ textDecoration: 'none', color: 'inherit' }}>     
                <Typography variant="h6" noWrap component="div">
                  Developer Tools - Free Online Utilities
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
          <Box 
            component="main" 
            sx={{ 
              flexGrow: 1, 
              p: { xs: 1, sm: 2, md: 3 }, 
              mt: 8,
              width: { xs: '100%', sm: 'calc(100% - 240px)' },
              overflow: 'hidden'
            }}
          >
            <Component {...pageProps} />
          </Box>
        </Box>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default MyApp;