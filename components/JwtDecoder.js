import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  TextField,
  Typography,
  Paper,
  Grid,
  Tabs,
  Tab,
  Button,
  IconButton,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Alert,
  Snackbar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  LinearProgress
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import SecurityIcon from '@mui/icons-material/Security';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CodeIcon from '@mui/icons-material/Code';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { jwtDecode } from 'jwt-decode';
import * as jose from 'jose';

import Head from 'next/head';

export default function JwtDecoder({ name, description }) {
  const sampleToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30";
  const [jwtToken, setJwtToken] = useState(sampleToken);
  const [secret, setSecret] = useState('a-string-secret-at-least-256-bits-long');
  const [header, setHeader] = useState('');
  const [payload, setPayload] = useState('');
  const [signature, setSignature] = useState('');
  const [signatureVerified, setSignatureVerified] = useState('Not Verified');
  const [error, setError] = useState(null);
  const [currentTab, setCurrentTab] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [verificationMethod, setVerificationMethod] = useState('HS256');
  const [publicKey, setPublicKey] = useState('');
  const [privateKey, setPrivateKey] = useState('');

  // Analyze JWT structure and claims
  const jwtAnalysis = useMemo(() => {
    if (!jwtToken) return null;

    try {
      const parts = jwtToken.split('.');
      if (parts.length !== 3) {
        throw new Error('Invalid JWT format');
      }

      const decodedHeader = JSON.parse(atob(parts[0]));
      const decodedPayload = jwtDecode(jwtToken);
      
      // Time analysis
      const now = Math.floor(Date.now() / 1000);
      const iat = decodedPayload.iat;
      const exp = decodedPayload.exp;
      const nbf = decodedPayload.nbf;
      
      const isExpired = exp && exp < now;
      const isNotYetValid = nbf && nbf > now;
      const timeUntilExpiry = exp ? exp - now : null;
      
      // Security analysis
      const securityIssues = [];
      if (decodedHeader.alg === 'none') {
        securityIssues.push({ type: 'critical', message: 'Algorithm "none" is insecure' });
      }
      if (!exp) {
        securityIssues.push({ type: 'warning', message: 'No expiration time (exp) claim' });
      }
      if (timeUntilExpiry && timeUntilExpiry > 86400) {
        securityIssues.push({ type: 'warning', message: 'Long expiration time (>24 hours)' });
      }
      if (!decodedPayload.iss) {
        securityIssues.push({ type: 'info', message: 'No issuer (iss) claim' });
      }
      if (!decodedPayload.aud) {
        securityIssues.push({ type: 'info', message: 'No audience (aud) claim' });
      }

      return {
        header: decodedHeader,
        payload: decodedPayload,
        signature: parts[2],
        isExpired,
        isNotYetValid,
        timeUntilExpiry,
        securityIssues,
        algorithm: decodedHeader.alg,
        tokenType: decodedHeader.typ || 'JWT'
      };
    } catch (err) {
      return { error: err.message };
    }
  }, [jwtToken]);

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setSnackbarMessage('Copied to clipboard!');
      setOpenSnackbar(true);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setJwtToken(e.target.result.trim());
      };
      reader.readAsText(file);
    }
  };

  const exportAnalysis = () => {
    if (!jwtAnalysis || jwtAnalysis.error) return;
    
    const exportData = {
      token: jwtToken,
      analysis: jwtAnalysis,
      verificationStatus: signatureVerified,
      exportedAt: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `jwt-analysis-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const verifySignature = async () => {
    if (!jwtToken || !jwtAnalysis || jwtAnalysis.error) {
      setSignatureVerified('Cannot verify - invalid token');
      return;
    }

    try {
      const algorithm = jwtAnalysis.algorithm;
      
      if (algorithm.startsWith('HS')) {
        // HMAC verification
        const secretBytes = new TextEncoder().encode(secret);
        await jose.jwtVerify(jwtToken, secretBytes);
        setSignatureVerified('✅ Valid HMAC signature');
      } else if (algorithm.startsWith('RS') || algorithm.startsWith('ES')) {
        // RSA/ECDSA verification (requires public key)
        if (!publicKey) {
          setSignatureVerified('❌ Public key required for RSA/ECDSA');
          return;
        }
        const publicKeyObj = await jose.importSPKI(publicKey, algorithm);
        await jose.jwtVerify(jwtToken, publicKeyObj);
        setSignatureVerified('✅ Valid RSA/ECDSA signature');
      } else {
        setSignatureVerified(`⚠️ Unsupported algorithm: ${algorithm}`);
      }
    } catch (err) {
      setSignatureVerified(`❌ Invalid signature: ${err.message}`);
    }
  };

  useEffect(() => {
    if (jwtToken && jwtAnalysis && !jwtAnalysis.error) {
      setHeader(JSON.stringify(jwtAnalysis.header, null, 2));
      setPayload(JSON.stringify(jwtAnalysis.payload, null, 2));
      setSignature(jwtAnalysis.signature);
      setError(null);
    } else if (jwtAnalysis && jwtAnalysis.error) {
      setHeader('');
      setPayload('');
      setSignature('');
      setError(jwtAnalysis.error);
    }
  }, [jwtAnalysis]);

  useEffect(() => {
    if (jwtToken && secret) {
      verifySignature();
    }
  }, [jwtToken, secret, publicKey, verificationMethod]);

  const formatTime = (timestamp) => {
    if (!timestamp) return 'Not specified';
    const date = new Date(timestamp * 1000);
    return `${date.toLocaleString()} (${new Date(timestamp * 1000).toISOString()})`;
  };

  const getTimeRemaining = (expTimestamp) => {
    if (!expTimestamp) return 'No expiration';
    const now = Date.now() / 1000;
    const remaining = expTimestamp - now;
    
    if (remaining <= 0) return 'Expired';
    
    const days = Math.floor(remaining / 86400);
    const hours = Math.floor((remaining % 86400) / 3600);
    const minutes = Math.floor((remaining % 3600) / 60);
    
    if (days > 0) return `${days}d ${hours}h ${minutes}m`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const exampleTokens = {
    hs256: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30",
    expired: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjoxNTE2MjM5MDIyfQ.Twzj7vwXM4A9opKWu4kV4rJWz2PvXGPFf5V5bLryBgQ",
    complex: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyMTIzIiwibmFtZSI6IkpvaG4gRG9lIiwiZW1haWwiOiJqb2huQGV4YW1wbGUuY29tIiwicm9sZXMiOlsiYWRtaW4iLCJ1c2VyIl0sImlzcyI6Imh0dHBzOi8vYXV0aC5leGFtcGxlLmNvbSIsImF1ZCI6WyJhcGkiLCJ3ZWIiXSwiaWF0IjoxNjAwMDAwMDAwLCJleHAiOjE2MDAwMDM2MDAsIm5iZiI6MTYwMDAwMDAwMCwianRpIjoiYWJjZGVmZ2hpaiJ9.signature"
  };

  return (
    <Box sx={{ p: 2 }}>
      <Head>
        <title>{name ? `${name} - Dev Tools` : 'Professional JWT Analyzer - Dev Tools'}</title>
        <meta name="description" content={description} />
      </Head>
      
      <Typography variant="h4" gutterBottom>
        {name}
      </Typography>
      <Typography variant="body1" paragraph color="text.secondary">
        {description}
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        <strong>Professional JWT Analyzer:</strong> Comprehensive JWT decoding, signature verification, 
        security analysis, and claims validation with support for multiple algorithms.
      </Alert>

      <Tabs value={currentTab} onChange={(e, newValue) => setCurrentTab(newValue)} sx={{ mb: 3 }}>
        <Tab icon={<CodeIcon />} label="Decoder" />
        <Tab icon={<SecurityIcon />} label="Security Analysis" />
        <Tab icon={<VpnKeyIcon />} label="Signature Verification" />
        <Tab icon={<InfoIcon />} label="JWT Guide" />
      </Tabs>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          {currentTab === 0 && (
            <>
              {/* Token Input */}
              <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  <CodeIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                  JWT Token Input
                </Typography>
                
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  value={jwtToken}
                  onChange={(e) => setJwtToken(e.target.value)}
                  placeholder="Paste your JWT token here..."
                  variant="outlined"
                  error={!!error}
                  helperText={error || 'Enter a JWT token to decode and analyze'}
                  sx={{ 
                    mb: 2,
                    '& .MuiInputBase-root': {
                      fontFamily: 'monospace'
                    }
                  }}
                />

                <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<UploadIcon />}
                    size="small"
                  >
                    Upload JWT File
                    <input
                      type="file"
                      hidden
                      accept=".txt,.jwt"
                      onChange={handleFileUpload}
                    />
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<DownloadIcon />}
                    onClick={exportAnalysis}
                    disabled={!jwtAnalysis || jwtAnalysis.error}
                    size="small"
                  >
                    Export Analysis
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<ContentCopyIcon />}
                    onClick={() => handleCopy(jwtToken)}
                    disabled={!jwtToken}
                    size="small"
                  >
                    Copy Token
                  </Button>
                </Stack>
              </Paper>

              {/* Decoded Sections */}
              {jwtAnalysis && !jwtAnalysis.error && (
                <>
                  {/* Header */}
                  <Paper sx={{ p: 3, mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="h6">Header</Typography>
                      <IconButton onClick={() => handleCopy(header)} size="small">
                        <ContentCopyIcon />
                      </IconButton>
                    </Box>
                    <Paper variant="outlined" sx={{ p: 2, overflow: 'auto' }}>
                      <pre style={{ margin: 0, fontFamily: 'monospace', fontSize: '0.875rem' }}>
                        {header}
                      </pre>
                    </Paper>
                  </Paper>

                  {/* Payload */}
                  <Paper sx={{ p: 3, mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="h6">Payload (Claims)</Typography>
                      <IconButton onClick={() => handleCopy(payload)} size="small">
                        <ContentCopyIcon />
                      </IconButton>
                    </Box>
                    <Paper variant="outlined" sx={{ p: 2, overflow: 'auto' }}>
                      <pre style={{ margin: 0, fontFamily: 'monospace', fontSize: '0.875rem' }}>
                        {payload}
                      </pre>
                    </Paper>
                  </Paper>

                  {/* Signature */}
                  <Paper sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="h6">Signature</Typography>
                      <IconButton onClick={() => handleCopy(signature)} size="small">
                        <ContentCopyIcon />
                      </IconButton>
                    </Box>
                    <Paper variant="outlined" sx={{ p: 2, overflow: 'auto' }}>
                      <Typography sx={{ fontFamily: 'monospace', fontSize: '0.875rem', wordBreak: 'break-all' }}>
                        {signature}
                      </Typography>
                    </Paper>
                  </Paper>
                </>
              )}
            </>
          )}

          {currentTab === 1 && jwtAnalysis && !jwtAnalysis.error && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                <SecurityIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                Security Analysis
              </Typography>

              {/* Token Status */}
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="subtitle1" gutterBottom>Token Status</Typography>
                  <Stack spacing={1}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {jwtAnalysis.isExpired ? 
                        <ErrorIcon color="error" sx={{ mr: 1 }} /> : 
                        <CheckCircleIcon color="success" sx={{ mr: 1 }} />
                      }
                      <Typography color={jwtAnalysis.isExpired ? 'error' : 'success.main'}>
                        {jwtAnalysis.isExpired ? 'Token Expired' : 'Token Valid'}
                      </Typography>
                    </Box>
                    {jwtAnalysis.isNotYetValid && (
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <WarningIcon color="warning" sx={{ mr: 1 }} />
                        <Typography color="warning.main">Token not yet valid (nbf claim)</Typography>
                      </Box>
                    )}
                  </Stack>
                </CardContent>
              </Card>

              {/* Time Analysis */}
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="subtitle1" gutterBottom>
                    <AccessTimeIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                    Time Analysis
                  </Typography>
                  <Table size="small">
                    <TableBody>
                      <TableRow>
                        <TableCell>Issued At (iat)</TableCell>
                        <TableCell>{formatTime(jwtAnalysis.payload.iat)}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Expires At (exp)</TableCell>
                        <TableCell>{formatTime(jwtAnalysis.payload.exp)}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Not Before (nbf)</TableCell>
                        <TableCell>{formatTime(jwtAnalysis.payload.nbf)}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Time Until Expiry</TableCell>
                        <TableCell>
                          <Chip 
                            label={getTimeRemaining(jwtAnalysis.payload.exp)}
                            color={jwtAnalysis.isExpired ? 'error' : 'success'}
                            size="small"
                          />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Security Issues */}
              <Card>
                <CardContent>
                  <Typography variant="subtitle1" gutterBottom>Security Assessment</Typography>
                  {jwtAnalysis.securityIssues.length === 0 ? (
                    <Alert severity="success">No security issues detected</Alert>
                  ) : (
                    <Stack spacing={1}>
                      {jwtAnalysis.securityIssues.map((issue, index) => (
                        <Alert 
                          key={index} 
                          severity={issue.type === 'critical' ? 'error' : issue.type === 'warning' ? 'warning' : 'info'}
                        >
                          {issue.message}
                        </Alert>
                      ))}
                    </Stack>
                  )}
                </CardContent>
              </Card>
            </Paper>
          )}

          {currentTab === 2 && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                <VpnKeyIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                Signature Verification
              </Typography>

              <Alert severity="info" sx={{ mb: 3 }}>
                <strong>Algorithm:</strong> {jwtAnalysis?.algorithm || 'Unknown'} | 
                <strong> Status:</strong> {signatureVerified}
              </Alert>

              {jwtAnalysis?.algorithm?.startsWith('HS') && (
                <Card sx={{ mb: 3 }}>
                  <CardContent>
                    <Typography variant="subtitle1" gutterBottom>HMAC Secret</Typography>
                    <TextField
                      fullWidth
                      label="Secret Key"
                      value={secret}
                      onChange={(e) => setSecret(e.target.value)}
                      placeholder="Enter your HMAC secret..."
                      sx={{ mb: 2 }}
                    />
                    <Button variant="contained" onClick={verifySignature}>
                      Verify HMAC Signature
                    </Button>
                  </CardContent>
                </Card>
              )}

              {(jwtAnalysis?.algorithm?.startsWith('RS') || jwtAnalysis?.algorithm?.startsWith('ES')) && (
                <Card sx={{ mb: 3 }}>
                  <CardContent>
                    <Typography variant="subtitle1" gutterBottom>Public Key (PEM Format)</Typography>
                    <TextField
                      fullWidth
                      multiline
                      rows={6}
                      label="Public Key"
                      value={publicKey}
                      onChange={(e) => setPublicKey(e.target.value)}
                      placeholder="-----BEGIN PUBLIC KEY-----&#10;...&#10;-----END PUBLIC KEY-----"
                      sx={{ mb: 2 }}
                    />
                    <Button variant="contained" onClick={verifySignature}>
                      Verify RSA/ECDSA Signature
                    </Button>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardContent>
                  <Typography variant="subtitle1" gutterBottom>Verification Guidelines</Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon><InfoIcon color="info" /></ListItemIcon>
                      <ListItemText 
                        primary="HMAC (HS256/384/512)" 
                        secondary="Requires shared secret key" 
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><InfoIcon color="info" /></ListItemIcon>
                      <ListItemText 
                        primary="RSA (RS256/384/512)" 
                        secondary="Requires public key in PEM format" 
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><InfoIcon color="info" /></ListItemIcon>
                      <ListItemText 
                        primary="ECDSA (ES256/384/512)" 
                        secondary="Requires public key in PEM format" 
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Paper>
          )}

          {currentTab === 3 && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>JWT Guide</Typography>
              
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="subtitle2">What is JWT?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" paragraph>
                    JSON Web Token (JWT) is a compact, URL-safe means of representing claims to be transferred between two parties.
                  </Typography>
                  <Typography variant="body2" paragraph>
                    JWTs consist of three parts separated by dots (.): <strong>Header.Payload.Signature</strong>
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="subtitle2">Standard Claims</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell><strong>Claim</strong></TableCell>
                        <TableCell><strong>Description</strong></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>iss</TableCell>
                        <TableCell>Issuer - identifies who issued the JWT</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>sub</TableCell>
                        <TableCell>Subject - identifies the subject of the JWT</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>aud</TableCell>
                        <TableCell>Audience - identifies recipients of the JWT</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>exp</TableCell>
                        <TableCell>Expiration Time - after which JWT must not be accepted</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>iat</TableCell>
                        <TableCell>Issued At - time at which JWT was issued</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>nbf</TableCell>
                        <TableCell>Not Before - time before which JWT must not be accepted</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>jti</TableCell>
                        <TableCell>JWT ID - unique identifier for the JWT</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="subtitle2">Security Best Practices</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List dense>
                    <ListItem>
                      <ListItemText 
                        primary="Always verify signatures" 
                        secondary="Never trust JWTs without signature verification" 
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="Use strong secrets" 
                        secondary="HMAC keys should be at least 256 bits long" 
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="Set appropriate expiration" 
                        secondary="Use short expiration times for sensitive operations" 
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="Avoid sensitive data" 
                        secondary="JWT payload is only base64 encoded, not encrypted" 
                      />
                    </ListItem>
                  </List>
                </AccordionDetails>
              </Accordion>
            </Paper>
          )}
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          {/* Quick Stats */}
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Token Info</Typography>
              {jwtAnalysis && !jwtAnalysis.error ? (
                <Table size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell>Algorithm</TableCell>
                      <TableCell>
                        <Chip label={jwtAnalysis.algorithm} size="small" color="primary" />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Type</TableCell>
                      <TableCell>{jwtAnalysis.tokenType}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Status</TableCell>
                      <TableCell>
                        <Chip 
                          label={jwtAnalysis.isExpired ? 'Expired' : 'Valid'} 
                          color={jwtAnalysis.isExpired ? 'error' : 'success'}
                          size="small" 
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Security Issues</TableCell>
                      <TableCell>{jwtAnalysis.securityIssues.length}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              ) : (
                <Typography color="text.secondary">No token loaded</Typography>
              )}
            </CardContent>
          </Card>

          {/* Example Tokens */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Example Tokens</Typography>
              <Stack spacing={1}>
                <Button
                  variant="outlined"
                  onClick={() => setJwtToken(exampleTokens.hs256)}
                  fullWidth
                  sx={{ justifyContent: 'flex-start' }}
                >
                  <strong>HS256:</strong>&nbsp;Standard Token
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => setJwtToken(exampleTokens.expired)}
                  fullWidth
                  sx={{ justifyContent: 'flex-start' }}
                >
                  <strong>Expired:</strong>&nbsp;Test Expiration
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => setJwtToken(exampleTokens.complex)}
                  fullWidth
                  sx={{ justifyContent: 'flex-start' }}
                >
                  <strong>Complex:</strong>&nbsp;Multiple Claims
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
      />
    </Box>
  );
}