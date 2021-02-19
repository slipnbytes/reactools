module.exports = {
  rules: {
    'import-helpers/order-imports': [
      'warn',
      {
        newlinesBetween: 'always',
        alphabetize: { order: 'asc', ignoreCase: true },
        groups: [
          ['module'],
          ['parent', 'sibling', 'index'],
          '/^@(layout|components)/',
          '/^@sections/',
          '/^@resources/',
          '/^@shared/',
          ['/.css$/', '/^@styles/'],
        ],
      },
    ],
  },
};
