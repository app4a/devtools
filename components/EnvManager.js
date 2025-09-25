import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Typography,
  TextField,
  Paper,
  Grid,
  Card,
  CardContent,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Alert,
  IconButton,
  Snackbar,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Chip,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Divider,
  Tooltip,
  Switch,
  FormControlLabel,
  AccordionSummary,
  AccordionDetails,
  Accordion,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
  Checkbox
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CompareIcon from '@mui/icons-material/Compare';
import SecurityIcon from '@mui/icons-material/Security';
import StorageIcon from '@mui/icons-material/Storage';
import CloudIcon from '@mui/icons-material/Cloud';
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import UploadIcon from '@mui/icons-material/Upload';
import SaveIcon from '@mui/icons-material/Save';
import Head from 'next/head';

export default function EnvManager({ name, description }) {
  const [currentTab, setCurrentTab] = useState(0);
  const [envContent, setEnvContent] = useState('# Development Environment\nAPI_KEY=your_api_key_here\nDATABASE_URL=postgresql://localhost:5432/mydb\nREDIS_URL=redis://localhost:6379\nJWT_SECRET=your_jwt_secret\nNODE_ENV=development\nPORT=3000\nAPI_VERSION=v1\nDEBUG=true');
  const [compareEnvContent, setCompareEnvContent] = useState('# Production Environment\nAPI_KEY=prod_api_key\nDATABASE_URL=postgresql://prod-server:5432/mydb\nREDIS_URL=redis://prod-redis:6379\nJWT_SECRET=prod_jwt_secret\nNODE_ENV=production\nPORT=8080\nAPI_VERSION=v1\nDEBUG=false\nSENTRY_DSN=https://sentry.io/dsn');
  const [exportFormat, setExportFormat] = useState('env');
  const [serviceName, setServiceName] = useState('my-app');
  const [namespace, setNamespace] = useState('default');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [showValues, setShowValues] = useState(false);
  const [savedProfiles, setSavedProfiles] = useState([]);
  const [currentProfile, setCurrentProfile] = useState('');
  const [newProfileName, setNewProfileName] = useState('');
  const [openProfileDialog, setOpenProfileDialog] = useState(false);
  const [validationEnabled, setValidationEnabled] = useState(true);
  const [securityCheck, setSecurityCheck] = useState(true);
  
  // Check if key is likely a secret
  const isSecretKey = (key) => {
    if (!key) return false;
    const secretKeywords = [
      'SECRET', 'KEY', 'TOKEN', 'PASSWORD', 'PASS', 'PWD', 'PRIVATE', 
      'API_KEY', 'AUTH', 'CREDENTIAL', 'DSN', 'CONNECTION'
    ];
    return secretKeywords.some(keyword => key.toUpperCase().includes(keyword));
  };
  
  // Parse environment variables
  const parsedEnvVars = useMemo(() => {
    const vars = [];
    const lines = envContent.split('\n');
    
    lines.forEach((line, index) => {
      const trimmedLine = line.trim();
      if (trimmedLine && !trimmedLine.startsWith('#')) {
        const [key, ...valueParts] = trimmedLine.split('=');
        const value = valueParts.join('=');
        const hasQuotes = value && (value.startsWith('"') && value.endsWith('"') || value.startsWith("'") && value.endsWith("'"));
        
        vars.push({
          id: index,
          key: key?.trim(),
          value: value,
          cleanValue: hasQuotes ? value.slice(1, -1) : value,
          line: index + 1,
          hasQuotes,
          isValid: key && value !== undefined,
          isSecret: isSecretKey(key),
          isEmpty: !value || value.trim() === ''
        });
      }
    });
    
    return vars;
  }, [envContent]);

  // Parse compare environment variables
  const parsedCompareEnvVars = useMemo(() => {
    const vars = [];
    const lines = compareEnvContent.split('\n');
    
    lines.forEach((line, index) => {
      const trimmedLine = line.trim();
      if (trimmedLine && !trimmedLine.startsWith('#')) {
        const [key, ...valueParts] = trimmedLine.split('=');
        const value = valueParts.join('=');
        
        vars.push({
          id: index,
          key: key?.trim(),
          value: value,
          line: index + 1,
          isValid: key && value !== undefined,
          isSecret: isSecretKey(key),
          isEmpty: !value || value.trim() === ''
        });
      }
    });
    
    return vars;
  }, [compareEnvContent]);

  // Validation rules
  const validateEnvVars = () => {
    const issues = [];
    const keysSeen = new Set();
    
    parsedEnvVars.forEach(envVar => {
      // Check for duplicate keys
      if (keysSeen.has(envVar.key)) {
        issues.push({
          type: 'error',
          message: `Duplicate key: ${envVar.key}`,
          line: envVar.line
        });
      }
      keysSeen.add(envVar.key);
      
      // Check for invalid key format
      if (envVar.key && !/^[A-Z_][A-Z0-9_]*$/i.test(envVar.key)) {
        issues.push({
          type: 'warning',
          message: `Invalid key format: ${envVar.key} (should be UPPER_CASE)`,
          line: envVar.line
        });
      }
      
      // Check for empty values
      if (envVar.isEmpty) {
        issues.push({
          type: 'warning',
          message: `Empty value for: ${envVar.key}`,
          line: envVar.line
        });
      }
      
      // Security checks
      if (securityCheck && envVar.isSecret) {
        if (envVar.cleanValue && (
          envVar.cleanValue.toLowerCase() === 'password' ||
          envVar.cleanValue.toLowerCase() === 'secret' ||
          envVar.cleanValue.includes('your_') ||
          envVar.cleanValue.includes('change_me') ||
          envVar.cleanValue === '123456'
        )) {
          issues.push({
            type: 'error',
            message: `Insecure value detected for: ${envVar.key}`,
            line: envVar.line
          });
        }
      }
    });
    
    return issues;
  };

  const validationIssues = useMemo(() => {
    return validationEnabled ? validateEnvVars() : [];
  }, [parsedEnvVars, validationEnabled, securityCheck]);

  // Generate different export formats
  const generateExport = () => {
    const vars = parsedEnvVars.filter(v => v.isValid);
    
    switch (exportFormat) {
      case 'docker':
        return vars.map(v => `ENV ${v.key}=${v.value}`).join('\n');
      
      case 'k8s-secret':
        const secretData = {};
        vars.forEach(v => {
          secretData[v.key] = Buffer.from(v.cleanValue || '').toString('base64');
        });
        
        return `apiVersion: v1
kind: Secret
metadata:
  name: ${serviceName}-secrets
  namespace: ${namespace}
type: Opaque
data:
${Object.entries(secretData).map(([k, v]) => `  ${k}: ${v}`).join('\n')}`;
      
      case 'k8s-configmap':
        return `apiVersion: v1
kind: ConfigMap
metadata:
  name: ${serviceName}-config
  namespace: ${namespace}
data:
${vars.filter(v => !v.isSecret).map(v => `  ${v.key}: "${v.cleanValue || ''}"`).join('\n')}`;
      
      case 'json':
        const jsonObj = {};
        vars.forEach(v => {
          jsonObj[v.key] = v.cleanValue || '';
        });
        return JSON.stringify(jsonObj, null, 2);
      
      case 'yaml':
        return vars.map(v => `${v.key}: "${v.cleanValue || ''}"`).join('\n');
      
      case 'shell':
        return vars.map(v => `export ${v.key}="${v.cleanValue || ''}"`).join('\n');
      
      case 'powershell':
        return vars.map(v => `$env:${v.key}="${v.cleanValue || ''}"`).join('\n');
      
      default: // env
        return envContent;
    }
  };

  // Compare environments
  const compareEnvironments = () => {
    const env1Keys = new Set(parsedEnvVars.map(v => v.key));
    const env2Keys = new Set(parsedCompareEnvVars.map(v => v.key));
    
    const env1Map = new Map(parsedEnvVars.map(v => [v.key, v.cleanValue]));
    const env2Map = new Map(parsedCompareEnvVars.map(v => [v.key, v.cleanValue]));
    
    const comparison = [];
    
    // Keys in both environments
    for (const key of env1Keys) {
      if (env2Keys.has(key)) {
        const value1 = env1Map.get(key);
        const value2 = env2Map.get(key);
        comparison.push({
          key,
          status: value1 === value2 ? 'same' : 'different',
          value1,
          value2,
          isSecret: isSecretKey(key)
        });
      } else {
        comparison.push({
          key,
          status: 'missing-in-env2',
          value1: env1Map.get(key),
          value2: null,
          isSecret: isSecretKey(key)
        });
      }
    }
    
    // Keys only in env2
    for (const key of env2Keys) {
      if (!env1Keys.has(key)) {
        comparison.push({
          key,
          status: 'missing-in-env1',
          value1: null,
          value2: env2Map.get(key),
          isSecret: isSecretKey(key)
        });
      }
    }
    
    return comparison.sort((a, b) => a.key.localeCompare(b.key));
  };

  // Initialize saved profiles from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('env-profiles');
    if (saved) {
      setSavedProfiles(JSON.parse(saved));
    }
  }, []);

  // Copy to clipboard
  const copyToClipboard = (text, message) => {
    navigator.clipboard.writeText(text).then(() => {
      setSnackbarMessage(message);
      setOpenSnackbar(true);
    });
  };

  // Download file
  const downloadFile = (content, filename, mimeType = 'text/plain') => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Save profile
  const saveProfile = () => {
    if (!newProfileName.trim()) return;
    
    const profile = {
      id: Date.now(),
      name: newProfileName,
      content: envContent,
      createdAt: new Date().toISOString()
    };
    
    const updated = [...savedProfiles, profile];
    setSavedProfiles(updated);
    localStorage.setItem('env-profiles', JSON.stringify(updated));
    setNewProfileName('');
    setOpenProfileDialog(false);
    setSnackbarMessage('Profile saved successfully');
    setOpenSnackbar(true);
  };

  // Load profile
  const loadProfile = (profile) => {
    setEnvContent(profile.content);
    setCurrentProfile(profile.name);
    setSnackbarMessage(`Loaded profile: ${profile.name}`);
    setOpenSnackbar(true);
  };

  // Delete profile
  const deleteProfile = (profileId) => {
    const updated = savedProfiles.filter(p => p.id !== profileId);
    setSavedProfiles(updated);
    localStorage.setItem('env-profiles', JSON.stringify(updated));
    setSnackbarMessage('Profile deleted');
    setOpenSnackbar(true);
  };

  // File upload handler
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setEnvContent(e.target.result);
        setSnackbarMessage('File uploaded successfully');
        setOpenSnackbar(true);
      };
      reader.readAsText(file);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Head>
        <title>{name ? `${name} - Dev Tools` : 'Environment Variables Manager - Dev Tools'}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content="environment variables, .env file, docker env, kubernetes secrets, config management" />
      </Head>
      
      <Typography variant="h4" gutterBottom>
        {name}
      </Typography>
      <Typography variant="body1" paragraph color="text.secondary">
        {description}
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        <strong>Professional Environment Manager:</strong> Validate, compare, and export environment variables 
        with security checks and multi-format support for Docker, Kubernetes, and more.
      </Alert>

      <Tabs value={currentTab} onChange={(e, newValue) => setCurrentTab(newValue)} sx={{ mb: 3 }}>
        <Tab icon={<EditIcon />} label="Editor" />
        <Tab icon={<CompareIcon />} label="Compare" />
        <Tab icon={<CloudIcon />} label="Export" />
        <Tab icon={<SecurityIcon />} label="Validation" />
        <Tab icon={<StorageIcon />} label="Profiles" />
      </Tabs>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          {currentTab === 0 && (
            <Paper sx={{ p: 3 }}>
              <Stack direction="row" spacing={2} sx={{ mb: 3 }} alignItems="center">
                <input
                  accept=".env,.txt"
                  style={{ display: 'none' }}
                  id="file-upload"
                  type="file"
                  onChange={handleFileUpload}
                />
                <label htmlFor="file-upload">
                  <Button
                    variant="outlined"
                    component="span"
                    startIcon={<UploadIcon />}
                    size="small"
                  >
                    Upload .env
                  </Button>
                </label>
                <Button
                  variant="outlined"
                  startIcon={<ClearIcon />}
                  onClick={() => setEnvContent('')}
                  size="small"
                >
                  Clear
                </Button>
                <Button
                  variant="contained"
                  startIcon={<SaveIcon />}
                  onClick={() => setOpenProfileDialog(true)}
                  size="small"
                >
                  Save as Profile
                </Button>
                <FormControlLabel
                  control={
                    <Switch 
                      checked={showValues} 
                      onChange={(e) => setShowValues(e.target.checked)}
                      size="small"
                    />
                  }
                  label="Show Values"
                />
              </Stack>

              <TextField
                multiline
                rows={15}
                value={envContent}
                onChange={(e) => setEnvContent(e.target.value)}
                placeholder="# Environment Variables&#10;API_KEY=your_api_key&#10;DATABASE_URL=postgresql://localhost:5432/mydb&#10;DEBUG=true"
                fullWidth
                sx={{
                  '& .MuiOutlinedInput-root': {
                    fontFamily: 'monospace',
                    fontSize: '0.875rem',
                  }
                }}
              />

              {validationIssues.length > 0 && (
                <Alert severity="warning" sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Validation Issues ({validationIssues.length})
                  </Typography>
                  <List dense>
                    {validationIssues.slice(0, 5).map((issue, index) => (
                      <ListItem key={index} sx={{ py: 0 }}>
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              {issue.type === 'error' ? (
                                <ErrorIcon color="error" fontSize="small" />
                              ) : (
                                <WarningIcon color="warning" fontSize="small" />
                              )}
                              <Typography variant="body2">
                                Line {issue.line}: {issue.message}
                              </Typography>
                            </Box>
                          }
                        />
                      </ListItem>
                    ))}
                    {validationIssues.length > 5 && (
                      <Typography variant="caption" color="text.secondary">
                        ... and {validationIssues.length - 5} more issues
                      </Typography>
                    )}
                  </List>
                </Alert>
              )}
            </Paper>
          )}

          {currentTab === 1 && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>Environment Comparison</Typography>
              
              <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2" gutterBottom>Environment 1</Typography>
                  <TextField
                    multiline
                    rows={8}
                    value={envContent}
                    onChange={(e) => setEnvContent(e.target.value)}
                    fullWidth
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        fontFamily: 'monospace',
                        fontSize: '0.75rem',
                      }
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2" gutterBottom>Environment 2</Typography>
                  <TextField
                    multiline
                    rows={8}
                    value={compareEnvContent}
                    onChange={(e) => setCompareEnvContent(e.target.value)}
                    fullWidth
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        fontFamily: 'monospace',
                        fontSize: '0.75rem',
                      }
                    }}
                  />
                </Grid>
              </Grid>

              <Typography variant="subtitle2" gutterBottom>Comparison Results</Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Variable</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Environment 1</TableCell>
                      <TableCell>Environment 2</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {compareEnvironments().map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {item.isSecret && <SecurityIcon fontSize="small" color="warning" />}
                            <Typography variant="body2" fontFamily="monospace">
                              {item.key}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip
                            size="small"
                            label={
                              item.status === 'same' ? 'Same' :
                              item.status === 'different' ? 'Different' :
                              item.status === 'missing-in-env1' ? 'Missing in 1' :
                              'Missing in 2'
                            }
                            color={
                              item.status === 'same' ? 'success' :
                              item.status === 'different' ? 'warning' :
                              'error'
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" fontFamily="monospace">
                            {item.value1 !== null ? (
                              item.isSecret && !showValues ? '••••••••' : item.value1
                            ) : '-'}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" fontFamily="monospace">
                            {item.value2 !== null ? (
                              item.isSecret && !showValues ? '••••••••' : item.value2
                            ) : '-'}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          )}

          {currentTab === 2 && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>Export Configuration</Typography>
              
              <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Export Format</InputLabel>
                    <Select
                      value={exportFormat}
                      onChange={(e) => setExportFormat(e.target.value)}
                      label="Export Format"
                    >
                      <MenuItem value="env">.env File</MenuItem>
                      <MenuItem value="docker">Dockerfile ENV</MenuItem>
                      <MenuItem value="k8s-secret">Kubernetes Secret</MenuItem>
                      <MenuItem value="k8s-configmap">Kubernetes ConfigMap</MenuItem>
                      <MenuItem value="json">JSON</MenuItem>
                      <MenuItem value="yaml">YAML</MenuItem>
                      <MenuItem value="shell">Shell Export</MenuItem>
                      <MenuItem value="powershell">PowerShell</MenuItem>
                    </Select>
                  </FormControl>

                  {(exportFormat === 'k8s-secret' || exportFormat === 'k8s-configmap') && (
                    <>
                      <TextField
                        label="Service Name"
                        value={serviceName}
                        onChange={(e) => setServiceName(e.target.value)}
                        fullWidth
                        sx={{ mb: 2 }}
                      />
                      <TextField
                        label="Namespace"
                        value={namespace}
                        onChange={(e) => setNamespace(e.target.value)}
                        fullWidth
                        sx={{ mb: 2 }}
                      />
                    </>
                  )}

                  <Stack direction="row" spacing={2}>
                    <Button
                      variant="contained"
                      startIcon={<ContentCopyIcon />}
                      onClick={() => copyToClipboard(generateExport(), 'Configuration copied to clipboard')}
                    >
                      Copy Config
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<DownloadIcon />}
                      onClick={() => {
                        const ext = exportFormat === 'json' ? 'json' : 
                                   exportFormat === 'yaml' ? 'yaml' :
                                   exportFormat === 'k8s-secret' ? 'secret.yaml' :
                                   exportFormat === 'k8s-configmap' ? 'configmap.yaml' : 'env';
                        downloadFile(generateExport(), `${serviceName}.${ext}`);
                      }}
                    >
                      Download
                    </Button>
                  </Stack>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2" gutterBottom>Generated Output:</Typography>
                  <TextField
                    multiline
                    rows={12}
                    value={generateExport()}
                    fullWidth
                    InputProps={{
                      readOnly: true,
                      sx: {
                        fontFamily: 'monospace',
                        fontSize: '0.75rem',
                      }
                    }}
                  />
                </Grid>
              </Grid>
            </Paper>
          )}

          {currentTab === 3 && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>Validation & Security</Typography>
              
              <Stack spacing={3}>
                <FormControlLabel
                  control={
                    <Switch 
                      checked={validationEnabled} 
                      onChange={(e) => setValidationEnabled(e.target.checked)}
                    />
                  }
                  label="Enable Validation"
                />
                
                <FormControlLabel
                  control={
                    <Switch 
                      checked={securityCheck} 
                      onChange={(e) => setSecurityCheck(e.target.checked)}
                    />
                  }
                  label="Security Checks"
                />

                <Divider />

                <Box>
                  <Typography variant="subtitle2" gutterBottom>Validation Summary</Typography>
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                      <Card>
                        <CardContent>
                          <Typography variant="h6" color="primary">
                            {parsedEnvVars.length}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Total Variables
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                      <Card>
                        <CardContent>
                          <Typography variant="h6" color="warning.main">
                            {parsedEnvVars.filter(v => v.isSecret).length}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Secret Variables
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                      <Card>
                        <CardContent>
                          <Typography variant="h6" color="error.main">
                            {validationIssues.filter(i => i.type === 'error').length}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Errors
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                      <Card>
                        <CardContent>
                          <Typography variant="h6" color="warning.main">
                            {validationIssues.filter(i => i.type === 'warning').length}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Warnings
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                </Box>

                {validationIssues.length > 0 && (
                  <Box>
                    <Typography variant="subtitle2" gutterBottom>Detailed Issues</Typography>
                    <List>
                      {validationIssues.map((issue, index) => (
                        <ListItem key={index}>
                          <ListItemText
                            primary={
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                {issue.type === 'error' ? (
                                  <ErrorIcon color="error" fontSize="small" />
                                ) : (
                                  <WarningIcon color="warning" fontSize="small" />
                                )}
                                <Typography variant="body2">
                                  Line {issue.line}: {issue.message}
                                </Typography>
                              </Box>
                            }
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                )}
              </Stack>
            </Paper>
          )}

          {currentTab === 4 && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>Saved Profiles</Typography>
              
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setOpenProfileDialog(true)}
                sx={{ mb: 3 }}
              >
                Save Current as Profile
              </Button>

              {savedProfiles.length === 0 ? (
                <Alert severity="info">
                  No saved profiles yet. Save your current environment configuration to create reusable profiles.
                </Alert>
              ) : (
                <Grid container spacing={2}>
                  {savedProfiles.map((profile) => (
                    <Grid size={{ xs: 12, md: 6 }} key={profile.id}>
                      <Card>
                        <CardContent>
                          <Typography variant="h6" gutterBottom>
                            {profile.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            Created: {new Date(profile.createdAt).toLocaleDateString()}
                          </Typography>
                          <Typography variant="body2" gutterBottom>
                            {profile.content.split('\n').filter(line => 
                              line.trim() && !line.trim().startsWith('#')
                            ).length} variables
                          </Typography>
                          <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                            <Button
                              size="small"
                              onClick={() => loadProfile(profile)}
                            >
                              Load
                            </Button>
                            <IconButton
                              size="small"
                              onClick={() => deleteProfile(profile.id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Stack>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Paper>
          )}
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>Quick Actions</Typography>
            <Stack spacing={2}>
              <Button
                variant="outlined"
                startIcon={<ContentCopyIcon />}
                onClick={() => copyToClipboard(envContent, 'Environment variables copied')}
                fullWidth
              >
                Copy .env
              </Button>
              <Button
                variant="outlined"
                startIcon={<DownloadIcon />}
                onClick={() => downloadFile(envContent, '.env')}
                fullWidth
              >
                Download .env
              </Button>
              <Button
                variant="outlined"
                startIcon={<CloudIcon />}
                onClick={() => copyToClipboard(generateExport(), 'Configuration copied')}
                fullWidth
              >
                Copy as {exportFormat.toUpperCase()}
              </Button>
            </Stack>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Environment Info</Typography>
            <Stack spacing={1}>
              <Typography variant="body2">
                <strong>Variables:</strong> {parsedEnvVars.length}
              </Typography>
              <Typography variant="body2">
                <strong>Secrets:</strong> {parsedEnvVars.filter(v => v.isSecret).length}
              </Typography>
              <Typography variant="body2">
                <strong>Empty Values:</strong> {parsedEnvVars.filter(v => v.isEmpty).length}
              </Typography>
              <Typography variant="body2">
                <strong>Issues:</strong> {validationIssues.length}
              </Typography>
              <Typography variant="body2">
                <strong>Profiles:</strong> {savedProfiles.length}
              </Typography>
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      {/* Profile Dialog */}
      <Dialog open={openProfileDialog} onClose={() => setOpenProfileDialog(false)}>
        <DialogTitle>Save Environment Profile</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Profile Name"
            fullWidth
            value={newProfileName}
            onChange={(e) => setNewProfileName(e.target.value)}
            placeholder="e.g., Development, Production, Staging"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenProfileDialog(false)}>Cancel</Button>
          <Button onClick={saveProfile} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
      />
    </Box>
  );
}
