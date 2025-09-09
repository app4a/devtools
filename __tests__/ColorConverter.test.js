import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import ColorConverter from '../components/ColorConverter';

// Mock navigator.clipboard
const mockClipboard = {
  writeText: jest.fn(() => Promise.resolve()),
};
Object.assign(navigator, { clipboard: mockClipboard });

describe('ColorConverter', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders color converter with all tabs', () => {
    render(<ColorConverter name="Color Converter" description="Convert colors." />);
    
    expect(screen.getByText('Color Converter')).toBeInTheDocument();
    expect(screen.getByText('Accessibility')).toBeInTheDocument();
    expect(screen.getByText('Color Harmony')).toBeInTheDocument();
    expect(screen.getByText('Saved Palettes')).toBeInTheDocument();
  });

  it('displays color formats table', () => {
    render(<ColorConverter name="Color Converter" description="Convert colors." />);
    
    expect(screen.getByText('Color Formats')).toBeInTheDocument();
    expect(screen.getByText(/HEX/)).toBeInTheDocument();
    expect(screen.getByText(/RGB/)).toBeInTheDocument();
    expect(screen.getByText(/HSL/)).toBeInTheDocument();
    expect(screen.getByText(/RGBA/)).toBeInTheDocument();
    expect(screen.getByText(/HSLA/)).toBeInTheDocument();
    expect(screen.getByText(/HSV/)).toBeInTheDocument();
  });

  it('shows color preview with default color', () => {
    render(<ColorConverter name="Color Converter" description="Convert colors." />);
    
    // Check for the default color value in the table
    expect(screen.getByText('#1976D2')).toBeInTheDocument();
    expect(screen.getByText(/rgb\(25, 118, 210\)/)).toBeInTheDocument();
  });

  it('can copy color values to clipboard', async () => {
    render(<ColorConverter name="Color Converter" description="Convert colors." />);
    
    // Find copy buttons (there should be multiple for different formats)
    const copyButtons = screen.getAllByTitle(/Copy/i);
    expect(copyButtons.length).toBeGreaterThan(0);
    
    await act(async () => {
      fireEvent.click(copyButtons[0]);
    });

    expect(mockClipboard.writeText).toHaveBeenCalled();
  });

  it('switches to accessibility tab', async () => {
    render(<ColorConverter name="Color Converter" description="Convert colors." />);
    
    const accessibilityTab = screen.getByText('Accessibility');
    
    await act(async () => {
      fireEvent.click(accessibilityTab);
    });

    await waitFor(() => {
      expect(screen.getByText('Accessibility Checker')).toBeInTheDocument();
      expect(screen.getByText('WCAG Compliance Results')).toBeInTheDocument();
    });
  });

  it('shows accessibility information', async () => {
    render(<ColorConverter name="Color Converter" description="Convert colors." />);
    
    const accessibilityTab = screen.getByText('Accessibility');
    
    await act(async () => {
      fireEvent.click(accessibilityTab);
    });

    await waitFor(() => {
      expect(screen.getByText('Contrast Ratio')).toBeInTheDocument();
      expect(screen.getByText('WCAG AA (Normal)')).toBeInTheDocument();
      expect(screen.getByText('WCAG AAA')).toBeInTheDocument();
    });
  });

  it('switches to color harmony tab', async () => {
    render(<ColorConverter name="Color Converter" description="Convert colors." />);
    
    const harmonyTab = screen.getByText('Color Harmony');
    
    await act(async () => {
      fireEvent.click(harmonyTab);
    });

    await waitFor(() => {
      expect(screen.getByText('Color Harmony Generator')).toBeInTheDocument();
      expect(screen.getByText('Generated Palette')).toBeInTheDocument();
    });
  });

  it('can change harmony type', async () => {
    render(<ColorConverter name="Color Converter" description="Convert colors." />);
    
    const harmonyTab = screen.getByText('Color Harmony');
    
    await act(async () => {
      fireEvent.click(harmonyTab);
    });

    await waitFor(() => {
      const harmonySelect = screen.getByLabelText('Harmony Type');
      expect(harmonySelect).toBeInTheDocument();
    });
  });

  it('shows saved palettes tab', async () => {
    render(<ColorConverter name="Color Converter" description="Convert colors." />);
    
    const palettesTab = screen.getByText('Saved Palettes');
    
    await act(async () => {
      fireEvent.click(palettesTab);
    });

    await waitFor(() => {
      expect(screen.getByText('No saved palettes yet')).toBeInTheDocument();
    });
  });

  it('displays popular colors', () => {
    render(<ColorConverter name="Color Converter" description="Convert colors." />);
    
    expect(screen.getByText('Popular Colors')).toBeInTheDocument();
  });

  it('shows color theory guide', () => {
    render(<ColorConverter name="Color Converter" description="Convert colors." />);
    
    expect(screen.getByText('Color Theory Guide')).toBeInTheDocument();
    expect(screen.getByText('Quick Tips')).toBeInTheDocument();
  });

  it('can save a palette', async () => {
    render(<ColorConverter name="Color Converter" description="Convert colors." />);
    
    const saveButton = screen.getByText('Save Palette');
    
    await act(async () => {
      fireEvent.click(saveButton);
    });

    // Switch to saved palettes tab
    const palettesTab = screen.getByText('Saved Palettes');
    
    await act(async () => {
      fireEvent.click(palettesTab);
    });

    await waitFor(() => {
      expect(screen.getByText(/Palette 1/)).toBeInTheDocument();
    });
  });

  it('can export palette data', async () => {
    render(<ColorConverter name="Color Converter" description="Convert colors." />);
    
    const exportButton = screen.getByText('Export Data');
    
    // Mock URL.createObjectURL
    const mockCreateObjectURL = jest.fn(() => 'blob:mock-url');
    global.URL.createObjectURL = mockCreateObjectURL;
    
    // Mock document methods
    const mockClick = jest.fn();
    const mockAppendChild = jest.fn();
    const mockRemoveChild = jest.fn();
    
    const mockAnchor = {
      href: '',
      download: '',
      click: mockClick
    };
    
    jest.spyOn(document, 'createElement').mockReturnValue(mockAnchor);
    document.body.appendChild = mockAppendChild;
    document.body.removeChild = mockRemoveChild;
    
    await act(async () => {
      fireEvent.click(exportButton);
    });

    expect(mockCreateObjectURL).toHaveBeenCalled();
    expect(mockClick).toHaveBeenCalled();
  });

  it('changes background color for accessibility testing', async () => {
    render(<ColorConverter name="Color Converter" description="Convert colors." />);
    
    const accessibilityTab = screen.getByText('Accessibility');
    
    await act(async () => {
      fireEvent.click(accessibilityTab);
    });

    await waitFor(() => {
      const bgColorInput = screen.getByLabelText('Background Color');
      expect(bgColorInput).toBeInTheDocument();
      
      fireEvent.change(bgColorInput, { target: { value: '#000000' } });
      expect(bgColorInput.value).toBe('#000000');
    });
  });
});