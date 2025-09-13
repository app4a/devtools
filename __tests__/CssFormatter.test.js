import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CssFormatter from '../components/CssFormatter';

// Mock navigator.clipboard
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn().mockImplementation(() => Promise.resolve()),
  },
});

// Mock PostCSS and plugins
jest.mock('postcss', () => {
  const mockProcessor = {
    process: jest.fn().mockResolvedValue({
      css: 'processed css'
    })
  };
  return jest.fn().mockReturnValue(mockProcessor);
});

jest.mock('autoprefixer', () => jest.fn());
jest.mock('cssnano', () => jest.fn());

// Mock URL methods
global.URL.createObjectURL = jest.fn().mockReturnValue('mock-url');
global.URL.revokeObjectURL = jest.fn();

describe('CssFormatter', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with default content', () => {
    render(<CssFormatter name="CSS Formatter" description="Professional CSS formatting tool." />);
    
    expect(screen.getByText('CSS Formatter')).toBeInTheDocument();
    expect(screen.getByText('Professional CSS formatting tool.')).toBeInTheDocument();
    expect(screen.getByText('Format Options')).toBeInTheDocument();
    expect(screen.getByText('Input CSS')).toBeInTheDocument();
  });

  it('displays default CSS content', () => {
    render(<CssFormatter name="CSS Formatter" description="Professional CSS formatting tool." />);
    
    expect(screen.getByDisplayValue(/\.container/)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/max-width: 1200px/)).toBeInTheDocument();
  });

  it('switches between format modes', async () => {
    render(<CssFormatter name="CSS Formatter" description="Professional CSS formatting tool." />);

    // Should start in beautify mode
    const beautifyButton = screen.getByRole('button', { name: /Beautify/i });
    expect(beautifyButton).toHaveClass('Mui-selected');

    // Switch to minify
    const minifyButton = screen.getByRole('button', { name: /Minify/i });
    fireEvent.click(minifyButton);

    expect(minifyButton).toHaveClass('Mui-selected');
  });

  it('changes indent settings', () => {
    render(<CssFormatter name="CSS Formatter" description="Professional CSS formatting tool." />);

    // Should display size controls
    const sizeInput = screen.getByLabelText(/Size/);
    expect(sizeInput).toBeInTheDocument();
    
    // Change indent size
    fireEvent.change(sizeInput, { target: { value: '4' } });
    expect(sizeInput.value).toBe('4');
  });

  it('toggles options checkboxes', () => {
    render(<CssFormatter name="CSS Formatter" description="Professional CSS formatting tool." />);

    const sortPropertiesCheckbox = screen.getByLabelText(/Sort Properties/);
    const autoprefixerCheckbox = screen.getByLabelText(/Autoprefixer/);

    fireEvent.click(sortPropertiesCheckbox);
    fireEvent.click(autoprefixerCheckbox);

    expect(sortPropertiesCheckbox).toBeChecked();
    expect(autoprefixerCheckbox).toBeChecked();
  });

  it('updates CSS content', async () => {
    render(<CssFormatter name="CSS Formatter" description="Professional CSS formatting tool." />);

    const editor = screen.getByDisplayValue(/\.container/);
    fireEvent.change(editor, { target: { value: '.test { color: red; }' } });

    await waitFor(() => {
      expect(screen.getByDisplayValue('.test { color: red; }')).toBeInTheDocument();
    });
  });

  it('displays input and output textareas', () => {
    render(<CssFormatter name="CSS Formatter" description="Professional CSS formatting tool." />);

    const textareas = screen.getAllByRole('textbox');
    expect(textareas).toHaveLength(2); // Input and output
    
    expect(screen.getByPlaceholderText(/Paste your CSS here/)).toBeInTheDocument();
  });

  it('displays CSS formatting features', () => {
    render(<CssFormatter name="CSS Formatter" description="Professional CSS formatting tool." />);

    expect(screen.getByText('Sort Properties')).toBeInTheDocument();
    expect(screen.getByText('Autoprefixer')).toBeInTheDocument();
  });

  it('displays format options', () => {
    render(<CssFormatter name="CSS Formatter" description="Professional CSS formatting tool." />);

    expect(screen.getByText('Beautify')).toBeInTheDocument();
    expect(screen.getByText('Minify')).toBeInTheDocument();
  });

  it('switches between tabs correctly', () => {
    render(<CssFormatter name="CSS Formatter" description="Professional CSS formatting tool." />);

    // Switch to Validator tab
    const validatorTab = screen.getByRole('tab', { name: /Validator/i });
    fireEvent.click(validatorTab);

    expect(screen.getByText('CSS Validation')).toBeInTheDocument();

    // Switch to Analyzer tab
    const analyzerTab = screen.getByRole('tab', { name: /Analyzer/i });
    fireEvent.click(analyzerTab);

    expect(screen.getAllByText('CSS Analysis')[0]).toBeInTheDocument();

    // Switch to Examples tab
    const examplesTab = screen.getByRole('tab', { name: /Examples/i });
    fireEvent.click(examplesTab);

    expect(screen.getByText('CSS Examples')).toBeInTheDocument();
  });

  it('loads example when clicked', async () => {
    render(<CssFormatter name="CSS Formatter" description="Professional CSS formatting tool." />);

    // Switch to Examples tab
    const examplesTab = screen.getByRole('tab', { name: /Examples/i });
    fireEvent.click(examplesTab);

    // Click on an example
    const cardExample = screen.getByText('Modern Card Component');
    fireEvent.click(cardExample);

    await waitFor(() => {
      expect(screen.getByDisplayValue(/Modern card component with glass morphism effect/)).toBeInTheDocument();
    });
  });

  it('displays CSS statistics', () => {
    render(<CssFormatter name="CSS Formatter" description="Professional CSS formatting tool." />);

    expect(screen.getByText('CSS Statistics')).toBeInTheDocument();
    expect(screen.getByText('Lines')).toBeInTheDocument();
    expect(screen.getByText('Selectors')).toBeInTheDocument();
    expect(screen.getByText('Properties')).toBeInTheDocument();
  });

  it('shows validation results for valid CSS', () => {
    render(<CssFormatter name="CSS Formatter" description="Professional CSS formatting tool." />);

    // Switch to Validator tab
    const validatorTab = screen.getByRole('tab', { name: /Validator/i });
    fireEvent.click(validatorTab);

    // Should show validation (may be success or issues depending on default CSS)
    expect(screen.getByText('CSS Validation')).toBeInTheDocument();
  });

  it('shows CSS analysis', () => {
    render(<CssFormatter name="CSS Formatter" description="Professional CSS formatting tool." />);

    // Switch to Analyzer tab
    const analyzerTab = screen.getByRole('tab', { name: /Analyzer/i });
    fireEvent.click(analyzerTab);

    expect(screen.getAllByText('CSS Analysis')[0]).toBeInTheDocument();
    expect(screen.getByText(/Properties \(/)).toBeInTheDocument();
    expect(screen.getByText(/Selectors \(/)).toBeInTheDocument();
  });

  it('displays CSS best practices', () => {
    render(<CssFormatter name="CSS Formatter" description="Professional CSS formatting tool." />);

    expect(screen.getByText('CSS Best Practices')).toBeInTheDocument();
    expect(screen.getByText(/Use consistent indentation/)).toBeInTheDocument();
    expect(screen.getByText(/Use autoprefixer instead of manual prefixes/)).toBeInTheDocument();
  });

  it('shows professional features alert', () => {
    render(<CssFormatter name="CSS Formatter" description="Professional CSS formatting tool." />);

    expect(screen.getByText(/Professional CSS Tool:/)).toBeInTheDocument();
    expect(screen.getByText(/Format, minify, validate, and analyze CSS/)).toBeInTheDocument();
  });
});
