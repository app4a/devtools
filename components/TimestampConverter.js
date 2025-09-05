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
  InputLabel
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { format, fromUnixTime, getUnixTime, isValid } from 'date-fns';
import { toZonedTime, fromZonedTime, formatInTimeZone } from 'date-fns-tz';


import Head from 'next/head';

// A simplified list of common timezones
const timezones = [
  { value: 'UTC', label: 'UTC' },
  { value: Intl.DateTimeFormat().resolvedOptions().timeZone, label: `Local (${Intl.DateTimeFormat().resolvedOptions().timeZone})` },
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

function TimestampConverter() {
  const initialDate = fromUnixTime(1678886400); // March 15, 2023 12:00:00 PM UTC
  const [date, setDate] = useState(initialDate);
  const [selectedTimezone, setSelectedTimezone] = useState(timezones[0].value);

  const [displayUnixTimestamp, setDisplayUnixTimestamp] = useState('');
  const [displayHumanDateTime, setDisplayHumanDateTime] = useState('');

  // Effect to update display values when date or timezone changes
  useEffect(() => {
    if (isValid(date)) {
      // Update Unix Timestamp
      const unix = getUnixTime(fromZonedTime(date, selectedTimezone));
      setDisplayUnixTimestamp(unix.toString());

      // Update Human Readable Date/Time
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

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Head>
        <title>Timestamp Converter - Dev Tools</title>
        <meta name="description" content="Convert Unix timestamps to human-readable dates and vice-versa, supporting various time zones." />
      </Head>
      <Typography variant="h4" gutterBottom>
        Timestamp Converter
      </Typography>
      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth variant="outlined" sx={{ minWidth: 300 }}>
              <InputLabel id="timezone-select-label">Timezone</InputLabel>
              <Select
                labelId="timezone-select-label"
                value={selectedTimezone}
                onChange={handleTimezoneChange}
                label="Timezone"
                sx={{
                  backgroundColor: '#1e1e1e',
                  color: '#ffffff',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#444',
                  },
                  '& .MuiSvgIcon-root': {
                    color: '#ffffff',
                  },
                }}
              >
                {timezones.map((tz) => (
                  <MenuItem key={tz.value} value={tz.value}>
                    {tz.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
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
                    <AccessTimeIcon sx={{ color: '#ffffff' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                backgroundColor: '#1e1e1e',
                input: { color: '#ffffff' },
                label: { color: '#ffffff' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#444',
                  },
                },
                minWidth: 250,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Human Readable Date/Time"
              fullWidth
              value={displayHumanDateTime}
              onChange={handleHumanChange}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CalendarTodayIcon sx={{ color: '#ffffff' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                backgroundColor: '#1e1e1e',
                input: { color: '#ffffff' },
                label: { color: '#ffffff' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#444',
                  },
                },
                minWidth: 250,
              }}
            />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default TimestampConverter;
