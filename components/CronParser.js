import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Typography,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import cronstrue from 'cronstrue';
import { parseExpression } from 'cron-parser';

import Head from 'next/head';

export default function CronParser({ name, description }) {
  const [cronExpression, setCronExpression] = useState('0 0 * * *'); // Sample: Every day at midnight
  const [humanReadable, setHumanReadable] = useState('');
  const [nextDates, setNextDates] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      setHumanReadable(cronstrue.toString(cronExpression));
      setError(null);

      const interval = parseExpression(cronExpression);
      const dates = [];
      for (let i = 0; i < 5; i++) { // Get next 5 dates
        try {
          const nextDate = interval.next().toDate();
          // Format date to match test expectations (MM/DD/YYYY, HH:MM:SS AM/PM)
          const formattedDate = nextDate.toLocaleString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
          });
          dates.push(formattedDate);
        } catch (e) {
          // Handle cases where there are no more dates (e.g., one-time cron jobs)
          break;
        }
      }
      setNextDates(dates);

    } catch (err) {
      setHumanReadable('');
      setNextDates([]);
      // Format error message to match test expectations
      setError(`'${cronExpression}' is not a valid cron expression.`);
    }
  }, [cronExpression]);

  return (
    <Box sx={{ p: 2 }}>
      <Head>
        <title>{name} - Dev Tools</title>
        <meta name="description" content={description} />
      </Head>
      <Typography variant="h4" gutterBottom>
        {name}
      </Typography>
      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        <TextField
          data-testid="cron-expression-input"
          label="Cron Expression"
          fullWidth
          value={cronExpression}
          onChange={(e) => setCronExpression(e.target.value)}
          variant="outlined"
          error={Boolean(error)}
          sx={{ mb: 2 }}
        />
        <Typography variant="h6" gutterBottom>
          Human Readable:
        </Typography>
        <Paper variant="outlined" sx={{ p: 2, backgroundColor: '#2d2d2d', color: '#ffffff' }}>
          <Typography>{error || humanReadable || 'Enter a cron expression'}</Typography>
        </Paper>
      </Paper>

      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Next Upcoming Dates:
        </Typography>
        <List>
          {nextDates.length > 0 ? (
            nextDates.map((date, index) => (
              <ListItem key={index}>
                <ListItemText primary={date} />
              </ListItem>
            ))
          ) : (
            <ListItem>
              <ListItemText primary="No upcoming dates or invalid expression" />
            </ListItem>
          )}
        </List>
      </Paper>
    </Box>
  );
}