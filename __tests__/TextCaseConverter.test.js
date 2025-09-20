import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import TextCaseConverter from '../components/TextCaseConverter';

// Mock clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(() => Promise.resolve()),
  },
});

describe('TextCaseConverter', () => {
  const defaultProps = {
    name: 'Text Case Converter',
    description: 'Convert text between different cases'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders component with title', () => {
    render(<TextCaseConverter {...defaultProps} />);
    expect(screen.getByText('Text Case Converter')).toBeInTheDocument();
  });

  test('renders input section', () => {
    render(<TextCaseConverter {...defaultProps} />);
    expect(screen.getByText('Input Text')).toBeInTheDocument();
  });

  test('renders case conversion results', () => {
    render(<TextCaseConverter {...defaultProps} />);
    expect(screen.getByText('Converted Cases')).toBeInTheDocument();
  });

  test('renders statistics section', () => {
    render(<TextCaseConverter {...defaultProps} />);
    expect(screen.getByText('Statistics')).toBeInTheDocument();
  });

  test('displays case types', () => {
    render(<TextCaseConverter {...defaultProps} />);
    expect(screen.getAllByText('camelCase')[0]).toBeInTheDocument();
  });
});