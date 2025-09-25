module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleDirectories: ['node_modules'],
  transformIgnorePatterns: [
    "node_modules/(?!jose/)"
  ],
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    "^next/head$": "<rootDir>/__mocks__/next/head.js"
  },
};
