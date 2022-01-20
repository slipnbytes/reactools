const bundleAnalyzer = require('@next/bundle-analyzer');
const mdx = require('@next/mdx');
const sourceMaps = require('@zeit/next-source-maps');
const composePlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');

const { REHYPE_PLUGINS, REMARK_PLUGINS } = require('./shared/plugins.js');

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
    future: {
      webpack5: true,
    },
    experimental: {
      esmExternals: true,
      externalDir: true,
    },
    devIndicators: {
      autoPrerender: false,
    },
    images: {
      domains: ['github.com', 'hitechline.com.br'],
    },
    headers: () => [
      {
        source: '/(.*).(ttf|woff|fnt|fot)',
        headers: [
          {
            key: 'Cache-Control',
            value:
              'public, max-age=604800, s-maxage=604800, must-revalidate, proxy-revalidate',
          },
        ],
      },
      {
        source: '/(.*).(jpg|jpeg|jfif|pjpeg|pjp|png|svg|webp)',
        headers: [
          {
            key: 'Cache-Control',
            value:
              'public, max-age=86400, s-maxage=86400, must-revalidate, proxy-revalidate',
          },
        ],
      },
      {
        source: '/(.*).css',
        headers: [
          {
            key: 'Cache-Control',
            value:
              'public, max-age=21600, s-maxage=21600, must-revalidate, proxy-revalidate',
          },
        ],
      },
    ],
  },
);
