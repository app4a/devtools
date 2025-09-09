import { render, screen, fireEvent } from '@testing-library/react';
import JsonFormatter from '../components/JsonFormatter';

describe('JsonFormatter', () => {
  it('displays error for invalid JSON', () => {
    const { container } = render(<JsonFormatter name="JSON Formatter" description="Format and validate JSON data." />);

    const rawJsonInput = screen.getByPlaceholderText(/Paste your JSON here/i);
    fireEvent.change(rawJsonInput, { target: { value: 'invalid json' } });

    const formattedOutput = container.querySelector('.readonly-textarea');
    expect(formattedOutput).toHaveValue('Unexpected token \'i\', \"invalid json\" is not valid JSON');
  });

  it('formats valid JSON correctly', () => {
    const { container } = render(<JsonFormatter name="JSON Formatter" description="Format and validate JSON data." />);

    const rawJsonInput = screen.getByPlaceholderText(/Paste your JSON here/i);
    fireEvent.change(rawJsonInput, { target: { value: '{"key":"value"}' } });

    const formattedOutput = container.querySelector('.readonly-textarea');
    expect(formattedOutput).toHaveValue(`{
  "key": "value"
}`);
  });
});
