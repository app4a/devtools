import React, { useState } from 'react';
import ReactDiffViewer from 'react-diff-viewer-continued';
import {
  Box,
  Paper,
  Typography,
  TextareaAutosize
} from '@mui/material';

import Head from 'next/head';

export default function DiffTool() {
  const [originalText, setOriginalText] = useState('');
  const [modifiedText, setModifiedText] = useState('');

  const newStyles = {
    variables: {
      dark: {
        color: '#ffffff',
        background: '#2d2d2d',
        addedBackground: '#0f5123',
        addedColor: '#ffffff',
        removedBackground: '#510f0f',
        removedColor: '#ffffff',
        wordAddedBackground: '#1f7a3f',
        wordRemovedBackground: '#7a1f1f',
      },
    },
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', p: 2 }}>
      <Head>
        <title>Diff Tool - Dev Tools</title>
        <meta name="description" content="Compare two text inputs and highlight the differences." />
      </Head>
      <Paper sx={{ p: 1, borderBottom: '1px solid #444', backgroundColor: '#2d2d2d' }} elevation={0}>
        <Typography variant="body2" sx={{ml: 2, color: '#ffffff'}}>Paste Text to Compare</Typography>
      </Paper>
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'row', gap: 2, p: 2 }}>
        <TextareaAutosize
          minRows={5}
          placeholder="Original Text"
          style={{ width: '50%', backgroundColor: '#1e1e1e', color: '#ffffff', border: '1px solid #444' }}
          value={originalText}
          onChange={(e) => setOriginalText(e.target.value)}
        />
        <TextareaAutosize
          minRows={5}
          placeholder="Modified Text"
          style={{ width: '50%', backgroundColor: '#1e1e1e', color: '#ffffff', border: '1px solid #444' }}
          value={modifiedText}
          onChange={(e) => setModifiedText(e.target.value)}
        />
      </Box>
      <Box sx={{ flexGrow: 2, height: '60vh' }}>
        <ReactDiffViewer
          oldValue={originalText}
          newValue={modifiedText}
          splitView={true}
          useDarkTheme={true}
          styles={newStyles}
        />
      </Box>
    </Box>
  );
}
