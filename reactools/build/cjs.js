const { build } = require('./build');

build({
  platform: 'node',
  outfile: 'dist/index.cjs.js',
  entryPoints: ['src/index.ts'],
});
