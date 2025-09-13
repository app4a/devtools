import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MarkdownEditor from '../components/MarkdownEditor';

// Mock navigator.clipboard
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn().mockImplementation(() => Promise.resolve()),
  },
});

// Mock react-markdown and related plugins
jest.mock('react-markdown', () => {
  return function MockReactMarkdown({ children }) {
    return <div data-testid="markdown-preview">{children}</div>;
  };
});

jest.mock('remark-gfm', () => () => {});
jest.mock('remark-math', () => () => {});
jest.mock('rehype-katex', () => () => {});
jest.mock('rehype-highlight', () => () => {});

describe('MarkdownEditor', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with default content', () => {
    render(<MarkdownEditor name="Markdown Editor" description="Professional markdown editor." />);
    
    expect(screen.getByText('Markdown Editor')).toBeInTheDocument();
    expect(screen.getByText('Professional markdown editor.')).toBeInTheDocument();
    expect(screen.getByText('Editor Options')).toBeInTheDocument();
    expect(screen.getByText('Document')).toBeInTheDocument();
  });

  it('displays default markdown content', () => {
    render(<MarkdownEditor name="Markdown Editor" description="Professional markdown editor." />);
    
    // Check for markdown editor with default content
    expect(screen.getByDisplayValue(/# Welcome to Markdown Editor/)).toBeInTheDocument();
  });

  it('switches between view modes', async () => {
    render(<MarkdownEditor name="Markdown Editor" description="Professional markdown editor." />);

    // Should start in split view
    expect(screen.getByDisplayValue(/# Welcome to Markdown Editor/)).toBeInTheDocument();
    expect(screen.getByTestId('markdown-preview')).toBeInTheDocument();

    // Switch to edit only
    const editOnlyButton = screen.getByRole('button', { name: /Edit Only/i });
    fireEvent.click(editOnlyButton);

    // Should still show editor
    expect(screen.getByDisplayValue(/# Welcome to Markdown Editor/)).toBeInTheDocument();

    // Switch to preview only
    const previewOnlyButton = screen.getByRole('button', { name: /Preview Only/i });
    fireEvent.click(previewOnlyButton);

    // Should show preview
    expect(screen.getByTestId('markdown-preview')).toBeInTheDocument();
  });

  it('updates markdown content', async () => {
    render(<MarkdownEditor name="Markdown Editor" description="Professional markdown editor." />);

    const editor = screen.getByDisplayValue(/# Welcome to Markdown Editor/);
    fireEvent.change(editor, { target: { value: '# New Heading\n\nTest content' } });

    await waitFor(() => {
      // Check if the content appears in the textarea
      const textarea = screen.getByRole('textbox');
      expect(textarea.value).toBe('# New Heading\n\nTest content');
    });
  });

  it('inserts table when button clicked', async () => {
    render(<MarkdownEditor name="Markdown Editor" description="Professional markdown editor." />);

    const insertTableButton = screen.getByRole('button', { name: /Insert Table/i });
    fireEvent.click(insertTableButton);

    // Should open table dialog
    expect(screen.getByText('Generate Table')).toBeInTheDocument();
    
    // Click insert
    const insertButton = screen.getByRole('button', { name: /Insert Table/i });
    fireEvent.click(insertButton);
  });

  it('inserts math equation when button clicked', async () => {
    render(<MarkdownEditor name="Markdown Editor" description="Professional markdown editor." />);

    const insertMathButton = screen.getByRole('button', { name: /Insert Math/i });
    fireEvent.click(insertMathButton);

    await waitFor(() => {
      const editor = screen.getByDisplayValue(/\$\$\\int_\{a\}\^\{b\} f\(x\) dx\$\$/);
      expect(editor).toBeInTheDocument();
    });
  });

  it('copies markdown to clipboard', async () => {
    render(<MarkdownEditor name="Markdown Editor" description="Professional markdown editor." />);

    const copyButton = screen.getByRole('button', { name: /Copy Markdown/i });
    fireEvent.click(copyButton);

    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        expect.stringContaining('# Welcome to Markdown Editor')
      );
    });
  });

  it('handles file upload', async () => {
    render(<MarkdownEditor name="Markdown Editor" description="Professional markdown editor." />);

    const fileInput = document.getElementById('file-upload');
    
    const file = new File(['# Uploaded Markdown'], 'test.md', { type: 'text/markdown' });
    Object.defineProperty(fileInput, 'files', {
      value: [file],
      writable: false,
    });

    fireEvent.change(fileInput);

    await waitFor(() => {
      expect(screen.getByDisplayValue('# Uploaded Markdown')).toBeInTheDocument();
    });
  });

  it('switches between tabs correctly', () => {
    render(<MarkdownEditor name="Markdown Editor" description="Professional markdown editor." />);

    // Switch to Examples tab
    const examplesTab = screen.getByRole('tab', { name: /Examples/i });
    fireEvent.click(examplesTab);

    expect(screen.getByText('Quick Examples')).toBeInTheDocument();

    // Switch to Cheat Sheet tab
    const cheatSheetTab = screen.getByRole('tab', { name: /Cheat Sheet/i });
    fireEvent.click(cheatSheetTab);

    expect(screen.getByText('Markdown Cheat Sheet')).toBeInTheDocument();
  });

  it('loads example when clicked', async () => {
    render(<MarkdownEditor name="Markdown Editor" description="Professional markdown editor." />);

    // Switch to Examples tab
    const examplesTab = screen.getByRole('tab', { name: /Examples/i });
    fireEvent.click(examplesTab);

    // Click on an example
    const basicDocExample = screen.getByText('Simple Blog Post');
    fireEvent.click(basicDocExample);

    await waitFor(() => {
      // Should switch back to editor tab and load the example
      expect(screen.getByDisplayValue(/# Getting Started with React Hooks/)).toBeInTheDocument();
    });
  });

  it('displays document statistics', () => {
    render(<MarkdownEditor name="Markdown Editor" description="Professional markdown editor." />);

    expect(screen.getByText('Document Statistics')).toBeInTheDocument();
    expect(screen.getByText('Characters')).toBeInTheDocument();
    expect(screen.getByText('Words')).toBeInTheDocument();
    expect(screen.getByText('Reading Time')).toBeInTheDocument();
  });

  it('downloads markdown file', async () => {
    // Mock URL.createObjectURL and revokeObjectURL
    global.URL.createObjectURL = jest.fn().mockReturnValue('mock-url');
    global.URL.revokeObjectURL = jest.fn();

    render(<MarkdownEditor name="Markdown Editor" description="Professional markdown editor." />);

    const downloadButton = screen.getByRole('button', { name: /Download Markdown/i });
    fireEvent.click(downloadButton);

    expect(global.URL.createObjectURL).toHaveBeenCalled();
  });

  it('downloads HTML file', async () => {
    // Mock URL.createObjectURL and revokeObjectURL
    global.URL.createObjectURL = jest.fn().mockReturnValue('mock-url');
    global.URL.revokeObjectURL = jest.fn();

    render(<MarkdownEditor name="Markdown Editor" description="Professional markdown editor." />);

    const downloadHtmlButton = screen.getByRole('button', { name: /Export as HTML/i });
    fireEvent.click(downloadHtmlButton);

    expect(global.URL.createObjectURL).toHaveBeenCalled();
  });
});
