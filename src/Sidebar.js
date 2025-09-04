import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  IconButton,
  styled
} from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRightOutlined';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeftOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';

const toolCategories = [
  {
    name: 'Text Tools',
    tools: [
      { name: 'JSON Formatter', path: '/json' },
      { name: 'Diff Tool', path: '/diff' },
      { name: 'Multiline Formatter', path: '/multiline' },
      { name: 'Regex Tester', path: '/regex' },
      { name: 'Base64 Encoder/Decoder', path: '/base64' },
      { name: 'URL Encoder/Decoder', path: '/url' },
    ],
  },
  {
    name: 'Security Tools',
    tools: [
      { name: 'Hash Generator', path: '/hash' },
      { name: 'JWT Decoder', path: '/jwt' },
    ],
  },
  {
    name: 'Date & Time Tools',
    tools: [
      { name: 'World Time', path: '/worldtime' },
      { name: 'Timestamp Converter', path: '/timestamp' },
      { name: 'Cron Expression Parser', path: '/cron' },
    ],
  },
  {
    name: 'Color Tools',
    tools: [
      { name: 'Color Converter', path: '/color' },
    ],
  },
];

const openedMixin = (theme, drawerWidth) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme, collapsedDrawerWidth) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: collapsedDrawerWidth,
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  marginTop: '64px', // Explicitly push it down by AppBar height
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const StyledDrawer = styled(Drawer)(({ theme, open, drawerWidth, collapsedDrawerWidth }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme, drawerWidth),
    '& .MuiDrawer-paper': openedMixin(theme, drawerWidth),
  }),
  ...(!open && {
    ...closedMixin(theme, collapsedDrawerWidth),
    '& .MuiDrawer-paper': closedMixin(theme, collapsedDrawerWidth),
  }),
}));

export default function Sidebar({ open, handleDrawerToggle, drawerWidth, collapsedDrawerWidth }) {
  return (
    <StyledDrawer variant="permanent" open={open} drawerWidth={drawerWidth} collapsedDrawerWidth={collapsedDrawerWidth}>
      <DrawerHeader>
        <IconButton onClick={handleDrawerToggle}>
          {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </DrawerHeader>
      <Box sx={{ overflowY: 'auto' }}>
        <List>
          {open ? (
            toolCategories.map((category) => (
              <Accordion key={category.name} elevation={0} sx={{ backgroundColor: 'inherit' }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`${category.name}-content`}
                  id={`${category.name}-header`}
                >
                  <Typography>{category.name}</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ p: 0 }}>
                  <List component="div" disablePadding>
                    {category.tools.map((tool) => (
                      <ListItem button key={tool.name} component={Link} to={tool.path} sx={{ pl: 4 }}>
                        <ListItemText primary={tool.name} />
                      </ListItem>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>
            ))
          ) : (
            toolCategories.map((category) => (
              <ListItem button key={category.name} sx={{ display: 'flex', justifyContent: 'center', px: 2.5 }}>
                {/* You might want to use an icon representing the category here */}
                <ListItemText primary={category.name[0]} sx={{ opacity: open ? 1 : 0 }} />
              </ListItem>
            ))
          )}
        </List>
      </Box>
    </StyledDrawer>
  );
}