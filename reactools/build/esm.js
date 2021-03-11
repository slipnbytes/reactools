const { build } = require('./build');

build({
  platform: 'neutral',
  outfile: 'dist/index.esm.js',
  entryPoints: ['src/index.ts'],
});
