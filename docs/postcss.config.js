const { join, resolve } = require('path');

const BASE_PATH = resolve(__dirname);
const CSS_ROOT_PATH = join(BASE_PATH, 'src', 'styles');

module.exports = {
  plugins: [
    'tailwindcss',
    'postcss-nesting',
    [
      'postcss-preset-env',
      {
        stage: 3,
        autoprefixer: {
          flexbox: 'no-2009',
        },
      },
    ],
    'postcss-flexbugs-fixes',
    [
      'postcss-custom-properties',
      {
        preserve: true,
      },
    ],
    [
      'postcss-color-converter',
      {
        outputColorFormat: 'hsl',
      },
    ],
    'postcss-color-hsl',
    [
      'postcss-color-mod-function',
      {
        unresolved: 'warn',
        importFrom: [join(CSS_ROOT_PATH, 'root.css')],
      },
    ],
  ],
};
