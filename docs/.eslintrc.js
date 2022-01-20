const { resolve } = require('path');

module.exports = {
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: resolve(__dirname, 'tsconfig.json'),
      },
    },
  },
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
