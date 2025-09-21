import React from 'react';
import { render, screen } from '@testing-library/react';
import MockDataGenerator from '../components/MockDataGenerator';

describe('MockDataGenerator', () => {
  const defaultProps = {
    name: 'AI-Powered Mock Data Generator',
    description: 'Generate realistic test data for applications'
  };

  test('renders the AI-Powered Mock Data Generator component', () => {
    render(<MockDataGenerator {...defaultProps} />);
    expect(screen.getByText('AI-Powered Mock Data Generator')).toBeInTheDocument();
  });
});
