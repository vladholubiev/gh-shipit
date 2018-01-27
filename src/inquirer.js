const inquirer = require('inquirer');
const chalk = require('chalk');
const ora = require('ora');
const opn = require('opn');
const normalizeSpace = require('normalize-space-x');
const ProgressBar = require('progress');
const getCliWidth = require('cli-width');
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
  // TODO remove slice after testing, added during development to load faster
  const choices = await loadDiffsChoices({org, repos: repos.slice(0, 4)});

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

module.exports.askRepoAction = async function() {
  const {action} = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'Action?',
      choices: [
        {
          name: chalk`Release {dim (create release branch, PR, notes draft)}`,
          value: 'prepare-release'
        },
        {
          name: 'PR master -> develop',
          value: 'pr-master-develop'
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

async function loadRepos(org) {
  const reposSpinner = ora('Loading Repos').start();

  const repos = await getOrgRepos(org);
  reposSpinner.stop();

  return repos;
}

async function loadDiffsChoices({org, repos}) {
  const bar = new ProgressBar('Calculating Difference [:bar] :percent :eta s', {
    total: repos.length,
    clear: true,
    width: getCliWidth()
  });

  const diffs = await getAllReposDiffs({org, repos}).onProgress(() => {
    bar.tick(1);
  });

  return formatReposDiffsForChoices(diffs);
}
