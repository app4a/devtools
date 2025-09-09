import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import WorldTime from '../components/WorldTime';

describe('WorldTime', () => {
  it('renders default cities', () => {
    render(<WorldTime name="World Time" description="View current times." />);

    expect(screen.getByText(/Local Time/i)).toBeInTheDocument();
    expect(screen.getAllByText(/New York/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/London/i).length).toBeGreaterThan(0);
    
    // Check for new tabbed interface
    expect(screen.getByText('World Clock')).toBeInTheDocument();
    expect(screen.getByText('Meeting Planner')).toBeInTheDocument();
    expect(screen.getByText('Time Converter')).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Business Hours/i })).toBeInTheDocument();
  });

  it('adds a new city', async () => {
    render(<WorldTime name="World Time" description="View current times." />);

    const addCityInput = screen.getByLabelText(/Add City/i);
    fireEvent.change(addCityInput, { target: { value: 'Paris' } });
    fireEvent.keyDown(addCityInput, { key: 'ArrowDown' });
    fireEvent.keyDown(addCityInput, { key: 'Enter' });

    await waitFor(() => {
      expect(screen.getByText(/Paris/i)).toBeInTheDocument();
    });
  });
});
