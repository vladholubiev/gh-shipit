#!/usr/bin/env node

const logSymbols = require('log-symbols');
const {askOrg, askRepo, askRepoAction, askToOpenPR} = require('./inquirer');
const {createMasterDevelopPR} = require('./client-prs');
const {prepareRelease} = require('./flows/prepare-release');

(async () => {
  const org = await askOrg();
  const repo = await askRepo(org);
  const action = await askRepoAction({org, repo});

  if (action === 'prepare-release') {
    await prepareRelease({org, repo});
  }

  if (action === 'pr-master-develop') {
    try {
      const {number} = await createMasterDevelopPR({org, repo});
      console.log(logSymbols.success, `Created Pull Request #${number}!`);

      await askToOpenPR({org, repo, pr: number});
    } catch (error) {
      console.log(logSymbols.error, JSON.parse(error.message).message);
    }
  }

  process.exit(0);
})();
