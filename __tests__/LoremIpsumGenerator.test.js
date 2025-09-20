import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoremIpsumGenerator from '../components/LoremIpsumGenerator';

// Mock clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(() => Promise.resolve()),
  },
});

describe('LoremIpsumGenerator', () => {
  const defaultProps = {
    name: 'Lorem Ipsum Generator',
    description: 'Generate Lorem Ipsum placeholder text'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders component with title', () => {
    render(<LoremIpsumGenerator {...defaultProps} />);
    expect(screen.getByText('Lorem Ipsum Generator')).toBeInTheDocument();
  });

  test('renders generation settings', () => {
    render(<LoremIpsumGenerator {...defaultProps} />);
    expect(screen.getByText('Generation Settings')).toBeInTheDocument();
  });

  test('renders generated text area', () => {
    render(<LoremIpsumGenerator {...defaultProps} />);
    expect(screen.getByText('Generated Text')).toBeInTheDocument();
  });

  test('renders statistics section', () => {
    render(<LoremIpsumGenerator {...defaultProps} />);
    expect(screen.getByText('Statistics')).toBeInTheDocument();
  });

  test('renders regenerate button', () => {
    render(<LoremIpsumGenerator {...defaultProps} />);
    expect(screen.getByText('Regenerate')).toBeInTheDocument();
  });
});