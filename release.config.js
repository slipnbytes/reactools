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
    [
      '@semantic-release/commit-analyzer',
      {
        preset: 'angular',
      },
    ],
    [
      '@semantic-release/release-notes-generator',
      {
        preset: 'conventionalcommits',
        presetConfig: {
          types: [
            { type: 'feat', section: 'Features' },
            { type: 'feature', section: 'Features' },
            { type: 'fix', section: 'Bug Fixes' },
            { type: 'perf', section: 'Performance Improvements' },
            { type: 'refactor', section: 'Code Refactoring' },
            { type: 'chore', scope: 'release', hidden: true },
            { type: 'chore', section: 'Miscellaneous Chores' },
            { type: 'revert', section: 'Reverts' },
            { type: 'test', section: 'Tests' },
            { type: 'build', section: 'Build System' },
          ],
        },
      },
    ],
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
