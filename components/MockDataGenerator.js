import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Typography,
  TextField,
  Paper,
  Grid,
  IconButton,
  Snackbar,
  Card,
  CardContent,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  ToggleButtonGroup,
  ToggleButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  Switch,
  FormControlLabel
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GeneratingTokensIcon from '@mui/icons-material/GeneratingTokens';
import DownloadIcon from '@mui/icons-material/Download';
import SchemaIcon from '@mui/icons-material/Schema';
import DataObjectIcon from '@mui/icons-material/DataObject';
import Head from 'next/head';

export default function MockDataGenerator({ name, description }) {
  const [schema, setSchema] = useState([
    { name: 'id', type: 'uuid', options: {} },
    { name: 'firstName', type: 'firstName', options: {} },
    { name: 'lastName', type: 'lastName', options: {} },
    { name: 'email', type: 'email', options: {} },
    { name: 'phone', type: 'phone', options: {} }
  ]);
  const [recordCount, setRecordCount] = useState(10);
  const [outputFormat, setOutputFormat] = useState('json');
  const [generatedData, setGeneratedData] = useState([]);
  const [openFieldDialog, setOpenFieldDialog] = useState(false);
  const [newField, setNewField] = useState({ name: '', type: 'string', options: {} });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const fieldTypes = {
    // Basic Types
    string: { name: 'String', generator: () => generateRandomString() },
    number: { name: 'Number', generator: (opts) => generateNumber(opts) },
    boolean: { name: 'Boolean', generator: () => Math.random() > 0.5 },
    date: { name: 'Date', generator: (opts) => generateDate(opts) },
    uuid: { name: 'UUID', generator: () => generateUUID() },
    
    // Personal Info
    firstName: { name: 'First Name', generator: () => generateFirstName() },
    lastName: { name: 'Last Name', generator: () => generateLastName() },
    fullName: { name: 'Full Name', generator: () => `${generateFirstName()} ${generateLastName()}` },
    email: { name: 'Email', generator: () => generateEmail() },
    phone: { name: 'Phone', generator: () => generatePhone() },
    age: { name: 'Age', generator: () => Math.floor(Math.random() * 80) + 18 },
    
    // Address
    address: { name: 'Street Address', generator: () => generateAddress() },
    city: { name: 'City', generator: () => generateCity() },
    state: { name: 'State', generator: () => generateState() },
    country: { name: 'Country', generator: () => generateCountry() },
    zipCode: { name: 'Zip Code', generator: () => generateZipCode() },
    
    // Business
    company: { name: 'Company Name', generator: () => generateCompany() },
    jobTitle: { name: 'Job Title', generator: () => generateJobTitle() },
    department: { name: 'Department', generator: () => generateDepartment() },
    salary: { name: 'Salary', generator: () => Math.floor(Math.random() * 150000) + 30000 },
    
    // Internet
    url: { name: 'URL', generator: () => generateURL() },
    username: { name: 'Username', generator: () => generateUsername() },
    password: { name: 'Password', generator: () => generatePassword() },
    ipAddress: { name: 'IP Address', generator: () => generateIPAddress() },
    
    // Lorem/Text
    sentence: { name: 'Sentence', generator: () => generateSentence() },
    paragraph: { name: 'Paragraph', generator: () => generateParagraph() },
    
    // Custom Lists
    customList: { name: 'Custom List', generator: (opts) => generateFromList(opts.list || []) }
  };

  // Data generation functions
  const generateRandomString = (length = 8) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const generateNumber = (opts = {}) => {
    const min = opts.min || 1;
    const max = opts.max || 1000;
    const decimals = opts.decimals || 0;
    const num = Math.random() * (max - min) + min;
    return decimals > 0 ? parseFloat(num.toFixed(decimals)) : Math.floor(num);
  };

  const generateDate = (opts = {}) => {
    const start = opts.start ? new Date(opts.start) : new Date(2020, 0, 1);
    const end = opts.end ? new Date(opts.end) : new Date();
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date.toISOString().split('T')[0];
  };

  const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  const firstNames = ['James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda', 'William', 'Elizabeth', 'David', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica', 'Thomas', 'Sarah', 'Christopher', 'Karen', 'Daniel', 'Nancy', 'Matthew', 'Lisa', 'Anthony', 'Betty', 'Mark', 'Helen', 'Donald', 'Sandra'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson'];
  
  const generateFirstName = () => firstNames[Math.floor(Math.random() * firstNames.length)];
  const generateLastName = () => lastNames[Math.floor(Math.random() * lastNames.length)];

  const generateEmail = () => {
    const domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'company.com'];
    const firstName = generateFirstName().toLowerCase();
    const lastName = generateLastName().toLowerCase();
    const domain = domains[Math.floor(Math.random() * domains.length)];
    return `${firstName}.${lastName}@${domain}`;
  };

  const generatePhone = () => {
    const area = Math.floor(Math.random() * 800) + 200;
    const exchange = Math.floor(Math.random() * 800) + 200;
    const number = Math.floor(Math.random() * 9000) + 1000;
    return `(${area}) ${exchange}-${number}`;
  };

  const generateAddress = () => {
    const numbers = Math.floor(Math.random() * 9999) + 1;
    const streets = ['Main St', 'Oak Ave', 'Pine St', 'Maple Ave', 'Cedar St', 'Elm St', 'Washington St', 'Park Ave', '1st St', '2nd St'];
    return `${numbers} ${streets[Math.floor(Math.random() * streets.length)]}`;
  };

  const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'];
  const generateCity = () => cities[Math.floor(Math.random() * cities.length)];

  const states = ['CA', 'TX', 'FL', 'NY', 'PA', 'IL', 'OH', 'GA', 'NC', 'MI'];
  const generateState = () => states[Math.floor(Math.random() * states.length)];

  const countries = ['United States', 'Canada', 'United Kingdom', 'Germany', 'France', 'Australia', 'Japan', 'Brazil', 'India', 'China'];
  const generateCountry = () => countries[Math.floor(Math.random() * countries.length)];

  const generateZipCode = () => String(Math.floor(Math.random() * 90000) + 10000);

  const companies = ['Tech Corp', 'Global Industries', 'Innovation Labs', 'Future Systems', 'Digital Solutions', 'Enterprise Group', 'Advanced Technologies', 'Modern Industries', 'Smart Solutions', 'Next Gen Corp'];
  const generateCompany = () => companies[Math.floor(Math.random() * companies.length)];

  const jobTitles = ['Software Engineer', 'Product Manager', 'Data Analyst', 'Marketing Manager', 'Sales Representative', 'Project Manager', 'Designer', 'Developer', 'Consultant', 'Analyst'];
  const generateJobTitle = () => jobTitles[Math.floor(Math.random() * jobTitles.length)];

  const departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations', 'Product', 'Design', 'Customer Success', 'Legal'];
  const generateDepartment = () => departments[Math.floor(Math.random() * departments.length)];

  const generateURL = () => {
    const domains = ['example.com', 'test.org', 'sample.net', 'demo.io', 'placeholder.co'];
    const protocols = ['https://', 'http://'];
    const subdomains = ['www', 'api', 'app', 'admin', ''];
    
    const protocol = protocols[Math.floor(Math.random() * protocols.length)];
    const subdomain = subdomains[Math.floor(Math.random() * subdomains.length)];
    const domain = domains[Math.floor(Math.random() * domains.length)];
    
    return `${protocol}${subdomain ? subdomain + '.' : ''}${domain}`;
  };

  const generateUsername = () => {
    const adjectives = ['cool', 'super', 'mega', 'ultra', 'pro', 'elite', 'master', 'ninja'];
    const nouns = ['coder', 'gamer', 'user', 'dev', 'admin', 'player', 'creator', 'builder'];
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    const number = Math.floor(Math.random() * 999) + 1;
    return `${adjective}${noun}${number}`;
  };

  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };

  const generateIPAddress = () => {
    return Array.from({length: 4}, () => Math.floor(Math.random() * 256)).join('.');
  };

  const loremWords = ['lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna', 'aliqua'];
  
  const generateSentence = () => {
    const length = Math.floor(Math.random() * 10) + 5;
    let sentence = [];
    for (let i = 0; i < length; i++) {
      sentence.push(loremWords[Math.floor(Math.random() * loremWords.length)]);
    }
    return sentence.join(' ').charAt(0).toUpperCase() + sentence.join(' ').slice(1) + '.';
  };

  const generateParagraph = () => {
    const sentences = Math.floor(Math.random() * 4) + 3;
    let paragraph = [];
    for (let i = 0; i < sentences; i++) {
      paragraph.push(generateSentence());
    }
    return paragraph.join(' ');
  };

  const generateFromList = (list) => {
    return list.length > 0 ? list[Math.floor(Math.random() * list.length)] : '';
  };

  const generateData = () => {
    const data = [];
    for (let i = 0; i < recordCount; i++) {
      const record = {};
      schema.forEach(field => {
        const generator = fieldTypes[field.type]?.generator;
        if (generator) {
          record[field.name] = generator(field.options);
        } else {
          record[field.name] = null;
        }
      });
      data.push(record);
    }
    setGeneratedData(data);
    setSnackbarMessage(`Generated ${data.length} records successfully!`);
    setOpenSnackbar(true);
  };

  const addField = () => {
    if (newField.name && newField.type) {
      setSchema([...schema, { ...newField, options: {} }]);
      setNewField({ name: '', type: 'string', options: {} });
      setOpenFieldDialog(false);
      setSnackbarMessage('Field added successfully!');
      setOpenSnackbar(true);
    }
  };

  const removeField = (index) => {
    const newSchema = schema.filter((_, i) => i !== index);
    setSchema(newSchema);
    setSnackbarMessage('Field removed!');
    setOpenSnackbar(true);
  };

  const formatOutput = (data, format) => {
    switch (format) {
      case 'json':
        return JSON.stringify(data, null, 2);
      case 'csv':
        if (data.length === 0) return '';
        const headers = Object.keys(data[0]).join(',');
        const rows = data.map(row => Object.values(row).map(val => `"${val}"`).join(',')).join('\n');
        return `${headers}\n${rows}`;
      case 'sql':
        if (data.length === 0) return '';
        const tableName = 'generated_data';
        const columns = Object.keys(data[0]);
        const createTable = `CREATE TABLE ${tableName} (\n  ${columns.map(col => `${col} VARCHAR(255)`).join(',\n  ')}\n);\n\n`;
        const inserts = data.map(row => {
          const values = Object.values(row).map(val => `'${String(val).replace(/'/g, "''")}'`).join(', ');
          return `INSERT INTO ${tableName} (${columns.join(', ')}) VALUES (${values});`;
        }).join('\n');
        return createTable + inserts;
      default:
        return JSON.stringify(data, null, 2);
    }
  };

  const outputData = useMemo(() => formatOutput(generatedData, outputFormat), [generatedData, outputFormat]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setSnackbarMessage('Copied to clipboard!');
      setOpenSnackbar(true);
    });
  };

  const downloadData = () => {
    const blob = new Blob([outputData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mock-data.${outputFormat}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    setSnackbarMessage(`${outputFormat.toUpperCase()} file downloaded!`);
    setOpenSnackbar(true);
  };

  const loadPreset = (presetName) => {
    const presets = {
      users: [
        { name: 'id', type: 'uuid', options: {} },
        { name: 'firstName', type: 'firstName', options: {} },
        { name: 'lastName', type: 'lastName', options: {} },
        { name: 'email', type: 'email', options: {} },
        { name: 'phone', type: 'phone', options: {} },
        { name: 'age', type: 'age', options: {} },
        { name: 'createdAt', type: 'date', options: {} }
      ],
      products: [
        { name: 'id', type: 'uuid', options: {} },
        { name: 'name', type: 'string', options: {} },
        { name: 'price', type: 'number', options: { min: 10, max: 1000, decimals: 2 } },
        { name: 'category', type: 'customList', options: { list: ['Electronics', 'Clothing', 'Books', 'Home', 'Sports'] } },
        { name: 'inStock', type: 'boolean', options: {} },
        { name: 'description', type: 'sentence', options: {} }
      ],
      employees: [
        { name: 'id', type: 'uuid', options: {} },
        { name: 'firstName', type: 'firstName', options: {} },
        { name: 'lastName', type: 'lastName', options: {} },
        { name: 'email', type: 'email', options: {} },
        { name: 'jobTitle', type: 'jobTitle', options: {} },
        { name: 'department', type: 'department', options: {} },
        { name: 'salary', type: 'salary', options: {} },
        { name: 'hireDate', type: 'date', options: {} }
      ]
    };

    if (presets[presetName]) {
      setSchema(presets[presetName]);
      setSnackbarMessage(`${presetName} preset loaded!`);
      setOpenSnackbar(true);
    }
  };

  const statistics = {
    fields: schema.length,
    records: generatedData.length,
    outputSize: outputData.length,
    dataTypes: [...new Set(schema.map(field => field.type))].length
  };

  return (
    <Box sx={{ p: 2 }}>
      <Head>
        <title>{name} | AI Developer Tools</title>
        <meta name="description" content={description} />
      </Head>

      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
        <GeneratingTokensIcon sx={{ mr: 2, verticalAlign: 'middle' }} />
        AI-Powered Mock Data Generator
      </Typography>

      <Grid container spacing={3} sx={{ alignItems: 'stretch' }}>
        {/* Schema Configuration */}
        <Grid size={{ xs: 12, md: 4 }} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Paper elevation={2} sx={{ p: 3, flex: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                <SchemaIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Schema
              </Typography>
              <Button
                size="small"
                startIcon={<AddIcon />}
                onClick={() => setOpenFieldDialog(true)}
              >
                Add Field
              </Button>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" gutterBottom>Presets:</Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Button size="small" variant="outlined" onClick={() => loadPreset('users')}>
                  Users
                </Button>
                <Button size="small" variant="outlined" onClick={() => loadPreset('products')}>
                  Products
                </Button>
                <Button size="small" variant="outlined" onClick={() => loadPreset('employees')}>
                  Employees
                </Button>
              </Box>
            </Box>

            <List dense>
              {schema.map((field, index) => (
                <ListItem
                  key={index}
                  secondaryAction={
                    <IconButton edge="end" onClick={() => removeField(index)}>
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemText
                    primary={field.name}
                    secondary={fieldTypes[field.type]?.name || field.type}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>

          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Generation Settings
            </Typography>
            <TextField
              label="Number of Records"
              type="number"
              value={recordCount}
              onChange={(e) => setRecordCount(Math.max(1, parseInt(e.target.value) || 1))}
              fullWidth
              sx={{ mb: 2 }}
              inputProps={{ min: 1, max: 1000 }}
            />
            
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Output Format</InputLabel>
              <Select
                value={outputFormat}
                onChange={(e) => setOutputFormat(e.target.value)}
              >
                <MenuItem value="json">JSON</MenuItem>
                <MenuItem value="csv">CSV</MenuItem>
                <MenuItem value="sql">SQL</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={generateData}
              startIcon={<GeneratingTokensIcon />}
            >
              Generate Data
            </Button>
          </Paper>
        </Grid>

        {/* Output */}
        <Grid size={{ xs: 12, md: 8 }} sx={{ display: 'flex' }}>
          <Paper elevation={2} sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6">
                <DataObjectIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Generated Data ({outputFormat.toUpperCase()})
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button size="small" onClick={() => copyToClipboard(outputData)} disabled={!outputData}>
                  <ContentCopyIcon />
                </Button>
                <Button size="small" onClick={downloadData} disabled={!outputData}>
                  <DownloadIcon />
                </Button>
              </Box>
            </Box>
            
            {outputData ? (
              <TextField
                multiline
                fullWidth
                value={outputData}
                variant="outlined"
                InputProps={{ readOnly: true }}
                sx={{
                  flex: 1,
                  display: 'flex',
                  '& .MuiOutlinedInput-root': {
                    flex: 1,
                    height: 'auto',
                    alignItems: 'flex-start',
                    overflow: 'hidden',
                    '& fieldset': { border: 'none' },
                    '& textarea': {
                      fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
                      fontSize: '12px',
                      verticalAlign: 'top',
                      overflow: 'auto !important',
                      resize: 'none',
                      height: '100% !important',
                      padding: '12px',
                      border: 'none',
                      outline: 'none'
                    }
                  }
                }}
              />
            ) : (
              <Box sx={{ p: 4, textAlign: 'center', color: 'text.secondary', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <GeneratingTokensIcon sx={{ fontSize: 64, mb: 2 }} />
                <Typography variant="h6">No Data Generated</Typography>
                <Typography variant="body2">
                  Configure your schema and click "Generate Data" to create mock data
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Statistics */}
        <Grid size={{ xs: 12 }}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Statistics
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 6, sm: 3 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="primary">
                    {statistics.fields}
                  </Typography>
                  <Typography variant="body2">Fields</Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 6, sm: 3 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="success.main">
                    {statistics.records}
                  </Typography>
                  <Typography variant="body2">Records</Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 6, sm: 3 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="warning.main">
                    {statistics.dataTypes}
                  </Typography>
                  <Typography variant="body2">Data Types</Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 6, sm: 3 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="error.main">
                    {Math.round(statistics.outputSize / 1024)}KB
                  </Typography>
                  <Typography variant="body2">Output Size</Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      {/* Add Field Dialog */}
      <Dialog open={openFieldDialog} onClose={() => setOpenFieldDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Field</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12 }}>
              <TextField
                label="Field Name"
                value={newField.name}
                onChange={(e) => setNewField({ ...newField, name: e.target.value })}
                fullWidth
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormControl fullWidth>
                <InputLabel>Data Type</InputLabel>
                <Select
                  value={newField.type}
                  onChange={(e) => setNewField({ ...newField, type: e.target.value })}
                >
                  {Object.entries(fieldTypes).map(([key, type]) => (
                    <MenuItem key={key} value={key}>{type.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenFieldDialog(false)}>Cancel</Button>
          <Button onClick={addField} variant="contained">Add Field</Button>
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
