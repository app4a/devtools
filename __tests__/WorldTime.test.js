import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import WorldTime from '../components/WorldTime';

describe('WorldTime', () => {
  it('renders default cities', () => {
    render(<WorldTime name="World Time" description="View current times." />);

    expect(screen.getByText(/Local Time/i)).toBeInTheDocument();
    expect(screen.getByText(/New York/i)).toBeInTheDocument();
    expect(screen.getByText(/London/i)).toBeInTheDocument();
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
