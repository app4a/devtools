import React, { useState, useCallback } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Slider,
  Paper,
  IconButton,
  Snackbar,
  Alert,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import RefreshIcon from '@mui/icons-material/Refresh';
import Head from 'next/head';

export default function PasswordGenerator({ name, description }) {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [excludeSimilar, setExcludeSimilar] = useState(false);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [passwordHistory, setPasswordHistory] = useState([]);

  const generatePassword = useCallback(() => {
    let charset = '';
    
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (excludeSimilar) {
      charset = charset.replace(/[il1Lo0O]/g, '');
    }

    if (excludeAmbiguous) {
      charset = charset.replace(/[{}[\]()\/\\'"~,;.<>]/g, '');
    }

    if (charset === '') {
      alert('Please select at least one character type');
      return;
    }

    let result = '';
    for (let i = 0; i < length; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    setPassword(result);
    
    // Add to history (keep last 5)
    setPasswordHistory(prev => [result, ...prev.slice(0, 4)]);
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols, excludeSimilar, excludeAmbiguous]);

  const copyToClipboard = async (text = password) => {
    try {
      await navigator.clipboard.writeText(text);
      setOpenSnackbar(true);
    } catch (err) {
      console.error('Failed to copy password: ', err);
    }
  };

  const getStrengthInfo = (pwd) => {
    if (!pwd) return { score: 0, text: 'No password', color: 'error' };
    
    let score = 0;
    if (pwd.length >= 8) score += 1;
    if (pwd.length >= 12) score += 1;
    if (/[a-z]/.test(pwd)) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;

    if (score <= 2) return { score, text: 'Weak', color: 'error' };
    if (score <= 4) return { score, text: 'Medium', color: 'warning' };
    return { score, text: 'Strong', color: 'success' };
  };

  const strengthInfo = getStrengthInfo(password);

  // Generate initial password
  React.useEffect(() => {
    generatePassword();
  }, []);

  return (
    <Box sx={{ p: 2 }}>
      <Head>
        <title>{name ? `${name} - Dev Tools` : 'Password Generator - Dev Tools'}</title>
        <meta name="description" content={description} />
      </Head>
      
      <Typography variant="h4" gutterBottom>
        {name}
      </Typography>
      <Typography variant="body1" paragraph color="text.secondary">
        {description}
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          {/* Password Output */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Generated Password
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <TextField
                fullWidth
                value={password}
                variant="outlined"
                InputProps={{
                  readOnly: true,
                  style: { 
                    fontFamily: 'monospace',
                    fontSize: '1.1rem',
                    backgroundColor: '#2d2d2d',
                    color: '#ffffff'
                  },
                  endAdornment: (
                    <IconButton onClick={() => copyToClipboard()} edge="end">
                      <ContentCopyIcon />
                    </IconButton>
                  ),
                }}
              />
              <IconButton onClick={generatePassword} sx={{ ml: 1 }}>
                <RefreshIcon />
              </IconButton>
            </Box>
            
            {/* Password Strength */}
            <Alert severity={strengthInfo.color} sx={{ mb: 2 }}>
              Password Strength: {strengthInfo.text} ({strengthInfo.score}/6)
            </Alert>

            <Button 
              variant="contained" 
              onClick={generatePassword}
              fullWidth
              size="large"
              startIcon={<RefreshIcon />}
            >
              Generate New Password
            </Button>
          </Paper>

          {/* Settings */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Password Settings
            </Typography>

            {/* Length Slider */}
            <Box sx={{ mb: 3 }}>
              <Typography gutterBottom>
                Length: {length} characters
              </Typography>
              <Slider
                value={length}
                onChange={(e, newValue) => setLength(newValue)}
                min={4}
                max={128}
                marks={[
                  { value: 8, label: '8' },
                  { value: 16, label: '16' },
                  { value: 32, label: '32' },
                  { value: 64, label: '64' }
                ]}
                valueLabelDisplay="auto"
              />
            </Box>

            {/* Character Type Options */}
            <Typography variant="subtitle1" gutterBottom>
              Include Characters:
            </Typography>
            <Grid container spacing={1}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={includeUppercase}
                      onChange={(e) => setIncludeUppercase(e.target.checked)}
                    />
                  }
                  label="Uppercase (A-Z)"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={includeLowercase}
                      onChange={(e) => setIncludeLowercase(e.target.checked)}
                    />
                  }
                  label="Lowercase (a-z)"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={includeNumbers}
                      onChange={(e) => setIncludeNumbers(e.target.checked)}
                    />
                  }
                  label="Numbers (0-9)"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={includeSymbols}
                      onChange={(e) => setIncludeSymbols(e.target.checked)}
                    />
                  }
                  label="Symbols (!@#$%^&*)"
                />
              </Grid>
            </Grid>

            {/* Advanced Options */}
            <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
              Advanced Options:
            </Typography>
            <FormControlLabel
              control={
                <Checkbox
                  checked={excludeSimilar}
                  onChange={(e) => setExcludeSimilar(e.target.checked)}
                />
              }
              label="Exclude similar characters (i, l, 1, L, o, 0, O)"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={excludeAmbiguous}
                  onChange={(e) => setExcludeAmbiguous(e.target.checked)}
                />
              }
              label={'Exclude ambiguous characters ({ } [ ] ( ) / \\ \' " ~ , ; . < >)'}
            />
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          {/* Password History */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Password History
              </Typography>
              <List dense>
                {passwordHistory.map((pwd, index) => (
                  <ListItem 
                    key={index}
                    secondaryAction={
                      <IconButton edge="end" onClick={() => copyToClipboard(pwd)}>
                        <ContentCopyIcon />
                      </IconButton>
                    }
                  >
                    <ListItemText 
                      primary={pwd.substring(0, 20) + (pwd.length > 20 ? '...' : '')}
                      secondary={`${pwd.length} chars`}
                      primaryTypographyProps={{ fontFamily: 'monospace' }}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>

          {/* Security Tips */}
          <Card sx={{ mt: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Password Security Tips
              </Typography>
              <Typography variant="body2" paragraph>
                • Use at least 12 characters for better security
              </Typography>
              <Typography variant="body2" paragraph>
                • Include a mix of uppercase, lowercase, numbers, and symbols
              </Typography>
              <Typography variant="body2" paragraph>
                • Don't reuse passwords across multiple accounts
              </Typography>
              <Typography variant="body2" paragraph>
                • Consider using a password manager
              </Typography>
              <Typography variant="body2">
                • Change passwords regularly for sensitive accounts
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
        message="Password copied to clipboard!"
      />
    </Box>
  );
}
