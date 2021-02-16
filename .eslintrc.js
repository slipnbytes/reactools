module.exports = {
  plugins: ['testing-library'],
  extends: [
    '@hitechline/eslint-config-web',
    'plugin:testing-library/react',
    'plugin:testing-library/recommended',
  ],
  rules: {
    'camelcase': 'off',
    'global-require': 'off',

    'no-shadow': 'off',
    'no-use-before-define': 'off',

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
