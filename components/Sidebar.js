import React, { useState, useEffect } from 'react';
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
  styled,
  IconButton,
  Toolbar,
  Divider
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { toolCategories } from '../data/tools';

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

const StyledDrawer = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'drawerWidth' && prop !== 'collapsedDrawerWidth' })(({ theme, open, drawerWidth, collapsedDrawerWidth }) => ({
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

export default function Sidebar({ open, drawerWidth, collapsedDrawerWidth, handleDrawerToggle }) {
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const currentCategory = toolCategories.find(category => 
      category.tools.some(tool => tool.path === router.pathname)
    );
    if (currentCategory) {
      setExpanded(currentCategory.name);
    }
  }, [router.pathname]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <StyledDrawer variant="permanent" open={open} drawerWidth={drawerWidth} collapsedDrawerWidth={collapsedDrawerWidth}>
      <Toolbar />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', py: 1 }}>
        <IconButton onClick={handleDrawerToggle}>
          {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </Box>
      <Divider />
      <Box sx={{ overflowY: 'auto' }}>
        <List>
          {open ? (
            toolCategories.map((category) => (
              <Accordion key={category.name} elevation={0} sx={{ backgroundColor: 'inherit' }} expanded={expanded === category.name} onChange={handleChange(category.name)}>
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
                      <ListItem component={Link} href={tool.path} key={tool.name} sx={{ pl: 4, ...(router.pathname === tool.path && { backgroundColor: 'rgba(255, 255, 255, 0.1)' }) }}>
                        <ListItemText primary={tool.name} />
                      </ListItem>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>
            ))
          ) : (
            toolCategories.map((category) => (
              <ListItem key={category.name} sx={{ display: 'flex', justifyContent: 'center', px: 2.5 }}>
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