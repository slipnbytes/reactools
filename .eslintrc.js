const { workspaces } = require('./package.json');

module.exports = {
  root: true,
  plugins: ['testing-library'],
  extends: [
    '@hitechline/eslint-config-web',
    'plugin:testing-library/react',
    'plugin:testing-library/recommended',
  ],
  settings: {
    'react': {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {
        project: './*/tsconfig.json',
      },
    },
  },
  rules: {
    'camelcase': 'off',
    'global-require': 'off',

    'no-shadow': 'off',
    'no-use-before-define': 'off',

    'react/react-in-jsx-scope': 'off',

    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',

    '@typescript-eslint/no-shadow': ['error'],
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

    'import/no-extraneous-dependencies': [
      'error',
      {
        packageDir: ['.', ...workspaces.packages],
        devDependencies: true,
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
