import React from 'react';
import { render, screen } from '@testing-library/react';
import TokenCounter from '../components/TokenCounter';

describe('TokenCounter', () => {
  const defaultProps = {
    name: 'OpenAI Token Counter & Cost Calculator',
    description: 'Count tokens and calculate OpenAI API costs'
  };

  test('renders the OpenAI Token Counter component', () => {
    render(<TokenCounter {...defaultProps} />);
    expect(screen.getByText('OpenAI Token Counter & Cost Calculator')).toBeInTheDocument();
  });
});
