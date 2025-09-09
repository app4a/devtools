import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  TextField,
  Typography,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Alert,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ListItemButton,
  Tabs,
  Tab,
  IconButton,
  Snackbar,
  FormControlLabel,
  Switch,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DownloadIcon from '@mui/icons-material/Download';
import ScheduleIcon from '@mui/icons-material/Schedule';
import InfoIcon from '@mui/icons-material/Info';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ExampleIcon from '@mui/icons-material/Assignment';
import TimerIcon from '@mui/icons-material/Timer';
import cronstrue from 'cronstrue';
import { parseExpression } from 'cron-parser';

import Head from 'next/head';

export default function CronParser({ name, description }) {
  const [cronExpression, setCronExpression] = useState('0 9 * * 1-5'); // Weekdays at 9 AM
  const [humanReadable, setHumanReadable] = useState('');
  const [nextDates, setNextDates] = useState([]);
  const [error, setError] = useState(null);
  const [timezone, setTimezone] = useState('UTC');
  const [currentTab, setCurrentTab] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [showSeconds, setShowSeconds] = useState(false);
  const [maxRuns, setMaxRuns] = useState(10);

  // Cron builder state
  const [builderValues, setBuilderValues] = useState({
    minute: '0',
    hour: '9',
    day: '*',
    month: '*',
    weekday: '1-5'
  });

  useEffect(() => {
    try {
      setHumanReadable(cronstrue.toString(cronExpression, { verbose: true }));
      setError(null);

      const options = {
        tz: timezone
      };
      
      const interval = parseExpression(cronExpression, options);
      const dates = [];
      
      for (let i = 0; i < maxRuns; i++) {
        try {
          const nextDate = interval.next().toDate();
          dates.push({
            date: nextDate,
            formatted: nextDate.toLocaleString('en-US', {
              month: '2-digit',
              day: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              second: showSeconds ? '2-digit' : undefined,
              hour12: true,
              timeZone: timezone
            }),
            iso: nextDate.toISOString(),
            relative: getRelativeTime(nextDate)
          });
        } catch (e) {
          break;
        }
      }
      setNextDates(dates);

    } catch (err) {
      setHumanReadable('');
      setNextDates([]);
      setError(`'${cronExpression}' is not a valid cron expression.`);
    }
  }, [cronExpression, timezone, showSeconds, maxRuns]);

  const getRelativeTime = (date) => {
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days > 0) return `in ${days} day${days > 1 ? 's' : ''}`;
    if (hours > 0) return `in ${hours} hour${hours > 1 ? 's' : ''}`;
    if (minutes > 0) return `in ${minutes} minute${minutes > 1 ? 's' : ''}`;
    return 'in less than a minute';
  };

  const handleBuilderChange = (field, value) => {
    const newValues = { ...builderValues, [field]: value };
    setBuilderValues(newValues);
    
    // Construct cron expression from builder
    const parts = [
      newValues.minute,
      newValues.hour,
      newValues.day,
      newValues.month,
      newValues.weekday
    ];
    setCronExpression(parts.join(' '));
  };

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setOpenSnackbar(true);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const downloadSchedule = () => {
    const content = `Cron Expression: ${cronExpression}\n` +
                   `Description: ${humanReadable}\n` +
                   `Timezone: ${timezone}\n\n` +
                   `Next ${nextDates.length} runs:\n` +
                   nextDates.map((date, i) => 
                     `${i + 1}. ${date.formatted} (${date.relative})`
                   ).join('\n');
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cron-schedule-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const cronExamples = [
    {
      category: 'Common Schedules',
      examples: [
        { expression: '0 0 * * *', description: 'Daily at midnight' },
        { expression: '0 9 * * 1-5', description: 'Weekdays at 9 AM' },
        { expression: '0 */2 * * *', description: 'Every 2 hours' },
        { expression: '*/15 * * * *', description: 'Every 15 minutes' },
        { expression: '0 0 1 * *', description: 'First day of every month' },
        { expression: '0 0 * * 0', description: 'Every Sunday at midnight' }
      ]
    },
    {
      category: 'Business Hours',
      examples: [
        { expression: '0 9-17 * * 1-5', description: 'Every hour during business hours' },
        { expression: '0 12 * * 1-5', description: 'Weekdays at noon' },
        { expression: '30 8 * * 1-5', description: 'Weekdays at 8:30 AM' },
        { expression: '0 18 * * 5', description: 'Fridays at 6 PM' }
      ]
    },
    {
      category: 'Maintenance Windows',
      examples: [
        { expression: '0 2 * * 0', description: 'Sundays at 2 AM' },
        { expression: '0 1 1 */3 *', description: 'Quarterly at 1 AM on the 1st' },
        { expression: '0 3 */7 * *', description: 'Weekly at 3 AM' },
        { expression: '0 0 1,15 * *', description: 'Twice monthly (1st and 15th)' }
      ]
    },
    {
      category: 'High Frequency',
      examples: [
        { expression: '*/5 * * * *', description: 'Every 5 minutes' },
        { expression: '*/30 * * * *', description: 'Every 30 minutes' },
        { expression: '0,30 * * * *', description: 'Twice per hour (0 and 30 minutes)' },
        { expression: '*/10 9-17 * * 1-5', description: 'Every 10 minutes during business hours' }
      ]
    }
  ];

  const timezones = [
    'UTC', 'America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles',
    'Europe/London', 'Europe/Paris', 'Europe/Berlin', 'Asia/Tokyo', 'Asia/Shanghai',
    'Asia/Kolkata', 'Australia/Sydney', 'Pacific/Auckland'
  ];

  const cronFields = [
    { name: 'Minute', range: '0-59', examples: '0, 15, 30, 45, */5' },
    { name: 'Hour', range: '0-23', examples: '0, 9, 12, 18, */2' },
    { name: 'Day of Month', range: '1-31', examples: '1, 15, 31, */7' },
    { name: 'Month', range: '1-12', examples: '1, 6, 12, */3' },
    { name: 'Day of Week', range: '0-7', examples: '0, 1, 5, 1-5' }
  ];

  return (
    <Box sx={{ p: 2 }}>
      <Head>
        <title>{name ? `${name} - Dev Tools` : 'Advanced Cron Parser - Dev Tools'}</title>
        <meta name="description" content={description} />
      </Head>
      
      <Typography variant="h4" gutterBottom>
        {name}
      </Typography>
      <Typography variant="body1" paragraph color="text.secondary">
        {description}
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        <strong>Professional Cron Parser:</strong> Parse, validate, and visualize cron expressions with 
        timezone support, visual builder, and comprehensive examples.
      </Alert>

      <Tabs value={currentTab} onChange={(e, newValue) => setCurrentTab(newValue)} sx={{ mb: 3 }}>
        <Tab label="Cron Parser" />
        <Tab label="Visual Builder" />
        <Tab label="Examples" />
      </Tabs>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          {currentTab === 0 && (
            <>
              {/* Cron Parser */}
              <Paper sx={{ p: 3, mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6">Cron Expression</Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton
                      onClick={() => handleCopy(cronExpression)}
                      size="small"
                      title="Copy expression"
                    >
                      <ContentCopyIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
                
                <TextField
                  data-testid="cron-expression-input"
                  label="Cron Expression (5 fields: minute hour day month weekday)"
                  fullWidth
                  value={cronExpression}
                  onChange={(e) => setCronExpression(e.target.value)}
                  variant="outlined"
                  error={Boolean(error)}
                  helperText={error}
                  sx={{ mb: 2 }}
                  placeholder="0 9 * * 1-5"
                />

                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControl fullWidth>
                      <InputLabel>Timezone</InputLabel>
                      <Select
                        value={timezone}
                        onChange={(e) => setTimezone(e.target.value)}
                        label="Timezone"
                      >
                        {timezones.map(tz => (
                          <MenuItem key={tz} value={tz}>{tz}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControl fullWidth>
                      <InputLabel>Max Runs to Show</InputLabel>
                      <Select
                        value={maxRuns}
                        onChange={(e) => setMaxRuns(e.target.value)}
                        label="Max Runs to Show"
                      >
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>

                <FormControlLabel
                  control={
                    <Switch
                      checked={showSeconds}
                      onChange={(e) => setShowSeconds(e.target.checked)}
                    />
                  }
                  label="Show seconds in dates"
                />
              </Paper>

              {/* Human Readable */}
              <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  <ScheduleIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                  Human Readable
                </Typography>
                <Alert 
                  severity={error ? 'error' : 'success'} 
                  sx={{ mb: 2 }}
                  action={
                    !error && (
                      <IconButton
                        onClick={() => handleCopy(humanReadable)}
                        size="small"
                        color="inherit"
                      >
                        <ContentCopyIcon fontSize="small" />
                      </IconButton>
                    )
                  }
                >
                  <Typography variant="body1">
                    {error || humanReadable || 'Enter a valid cron expression'}
                  </Typography>
                </Alert>
                
                {!error && cronExpression && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Expression Breakdown:
                    </Typography>
                    <Grid container spacing={1}>
                      {cronExpression.split(' ').map((part, index) => (
                        <Grid size={{ xs: 'auto' }} key={index}>
                          <Chip 
                            label={`${cronFields[index]?.name}: ${part}`}
                            size="small"
                            variant="outlined"
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                )}
              </Paper>
            </>
          )}

          {currentTab === 1 && (
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Visual Cron Builder
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Build your cron expression visually by selecting values for each field.
              </Typography>
              
              <Grid container spacing={3}>
                {[
                  { field: 'minute', label: 'Minute (0-59)', placeholder: '0' },
                  { field: 'hour', label: 'Hour (0-23)', placeholder: '9' },
                  { field: 'day', label: 'Day of Month (1-31)', placeholder: '*' },
                  { field: 'month', label: 'Month (1-12)', placeholder: '*' },
                  { field: 'weekday', label: 'Day of Week (0-7)', placeholder: '1-5' }
                ].map((field) => (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={field.field}>
                    <TextField
                      label={field.label}
                      fullWidth
                      value={builderValues[field.field]}
                      onChange={(e) => handleBuilderChange(field.field, e.target.value)}
                      placeholder={field.placeholder}
                      helperText="Use * for any, numbers, ranges (1-5), lists (1,3,5), or step values (*/2)"
                    />
                  </Grid>
                ))}
              </Grid>
              
              <Alert severity="info" sx={{ mt: 2 }}>
                Generated Expression: <strong>{cronExpression}</strong>
              </Alert>
            </Paper>
          )}

          {currentTab === 2 && (
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                <ExampleIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                Cron Expression Examples
              </Typography>
              
              {cronExamples.map((category, categoryIndex) => (
                <Accordion key={categoryIndex}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle1">{category.category}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <List dense>
                      {category.examples.map((example, index) => (
                        <ListItem key={index} disablePadding>
                          <ListItemButton
                            onClick={() => {
                              setCronExpression(example.expression);
                              setCurrentTab(0);
                            }}
                          >
                            <ListItemText
                              primary={
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                  <Chip 
                                    label={example.expression}
                                    size="small"
                                    variant="outlined"
                                    sx={{ fontFamily: 'monospace' }}
                                  />
                                  <Typography variant="body2">
                                    {example.description}
                                  </Typography>
                                </Box>
                              }
                            />
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Paper>
          )}

          {/* Schedule Preview */}
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                <TimerIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                Next {nextDates.length} Runs ({timezone})
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<DownloadIcon />}
                  onClick={downloadSchedule}
                  disabled={nextDates.length === 0}
                >
                  Export
                </Button>
              </Box>
            </Box>
            
            {nextDates.length > 0 ? (
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>#</strong></TableCell>
                      <TableCell><strong>Date & Time</strong></TableCell>
                      <TableCell><strong>Relative</strong></TableCell>
                      <TableCell><strong>ISO Format</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {nextDates.map((date, index) => (
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell sx={{ fontFamily: 'monospace' }}>
                          {date.formatted}
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={date.relative}
                            size="small"
                            color={index === 0 ? 'primary' : 'default'}
                          />
                        </TableCell>
                        <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>
                          {date.iso}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Alert severity="warning">
                No upcoming dates found. Check your cron expression.
              </Alert>
            )}
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          {/* Cron Syntax Guide */}
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <InfoIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                Cron Syntax Guide
              </Typography>
              
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>Field</strong></TableCell>
                      <TableCell><strong>Range</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cronFields.map((field, index) => (
                      <TableRow key={index}>
                        <TableCell>{field.name}</TableCell>
                        <TableCell sx={{ fontFamily: 'monospace' }}>
                          {field.range}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="subtitle2" gutterBottom>
                Special Characters:
              </Typography>
              <Typography variant="body2" paragraph>
                <strong>*</strong> - Any value
              </Typography>
              <Typography variant="body2" paragraph>
                <strong>,</strong> - List (1,3,5)
              </Typography>
              <Typography variant="body2" paragraph>
                <strong>-</strong> - Range (1-5)
              </Typography>
              <Typography variant="body2" paragraph>
                <strong>/</strong> - Step (*/2 = every 2)
              </Typography>
              <Typography variant="body2">
                <strong>?</strong> - No specific value (day fields)
              </Typography>
            </CardContent>
          </Card>

          {/* Quick Tips */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Tips
              </Typography>
              
              <Typography variant="body2" paragraph>
                • Use the Visual Builder if you're new to cron expressions
              </Typography>
              <Typography variant="body2" paragraph>
                • Test expressions with different timezones
              </Typography>
              <Typography variant="body2" paragraph>
                • Be careful with day of month vs day of week
              </Typography>
              <Typography variant="body2" paragraph>
                • Use step values (*/n) for intervals
              </Typography>
              <Typography variant="body2">
                • Export schedules for documentation
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
        message="Copied to clipboard!"
      />
    </Box>
  );
}