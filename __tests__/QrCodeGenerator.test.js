import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import QrCodeGenerator from '../components/QrCodeGenerator';

// Mock canvas for testing environment
beforeAll(() => {
  Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
    value: (contextType) => {
      if (contextType === '2d') {
        return {
          createImageData: jest.fn(() => ({ data: new Uint8ClampedArray(4) })),
          putImageData: jest.fn(),
          fillRect: jest.fn(),
          canvas: {
            width: 100,
            height: 100,
            toDataURL: jest.fn(() => 'data:image/png;base64,test')
          }
        };
      }
      return null;
    },
  });
  
  // Mock navigator.clipboard
  Object.defineProperty(navigator, 'clipboard', {
    value: {
      writeText: jest.fn(() => Promise.resolve()),
    },
    writable: true,
  });
});

describe('QrCodeGenerator', () => {
  it('renders QR code generator interface', () => {
    render(<QrCodeGenerator name="QR Code Generator" description="Generate QR codes" />);
    
    expect(screen.getByText('QR Code Generator')).toBeInTheDocument();
    expect(screen.getByText('Generate QR codes')).toBeInTheDocument();
    expect(screen.getByText('QR Code Content')).toBeInTheDocument();
    expect(screen.getByText('Generated QR Code')).toBeInTheDocument();
  });

  it('has text input with default value', () => {
    render(<QrCodeGenerator name="QR Code Generator" description="Generate QR codes" />);
    
    const textInput = screen.getByRole('textbox');
    expect(textInput).toBeInTheDocument();
    expect(textInput.value).toBe('https://app4a.github.io/devtools');
  });

  it('shows customization options', () => {
    render(<QrCodeGenerator name="QR Code Generator" description="Generate QR codes" />);
    
    expect(screen.getByText('Customization')).toBeInTheDocument();
    expect(screen.getByText(/Size:/)).toBeInTheDocument();
    expect(screen.getAllByText('Error Correction')).toHaveLength(3); // Label, select label, and table
  });

  it('shows QR code types guide', () => {
    render(<QrCodeGenerator name="QR Code Generator" description="Generate QR codes" />);
    
    expect(screen.getByText('QR Code Types & Formats')).toBeInTheDocument();
    expect(screen.getByText(/URL:/)).toBeInTheDocument();
    expect(screen.getByText(/WiFi:/)).toBeInTheDocument();
    expect(screen.getByText(/Email:/)).toBeInTheDocument();
  });

  it('has download button', () => {
    render(<QrCodeGenerator name="QR Code Generator" description="Generate QR codes" />);
    
    const downloadButton = screen.getByText(/Download PNG/);
    expect(downloadButton).toBeInTheDocument();
  });

  it('updates text input when typing', async () => {
    render(<QrCodeGenerator name="QR Code Generator" description="Generate QR codes" />);
    
    const textInput = screen.getByRole('textbox');
    
    await act(async () => {
      fireEvent.change(textInput, { target: { value: 'https://example.com' } });
    });
    
    expect(textInput.value).toBe('https://example.com');
  });
});
