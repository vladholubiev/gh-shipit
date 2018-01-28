#!/usr/bin/env node

const {askOrg, askRepo, askRepoAction, askOrgAction} = require('./inquirer');
const {prepareRelease, prMasterDevelop} = require('./flows/prepare-release');
const {getOrgReleases} = require('./client-releases');

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
    const releases = await getOrgReleases(org);
    console.log(JSON.stringify(releases, null, 2));
  }

  process.exit(0);
})();
