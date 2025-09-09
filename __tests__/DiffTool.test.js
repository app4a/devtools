import { render, screen, fireEvent } from '@testing-library/react';
import DiffTool from '../components/DiffTool';

describe('DiffTool', () => {
  it('renders without crashing and updates text areas', () => {
    render(<DiffTool name="Diff Tool" description="Compare two text inputs." />);

    const originalTextArea = screen.getByPlaceholderText(/Original Text/i);
    const modifiedTextArea = screen.getByPlaceholderText(/Modified Text/i);

    fireEvent.change(originalTextArea, { target: { value: 'line 1\nline 2' } });
    fireEvent.change(modifiedTextArea, { target: { value: 'line A\nline 2' } });

    expect(originalTextArea).toHaveValue('line 1\nline 2');
    expect(modifiedTextArea).toHaveValue('line A\nline 2');
  });
});
