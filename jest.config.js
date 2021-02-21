const { join } = require('path');

module.exports = {
  bail: true,
  clearMocks: true,
  collectCoverage: true,
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  coverageReporters: ['json', 'lcov'],
  projects: ['<rootDir>/*/jest.config.js'],
  testMatch: ['**/?(*.)+(spec|test).(ts|tsx)'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  setupFilesAfterEnv: [
    join(__dirname, 'jest', 'mainSetup.js'),
    '@testing-library/jest-dom/extend-expect',
  ],
};
