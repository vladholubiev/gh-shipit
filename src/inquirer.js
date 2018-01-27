const inquirer = require('inquirer');
const chalk = require('chalk');
const ora = require('ora');
const ProgressBar = require('progress');
const getCliWidth = require('cli-width');
const {getUserOrgs} = require('./client-users');
const {getOrgRepos} = require('./client-repos');
const {formatReposDiffsForChoices} = require('./format');
const {getAllReposDiffs} = require('./diff');

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
