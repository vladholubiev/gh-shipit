#!/usr/bin/env node

const updateNotifier = require('update-notifier');
const logSymbols = require('log-symbols');
const path = require('path');
const debug = require('debug')(`${require('../package').name}:${path.basename(__filename)}`);
const {askOrg, askRepo, askRepoAction, askOrgAction} = require('./inquirer');
const {prepareRelease} = require('./flows/prepare-release');
const {prMasterDevelop} = require('./flows/pr-master-develop');
const {viewReleases} = require('./flows/view-releases');
const {verifyToken} = require('./verify-token');
const pkg = require('../package.json');

updateNotifier({pkg}).notify();

(async () => {
  try {
    verifyToken();

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
  } catch (error) {
    debug(error);

    console.log(logSymbols.error, error.message);
    console.log(
      logSymbols.info,
      `
    For debug logs run again with DEBUG env var:
    
    DEBUG=gh-shipit:* gh-shipit
    `.trim()
    );
  }

  process.exit(0);
})();
