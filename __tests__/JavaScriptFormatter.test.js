import React from 'react';
import { render, screen } from '@testing-library/react';
import JavaScriptFormatter from '../components/JavaScriptFormatter';

describe('JavaScriptFormatter', () => {
  const defaultProps = {
    name: 'JavaScript Formatter & Minifier',
    description: 'Format and minify JavaScript'
  };

  test('renders the JavaScript Formatter component', () => {
    render(<JavaScriptFormatter {...defaultProps} />);
    expect(screen.getByText('JavaScript Formatter & Minifier')).toBeInTheDocument();
  });
});