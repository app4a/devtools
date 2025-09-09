import { render, screen, fireEvent } from '@testing-library/react';
import HashGenerator from '../components/HashGenerator';

describe('HashGenerator', () => {
  it('generates MD5 hash correctly', () => {
    render(<HashGenerator name="Hash Generator" description="Generate various hashes." />);

    const textInput = screen.getByLabelText(/Text to Hash/i);
    const generateButton = screen.getByRole('button', { name: /Generate Hashes/i });

    fireEvent.change(textInput, { target: { value: 'test' } });
    fireEvent.click(generateButton);

    expect(screen.getByText(/MD5/i)).toBeInTheDocument();
    expect(screen.getByText(/098f6bcd4621d373cade4e832627b4f6/i)).toBeInTheDocument();
  });
});
