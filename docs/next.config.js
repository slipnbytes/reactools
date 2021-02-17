const bundleAnalyzer = require('@next/bundle-analyzer');
const mdx = require('@next/mdx');
const sourceMaps = require('@zeit/next-source-maps');
const composePlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');

module.exports = composePlugins(
  [
    [sourceMaps],
    [optimizedImages],
    [
      mdx,
      {
        extension: /\.mdx?$/,
      },
    ],
    [
      bundleAnalyzer,
      {
        enabled: !!process.env.ANALYZE,
      },
    ],
  ],
  {
    distDir: '__next',
    trailingSlash: true,
    reactStrictMode: true,
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
    devIndicators: {
      autoPrerender: false,
    },
  },
);
