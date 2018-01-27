#!/usr/bin/env node

const logSymbols = require('log-symbols');
const {
  askOrg,
  askRepo,
  askRepoAction,
  askVersion,
  askReleaseTitle,
  askToOpenPR
} = require('./inquirer');
const {createReleaseBranch, getLastDevelopCommitSHA} = require('./client-repos');
const {createReleasePR} = require('./client-prs');
const {createReleaseNotes} = require('./client-releases');

(async () => {
  const org = await askOrg();
  const repo = await askRepo(org);
  const action = await askRepoAction();

  if (action === 'prepare-release') {
    try {
      const version = await askVersion({org, repo});
      const commitHash = await getLastDevelopCommitSHA({org, repo});

      await createReleaseBranch({org, repo, version, commitHash});
      console.log(logSymbols.success, `Created branch release/v${version}!`);

      const releaseTitle = await askReleaseTitle({org, repo});

      await createReleaseNotes({org, repo, version, releaseTitle});
      console.log(logSymbols.success, `Created Release Notes!`);

      const {id} = await createReleasePR({org, repo, version, releaseTitle});
      console.log(logSymbols.success, `Created Pull Request #${id}!`);

      await askToOpenPR({org, repo, pr: id});
    } catch (error) {
      console.log(logSymbols.error, JSON.parse(error.message).message);
    }
  }
})();
