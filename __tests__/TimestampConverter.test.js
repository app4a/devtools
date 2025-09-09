import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TimestampConverter from '../components/TimestampConverter';

// Mock navigator.clipboard
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn().mockImplementation(() => Promise.resolve()),
  },
});

describe('TimestampConverter', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with default current time', () => {
    render(<TimestampConverter name="Timestamp Converter" description="Convert between Unix timestamps and human-readable dates." />);
    
    expect(screen.getByText('Timestamp Converter')).toBeInTheDocument();
    expect(screen.getByText('Convert between Unix timestamps and human-readable dates.')).toBeInTheDocument();
    expect(screen.getByText('Current Time')).toBeInTheDocument();
  });

  it('converts Unix timestamp to human-readable date', async () => {
    render(<TimestampConverter name="Timestamp Converter" description="Test description" />);
    
    const unixInput = screen.getByLabelText('Unix Timestamp (seconds)');
    fireEvent.change(unixInput, { target: { value: '1678886400' } });
    
    await waitFor(() => {
      const humanInput = screen.getByLabelText('Human Readable Date/Time');
      expect(humanInput.value).toContain('2023-03-15');
    });
  });

  it('converts human-readable date to Unix timestamp', async () => {
    render(<TimestampConverter name="Timestamp Converter" description="Test description" />);
    
    const humanInput = screen.getByLabelText('Human Readable Date/Time');
    fireEvent.change(humanInput, { target: { value: '2023-03-15 12:00:00 +00:00' } });
    
    await waitFor(() => {
      const unixInput = screen.getByLabelText('Unix Timestamp (seconds)');
      expect(unixInput.value).toBe('1678886400');
    });
  });

  it('uses current time when refresh button is clicked', async () => {
    render(<TimestampConverter name="Timestamp Converter" description="Test description" />);
    
    const refreshButton = screen.getByRole('button', { name: /Use Current Time/i });
    fireEvent.click(refreshButton);
    
    await waitFor(() => {
      const unixInput = screen.getByLabelText('Unix Timestamp (seconds)');
      expect(unixInput.value).toBeTruthy();
    });
  });

  it('changes timezone display', async () => {
    render(<TimestampConverter name="Timestamp Converter" description="Test description" />);
    
    const unixInput = screen.getByLabelText('Unix Timestamp (seconds)');
    fireEvent.change(unixInput, { target: { value: '1678886400' } });
    
    await waitFor(() => {
      const humanInput = screen.getByLabelText('Human Readable Date/Time');
      expect(humanInput.value).toContain('2023-03-15');
    });
    
    const timezoneSelect = screen.getByLabelText('Select Timezone');
    fireEvent.mouseDown(timezoneSelect);
    
    const nyOption = await screen.findByText(/New_York/);
    fireEvent.click(nyOption);
    
    await waitFor(() => {
      const humanInput = screen.getByLabelText('Human Readable Date/Time');
      expect(humanInput.value).toBeTruthy();
    });
  });

  it('displays format options when valid date is set', async () => {
    render(<TimestampConverter name="Timestamp Converter" description="Test description" />);
    
    const unixInput = screen.getByLabelText('Unix Timestamp (seconds)');
    fireEvent.change(unixInput, { target: { value: '1678886400' } });
    
    await waitFor(() => {
      expect(screen.getByText('Different Formats')).toBeInTheDocument();
      expect(screen.getByText('ISO Date Time')).toBeInTheDocument();
      expect(screen.getByText('Date Only')).toBeInTheDocument();
      expect(screen.getByText('Time Only')).toBeInTheDocument();
    });
  });

  it('shows preset time options', () => {
    render(<TimestampConverter name="Timestamp Converter" description="Test description" />);
    
    expect(screen.getByText('Quick Presets')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Now/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Epoch \(1970\)/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Y2K \(2000\)/i })).toBeInTheDocument();
  });

  it('uses preset times when clicked', async () => {
    render(<TimestampConverter name="Timestamp Converter" description="Test description" />);
    
    const epochButton = screen.getByRole('button', { name: /Epoch \(1970\)/i });
    fireEvent.click(epochButton);
    
    await waitFor(() => {
      const unixInput = screen.getByLabelText('Unix Timestamp (seconds)');
      expect(unixInput.value).toBe('0');
    });
  });

  it('displays current selection info', async () => {
    render(<TimestampConverter name="Timestamp Converter" description="Test description" />);
    
    const unixInput = screen.getByLabelText('Unix Timestamp (seconds)');
    fireEvent.change(unixInput, { target: { value: '1678886400' } });
    
    await waitFor(() => {
      expect(screen.getByText('Current Selection')).toBeInTheDocument();
      expect(screen.getByText(/Timestamp:/)).toBeInTheDocument();
      expect(screen.getByText(/Milliseconds:/)).toBeInTheDocument();
      expect(screen.getByText(/ISO String:/)).toBeInTheDocument();
    });
  });

  it('copies values to clipboard when copy buttons are clicked', async () => {
    render(<TimestampConverter name="Timestamp Converter" description="Test description" />);
    
    const unixInput = screen.getByLabelText('Unix Timestamp (seconds)');
    fireEvent.change(unixInput, { target: { value: '1678886400' } });
    
    await waitFor(() => {
      const copyButtons = screen.getAllByTestId('ContentCopyIcon');
      if (copyButtons.length > 0) {
        fireEvent.click(copyButtons[0].closest('button'));
        expect(navigator.clipboard.writeText).toHaveBeenCalledWith('1678886400');
      }
    });
  });

  it('handles empty input correctly', async () => {
    render(<TimestampConverter name="Timestamp Converter" description="Test description" />);
    
    const unixInput = screen.getByLabelText('Unix Timestamp (seconds)');
    fireEvent.change(unixInput, { target: { value: '' } });
    
    await waitFor(() => {
      const humanInput = screen.getByLabelText('Human Readable Date/Time');
      expect(humanInput.value).toBe('');
    });
  });
});
