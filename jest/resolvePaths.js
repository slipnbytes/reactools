const SLASH_REGEX = /\/\*$/g;

/**
 * @param {{ [key: string]: string|string[] }} paths
 * @param {string} basePath
 * @return {{ [key: string]: string }}
 */
function resolvePaths(paths, basePath = '/') {
  const basePathWithRoot = `<rootDir>/${basePath}`;

  return Object.entries(paths).reduce((currentPathsObject, [name, path]) => {
    const nameParsed = `^${clean(name, '/')}(.*)$`;
    const pathParsed = []
      .concat(path)
      .map(value => `${basePathWithRoot}/${clean(value, '')}/$1`);

    return Object.assign(currentPathsObject, {
      [nameParsed]: pathParsed,
    });
  }, {});
}

/**
 * @param {string} value
 * @param {string} replacer
 * @return {string}
 */
function clean(value, replacer = '/') {
  return String(value).replace(SLASH_REGEX, replacer);
}

module.exports = {
  resolvePaths,
};
