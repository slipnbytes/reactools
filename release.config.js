const { join } = require('path');

const { ROOT_PATH } = require('./shared/constants');

const COMMIT_GROUP_ORDER = [
  'Features',
  'Bug Fixes',
  'Performance Improvements',
  'Code Refactoring',
  'Miscellaneous Chores',
  'Documentation Changes',
  'Tests',
  'Build System',
  'Reverts',
  'Dependency Updates',
];

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
        writerOpts: {
          commitGroupsSort: (a, b) => {
            const rankA = COMMIT_GROUP_ORDER.indexOf(a.title);
            const rankB = COMMIT_GROUP_ORDER.indexOf(b.title);

            if (rankA >= rankB) return 1;
            return -1;
          },
        },
        presetConfig: {
          types: [
            { type: 'perf', section: 'Performance Improvements' },
            { type: 'refactor', section: 'Code Refactoring' },
            { type: 'test', section: 'Tests' },
            { type: 'docs', section: 'Documentation Changes' },
            { type: 'build', section: 'Build System' },
            { type: 'revert', section: 'Reverts' },
            { type: 'fix', scope: 'deps', section: 'Dependency Updates' },
            { type: 'fix', section: 'Bug Fixes' },
            { type: 'feat', section: 'Features' },
            { type: 'feature', section: 'Features' },
            { type: 'chore', scope: 'release', hidden: true },
            { type: 'chore', scope: 'deps', section: 'Dependency Updates' },
            { type: 'chore', section: 'Miscellaneous Chores' },
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
