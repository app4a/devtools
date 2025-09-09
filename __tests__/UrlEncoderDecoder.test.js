import { render, screen, fireEvent } from '@testing-library/react';
import UrlEncoderDecoder from '../components/UrlEncoderDecoder';

describe('UrlEncoderDecoder', () => {
  it('encodes URL correctly', () => {
    render(<UrlEncoderDecoder name="URL Encoder/Decoder" description="Encode or decode URLs." />);

    const inputTextarea = screen.getByLabelText(/Input URL\/Text/i);
    const encodeButton = screen.getByRole('button', { name: /Encode/i });
    const outputTextarea = screen.getByLabelText(/Output URL\/Text/i);

    fireEvent.change(inputTextarea, { target: { value: 'https://example.com?param=value with spaces' } });
    fireEvent.click(encodeButton);

    expect(outputTextarea).toHaveDisplayValue('https%3A%2F%2Fexample.com%3Fparam%3Dvalue%20with%20spaces');
  });

  it('decodes URL correctly', () => {
    render(<UrlEncoderDecoder name="URL Encoder/Decoder" description="Encode or decode URLs." />);

    const inputTextarea = screen.getByLabelText(/Input URL\/Text/i);
    const decodeButton = screen.getByRole('button', { name: /Decode/i });
    const outputTextarea = screen.getByLabelText(/Output URL\/Text/i);

    fireEvent.change(inputTextarea, { target: { value: 'https%3A%2F%2Fexample.com%3Fparam%3Dvalue%20with%20spaces' } });
    fireEvent.click(decodeButton);

    expect(outputTextarea).toHaveDisplayValue('https://example.com?param=value with spaces');
  });
});
