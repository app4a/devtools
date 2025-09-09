import React, { useState, useEffect, useCallback, useMemo } from 'react';
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
  Checkbox,
  Tabs,
  Tab,
  Card,
  CardContent,
  Grid,
  Button,
  Stack,
  Divider,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Snackbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tooltip,
  LinearProgress
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DateTimePicker, TimePicker } from '@mui/x-date-pickers';
import { format as formatTz, toZonedTime } from 'date-fns-tz';
import { format, addDays, differenceInHours, parseISO } from 'date-fns';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import Brightness2Icon from '@mui/icons-material/Brightness2';
import PublicIcon from '@mui/icons-material/Public';
import ScheduleIcon from '@mui/icons-material/Schedule';
import EventIcon from '@mui/icons-material/Event';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DownloadIcon from '@mui/icons-material/Download';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import BusinessIcon from '@mui/icons-material/Business';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import Head from 'next/head';

// Comprehensive list of major cities and their IANA time zone IDs organized by region
const allTimezones = [
  // North America
  { name: 'New York', timezone: 'America/New_York', region: 'North America', country: 'USA' },
  { name: 'Los Angeles', timezone: 'America/Los_Angeles', region: 'North America', country: 'USA' },
  { name: 'Chicago', timezone: 'America/Chicago', region: 'North America', country: 'USA' },
  { name: 'Denver', timezone: 'America/Denver', region: 'North America', country: 'USA' },
  { name: 'Toronto', timezone: 'America/Toronto', region: 'North America', country: 'Canada' },
  { name: 'Vancouver', timezone: 'America/Vancouver', region: 'North America', country: 'Canada' },
  { name: 'Mexico City', timezone: 'America/Mexico_City', region: 'North America', country: 'Mexico' },
  
  // South America
  { name: 'São Paulo', timezone: 'America/Sao_Paulo', region: 'South America', country: 'Brazil' },
  { name: 'Buenos Aires', timezone: 'America/Argentina/Buenos_Aires', region: 'South America', country: 'Argentina' },
  { name: 'Lima', timezone: 'America/Lima', region: 'South America', country: 'Peru' },
  { name: 'Bogotá', timezone: 'America/Bogota', region: 'South America', country: 'Colombia' },
  
  // Europe
  { name: 'London', timezone: 'Europe/London', region: 'Europe', country: 'UK' },
  { name: 'Paris', timezone: 'Europe/Paris', region: 'Europe', country: 'France' },
  { name: 'Berlin', timezone: 'Europe/Berlin', region: 'Europe', country: 'Germany' },
  { name: 'Madrid', timezone: 'Europe/Madrid', region: 'Europe', country: 'Spain' },
  { name: 'Rome', timezone: 'Europe/Rome', region: 'Europe', country: 'Italy' },
  { name: 'Amsterdam', timezone: 'Europe/Amsterdam', region: 'Europe', country: 'Netherlands' },
  { name: 'Moscow', timezone: 'Europe/Moscow', region: 'Europe', country: 'Russia' },
  { name: 'Stockholm', timezone: 'Europe/Stockholm', region: 'Europe', country: 'Sweden' },
  { name: 'Zurich', timezone: 'Europe/Zurich', region: 'Europe', country: 'Switzerland' },
  
  // Asia
  { name: 'Tokyo', timezone: 'Asia/Tokyo', region: 'Asia', country: 'Japan' },
  { name: 'Shanghai', timezone: 'Asia/Shanghai', region: 'Asia', country: 'China' },
  { name: 'Hong Kong', timezone: 'Asia/Hong_Kong', region: 'Asia', country: 'Hong Kong' },
  { name: 'Seoul', timezone: 'Asia/Seoul', region: 'Asia', country: 'South Korea' },
  { name: 'Mumbai', timezone: 'Asia/Kolkata', region: 'Asia', country: 'India' },
  { name: 'Singapore', timezone: 'Asia/Singapore', region: 'Asia', country: 'Singapore' },
  { name: 'Bangkok', timezone: 'Asia/Bangkok', region: 'Asia', country: 'Thailand' },
  { name: 'Dubai', timezone: 'Asia/Dubai', region: 'Asia', country: 'UAE' },
  { name: 'Tel Aviv', timezone: 'Asia/Jerusalem', region: 'Asia', country: 'Israel' },
  
  // Africa
  { name: 'Cairo', timezone: 'Africa/Cairo', region: 'Africa', country: 'Egypt' },
  { name: 'Lagos', timezone: 'Africa/Lagos', region: 'Africa', country: 'Nigeria' },
  { name: 'Johannesburg', timezone: 'Africa/Johannesburg', region: 'Africa', country: 'South Africa' },
  { name: 'Nairobi', timezone: 'Africa/Nairobi', region: 'Africa', country: 'Kenya' },
  
  // Oceania
  { name: 'Sydney', timezone: 'Australia/Sydney', region: 'Oceania', country: 'Australia' },
  { name: 'Melbourne', timezone: 'Australia/Melbourne', region: 'Oceania', country: 'Australia' },
  { name: 'Perth', timezone: 'Australia/Perth', region: 'Oceania', country: 'Australia' },
  { name: 'Auckland', timezone: 'Pacific/Auckland', region: 'Oceania', country: 'New Zealand' },
  
  // Pacific
  { name: 'Honolulu', timezone: 'Pacific/Honolulu', region: 'Pacific', country: 'USA' },
  { name: 'Fiji', timezone: 'Pacific/Fiji', region: 'Pacific', country: 'Fiji' }
];

const businessHours = {
  start: 9, // 9 AM
  end: 17   // 5 PM
};

export default function WorldTime({ name, description }) {
  const [referenceTime, setReferenceTime] = useState(new Date());
  const [selectedTimezone, setSelectedTimezone] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [use24HourFormat, setUse24HourFormat] = useState(true);
  const [cities, setCities] = useState([]);
  const [currentTab, setCurrentTab] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [meetingTime, setMeetingTime] = useState(new Date());
  const [fromTimezone, setFromTimezone] = useState('America/New_York');
  const [toTimezone, setToTimezone] = useState('Europe/London');
  const [convertTime, setConvertTime] = useState(new Date());
  const [showBusinessHours, setShowBusinessHours] = useState(true);

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
    const formatString = use24HourFormat ? 'yyyy-MM-dd HH:mm:ss' : 'yyyy-MM-dd hh:mm:ss aa';
    const formattedDateTime = formatTz(zonedDate, formatString, { timeZone: timezone });
    const offset = formatTz(zonedDate, 'xxx', { timeZone: timezone });
    const offsetMinutes = formatTz(zonedDate, 'xxx', { timeZone: timezone });
    
    // Get more detailed time info
    const hours = zonedDate.getHours();
    const isDay = hours >= 6 && hours < 18;
    const isBusinessHours = hours >= businessHours.start && hours < businessHours.end;
    const dayOfWeek = format(zonedDate, 'EEEE');
    const isWeekend = dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday';
    
    return { 
      formattedDateTime, 
      offset, 
      offsetMinutes,
      isDay, 
      isBusinessHours: isBusinessHours && !isWeekend,
      dayOfWeek,
      isWeekend,
      hours
    };
  }, [use24HourFormat]);

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setSnackbarMessage('Copied to clipboard!');
      setOpenSnackbar(true);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const convertTimeToTimezone = (time, fromTz, toTz) => {
    // Convert from source timezone to target timezone
    // Simply convert the time to the target timezone
    // Note: This assumes the input time is already a proper Date object
    return toZonedTime(time, toTz);
  };

  const exportTimeData = () => {
    const exportData = {
      cities: cities.map(city => ({
        ...city,
        currentTime: getFormattedTime(referenceTime, city.timezone)
      })),
      referenceTime: referenceTime.toISOString(),
      use24HourFormat,
      exportedAt: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `world-time-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const findBestMeetingTime = () => {
    if (cities.length < 2) return [];
    
    const suggestions = [];
    const timeSlots = Array.from({ length: 24 }, (_, hour) => hour);
    
    timeSlots.forEach(hour => {
      const meetingDateTime = new Date(meetingTime);
      meetingDateTime.setHours(hour, 0, 0, 0);
      
      const cityTimes = cities.map(city => {
        const cityTime = toZonedTime(meetingDateTime, city.timezone);
        const cityHour = cityTime.getHours();
        const isBusinessHours = cityHour >= businessHours.start && cityHour < businessHours.end;
        const isWeekend = cityTime.getDay() === 0 || cityTime.getDay() === 6;
        
        return {
          city: city.name,
          time: formatTz(cityTime, use24HourFormat ? 'HH:mm' : 'hh:mm aa', { timeZone: city.timezone }),
          hour: cityHour,
          isBusinessHours: isBusinessHours && !isWeekend,
          isWeekend
        };
      });
      
      const businessHoursCount = cityTimes.filter(ct => ct.isBusinessHours).length;
      const score = businessHoursCount / cities.length;
      
      if (score > 0) {
        suggestions.push({
          meetingTime: formatTz(meetingDateTime, use24HourFormat ? 'HH:mm' : 'hh:mm aa'),
          score,
          cityTimes,
          businessHoursCount
        });
      }
    });
    
    return suggestions.sort((a, b) => b.score - a.score).slice(0, 5);
  };

  const timezoneRegions = useMemo(() => {
    const regions = {};
    allTimezones.forEach(tz => {
      if (!regions[tz.region]) {
        regions[tz.region] = [];
      }
      regions[tz.region].push(tz);
    });
    return regions;
  }, []);

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
    <Box sx={{ p: 2 }}>
      <Head>
        <title>{name ? `${name} - Dev Tools` : 'Professional World Time - Dev Tools'}</title>
        <meta name="description" content={description} />
      </Head>
      
      <Typography variant="h4" gutterBottom>
        {name}
      </Typography>
      <Typography variant="body1" paragraph color="text.secondary">
        {description}
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        <strong>Professional World Time Tool:</strong> Comprehensive timezone management with world clock, 
        meeting planner, time converter, and business hours tracking across 40+ major cities.
      </Alert>

      <Tabs value={currentTab} onChange={(e, newValue) => setCurrentTab(newValue)} sx={{ mb: 3 }}>
        <Tab icon={<PublicIcon />} label="World Clock" />
        <Tab icon={<MeetingRoomIcon />} label="Meeting Planner" />
        <Tab icon={<SwapHorizIcon />} label="Time Converter" />
        <Tab icon={<BusinessIcon />} label="Business Hours" />
        <Tab icon={<FlightTakeoffIcon />} label="Travel Time" />
      </Tabs>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          {currentTab === 0 && (
            <>
              {/* Controls */}
              <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  <ScheduleIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                  World Clock Settings
                </Typography>
                
                <Grid container spacing={2} alignItems="center">
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DateTimePicker
                        label="Reference Time"
                        value={referenceTime}
                        onChange={(newValue) => setReferenceTime(newValue)}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            size: "small"
                          }
                        }}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 3 }}>
                    <FormControlLabel
                      control={
                        <Checkbox 
                          checked={use24HourFormat} 
                          onChange={(e) => setUse24HourFormat(e.target.checked)} 
                        />
                      }
                      label="24-hour format"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 3 }}>
                    <FormControlLabel
                      control={
                        <Checkbox 
                          checked={showBusinessHours} 
                          onChange={(e) => setShowBusinessHours(e.target.checked)} 
                        />
                      }
                      label="Show business hours"
                    />
                  </Grid>
                </Grid>

                <Box sx={{ mt: 2 }}>
                  <Autocomplete
                    options={allTimezones.filter(tz => !cities.some(c => c.timezone === tz.timezone))}
                    getOptionLabel={(option) => `${option.name} (${option.country})`}
                    groupBy={(option) => option.region}
                    value={selectedTimezone}
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => {
                      setInputValue(newInputValue);
                    }}
                    onChange={(event, newValue) => {
                      if (newValue) {
                        handleAddCity(newValue);
                        setSelectedTimezone(null);
                        setInputValue('');
                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Add City"
                        variant="outlined"
                        fullWidth
                        size="small"
                      />
                    )}
                  />
                </Box>

                <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                  <Button
                    variant="outlined"
                    startIcon={<DownloadIcon />}
                    onClick={exportTimeData}
                    size="small"
                  >
                    Export Data
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => setReferenceTime(new Date())}
                    size="small"
                  >
                    Reset to Now
                  </Button>
                </Stack>
              </Paper>

              {/* World Clock List */}
              <Paper sx={{ p: 0 }}>
                <Typography variant="h6" sx={{ p: 3, pb: 0 }}>
                  World Clock ({cities.length} cities)
                </Typography>
                <List>
                  {sortedCities.map((city) => {
                    const { formattedDateTime, offset, isDay, isBusinessHours, dayOfWeek, isWeekend } = getFormattedTime(referenceTime, city.timezone);
                    return (
                      <ListItem key={city.timezone} divider>
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Typography variant="h6">
                                {city.name}
                              </Typography>
                              {city.isLocal && <Chip label="Local" size="small" color="primary" />}
                              {city.country && <Chip label={city.country} size="small" variant="outlined" />}
                              {showBusinessHours && isBusinessHours && <Chip label="Business Hours" size="small" color="success" />}
                              {isWeekend && <Chip label="Weekend" size="small" color="warning" />}
                            </Box>
                          }
                          secondary={`${offset} • ${dayOfWeek}`}
                        />
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="h5" sx={{ fontFamily: 'monospace' }}>
                            {formattedDateTime}
                          </Typography>
                          <Tooltip title={isDay ? 'Daytime' : 'Nighttime'}>
                            {isDay ? <WbSunnyIcon color="warning" /> : <Brightness2Icon color="action" />}
                          </Tooltip>
                          <IconButton 
                            size="small" 
                            onClick={() => handleCopy(formattedDateTime)}
                            title="Copy time"
                          >
                            <ContentCopyIcon />
                          </IconButton>
                        </Box>
                        <ListItemSecondaryAction>
                          {!city.isLocal && (
                            <IconButton 
                              edge="end" 
                              aria-label="delete" 
                              onClick={() => handleRemoveCity(city.timezone)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          )}
                        </ListItemSecondaryAction>
                      </ListItem>
                    );
                  })}
                </List>
              </Paper>
            </>
          )}

          {currentTab === 1 && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                <EventIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                Meeting Planner
              </Typography>
              
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                      label="Meeting Date & Time"
                      value={meetingTime}
                      onChange={(newValue) => setMeetingTime(newValue)}
                      slotProps={{
                        textField: {
                          fullWidth: true
                        }
                      }}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Alert severity="info">
                    Add cities to your world clock to see meeting time suggestions
                  </Alert>
                </Grid>
              </Grid>

              {cities.length >= 2 && (
                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Best Meeting Times (in {cities[0]?.name || 'first'} timezone):
                  </Typography>
                  
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Meeting Time</TableCell>
                          <TableCell>Business Hours Coverage</TableCell>
                          {cities.map(city => (
                            <TableCell key={city.timezone}>{city.name}</TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {findBestMeetingTime().map((suggestion, index) => (
                          <TableRow key={index}>
                            <TableCell sx={{ fontFamily: 'monospace', fontWeight: 'bold' }}>
                              {suggestion.meetingTime}
                            </TableCell>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <LinearProgress 
                                  variant="determinate" 
                                  value={suggestion.score * 100} 
                                  sx={{ flexGrow: 1 }}
                                />
                                <Typography variant="body2">
                                  {Math.round(suggestion.score * 100)}%
                                </Typography>
                              </Box>
                            </TableCell>
                            {suggestion.cityTimes.map(cityTime => (
                              <TableCell 
                                key={cityTime.city}
                                sx={{ 
                                  fontFamily: 'monospace',
                                  backgroundColor: cityTime.isBusinessHours ? 'success.light' : 'inherit',
                                  color: cityTime.isBusinessHours ? 'success.contrastText' : 'inherit'
                                }}
                              >
                                {cityTime.time}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              )}
            </Paper>
          )}

          {currentTab === 2 && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                <SwapHorizIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                Time Zone Converter
              </Typography>
              
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>From Timezone</InputLabel>
                    <Select
                      value={fromTimezone}
                      onChange={(e) => setFromTimezone(e.target.value)}
                      label="From Timezone"
                    >
                      {allTimezones.map((tz) => (
                        <MenuItem key={tz.timezone} value={tz.timezone}>
                          {tz.name} ({tz.country})
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                      label="Time to Convert"
                      value={convertTime}
                      onChange={(newValue) => setConvertTime(newValue)}
                      slotProps={{
                        textField: {
                          fullWidth: true
                        }
                      }}
                    />
                  </LocalizationProvider>
                </Grid>
                
                <Grid size={{ xs: 12, md: 6 }}>
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>To Timezone</InputLabel>
                    <Select
                      value={toTimezone}
                      onChange={(e) => setToTimezone(e.target.value)}
                      label="To Timezone"
                    >
                      {allTimezones.map((tz) => (
                        <MenuItem key={tz.timezone} value={tz.timezone}>
                          {tz.name} ({tz.country})
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Converted Time
                      </Typography>
                      <Typography variant="h4" sx={{ fontFamily: 'monospace' }}>
                        {formatTz(
                          convertTimeToTimezone(convertTime, fromTimezone, toTimezone),
                          use24HourFormat ? 'yyyy-MM-dd HH:mm:ss' : 'yyyy-MM-dd hh:mm:ss aa',
                          { timeZone: toTimezone }
                        )}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        in {allTimezones.find(tz => tz.timezone === toTimezone)?.name}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              <Button
                variant="outlined"
                startIcon={<SwapHorizIcon />}
                onClick={() => {
                  const temp = fromTimezone;
                  setFromTimezone(toTimezone);
                  setToTimezone(temp);
                }}
                sx={{ mt: 2 }}
              >
                Swap Timezones
              </Button>
            </Paper>
          )}

          {currentTab === 3 && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                <BusinessIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                Business Hours Analysis
              </Typography>
              
              <Alert severity="info" sx={{ mb: 3 }}>
                Business hours are considered 9:00 AM - 5:00 PM, Monday through Friday in each timezone.
              </Alert>

              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>City</TableCell>
                      <TableCell>Current Time</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Next Business Day</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cities.map((city) => {
                      const { formattedDateTime, isBusinessHours, isWeekend, dayOfWeek } = getFormattedTime(referenceTime, city.timezone);
                      const nextBusinessDay = isWeekend || !isBusinessHours ? 'Monday 9:00 AM' : 'Current';
                      
                      return (
                        <TableRow key={city.timezone}>
                          <TableCell>
                            <Typography variant="body1" fontWeight="bold">
                              {city.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {city.country}
                            </Typography>
                          </TableCell>
                          <TableCell sx={{ fontFamily: 'monospace' }}>
                            {formattedDateTime}
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                              {isBusinessHours ? (
                                <Chip label="Business Hours" color="success" size="small" />
                              ) : (
                                <Chip label="After Hours" color="default" size="small" />
                              )}
                              {isWeekend && (
                                <Chip label="Weekend" color="warning" size="small" />
                              )}
                            </Box>
                          </TableCell>
                          <TableCell>
                            {nextBusinessDay}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          )}

          {currentTab === 4 && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                <FlightTakeoffIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                Travel Time Calculator
              </Typography>
              
              <Alert severity="info" sx={{ mb: 3 }}>
                Calculate time differences and jet lag effects when traveling between time zones.
              </Alert>

              <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                Travel time calculator feature coming soon! This will help you plan for jet lag 
                and understand time changes when traveling between different time zones.
              </Typography>
            </Paper>
          )}
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          {/* Quick Timezone Info */}
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              
              <Stack spacing={1}>
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={() => {
                    const popularCities = ['America/New_York', 'Europe/London', 'Asia/Tokyo', 'Australia/Sydney'];
                    popularCities.forEach(timezone => {
                      const city = allTimezones.find(tz => tz.timezone === timezone);
                      if (city && !cities.some(c => c.timezone === timezone)) {
                        handleAddCity(city);
                      }
                    });
                  }}
                  fullWidth
                >
                  Add Popular Cities
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => setReferenceTime(new Date())}
                  fullWidth
                >
                  Current Time
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<ContentCopyIcon />}
                  onClick={() => {
                    const timeList = cities.map(city => {
                      const { formattedDateTime } = getFormattedTime(referenceTime, city.timezone);
                      return `${city.name}: ${formattedDateTime}`;
                    }).join('\n');
                    handleCopy(timeList);
                  }}
                  fullWidth
                >
                  Copy All Times
                </Button>
              </Stack>
            </CardContent>
          </Card>

          {/* Timezone Regions */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Timezone Guide
              </Typography>
              
              {Object.entries(timezoneRegions).map(([region, timezones]) => (
                <Accordion key={region}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle2">{region} ({timezones.length})</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Stack spacing={1}>
                      {timezones.slice(0, 5).map(tz => (
                        <Button
                          key={tz.timezone}
                          variant="outlined"
                          size="small"
                          onClick={() => handleAddCity(tz)}
                          disabled={cities.some(c => c.timezone === tz.timezone)}
                          fullWidth
                          sx={{ justifyContent: 'flex-start' }}
                        >
                          {tz.name} ({tz.country})
                        </Button>
                      ))}
                      {timezones.length > 5 && (
                        <Typography variant="caption" color="text.secondary">
                          and {timezones.length - 5} more...
                        </Typography>
                      )}
                    </Stack>
                  </AccordionDetails>
                </Accordion>
              ))}
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