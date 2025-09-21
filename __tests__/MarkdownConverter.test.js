import React from 'react';
import { render, screen } from '@testing-library/react';
import MarkdownConverter from '../components/MarkdownConverter';

describe('MarkdownConverter', () => {
  const defaultProps = {
    name: 'Markdown to HTML Converter',
    description: 'Convert Markdown to HTML with live preview'
  };

  test('renders the Markdown to HTML Converter component', () => {
    render(<MarkdownConverter {...defaultProps} />);
    expect(screen.getByText('Markdown to HTML Converter')).toBeInTheDocument();
  });
});
