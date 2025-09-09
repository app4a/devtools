import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TimestampConverter from '../components/TimestampConverter';

describe('TimestampConverter', () => {
  it('should convert a Unix timestamp to a human-readable date', async () => {
    render(<TimestampConverter />);
    const unixInput = screen.getByLabelText('Unix Timestamp (seconds)');
    const humanInput = screen.getByLabelText('Human Readable Date/Time');

    await act(async () => {
      fireEvent.change(unixInput, { target: { value: '1678886400' } });
    });

    await waitFor(() => {
      expect(humanInput).toHaveValue('2023-03-15 13:20:00 Z');
    });
  });

  it('should convert a human-readable date to a Unix timestamp', async () => {
    render(<TimestampConverter />);
    const unixInput = screen.getByLabelText('Unix Timestamp (seconds)');
    const humanInput = screen.getByLabelText('Human Readable Date/Time');

    await act(async () => {
      fireEvent.change(humanInput, { target: { value: '2023-03-15 00:00:00 UTC' } });
    });

    await waitFor(() => {
      expect(unixInput).toHaveValue(1678838400);
    });
  });

  it('should update the human-readable date when the timezone is changed', async () => {
    render(<TimestampConverter />);
    const unixInput = screen.getByLabelText('Unix Timestamp (seconds)');
    const humanInput = screen.getByLabelText('Human Readable Date/Time');
    const timezoneSelect = screen.getByLabelText('Timezone');

    await act(async () => {
      fireEvent.change(unixInput, { target: { value: '1678886400' } });
    });
    
    // Click on the select to open the dropdown
    await act(async () => {
      await userEvent.click(timezoneSelect);
    });
    
    // Find and click the America/New_York option
    const newYorkOption = await screen.findByText('America/New_York (Eastern Time)');
    await act(async () => {
      await userEvent.click(newYorkOption);
    });

    await waitFor(() => {
      expect(humanInput).toHaveValue('2023-03-15 09:20:00 -04:00');
    });
  });
});
