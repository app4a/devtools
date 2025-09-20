import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import XmlFormatter from '../components/XmlFormatter';

// Mock clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(() => Promise.resolve()),
  },
});

describe('XmlFormatter', () => {
  const defaultProps = {
    name: 'XML Formatter & Validator',
    description: 'Format, validate, and process XML'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders component with title', () => {
    render(<XmlFormatter {...defaultProps} />);
    expect(screen.getByText('XML Formatter & Validator')).toBeInTheDocument();
  });

  test('renders settings section', () => {
    render(<XmlFormatter {...defaultProps} />);
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  test('renders tabs', () => {
    render(<XmlFormatter {...defaultProps} />);
    expect(screen.getByText('Input/Output')).toBeInTheDocument();
    expect(screen.getByText('XPath Tester')).toBeInTheDocument();
  });

  test('renders format buttons', () => {
    render(<XmlFormatter {...defaultProps} />);
    expect(screen.getByText('Format')).toBeInTheDocument();
    expect(screen.getByText('Minify')).toBeInTheDocument();
    expect(screen.getByText('To JSON')).toBeInTheDocument();
  });

  test('renders process button', () => {
    render(<XmlFormatter {...defaultProps} />);
    expect(screen.getByText('Format XML')).toBeInTheDocument();
  });

  test('renders statistics section', () => {
    render(<XmlFormatter {...defaultProps} />);
    expect(screen.getByText('Statistics')).toBeInTheDocument();
  });
});