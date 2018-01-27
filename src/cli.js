#!/usr/bin/env node

const inquirer = require('inquirer');
const ora = require('ora');
const ProgressBar = require('progress');
const getCliWidth = require('cli-width');
const {getUserOrgs} = require('./client-users');
const {getOrgRepos} = require('./client-repos');
const {formatReposDiffsForChoices} = require('./format');
const {getAllReposDiffs} = require('./diff');

inquirer
  .prompt([
    {
      type: 'list',
      name: 'org',
      message: 'Organization?',
      choices() {
        return getUserOrgs();
      }
    }
  ])
  .then(async ({org}) => {
    const reposSpinner = ora('Loading Repos').start();
    const repos = await getOrgRepos(org);
    reposSpinner.stop();

    const bar = new ProgressBar('Calculating Difference [:bar] :percent :eta s', {
      total: repos.length,
      clear: true,
      width: getCliWidth()
    });
    const diffs = await getAllReposDiffs({org, repos}).onProgress(() => {
      bar.tick(1);
    });

    inquirer
      .prompt([
        {
          type: 'list',
          name: 'repo',
          message: 'Repository',
          pageSize: 20,
          choices: formatReposDiffsForChoices(diffs)
        }
      ])
      .then(async ({repo}) => {
        console.log(repo);
      });
  });
