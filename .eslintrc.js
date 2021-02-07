module.exports = {
  plugins: ['testing-library'],
  extends: [
    '@hitechline/eslint-config-web',
    'plugin:testing-library/react',
    'plugin:testing-library/recommended',
  ],
  rules: {
    'global-require': 'off',

    'no-use-before-define': 'off',

    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-use-before-define': [
      'error',
      {
        variables: false,
        functions: false,
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
