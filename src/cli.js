#!/usr/bin/env node

const inquirer = require('inquirer');
const chalk = require('chalk');
const ora = require('ora');
const {getUserOrgs, getOrgRepos} = require('./repos');
const {getReposBranchesDiff} = require('./diff');

inquirer
  .prompt([
    {
      type: 'list',
      name: 'org',
      message: 'Select organization',
      choices() {
        return getUserOrgs();
      }
    }
  ])
  .then(async ({org}) => {
    const reposSpinner = ora('Loading org repos').start();
    const repos = await getOrgRepos(org);
    reposSpinner.stop();

    const diffSpinner = ora('Gathering repos diff').start();
    const diffs = await getReposBranchesDiff({org, repos});
    diffSpinner.stop();

    const output = diffs.map(({status, behind_by, ahead_by, lastCommitDateFormatted, repo}) => {
      return chalk`{dim ${lastCommitDateFormatted}} {red ${behind_by}} {green ${ahead_by}} {bold ${repo}}`;
    });

    console.log(output.join('\n'));
  });
