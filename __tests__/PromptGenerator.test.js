import React from 'react';
import { render, screen } from '@testing-library/react';
import PromptGenerator from '../components/PromptGenerator';

describe('PromptGenerator', () => {
  const defaultProps = {
    name: 'AI Prompt Generator & Optimizer',
    description: 'Generate and optimize AI prompts'
  };

  test('renders the AI Prompt Generator component', () => {
    render(<PromptGenerator {...defaultProps} />);
    expect(screen.getByText('AI Prompt Generator & Optimizer')).toBeInTheDocument();
  });
});
