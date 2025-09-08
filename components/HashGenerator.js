import React, { useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  Paper,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Snackbar
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CryptoJS from 'crypto-js';

import Head from 'next/head';

export default function HashGenerator({ name, description }) {
  const [text, setText] = useState('');
  const [hashes, setHashes] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleGenerate = () => {
    if (!text) {
      setHashes(null);
      return;
    }

    const generatedHashes = {
      md5: CryptoJS.MD5(text).toString(),
      sha1: CryptoJS.SHA1(text).toString(),
      sha256: CryptoJS.SHA256(text).toString(),
      sha512: CryptoJS.SHA512(text).toString(),
      sha3: CryptoJS.SHA3(text).toString(),
      ripemd160: CryptoJS.RIPEMD160(text).toString(),
    };
    setHashes(generatedHashes);
  };

  const handleCopy = (textToCopy) => {
    navigator.clipboard.writeText(textToCopy);
    setOpenSnackbar(true);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Head>
        <title>{name} - Dev Tools</title>
        <meta name="description" content={description} />
      </Head>
      <Typography variant="h4" gutterBottom>
        {name}
      </Typography>
      <Paper elevation={3} sx={{ p: 2 }}>
        <TextField
          label="Text to Hash"
          multiline
          rows={10}
          fullWidth
          value={text}
          onChange={(e) => setText(e.target.value)}
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <Button variant="contained" onClick={handleGenerate}>
          Generate Hashes
        </Button>
      </Paper>
      {hashes && (
        <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
          <Typography variant="h5" gutterBottom>
            Hashes
          </Typography>
          <List>
            {Object.entries(hashes).map(([name, hash]) => (
              <ListItem key={name} secondaryAction={
                <IconButton edge="end" aria-label="copy" onClick={() => handleCopy(hash)}>
                  <ContentCopyIcon />
                </IconButton>
              }>
                <ListItemText primary={name.toUpperCase()} secondary={hash} />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
        message="Copied to clipboard!"
      />
    </Box>
  );
}