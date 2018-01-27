#!/usr/bin/env node

const {askOrg, askRepo, askRepoAction} = require('./inquirer');
const {getLastRelease} = require('./client-releases');

(async () => {
  const org = await askOrg();
  const repo = await askRepo(org);
  const action = await askRepoAction();

  console.log({org, repo, action});

  const lastRelease = await getLastRelease({org, repo});
  console.log({lastRelease});
})();
