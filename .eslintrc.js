const { existsSync } = require('fs');
const { join } = require('path');

const { ROOT_PATH } = require('./shared/constants');
const { getWorkspacesPackages } = require('./shared/getWorkspacesPackages');

const packages = getWorkspacesPackages(false);

module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: [
    'import',
    'prettier',
    'import-helpers',
    'testing-library',
    '@typescript-eslint',
  ],
  extends: [
    'airbnb',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:testing-library/react',
    'plugin:testing-library/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  env: {
    es6: true,
    jest: true,
    browser: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    tsconfigRootDir: ROOT_PATH,
    project: 'tsconfig.eslint.json',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    'import/extensions': ['.js', '.ts', '.tsx'],
    'react': {
      version: 'detect',
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.js', '.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: packages
          .filter(package =>
            existsSync(join(ROOT_PATH, package, 'tsconfig.json')),
          )
          .map(package => `${package}/tsconfig.json`),
      },
    },
  },
  overrides: [
    {
      files: ['**/*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
  rules: {
    'camelcase': 'off',
    'global-require': 'off',
    'prettier/prettier': 'error',
    'class-methods-use-this': 'off',

    'no-shadow': 'off',
    'no-use-before-define': 'off',

    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-filename-extension': [
      'warn',
      {
        extensions: ['js', '.jsx', '.tsx'],
      },
    ],

    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        packageDir: [ROOT_PATH, ...packages],
      },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
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

    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    '@typescript-eslint/prefer-nullish-coalescing': ['error'],
    '@typescript-eslint/no-empty-interface': [
      'error',
      {
        allowSingleExtends: true,
      },
    ],
    '@typescript-eslint/no-use-before-define': [
      'error',
      {
        variables: false,
        functions: false,
        ignoreTypeReferences: true,
      },
    ],
  },
};
