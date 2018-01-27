#!/usr/bin/env node

const {askOrg, askRepo, askRepoAction} = require('./inquirer');

(async () => {
  const org = await askOrg();
  const repo = await askRepo(org);
  const action = await askRepoAction();

  console.log({org, repo, action});
})();
