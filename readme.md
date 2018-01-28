# gh-shipit [![CircleCI](https://img.shields.io/circleci/project/github/vladgolubev/gh-shipit.svg)](https://circleci.com/gh/vladgolubev/gh-shipit) ![](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)

![](media/demo-diff.png)

## Install

```
$ yarn global add gh-shipit
```

## Features

* Prepare Release
  * Detailed overview of all the repos in organization
    * View how many commits in `develop` are ahead of `master`
    * View how many commits in `master` are behind of `develop`
    * View latest commit date in `develop`
    * View latest version released
  * Create a release branch in git-flow style (`release/vX.x.x`)
  * Open branch comparison on github in browser to decide on release name
  * Create a PR from release branch to `master`
  * Create Release Notes Draft
  * Create `release` label in repo and assign it to PR
  * Open created PR in browser
* View Latest Releases
  * Histogram of releases per week in current quarter
  * Releases this week
  * Releases last week
  * Releases this month
  * Releases this quarter
* Create PR from `master` to `develop` to sync stale commits

### Screenshots

![](media/demo-releases.png)

![](media/demo-histogram.png)

## Usage

Follow interactive instructions

```bash
$ gh-shipit
```

## License

MIT © [Vlad Holubiev](http://vladholubiev.com)
