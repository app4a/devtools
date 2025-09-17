import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SortDedup from '../components/SortDedup';

describe('SortDedup', () => {
  it('renders sort and dedup interface', () => {
    render(<SortDedup name="Text Sort & Dedup Tool" description="Sort and deduplicate text lines" />);
    
    expect(screen.getByText('Text Sort & Dedup Tool')).toBeInTheDocument();
    expect(screen.getByText('Sort and deduplicate text lines')).toBeInTheDocument();
    expect(screen.getByText('Input Text')).toBeInTheDocument();
    expect(screen.getByText('Processing Options')).toBeInTheDocument();
    expect(screen.getByText('Statistics')).toBeInTheDocument();
    expect(screen.getByText('Processed Output')).toBeInTheDocument();
  });

  it('displays default example text', () => {
    render(<SortDedup name="Text Sort & Dedup Tool" description="Sort and deduplicate text lines" />);
    
    const inputTextarea = screen.getByPlaceholderText(/Enter text to sort and deduplicate/);
    expect(inputTextarea.value).toContain('apple');
    expect(inputTextarea.value).toContain('banana');
    expect(inputTextarea.value).toContain('cherry');
  });

  it('processes text without sorting by default', async () => {
    render(<SortDedup name="Text Sort & Dedup Tool" description="Sort and deduplicate text lines" />);
    
    const inputTextarea = screen.getByPlaceholderText(/Enter text to sort and deduplicate/);
    
    // Clear and set new input - should maintain original order since no sorting by default
    fireEvent.change(inputTextarea, { target: { value: 'zebra\napple\nbanana' } });
    
    await waitFor(() => {
      const outputTextarea = screen.getAllByRole('textbox').find(textarea => 
        textarea.readOnly
      );
      expect(outputTextarea).toBeTruthy();
      expect(outputTextarea.value).toBe('zebra\napple\nbanana');
    });
  });

  it('keeps duplicates by default', async () => {
    render(<SortDedup name="Text Sort & Dedup Tool" description="Sort and deduplicate text lines" />);
    
    const inputTextarea = screen.getByPlaceholderText(/Enter text to sort and deduplicate/);
    
    // Set input with duplicates - should keep all since dedup is off by default
    fireEvent.change(inputTextarea, { target: { value: 'apple\nbanana\napple\ncherry\nbanana' } });
    
    await waitFor(() => {
      const outputTextarea = screen.getAllByRole('textbox').find(textarea => 
        textarea.readOnly
      );
      expect(outputTextarea).toBeTruthy();
      
      const lines = outputTextarea.value.split('\n');
      expect(lines).toHaveLength(5); // Should keep all lines including duplicates
      expect(lines.filter(line => line === 'apple')).toHaveLength(2);
      expect(lines.filter(line => line === 'banana')).toHaveLength(2);
      expect(lines.filter(line => line === 'cherry')).toHaveLength(1);
    });
  });

  it('displays correct statistics', async () => {
    render(<SortDedup name="Text Sort & Dedup Tool" description="Sort and deduplicate text lines" />);
    
    const inputTextarea = screen.getByPlaceholderText(/Enter text to sort and deduplicate/);
    
    // Set input with known data
    fireEvent.change(inputTextarea, { target: { value: 'line1\nline2\nline1\nline3' } });
    
    await waitFor(() => {
      // Check statistics are displayed (there may be multiple instances of the same number)
      expect(screen.getAllByText('4')).toHaveLength(2); // Original and processed lines should both be 4
      expect(screen.getByText('0')).toBeInTheDocument(); // Lines removed (should be 0, not -0)
    });
  });

  it('has sorting controls available', () => {
    render(<SortDedup name="Text Sort & Dedup Tool" description="Sort and deduplicate text lines" />);
    
    // Check that sorting section exists
    expect(screen.getByText('Sorting')).toBeInTheDocument();
    
    // Check default value for sort type select (there should be at least one select with 'none')
    expect(screen.getByDisplayValue('none')).toBeInTheDocument();
  });

  it('keeps all lines with default settings (no dedup)', async () => {
    render(<SortDedup name="Text Sort & Dedup Tool" description="Sort and deduplicate text lines" />);
    
    const inputTextarea = screen.getByPlaceholderText(/Enter text to sort and deduplicate/);
    fireEvent.change(inputTextarea, { target: { value: 'first\nsecond\nfirst\nthird' } });
    
    await waitFor(() => {
      const outputTextarea = screen.getAllByRole('textbox').find(textarea => 
        textarea.readOnly
      );
      const lines = outputTextarea.value.split('\n');
      expect(lines).toHaveLength(4); // Should keep all lines since dedup is off by default
      expect(lines.filter(line => line === 'first')).toHaveLength(2);
      expect(lines.filter(line => line === 'second')).toHaveLength(1);
      expect(lines.filter(line => line === 'third')).toHaveLength(1);
    });
  });

  it('can enable deduplication when needed', async () => {
    render(<SortDedup name="Text Sort & Dedup Tool" description="Sort and deduplicate text lines" />);
    
    // Enable deduplication (default is off)
    const dedupCheckbox = screen.getByLabelText('Remove Duplicates');
    fireEvent.click(dedupCheckbox);
    
    const inputTextarea = screen.getByPlaceholderText(/Enter text to sort and deduplicate/);
    fireEvent.change(inputTextarea, { target: { value: 'apple\napple\nbanana' } });
    
    await waitFor(() => {
      const outputTextarea = screen.getAllByRole('textbox').find(textarea => 
        textarea.readOnly
      );
      const lines = outputTextarea.value.split('\n').filter(line => line.trim());
      expect(lines).toHaveLength(2); // Should remove duplicates when enabled
      expect(lines).toContain('apple');
      expect(lines).toContain('banana');
    });
  });

  it('has deduplication section available', () => {
    render(<SortDedup name="Text Sort & Dedup Tool" description="Sort and deduplicate text lines" />);
    
    // Deduplication section should always be visible
    expect(screen.getByText('Deduplication')).toBeInTheDocument();
  });

  it('has basic functionality working', () => {
    render(<SortDedup name="Text Sort & Dedup Tool" description="Sort and deduplicate text lines" />);
    
    // Basic components should render
    expect(screen.getByText('Statistics')).toBeInTheDocument();
    expect(screen.getByText('Processed Output')).toBeInTheDocument();
  });

  it('switches between tabs', () => {
    render(<SortDedup name="Text Sort & Dedup Tool" description="Sort and deduplicate text lines" />);
    
    // Switch to Examples tab
    const examplesTab = screen.getByRole('tab', { name: /Examples/i });
    fireEvent.click(examplesTab);
    
    expect(screen.getByText('Email List Cleanup')).toBeInTheDocument();
    expect(screen.getByText('Click on any example to load it into the editor.')).toBeInTheDocument();
    
    // Switch to Guide tab
    const guideTab = screen.getByRole('tab', { name: /Guide/i });
    fireEvent.click(guideTab);
    
    expect(screen.getByText('Sort & Dedup Guide')).toBeInTheDocument();
    expect(screen.getByText('Sorting Options')).toBeInTheDocument();
  });

  it('loads example when clicked', async () => {
    render(<SortDedup name="Text Sort & Dedup Tool" description="Sort and deduplicate text lines" />);
    
    // Switch to Examples tab
    const examplesTab = screen.getByRole('tab', { name: /Examples/i });
    fireEvent.click(examplesTab);
    
    // Click on an example
    const emailExample = screen.getByText('Email List Cleanup');
    fireEvent.click(emailExample);
    
    // Should switch back to main tab
    await waitFor(() => {
      const inputTextarea = screen.getByPlaceholderText(/Enter text to sort and deduplicate/);
      expect(inputTextarea.value).toContain('@example.com');
    });
  });

  it('displays processing options', () => {
    render(<SortDedup name="Text Sort & Dedup Tool" description="Sort and deduplicate text lines" />);
    
    expect(screen.getByText('Sorting')).toBeInTheDocument();
    expect(screen.getByText('Deduplication')).toBeInTheDocument();
    expect(screen.getByText('Processing Options')).toBeInTheDocument();
    
    // Only deduplication checkbox is visible by default (when sort type is 'none')
    expect(screen.getByLabelText('Remove Duplicates')).toBeInTheDocument();
  });

  it('handles file upload placeholder', () => {
    render(<SortDedup name="Text Sort & Dedup Tool" description="Sort and deduplicate text lines" />);
    
    const uploadButton = screen.getByText('Upload File');
    expect(uploadButton).toBeInTheDocument();
    
    const fileInput = document.getElementById('file-upload');
    expect(fileInput).toBeInTheDocument();
    expect(fileInput.type).toBe('file');
  });

  it('has working deduplication checkbox', () => {
    render(<SortDedup name="Text Sort & Dedup Tool" description="Sort and deduplicate text lines" />);
    
    // Only test the checkbox that's visible by default
    const removeDuplicatesCheckbox = screen.getByLabelText('Remove Duplicates');
    
    expect(removeDuplicatesCheckbox.checked).toBe(false); // Default is now disabled
    
    fireEvent.click(removeDuplicatesCheckbox);
    expect(removeDuplicatesCheckbox.checked).toBe(true);
  });

  it('displays guide content in accordion', () => {
    render(<SortDedup name="Text Sort & Dedup Tool" description="Sort and deduplicate text lines" />);
    
    // Switch to Guide tab
    const guideTab = screen.getByRole('tab', { name: /Guide/i });
    fireEvent.click(guideTab);
    
    // Check accordion headers
    expect(screen.getByText('Sorting Options')).toBeInTheDocument();
    expect(screen.getByText('Deduplication Options')).toBeInTheDocument();
    expect(screen.getByText('Common Use Cases')).toBeInTheDocument();
    
    // Expand an accordion
    const sortingAccordion = screen.getByText('Sorting Options');
    fireEvent.click(sortingAccordion);
    
    expect(screen.getByText(/Alphabetical:/)).toBeInTheDocument();
    expect(screen.getByText(/By Length:/)).toBeInTheDocument();
  });
});
