#!/usr/bin/env node

const {askOrg, askRepo, askRepoAction} = require('./inquirer');
const {prepareRelease, prMasterDevelop} = require('./flows/prepare-release');

(async () => {
  const org = await askOrg();
  const repo = await askRepo(org);
  const action = await askRepoAction({org, repo});

  if (action === 'prepare-release') {
    await prepareRelease({org, repo});
  }

  if (action === 'pr-master-develop') {
    await prMasterDevelop({org, repo});
  }

  process.exit(0);
})();
