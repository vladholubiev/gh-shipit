#!/usr/bin/env node

const logSymbols = require('log-symbols');
const {askOrg, askRepo, askRepoAction, askVersion, askReleaseTitle} = require('./inquirer');
const {createReleaseBranch, getLastDevelopCommitSHA} = require('./client-repos');
const {createReleasePR} = require('./client-prs');
const {createReleaseNotes} = require('./client-releases');

(async () => {
  const org = await askOrg();
  const repo = await askRepo(org);
  const action = await askRepoAction();

  if (action === 'prepare-release') {
    const version = await askVersion({org, repo});
    const commitHash = await getLastDevelopCommitSHA({org, repo});

    await createReleaseBranch({org, repo, version, commitHash});
    console.log(logSymbols.success, `Created branch release/v${version}!`);

    const releaseTitle = await askReleaseTitle({org, repo});

    await createReleaseNotes({org, repo, version, releaseTitle});
    console.log(logSymbols.success, `Created Release Notes!`);

    await createReleasePR({org, repo, version, releaseTitle});
    console.log(logSymbols.success, `Created Pull Request!`);
  }
})();
