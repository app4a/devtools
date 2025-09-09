import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Paper,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  TextField,
  Autocomplete,
  Chip,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { format as formatTz, toZonedTime } from 'date-fns-tz';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import Brightness2Icon from '@mui/icons-material/Brightness2';
import Head from 'next/head';

// A simplified list of major cities and their IANA time zone IDs
// In a real app, this would come from an API or a more comprehensive list
const allTimezones = [
  
  { name: 'New York', timezone: 'America/New_York' },
  { name: 'London', timezone: 'Europe/London' },
  { name: 'Paris', timezone: 'Europe/Paris' },
  { name: 'Berlin', timezone: 'Europe/Berlin' },
  { name: 'Tokyo', timezone: 'Asia/Tokyo' },
  { name: 'Shanghai', timezone: 'Asia/Shanghai' },
  { name: 'Dubai', timezone: 'Asia/Dubai' },
  { name: 'Sydney', timezone: 'Australia/Sydney' },
  { name: 'Los Angeles', timezone: 'America/Los_Angeles' },
  { name: 'Chicago', timezone: 'America/Chicago' },
  { name: 'Denver', timezone: 'America/Denver' },
  { name: 'Rio de Janeiro', timezone: 'America/Sao_Paulo' },
  { name: 'Moscow', timezone: 'Europe/Moscow' },
  { name: 'Mumbai', timezone: 'Asia/Kolkata' },
  { name: 'Singapore', timezone: 'Asia/Singapore' },
  { name: 'Johannesburg', timezone: 'Africa/Johannesburg' },
  { name: 'Cairo', timezone: 'Africa/Cairo' },
  { name: 'Mexico City', timezone: 'America/Mexico_City' },
  { name: 'Honolulu', timezone: 'Pacific/Honolulu' },
];

export default function WorldTime({ name, description }) {
  const [referenceTime, setReferenceTime] = useState(new Date());
  const [selectedTimezone, setSelectedTimezone] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [use24HourFormat, setUse24HourFormat] = useState(true);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const storedCities = localStorage.getItem('worldTimeCities');
    if (storedCities) {
      const parsedCities = JSON.parse(storedCities);
      // Ensure only one local timezone entry and it's correct
      const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const uniqueCities = [];
      const seenTimezones = new Set();
      let localFound = false;

      parsedCities.forEach(city => {
        if (city.timezone === localTimezone && city.isLocal) {
          if (!localFound) {
            uniqueCities.push({ name: 'Local Time', timezone: localTimezone, isLocal: true });
            seenTimezones.add(localTimezone);
            localFound = true;
          }
        } else if (!seenTimezones.has(city.timezone)) {
          uniqueCities.push(city);
          seenTimezones.add(city.timezone);
        }
      });

      if (!localFound) {
        uniqueCities.unshift({ name: 'Local Time', timezone: localTimezone, isLocal: true });
        seenTimezones.add(localTimezone);
      }
      setCities(uniqueCities);
    } else {
      const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const defaultCities = [
        { name: 'Local Time', timezone: localTimezone, isLocal: true },
        { name: 'New York', timezone: 'America/New_York' },
        { name: 'London', timezone: 'Europe/London' },
        { name: 'Tokyo', timezone: 'Asia/Tokyo' },
        { name: 'Sydney', timezone: 'Australia/Sydney' },
      ];
      
      // Ensure no duplicate timezones in default cities
      const seenTimezones = new Set();
      const uniqueDefaultCities = defaultCities.filter(city => {
        if (seenTimezones.has(city.timezone)) {
          return false;
        }
        seenTimezones.add(city.timezone);
        return true;
      });
      
      setCities(uniqueDefaultCities);
    }
  }, []);

  useEffect(() => {
    if (cities.length > 0) {
      localStorage.setItem('worldTimeCities', JSON.stringify(cities));
    }
  }, [cities]);

  const getFormattedTime = useCallback((time, timezone) => {
    const zonedDate = toZonedTime(time, timezone);
    const formatString = use24HourFormat ? 'yyyy-MM-dd HH:mm' : 'yyyy-MM-dd hh:mm aa';
    const formattedDateTime = formatTz(zonedDate, formatString, { timeZone: timezone }); // e.g., 2023-01-01 01:00 AM
    const offset = formatTz(zonedDate, 'xxx', { timeZone: timezone }); // e.g., -05:00 or +01:00

    // Determine if it's day or night (simple heuristic: 6 AM to 6 PM is day)
    const hours = zonedDate.getHours();
    const isDay = hours >= 6 && hours < 18;

    return { formattedDateTime, offset, isDay };
  }, [use24HourFormat]);

  const sortedCities = [...cities].sort((a, b) => {
    const timeA = toZonedTime(referenceTime, a.timezone).getTime();
    const timeB = toZonedTime(referenceTime, b.timezone).getTime();
    return timeA - timeB;
  });

  const handleAddCity = (cityToAdd) => {
    if (cityToAdd && !cities.some(city => city.timezone === cityToAdd.timezone)) {
      setCities(prevCities => [...prevCities, cityToAdd]);
      setSelectedTimezone(null);
    }
  };

  const handleRemoveCity = (timezoneToRemove) => {
    setCities(prevCities => prevCities.filter(city => city.timezone !== timezoneToRemove));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', p: 2 }}>
      <Head>
        <title>{name} - Dev Tools</title>
        <meta name="description" content={description} />
      </Head>
      <Typography variant="h4" gutterBottom>
        {name}
      </Typography>
      <Paper sx={{ p: 2, borderBottom: '1px solid #444', backgroundColor: '#2d2d2d', display: 'flex', flexDirection: 'column', gap: 2 }} elevation={0}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="body1" sx={{ color: '#ffffff' }}>Reference Time:</Typography>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              value={referenceTime}
              onChange={(newValue) => setReferenceTime(newValue)}
              slotProps={{
                textField: {
                  sx: {
                    backgroundColor: '#1e1e1e',
                    input: { color: '#ffffff' },
                    label: { color: '#ffffff' },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#444',
                      },
                    },
                  },
                  size: "small"
                }
              }}
            />
          </LocalizationProvider>
          <FormControlLabel
            control={<Checkbox checked={use24HourFormat} onChange={(e) => setUse24HourFormat(e.target.checked)} sx={{ color: '#ffffff' }} />}
            label="24-hour format"
            sx={{ color: '#ffffff' }}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Autocomplete
            options={allTimezones.filter(tz => !cities.some(c => c.timezone === tz.timezone))}
            getOptionLabel={(option) => option.name}
            value={selectedTimezone}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            onChange={(event, newValue) => {
              if (newValue) {
                handleAddCity(newValue);
                setSelectedTimezone(null); // Clear the selection after adding
                setInputValue(''); // Clear the input text
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Add City"
                variant="outlined"
                sx={{
                  flexGrow: 1,
                  backgroundColor: '#1e1e1e',
                  input: { color: '#ffffff' },
                  label: { color: '#ffffff' },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#444',
                    },
                  },
                }}
                size="small"
              />
            )}
            sx={{ width: 300 }}
          />
        </Box>
      </Paper>

      <List sx={{ flexGrow: 1, overflowY: 'auto', backgroundColor: '#1e1e1e', color: '#ffffff' }}>
        {sortedCities.map((city) => {
          const { formattedDateTime, offset, isDay } = getFormattedTime(referenceTime, city.timezone);
          return (
            <ListItem key={city.timezone} divider>
              <ListItemText
                primary={
                  <Typography variant="h6" sx={{ color: '#ffffff' }}>
                    {city.name} {city.isLocal && <Chip label="Local" size="small" color="primary" sx={{ ml: 1 }} />}
                  </Typography>
                }
                secondary={
                  <Typography variant="body2" sx={{ color: '#cccccc' }}>
                    {offset}
                  </Typography>
                }
              />
              <Typography variant="h5" sx={{ color: '#ffffff', mr: 2 }}>
                {formattedDateTime}
              </Typography>
              {isDay ? <WbSunnyIcon sx={{ color: 'orange' }} /> : <Brightness2Icon sx={{ color: '#cccccc' }} />}
              <ListItemSecondaryAction>
                {!city.isLocal && (
                  <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveCity(city.timezone)}>
                    <DeleteIcon sx={{ color: '#ffffff' }} />
                  </IconButton>
                )}
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}