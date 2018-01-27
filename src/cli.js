#!/usr/bin/env node

const {askOrg, askRepo, askRepoAction, askVersion} = require('./inquirer');
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

    console.log({version, commitHash});

    await createReleaseBranch({org, repo, version, commitHash});
    console.log('created branch');

    await createReleaseNotes({org, repo, version});
    console.log('created release notes');

    await createReleasePR({org, repo, version});
    console.log('created PR');
  }
})();
