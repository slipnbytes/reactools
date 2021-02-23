const { readdirSync, existsSync, statSync } = require('fs');
const { join, resolve } = require('path');

const { workspaces } = require('../package.json');

const GLOB_REGEX = /\/?\*\*$/;
const ROOT_PATH = resolve(__dirname, '..');

/**
 * @return {string[]}
 * @param {boolean} getRoot
 */
function getWorkspacesPackages(getRoot = true) {
  if (Array.isArray(workspaces)) {
    return workspaces.map(getPackages);
  }

  const workspacesArray = [];
  const root = getRoot ? '/' : null;

  if (Array.isArray(workspaces.nohoist)) {
    workspacesArray.push(...workspaces.nohoist);
  }

  if (Array.isArray(workspaces.packages)) {
    workspacesArray.push(...workspaces.packages);
  }

  const packages = workspacesArray
    .map(getPackages)
    .reduce((array, value) => array.concat(value), []);

  return [root, ...packages].filter(Boolean);
}

/**
 * @param {string} path
 * @return {boolean}
 */
function isDirectory(path) {
  return statSync(path).isDirectory();
}

/**
 * @param {string} workspace
 * @param {string} package
 * @return {string}
 */
function makePackagePath(workspace, package) {
  if (['', '/'].includes(workspace)) {
    return package;
  }

  return `${workspace}/${package}`;
}

/**
 * @param {string} workspace
 * @return {string|string[]}
 */
function getPackages(workspace) {
  if (!GLOB_REGEX.test(workspace)) {
    return workspace;
  }

  const workspaceCleaned = workspace.replace(GLOB_REGEX, '');
  const path = join(ROOT_PATH, workspaceCleaned);

  if (!existsSync(path) || !isDirectory(path)) {
    return workspaceCleaned;
  }

  const mappedPackages = readdirSync(path);

  return mappedPackages
    .filter(package => isDirectory(join(path, package)))
    .map(package => makePackagePath(workspaceCleaned, package));
}

module.exports = {
  getWorkspacesPackages,
};
