import { render, screen, fireEvent } from '@testing-library/react';
import Base64Converter from '../components/Base64Converter';

describe('Base64Converter', () => {
  it('encodes text correctly', () => {
    render(<Base64Converter name="Base64 Encoder/Decoder" description="Encode or decode text using Base64." />);

    const inputTextarea = screen.getByLabelText(/Input Text/i);
    const encodeButton = screen.getByRole('button', { name: /Encode/i });
    const outputTextarea = screen.getByLabelText(/Output Text/i);

    fireEvent.change(inputTextarea, { target: { value: 'hello' } });
    fireEvent.click(encodeButton);

    expect(outputTextarea).toHaveDisplayValue('aGVsbG8=');
  });

  it('decodes text correctly', () => {
    render(<Base64Converter name="Base64 Encoder/Decoder" description="Encode or decode text using Base64." />);

    const inputTextarea = screen.getByLabelText(/Input Text/i);
    const decodeButton = screen.getByRole('button', { name: /Decode/i });
    const outputTextarea = screen.getByLabelText(/Output Text/i);

    fireEvent.change(inputTextarea, { target: { value: 'aGVsbG8=' } });
    fireEvent.click(decodeButton);

    expect(outputTextarea).toHaveDisplayValue('hello');
  });
});
