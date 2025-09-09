import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import RegexTester from '../components/RegexTester';

// Mock navigator.clipboard
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn().mockImplementation(() => Promise.resolve()),
  },
});

describe('RegexTester', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with default content', () => {
    render(<RegexTester name="Regex Tester" description="Test regular expressions." />);
    
    expect(screen.getByText('Regex Tester')).toBeInTheDocument();
    expect(screen.getByText('Test regular expressions.')).toBeInTheDocument();
    expect(screen.getByText('Regular Expression')).toBeInTheDocument();
    expect(screen.getByText('Test Text')).toBeInTheDocument();
  });

  it('highlights matches and displays capture groups correctly', async () => {
    render(<RegexTester name="Regex Tester" description="Test regular expressions." />);

    const regexInput = screen.getByPlaceholderText(/\[a-zA-Z0-9\._-\]/);
    const textInput = screen.getByPlaceholderText(/Enter text to test/);

    fireEvent.change(regexInput, { target: { value: 'hello (world)' } });
    fireEvent.change(textInput, { target: { value: 'hello world' } });

    await waitFor(() => {
      expect(screen.getByText('Highlighted Results')).toBeInTheDocument();
      expect(screen.getByText(/1 match/)).toBeInTheDocument();
    });
  });

  it('displays error for invalid regex', async () => {
    render(<RegexTester name="Regex Tester" description="Test regular expressions." />);

    const regexInput = screen.getByPlaceholderText(/\[a-zA-Z0-9\._-\]/);
    fireEvent.change(regexInput, { target: { value: '(' } });

    await waitFor(() => {
      expect(screen.getByText(/Unterminated group/)).toBeInTheDocument();
    });
  });

  it('shows regex flags and constructed pattern', () => {
    render(<RegexTester name="Regex Tester" description="Test regular expressions." />);
    
    expect(screen.getByText('Flags')).toBeInTheDocument();
    expect(screen.getByText('Global (g)')).toBeInTheDocument();
    expect(screen.getByText('Ignore Case (i)')).toBeInTheDocument();
    expect(screen.getByText('Multiline (m)')).toBeInTheDocument();
    
    // Should show constructed regex
    expect(screen.getByText('Constructed regex:')).toBeInTheDocument();
  });

  it('toggles flags correctly', async () => {
    render(<RegexTester name="Regex Tester" description="Test regular expressions." />);
    
    const ignoreCaseCheckbox = screen.getByRole('checkbox', { name: /Ignore Case/i });
    
    // Initially unchecked
    expect(ignoreCaseCheckbox).not.toBeChecked();
    
    fireEvent.click(ignoreCaseCheckbox);
    
    await waitFor(() => {
      expect(ignoreCaseCheckbox).toBeChecked();
    });
  });

  it('shows common patterns', () => {
    render(<RegexTester name="Regex Tester" description="Test regular expressions." />);
    
    expect(screen.getByText('Common Patterns')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Phone (US)')).toBeInTheDocument();
    expect(screen.getByText('URL')).toBeInTheDocument();
  });

  it('loads pattern when common pattern is clicked', async () => {
    render(<RegexTester name="Regex Tester" description="Test regular expressions." />);
    
    const emailPattern = screen.getByText('Email');
    fireEvent.click(emailPattern);
    
    const regexInput = screen.getByPlaceholderText(/\[a-zA-Z0-9\._-\]/);
    
    await waitFor(() => {
      expect(regexInput.value).toContain('@');
    });
  });

  it('shows regex cheat sheet', () => {
    render(<RegexTester name="Regex Tester" description="Test regular expressions." />);
    
    expect(screen.getByText('Regex Cheat Sheet')).toBeInTheDocument();
    expect(screen.getByText('Basic')).toBeInTheDocument();
    expect(screen.getByText('Character Classes')).toBeInTheDocument();
    expect(screen.getByText('Quantifiers')).toBeInTheDocument();
    expect(screen.getByText('Groups')).toBeInTheDocument();
  });

  it('copies regex pattern to clipboard', async () => {
    render(<RegexTester name="Regex Tester" description="Test regular expressions." />);
    
    const copyButton = screen.getAllByTestId('ContentCopyIcon')[0].closest('button');
    
    await act(async () => {
      fireEvent.click(copyButton);
    });
    
    expect(navigator.clipboard.writeText).toHaveBeenCalled();
  });

  it('shows match details for captures', async () => {
    render(<RegexTester name="Regex Tester" description="Test regular expressions." />);

    const regexInput = screen.getByPlaceholderText(/\[a-zA-Z0-9\._-\]/);
    const textInput = screen.getByPlaceholderText(/Enter text to test/);

    fireEvent.change(regexInput, { target: { value: '(\\w+)@(\\w+\\.\\w+)' } });
    fireEvent.change(textInput, { target: { value: 'test@example.com' } });

    await waitFor(() => {
      expect(screen.getByText('Match Details')).toBeInTheDocument();
      expect(screen.getByText('Match 1')).toBeInTheDocument();
    });
  });

  it('shows usage tips', () => {
    render(<RegexTester name="Regex Tester" description="Test regular expressions." />);
    
    expect(screen.getByText('Tips:')).toBeInTheDocument();
    expect(screen.getByText(/Use the global flag/)).toBeInTheDocument();
  });
});
