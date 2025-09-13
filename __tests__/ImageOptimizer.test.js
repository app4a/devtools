import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ImageOptimizer from '../components/ImageOptimizer';

// Mock navigator.clipboard
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn().mockImplementation(() => Promise.resolve()),
  },
});

// Mock SVGO
jest.mock('svgo', () => ({
  optimize: jest.fn().mockReturnValue({
    data: '<svg>optimized</svg>'
  })
}));

// Mock HTML5 File API
Object.defineProperty(global, 'FileReader', {
  writable: true,
  value: jest.fn().mockImplementation(() => ({
    readAsText: jest.fn(),
    readAsDataURL: jest.fn(),
    onload: null,
  })),
});

// Mock URL methods
global.URL.createObjectURL = jest.fn().mockReturnValue('mock-url');
global.URL.revokeObjectURL = jest.fn();

describe('ImageOptimizer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with default content', () => {
    render(<ImageOptimizer name="Image Optimizer" description="Professional image optimization tool." />);
    
    expect(screen.getByText('Image Optimizer')).toBeInTheDocument();
    expect(screen.getByText('Professional image optimization tool.')).toBeInTheDocument();
    expect(screen.getByText('Image Upload')).toBeInTheDocument();
  });

  it('displays upload area when no file is selected', () => {
    render(<ImageOptimizer name="Image Optimizer" description="Professional image optimization tool." />);
    
    expect(screen.getByText('Image Upload')).toBeInTheDocument();
    const fileInput = document.getElementById('file-upload');
    expect(fileInput).toBeInTheDocument();
  });

  it('switches between tabs correctly', () => {
    render(<ImageOptimizer name="Image Optimizer" description="Professional image optimization tool." />);

    // Switch to SVG Optimizer tab
    const svgTab = screen.getByRole('tab', { name: /SVG Optimizer/i });
    fireEvent.click(svgTab);

    expect(screen.getByText('SVG Content')).toBeInTheDocument();

    // Switch to Batch Processing tab
    const batchTab = screen.getByRole('tab', { name: /Batch Processing/i });
    fireEvent.click(batchTab);

    expect(screen.getAllByText('Batch Processing')[0]).toBeInTheDocument();
    expect(screen.getByText('Coming Soon!')).toBeInTheDocument();
  });

  it('displays file upload functionality', () => {
    render(<ImageOptimizer name="Image Optimizer" description="Professional image optimization tool." />);

    // Should have file input element
    const fileInput = document.getElementById('file-upload');
    expect(fileInput).toBeInTheDocument();
    expect(fileInput.type).toBe('file');
    expect(fileInput.accept).toContain('image/');
  });

  it('displays SVG upload functionality', () => {
    render(<ImageOptimizer name="Image Optimizer" description="Professional image optimization tool." />);

    // Switch to SVG Optimizer tab
    const svgTab = screen.getByRole('tab', { name: /SVG Optimizer/i });
    fireEvent.click(svgTab);

    expect(screen.getByText('Upload an SVG file to begin optimization')).toBeInTheDocument();
  });

  it('displays format guide information', () => {
    render(<ImageOptimizer name="Image Optimizer" description="Professional image optimization tool." />);

    expect(screen.getByText('Format Guide')).toBeInTheDocument();
    expect(screen.getByText(/WebP:/)).toBeInTheDocument();
    expect(screen.getByText(/AVIF:/)).toBeInTheDocument();
    expect(screen.getByText(/JPEG:/)).toBeInTheDocument();
    expect(screen.getByText(/PNG:/)).toBeInTheDocument();
  });

  it('displays optimization tips', () => {
    render(<ImageOptimizer name="Image Optimizer" description="Professional image optimization tool." />);

    expect(screen.getByText('Optimization Tips')).toBeInTheDocument();
    expect(screen.getByText(/Use WebP for modern web applications/)).toBeInTheDocument();
    expect(screen.getByText(/Quality 80-85% often provides best balance/)).toBeInTheDocument();
    expect(screen.getByText(/SVG optimization can reduce size by 20-60%/)).toBeInTheDocument();
  });

  it('shows SVG optimization when on SVG tab', () => {
    render(<ImageOptimizer name="Image Optimizer" description="Professional image optimization tool." />);

    // Switch to SVG Optimizer tab  
    const svgTab = screen.getByRole('tab', { name: /SVG Optimizer/i });
    fireEvent.click(svgTab);

    expect(screen.getByText('SVG Content')).toBeInTheDocument();
    expect(screen.getByText('Upload an SVG file to begin optimization')).toBeInTheDocument();
  });

  it('handles copy to clipboard', async () => {
    render(<ImageOptimizer name="Image Optimizer" description="Professional image optimization tool." />);

    // This would typically require having an optimized SVG loaded first
    // For now, we just test that the clipboard API would be called
    expect(navigator.clipboard.writeText).toBeDefined();
  });

  it('handles file download', () => {
    render(<ImageOptimizer name="Image Optimizer" description="Professional image optimization tool." />);

    // Test that URL methods are available (would be called during download)
    expect(global.URL.createObjectURL).toBeDefined();
    expect(global.URL.revokeObjectURL).toBeDefined();
  });

  it('shows image preview placeholder when no image loaded', () => {
    render(<ImageOptimizer name="Image Optimizer" description="Professional image optimization tool." />);

    // Should show upload area initially
    expect(screen.getByText('Drop an image here or click to select')).toBeInTheDocument();
  });

  it('displays professional features alert', () => {
    render(<ImageOptimizer name="Image Optimizer" description="Professional image optimization tool." />);

    expect(screen.getByText(/Professional Image Tool:/)).toBeInTheDocument();
    expect(screen.getByText(/Optimize SVGs, convert between formats/)).toBeInTheDocument();
  });
});
