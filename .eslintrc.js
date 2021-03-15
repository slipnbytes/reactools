const { existsSync } = require('fs');
const { join } = require('path');

const { ROOT_PATH } = require('./shared/constants');
const { getWorkspacesPackages } = require('./shared/getWorkspacesPackages');

const packages = getWorkspacesPackages(false);

module.exports = {
  plugins: ['import-helpers', 'testing-library'],
  extends: [
    'plugin:testing-library/recommended',
    'plugin:testing-library/react',
    '@hitechline/eslint-config/web',
    '@hitechline/eslint-config/typescript',
  ],
  parserOptions: {
    tsconfigRootDir: ROOT_PATH,
    project: 'tsconfig.eslint.json',
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: packages
          .filter(packageName =>
            existsSync(join(ROOT_PATH, packageName, 'tsconfig.json')),
          )
          .map(packageName => `${packageName}/tsconfig.json`),
      },
    },
  },

  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off',

    'import/order': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        packageDir: [ROOT_PATH, ...packages],
      },
    ],
    'import-helpers/order-imports': [
      'warn',
      {
        newlinesBetween: 'always',
        alphabetize: {
          order: 'asc',
          ignoreCase: true,
        },
        groups: [
          'module',
          '/^((?!@/shared/types))(@/.*)/',
          ['parent', 'sibling', 'index'],
          '/types$/',
        ],
      },
    ],
  },
};
