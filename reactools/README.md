<div align="center">
  <img src="https://github.com/hitechline/react/raw/main/.github/logo.png" height="150" width="150" />

  <p>Utilities to facilitate the build user interfaces with React.</p>
</div>

<div align="center">

[![CodeFactor][badge-code-factor]][url-code-factor]
[![Test Coverage][badge-test-coverage]][url-test-coverage]
[![CI Workflow Status][badge-ci-workflow-status]][url-ci-workflow-status]
[![NPM Latest Version][badge-latest-npm-version]][url-latest-npm-version]
[![Netlify Status][badge-netlify-status]][url-netlify-status]

</div>

<div align="center">

[Documentation][url-documentation]

</div>

## Overview

`@hitechline/reactools` is a library focused in facilitate a build interfaces with react.

Our proposal is to have a set of tools that are easy to use and
implement that help the developer create applications with hight
scalability.

Our focus is not just have performace hooks but a whole portfolio of resources to improve your project.

## Contributing

**Note**: We only accept contributions of specific fixes (bugs, linters or docs), new features will be implemented by the team of **Hitechline**.

##### Starting

1. Fork the repository
2. Clone the respository of your machine

##### Installing dependencies

```shell
$ yarn install
```

##### After that create your production branch

```shell
$ git checkout -b branch_name
```

Make the necessary updates to the code.

##### Ending

- Check that all tests pass

```shell
$ yarn test
```

- Add the changed files and create the commit

```shell
$ git add file_name
$ git checkout -m "commit message"
```

**Note**: Use semantic commits.

- Send the updates to github

```shell
$ git push origin branch_name
```

- Pull request with changes to branch **main**

##### Solutions

If your fork is not up to date, do the next steps below

```shell
$ git remote add upstream git@github.com:hitechline/react.git
$ git checkout main
$ git fetch upstream
$ git rebase upstream/main
$ git push origin main
```

## License

MIT © [Hitechline][url-organization]

<!-- prettier-ignore-start -->

[logo]: https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png

[url-organization]: https://github.com/hitechline

[url-documentation]: https://reactools.hitechline.com.br

[url-code-factor]: https://www.codefactor.io/repository/github/hitechline/reactools

[url-test-coverage]: https://coveralls.io/github/hitechline/reactools

[url-netlify-status]: https://app.netlify.com/sites/reactools/deploys

[url-ci-workflow-status]: https://github.com/hitechline/reactools/actions/workflows/build-and-release.yml

[url-latest-npm-version]: https://www.npmjs.com/package/@hitechline/reactools

[badge-code-factor]: https://img.shields.io/codefactor/grade/github/hitechline/reactools

[badge-test-coverage]: https://img.shields.io/coveralls/github/hitechline/reactools

[badge-netlify-status]: https://api.netlify.com/api/v1/badges/48ed6dd4-2857-4197-b1d4-723707b9025b/deploy-status

[badge-ci-workflow-status]: https://img.shields.io/github/workflow/status/hitechline/reactools/CI?label=ci

[badge-latest-npm-version]: https://img.shields.io/npm/v/@hitechline/reactools/latest

<!-- prettier-ignore-end -->
