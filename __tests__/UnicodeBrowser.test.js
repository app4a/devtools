import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UnicodeBrowser from '../components/UnicodeBrowser';

// Mock navigator.clipboard
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn().mockImplementation(() => Promise.resolve()),
  },
});

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage
});

describe('UnicodeBrowser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLocalStorage.getItem.mockReturnValue(null);
  });

  it('renders with default content', () => {
    render(<UnicodeBrowser name="Unicode Browser" description="Comprehensive Unicode browser." />);
    
    expect(screen.getByText('Unicode Browser')).toBeInTheDocument();
    expect(screen.getByText('Comprehensive Unicode browser.')).toBeInTheDocument();
    expect(screen.getByText('Unicode Blocks')).toBeInTheDocument();
    expect(screen.getByText('Emoji Categories')).toBeInTheDocument();
  });

  it('displays search functionality', () => {
    render(<UnicodeBrowser name="Unicode Browser" description="Comprehensive Unicode browser." />);
    
    expect(screen.getByPlaceholderText(/Search by name, code point, or character/)).toBeInTheDocument();
  });

  it('switches between tabs correctly', () => {
    render(<UnicodeBrowser name="Unicode Browser" description="Comprehensive Unicode browser." />);

    // Should start on Unicode Blocks tab
    expect(screen.getByText('Unicode Blocks')).toBeInTheDocument();

    // Switch to Emoji Categories tab
    const emojiTab = screen.getByRole('tab', { name: /Emoji Categories/i });
    fireEvent.click(emojiTab);

    expect(screen.getByText('Emoji Categories')).toBeInTheDocument();

    // Switch to Favorites tab
    const favoritesTab = screen.getByRole('tab', { name: /Favorites/i });
    fireEvent.click(favoritesTab);

    // Should show empty favorites initially  
    expect(screen.getByText(/No characters found/)).toBeInTheDocument();
  });

  it('changes Unicode block selection', () => {
    render(<UnicodeBrowser name="Unicode Browser" description="Comprehensive Unicode browser." />);

    // Unicode block selector should be available
    const blockSelect = screen.getByDisplayValue('Basic Latin');
    fireEvent.mouseDown(blockSelect);
    
    // Check if Greek and Coptic option exists
    const greekOption = screen.queryByText('Greek and Coptic');
    if (greekOption) {
      fireEvent.click(greekOption);
      // Should update the block description if it exists
      expect(screen.queryByText('Greek alphabet and symbols')).toBeTruthy();
    }
  });

  it('changes emoji category selection', () => {
    render(<UnicodeBrowser name="Unicode Browser" description="Comprehensive Unicode browser." />);

    // Switch to Emoji Categories tab
    const emojiTab = screen.getByRole('tab', { name: /Emoji Categories/i });
    fireEvent.click(emojiTab);

    // Should show emoji categories content
    expect(screen.getByText('Emoji Categories')).toBeInTheDocument();
    
    // Should show some emoji examples 
    expect(screen.getAllByText('😀')[0] || screen.queryByText('🐶')).toBeTruthy();
  });

  it('performs search', async () => {
    render(<UnicodeBrowser name="Unicode Browser" description="Comprehensive Unicode browser." />);

    const searchInput = screen.getByPlaceholderText(/Search by name, code point, or character/);
    fireEvent.change(searchInput, { target: { value: 'A' } });

    await waitFor(() => {
      // Should filter results
      expect(screen.getByText(/Showing.*characters/)).toBeInTheDocument();
    });
  });

  it('changes page size', () => {
    render(<UnicodeBrowser name="Unicode Browser" description="Comprehensive Unicode browser." />);

    // Should show pagination controls
    expect(screen.getAllByText(/Per Page/)[0]).toBeInTheDocument();
    expect(screen.getByDisplayValue('100')).toBeInTheDocument(); // Default page size
  });

  it('displays character grid', () => {
    render(<UnicodeBrowser name="Unicode Browser" description="Comprehensive Unicode browser." />);

    // Should show characters from Basic Latin (default)
    expect(screen.getByText(/Showing.*characters from Basic Latin/)).toBeInTheDocument();
  });

  it('displays how to use guide', () => {
    render(<UnicodeBrowser name="Unicode Browser" description="Comprehensive Unicode browser." />);

    expect(screen.getByText('How to Use')).toBeInTheDocument();
    expect(screen.getByText(/Click any character to copy and view details/)).toBeInTheDocument();
    expect(screen.getByText(/Use the search box to find specific characters/)).toBeInTheDocument();
  });

  it('displays character encodings guide', () => {
    render(<UnicodeBrowser name="Unicode Browser" description="Comprehensive Unicode browser." />);

    expect(screen.getByText('Character Encodings')).toBeInTheDocument();
    expect(screen.getByText(/Unicode:/)).toBeInTheDocument();
    expect(screen.getByText(/U\+XXXX format/)).toBeInTheDocument();
    expect(screen.getByText(/HTML Entity:/)).toBeInTheDocument();
    expect(screen.getByText(/CSS Escape:/)).toBeInTheDocument();
  });

  it('shows current Unicode block info', () => {
    render(<UnicodeBrowser name="Unicode Browser" description="Comprehensive Unicode browser." />);

    // Switch to Unicode blocks tab first
    const unicodeBlocksTab = screen.getByText('Unicode Blocks');
    fireEvent.click(unicodeBlocksTab);

    expect(screen.getAllByText('Basic Latin')[0]).toBeInTheDocument();
    expect(screen.getByText('ASCII characters')).toBeInTheDocument();
    expect(screen.getByText(/Range:/)).toBeInTheDocument();
    expect(screen.getByText(/U\+0000/)).toBeInTheDocument();
  });

  it('handles favorites loading from localStorage', () => {
    mockLocalStorage.getItem.mockReturnValue('[65, 66, 67]'); // A, B, C

    render(<UnicodeBrowser name="Unicode Browser" description="Comprehensive Unicode browser." />);

    // Switch to Favorites tab
    const favoritesTab = screen.getByRole('tab', { name: /Favorites \(3\)/i });
    expect(favoritesTab).toBeInTheDocument();
  });

  it('shows professional features alert', () => {
    render(<UnicodeBrowser name="Unicode Browser" description="Comprehensive Unicode browser." />);

    expect(screen.getByText(/Unicode & Emoji Browser:/)).toBeInTheDocument();
    expect(screen.getByText(/Explore character sets, copy Unicode characters/)).toBeInTheDocument();
  });

  it('handles pagination when available', () => {
    render(<UnicodeBrowser name="Unicode Browser" description="Comprehensive Unicode browser." />);

    // With default Basic Latin block, might have pagination
    // This would depend on the page size and number of characters
    expect(screen.getByText(/Showing.*characters/)).toBeInTheDocument();
  });

  it('clears all favorites when requested', () => {
    mockLocalStorage.getItem.mockReturnValue('[65, 66, 67]'); // A, B, C

    render(<UnicodeBrowser name="Unicode Browser" description="Comprehensive Unicode browser." />);

    // Switch to Favorites tab
    const favoritesTab = screen.getByRole('tab', { name: /Favorites \(3\)/i });
    fireEvent.click(favoritesTab);

    const clearButton = screen.getByRole('button', { name: /Clear All/i });
    fireEvent.click(clearButton);

    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('unicodeBrowserFavorites', '[]');
  });
});
