export const toolCategories = [
  {
    name: 'Text Tools',
    tools: [
      { name: 'JSON Formatter', path: '/json', description: 'Format and validate JSON data for better readability.' },
      { name: 'Diff Tool', path: '/diff', description: 'Compare two text inputs and highlight the differences.' },
      { name: 'Multiline Formatter', path: '/multiline', description: 'Format multiline strings, useful for SQL queries or code snippets.' },
      { name: 'Regex Tester', path: '/regex', description: 'Test regular expressions against sample text. Highlight matches and capture groups.' },
      { name: 'Base64 Encoder/Decoder', path: '/base64', description: 'Encode or decode text using Base64.' },
      { name: 'URL Encoder/Decoder', path: '/url', description: 'Encode or decode URL components, query parameters, and entire URLs to ensure proper formatting and prevent issues with special characters.' },
    ],
  },
  {
    name: 'Security Tools',
    tools: [
      { name: 'Hash Generator', path: '/hash', description: 'Generate hashes like MD5, SHA-1, SHA-256 for text' },
      { name: 'JWT Decoder', path: '/jwt', description: 'Decode JWT tokens and inspect their header, payload, and signature.' },
    ],
  },
  {
    name: 'Date & Time Tools',
    tools: [
      { name: 'World Time', path: '/worldtime', description: 'View current times in various cities around the world.' },
      { name: 'Timestamp Converter', path: '/timestamp', description: 'Convert Unix timestamps to human-readable dates and vice-versa, supporting various time zones.' },
      { name: 'Cron Expression Parser', path: '/cron', description: 'Parse cron expressions and get human-readable descriptions and upcoming dates.' },
    ],
  },
  {
    name: 'Color Tools',
    tools: [
      { name: 'Color Converter', path: '/color', description: 'Convert between HEX, RGB, HSL & Include a color picker for convenience.' },
    ],
  },
];
