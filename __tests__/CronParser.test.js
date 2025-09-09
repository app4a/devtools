import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import CronParser from '../components/CronParser';

describe('CronParser', () => {
  it('should display human-readable output for a valid cron expression', async () => {
    render(<CronParser />);
    const cronInput = screen.getByLabelText('Cron Expression');
    await act(async () => {
      fireEvent.change(cronInput, { target: { value: '*/2 * * * *' } });
    });
    await waitFor(() => {
      expect(screen.getByText('Every 2 minutes')).toBeInTheDocument();
    });
  });

  it('should display an error for an invalid cron expression', async () => {
    render(<CronParser />);
    const cronInput = screen.getByLabelText('Cron Expression');
    await act(async () => {
      fireEvent.change(cronInput, { target: { value: 'invalid-cron' } });
    });
    await waitFor(() => {
      expect(screen.getByText( /'invalid-cron' is not a valid cron expression./i)).toBeInTheDocument();
    });
  });

  it('should show upcoming dates for a valid cron expression', async () => {
    render(<CronParser />);
    const cronInput = screen.getByLabelText('Cron Expression');
    await act(async () => {
      fireEvent.change(cronInput, { target: { value: '0 0 1 1 *' } }); // At 12:00 AM, on day 1 of the month, only in January
    });
    await waitFor(() => {
      const dateElements = screen.getAllByText(/\d{1,2}\/\d{1,2}\/\d{4}, \d{1,2}:00:00 AM/);
      expect(dateElements.length).toBeGreaterThan(0);
    });
  });
});
