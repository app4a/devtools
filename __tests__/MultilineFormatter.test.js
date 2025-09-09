import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MultilineFormatter from '../components/MultilineFormatter';

// Mock navigator.clipboard
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(),
  },
});

describe('MultilineFormatter', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders multiline formatter interface', () => {
    render(<MultilineFormatter name="Multiline Formatter" description="Format multiline strings." />);
    
    expect(screen.getByText('Multiline Formatter')).toBeInTheDocument();
    expect(screen.getByText('Format multiline strings.')).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Text Formatter' })).toBeInTheDocument();
    expect(screen.getByText('Format Options')).toBeInTheDocument();
  });

  it('formats multiline text with default JavaScript array format', () => {
    render(<MultilineFormatter name="Multiline Formatter" description="Format multiline strings." />);

    const inputTextarea = screen.getByPlaceholderText(/Paste your multiline text here/i);
    
    fireEvent.change(inputTextarea, { target: { value: 'line1\nline2\nline3' } });

    // Find the output textarea (read-only)
    const textareas = screen.getAllByRole('textbox');
    const outputTextarea = textareas.find(textarea => textarea.readOnly);
    
    expect(outputTextarea.value).toContain("'line1'");
    expect(outputTextarea.value).toContain("'line2'");
    expect(outputTextarea.value).toContain("'line3'");
    expect(outputTextarea.value).toMatch(/^\[/);
    expect(outputTextarea.value).toMatch(/\]$/);
  });

  it('shows format type selector', () => {
    render(<MultilineFormatter name="Multiline Formatter" description="Format multiline strings." />);

    const formatSelect = screen.getByRole('combobox');
    expect(formatSelect).toBeInTheDocument();
    
    // Check that format options exist by looking for the JavaScript Array preset button
    expect(screen.getByText('JavaScript Array')).toBeInTheDocument();
    expect(screen.getByText('Python List')).toBeInTheDocument();
    expect(screen.getByText('JSON Array')).toBeInTheDocument();
  });

  it('changes wrap character', () => {
    render(<MultilineFormatter name="Multiline Formatter" description="Format multiline strings." />);

    const inputTextarea = screen.getByPlaceholderText(/Paste your multiline text here/i);
    const wrapCharInput = screen.getByLabelText(/Wrap with/i);
    
    fireEvent.change(wrapCharInput, { target: { value: '"' } });
    fireEvent.change(inputTextarea, { target: { value: 'test1\ntest2' } });

    const textareas = screen.getAllByRole('textbox');
    const outputTextarea = textareas.find(textarea => textarea.readOnly);
    
    expect(outputTextarea.value).toContain('"test1"');
    expect(outputTextarea.value).toContain('"test2"');
  });

  it('shows text analysis tab', () => {
    render(<MultilineFormatter name="Multiline Formatter" description="Format multiline strings." />);

    const inputTextarea = screen.getByPlaceholderText(/Paste your multiline text here/i);
    fireEvent.change(inputTextarea, { target: { value: 'line1\nline2\nline3' } });

    const analysisTab = screen.getByRole('tab', { name: 'Text Analysis' });
    fireEvent.click(analysisTab);

    expect(screen.getAllByText('Text Analysis').length).toBeGreaterThan(0);
    expect(screen.getByText('Basic Statistics')).toBeInTheDocument();
    expect(screen.getByText('Line Analysis')).toBeInTheDocument();
  });

  it('shows quick presets', () => {
    render(<MultilineFormatter name="Multiline Formatter" description="Format multiline strings." />);

    expect(screen.getByText('Quick Presets')).toBeInTheDocument();
    expect(screen.getByText('JavaScript Array')).toBeInTheDocument();
    expect(screen.getByText('Python List')).toBeInTheDocument();
    expect(screen.getByText('SQL IN Clause')).toBeInTheDocument();
  });

  it('applies preset when clicked', () => {
    render(<MultilineFormatter name="Multiline Formatter" description="Format multiline strings." />);

    const inputTextarea = screen.getByPlaceholderText(/Paste your multiline text here/i);
    fireEvent.change(inputTextarea, { target: { value: 'a\nb\nc' } });

    const sqlPresetButton = screen.getByText('SQL IN Clause');
    fireEvent.click(sqlPresetButton);

    const textareas = screen.getAllByRole('textbox');
    const outputTextarea = textareas.find(textarea => textarea.readOnly);
    
    expect(outputTextarea.value).toContain('IN (');
  });

  it('shows example data', () => {
    render(<MultilineFormatter name="Multiline Formatter" description="Format multiline strings." />);

    expect(screen.getByText('Example Data')).toBeInTheDocument();
    expect(screen.getByText('Programming Languages')).toBeInTheDocument();
    expect(screen.getByText('SQL Conditions')).toBeInTheDocument();
  });

  it('shows usage guide', () => {
    render(<MultilineFormatter name="Multiline Formatter" description="Format multiline strings." />);

    expect(screen.getByText('Usage Guide')).toBeInTheDocument();
    expect(screen.getByText('Format Types')).toBeInTheDocument();
    expect(screen.getByText('Custom Patterns')).toBeInTheDocument();
    expect(screen.getByText('Quick Tips')).toBeInTheDocument();
  });

  it('toggles processing options', () => {
    render(<MultilineFormatter name="Multiline Formatter" description="Format multiline strings." />);

    const removeEmptyLinesSwitch = screen.getByLabelText(/Remove Empty Lines/i);
    const trimLinesSwitch = screen.getByLabelText(/Trim Lines/i);
    
    expect(removeEmptyLinesSwitch).toBeChecked();
    expect(trimLinesSwitch).toBeChecked();

    fireEvent.click(removeEmptyLinesSwitch);
    expect(removeEmptyLinesSwitch).not.toBeChecked();
  });
});
