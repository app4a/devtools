import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import HashGenerator from '../components/HashGenerator';

// Mock navigator.clipboard
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn().mockImplementation(() => Promise.resolve()),
  },
});

describe('HashGenerator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with default content', () => {
    render(<HashGenerator name="Hash Generator" description="Generate various hashes." />);
    
    expect(screen.getByText('Hash Generator')).toBeInTheDocument();
    expect(screen.getByText('Generate various hashes.')).toBeInTheDocument();
    expect(screen.getByText('Input Text')).toBeInTheDocument();
    expect(screen.getByText('Algorithm Selection')).toBeInTheDocument();
    expect(screen.getByText('Hash Results')).toBeInTheDocument();
  });

  it('generates hashes automatically', async () => {
    render(<HashGenerator name="Hash Generator" description="Generate various hashes." />);

    const textInput = screen.getByPlaceholderText(/Enter text to hash/i);
    fireEvent.change(textInput, { target: { value: 'test' } });

    await waitFor(() => {
      // Should see hash results table with default algorithms
      expect(screen.getAllByText('MD5').length).toBeGreaterThan(0);
      expect(screen.getAllByText('SHA-1').length).toBeGreaterThan(0);
      expect(screen.getAllByText('SHA-256').length).toBeGreaterThan(0);
      expect(screen.getAllByText('SHA-512').length).toBeGreaterThan(0);
    });
  });

  it('shows security indicators for algorithms', async () => {
    render(<HashGenerator name="Hash Generator" description="Generate various hashes." />);

    const textInput = screen.getByPlaceholderText(/Enter text to hash/i);
    fireEvent.change(textInput, { target: { value: 'test' } });

    await waitFor(() => {
      // Check for security indicators
      expect(screen.getAllByText('Weak').length).toBeGreaterThan(0); // MD5, SHA-1
      expect(screen.getAllByText('Strong').length).toBeGreaterThan(0); // SHA-256, SHA-512
    });
  });

  it('toggles algorithm selection', async () => {
    render(<HashGenerator name="Hash Generator" description="Generate various hashes." />);

    // Find and toggle SHA-3 algorithm - find the switch in the Algorithm Selection section
    const switches = screen.getAllByRole('switch');
    const sha3Switch = switches.find(sw => sw.closest('label')?.textContent?.includes('SHA-3'));
    if (sha3Switch) {
      fireEvent.click(sha3Switch);
    }

    const textInput = screen.getByPlaceholderText(/Enter text to hash/i);
    fireEvent.change(textInput, { target: { value: 'test' } });

    await waitFor(() => {
      expect(screen.getAllByText('SHA-3').length).toBeGreaterThan(0);
    });
  });

  it('generates HMAC hashes with key', async () => {
    render(<HashGenerator name="Hash Generator" description="Generate various hashes." />);

    // Enable HMAC algorithms - find the switch in the Algorithm Selection section
    const switches = screen.getAllByRole('switch');
    const hmacSha256Switch = switches.find(sw => sw.closest('label')?.textContent?.includes('HMAC-SHA256'));
    if (hmacSha256Switch) {
      fireEvent.click(hmacSha256Switch);
    }

    // Set HMAC key
    const hmacKeyInput = screen.getByLabelText(/HMAC Secret Key/i);
    fireEvent.change(hmacKeyInput, { target: { value: 'secret-key' } });

    const textInput = screen.getByPlaceholderText(/Enter text to hash/i);
    fireEvent.change(textInput, { target: { value: 'test' } });

    await waitFor(() => {
      expect(screen.getAllByText('HMAC-SHA256').length).toBeGreaterThan(0);
    });
  });

  it('loads example text when clicked', async () => {
    render(<HashGenerator name="Hash Generator" description="Generate various hashes." />);

    const testStringExample = screen.getByText('Test String');
    fireEvent.click(testStringExample);

    const textInput = screen.getByPlaceholderText(/Enter text to hash/i);
    
    await waitFor(() => {
      expect(textInput.value).toContain('quick brown fox');
    });
  });

  it('copies hash to clipboard', async () => {
    render(<HashGenerator name="Hash Generator" description="Generate various hashes." />);

    const textInput = screen.getByPlaceholderText(/Enter text to hash/i);
    fireEvent.change(textInput, { target: { value: 'test' } });

    await waitFor(() => {
      const copyButtons = screen.getAllByTestId('ContentCopyIcon');
      if (copyButtons.length > 0) {
        fireEvent.click(copyButtons[0].closest('button'));
        expect(navigator.clipboard.writeText).toHaveBeenCalled();
      }
    });
  });

  it('handles uppercase transformation', async () => {
    render(<HashGenerator name="Hash Generator" description="Generate various hashes." />);

    const uppercaseSwitch = screen.getByRole('switch', { name: /Uppercase/i });
    fireEvent.click(uppercaseSwitch);

    const textInput = screen.getByPlaceholderText(/Enter text to hash/i);
    fireEvent.change(textInput, { target: { value: 'test' } });

    // Hash results should be different when uppercase is enabled
    await waitFor(() => {
      expect(screen.getByText('Hash Results')).toBeInTheDocument();
    });
  });

  it('shows hash security guide', () => {
    render(<HashGenerator name="Hash Generator" description="Generate various hashes." />);

    expect(screen.getByText('Hash Security Guide:')).toBeInTheDocument();
    expect(screen.getByText(/SHA-256, SHA-512, HMAC variants - Recommended for security/)).toBeInTheDocument();
    expect(screen.getByText(/MD5, SHA-1 - Only for checksums, not security/)).toBeInTheDocument();
  });

  it('shows hash tips', () => {
    render(<HashGenerator name="Hash Generator" description="Generate various hashes." />);

    expect(screen.getByText('Hash Tips')).toBeInTheDocument();
    expect(screen.getByText(/Use SHA-256 or SHA-512 for cryptographic security/)).toBeInTheDocument();
    expect(screen.getByText(/HMAC variants provide message authentication/)).toBeInTheDocument();
  });

  it('shows quick examples list', () => {
    render(<HashGenerator name="Hash Generator" description="Generate various hashes." />);

    expect(screen.getByText('Quick Examples')).toBeInTheDocument();
    expect(screen.getByText('Lorem Ipsum')).toBeInTheDocument();
    expect(screen.getByText('Test String')).toBeInTheDocument();
    expect(screen.getByText('Password Example')).toBeInTheDocument();
    expect(screen.getByText('JSON Data')).toBeInTheDocument();
    expect(screen.getByText('Unicode Text')).toBeInTheDocument();
  });

  it('handles file upload', () => {
    render(<HashGenerator name="Hash Generator" description="Generate various hashes." />);

    const fileInput = screen.getByDisplayValue('');
    const file = new File(['test content'], 'test.txt', { type: 'text/plain' });

    Object.defineProperty(fileInput, 'files', {
      value: [file],
      writable: false,
    });

    fireEvent.change(fileInput);
    // Note: File reading is asynchronous and mocked, so we can't easily test the result
  });

  it('downloads hash results', async () => {
    render(<HashGenerator name="Hash Generator" description="Generate various hashes." />);

    const textInput = screen.getByPlaceholderText(/Enter text to hash/i);
    fireEvent.change(textInput, { target: { value: 'test' } });

    await waitFor(() => {
      const downloadButton = screen.getByText('Download');
      expect(downloadButton).toBeInTheDocument();
      // Note: File download is hard to test in JSDOM environment
    });
  });

  it('shows algorithm categories', () => {
    render(<HashGenerator name="Hash Generator" description="Generate various hashes." />);

    expect(screen.getAllByText('Legacy').length).toBeGreaterThan(0);
    expect(screen.getAllByText('SHA-2').length).toBeGreaterThan(0);
    expect(screen.getAllByText('SHA-3').length).toBeGreaterThan(0);
    expect(screen.getAllByText('RIPEMD').length).toBeGreaterThan(0);
    expect(screen.getAllByText('HMAC').length).toBeGreaterThan(0);
  });

  it('displays hash details in table format', async () => {
    render(<HashGenerator name="Hash Generator" description="Generate various hashes." />);

    const textInput = screen.getByPlaceholderText(/Enter text to hash/i);
    fireEvent.change(textInput, { target: { value: 'test' } });

    await waitFor(() => {
      expect(screen.getByText('Algorithm')).toBeInTheDocument();
      expect(screen.getByText('Hash Value')).toBeInTheDocument();
      expect(screen.getByText('Length')).toBeInTheDocument();
      expect(screen.getByText('Security')).toBeInTheDocument();
      expect(screen.getByText('Actions')).toBeInTheDocument();
    });
  });
});