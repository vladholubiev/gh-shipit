#!/usr/bin/env node

const {askOrg, askRepo, askRepoAction, askOrgAction} = require('./inquirer');
const {prepareRelease} = require('./flows/prepare-release');
const {prMasterDevelop} = require('./flows/pr-master-develop');
const {viewReleases} = require('./flows/view-releases');

(async () => {
  const org = await askOrg();
  const orgAction = await askOrgAction();

  if (orgAction === 'releases') {
    const repo = await askRepo(org);
    const action = await askRepoAction({org, repo});

    if (action === 'prepare-release') {
      await prepareRelease({org, repo});
    }

    if (action === 'pr-master-develop') {
      await prMasterDevelop({org, repo});
    }
  }

  if (orgAction === 'view-releases') {
    await viewReleases(org);
  }

  process.exit(0);
})();
