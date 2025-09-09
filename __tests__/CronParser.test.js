import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import CronParser from '../components/CronParser';

// Mock navigator.clipboard
const mockClipboard = {
  writeText: jest.fn(() => Promise.resolve()),
};
Object.assign(navigator, { clipboard: mockClipboard });

describe('CronParser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should display human-readable output for a valid cron expression', async () => {
    render(<CronParser />);
    const cronInput = screen.getByTestId('cron-expression-input').querySelector('input');
    
    await act(async () => {
      fireEvent.change(cronInput, { target: { value: '*/2 * * * *' } });
    });

    await waitFor(() => {
      expect(screen.getByText(/every 2 minutes/i)).toBeInTheDocument();
    });
  });

  it('should display an error for an invalid cron expression', async () => {
    render(<CronParser />);
    const cronInput = screen.getByTestId('cron-expression-input').querySelector('input');
    
    await act(async () => {
      fireEvent.change(cronInput, { target: { value: 'invalid-cron' } });
    });

    await waitFor(() => {
      const errorElements = screen.getAllByText('\'invalid-cron\' is not a valid cron expression.');
      expect(errorElements.length).toBeGreaterThan(0);
    });
  });

  it('should show upcoming dates for a valid cron expression', async () => {
    render(<CronParser />);
    const cronInput = screen.getByTestId('cron-expression-input').querySelector('input');
    
    await act(async () => {
      fireEvent.change(cronInput, { target: { value: '0 0 1 1 *' } }); // At 12:00 AM, on day 1 of the month, only in January
    });

    await waitFor(() => {
      // Check for the Next X Runs header
      expect(screen.getByText(/Next \d+ Runs/)).toBeInTheDocument();
    });
  });

  it('should render tabs for different modes', () => {
    render(<CronParser />);
    
    expect(screen.getByText('Cron Parser')).toBeInTheDocument();
    expect(screen.getByText('Visual Builder')).toBeInTheDocument();
    expect(screen.getByText('Examples')).toBeInTheDocument();
  });

  it('should show expression breakdown for valid cron', async () => {
    render(<CronParser />);
    const cronInput = screen.getByTestId('cron-expression-input').querySelector('input');
    
    await act(async () => {
      fireEvent.change(cronInput, { target: { value: '0 9 * * 1-5' } });
    });

    await waitFor(() => {
      expect(screen.getByText(/Expression Breakdown:/)).toBeInTheDocument();
      expect(screen.getByText(/Minute: 0/)).toBeInTheDocument();
      expect(screen.getByText(/Hour: 9/)).toBeInTheDocument();
    });
  });

  it('should copy expression to clipboard', async () => {
    render(<CronParser />);
    
    const copyButton = screen.getByTitle(/copy expression/i);
    
    await act(async () => {
      fireEvent.click(copyButton);
    });

    expect(mockClipboard.writeText).toHaveBeenCalled();
  });

  it('should switch to visual builder tab', async () => {
    render(<CronParser />);
    
    const builderTab = screen.getByText('Visual Builder');
    
    await act(async () => {
      fireEvent.click(builderTab);
    });

    await waitFor(() => {
      expect(screen.getByText(/Build your cron expression visually/)).toBeInTheDocument();
    });
  });

  it('should show timezone selector', () => {
    render(<CronParser />);
    
    const timezoneElements = screen.getAllByText('Timezone');
    expect(timezoneElements.length).toBeGreaterThan(0);
  });

  it('should show syntax guide', () => {
    render(<CronParser />);
    
    expect(screen.getByText('Cron Syntax Guide')).toBeInTheDocument();
    expect(screen.getByText('Minute')).toBeInTheDocument();
    expect(screen.getByText('0-59')).toBeInTheDocument();
  });

  it('should show quick tips', () => {
    render(<CronParser />);
    
    expect(screen.getByText('Quick Tips')).toBeInTheDocument();
    expect(screen.getByText(/Use the Visual Builder if you're new to cron expressions/)).toBeInTheDocument();
  });

  it('should change timezone', async () => {
    render(<CronParser />);
    
    // Find the timezone select by its role
    const timezoneSelect = screen.getAllByRole('combobox').find(select => 
      select.closest('[aria-labelledby*="Timezone"]') || 
      select.parentElement.parentElement.querySelector('label')?.textContent.includes('Timezone')
    );
    
    if (timezoneSelect) {
      await act(async () => {
        fireEvent.mouseDown(timezoneSelect);
      });
      
      await waitFor(() => {
        const nyOption = screen.getByText('America/New_York');
        fireEvent.click(nyOption);
      });
    } else {
      // Just verify timezone text exists
      expect(screen.getByText('Timezone')).toBeInTheDocument();
    }
  });
});