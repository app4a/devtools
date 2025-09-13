import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SqlFormatter from '../components/SqlFormatter';

// Mock navigator.clipboard
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn().mockImplementation(() => Promise.resolve()),
  },
});

// Mock sql-formatter
jest.mock('sql-formatter', () => ({
  format: jest.fn().mockReturnValue('SELECT\n  *\nFROM\n  users;')
}));

// Mock URL methods
global.URL.createObjectURL = jest.fn().mockReturnValue('mock-url');
global.URL.revokeObjectURL = jest.fn();

describe('SqlFormatter', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with default content', () => {
    render(<SqlFormatter name="SQL Formatter" description="Professional SQL formatting tool." />);
    
    expect(screen.getByText('SQL Formatter')).toBeInTheDocument();
    expect(screen.getByText('Professional SQL formatting tool.')).toBeInTheDocument();
    expect(screen.getByText('Format Options')).toBeInTheDocument();
    expect(screen.getByText('Input SQL')).toBeInTheDocument();
  });

  it('displays default SQL content', () => {
    render(<SqlFormatter name="SQL Formatter" description="Professional SQL formatting tool." />);
    
    expect(screen.getByDisplayValue(/SELECT u\.id, u\.username/)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/FROM users u/)).toBeInTheDocument();
  });

  it('switches between format modes', async () => {
    render(<SqlFormatter name="SQL Formatter" description="Professional SQL formatting tool." />);

    // Should start in beautify mode
    const beautifyButton = screen.getByRole('button', { name: /Beautify/i });
    expect(beautifyButton).toHaveClass('Mui-selected');

    // Switch to minify
    const minifyButton = screen.getByRole('button', { name: /Minify/i });
    fireEvent.click(minifyButton);

    expect(minifyButton).toHaveClass('Mui-selected');
  });

  it('displays SQL dialect information', () => {
    render(<SqlFormatter name="SQL Formatter" description="Professional SQL formatting tool." />);

    // Should show SQL dialect information
    expect(screen.getByText('SQL Dialects')).toBeInTheDocument();
    expect(screen.getByText(/MySQL:/)).toBeInTheDocument();
    expect(screen.getByText(/PostgreSQL:/)).toBeInTheDocument();
  });

  it('changes indent size', () => {
    render(<SqlFormatter name="SQL Formatter" description="Professional SQL formatting tool." />);

    const indentInput = screen.getByLabelText(/Indent Size/);
    fireEvent.change(indentInput, { target: { value: '4' } });

    expect(indentInput.value).toBe('4');
  });

  it('toggles format options', () => {
    render(<SqlFormatter name="SQL Formatter" description="Professional SQL formatting tool." />);

    const uppercaseCheckbox = screen.getByLabelText(/Uppercase Keywords/);
    const newlineCheckbox = screen.getByLabelText(/Newlines/);

    fireEvent.click(uppercaseCheckbox);
    fireEvent.click(newlineCheckbox);

    expect(uppercaseCheckbox).not.toBeChecked();
    expect(newlineCheckbox).not.toBeChecked();
  });

  it('updates SQL content', async () => {
    render(<SqlFormatter name="SQL Formatter" description="Professional SQL formatting tool." />);

    const editor = screen.getByDisplayValue(/SELECT u\.id/);
    fireEvent.change(editor, { target: { value: 'SELECT * FROM products;' } });

    await waitFor(() => {
      expect(screen.getByDisplayValue('SELECT * FROM products;')).toBeInTheDocument();
    });
  });

  it('displays input and output textareas', () => {
    render(<SqlFormatter name="SQL Formatter" description="Professional SQL formatting tool." />);

    const textareas = screen.getAllByRole('textbox');
    expect(textareas).toHaveLength(2); // Input and output
    
    expect(screen.getByPlaceholderText(/Enter your SQL query here/)).toBeInTheDocument();
  });

  it('displays format options', () => {
    render(<SqlFormatter name="SQL Formatter" description="Professional SQL formatting tool." />);

    expect(screen.getByText('Beautify')).toBeInTheDocument();
    expect(screen.getByText('Minify')).toBeInTheDocument();
    expect(screen.getByText('Format Options')).toBeInTheDocument();
  });

  it('displays SQL input and output areas', () => {
    render(<SqlFormatter name="SQL Formatter" description="Professional SQL formatting tool." />);

    expect(screen.getByText('Input SQL')).toBeInTheDocument();
    expect(screen.getByText('Formatted Output')).toBeInTheDocument();
  });

  it('switches between tabs correctly', () => {
    render(<SqlFormatter name="SQL Formatter" description="Professional SQL formatting tool." />);

    // Switch to Validator tab
    const validatorTab = screen.getByRole('tab', { name: /Validator/i });
    fireEvent.click(validatorTab);

    expect(screen.getByText('SQL Validation')).toBeInTheDocument();

    // Switch to Analyzer tab
    const analyzerTab = screen.getByRole('tab', { name: /Analyzer/i });
    fireEvent.click(analyzerTab);

    expect(screen.getAllByText('SQL Analysis')[0]).toBeInTheDocument();

    // Switch to Examples tab
    const examplesTab = screen.getByRole('tab', { name: /Examples/i });
    fireEvent.click(examplesTab);

    expect(screen.getByText('SQL Examples')).toBeInTheDocument();
  });

  it('loads example when clicked', async () => {
    render(<SqlFormatter name="SQL Formatter" description="Professional SQL formatting tool." />);

    // Switch to Examples tab
    const examplesTab = screen.getByRole('tab', { name: /Examples/i });
    fireEvent.click(examplesTab);

    // Click on an example
    const basicExample = screen.getByText('User Management Query');
    fireEvent.click(basicExample);

    await waitFor(() => {
      expect(screen.getByDisplayValue(/Get active users with their profiles/)).toBeInTheDocument();
    });
  });

  it('displays SQL statistics', () => {
    render(<SqlFormatter name="SQL Formatter" description="Professional SQL formatting tool." />);

    expect(screen.getByText('SQL Statistics')).toBeInTheDocument();
    expect(screen.getByText('Lines')).toBeInTheDocument();
    expect(screen.getByText('Statements')).toBeInTheDocument();
    expect(screen.getByText('Keywords')).toBeInTheDocument();
  });

  it('shows validation results', () => {
    render(<SqlFormatter name="SQL Formatter" description="Professional SQL formatting tool." />);

    // Switch to Validator tab
    const validatorTab = screen.getByRole('tab', { name: /Validator/i });
    fireEvent.click(validatorTab);

    expect(screen.getByText('SQL Validation')).toBeInTheDocument();
  });

  it('shows SQL analysis', () => {
    render(<SqlFormatter name="SQL Formatter" description="Professional SQL formatting tool." />);

    // Switch to Analyzer tab
    const analyzerTab = screen.getByRole('tab', { name: /Analyzer/i });
    fireEvent.click(analyzerTab);

    expect(screen.getAllByText('SQL Analysis')[0]).toBeInTheDocument();
    expect(screen.getByText(/Keywords \(/)).toBeInTheDocument();
    expect(screen.getByText(/Tables \(/)).toBeInTheDocument();
  });

  it('displays SQL dialect guide', () => {
    render(<SqlFormatter name="SQL Formatter" description="Professional SQL formatting tool." />);

    expect(screen.getByText('SQL Dialects')).toBeInTheDocument();
    expect(screen.getByText(/MySQL:/)).toBeInTheDocument();
    expect(screen.getByText(/PostgreSQL:/)).toBeInTheDocument();
    expect(screen.getByText(/SQL Server:/)).toBeInTheDocument();
    expect(screen.getByText(/Oracle:/)).toBeInTheDocument();
  });

  it('displays SQL best practices', () => {
    render(<SqlFormatter name="SQL Formatter" description="Professional SQL formatting tool." />);

    expect(screen.getByText('SQL Best Practices')).toBeInTheDocument();
    expect(screen.getByText(/Use consistent indentation and formatting/)).toBeInTheDocument();
    expect(screen.getByText(/Write keywords in UPPERCASE/)).toBeInTheDocument();
    expect(screen.getByText(/Use parameterized queries to prevent SQL injection/)).toBeInTheDocument();
  });

  it('shows professional features alert', () => {
    render(<SqlFormatter name="SQL Formatter" description="Professional SQL formatting tool." />);

    expect(screen.getByText(/Professional SQL Tool:/)).toBeInTheDocument();
    expect(screen.getByText(/Format, minify, validate, and analyze SQL queries/)).toBeInTheDocument();
  });

  it('handles dialect-specific features', () => {
    render(<SqlFormatter name="SQL Formatter" description="Professional SQL formatting tool." />);

    // Check if PostgreSQL dialect info is visible
    expect(screen.getByText(/LIMIT\/OFFSET for pagination/)).toBeInTheDocument();
  });

  it('shows examples for different SQL patterns', () => {
    render(<SqlFormatter name="SQL Formatter" description="Professional SQL formatting tool." />);

    // Switch to Examples tab
    const examplesTab = screen.getByRole('tab', { name: /Examples/i });
    fireEvent.click(examplesTab);

    expect(screen.getByText('User Management Query')).toBeInTheDocument();
    expect(screen.getByText('E-commerce Analytics')).toBeInTheDocument();
    expect(screen.getByText('Employee Performance Report')).toBeInTheDocument();
    expect(screen.getByText('Customer Segmentation')).toBeInTheDocument();
    expect(screen.getByText('Inventory Management')).toBeInTheDocument();
    expect(screen.getByText('Data Migration Script')).toBeInTheDocument();
  });
});
