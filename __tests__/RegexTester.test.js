import { render, screen, fireEvent } from '@testing-library/react';
import RegexTester from '../components/RegexTester';

describe('RegexTester', () => {
  it('highlights matches and displays capture groups correctly', () => {
    render(<RegexTester name="Regex Tester" description="Test regular expressions." />);

    const regexInput = screen.getByLabelText(/Regular Expression/i);
    const textInput = screen.getByLabelText(/Text/i);

    fireEvent.change(regexInput, { target: { value: 'hello (world)' } });
    fireEvent.change(textInput, { target: { value: 'hello world, this is a test' } });

    // Check if the highlighted text contains the mark tag for the match
    const resultOutput = screen.getByText(/Result/i).parentElement.querySelector('div');
    expect(resultOutput).toContainHTML('<mark>hello world</mark>');

    // Check for capture groups
    expect(screen.getByText(/Match 1: hello world/i)).toBeInTheDocument();
    expect(screen.getByText(/Group 1/i)).toBeInTheDocument();
    const group1 = screen.getByText(/Group 1/i).parentElement.querySelector('code');
    expect(group1).toHaveTextContent('world');
  });

  it('displays error for invalid regex', () => {
    render(<RegexTester name="Regex Tester" description="Test regular expressions." />);

    const regexInput = screen.getByLabelText(/Regular Expression/i);
    fireEvent.change(regexInput, { target: { value: '(' } });

    expect(screen.getByText(/Invalid regular expression/i)).toBeInTheDocument();
  });
});
