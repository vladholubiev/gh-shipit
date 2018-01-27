#!/usr/bin/env node

const inquirer = require('inquirer');
const chalk = require('chalk');
const ora = require('ora');
const {distanceInWordsToNow} = require('date-fns');
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

    const output = diffs.map(({status, behind_by, ahead_by, lastCommitDate, repo}) => {
      const formattedDate = distanceInWordsToNow(new Date(lastCommitDate), {addSuffix: true});

      return chalk`{bold ${repo}}: {red -${behind_by}} {green +${ahead_by}} {dim ${formattedDate}}`;
    });

    console.log(output.join('\n'));
  });

process.on('uncaughtException', function(err) {
  console.log(err);
});
