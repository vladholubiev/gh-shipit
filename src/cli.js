#!/usr/bin/env node

const updateNotifier = require('update-notifier');
const logSymbols = require('log-symbols');
const path = require('path');
const debug = require('debug')(`${require('../package').name}:${path.basename(__filename)}`);
const {askOrg, askRepo, askRepoAction, askOrgAction, askFormatOutput} = require('./inquirer');
const {prepareRelease} = require('./flows/prepare-release');
const {publishRelease} = require('./flows/publish-release');
const {viewReleases} = require('./flows/view-releases');
const {verifyToken} = require('./verify-token');
const pkg = require('../package.json');

updateNotifier({pkg}).notify();

(async () => {
  try {
    verifyToken();

    const org = await askOrg();
    const orgAction = await askOrgAction();
    const format = await askFormatOutput();

    if (orgAction === 'releases') {
      const repo = await askRepo(org);
      const action = await askRepoAction({org, repo});

      if (action === 'prepare-release') {
        await prepareRelease({org, repo});
      }

      if (action === 'publish-release') {
        await publishRelease({org, repo});
      }
    }

    if (orgAction === 'view-releases') {
      await viewReleases({org, format});
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
