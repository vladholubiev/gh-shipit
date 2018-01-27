#!/usr/bin/env node

const {askOrg, askRepo, askRepoAction, askVersion} = require('./inquirer');
const {createReleaseBranch} = require('./client-repos');

(async () => {
  const org = await askOrg();
  const repo = await askRepo(org);
  const action = await askRepoAction();

  if (action === 'prepare-release') {
    const version = await askVersion({org, repo});
    const commitHash = '';
    console.log({version});

    await createReleaseBranch({org, repo, version, commitHash});
  }
})();
