import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import EmailTemplateBuilder from '../components/EmailTemplateBuilder';

// Mock clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(() => Promise.resolve()),
  },
});

describe('EmailTemplateBuilder', () => {
  const defaultProps = {
    name: 'Email Template Builder',
    description: 'Build responsive email templates with drag-and-drop interface'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders component with title', () => {
    render(<EmailTemplateBuilder {...defaultProps} />);
    expect(screen.getByText('Email Template Builder')).toBeInTheDocument();
  });

  test('renders builder tab', () => {
    render(<EmailTemplateBuilder {...defaultProps} />);
    expect(screen.getByText('Builder')).toBeInTheDocument();
  });

  test('renders preview tab', () => {
    render(<EmailTemplateBuilder {...defaultProps} />);
    expect(screen.getByText('Preview')).toBeInTheDocument();
  });

  test('renders HTML tab', () => {
    render(<EmailTemplateBuilder {...defaultProps} />);
    expect(screen.getByText('HTML')).toBeInTheDocument();
  });

  test('renders templates tab', () => {
    render(<EmailTemplateBuilder {...defaultProps} />);
    expect(screen.getByText('Templates')).toBeInTheDocument();
  });

  test('renders template name input', () => {
    render(<EmailTemplateBuilder {...defaultProps} />);
    expect(screen.getByLabelText('Template Name')).toBeInTheDocument();
  });

  test('renders subject line input', () => {
    render(<EmailTemplateBuilder {...defaultProps} />);
    expect(screen.getByLabelText('Subject Line')).toBeInTheDocument();
  });

  test('renders template info section', () => {
    render(<EmailTemplateBuilder {...defaultProps} />);
    expect(screen.getByText('Template Info')).toBeInTheDocument();
  });
});

