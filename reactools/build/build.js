const { build: ESBuild } = require('esbuild');
const { resolve } = require('path');

const BASE_PATH = resolve(__dirname, '..');

/**
 * @type {import('esbuild').BuildOptions}
 */
const BASE_CONFIG = {
  logLevel: 'info',
  tsconfig: 'tsconfig.json',
  absWorkingDir: BASE_PATH,

  bundle: true,
  minify: true,
  sourcemap: true,

  external: ['react', 'react-dom'],
};

/**
 * @param {import('esbuild').BuildOptions} config
 * @return {import('esbuild').BuildOptions}
 */
function makeConfig(config) {
  return {
    ...BASE_CONFIG,
    ...config,
  };
}

/**
 * @param {import('esbuild').BuildOptions} config
 * @return {import('esbuild').BuildResult}
 */
function build(config) {
  return ESBuild(makeConfig(config));
}

module.exports = {
  BASE_PATH,
  BASE_CONFIG,

  build,
  makeConfig,
};
