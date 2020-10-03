import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
import _ from 'lodash';
import {prompt} from 'enquirer';
import logSymbols from 'log-symbols';
import ProgressBar from 'progress';
import getCliWidth from 'cli-width';
import {getUserOrgs} from '@shelf/gh-sdk';
import {getBranchDiff} from './repos';
import {getOrgRepoNames} from './client-repos';
import {formatReposDiffsForChoices} from './format';
import {getAllReposDiffs} from './diff';

export async function askOrg() {
  if (process.env.GH_SHIPIT_ORG) {
    return process.env.GH_SHIPIT_ORG;
  }

  const {org} = await inquirer.prompt([
    {
      type: 'list',
      name: 'org',
      message: 'Organization?',
      choices() {
        return getUserOrgs();
      }
    }
  ]);

  return org;
}

export async function askRepo(org) {
  const repos = await loadRepos(org);
  const choices = await loadDiffsChoices({org, repos});

  if (_.isEmpty(choices)) {
    console.log(logSymbols.success, `Nothing to Release!`);

    return process.exit(0);
  }

  const {repo} = await prompt({
    type: 'autocomplete',
    name: 'repo',
    message: 'Repository?',
    choices
  });

  return repo;
}

export async function askRepoAction({org, repo}) {
  const choices = [];
  const {ahead_by, lastDraftReleaseTag} = await getBranchDiff({org, repo});

  if (ahead_by > 0) {
    const prepareReleaseActionDescription = chalk`{dim ${_.padStart(
      '(creates a release branch, PR, release notes draft)',
      getCliWidth() - 24
    )}}`;

    choices.push({
      name: `Prepare release ${prepareReleaseActionDescription}`,
      value: 'prepare-release'
    });
  }

  if (lastDraftReleaseTag !== '-') {
    choices.push({
      name: `Publish release ${lastDraftReleaseTag}`,
      value: 'publish-release'
    });
  }

  const {action} = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'Action?',
      choices
    }
  ]);

  return action;
}

export async function askOrgAction() {
  const {action} = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'Action?',
      choices: [
        {
          name: 'Create/Publish Releases & PRs',
          value: 'releases'
        },
        {
          name: 'Bulk Merge Renovate bot PRs',
          value: 'bulk-merge-renovate-prs'
        }
      ]
    }
  ]);

  return action;
}

async function loadRepos(org) {
  const reposSpinner = ora('Loading Repos').start();

  const repos = await getOrgRepoNames(org);
  reposSpinner.stop();

  return repos;
}

async function loadDiffsChoices({org, repos}) {
  const bar = new ProgressBar('Calculating Difference [:bar] :percent   ', {
    total: repos.length,
    clear: true,
    width: getCliWidth()
  });

  const diffs = await getAllReposDiffs({org, repos}).onProgress(() => {
    bar.tick(1);
  });

  return formatReposDiffsForChoices(diffs);
}
