import React from 'react';
import { render, screen } from '@testing-library/react';
import CsvConverter from '../components/CsvConverter';

describe('CsvConverter', () => {
  const defaultProps = {
    name: 'CSV to JSON/XML Converter',
    description: 'Convert between CSV, JSON, and XML formats'
  };

  test('renders the CSV to JSON/XML Converter component', () => {
    render(<CsvConverter {...defaultProps} />);
    expect(screen.getByText('CSV ↔ JSON ↔ XML Converter')).toBeInTheDocument();
  });
});
