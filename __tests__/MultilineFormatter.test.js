import { render, screen, fireEvent } from '@testing-library/react';
import MultilineFormatter from '../components/MultilineFormatter';

describe('MultilineFormatter', () => {
  it('formats multiline text with default wrap character', () => {
    render(<MultilineFormatter name="Multiline Formatter" description="Format multiline strings." />);

    const inputTextarea = screen.getByPlaceholderText(/Input Text/i);
    const outputTextarea = screen.getByPlaceholderText(/Output Text/i);

    fireEvent.change(inputTextarea, { target: { value: 'line1\nline2\nline3' } });

    expect(outputTextarea).toHaveValue("'line1',\n'line2',\n'line3',");
  });

  it('formats multiline text with custom wrap character', () => {
    render(<MultilineFormatter name="Multiline Formatter" description="Format multiline strings." />);

    const inputTextarea = screen.getByPlaceholderText(/Input Text/i);
    const wrapCharInput = screen.getByLabelText(/Wrap with/i);
    const outputTextarea = screen.getByPlaceholderText(/Output Text/i);

    fireEvent.change(inputTextarea, { target: { value: 'itemA\nitemB' } });
    fireEvent.change(wrapCharInput, { target: { value: '"' } });

    expect(outputTextarea).toHaveValue("\"itemA\",\n\"itemB\",");
  });

  it('formats multiline text with custom ends with character', () => {
    render(<MultilineFormatter name="Multiline Formatter" description="Format multiline strings." />);

    const inputTextarea = screen.getByPlaceholderText(/Input Text/i);
    const endsWithInput = screen.getByLabelText(/Ends with/i);
    const outputTextarea = screen.getByPlaceholderText(/Output Text/i);

    fireEvent.change(inputTextarea, { target: { value: 'apple\norange\nbanana' } });
    fireEvent.change(endsWithInput, { target: { value: ';' } });

    expect(outputTextarea).toHaveValue("'apple';\n'orange';\n'banana';");
  });

  it('formats multiline text with custom wrap and ends with characters', () => {
    render(<MultilineFormatter name="Multiline Formatter" description="Format multiline strings." />);

    const inputTextarea = screen.getByPlaceholderText(/Input Text/i);
    const wrapCharInput = screen.getByLabelText(/Wrap with/i);
    const endsWithInput = screen.getByLabelText(/Ends with/i);
    const outputTextarea = screen.getByPlaceholderText(/Output Text/i);

    fireEvent.change(inputTextarea, { target: { value: 'red\ngreen\nblue' } });
    fireEvent.change(wrapCharInput, { target: { value: '`' } });
    fireEvent.change(endsWithInput, { target: { value: ' +' } });

    expect(outputTextarea).toHaveValue("`red` +\n`green` +\n`blue` +");
  });

  it('handles empty ends with character', () => {
    render(<MultilineFormatter name="Multiline Formatter" description="Format multiline strings." />);

    const inputTextarea = screen.getByPlaceholderText(/Input Text/i);
    const endsWithInput = screen.getByLabelText(/Ends with/i);
    const outputTextarea = screen.getByPlaceholderText(/Output Text/i);

    fireEvent.change(inputTextarea, { target: { value: 'first\nsecond\nthird' } });
    fireEvent.change(endsWithInput, { target: { value: '' } });

    expect(outputTextarea).toHaveValue("'first'\n'second'\n'third'");
  });
});
