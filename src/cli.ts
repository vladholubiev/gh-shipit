#!/usr/bin/env node

import updateNotifier from 'update-notifier';
import logSymbols from 'log-symbols';
import path from 'path';
import debug0 from 'debug';
import {askFormatOutput, askOrg, askOrgAction, askRepo, askRepoAction} from './inquirer';
import pkg, {name} from '../package.json';
import {verifyToken} from './verify-token';
import {viewReleases} from './view-releases';
import {publishRelease} from './publish-release';
import {prepareRelease} from './prepare-release';
import {bulkMergePRs} from './bulk-merge-prs';

const debug = debug0(`${name}:${path.basename(__filename)}`);

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

      if (action === 'publish-release') {
        await publishRelease({org, repo});
      }
    }

    if (orgAction === 'bulk-merge-prs') {
      await bulkMergePRs(org);
    }

    if (orgAction === 'view-releases') {
      const format = await askFormatOutput();
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
