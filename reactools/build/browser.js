const { build } = require('./build');
const { globals } = require('./plugins/esbuild-plugin-globals');

build({
  platform: 'browser',
  globalName: 'Reactools',
  outfile: 'dist/index.browser.js',
  sourcemap: false,
  entryPoints: ['src/index.ts'],
  plugins: [
    globals({
      react: 'React',
    }),
  ],
});
