import React, { useState, useMemo } from 'react';
import {
  Typography,
  Box,
  IconButton,
  Snackbar,
  Paper
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-json';
import 'prismjs/themes/prism-tomorrow.css'; // Using a dark theme for prism

import Head from 'next/head';

const LineNumberedEditor = ({ value, onValueChange, readOnly, placeholder }) => {
  const lineCount = value.split('\n').length;
  const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1).join('\n');

  return (
    <Paper variant="outlined" sx={{ display: 'flex', flex: 1, overflow: 'hidden', backgroundColor: '#2d2d2d' }}>
      <Box
        component="pre"
        sx={{
          textAlign: 'right',
          userSelect: 'none',
          p: '10px',
          pr: '15px',
          color: '#626262',
          borderRight: '1px solid #444',
          overflow: 'hidden',
          fontFamily: 'monospace',
          fontSize: 14,
          lineHeight: '21px',
          margin:0
        }}
      >
        {lineNumbers}
      </Box>
      <Editor
        value={value}
        onValueChange={onValueChange}
        highlight={(code) => highlight(code, languages.json, 'json')}
        padding={10}
        readOnly={readOnly}
        placeholder={placeholder}
        style={{
          flex: 1,
          fontFamily: 'monospace',
          fontSize: 14,
          lineHeight: '21px',
          overflow: 'auto',
        }}
        textareaClassName={readOnly ? 'readonly-textarea' : ''}
      />
    </Paper>
  );
};

export default function JsonFormatter({ name, description }) {
  const [rawJson, setRawJson] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const { formattedJson, error } = useMemo(() => {
    if (!rawJson.trim()) {
      return { formattedJson: '', error: null };
    }
    try {
      const parsed = JSON.parse(rawJson);
      const formatted = JSON.stringify(parsed, null, 2);
      return { formattedJson: formatted, error: null };
    } catch (e) {
      return { formattedJson: '', error: e.message };
    }
  }, [rawJson]);

  const handleCopy = () => {
    if (formattedJson) {
      navigator.clipboard.writeText(formattedJson);
      setOpenSnackbar(true);
    }
  };

  return (
    <Box sx={{ display: 'flex', p: 2, gap: 2, flexDirection: 'column' }}>
      <Head>
        <title>{name} - Dev Tools</title>
        <meta name="description" content={description} />
      </Head>
      <Typography variant="h4" gutterBottom>
        {name}
      </Typography>
      <style>{`
        .readonly-textarea {
          color: ${error ? 'red' : 'inherit'} !important;
        }
      `}</style>
      <Box sx={{ display: 'flex', flex: 1, gap: 2, overflow: 'hidden' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
          <Typography variant="h6" gutterBottom>Raw JSON</Typography>
          <LineNumberedEditor
            value={rawJson}
            onValueChange={setRawJson}
            placeholder="Paste your JSON here"
          />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, position: 'relative', overflow: 'hidden' }}>
          <Typography variant="h6" gutterBottom>Formatted</Typography>
          <IconButton
            onClick={handleCopy}
            disabled={!formattedJson}
            sx={{ position: 'absolute', top: 0, right: 0, zIndex: 1 }}
          >
            <ContentCopyIcon />
          </IconButton>
          <LineNumberedEditor
            value={error || formattedJson}
            readOnly
          />
        </Box>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
        message="Copied to clipboard!"
      />
    </Box>
  );
}