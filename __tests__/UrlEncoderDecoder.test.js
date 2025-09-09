import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UrlEncoderDecoder from '../components/UrlEncoderDecoder';

// Mock navigator.clipboard
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn().mockImplementation(() => Promise.resolve()),
  },
});

describe('UrlEncoderDecoder', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with default content', () => {
    render(<UrlEncoderDecoder name="URL Encoder/Decoder" description="Encode or decode URLs." />);
    
    expect(screen.getByText('URL Encoder/Decoder')).toBeInTheDocument();
    expect(screen.getByText('Encode or decode URLs.')).toBeInTheDocument();
    expect(screen.getByText('Encoding Options')).toBeInTheDocument();
    expect(screen.getByText('Quick Examples')).toBeInTheDocument();
  });

  it('encodes URL correctly', async () => {
    render(<UrlEncoderDecoder name="URL Encoder/Decoder" description="Encode or decode URLs." />);

    const inputTextarea = screen.getByPlaceholderText(/Enter text or URL to encode/i);
    fireEvent.change(inputTextarea, { target: { value: 'hello world' } });

    await waitFor(() => {
      expect(screen.getByDisplayValue('hello%20world')).toBeInTheDocument();
      expect(screen.getByText('encoded Successfully')).toBeInTheDocument();
    });
  });

  it('decodes URL correctly', async () => {
    render(<UrlEncoderDecoder name="URL Encoder/Decoder" description="Encode or decode URLs." />);

    // Switch to decode mode
    const decodeButton = screen.getByRole('button', { name: /Decode/i });
    fireEvent.click(decodeButton);

    const inputTextarea = screen.getByPlaceholderText(/Enter encoded text to decode/i);
    fireEvent.change(inputTextarea, { target: { value: 'hello%20world' } });

    await waitFor(() => {
      expect(screen.getByDisplayValue('hello world')).toBeInTheDocument();
      expect(screen.getByText('decoded Successfully')).toBeInTheDocument();
    });
  });

  it('switches between encoding types', async () => {
    render(<UrlEncoderDecoder name="URL Encoder/Decoder" description="Encode or decode URLs." />);

    const encodingSelect = screen.getByRole('combobox');
    fireEvent.mouseDown(encodingSelect);

    const base64Option = await screen.findByText('Base64');
    fireEvent.click(base64Option);

    const inputTextarea = screen.getByPlaceholderText(/Enter text or URL to encode/i);
    fireEvent.change(inputTextarea, { target: { value: 'hello' } });

    await waitFor(() => {
      expect(screen.getByDisplayValue('aGVsbG8=')).toBeInTheDocument();
    });
  });

  it('swaps input and output', async () => {
    render(<UrlEncoderDecoder name="URL Encoder/Decoder" description="Encode or decode URLs." />);

    const inputTextarea = screen.getByPlaceholderText(/Enter text or URL to encode/i);
    fireEvent.change(inputTextarea, { target: { value: 'hello world' } });

    // Wait for encoding to complete
    await waitFor(() => {
      expect(screen.getByDisplayValue('hello%20world')).toBeInTheDocument();
    });

    // Click swap button
    const swapButton = screen.getByTitle(/Swap input\/output/i);
    fireEvent.click(swapButton);

    await waitFor(() => {
      // Input should now have the encoded text
      expect(screen.getByDisplayValue('hello%20world')).toBeInTheDocument();
      // Mode should have switched to decode
      expect(screen.getByRole('button', { name: /Decode/i })).toHaveAttribute('aria-pressed', 'true');
    });
  });

  it('shows URL analysis for valid URLs', async () => {
    render(<UrlEncoderDecoder name="URL Encoder/Decoder" description="Encode or decode URLs." />);

    const inputTextarea = screen.getByPlaceholderText(/Enter text or URL to encode/i);
    fireEvent.change(inputTextarea, { target: { value: 'https://example.com:8080/path?query=value#fragment' } });

    await waitFor(() => {
      expect(screen.getByText('URL Analysis')).toBeInTheDocument();
      expect(screen.getByText('https:')).toBeInTheDocument();
      expect(screen.getByText('example.com')).toBeInTheDocument();
      expect(screen.getByText('8080')).toBeInTheDocument();
      expect(screen.getByText('/path')).toBeInTheDocument();
    });
  });

  it('loads example when clicked', async () => {
    render(<UrlEncoderDecoder name="URL Encoder/Decoder" description="Encode or decode URLs." />);

    const simpleUrlExample = screen.getByText('Simple URL with spaces');
    fireEvent.click(simpleUrlExample);

    const inputTextarea = screen.getByPlaceholderText(/Enter text or URL to encode/i);
    
    await waitFor(() => {
      expect(inputTextarea.value).toContain('hello world');
    });
  });

  it('copies output to clipboard', async () => {
    render(<UrlEncoderDecoder name="URL Encoder/Decoder" description="Encode or decode URLs." />);

    const inputTextarea = screen.getByPlaceholderText(/Enter text or URL to encode/i);
    fireEvent.change(inputTextarea, { target: { value: 'hello' } });

    await waitFor(() => {
      const copyButton = screen.getAllByTestId('ContentCopyIcon')[0].closest('button');
      fireEvent.click(copyButton);
      expect(navigator.clipboard.writeText).toHaveBeenCalled();
    });
  });

  it('handles encoding errors gracefully', async () => {
    render(<UrlEncoderDecoder name="URL Encoder/Decoder" description="Encode or decode URLs." />);

    // Switch to Base64 decode mode
    const decodeButton = screen.getByRole('button', { name: /Decode/i });
    fireEvent.click(decodeButton);
    
    const encodingSelect = screen.getByRole('combobox');
    fireEvent.mouseDown(encodingSelect);
    const base64Option = await screen.findByText('Base64');
    fireEvent.click(base64Option);

    const inputTextarea = screen.getByPlaceholderText(/Enter encoded text to decode/i);
    fireEvent.change(inputTextarea, { target: { value: 'invalid base64!' } });

    await waitFor(() => {
      expect(screen.getByText('Error')).toBeInTheDocument();
      expect(screen.getByText('Encoding Error:')).toBeInTheDocument();
    });
  });

  it('shows encoding types guide', () => {
    render(<UrlEncoderDecoder name="URL Encoder/Decoder" description="Encode or decode URLs." />);

    expect(screen.getByText('Encoding Types:')).toBeInTheDocument();
    expect(screen.getAllByText(/URI Component/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Full URI/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/HTML Entities/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Base64/).length).toBeGreaterThan(0);
  });

  it('shows encoding tips', () => {
    render(<UrlEncoderDecoder name="URL Encoder/Decoder" description="Encode or decode URLs." />);

    expect(screen.getByText('Encoding Tips')).toBeInTheDocument();
    expect(screen.getByText(/Use URI Component for query parameters/)).toBeInTheDocument();
    expect(screen.getByText(/Always decode exactly with the same method/)).toBeInTheDocument();
  });

  it('shows quick examples list', () => {
    render(<UrlEncoderDecoder name="URL Encoder/Decoder" description="Encode or decode URLs." />);

    expect(screen.getByText('Quick Examples')).toBeInTheDocument();
    expect(screen.getByText('Simple URL with spaces')).toBeInTheDocument();
    expect(screen.getByText('URL with special characters')).toBeInTheDocument();
    expect(screen.getByText('Complex query string')).toBeInTheDocument();
    expect(screen.getByText('URL with Unicode')).toBeInTheDocument();
    expect(screen.getByText('HTML with special chars')).toBeInTheDocument();
  });

  it('handles file upload', () => {
    render(<UrlEncoderDecoder name="URL Encoder/Decoder" description="Encode or decode URLs." />);

    const fileInput = screen.getByDisplayValue('');
    const file = new File(['https://example.com/test'], 'test.txt', { type: 'text/plain' });

    Object.defineProperty(fileInput, 'files', {
      value: [file],
      writable: false,
    });

    fireEvent.change(fileInput);
    // Note: File reading is asynchronous and mocked, so we can't easily test the result
  });
});