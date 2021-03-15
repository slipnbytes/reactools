const REMARK_PLUGINS = [
  require('remark-slug'),
  [
    require('remark-autolink-headings'),
    {
      linkProperties: {},
      content: {
        type: 'element',
        tagName: 'span',
        properties: { className: ['heading-link'] },
        children: [{ type: 'text', value: '#' }],
      },
    },
  ],
  require('remark-prism'),
  require('remark-remove-comments'),
];

const REHYPE_PLUGINS = [];

module.exports = {
  REMARK_PLUGINS,
  REHYPE_PLUGINS,
};

/* eslint global-require: 0 */
/* eslint import-helpers/order-imports: 0 */
