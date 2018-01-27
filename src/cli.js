#!/usr/bin/env node

const inquirer = require('inquirer');
const chalk = require('chalk');
const ora = require('ora');
const ProgressBar = require('progress');
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
    const reposSpinner = ora('Loading repos').start();
    const repos = await getOrgRepos(org);
    reposSpinner.stop();

    const bar = new ProgressBar('[:bar] :percent :eta s', {total: repos.length});
    const diffs = await getAllReposDiffs({org, repos}).onProgress(() => {
      bar.tick(1);
    });

    const output = formatDiffs(diffs).map(
      ({status, behind_by, ahead_by, lastCommitDateFormatted, repo}) => {
        return chalk`{dim ${lastCommitDateFormatted}} {red ${behind_by}} {green ${ahead_by}} {bold ${repo}}`;
      }
    );

    console.log(output.join('\n'));
  });
