import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import NumberBaseConverter from '../components/NumberBaseConverter';

describe('NumberBaseConverter', () => {
  it('renders number base converter interface', () => {
    render(<NumberBaseConverter name="Number Base Converter" description="Convert number bases" />);
    
    expect(screen.getByText('Number Base Converter')).toBeInTheDocument();
    expect(screen.getByText('Convert number bases')).toBeInTheDocument();
    expect(screen.getByText('Number Conversion')).toBeInTheDocument();
    expect(screen.getByText(/All Base Conversions/)).toBeInTheDocument();
  });

  it('has input field with default value', () => {
    render(<NumberBaseConverter name="Number Base Converter" description="Convert number bases" />);
    
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input.value).toBe('255');
  });

  it('shows base selection dropdowns', () => {
    render(<NumberBaseConverter name="Number Base Converter" description="Convert number bases" />);
    
    const comboboxes = screen.getAllByRole('combobox');
    expect(comboboxes).toHaveLength(2); // From Base and To Base
  });

  it('shows conversion results table', () => {
    render(<NumberBaseConverter name="Number Base Converter" description="Convert number bases" />);
    
    expect(screen.getByText('Binary')).toBeInTheDocument();
    expect(screen.getByText('Octal')).toBeInTheDocument();
    expect(screen.getByText('Decimal')).toBeInTheDocument();
    expect(screen.getByText('Hexadecimal')).toBeInTheDocument();
  });

  it('shows quick examples section', () => {
    render(<NumberBaseConverter name="Number Base Converter" description="Convert number bases" />);

    expect(screen.getByText('Quick Examples')).toBeInTheDocument();
    expect(screen.getByText('Programming Numbers')).toBeInTheDocument();
    expect(screen.getByText('Basic Numbers')).toBeInTheDocument();
  });

  it('updates input value when typing', () => {
    render(<NumberBaseConverter name="Number Base Converter" description="Convert number bases" />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '123' } });
    
    expect(input.value).toBe('123');
  });
});
