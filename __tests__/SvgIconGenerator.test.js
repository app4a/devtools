import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SvgIconGenerator from '../components/SvgIconGenerator';

// Mock clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(() => Promise.resolve()),
  },
});

describe('SvgIconGenerator', () => {
  const defaultProps = {
    name: 'SVG Icon Generator',
    description: 'Create and edit SVG icons with templates and export options'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders component with title', () => {
    render(<SvgIconGenerator {...defaultProps} />);
    expect(screen.getByText('SVG Icon Generator')).toBeInTheDocument();
  });

  test('renders editor tab', () => {
    render(<SvgIconGenerator {...defaultProps} />);
    expect(screen.getByText('Editor')).toBeInTheDocument();
  });

  test('renders templates tab', () => {
    render(<SvgIconGenerator {...defaultProps} />);
    expect(screen.getByText('Templates')).toBeInTheDocument();
  });

  test('renders export tab', () => {
    render(<SvgIconGenerator {...defaultProps} />);
    expect(screen.getByText('Export')).toBeInTheDocument();
  });

  test('renders icon name input', () => {
    render(<SvgIconGenerator {...defaultProps} />);
    expect(screen.getByLabelText('Icon Name')).toBeInTheDocument();
  });

  test('renders SVG code section', () => {
    render(<SvgIconGenerator {...defaultProps} />);
    expect(screen.getByText('SVG Code')).toBeInTheDocument();
  });

  test('renders preview section', () => {
    render(<SvgIconGenerator {...defaultProps} />);
    expect(screen.getByText('Preview')).toBeInTheDocument();
  });
});

