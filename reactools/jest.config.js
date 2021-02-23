const { extendConfig } = require('../jest/extendConfig');
const { resolvePaths } = require('../jest/resolvePaths');
const { compilerOptions } = require('./tsconfig.json');

module.exports = extendConfig('reactools', {
  moduleNameMapper: resolvePaths(
    compilerOptions.paths,
    compilerOptions.baseUrl,
  ),
  setupFilesAfterEnv: ['<rootDir>/__tests__/setup.ts'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{js,jsx,ts,tsx}',
    '!<rootDir>/src/index.ts',
    '!<rootDir>/src/shared/logger.ts',
    '!<rootDir>/src/polyfills/**/*',
  ],
});
