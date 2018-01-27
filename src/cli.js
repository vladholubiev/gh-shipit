#!/usr/bin/env node

const {askOrg, askRepo} = require('./inquirer');

(async () => {
  const org = await askOrg();
  const repo = await askRepo(org);

  console.log(repo);
})();
