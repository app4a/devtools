import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Base64Converter from '../components/Base64Converter';

// Mock navigator.clipboard
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn().mockImplementation(() => Promise.resolve()),
  },
});

describe('Base64Converter', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('encodes text correctly', async () => {
    render(<Base64Converter name="Base64 Encoder/Decoder" description="Encode or decode text using Base64." />);

    const inputTextarea = screen.getByPlaceholderText(/Enter text to encode/i);
    const encodeButton = screen.getByRole('button', { name: 'encode' });

    // Clear the default text and enter test text
    fireEvent.change(inputTextarea, { target: { value: 'hello' } });
    
    // Ensure encode mode is selected
    fireEvent.click(encodeButton);

    // Wait for the output to be processed
    await waitFor(() => {
      const outputTextareas = screen.getAllByRole('textbox');
      const outputTextarea = outputTextareas.find(textarea => textarea.readOnly);
      expect(outputTextarea).toHaveValue('aGVsbG8=');
    });
  });

  it('decodes text correctly', async () => {
    render(<Base64Converter name="Base64 Encoder/Decoder" description="Encode or decode text using Base64." />);

    const inputTextarea = screen.getByPlaceholderText(/Enter text to encode/i);
    const decodeButton = screen.getByRole('button', { name: 'decode' });

    // Switch to decode mode
    fireEvent.click(decodeButton);
    
    // Enter encoded text
    fireEvent.change(inputTextarea, { target: { value: 'aGVsbG8=' } });

    // Wait for the output to be processed
    await waitFor(() => {
      const outputTextareas = screen.getAllByRole('textbox');
      const outputTextarea = outputTextareas.find(textarea => textarea.readOnly);
      expect(outputTextarea).toHaveValue('hello');
    });
  });

  it('handles Unicode characters correctly', async () => {
    render(<Base64Converter name="Base64 Encoder/Decoder" description="Encode or decode text using Base64." />);

    const inputTextarea = screen.getByPlaceholderText(/Enter text to encode/i);

    // Test Unicode characters
    fireEvent.change(inputTextarea, { target: { value: 'Hello, 🌍!' } });

    await waitFor(() => {
      const outputTextareas = screen.getAllByRole('textbox');
      const outputTextarea = outputTextareas.find(textarea => textarea.readOnly);
      expect(outputTextarea.value).toBeTruthy();
      expect(outputTextarea.value).not.toContain('Error:');
    });
  });

  it('handles empty input correctly', async () => {
    render(<Base64Converter name="Base64 Encoder/Decoder" description="Encode or decode text using Base64." />);

    const inputTextarea = screen.getByPlaceholderText(/Enter text to encode/i);

    // Clear the input
    fireEvent.change(inputTextarea, { target: { value: '' } });

    await waitFor(() => {
      const outputTextareas = screen.getAllByRole('textbox');
      const outputTextarea = outputTextareas.find(textarea => textarea.readOnly);
      expect(outputTextarea).toHaveValue('');
    });
  });

  it('swaps input and output correctly', async () => {
    render(<Base64Converter name="Base64 Encoder/Decoder" description="Encode or decode text using Base64." />);

    const inputTextarea = screen.getByPlaceholderText(/Enter text to encode/i);

    // Enter some text
    fireEvent.change(inputTextarea, { target: { value: 'test' } });

    // Wait for encoding to complete
    await waitFor(() => {
      const outputTextareas = screen.getAllByRole('textbox');
      const outputTextarea = outputTextareas.find(textarea => textarea.readOnly);
      expect(outputTextarea).toHaveValue('dGVzdA==');
    });

    // Find and click swap button
    const swapButton = screen.getByTestId('SwapVertIcon').closest('button');
    fireEvent.click(swapButton);

    // Check that input and output are swapped and mode changed
    await waitFor(() => {
      expect(inputTextarea).toHaveValue('dGVzdA==');
      const outputTextareas = screen.getAllByRole('textbox');
      const outputTextarea = outputTextareas.find(textarea => textarea.readOnly);
      expect(outputTextarea).toHaveValue('test');
    });
  });

  it('copies output to clipboard', async () => {
    render(<Base64Converter name="Base64 Encoder/Decoder" description="Encode or decode text using Base64." />);

    const inputTextarea = screen.getByPlaceholderText(/Enter text to encode/i);

    // Enter some text
    fireEvent.change(inputTextarea, { target: { value: 'test' } });

    // Wait for encoding to complete
    await waitFor(() => {
      const outputTextareas = screen.getAllByRole('textbox');
      const outputTextarea = outputTextareas.find(textarea => textarea.readOnly);
      expect(outputTextarea).toHaveValue('dGVzdA==');
    });

    // Find and click copy button
    const copyButton = screen.getByTestId('ContentCopyIcon').closest('button');
    fireEvent.click(copyButton);

    // Verify clipboard API was called
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('dGVzdA==');
  });

  it('uses example data when clicked', async () => {
    render(<Base64Converter name="Base64 Encoder/Decoder" description="Encode or decode text using Base64." />);

    const inputTextarea = screen.getByPlaceholderText(/Enter text to encode/i);

    // Find and click on an example (the table cells should be clickable)
    const tableRows = screen.getAllByRole('row');
    if (tableRows.length > 1) { // Skip header row
      fireEvent.click(tableRows[1]); // Click first example row

      // Check that input was updated
      await waitFor(() => {
        expect(inputTextarea.value).toBeTruthy();
      });
    }
  });
});
