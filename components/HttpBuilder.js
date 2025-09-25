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
  Chip,
  Tabs,
  Tab,
  Stack,
  Divider,
  Switch,
  FormControlLabel,
  AccordionSummary,
  AccordionDetails,
  Accordion,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SendIcon from '@mui/icons-material/Send';
import CodeIcon from '@mui/icons-material/Code';
import HttpIcon from '@mui/icons-material/Http';
import SecurityIcon from '@mui/icons-material/Security';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SaveIcon from '@mui/icons-material/Save';
import LoadIcon from '@mui/icons-material/CloudDownload';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import HistoryIcon from '@mui/icons-material/History';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import BugReportIcon from '@mui/icons-material/BugReport';
import Head from 'next/head';

export default function HttpBuilder({ name, description }) {
  const [currentTab, setCurrentTab] = useState(0);
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('https://api.example.com/users');
  const [headers, setHeaders] = useState([
    { id: 1, key: 'Content-Type', value: 'application/json', enabled: true },
    { id: 2, key: 'Accept', value: 'application/json', enabled: true }
  ]);
  const [queryParams, setQueryParams] = useState([
    { id: 1, key: 'limit', value: '10', enabled: true }
  ]);
  const [bodyType, setBodyType] = useState('json');
  const [body, setBody] = useState('{\n  "name": "John Doe",\n  "email": "john@example.com"\n}');
  const [authType, setAuthType] = useState('none');
  const [authToken, setAuthToken] = useState('');
  const [authUsername, setAuthUsername] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [savedRequests, setSavedRequests] = useState([]);
  const [requestName, setRequestName] = useState('');
  const [openSaveDialog, setOpenSaveDialog] = useState(false);
  const [history, setHistory] = useState([]);
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // HTTP methods
  const httpMethods = [
    { value: 'GET', color: 'success', description: 'Retrieve data' },
    { value: 'POST', color: 'primary', description: 'Create new resource' },
    { value: 'PUT', color: 'warning', description: 'Update entire resource' },
    { value: 'PATCH', color: 'info', description: 'Partial update' },
    { value: 'DELETE', color: 'error', description: 'Remove resource' },
    { value: 'HEAD', color: 'default', description: 'Get headers only' },
    { value: 'OPTIONS', color: 'default', description: 'Get allowed methods' }
  ];

  // Body types
  const bodyTypes = [
    { value: 'json', label: 'JSON', contentType: 'application/json' },
    { value: 'xml', label: 'XML', contentType: 'application/xml' },
    { value: 'form', label: 'Form Data', contentType: 'application/x-www-form-urlencoded' },
    { value: 'text', label: 'Plain Text', contentType: 'text/plain' },
    { value: 'raw', label: 'Raw', contentType: 'text/plain' }
  ];

  // Auth types
  const authTypes = [
    { value: 'none', label: 'No Auth' },
    { value: 'bearer', label: 'Bearer Token' },
    { value: 'basic', label: 'Basic Auth' },
    { value: 'apikey', label: 'API Key' }
  ];

  // Common API examples
  const examples = {
    'jsonplaceholder': {
      name: 'JSONPlaceholder - Get Posts',
      method: 'GET',
      url: 'https://jsonplaceholder.typicode.com/posts',
      headers: [{ id: Date.now(), key: 'Accept', value: 'application/json', enabled: true }],
      queryParams: [{ id: Date.now(), key: 'userId', value: '1', enabled: true }]
    },
    'reqres': {
      name: 'ReqRes - Create User',
      method: 'POST',
      url: 'https://reqres.in/api/users',
      headers: [{ id: Date.now(), key: 'Content-Type', value: 'application/json', enabled: true }],
      body: '{\n  "name": "morpheus",\n  "job": "leader"\n}'
    },
    'httpbin': {
      name: 'HTTPBin - Test Headers',
      method: 'GET',
      url: 'https://httpbin.org/headers',
      headers: [
        { id: Date.now(), key: 'User-Agent', value: 'DevTools/1.0', enabled: true },
        { id: Date.now() + 1, key: 'X-Custom-Header', value: 'test-value', enabled: true }
      ]
    }
  };

  // Initialize saved requests from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('http-requests');
    if (saved) {
      setSavedRequests(JSON.parse(saved));
    }
    const savedHistory = localStorage.getItem('http-history');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Build complete URL with query parameters
  const buildCompleteUrl = () => {
    const enabledParams = queryParams.filter(param => param.enabled && param.key && param.value);
    if (enabledParams.length === 0) return url;
    
    const urlObj = new URL(url);
    enabledParams.forEach(param => {
      urlObj.searchParams.set(param.key, param.value);
    });
    return urlObj.toString();
  };

  // Generate cURL command
  const generateCurl = () => {
    const completeUrl = buildCompleteUrl();
    let curl = `curl -X ${method} "${completeUrl}"`;
    
    // Add headers
    const enabledHeaders = headers.filter(header => header.enabled && header.key);
    enabledHeaders.forEach(header => {
      curl += ` \\\n  -H "${header.key}: ${header.value}"`;
    });
    
    // Add auth
    if (authType === 'bearer' && authToken) {
      curl += ` \\\n  -H "Authorization: Bearer ${authToken}"`;
    } else if (authType === 'basic' && authUsername && authPassword) {
      curl += ` \\\n  -u "${authUsername}:${authPassword}"`;
    }
    
    // Add body
    if (body && ['POST', 'PUT', 'PATCH'].includes(method)) {
      const escapedBody = body.replace(/"/g, '\\"').replace(/\n/g, '\\n');
      curl += ` \\\n  -d "${escapedBody}"`;
    }
    
    return curl;
  };

  // Generate JavaScript fetch code
  const generateJavaScript = () => {
    const completeUrl = buildCompleteUrl();
    const enabledHeaders = headers.filter(header => header.enabled && header.key);
    
    let js = `fetch('${completeUrl}', {\n  method: '${method}'`;
    
    if (enabledHeaders.length > 0 || authType !== 'none') {
      js += ',\n  headers: {\n';
      enabledHeaders.forEach(header => {
        js += `    '${header.key}': '${header.value}',\n`;
      });
      
      if (authType === 'bearer' && authToken) {
        js += `    'Authorization': 'Bearer ${authToken}',\n`;
      }
      
      js = js.replace(/,\n$/, '\n');
      js += '  }';
    }
    
    if (body && ['POST', 'PUT', 'PATCH'].includes(method)) {
      js += `,\n  body: ${JSON.stringify(body)}`;
    }
    
    js += '\n})\n.then(response => response.json())\n.then(data => console.log(data))\n.catch(error => console.error(\'Error:\', error));';
    
    return js;
  };

  // Generate Python requests code
  const generatePython = () => {
    const completeUrl = buildCompleteUrl();
    const enabledHeaders = headers.filter(header => header.enabled && header.key);
    
    let python = 'import requests\nimport json\n\n';
    python += `url = "${completeUrl}"\n`;
    
    if (enabledHeaders.length > 0 || authType !== 'none') {
      python += 'headers = {\n';
      enabledHeaders.forEach(header => {
        python += `    "${header.key}": "${header.value}",\n`;
      });
      
      if (authType === 'bearer' && authToken) {
        python += `    "Authorization": "Bearer ${authToken}",\n`;
      }
      
      python += '}\n\n';
    }
    
    if (body && ['POST', 'PUT', 'PATCH'].includes(method)) {
      python += `data = ${JSON.stringify(body, null, 2)}\n\n`;
    }
    
    python += `response = requests.${method.toLowerCase()}(url`;
    if (enabledHeaders.length > 0 || authType !== 'none') {
      python += ', headers=headers';
    }
    if (body && ['POST', 'PUT', 'PATCH'].includes(method)) {
      python += ', data=data';
    }
    if (authType === 'basic' && authUsername && authPassword) {
      python += `, auth=("${authUsername}", "${authPassword}")`;
    }
    python += ')\n\nprint(response.status_code)\nprint(response.json())';
    
    return python;
  };

  // Simulate API request (frontend-only)
  const sendRequest = async () => {
    setIsLoading(true);
    
    // Simulate request delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Create mock response
    const mockResponse = {
      status: method === 'POST' ? 201 : method === 'DELETE' ? 204 : 200,
      statusText: method === 'POST' ? 'Created' : method === 'DELETE' ? 'No Content' : 'OK',
      headers: {
        'Content-Type': 'application/json',
        'Date': new Date().toISOString(),
        'Server': 'DevTools Mock Server'
      },
      data: method === 'DELETE' ? null : {
        message: 'This is a simulated response',
        method: method,
        url: buildCompleteUrl(),
        timestamp: new Date().toISOString(),
        ...(method === 'POST' && { id: Math.floor(Math.random() * 1000) })
      },
      time: Math.floor(Math.random() * 500) + 100
    };
    
    setResponse(mockResponse);
    
    // Add to history
    const historyItem = {
      id: Date.now(),
      method,
      url: buildCompleteUrl(),
      status: mockResponse.status,
      time: mockResponse.time,
      timestamp: new Date().toISOString()
    };
    
    const newHistory = [historyItem, ...history.slice(0, 49)]; // Keep last 50
    setHistory(newHistory);
    localStorage.setItem('http-history', JSON.stringify(newHistory));
    
    setIsLoading(false);
    setSnackbarMessage('Request sent (simulated)');
    setOpenSnackbar(true);
  };

  // Format JSON
  const formatJson = (jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      return JSON.stringify(parsed, null, 2);
    } catch (error) {
      return jsonString;
    }
  };

  // Add header
  const addHeader = () => {
    setHeaders([...headers, { id: Date.now(), key: '', value: '', enabled: true }]);
  };

  // Update header
  const updateHeader = (id, field, value) => {
    setHeaders(headers.map(header => 
      header.id === id ? { ...header, [field]: value } : header
    ));
  };

  // Remove header
  const removeHeader = (id) => {
    setHeaders(headers.filter(header => header.id !== id));
  };

  // Add query parameter
  const addQueryParam = () => {
    setQueryParams([...queryParams, { id: Date.now(), key: '', value: '', enabled: true }]);
  };

  // Update query parameter
  const updateQueryParam = (id, field, value) => {
    setQueryParams(queryParams.map(param => 
      param.id === id ? { ...param, [field]: value } : param
    ));
  };

  // Remove query parameter
  const removeQueryParam = (id) => {
    setQueryParams(queryParams.filter(param => param.id !== id));
  };

  // Copy to clipboard
  const copyToClipboard = (text, message) => {
    navigator.clipboard.writeText(text).then(() => {
      setSnackbarMessage(message);
      setOpenSnackbar(true);
    });
  };

  // Save request
  const saveRequest = () => {
    if (!requestName.trim()) return;
    
    const request = {
      id: Date.now(),
      name: requestName,
      method,
      url,
      headers,
      queryParams,
      bodyType,
      body,
      authType,
      authToken,
      authUsername,
      authPassword,
      createdAt: new Date().toISOString()
    };
    
    const updated = [...savedRequests, request];
    setSavedRequests(updated);
    localStorage.setItem('http-requests', JSON.stringify(updated));
    setRequestName('');
    setOpenSaveDialog(false);
    setSnackbarMessage('Request saved successfully');
    setOpenSnackbar(true);
  };

  // Load request
  const loadRequest = (request) => {
    setMethod(request.method);
    setUrl(request.url);
    setHeaders(request.headers);
    setQueryParams(request.queryParams);
    setBodyType(request.bodyType);
    setBody(request.body);
    setAuthType(request.authType);
    setAuthToken(request.authToken);
    setAuthUsername(request.authUsername);
    setAuthPassword(request.authPassword);
    setSnackbarMessage(`Request "${request.name}" loaded`);
    setOpenSnackbar(true);
  };

  // Load example
  const loadExample = (exampleKey) => {
    const example = examples[exampleKey];
    setMethod(example.method);
    setUrl(example.url);
    setHeaders(example.headers || []);
    setQueryParams(example.queryParams || []);
    setBody(example.body || '');
    setSnackbarMessage(`Example "${example.name}" loaded`);
    setOpenSnackbar(true);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Head>
        <title>{name ? `${name} - Dev Tools` : 'HTTP Request Builder - Dev Tools'}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content="http request builder, api testing, curl generator, rest client, api tool" />
      </Head>
      
      <Typography variant="h4" gutterBottom>
        {name}
      </Typography>
      <Typography variant="body1" paragraph color="text.secondary">
        {description}
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        <strong>Professional HTTP Tool:</strong> Build, test, and format HTTP requests with visual interface.
        Generate cURL commands and export to multiple programming languages.
      </Alert>

      <Tabs value={currentTab} onChange={(e, newValue) => setCurrentTab(newValue)} sx={{ mb: 3 }}>
        <Tab icon={<HttpIcon />} label="Request" />
        <Tab icon={<SendIcon />} label="Response" />
        <Tab icon={<CodeIcon />} label="Generate Code" />
        <Tab icon={<HistoryIcon />} label="History" />
        <Tab icon={<SaveIcon />} label="Saved" />
      </Tabs>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          {currentTab === 0 && (
            <Paper sx={{ p: 3 }}>
              <Stack spacing={3}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <FormControl sx={{ minWidth: 120 }}>
                    <Select
                      value={method}
                      onChange={(e) => setMethod(e.target.value)}
                      size="small"
                    >
                      {httpMethods.map((m) => (
                        <MenuItem key={m.value} value={m.value}>
                          <Chip 
                            label={m.value} 
                            color={m.color} 
                            size="small" 
                            sx={{ minWidth: 60 }}
                          />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  
                  <TextField
                    label="URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    fullWidth
                    size="small"
                  />
                  
                  <Button
                    variant="contained"
                    startIcon={<SendIcon />}
                    onClick={sendRequest}
                    disabled={isLoading}
                    sx={{ minWidth: 100 }}
                  >
                    {isLoading ? 'Sending...' : 'Send'}
                  </Button>
                </Stack>

                <Accordion defaultExpanded>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Query Parameters ({queryParams.filter(p => p.enabled && p.key).length})</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Stack spacing={2}>
                      {queryParams.map((param) => (
                        <Stack key={param.id} direction="row" spacing={2} alignItems="center">
                          <Switch
                            checked={param.enabled}
                            onChange={(e) => updateQueryParam(param.id, 'enabled', e.target.checked)}
                            size="small"
                          />
                          <TextField
                            label="Key"
                            value={param.key}
                            onChange={(e) => updateQueryParam(param.id, 'key', e.target.value)}
                            size="small"
                            sx={{ flex: 1 }}
                          />
                          <TextField
                            label="Value"
                            value={param.value}
                            onChange={(e) => updateQueryParam(param.id, 'value', e.target.value)}
                            size="small"
                            sx={{ flex: 1 }}
                          />
                          <IconButton onClick={() => removeQueryParam(param.id)}>
                            <DeleteIcon />
                          </IconButton>
                        </Stack>
                      ))}
                      <Button
                        startIcon={<AddIcon />}
                        onClick={addQueryParam}
                        variant="outlined"
                        size="small"
                      >
                        Add Parameter
                      </Button>
                    </Stack>
                  </AccordionDetails>
                </Accordion>

                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Headers ({headers.filter(h => h.enabled && h.key).length})</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Stack spacing={2}>
                      {headers.map((header) => (
                        <Stack key={header.id} direction="row" spacing={2} alignItems="center">
                          <Switch
                            checked={header.enabled}
                            onChange={(e) => updateHeader(header.id, 'enabled', e.target.checked)}
                            size="small"
                          />
                          <TextField
                            label="Key"
                            value={header.key}
                            onChange={(e) => updateHeader(header.id, 'key', e.target.value)}
                            size="small"
                            sx={{ flex: 1 }}
                          />
                          <TextField
                            label="Value"
                            value={header.value}
                            onChange={(e) => updateHeader(header.id, 'value', e.target.value)}
                            size="small"
                            sx={{ flex: 1 }}
                          />
                          <IconButton onClick={() => removeHeader(header.id)}>
                            <DeleteIcon />
                          </IconButton>
                        </Stack>
                      ))}
                      <Button
                        startIcon={<AddIcon />}
                        onClick={addHeader}
                        variant="outlined"
                        size="small"
                      >
                        Add Header
                      </Button>
                    </Stack>
                  </AccordionDetails>
                </Accordion>

                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Authentication</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Stack spacing={2}>
                      <FormControl fullWidth>
                        <InputLabel>Auth Type</InputLabel>
                        <Select
                          value={authType}
                          onChange={(e) => setAuthType(e.target.value)}
                          label="Auth Type"
                        >
                          {authTypes.map((type) => (
                            <MenuItem key={type.value} value={type.value}>
                              {type.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>

                      {authType === 'bearer' && (
                        <TextField
                          label="Bearer Token"
                          value={authToken}
                          onChange={(e) => setAuthToken(e.target.value)}
                          fullWidth
                          type="password"
                        />
                      )}

                      {authType === 'basic' && (
                        <Stack direction="row" spacing={2}>
                          <TextField
                            label="Username"
                            value={authUsername}
                            onChange={(e) => setAuthUsername(e.target.value)}
                            fullWidth
                          />
                          <TextField
                            label="Password"
                            value={authPassword}
                            onChange={(e) => setAuthPassword(e.target.value)}
                            fullWidth
                            type="password"
                          />
                        </Stack>
                      )}

                      {authType === 'apikey' && (
                        <TextField
                          label="API Key"
                          value={authToken}
                          onChange={(e) => setAuthToken(e.target.value)}
                          fullWidth
                          type="password"
                        />
                      )}
                    </Stack>
                  </AccordionDetails>
                </Accordion>

                {['POST', 'PUT', 'PATCH'].includes(method) && (
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography>Request Body</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Stack spacing={2}>
                        <FormControl>
                          <InputLabel>Body Type</InputLabel>
                          <Select
                            value={bodyType}
                            onChange={(e) => setBodyType(e.target.value)}
                            label="Body Type"
                          >
                            {bodyTypes.map((type) => (
                              <MenuItem key={type.value} value={type.value}>
                                {type.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>

                        <TextField
                          multiline
                          rows={8}
                          value={body}
                          onChange={(e) => setBody(e.target.value)}
                          fullWidth
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              fontFamily: 'monospace',
                              fontSize: '0.875rem',
                            }
                          }}
                        />

                        {bodyType === 'json' && (
                          <Button
                            variant="outlined"
                            startIcon={<FormatAlignLeftIcon />}
                            onClick={() => setBody(formatJson(body))}
                            size="small"
                          >
                            Format JSON
                          </Button>
                        )}
                      </Stack>
                    </AccordionDetails>
                  </Accordion>
                )}
              </Stack>
            </Paper>
          )}

          {currentTab === 1 && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>Response</Typography>
              
              {!response ? (
                <Alert severity="info">
                  Send a request to see the response here. Note: This tool simulates API responses for demonstration.
                </Alert>
              ) : (
                <Stack spacing={3}>
                  <Card>
                    <CardContent>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Chip 
                          label={`${response.status} ${response.statusText}`} 
                          color={response.status < 300 ? 'success' : response.status < 400 ? 'warning' : 'error'}
                        />
                        <Typography variant="body2" color="text.secondary">
                          {response.time}ms
                        </Typography>
                      </Stack>
                    </CardContent>
                  </Card>

                  <Accordion defaultExpanded>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography>Response Headers</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <TableContainer>
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell>Header</TableCell>
                              <TableCell>Value</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {Object.entries(response.headers).map(([key, value]) => (
                              <TableRow key={key}>
                                <TableCell sx={{ fontFamily: 'monospace' }}>{key}</TableCell>
                                <TableCell sx={{ fontFamily: 'monospace' }}>{value}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </AccordionDetails>
                  </Accordion>

                  {response.data && (
                    <Accordion defaultExpanded>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>Response Body</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <TextField
                          multiline
                          rows={12}
                          value={JSON.stringify(response.data, null, 2)}
                          fullWidth
                          InputProps={{
                            readOnly: true,
                            sx: {
                              fontFamily: 'monospace',
                              fontSize: '0.875rem',
                            }
                          }}
                        />
                        <Button
                          variant="outlined"
                          startIcon={<ContentCopyIcon />}
                          onClick={() => copyToClipboard(JSON.stringify(response.data, null, 2), 'Response copied to clipboard')}
                          sx={{ mt: 2 }}
                          size="small"
                        >
                          Copy Response
                        </Button>
                      </AccordionDetails>
                    </Accordion>
                  )}
                </Stack>
              )}
            </Paper>
          )}

          {currentTab === 2 && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>Generate Code</Typography>
              
              <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>cURL</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <TextField
                    multiline
                    rows={6}
                    value={generateCurl()}
                    fullWidth
                    InputProps={{
                      readOnly: true,
                      sx: {
                        fontFamily: 'monospace',
                        fontSize: '0.875rem',
                      }
                    }}
                  />
                  <Button
                    variant="outlined"
                    startIcon={<ContentCopyIcon />}
                    onClick={() => copyToClipboard(generateCurl(), 'cURL command copied to clipboard')}
                    sx={{ mt: 2 }}
                    size="small"
                  >
                    Copy cURL
                  </Button>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>JavaScript (Fetch)</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <TextField
                    multiline
                    rows={8}
                    value={generateJavaScript()}
                    fullWidth
                    InputProps={{
                      readOnly: true,
                      sx: {
                        fontFamily: 'monospace',
                        fontSize: '0.875rem',
                      }
                    }}
                  />
                  <Button
                    variant="outlined"
                    startIcon={<ContentCopyIcon />}
                    onClick={() => copyToClipboard(generateJavaScript(), 'JavaScript code copied to clipboard')}
                    sx={{ mt: 2 }}
                    size="small"
                  >
                    Copy JavaScript
                  </Button>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>Python (Requests)</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <TextField
                    multiline
                    rows={10}
                    value={generatePython()}
                    fullWidth
                    InputProps={{
                      readOnly: true,
                      sx: {
                        fontFamily: 'monospace',
                        fontSize: '0.875rem',
                      }
                    }}
                  />
                  <Button
                    variant="outlined"
                    startIcon={<ContentCopyIcon />}
                    onClick={() => copyToClipboard(generatePython(), 'Python code copied to clipboard')}
                    sx={{ mt: 2 }}
                    size="small"
                  >
                    Copy Python
                  </Button>
                </AccordionDetails>
              </Accordion>
            </Paper>
          )}

          {currentTab === 3 && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>Request History</Typography>
              
              {history.length === 0 ? (
                <Alert severity="info">
                  No requests sent yet. Send some requests to see them in your history.
                </Alert>
              ) : (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Method</TableCell>
                        <TableCell>URL</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Time</TableCell>
                        <TableCell>Timestamp</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {history.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <Chip 
                              label={item.method} 
                              size="small"
                              color={httpMethods.find(m => m.value === item.method)?.color || 'default'}
                            />
                          </TableCell>
                          <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
                            {item.url}
                          </TableCell>
                          <TableCell>
                            <Chip 
                              label={item.status} 
                              size="small"
                              color={item.status < 300 ? 'success' : item.status < 400 ? 'warning' : 'error'}
                            />
                          </TableCell>
                          <TableCell>{item.time}ms</TableCell>
                          <TableCell>{new Date(item.timestamp).toLocaleString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Paper>
          )}

          {currentTab === 4 && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>Saved Requests</Typography>
              
              <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                <Button
                  variant="contained"
                  startIcon={<SaveIcon />}
                  onClick={() => setOpenSaveDialog(true)}
                >
                  Save Current Request
                </Button>
                
                <FormControl sx={{ minWidth: 200 }}>
                  <InputLabel>Load Example</InputLabel>
                  <Select
                    label="Load Example"
                    onChange={(e) => loadExample(e.target.value)}
                    value=""
                  >
                    {Object.entries(examples).map(([key, example]) => (
                      <MenuItem key={key} value={key}>{example.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>

              {savedRequests.length === 0 ? (
                <Alert severity="info">
                  No saved requests yet. Save your current request configuration to create reusable requests.
                </Alert>
              ) : (
                <Grid container spacing={2}>
                  {savedRequests.map((request) => (
                    <Grid size={{ xs: 12, md: 6 }} key={request.id}>
                      <Card>
                        <CardContent>
                          <Typography variant="h6" gutterBottom>{request.name}</Typography>
                          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                            <Chip 
                              label={request.method} 
                              size="small"
                              color={httpMethods.find(m => m.value === request.method)?.color || 'default'}
                            />
                            <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
                              {request.url}
                            </Typography>
                          </Stack>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            Created: {new Date(request.createdAt).toLocaleDateString()}
                          </Typography>
                          <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                            <Button
                              size="small"
                              onClick={() => loadRequest(request)}
                            >
                              Load
                            </Button>
                            <IconButton
                              size="small"
                              onClick={() => {
                                const updated = savedRequests.filter(r => r.id !== request.id);
                                setSavedRequests(updated);
                                localStorage.setItem('http-requests', JSON.stringify(updated));
                              }}
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
            <Typography variant="h6" gutterBottom>Request Summary</Typography>
            <Stack spacing={1}>
              <Typography variant="body2">
                <strong>Method:</strong> {method}
              </Typography>
              <Typography variant="body2">
                <strong>URL:</strong> {buildCompleteUrl()}
              </Typography>
              <Typography variant="body2">
                <strong>Headers:</strong> {headers.filter(h => h.enabled && h.key).length}
              </Typography>
              <Typography variant="body2">
                <strong>Query Params:</strong> {queryParams.filter(p => p.enabled && p.key).length}
              </Typography>
              <Typography variant="body2">
                <strong>Auth:</strong> {authTypes.find(a => a.value === authType)?.label}
              </Typography>
              <Typography variant="body2">
                <strong>Body Type:</strong> {bodyTypes.find(b => b.value === bodyType)?.label}
              </Typography>
            </Stack>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Quick Actions</Typography>
            <Stack spacing={2}>
              <Button
                variant="outlined"
                startIcon={<SendIcon />}
                onClick={sendRequest}
                disabled={isLoading}
                fullWidth
              >
                Send Request
              </Button>
              <Button
                variant="outlined"
                startIcon={<ContentCopyIcon />}
                onClick={() => copyToClipboard(generateCurl(), 'cURL copied to clipboard')}
                fullWidth
              >
                Copy as cURL
              </Button>
              <Button
                variant="outlined"
                startIcon={<SaveIcon />}
                onClick={() => setOpenSaveDialog(true)}
                fullWidth
              >
                Save Request
              </Button>
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      {/* Save Request Dialog */}
      <Dialog open={openSaveDialog} onClose={() => setOpenSaveDialog(false)}>
        <DialogTitle>Save HTTP Request</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Request Name"
            fullWidth
            value={requestName}
            onChange={(e) => setRequestName(e.target.value)}
            placeholder="e.g., Get User Profile, Create Post"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenSaveDialog(false)}>Cancel</Button>
          <Button onClick={saveRequest} variant="contained">Save</Button>
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

