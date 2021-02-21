const { join, resolve } = require('path');

const jestConfig = require('../jest.config');

const ROOT_PATH = resolve(__dirname, '..');

function extendConfig(basePath, config) {
  delete config.rootDir;

  const baseConfig = Object.entries(jestConfig).reduce(
    (currentConfig, [key, value]) => {
      if (Array.isArray(value) && Array.isArray(config[key])) {
        return Object.assign(currentConfig, {
          [key]: value.concat(config[key]),
        });
      }

      return currentConfig;
    },
    {},
  );

  const newConfig = Object.assign(jestConfig, config, baseConfig, {
    rootDir: join(ROOT_PATH, basePath),
  });

  delete newConfig.projects;
  return newConfig;
}

module.exports = {
  extendConfig,
};

/* eslint no-param-reassign: 0 */
