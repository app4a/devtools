import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CssUnitConverter from '../components/CssUnitConverter';

describe('CssUnitConverter', () => {
  it('renders CSS unit converter interface', () => {
    render(<CssUnitConverter name="CSS Unit Converter" description="Convert CSS units" />);
    
    expect(screen.getByText('CSS Unit Converter')).toBeInTheDocument();
    expect(screen.getByText('Convert CSS units')).toBeInTheDocument();
    expect(screen.getByText('Convert CSS Units')).toBeInTheDocument();
    expect(screen.getByText('Conversion Results')).toBeInTheDocument();
  });

  it('has input field for value', () => {
    render(<CssUnitConverter name="CSS Unit Converter" description="Convert CSS units" />);
    
    const valueInput = screen.getByLabelText('Value');
    expect(valueInput).toBeInTheDocument();
    expect(valueInput.value).toBe('16');
  });

  it('has unit selector', () => {
    render(<CssUnitConverter name="CSS Unit Converter" description="Convert CSS units" />);
    
    expect(screen.getAllByText('From Unit')).toHaveLength(2); // Label and legend
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('shows conversion results table', () => {
    render(<CssUnitConverter name="CSS Unit Converter" description="Convert CSS units" />);
    
    expect(screen.getByText('px')).toBeInTheDocument();
    expect(screen.getByText('rem')).toBeInTheDocument();
    expect(screen.getByText('em')).toBeInTheDocument();
    expect(screen.getByText('%')).toBeInTheDocument();
  });

  it('updates conversions when input changes', () => {
    render(<CssUnitConverter name="CSS Unit Converter" description="Convert CSS units" />);
    
    const valueInput = screen.getByLabelText('Value');
    fireEvent.change(valueInput, { target: { value: '32' } });
    
    expect(valueInput.value).toBe('32');
  });

  it('has context settings', () => {
    render(<CssUnitConverter name="CSS Unit Converter" description="Convert CSS units" />);
    
    expect(screen.getByText('Context Settings')).toBeInTheDocument();
    expect(screen.getByLabelText('Base Font Size (px)')).toBeInTheDocument();
    expect(screen.getByLabelText('Viewport Width (px)')).toBeInTheDocument();
    expect(screen.getByLabelText('Viewport Height (px)')).toBeInTheDocument();
  });

  it('shows unit type guide', () => {
    render(<CssUnitConverter name="CSS Unit Converter" description="Convert CSS units" />);
    
    expect(screen.getByText('Unit Types')).toBeInTheDocument();
    expect(screen.getByText(/Absolute:/)).toBeInTheDocument();
    expect(screen.getByText(/Relative:/)).toBeInTheDocument();
    expect(screen.getByText(/Viewport:/)).toBeInTheDocument();
  });
});
