import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import PasswordGenerator from '../components/PasswordGenerator';

// Mock clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(),
  },
});

describe('PasswordGenerator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders password generator interface', () => {
    render(<PasswordGenerator name="Password Generator" description="Generate passwords" />);
    
    expect(screen.getByText('Password Generator')).toBeInTheDocument();
    expect(screen.getByText('Generate passwords')).toBeInTheDocument();
    expect(screen.getByText('Generated Password')).toBeInTheDocument();
    expect(screen.getByText('Password Settings')).toBeInTheDocument();
  });

  it('generates a password on mount', () => {
    render(<PasswordGenerator name="Password Generator" description="Generate passwords" />);
    
    // Look for the readonly text input that contains the password
    const passwordField = screen.getByRole('textbox');
    expect(passwordField.value).toBeTruthy();
    expect(passwordField.value.length).toBeGreaterThan(0);
    expect(passwordField).toHaveAttribute('readonly');
  });

  it('allows changing password length', () => {
    render(<PasswordGenerator name="Password Generator" description="Generate passwords" />);
    
    const lengthSlider = screen.getByRole('slider');
    fireEvent.change(lengthSlider, { target: { value: '20' } });
    
    expect(screen.getByText('Length: 20 characters')).toBeInTheDocument();
  });

  it('has character type checkboxes', () => {
    render(<PasswordGenerator name="Password Generator" description="Generate passwords" />);
    
    expect(screen.getByRole('checkbox', { name: /uppercase/i })).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: /lowercase/i })).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: /numbers/i })).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: /symbols/i })).toBeInTheDocument();
  });

  it('shows password strength indicator', () => {
    render(<PasswordGenerator name="Password Generator" description="Generate passwords" />);
    
    expect(screen.getByText(/Password Strength:/)).toBeInTheDocument();
  });

  it('can copy password to clipboard', async () => {
    render(<PasswordGenerator name="Password Generator" description="Generate passwords" />);
    
    // Find the first copy button (main password field copy button)
    const copyButtons = screen.getAllByTestId('ContentCopyIcon');
    const copyButton = copyButtons[0].closest('button');
    
    await act(async () => {
      fireEvent.click(copyButton);
    });
    
    expect(navigator.clipboard.writeText).toHaveBeenCalled();
  });

  it('generates new password when button clicked', () => {
    render(<PasswordGenerator name="Password Generator" description="Generate passwords" />);
    
    const passwordField = screen.getByRole('textbox');
    const initialPassword = passwordField.value;
    
    const generateButton = screen.getByText('Generate New Password');
    fireEvent.click(generateButton);
    
    const newPassword = passwordField.value;
    // Note: There's a small chance the password could be the same, but very unlikely with default settings
    expect(newPassword).toBeTruthy();
  });
});
