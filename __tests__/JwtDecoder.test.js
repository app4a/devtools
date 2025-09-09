import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import JwtDecoder from '../components/JwtDecoder';

// Mock the jose library
jest.mock('jose', () => ({
  jwtVerify: jest.fn(() => Promise.resolve({
    payload: {
      sub: '1234567890',
      name: 'Mock User',
      admin: true,
      iat: 1234567890,
    },
  })),
}));

describe('JwtDecoder', () => {
  it('decodes sample JWT token and displays parts', async () => {
    render(<JwtDecoder name="JWT Decoder" description="Decode JWT tokens." />);

    // The component uses a sample token by default, so we just need to wait for rendering
    // and then check the displayed values.

    expect(await screen.findByText(/Header:/i)).toBeInTheDocument();
    expect(await screen.findByText(/Payload:/i)).toBeInTheDocument();
    expect(await screen.findByText(/Signature Verification:/i)).toBeInTheDocument();

    // Check for parts of the decoded header and payload from the sample token
    expect(screen.getByText(/{ "alg": "HS256", "typ": "JWT" }/i)).toBeInTheDocument();
    expect(screen.getByText(/{ "sub": "1234567890", "name": "John Doe", "admin": true, "iat": 1516239022 }/i)).toBeInTheDocument();

    // Signature verification might take a moment due to async nature
    expect(await screen.findByText(/Verified/i)).toBeInTheDocument();
  });
});
