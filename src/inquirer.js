const inquirer = require('inquirer');
const chalk = require('chalk');
const ora = require('ora');
const opn = require('opn');
const _ = require('lodash');
const logSymbols = require('log-symbols');
const {normalizeSpace} = require('normalize-space-x');
const ProgressBar = require('progress');
const getCliWidth = require('cli-width');
const {getBranchDiff} = require('./repos');
const {getUserOrgs} = require('./client-users');
const {getOrgRepos} = require('./client-repos');
const {formatReposDiffsForChoices} = require('./format');
const {getAllReposDiffs} = require('./diff');
const {getLastRelease} = require('./client-releases');
const {getNextVersionOptions} = require('./semver');

module.exports.askOrg = async function() {
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
};

module.exports.askRepo = async function(org) {
  const repos = await loadRepos(org);
  const choices = await loadDiffsChoices({org, repos});

  if (_.isEmpty(choices)) {
    console.log(logSymbols.success, `Nothing to Release!`);
    return process.exit(0);
  }

  const {repo} = await inquirer.prompt([
    {
      type: 'list',
      name: 'repo',
      message: 'Repository?',
      pageSize: choices.length,
      choices
    }
  ]);

  return repo;
};

module.exports.askRepoAction = async function({org, repo}) {
  const choices = [];
  const {ahead_by, behind_by, lastDraftReleaseTag} = await getBranchDiff({org, repo});

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

  if (behind_by > 0) {
    choices.push({
      name: 'PR master -> develop',
      value: 'pr-master-develop'
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
};

module.exports.askOrgAction = async function() {
  const {action} = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'Action?',
      choices: [
        {
          name: 'Create Releases & PRs',
          value: 'releases'
        },
        {
          name: 'View Latest Releases',
          value: 'view-releases'
        }
      ]
    }
  ]);

  return action;
};

module.exports.askVersion = async function({org, repo}) {
  const lastRelease = await getLastRelease({org, repo});
  const {version} = await inquirer.prompt([
    {
      type: 'list',
      name: 'version',
      message: 'Version?',
      choices: getNextVersionOptions(lastRelease)
    }
  ]);

  return version;
};

module.exports.askReleaseTitle = async function({org, repo}) {
  const {inputType} = await inquirer.prompt([
    {
      type: 'list',
      name: 'inputType',
      message: 'Release Title?',
      choices: [
        {
          name: 'Enter now',
          value: 'enter-now'
        },
        {
          name: chalk`Enter after comparing branches {dim (opens github in browser)}`,
          value: 'enter-after'
        }
      ]
    }
  ]);

  if (inputType === 'enter-after') {
    const compareURL = `https://github.com/${org}/${repo}/compare/master...develop#commits_bucket`;
    opn(compareURL);
  }

  const {releaseTitle} = await inquirer.prompt([
    {
      type: 'input',
      name: 'releaseTitle',
      message: 'Release Title?',
      default: '...',
      filter(input) {
        return normalizeSpace(input);
      },
      validate(input = '') {
        input = normalizeSpace(input);

        if (input.length < 6) {
          return 'Please enter at least 6 letters';
        }

        return true;
      }
    }
  ]);

  return releaseTitle;
};

module.exports.askToOpenPR = async function({org, repo, pr}) {
  const {shouldOpenPR} = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'shouldOpenPR',
      message: 'Open PR in Browser?',
      default: true
    }
  ]);

  if (shouldOpenPR) {
    const prURL = `https://github.com/${org}/${repo}/pull/${pr}`;
    opn(prURL);
  }
};

async function loadRepos(org) {
  const reposSpinner = ora('Loading Repos').start();

  const repos = await getOrgRepos(org);
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
