const { build } = require('./build');

build({
  platform: 'browser',
  globalName: 'Reactools',
  outfile: 'dist/index.browser.js',
  entryPoints: ['src/index.ts'],
});
