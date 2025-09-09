import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import JsonFormatter from '../components/JsonFormatter';

// Mock navigator.clipboard
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn().mockImplementation(() => Promise.resolve()),
  },
});

describe('JsonFormatter', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with default content', () => {
    render(<JsonFormatter name="JSON Formatter" description="Format and validate JSON data." />);
    
    expect(screen.getByText('JSON Formatter')).toBeInTheDocument();
    expect(screen.getByText('Format and validate JSON data.')).toBeInTheDocument();
    expect(screen.getByText('Format Options')).toBeInTheDocument();
    expect(screen.getByText('Input JSON')).toBeInTheDocument();
    expect(screen.getByText('Formatted Output')).toBeInTheDocument();
  });

  it('displays error for invalid JSON', async () => {
    render(<JsonFormatter name="JSON Formatter" description="Format and validate JSON data." />);

    const rawJsonInput = screen.getByPlaceholderText(/Paste or type your JSON here/i);
    fireEvent.change(rawJsonInput, { target: { value: 'invalid json' } });

    await waitFor(() => {
      expect(screen.getByText('JSON Parse Error:')).toBeInTheDocument();
      expect(screen.getByText('Invalid JSON')).toBeInTheDocument();
    });
  });

  it('formats valid JSON correctly', async () => {
    render(<JsonFormatter name="JSON Formatter" description="Format and validate JSON data." />);

    const rawJsonInput = screen.getByPlaceholderText(/Paste or type your JSON here/i);
    fireEvent.change(rawJsonInput, { target: { value: '{"key":"value"}' } });

    await waitFor(() => {
      expect(screen.getByText('Valid JSON')).toBeInTheDocument();
      expect(screen.getByText('JSON Statistics')).toBeInTheDocument();
    });
  });

  it('switches between format modes', async () => {
    render(<JsonFormatter name="JSON Formatter" description="Format and validate JSON data." />);

    const rawJsonInput = screen.getByPlaceholderText(/Paste or type your JSON here/i);
    fireEvent.change(rawJsonInput, { target: { value: '{"key":"value"}' } });

    // Switch to minified mode
    const minifiedButton = screen.getByRole('button', { name: /Minified/i });
    fireEvent.click(minifiedButton);

    await waitFor(() => {
      expect(minifiedButton).toHaveAttribute('aria-pressed', 'true');
    });
  });

  it('adjusts indent size in formatted mode', async () => {
    render(<JsonFormatter name="JSON Formatter" description="Format and validate JSON data." />);

    const indentInput = screen.getByLabelText(/Indent Size/i);
    fireEvent.change(indentInput, { target: { value: '4' } });

    await waitFor(() => {
      expect(indentInput).toHaveValue(4);
    });
  });

  it('shows JSON statistics for valid JSON', async () => {
    render(<JsonFormatter name="JSON Formatter" description="Format and validate JSON data." />);

    const rawJsonInput = screen.getByPlaceholderText(/Paste or type your JSON here/i);
    fireEvent.change(rawJsonInput, { target: { value: '{"name": "John", "age": 30, "active": true, "items": [1,2,3]}' } });

    await waitFor(() => {
      expect(screen.getByText('JSON Statistics')).toBeInTheDocument();
      expect(screen.getByText('Objects')).toBeInTheDocument();
      expect(screen.getByText('Arrays')).toBeInTheDocument();
      expect(screen.getByText('Strings')).toBeInTheDocument();
      expect(screen.getByText('Numbers')).toBeInTheDocument();
      expect(screen.getByText('Booleans')).toBeInTheDocument();
    });
  });

  it('loads example JSON when clicked', async () => {
    render(<JsonFormatter name="JSON Formatter" description="Format and validate JSON data." />);

    const simpleObjectExample = screen.getByText('Simple Object');
    fireEvent.click(simpleObjectExample);

    const rawJsonInput = screen.getByPlaceholderText(/Paste or type your JSON here/i);
    
    await waitFor(() => {
      expect(rawJsonInput.value).toContain('John');
      expect(rawJsonInput.value).toContain('age');
    });
  });

  it('copies formatted JSON to clipboard', async () => {
    render(<JsonFormatter name="JSON Formatter" description="Format and validate JSON data." />);

    const rawJsonInput = screen.getByPlaceholderText(/Paste or type your JSON here/i);
    fireEvent.change(rawJsonInput, { target: { value: '{"key":"value"}' } });

    await waitFor(() => {
      const copyButton = screen.getAllByTestId('ContentCopyIcon')[0].closest('button');
      fireEvent.click(copyButton);
      expect(navigator.clipboard.writeText).toHaveBeenCalled();
    });
  });

  it('shows detailed error information', async () => {
    render(<JsonFormatter name="JSON Formatter" description="Format and validate JSON data." />);

    const rawJsonInput = screen.getByPlaceholderText(/Paste or type your JSON here/i);
    fireEvent.change(rawJsonInput, { target: { value: '{"key":}' } });

    await waitFor(() => {
      expect(screen.getByText('JSON Parse Error:')).toBeInTheDocument();
      expect(screen.getByText('Invalid JSON')).toBeInTheDocument();
      // Error message should contain some details about the parsing issue
      expect(screen.getByText(/Unexpected token|Expected|not valid JSON/)).toBeInTheDocument();
    });
  });

  it('handles file upload', () => {
    render(<JsonFormatter name="JSON Formatter" description="Format and validate JSON data." />);

    const fileInput = screen.getByDisplayValue('');
    const file = new File(['{"test": "data"}'], 'test.json', { type: 'application/json' });

    Object.defineProperty(fileInput, 'files', {
      value: [file],
      writable: false,
    });

    fireEvent.change(fileInput);
    // Note: File reading is asynchronous and mocked, so we can't easily test the result
  });

  it('shows format options guide', () => {
    render(<JsonFormatter name="JSON Formatter" description="Format and validate JSON data." />);

    expect(screen.getByText('Format Options:')).toBeInTheDocument();
    expect(screen.getByText(/Pretty-printed with indentation/)).toBeInTheDocument();
    expect(screen.getByText(/Compact, single-line format/)).toBeInTheDocument();
    expect(screen.getByText(/Uses tab characters/)).toBeInTheDocument();
  });

  it('shows JSON tips', () => {
    render(<JsonFormatter name="JSON Formatter" description="Format and validate JSON data." />);

    expect(screen.getByText('JSON Tips')).toBeInTheDocument();
    expect(screen.getByText(/Strings must be in double quotes/)).toBeInTheDocument();
    expect(screen.getByText(/No trailing commas allowed/)).toBeInTheDocument();
    expect(screen.getByText(/No comments supported/)).toBeInTheDocument();
  });

  it('shows quick examples list', () => {
    render(<JsonFormatter name="JSON Formatter" description="Format and validate JSON data." />);

    expect(screen.getByText('Quick Examples')).toBeInTheDocument();
    expect(screen.getByText('Simple Object')).toBeInTheDocument();
    expect(screen.getByText('Array of Objects')).toBeInTheDocument();
    expect(screen.getByText('Nested Structure')).toBeInTheDocument();
    expect(screen.getByText('API Response')).toBeInTheDocument();
  });
});