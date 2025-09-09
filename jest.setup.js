require('@testing-library/jest-dom');

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