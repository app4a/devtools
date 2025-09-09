import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Typography,
  Paper,
  Grid
} from '@mui/material';
import { jwtDecode } from 'jwt-decode';
import * as jose from 'jose';

import Head from 'next/head';

export default function JwtDecoder({ name, description }) {
  const sampleToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30";
  const [jwtToken, setJwtToken] = useState(sampleToken);
  const [secret, setSecret] = useState('a-string-secret-at-least-256-bits-long'); // Sample secret
  const [header, setHeader] = useState('');
  const [payload, setPayload] = useState('');
  const [signature, setSignature] = useState('');
  const [signatureVerified, setSignatureVerified] = useState('Not Verified');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!jwtToken) {
      setHeader('');
      setPayload('');
      setSignature('');
      setSignatureVerified('Not Verified');
      setError(null);
      return;
    }

    try {
      const parts = jwtToken.split('.');
      if (parts.length !== 3) {
        throw new Error('Invalid JWT format');
      }

      const decodedHeader = JSON.parse(atob(parts[0]));
      const decodedPayload = jwtDecode(jwtToken);

      setHeader(JSON.stringify(decodedHeader, null, 2));
      setPayload(JSON.stringify(decodedPayload, null, 2));
      setSignature(parts[2]);
      setError(null);

      // Signature Verification
      const verifySignature = async () => {
        try {
          const secretBytes = new TextEncoder().encode(secret);
          const { payload: verifiedPayload } = await jose.jwtVerify(jwtToken, secretBytes);
          setSignatureVerified('Verified');
        } catch (e) {
          setSignatureVerified(`Invalid: ${e.message}`);
        }
      };
      verifySignature();

    } catch (err) {
      setHeader('');
      setPayload('');
      setSignature('');
      setSignatureVerified('Not Verified');
      setError(err.message);
    }
  }, [jwtToken, secret]);

  return (
    <Box sx={{ p: 2, height: 'calc(100vh - 112px)', display: 'flex', flexDirection: 'column' }}>
      <Head>
        <title>{name ? `${name} - Dev Tools` : 'JWT Decoder - Dev Tools'}</title>
        <meta name="description" content={description} />
      </Head>
      <Typography variant="h4" gutterBottom>
        {name}
      </Typography>
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <Box sx={{ width: '50%', p: 2, display: 'flex', flexDirection: 'column' }}>
          <TextField
            label="JWT Token"
            fullWidth
            multiline
            value={jwtToken}
            onChange={(e) => setJwtToken(e.target.value)}
            variant="outlined"
            error={!!error}
            helperText={error}
            sx={{ mb: 2, flexGrow: 1, '& .MuiInputBase-root': { height: '100%' }, '& .MuiInputBase-input': { height: '100% !important' } }}
          />
          <TextField
            label="Secret"
            fullWidth
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            variant="outlined"
            sx={{ mt: 2 }}
          />
        </Box>
        <Box sx={{ width: '50%', p: 2, display: 'flex', flexDirection: 'column' }}>
          <Paper elevation={3} sx={{ p: 2, flexGrow: 1, overflow: 'auto' }}>
            <Typography variant="h6" gutterBottom>
              Decoded Parts:
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1">Header:</Typography>
              <Paper variant="outlined" sx={{ p: 1, backgroundColor: '#2d2d2d', color: '#ffffff' }}>
                <pre>{header}</pre>
              </Paper>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1">Payload:</Typography>
              <Paper variant="outlined" sx={{ p: 1, backgroundColor: '#2d2d2d', color: '#ffffff' }}>
                <pre>{payload}</pre>
              </Paper>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1">Signature Verification:</Typography>
              <Paper variant="outlined" sx={{ p: 1, backgroundColor: '#2d2d2d', color: '#ffffff' }}>
                <Typography>{signatureVerified}</Typography>
              </Paper>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}