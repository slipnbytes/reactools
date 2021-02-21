const { exec: defaultExec } = require('child_process');
const { join } = require('path');

const { ROOT_PATH } = require('../shared/constants');
const { getWorkspacesPakages } = require('../shared/getWorkspacesPakages');

const packages = getWorkspacesPakages();

async function testAll() {
  for await (const package of packages) {
    const cwd = join(ROOT_PATH, package);

    await exec('yarn jest --passWithNoTests', cwd);
  }
}

function exec(command, cwd) {
  return new Promise((resolvePromise, reject) => {
    const childProcess = defaultExec(command, { cwd });

    childProcess.stdout.setEncoding('utf8');
    childProcess.stderr.setEncoding('utf8');

    childProcess.on('error', error => {
      reject(error);
    });

    childProcess.on('close', code => {
      if (code !== 0) {
        process.exit(1);
      }

      resolvePromise(code);
    });

    childProcess.stdout.on('data', data => {
      console.log(data.toString());
    });

    childProcess.stderr.on('data', data => {
      console.log(data.toString());
    });
  });
}

testAll();

/* eslint no-console: 0, no-restricted-syntax: 0 */
