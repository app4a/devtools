require('@testing-library/jest-dom');

// Suppress console.error and console.warn in tests unless explicitly needed
const originalError = console.error;
const originalWarn = console.warn;

beforeEach(() => {
  console.error = jest.fn((message, ...args) => {
    // Only suppress known test-environment specific errors
    if (
      message && typeof message === 'string' && 
      (message.includes('QR Code generation failed') ||
       message.includes('Failed to copy text') ||
       message.includes('Canvas QR generation failed'))
    ) {
      return;
    }
    originalError(message, ...args);
  });
  
  console.warn = jest.fn((message, ...args) => {
    // Suppress MUI Grid warnings and other known warnings
    if (
      message && typeof message === 'string' && 
      (message.includes('MUI Grid:') ||
       message.includes('Canvas QR generation failed'))
    ) {
      return;
    }
    originalWarn(message, ...args);
  });
});

afterEach(() => {
  console.error = originalError;
  console.warn = originalWarn;
});

if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = require('util').TextEncoder;
}
if (typeof global.TextDecoder === 'undefined') {
  global.TextDecoder = require('util').TextDecoder;
}

// Polyfill for Web Crypto API (minimal for jose)
if (typeof global.self.crypto === 'undefined') {
  global.self.crypto = {
    getRandomValues: (arr) => {
      for (let i = 0; i < arr.length; i++) {
        arr[i] = Math.floor(Math.random() * 256);
      }
      return arr;
    },
    subtle: {}, // jose might try to access subtle.importKey, etc.
  };
}

// Mock Canvas API for components that use QR codes, charts, etc.
Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
  value: (contextType) => {
    if (contextType === '2d') {
      return {
        createImageData: jest.fn(() => ({ data: new Uint8ClampedArray(4) })),
        putImageData: jest.fn(),
        fillRect: jest.fn(),
        clearRect: jest.fn(),
        drawImage: jest.fn(),
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

// Mock navigator.clipboard for copy functionality
Object.defineProperty(navigator, 'clipboard', {
  value: {
    writeText: jest.fn(() => Promise.resolve()),
    readText: jest.fn(() => Promise.resolve('')),
  },
  writable: true,
});

// Mock URL.createObjectURL for file downloads
global.URL.createObjectURL = jest.fn(() => 'blob:mock-url');
global.URL.revokeObjectURL = jest.fn();

// Mock document.createElement for download links
const originalCreateElement = document.createElement.bind(document);
document.createElement = jest.fn().mockImplementation((tagName) => {
  if (tagName === 'a') {
    const element = originalCreateElement(tagName);
    element.click = jest.fn();
    return element;
  }
  return originalCreateElement(tagName);
});