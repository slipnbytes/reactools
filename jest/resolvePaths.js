const { join } = require('path');

const SLASH_REGEX = /\/\*$/g;

function resolvePaths(paths, basePath = '/') {
  const basePathParsed = join('<rootDir>', basePath).replace(/\\/, '/');

  return Object.entries(paths).reduce((currentPathsObject, [name, path]) => {
    const nameParsed = `^${clean(name, '/')}(.*)$`;
    const pathParsed = []
      .concat(path)
      .map(value => `${basePathParsed}/${clean(value, '')}/$1`);

    return Object.assign(currentPathsObject, {
      [nameParsed]: pathParsed,
    });
  }, {});
}

function clean(value, replacer = '/') {
  return String(value).replace(SLASH_REGEX, replacer);
}

module.exports = {
  resolvePaths,
};
