<div align="center">
  <a href="https://unform.dev">
    <img src="https://github.com/hitechline/react/raw/main/.github/logo.png" height="150" width="150" />
  </a>

  <p>Utilities to facilitate the build user interfaces with React.</p>
</div>

<div align="center">

![CodeFactor][badge-code-factor]
![Test Coverage][badge-test-coverage]
![Workflow Status][badge-workflow-status]
![Current Published Version][badge-current-published-version]

</div>

## Overview

`@hitechline/react` is a library focused in facilitate a build interfaces with react.

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

AGPL-3.0 © [Hitechline][url-organization]

<!-- prettier-ignore-start -->

[url-organization]: https://github.com/hitechline

[logo]: https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png

[badge-code-factor]: https://img.shields.io/codefactor/grade/github/hitechline/react?label=CodeFactor&style=flat-square

[badge-test-coverage]: https://img.shields.io/coveralls/github/hitechline/react?label=Test%20Coverage&style=flat-square

[badge-workflow-status]: https://img.shields.io/github/workflow/status/hitechline/react/CI?label=CI&style=flat-square

[badge-current-published-version]: https://img.shields.io/npm/v/@hitechline/react?label=NPM&style=flat-square

<!-- prettier-ignore-end -->
