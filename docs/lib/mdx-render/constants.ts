import type { TransformOptions } from '@babel/core';
import type { Options } from '@mdx-js/mdx';

export const MDX_OPTIONS: Options = {
  skipExport: true,
};

export const BABEL_TRANSFORM_OPTIONS: TransformOptions = {
  configFile: false,
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: [
    '@babel/plugin-transform-react-jsx',
    [
      'babel-plugin-transform-remove-imports',
      {
        removeAll: true,
      },
    ],
  ],
};
