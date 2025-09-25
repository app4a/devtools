import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import HttpBuilder from '../components/HttpBuilder';

// Mock clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(() => Promise.resolve()),
  },
});

describe('HttpBuilder', () => {
  const defaultProps = {
    name: 'HTTP Request Builder',
    description: 'Build and test HTTP requests with visual interface'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders component with title', () => {
    render(<HttpBuilder {...defaultProps} />);
    expect(screen.getByText('HTTP Request Builder')).toBeInTheDocument();
  });

  test('renders request tab', () => {
    render(<HttpBuilder {...defaultProps} />);
    expect(screen.getByText('Request')).toBeInTheDocument();
  });

  test('renders response tab', () => {
    render(<HttpBuilder {...defaultProps} />);
    expect(screen.getByText('Response')).toBeInTheDocument();
  });

  test('renders generate code tab', () => {
    render(<HttpBuilder {...defaultProps} />);
    expect(screen.getByText('Generate Code')).toBeInTheDocument();
  });

  test('renders history tab', () => {
    render(<HttpBuilder {...defaultProps} />);
    expect(screen.getByText('History')).toBeInTheDocument();
  });

  test('renders saved tab', () => {
    render(<HttpBuilder {...defaultProps} />);
    expect(screen.getByText('Saved')).toBeInTheDocument();
  });

  test('renders URL input', () => {
    render(<HttpBuilder {...defaultProps} />);
    expect(screen.getByLabelText('URL')).toBeInTheDocument();
  });

  test('renders request summary section', () => {
    render(<HttpBuilder {...defaultProps} />);
    expect(screen.getByText('Request Summary')).toBeInTheDocument();
  });
});

