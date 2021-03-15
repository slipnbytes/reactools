const { existsSync } = require('fs');
const { join } = require('path');

const { ROOT_PATH } = require('./shared/constants');
const { getWorkspacesPackages } = require('./shared/getWorkspacesPackages');

const projects = getWorkspacesPackages(false)
  .filter(packageName =>
    existsSync(join(ROOT_PATH, packageName, 'jest.config.js')),
  )
  .map(packageName => `<rootDir>/${packageName}/jest.config.js`);

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
