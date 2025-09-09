import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Typography,
  Paper,
  Grid,
  InputAdornment,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  Button,
  Snackbar,
  Chip,
  Divider
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import RefreshIcon from '@mui/icons-material/Refresh';
import { format, fromUnixTime, getUnixTime, isValid, formatDistanceToNow, getDayOfYear, getWeek } from 'date-fns';
import { toZonedTime, fromZonedTime, formatInTimeZone } from 'date-fns-tz';
import Head from 'next/head';

// A simplified list of common timezones
const getTimezones = () => {
  const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const baseTimezones = [
    { value: 'UTC', label: 'UTC' },
    { value: 'America/New_York', label: 'America/New_York (Eastern Time)' },
    { value: 'America/Los_Angeles', label: 'America/Los_Angeles (Pacific Time)' },
    { value: 'America/Chicago', label: 'America/Chicago (Central Time)' },
    { value: 'America/Denver', label: 'America/Denver (Mountain Time)' },
    { value: 'Europe/London', label: 'Europe/London (GMT/BST)' },
    { value: 'Europe/Paris', label: 'Europe/Paris (CET/CEST)' },
    { value: 'Europe/Berlin', label: 'Europe/Berlin (CET/CEST)' },
    { value: 'Asia/Tokyo', label: 'Asia/Tokyo (JST)' },
    { value: 'Asia/Shanghai', label: 'Asia/Shanghai (CST)' },
    { value: 'Asia/Kolkata', label: 'Asia/Kolkata (IST)' },
    { value: 'Australia/Sydney', label: 'Australia/Sydney (AEST/AEDT)' },
    { value: 'Australia/Perth', label: 'Australia/Perth (AWST)' },
    { value: 'Africa/Johannesburg', label: 'Africa/Johannesburg (SAST)' },
    { value: 'Africa/Cairo', label: 'Africa/Cairo (EET/EEST)' },
    { value: 'America/Sao_Paulo', label: 'America/Sao_Paulo (BRT/BRST)' },
    { value: 'Asia/Dubai', label: 'Asia/Dubai (GST)' },
    { value: 'Asia/Singapore', label: 'Asia/Singapore (SGT)' },
    { value: 'Pacific/Honolulu', label: 'Pacific/Honolulu (HST)' },
    { value: 'Pacific/Auckland', label: 'Pacific/Auckland (NZST/NZDT)' },
  ];

  // Start with UTC, then add local timezone, then others
  const result = [
    { value: 'UTC', label: 'UTC' },
    { value: localTimezone, label: `Local (${localTimezone})` },
    ...baseTimezones.filter(tz => tz.value !== localTimezone && tz.value !== 'UTC')
  ];

  return result;
};

const timezones = getTimezones();

function TimestampConverter({ name, description }) {
  const initialDate = new Date(); // Current time
  const [date, setDate] = useState(initialDate);
  const [selectedTimezone, setSelectedTimezone] = useState('UTC');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [displayUnixTimestamp, setDisplayUnixTimestamp] = useState('');
  const [displayHumanDateTime, setDisplayHumanDateTime] = useState('');

  // Effect to update display values when date or timezone changes
  useEffect(() => {
    if (isValid(date)) {
      // Update Unix Timestamp (Unix timestamp is always in UTC, no timezone conversion needed)
      const unix = getUnixTime(date);
      setDisplayUnixTimestamp(unix.toString());

      // Update Human Readable Date/Time (display in selected timezone)
      setDisplayHumanDateTime(formatInTimeZone(date, selectedTimezone, 'yyyy-MM-dd HH:mm:ss XXX'));
    } else {
      setDisplayUnixTimestamp('');
      setDisplayHumanDateTime('');
    }
  }, [date, selectedTimezone]);

  const handleUnixChange = (e) => {
    const value = e.target.value;
    setDisplayUnixTimestamp(value);
    const timestampNum = parseInt(value, 10);
    if (!isNaN(timestampNum)) {
      setDate(fromUnixTime(timestampNum));
    } else {
      setDate(new Date(NaN)); // Set to invalid date
    }
  };

  const handleHumanChange = (e) => {
    const value = e.target.value;
    setDisplayHumanDateTime(value);
    try {
      const parsedDate = new Date(value);
      if (isValid(parsedDate)) {
        setDate(parsedDate);
      } else {
        setDate(new Date(NaN));
      }
    } catch (e) {
      setDate(new Date(NaN));
    }
  };

  const handleTimezoneChange = (e) => {
    setSelectedTimezone(e.target.value);
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setOpenSnackbar(true);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const setCurrentTime = () => {
    setDate(new Date());
  };

  const presetTimes = [
    { label: 'Now', value: new Date() },
    { label: 'Epoch (1970)', value: new Date(0) },
    { label: 'Y2K (2000)', value: new Date('2000-01-01T00:00:00Z') },
    { label: 'Unix Billionth Second', value: new Date('2001-09-09T01:46:40Z') },
    { label: 'Start of 2024', value: new Date('2024-01-01T00:00:00Z') },
    { label: 'End of 2024', value: new Date('2024-12-31T23:59:59Z') }
  ];

  const formatOptions = [
    { format: 'yyyy-MM-dd HH:mm:ss', label: 'ISO Date Time' },
    { format: 'yyyy-MM-dd', label: 'Date Only' },
    { format: 'HH:mm:ss', label: 'Time Only' },
    { format: 'PPP', label: 'Long Date' },
    { format: 'pp', label: 'Time AM/PM' },
    { format: 'PPPp', label: 'Full Date Time' }
  ];

  return (
    <Box sx={{ p: 2 }}>
      <Head>
        <title>{name ? `${name} - Dev Tools` : 'Timestamp Converter - Dev Tools'}</title>
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
          {/* Current Time Display */}
          <Paper sx={{ p: 3, mb: 3, textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom>
              Current Time
            </Typography>
            <Typography variant="h3" sx={{ fontFamily: 'monospace', mb: 2 }}>
              {getUnixTime(new Date())}
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              {formatInTimeZone(new Date(), selectedTimezone, 'PPPp')}
            </Typography>
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={setCurrentTime}
              sx={{ mt: 1 }}
            >
              Use Current Time
            </Button>
          </Paper>

          {/* Timezone Selection */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Timezone
            </Typography>
            <FormControl fullWidth>
              <InputLabel>Select Timezone</InputLabel>
              <Select
                value={selectedTimezone}
                onChange={handleTimezoneChange}
                label="Select Timezone"
              >
                {timezones.map((tz) => (
                  <MenuItem key={tz.value} value={tz.value}>
                    {tz.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Paper>

          {/* Input Fields */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Convert Timestamp
            </Typography>
            <Grid container spacing={2}>
              <Grid size={12}>
                <TextField
                  label="Unix Timestamp (seconds)"
                  fullWidth
                  value={displayUnixTimestamp}
                  onChange={handleUnixChange}
                  variant="outlined"
                  type="number"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccessTimeIcon />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => copyToClipboard(displayUnixTimestamp)}>
                          <ContentCopyIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                    style: { fontFamily: 'monospace' }
                  }}
                />
              </Grid>
              <Grid size={12}>
                <TextField
                  label="Human Readable Date/Time"
                  fullWidth
                  value={displayHumanDateTime}
                  onChange={handleHumanChange}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarTodayIcon />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => copyToClipboard(displayHumanDateTime)}>
                          <ContentCopyIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                    style: { fontFamily: 'monospace' }
                  }}
                />
              </Grid>
            </Grid>
          </Paper>

          {/* Format Options */}
          {isValid(date) && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Different Formats
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>Format</strong></TableCell>
                      <TableCell><strong>Result</strong></TableCell>
                      <TableCell><strong>Copy</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {formatOptions.map((option, index) => (
                      <TableRow key={index}>
                        <TableCell>{option.label}</TableCell>
                        <TableCell sx={{ fontFamily: 'monospace' }}>
                          {formatInTimeZone(date, selectedTimezone, option.format)}
                        </TableCell>
                        <TableCell>
                          <IconButton 
                            size="small"
                            onClick={() => copyToClipboard(formatInTimeZone(date, selectedTimezone, option.format))}
                          >
                            <ContentCopyIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          )}
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          {/* Preset Times */}
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Presets
              </Typography>
              {presetTimes.map((preset, index) => (
                <Box key={index} sx={{ mb: 1 }}>
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => setDate(preset.value)}
                    sx={{ justifyContent: 'flex-start' }}
                  >
                    {preset.label}
                  </Button>
                </Box>
              ))}
            </CardContent>
          </Card>

          {/* Current Selection Info */}
          {isValid(date) && (
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Current Selection
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>Timestamp:</strong> {getUnixTime(date)}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>Milliseconds:</strong> {date.getTime()}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>ISO String:</strong> {date.toISOString()}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>Relative:</strong> {formatDistanceToNow(date, { addSuffix: true })}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body2" gutterBottom>
                  <strong>Day of Week:</strong> {format(date, 'EEEE')}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>Day of Year:</strong> {getDayOfYear(date)}
                </Typography>
                <Typography variant="body2">
                  <strong>Week of Year:</strong> {getWeek(date)}
                </Typography>
              </CardContent>
            </Card>
          )}

          {/* Information */}
          <Alert severity="info" sx={{ mb: 2 }}>
            <strong>Unix Timestamp:</strong>
            <br />
            Number of seconds since January 1, 1970, 00:00:00 UTC (Unix Epoch).
          </Alert>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Common Use Cases
              </Typography>
              <Typography variant="body2" paragraph>
                • <strong>APIs:</strong> Standard time format for data exchange
              </Typography>
              <Typography variant="body2" paragraph>
                • <strong>Databases:</strong> Efficient storage and indexing
              </Typography>
              <Typography variant="body2" paragraph>
                • <strong>Logs:</strong> Consistent timestamps across systems
              </Typography>
              <Typography variant="body2" paragraph>
                • <strong>Scheduling:</strong> Cron jobs and task scheduling
              </Typography>
              <Typography variant="body2">
                • <strong>Caching:</strong> TTL and expiration times
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

export default TimestampConverter;