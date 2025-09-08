import React from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Link from 'next/link';
import Head from 'next/head';

import { toolCategories } from '../data/tools';

function HomePage() {
  return (
    <Box sx={{ p: 2 }}>
      <Head>
        <title>Dev Tools - A Collection of Developer Utilities</title>
        <meta name="description" content="A comprehensive suite of online developer tools including JSON formatter, Diff tool, Base64 encoder/decoder, Hash generator, and more." />
      </Head>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to Dev Tools
      </Typography>
      <Typography variant="body1" paragraph>
        A collection of useful tools for developers.
      </Typography>
      <Divider sx={{ my: 3 }} />
      <Typography variant="h5" component="h2" gutterBottom>
        Available Tools:
      </Typography>
      <List>
        {toolCategories.map((category) => (
          <Accordion key={category.name} defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`${category.name}-content`}
              id={`${category.name}-header`}
            >
              <Typography variant="h6">{category.name}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 0 }}>
              <List component="div" disablePadding>
                {category.tools.map((tool) => (
                  <React.Fragment key={tool.name}>
                    <Link href={tool.path} passHref>
                      <ListItem sx={{ '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.08)' } }}>
                        <ListItemText
                          primary={<Typography variant="body1">{tool.name}</Typography>}
                          secondary={<Typography variant="body2" color="text.secondary">{tool.description}</Typography>}
                        />
                      </ListItem>
                    </Link>
                    <Divider component="li" />
                  </React.Fragment>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        ))}
      </List>
    </Box>
  );
}

export default HomePage;
