module.exports = {
  rules: {
    'import-helpers/order-imports': [
      'warn',
      {
        newlinesBetween: 'always',
        alphabetize: { order: 'asc', ignoreCase: true },
        groups: [
          ['module'],
          '/^@//',
          '/^@(layout|components)/',
          '/^@sections/',
          '/^@resources/',
          '/^@shared/',
          ['parent', 'sibling', 'index'],
          ['/.css$/', '/^@styles/'],
        ],
      },
    ],
  },
};
