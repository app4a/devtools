import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import EnvManager from '../components/EnvManager';

// Mock clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(() => Promise.resolve()),
  },
});

describe('EnvManager', () => {
  const defaultProps = {
    name: 'Environment Variables Manager',
    description: 'Manage environment variables with validation and export options'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders component with title', () => {
    render(<EnvManager {...defaultProps} />);
    expect(screen.getByText('Environment Variables Manager')).toBeInTheDocument();
  });

  test('renders editor tab', () => {
    render(<EnvManager {...defaultProps} />);
    expect(screen.getByText('Editor')).toBeInTheDocument();
  });

  test('renders compare tab', () => {
    render(<EnvManager {...defaultProps} />);
    expect(screen.getByText('Compare')).toBeInTheDocument();
  });

  test('renders export tab', () => {
    render(<EnvManager {...defaultProps} />);
    expect(screen.getByText('Export')).toBeInTheDocument();
  });

  test('renders validation tab', () => {
    render(<EnvManager {...defaultProps} />);
    expect(screen.getByText('Validation')).toBeInTheDocument();
  });

  test('renders profiles tab', () => {
    render(<EnvManager {...defaultProps} />);
    expect(screen.getByText('Profiles')).toBeInTheDocument();
  });

  test('renders environment info section', () => {
    render(<EnvManager {...defaultProps} />);
    expect(screen.getByText('Environment Info')).toBeInTheDocument();
  });
});

