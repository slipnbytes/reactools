const bundleAnalyzer = require('@next/bundle-analyzer');
const mdx = require('@next/mdx');
const sourceMaps = require('@zeit/next-source-maps');
const composePlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');

const { REHYPE_PLUGINS, REMARK_PLUGINS } = require('./shared/plugins');

module.exports = composePlugins(
  [
    [sourceMaps],
    [optimizedImages],
    [
      mdx({
        extension: /\.mdx?$/,
        options: {
          rehypePlugins: REHYPE_PLUGINS,
          remarkPlugins: REMARK_PLUGINS,
        },
      }),
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
    reactStrictMode: true,
    pageExtensions: ['tsx', 'md', 'mdx'],
    devIndicators: {
      autoPrerender: false,
    },
  },
);
