// By -> https://github.com/a-b-r-o-w-n/esbuild-plugin-globals

const generateResolveFilter = globals => {
  const moduleNames = Object.keys(globals);

  return new RegExp(`^(${moduleNames.join('|')})$`);
};

// eslint-disable-next-line consistent-return
const generateExport = (globals, name) => {
  const match = Object.entries(globals).find(([pattern]) => {
    return new RegExp(`^${pattern}$`).test(name);
  });

  if (match) {
    const output = typeof match[1] === 'function' ? match[1](name) : match[1];

    return output ? `module.exports = ${output}` : undefined;
  }
};

const plugin = (globals = {}) => {
  const filter = generateResolveFilter(globals);

  return {
    name: 'globals',
    setup(build) {
      build.onResolve({ filter }, args => {
        return { path: args.path, namespace: 'globals' };
      });

      build.onLoad({ filter: /.*/, namespace: 'globals' }, args => {
        const name = args.path;
        const contents = generateExport(globals, name);

        if (contents) {
          return { contents };
        }

        return null;
      });
    },
  };
};

module.exports = {
  globals: plugin,
};
