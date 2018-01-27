#!/usr/bin/env node

const inquirer = require('inquirer');
const chalk = require('chalk');
const ora = require('ora');
const ProgressBar = require('progress');
const getCliWidth = require('cli-width');
const {getUserOrgs} = require('./client-users');
const {getOrgRepos} = require('./client-repos');
const {getAllReposDiffs, formatDiffs} = require('./diff');

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

    const choices = formatDiffs(diffs).map(
      ({status, behind_by, ahead_by, lastCommitDateFormatted, repo}) => {
        return {
          name: chalk`{dim ${lastCommitDateFormatted}} {red ${behind_by}} {green ${ahead_by}} {bold ${repo}}`,
          value: repo
        };
      }
    );

    inquirer
      .prompt([
        {
          type: 'list',
          name: 'repo',
          message: 'Repository',
          pageSize: 20,
          choices
        }
      ])
      .then(async ({repo}) => {
        console.log(repo);
      });
  });
