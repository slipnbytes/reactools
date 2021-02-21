const { existsSync } = require('fs');
const { join } = require('path');

const { ROOT_PATH } = require('./shared/constants');
const { getWorkspacesPakages } = require('./shared/getWorkspacesPakages');

const projects = getWorkspacesPakages(false)
  .filter(package => existsSync(join(ROOT_PATH, package, 'jest.config.js')))
  .map(package => `<rootDir>/${package}/jest.config.js`);

module.exports = {
  projects,

  bail: true,
  clearMocks: true,
  collectCoverage: true,
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  coverageReporters: ['json', 'lcov'],
  testMatch: ['**/?(*.)+(spec|test).(ts|tsx)'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  setupFilesAfterEnv: [
    join(__dirname, 'jest', 'mainSetup.js'),
    '@testing-library/jest-dom/extend-expect',
  ],
};
