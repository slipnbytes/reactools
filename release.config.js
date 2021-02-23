const { join } = require('path');

const { ROOT_PATH } = require('./shared/constants');

module.exports = {
  branches: [
    'main',
    {
      name: 'canary',
      channel: 'canary',
      prerelease: 'canary',
    },
  ],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/changelog',
      {
        changelogFile: join(ROOT_PATH, 'CHANGELOG.md'),
      },
    ],
    [
      '@semantic-release/npm',
      {
        tarballDir: '.tarball',
      },
    ],
    [
      'semantic-release-git',
      {
        message:
          'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
        assets: ['package.json'],
      },
    ],
    [
      '@semantic-release/github',
      {
        assets: '.tarball/*.tgz',
      },
    ],
  ],
};

/* eslint no-template-curly-in-string: 0 */
