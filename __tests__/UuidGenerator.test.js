import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import UuidGenerator from '../components/UuidGenerator';

// Mock clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(() => Promise.resolve()),
  },
});

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage
});

describe('UuidGenerator', () => {
  const defaultProps = {
    name: 'UUID/GUID Generator',
    description: 'Generate UUIDs and GUIDs'
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockLocalStorage.getItem.mockReturnValue(null);
  });

  test('renders component with title', () => {
    render(<UuidGenerator {...defaultProps} />);
    expect(screen.getByText('UUID/GUID Generator')).toBeInTheDocument();
  });

  test('renders generation settings', () => {
    render(<UuidGenerator {...defaultProps} />);
    expect(screen.getByText('Generation Settings')).toBeInTheDocument();
  });

  test('renders generate buttons', () => {
    render(<UuidGenerator {...defaultProps} />);
    expect(screen.getByText('Generate Single')).toBeInTheDocument();
  });

  test('renders results section', () => {
    render(<UuidGenerator {...defaultProps} />);
    expect(screen.getByText(/Generated UUIDs/)).toBeInTheDocument();
  });

  test('renders statistics section', () => {
    render(<UuidGenerator {...defaultProps} />);
    expect(screen.getByText('Statistics')).toBeInTheDocument();
  });
});